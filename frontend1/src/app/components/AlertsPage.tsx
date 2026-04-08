import { useEffect, useState } from 'react';
import { AlertTriangle, Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface BackendSession {
  session_id: string;
  description: string;
  camera_id: string;
  created_at: string;
  severity: string;
  status: string;
  video_url?: string;
  confidence?: string;
}

interface AlertsPageProps {
  theme: 'dark' | 'light';
}

export function AlertsPage({ theme }: AlertsPageProps) {
  const [alerts, setAlerts] = useState<BackendSession[]>([]);

  const fetchAlerts = async () => {
    try {
      const res = await fetch('http://localhost:8002/sessions');
      if (res.ok) {
        const data = await res.json();
        setAlerts(data.reverse()); // latest first
      }
    } catch (err) {
      console.error('Failed to fetch alerts', err);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const intId = setInterval(fetchAlerts, 5000);
    return () => clearInterval(intId);
  }, []);

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`http://localhost:8002/session/${id}/${action}`, { method: 'POST' });
      if (res.ok) {
        toast.success(`Alert ${action}d successfully`);
        fetchAlerts(); // Refresh immediately
      } else {
        toast.error(`Failed to ${action} alert`);
      }
    } catch (err) {
      toast.error(`Failed to ${action} alert`);
    }
  };

  const card = theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const heading = theme === 'dark' ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'text-blue-700';
  const text = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const sub = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  const pending = alerts.filter((a) => a.status === 'pending');
  const resolved = alerts.filter((a) => a.status !== 'pending');

  const severityBorder = (sev: string) => {
    if (sev === 'High' || sev === 'Critical') return 'border-red-500 bg-red-500/10';
    if (sev === 'Medium') return 'border-yellow-500 bg-yellow-500/10';
    return 'border-green-500 bg-green-500/10';
  };

  const renderAlert = (alert: BackendSession) => (
    <div key={alert.session_id} className={`border-l-4 ${severityBorder(alert.severity)} p-4 rounded-lg flex flex-col gap-3`}>
      <div className="flex items-start gap-3">
        {alert.status === 'approved' ? <CheckCircle className="text-green-500 shrink-0" size={20} /> :
         alert.status === 'rejected' ? <XCircle className="text-gray-500 shrink-0" size={20} /> :
         <AlertTriangle className={`text-yellow-500 shrink-0`} size={20} />}
        
        <div className="flex-1">
          <p className={`font-medium ${text}`}>{alert.description || 'Unknown Alert'}</p>
          <div className={`flex items-center gap-4 mt-2 text-sm ${sub}`}>
            <div className="flex items-center gap-1"><MapPin size={13} /><span>{alert.camera_id}</span></div>
            <div className="flex items-center gap-1"><Clock size={13} /><span>{new Date(alert.created_at).toLocaleString() || 'Just now'}</span></div>
          </div>
          {alert.confidence && <p className={`mt-1 text-xs font-mono font-bold ${sub}`}>AI Confidence: {alert.confidence}</p>}
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${
             (alert.severity === 'High' || alert.severity === 'Critical') ? 'bg-red-500 text-white' :
             alert.severity === 'Medium' ? 'bg-yellow-500 text-white' :
             'bg-green-500 text-white'
           }`}>{alert.severity || 'Low'}</span>
           
           <span className={`text-[10px] font-bold uppercase tracking-widest ${alert.status === 'pending' ? 'text-yellow-500' : alert.status === 'approved' ? 'text-green-500' : 'text-gray-500'}`}>{alert.status}</span>
        </div>
      </div>
      
      {/* Video Preview */}
      {alert.video_url && (
         <div className="mt-2 w-full max-w-sm rounded overflow-hidden border border-white/10">
            <video src={alert.video_url} controls className="w-full h-auto max-h-48 bg-black object-contain" />
         </div>
      )}

      {/* Action Buttons for Pending */}
      {alert.status === 'pending' && (
         <div className="flex gap-3 mt-3">
            <button
               onClick={() => handleAction(alert.session_id, 'approve')}
               className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded transition-colors"
            >
               Approve (Send WhatsApp)
            </button>
            <button
               onClick={() => handleAction(alert.session_id, 'reject')}
               className="bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded transition-colors"
            >
               Reject (False Alarm)
            </button>
         </div>
      )}
    </div>
  );

  return (
    <div>
      <h2 className={`text-xl font-bold mb-6 tracking-wider flex items-center gap-2 ${heading}`}>
        <AlertTriangle size={20} />
        ALERTS &amp; INCIDENTS
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Active Alerts */}
        <div className={`border rounded-xl p-6 ${card}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${text}`}>Pending Approval</h3>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{pending.length}</span>
          </div>
          <div className="space-y-3">
             {pending.length === 0 ? <p className={sub}>No pending alerts.</p> : pending.map(renderAlert)}
          </div>
        </div>

        {/* Resolved Alerts */}
        <div className={`border rounded-xl p-6 ${card}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${text}`}>Resolved History</h3>
            <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">{resolved.length}</span>
          </div>
          <div className="space-y-3">
             {resolved.length === 0 ? <p className={sub}>No resolved alerts.</p> : resolved.map(renderAlert)}
          </div>
        </div>
      </div>
    </div>
  );
}
