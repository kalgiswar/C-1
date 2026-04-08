import { Navigation, Map, ShieldAlert, Cpu } from 'lucide-react';

interface RoutesPageProps {
  theme: 'dark' | 'light';
}

export function RoutesPage({ theme }: RoutesPageProps) {
  const card = theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200';
  const heading = theme === 'dark' ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'text-blue-700';
  const text = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-black tracking-wider flex items-center gap-3 ${heading}`}>
          <Map size={28} />
          LIVE EVACUATION PATHFINDER (A*)
        </h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30 text-sm font-bold animate-pulse">
          <ShieldAlert size={16} />
          SYSTEM ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Dynamic A* Map area */}
        <div className={`xl:col-span-2 border rounded-xl overflow-hidden shadow-xl ${card}`}>
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
            <h3 className={`font-bold flex items-center gap-2 ${text}`}>
              <Navigation className="text-indigo-400" size={18} />
              Real-Time Shortest Path
            </h3>
            <div className="flex gap-2">
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded border border-indigo-500/30 flex items-center gap-1">
                <Cpu size={12}/> A* ALGORITHM
              </span>
              <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30">
                DYNAMIC AVOIDANCE
              </span>
            </div>
          </div>
          <div className="aspect-video w-full bg-black relative flex items-center justify-center overflow-hidden p-2">
            <img 
              src="http://localhost:8000/path_feed"
              alt="Live A* Evacuation Path"
              className="w-full h-full object-contain rounded-lg border border-white/5"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement?.classList.add('bg-slate-800');
                if (!target.nextElementSibling) {
                    const el = document.createElement('div');
                    el.className = 'text-red-400 flex flex-col items-center gap-2';
                    el.innerHTML = '<span>❌ Livestream backend off</span><span class="text-xs text-white/50">Run backend/livestream/main.py</span>';
                    target.parentElement?.appendChild(el);
                }
              }}
            />
          </div>
          <div className="p-4 bg-black/20 text-sm text-gray-400 border-t border-white/5">
            <p>The system constantly recalculates the safest evacuation route. If a camera detects <strong>Stampede</strong>, <strong>Violence</strong>, or <strong>Fire</strong>, the A* algorithm updates edge weights to reroute crowds around the danger zone in real-time.</p>
          </div>
        </div>

        {/* 4 Multi-Camera Grid */}
        <div className={`border rounded-xl flex flex-col ${card}`}>
           <div className="p-4 border-b border-white/10 bg-black/40">
            <h3 className={`font-bold ${text}`}>Surveillance Regions</h3>
            <p className="text-xs text-gray-400 mt-1">YOLOv8 Edge Detections mapped to Grid Zones</p>
          </div>
          
          <div className="p-4 grid grid-cols-2 gap-3 flex-1">
             {[1, 2, 3, 4].map((camNum) => (
                <div key={camNum} className="relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10">
                    <img 
                      src={`http://localhost:8000/video_feed/cam${camNum}?mode=fight`}
                      alt={`Cam ${camNum}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement?.classList.add('bg-slate-900', 'flex', 'items-center', 'justify-center');
                          if (!target.nextElementSibling) {
                              const el = document.createElement('span');
                              el.className = 'text-[10px] text-gray-600 font-mono';
                              el.innerText = `Camera ${camNum} offline`;
                              target.parentElement?.appendChild(el);
                          }
                      }}
                    />
                    <div className="absolute top-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-mono text-indigo-400 border border-white/10 backdrop-blur-md">
                        Zone {camNum}
                    </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
