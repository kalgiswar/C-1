import { useState, useEffect } from "react";
import { Shield, Settings, Camera, Activity, TrendingUp, AlertTriangle, Users } from "lucide-react";
import { VideoPlayerPro } from "@/app/components/VideoPlayerPro";
import { NotificationCard } from "@/app/components/NotificationCard";
import { ClipDetailsPro } from "@/app/components/ClipDetailsPro";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { StatsCard } from "@/app/components/StatsCard";
import { ActivityFeed } from "@/app/components/ActivityFeed";
import { LiveCameraGrid } from "@/app/components/LiveCameraGrid";
import { AnalyticsChart } from "@/app/components/AnalyticsChart";
import { Incident, IncidentType } from "@/app/components/IncidentAlert";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { toast } from "sonner";
import { Toaster } from "@/app/components/ui/sonner";
import { cn } from "@/app/components/ui/utils";

// Mock camera data
const mockCameras = [
  { id: "CAM1", location: "Main Plaza", isOnline: true, crowdCount: 245 },
  { id: "CAM2", location: "Stage Area", isOnline: true, crowdCount: 512 },
  { id: "CAM3", location: "Food Court", isOnline: true, crowdCount: 189 },
  { id: "CAM4", location: "Exit Gate", isOnline: true, crowdCount: 156 },
  { id: "CAM5", location: "Parking Lot", isOnline: false, crowdCount: 0 },
  { id: "CAM6", location: "VIP Section", isOnline: true, crowdCount: 78 },
];

// Function to simulate receiving an alert from your AI backend
const simulateAIAlert = (): Incident => {
  const types: IncidentType[] = ["stampede", "fire", "fighting"];
  const locations = ["Main Plaza", "Stage Area", "Food Court", "Exit Gate", "VIP Section"];
  const cameras = ["CAM1", "CAM2", "CAM3", "CAM4", "CAM6"];

  return {
    id: `INC-${Date.now()}`,
    type: types[Math.floor(Math.random() * types.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    timestamp: new Date(),
    accuracy: Math.floor(Math.random() * 15) + 85, // 85-100%
    videoUrl: `/api/videos/incident-${Date.now()}.mp4`,
    cameraId: cameras[Math.floor(Math.random() * cameras.length)],
    status: "pending"
  };
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [filterType, setFilterType] = useState<"all" | IncidentType>("all");
  const [activities, setActivities] = useState<Array<{
    id: string;
    type: "accepted" | "rejected" | "detected";
    message: string;
    timestamp: Date;
    location?: string;
  }>>([]);

  // Polling for real incidents
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:8002/sessions");
        if (response.ok) {
          const data = await response.json();
          // Map backend data to frontend Incident type
          const mappedIncidents: Incident[] = data.map((item: any) => ({
            id: item.session_id,
            type: (item.description || "Unknown").toLowerCase().includes("fire") ? "fire" :
              (item.description || "Unknown").toLowerCase().includes("violence") ? "fighting" :
                (item.severity === "Critical") ? "stampede" : "fighting", // Fallback mapping based on simple logic
            location: `Cam ${item.camera_id}`, // Backend doesn't give location name, use ID
            timestamp: new Date(item.created_at),
            accuracy: parseInt(item.confidence) || 90,
            videoUrl: item.video_url, // URL from backend
            cameraId: item.camera_id,
            status: item.status
          }));

          // Sort by date desc
          mappedIncidents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

          setIncidents(mappedIncidents);

          // Auto-select first pending if none selected
          if (!selectedIncident && mappedIncidents.length > 0) {
            setSelectedIncident(mappedIncidents[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      }
    };

    fetchIncidents();
    const interval = setInterval(fetchIncidents, 2000); // Poll every 2s
    return () => clearInterval(interval);
  }, [selectedIncident]);

  const handleAcceptIncident = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8002/session/${id}/approve`, { method: "POST" });
      if (response.ok) {
        toast.success("Police Alert Sent", { description: "Emergency services notified." });
        // Refresh list will happen on next poll, but we can update local state for immediate feedback
        setIncidents(prev => prev.map(i => i.id === id ? { ...i, status: "accepted" } : i));
      }
    } catch (e) {
      toast.error("Failed to approve incident");
    }
  };

  const handleRejectIncident = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8002/session/${id}/reject`, { method: "POST" });
      if (response.ok) {
        toast.info("Incident Rejected", { description: "Marked as false alarm." });
        setIncidents(prev => prev.map(i => i.id === id ? { ...i, status: "rejected" } : i));
      }
    } catch (e) {
      toast.error("Failed to reject incident");
    }
  };

  const pendingIncidents = incidents.filter(i => i.status === "pending");
  const filteredIncidents = filterType === "all"
    ? incidents
    : incidents.filter(i => i.type === filterType);

  const stats = {
    totalIncidents: incidents.length,
    pendingAlerts: pendingIncidents.length,
    activeCameras: mockCameras.filter(c => c.isOnline).length,
    totalCrowd: mockCameras.reduce((acc, c) => acc + c.crowdCount, 0),
  };

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-[#0f1117]" : "bg-gray-50"
    )}>
      <Toaster />

      {/* Header */}
      <header className={cn(
        "border-b sticky top-0 z-50 backdrop-blur-sm transition-colors",
        isDark ? "bg-gray-900/95 border-gray-800" : "bg-white/95 border-gray-200"
      )}>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className={cn("text-base font-bold", isDark ? "text-white" : "text-gray-900")}>
                  Crowd Shield
                </h1>
                <p className={cn("text-[10px] uppercase tracking-wider", isDark ? "text-gray-500" : "text-gray-500")}>
                  Safety Monitor
                </p>
              </div>
            </div>

            {/* Center - System Status & Filters */}
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                SYSTEM ONLINE
              </Badge>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={filterType === "all" ? "default" : "outline"}
                  onClick={() => setFilterType("all")}
                  className="h-7 text-xs"
                >
                  All
                </Button>
                <Button
                  size="sm"
                  variant={filterType === "fire" ? "default" : "outline"}
                  onClick={() => setFilterType("fire")}
                  className="h-7 text-xs"
                >
                  Fire
                </Button>
                <Button
                  size="sm"
                  variant={filterType === "fighting" ? "default" : "outline"}
                  onClick={() => setFilterType("fighting")}
                  className="h-7 text-xs"
                >
                  Violence
                </Button>
                <Button
                  size="sm"
                  variant={filterType === "stampede" ? "default" : "outline"}
                  onClick={() => setFilterType("stampede")}
                  className="h-7 text-xs"
                >
                  Stampede
                </Button>
              </div>
            </div>

            {/* Right - Critical Alerts & Settings */}
            <div className="flex items-center gap-3">
              {pendingIncidents.length > 0 && (
                <Badge className="bg-red-500 hover:bg-red-500 text-white px-3 py-1.5 font-semibold">
                  ⚠ CRITICAL ALERTS
                </Badge>
              )}
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", isDark ? "text-gray-400 hover:text-white" : "text-gray-600")}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Incidents"
            value={stats.totalIncidents}
            change="+12%"
            icon={Activity}
            trend="up"
            isDark={isDark}
          />
          <StatsCard
            title="Pending Alerts"
            value={stats.pendingAlerts}
            change={stats.pendingAlerts > 0 ? "Action Required" : "All Clear"}
            icon={AlertTriangle}
            trend={stats.pendingAlerts > 0 ? "up" : "neutral"}
            isDark={isDark}
          />
          <StatsCard
            title="Active Cameras"
            value={`${stats.activeCameras}/${mockCameras.length}`}
            change="98% Uptime"
            icon={Camera}
            trend="neutral"
            isDark={isDark}
          />
          <StatsCard
            title="Total Crowd"
            value={stats.totalCrowd}
            change="+8%"
            icon={Users}
            trend="up"
            isDark={isDark}
          />
        </div>

        {/* Notification Cards - Horizontal Scroll */}
        {pendingIncidents.length > 0 && (
          <div className="relative">
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-2">
                {pendingIncidents.map((incident) => (
                  <NotificationCard
                    key={incident.id}
                    {...incident}
                    onAccept={handleAcceptIncident}
                    onReject={handleRejectIncident}
                    isDark={isDark}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="monitor" className="w-full">
          <TabsList className={cn(isDark ? "bg-gray-800" : "bg-white")}>
            <TabsTrigger value="monitor">Live Monitor</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="cameras">Camera Network</TabsTrigger>
          </TabsList>

          {/* Live Monitor Tab */}
          <TabsContent value="monitor" className="space-y-6 mt-6">
            {/* Video Player and Clip Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Player - Takes 2/3 width */}
              <div className="lg:col-span-2">
                <div className="aspect-video w-full">
                  <VideoPlayerPro
                    videoUrl={selectedIncident?.videoUrl}
                    isLive={!selectedIncident}
                    location={selectedIncident?.location}
                    timestamp={selectedIncident?.timestamp}
                    cameraId={selectedIncident?.cameraId}
                  />
                </div>

                {/* Recording Timeline Info */}
                <div className={cn(
                  "mt-4 rounded-lg shadow-sm border p-4",
                  isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
                )}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>
                        {selectedIncident
                          ? `Recording 2026-01-22 ${selectedIncident.timestamp.toLocaleTimeString()} - Copy`
                          : "Live Monitoring Mode"}
                      </p>
                      <p className={cn("text-xs mt-0.5", isDark ? "text-gray-400" : "text-gray-500")}>
                        {selectedIncident
                          ? `10-second incident clip from ${selectedIncident.cameraId}`
                          : "Waiting for AI detection alerts"}
                      </p>
                    </div>
                    {selectedIncident && (
                      <Badge variant="outline" className="text-xs">
                        Loop: ON
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Clip Details - Takes 1/3 width */}
              <div className="lg:col-span-1">
                <div className="h-full min-h-[500px]">
                  <ClipDetailsPro incident={selectedIncident} isDark={isDark} />
                </div>
              </div>
            </div>

            {/* Activity Feed and Recent Incidents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Feed */}
              <div className="lg:col-span-1 h-[400px]">
                <ActivityFeed activities={activities} isDark={isDark} />
              </div>

              {/* Recent Incidents History */}
              <div className="lg:col-span-2">
                {filteredIncidents.length > 0 && (
                  <div className={cn(
                    "rounded-xl shadow-sm border p-6 h-[400px]",
                    isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
                  )}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-1 h-5 rounded-full", isDark ? "bg-blue-400" : "bg-blue-500")} />
                        <h3 className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>
                          Recent Incidents
                        </h3>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {filteredIncidents.length} Total
                      </Badge>
                    </div>

                    <ScrollArea className="h-[calc(100%-3rem)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-4">
                        {filteredIncidents.slice(0, 8).map((incident) => (
                          <button
                            key={incident.id}
                            onClick={() => setSelectedIncident(incident)}
                            className={cn(
                              "text-left p-4 rounded-lg border-2 transition-all",
                              isDark
                                ? "border-gray-700 hover:border-blue-500 bg-gray-900/50 hover:bg-gray-900"
                                : "border-gray-200 hover:border-blue-500 bg-gray-50 hover:bg-blue-50",
                              selectedIncident?.id === incident.id && (isDark ? "border-blue-500 bg-gray-900" : "border-blue-500 bg-blue-50")
                            )}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge className="text-xs capitalize bg-gray-200 text-gray-700 hover:bg-gray-200">
                                {incident.type}
                              </Badge>
                              <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>
                                {incident.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                            <p className={cn("font-medium text-sm mb-1", isDark ? "text-white" : "text-gray-900")}>
                              {incident.location}
                            </p>
                            <p className={cn("text-xs", isDark ? "text-gray-400" : "text-gray-600")}>
                              {incident.cameraId} • {incident.accuracy}% confidence
                            </p>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <AnalyticsChart isDark={isDark} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={cn(
                "rounded-xl shadow-sm border p-6",
                isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
              )}>
                <h3 className={cn("font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>
                  Incident Distribution
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Stampede</span>
                      <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>45%</span>
                    </div>
                    <div className={cn("h-2 rounded-full", isDark ? "bg-gray-700" : "bg-gray-200")}>
                      <div className="h-full w-[45%] bg-orange-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Fire</span>
                      <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>30%</span>
                    </div>
                    <div className={cn("h-2 rounded-full", isDark ? "bg-gray-700" : "bg-gray-200")}>
                      <div className="h-full w-[30%] bg-red-500 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Violence</span>
                      <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-gray-900")}>25%</span>
                    </div>
                    <div className={cn("h-2 rounded-full", isDark ? "bg-gray-700" : "bg-gray-200")}>
                      <div className="h-full w-[25%] bg-purple-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className={cn(
                "rounded-xl shadow-sm border p-6",
                isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
              )}>
                <h3 className={cn("font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>
                  Response Time
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className={cn("text-3xl font-bold", isDark ? "text-white" : "text-gray-900")}>2.4s</p>
                    <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Avg Detection Time</p>
                  </div>
                  <div className="text-center">
                    <p className={cn("text-3xl font-bold", isDark ? "text-white" : "text-gray-900")}>45s</p>
                    <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Avg Response Time</p>
                  </div>
                </div>
              </div>

              <div className={cn(
                "rounded-xl shadow-sm border p-6",
                isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
              )}>
                <h3 className={cn("font-semibold mb-4", isDark ? "text-white" : "text-gray-900")}>
                  Accuracy Rate
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className={cn("text-3xl font-bold text-green-500")}>92.5%</p>
                    <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Overall Accuracy</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center text-sm">
                    <div>
                      <p className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>87</p>
                      <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>True Positives</p>
                    </div>
                    <div>
                      <p className={cn("font-semibold", isDark ? "text-white" : "text-gray-900")}>7</p>
                      <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>False Alarms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Camera Network Tab */}
          <TabsContent value="cameras" className="mt-6">
            <LiveCameraGrid cameras={mockCameras} isDark={isDark} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
