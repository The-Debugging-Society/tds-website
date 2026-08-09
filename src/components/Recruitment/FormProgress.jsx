import React from 'react';
import { motion } from 'framer-motion';

export function FormProgress({ step = 1 }) {
  return (
    <div className="mb-10 max-w-xl mx-auto">
      <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-zinc-400 mb-2 gap-1 sm:gap-4 text-center sm:text-left">
        <span className={step >= 1 ? 'text-blue-400 font-bold' : ''}>
          <span className="sm:hidden">1. DEPT</span>
          <span className="hidden sm:inline">1. DEPARTMENT</span>
        </span>
        <span className={step >= 2 ? 'text-blue-400 font-bold' : ''}>
          <span className="sm:hidden">2. FORM</span>
          <span className="hidden sm:inline">2. APPLICATION FORM</span>
        </span>
        <span className={step === 3 ? 'text-blue-400 font-bold' : ''}>
          <span className="sm:hidden">3. SUBMIT</span>
          <span className="hidden sm:inline">3. SUBMISSION</span>
        </span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-blue-600 rounded-full"
          animate={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </div>
  );
}
