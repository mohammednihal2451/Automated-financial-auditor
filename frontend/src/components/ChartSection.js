import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const ChartSection = ({ statsData, issueCounts }) => {
  const pieData = [
    { name: 'Clean',  value: statsData.cleanRows },
    { name: 'Issues', value: statsData.totalIssues },
    { name: 'Fraud',  value: statsData.fraudCount },
  ].filter(d => d.value > 0);

  const barData = Object.entries(issueCounts).map(([name, value]) => ({ name, value }));
  if (statsData.fraudCount > 0) barData.push({ name: 'Fraud', value: statsData.fraudCount });

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Report Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Donut — clean vs issues vs fraud */}
        <div>
          <p className="text-sm font-medium text-slate-500 mb-3">Overall Breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%"
                innerRadius={55} outerRadius={85} paddingAngle={4}>
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              <Legend iconType="circle" iconSize={10} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar — issue type breakdown */}
        <div>
          <p className="text-sm font-medium text-slate-500 mb-3">Issue Type Breakdown</p>
          {barData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
              No issues detected 🎉
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
};

export default ChartSection;