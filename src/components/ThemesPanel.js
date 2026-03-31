const ThemesPanel = ({ settings, updateSetting }) => {
    const themes = [
        {
            id: 'corporate',
            name: 'Corporate Classic',
            description: 'Clean, professional business design with side-fades.',
            previewColor: 'bg-indigo-600',
            textColor: 'text-gray-900',
            bgClass: 'bg-white',
        },
        {
            id: 'dark',
            name: 'Dark Professional',
            description: 'Sleek dark mode with emerald pulse and item dividers.',
            previewColor: 'bg-[#1e293b]',
            textColor: 'text-gray-200',
            bgClass: 'bg-[#0f172a]',
            isDark: true,
        },
        {
            id: 'pill',
            name: 'Emerald Floating Pill',
            description: 'Rounded pill-shape with high-contrast shadows.',
            previewColor: 'bg-emerald-50',
            textColor: 'text-gray-600',
            bgClass: 'bg-white',
            isPill: true,
        }
    ];

    return (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {themes.map((theme) => (
                <label 
                    key={theme.id}
                    className={`relative flex flex-col md:flex-row items-stretch border rounded-xl overflow-hidden cursor-pointer transition-all shadow-sm h-24 ${settings.template === theme.id ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                >
                    <input 
                        type="radio" 
                        name="theme_selection" 
                        className="sr-only" 
                        checked={settings.template === theme.id}
                        onChange={() => updateSetting('template', theme.id)}
                    />
                    
                    {/* Theme Name & Info */}
                    <div className={`md:w-1/4 p-6 flex items-center ${settings.template === theme.id ? 'bg-indigo-50/30' : 'bg-transparent'}`}>
                        <h3 className="text-base font-bold text-gray-900 tracking-tight">{theme.name}</h3>
                    </div>

                    {/* Static Design Mockup Area */}
                    <div className="flex-1 bg-white p-6 flex items-center justify-end overflow-hidden">
                        <div className={`flex items-stretch border overflow-hidden h-12 w-full max-w-2xl shadow-xs transition-all duration-300 ${theme.id === 'pill' ? 'bg-[#ecfdf5] border-[#d1fae5] rounded-full p-1' : theme.id === 'dark' ? 'bg-[#0f172a] border-[#1e293b] rounded-lg' : 'bg-white border-[#f1f5f9] rounded-lg'}`}>
                            
                            {/* Label Mockup */}
                            <div className={`px-5 flex items-center justify-center text-[10px] font-bold whitespace-nowrap z-10 gap-2 ${theme.id === 'pill' ? 'bg-[#10b981] text-white rounded-full h-full' : theme.id === 'dark' ? 'bg-[#1e2937] text-gray-100 border-r border-[#334155]' : 'bg-[#7983f2] text-white border-r border-indigo-400'}`}>
                                {theme.id === 'corporate' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                )}
                                {theme.id === 'dark' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>}
                                {theme.id === 'pill' ? 'NEWS' : 'NEWS'}
                            </div>

                            {/* Text Area Mockup */}
                            <div className="flex-1 flex items-center px-6">
                                <span className={`text-[11px] font-bold whitespace-nowrap ${theme.id === 'dark' ? 'text-white' : theme.id === 'pill' ? 'text-emerald-900' : 'text-slate-900'}`}>Latest Breaking Headline #2</span>
                            </div>

                            {/* Button Mockup */}
                            <div className={`flex items-center justify-center flex-shrink-0 ${theme.id === 'pill' ? 'w-10 h-10 bg-white rounded-full text-emerald-500 shadow-sm border border-emerald-100 ml-1' : theme.id === 'dark' ? 'w-12 h-full bg-[#1e293b] text-slate-500 border-l border-[#334155]' : 'w-12 h-full bg-[#f8fafc] text-indigo-400 border-l border-[#f1f5f9]'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="3" height="16"/><rect x="15" y="4" width="3" height="16"/></svg>
                            </div>
                        </div>
                    </div>
                </label>
            ))}
        </div>
    );
};

export default ThemesPanel;
