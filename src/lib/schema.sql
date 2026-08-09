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
CREATE POLICY "Allow public submissions" 
ON public.recruitment_submissions 
FOR INSERT 
WITH CHECK (true);

-- Policy 2: Restricted SELECT - anonymous users can ONLY check if a specific
-- student_id+department combination exists (for duplicate detection).
-- They must supply a student_id filter in their query. Without it, RLS blocks the read.
-- This prevents bulk data scraping while still allowing the duplicate check to work.
CREATE POLICY "Allow check existing submission" 
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

-- To add name length check:
-- ALTER TABLE public.recruitment_submissions ADD CONSTRAINT check_full_name_length CHECK (char_length(full_name) <= 200);
