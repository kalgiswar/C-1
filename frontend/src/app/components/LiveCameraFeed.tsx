import { Camera, Wifi, WifiOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface LiveCameraFeedProps {
  cameraId: string;
  location: string;
  isConnected: boolean;
  crowdCount?: number;
}

export function LiveCameraFeed({ cameraId, location, isConnected, crowdCount }: LiveCameraFeedProps) {
  // Use backend URL. Defaults to localhost:8000 for local dev
  const streamUrl = `http://localhost:8000/video_feed/${cameraId.toLowerCase()}?mode=fight`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Camera className="h-4 w-4" />
            {location}
          </CardTitle>
          <div className="flex items-center gap-2">
            {crowdCount !== undefined && (
              <Badge variant="secondary" className="text-xs">
                {crowdCount} people
              </Badge>
            )}
            {isConnected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="relative aspect-video bg-gray-900 rounded-md overflow-hidden">
          {isConnected ? (
            <img
              src={streamUrl}
              alt={`Live feed from ${location}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if stream fails
                (e.target as HTMLImageElement).style.display = 'none';
                // Show placeholder logic here if needed, but simple hide is okay for now
                // or switch to a placeholder image
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/50">
              <WifiOff className="h-8 w-8" />
            </div>
          )}

          {/* Live indicator */}
          {isConnected && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-xs">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIVE
            </div>
          )}

          {/* Timestamp */}
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
