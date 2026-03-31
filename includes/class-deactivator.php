<?php
namespace FloatingNewsHeadline;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Fired during plugin deactivation.
 */
class Deactivator {

	public static function deactivate() {
		// Cleanup if necessary (transients, etc.)
	}
}
