/*!
 * Clean Blog v1.0.0 (http://startbootstrap.com)
 * Copyright 2014 Start Bootstrap
 * Licensed under Apache 2.0 (https://github.com/IronSummitMedia/startbootstrap/blob/gh-pages/LICENSE)
 */

 /*
 * Note from Ash: I've heavily removed things; see their original for more.
 */

var index;
var map;

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
  var MQL = 1170;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('.navbar-custom').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
            $('.navbar-custom').addClass('is-visible');
          } else {
            $('.navbar-custom').removeClass('is-visible is-fixed');
          }
        } else {
          //if scrolling down...
          $('.navbar-custom').removeClass('is-visible');
          if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) {
            $('.navbar-custom').addClass('is-fixed');
          }
        }

        this.previousTop = currentTop;
      });
  }

  $.getJSON('/search.json', function(data){
    console.log(data);
    index = lunr.Index.load(data.index);
    map = data.map;

    $("#search").bind("keyup", function(){
      $(".search-results").empty();
      if ($(this).val() < 2) return;
      var query = $(this).val();
      
      var results = index.search(query);
      $.each(results, function(index, result){
        console.log(results, map[result.ref]);
        $(".search-results").append(
          '<li class="result-item">' +
            '<a href="' + result.ref + '">' + map[result.ref].title + '</a>' +
          '</li>'
        );
      });
    });
  });
});

var trackMaretingLink = function(link) {
   ga('send', 'event', 'marketing', link);
}
