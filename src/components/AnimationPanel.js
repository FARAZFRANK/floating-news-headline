import { IconHandPointing } from './Icons';
import { useRef, useEffect } from '@wordpress/element';

const updateRangeFill = (slider) => {
    const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(to right, #6366f1 ${val}%, #e2e8f0 ${val}%)`;
};

const AnimationPanel = ({ settings, updateSetting }) => {
    const speedRef = useRef(null);
    const spacingRef = useRef(null);

    useEffect(() => {
        if (speedRef.current) updateRangeFill(speedRef.current);
        if (spacingRef.current) updateRangeFill(spacingRef.current);
    }, [settings.speed, settings.item_spacing]);

    return (
        <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 flex flex-col gap-8">
                
                {/* Scroll Speed */}
                <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-5">Scroll Speed</label>
                    <div className="flex items-center gap-6">
                        <input 
                            ref={speedRef}
                            type="range" 
                            min="5" 
                            max="100" 
                            step="1"
                            value={settings.speed || 35}
                            onChange={(e) => {
                                updateSetting('speed', parseInt(e.target.value));
                                updateRangeFill(e.target);
                            }}
                            className="fnh-custom-range flex-1"
                        />
                        <input 
                            type="number"
                            value={settings.speed || 35}
                            onChange={(e) => {
                                const val = Math.max(5, Math.min(100, parseInt(e.target.value) || 5));
                                updateSetting('speed', val);
                            }}
                            className="fnh-range-value"
                            min="5"
                            max="100"
                        />
                    </div>
                </div>

                {/* Headline Spacing */}
                <div>
                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-5">Headline Gap</label>
                    <div className="flex items-center gap-6">
                        <input 
                            ref={spacingRef}
                            type="range" 
                            min="20" 
                            max="300" 
                            step="10"
                            value={settings.item_spacing || 80}
                            onChange={(e) => {
                                updateSetting('item_spacing', parseInt(e.target.value));
                                updateRangeFill(e.target);
                            }}
                            className="fnh-custom-range flex-1"
                        />
                        <input 
                            type="number"
                            value={settings.item_spacing || 80}
                            onChange={(e) => {
                                const val = Math.max(20, Math.min(300, parseInt(e.target.value) || 20));
                                updateSetting('item_spacing', val);
                            }}
                            className="fnh-range-value"
                            min="20"
                            max="300"
                        />
                    </div>
                </div>

                {/* Pause on Hover Toggle */}
                <div className="flex items-center gap-3 mt-2">
                    <label className="fnh-toggle fnh-toggle-sm">
                        <input 
                            type="checkbox"
                            checked={settings.paused}
                            onChange={(e) => updateSetting('paused', e.target.checked)}
                        />
                        <span className="fnh-toggle-track"></span>
                    </label>
                    <span className="text-sm text-gray-700">Pause on Mouse Hover</span>
                </div>
                
            </div>
        </div>
    );
};

export default AnimationPanel;
