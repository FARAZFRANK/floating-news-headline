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
                    // No need to hide/show, but we ensure it's visible.
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

