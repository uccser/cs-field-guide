"use strict"
async = require('es6-simple-async')

toAudioBuffer = (arrayBuffer) ->
    ### This converts an ArrayBuffer into an AudioBuffer returning a Promise
        containing the AudioBuffer
    ###
    audioCtx = new OfflineAudioContext(2,44100*1,44100)
    return audioCtx.decodeAudioData(arrayBuffer)

SCALE = 30

split = (arr, chunks=2) ->
    ### Splits an array into given number of chunks, the final chunk may
        be smaller than the rest, if chunks > array.length then we'll throw
        an error
    ###
    if chunks > arr.length
        throw new Error("Can't split arr with length #{arr.length} into
                         #{chunks} chunks")
    result = []

    currentLocation = 0
    change = arr.length/chunks
    while currentLocation < arr.length
        nextLocation = currentLocation + change
        result.push arr[Math.round(currentLocation)...Math.round(nextLocation)]
        currentLocation = nextLocation
    return result

wait = (time) ->
    return new Promise (resolve) ->
        setTimeout(resolve, time)

async.main ->
    $audio = document.querySelector('#audio3')
    $status = document.querySelector('#status')
    $image = document.querySelector('#img')
    $status.innerHTML = 'fetching...'
    res = yield fetch($audio.getAttribute('src'))
    arrBuff = yield res.arrayBuffer()
    $status.innerHTML = 'converting...'
    audioData = yield toAudioBuffer(arrBuff)

    $status.innerHTML = 'scanning points...'
    channelData = audioData.getChannelData(0)

    maxHeight = channelData.reduce (acc, i) -> Math.max(acc, Math.abs(i))

    $status.innerHTML = 'creating lines'

    window.audioParts = yield split(channelData, 1000)

    lines = for audioPart, idx in audioParts
        max = audioPart.reduce (acc, i) -> return Math.max(acc, i)
        min = audioPart.reduce (acc, i) -> return Math.min(acc, i)

        svgLine = document.createElementNS($image.namespaceURI,"line")

        svgLine.setAttributeNS(null, "class", "wave-line")
        svgLine.setAttributeNS(null, "x1", idx)
        svgLine.setAttributeNS(null, "x2", idx)
        svgLine.setAttributeNS(null, "y1", (500*min/maxHeight+500))
        svgLine.setAttributeNS(null, "y2", (500*max/maxHeight+500))
        $image.appendChild(svgLine)
        yield undefined

    svgLine = document.createElementNS($image.namespaceURI, "line")
    svgLine.setAttributeNS(null, "style", "stroke:red;stroke-width:1")
    svgLine.setAttributeNS(null, "x1", 0)
    svgLine.setAttributeNS(null, "x2", 1000)
    svgLine.setAttributeNS(null, "y1", 500)
    svgLine.setAttributeNS(null, "y2", 500)
    $image.appendChild(svgLine)

    $status.innerHTML = 'done and done'
    return 2
