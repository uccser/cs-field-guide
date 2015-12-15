"use strict"
CryptoJS = require('crypto-js')

$("#interactive-sha2-button").click ->
    # Hopefully the logic is self-explanatory
    text = $("#interactive-sha2-plaintext").val()
    # Base64 is entirely renderable characters (unlike ASCII or UNICODE))
    hash = CryptoJS.SHA256(text).toString(CryptoJS.enc.Base64)
    $("#interactive-sha2-hash").html(hash)
