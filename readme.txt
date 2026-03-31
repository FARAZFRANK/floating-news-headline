=== Floating News Headline ===
Contributors: awordpresslife, razipathhan, hanif0991, muhammadshahid, fkfaisalkhan007, sharikkhan007, zishlife, FARAZFRANK
Tags: news ticker, breaking news, marquee, news headline, floating bar
Requires at least: 5.8
Tested up to: 6.9
Stable tag: 1.3.1
Requires PHP: 5.6
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Premium, modern, and highly customizable floating news ticker for WordPress — rebuilt with a React dashboard, GPU-accelerated CSS animations, and BEM architecture.

== Description ==

**Floating News Headline** is a professional-grade, lightweight news ticker plugin designed for **speed, beauty, and zero theme conflicts**. Display breaking news, latest posts, hand-picked headlines, or custom alerts in a sleek, non-intrusive floating bar on your WordPress site.

Built from the ground up with a **modern React admin dashboard** and **GPU-accelerated BEM-CSS architecture**, this plugin delivers silky-smooth scrolling animations without slowing down your website.

### 🚀 Why Choose Floating News Headline?

Unlike other ticker plugins that rely on heavy jQuery dependencies and outdated markup, Floating News Headline uses:

* **Vanilla JavaScript** on the frontend — zero jQuery dependency
* **CSS `transform: translateX()` animations** — GPU-accelerated for 60fps scrolling
* **BEM (Block-Element-Modifier) CSS** — zero naming collisions with your theme
* **WordPress Transient API** — intelligent caching to minimize database queries
* **PSR-4 Style Autoloading** — clean, maintainable PHP architecture
* **WordPress REST API** — secure, nonce-verified AJAX communication

### 🎨 3 Premium Themes Included (Free)

1. **Corporate Classic** — Clean, professional Indigo-themed design with post thumbnails, author metadata, and a document icon label. Perfect for business and corporate sites.
2. **Dark Night** — Sleek, high-contrast Slate design with emerald status pulses, gradient blur overlays, and pipe dividers. Ideal for tech, gaming, and entertainment sites.
3. **Floating Pill** — Modern, bubble-style Emerald design with glassmorphism blur effects and rounded corners. Great for blogs, startups, and creative portfolios.

### ✅ Key Features

* **Instant Live Preview** — See your ticker changes in real-time within the admin dashboard before saving. No page refresh required.
* **Multi-Source Content** — Pull headlines from your latest blog posts, manually select specific posts, or write a custom alert message with a link.
* **Manual Post Picker** — Search and select up to 5 specific posts (free version) to display in your ticker with a beautiful search UI.
* **Customizable Speed** — Control the scrolling speed from 5s (fast) to 100s (slow) with an intuitive range slider.
* **Item Spacing Control** — Adjust the gap between ticker items from 0px to 200px for the perfect visual density.
* **Page Targeting** — Choose to show the ticker on all pages or only on the homepage/front page.
* **Scroll Behavior** — Choose between "Fixed" (always visible) or "Sticky on Scroll" (appears after scrolling down).
* **Sticky Top Placement** — Automatically inject the ticker at the very top of your site using `wp_body_open`, or place it anywhere with a shortcode.
* **Play / Pause Control** — Users can pause and resume the ticker with a built-in toggle button. Accessible with proper `aria-label` attributes.
* **Seamless Infinite Loop** — Headlines scroll continuously with a duplicated group technique — no gaps, no stuttering.
* **Short Content Protection** — If total headline text is too short for a seamless loop, the plugin automatically multiplies items to prevent visual breaks.
* **Customizable Labels** — Change the ticker label text (e.g., "Breaking News", "Latest Updates") from the admin panel.
* **Responsive Design** — Looks great on desktop, tablet, and mobile devices with adaptive layouts.
* **Lightweight & Fast** — Under 40KB total frontend footprint (CSS + JS). No external CDN dependencies.
* **Settings Migration** — Automatically migrates settings from the legacy `fnh_settings` option key to the new `floating_news_headline_settings` key.
* **Developer Hooks** — Filter `floating_news_headline_items` to programmatically modify ticker items before rendering.

### 🔒 Security

* All REST API routes are protected with `manage_options` capability checks
* Input sanitization using `sanitize_text_field()`, `sanitize_key()`, `intval()`, and `esc_url_raw()`
* Output escaping using `esc_html()`, `esc_attr()`, and `esc_url()` in all templates
* Nonce verification via WordPress REST API `X-WP-Nonce` header
* ABSPATH checks on all PHP files to prevent direct access

### 🏗️ Architecture

* **Namespace:** `FloatingNewsHeadline`
* **Autoloader:** PSR-4 style with `spl_autoload_register`
* **Classes:** `Activator`, `Adapter`, `Admin`, `Assets`, `Deactivator`, `Frontend`, `REST_API`, `Settings`
* **Templates:** `corporate.php`, `dark.php`, `pill.php` (BEM-structured HTML)
* **Build System:** `@wordpress/scripts` with custom Webpack config for dual entry points (`index.js` for admin, `frontend.js` for public)

### 📦 File Structure

    floating-news-headline/
    ├── floating-news-headlines.php   # Main plugin file (bootstrap, autoloader, lifecycle hooks)
    ├── readme.txt                    # WordPress.org readme
    ├── package.json                  # NPM configuration
    ├── webpack.config.js             # Custom Webpack config (dual entry: index + frontend)
    ├── includes/
    │   ├── class-activator.php       # Activation hook — initialize default settings
    │   ├── class-adapter.php         # Data adapter — fetch & cache ticker content
    │   ├── class-admin.php           # Admin menu & page rendering
    │   ├── class-assets.php          # Centralized asset enqueuing (admin + frontend)
    │   ├── class-deactivator.php     # Deactivation hook — cleanup
    │   ├── class-frontend.php        # Shortcode rendering & sticky injection
    │   ├── class-rest-api.php        # REST API routes (settings CRUD, post search)
    │   ├── class-settings.php        # Settings CRUD with strict sanitization
    │   └── templates/
    │       ├── corporate.php         # Corporate Classic theme template
    │       ├── dark.php              # Dark Night theme template
    │       └── pill.php              # Floating Pill theme template
    ├── src/
    │   ├── index.js                  # React admin dashboard entry point
    │   ├── index.css                 # Admin + frontend CSS (BEM architecture)
    │   ├── frontend.js               # Frontend play/pause controller (vanilla JS)
    │   ├── style.css                 # Additional frontend ticker styles
    │   └── components/
    │       ├── AnimationPanel.js      # Speed & spacing controls
    │       ├── ContentPanel.js        # Source selection & manual post picker
    │       ├── GetProPage.js          # Pro upgrade page
    │       ├── Icons.js               # SVG icon components
    │       ├── LivePreview.js         # Real-time ticker preview in admin
    │       ├── ManualPostPicker.js    # Post search & selection UI
    │       ├── ThemesPanel.js         # Theme selection cards
    │       └── VisibilityPanel.js     # Page targeting & placement controls
    └── build/                         # Compiled production assets (auto-generated)

== Installation ==

= Automatic Installation =

1. Go to **Plugins → Add New** in your WordPress admin.
2. Search for **"Floating News Headline"**.
3. Click **Install Now**, then **Activate**.
4. Navigate to **News Headlines** in your admin sidebar to configure your ticker.

= Manual Installation =

1. Download the plugin ZIP from WordPress.org.
2. Go to **Plugins → Add New → Upload Plugin**.
3. Upload the ZIP file and click **Install Now**.
4. Activate the plugin through the **Plugins** menu.

= From Source (Developers) =

1. Clone the repository into `/wp-content/plugins/floating-news-headline`.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to compile the React admin and frontend assets.
4. Activate the plugin in WordPress.

= After Activation =

* The ticker will automatically appear at the **top of your site** if "Sticky Top" placement is selected (default).
* To place it manually, use the shortcode `[fnh_ticker]` or `[floating_news_headline_ticker]` in any post, page, or widget.

== Frequently Asked Questions ==

= How do I enable/disable the ticker? =
Go to **News Headlines** in your WordPress admin. Use the toggle switch in the top-right corner of the dashboard to enable or disable the ticker globally.

= Can I use it as a shortcode? =
Yes! Use `[fnh_ticker]` or `[floating_news_headline_ticker]` in any page, post, or text widget. When using shortcode placement, set the placement to "Shortcode" in the admin dashboard.

= Does it support custom post types? =
The free version supports standard **Posts** and **Pages**. The Pro version will support all registered custom post types.

= Can I show the ticker only on the homepage? =
Yes. In the **Visibility** tab, set "Display On" to **Homepage Only**. The ticker will only appear on the front page and blog index page.

= How do I change the ticker speed? =
Go to the **Animation** tab in the admin dashboard. Use the speed slider to adjust from 5 seconds (fastest) to 100 seconds (slowest). The live preview updates instantly.

= How do I change the label text? =
In the **Content** tab, scroll down to the **Label** field. You can change it to anything like "Breaking News", "Trending", "Headlines", etc.

= Will it slow down my website? =
No. The frontend uses **vanilla JavaScript** (no jQuery), **GPU-accelerated CSS animations** (using `transform: translateX()`), and **WordPress Transient caching** (10-minute cache). The total frontend footprint is under 40KB.

= Does it conflict with my theme? =
Very unlikely. All CSS uses the **BEM naming convention** with the `fnh-` prefix, which prevents naming collisions. The ticker is injected via `wp_body_open` or shortcode, both of which are standard WordPress hooks.

= Can I display a custom alert instead of posts? =
Yes. In the **Content** tab, select **Custom Alert** as the source. Enter your alert text and an optional link URL.

= How does caching work? =
The plugin uses WordPress Transients to cache fetched post data for **10 minutes**. When you save settings, the cache is automatically invalidated using a versioned cache key strategy — no raw SQL needed.

= Is the plugin translatable? =
Yes. The plugin uses the `floating-news-headline` text domain. All user-facing strings are wrapped in appropriate WordPress i18n functions. You can translate it using Loco Translate or any .po/.mo editor.

= What hooks and filters are available? =
* **Filter:** `floating_news_headline_items` — Modify the array of ticker items before they are rendered. Receives `$items` (array) and `$settings` (array).

== Screenshots ==

1. The modern React-based admin dashboard with instant live preview and tabbed settings.
2. Corporate Classic template — professional Indigo design with post thumbnails and metadata.
3. Dark Night template — high-contrast Slate design with emerald status pulses.
4. Floating Pill template — translucent blur effects with bubble-style rounded corners.
5. Content settings panel showing source selection, manual post picker, and custom alerts.
6. Animation settings panel with speed slider and item spacing control.

== Changelog ==

= 1.3.1 — 2026-03-31 =
* **New:** "Scroll Behavior" setting in Visibility tab — Choose how the headline bar behaves on page scroll.
* **New:** "Fixed" mode — Visible at top, hides after scroll (Default).
* **New:** "Sticky on Scroll" mode — Always visible at the top, stays sticky while you scroll down.
* **Enhancement:** Flattened design for all ticker themes (Corporate, Dark) and Admin UI for a modern sharp look.
* **Enhancement:** Emerald Floating Pill theme updated with a flat bar but kept rounded label for a unique look.
* **Fix:** Resolved double caret icons in admin dropdowns (Display Target Pages).
* **Fix:** Solid background for Corporate Classic template to prevent transparency when sticky.
* **Optimization:** Added rAF-throttled scroll listener for performance.

= 1.3.0 — 2026-03-31 =
* **Complete Architectural Rebuild** — Entire plugin rewritten from scratch with modern PHP (namespaced, PSR-4 autoloaded) and a React-based admin dashboard.
* **New:** High-fidelity React admin dashboard with instant live preview
* **New:** 3 premium themes — Corporate Classic, Dark Night, Floating Pill
* **New:** GPU-accelerated CSS marquee animation using `transform: translateX()`
* **New:** BEM CSS architecture for zero theme conflicts
* **New:** WordPress Transient caching with versioned cache keys for performance
* **New:** REST API powered settings with full sanitization and nonce verification
* **New:** Manual Post Picker with search UI (up to 5 posts in free version)
* **New:** Custom Alert source with link support
* **New:** Page targeting (all pages or homepage only)
* **New:** Configurable speed (5s–100s) and item spacing (0px–200px)
* **New:** Play/Pause toggle button with accessible ARIA labels
* **New:** Seamless infinite loop with short content protection
* **New:** Settings migration from legacy `fnh_settings` option key
* **New:** Developer filter `floating_news_headline_items`
* **New:** Get Pro sub-menu page with upgrade information
* **Security:** All inputs sanitized, all outputs escaped, capability checks on all REST routes
* **Performance:** Under 40KB frontend footprint, no jQuery dependency, no CDN resources

= 1.2.0 =
* Fix: Synchronized REST API namespaces for better stability.
* Optimization: Removed redundant character decoding in data adapter.
* Compliance: Updated readme and license headers for WP.org.

= 1.1.0 =
* Initial beta architecture with basic ticker functionality.

= 1.0.0 =
* Initial release.

== Upgrade Notice ==

= 1.3.0 =
Major architectural upgrade. Complete rebuild with React dashboard, 3 premium themes, GPU-accelerated animations, and enhanced security. Settings are automatically migrated from previous versions.
