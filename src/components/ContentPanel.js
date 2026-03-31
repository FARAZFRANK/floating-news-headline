import { IconArticle, IconPencilSimple, IconMegaphone, IconCheckCircle } from './Icons';
import { useRef, useEffect } from '@wordpress/element';
import ManualPostPicker from './ManualPostPicker';

const updateRangeFill = (slider) => {
    if (!slider) return;
    const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, #6366f1 ${val}%, #e2e8f0 ${val}%)`;
};

const ContentPanel = ({ settings, updateSetting }) => {
    const rangeRef = useRef(null);

    useEffect(() => {
        if (rangeRef.current) {
            updateRangeFill(rangeRef.current);
        }
    }, [settings.count]);

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Content Source Selection */}
            <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">Content Source Type</label>
                <div className="flex flex-row gap-4">
                    
                    {/* Latest Posts */}
                    <label className={`relative flex-1 flex flex-col p-5 cursor-pointer rounded-xl border transition-all shadow-sm ${settings.source === 'latest_posts' ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <input 
                            type="radio" 
                            name="source_type" 
                            className="sr-only" 
                            checked={settings.source === 'latest_posts'}
                            onChange={() => updateSetting('source', 'latest_posts')}
                        />
                        <div className="flex items-center justify-between mb-2">
                            <div className={`p-2 rounded-lg ${settings.source === 'latest_posts' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                                <IconArticle className="w-5 h-5" />
                            </div>
                            {settings.source === 'latest_posts' && (
                                <div className="text-indigo-600">
                                    <IconCheckCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        <span className="block text-sm font-semibold text-gray-900 mt-2">Latest Posts</span>
                        <span className="block mt-1 text-xs text-gray-500 leading-relaxed">Sync automatically with your newest published content.</span>
                    </label>

                    {/* Manual Selection */}
                    <label className={`relative flex-1 flex flex-col p-5 cursor-pointer rounded-xl border transition-all shadow-sm ${settings.source === 'manual' ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <input 
                            type="radio" 
                            name="source_type" 
                            className="sr-only" 
                            checked={settings.source === 'manual'}
                            onChange={() => updateSetting('source', 'manual')}
                        />
                        <div className="flex items-center justify-between mb-2">
                            <div className={`p-2 rounded-lg ${settings.source === 'manual' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                                <IconPencilSimple className="w-5 h-5" />
                            </div>
                            {settings.source === 'manual' && (
                                <div className="text-indigo-600">
                                    <IconCheckCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        <span className="block text-sm font-semibold text-gray-900 mt-2">Manual Selection</span>
                        <span className="block mt-1 text-xs text-gray-500 leading-relaxed">Hand-pick up to 5 specific posts or pages to display.</span>
                    </label>

                    {/* Custom Alert */}
                    <label className={`relative flex-1 flex flex-col p-5 cursor-pointer rounded-xl border transition-all shadow-sm ${settings.source === 'custom_alert' ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <input 
                            type="radio" 
                            name="source_type" 
                            className="sr-only" 
                            checked={settings.source === 'custom_alert'}
                            onChange={() => updateSetting('source', 'custom_alert')}
                        />
                        <div className="flex items-center justify-between mb-2">
                            <div className={`p-2 rounded-lg ${settings.source === 'custom_alert' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}>
                                <IconMegaphone className="w-5 h-5" />
                            </div>
                            {settings.source === 'custom_alert' && (
                                <div className="text-indigo-600">
                                    <IconCheckCircle className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                        <span className="block text-sm font-semibold text-gray-900 mt-2">Custom Alert</span>
                        <span className="block mt-1 text-xs text-gray-500 leading-relaxed">Broadcast a single, custom text message or link.</span>
                    </label>
                </div>
            </div>

            {/* Input Details */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 space-y-6">
                <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Header Label Text</label>
                    <input 
                        type="text" 
                        value={settings.labels?.latest_posts || ''}
                        onChange={(e) => updateSetting('labels', { ...settings.labels, latest_posts: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        placeholder="e.g. News, Breaking, Updates"
                    />
                    <p className="mt-2 text-xs text-slate-400">The fixed label displayed at the start of the ticker.</p>
                </div>

                {/* Conditional Source Settings */}
                <div className="pt-6 border-t border-slate-200">
                    {settings.source === 'latest_posts' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Number of Headlines</label>
                                <span className="text-sm font-bold text-indigo-600">{settings.count || 5}</span>
                            </div>
                            <input 
                                ref={rangeRef}
                                type="range" 
                                min="1" 
                                max="10" 
                                value={settings.count || 5}
                                onChange={(e) => {
                                    updateSetting('count', parseInt(e.target.value));
                                    updateRangeFill(e.target);
                                }}
                                className="fnh-custom-range flex-1"
                            />
                            <p className="text-xs text-slate-400 italic">Select how many recent posts to display automatically.</p>
                        </div>
                    )}

                    {settings.source === 'manual' && (
                        <ManualPostPicker 
                            selectedIds={settings.manual_posts || []} 
                            onChange={(ids) => updateSetting('manual_posts', ids)}
                        />
                    )}

                    {settings.source === 'custom_alert' && (
                        <div className="space-y-4">
                             <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Alert Message</label>
                                <input 
                                    type="text" 
                                    value={settings.custom_alert || ''}
                                    onChange={(e) => updateSetting('custom_alert', e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    placeholder="Enter your custom message here..."
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Target URL (Optional)</label>
                                <input 
                                    type="url" 
                                    value={settings.custom_alert_link || ''}
                                    onChange={(e) => updateSetting('custom_alert_link', e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-lg py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    placeholder="https://example.com/news"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentPanel;
