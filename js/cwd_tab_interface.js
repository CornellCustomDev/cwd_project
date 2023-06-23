/* CWD Tab Interface (last update: 3/28/23)
   - -- 
   ------------------------------------------------------------------------- */
	
		
jQuery(document).ready(function($) {	
	
	$('.tab-interface').each(function() {
		var tabs = $(this);
		var tab_count = 0;
		
		// Begin with first item active
		$(this).find('.tab-label').first().addClass('active');
		$(this).find('.tab-content').attr('tabindex','-1').addClass('aria-target').first().addClass('active'); // also adds a tabindex to aid with focus handling
		
		// Hover and Focus events
		$(this).find('.tab-label').each(function() {
			tab_count++;
			var hover_intent; // will be a Timeout() below
			$(this).wrapInner('<span class="deco"><span class="inner"></span></span>');
			$(this).mouseenter(function() {
				var this_tab = $(this);
				hover_intent = setTimeout(function() {
					$(tabs).find('.active').removeClass('active');
					$(this_tab).addClass('active');
					$(this_tab).next('.tab-content').addClass('active');
				},100); // 100ms delay in hover response, to reduce unintentional trigger
			}).mouseout(function() {
				clearTimeout(hover_intent);
			}).focus(function() {
				$(this).trigger('mouseenter');
			});
		});
		
		// Mark with the number of tabs counted above
		$(this).attr('data-tabcount',tab_count);
		
		// Use compact design for larger numbers of tabs
		if (tab_count > 7) {
			$(this).find('.tab-label').addClass('ultra-compact');
		}
		else if (tab_count > 5) {
			$(this).find('.tab-label').addClass('compact');
		}
		
		// Safeguard against Focus on hidden elements (primarily when navigating backward)
		$(this).find('.tab-content').focusin(function() {
			$(this).prev('.tab-label').trigger('mouseenter');
		});
		
	});
	
});

