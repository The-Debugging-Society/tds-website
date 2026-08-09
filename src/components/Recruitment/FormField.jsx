import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SCALE_LABELS = {
  1: "1 - Beginner",
  2: "2 - Basic",
  3: "3 - Intermediate",
  4: "4 - Advanced",
  5: "5 - Highly Experienced"
};

export function FormField({
  id,
  label,
  type = 'text',
  value = '',
  onChange,
  onBlur,
  placeholder = '',
  required = false,
  options = [],
  rows = 4,
  error = '',
  helperText = '',
  className = ''
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      {/* INTERACTIVE SCALE RATING SELECTOR (1 to 5) */}
      {type === 'scale-rating' && (
        <div className="space-y-3 pt-1">
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((num) => {
              const strNum = String(num);
              const isSelected = value === strNum || value.startsWith(strNum);

              return (
                <motion.button
                  key={num}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onChange(strNum)}
                  className={`py-3 sm:py-3.5 rounded-xl border text-center font-bold text-sm sm:text-base transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                      : 'bg-black/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900'
                  }`}
                >
                  <span>{num}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 px-1">
            <span>1 = Beginner</span>
            {value && SCALE_LABELS[value[0]] && (
              <span className="text-blue-400 font-bold bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/30">
                Selected: {SCALE_LABELS[value[0]]}
              </span>
            )}
            <span>5 = Highly Experienced</span>
          </div>
        </div>
      )}

      {/* INTERACTIVE RADIO GROUP (MCQ) */}
      {type === 'radio-group' && (
        <div className="flex flex-wrap gap-2.5 pt-1">
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <motion.button
                key={opt}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange(opt)}
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                    : 'bg-black/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 bg-zinc-900/50'
                }`}
              >
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                  isSelected ? 'border-white bg-white' : 'border-zinc-600'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </div>
                <span>{opt}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* CHECKBOX GROUP (MULTI-SELECT) */}
      {type === 'checkbox-group' && (
        <div className="flex flex-wrap gap-2.5 pt-1">
          {options.map((opt) => {
            const currentArray = Array.isArray(value) 
              ? value 
              : (value ? String(value).split(',').map(s => s.trim()) : []);

            const isChecked = currentArray.includes(opt);

            const isExclusiveOption = (optStr) => {
              const lower = optStr.toLowerCase();
              return lower.includes('none of the above') || lower === 'n/a' || lower === 'none';
            };

            const toggleOpt = () => {
              let updated;
              if (isExclusiveOption(opt)) {
                if (isChecked) {
                  updated = [];
                } else {
                  updated = [opt];
                }
              } else {
                if (isChecked) {
                  updated = currentArray.filter(item => item !== opt);
                } else {
                  updated = [...currentArray.filter(item => !isExclusiveOption(item)), opt];
                }
              }
              onChange(updated.join(', '));
            };

            return (
              <motion.button
                key={opt}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleOpt}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                  isChecked
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-black/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                  isChecked ? 'bg-blue-500 border-blue-400 text-white' : 'border-zinc-700 bg-black/40'
                }`}>
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{opt}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {type === 'textarea' && (
        <textarea
          id={id}
          required={required}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full bg-black/60 border ${error ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-blue-500'} focus:ring-1 focus:ring-blue-500 rounded-xl p-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all leading-relaxed`}
        />
      )}

      {type === 'select' && (
        <select
          id={id}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full bg-black/60 border ${error ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-blue-500'} focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-zinc-900 text-white">
              {opt}
            </option>
          ))}
        </select>
      )}

      {(type === 'text' || type === 'email' || type === 'tel' || type === 'url') && (
        <input
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full bg-black/60 border ${error ? 'border-red-500 focus:border-red-500' : 'border-zinc-800 focus:border-blue-500'} focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all`}
        />
      )}

      {error ? (
        <p className="text-xs text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-zinc-500">{helperText}</p>
      ) : null}
    </div>
  );
}
