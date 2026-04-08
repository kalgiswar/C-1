import { Battery, Wifi, WifiOff, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SystemPanelProps {
  theme: 'dark' | 'light';
}

export function SystemPanel({ theme }: SystemPanelProps) {
  const [waStatus, setWaStatus] = useState<string>('loading');
  const [waMessage, setWaMessage] = useState<string>('Checking WhatsApp...');

  useEffect(() => {
    const checkWa = async () => {
      try {
        const res = await fetch('http://localhost:8003/status');
        if (res.ok) {
          const data = await res.json();
          setWaStatus(data.status);
          setWaMessage(data.message);
        }
      } catch (err) {
        setWaStatus('error');
        setWaMessage('Messenger Offline');
      }
    };
    checkWa();
    const id = setInterval(checkWa, 3000);
    return () => clearInterval(id);
  }, []);

  const droneStatus = [
    { id: 'Drone 1', battery: 85, charging: false, online: true },
    { id: 'Drone 2', battery: 62, charging: false, online: true },
    { id: 'Drone 3', battery: 34, charging: true, online: true },
    { id: 'Drone 4', battery: 91, charging: false, online: false },
  ];

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'text-green-500';
    if (level > 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
      } border rounded-xl p-6 h-full`}
    >
      <h3 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        System Status
      </h3>

      <div className="space-y-4">
        {droneStatus.map((drone) => (
          <div
            key={drone.id}
            className={`${
              theme === 'dark' ? 'bg-slate-800' : 'bg-gray-50'
            } p-4 rounded-lg`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {drone.id}
              </span>
              {drone.online ? (
                <Wifi className="text-green-500" size={16} />
              ) : (
                <WifiOff className="text-red-500" size={16} />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className={getBatteryColor(drone.battery)} size={16} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Battery
                  </span>
                </div>
                <span className={`text-sm font-semibold ${getBatteryColor(drone.battery)}`}>
                  {drone.battery}%
                </span>
              </div>

              <div className={`${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'} h-2 rounded-full overflow-hidden`}>
                <div
                  className={`h-full ${
                    drone.battery > 60
                      ? 'bg-green-500'
                      : drone.battery > 30
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${drone.battery}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Integration */}
      <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <MessageCircle size={16} className={waStatus === 'logged_in' ? 'text-green-500' : 'text-yellow-500'} />
             <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>WhatsApp Bot</span>
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${waStatus === 'logged_in' ? 'bg-green-500/20 text-green-500' : waStatus === 'error' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'}`}>{waMessage}</span>
        </div>
        
        {waStatus === 'waiting_for_qr' && (
           <div className={`mt-2 p-3 rounded-lg flex flex-col items-center border ${theme === 'dark' ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-gray-50'}`}>
              <span className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Scan to link WhatsApp</span>
              <img src={`http://localhost:8003/qr-image?t=${new Date().getTime()}`} className="w-40 h-40 rounded" alt="WhatsApp QR Code" />
           </div>
        )}
      </div>

      <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Network Status
          </span>
          <span className="text-green-500 text-sm font-semibold">Online</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Active Drones
          </span>
          <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            3 / 4
          </span>
        </div>
      </div>
    </div>
  );
}
