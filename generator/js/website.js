$(document).ready(function(){
  $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  $('.table-of-contents').pushpin({ top: 0 });
  $('.scrollspy').scrollSpy();
});
