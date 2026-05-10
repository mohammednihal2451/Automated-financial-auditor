// import React from 'react';
// import { FaShoppingCart, FaDollarSign, FaUndoAlt, FaExclamationTriangle } from 'react-icons/fa';

// const StatsCards = ({ data }) => {
//   const cards = [
//     { title: "Total Orders", value: data.totalOrders, change: data.ordersChange, icon: FaShoppingCart, color: "blue" },
//     { title: "Revenue", value: `$${data.totalRevenue.toLocaleString()}`, change: data.revenueChange, icon: FaDollarSign, color: "green" },
//     { title: "Refunds", value: `$${data.totalRefunds.toLocaleString()}`, icon: FaUndoAlt, color: "yellow" },
//     { title: "Anomalies Detected", value: data.anomalies, icon: FaExclamationTriangle, color: "red" },
//   ];

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {cards.map((card, idx) => (
//         <div key={idx} className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
//           <div>
//             <p className="text-gray-500 text-sm">{card.title}</p>
//             <p className="text-2xl font-bold mt-1">{card.value}</p>
//             {card.change && (
//               <p className={`text-xs mt-1 ${card.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                 {card.change >= 0 ? '↑' : '↓'} {Math.abs(card.change)}% from last week
//               </p>
//             )}
//           </div>
//           <div className={`p-3 rounded-full bg-${card.color}-100 text-${card.color}-600`}>
//             <card.icon size={24} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCards;

import React from 'react';

const Card = ({ title, value, sub, icon, accent }) => {
  const accents = {
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
    green:  { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    red:    { bg: 'bg-red-50', text: 'text-red-600' },
    amber:  { bg: 'bg-amber-50', text: 'text-amber-600' },
    slate:  { bg: 'bg-slate-100', text: 'text-slate-700' },
  };
  const c = accents[accent] || accents.indigo;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
      <div className={`${c.bg} p-3 rounded-xl text-2xl`}>{icon}</div>
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</p>
        <p className={`text-2xl font-bold ${c.text} mt-0.5`}>{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
};

const StatsCards = ({ data }) => {
  const cards = [
    { title: 'Total Rows Uploaded',  value: data.totalRows,        icon: '📋', accent: 'indigo' },
    { title: 'Clean Transactions',   value: data.cleanRows,        icon: '✅', accent: 'green'  },
    { title: 'Issues Detected',      value: data.totalIssues,      icon: '⚠️', accent: 'amber'  },
    { title: 'Fraud Cases',          value: data.fraudCount,       icon: '🚨', accent: 'red',
      sub: `${data.fraudPct}% of total rows` },
    { title: 'Missing Payments',     value: data.missingPayments,  icon: '💸', accent: 'amber'  },
    { title: 'Overpayments',         value: data.overpayments,     icon: '📈', accent: 'amber'  },
    { title: 'Underpayments',        value: data.underpayments,    icon: '📉', accent: 'slate'  },
    { title: 'Refund Issues',        value: data.refundIssues,     icon: '🔄', accent: 'indigo' },
    { title: 'Fraud Rate',           value: `${data.fraudPct}%`,   icon: '📊', accent: 'red'    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map((card, i) => <Card key={i} {...card} />)}
    </div>
  );
};

export default StatsCards;