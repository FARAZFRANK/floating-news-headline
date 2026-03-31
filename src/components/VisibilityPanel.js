import { IconCaretDown } from './Icons';

const VisibilityPanel = ({ settings, updateSetting }) => {
    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 md:p-8 space-y-4">
                <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider">Display Target Pages</label>
                <div className="relative">
                    <select 
                        value={settings.display_pages || 'all'}
                        onChange={(e) => updateSetting('display_pages', e.target.value)}
                        className="block w-full bg-white border border-slate-300 rounded-lg py-3 px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none transition-all cursor-pointer"
                    >
                        <option value="all">Entire Website</option>
                        <option value="home">Home Page Only</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <IconCaretDown className="w-4 h-4" />
                    </div>
                </div>
                <p className="text-xs text-slate-400">Control where the floating ticker appears automatically.</p>
            </div>
        </div>
    );
};

export default VisibilityPanel;
