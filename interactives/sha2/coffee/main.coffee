"use strict"
SHA256 = require('crypto-js/sha256')
Hex = require('crypto-js/enc-hex')

$("#interactive-sha2-button").click ->
    # Hopefully the logic is self-explanatory
    text = $("#interactive-sha2-plaintext").val()
    # Base64 is entirely renderable characters (unlike ASCII or UNICODE))
    hash = SHA256(text).toString(Hex)
    $("#interactive-sha2-hash").html(hash)
