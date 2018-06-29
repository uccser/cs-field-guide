$(document).ready(function() {
  $('#interactive-packet-attack-level-creator-create').on('click', function(){
    var url = $('#interactive-packet-attack-level-creator-link').attr('href');
    if ($('#interactive-packet-attack-level-creator-shields').prop('checked')) {
        url += "?shields=true&";
    } else {
        url += "?shields=false&";
    }
    if ($('#interactive-packet-attack-level-creator-numbers').prop('checked')) {
        url += "numbers=true&";
    } else {
        url += "numbers=false&";
    }
    if ($('#interactive-packet-attack-level-creator-timeouts').prop('checked')) {
        url += "timeouts=true&";
    } else {
        url += "timeouts=false&";
    }
    if ($('#interactive-packet-attack-level-creator-acksnacks').prop('checked')) {
        url += "acksnacks=true&";
    } else {
        url += "acksnacks=false&";
    }
    var stuns = $('#interactive-packet-attack-level-creator-stuns').val()
    if ($.isNumeric(stuns)) {
        url += "stuns=" + stuns + "&";
    } else {
        url += "stuns=0&";
    }
    var corrupts = $('#interactive-packet-attack-level-creator-corrupts').val()
    if ($.isNumeric(corrupts)) {
        url += "corrupts=" + corrupts + "&";
    } else {
        url += "corrupts=0&";
    }
    var kills = $('#interactive-packet-attack-level-creator-kills').val()
    if ($.isNumeric(kills)) {
        url += "kills=" + kills;
    } else {
        url += "kills=0";
    }

    window.open(url, '_blank'); //Attempt to open URL in a new tab.
  });
});
