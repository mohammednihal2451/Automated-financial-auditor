// frontend/src/components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Automated Financial Auditor
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            AI-powered auditing system for e-commerce platforms that detects inconsistencies, prevents fraud, and generates real-time financial insights.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
           
            <a href="#features" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Learn More
            </a>
          </div>
        </div>

        {/* Stats cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-100 shadow-sm">
            <div className="text-3xl font-bold text-blue-600">100%</div>
            <div className="text-sm text-gray-600 mt-1">Transaction Accuracy</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-100 shadow-sm">
            <div className="text-3xl font-bold text-blue-600">80%</div>
            <div className="text-sm text-gray-600 mt-1">Reduction in Manual Effort</div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-100 shadow-sm">
            <div className="text-3xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-gray-600 mt-1">Real-time Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;