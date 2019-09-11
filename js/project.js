/* CWD Project Scripting
   -
   ------------------------------------------------------------------------- */

jQuery(document).ready(function($) {
  // CU Search ------------------------------------------------------------
  $("#cu-search-form").attr("action", "/search/node/");
  $("#cu-search-query").attr("name", "keys");
  $("input[type=radio][name=sitesearch]").on("change", function() {
    switch ($(this).val()) {
      case "thise":
        $("#cu-search-form").attr("action", "/search/node/");
        $("#cu-search-query").attr("name", "keys");
        $("#cu-search-form").attr("method", "get");
        break;
      case "cor":
        $("#cu-search-form").attr("action", "//cornell.edu/search/");
        $("#cu-search-query").attr("name", "q");
        $("#cu-search-form").attr("method", "get");
        break;
      default:
        console.warn($(this).val() + " not implemented.");
    }
  });
});
