"use strict"
async = require('es6-simple-async')
AudioGraph = require('./audioGraph.coffee')
{Observable} = require('rxjs')

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

readFile = (file) ->
    return new Promise (resolve) ->
        reader = new FileReader()
        reader.onload = ->
            resolve(reader.result)
        reader.readAsArrayBuffer(file)

resizeEvents = new Observable (observer) ->
    onresize = (resize) ->
        observer.next(resize)
    window.addEventListener('resize', onresize)
    return ->
        window.removeEventListener('resize', onresize)

PLAY_SYMBOL = "\u25B6"
STOP_SYMBOL = "\u25A0"


playButton = document.querySelector("#play-button")

setPlayButton = (mode='play') ->
    if mode is 'stop'
        playButton.textContent = STOP_SYMBOL
        playButton.classList.remove('play-button')
        return 'stop'
    else if mode is 'play'
        playButton.textContent = PLAY_SYMBOL
        playButton.classList.add('play-button')
        return 'play'

async.main ->
    current = setPlayButton('play')
    playButton.addEventListener 'click', ->
        graph?.player[current]?()
        if current is 'play'
            current = setPlayButton('stop')
        else
            current = setPlayButton('play')

    resizeEvents.debounceTime(1000/60).subscribe {
        next: ->
            graph?.render()
    }

    loop
        file = yield getFile()
        try
            arrBuff = yield readFile(file)
            audioData = yield toAudioBuffer(arrBuff)
            yield graph?.delete()
        catch
            alert "FileType not supported by your browser, try another file"
            continue
        graph = yield AudioGraph.fromAudioBuffer(
            document.querySelector('#audio-graph'),
            audioData
        )
        yield graph.render()
        current = yield setPlayButton('play')
        window.graph = graph



window.AudioGraph = AudioGraph

window.async = async
