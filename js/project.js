/* CWD Project Scripting
   -
   ------------------------------------------------------------------------- */

(function ($, Drupal, once) {
	'use strict';

	Drupal.behaviors.cwd_project = {
		attach: function (context, settings) {
			if (once('cwd_project', 'body').length) {

				//CU Search ------------------------------------------------------------
				$("#cu-search-form").attr("action", "/search/node/");
				$("#cu-search-query").attr("name", "keys");
				$("input[type=radio][name=sitesearch]").on("change", function () {
					switch ($(this).val()) {
						case "thissite":
							$("#cu-search-form").attr("action", "/search/node/");
							$("#cu-search-query").attr("name", "keys");
							$("#cu-search-form").attr("method", "get");
							break;
						case "cornell":
							$("#cu-search-form").attr("action", "//cornell.edu/search/");
							$("#cu-search-query").attr("name", "q");
							$("#cu-search-form").attr("method", "get");
							break;
						default:
							console.warn($(this).val() + " not found in project search");
					}
				});
				
			}
		}
	};

})(jQuery, Drupal, once);