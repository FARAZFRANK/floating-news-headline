import { useState } from '@wordpress/element';
import { IconCrown, IconSparkle, IconArrowRight, IconCheckCircle } from './Icons';

const GetProPage = () => {
    const comparisonData = [
        {
            category: 'Content Sources',
            features: [
                { name: 'Blog Posts', free: 'Latest posts only', pro: 'Filter by Category / Author / Tag' },
                { name: 'Manual Selection', free: 'Limit to 5 posts', pro: 'Unlimited posts & pages', highlight: true },
                { name: 'Custom Alerts', free: '1 Single alert field', pro: 'Multi-Alert support with links', highlight: true },
                { name: 'RSS feeds', free: '❌ Not available', pro: 'Any external RSS feed URL', highlight: true },
                { name: 'WooCommerce', free: '❌ Not available', pro: 'On-Sale / Featured / Latest Products', highlight: true },
            ]
        },
        {
            category: 'Design & Styling',
            features: [
                { name: 'Premium Templates', free: '3 Core designs', pro: '10+ Exclusive templates', highlight: true },
                { name: 'Brand Colors', free: 'Primary color only', pro: 'Unlimited hex color-picker control', highlight: true },
                { name: 'Typography', free: 'System fonts only', pro: 'Google Fonts integration', highlight: true },
                { name: 'Custom CSS', free: '❌ Not available', pro: 'Custom CSS code box', highlight: true },
            ]
        },
        {
            category: 'Placement & Logic',
            features: [
                { name: 'Placement', free: 'Inline & Sticky Top', pro: 'Sticky Top & Sticky Bottom' },
                { name: 'Page Targeting', free: 'Site-wide / Home only', pro: 'Granular Category / Post / Page targeting', highlight: true },
                { name: 'Multi-Ticker', free: '1 Active ticker only', pro: 'Create & manage unlimited tickers', highlight: true },
                { name: 'Scheduling', free: '❌ Not available', pro: 'Date & Time scheduling', highlight: true },
            ]
        }
    ];

    return (
        <div className="fnh-admin-wrap">
            <div className="p-4 md:p-8 flex justify-center min-h-screen bg-slate-50 font-inter">
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    
                    {/* Hero Header */}
                    <div className="bg-indigo-600 px-8 py-12 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <IconCrown className="text-9xl absolute -top-10 -left-10 transform -rotate-12 w-auto h-auto" />
                            <IconSparkle className="text-8xl absolute -bottom-10 -right-10 transform rotate-12 w-auto h-auto" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Upgrade to Pro Version</h1>
                        <p className="text-indigo-100 max-w-2xl mx-auto text-lg leading-relaxed">
                            Unlock powerful features, unlimited customization, and priority developer support to take your news tickers to the next level.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <a href="https://awplife.com/" target="_blank" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-50 transition-all flex items-center gap-2">
                                Get Pro Now <IconArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="p-6 md:p-10">
                        <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="py-4 px-6 text-sm font-bold text-slate-800 uppercase tracking-wider w-1/3">Feature</th>
                                        <th className="py-4 px-6 text-sm font-bold text-slate-500 uppercase tracking-wider w-1/3 text-center">Free Version</th>
                                        <th className="py-4 px-6 text-sm font-bold text-indigo-600 uppercase tracking-wider w-1/3 text-center">Pro Version</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {comparisonData.map((group, idx) => (
                                        <>
                                            <tr key={`group-${idx}`} className="bg-slate-50/50">
                                                <td colSpan="3" className="py-3 px-6 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{group.category}</td>
                                            </tr>
                                            {group.features.map((feature, fIdx) => (
                                                <tr key={`feature-${idx}-${fIdx}`} className="hover:bg-slate-50/30 transition-colors">
                                                    <td className="py-4 px-6">
                                                        <span className="text-sm font-semibold text-slate-900">{feature.name}</span>
                                                    </td>
                                                    <td className="py-4 px-6 text-center text-sm text-slate-500">
                                                        {feature.free}
                                                    </td>
                                                    <td className={`py-4 px-6 text-center text-sm font-bold ${feature.highlight ? 'text-indigo-600' : 'text-slate-900'}`}>
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            {feature.highlight === true && <IconCheckCircle className="text-indigo-500 w-5 h-5" />}
                                                            {feature.pro}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Call to Action */}
                        <div className="mt-12 text-center pb-6">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Still Have Questions?</h3>
                            <p className="text-slate-500 text-sm mb-6">Our priority developer support is available 24/7 for Pro users.</p>
                            <a href="https://awplife.com/contact/" target="_blank" className="text-indigo-600 font-bold hover:underline">Contact Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetProPage;
