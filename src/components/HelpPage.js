import { useState } from '@wordpress/element';
import { IconArticle, IconCheckCircle, IconArrowRight, IconSparkle } from './Icons';

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            className={`ml-3 px-3 py-1 rounded-md text-xs font-bold transition-all flex-shrink-0 ${
                copied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600'
            }`}
        >
            {copied ? '✓ Copied!' : 'Copy'}
        </button>
    );
};

const ShortcodeBlock = ({ code, description }) => (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
            <code className="text-sm font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg inline-block">{code}</code>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{description}</p>
        </div>
        <CopyButton text={code} />
    </div>
);

const StepCard = ({ number, title, description, icon }) => (
    <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-black">
            {number}
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{description}</p>
        </div>
    </div>
);

const AccordionItem = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            >
                <span className="text-sm font-bold text-slate-900">{title}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 256 256"
                    fill="currentColor"
                >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                    {children}
                </div>
            )}
        </div>
    );
};

const HelpPage = () => {
    const [activeSection, setActiveSection] = useState('getting-started');

    const sections = [
        { id: 'getting-started', label: 'Getting Started' },
        { id: 'shortcodes', label: 'Shortcodes' },
        { id: 'settings-guide', label: 'Settings Guide' },
        { id: 'faq', label: 'FAQ' },
    ];

    return (
        <div className="fnh-admin-wrap">
            <div className="p-4 md:p-8 flex justify-center min-h-screen bg-slate-50 font-inter">
                <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-fit">

                    {/* Header — matches main dashboard */}
                    <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 bg-white">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-500" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48a8,8,0,0,1-16,0V100a8,8,0,0,1,16,0Z" /></svg>
                                Help & Documentation
                            </h1>
                            <p className="text-xs text-gray-500 mt-1">Everything you need to set up and use Floating News Headline</p>
                        </div>
                        <a
                            href="https://awplife.com/contact/"
                            target="_blank"
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-sm flex items-center gap-2"
                        >
                            Contact Support <IconArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Section Tabs */}
                    <div className="px-6 border-b border-gray-200 bg-white">
                        <nav className="flex space-x-1 sm:space-x-6 overflow-x-auto" aria-label="Help Sections">
                            {sections.map(section => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`whitespace-nowrap py-4 px-2 border-b-2 font-semibold text-sm transition-colors ${
                                        activeSection === section.id
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 bg-white flex-1 min-h-[400px]">

                        {/* ═══════════ GETTING STARTED ═══════════ */}
                        {activeSection === 'getting-started' && (
                            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">

                                {/* Quick Start */}
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Quick Start Guide</h2>
                                    <p className="text-sm text-slate-500 mb-6">Get your news ticker up and running in under 2 minutes.</p>

                                    <div className="bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 rounded-xl p-6 space-y-6">
                                        <StepCard
                                            number="1"
                                            title="Activate the Plugin"
                                            description="After installing and activating the plugin, navigate to 'News Headlines' in your WordPress admin sidebar."
                                        />
                                        <StepCard
                                            number="2"
                                            title="Choose a Theme"
                                            description="Click the 'Themes' tab and pick from Corporate Classic, Dark Professional, or Emerald Floating Pill. The live preview updates instantly."
                                        />
                                        <StepCard
                                            number="3"
                                            title="Set Your Content Source"
                                            description="Go to the 'Content' tab. Choose 'Latest Posts' to auto-sync, 'Manual Selection' to pick specific posts, or 'Custom Alert' for a custom message."
                                        />
                                        <StepCard
                                            number="4"
                                            title="Customize Animation"
                                            description="Adjust the scroll speed (5s to 100s) and headline spacing (20px to 300px) in the 'Animation' tab. Enable 'Pause on Hover' for better readability."
                                        />
                                        <StepCard
                                            number="5"
                                            title="Configure Visibility"
                                            description="In the 'Visibility' tab, choose to display on all pages or homepage only. Select 'Fixed' or 'Sticky on Scroll' behavior."
                                        />
                                        <StepCard
                                            number="6"
                                            title="Save & Go Live"
                                            description="Click 'Save Changes'. Your ticker is now live! By default, it auto-injects at the top of your site using the Sticky Top placement."
                                        />
                                    </div>
                                </div>

                                {/* Placement Methods */}
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Placement Methods</h2>
                                    <p className="text-sm text-slate-500 mb-4">Two ways to display the ticker on your site.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                                            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="4" rx="1"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="3" y1="14" x2="21" y2="14"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900">Sticky Top (Auto)</h3>
                                            <p className="text-xs text-slate-500 leading-relaxed">The ticker automatically appears at the very top of your site. No shortcode or widget needed. Uses the <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">wp_body_open</code> hook. This is the <strong>default and recommended</strong> method.</p>
                                        </div>
                                        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                                            <div className="w-9 h-9 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-900">Shortcode (Manual)</h3>
                                            <p className="text-xs text-slate-500 leading-relaxed">Place the ticker anywhere using a shortcode — in pages, posts, sidebar widgets, or page builder columns. See the <strong>Shortcodes</strong> tab for all available shortcodes.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══════════ SHORTCODES ═══════════ */}
                        {activeSection === 'shortcodes' && (
                            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Available Shortcodes</h2>
                                    <p className="text-sm text-slate-500 mb-6">Use these shortcodes to manually place the ticker anywhere on your WordPress site.</p>

                                    <div className="space-y-4">
                                        <ShortcodeBlock
                                            code="[floating_news_headline_ticker]"
                                            description="Primary shortcode. Renders the full news ticker with all your configured settings (theme, content source, speed, spacing, and labels)."
                                        />
                                        <ShortcodeBlock
                                            code="[fnh_ticker]"
                                            description="Short alias — provides the exact same functionality as the primary shortcode above. Use whichever you prefer."
                                        />
                                    </div>
                                </div>

                                {/* Where to use */}
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Where Can You Use Shortcodes?</h2>
                                    <p className="text-sm text-slate-500 mb-4">The shortcode works in any area that supports WordPress shortcodes:</p>

                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <IconCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Pages & Posts</h4>
                                                <p className="text-xs text-slate-500">Paste the shortcode directly into the WordPress Block Editor (Gutenberg) using a <strong>Shortcode block</strong>, or into the Classic Editor.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <IconCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Sidebar Widgets</h4>
                                                <p className="text-xs text-slate-500">Add a <strong>Text</strong> or <strong>Custom HTML</strong> widget to any sidebar or widget area and paste the shortcode inside.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <IconCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Page Builders (Elementor, Divi, Beaver, etc.)</h4>
                                                <p className="text-xs text-slate-500">Use the <strong>Shortcode module/widget</strong> within your favorite page builder. The ticker renders inside the builder section.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <IconCheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900">Theme Template Files (Developers)</h4>
                                                <p className="text-xs text-slate-500">Use <code className="text-xs bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono">&lt;?php echo do_shortcode('[fnh_ticker]'); ?&gt;</code> in any PHP template file.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Important Notes */}
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Important Notes</h2>
                                    <div className="space-y-3 mt-4">
                                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,160a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm8-48a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" /></svg>
                                            <div>
                                                <h4 className="text-sm font-bold text-amber-900">Shortcode vs Sticky Top</h4>
                                                <p className="text-xs text-amber-800 leading-relaxed mt-1">If you use the <strong>Sticky Top</strong> auto-placement (default), the ticker will <strong>already</strong> appear at the top of your site. If you also add the shortcode on a page, the ticker will appear in <strong>both</strong> locations. To avoid duplication, change the placement setting to "Shortcode" mode in the main dashboard if you only want shortcode-based placement.</p>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a8,8,0,0,1-16,0V128a8,8,0,0,1,16,0Z" /></svg>
                                            <div>
                                                <h4 className="text-sm font-bold text-blue-900">Ticker Must Be Enabled</h4>
                                                <p className="text-xs text-blue-800 leading-relaxed mt-1">The shortcode will only render content when the ticker is <strong>enabled</strong> via the toggle switch in the main dashboard. If the toggle is off, the shortcode outputs nothing.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Developer Hook */}
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Developer Filter Hook</h2>
                                    <p className="text-sm text-slate-500 mb-4">Programmatically modify ticker items before they render.</p>

                                    <div className="bg-slate-900 rounded-xl p-5 overflow-x-auto">
                                        <pre className="text-sm text-slate-200 font-mono leading-relaxed whitespace-pre"><code>{`add_filter( 'floating_news_headline_items', function( $items, $settings ) {
    // Example: Add a custom item at the beginning
    array_unshift( $items, array(
        'id'        => 0,
        'title'     => 'Custom Injected Headline',
        'image_url' => '',
        'link_url'  => 'https://example.com',
        'meta'      => 'Custom Source',
    ) );
    return $items;
}, 10, 2 );`}</code></pre>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-3">This filter receives the <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">$items</code> array and <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">$settings</code> array. Return the modified <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">$items</code>.</p>
                                </div>
                            </div>
                        )}

                        {/* ═══════════ SETTINGS GUIDE ═══════════ */}
                        {activeSection === 'settings-guide' && (
                            <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Settings Reference</h2>
                                    <p className="text-sm text-slate-500 mb-6">A complete reference for every setting available in the dashboard.</p>
                                </div>

                                {/* Settings Table */}
                                <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200">
                                                <th className="py-3 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-1/4">Setting</th>
                                                <th className="py-3 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-1/4">Location</th>
                                                <th className="py-3 px-5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Enable/Disable</td><td className="py-3 px-5 text-sm text-slate-500">Header Toggle</td><td className="py-3 px-5 text-sm text-slate-600">Turn the entire ticker on or off globally without deactivating the plugin.</td></tr>
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Template/Theme</td><td className="py-3 px-5 text-sm text-slate-500">Themes Tab</td><td className="py-3 px-5 text-sm text-slate-600">Choose between Corporate Classic, Dark Professional, or Emerald Floating Pill design.</td></tr>
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Content Source</td><td className="py-3 px-5 text-sm text-slate-500">Content Tab</td><td className="py-3 px-5 text-sm text-slate-600">Choose Latest Posts (auto-sync), Manual Selection (pick up to 5 posts), or Custom Alert (custom text + link).</td></tr>
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Header Label</td><td className="py-3 px-5 text-sm text-slate-500">Content Tab</td><td className="py-3 px-5 text-sm text-slate-600">Change the ticker label text (e.g., "Breaking News", "Latest Updates", "Headlines").</td></tr>
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Number of Headlines</td><td className="py-3 px-5 text-sm text-slate-500">Content Tab</td><td className="py-3 px-5 text-sm text-slate-600">Set how many recent posts to display (1–10). Only applies to "Latest Posts" source.</td></tr>
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Scroll Speed</td><td className="py-3 px-5 text-sm text-slate-500">Animation Tab</td><td className="py-3 px-5 text-sm text-slate-600">Control scrolling duration from 5s (fast) to 100s (slow). Default: 35s.</td></tr>
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Headline Gap</td><td className="py-3 px-5 text-sm text-slate-500">Animation Tab</td><td className="py-3 px-5 text-sm text-slate-600">Spacing between ticker items from 20px to 300px. Default: 80px.</td></tr>
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Pause on Hover</td><td className="py-3 px-5 text-sm text-slate-500">Animation Tab</td><td className="py-3 px-5 text-sm text-slate-600">Pauses the scrolling animation when the user hovers their mouse over the ticker.</td></tr>
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Display Pages</td><td className="py-3 px-5 text-sm text-slate-500">Visibility Tab</td><td className="py-3 px-5 text-sm text-slate-600">Show the ticker on the entire website or homepage only.</td></tr>
                                            <tr className="hover:bg-slate-50/50"><td className="py-3 px-5 text-sm font-semibold text-slate-900">Scroll Behavior</td><td className="py-3 px-5 text-sm text-slate-500">Visibility Tab</td><td className="py-3 px-5 text-sm text-slate-600">"Fixed" hides after scroll. "Sticky on Scroll" keeps the ticker visible at all times.</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Theme Details */}
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-4 mt-8">Theme Descriptions</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                                            <div className="w-full h-3 bg-indigo-500 rounded-full"></div>
                                            <h3 className="text-sm font-bold text-slate-900">Corporate Classic</h3>
                                            <p className="text-xs text-slate-500 leading-relaxed">Clean, professional Indigo design with post thumbnails, author/category metadata, and a document icon label. Perfect for business and corporate sites.</p>
                                        </div>
                                        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                                            <div className="w-full h-3 bg-slate-800 rounded-full"></div>
                                            <h3 className="text-sm font-bold text-slate-900">Dark Professional</h3>
                                            <p className="text-xs text-slate-500 leading-relaxed">High-contrast dark Slate design with emerald status pulse, gradient blur overlays, and pipe dividers. Ideal for tech, gaming, and entertainment sites.</p>
                                        </div>
                                        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                                            <div className="w-full h-3 bg-emerald-500 rounded-full"></div>
                                            <h3 className="text-sm font-bold text-slate-900">Emerald Floating Pill</h3>
                                            <p className="text-xs text-slate-500 leading-relaxed">Modern mint-green design with glassmorphism effects and a distinctive rounded pill label. Great for blogs, startups, and creative portfolios.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ═══════════ FAQ ═══════════ */}
                        {activeSection === 'faq' && (
                            <div className="max-w-4xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Frequently Asked Questions</h2>
                                    <p className="text-sm text-slate-500">Common questions about using the plugin.</p>
                                </div>

                                <AccordionItem title="How do I enable or disable the ticker?" defaultOpen={true}>
                                    Go to <strong>News Headlines</strong> in your WordPress admin. Use the <strong>toggle switch</strong> in the top-right corner of the dashboard to enable or disable the ticker globally. You do not need to deactivate the plugin itself.
                                </AccordionItem>

                                <AccordionItem title="Will this plugin slow down my website?">
                                    No. The total frontend footprint is under <strong>40KB</strong> (CSS + JS). It uses vanilla JavaScript (no jQuery), GPU-accelerated CSS animations, and WordPress Transient caching (10-minute cache). It is one of the lightest ticker plugins available.
                                </AccordionItem>

                                <AccordionItem title="Does it conflict with my theme?">
                                    Very unlikely. All CSS uses the <strong>BEM naming convention</strong> with the <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">fnh-</code> prefix, which prevents naming collisions. The ticker is injected via <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">wp_body_open</code> or shortcode — both standard WordPress hooks.
                                </AccordionItem>

                                <AccordionItem title="Can I display a custom alert instead of posts?">
                                    Yes. In the <strong>Content</strong> tab, select <strong>Custom Alert</strong> as the source. Enter your alert message text and an optional link URL. Perfect for announcements like "Black Friday Sale — 50% Off!" with a direct link.
                                </AccordionItem>

                                <AccordionItem title="Can I show the ticker only on the homepage?">
                                    Yes. In the <strong>Visibility</strong> tab, set "Display On" to <strong>Homepage Only</strong>. The ticker will only appear on the front page and blog index page.
                                </AccordionItem>

                                <AccordionItem title="How do I change the label text?">
                                    In the <strong>Content</strong> tab, find the <strong>Header Label Text</strong> field. You can change it to anything like "Breaking News", "Trending", "Headlines", "Alerts", etc.
                                </AccordionItem>

                                <AccordionItem title="Can I use it with Elementor, Divi, or other page builders?">
                                    Absolutely. Use the shortcode <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">[fnh_ticker]</code> inside any page builder shortcode or text module. Or use the default Sticky Top placement, which works with every theme and builder automatically.
                                </AccordionItem>

                                <AccordionItem title="Is the plugin translatable?">
                                    Yes. The plugin uses the <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">floating-news-headline</code> text domain. All user-facing strings are wrapped in WordPress i18n functions. Translate using Loco Translate or any .po/.mo editor.
                                </AccordionItem>

                                <AccordionItem title="What developer hooks are available?">
                                    The filter <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">floating_news_headline_items</code> lets you modify the array of ticker items before they are rendered. It receives <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">$items</code> and <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">$settings</code> — see the Shortcodes tab for a code example.
                                </AccordionItem>

                                <AccordionItem title="How does the caching work?">
                                    The plugin uses WordPress Transients to cache fetched post data for <strong>10 minutes</strong>. When you save settings, the cache is automatically invalidated via a versioned cache key strategy — no raw SQL needed.
                                </AccordionItem>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-slate-50 flex items-center justify-between">
                        <p className="text-xs text-slate-400">Floating News Headline — by <a href="https://awplife.com/" target="_blank" className="text-indigo-500 hover:underline font-medium">A WP Life</a></p>
                        <a href="https://wordpress.org/support/plugin/floating-news-headline/" target="_blank" className="text-xs text-indigo-500 hover:underline font-medium">WordPress.org Support Forum →</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
