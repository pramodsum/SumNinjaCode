/**
 * This is a manifest file that will be compiled into application.js, which will
 * include all the files listed below.
 *
 * Any JavaScript file within this directory can be referenced here using a
 * relative path.
 *
 * It's not advisable to add code directly here, but if you do, it will appear
 * at the bottom of the compiled file.
 *
 * If you are planning to include all custom JavaScript inside main.js then
 * you don't have touch this file at all, otherwise "require" additional
 * scripts down below using //= filename.js notation.
 */

//= require grayscale
//= require modernizr
//= require main
//= require index

$(function () {
  var siteURL = location.host;
  var internalLinksQuery = "a[href^='" + siteURL + "'], a[href^='/'], a[href^='./'], a[href^='../'], a[href^='#']";
  var $window = $(window);
  var $mainContent = $('#main-content');
  var $internalLinks = $(internalLinksQuery);
  var $relatedPostsContainer = $('#related-posts-container');
  var $logo = $('#site-head-content');
  var $header = $('#site-head');
  var $footerLinks = $('.get-connected p:first-child');

  $mainContent.fitVids();

  //---------------------------------------------------------------------
  // Config Stuff
  //---------------------------------------------------------------------

  // ios < 7 fixed position bug
  var ios = iOSversion();
  if (ios && ios[0] <= 6) $('body').addClass('no-fixed-elements')

  // scroll to top button
  $('#scroll-to-top').click(function (e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 200);
  });

  // resize does equalization of post titles
  $window.resize(function () {
    $window.trigger('scroll');
  });

  // if on home, saves related posts to local storage and removes the temporary element
  // if on post, displays related posts if available
  if ($relatedPostsContainer.length > 0) {
    var rp = $relatedPostsContainer.clone();
    $relatedPostsContainer.remove();
    localStorage.setItem('relatedPosts', JSON.stringify(rp.html()));
    setTimeout(scrollToContent, 200);
  } else {
    displayRelatedPosts();
  }

  // updates layout after init
  $window.trigger('scroll');
  $window.trigger('resize');
  setTimeout(function () {
    $('h2.post-title, h1.post-title').slabText({minCharsPerLine: 15});
    $('article.loading').each(function () {
      var $this = $(this);
      setTimeout(function () {
        $this.removeClass('loading');
        $window.trigger('resize');
      }, Math.random() * 200);
    });
  }, 200);


  // if on home, updates related posts in local storage
  // if on posts, displays related posts if available
  function displayRelatedPosts() {
    var related = JSON.parse(localStorage.getItem('relatedPosts'));
    var $nav = $('nav.related-posts ul');
    if (related.length > 0 && $nav.length > 0) {
      $nav.html(related);
    } else {
      $('nav.related-posts').remove();
    }
  }

  // scrolls down to start of content if marker is available
  function scrollToContent() {
    var contentAnchor = $("span[name='post-content']");
    if (contentAnchor.length > 0) {
      $('html,body').animate({scrollTop: contentAnchor.offset().top - 10}, 'slow');
    } else {
      $('html,body').animate({scrollTop: 0}, 'slow');
    }
  }

  // removes all css and style tags from loaded content to prevent reinitialization
  function dataFilter(data, type) {
    type = type || 'text';
    if (type == 'html' || type == 'text') {
      data = data.replace(/<link.*?\/>/gi, '');
      data = data.replace(/<script.*?>([\w\W]*?)<\/script>/gi, '');
      data = $(data).filter('#main-content').children().parent();
      return data.html();
    }

    return data;
  }

  // ios version detection helper (for annoying fixed pos bug in iOS < 7)
  // source: http://bit.ly/1c7F26O
  function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
      // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
      var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
  }

});

