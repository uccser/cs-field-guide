$(document).ready(function(){
  $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  $('#page-navigation').pushpin({ top: $('header').height() });
  $('.scrollspy').scrollSpy();
});
