import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { ScrollArea } from "@/app/components/ui/scroll-area";

interface Activity {
  id: string;
  type: "accepted" | "rejected" | "detected";
  message: string;
  timestamp: Date;
  location?: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  isDark?: boolean;
}

export function ActivityFeed({ activities, isDark }: ActivityFeedProps) {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "accepted":
        return CheckCircle;
      case "rejected":
        return XCircle;
      case "detected":
        return AlertTriangle;
    }
  };

  const getColor = (type: Activity["type"]) => {
    switch (type) {
      case "accepted":
        return isDark ? "text-green-400" : "text-green-600";
      case "rejected":
        return isDark ? "text-red-400" : "text-red-600";
      case "detected":
        return isDark ? "text-orange-400" : "text-orange-600";
    }
  };

  return (
    <div className={cn(
      "rounded-xl shadow-sm border h-full",
      isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
    )}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-1 h-5 rounded-full",
            isDark ? "bg-blue-400" : "bg-blue-500"
          )} />
          <h3 className={cn(
            "font-semibold",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Activity Feed
          </h3>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100%-4rem)]">
        <div className="p-4 space-y-3">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              const Icon = getIcon(activity.type);
              return (
                <div
                  key={activity.id}
                  className={cn(
                    "flex gap-3 p-3 rounded-lg transition-colors",
                    isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-50"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-full h-fit mt-0.5",
                    activity.type === "accepted" 
                      ? isDark ? "bg-green-500/10" : "bg-green-100"
                      : activity.type === "rejected"
                      ? isDark ? "bg-red-500/10" : "bg-red-100"
                      : isDark ? "bg-orange-500/10" : "bg-orange-100"
                  )}>
                    <Icon className={cn("h-3.5 w-3.5", getColor(activity.type))} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm mb-1",
                      isDark ? "text-gray-200" : "text-gray-900"
                    )}>
                      {activity.message}
                    </p>
                    {activity.location && (
                      <p className={cn(
                        "text-xs mb-1",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        📍 {activity.location}
                      </p>
                    )}
                    <div className={cn(
                      "flex items-center gap-1 text-xs",
                      isDark ? "text-gray-500" : "text-gray-500"
                    )}>
                      <Clock className="h-3 w-3" />
                      <span>{activity.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className={cn(
                "text-sm",
                isDark ? "text-gray-500" : "text-gray-400"
              )}>
                No recent activity
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
