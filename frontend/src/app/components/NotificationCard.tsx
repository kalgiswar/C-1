import { AlertTriangle, Flame, Users, Swords, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/components/ui/utils";
import { IncidentType } from "@/app/components/IncidentAlert";

interface NotificationCardProps {
  id: string;
  type: IncidentType;
  location: string;
  timestamp: Date;
  accuracy: number;
  cameraId: string;
  status: "pending" | "accepted" | "rejected";
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  isDark?: boolean;
}

const incidentConfig = {
  stampede: {
    icon: Users,
    label: "Stampede",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  fire: {
    icon: Flame,
    label: "Fire",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  fighting: {
    icon: Swords,
    label: "Violence",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  }
};

export function NotificationCard({
  id,
  type,
  location,
  timestamp,
  accuracy,
  cameraId,
  status,
  onAccept,
  onReject,
  isDark
}: NotificationCardProps) {
  const config = incidentConfig[type];
  const Icon = config.icon;
  const isPending = status === "pending";

  return (
    <div className={cn(
      "rounded-lg border-2 shadow-sm p-5 min-w-[280px]",
      isPending ? "border-red-500" : isDark ? "border-gray-700" : "border-gray-200",
      isDark ? "bg-gray-800" : "bg-white"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn("p-2.5 rounded-lg", config.bgColor)}>
            <Icon className={cn("h-5 w-5", config.color)} />
          </div>
          <div>
            <h3 className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>Security Alert</h3>
            <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>{cameraId} - Zone A</p>
          </div>
        </div>
        <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs px-2 py-0.5">
          CRITICAL
        </Badge>
      </div>

      <div className={cn("flex items-center gap-1 text-xs mb-4", isDark ? "text-gray-500" : "text-gray-500")}>
        <Clock className="h-3.5 w-3.5" />
        <span>{timestamp.toLocaleTimeString()} UTC</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div>
          <p className={cn("text-xs mb-1", isDark ? "text-gray-500" : "text-gray-500")}>Match Confidence</p>
          <p className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>{accuracy}%</p>
        </div>
        <div>
          <p className={cn("text-xs mb-1", isDark ? "text-gray-500" : "text-gray-500")}>Detection Type</p>
          <p className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>{config.label}</p>
        </div>
      </div>

      {isPending ? (
        <div className="flex gap-2">
          <Button
            onClick={() => onAccept(id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white h-9"
          >
            ✓ APPROVE
          </Button>
          <Button
            onClick={() => onReject(id)}
            variant="outline"
            className={cn(
              "flex-1 h-9",
              isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-50"
            )}
          >
            ✕ REJECT
          </Button>
        </div>
      ) : (
        <div className={cn(
          "text-center py-2 rounded-md text-sm font-medium",
          status === "accepted" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        )}>
          {status === "accepted" ? "✓ Approved" : "✕ Rejected"}
        </div>
      )}
    </div>
  );
}