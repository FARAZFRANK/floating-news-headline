<?php
namespace FloatingNewsHeadline;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Handles the admin menu and page rendering.
 */
class Admin {

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu_page' ) );
		add_action( 'admin_head', array( $this, 'hide_duplicate_submenu' ) );
	}

	/**
	 * Hides the first (duplicate) sub-menu item via CSS.
	 */
	public function hide_duplicate_submenu() {
		echo '<style>#toplevel_page_floating-news-headline .wp-first-item { display: none !important; }</style>';
	}

	/**
	 * Register the menu page and Get Pro sub-page.
	 */
	public function add_menu_page() {
		$parent_slug = 'floating-news-headline';
		
		add_menu_page(
			'Floating News Headlines',
			'News Headlines',
			'manage_options',
			$parent_slug,
			array( $this, 'render_admin_page' ),
			'dashicons-testimonial',
			65
		);

		add_submenu_page(
			$parent_slug,
			'Help & Documentation',
			'Help',
			'manage_options',
			'floating-news-headline-help',
			array( $this, 'render_admin_page' ) // Same React root, we handle route in JS
		);

		add_submenu_page(
			$parent_slug,
			'Get Pro Version',
			'Get Pro',
			'manage_options',
			'floating-news-headline-get-pro',
			array( $this, 'render_admin_page' ) // Same React root, we handle route in JS
		);

		// The first submenu item is automatically created. 
		// If we want to hide it but keep the top-level working, we can't easily remove it without breaking the default route.
		// However, we can ensure the top-level points to the dashboard correctly.
	}

	/**
	 * Output the root container for the React app.
	 */
	public function render_admin_page() {
		?>
		<div class="wrap fnh-admin-wrap">
			<div id="fnh-admin-root"></div>
		</div>
		<script>
			// Dynamic version adjustment for React header
			(function() {
				const targetNode = document.getElementById('fnh-admin-root');
				if (!targetNode) return;
				
				const observer = new MutationObserver((mutations) => {
					// Search for the version string in the DOM and replace it
					const walker = document.createTreeWalker(targetNode, NodeFilter.SHOW_TEXT, null, false);
					let node;
					while (node = walker.nextNode()) {
						if (node.nodeValue.includes('v1.3.3')) {
							node.nodeValue = node.nodeValue.replace('v1.3.3', 'v' + (window.floatingNewsHeadlineData?.version || '1.3.3'));
							// observer.disconnect(); // Don't disconnect in case of re-renders
						}
					}
				});
				
				observer.observe(targetNode, { childList: true, subtree: true });
			})();
		</script>
		<?php
	}
}
