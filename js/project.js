/* CWD Project Scripting
   - 
   ------------------------------------------------------------------------- */

	
	
/* CU Search
	------------------------------------------------------------------------- */
    $(window).on("load", function () {
        $("#cu-search-form").attr("action", "/search/node/");
        $("#cu-search-query").attr("name", "keys");

        $('input[type=radio][name=sitesearch]').on('change', function () {
            switch ($(this).val()) {
                case 'thissite':
                    $("#cu-search-form").attr("action", "/search/node/");
                    $("#cu-search-query").attr("name", "keys");
										$("#cu-search-form").attr("method", "get");
                    cu - search - query
                    break;
                case 'cornell':
                    $("#cu-search-form").attr("action", "https://cornell.edu/search/");
                    $("#cu-search-query").attr("name", "q");
										$("#cu-search-form").attr("method", "get");
                    break;
            }
        });

    });

});
