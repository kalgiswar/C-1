import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { cn } from "@/app/components/ui/utils";

const mockData = [
  { time: "00:00", incidents: 2, crowd: 120 },
  { time: "04:00", incidents: 1, crowd: 80 },
  { time: "08:00", incidents: 3, crowd: 250 },
  { time: "12:00", incidents: 5, crowd: 450 },
  { time: "16:00", incidents: 4, crowd: 380 },
  { time: "20:00", incidents: 6, crowd: 520 },
];

interface AnalyticsChartProps {
  isDark?: boolean;
}

export function AnalyticsChart({ isDark }: AnalyticsChartProps) {
  return (
    <div className={cn(
      "rounded-xl shadow-sm border p-5",
      isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-1 h-5 rounded-full",
            isDark ? "bg-blue-400" : "bg-blue-500"
          )} />
          <h3 className={cn(
            "font-semibold",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Incident Analytics (24h)
          </h3>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
          <XAxis 
            dataKey="time" 
            stroke={isDark ? "#9ca3af" : "#6b7280"} 
            style={{ fontSize: "12px" }}
          />
          <YAxis 
            stroke={isDark ? "#9ca3af" : "#6b7280"} 
            style={{ fontSize: "12px" }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
              borderRadius: "8px",
              color: isDark ? "#fff" : "#000"
            }}
          />
          <Bar dataKey="incidents" fill={isDark ? "#3b82f6" : "#2563eb"} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
