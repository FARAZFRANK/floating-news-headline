<?php
namespace FloatingNewsHeadline;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Handles centralized plugin settings logic.
 * Encapsulates CRUD and sanitization to prevent data corruption.
 */
class Settings {

	const OPTION_KEY = 'floating_news_headline_settings';

	/**
	 * Get all plugin settings with defaults.
	 */
	public static function get_settings() {
		$defaults = array(
			'enabled'         => true,
			'template'        => 'corporate',
			'source'          => 'latest_posts',
			'count'           => 5,
			'speed'           => 35,
			'placement'       => 'sticky_top',
			'display_pages'   => 'all',
			'paused'          => false,
			'item_spacing'    => 80,
			'labels'          => array(
				'latest_posts' => 'Latest Posts',
			),
			'manual_posts'    => array(),
			'custom_alert'      => '',
			'custom_alert_link' => '',
		);

		$settings = get_option( self::OPTION_KEY, null );
		
		// Migration: If new option doesn't exist, try old option.
		if ( null === $settings ) {
			$old_settings = get_option( 'fnh_settings', null );
			if ( null !== $old_settings ) {
				update_option( self::OPTION_KEY, $old_settings );
				delete_option( 'fnh_settings' );
				$settings = $old_settings;
			} else {
				$settings = $defaults;
			}
		}
		
		return wp_parse_args( $settings, $defaults );
	}

	/**
	 * Update settings with full sanitization.
	 */
	public static function update_settings( $new_settings ) {
		$current = self::get_settings();
		$merged  = wp_parse_args( $new_settings, $current );
		
		$sanitized = self::sanitize_settings( $merged );
		
		return update_option( self::OPTION_KEY, $sanitized );
	}

	/**
	 * Strict Sanitization Logic.
	 */
	private static function sanitize_settings( $settings ) {
		$output = array();
		
		$output['enabled']       = ! empty( $settings['enabled'] );
		$output['template']      = sanitize_text_field( $settings['template'] ?? 'corporate' );
		$output['source']        = sanitize_text_field( $settings['source'] ?? 'latest_posts' );
		$output['count']         = min( 20, max( 1, intval( $settings['count'] ?? 5 ) ) );
		$output['speed']         = min( 100, max( 5, intval( $settings['speed'] ?? 35 ) ) );
		$output['placement']     = sanitize_text_field( $settings['placement'] ?? 'sticky_top' );
		$output['display_pages'] = sanitize_text_field( $settings['display_pages'] ?? 'all' );
		$output['paused']        = ! empty( $settings['paused'] );
		$output['item_spacing']  = min( 200, max( 0, intval( $settings['item_spacing'] ?? 80 ) ) );
		
		// Labels (Assoc array)
		$output['labels'] = array();
		if ( isset( $settings['labels'] ) && is_array( $settings['labels'] ) ) {
			foreach ( $settings['labels'] as $key => $val ) {
				$output['labels'][ sanitize_key( $key ) ] = sanitize_text_field( $val );
			}
		}

		// Manual Posts (ID array)
		$output['manual_posts'] = array();
		if ( isset( $settings['manual_posts'] ) && is_array( $settings['manual_posts'] ) ) {
			$output['manual_posts'] = array_slice( array_map( 'intval', $settings['manual_posts'] ), 0, 5 ); // Free limit enforced
		}

		$output['custom_alert']      = sanitize_text_field( $settings['custom_alert'] ?? '' );
		$output['custom_alert_link'] = esc_url_raw( $settings['custom_alert_link'] ?? '' );
		
		return $output;
	}
}
