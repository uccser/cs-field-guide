$(document).ready(function(){
    $("#close-window-yes-button").click(function(){
        var body = $( "body" );
        body.empty();
        body.addClass('text-center');
        body.append('<h1>Why did you do that!</h1>');
        body.append('<button type="button" class="button large radius" onclick="location.reload();">Refresh the page</button>');
    });
});
