"use strict"
async = require('es6-simple-async')
AudioGraph = require('./audioGraph.coffee')

toAudioBuffer = (arrayBuffer) ->
    ### This converts an ArrayBuffer into an AudioBuffer returning a Promise
        containing the AudioBuffer
    ###
    audioCtx = new OfflineAudioContext(2,44100*1,44100)
    return audioCtx.decodeAudioData(arrayBuffer)

getFile = ->
    ### Retrieves the user's input file ###
    return new Promise (resolve) ->
        $fileInput = document.querySelector("#audio-file")
        $fileInput.onchange = ->
            resolve($fileInput.files[0])
            delete $fileInput.onchange



async.main ->
    loop
        file = yield getFile()
        while file is undefined
            file = yield getFile()
        $status = document.querySelector('#status')
        $status.innerHTML = 'fetching...'
        arrBuff = yield res.arrayBuffer()
        $status.innerHTML = 'converting...'
        audioData = yield toAudioBuffer(arrBuff)
        $status.innerHTML = 'scanning points...'
        channelData = audioData.getChannelData(0)#[790000...800000]
        window.channelData = channelData
        $status.innerHTML = 'preprocessing'

        window.graph = yield AudioGraph.fromChannelData(
            document.querySelector('svg'),
            channelData
        )
        yield graph.render()

        $status.innerHTML = 'done and done'

window.AudioGraph = AudioGraph

window.async = async
