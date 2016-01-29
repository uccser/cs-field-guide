$(document).ready(function(){
  $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  $('.scrollspy').scrollSpy();

  // Code for jumping to anchors
  if (window.location.hash) {
    var anchor = document.getElementById(window.location.hash.substring(1));
    if (anchor) {
      $target = $(anchor);
      // Set target style on anchor
      $target.addClass("glossary-anchor-link-highlight");
      var $panel = $target.closest("li.panel-selector").children()[0];
      // If within panel, open panel
      if ($panel) {
        $panel.click();
      }
    }
  }
});
