import { Camera, Wifi, WifiOff, Users } from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { Badge } from "@/app/components/ui/badge";

interface CameraGridProps {
  cameras: Array<{
    id: string;
    location: string;
    isOnline: boolean;
    crowdCount: number;
  }>;
  isDark?: boolean;
}

export function LiveCameraGrid({ cameras, isDark }: CameraGridProps) {
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
            Live Camera Network
          </h3>
        </div>
        <Badge className={cn(
          cameras.filter(c => c.isOnline).length === cameras.length
            ? isDark ? "bg-green-500/10 text-green-400" : "bg-green-100 text-green-700"
            : isDark ? "bg-orange-500/10 text-orange-400" : "bg-orange-100 text-orange-700"
        )}>
          {cameras.filter(c => c.isOnline).length}/{cameras.length} Online
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className={cn(
              "rounded-lg border p-3 transition-all hover:shadow-md cursor-pointer",
              camera.isOnline
                ? isDark
                  ? "bg-gray-900/50 border-gray-600 hover:border-blue-500"
                  : "bg-gray-50 border-gray-200 hover:border-blue-500"
                : isDark
                  ? "bg-gray-900/30 border-gray-700 opacity-60"
                  : "bg-gray-100 border-gray-300 opacity-60"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className={cn(
                "p-1.5 rounded",
                isDark ? "bg-gray-700" : "bg-white"
              )}>
                <Camera className={cn(
                  "h-3.5 w-3.5",
                  camera.isOnline
                    ? isDark ? "text-blue-400" : "text-blue-600"
                    : isDark ? "text-gray-600" : "text-gray-400"
                )} />
              </div>
              {camera.isOnline ? (
                <Wifi className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <WifiOff className="h-3.5 w-3.5 text-red-500" />
              )}
            </div>
            <p className={cn(
              "text-xs font-medium mb-1",
              isDark ? "text-gray-200" : "text-gray-900"
            )}>
              {camera.id}
            </p>
            <p className={cn(
              "text-xs mb-2",
              isDark ? "text-gray-400" : "text-gray-600"
            )}>
              {camera.location}
            </p>
            {camera.isOnline ? (
              <div className="relative aspect-video rounded-md overflow-hidden bg-black mb-2 border border-white/5">
                <img
                  src={`http://localhost:8000/video_feed/${camera.id.toLowerCase()}?mode=none`}
                  alt={camera.id}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";
                  }}
                />
                <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-red-500 text-[8px] font-bold text-white px-1 py-0.5 rounded animate-pulse">
                  LIVE
                </div>
              </div>
            ) : (
              <div className="aspect-video rounded-md bg-gray-900 flex items-center justify-center mb-2 border border-white/5">
                <WifiOff className="h-6 w-6 text-gray-700" />
              </div>
            )}
            <div className="flex items-center justify-between">
              <div>
                <p className={cn(
                  "text-[10px] font-bold",
                  isDark ? "text-gray-200" : "text-gray-900"
                )}>
                  {camera.id}
                </p>
                <p className={cn(
                  "text-[8px] opacity-70",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  {camera.location}
                </p>
              </div>
              {camera.isOnline && (
                <div className={cn(
                  "flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded",
                  isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"
                )}>
                  <Users className="h-2.5 w-2.5" />
                  <span>{camera.crowdCount}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
