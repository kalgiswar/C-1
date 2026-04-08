import { CameraFeed } from '@/app/components/CameraFeed';
import { Activity } from 'lucide-react';

interface LiveFeedPageProps {
  theme: 'dark' | 'light';
}

const cameraFeeds = [
  { id: 'Drone Cam 1', location: 'University Building (UB) - Normal', status: 'online' as const, streamUrl: 'http://localhost:8000/video_feed/cam1?mode=none' },
  { id: 'Drone Cam 2', location: 'Java Canteen - Fire Detection', status: 'online' as const, streamUrl: 'http://localhost:8000/video_feed/cam1?mode=fire' },
  { id: 'Drone Cam 3', location: 'Tech Park 1 - Fight Detection', status: 'online' as const, streamUrl: 'http://localhost:8000/video_feed/cam1?mode=fight' },
  { id: 'Drone Cam 4', location: 'Tech Park 2 - Crowd/Stampede', status: 'online' as const, streamUrl: 'http://localhost:8000/video_feed/cam1?mode=crowd' },
];

export function LiveFeedPage({ theme }: LiveFeedPageProps) {
  const heading = theme === 'dark' ? 'text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]' : 'text-blue-700';

  return (
    <div>
      <h2 className={`text-xl font-bold mb-6 tracking-wider flex items-center gap-2 ${heading}`}>
        <Activity size={20} className="animate-pulse" />
        LIVE CAMERA FEEDS
      </h2>
      <div className="grid grid-cols-2 gap-6">
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
  );
}
