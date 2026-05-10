
//C:\Users\HP\Desktop\Automated Financial Auditor\frontend\src\pages\ReportsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getReport, getIssues, getFrauds } from '../services/reportService';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#f59e0b', '#ef4444', '#10b981'];

const ReportsPage = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [issues, setIssues] = useState([]);
  const [frauds, setFrauds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('issues');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [r, i, f] = await Promise.all([
        getReport(reportId),
        getIssues(reportId),
        getFrauds(reportId),
      ]);
      setReport(r); setIssues(i); setFrauds(f);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
    </div>
  );

  if (!report) return (
    <div className="p-6 text-center text-slate-500">Report not found.</div>
  );

  const safe = report.total_rows - report.total_issues - report.fraud_count;
  const pieData = [
    { name: 'Issues', value: report.total_issues },
    { name: 'Fraud', value: report.fraud_count },
    { name: 'Clean', value: Math.max(safe, 0) },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Report #{report.report_id}</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Generated at {new Date(report.created_at).toLocaleString()}
            </p>
          </div>
          <Link to="/upload" className="text-sm text-indigo-600 hover:underline">← New Upload</Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Rows', value: report.total_rows, color: 'text-slate-800', bg: 'bg-white' },
            { label: 'Issues Found', value: report.total_issues, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Fraud Cases', value: report.fraud_count, color: 'text-red-600', bg: 'bg-red-50' },
          ].map((c, i) => (
            <div key={i} className={`${c.bg} p-5 rounded-2xl shadow-sm border border-slate-100`}>
              <p className="text-sm text-slate-500">{c.label}</p>
              <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 mb-4">Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={70} paddingAngle={3}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
                <Legend iconType="circle" iconSize={10} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Issues by type summary */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Issue Summary</h3>
            {issues.length === 0 ? (
              <p className="text-slate-400 text-sm">No issues found.</p>
            ) : (
              <div className="space-y-2">
                {[...new Set(issues.map(i => i.issue))].map((issueType, i) => {
                  const count = issues.filter(x => x.issue === issueType).length;
                  return (
                    <div key={i} className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg text-sm">
                      <span className="text-slate-700">{issueType}</span>
                      <span className="font-bold text-amber-600">{count}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100">
            {['issues', 'fraud'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-indigo-500 text-indigo-600 bg-indigo-50/40'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'issues' ? `⚠️ Issues (${issues.length})` : `🚨 Fraud (${frauds.length})`}
              </button>
            ))}
          </div>

          <div className="p-4 max-h-80 overflow-y-auto">
            {activeTab === 'issues' && (
              issues.length === 0
                ? <p className="text-slate-400 text-sm text-center py-8">No issues found.</p>
                : issues.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-slate-50 py-2.5 text-sm">
                    <span className="text-slate-700 font-mono">Order #{item.order_id}</span>
                    <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-xs">{item.issue}</span>
                  </div>
                ))
            )}
            {activeTab === 'fraud' && (
              frauds.length === 0
                ? <p className="text-slate-400 text-sm text-center py-8">No fraud cases detected.</p>
                : frauds.map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-slate-50 py-2.5 text-sm">
                    <span className="text-slate-700 font-mono">Order #{item.order_id}</span>
                    <span className="text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs">{item.issue}</span>
                  </div>
                ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReportsPage;