import { AlertTriangle, Flame, Users, Swords, CheckCircle, XCircle, TrendingUp, Activity, Camera } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Separator } from "@/app/components/ui/separator";
import { Incident, IncidentType } from "@/app/components/IncidentAlert";
import { cn } from "@/app/components/ui/utils";

interface ClipDetailsProps {
  incident: Incident | null;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const incidentConfig = {
  stampede: {
    icon: Users,
    label: "Stampede Detected",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  fire: {
    icon: Flame,
    label: "Fire Hazard",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  fighting: {
    icon: Swords,
    label: "Violence Detected",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  }
};

export function ClipDetails({ incident, onAccept, onReject }: ClipDetailsProps) {
  if (!incident) {
    return (
      <div className="h-full bg-black/40 rounded-lg border border-white/10 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <h3 className="text-white font-medium">Clip Details</h3>
        </div>

        <div className="flex items-center gap-4 p-6 bg-black/60 rounded-lg border border-white/10">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h4 className="text-white font-medium mb-1">No Incident</h4>
            <p className="text-sm text-white/60">Normal activity analysis</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-xs text-white/40 uppercase tracking-wider mb-4">Timeline Analysis</h4>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Movement</span>
                <span className="text-sm text-blue-400">0%</span>
              </div>
              <Progress value={0} className="h-1.5 bg-white/5" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Density</span>
                <span className="text-sm text-red-400">0%</span>
              </div>
              <Progress value={0} className="h-1.5 bg-white/5" />
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-white/10" />

        <div>
          <h4 className="text-xs text-white/40 uppercase tracking-wider mb-4">Behavioral Metrics</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 bg-black/60 rounded-lg border border-white/10">
              <p className="text-xs text-white/40 mb-1">Stability</p>
              <p className="text-sm text-blue-400 font-medium">Normal</p>
            </div>
            <div className="p-3 bg-black/60 rounded-lg border border-white/10">
              <p className="text-xs text-white/40 mb-1">Flow</p>
              <p className="text-sm text-green-400 font-medium">Smooth</p>
            </div>
            <div className="p-3 bg-black/60 rounded-lg border border-white/10">
              <p className="text-xs text-white/40 mb-1">Crowd</p>
              <p className="text-sm text-yellow-400 font-medium">Low</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const config = incidentConfig[incident.type];
  const Icon = config.icon;
  const isPending = incident.status === "pending";

  return (
    <div className="h-full bg-black/40 rounded-lg border border-white/10 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-blue-500 rounded-full" />
        <h3 className="text-white font-medium">Clip Details</h3>
      </div>

      {/* Incident Status */}
      <div className={cn("flex items-center gap-4 p-6 rounded-lg border mb-6", config.bgColor, "border-white/20")}>
        <div className={cn("p-3 rounded-lg", config.bgColor)}>
          <Icon className={cn("h-6 w-6", config.color)} />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-medium mb-1">{config.label}</h4>
          <p className="text-sm text-white/60">Abnormal activity detected</p>
        </div>
        <Badge
          variant={
            incident.status === "accepted"
              ? "default"
              : incident.status === "rejected"
              ? "destructive"
              : "secondary"
          }
          className="capitalize"
        >
          {incident.status}
        </Badge>
      </div>

      {/* Detection Metrics */}
      <div className="mb-6">
        <h4 className="text-xs text-white/40 uppercase tracking-wider mb-4">Detection Analysis</h4>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Confidence Level</span>
              <span className={cn("text-sm font-medium", config.color)}>{incident.accuracy}%</span>
            </div>
            <Progress value={incident.accuracy} className="h-2 bg-white/5" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Threat Severity</span>
              <span className="text-sm text-red-400">
                {incident.accuracy > 90 ? "High" : incident.accuracy > 75 ? "Medium" : "Low"}
              </span>
            </div>
            <Progress 
              value={incident.accuracy} 
              className="h-2 bg-white/5"
            />
          </div>
        </div>
      </div>

      <Separator className="my-6 bg-white/10" />

      {/* Incident Information */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Location</span>
          <span className="text-white">{incident.location}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Camera ID</span>
          <span className="text-white font-mono">{incident.cameraId}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Time Detected</span>
          <span className="text-white">{incident.timestamp.toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/60">Recording Duration</span>
          <span className="text-white">10 seconds</span>
        </div>
      </div>

      <Separator className="my-6 bg-white/10" />

      {/* Action Buttons */}
      {isPending ? (
        <div className="space-y-3">
          <Button
            onClick={() => onAccept(incident.id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Accept & Alert Police
          </Button>
          <Button
            onClick={() => onReject(incident.id)}
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject False Alarm
          </Button>
        </div>
      ) : (
        <div className={cn(
          "p-4 rounded-lg border text-sm text-center",
          incident.status === "accepted"
            ? "bg-green-500/10 border-green-500/30 text-green-400"
            : "bg-red-500/10 border-red-500/30 text-red-400"
        )}>
          {incident.status === "accepted" ? (
            <>
              <CheckCircle className="h-5 w-5 inline mb-1" />
              <p className="font-medium">Police Notified</p>
              <p className="text-xs mt-1 text-white/60">Emergency services alerted</p>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 inline mb-1" />
              <p className="font-medium">Marked as False Alarm</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
