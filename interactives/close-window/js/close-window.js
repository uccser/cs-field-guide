$(document).ready(function(){
    $("#close-window-yes-button").click(function(){
        var body = $( "body" );
        body.empty();
        body.addClass('center-align');
        body.append('<h1>Why did you do that?!</h1>');
        body.append('<a onclick="location.reload();" class="waves-effect waves-light btn btn-large">Refresh the page</a>');
    });
});
