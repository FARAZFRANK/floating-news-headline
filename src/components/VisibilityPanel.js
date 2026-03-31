import { IconCaretDown } from './Icons';

const VisibilityPanel = ({ settings, updateSetting }) => {
    const scrollBehavior = settings.scroll_behavior || 'fixed';

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">

            {/* Display Pages */}
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

            {/* Scroll Behavior */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 md:p-8 space-y-4">
                <div>
                    <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wider">Scroll Behavior</label>
                    <p className="text-xs text-slate-400 mt-1">Choose how the headline bar behaves on page scroll.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Fixed Option */}
                    <button
                        type="button"
                        onClick={() => updateSetting('scroll_behavior', 'fixed')}
                        className={`relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                            scrollBehavior === 'fixed'
                                ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                    >
                        {/* Icon */}
                        <div className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${scrollBehavior === 'fixed' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${scrollBehavior === 'fixed' ? 'text-indigo-600' : 'text-slate-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="4" rx="1"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                                <line x1="3" y1="14" x2="21" y2="14"/>
                                <line x1="3" y1="18" x2="21" y2="18"/>
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <span className={`text-sm font-semibold ${scrollBehavior === 'fixed' ? 'text-indigo-700' : 'text-slate-800'}`}>Fixed</span>
                                {scrollBehavior === 'fixed' && (
                                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">Default</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Always visible at the top of the page, regardless of scroll position.</p>
                        </div>
                        {/* Radio Dot */}
                        <div className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${scrollBehavior === 'fixed' ? 'border-indigo-500' : 'border-slate-300'}`}>
                            {scrollBehavior === 'fixed' && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                        </div>
                    </button>

                    {/* Sticky on Scroll Option */}
                    <button
                        type="button"
                        onClick={() => updateSetting('scroll_behavior', 'sticky_on_scroll')}
                        className={`relative flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                            scrollBehavior === 'sticky_on_scroll'
                                ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                                : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                    >
                        {/* Icon */}
                        <div className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${scrollBehavior === 'sticky_on_scroll' ? 'bg-indigo-100' : 'bg-slate-100'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${scrollBehavior === 'sticky_on_scroll' ? 'text-indigo-600' : 'text-slate-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="17 11 12 6 7 11"/>
                                <line x1="12" y1="6" x2="12" y2="18"/>
                                <rect x="3" y="19" width="18" height="2" rx="1"/>
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className={`text-sm font-semibold ${scrollBehavior === 'sticky_on_scroll' ? 'text-indigo-700' : 'text-slate-800'}`}>Sticky on Scroll</span>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">Hidden initially. Slides in and sticks to the top after the user scrolls down.</p>
                        </div>
                        {/* Radio Dot */}
                        <div className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${scrollBehavior === 'sticky_on_scroll' ? 'border-indigo-500' : 'border-slate-300'}`}>
                            {scrollBehavior === 'sticky_on_scroll' && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VisibilityPanel;
