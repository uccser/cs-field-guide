$(document).ready(function() {
  $('#csfg-trailer').on('click', open_trailer_modal);
  $('#trailer-modal').on('hide.bs.modal', function (e) {
    $('#trailer-player-container').empty();
  })
});

function open_trailer_modal() {
  var trailer_modal = $('#trailer-modal');
  trailer_modal.modal('show');
  $('#trailer-player-container').append('<div id="trailer-player"></div>');
  var player = new YT.Player('trailer-player', {
    videoId: 'v5yeq5u2RMI',
    width: '100%',
    playerVars: {
      'autoplay': 1,
      'modestbranding': 1,
      'showinfo': 0,
      'rel': 0
    }
  });
  trailer_modal.modal('handleUpdate');
}
