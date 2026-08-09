import React from 'react';
import { HelpCircle, FileText } from 'lucide-react';
import { FormField } from './FormField';
import { GENERAL_QUESTIONS } from '../../data/recruitmentData.js';

export function DepartmentQuestionnaire({ department, answers = {}, onChangeAnswer }) {
  if (!department) return null;

  return (
    <div className="space-y-8 pt-4 border-t border-zinc-800">
      {/* SECTION 2: DEPARTMENT SPECIFIC QUESTIONS */}
      <div className="space-y-6">
        <div className="border-b border-zinc-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            2. {department.name} Specific Questions
          </h3>
        </div>

        {department.questions.map((q, idx) => (
          <FormField
            key={q.id}
            id={q.id}
            type={q.type}
            label={q.label}
            required={q.required}
            placeholder={q.placeholder}
            options={q.options}
            helperText={q.helperText}
            value={answers[q.id] || (q.type === 'select' ? q.options[0] : '')}
            onChange={(val) => onChangeAnswer(q.id, val)}
          />
        ))}
      </div>

      {/* SECTION 3: GENERAL SOCIETY QUESTIONS */}
      <div className="space-y-6 pt-6 border-t border-zinc-800">
        <div className="border-b border-zinc-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            3. General Questions (Society & Motivation)
          </h3>
        </div>

        {GENERAL_QUESTIONS.map((q, idx) => (
          <FormField
            key={q.id}
            id={q.id}
            type={q.type}
            label={q.label}
            required={q.required}
            placeholder={q.placeholder}
            options={q.options}
            helperText={q.helperText}
            value={answers[q.id] || ''}
            onChange={(val) => onChangeAnswer(q.id, val)}
          />
        ))}
      </div>
    </div>
  );
}
