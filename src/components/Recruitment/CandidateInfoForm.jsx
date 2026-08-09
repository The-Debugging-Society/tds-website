import React from 'react';
import { UserCheck } from 'lucide-react';
import { FormField } from './FormField';
import { BRANCHES } from '../../data/recruitmentData.js';

export function CandidateInfoForm({ formData, onChangeField, onBlurStudentId, rollNoError }) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-white border-b border-zinc-800/80 pb-2 flex items-center gap-2">
        <UserCheck className="w-5 h-5 text-blue-400" />
        1. Candidate & Academic Information
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <FormField
          id="fullName"
          label="Full Name"
          required
          placeholder="e.g. Rahul Sharma"
          value={formData.fullName}
          onChange={(val) => onChangeField('fullName', val)}
        />

        {/* Email Address */}
        <FormField
          id="email"
          type="email"
          label="Email Address"
          required
          placeholder="e.g. rahul@example.com"
          value={formData.email}
          onChange={(val) => onChangeField('email', val)}
          helperText="Used for interview updates & response verification."
        />

        {/* Roll Number / Student ID (Starts with 2026) */}
        <FormField
          id="studentId"
          label="Roll Number / Student ID (2026 Batch Only)"
          required
          placeholder="e.g. 2026CS1042"
          value={formData.studentId}
          onChange={(val) => onChangeField('studentId', val.toUpperCase())}
          onBlur={onBlurStudentId}
          error={rollNoError}
          helperText="Must start with '2026' (Primary ID)."
        />

        {/* Phone / WhatsApp */}
        <FormField
          id="phone"
          type="tel"
          label="WhatsApp Phone Number"
          required
          placeholder="+91 9876543210"
          value={formData.phone}
          onChange={(val) => onChangeField('phone', val)}
        />

        {/* Branch Selection */}
        <div className="sm:col-span-2">
          <FormField
            id="branch"
            type="select"
            label="Academic Branch (NSUT)"
            required
            options={BRANCHES}
            value={formData.branch}
            onChange={(val) => onChangeField('branch', val)}
          />
        </div>
      </div>

      {/* Profiles & Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <FormField
          id="githubUrl"
          type="url"
          label="GitHub Profile"
          placeholder="https://github.com/username"
          value={formData.githubUrl}
          onChange={(val) => onChangeField('githubUrl', val)}
        />
        <FormField
          id="linkedinUrl"
          type="url"
          label="LinkedIn Profile"
          placeholder="https://linkedin.com/in/username"
          value={formData.linkedinUrl}
          onChange={(val) => onChangeField('linkedinUrl', val)}
        />
        <FormField
          id="portfolioUrl"
          type="url"
          label="Personal Portfolio / Resume"
          placeholder="https://yourportfolio.com"
          value={formData.portfolioUrl}
          onChange={(val) => onChangeField('portfolioUrl', val)}
        />
      </div>
    </div>
  );
}
