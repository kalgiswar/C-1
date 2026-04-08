'use client';

import { useState } from 'react';
import { Video, Signal, Cpu, WifiOff, RefreshCw } from 'lucide-react';

interface CameraFeedProps {
  id: string;
  location: string;
  status: 'online' | 'offline';
  streamUrl?: string;
  theme: 'dark' | 'light';
}

export function CameraFeed({
  id,
  location,
  status,
  streamUrl,
  theme,
}: CameraFeedProps) {
  const [streamError, setStreamError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const isLive = status === 'online' && streamUrl && !streamError;

  const handleRetry = () => {
    setStreamError(false);
    setRetryKey((k) => k + 1);
  };

  return (
    <div
      className={`${theme === 'dark'
          ? 'bg-slate-900 border-indigo-500/30 hover:border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.15)] transition-all'
          : 'bg-white border-blue-200 shadow-md'
        } border-2 rounded-xl overflow-hidden`}
    >
      {/* VIDEO AREA */}
      <div
        className={`${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'
          } aspect-video flex items-center justify-center relative overflow-hidden`}
      >
        {isLive ? (
          <>
            {/* ✅ MJPEG stream from DroidCam — img tag is required for MJPEG */}
            <img
              key={retryKey}
              src={streamUrl}
              alt={`Live stream: ${id}`}
              className="w-full h-full object-cover"
              onError={() => setStreamError(true)}
            />

            {/* Corner tracking brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-indigo-400 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-indigo-400 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-indigo-400 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-indigo-400 pointer-events-none" />

            {/* Scan-line overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)',
              }}
            />
          </>
        ) : (
          /* Offline / error state */
          <div className="flex flex-col items-center gap-3 text-center px-4">
            {streamError ? (
              <>
                <WifiOff
                  className="text-red-400 animate-pulse"
                  size={36}
                />
                <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  Stream unreachable
                </p>
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/40 px-3 py-1 rounded-full transition-colors"
                >
                  <RefreshCw size={12} />
                  Retry
                </button>
              </>
            ) : (
              <Video
                className={`${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`}
                size={48}
              />
            )}
          </div>
        )}

        {/* LIVE / OFFLINE badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
          <Signal
            className={
              isLive ? 'text-green-400 animate-pulse' : 'text-red-500'
            }
            size={14}
          />
          <span className="text-white text-xs font-semibold tracking-wider">
            {isLive ? 'LIVE' : streamError ? 'NO SIGNAL' : 'OFFLINE'}
          </span>
        </div>

        {/* AI badge */}
        {isLive && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-indigo-900/60 backdrop-blur-sm px-2 py-1 rounded border border-indigo-500/30">
            <Cpu className="text-indigo-400 animate-pulse" size={12} />
            <span className="text-indigo-200 text-[10px] font-bold tracking-widest uppercase">
              AWS ML
            </span>
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-4 relative">
        <div
          className={`font-bold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
        >
          {id}
        </div>

        <div
          className={`text-xs mt-1 uppercase font-semibold ${theme === 'dark' ? 'text-indigo-400/80' : 'text-blue-600/80'
            }`}
        >
          {location}
        </div>

        {isLive && (
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-green-400/70 bg-green-400/10 px-2 py-0.5 rounded">
            Object Det: Active
          </div>
        )}
      </div>
    </div>
  );
}