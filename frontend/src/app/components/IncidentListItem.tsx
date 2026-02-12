import { AlertTriangle, Flame, Users, Swords, Clock, MapPin, Camera } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/components/ui/utils";
import { IncidentType } from "@/app/components/IncidentAlert";

interface IncidentListItemProps {
  id: string;
  type: IncidentType;
  location: string;
  timestamp: Date;
  accuracy: number;
  cameraId: string;
  status: "pending" | "accepted" | "rejected";
  isSelected: boolean;
  onClick: () => void;
}

const incidentConfig = {
  stampede: {
    icon: Users,
    label: "Stampede",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/50"
  },
  fire: {
    icon: Flame,
    label: "Fire Hazard",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/50"
  },
  fighting: {
    icon: Swords,
    label: "Violence",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/50"
  }
};

export function IncidentListItem({
  type,
  location,
  timestamp,
  accuracy,
  cameraId,
  status,
  isSelected,
  onClick
}: IncidentListItemProps) {
  const config = incidentConfig[type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all hover:border-white/20",
        isSelected
          ? "bg-white/10 border-white/30"
          : "bg-black/40 border-white/10 hover:bg-white/5"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg mt-0.5", config.bgColor)}>
          <Icon className={cn("h-4 w-4", config.color)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-medium text-white text-sm">{config.label}</h4>
            <Badge
              variant={
                status === "pending"
                  ? "destructive"
                  : status === "accepted"
                  ? "default"
                  : "secondary"
              }
              className="text-xs shrink-0"
            >
              {status}
            </Badge>
          </div>
          
          <div className="space-y-1.5 text-xs text-white/60">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Camera className="h-3 w-3 shrink-0" />
              <span>{cameraId}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 shrink-0" />
                <span>{timestamp.toLocaleTimeString()}</span>
              </div>
              <span className={cn("font-medium", config.color)}>
                {accuracy}% confidence
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
