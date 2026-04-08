import { Map, Navigation } from 'lucide-react';

interface RouteMapProps {
  theme: 'dark' | 'light';
  selectedZone: string | null;
}

const zoneRoutes: Record<string, { routes: string[]; mapElements: JSX.Element }> = {
  'Zone A': {
    routes: [
      '• Route A1: Main entrance → Emergency exit (Est. 3 min, Low density)',
      '• Route A2: Gate A → South corridor (Est. 5 min, Medium density)',
    ],
    mapElements: (
      <>
        <div className="absolute top-12 left-12 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route A1 - Safe
        </div>
        <div className="absolute top-32 right-20 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route A2 - Moderate
        </div>
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <line x1="15%" y1="15%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
          <line x1="80%" y1="35%" x2="50%" y2="50%" stroke="#eab308" strokeWidth="3" strokeDasharray="5,5" />
        </svg>
      </>
    ),
  },
  'Zone B': {
    routes: [
      '• Route B1: Food court → West exit (Est. 4 min, Low density)',
      '• Route B2: Zone B → Medical station (Est. 2 min, Low density)',
    ],
    mapElements: (
      <>
        <div className="absolute top-16 left-16 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route B1 - Safe
        </div>
        <div className="absolute bottom-24 right-16 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route B2 - Safe
        </div>
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <line x1="18%" y1="20%" x2="45%" y2="55%" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
          <line x1="80%" y1="70%" x2="55%" y2="45%" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
        </svg>
      </>
    ),
  },
  'Zone C': {
    routes: [
      '• Route C1: Stage area → North exit (Est. 6 min, High density - Avoid)',
      '• Route C2: Zone C → Emergency route (Est. 8 min, Medium density)',
    ],
    mapElements: (
      <>
        <div className="absolute top-20 left-12 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route C1 - Avoid
        </div>
        <div className="absolute bottom-20 right-20 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route C2 - Moderate
        </div>
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <line x1="15%" y1="25%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" opacity="0.5" />
          <line x1="85%" y1="75%" x2="50%" y2="50%" stroke="#eab308" strokeWidth="3" strokeDasharray="5,5" />
        </svg>
      </>
    ),
  },
  'Zone D': {
    routes: [
      '• Route D1: Parking → Main venue (Est. 5 min, Low density)',
      '• Route D2: Zone D → Restroom area (Est. 3 min, Low density)',
    ],
    mapElements: (
      <>
        <div className="absolute top-24 right-12 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route D1 - Safe
        </div>
        <div className="absolute bottom-28 left-20 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route D2 - Safe
        </div>
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <line x1="85%" y1="28%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
          <line x1="22%" y1="72%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
        </svg>
      </>
    ),
  },
  'Zone E': {
    routes: [
      '• Route E1: Central area → East gate (Est. 4 min, Medium density)',
      '• Route E2: Zone E → Alternative exit (Est. 7 min, Low density)',
    ],
    mapElements: (
      <>
        <div className="absolute top-16 left-24 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route E1 - Moderate
        </div>
        <div className="absolute bottom-16 right-24 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route E2 - Safe
        </div>
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="#eab308" strokeWidth="3" strokeDasharray="5,5" />
          <line x1="78%" y1="80%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
        </svg>
      </>
    ),
  },
  'Zone F': {
    routes: [
      '• Route F1: Outer area → Main entrance (Est. 3 min, Low density)',
      '• Route F2: Zone F → Service road (Est. 4 min, Low density)',
    ],
    mapElements: (
      <>
        <div className="absolute top-20 right-16 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route F1 - Safe
        </div>
        <div className="absolute bottom-24 left-24 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
          Route F2 - Safe
        </div>
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <line x1="80%" y1="22%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
          <line x1="26%" y1="75%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
        </svg>
      </>
    ),
  },
};

const defaultRoutes = {
  routes: [
    '• Route A: Main entrance → Food court (Est. 5 min, Low density)',
    '• Route B: East gate → Stage area (Est. 7 min, Medium density)',
  ],
  mapElements: (
    <>
      <div className="absolute top-10 left-10 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
        Safe Route A
      </div>
      <div className="absolute top-32 right-16 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
        Safe Route B
      </div>
      <div className="absolute bottom-20 left-20 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
        Avoid - High Density
      </div>
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <line x1="15%" y1="15%" x2="50%" y2="50%" stroke="#10b981" strokeWidth="3" strokeDasharray="5,5" />
        <line x1="85%" y1="40%" x2="50%" y2="50%" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5,5" />
        <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" opacity="0.5" />
      </svg>
    </>
  ),
};

export function RouteMap({ theme, selectedZone }: RouteMapProps) {
  const currentData = selectedZone && zoneRoutes[selectedZone] ? zoneRoutes[selectedZone] : defaultRoutes;

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
      } border rounded-xl p-6`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          AI-Suggested Safe Routes {selectedZone && `- ${selectedZone}`}
        </h3>
        <Navigation className="text-blue-500" size={20} />
      </div>

      <div className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'} rounded-lg h-96 flex items-center justify-center relative overflow-hidden`}>
        <Map className={`${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`} size={64} />
        {currentData.mapElements}
      </div>

      <div className={`mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {currentData.routes.map((route, index) => (
          <p key={index}>{route}</p>
        ))}
      </div>
    </div>
  );
}