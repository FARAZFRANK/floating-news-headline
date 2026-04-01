import { render, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import './index.css';
import LivePreview from './components/LivePreview';
import ContentPanel from './components/ContentPanel';
import ThemesPanel from './components/ThemesPanel';
import AnimationPanel from './components/AnimationPanel';
import VisibilityPanel from './components/VisibilityPanel';
import ShortcodePanel from './components/ShortcodePanel';
import GetProPage from './components/GetProPage';
import HelpPage from './components/HelpPage';

const Dashboard = () => {
    // Basic Routing
    if (window.floatingNewsHeadlineData?.page === 'floating-news-headline-get-pro') {
        return <GetProPage />;
    }
    if (window.floatingNewsHeadlineData?.page === 'floating-news-headline-help') {
        return <HelpPage />;
    }

    const [settings, setSettings] = useState(window.floatingNewsHeadlineData?.settings || {});
    const [activeTab, setActiveTab] = useState('content');
    const [isSaving, setIsSaving] = useState(false);
    const [notice, setNotice] = useState(null);

    // Update individual setting
    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    // Save settings to REST API
    const saveSettings = async () => {
        setIsSaving(true);
        try {
            await apiFetch({
                path: 'floating-news-headline/v1/settings',
                method: 'POST',
                data: settings,
            });
            setNotice({ type: 'success', message: 'Settings saved successfully!' });
        } catch (error) {
            setNotice({ type: 'error', message: error.message || 'Failed to save settings.' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setNotice(null), 3000);
        }
    };

    return (
        <div className="fnh-admin-wrap">
            <div className="p-4 md:p-8 flex justify-center min-h-screen bg-slate-50 font-inter">
                <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-fit">
                    
                    {/* Header */}
                    <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 bg-white sticky top-0 z-20">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Floating News Headline</h1>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                                <span className="font-medium">v1.3.2</span> 
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="fnh-toggle">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.enabled}
                                        onChange={(e) => updateSetting('enabled', e.target.checked)}
                                    />
                                    <span className="fnh-toggle-track"></span>
                                </label>
                            </div>
                            <button 
                                onClick={saveSettings}
                                disabled={isSaving}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>

                    {/* Live Preview (Instant!) */}
                    <LivePreview settings={settings} />

                    {/* Navigation Tabs */}
                    <div className="px-6 border-b border-gray-200 bg-white">
                        <nav className="flex space-x-1 sm:space-x-6 overflow-x-auto" aria-label="Tabs">
                            {['content', 'themes', 'animation', 'visibility', 'shortcode'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`whitespace-nowrap py-4 px-2 border-b-2 font-semibold text-sm transition-colors capitalize ${activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 bg-white flex-1 min-h-[400px]">
                        {activeTab === 'content' && <ContentPanel settings={settings} updateSetting={updateSetting} />}
                        {activeTab === 'themes' && <ThemesPanel settings={settings} updateSetting={updateSetting} />}
                        {activeTab === 'animation' && <AnimationPanel settings={settings} updateSetting={updateSetting} />}
                        {activeTab === 'visibility' && <VisibilityPanel settings={settings} updateSetting={updateSetting} />}
                        {activeTab === 'shortcode' && <ShortcodePanel />}
                    </div>

                    {/* Notices */}
                    {notice && (
                        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white transition-all transform ${notice.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                            {notice.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('fnh-admin-root');
    if (root) {
        render(<Dashboard />, root);
    }
});
