/* CWD Motion Design (last update: 3/30/23)
   - -- 
   ------------------------------------------------------------------------- */
	
		
jQuery(document).ready(function($) {	
	
	// Globals
	var tracking_scroll = true; // can be toggled on and off to tune scroll-tracking (e.g., "false" when a nav link is pressed, "true" during manual scrolling)
	
	if ( $('[class*=cwd-motion-]').length > 0 ) {
	
		$('[class*=cwd-motion-]').addClass('scripted'); // confirm the presence of JavaScript before hiding elements behind animation
		
	/* Window Size Tracking
		---------------------------------------------------------------------- */
		function resizeChecks() {
				
			// Parallax (vertical offset, reverse-proportional to scrolling)
			$('.cwd-motion-parallax').each(function(i) {
				
				var element_height = $(this).height();
				if (element_height < 120) { // for small elements, use a minimum height to feed motion parameters below
					element_height = 120;
				}
				
				$(this).css('transform','translateY(0)');
				$(this).attr('data-offset-start', Math.round( $(this).offset().top - $(window).innerHeight() ));
				$(this).attr('data-offset-end', Math.round( $(this).offset().top + $(window).innerHeight() ));
				
				// @todo: the following calculations are serviceable, but could be better
				// -- the aim is to adjust the amount of animation distance to suit the size of the element and the device viewport
				$(this).attr('data-motion-multiplier', (element_height / 3) / $(window).innerHeight() );
				$(this).attr('data-motion-range', Math.round( element_height / 4 ));
			});
			
			// Reveals
			var default_reveal_at = 0.85; // trigger the element's reveal when it reaches the 85% point of the vertical viewport (15% from the bottom)
			
			$('.cwd-motion-fadein, .cwd-motion-slidein, .cwd-motion-custom').each(function() {
				var reveal_at = default_reveal_at;
				if ( $(this).hasClass('cwd-motion-onload') ) {
					reveal_at = 1; // reveal immediately on load
				}
				
				// Reveal: Fade-in (simple, one-time fade-in when element is scrolled into view)
				if ( $(this).hasClass('cwd-motion-fadein') ) {
					$(this).attr('data-reveal-start', Math.round( $(this).offset().top - $(window).innerHeight() * reveal_at ));
				}
				// Reveal: Slide-in (simple, one-time fade-in and vertical slide-in when element is scrolled into view)
				else if ( $(this).hasClass('cwd-motion-slidein') ) {
					$(this).attr('data-reveal-start', Math.round( $(this).offset().top - $(window).innerHeight() * reveal_at ));
				}
				// Reveal: Custom (no animation is applied, just the "revealed" class when scrolled into view)
				else if ( $(this).hasClass('cwd-motion-custom') ) {
					$(this).attr('data-reveal-start', Math.round( $(this).offset().top - $(window).innerHeight() * reveal_at ));
				}
			});
			
 			scrollChecks(); // include scroll updates too
		}
	
	/* Scroll Tracking
		---------------------------------------------------------------------- */
		function scrollChecks() {
		
			if (tracking_scroll) {
				
				// Parallax
				$('.cwd-motion-parallax').each(function() {
					var displace = parseInt($(this).attr('data-motion-range')) + ( parseInt($(this).attr('data-offset-start')) - $(window).scrollTop() ) * parseFloat($(this).attr('data-motion-multiplier'));
					$(this).css('transform','translateY(' + displace + 'px)');
				});
				
				// Reveals
				$('.cwd-motion-fadein, .cwd-motion-slidein, .cwd-motion-custom').each(function() {
					if ( $(window).scrollTop() > $(this).attr('data-reveal-start') && !$(this).hasClass('revealed') ) {
						$(this).addClass('revealed');
					}
				});
			}
		}
	
		// Initialize and Track Events
		$(window).resize($.debounce( 200, function(){ // throttle resize event
			resizeChecks();
		}));
		resizeChecks();
		$(window).scroll(scrollChecks);
		//scrollChecks();
		$(window).on('load', function(e) {
			resizeChecks(); // double-check offsets and heights after all data is loaded
		});
	
	}
});

