import { Activity, AlertTriangle, Camera, CheckCircle, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

interface DashboardStatsProps {
  activeCameras: number;
  totalIncidents: number;
  pendingAlerts: number;
  resolvedIncidents: number;
}

export function DashboardStats({ activeCameras, totalIncidents, pendingAlerts, resolvedIncidents }: DashboardStatsProps) {
  const stats = [
    {
      title: "Active Cameras",
      value: activeCameras,
      icon: Camera,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Total Incidents",
      value: totalIncidents,
      icon: Activity,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      title: "Pending Alerts",
      value: pendingAlerts,
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      title: "Resolved",
      value: resolvedIncidents,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
