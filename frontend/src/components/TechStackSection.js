// frontend/src/components/TechStackSection.js
import React from 'react';

const technologies = [
  { name: "Python", color: "bg-blue-100 text-blue-700" },
  { name: "Django", color: "bg-emerald-100 text-emerald-700" },
  { name: "React", color: "bg-sky-100 text-sky-700" },
  { name: "Tailwind CSS", color: "bg-indigo-100 text-indigo-700" },
  { name: "Pandas", color: "bg-purple-100 text-purple-700" },
  { name: "NumPy", color: "bg-amber-100 text-amber-700" },
  { name: "Scikit-learn", color: "bg-rose-100 text-rose-700" },
  { name: "Django REST Framework", color: "bg-slate-100 text-slate-700" },
];

const TechStackSection = () => {
  return (
    <section id="tech-stack" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Technology Stack</h2>
          <p className="mt-4 text-xl text-slate-500">Modern tools for performance and reliability</p>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mt-4 rounded-full" />
        </div>
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {technologies.map((tech) => (
            <span key={tech.name} className={`px-5 py-2.5 ${tech.color} rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-default`}>
              {tech.name}
            </span>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 text-slate-400 text-sm">
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;