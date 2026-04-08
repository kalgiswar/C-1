import { FileText, TrendingUp, Users, AlertTriangle, Download } from 'lucide-react';

interface ReportsPageProps {
  theme: 'dark' | 'light';
}

const reportData = [
  { label: 'Peak Crowd Count', value: '12,847', change: '+4.2%', up: true },
  { label: 'Avg. Density (per zone)', value: '1,070', change: '-1.8%', up: false },
  { label: 'Total Alerts Triggered', value: '34', change: '+11.1%', up: true },
  { label: 'Incidents Resolved', value: '31', change: '+6.7%', up: true },
];

const eventLog = [
  { time: '09:12', event: 'High crowd density — Gate A', type: 'danger' },
  { time: '09:35', event: 'Route Beta congestion alert issued', type: 'warning' },
  { time: '10:02', event: 'AI path rerouting activated — Zone C', type: 'info' },
  { time: '10:18', event: 'Crowd level normalised — South Gate', type: 'success' },
  { time: '11:00', event: 'Stampede risk flagged — VIP Area', type: 'danger' },
  { time: '11:14', event: 'Emergency response dispatched', type: 'warning' },
  { time: '12:00', event: 'All zones green — steady state', type: 'success' },
];

const typeStyles = {
  danger: 'bg-red-500/10 border-red-500 text-red-400',
  warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-400',
  info: 'bg-blue-500/10 border-blue-500 text-blue-400',
  success: 'bg-green-500/10 border-green-500 text-green-400',
};

export function ReportsPage({ theme }: ReportsPageProps) {
  const card = theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const heading = theme === 'dark' ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'text-blue-700';
  const text = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const sub = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const rowBg = theme === 'dark' ? 'border-slate-700' : 'border-gray-100';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold tracking-wider flex items-center gap-2 ${heading}`}>
          <FileText size={20} />
          ANALYTICS &amp; REPORTS
        </h2>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
          <Download size={15} />
          Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {reportData.map(({ label, value, change, up }) => (
          <div key={label} className={`border rounded-xl p-5 ${card}`}>
            <p className={`text-sm mb-1 ${sub}`}>{label}</p>
            <p className={`text-2xl font-bold ${text}`}>{value}</p>
            <div className={`flex items-center gap-1 mt-1 text-sm font-medium ${up ? 'text-green-400' : 'text-red-400'}`}>
              <TrendingUp size={14} className={up ? '' : 'rotate-180'} />
              {change} vs last event
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Zone summary */}
        <div className={`border rounded-xl p-6 ${card}`}>
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-indigo-400" />
            <h3 className={`text-lg font-semibold ${text}`}>Zone Crowd Summary</h3>
          </div>
          <div className="space-y-3">
            {[
              { zone: 'Zone A', count: 2100, pct: 84 },
              { zone: 'Zone B', count: 1540, pct: 62 },
              { zone: 'Zone C', count: 3200, pct: 100 },
              { zone: 'Zone D', count: 980, pct: 39 },
              { zone: 'Zone E', count: 1650, pct: 66 },
              { zone: 'Zone F', count: 720, pct: 29 },
            ].map(({ zone, count, pct }) => (
              <div key={zone}>
                <div className="flex justify-between text-sm mb-1">
                  <span className={text}>{zone}</span>
                  <span className={sub}>{count.toLocaleString()} people · {pct}%</span>
                </div>
                <div className={`h-2 rounded-full w-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
                  <div
                    className={`h-2 rounded-full ${pct >= 80 ? 'bg-red-500' : pct >= 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event log */}
        <div className={`border rounded-xl p-6 ${card}`}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-indigo-400" />
            <h3 className={`text-lg font-semibold ${text}`}>Event Log</h3>
          </div>
          <div className="space-y-2">
            {eventLog.map(({ time, event, type }) => (
              <div key={time + event} className={`border-l-4 px-3 py-2 rounded text-sm ${typeStyles[type as keyof typeof typeStyles]}`}>
                <span className="font-mono font-semibold mr-2">{time}</span>
                {event}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
