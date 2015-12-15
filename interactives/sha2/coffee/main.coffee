"use strict"
CryptoJS = require('crypto-js')

$("#interactive-sha2-button").click ->
    text = $("#interactive-sha2-plaintext").val()
    hash = CryptoJS.SHA256(text).toString(CryptoJS.enc.Base64)
    $("#interactive-sha2-hash").html(hash)
