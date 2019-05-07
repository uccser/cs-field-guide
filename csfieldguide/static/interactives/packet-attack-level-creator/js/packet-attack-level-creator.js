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

        if (message.length > 16) {
            alert(gettext('Your message cannot be longer than 16 characters'));
            return;
        }
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
        $('#shields-false').addClass('d-none');
        SHIELDS = true;
        $('#shields-true').removeClass('d-none');
    });

    $('#shields-true').on('click', function() {
        $('#shields-true').addClass('d-none');
        SHIELDS = false;
        $('#shields-false').removeClass('d-none');
    });

    $('#numbers-false').on('click', function() {
        $('#numbers-false').addClass('d-none');
        NUMBERS = true;
        $('#numbers-true').removeClass('d-none');
    });

    $('#numbers-true').on('click', function() {
        $('#numbers-true').addClass('d-none');
        NUMBERS = false;
        $('#numbers-false').removeClass('d-none');
    });

    $('#replies-false').on('click', function() {
        $('#replies-false').addClass('d-none');
        REPLIES = true;
        $('#replies-true').removeClass('d-none');
    });

    $('#replies-true').on('click', function() {
        $('#replies-true').addClass('d-none');
        REPLIES = false;
        $('#replies-false').removeClass('d-none');
    });

    $('#timeouts-false').on('click', function() {
        $('#timeouts-false').addClass('d-none');
        TIMEOUTS = true;
        $('#timeouts-true').removeClass('d-none');
    });

    $('#timeouts-true').on('click', function() {
        $('#timeouts-true').addClass('d-none');
        TIMEOUTS = false;
        $('#timeouts-false').removeClass('d-none');
    });
});
