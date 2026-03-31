<?php
/**
 * Plugin Name: Floating News Headline
 * Description: Premium, modern, and highly customizable floating news ticker for WordPress.
 * Version:     1.3.1
 * Author:      A WP Life
 * License:     GPL-2.0-or-later
 * Text Domain: floating-news-headline
 */

namespace FloatingNewsHeadline;

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'FLOATING_NEWS_HEADLINE_VERSION', '1.3.1' );
define( 'FLOATING_NEWS_HEADLINE_DIR', plugin_dir_path( __FILE__ ) );
define( 'FLOATING_NEWS_HEADLINE_URL', plugin_dir_url( __FILE__ ) );

/**
 * PSR-4 Style Autoloader
 */
spl_autoload_register( function ( $class ) {
	$prefix = 'FloatingNewsHeadline\\';
	$base_dir = FLOATING_NEWS_HEADLINE_DIR . 'includes/';
	$len = strlen( $prefix );
	if ( strncmp( $prefix, $class, $len ) !== 0 ) return;
	
	$relative_class = substr( $class, $len );
	$file = $base_dir . 'class-' . strtolower( str_replace( array( '\\', '_' ), '-', $relative_class ) ) . '.php';
	
	if ( file_exists( $file ) ) {
		require $file;
	}
} );

/**
 * Initialize core components.
 */
function floating_news_headline_init() {
	new Assets();
	new REST_API();
	new Frontend();
	
	if ( is_admin() ) {
		new Admin();
	}
}
add_action( 'plugins_loaded', __NAMESPACE__ . '\floating_news_headline_init' );

/**
 * Lifecycle Hooks
 */
register_activation_hook( __FILE__, array( __NAMESPACE__ . '\Activator', 'activate' ) );
register_deactivation_hook( __FILE__, array( __NAMESPACE__ . '\Deactivator', 'deactivate' ) );
