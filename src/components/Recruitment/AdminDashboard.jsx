import React, { useState } from 'react';
import { FileSpreadsheet, Lock, Download, Search, RefreshCw, Eye } from 'lucide-react';
import { fetchSubmissions, exportToCSV } from '../../lib/supabase.js';
import { DEPARTMENTS } from '../../data/recruitmentData.js';
import { ViewSubmissionModal } from './ViewSubmissionModal.jsx';

// Sanitize URLs to prevent javascript: protocol injection (security fix C2)
function safeHref(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return url;
  } catch {}
  return null;
}

export function AdminDashboard() {
  const [adminPass, setAdminPass] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [submissionsList, setSubmissionsList] = useState([]);
  const [deptFilter, setDeptFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (adminPass === 'tds2026' || adminPass === 'tds') {
      setIsUnlocked(true);
      loadData();
    } else {
      alert('Incorrect passcode.');
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const result = await fetchSubmissions();
    setSubmissionsList(result.data || result);
    setIsLoading(false);
  };

  const matchesDepartmentFilter = (itemDept, targetDept) => {
    if (targetDept === 'All') return true;
    if (!itemDept) return false;
    return itemDept === targetDept || itemDept.startsWith(`${targetDept} - `);
  };

  const filteredSubmissions = submissionsList.filter(item => {
    const matchesDept = matchesDepartmentFilter(item.department, deptFilter);
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      (item.full_name && item.full_name.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.student_id && item.student_id.toLowerCase().includes(query));
    return matchesDept && matchesSearch;
  });

  if (!isUnlocked) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl backdrop-blur-xl">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">TDS Team Admin Dashboard</h2>
            <p className="text-xs text-zinc-400 mt-1">Enter passcode to view applications and export spreadsheets</p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              placeholder="Enter admin passcode"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="w-full bg-black/80 border border-zinc-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none text-center"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-lg"
            >
              Unlock Submissions
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Selected Submission Modal */}
      {selectedSubmission && (
        <ViewSubmissionModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-zinc-900/90 p-5 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Recruitment Applications ({submissionsList.length})</h2>
            <p className="text-xs text-zinc-400">Click any row to view candidate's questionnaire answers</p>
          </div>
        </div>

        <button
          onClick={() => exportToCSV(submissionsList, deptFilter)}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Export {deptFilter} to CSV
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setDeptFilter('All')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-colors ${deptFilter === 'All' ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'}`}
          >
            All ({submissionsList.length})
          </button>
          {DEPARTMENTS.map(d => {
            const count = submissionsList.filter(s => matchesDepartmentFilter(s.department, d.id)).length;
            return (
              <button
                key={d.id}
                onClick={() => setDeptFilter(d.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-colors ${deptFilter === d.id ? 'bg-blue-600 text-white font-bold' : 'text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800'}`}
              >
                {d.name} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by name, roll no, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={loadData}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 rounded-xl border border-zinc-800"
            title="Refresh submissions"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Submissions Table */}
      {isLoading ? (
        <div className="text-center py-16 text-zinc-500 text-xs font-mono">Loading recruitment responses...</div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl text-zinc-500 text-sm">
          No submissions found for this filter.
        </div>
      ) : (
        <div className="overflow-x-auto border border-zinc-800 rounded-2xl bg-zinc-900/60 backdrop-blur-md">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase font-mono text-[11px] border-b border-zinc-800">
              <tr>
                <th className="p-4">Roll Number</th>
                <th className="p-4">Applicant</th>
                <th className="p-4">Department</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Links</th>
                <th className="p-4">Applied At</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredSubmissions.map((sub, idx) => (
                <tr
                  key={`${sub.student_id}_${sub.department}_${idx}`}
                  onClick={() => setSelectedSubmission(sub)}
                  className="hover:bg-zinc-800/70 cursor-pointer transition-colors group"
                >
                  <td className="p-4 font-mono font-bold text-blue-400 group-hover:underline">
                    {sub.student_id}
                  </td>
                  <td className="p-4 font-semibold text-white">
                    {sub.full_name}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-mono text-[11px] border border-blue-500/20">
                      {sub.department}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>{sub.email}</div>
                    <div className="text-[11px] text-zinc-500">{sub.phone}</div>
                  </td>
                  <td className="p-4 text-zinc-300">
                    {sub.branch || sub.year_branch}
                  </td>
                  <td className="p-4 space-x-2" onClick={(e) => e.stopPropagation()}>
                    {safeHref(sub.github_url) && (
                      <a href={safeHref(sub.github_url)} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub</a>
                    )}
                    {safeHref(sub.linkedin_url) && (
                      <a href={safeHref(sub.linkedin_url)} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">LinkedIn</a>
                    )}
                    {safeHref(sub.portfolio_url) && (
                      <a href={safeHref(sub.portfolio_url)} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Portfolio</a>
                    )}
                  </td>
                  <td className="p-4 font-mono text-zinc-500 text-[11px]">
                    {sub.created_at ? new Date(sub.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white font-medium text-[11px] transition-all">
                      <Eye className="w-3.5 h-3.5" /> View
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
