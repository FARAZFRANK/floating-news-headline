<?php
namespace FloatingNewsHeadline;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Handles shortcode registration and automatic injection.
 */
class Frontend {

	public function __construct() {
		add_shortcode( 'floating_news_headline_ticker', array( $this, 'render_shortcode' ) );
		add_shortcode( 'fnh_ticker', array( $this, 'render_shortcode' ) ); // Legacy Alias
		
		// Auto-inject at top of body if placement is sticky_top
		$settings = Settings::get_settings();
		if ( ! empty( $settings['enabled'] ) && 'sticky_top' === ( $settings['placement'] ?? 'sticky_top' ) ) {
			add_action( 'wp_body_open', array( $this, 'render_sticky_ticker' ) );
		}
	}

	/**
	 * Render the ticker via shortcode.
	 */
	public function render_shortcode( $atts ) {
		$settings = Settings::get_settings();
		
		if ( ! empty( $settings['enabled'] ) ) {
			// Enforce Page Targeting Rules
			$display_pages = $settings['display_pages'] ?? 'all';
			if ( 'home' === $display_pages && ! is_front_page() && ! is_home() ) {
				return '';
			}

			// Fetch items through the adapter
			$items = Adapter::get_items( $settings );
			if ( empty( $items ) ) {
				return '';
			}

			// Seamless Loop Support: Duplicate items if total length is too short
			$total_chars = 0;
			foreach ( $items as $item ) {
				$total_chars += strlen( $item['title'] );
			}
			if ( $total_chars > 0 && $total_chars < 150 ) {
				$multiplier = ceil( 150 / $total_chars );
				$original = $items;
				for ( $i = 1; $i < $multiplier; $i++ ) {
					$items = array_merge( $items, $original );
				}
			}

			// Capture template output
			ob_start();
			$template = $settings['template'] ?? 'corporate';
			$template_path = FLOATING_NEWS_HEADLINE_DIR . "includes/templates/{$template}.php";
			
			if ( file_exists( $template_path ) ) {
				include $template_path;
			} else {
				include FLOATING_NEWS_HEADLINE_DIR . "includes/templates/corporate.php";
			}
			
			return ob_get_clean();
		}
		
		return '';
	}

	/**
	 * Render the sticky bar at the very top.
	 */
	public function render_sticky_ticker() {
		$output = $this->render_shortcode( array() );
		if ( $output ) {
			$settings        = Settings::get_settings();
			$scroll_behavior = $settings['scroll_behavior'] ?? 'fixed';
			$extra_class     = ( 'sticky_on_scroll' === $scroll_behavior ) ? ' fnh-behavior-sticky-on-scroll' : ' fnh-behavior-fixed';

			printf(
				'<div class="fnh-sticky-top-wrapper%s" data-scroll-behavior="%s" style="position:sticky;top:0;z-index:999999;width:100%%;">%s</div>',
				esc_attr( $extra_class ),
				esc_attr( $scroll_behavior ),
				$output // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			);
		}
	}
}
