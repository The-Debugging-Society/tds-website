import React from 'react';
import { AdminDashboard } from '../components/Recruitment/AdminDashboard';

export default function RecruitAdmin() {
  return (
    <div className="min-h-[100dvh] bg-black text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="max-w-6xl mx-auto relative z-10">
        <AdminDashboard />
      </div>
    </div>
  );
}
