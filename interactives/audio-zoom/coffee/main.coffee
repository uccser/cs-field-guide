"use strict"
async = require('es6-simple-async')
rangeQuery = require('./rangeQuery.coffee')
work = require('webworkify')
PromiseWorker = require('./promiseWorker.coffee')

segmentWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'))

toAudioBuffer = (arrayBuffer) ->
    ### This converts an ArrayBuffer into an AudioBuffer returning a Promise
        containing the AudioBuffer
    ###
    audioCtx = new OfflineAudioContext(2,44100*1,44100)
    return audioCtx.decodeAudioData(arrayBuffer)

VIEWPORT = 1000

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
        chunk = arr[Math.round(currentLocation)...Math.round(nextLocation)]
        if chunk.length isnt 0
            result.push(chunk)
        currentLocation = nextLocation
    return result

max = (a=NaN, b=NaN) ->
    ### For NaN we'll ignore it and return the real max ###
    if isNaN(b)
        a
    else if a > b
        a
    else
        b

class AudioGraph
    constructor: (@svgElement, channelData) ->
        @dataLength = channelData.length
        @maxQuery = rangeQuery(channelData, max)
        @viewbox = if svg.hasAttribute('viewBox')
            svg.getAttribute('viewBox').split(' ')
        else
            svg.set
        lines = for audioPart, idx in audioParts
            max = audioPart.reduce (acc, i) -> return Math.max(acc, i)
            min = audioPart.reduce (acc, i) -> return Math.min(acc, i)

            svgLine = document.createElementNS($image.namespaceURI,"line")

            svgLine.setAttributeNS(null, "class", "wave-line")
            svgLine.setAttributeNS(null, "x1", idx)
            svgLine.setAttributeNS(null, "x2", idx)
            if Math.abs(min) < Math.abs(max)
                svgLine.setAttributeNS(null, "y1", VIEWPORT/2)
                svgLine.setAttributeNS(null, "y2", ((VIEWPORT/2)*max/maxHeight+(VIEWPORT/2))
                )
            else
                svgLine.setAttributeNS(null, "y1", ((VIEWPORT/2)*min/maxHeight+VIEWPORT/2))
                svgLine.setAttributeNS(null, "y2", VIEWPORT/2)

            $image.appendChild(svgLine)
            yield null
        return this

drawLines = async (channelData) ->
    $image = document.querySelector("#audio-image-lines")
    maxHeight = channelData.reduce (acc, i) -> Math.max(acc, Math.abs(i))

    points = for i in [0...channelData.length]
        {
            x: VIEWPORT*i/channelData.length
            y: Math.floor((VIEWPORT/2)*channelData[i]/maxHeight + VIEWPORT/2)
        }
    str = points
        .map ({x, y}) -> "#{x},#{y}"
        .join(' ')


    yield $("#graph").attr('points', str)

    svgLine = document.createElementNS($image.namespaceURI, "line")
    svgLine.setAttributeNS(null, "style", "stroke:red;stroke-width:1")
    svgLine.setAttributeNS(null, "x1", 0)
    svgLine.setAttributeNS(null, "x2", VIEWPORT)
    svgLine.setAttributeNS(null, "y1", VIEWPORT/2)
    svgLine.setAttributeNS(null, "y2", VIEWPORT/2)
    $image.appendChild(svgLine)

drawBars = async (channelData) ->
    $image = document.querySelector('#audio-image-bars')
    maxHeight = channelData.reduce (acc, i) -> Math.max(acc, Math.abs(i))
    audioParts = yield split(channelData, VIEWPORT)

    svgLine = document.createElementNS($image.namespaceURI, "line")
    svgLine.setAttributeNS(null, "style", "stroke:red;stroke-width:1")
    svgLine.setAttributeNS(null, "x1", 0)
    svgLine.setAttributeNS(null, "x2", VIEWPORT)
    svgLine.setAttributeNS(null, "y1", VIEWPORT/2)
    svgLine.setAttributeNS(null, "y2", VIEWPORT/2)
    $image.appendChild(svgLine)

    lines = for audioPart, idx in audioParts
        max = audioPart.reduce (acc, i) -> return Math.max(acc, i)
        min = audioPart.reduce (acc, i) -> return Math.min(acc, i)

        svgLine = document.createElementNS($image.namespaceURI,"line")

        svgLine.setAttributeNS(null, "class", "wave-line")
        svgLine.setAttributeNS(null, "x1", idx)
        svgLine.setAttributeNS(null, "x2", idx)
        if Math.abs(min) < Math.abs(max)
            svgLine.setAttributeNS(null, "y1", VIEWPORT/2)
            svgLine.setAttributeNS(null, "y2", ((VIEWPORT/2)*max/maxHeight+(VIEWPORT/2))
            )
        else
            svgLine.setAttributeNS(null, "y1", ((VIEWPORT/2)*min/maxHeight+VIEWPORT/2))
            svgLine.setAttributeNS(null, "y2", VIEWPORT/2)

        $image.appendChild(svgLine)
        yield null

drawDense = async (channelData) ->
    $image = document.querySelector('#audio-image')
    maxHeight = channelData.reduce (acc, i) -> Math.max(acc, Math.abs(i))
    audioParts = yield split(channelData, VIEWPORT)

    lines = for audioPart, idx in audioParts
        max = Math.max 0, audioPart.reduce((acc, i) -> return Math.max(acc, i))
        min = Math.min 0, audioPart.reduce((acc, i) -> return Math.min(acc, i))

        svgLine = document.createElementNS($image.namespaceURI,"line")

        svgLine.setAttributeNS(null, "class", "wave-line")
        svgLine.setAttributeNS(null, "x1", idx)
        svgLine.setAttributeNS(null, "x2", idx)
        svgLine.setAttributeNS(null, "y1", ((VIEWPORT/2)*min/maxHeight+(VIEWPORT/2)))
        svgLine.setAttributeNS(null, "y2", ((VIEWPORT/2)*max/maxHeight+(VIEWPORT/2)))
        $image.appendChild(svgLine)
        yield null

    svgLine = document.createElementNS($image.namespaceURI, "line")
    svgLine.setAttributeNS(null, "style", "stroke:red;stroke-width:1")
    svgLine.setAttributeNS(null, "x1", 0)
    svgLine.setAttributeNS(null, "x2", VIEWPORT)
    svgLine.setAttributeNS(null, "y1", (VIEWPORT/2))
    svgLine.setAttributeNS(null, "y2", (VIEWPORT/2))
    $image.appendChild(svgLine)


async.main ->
    $audio = document.querySelector('#audio3')
    $status = document.querySelector('#status')
    $status.innerHTML = 'fetching...'
    res = yield fetch($audio.getAttribute('src'))
    arrBuff = yield res.arrayBuffer()
    $status.innerHTML = 'converting...'
    audioData = yield toAudioBuffer(arrBuff)
    yield null
    $status.innerHTML = 'scanning points...'
    channelData = audioData.getChannelData(0)#[700000...800000]
    window.channelData = channelData
    $status.innerHTML = 'creating lines'
    try
        yield Promise.all [
            #drawDense(channelData)
            #drawBars(channelData)
            #drawLines(channelData)
        ]
        $status.innerHTML = 'done and done'
        return 2
    catch err
        $status.innerHTML = "failed with #{err}"

window.async = async
