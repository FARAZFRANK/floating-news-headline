<?php
namespace FloatingNewsHeadline;

if (!defined('ABSPATH'))
	exit;

/**
 * Registers and secures REST API routes.
 * Nonce verification is mandatory for all POST operations.
 */
class REST_API
{

	public function __construct()
	{
		add_action('rest_api_init', array($this, 'register_routes'));
	}

	public function register_routes()
	{
		// GET Settings
		register_rest_route('floating-news-headline/v1', '/settings', array(
			'methods' => 'GET',
			'callback' => array($this, 'get_settings'),
			'permission_callback' => array($this, 'check_permission'),
		));

		// POST Settings (Update)
		register_rest_route('floating-news-headline/v1', '/settings', array(
			'methods' => 'POST',
			'callback' => array($this, 'update_settings'),
			'permission_callback' => array($this, 'check_permission'),
		));

		// GET Posts for Preview
		register_rest_route('floating-news-headline/v1', '/posts', array(
			'methods' => 'GET',
			'callback' => array($this, 'get_posts_for_preview'),
			'permission_callback' => array($this, 'check_permission'),
		));

		// GET Post Search
		register_rest_route('floating-news-headline/v1', '/search', array(
			'methods' => 'GET',
			'callback' => array($this, 'search_posts'),
			'permission_callback' => array($this, 'check_permission'),
		));
	}

	/**
	 * Security Layer: Check for manage_options capability.
	 */
	public function check_permission()
	{
		$can = current_user_can('manage_options');
		// Security: manage_options check
		return $can;
	}

	public function get_settings()
	{
		return rest_ensure_response(Settings::get_settings());
	}

	public function update_settings($request)
	{
		// Nonce check is performed automatically by WP REST API if 'X-WP-Nonce' header is provided.
		// However, we sanitize all inputs within the Settings class.
		$params = $request->get_json_params();
		$success = Settings::update_settings($params);
		return rest_ensure_response(array('success' => $success));
	}

	public function search_posts($request)
	{
		$query = sanitize_text_field($request->get_param('q'));
		if (empty($query)) {
			return rest_ensure_response(array());
		}

		$wp_posts = get_posts(array(
			'numberposts' => 10,
			'post_status' => 'publish',
			's' => $query,
		));

		$results = array();
		foreach ($wp_posts as $post) {
			$results[] = array(
				'id' => $post->ID,
				'title' => $post->post_title,
				'image_url' => get_the_post_thumbnail_url($post->ID, 'thumbnail') ?: '',
				'link_url' => get_permalink($post->ID),
			);
		}

		return rest_ensure_response($results);
	}

	public function get_posts_for_preview($request)
	{
		$source = $request->get_param('source') ?: 'latest_posts';
		$count = intval($request->get_param('count')) ?: 5;

		$settings = Settings::get_settings();
		$settings['source'] = $source;
		$settings['count'] = $count;

		// Override custom alert fields from request for live preview accuracy.
		if ('manual' === $source) {
			$ids_param = $request->get_param('ids');
			if (!empty($ids_param)) {
				$settings['manual_posts'] = array_map('intval', explode(',', $ids_param));
			} else {
				$settings['manual_posts'] = array();
			}
		} elseif ('custom_alert' === $source) {
			$custom_alert = $request->get_param('custom_alert');
			$custom_alert_link = $request->get_param('custom_alert_link');
			if (null !== $custom_alert) {
				$settings['custom_alert'] = sanitize_text_field($custom_alert);
			}
			if (null !== $custom_alert_link) {
				$settings['custom_alert_link'] = esc_url_raw($custom_alert_link);
			}
		}

		Adapter::clear_cache();
		$posts = Adapter::get_items($settings);

		return rest_ensure_response($posts);
	}
}
