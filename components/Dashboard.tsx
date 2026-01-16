import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Activity, Sun, AlertCircle, CheckCircle } from 'lucide-react';

/* ---------------- SAFE EMPTY DATA ---------------- */

const weeklyData = [
  { name: 'Mon', verified: 0, failed: 0 },
  { name: 'Tue', verified: 0, failed: 0 },
  { name: 'Wed', verified: 0, failed: 0 },
  { name: 'Thu', verified: 0, failed: 0 },
  { name: 'Fri', verified: 0, failed: 0 },
  { name: 'Sat', verified: 0, failed: 0 },
  { name: 'Sun', verified: 0, failed: 0 },
];

const pieData = [
  { name: 'Verified (Solar)', value: 0, color: '#22c55e' },
  { name: 'No Solar', value: 0, color: '#ef4444' },
  { name: 'Inconclusive', value: 0, color: '#f59e0b' },
];

/* ---------------- STATS CARD ---------------- */

const StatsCard = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: any;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className="p-2 bg-solar-50 rounded-lg">
        <Icon className="w-5 h-5 text-solar-600" />
      </div>
    </div>

    <div className="flex items-baseline">
      <span className="text-2xl font-bold text-slate-900">—</span>
      <span className="ml-2 text-sm text-slate-400">No data</span>
    </div>
  </div>
);

/* ---------------- DASHBOARD ---------------- */

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Audited" icon={Activity} />
        <StatsCard title="Confirmed Solar" icon={Sun} />
        <StatsCard title="Flagged Issues" icon={AlertCircle} />
        <StatsCard title="Pending Review" icon={CheckCircle} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">
            Weekly Verification Volume
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b' }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow:
                      '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  cursor={{ fill: '#f1f5f9' }}
                />
                <Bar
                  dataKey="verified"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="failed"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm text-slate-400 mt-2">
            No verification data available
          </p>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">
            Audit Distribution
          </h3>

          <div className="h-64 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm text-slate-500">
                Total
              </span>
              <span className="text-xl font-bold text-slate-900">
                —
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            {pieData.map((item) => (
              <div
                key={item.name}
                className="flex items-center text-sm text-slate-600"
              >
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
