/**
 * Floating News Headline - Frontend Controller
 * Handles Play/Pause toggling and interaction.
 */
document.addEventListener('DOMContentLoaded', () => {
    const tickers = document.querySelectorAll('.fnh-ticker');

    tickers.forEach(ticker => {
        const marquee = ticker.querySelector('.fnh-ticker__marquee');
        const btn = ticker.querySelector('.fnh-play-pause-btn');

        if (!marquee || !btn) return;

        btn.addEventListener('click', () => {
            const isPaused = marquee.classList.toggle('is-paused');
            
            // Toggle Icons
            const pauseIcon = btn.querySelector('.fnh-icon-pause');
            const playIcon = btn.querySelector('.fnh-icon-play');

            if (isPaused) {
                if (pauseIcon) pauseIcon.classList.add('fnh-hidden');
                if (playIcon) playIcon.classList.remove('fnh-hidden');
                btn.setAttribute('aria-label', 'Play');
            } else {
                if (pauseIcon) pauseIcon.classList.remove('fnh-hidden');
                if (playIcon) playIcon.classList.add('fnh-hidden');
                btn.setAttribute('aria-label', 'Pause');
            }
        });
    });
});
