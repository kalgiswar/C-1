import { LucideIcon } from "lucide-react";
import { cn } from "@/app/components/ui/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  isDark?: boolean;
}

export function StatsCard({ title, value, change, icon: Icon, trend = "neutral", isDark }: StatsCardProps) {
  return (
    <div className={cn(
      "rounded-xl p-5 shadow-sm border transition-all hover:shadow-md",
      isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
    )}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "p-2.5 rounded-lg",
          isDark ? "bg-blue-500/10" : "bg-blue-50"
        )}>
          <Icon className={cn(
            "h-5 w-5",
            isDark ? "text-blue-400" : "text-blue-600"
          )} />
        </div>
        {change && (
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            trend === "up" 
              ? isDark ? "bg-green-500/10 text-green-400" : "bg-green-100 text-green-700"
              : trend === "down"
              ? isDark ? "bg-red-500/10 text-red-400" : "bg-red-100 text-red-700"
              : isDark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-700"
          )}>
            {change}
          </span>
        )}
      </div>
      <div>
        <p className={cn(
          "text-2xl font-bold mb-1",
          isDark ? "text-white" : "text-gray-900"
        )}>
          {value}
        </p>
        <p className={cn(
          "text-sm",
          isDark ? "text-gray-400" : "text-gray-600"
        )}>
          {title}
        </p>
      </div>
    </div>
  );
}
