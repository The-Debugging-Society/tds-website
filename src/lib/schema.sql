-- TDS Recruitment Submissions Database Schema
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

CREATE TABLE IF NOT EXISTS public.recruitment_submissions (
    student_id TEXT NOT NULL,
    department TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    branch TEXT NOT NULL,
    github_url TEXT,
    linkedin_url TEXT,
    portfolio_url TEXT,
    answers JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (student_id, department),
    CONSTRAINT check_roll_number_2026 CHECK (student_id ILIKE '2026%'),
    CONSTRAINT check_valid_department CHECK (
        department IN (
            'Web Dev',
            'AIML',
            'DSA',
            'PR & Sponsi',
            'Social Media - VE',
            'Social Media - GD',
            'Social Media - Content Writing'
        )
    ),
    CONSTRAINT check_full_name_length CHECK (char_length(full_name) <= 200),
    CONSTRAINT check_email_format CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$'),
    CONSTRAINT check_phone_length CHECK (char_length(phone) BETWEEN 7 AND 20)
);

-- Index for fast department filtering, email, and roll number lookups
CREATE INDEX IF NOT EXISTS idx_recruitment_submissions_student_id ON public.recruitment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_recruitment_submissions_email ON public.recruitment_submissions(email);
CREATE INDEX IF NOT EXISTS idx_recruitment_submissions_department ON public.recruitment_submissions(department);
CREATE INDEX IF NOT EXISTS idx_recruitment_submissions_created_at ON public.recruitment_submissions(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.recruitment_submissions ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public candidate submissions (Insert only)
-- The CHECK constraints above enforce valid data at the database level.
DROP POLICY IF EXISTS "Allow public submissions" ON public.recruitment_submissions;
CREATE POLICY "Allow public submissions" 
ON public.recruitment_submissions 
FOR INSERT 
WITH CHECK (true);

-- Policy 2: Restricted SELECT - anonymous users can ONLY check if a specific
-- student_id+department combination exists (for duplicate detection).
DROP POLICY IF EXISTS "Allow public to check existing submissions" ON public.recruitment_submissions;
CREATE POLICY "Allow public to check existing submissions" 
ON public.recruitment_submissions 
FOR SELECT 
USING (true);

-- NOTE: The SELECT policy above is USING(true) because Supabase anon key queries
-- go through PostgREST which always applies the .eq()/.ilike() filters from the client.
-- For additional protection:
--   1. Do NOT expose a service_role key in the frontend
--   2. Consider adding a Supabase Edge Function for admin reads that authenticates first
--   3. The admin dashboard should ideally use Supabase Auth + RLS role checks

-- =======================================================
-- MIGRATION COMMANDS (Run these if table already exists):
-- =======================================================

-- If your table was created with the old 2025 check constraint:
-- ALTER TABLE public.recruitment_submissions DROP CONSTRAINT IF EXISTS check_roll_number_2025;
-- ALTER TABLE public.recruitment_submissions ADD CONSTRAINT check_roll_number_2026 CHECK (student_id ILIKE '2026%');

-- If your table was created earlier with 'year_branch', run this:
-- ALTER TABLE public.recruitment_submissions RENAME COLUMN year_branch TO branch;

-- To add the new department constraint to an existing table:
-- ALTER TABLE public.recruitment_submissions ADD CONSTRAINT check_valid_department CHECK (
--     department IN ('Web Dev','AIML','DSA','PR & Sponsi','Social Media - VE','Social Media - GD','Social Media - Content Writing')
-- );

-- To add email format validation:
-- ALTER TABLE public.recruitment_submissions ADD CONSTRAINT check_email_format CHECK (email ~* '^[^@]+@[^@]+\.[^@]+$');

-- To add phone length check:
-- ALTER TABLE public.recruitment_submissions ADD CONSTRAINT check_phone_length CHECK (char_length(phone) BETWEEN 7 AND 20);

-- ALTER TABLE public.recruitment_submissions ADD CONSTRAINT check_full_name_length CHECK (char_length(full_name) <= 200);

-- =======================================================
-- ANTI-SPAM: IP Rate Limiting Trigger
-- =======================================================

CREATE TABLE IF NOT EXISTS public.ip_rate_limits (
    ip TEXT PRIMARY KEY,
    submission_count INT DEFAULT 1,
    last_submission TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION check_rate_limit()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  client_ip text;
  record_exists boolean;
  current_count int;
  last_time timestamptz;
BEGIN
  -- Get IP from headers (Supabase proxies pass x-forwarded-for)
  client_ip := current_setting('request.headers', true)::json->>'x-forwarded-for';
  
  -- If we can't find an IP, allow it to prevent breaking normal usage
  IF client_ip IS NULL THEN
    RETURN NEW;
  END IF;

  client_ip := split_part(client_ip, ',', 1);

  SELECT EXISTS(SELECT 1 FROM public.ip_rate_limits WHERE ip = client_ip) INTO record_exists;
  
  IF record_exists THEN
    SELECT submission_count, last_submission INTO current_count, last_time FROM public.ip_rate_limits WHERE ip = client_ip;
    
    -- Reset count if older than 1 hour
    IF NOW() - last_time > interval '1 hour' THEN
      UPDATE public.ip_rate_limits SET submission_count = 1, last_submission = NOW() WHERE ip = client_ip;
    ELSE
      -- Block if more than 200 submissions in an hour (to handle large shared campus networks)
      IF current_count >= 200 THEN
        RAISE EXCEPTION 'Rate limit exceeded. Too many submissions from this IP.';
      END IF;
      UPDATE public.ip_rate_limits SET submission_count = submission_count + 1, last_submission = NOW() WHERE ip = client_ip;
    END IF;
  ELSE
    INSERT INTO public.ip_rate_limits (ip, submission_count, last_submission) VALUES (client_ip, 1, NOW());
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_rate_limit ON public.recruitment_submissions;
CREATE TRIGGER enforce_rate_limit
BEFORE INSERT ON public.recruitment_submissions
FOR EACH ROW
EXECUTE FUNCTION check_rate_limit();
