import { useState } from 'react';
import { Users, Activity, AlertCircle } from 'lucide-react';
import { Toaster } from 'sonner';
import { Navbar } from '@/app/components/Navbar';
import { StatusCard } from '@/app/components/StatusCard';
import { CameraFeed } from '@/app/components/CameraFeed';
import { HeatmapPanel } from '@/app/components/HeatmapPanel';
import { AlertPanel } from '@/app/components/AlertPanel';
import { RouteMap } from '@/app/components/RouteMap';
import { ActionButtons } from '@/app/components/ActionButtons';
import { SystemPanel } from '@/app/components/SystemPanel';
import { NotificationPanel } from '@/app/components/NotificationPanel';
import { AIPathCreator } from '@/app/components/AIPathCreator';
import { LiveFeedPage } from '@/app/components/LiveFeedPage';
import { AlertsPage } from '@/app/components/AlertsPage';
import { RoutesPage } from '@/app/components/RoutesPage';
import { ReportsPage } from '@/app/components/ReportsPage';


export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentRole, setCurrentRole] = useState<string>('Organizer');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('Dashboard');

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const handleRoleChange = (role: string) => setCurrentRole(role);
  const handleZoneClick = (zone: string) => setSelectedZone(zone);

  const cameraFeeds: { id: string; location: string; status: 'online' | 'offline'; streamUrl: string }[] = [
    { id: 'Drone Cam 1', location: 'University Building (UB) - Normal', status: 'online', streamUrl: 'http://localhost:8000/video_feed/cam1?mode=none' },
    { id: 'Drone Cam 2', location: 'Java Canteen - Fire Detection', status: 'online', streamUrl: 'http://localhost:8000/video_feed/cam2?mode=fire' },
    { id: 'Drone Cam 3', location: 'Tech Park 1 - Fight Detection', status: 'online', streamUrl: 'http://172.28.84.87:4747/video' },
    { id: 'Drone Cam 4', location: 'Tech Park 2 - Crowd/Stampede', status: 'online', streamUrl: 'http://172.28.84.104:4747/video' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <Toaster theme={theme} position="top-right" richColors closeButton />
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="p-6">
        {/* ── NON-DASHBOARD TABS ── full-width, no sidebar */}
        {activeTab === 'Live Feed' && <LiveFeedPage theme={theme} />}
        {activeTab === 'Alerts' && <AlertsPage theme={theme} />}
        {activeTab === 'Routes' && <RoutesPage theme={theme} />}
        {activeTab === 'Reports' && <ReportsPage theme={theme} />}

        {/* ── DASHBOARD TAB ── with side panel */}
        {activeTab === 'Dashboard' && (
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-3 gap-6">
                <StatusCard title="Current Crowd Level" value="High" icon={Users} status="danger" theme={theme} />
                <StatusCard title="People Detected" value="8,542" icon={Activity} status="warning" theme={theme} />
                <StatusCard title="Risk Level" value="Critical" icon={AlertCircle} status="danger" theme={theme} />
              </div>

              {/* Camera Feeds */}
              <div>
                <h2 className={`text-xl font-bold mb-4 tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'text-blue-700'}`}>
                  <Activity size={20} className="animate-pulse" />
                  AI SENSOR FEEDS (AWS Sagemaker Models)
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {cameraFeeds.map((feed) => (
                    <CameraFeed
                      key={feed.id}
                      id={feed.id}
                      location={feed.location}
                      status={feed.status}
                      streamUrl={feed.streamUrl}
                      theme={theme}
                    />
                  ))}
                </div>
              </div>

              {/* Heatmap and Alerts */}
              <div className="grid grid-cols-2 gap-6">
                <HeatmapPanel theme={theme} onZoneClick={handleZoneClick} selectedZone={selectedZone} />
                <AlertPanel theme={theme} />
              </div>

              {/* Route Map */}
              <RouteMap theme={theme} selectedZone={selectedZone} />

              {/* Notification Panel */}
              <NotificationPanel theme={theme} currentRole={currentRole} />

              {/* Action Buttons */}
              <ActionButtons theme={theme} />
            </div>

            {/* Side Panel */}
            <div className="w-96 flex flex-col gap-6 overflow-y-auto pb-8 pr-2">
              <SystemPanel theme={theme} />
              <AIPathCreator theme={theme} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}