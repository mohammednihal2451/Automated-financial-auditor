export const dashboardData = {
  totalOrders: 1247,
  totalRevenue: 89450,
  totalRefunds: 3240,
  anomalies: 8,
  revenueChange: +12.5,
  ordersChange: +5.2,
};

export const transactionData = [
  { id: 1, orderId: "ORD-1001", amount: 249.99, status: "Completed", type: "Payment", date: "2026-04-20" },
  { id: 2, orderId: "ORD-1002", amount: 59.99, status: "Pending", type: "Payment", date: "2026-04-20" },
  { id: 3, orderId: "ORD-1003", amount: 129.99, status: "Refunded", type: "Refund", date: "2026-04-19" },
  { id: 4, orderId: "ORD-1004", amount: 499.99, status: "Completed", type: "Payment", date: "2026-04-19" },
  { id: 5, orderId: "ORD-1005", amount: 89.99, status: "Failed", type: "Payment", date: "2026-04-18" },
  { id: 6, orderId: "ORD-1006", amount: 199.99, status: "Completed", type: "Payment", date: "2026-04-18" },
  { id: 7, orderId: "ORD-1007", amount: 34.99, status: "Refunded", type: "Refund", date: "2026-04-17" },
];

export const anomalyAlerts = [
  { id: 1, message: "Large transaction detected: $4,999.99 from ORD-1023", severity: "high", time: "2 hours ago" },
  { id: 2, message: "Duplicate payment for order ORD-0892", severity: "medium", time: "5 hours ago" },
  { id: 3, message: "Refund amount exceeds order value for ORD-1104", severity: "high", time: "1 day ago" },
  { id: 4, message: "Unusual refund pattern from user john@example.com", severity: "low", time: "2 days ago" },
];

export const chartData = [
  { name: "Mon", orders: 42, revenue: 3200 },
  { name: "Tue", orders: 38, revenue: 2900 },
  { name: "Wed", orders: 45, revenue: 3800 },
  { name: "Thu", orders: 52, revenue: 4100 },
  { name: "Fri", orders: 48, revenue: 3950 },
  { name: "Sat", orders: 35, revenue: 2800 },
  { name: "Sun", orders: 30, revenue: 2500 },
];