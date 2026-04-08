import { useState } from 'react';
import { AlertTriangle, Check, X, Clock, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Incident {
  id: string;
  type: string;
  description: string;
  location: string;
  time: string;
  severity: 'critical' | 'high' | 'medium';
  peopleAffected: number;
  status: 'pending' | 'approved' | 'rejected';
}

interface NotificationPanelProps {
  theme: 'dark' | 'light';
  currentRole: string;
}

export function NotificationPanel({ theme, currentRole }: NotificationPanelProps) {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: '1',
      type: 'Medical Emergency',
      description: 'Person collapsed, requires immediate medical attention',
      location: 'Zone C - Stage Area',
      time: '1 min ago',
      severity: 'critical',
      peopleAffected: 1,
      status: 'pending',
    },
    {
      id: '2',
      type: 'Stampede Risk',
      description: 'Rapid crowd surge detected near main exit',
      location: 'Zone A - Gate Entrance',
      time: '3 min ago',
      severity: 'critical',
      peopleAffected: 150,
      status: 'pending',
    },
    {
      id: '3',
      type: 'Fight/Altercation',
      description: 'Physical altercation between attendees',
      location: 'Zone E - Food Court',
      time: '8 min ago',
      severity: 'high',
      peopleAffected: 5,
      status: 'pending',
    },
    {
      id: '4',
      type: 'Lost Child',
      description: 'Child separated from parents, currently with security',
      location: 'Zone B - Information Desk',
      time: '15 min ago',
      severity: 'medium',
      peopleAffected: 1,
      status: 'pending',
    },
  ]);

  const handleApprove = (incident: Incident) => {
    setIncidents(prev =>
      prev.map(inc => (inc.id === incident.id ? { ...inc, status: 'approved' } : inc))
    );

    // Show success notification based on incident type
    if (incident.type === 'Medical Emergency') {
      toast.success('✅ Ambulance Notified', {
        description: `Emergency medical services dispatched to ${incident.location}`,
      });
    } else if (incident.type === 'Stampede Risk' || incident.type === 'Fight/Altercation') {
      toast.success('✅ Police Notified', {
        description: `Police authorities dispatched to ${incident.location}`,
      });
    } else {
      toast.success('✅ Authorities Notified', {
        description: `Response team dispatched to ${incident.location}`,
      });
    }
  };

  const handleReject = (incident: Incident) => {
    setIncidents(prev =>
      prev.map(inc => (inc.id === incident.id ? { ...inc, status: 'rejected' } : inc))
    );
    toast.error('❌ Incident Rejected', {
      description: `Incident at ${incident.location} marked as false alarm`,
    });
  };

  const severityColors = {
    critical: 'border-red-500 bg-red-500/10',
    high: 'border-orange-500 bg-orange-500/10',
    medium: 'border-yellow-500 bg-yellow-500/10',
  };

  const severityTextColors = {
    critical: 'text-red-500',
    high: 'text-orange-500',
    medium: 'text-yellow-500',
  };

  // Role-based permissions
  const canApprove = currentRole === 'Organizer' || currentRole === 'Police';

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
      } border rounded-xl p-6`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Incident Notifications
        </h3>
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {incidents.filter(i => i.status === 'pending' && i.severity === 'critical').length} CRITICAL
          </span>
          <span className={`${theme === 'dark' ? 'bg-slate-800 text-gray-300' : 'bg-gray-200 text-gray-700'} text-xs font-semibold px-2 py-1 rounded-full`}>
            {incidents.filter(i => i.status === 'pending').length} Pending
          </span>
        </div>
      </div>

      {!canApprove && (
        <div className={`mb-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
            ℹ️ Volunteer View: You can view incidents but cannot approve/reject them.
          </p>
        </div>
      )}

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`border-l-4 ${severityColors[incident.severity]} p-4 rounded ${
              incident.status !== 'pending' ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <AlertTriangle className={severityTextColors[incident.severity]} size={22} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {incident.type}
                    </p>
                    {incident.status !== 'pending' && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          incident.status === 'approved'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {incident.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {incident.description}
                  </p>
                  <div className={`flex flex-wrap gap-x-4 gap-y-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{incident.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{incident.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{incident.peopleAffected} affected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {incident.status === 'pending' && canApprove && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-700/50">
                <button
                  onClick={() => handleApprove(incident)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Check size={18} />
                  Allow & Notify {incident.type === 'Medical Emergency' ? 'Ambulance' : 'Police'}
                </button>
                <button
                  onClick={() => handleReject(incident)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <X size={18} />
                  Reject
                </button>
              </div>
            )}

            {incident.status === 'pending' && !canApprove && (
              <div className={`mt-3 pt-3 border-t ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'}`}>
                <p className={`text-xs text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                  Awaiting organizer/police approval
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
