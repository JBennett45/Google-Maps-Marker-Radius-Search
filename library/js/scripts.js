jQuery(document).ready(function($) {
  // loader
  $(window).on('load', function(){
    $(".overlay_map_result").delay(825).fadeOut("625");
  });
  // header collapse
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 20) {
      $("header").addClass("collapsed_header");
    } else {
      $("header").removeClass("collapsed_header");
    }
  });
});
