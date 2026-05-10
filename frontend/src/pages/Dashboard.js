// // src/pages/Dashboard.js

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getDashboard } from '../services/api';
// import { listReports, getReport, getIssues, getFrauds } from '../services/reportService';
// import StatsCards from '../components/StatsCards';
// import ChartSection from '../components/ChartSection';
// import AlertsPanel from '../components/AlertsPanel';
// import TransactionTable from '../components/TransactionTable';

// function Dashboard() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState('');
//   const [allReports, setAllReports] = useState([]);   // list from backend
//   const [activeReport, setActiveReport] = useState(null);
//   const [issues, setIssues] = useState([]);
//   const [frauds, setFrauds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [reportLoading, setReportLoading] = useState(false);

//   // ── Initial load ───────────────────────────────────────────────────────────
//   useEffect(() => {
//     const init = async () => {
//       try {
//         const [dashRes, reports] = await Promise.all([
//           getDashboard(),
//           listReports(),
//         ]);
//         setUser(dashRes.data.user);
//         setAllReports(reports);

//         // Auto-load the most recent report (first in list since ordered by -created_at)
//         if (reports.length > 0) {
//           await loadReportDetail(reports[0].report_id);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     init();
//   }, []);

//   // ── Load detail for a specific report ─────────────────────────────────────
//   const loadReportDetail = async (reportId) => {
//     setReportLoading(true);
//     try {
//       const [r, i, f] = await Promise.all([
//         getReport(reportId),
//         getIssues(reportId),
//         getFrauds(reportId),
//       ]);
//       setActiveReport(r);
//       setIssues(i);
//       setFrauds(f);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setReportLoading(false);
//     }
//   };

//   // ── Loading spinner ────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-slate-50">
//         <div className="text-center">
//           <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-3" />
//           <p className="text-slate-500 text-sm">Loading your dashboard…</p>
//         </div>
//       </div>
//     );
//   }

//   // ── No reports yet ─────────────────────────────────────────────────────────
//   if (allReports.length === 0) {
//     return (
//       <div className="p-6 bg-slate-50 min-h-screen">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800">
//             Welcome, <span className="text-indigo-600">{user}</span>
//           </h1>
//           <p className="text-slate-500 mt-1">Your financial audit dashboard</p>
//         </div>
//         <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border-2 border-dashed border-slate-200 shadow-sm">
//           <p className="text-4xl mb-4">📂</p>
//           <p className="text-slate-700 font-semibold text-lg">No uploads yet</p>
//           <p className="text-slate-400 text-sm mt-1 mb-5">Upload a CSV to see your audit dashboard</p>
//           <button
//             onClick={() => navigate('/upload')}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-colors"
//           >
//             Upload CSV →
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ── Derived stats from active report ──────────────────────────────────────
//   const totalRows    = activeReport?.total_rows    ?? 0;
//   const totalIssues  = activeReport?.total_issues  ?? 0;
//   const fraudCount   = activeReport?.fraud_count   ?? 0;
//   const cleanRows    = Math.max(totalRows - totalIssues - fraudCount, 0);
//   const fraudPct     = totalRows > 0 ? ((fraudCount / totalRows) * 100).toFixed(1) : 0;

//   const issueCounts  = issues.reduce((acc, item) => {
//     acc[item.issue] = (acc[item.issue] || 0) + 1;
//     return acc;
//   }, {});

//   const statsData = {
//     totalRows, totalIssues, fraudCount, cleanRows, fraudPct,
//     missingPayments : issueCounts['Missing Payment'] || 0,
//     overpayments    : issueCounts['Overpayment']     || 0,
//     underpayments   : issueCounts['Underpayment']    || 0,
//   };

//   // ── Main Dashboard ─────────────────────────────────────────────────────────
//   return (
//     <div className="flex bg-slate-50 h-screen overflow-hidden">

//       {/* ── History panel (left column) ─────────────────────────────────── */}
//       <div className="w-64 shrink-0 bg-white border-r border-slate-100 flex flex-col">
//         <div className="p-4 border-b border-slate-100">
//           <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Upload History</p>
//         </div>
//         <div className="flex-1 overflow-y-auto">
//           {allReports.map((rep) => {
//             const isActive = activeReport?.report_id === rep.report_id;
//             const date = new Date(rep.created_at);
//             return (
//               <button
//                 key={rep.report_id}
//                 onClick={() => loadReportDetail(rep.report_id)}
//                 className={`w-full text-left px-4 py-3.5 border-b border-slate-50 transition-colors
//                   ${isActive ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
//               >
//                 <p className={`text-sm font-semibold ${isActive ? 'text-indigo-700' : 'text-slate-700'}`}>
//                   Report #{rep.report_id}
//                 </p>
//                 <p className="text-xs text-slate-400 mt-0.5">
//                   {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </p>
//                 <div className="flex gap-2 mt-1.5">
//                   <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
//                     {rep.total_rows} rows
//                   </span>
//                   {rep.fraud_count > 0 && (
//                     <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
//                       {rep.fraud_count} fraud
//                     </span>
//                   )}
//                   {rep.total_issues > 0 && (
//                     <span className="text-xs bg-amber-100 text-amber-600 px-1.5 py-0.5 rounded">
//                       {rep.total_issues} issues
//                     </span>
//                   )}
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//         <div className="p-3 border-t border-slate-100">
//           <button
//             onClick={() => navigate('/upload')}
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
//           >
//             + Upload New CSV
//           </button>
//         </div>
//       </div>

//       {/* ── Main content ────────────────────────────────────────────────── */}
//      <div className="flex-1 p-6 overflow-y-auto">

//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-2xl font-bold text-slate-800">
//             Welcome back, <span className="text-indigo-600">{user}</span>
//           </h1>
//           {activeReport && (
//             <p className="text-slate-500 text-sm mt-0.5">
//               Showing Report #{activeReport.report_id} — uploaded{' '}
//               {new Date(activeReport.created_at).toLocaleString()}
//             </p>
//           )}
//         </div>

//         {/* Report loading overlay */}
//         {reportLoading ? (
//           <div className="flex items-center justify-center h-64">
//             <div className="animate-spin w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full" />
//           </div>
//         ) : (
//           <>
//             <StatsCards data={statsData} />
// 
//             <div className="grid grid-cols-12 gap-6 mt-6">
//               <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//                 <ChartSection statsData={statsData} issueCounts={issueCounts} />
//               </div>
//               <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//                 <AlertsPanel statsData={statsData} issueCounts={issueCounts} />
//               </div>
//             </div>

//             <div className="mt-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
//               <TransactionTable issues={issues} frauds={frauds} />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
// src/pages/Dashboard.js

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../services/api';
import { listReports, getReport, getIssues, getFrauds } from '../services/reportService';
import StatsCards from '../components/StatsCards';
import ChartSection from '../components/ChartSection';
import AlertsPanel from '../components/AlertsPanel';
import TransactionTable from '../components/TransactionTable';

function Dashboard() {

  // ───────────────── STATE ─────────────────
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [allReports, setAllReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null);
  const [issues, setIssues] = useState([]);
  const [frauds, setFrauds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);


  // ───────────────── API CALLS ─────────────────
  const loadReportDetail = async (reportId) => {
    setReportLoading(true);
    try {
      const [r, i, f] = await Promise.all([
        getReport(reportId),
        getIssues(reportId),
        getFrauds(reportId),
      ]);
      setActiveReport(r);
      setIssues(i);
      setFrauds(f);
    } catch (err) {
      console.error(err);
    } finally {
      setReportLoading(false);
    }
  };


  // ───────────────── INITIAL LOAD ─────────────────
  useEffect(() => {
    const init = async () => {
      try {
        const [dashRes, reports] = await Promise.all([
          getDashboard(),
          listReports(),
        ]);

        setUser(dashRes.data.user);
        setAllReports(reports);

        if (reports.length > 0) {
          await loadReportDetail(reports[0].report_id);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);


  // ───────────────── DERIVED DATA ─────────────────
  const totalRows    = activeReport?.total_rows    ?? 0;
  const totalIssues  = activeReport?.total_issues  ?? 0;
  const fraudCount   = activeReport?.fraud_count   ?? 0;

  // ✅ FIX: Calculate cleanRows using unique affected rows (one row can have multiple issues)
  const affectedRows = new Set([
    ...issues.map(i => i.order_id),
    ...frauds.map(f => f.order_id),
  ]).size;
  const cleanRows = Math.max(totalRows - affectedRows, 0);
  const fraudPct  = totalRows > 0 ? ((fraudCount / totalRows) * 100).toFixed(1) : 0;

  const issueCounts = issues.reduce((acc, item) => {
    acc[item.issue] = (acc[item.issue] || 0) + 1;
    return acc;
  }, {});

  // ✅ Stats with refund issues added
  const statsData = {
    totalRows,
    totalIssues,
    fraudCount,
    cleanRows,
    fraudPct,
    missingPayments : issueCounts['Missing Payment'] || 0,
    overpayments    : issueCounts['Overpayment'] || 0,
    underpayments   : issueCounts['Underpayment'] || 0,
    refundIssues    : (issueCounts['Full Refund'] || 0) + (issueCounts['Partial Refund'] || 0),
  };

  // ✅ Merge issues and frauds into one combined array for better UX
  const combinedTransactions = [
    ...issues.map(i => ({ ...i, type: 'ISSUE', severity: 'warning' })),
    ...frauds.map(f => ({ ...f, type: 'FRAUD', severity: 'danger' })),
  ];


  // ───────────────── LOADING UI ─────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-3 shadow-sm" />
          <p className="text-slate-500 text-sm font-medium">Loading your dashboard…</p>
        </div>
      </div>
    );
  }


  // ───────────────── EMPTY STATE ─────────────────
  if (allReports.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome, <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">{user}</span>
          </h1>
          <p className="text-slate-500 mt-1">Your financial audit dashboard</p>
        </div>

        <div className="flex flex-col items-center justify-center h-96 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-slate-200 shadow-xl">
          <div className="text-5xl mb-4">📂</div>
          <p className="text-slate-700 font-semibold text-lg">No uploads yet</p>
          <p className="text-slate-400 text-sm mt-1 mb-6">Upload a CSV to see your audit dashboard</p>

          <button
            onClick={() => navigate('/upload')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl text-sm transition-all shadow-md hover:shadow-lg"
          >
            Upload CSV →
          </button>
        </div>
      </div>
    );
  }


  // ───────────────── MAIN UI ─────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">

      {/* LEFT PANEL */}
      <div className="w-72 shrink-0 bg-white/95 backdrop-blur-sm border-r border-slate-200 flex flex-col shadow-lg z-10">

        <div className="p-5 border-b border-slate-100">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Upload History
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {allReports.map((rep) => {
            const isActive = activeReport?.report_id === rep.report_id;
            const date = new Date(rep.created_at);

            return (
              <button
                key={rep.report_id}
                onClick={() => loadReportDetail(rep.report_id)}
                className={`w-full text-left px-5 py-4 border-b border-slate-50
                  ${isActive ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}`}
              >
                <p className="text-sm font-semibold">
  Report #{rep.report_number}
</p>

                <p className="text-xs text-slate-400 mt-1">
                  {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>

                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-slate-100 px-2 rounded">
                    {rep.total_rows} rows
                  </span>
                  {rep.fraud_count > 0 && (
                    <span className="text-xs bg-red-100 px-2 rounded">
                      {rep.fraud_count} fraud
                    </span>
                  )}
                  {rep.total_issues > 0 && (
                    <span className="text-xs bg-amber-100 px-2 rounded">
                      {rep.total_issues} issues
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={() => navigate('/upload')}
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            + Upload New CSV
          </button>
        </div>
      </div>


      {/* RIGHT PANEL */}
      <div className="flex-1 overflow-y-auto p-6">

        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user}
        </h1>

        {activeReport && (
          <p className="text-sm text-slate-500 mb-4">
            Report #{activeReport.report_number} — uploaded {new Date(activeReport.created_at).toLocaleString()}
          </p>
        )}

        {reportLoading ? (
          <div className="flex justify-center mt-10">
            <div className="animate-spin w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            <StatsCards data={statsData} />

            <div className="grid grid-cols-12 gap-6 mt-6">
              <div className="col-span-12 lg:col-span-8 bg-white p-5 rounded">
                <ChartSection statsData={statsData} issueCounts={issueCounts} />
              </div>

              <div className="col-span-12 lg:col-span-4 bg-white p-5 rounded">
                <AlertsPanel statsData={statsData} issueCounts={issueCounts} />
              </div>
            </div>

            <div className="mt-6 bg-white p-5 rounded">
              <TransactionTable transactions={combinedTransactions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;