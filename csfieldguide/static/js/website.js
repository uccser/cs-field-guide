$ = jQuery = require('jquery');
require('bootstrap');
require('details-element-polyfill');
require('featherlight');
require('sticky-state');
var gumshoe = require('gumshoejs');
const iFrameResize = require('iframe-resizer/js/iframeResizer.js');

$(document).ready(function(){
  // Display glossary-modal
  $("#content-container, #glossary-modal").on("click", ".glossary-term", open_glossary_definition);

  // Pause YouTube videos playing within a closed details elements
  $("body").on("click", "details[open]", details_element_closed);

  iFrameResize({}, 'iframe.iframe-resize');

  if (document.getElementById("section-headings")) {
    var spy = new gumshoe('#section-headings a', {
      offset: window.innerHeight * 0.5, // 50% down page
      reflow: true,
    });
    $('#body-content').scroll(spy.detect);
  }
});

function open_glossary_definition() {
  /**
   * Retrieve glossary definition.
   */
  var glossary_modal = $("#glossary-modal");
  if (!glossary_modal.hasClass('show')) {
    glossary_modal.modal('show');
  }

  var slug = $(this).data("glossary-term");
  if (glossary_modal.attr("data-glossary-term") != slug) {
    $("#glossary-modal-term").text("Loading glossary definition...");
    $("#glossary-modal-definition").html("");
    $.ajax({
      type: "GET",
      url: glossary_url,
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
  if (data.translated) {
    $("#glossary-modal-translation-unavailable").addClass("d-none");
  } else {
    $("#glossary-modal-translation-unavailable").removeClass("d-none");
  }
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

function details_element_closed() {
  /**
   * Pause any YouTube videos playing within the closed details element.
   */
  $('iframe[src*="youtube"]', this).each(function() {
    var player = $(this).data('youtube-player');
    if (player === undefined) {
      // If iframe has no ID
      if (!this.id) {
        var src = this.src;
        var video_id = src.substring(src.lastIndexOf('/') + 1, src.indexOf('?'));
        this.id = 'youtube-embed-' + video_id;
      }
      // Create YouTube player for iframe
      player = new YT.Player(this.id, {
        events: {
          'onReady': function (event) {
            event.target.pauseVideo();
          },
        }
      });
      $(this).data('youtube-player', player);
    } else {
      player.pauseVideo();
    }
  });
}
