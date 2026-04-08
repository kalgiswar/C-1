import { useEffect, useState } from 'react';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

interface BackendSession {
  session_id: string;
  description: string;
  camera_id: string;
  created_at: string;
  severity: string;
  status: string;
}

interface AlertPanelProps {
  theme: 'dark' | 'light';
}

export function AlertPanel({ theme }: AlertPanelProps) {
  const [alerts, setAlerts] = useState<BackendSession[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch('http://localhost:8002/sessions');
        if (res.ok) {
          const data: BackendSession[] = await res.json();
          // Filter out rejected or only show recent, for now show all pending/approved
          setAlerts(data.filter(a => a.status === 'pending' || a.status === 'approved').reverse().slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to fetch alerts', err);
      }
    };

    fetchAlerts();
    const intId = setInterval(fetchAlerts, 3000);
    return () => clearInterval(intId);
  }, []);

  const severityMapping: Record<string, 'high' | 'medium' | 'low'> = {
    Critical: 'high',
    High: 'high',
    Medium: 'medium',
    Low: 'low',
    Normal: 'low',
  };

  const getSeverity = (s: string) => severityMapping[s] || 'low';

  const severityColors = {
    high: 'border-red-500 bg-red-500/10',
    medium: 'border-yellow-500 bg-yellow-500/10',
    low: 'border-green-500 bg-green-500/10',
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
      } border rounded-xl p-6`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Recent Alerts
        </h3>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {alerts.filter(a => getSeverity(a.severity) === 'high').length} HIGH
        </span>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 && (
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>No active alerts.</p>
        )}
        {alerts.map((alert) => {
          const sev = getSeverity(alert.severity);
          return (
          <div
            key={alert.session_id}
            className={`border-l-4 ${severityColors[sev]} p-3 rounded`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                className={
                  sev === 'high'
                    ? 'text-red-500'
                    : sev === 'medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }
                size={20}
              />
              <div className="flex-1">
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {alert.description || alert.severity + " Alert"}
                </p>
                <div className={`flex items-center gap-4 mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{alert.camera_id}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{new Date(alert.created_at).toLocaleTimeString() || 'Just now'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
