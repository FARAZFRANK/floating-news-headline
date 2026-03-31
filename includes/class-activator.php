<?php
namespace FloatingNewsHeadline;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Fired during plugin activation.
 */
class Activator {

	public static function activate() {
		// Initialize settings with defaults if they don't exist.
		$current = Settings::get_settings();
		if ( empty( $current['enabled'] ) && ! get_option( Settings::OPTION_KEY ) ) {
			Settings::update_settings( array() ); // Triggers default save.
		}
	}
}
