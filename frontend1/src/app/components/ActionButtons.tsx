import { Bell, Phone } from 'lucide-react';

interface ActionButtonsProps {
  theme: 'dark' | 'light';
}

export function ActionButtons({ theme }: ActionButtonsProps) {
  return (
    <div className="flex gap-4">
      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
        <Bell size={20} />
        Send Alert to Organizer
      </button>
      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
        <Phone size={20} />
        Notify Police & Ambulance
      </button>
    </div>
  );
}
