import { useState } from '@wordpress/element';

const ShortcodePanel = () => {
    const [copied, setCopied] = useState(null);

    const shortcodes = [
        { 
            tag: '[floating_news_headline_ticker]', 
            label: 'Primary Shortcode',
            description: 'The standard shortcode to display your news ticker with current settings.'
        },
        { 
            tag: '[fnh_ticker]', 
            label: 'Legacy Alias',
            description: 'A shorter, easier-to-remember alias for the same ticker functionality.'
        }
    ];

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(text);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header section with context */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
                <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-sm">[ ]</span>
                    Manual Placement Guide
                </h3>
                <p className="text-indigo-700 mt-2 text-sm max-w-2xl leading-relaxed">
                    While the plugin can automatically show a floating bar on targeted pages, you can also place the ticker manually anywhere else on your site using these shortcodes.
                </p>
            </div>

            {/* Shortcode list */}
            <div className="grid gap-4">
                {shortcodes.map((sc) => (
                    <div key={sc.tag} className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition-all shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                        {sc.label}
                                    </span>
                                </div>
                                <code className="block bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-lg font-mono text-sm text-gray-800 my-2 select-all">
                                    {sc.tag}
                                </code>
                                <p className="text-xs text-gray-500">{sc.description}</p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(sc.tag)}
                                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                    copied === sc.tag 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-600'
                                }`}
                            >
                                {copied === sc.tag ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                        Copy
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Usage Locations */}
            <div className="border-t border-gray-100 pt-8">
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest text-center sm:text-left">
                    Where can I use it?
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { title: 'Pages', desc: 'Add to Gutenberg or Elementor' },
                        { title: 'Posts', desc: 'Inside article content' },
                        { title: 'Widgets', desc: 'Classic or Block sidebar' },
                        { title: 'Templates', desc: 'PHP Theme Files' }
                    ].map((loc) => (
                        <div key={loc.title} className="p-4 bg-slate-50 rounded-xl border border-gray-100 text-center sm:text-left">
                            <h5 className="font-bold text-gray-900 text-sm">{loc.title}</h5>
                            <p className="text-[11px] text-gray-500 mt-1">{loc.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pro Tip */}
            <div className="mt-8 flex items-start gap-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="p-1 px-2 bg-amber-100 rounded text-amber-800 text-[10px] font-bold uppercase">Tip</div>
                <p className="text-xs text-amber-800 leading-relaxed italic">
                    If you want to use the ticker in Sidebar/Widgets, make sure your theme supports shortcodes in widgets. Most modern themes do this automatically!
                </p>
            </div>
        </div>
    );
};

export default ShortcodePanel;
