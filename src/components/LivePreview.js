import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { IconSpinner, IconArticle } from './Icons';

const LivePreview = ({ settings }) => {
    const [isPaused, setIsPaused] = useState(false);
    const [liveItems, setLiveItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch real items whenever content settings change
    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);
            try {
                // Determine IDs if manual
                const idsParam = (settings.source === 'manual' && settings.manual_posts?.length) 
                    ? `&ids=${settings.manual_posts.join(',')}` 
                    : '';
                
                const data = await apiFetch({ 
                    path: `floating-news-headline/v1/posts?source=${settings.source || 'latest_posts'}&count=${settings.count || 5}${idsParam}` 
                });
                setLiveItems(data);
            } catch (e) {
                console.error('Failed to fetch preview items', e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, [settings.source, settings.count, settings.manual_posts]);

    const tickerStyle = {
        '--fnh-speed': `${settings.speed || 35}s`,
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

    return (
        <div className="bg-slate-50 p-6 border-b border-gray-200 relative">
            {isLoading && (
                <div className="absolute inset-0 bg-white/50 z-30 flex items-center justify-center backdrop-blur-[1px]">
                    <IconSpinner className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            )}
            
            <div className={`fnh-ticker ${getThemeClass()}`} style={tickerStyle}>
                {settings.template === 'pill' ? (
                    <div className="fnh-ticker__inner">
                        <div className="fnh-ticker__label">
                            <IconArticle className="mr-2 w-4 h-4" />
                            <span>{settings.labels?.latest_posts || 'Latest Posts'}</span>
                        </div>
                        <div className="fnh-ticker__scroll-area">
                            <div className={`fnh-ticker__marquee ${isPaused ? 'is-paused' : ''}`}>
                                <div className="fnh-ticker__group">
                                    {liveItems.map((item, idx) => (
                                        <div key={idx} className="fnh-ticker__item">
                                            {item.image_url && <img src={item.image_url} className="fnh-ticker__img" alt="" />}
                                            <div className="fnh-ticker__text">
                                                <span className="fnh-ticker__title">{item.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="fnh-ticker__group" aria-hidden="true">
                                    {liveItems.map((item, idx) => (
                                        <div key={idx} className="fnh-ticker__item">
                                            {item.image_url && <img src={item.image_url} className="fnh-ticker__img" alt="" />}
                                            <div className="fnh-ticker__text">
                                                <span className="fnh-ticker__title">{item.title}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsPaused(!isPaused)} className="fnh-play-pause-btn">
                            {!isPaused ? <svg className="fnh-icon-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> : <svg className="fnh-icon-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="fnh-ticker__label">
                            <IconArticle className="mr-2 w-4 h-4" />
                            <span>{settings.labels?.latest_posts || 'Latest Posts'}</span>
                        </div>
                        <div className="fnh-ticker__scroll-area">
                            <div className={`fnh-ticker__marquee ${isPaused ? 'is-paused' : ''}`}>
                                <div className="fnh-ticker__group">
                                    {liveItems.map((item, idx) => (
                                        <div key={idx} style={{ display: 'contents' }}>
                                            <div className="fnh-ticker__item">
                                                {item.image_url && (
                                                    <div className="fnh-ticker__img-wrapper">
                                                        <img src={item.image_url} className="fnh-ticker__img" alt="" />
                                                        {settings.template === 'dark' && <div className="fnh-ticker__img-pulse"></div>}
                                                    </div>
                                                )}
                                                <div className="fnh-ticker__text">
                                                    <span className="fnh-ticker__title">{item.title}</span>
                                                    {settings.template === 'corporate' && item.meta && <span className="fnh-ticker__meta">{item.meta}</span>}
                                                </div>
                                            </div>
                                            {settings.template === 'dark' && <span className="fnh-ticker__divider">|</span>}
                                        </div>
                                    ))}
                                </div>
                                <div className="fnh-ticker__group" aria-hidden="true">
                                    {liveItems.map((item, idx) => (
                                        <div key={idx} style={{ display: 'contents' }}>
                                            <div className="fnh-ticker__item">
                                                {item.image_url && (
                                                    <div className="fnh-ticker__img-wrapper">
                                                        <img src={item.image_url} className="fnh-ticker__img" alt="" />
                                                        {settings.template === 'dark' && <div className="fnh-ticker__img-pulse"></div>}
                                                    </div>
                                                )}
                                                <div className="fnh-ticker__text">
                                                    <span className="fnh-ticker__title">{item.title}</span>
                                                    {settings.template === 'corporate' && item.meta && <span className="fnh-ticker__meta">{item.meta}</span>}
                                                </div>
                                            </div>
                                            {settings.template === 'dark' && <span className="fnh-ticker__divider">|</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsPaused(!isPaused)} className="fnh-play-pause-btn">
                            {!isPaused ? <svg className="fnh-icon-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> : <svg className="fnh-icon-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                        </button>
                    </>
                )}
            </div>

            <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-bold">
                Preview: {settings.template === 'dark' ? 'Dark Professional' : settings.template === 'pill' ? 'Floating Pill' : 'Corporate Classic'}
            </p>
        </div>
    );
};

export default LivePreview;
