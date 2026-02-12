import { Video, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { useState } from "react";

interface VideoPlayerProps {
  videoUrl?: string;
  isLive?: boolean;
  location?: string;
  timestamp?: Date;
}

export function VideoPlayer({ videoUrl, isLive = false, location, timestamp }: VideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {/* Video Player - Replace this with actual video element */}
      <div className="absolute inset-0 flex items-center justify-center">
        {videoUrl ? (
          <div className="text-white/50 text-center">
            <Video className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg mb-2">Incident Video Clip</p>
            <p className="text-sm">Looping 10-second recording</p>
            <p className="text-xs mt-2 text-white/30">
              Replace with: &lt;video src="{videoUrl}" loop autoPlay muted /&gt;
            </p>
            {/* Uncomment and use actual video:
            <video 
              src={videoUrl} 
              loop 
              autoPlay 
              muted={isMuted}
              className="w-full h-full object-cover"
            />
            */}
          </div>
        ) : (
          <div className="text-white/50 text-center">
            <Video className="h-16 w-16 mx-auto mb-4 animate-pulse" />
            <p className="text-lg mb-2">
              {isLive ? "LIVE MONITORING" : "INCIDENT RECORDING STANDBY"}
            </p>
            <p className="text-sm">Waiting for AI detection...</p>
          </div>
        )}
      </div>

      {/* Top Overlay - Live Badge */}
      {isLive && (
        <div className="absolute top-4 left-4">
          <Badge className="bg-red-500 hover:bg-red-500 text-white px-3 py-1.5">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
            LIVE MONITORING
          </Badge>
        </div>
      )}

      {/* Bottom Overlay - Video Info */}
      {videoUrl && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex-1">
              {location && <p className="text-sm font-medium">{location}</p>}
              {timestamp && (
                <p className="text-xs text-white/60 mt-1">
                  {timestamp.toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
