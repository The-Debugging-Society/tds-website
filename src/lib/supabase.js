import { createClient } from '@supabase/supabase-js';
import { DEPARTMENTS } from '../data/recruitmentData.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Initialize Supabase client if keys exist
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Helper to get set of all valid department and sub-department names
function getAllValidDepartmentNames() {
  const names = new Set();
  DEPARTMENTS.forEach(d => {
    names.add(d.id);
    if (d.subDepartments) {
      d.subDepartments.forEach(sub => names.add(sub.id));
    }
  });
  return names;
}

// Sanitize a string for safe database storage (strip control chars, limit length)
function sanitizeInput(value, maxLength = 5000) {
  if (typeof value !== 'string') return value;
  // Strip null bytes and non-printable control characters (except newlines, tabs)
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').slice(0, maxLength);
}

// Sanitize a URL: only allow http/https protocols to prevent javascript: injection
function sanitizeUrl(value, maxLength = 500) {
  if (!value || typeof value !== 'string') return null;
  const cleaned = sanitizeInput(value.trim(), maxLength);
  if (!cleaned) return null;
  try {
    const parsed = new URL(cleaned);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return cleaned;
  } catch {}
  return null;
}

/**
 * Checks if a candidate has already submitted an application for a specific department.
 */
export async function checkExistingDepartmentSubmission(studentId, department, email = '') {
  if (!department) return false;

  const normalizedId = studentId ? studentId.trim().toUpperCase() : '';
  const normalizedEmail = email ? email.trim().toLowerCase() : '';
  const normalizedDept = department.trim();

  // Local device check
  if (sessionStorage.getItem(`tds_submitted_${normalizedDept}`) === 'true') {
    return true;
  }
  if (normalizedId && sessionStorage.getItem(`tds_submitted_${normalizedId}_${normalizedDept}`) === 'true') {
    return true;
  }
  if (normalizedEmail && sessionStorage.getItem(`tds_submitted_email_${normalizedEmail}_${normalizedDept}`) === 'true') {
    return true;
  }

  // Supabase check if configured
  if (supabase && (normalizedId || normalizedEmail)) {
    try {
      // Use separate queries to avoid string interpolation in .or() filters (H1 fix)
      if (normalizedId) {
        const { data, error } = await supabase
          .from('recruitment_submissions')
          .select('student_id, department')
          .eq('department', normalizedDept)
          .ilike('student_id', normalizedId)
          .limit(1);

        if (!error && data && data.length > 0) return true;
      }

      if (normalizedEmail) {
        const { data, error } = await supabase
          .from('recruitment_submissions')
          .select('student_id, department')
          .eq('department', normalizedDept)
          .ilike('email', normalizedEmail)
          .limit(1);

        if (!error && data && data.length > 0) return true;
      }

      return false;
    } catch (err) {
      console.warn('Error checking existing department submission:', err);
      return false;
    }
  }

  return false;
}

/**
 * Gets all departments a student has already applied for.
 * Checks device sessionStorage AND Supabase database.
 */
export async function getAppliedDepartments(studentId = '', email = '') {
  const normalizedId = studentId ? studentId.trim().toUpperCase() : '';
  const normalizedEmail = email ? email.trim().toLowerCase() : '';
  const appliedSet = new Set();
  const validDeptNames = getAllValidDepartmentNames();

  // 1. Scan ALL device sessionStorage keys for applied department markers
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    if (key && key.startsWith('tds_submitted_')) {
      const val = sessionStorage.getItem(key);
      if (val === 'true') {
        const raw = key.replace('tds_submitted_', '');

        if (validDeptNames.has(raw)) {
          appliedSet.add(raw);
        } else {
          validDeptNames.forEach(name => {
            if (raw === name || raw.endsWith(`_${name}`)) {
              appliedSet.add(name);
            }
          });
        }
      }
    }
  }

  // 2. Also check localStorage for backward compatibility (previous submissions)
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('tds_submitted_')) {
      const val = localStorage.getItem(key);
      if (val === 'true') {
        const raw = key.replace('tds_submitted_', '');
        if (validDeptNames.has(raw)) {
          appliedSet.add(raw);
        } else {
          validDeptNames.forEach(name => {
            if (raw === name || raw.endsWith(`_${name}`)) {
              appliedSet.add(name);
            }
          });
        }
      }
    }
  }

  // 3. Load candidate ID from sessionStorage/localStorage if not passed in
  const savedId = normalizedId
    || (sessionStorage.getItem('tds_candidate_student_id') || '').trim().toUpperCase()
    || (localStorage.getItem('tds_candidate_student_id') || '').trim().toUpperCase();
  const savedEmail = normalizedEmail
    || (sessionStorage.getItem('tds_candidate_email') || '').trim().toLowerCase()
    || (localStorage.getItem('tds_candidate_email') || '').trim().toLowerCase();

  // 4. Query Supabase for savedId or savedEmail if available (separate queries, no interpolation)
  if (supabase && (savedId || savedEmail)) {
    try {
      if (savedId) {
        const { data, error } = await supabase
          .from('recruitment_submissions')
          .select('department')
          .ilike('student_id', savedId);

        if (!error && data) {
          data.forEach(item => {
            if (item.department && validDeptNames.has(item.department)) {
              appliedSet.add(item.department);
            }
          });
        }
      }

      if (savedEmail) {
        const { data, error } = await supabase
          .from('recruitment_submissions')
          .select('department')
          .ilike('email', savedEmail);

        if (!error && data) {
          data.forEach(item => {
            if (item.department && validDeptNames.has(item.department)) {
              appliedSet.add(item.department);
            }
          });
        }
      }
    } catch (err) {
      console.warn('Error fetching applied departments:', err);
    }
  }

  return Array.from(appliedSet).filter(dept => validDeptNames.has(dept));
}

/**
 * Submits application for a specific department to Supabase (or localStorage in fallback demo mode).
 */
export async function submitApplication(payload) {
  const studentId = sanitizeInput(payload.studentId.trim().toUpperCase(), 50);
  const email = sanitizeInput(payload.email.trim().toLowerCase(), 200);
  const department = payload.department.trim();

  // 1. Validate Roll No starts with 2026
  if (!studentId.startsWith('2026')) {
    return {
      success: false,
      error: 'Only candidates with Roll Number starting with 2026 (2026 Batch) are eligible to apply.'
    };
  }

  // 1b. Validate department is a known department
  const validDeptNames = getAllValidDepartmentNames();
  if (!validDeptNames.has(department)) {
    return {
      success: false,
      error: 'Invalid department selected.'
    };
  }

  // 2. Check duplicate for this specific department
  const isDuplicate = await checkExistingDepartmentSubmission(studentId, department, email);
  if (isDuplicate) {
    sessionStorage.setItem(`tds_submitted_${department}`, 'true');
    sessionStorage.setItem('tds_candidate_student_id', studentId);
    sessionStorage.setItem('tds_candidate_email', email);

    return { 
      success: false, 
      isDuplicate: true, 
      error: `You have already submitted an application for ${department}.` 
    };
  }

  // Sanitize all user-provided fields
  const sanitizedAnswers = {};
  if (payload.answers && typeof payload.answers === 'object') {
    for (const [key, val] of Object.entries(payload.answers)) {
      sanitizedAnswers[sanitizeInput(key, 100)] = sanitizeInput(typeof val === 'object' ? JSON.stringify(val) : String(val), 10000);
    }
  }

  const submissionData = {
    student_id: studentId,
    department: department,
    full_name: sanitizeInput(payload.fullName.trim(), 200),
    email: email,
    phone: sanitizeInput(payload.phone.trim(), 20),
    branch: sanitizeInput(payload.branch ? payload.branch.trim() : (payload.yearBranch ? payload.yearBranch.trim() : ''), 200),
    github_url: sanitizeUrl(payload.githubUrl),
    linkedin_url: sanitizeUrl(payload.linkedinUrl),
    portfolio_url: sanitizeUrl(payload.portfolioUrl),
    answers: sanitizedAnswers,
    created_at: new Date().toISOString()
  };

  // Save device & candidate keys (sessionStorage for privacy on shared computers)
  sessionStorage.setItem(`tds_submitted_${department}`, 'true');
  sessionStorage.setItem('tds_candidate_student_id', studentId);
  sessionStorage.setItem('tds_candidate_email', email);

  // 3. Submit to Supabase if configured
  if (supabase) {
    try {
      // Note: no .select() after insert — anon role only has column-level SELECT
      // on (student_id, department, email) for security, so reading back full rows would fail.
      const { error } = await supabase
        .from('recruitment_submissions')
        .insert([submissionData]);

      if (error) {
        // Postgres error 23505 is primary key / unique violation
        if (error.code === '23505') {
          return {
            success: false,
            isDuplicate: true,
            error: `You have already submitted an application for ${department}.`
          };
        }
        // Fallback: If table in Supabase still has 'year_branch' column instead of 'branch'
        if (error.message && error.message.includes("'branch'")) {
          const fallbackData = { ...submissionData };
          delete fallbackData.branch;
          fallbackData.year_branch = payload.branch ? sanitizeInput(payload.branch.trim(), 200) : '';

          const { error: retryError } = await supabase
            .from('recruitment_submissions')
            .insert([fallbackData]);

          if (!retryError) {
            localStorage.removeItem(`tds_recruitment_draft_${department}`);
            return { success: true, data: submissionData };
          }
        }
        throw error;
      }

      // Clear draft for this department
      localStorage.removeItem(`tds_recruitment_draft_${department}`);
      return { success: true, data: submissionData };
    } catch (err) {
      console.error('Supabase submit error:', err);
      return { 
        success: false, 
        error: err.message || 'Failed to submit application to database.' 
      };
    }
  }

  // 4. Fallback demo mode (localStorage)
  try {
    const existing = JSON.parse(localStorage.getItem('tds_recruitment_submissions_demo') || '[]');
    existing.push(submissionData);
    localStorage.setItem('tds_recruitment_submissions_demo', JSON.stringify(existing));
    localStorage.removeItem(`tds_recruitment_draft_${department}`);

    return { 
      success: true, 
      data: submissionData,
      isDemo: true 
    };
  } catch (err) {
    return { success: false, error: 'Failed to save submission locally.' };
  }
}

/**
 * Saves candidate form draft in browser local storage.
 * Debounced externally - this function writes immediately.
 */
export function saveDraft(departmentId, data) {
  try {
    localStorage.setItem(`tds_recruitment_draft_${departmentId}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch (err) {
    console.warn('Failed to save draft:', err);
  }
}

/**
 * Loads saved candidate form draft from browser local storage.
 */
export function loadDraft(departmentId) {
  try {
    const raw = localStorage.getItem(`tds_recruitment_draft_${departmentId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.data || null;
    }
  } catch (err) {
    console.warn('Failed to load draft:', err);
  }
  return null;
}

/**
 * Fetches submissions for Admin view with pagination support.
 * @param {number} page - Page number (0-indexed)
 * @param {number} pageSize - Number of items per page
 */
export async function fetchSubmissions(page = 0, pageSize = 200) {
  if (supabase) {
    try {
      const from = page * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from('recruitment_submissions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (!error && data) {
        return { data, total: count || data.length };
      }
    } catch (err) {
      console.warn('Error fetching from Supabase:', err);
    }
  }

  const demoData = JSON.parse(localStorage.getItem('tds_recruitment_submissions_demo') || '[]');
  return { data: demoData, total: demoData.length };
}

// Helper to escape a CSV cell value to prevent formula injection (M1 fix)
function csvSafeValue(val) {
  const str = String(val);
  // If the cell starts with a formula-triggering character, prefix with a single quote
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

/**
 * Exports submissions to CSV format, compatible with Google Sheets & Microsoft Excel.
 */
export function exportToCSV(submissions, departmentFilter = 'All') {
  if (!submissions || submissions.length === 0) {
    alert('No submissions found to export.');
    return;
  }

  const filtered = departmentFilter === 'All' 
    ? submissions 
    : submissions.filter(s => s.department === departmentFilter || (s.department && s.department.startsWith(departmentFilter + ' - ')));

  if (filtered.length === 0) {
    alert(`No submissions found for department: ${departmentFilter}`);
    return;
  }

  const baseHeaders = [
    'Roll Number',
    'Department',
    'Full Name',
    'Email',
    'Phone',
    'Branch',
    'Applied At',
    'GitHub',
    'LinkedIn',
    'Portfolio'
  ];

  const questionKeysSet = new Set();
  filtered.forEach(sub => {
    if (sub.answers && typeof sub.answers === 'object') {
      Object.keys(sub.answers).forEach(k => questionKeysSet.add(k));
    }
  });

  const questionKeys = Array.from(questionKeysSet);
  const headers = [...baseHeaders, ...questionKeys];

  const csvRows = [];
  csvRows.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));

  filtered.forEach(sub => {
    const row = [
      csvSafeValue(sub.student_id || ''),
      csvSafeValue(sub.department || ''),
      csvSafeValue(sub.full_name || ''),
      csvSafeValue(sub.email || ''),
      csvSafeValue(sub.phone || ''),
      csvSafeValue(sub.branch || sub.year_branch || ''),
      sub.created_at ? new Date(sub.created_at).toLocaleString() : '',
      csvSafeValue(sub.github_url || ''),
      csvSafeValue(sub.linkedin_url || ''),
      csvSafeValue(sub.portfolio_url || '')
    ];

    questionKeys.forEach(key => {
      const val = sub.answers ? (sub.answers[key] || '') : '';
      row.push(csvSafeValue(typeof val === 'object' ? JSON.stringify(val) : String(val)));
    });

    csvRows.push(row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const safeDept = departmentFilter.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  link.setAttribute('download', `TDS_Recruitment_${safeDept}_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
