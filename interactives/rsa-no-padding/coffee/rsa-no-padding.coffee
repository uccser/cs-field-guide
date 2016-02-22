RSAEncrypt = {}

$(document).ready ->
    if getUrlParameter('mode') is 'decrypt'
        setDecryptionText()
        RSAEncrypt.mode = 'decrypt'
    else
        RSAEncrypt.mode = 'encrypt'

    $("#interactive-rsa-no-padding-process").click ->
        input_key = $('#interactive-rsa-no-padding-key').val()
        input_text = $('#interactive-rsa-no-padding-input-text').val()
        ## Encrypting
        if (RSAEncrypt.mode is 'encrypt')
            console.log(input_key)
            ## Decrypting
        else
            console.log(input_key)
            ## Set output text box
        $('#interactive-rsa-no-padding-output-text').val('Enter value here')

setDecryptionText = ->
    $('#interactive-rsa-no-padding-mode').text('Decrypter')
    $('#interactive-rsa-no-padding-process').text('Decrypt')
    $('#interactive-rsa-no-padding-input-type').text('Cipher')
    $('#interactive-rsa-no-padding-output-type').text('Plain')

## From jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
getUrlParameter = (sParam) ->
    sPageURL = decodeURIComponent(window.location.search.substring(1))
    sURLVariables = sPageURL.split('&')

    for i in [0...sURLVariables.length]
        sParameterName = sURLVariables[i].split('=')

        if sParameterName[0] is sParam
            return unless sParameterName[1]? then true else sParameterName[1]
