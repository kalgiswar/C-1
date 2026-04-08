import { useState } from 'react';
import { Cpu, Plus, Trash2, Wand2 } from 'lucide-react';

interface AIPathCreatorProps {
  theme: 'dark' | 'light';
}

export function AIPathCreator({ theme }: AIPathCreatorProps) {
  const [paths, setPaths] = useState<string[]>([
    'Gate A → Food Court → Stage',
    'Parking → Main Entrance → Zone B',
  ]);
  const [input, setInput] = useState('');

  const addPath = () => {
    const trimmed = input.trim();
    if (trimmed) {
      setPaths((prev) => [...prev, trimmed]);
      setInput('');
    }
  };

  const removePath = (index: number) => {
    setPaths((prev) => prev.filter((_, i) => i !== index));
  };

  const card = theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-200 text-gray-900';
  const sub = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  const inputCls = theme === 'dark'
    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400';
  const rowCls = theme === 'dark' ? 'bg-slate-800 text-gray-300' : 'bg-gray-50 text-gray-700';

  return (
    <div className={`border rounded-xl p-6 ${card}`}>
      <div className="flex items-center gap-2 mb-4">
        <Cpu size={20} className="text-indigo-400" />
        <h3 className="text-lg font-semibold">AI Path Creator</h3>
      </div>
      <p className={`text-sm mb-4 ${sub}`}>Define custom evacuation / crowd-flow paths.</p>

      <div className="flex gap-2 mb-4">
        <input
          className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputCls}`}
          placeholder="e.g. Gate A → Stage → Exit"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addPath()}
        />
        <button
          onClick={addPath}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="space-y-2">
        {paths.map((path, i) => (
          <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${rowCls}`}>
            <div className="flex items-center gap-2">
              <Wand2 size={14} className="text-indigo-400 shrink-0" />
              <span>{path}</span>
            </div>
            <button onClick={() => removePath(i)} className="text-red-400 hover:text-red-300 transition-colors ml-2">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {paths.length === 0 && (
          <p className={`text-sm text-center py-4 ${sub}`}>No paths added yet.</p>
        )}
      </div>
    </div>
  );
}
