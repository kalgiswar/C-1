import { AlertTriangle, Flame, Users, Swords, CheckCircle, XCircle, Camera, MapPin, Clock, TrendingUp, Activity, Shield } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Separator } from "@/app/components/ui/separator";
import { Incident, IncidentType } from "@/app/components/IncidentAlert";
import { cn } from "@/app/components/ui/utils";

interface ClipDetailsProProps {
  incident: Incident | null;
  isDark?: boolean;
}

const incidentConfig = {
  stampede: {
    icon: Users,
    label: "Stampede Alert",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  fire: {
    icon: Flame,
    label: "Fire Detected",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  fighting: {
    icon: Swords,
    label: "Violence Detected",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  }
};

export function ClipDetailsPro({ incident, isDark }: ClipDetailsProProps) {
  if (!incident) {
    return (
      <div className={cn(
        "h-full rounded-xl shadow-sm border p-6",
        isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex items-center gap-2 mb-6">
          <div className={cn("w-1 h-5 rounded-full", isDark ? "bg-blue-400" : "bg-blue-500")} />
          <h3 className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>Clip Details</h3>
        </div>

        <div className="flex items-center justify-center h-[calc(100%-4rem)]">
          <div className="text-center">
            <div className={cn(
              "p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center",
              isDark ? "bg-green-500/10" : "bg-green-50"
            )}>
              <Shield className={cn("h-8 w-8", isDark ? "text-green-400" : "text-green-600")} />
            </div>
            <h4 className={cn("font-semibold mb-2", isDark ? "text-white" : "text-gray-900")}>All Systems Operational</h4>
            <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>No incidents detected</p>
          </div>
        </div>
      </div>
    );
  }

  const config = incidentConfig[incident.type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "h-full rounded-xl shadow-sm border p-6 overflow-y-auto",
      isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
    )}>
      <div className="flex items-center gap-2 mb-6">
        <div className={cn("w-1 h-5 rounded-full", isDark ? "bg-blue-400" : "bg-blue-500")} />
        <h3 className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>Clip Details</h3>
      </div>

      {/* Incident Type Card */}
      <div className={cn("rounded-lg p-4 mb-6", config.bgColor)}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Icon className={cn("h-5 w-5", config.color)} />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{config.label}</h4>
            <p className="text-xs text-gray-600">Abnormal activity detected</p>
          </div>
          <Badge
            className={cn(
              "capitalize",
              incident.status === "accepted"
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : incident.status === "rejected"
                ? "bg-red-100 text-red-700 hover:bg-red-100"
                : "bg-gray-100 text-gray-700 hover:bg-gray-100"
            )}
          >
            {incident.status}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={cn("text-sm flex items-center gap-1.5", isDark ? "text-gray-400" : "text-gray-600")}>
              <TrendingUp className="h-4 w-4" />
              Detection Confidence
            </span>
            <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>{incident.accuracy}%</span>
          </div>
          <Progress value={incident.accuracy} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={cn("text-sm flex items-center gap-1.5", isDark ? "text-gray-400" : "text-gray-600")}>
              <Activity className="h-4 w-4" />
              Threat Level
            </span>
            <span className={cn(
              "text-sm font-semibold",
              incident.accuracy > 90 ? "text-red-600" : incident.accuracy > 75 ? "text-orange-600" : "text-yellow-600"
            )}>
              {incident.accuracy > 90 ? "Critical" : incident.accuracy > 75 ? "High" : "Medium"}
            </span>
          </div>
          <Progress 
            value={incident.accuracy} 
            className={cn(
              "h-2",
              incident.accuracy > 90 ? "[&>div]:bg-red-500" : incident.accuracy > 75 ? "[&>div]:bg-orange-500" : "[&>div]:bg-yellow-500"
            )}
          />
        </div>
      </div>

      <Separator className={cn("my-6", isDark ? "bg-gray-700" : "")} />

      {/* Incident Information */}
      <div className="space-y-3 mb-6">
        <h4 className={cn("text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-500" : "text-gray-500")}>Incident Details</h4>
        
        <div className="space-y-2.5">
          <div className={cn("flex items-center justify-between py-2 border-b", isDark ? "border-gray-700" : "border-gray-100")}>
            <span className={cn("text-sm flex items-center gap-2", isDark ? "text-gray-400" : "text-gray-600")}>
              <MapPin className="h-4 w-4" />
              Location
            </span>
            <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>{incident.location}</span>
          </div>

          <div className={cn("flex items-center justify-between py-2 border-b", isDark ? "border-gray-700" : "border-gray-100")}>
            <span className={cn("text-sm flex items-center gap-2", isDark ? "text-gray-400" : "text-gray-600")}>
              <Camera className="h-4 w-4" />
              Camera ID
            </span>
            <span className={cn("text-sm font-mono font-medium", isDark ? "text-white" : "text-gray-900")}>{incident.cameraId}</span>
          </div>

          <div className={cn("flex items-center justify-between py-2 border-b", isDark ? "border-gray-700" : "border-gray-100")}>
            <span className={cn("text-sm flex items-center gap-2", isDark ? "text-gray-400" : "text-gray-600")}>
              <Clock className="h-4 w-4" />
              Timestamp
            </span>
            <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
              {incident.timestamp.toLocaleTimeString()}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className={cn("text-sm flex items-center gap-2", isDark ? "text-gray-400" : "text-gray-600")}>
              <Activity className="h-4 w-4" />
              Duration
            </span>
            <span className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>10 seconds</span>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {incident.status === "accepted" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            <div>
              <p className="font-semibold text-sm">Police Notified</p>
              <p className="text-xs text-green-600">Emergency services alerted successfully</p>
            </div>
          </div>
        </div>
      )}

      {incident.status === "rejected" && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 text-gray-700">
            <XCircle className="h-5 w-5" />
            <div>
              <p className="font-semibold text-sm">False Alarm</p>
              <p className="text-xs text-gray-600">Incident marked as rejected</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}