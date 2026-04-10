<?php
namespace FloatingNewsHeadline;

if (!defined('ABSPATH'))
	exit;

/**
 * Centeralized data adapter for fetching ticker content.
 * Includes performance-optimized caching via WordPress Transients.
 */
class Adapter
{

	const CACHE_KEY_PREFIX = 'floating_news_headline_items_';
	const CACHE_EXPIRATION = 600; // 10 minutes

	/**
	 * Fetch content based on settings.
	 */
	public static function get_items($settings)
	{
		$source = $settings['source'] ?? 'latest_posts';
		$count = $settings['count'] ?? 5;

		// Create a unique cache key based on source, count, and cache version.
		// Versioning avoids raw SQL for clearing transients.
		$version = get_option('floating_news_headline_cache_version', '1.0.0');
		$cache_key = self::CACHE_KEY_PREFIX . md5($version . $source . $count . serialize($settings['manual_posts'] ?? array()));

		// Try to get from cache first
		$items = get_transient($cache_key);
		if (false !== $items) {
			return apply_filters('floating_news_headline_items', $items, $settings);
		}

		$items = array();

		switch ($source) {
			case 'latest_posts':
				$items = self::get_latest_posts($count);
				break;

			case 'manual':
				$manual_ids = $settings['manual_posts'] ?? array();
				$items = self::get_manual_posts($manual_ids);
				break;

			case 'custom_alert':
				$items = self::get_custom_alert($settings);
				break;
		}

		// Cache the results
		set_transient($cache_key, $items, self::CACHE_EXPIRATION);

		return apply_filters('floating_news_headline_items', $items, $settings);
	}

	private static function get_latest_posts($count)
	{
		$wp_posts = get_posts(array(
			'numberposts' => intval($count),
			'post_status' => 'publish',
		));

		return self::format_posts($wp_posts);
	}

	private static function get_manual_posts($ids)
	{
		if (empty($ids)) {
			return array();
		}

		$wp_posts = get_posts(array(
			'include' => array_map('intval', $ids),
			'post_status' => 'publish',
			'orderby' => 'post__in',
		));

		return self::format_posts($wp_posts);
	}

	private static function get_custom_alert($settings)
	{
		$text = $settings['custom_alert'] ?? '';
		$link = $settings['custom_alert_link'] ?? '';

		if (empty($text)) {
			return array();
		}

		return array(
			array(
				'id' => 0,
				'title' => $text,
				'image_url' => '',
				'link_url' => $link,
				'meta' => '',
			)
		);
	}

	/**
	 * Formats WP_Post objects into a standard schema for templates and REST.
	 */
	private static function format_posts($wp_posts)
	{
		$formatted = array();
		foreach ($wp_posts as $post) {
			$author_name = get_the_author_meta('display_name', $post->post_author);
			$categories = get_the_category($post->ID);
			$category = !empty($categories) ? $categories[0]->name : 'Uncategorized';

			$formatted[] = array(
				'id' => $post->ID,
				'title' => $post->post_title,
				'image_url' => get_the_post_thumbnail_url($post->ID, 'medium') ?: '',
				'link_url' => get_permalink($post->ID),
				'meta' => sprintf('By %s • %s', $author_name, $category),
			);
		}
		return $formatted;
	}

	/**
	 * Clears the plugin transients. Useful during settings updates.
	 */
	public static function clear_cache()
	{
		update_option('floating_news_headline_cache_version', time());
	}
}
