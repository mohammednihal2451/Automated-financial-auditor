// frontend/src/components/FeaturesSection.js
import React, { useState } from 'react';

const features = [
  { title: "Transaction Management", desc: "Structured storage of orders, payments, and refunds with complete tracking.", icon: "💰", gradient: "from-indigo-500 to-indigo-400" },
  { title: "Error Detection", desc: "Identifies missing payments, duplicate transactions, and refund amount mismatches.", icon: "⚠️", gradient: "from-amber-500 to-orange-400" },
  { title: "Fraud Detection", desc: "Flags unusually large transactions and abnormal refund patterns using ML.", icon: "🛡️", gradient: "from-red-500 to-rose-400" },
  { title: "Automated Reporting", desc: "Generates summaries instantly.", icon: "📊", gradient: "from-emerald-500 to-green-400" },
  { title: "Real-time Dashboard", desc: "Visual financial insights with alerts, charts, and anomaly warnings.", icon: "📈", gradient: "from-sky-500 to-blue-400" },
  { title: "Rule-based Auditing", desc: "Predefined and custom rules for consistent financial validation.", icon: "⚙️", gradient: "from-slate-500 to-gray-400" },
];

const FeaturesSection = () => {
  const [bouncingIndex, setBouncingIndex] = useState(null);

  const handleCardClick = (idx) => {
    setBouncingIndex(idx);
    setTimeout(() => setBouncingIndex(null), 300); // Remove bounce after 300ms
  };

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Powerful Features</h2>
          <p className="mt-4 text-xl text-slate-500">Comprehensive auditing tools for modern e-commerce</p>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onClick={() => handleCardClick(idx)}
              className={`
                group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl 
                transition-all duration-300 border border-slate-100 hover:border-indigo-200 
                cursor-pointer
                ${bouncingIndex === idx ? 'animate-bounce-simple' : ''}
              `}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-t-2xl transition-all duration-300 group-hover:h-1.5`} />
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate-800">{feature.title}</h3>
              <p className="mt-2 text-slate-500 leading-relaxed">{feature.desc}</p>
              <div className="mt-4 flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Learn more</span>
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline CSS for the bounce animation */}
      <style jsx>{`
        @keyframes bounce-simple {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-bounce-simple {
          animation: bounce-simple 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;