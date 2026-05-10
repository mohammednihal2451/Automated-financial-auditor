// frontend/src/components/ProblemObjectives.js
import React from 'react';

const ProblemObjectives = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: The Challenge */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">The Challenge</h2>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <p className="text-slate-700 leading-relaxed">
                  E-commerce platforms face massive daily transaction volumes, leading to time-consuming manual audits, 
                  duplicate or missing payments, refund mismatches, and lack of real-time financial oversight.
                </p>
              </div>
            </div>
            <ul className="space-y-4">
              {[
                "High volume of daily transactions",
                "Manual auditing is error‑prone & inefficient",
                "Refund and payment mismatches"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-100 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-slate-600 text-sm md:text-base">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Our Objectives */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Our Objectives</h2>
            <div className="space-y-5">
              {[
                { title: "Automate Financial Auditing", desc: "Design a system to track orders, payments, and refunds automatically.", icon: "⚡", gradient: "from-indigo-500 to-blue-500" },
                { title: "Detect Inconsistencies & Fraud", desc: "Identify missing payments, duplicate transactions, and suspicious patterns.", icon: "🛡️", gradient: "from-emerald-500 to-teal-500" },
                { title: "Generate Automated Reports", desc: "Financial summaries & analysis with actionable insights.", icon: "📊", gradient: "from-amber-500 to-orange-500" }
              ].map((obj, idx) => (
                <div key={idx} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${obj.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300`} />
                  <div className="relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{obj.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">{obj.title}</h3>
                        <p className="text-slate-500 text-sm mt-1">{obj.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemObjectives;