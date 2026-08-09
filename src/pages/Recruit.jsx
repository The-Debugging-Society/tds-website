import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DEPARTMENTS, BRANCHES, GENERAL_QUESTIONS } from '../data/recruitmentData.js';
import { 
  submitApplication, 
  checkExistingDepartmentSubmission, 
  getAppliedDepartments,
  saveDraft,
  loadDraft
} from '../lib/supabase.js';
import { DepartmentSelector } from '../components/Recruitment/DepartmentSelector';
import { SubDepartmentSelector } from '../components/Recruitment/SubDepartmentSelector';
import { CandidateInfoForm } from '../components/Recruitment/CandidateInfoForm';
import { DepartmentQuestionnaire } from '../components/Recruitment/DepartmentQuestionnaire';
import { FormProgress } from '../components/Recruitment/FormProgress';
import { SubmissionSuccess } from '../components/Recruitment/SubmissionSuccess';
import { Sparkles, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Recruit() {
  const [parentDept, setParentDept] = useState(null);
  const [selectedDept, setSelectedDept] = useState(null);
  const [step, setStep] = useState(1); // 1: Dept Select, 1.5: SubDept Select, 2: Form, 3: Success

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    branch: BRANCHES[0],
    studentId: '',
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
    answers: {}
  });

  // Applied departments list for current candidate
  const [appliedDepts, setAppliedDepts] = useState([]);

  // UI & Validation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [rollNoError, setRollNoError] = useState('');
  const [submissionResult, setSubmissionResult] = useState(null);

  // Ref for debounced draft save timer
  const draftTimerRef = useRef(null);

  // Restore saved candidate identity and fetch applied departments on page mount
  useEffect(() => {
    // Check sessionStorage first, then fall back to localStorage for backward compat
    const savedId = sessionStorage.getItem('tds_candidate_student_id')
      || localStorage.getItem('tds_candidate_student_id') || '';
    const savedEmail = sessionStorage.getItem('tds_candidate_email')
      || localStorage.getItem('tds_candidate_email') || '';
    
    if (savedId || savedEmail) {
      setFormData(prev => ({
        ...prev,
        studentId: savedId || prev.studentId,
        email: savedEmail || prev.email
      }));
    }

    getAppliedDepartments(savedId, savedEmail).then(depts => {
      if (depts) setAppliedDepts(depts);
    });
  }, []);

  // Fetch applied departments whenever studentId or email changes (debounced)
  useEffect(() => {
    const sId = formData.studentId.trim();
    const sEmail = formData.email.trim();

    const handler = setTimeout(() => {
      if ((sId && sId.length >= 4) || (sEmail && sEmail.includes('@'))) {
        getAppliedDepartments(sId, sEmail).then(depts => {
          setAppliedDepts(prev => {
            if (prev.length !== depts.length) return depts;
            const pSorted = [...prev].sort();
            const dSorted = [...depts].sort();
            return pSorted.every((v, i) => v === dSorted[i]) ? prev : depts;
          });
        });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [formData.studentId, formData.email]);

  // Save draft to localStorage as user types in Step 2 (debounced 500ms)
  useEffect(() => {
    if (selectedDept && step === 2) {
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
      draftTimerRef.current = setTimeout(() => {
        saveDraft(selectedDept.id, formData);
      }, 500);
    }
    return () => {
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    };
  }, [formData, selectedDept, step]);

  const handleDeptSelect = (dept) => {
    if (dept.subDepartments && dept.subDepartments.length > 0) {
      setParentDept(dept);
      setStep(1.5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      openFormForDept(dept);
    }
  };

  const handleSubDeptSelect = (subDept) => {
    openFormForDept(subDept);
  };

  const openFormForDept = (dept) => {
    setSelectedDept(dept);

    if (appliedDepts.includes(dept.id)) {
      setErrorMsg(`You have already submitted an application for ${dept.name}. Each candidate can submit 1 application per sub-department.`);
    } else {
      setErrorMsg('');
    }

    const savedDraft = loadDraft(dept.id);
    if (savedDraft) {
      setFormData(prev => ({
        ...prev,
        ...savedDraft,
        answers: { ...savedDraft.answers }
      }));
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'studentId') {
      const normalized = value.trim().toUpperCase();
      if (normalized && !normalized.startsWith('2026')) {
        setRollNoError('Only 2026 batch students (Roll No starting with 2026) are eligible to apply.');
      } else {
        setRollNoError('');
      }
    }

    if (errorMsg) setErrorMsg('');
  };

  const handleAnswerChange = (qId, value) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [qId]: value }
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleBlurStudentId = async () => {
    if (formData.studentId) {
      const normalized = formData.studentId.trim().toUpperCase();
      if (!normalized.startsWith('2026')) {
        setRollNoError('Only 2026 batch students (Roll No starting with 2026) are eligible to apply.');
        return;
      }
      setRollNoError('');

      if (selectedDept) {
        const alreadySubmitted = await checkExistingDepartmentSubmission(normalized, selectedDept.id, formData.email);
        if (alreadySubmitted) {
          setErrorMsg(`You have already submitted an application for ${selectedDept.name}.`);
          if (!appliedDepts.includes(selectedDept.id)) {
            setAppliedDepts(prev => [...prev, selectedDept.id]);
          }
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDept) return;

    // 1. Check if department already submitted
    if (appliedDepts.includes(selectedDept.id)) {
      setErrorMsg(`You have already submitted an application for ${selectedDept.name}.`);
      return;
    }

    // 2. Validate Roll No 2026 batch
    const studentId = formData.studentId.trim().toUpperCase();
    if (!studentId.startsWith('2026')) {
      setRollNoError('Only 2026 batch students (Roll No starting with 2026) are eligible to apply.');
      setErrorMsg('Roll Number must start with 2026.');
      return;
    }

    // 3. Validate Basic Fields
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !studentId) {
      setErrorMsg('Please fill in all required candidate information fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // 3b. Validate phone number format
    const phoneDigits = formData.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!/^\d{10,15}$/.test(phoneDigits)) {
      setErrorMsg('Please enter a valid phone number (10-15 digits).');
      return;
    }

    // 4. Validate Department Questions & General Questions
    const allQuestionsToValidate = [...selectedDept.questions, ...GENERAL_QUESTIONS];
    for (const q of allQuestionsToValidate) {
      if (q.required && (!formData.answers[q.id] || !formData.answers[q.id].toString().trim())) {
        setErrorMsg(`Please answer the required question: "${q.label}"`);
        return;
      }
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const payload = {
      ...formData,
      department: selectedDept.id
    };

    const res = await submitApplication(payload);

    setIsSubmitting(false);

    if (res.success) {
      setSubmissionResult(res.data);
      setAppliedDepts(prev => [...new Set([...prev, selectedDept.id])]);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (res.isDuplicate) {
        setAppliedDepts(prev => [...new Set([...prev, selectedDept.id])]);
      }
      setErrorMsg(res.error || 'Failed to submit application. Please try again.');
    }
  };

  const handleApplyOtherDept = (target) => {
    setErrorMsg('');
    setFormData(prev => ({
      ...prev,
      answers: {}
    }));

    if (target.subDepartments && target.subDepartments.length > 0) {
      setParentDept(target);
      setStep(1.5);
    } else {
      openFormForDept(target);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentDeptAlreadySubmitted = selectedDept && appliedDepts.includes(selectedDept.id);

  return (
    <div className="min-h-[100dvh] bg-black text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background visual accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Join <span className="text-blue-500">TDS</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Select your department to begin.
          </p>

          {appliedDepts.length > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <CheckCircle2 className="w-4 h-4" />
              Applied Roles ({appliedDepts.length}): {appliedDepts.join(', ')}
            </div>
          )}
        </div>

        {/* PROGRESS BAR */}
        <FormProgress step={Math.floor(step)} />

        {/* STEP 1: MAIN DEPARTMENT SELECTION */}
        {step === 1 && (
          <DepartmentSelector
            departments={DEPARTMENTS}
            appliedDepts={appliedDepts}
            onSelectDept={handleDeptSelect}
          />
        )}

        {/* STEP 1.5: SUB-DEPARTMENT SELECTION */}
        {step === 1.5 && parentDept && (
          <SubDepartmentSelector
            parentDept={parentDept}
            appliedDepts={appliedDepts}
            onSelectSubDept={handleSubDeptSelect}
            onBackToDepts={() => {
              setStep(1);
              setParentDept(null);
            }}
          />
        )}

        {/* STEP 2: APPLICATION FORM */}
        {step === 2 && selectedDept && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-4">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    if (parentDept) setStep(1.5);
                    else setStep(1);
                  }}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors mb-1"
                >
                  &larr; Change Department
                </button>
                <h2 className="text-xl sm:text-2xl font-bold text-white flex flex-wrap items-center gap-x-2">
                  Applying for <span className="text-blue-400">{selectedDept.fullName || selectedDept.name}</span>
                </h2>
              </div>

              <span className="text-[10px] sm:text-xs font-mono px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 w-fit self-start sm:self-auto shrink-0">
                1 Submission per role
              </span>
            </div>

            {isCurrentDeptAlreadySubmitted && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">You have already submitted an application for {selectedDept.name}.</p>
                  <p className="text-xs text-emerald-200/80 mt-1">
                    Your response for this role is recorded in our system. You can apply for any of the other open departments or sub-departments!
                  </p>
                </div>
              </div>
            )}

            {errorMsg && !isCurrentDeptAlreadySubmitted && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* SECTION A: CANDIDATE INFO */}
              <CandidateInfoForm
                formData={formData}
                onChangeField={handleFieldChange}
                onBlurStudentId={handleBlurStudentId}
                rollNoError={rollNoError}
              />

              {/* SECTION B: DEPARTMENT QUESTIONNAIRE */}
              <DepartmentQuestionnaire
                department={selectedDept}
                answers={formData.answers}
                onChangeAnswer={handleAnswerChange}
              />

              {/* SUBMIT ACTIONS */}
              <div className="pt-6 border-t border-zinc-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (parentDept) setStep(1.5);
                    else setStep(1);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-sm font-semibold"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !!rollNoError || isCurrentDeptAlreadySubmitted}
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] ${
                    isCurrentDeptAlreadySubmitted
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Application...
                    </>
                  ) : isCurrentDeptAlreadySubmitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Submitted for {selectedDept.name}
                    </>
                  ) : (
                    <>
                      Submit Application for {selectedDept.name}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* STEP 3: SUCCESS & MULTI-DEPARTMENT APPLICATION */}
        {step === 3 && (
          <SubmissionSuccess
            submissionData={submissionResult}
            selectedDept={selectedDept}
            allDepartments={DEPARTMENTS}
            appliedDepts={appliedDepts}
            onApplyOtherDepartment={handleApplyOtherDept}
            onReset={() => {
              setStep(1);
              setSelectedDept(null);
              setParentDept(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
