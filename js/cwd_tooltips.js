/* CWD Tooltips (last update: 5/6/21)
   - -- 
   
   - -- The term "button" refers to the element that a tooltip is associated with, but it doesn't have to be an actual <button>.
   - -- Tooltips can display above (.tooltip-top) or below (.tooltip-bottom) their button. (defaults to top)
   - -- Tooltips inherit page styles and are styled with a light background by default. A dark-background option is activated with .tooltip-dark.
   - -- Tooltips have edge-detection to stay within viewport bounds (moving, flipping, and adjusting arrow position as needed).
   
   - Accessibility Notes:
   - -- Tooltips exist in the DOM, ideally right after their button.
   - -- Tooltips show on button hover and persist when they themselves are hovered over or focused.
   - -- Tooltips also show on button focus (such as when accessed by keyboard or screen reader).
   - -- An aria-describedby relationship between button and tooltip is dynamically applied.
   - -- When a tooltip is no longer active, there is a 300ms delay before it is hidden (providing time to be re-established by hover or focus).
   - -- The Escape key will hide the tooltip. If used while focused on the tooltip, focus is moved to the button. 
   
   - Open Questions:
   - -- Should a "button" role be applied to any button that is not already naturally focusable (i.e., not a true <button>, a link, a form input, etc)?
   - -- Likewise, should a tabindex of 0 be applied to buttons that are not already naturally focusable.
   

   ------------------------------------------------------------------------- */
	
		
jQuery(document).ready(function($) {	
	
	var tip_count = 0;
	
	$('.tooltip').each(function() {
		
		/* Process button + tooltip pairs
		   ---------------------------------------------------------- */
		
		// @todo - maybe add a data-tip option to specify a tip manually. If it's not defined, it tries to find it with a next() below
		
		tip_count++;
		var button = $(this);
		var tip = $(this).next('.cwd-tooltip');
		var tip_timein, tip_timeout;
		
		if ( $(tip).length > 0 ) { // tooltip pair found
			
			// Web Accessibility setup
			/*
			if ( !$(button).is('button') ) { // @todo - if this is used, it should be extended to skip links and form inputs, and possibly others elements with semantic roles
				$(button).attr('role','button'); // @todo - this may not be a good idea - do we really want a button role added to links, table headers, form inputs, etc?
			}
			*/
			// @todo - when, if at all, should we apply a tabindex="0" to ensure that tooltip buttons are focusable if they would not naturally be so?
			$(tip).attr('id','cwd-tip'+tip_count); // @todo - should I check first to make sure it doesn't already have an ID? I'd say yes!
			$(button).attr('aria-describedby',$(tip).attr('id')); // @todo - this may not be a good idea either - since the tooltip is right there in the DOM, it is read next anyway
			$(tip).keyup(function(e) {
				if (e.keyCode == 27) { // escape key (while focused in a tooltip)
					$(button).focus();
				}
			});
			$(document).keyup(function(e) {
				if (e.keyCode == 27) { // escape key (regardless of focus)
					$(tip).removeClass('active');
				}
			});
			
			
			// Store original vertical orientation
			$(tip).attr('data-orientation','tooltip-top');
			if ( $(tip).hasClass('tooltip-bottom') ) {
				$(tip).attr('data-orientation','tooltip-bottom');
			}
			
			// Create a container for arrow shapes
			$(tip).prepend('<arrow></arrow>');
			
			// Button event handlers
			$(this).hover(function() {
				clearTimeout(tip_timeout);
				if ( !$(tip).hasClass('active') ) {
					$('.cwd-tooltip').removeClass('active');
					tip_timein = setTimeout(function() {
						$(tip).addClass('active');
						positionTip(button,tip);
					}, 150);
				}
			}, function() {
				clearTimeout(tip_timein);
				clearTimeout(tip_timeout);
				tip_timeout = setTimeout(function() {
					$(tip).removeClass('active');
				}, 300);
  		}).focusin(function() {
  			$(this).trigger('mouseenter');
  		}).focusout(function() {
  			$(this).trigger('mouseleave');
  		});
  		
  		// Tooltip event handlers
  		$(tip).hover(function() {
				clearTimeout(tip_timeout);
				$(this).addClass('active');
			}, function() {
				clearTimeout(tip_timeout);
				tip_timeout = setTimeout(function() {
					$(tip).removeClass('active');
				}, 300);
  		}).focusin(function() {
  			$(this).trigger('mouseenter');
  		}).focusout(function() {
  			$(this).trigger('mouseleave');
  		});
  	}
		
		/* Calculate tooltip position
		   --------------------------------------------------------- */
		var viewport_w, viewport_h, w, h, x, y, edge_left, edge_right, edge_top, edge_bottom, arrow_offset;
		
		function positionTip(button,tip) {
			
			$(tip).removeAttr('style').removeClass('tooltip-top tooltip-bottom').addClass( $(tip).attr('data-orientation') ); // reset to natural size and vertical orientation
			
			viewport_w = $(window).width();
			viewport_h = $(window).height();
			w = $(tip).outerWidth();
			h = $(tip).outerHeight();
			x = Math.round( $(button).position().left - w/2 + $(button).outerWidth()/2 );
			y = '10';
			if ( $(tip).hasClass('tooltip-top') ) {
				y = Math.round( -10 - h - $(button).outerHeight() );
			}
			
			$(tip).css('transform','translate('+x+'px, '+y+'px)');
			$(tip).find('arrow').removeAttr('style');
			
			// Edge detection (the section of detection!)
			if ( w > viewport_w-8 ) {
				$(tip).css('max-width',(viewport_w-8)+'px');
			}
			arrow_offset = 0;
			edge_left = $(tip).offset().left;
			edge_right = viewport_w - ( $(tip).offset().left + $(tip).outerWidth() );
			edge_top = $(tip).offset().top - $(window).scrollTop();
			edge_bottom = ( viewport_h + $(window).scrollTop() ) - ( $(tip).offset().top + h );
			if (edge_left < 0) {
				arrow_offset = edge_left;
				x = x - edge_left + 4;
			}
			if (edge_right < 0) {
				arrow_offset = 0 - edge_right;
				x = x + edge_right - 4;
			}
			if (edge_bottom < 0) {
				$(tip).removeClass('tooltip-bottom').addClass('tooltip-top');
				y = Math.round( -10 - $(tip).outerHeight() - $(button).outerHeight() );
			}
			if (edge_top < 0) {
				$(tip).removeClass('tooltip-top').addClass('tooltip-bottom');
				y = '10';
			}
			$(tip).css('transform','translate('+x+'px, '+y+'px)'); // adjust position
			$(tip).find('arrow').css('transform','translateX('+arrow_offset+'px'); // adjust arrow to remain centered on the button
		}
	});
});

