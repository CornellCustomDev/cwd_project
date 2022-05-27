/* CWD Organization Menu (last update: 2/2/22)
   - -- 
   ------------------------------------------------------------------------- */
	
		
jQuery(document).ready(function($) {	
	
	if ($('#org-menu').length > 0) {
		var org_menu_offset = 0;
		$('#org-menu-toggle').attr('aria-expanded','false').click(function(e) {
			e.preventDefault();
			if ($(this).attr('aria-expanded') == 'false') {
				menuPosition();
				$(this).addClass('open').attr('aria-expanded','true');
				$(this).next('ul').fadeIn(150).addClass('open');
			}
			else {
				$(this).removeClass('open').attr('aria-expanded','false');
				$(this).next('ul').fadeOut(150).removeClass('open');
			}
		});
		
		// dismiss by Escape key
		$('#org-menu ul a, #org-menu button').keyup(function(e) {
			if (e.keyCode == 27 && $('#org-menu-toggle').hasClass('open')) { // 27 = escape key
				$('#org-menu-toggle').focus().trigger('click');
			}
		});
	
		// update menu position on resize
		function menuPosition() {
			org_menu_offset = $('#org-menu-toggle').position().left + ($('#org-menu-toggle').width() / 2) - 120; // 120 is half of the menu width of 240px
			$('#org-menu-toggle').next('ul').css('left',org_menu_offset+'px');
		}
		$(window).resize(menuPosition);
	
		// auto-close when focus moves to nearby elements
		$('#super-header a, #super-header button, #cu-search input, #cu-search button, #org-menu-home').focus(function(e) {
			if ($('#org-menu-toggle').hasClass('open')) {
				$('#org-menu-toggle').removeClass('open').attr('aria-expanded','false');
				$('#org-menu-toggle').next('ul').fadeOut(150).removeClass('open');
			}
		});
	}
	
});

