import { Cell, ResponsiveContainer, Treemap } from 'recharts';

interface HeatmapPanelProps {
  theme: 'dark' | 'light';
  onZoneClick: (zone: string) => void;
  selectedZone: string | null;
}

const heatmapData = [
  { name: 'Zone A', size: 300, density: 85 },
  { name: 'Zone B', size: 200, density: 45 },
  { name: 'Zone C', size: 250, density: 92 },
  { name: 'Zone D', size: 180, density: 30 },
  { name: 'Zone E', size: 220, density: 68 },
  { name: 'Zone F', size: 160, density: 15 },
];

export function HeatmapPanel({ theme, onZoneClick, selectedZone }: HeatmapPanelProps) {
  const getColor = (density: number) => {
    if (density > 80) return '#ef4444'; // red - high risk
    if (density > 50) return '#f59e0b'; // orange - medium
    return '#10b981'; // green - safe
  };

  const CustomContent = (props: any) => {
    const { x, y, width, height, name, density } = props;
    const isSelected = selectedZone === name;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={getColor(density)}
          stroke={isSelected ? '#3b82f6' : (theme === 'dark' ? '#1e293b' : '#fff')}
          strokeWidth={isSelected ? 4 : 2}
          onClick={() => onZoneClick(name)}
          style={{ cursor: 'pointer' }}
          className="transition-all hover:opacity-80"
        />
        <text
          x={x + width / 2}
          y={y + height / 2 - 8}
          textAnchor="middle"
          fill="white"
          fontSize={14}
          fontWeight="bold"
          style={{ pointerEvents: 'none' }}
        >
          {name}
        </text>
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="white"
          fontSize={12}
          style={{ pointerEvents: 'none' }}
        >
          {density}%
        </text>
      </g>
    );
  };

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
      } border rounded-xl p-6`}
    >
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Crowd Density Heatmap
        {selectedZone && (
          <span className="ml-2 text-sm font-normal text-blue-500">
            (Selected: {selectedZone})
          </span>
        )}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={heatmapData}
            dataKey="size"
            stroke={theme === 'dark' ? '#1e293b' : '#fff'}
            content={<CustomContent />}
          />
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Safe
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Medium
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            High Risk
          </span>
        </div>
      </div>
      <p className={`text-xs mt-3 text-center ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
        Click on any zone to view AI-suggested safe routes
      </p>
    </div>
  );
}