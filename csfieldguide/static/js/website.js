$(document).ready(function(){
  $(".button-collapse").sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  $('.scrollspy').scrollSpy();
  $("#page-navigation").stick_in_parent();

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

  // Display an invitation to developers to contribute to this project
  console.log('%cAre you a developer?', 'font: bold 1.5em "Open Sans", sans-serif;')
  console.log('%cThe Computer Science Field Guide is open source here:', 'font: 1.2em "Open Sans", sans-serif;')
  console.log('%chttps://github.com/uccser/cs-field-guide', 'font: 1.2em "Open Sans", sans-serif;')
  console.log('%cWe would love your help to make this guide the best it can be!', 'font: 1.2em "Open Sans", sans-serif;')
  console.log('%cThanks,', 'font: 1.2em "Open Sans", sans-serif;')
  console.log('%cThe CSFG team :)', 'font: 1.2em "Open Sans", sans-serif;')

  // Glossary stuff
  $("body").on("click", ".glossary-term", open_glossary_definition);
});


function open_glossary_definition() {
  /**
   * Retrieve glossary definition.
   */
  var glossary_modal = $("#glossary-modal");
  glossary_modal.openModal();

  var slug = $(this).data("glossary-term");
  if (glossary_modal.attr("data-glossary-term") != slug) {
    // TODO: Allow code to work for different languages
    $("#glossary-modal-term").text("Loading glossary definition...");
    $("#glossary-modal-definition").html("");
    var url = "/chapters/glossary/json/";
    $.ajax({
      type: "GET",
      url: url,
      data: "term=" + slug,
      async: true,
      cache: true,
      dataType: "json",
      success: update_glossary_modal,
      error: show_glossary_modal_error,
    });
  }
}

function update_glossary_modal(data) {
  /**
   * Update the glossary modal with definition data.
   * @param {dict} data - The JSON data for the definition.
   */
  var glossary_modal = $("#glossary-modal");
  glossary_modal.attr("data-glossary-term", data.slug);
  $("#glossary-modal-term").text(data.term);
  $("#glossary-modal-definition").html(data.definition);
}

function show_glossary_modal_error(jqXHR, text_status, error_thrown) {
  /**
   * Update the glossary modal with an error.
   * @param {jqXHR} jqXHR - The jqXHR object.
   * @param {str} text_status - Describes the type of error that occurred.
   * @param {str} error_thrown - Optional exception object, if one occurred.
   */
  var glossary_modal = $("#glossary-modal");
  glossary_modal.attr("data-glossary-term", "");
  $("#glossary-modal-term").text("Error!");
}
