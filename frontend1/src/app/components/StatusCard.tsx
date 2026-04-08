import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  status?: 'safe' | 'warning' | 'danger';
  theme: 'dark' | 'light';
}

export function StatusCard({ title, value, icon: Icon, status = 'safe', theme }: StatusCardProps) {
  const statusColors = {
    safe: 'text-green-500',
    warning: 'text-yellow-500',
    danger: 'text-red-500',
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
      } border rounded-xl p-6`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
          {title}
        </span>
        <Icon className={statusColors[status]} size={24} />
      </div>
      <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </div>
    </div>
  );
}
