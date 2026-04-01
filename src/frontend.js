document.addEventListener('DOMContentLoaded', () => {
    const tickers = document.querySelectorAll('.fnh-ticker');

    // ─── Dynamic Speed Synchronization ───────────────────────────────────────
    /**
     * Normalizes the scroll duration based on the actual content width.
     * This ensures that regardless of whether there's 1 item or 10, 
     * the pixels-per-second speed remains consistent.
     */
    const updateTickerSpeeds = () => {
        tickers.forEach(ticker => {
            const group = ticker.querySelector('.fnh-ticker__group');
            const baseSpeedSetting = parseFloat(ticker.dataset.fnhBaseSpeed) || 35;
            
            if (group) {
                const width = group.offsetWidth;
                if (width > 0) {
                    // Pixels Per Second = (Setting * 1.5)
                    // This ensures consistent visual speed regardless of content width or screen size.
                    const pxPerSecond = baseSpeedSetting * 1.5;
                    const calculatedDuration = width / pxPerSecond;
                    ticker.style.setProperty('--fnh-speed', `${calculatedDuration.toFixed(2)}s`);
                }
            }
        });
    };

    // Initial run
    updateTickerSpeeds();

    // Re-calculate on window resize (especially for responsive layouts)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateTickerSpeeds, 250);
    });

    // ─── Play / Pause Toggle ─────────────────────────────────────────────────
    tickers.forEach(ticker => {
        const marquee = ticker.querySelector('.fnh-ticker__marquee');
        const btn     = ticker.querySelector('.fnh-play-pause-btn');

        if (!marquee || !btn) return;

        btn.addEventListener('click', () => {
            const isPaused = marquee.classList.toggle('is-paused');

            const pauseIcon = btn.querySelector('.fnh-icon-pause');
            const playIcon  = btn.querySelector('.fnh-icon-play');

            if (isPaused) {
                if (pauseIcon) pauseIcon.classList.add('fnh-hidden');
                if (playIcon)  playIcon.classList.remove('fnh-hidden');
                btn.setAttribute('aria-label', 'Play');
            } else {
                if (pauseIcon) pauseIcon.classList.remove('fnh-hidden');
                if (playIcon)  playIcon.classList.add('fnh-hidden');
                btn.setAttribute('aria-label', 'Pause');
            }
        });
    });

    // ─── Scroll Behavior: Fixed vs Sticky on Scroll ──────────────────────────
    const wrapper = document.querySelector('.fnh-sticky-top-wrapper');
    if (!wrapper) return;

    const behavior = wrapper.dataset.scrollBehavior || 'fixed';
    const SHOW_OFFSET = 80; // px from top before it changes state
    let ticking = false;

    // Initial state: Both are now visible initially as per request
    wrapper.classList.add('fnh-scroll-visible');

    const onScroll = () => {
        let lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (behavior === 'fixed') {
                    // "Fixed" (New Request): Visible at top, hides after scroll
                    if (lastScrollY > SHOW_OFFSET) {
                        wrapper.classList.remove('fnh-scroll-visible');
                        wrapper.classList.add('fnh-scroll-hidden');
                    } else {
                        wrapper.classList.remove('fnh-scroll-hidden');
                        wrapper.classList.add('fnh-scroll-visible');
                    }
                } else if (behavior === 'sticky_on_scroll') {
                    // "Sticky" (Update): Initially visible and remains visible (Sticky)
                    wrapper.classList.remove('fnh-scroll-hidden');
                    wrapper.classList.add('fnh-scroll-visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
});

