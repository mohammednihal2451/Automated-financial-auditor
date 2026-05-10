import React from 'react';

const AlertsPanel = ({ statsData, issueCounts }) => {
  const alerts = [];

  if (statsData.fraudCount > 0)
    alerts.push({ msg: `${statsData.fraudCount} fraud transaction(s) — ${statsData.fraudPct}% of total`, severity: 'high', icon: '🚨' });

  if (statsData.missingPayments > 0)
    alerts.push({ msg: `${statsData.missingPayments} missing payment(s) detected`, severity: 'high', icon: '💸' });

  if (statsData.overpayments > 0)
    alerts.push({ msg: `${statsData.overpayments} overpayment(s) found`, severity: 'medium', icon: '📈' });

  if (statsData.underpayments > 0)
    alerts.push({ msg: `${statsData.underpayments} underpayment(s) found`, severity: 'medium', icon: '📉' });

  // Any other issue types not already covered
  Object.entries(issueCounts).forEach(([type, count]) => {
    const covered = ['Missing Payment', 'Overpayment', 'Underpayment'];
    if (!covered.includes(type))
      alerts.push({ msg: `${count}x "${type}"`, severity: 'low', icon: '⚠️' });
  });

  if (alerts.length === 0)
    alerts.push({ msg: 'No issues detected. All transactions look clean!', severity: 'low', icon: '✅' });

  const style = {
    high:   'border-red-400 bg-red-50 text-red-700',
    medium: 'border-amber-400 bg-amber-50 text-amber-700',
    low:    'border-emerald-400 bg-emerald-50 text-emerald-700',
  };
  const badge = {
    high:   'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low:    'bg-emerald-100 text-emerald-700',
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">⚠️ Alerts & Warnings</h3>
      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className={`border-l-4 p-3 rounded-r-lg ${style[a.severity]}`}>
            <div className="flex justify-between items-start gap-2">
              <p className="text-sm">{a.icon} {a.msg}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${badge[a.severity]}`}>
                {a.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;