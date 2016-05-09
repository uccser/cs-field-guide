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
    if (anchor && !window.location.hash.startsWith('#section-')) {
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

  // Activate modal buttons
  $('.modal-trigger').leanModal();

  // Display an invitation to developers to contribute to this project
  console.log('%cAre you a developer?', 'font: bold 1.5em "Open Sans", sans-serif;')
  console.log('%cThe Computer Science Field Guide is open source here:', 'font: 1.2em "Open Sans", sans-serif;')
  console.log('%chttps://github.com/uccser/cs-field-guide', 'font: 1.2em "Open Sans", sans-serif;')
  console.log('%cWe would love your help to make this guide the best it can be!', 'font: 1.2em "Open Sans", sans-serif;')
  console.log('%cThanks,', 'font: 1.2em "Open Sans", sans-serif;')
  console.log('%cThe CSFG team :)', 'font: 1.2em "Open Sans", sans-serif;')
});
