import { Video, Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipBack, SkipForward } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Slider } from "@/app/components/ui/slider";
import { useState } from "react";

interface VideoPlayerProProps {
  videoUrl?: string;
  isLive?: boolean;
  location?: string;
  timestamp?: Date;
  cameraId?: string;
}

export function VideoPlayerPro({ videoUrl, isLive = false, location, timestamp, cameraId }: VideoPlayerProProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState([45]);

  return (
    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden shadow-2xl">
      {/* Video Player - Replace this with actual video element */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        {videoUrl ? (
          <video
            src={`http://localhost:8002/${videoUrl}`}
            loop
            autoPlay
            muted={isMuted}
            className="w-full h-full object-contain"
          />
        ) : isLive ? (
          <img
            src={`http://localhost:8000/video_feed/${(cameraId || "CAM1").toLowerCase()}?mode=fight`}
            alt="Live Monitor"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback if stream fails
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop";
            }}
          />
        ) : (
          <div className="text-white/30 text-center">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-white/10 border-t-white/30 rounded-full animate-spin mx-auto mb-6" />
              <Video className="h-10 w-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-3" />
            </div>
            <p className="text-xl mb-2">CONNECTING TO MONITOR...</p>
            <p className="text-sm text-white/20">Waiting for AI backend feed</p>
          </div>
        )}
      </div>

      {/* Top Overlay - Live Badge and Camera Info */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isLive && (
              <Badge className="bg-red-500 hover:bg-red-500 text-white px-3 py-1.5 font-semibold">
                ● LIVE FEED
              </Badge>
            )}
            {(location || cameraId) && (
              <span className="text-white font-medium text-sm">
                {cameraId} - {location || "MAIN PLAZA"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-black/50 text-white border-white/20 text-xs">
              ⚡ AI-ON
            </Badge>
            <Badge variant="secondary" className="bg-black/50 text-white border-white/20 text-xs">
              4K • 60FPS
            </Badge>
          </div>
        </div>
      </div>

      {/* Bottom Overlay - Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex items-center justify-between text-xs text-white/60 mt-2">
            <span>00:{progress[0].toString().padStart(2, '0')}</span>
            <span>{timestamp?.toLocaleString() || 'Live'}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-white" />
              ) : (
                <Play className="h-5 w-5 fill-white" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 text-white hover:bg-white/20 rounded-full"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 text-white hover:bg-white/20 rounded-full"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2 ml-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-9 w-9 text-white hover:bg-white/20 rounded-full"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : 70]}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 text-white hover:bg-white/20 rounded-full"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 text-white hover:bg-white/20 rounded-full"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
