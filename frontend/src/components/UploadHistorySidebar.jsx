// // components/UploadHistorySidebar.jsx
// import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FileText,
//   Calendar,
//   Search,
//   X,
//   Filter,
//   ChevronDown,
//   ChevronUp,
//   Upload,
//   Inbox,
//   AlertTriangle,
//   TrendingUp,
// } from "lucide-react";
// import { formatDistanceToNow, format } from "date-fns";

// const ReportItem = ({ report, isActive, onClick }) => {
//   const date = new Date(report.created_at);
//   const relativeTime = formatDistanceToNow(date, { addSuffix: true });
//   const formattedDate = format(date, "MMM d, yyyy • h:mm a");

//   return (
//     <button
//       onClick={() => onClick(report.report_id)}
//       className={`
//         w-full text-left p-4 transition-all duration-200 border-b border-slate-100
//         ${
//           isActive
//             ? "bg-gradient-to-r from-indigo-50 to-white border-l-4 border-l-indigo-500 shadow-sm"
//             : "border-l-4 border-l-transparent hover:bg-slate-50"
//         }
//       `}
//     >
//       <div className="flex items-start justify-between gap-2">
//         <p
//           className={`text-sm font-semibold font-mono tracking-tight ${
//             isActive ? "text-indigo-700" : "text-slate-700"
//           }`}
//         >
//           #{report.report_number}
//         </p>
//         {isActive && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />}
//       </div>
//       <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
//         <Calendar size={12} />
//         <span title={formattedDate}>{relativeTime}</span>
//       </div>
//       <div className="flex flex-wrap gap-1.5 mt-2">
//         <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
//           <FileText size={10} /> {report.total_rows.toLocaleString()} rows
//         </span>
//         {report.fraud_count > 0 && (
//           <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
//             <AlertTriangle size={10} /> {report.fraud_count} fraud
//           </span>
//         )}
//         {report.total_issues > 0 && (
//           <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
//             <TrendingUp size={10} /> {report.total_issues} issues
//           </span>
//         )}
//       </div>
//     </button>
//   );
// };

// const UploadHistorySidebar = ({
//   allReports = [],
//   activeReport,
//   loadReportDetail,
//   isLoading = false,
// }) => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [showFilters, setShowFilters] = useState(false);
//   const [filterFraud, setFilterFraud] = useState(false);
//   const [filterIssues, setFilterIssues] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(20);

//   const filteredReports = useMemo(() => {
//     let filtered = [...allReports];
//     if (searchQuery.trim()) {
//       filtered = filtered.filter((rep) =>
//         rep.report_number.toString().toLowerCase().includes(searchQuery.trim().toLowerCase())
//       );
//     }
//     if (filterFraud) filtered = filtered.filter((rep) => rep.fraud_count > 0);
//     if (filterIssues) filtered = filtered.filter((rep) => rep.total_issues > 0);
//     filtered.sort((a, b) => {
//       const dateA = new Date(a.created_at).getTime();
//       const dateB = new Date(b.created_at).getTime();
//       return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
//     });
//     return filtered;
//   }, [allReports, searchQuery, filterFraud, filterIssues, sortOrder]);

//   const displayedReports = filteredReports.slice(0, visibleCount);
//   const hasMore = visibleCount < filteredReports.length;

//   if (isLoading) {
//     return (
//       <div className="w-80 shrink-0 bg-white border-r border-slate-100 flex flex-col">
//         <div className="p-4 border-b border-slate-100"><div className="h-5 bg-slate-200 rounded w-32 animate-pulse" /></div>
//         <div className="flex-1 overflow-y-auto space-y-1 p-2">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="p-4 border-b border-slate-100">
//               <div className="h-4 bg-slate-200 rounded w-28 animate-pulse" />
//               <div className="h-3 bg-slate-100 rounded w-24 mt-2 animate-pulse" />
//               <div className="flex gap-2 mt-3"><div className="h-5 bg-slate-100 rounded w-14 animate-pulse" /><div className="h-5 bg-slate-100 rounded w-14 animate-pulse" /></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (allReports.length === 0) {
//     return (
//       <div className="w-80 shrink-0 bg-white border-r border-slate-100 flex flex-col">
//         <div className="p-4 border-b border-slate-100"><p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Upload History</p></div>
//         <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
//           <Inbox size={48} className="text-slate-300 mb-3" />
//           <p className="text-slate-500 text-sm font-medium">No reports yet</p>
//           <p className="text-slate-400 text-xs mt-1">Upload your first CSV to start auditing</p>
//         </div>
//         <div className="p-3 border-t border-slate-100">
//           <button onClick={() => navigate("/upload")} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center gap-2">
//             <Upload size={16} /> Upload New CSV
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-80 shrink-0 bg-white border-r border-slate-100 flex flex-col shadow-sm">
//       <div className="p-4 border-b border-slate-100 space-y-3">
//         <div className="flex items-center justify-between">
//           <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Upload History</p>
//           <button onClick={() => setShowFilters(!showFilters)} className={`p-1.5 rounded-md transition-colors ${showFilters || filterFraud || filterIssues || searchQuery ? "text-indigo-600 bg-indigo-50" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}>
//             <Filter size={14} />
//           </button>
//         </div>
//         {showFilters && (
//           <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
//             <div className="relative">
//               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input type="text" placeholder="Search report #" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-8 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all" />
//               {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={12} /></button>}
//             </div>
//             <div className="flex flex-wrap gap-2 items-center">
//               <button onClick={() => setFilterFraud(!filterFraud)} className={`text-xs px-2 py-1 rounded-full transition-colors ${filterFraud ? "bg-red-100 text-red-700 border-red-200" : "bg-slate-100 text-slate-600 border-slate-200"} border`}>Has fraud</button>
//               <button onClick={() => setFilterIssues(!filterIssues)} className={`text-xs px-2 py-1 rounded-full transition-colors ${filterIssues ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-slate-100 text-slate-600 border-slate-200"} border`}>Has issues</button>
//               <div className="flex items-center gap-1 ml-auto">
//                 <button onClick={() => setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 px-2 py-1 rounded">
//                   {sortOrder === "desc" ? "Newest" : "Oldest"} {sortOrder === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
//                 </button>
//               </div>
//             </div>
//             {(filterFraud || filterIssues || searchQuery) && <button onClick={() => { setSearchQuery(""); setFilterFraud(false); setFilterIssues(false); }} className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1"><X size={12} /> Clear all filters</button>}
//           </div>
//         )}
//       </div>
//       <div className="flex-1 overflow-y-auto overscroll-contain">
//         {displayedReports.length === 0 ? <div className="p-8 text-center text-slate-400 text-sm">No reports match</div> : <>
//           {displayedReports.map((report) => <ReportItem key={report.report_id} report={report} isActive={activeReport?.report_id === report.report_id} onClick={loadReportDetail} />)}
//           {hasMore && <button onClick={() => setVisibleCount((prev) => prev + 20)} className="w-full text-center text-sm text-indigo-600 hover:text-indigo-800 py-3 bg-slate-50 hover:bg-slate-100 transition-colors font-medium">Load more ({filteredReports.length - visibleCount} remaining)</button>}
//         </>}
//       </div>
//       <div className="p-3 border-t border-slate-100 bg-white/95 backdrop-blur-sm">
//         <button onClick={() => navigate("/upload")} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2.5 rounded-lg transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 group">
//           <Upload size={16} className="group-hover:scale-110 transition-transform" /> Upload New CSV
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UploadHistorySidebar;