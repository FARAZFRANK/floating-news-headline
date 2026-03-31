<?php
/**
 * Dark Night Template
 * Sleek, high-contrast Slate design with emerald pulse.
 */
if ( ! defined( 'ABSPATH' ) ) exit;

$floating_news_headline_classes = 'fnh-ticker fnh-ticker--dark' . ( ! empty( $settings['paused'] ) ? ' fnh-ticker--pause-on-hover' : '' );
?>

<div class="<?php echo esc_attr( $floating_news_headline_classes ); ?>" style="--fnh-speed: <?php echo esc_attr( $settings['speed'] ?? 35 ); ?>s; --fnh-gap: <?php echo esc_attr( $settings['item_spacing'] ?? 80 ); ?>px;">
	<!-- 1. Fixed Label -->
	<div class="fnh-ticker__label">
		<span><?php echo esc_html( $settings['labels']['latest_posts'] ?? 'Latest Posts' ); ?></span>
	</div>

	<!-- 2. Scrollable Area -->
	<div class="fnh-ticker__scroll-area">
		<!-- Gradient Blur Overlays (Dark) -->
		<div class="fnh-ticker__blur fnh-ticker__blur--left"></div>
		<div class="fnh-ticker__blur fnh-ticker__blur--right"></div>

		<div class="fnh-ticker__marquee">
			<!-- Group 1 -->
			<div class="fnh-ticker__group">
				<?php foreach ( $items as $floating_news_headline_item ) : ?>
					<a href="<?php echo esc_url( $floating_news_headline_item['link_url'] ); ?>" class="fnh-ticker__item">
						<?php if ( ! empty( $floating_news_headline_item['image_url'] ) ) : ?>
							<div class="fnh-ticker__img-wrapper">
								<img src="<?php echo esc_url( $floating_news_headline_item['image_url'] ); ?>" class="fnh-ticker__img" alt="">
								<div class="fnh-ticker__img-pulse"></div>
							</div>
						<?php endif; ?>
						<div class="fnh-ticker__text">
							<span class="fnh-ticker__title"><?php echo esc_html( $floating_news_headline_item['title'] ); ?></span>
						</div>
					</a>
					<span class="fnh-ticker__divider">|</span>
				<?php endforeach; ?>
			</div>
			<!-- Group 2 -->
			<div class="fnh-ticker__group" aria-hidden="true">
				<?php foreach ( $items as $floating_news_headline_item ) : ?>
					<a href="<?php echo esc_url( $floating_news_headline_item['link_url'] ); ?>" class="fnh-ticker__item">
						<?php if ( ! empty( $floating_news_headline_item['image_url'] ) ) : ?>
							<div class="fnh-ticker__img-wrapper">
								<img src="<?php echo esc_url( $floating_news_headline_item['image_url'] ); ?>" class="fnh-ticker__img" alt="">
								<div class="fnh-ticker__img-pulse"></div>
							</div>
						<?php endif; ?>
						<div class="fnh-ticker__text">
							<span class="fnh-ticker__title"><?php echo esc_html( $floating_news_headline_item['title'] ); ?></span>
						</div>
					</a>
					<span class="fnh-ticker__divider">|</span>
				<?php endforeach; ?>
			</div>
		</div>
	</div>

	<!-- 3. Play/Pause Button -->
	<button type="button" class="fnh-play-pause-btn" data-fnh-action="toggle-pause" aria-label="Pause" title="Pause">
		<svg class="fnh-icon-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
		<svg class="fnh-icon-play fnh-hidden" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
	</button>
</div>
