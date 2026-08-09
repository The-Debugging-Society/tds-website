import React from 'react';
import { motion } from 'framer-motion';
import { Code, Cpu, Binary, Briefcase, Share2, ArrowRight, CheckCircle2 } from 'lucide-react';

const ICON_MAP = {
  Code,
  Cpu,
  Binary,
  Briefcase,
  Share2,
};

export function DepartmentCard({ dept, isApplied = false, onSelect }) {
  const IconComponent = ICON_MAP[dept.icon] || Code;

  return (
    <motion.div
      whileHover={isApplied ? {} : { scale: 1.02, y: -2 }}
      whileTap={isApplied ? {} : { scale: 0.98 }}
      onClick={() => onSelect(dept)}
      className={`group relative cursor-pointer bg-zinc-900 border ${
        isApplied 
          ? 'border-emerald-500/40 bg-emerald-500/5' 
          : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80'
      } rounded-2xl p-6 transition-all duration-200 backdrop-blur-md flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            isApplied 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-zinc-800 border border-zinc-700 text-blue-400 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white'
          }`}>
            <IconComponent className="w-6 h-6" />
          </div>
          
          <span className={`text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border ${
            isApplied
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-zinc-800 text-zinc-300 border-zinc-700'
          }`}>
            {isApplied ? 'Applied ✓' : dept.badge}
          </span>
        </div>

        <h3 className={`text-xl font-bold mb-2 transition-colors ${
          isApplied ? 'text-emerald-300' : 'text-white group-hover:text-blue-400'
        }`}>
          {dept.name}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          {dept.shortDesc}
        </p>
      </div>

      <div className={`pt-4 border-t ${isApplied ? 'border-emerald-500/20' : 'border-zinc-800/80'} flex items-center justify-between text-xs font-semibold`}>
        {isApplied ? (
          <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
            <CheckCircle2 className="w-4 h-4" /> Application Submitted
          </span>
        ) : (
          <div className="flex items-center justify-between w-full text-blue-400 group-hover:translate-x-1 transition-transform">
            <span>Apply for {dept.name}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
