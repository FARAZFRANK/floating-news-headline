<?php
namespace FloatingNewsHeadline;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Centralized Asset Manager.
 * Ensures scripts and styles are enqueued with correct versions and dependencies.
 */
class Assets {

	public function __construct() {
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend_assets' ) );
	}

	/**
	 * Enqueue Admin dashboard assets.
	 */
	public function enqueue_admin_assets( $hook ) {
		$allowed_pages = array(
			'toplevel_page_floating-news-headline',
			'news-headlines_page_floating-news-headline-get-pro'
		);
		
		if ( ! in_array( $hook, $allowed_pages ) ) {
			return;
		}

		$manifest = $this->get_manifest( 'index' );
		
		// Tailwind and Icons must be bundled locally or through the build process.
		// CDNs are disallowed on WordPress.org.

		wp_enqueue_script(
			'floating-news-headline-admin',
			FLOATING_NEWS_HEADLINE_URL . 'build/index.js',
			$manifest['dependencies'],
			$manifest['version'],
			true
		);

		wp_enqueue_style(
			'floating-news-headline-admin',
			FLOATING_NEWS_HEADLINE_URL . 'build/index.css',
			array(),
			$manifest['version']
		);

		// Pass Nonce, REST Root, and Current Settings to React
		$floating_news_headline_page = ( $hook === 'news-headlines_page_floating-news-headline-get-pro' ) ? 'floating-news-headline-get-pro' : 'floating-news-headline';

		wp_localize_script( 'floating-news-headline-admin', 'floatingNewsHeadlineData', array(
			'root'     => esc_url_raw( rest_url( 'floating-news-headline/v1' ) ),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
			'settings' => Settings::get_settings(),
			'page'     => $floating_news_headline_page,
		) );
	}

	/**
	 * Enqueue Frontend ticker assets.
	 */
	public function enqueue_frontend_assets() {
		// Optimization: Only load if ticker is enabled.
		$settings = Settings::get_settings();
		if ( empty( $settings['enabled'] ) ) {
			return;
		}

		$manifest = $this->get_manifest( 'frontend' );

		wp_enqueue_style(
			'floating-news-headline-ticker',
			FLOATING_NEWS_HEADLINE_URL . 'build/index.css',
			array(),
			FLOATING_NEWS_HEADLINE_VERSION
		);

		wp_enqueue_script(
			'floating-news-headline-ticker',
			FLOATING_NEWS_HEADLINE_URL . 'build/frontend.js',
			array(),
			FLOATING_NEWS_HEADLINE_VERSION,
			true
		);
	}

	/**
	 * Helper to get dependency manifests from build artifacts.
	 */
	private function get_manifest( $handle ) {
		$file = FLOATING_NEWS_HEADLINE_DIR . "build/{$handle}.asset.php";
		if ( file_exists( $file ) ) {
			return include( $file );
		}
		return array( 'dependencies' => array(), 'version' => FLOATING_NEWS_HEADLINE_VERSION );
	}
}
