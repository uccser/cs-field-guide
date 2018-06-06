$(document).ready(function(){
    $("#close-window-yes-button").click(function(){
        var body = $( "body" );
        body.empty();
        body.addClass('text-center');
        body.append('<h1>' + close_window_i18n["feedback"] + '</h1>');
        body.append('<button onclick="location.reload();" class="btn btn-primary btn-lg">' + close_window_i18n["refresh"] + '</button>');
    });
});
