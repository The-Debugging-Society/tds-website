import React from 'react';
import { motion } from 'framer-motion';
import { Share2, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export function SubDepartmentSelector({
  parentDept,
  appliedDepts = [],
  onSelectSubDept,
  onBackToDepts
}) {
  if (!parentDept || !parentDept.subDepartments) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <button
            onClick={onBackToDepts}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> All Departments
          </button>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Share2 className="w-6 h-6 text-blue-400" />
            {parentDept.name} Sub-Departments
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Choose your specialization under Social Media. You can apply to multiple sub-departments!
          </p>
        </div>
        <span className="text-xs text-zinc-400 font-mono self-start sm:self-auto">
          3 Sub-Departments Open
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {parentDept.subDepartments.map((sub) => {
          const isApplied = appliedDepts.includes(sub.id);

          return (
            <motion.div
              key={sub.id}
              whileHover={isApplied ? {} : { scale: 1.02, y: -2 }}
              whileTap={isApplied ? {} : { scale: 0.98 }}
              onClick={() => onSelectSubDept(sub)}
              className={`group relative cursor-pointer bg-zinc-900 border ${
                isApplied 
                  ? 'border-emerald-500/40 bg-emerald-500/5' 
                  : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80'
              } rounded-2xl p-6 transition-all duration-200 backdrop-blur-md flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                    isApplied
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}>
                    {sub.badge}
                  </span>

                  {isApplied && (
                    <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> Applied
                    </span>
                  )}
                </div>

                <h3 className={`text-xl font-bold mb-2 transition-colors ${
                  isApplied ? 'text-emerald-300' : 'text-white group-hover:text-blue-400'
                }`}>
                  {sub.name}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {sub.shortDesc}
                </p>
              </div>

              <div className={`pt-4 border-t ${isApplied ? 'border-emerald-500/20' : 'border-zinc-800/80'} flex items-center justify-between text-xs font-semibold`}>
                {isApplied ? (
                  <span className="text-emerald-400 font-mono">1 Application Recorded ✓</span>
                ) : (
                  <div className="flex items-center justify-between w-full text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Apply for {sub.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
