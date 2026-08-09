import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Building2 } from 'lucide-react';
import { DepartmentCard } from './DepartmentCard';

export function SubmissionSuccess({
  submissionData,
  selectedDept,
  allDepartments,
  appliedDepts = [],
  onApplyOtherDepartment,
  onReset
}) {
  // Collect all available targets (departments and sub-departments)
  const availableTargets = [];
  allDepartments.forEach(dept => {
    if (dept.subDepartments) {
      dept.subDepartments.forEach(sub => {
        if (!appliedDepts.includes(sub.id)) {
          availableTargets.push({
            ...sub,
            parentDept: dept
          });
        }
      });
    } else {
      if (!appliedDepts.includes(dept.id)) {
        availableTargets.push(dept);
      }
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 max-w-3xl mx-auto"
    >
      {/* SUCCESS CONFIRMATION BOX */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-10 text-center backdrop-blur-xl shadow-2xl space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Application Submitted!</h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
            Your application for <span className="text-blue-400 font-bold">{selectedDept?.name}</span> at The Debugging Society (TDS) has been successfully recorded.
          </p>
        </div>

        <div className="bg-black/60 border border-zinc-800 rounded-2xl p-5 text-left text-xs font-mono space-y-2.5 text-zinc-300">
          <div className="flex justify-between border-b border-zinc-800/60 pb-2">
            <span className="text-zinc-500">Applicant Name:</span>
            <span className="text-white font-bold">{submissionData?.full_name}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800/60 pb-2">
            <span className="text-zinc-500">Roll Number:</span>
            <span className="text-white font-mono">{submissionData?.student_id}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-800/60 pb-2">
            <span className="text-zinc-500">Department Applied:</span>
            <span className="text-blue-400 font-bold">{selectedDept?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Submission Status:</span>
            <span className="text-emerald-400 font-bold">Confirmed ✓</span>
          </div>
        </div>
      </div>

      {/* MULTI-DEPARTMENT PROMPT */}
      {availableTargets.length > 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Apply for another department or sub-department?</h3>
              <p className="text-xs text-zinc-400">
                You can apply to multiple departments! Your candidate details will be preserved.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableTargets.map((target) => (
              <DepartmentCard
                key={target.id}
                dept={target}
                isApplied={false}
                onSelect={() => onApplyOtherDepartment(target)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center text-emerald-300 text-sm font-medium">
          You have submitted applications for all departments and sub-departments!
        </div>
      )}

      <div className="text-center pt-2">
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-semibold text-xs transition-colors"
        >
          Back to Recruitment Home
        </button>
      </div>
    </motion.div>
  );
}
