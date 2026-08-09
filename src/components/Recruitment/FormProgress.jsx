import React from 'react';
import { motion } from 'framer-motion';

export function FormProgress({ step = 1 }) {
  return (
    <div className="mb-10 max-w-xl mx-auto">
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
        <span className={step >= 1 ? 'text-blue-400 font-bold' : ''}>1. DEPARTMENT</span>
        <span className={step >= 2 ? 'text-blue-400 font-bold' : ''}>2. APPLICATION FORM</span>
        <span className={step === 3 ? 'text-blue-400 font-bold' : ''}>3. SUBMISSION</span>
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
