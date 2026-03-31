/**
 * Floating News Headline - Frontend Controller
 * Handles Play/Pause toggling and Scroll Behavior (fixed vs sticky-on-scroll).
 */
document.addEventListener('DOMContentLoaded', () => {
    const tickers = document.querySelectorAll('.fnh-ticker');

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

    // ─── Scroll Behavior: Sticky on Scroll ───────────────────────────────────
    const wrapper = document.querySelector('.fnh-sticky-top-wrapper');
    if (!wrapper) return;

    const behavior = wrapper.dataset.scrollBehavior || 'fixed';

    if (behavior === 'sticky_on_scroll') {
        // Hide initially
        wrapper.classList.add('fnh-scroll-hidden');

        let lastScrollY   = window.scrollY;
        let ticking       = false;
        const SHOW_OFFSET = 80; // px from top before it appears

        const onScroll = () => {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (lastScrollY > SHOW_OFFSET) {
                        wrapper.classList.remove('fnh-scroll-hidden');
                        wrapper.classList.add('fnh-scroll-visible');
                    } else {
                        wrapper.classList.remove('fnh-scroll-visible');
                        wrapper.classList.add('fnh-scroll-hidden');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }
});
