# Changelog

All notable changes to the **Floating News Headline** plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.3] — 2026-04-10

### Fixed
- **Fix:** Resolved URL truncation issue in Custom Alert when typing rapidly (added debounce to preview).
- **Fix:** Ensure dashboard preview updates instantly when selecting posts in Manual Selection mode without needing to save first.

### Changed
- **Compliance Update:** Removed artificial 5-post limit on Manual Post Picker to follow WordPress.org Guideline 5.
- **Feature Enhancement:** Manual Selection now supports unlimited posts in the free version.
- **Maintenance:** Updated admin UI and documentation to match current capabilities.

---

## [1.3.2] — 2026-04-01

### Added
- **New:** Dedicated "Shortcode" documentation tab in the admin dashboard for easier manual placement reference.

### Fixed
- **Fix:** Synchronized Dashboard Preview height and theme icons (Corporate Classic document icon) with the live site.
- **Fix:** Synchronized scroll speed logic between the admin preview and the frontend for a matching experience.

### Changed
- **Enhancement:** Decoupled shortcode visibility from site-wide targeting rules — shortcodes now work on any page regardless of "Display On" settings.

---

## [1.3.1] — 2026-03-31

### Added
- **New:** "Scroll Behavior" setting in Visibility tab — Choose how the headline bar behaves on page scroll.
- **New:** "Fixed" mode — Visible at top, hides after scroll (Default).
- **New:** "Sticky on Scroll" mode — Always visible at the top, stays sticky while you scroll down.

### Fixed
- **Fix:** Resolved double caret icons in admin dropdowns (Display Target Pages).
- **Fix:** Solid background for Corporate Classic template to prevent transparency when sticky.

### Changed
- **Enhancement:** Flattened design for all ticker themes (Corporate, Dark) and Admin UI for a modern sharp look.
- **Enhancement:** Emerald Floating Pill theme updated with a flat bar but kept rounded label for a unique look.
- **Optimization:** Added rAF-throttled scroll listener for performance.

---

## [1.3.0] — 2026-03-31

### 🔄 Complete Architectural Rebuild
Entire plugin rewritten from scratch with modern PHP (namespaced, PSR-4 autoloaded) and a React-based admin dashboard.

### Added
- **React Admin Dashboard** — High-fidelity settings interface with instant live preview, tabbed navigation (Content, Themes, Animation, Visibility), and real-time save feedback.
- **3 Premium Themes** — Corporate Classic (Indigo), Dark Night (Slate/Emerald), Floating Pill (Glassmorphism).
- **GPU-Accelerated Animations** — CSS `transform: translateX()` based marquee for 60fps scrolling.
- **BEM CSS Architecture** — All styles use the `fnh-` prefix with Block-Element-Modifier naming for zero theme conflicts.
- **WordPress Transient Caching** — Post data cached for 10 minutes with versioned cache keys for automatic invalidation on settings update.
- **REST API Settings** — Full CRUD via `floating-news-headline/v1/settings` with `manage_options` capability checks and nonce verification.
- **Manual Post Picker** — Search and select up to 5 specific posts (free version) with a beautiful search UI.
- **Custom Alert Source** — Display custom alert text with an optional link URL instead of posts.
- **Page Targeting** — Show ticker on all pages or homepage only via the Visibility tab.
- **Configurable Speed** — Range slider from 5s (fastest) to 100s (slowest) with live preview.
- **Item Spacing Control** — Adjust gap between ticker items from 0px to 200px.
- **Play/Pause Toggle** — Built-in button with accessible `aria-label` attributes and icon toggle.
- **Seamless Infinite Loop** — Duplicated group technique for gapless scrolling. Short content auto-multiplied.
- **Customizable Labels** — Change the ticker label text (e.g., "Breaking News") from admin.
- **Settings Migration** — Automatic migration from legacy `fnh_settings` option key to `floating_news_headline_settings`.
- **Developer Filter** — `floating_news_headline_items` filter to modify items before rendering.
- **Get Pro Sub-Menu** — Upgrade information page under the News Headlines admin menu.
- **PSR-4 Autoloader** — Clean `spl_autoload_register` based class loading from `includes/` directory.
- **Dual Webpack Entry Points** — Separate `index.js` (admin React) and `frontend.js` (vanilla JS play/pause controller) builds.

### Security
- All REST API routes protected with `manage_options` capability checks.
- Full input sanitization: `sanitize_text_field()`, `sanitize_key()`, `intval()`, `esc_url_raw()`.
- Full output escaping: `esc_html()`, `esc_attr()`, `esc_url()` in all templates.
- Nonce verification via WordPress REST API `X-WP-Nonce` header.
- ABSPATH checks on all PHP files to prevent direct access.

### Performance
- Under 40KB total frontend footprint (CSS + JS).
- No jQuery dependency on the frontend.
- No external CDN resources — fully self-contained.
- Conditional asset loading — scripts only enqueue when ticker is enabled.

---

## [1.2.0]

### Fixed
- Synchronized REST API namespaces for better stability.

### Changed
- Removed redundant character decoding in data adapter.
- Updated readme and license headers for WordPress.org compliance.

---

## [1.1.0]

### Added
- Initial beta architecture with basic ticker functionality.

---

## [1.0.0]

### Added
- Initial release of Floating News Headline plugin.
