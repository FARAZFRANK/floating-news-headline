import { useState, useEffect, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { IconSpinner } from './Icons';

const LivePreview = ({ settings }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [liveItems, setLiveItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const marqueeRef = useRef(null);
    const [tickerSpeed, setTickerSpeed] = useState(`${settings.speed || 35}s`);

    // Fetch real items whenever content settings change
    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);
            try {
                const idsParam = (settings.source === 'manual' && settings.manual_posts?.length) 
                    ? `&ids=${settings.manual_posts.join(',')}` 
                    : '';
                
                const alertParam = (settings.source === 'custom_alert')
                    ? `&custom_alert=${encodeURIComponent(settings.custom_alert || '')}&custom_alert_link=${encodeURIComponent(settings.custom_alert_link || '')}`
                    : '';
                
                const data = await apiFetch({ 
                    path: `floating-news-headline/v1/posts?source=${settings.source || 'latest_posts'}&count=${settings.count || 5}${idsParam}${alertParam}` 
                });
                setLiveItems(data);
            } catch (e) {
                console.error('Failed to fetch preview items', e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, [settings.source, settings.count, settings.manual_posts, settings.custom_alert, settings.custom_alert_link]);

    // Calculate dynamic duration for consistency across all content lengths
    useEffect(() => {
        if (!marqueeRef.current) return;

        const updateSpeed = () => {
            const group = marqueeRef.current.querySelector('.fnh-ticker__group');
            if (group) {
                const width = group.offsetWidth;
                if (width > 0) {
                    // Pixels Per Second = (Setting * Factor)
                    // We want setting 35 to roughly move at 50px/s (which is what 35s on a 1750px track feels like)
                    const pxPerSecond = (settings.speed || 35) * 1.5; 
                    const calculatedDuration = width / pxPerSecond;
                    setTickerSpeed(`${calculatedDuration.toFixed(2)}s`);
                }
            }
        };

        const observer = new ResizeObserver(updateSpeed);
        const group = marqueeRef.current.querySelector('.fnh-ticker__group');
        if (group) observer.observe(group);

        updateSpeed();
        return () => observer.disconnect();
    }, [liveItems, settings.speed, settings.item_spacing, settings.template]);

    const tickerStyle = {
        '--fnh-speed': tickerSpeed,
        '--fnh-gap': `${settings.item_spacing || 80}px`,
    };

    const getThemeClass = () => {
        let classes = '';
        switch (settings.template) {
            case 'dark': classes = 'fnh-ticker--dark'; break;
            case 'pill': classes = 'fnh-ticker--pill'; break;
            default: classes = 'fnh-ticker--corporate'; break;
        }
        if (settings.paused) classes += ' fnh-ticker--pause-on-hover';
        return classes;
    };

    const renderTickerContent = () => {
        const isDark = settings.template === 'dark';
        const isCorporate = settings.template === 'corporate' || !settings.template;
        const labelText = settings.labels?.latest_posts || 'Latest Posts';

        const marqueeContent = (
            <div ref={marqueeRef} className={`fnh-ticker__marquee ${isPaused ? 'is-paused' : ''}`}>
                {[1, 2].map((groupNum) => (
                    <div key={groupNum} className="fnh-ticker__group" aria-hidden={groupNum === 2}>
                        {liveItems.map((item, idx) => (
                            <div key={`${groupNum}-${idx}`} style={{ display: 'contents' }}>
                                <div className="fnh-ticker__item">
                                    {item.image_url && (
                                        <div className="fnh-ticker__img-wrapper">
                                            <img src={item.image_url} className="fnh-ticker__img" alt="" />
                                            {isDark && <div className="fnh-ticker__img-pulse"></div>}
                                        </div>
                                    )}
                                    <div className="fnh-ticker__text">
                                        <span className="fnh-ticker__title">{item.title}</span>
                                        {isCorporate && item.meta && <span className="fnh-ticker__meta">{item.meta}</span>}
                                    </div>
                                </div>
                                {isDark && <span className="fnh-ticker__divider">|</span>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );

        const playPauseBtn = (
            <button onClick={() => setIsPaused(!isPaused)} className="fnh-play-pause-btn">
                {!isPaused ? (
                    <svg className="fnh-icon-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                ) : (
                    <svg className="fnh-icon-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                )}
            </button>
        );

        if (settings.template === 'pill') {
            return (
                <div className="fnh-ticker__inner">
                    <div className="fnh-ticker__label">
                        <span>{labelText}</span>
                    </div>
                    <div className="fnh-ticker__scroll-area">
                        {marqueeContent}
                    </div>
                    {playPauseBtn}
                </div>
            );
        }

        return (
            <>
                <div className="fnh-ticker__label">
                    {isCorporate && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    )}
                    <span>{labelText}</span>
                </div>
                <div className="fnh-ticker__scroll-area">
                    {marqueeContent}
                </div>
                {playPauseBtn}
            </>
        );
    };

    return (
        <div className="bg-slate-50 p-6 border-b border-gray-200 relative">
            {isLoading && (
                <div className="absolute inset-0 bg-white/50 z-30 flex items-center justify-center backdrop-blur-[1px]">
                    <IconSpinner className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            )}
            
            <div className={`fnh-ticker ${getThemeClass()}`} style={tickerStyle}>
                {renderTickerContent()}
            </div>

            <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-bold">
                Preview: {settings.template === 'dark' ? 'Dark Professional' : settings.template === 'pill' ? 'Floating Pill' : 'Corporate Classic'}
            </p>
        </div>
    );
};

export default LivePreview;
