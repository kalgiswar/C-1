import { Shield, Moon, Sun, UserCircle } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export function Navbar({ theme, toggleTheme, currentRole, onRoleChange }: NavbarProps) {
  const menuItems = ['Dashboard', 'Live Feed', 'Alerts', 'Routes', 'Reports'];
  const roles = ['Organizer', 'Police', 'Volunteer'];

  return (
    <nav className={`${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Shield className="text-white" size={24} />
            </div>
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              CrowdShield
            </span>
          </div>
          
          <div className="flex gap-6">
            {menuItems.map((item, index) => (
              <button
                key={item}
                className={`${
                  index === 0
                    ? theme === 'dark'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-blue-600 border-b-2 border-blue-600'
                    : theme === 'dark'
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                } transition-colors pb-1`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Role Selector */}
          <div className="flex items-center gap-2">
            <UserCircle className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className={`${
                theme === 'dark'
                  ? 'bg-slate-800 text-white border-slate-700'
                  : 'bg-gray-100 text-gray-900 border-gray-300'
              } border rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role} View
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}