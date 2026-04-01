<?php
/**
 * Corporate Classic Template
 * Clean, professional Indigo-themed design.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

$floating_news_headline_classes = 'fnh-ticker fnh-ticker--corporate' . ( ! empty( $settings['paused'] ) ? ' fnh-ticker--pause-on-hover' : '' );
?>

<div class="<?php echo esc_attr( $floating_news_headline_classes ); ?>" data-fnh-base-speed="<?php echo esc_attr( $settings['speed'] ?? 35 ); ?>" style="--fnh-speed: <?php echo esc_attr( $settings['speed'] ?? 35 ); ?>s; --fnh-gap: <?php echo esc_attr( $settings['item_spacing'] ?? 80 ); ?>px;">
	<!-- 1. Fixed Label -->
	<div class="fnh-ticker__label">
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
		<span><?php echo esc_html( $settings['labels']['latest_posts'] ?? 'Latest Posts' ); ?></span>
	</div>

	<!-- 2. Scrollable Area -->
	<div class="fnh-ticker__scroll-area">
		<div class="fnh-ticker__marquee">
			<!-- Group 1 (Original) -->
			<div class="fnh-ticker__group">
				<?php foreach ( $items as $floating_news_headline_item ) : ?>
					<a href="<?php echo esc_url( $floating_news_headline_item['link_url'] ); ?>" class="fnh-ticker__item">
						<?php if ( ! empty( $floating_news_headline_item['image_url'] ) ) : ?>
							<img src="<?php echo esc_url( $floating_news_headline_item['image_url'] ); ?>" class="fnh-ticker__img" alt="">
						<?php endif; ?>
						<div class="fnh-ticker__text">
							<span class="fnh-ticker__title"><?php echo esc_html( $floating_news_headline_item['title'] ); ?></span>
							<?php if ( ! empty( $floating_news_headline_item['meta'] ) ) : ?>
								<span class="fnh-ticker__meta"><?php echo esc_html( $floating_news_headline_item['meta'] ); ?></span>
							<?php endif; ?>
						</div>
					</a>
				<?php endforeach; ?>
			</div>
			<!-- Group 2 (Clone for Seamless Loop) -->
			<div class="fnh-ticker__group" aria-hidden="true">
				<?php foreach ( $items as $floating_news_headline_item ) : ?>
					<a href="<?php echo esc_url( $floating_news_headline_item['link_url'] ); ?>" class="fnh-ticker__item">
						<?php if ( ! empty( $floating_news_headline_item['image_url'] ) ) : ?>
							<img src="<?php echo esc_url( $floating_news_headline_item['image_url'] ); ?>" class="fnh-ticker__img" alt="">
						<?php endif; ?>
						<div class="fnh-ticker__text">
							<span class="fnh-ticker__title"><?php echo esc_html( $floating_news_headline_item['title'] ); ?></span>
							<?php if ( ! empty( $floating_news_headline_item['meta'] ) ) : ?>
								<span class="fnh-ticker__meta"><?php echo esc_html( $floating_news_headline_item['meta'] ); ?></span>
							<?php endif; ?>
						</div>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</div>

	<!-- 3. Play/Pause Button -->
	<button type="button" class="fnh-play-pause-btn" data-fnh-action="toggle-pause" aria-label="Pause" title="Pause">
		<svg class="fnh-icon-pause" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
		<svg class="fnh-icon-play fnh-hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
	</button>
</div>
