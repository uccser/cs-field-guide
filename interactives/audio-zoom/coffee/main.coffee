"use strict"
async = require('es6-simple-async')

toAudioBuffer = async (arrayBuffer) ->
    ### This converts an ArrayBuffer into an AudioBuffer returning a Promise
        containing the AudioBuffer
    ###
    audioCtx = new OfflineAudioContext(2,44100*1,44100)
    return yield audioCtx.decodeAudioData(arrayBuffer)



async.main ->
    $audio = document.querySelector('#audio')
    $status = document.querySelector('#status')

    $status.innerHTML = 'fetching...'
    res = yield fetch($audio.getAttribute('src'))
    arrBuff = yield res.arrayBuffer()
    $status.innerHTML = 'converting...'
    audioData = yield toAudioBuffer(arrBuff)
    window.$audioData = audioData

    $status.innerHTML = 'finding points...'
    channelData = audioData.getChannelData(0)
    maxHeight = channelData[...500000].reduce (acc, b) ->
        if acc > b then acc else b

    $status.innerHTML = 'processing points...'
    points = for i in [0...500000]
        {
            x: i/500
            y: Math.floor(500*channelData[i]/maxHeight + 500)
        }
    $status.innerHTML = 'drawing points...'
    str = points
        .map ({x, y}) -> "#{x},#{y}"
        .join(' ')


    $("#graph").attr('points', str)
    $status.innerHTML = 'done'
