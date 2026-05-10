// import React from 'react';
// import { transactionData } from '../data/dummyData';

// const TransactionTable = () => {
//   const getStatusBadge = (status) => {
//     const colors = {
//       Completed: 'bg-green-100 text-green-800',
//       Pending: 'bg-yellow-100 text-yellow-800',
//       Refunded: 'bg-purple-100 text-purple-800',
//       Failed: 'bg-red-100 text-red-800',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//               <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {transactionData.map((tx) => (
//               <tr key={tx.id}>
//                 <td className="px-4 py-3 text-sm text-gray-900">{tx.orderId}</td>
//                 <td className="px-4 py-3 text-sm text-gray-500">{tx.date}</td>
//                 <td className="px-4 py-3 text-sm text-gray-500">{tx.type}</td>
//                 <td className="px-4 py-3 text-sm font-medium">${tx.amount.toFixed(2)}</td>
//                 <td className="px-4 py-3">
//                   <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(tx.status)}`}>
//                     {tx.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TransactionTable;
//C:\Users\HP\Desktop\Automated Financial Auditor\frontend\src\components\TransactionTable.js
import React from 'react';

const TransactionTable = ({ transactions = [] }) => {
  // Support both old props (issues/frauds) and new merged transactions prop
  const hasTransactions = transactions && transactions.length > 0;

  const getTypeIndicator = (type) => {
    if (type === 'FRAUD') return { emoji: '🔴', label: 'FRAUD', style: 'bg-red-100 text-red-700' };
    if (type === 'ISSUE') return { emoji: '🟡', label: 'ISSUE', style: 'bg-amber-100 text-amber-700' };
    return { emoji: '⚪', label: 'OTHER', style: 'bg-slate-100 text-slate-700' };
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        🔍 Transaction Details ({transactions.length})
      </h3>

      <div className="overflow-x-auto max-h-96 overflow-y-auto border border-slate-200 rounded-lg">
        {!hasTransactions ? (
          <p className="text-center text-slate-400 text-sm py-10">No issues or fraud cases found in this report.</p>
        ) : (
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((item, i) => {
                const indicator = getTypeIndicator(item.type);
                return (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-400">{i + 1}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full font-medium ${indicator.style}`}>
                        {indicator.emoji} {indicator.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-slate-800">#{item.order_id}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {item.issue || item.reason || 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;