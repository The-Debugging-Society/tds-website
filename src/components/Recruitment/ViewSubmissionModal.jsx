import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, GraduationCap, Github, Linkedin, ExternalLink, Calendar, HelpCircle, CheckCircle2 } from 'lucide-react';
import { GENERAL_QUESTIONS, DEPARTMENTS } from '../../data/recruitmentData.js';

// Sanitize URLs to prevent javascript: protocol injection (security fix C2)
function safeHref(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return url;
  } catch {}
  return null;
}

// Helper to look up human-readable question text by question ID
function getQuestionLabel(qKey) {
  for (const q of GENERAL_QUESTIONS) {
    if (q.id === qKey) return q.label;
  }
  for (const d of DEPARTMENTS) {
    if (d.questions) {
      for (const q of d.questions) {
        if (q.id === qKey) return q.label;
      }
    }
    if (d.subDepartments) {
      for (const sub of d.subDepartments) {
        if (sub.questions) {
          for (const q of sub.questions) {
            if (q.id === qKey) return q.label;
          }
        }
      }
    }
  }
  // Fallback if question key isn't found directly
  return qKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export function ViewSubmissionModal({ submission, onClose }) {
  useEffect(() => {
    // Lock body scroll when modal is open
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  if (!submission) return null;

  const answers = submission.answers || {};
  const answerEntries = Object.entries(answers);

  const modalNode = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
        {/* Click backdrop to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative z-10 w-full max-w-3xl max-h-[85vh] sm:max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto"
        >
          {/* MODAL HEADER */}
          <div className="p-6 border-b border-zinc-800 flex items-start justify-between bg-zinc-950 flex-shrink-0">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
                  {submission.department}
                </span>
                <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {submission.created_at ? new Date(submission.created_at).toLocaleString() : 'N/A'}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                {submission.full_name}
              </h2>
              <p className="text-xs font-mono text-zinc-400 mt-1">
                Roll Number: <span className="text-blue-400 font-bold">{submission.student_id}</span>
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* MODAL CONTENT BODY */}
          <div className="p-6 space-y-8 overflow-y-auto flex-1 text-sm bg-zinc-900">
            {/* CANDIDATE INFO SUMMARY */}
            <div className="bg-black/60 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 pb-2">
                Candidate Contact & Profile Info
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2.5 text-zinc-300">
                  <Mail className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-zinc-500">Email Address</div>
                    <a href={`mailto:${submission.email}`} className="font-semibold text-white hover:text-blue-400 transition-colors">
                      {submission.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-zinc-300">
                  <Phone className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-zinc-500">WhatsApp Phone</div>
                    <a href={`tel:${submission.phone}`} className="font-semibold text-white hover:text-blue-400 transition-colors">
                      {submission.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-zinc-300 md:col-span-2">
                  <GraduationCap className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-zinc-500">Academic Branch</div>
                    <div className="font-semibold text-white">
                      {submission.branch || submission.year_branch || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {/* LINKS */}
              {(safeHref(submission.github_url) || safeHref(submission.linkedin_url) || safeHref(submission.portfolio_url)) && (
                <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap items-center gap-3 text-xs">
                  {safeHref(submission.github_url) && (
                    <a
                      href={safeHref(submission.github_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-blue-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub Profile
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                    </a>
                  )}

                  {safeHref(submission.linkedin_url) && (
                    <a
                      href={safeHref(submission.linkedin_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-cyan-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      LinkedIn Profile
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                    </a>
                  )}

                  {safeHref(submission.portfolio_url) && (
                    <a
                      href={safeHref(submission.portfolio_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-indigo-400 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                    >
                      <User className="w-3.5 h-3.5" />
                      Portfolio / Resume
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* RESPONSES SECTION */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-2 border-b border-zinc-800 pb-2">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                Submitted Questionnaire Answers ({answerEntries.length})
              </h3>

              {answerEntries.length === 0 ? (
                <div className="text-zinc-500 text-xs italic py-4">No additional questionnaire answers recorded.</div>
              ) : (
                <div className="space-y-4">
                  {answerEntries.map(([qKey, qValue], i) => {
                    const questionText = getQuestionLabel(qKey);
                    const formattedValue = typeof qValue === 'object' ? JSON.stringify(qValue) : String(qValue);

                    return (
                      <div key={qKey} className="bg-black/40 border border-zinc-800/60 rounded-xl p-4 space-y-2">
                        <div className="text-xs font-semibold text-zinc-300 leading-snug">
                          <span className="text-blue-400 font-mono mr-1.5">Q{i + 1}.</span>
                          {questionText}
                        </div>
                        <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-3 text-xs text-white leading-relaxed font-sans whitespace-pre-wrap select-text">
                          {formattedValue || <span className="text-zinc-600 italic">No answer provided</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between flex-shrink-0">
            <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Read-only response view
            </span>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalNode, document.body);
}
