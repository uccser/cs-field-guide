/**
 * Packet Attack Level Creator
 */

 var SHIELDS = false;
 var NUMBERS = false;
 var REPLIES = false;
 var TIMEOUTS = false;

$(document).ready(function() {
    $('#submit').on('click', function() {
        var url = base + '?start=custom';

        var message = $('#message-input').val();
        var delays = parseInt($('#delays-input').val());
        var corrupts = parseInt($('#corrupts-input').val());
        var kills = parseInt($('#kills-input').val());

        if (message.length > 0) {
            url += '&message=' + message;
        }

        if (!isNaN(delays)) {
            url += '&delays=' + delays;
        }
        if (!isNaN(corrupts)) {
            url += '&corrupts=' + corrupts;
        }
        if (!isNaN(kills)) {
            url += '&kills=' + kills;
        }

        url += '&shields=' + (SHIELDS ? 'true' : 'false');
        url += '&numbers=' + (NUMBERS ? 'true' : 'false');
        url += '&acksnacks=' + (REPLIES ? 'true' : 'false');
        url += '&timeouts=' + (TIMEOUTS ? 'true' : 'false');

        window.open(url, '_blank'); //Attempt to open URL in a new tab.
    });

    $('#shields-false').on('click', function() {
        $('#shields-false').addClass('hidden');
        SHIELDS = true;
        $('#shields-true').removeClass('hidden');
    });

    $('#shields-true').on('click', function() {
        $('#shields-true').addClass('hidden');
        SHIELDS = false;
        $('#shields-false').removeClass('hidden');
    });

    $('#numbers-false').on('click', function() {
        $('#numbers-false').addClass('hidden');
        NUMBERS = true;
        $('#numbers-true').removeClass('hidden');
    });

    $('#numbers-true').on('click', function() {
        $('#numbers-true').addClass('hidden');
        NUMBERS = false;
        $('#numbers-false').removeClass('hidden');
    });

    $('#replies-false').on('click', function() {
        $('#replies-false').addClass('hidden');
        REPLIES = true;
        $('#replies-true').removeClass('hidden');
    });

    $('#replies-true').on('click', function() {
        $('#replies-true').addClass('hidden');
        REPLIES = false;
        $('#replies-false').removeClass('hidden');
    });

    $('#timeouts-false').on('click', function() {
        $('#timeouts-false').addClass('hidden');
        TIMEOUTS = true;
        $('#timeouts-true').removeClass('hidden');
    });

    $('#timeouts-true').on('click', function() {
        $('#timeouts-true').addClass('hidden');
        TIMEOUTS = false;
        $('#timeouts-false').removeClass('hidden');
    });
});
