$(document).ready(function(){
    $("#close-window-yes-button").click(function(){
        var body = $( "body" );
        body.empty();
        body.addClass('text-center');
        body.append('<h1>' + gettext('Why did you do that?!') + '</h1>');
        body.append('<button onclick="location.reload();" class="btn btn-primary btn-lg">' + gettext('Refresh the page') + '</button>');
    });
});
