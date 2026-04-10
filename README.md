# Floating News Headline

[![WordPress Plugin Version](https://img.shields.io/badge/version-1.3.3-blue.svg)](https://wordpress.org/plugins/floating-news-headline/)
[![WordPress Tested](https://img.shields.io/badge/WordPress-6.9%20tested-green.svg)](https://wordpress.org/)
[![PHP Version](https://img.shields.io/badge/PHP-%3E%3D5.6-purple.svg)](https://www.php.net/)
[![License](https://img.shields.io/badge/license-GPL--2.0--or--later-orange.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

**Premium, modern, and highly customizable floating news ticker for WordPress** — rebuilt with a React dashboard, GPU-accelerated CSS animations, and BEM architecture.

---

## ✨ Overview

Floating News Headline is a professional-grade, lightweight news ticker plugin designed for **speed, beauty, and zero theme conflicts**. Display breaking news, latest posts, hand-picked headlines, or custom alerts in a sleek, non-intrusive floating bar on your WordPress site.

Unlike other ticker plugins that rely on heavy jQuery dependencies and outdated markup, Floating News Headline uses:

- **Vanilla JavaScript** on the frontend — zero jQuery dependency
- **CSS `transform: translateX()` animations** — GPU-accelerated for 60fps scrolling
- **BEM CSS architecture** — zero naming collisions with your theme
- **WordPress Transient API** — intelligent caching to minimize database queries
- **WordPress REST API** — secure, nonce-verified AJAX communication

---

## 🎨 3 Premium Themes Included (Free)

| Theme | Description |
|-------|-------------|
| **Corporate Classic** | Clean, professional Indigo-themed design with post thumbnails, author metadata, and document icon label |
| **Dark Night** | Sleek, high-contrast Slate design with emerald status pulses, gradient blur overlays, and pipe dividers |
| **Floating Pill** | Modern, bubble-style Emerald design with glassmorphism blur effects and rounded corners |

---

## 🚀 Features

- **Instant Live Preview** — See ticker changes in real-time within admin before saving
- **Multi-Source Content** — Latest posts, manually selected posts, or custom alert messages
- **Manual Post Picker** — Search and select up to 5 specific posts (free) with a beautiful search UI
- **Customizable Speed** — Control scrolling speed from 5s (fast) to 100s (slow)
- **Item Spacing Control** — Adjust gap between items from 0px to 200px
- **Page Targeting** — Show on all pages or homepage only
- **Sticky Top Placement** — Auto-inject at top of site, or use shortcode placement
- **Play / Pause Control** — Toggle button with accessible ARIA labels
- **Seamless Infinite Loop** — Gapless scrolling with short content auto-protection
- **Customizable Labels** — Change label text (e.g., "Breaking News", "Trending")
- **Responsive Design** — Adaptive layouts for desktop, tablet, and mobile
- **Lightweight** — Under 40KB total frontend footprint (CSS + JS)
- **Developer Hooks** — Filter `floating_news_headline_items` to modify items programmatically

---

## 🔒 Security

- All REST routes protected with `manage_options` capability checks
- Input sanitization: `sanitize_text_field()`, `sanitize_key()`, `intval()`, `esc_url_raw()`
- Output escaping: `esc_html()`, `esc_attr()`, `esc_url()` in all templates
- Nonce verification via WordPress REST API `X-WP-Nonce` header
- ABSPATH checks on all PHP files to prevent direct access

---

## 🏗️ Architecture

```
floating-news-headline/
├── floating-news-headlines.php   # Main plugin file (bootstrap, autoloader, lifecycle hooks)
├── readme.txt                    # WordPress.org readme
├── README.md                     # GitHub readme (this file)
├── CHANGELOG.md                  # Version history
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
│       ├── AnimationPanel.js     # Speed & spacing controls
│       ├── ContentPanel.js       # Source selection & manual post picker
│       ├── GetProPage.js         # Pro upgrade page
│       ├── Icons.js              # SVG icon components
│       ├── LivePreview.js        # Real-time ticker preview in admin
│       ├── ManualPostPicker.js   # Post search & selection UI
│       ├── ThemesPanel.js        # Theme selection cards
│       └── VisibilityPanel.js    # Page targeting & placement controls
└── build/                        # Compiled production assets (auto-generated)
```

**Namespace:** `FloatingNewsHeadline`
**Autoloader:** PSR-4 style with `spl_autoload_register`
**Build System:** `@wordpress/scripts` with custom Webpack config

---

## 📦 Installation

### From WordPress Admin

1. Go to **Plugins → Add New**
2. Search for **"Floating News Headline"**
3. Click **Install Now**, then **Activate**
4. Navigate to **News Headlines** in your admin sidebar

### Manual Upload

1. Download the plugin ZIP from [WordPress.org](https://wordpress.org/plugins/floating-news-headline/)
2. Go to **Plugins → Add New → Upload Plugin**
3. Upload and activate

### From Source (Development)

```bash
# Clone the repository
git clone https://github.com/FARAZFRANK/floating-news-headline.git

# Navigate to the plugin directory
cd floating-news-headline

# Install dependencies
npm install

# Build production assets
npm run build

# Start development mode (with file watching)
npm start
```

---

## 🔧 Usage

### Automatic (Sticky Top)

The ticker appears automatically at the top of your site when enabled. This is the default behavior using the `wp_body_open` hook.

### Shortcode

Place the ticker anywhere using a shortcode:

```
[fnh_ticker]
```

or the full version:

```
[floating_news_headline_ticker]
```

### Developer Filter

Modify ticker items programmatically:

```php
add_filter( 'floating_news_headline_items', function( $items, $settings ) {
    // Add a custom item
    $items[] = array(
        'id'        => 0,
        'title'     => 'Custom Breaking News Alert!',
        'image_url' => '',
        'link_url'  => 'https://example.com',
        'meta'      => 'Just Now',
    );
    return $items;
}, 10, 2 );
```

---

## 🛠️ Development

### Prerequisites

- **Node.js** 16+ and npm
- **WordPress** 5.8+
- **PHP** 5.6+

### Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development mode with file watching |
| `npm run build` | Build production assets |
| `npm run format` | Format code with Prettier |
| `npm run lint:js` | Lint JavaScript files |
| `npm run packages-update` | Update WordPress packages |

---

## 📋 Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full version history.

### Latest: v1.3.3 (2026-04-10)

- **Fix:** Resolved URL truncation issue in Custom Alert when typing rapidly (added debounce to preview).
- **Fix:** Ensure dashboard preview updates instantly when selecting posts in Manual Selection mode without needing to save first.
- **Compliance Update:** Removed artificial 5-post limit on Manual Post Picker to follow WordPress.org Guideline 5.
- **Feature Enhancement:** Manual Selection now supports unlimited posts in the free version.
- **Maintenance:** Updated admin UI and documentation to match current capabilities.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

### Coding Standards

- PHP: [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- JavaScript: [WordPress JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
- CSS: BEM naming convention with `fnh-` prefix

---

## 📜 License

This project is licensed under the **GPL-2.0-or-later** — see the [LICENSE](https://www.gnu.org/licenses/gpl-2.0.html) file for details.

---

## 👥 Contributors

- [A WP Life](https://developer.wordpress.org/plugins/developer/awordpresslife/) — Plugin Author
- [FARAZFRANK](https://github.com/FARAZFRANK) — Lead Developer

---

## 🔗 Links

- [WordPress.org Plugin Page](https://wordpress.org/plugins/floating-news-headline/)
- [GitHub Repository](https://github.com/FARAZFRANK/floating-news-headline)
- [Report an Issue](https://github.com/FARAZFRANK/floating-news-headline/issues)
