/**
 * MD5-Hash generator
 * For use in the CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */


$(document).ready(function () {
    $("#interactive-md5hash-hash").click(function(){
        var text = $('#interactive-md5hash-text-input').val();
        var hashed_message = CryptoJS.MD5(text).toString();
        document.getElementById('interactive-md5hash-hashed-message').innerHTML = hashed_message;
    });
});

