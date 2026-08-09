import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { DepartmentCard } from './DepartmentCard';

export function DepartmentSelector({ departments, appliedDepts = [], onSelectDept }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-400" />
          Step 1: Choose Your Department
        </h2>
        <span className="text-xs text-zinc-400 font-mono">5 Departments Open</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          let isApplied = appliedDepts.includes(dept.id);
          
          if (!isApplied && dept.subDepartments) {
            const appliedSubCount = dept.subDepartments.filter(s => appliedDepts.includes(s.id)).length;
            if (appliedSubCount > 0) {
              isApplied = true;
            }
          }

          return (
            <DepartmentCard
              key={dept.id}
              dept={dept}
              isApplied={isApplied}
              onSelect={onSelectDept}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
