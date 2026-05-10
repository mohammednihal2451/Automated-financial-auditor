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