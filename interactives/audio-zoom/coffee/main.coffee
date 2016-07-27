"use strict"
async = require('es6-simple-async')
rangeQuery = require('./rangeQuery.coffee').rangeQuery
work = require('webworkify')
PromiseWorker = require('./promiseWorker.coffee')
Rx = require('rxjs')


toAudioBuffer = (arrayBuffer) ->
    ### This converts an ArrayBuffer into an AudioBuffer returning a Promise
        containing the AudioBuffer
    ###
    audioCtx = new OfflineAudioContext(2,44100*1,44100)
    return audioCtx.decodeAudioData(arrayBuffer)


max = (a=NaN, b=NaN) ->
    ### For NaN we'll ignore it and return the real max ###
    if isNaN(b)
        return a
    else if a > b
        return a
    else
        return b

min = (a=NaN, b=NaN) ->
    if isNaN(b)
        return a
    else if a < b
        return a
    else
        return b

getViewBox = (svgElement) ->
    ### This extracts the viewBox of an svg node ###
    viewBox = svgElement
        .getAttribute('viewBox')
        .split(',')
        .map(Number)

    return {
        minX: viewBox[0]
        minY: viewBox[1]
        width: viewBox[2]
        height: viewBox[3]
    }

class LoadingBar
    width: 0.05
    constructor: (@svgElement) ->
        ### This creates a loading bar on a given svg element ###
        @svgNS = @svgElement.getAttribute('xmlns')
        # Find the dimensions we need to render within
        @viewBox = getViewBox(@svgElement)
        # Create a border around the loading bar
        @createLoadingBorder()
        @update(0)

    createLoadingBorder: ->
        ### This creates a border for the loading bar ###
        @loadingBorder = document.createElementNS(@svgNS, 'rect')

        @loadingBorder.classList.add('loading-border')
        #@loadingBorder.setAttributeNS(null, 'fill-opacity', 0)

        @loadingBorder.setAttributeNS(null, 'x', 0)
        @loadingBorder.setAttributeNS(null, 'width', @viewBox.width)

        @loadingBorder.setAttributeNS(
            null,
            'y',
            @viewBox.height * (0.5 - @width/2)
        )
        @loadingBorder.setAttributeNS(
            null,
            'height',
            @viewBox.height * @width
        )

        @svgElement.appendChild(@loadingBorder)

    update: (proportion) ->
        ### Creates a loading bar of size percent ###
        if @disposed
            return
        if @loadingBar?
            @svgElement.removeChild(@loadingBar)

        @loadingBar = document.createElementNS(@svgNS, 'rect')
        @loadingBar.classList.add('loading-bar')

        @loadingBar.setAttributeNS(null, 'x', 0)
        @loadingBar.setAttributeNS(null, 'width', proportion*@viewBox.width)

        @loadingBar.setAttributeNS(
            null,
            'y',
            @viewBox.height * (0.5 - @width/2)
        )
        @loadingBar.setAttributeNS(
            null,
            'height',
            @viewBox.height * @width
        )

        @svgElement.appendChild(@loadingBar)

    dispose: ->
        ### Removes the loading bar from the svg element ###
        @disposed = true
        @svgElement.removeChild(@loadingBorder)
        @svgElement.removeChild(@loadingBar)



class AudioGraph
    maxWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'))
    minWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'))

    constructor: ({@svgElement, @dataLength, @maxQuery, @minQuery}) ->
        @viewBox = getViewBox(@svgElement)
        @renderRange(0, @dataLength)

    clear: ->
        while @svgElement.lastChild
            @svgElement.removeChild(@svgElement.lastChild)

    renderRange: (lower=0, upper=@dataLength) ->
        @clear()
        maxHeight = Math.max(
            Math.abs(@maxQuery(lower, upper)),
            Math.abs(@minQuery(lower, upper))
        )
        sectionWidth = (upper - lower) / @viewBox.width
        lines = for idx in [0...@viewBox.width]
            rangeMax = Math.max 0, @maxQuery(
                lower + Math.floor(sectionWidth*idx),
                lower + Math.ceil(sectionWidth*(idx+1))
            )
            rangeMin = Math.min 0, @minQuery(
                lower + Math.floor(sectionWidth*idx),
                lower + Math.ceil(sectionWidth*(idx+1))
            )

            svgLine = document.createElementNS(@svgElement.namespaceURI,"line")

            svgLine.setAttributeNS(null, "class", "wave-line")

            svgLine.setAttributeNS(null, "x1", idx)
            svgLine.setAttributeNS(null, "x2", idx)

            _max = (@viewBox.height/2)*rangeMin/maxHeight + (@viewBox.height/2)
            svgLine.setAttributeNS(null, "y1", _max)

            _min = (@viewBox.height/2)*rangeMax/maxHeight + (@viewBox.height/2)
            svgLine.setAttributeNS(null, "y2", _min)
            @svgElement.appendChild(svgLine)

        svgLine = document.createElementNS(@svgElement.namespaceURI, "line")
        svgLine.setAttributeNS(null, "style", "stroke:red;stroke-width:1")
        svgLine.setAttributeNS(null, "x1", 0)
        svgLine.setAttributeNS(null, "x2", @viewBox.height)
        svgLine.setAttributeNS(null, "y1", @viewBox.height/2)
        svgLine.setAttributeNS(null, "y2", @viewBox.height/2)
        @svgElement.appendChild(svgLine)

    @fromChannelData: async (svgElement, channelData) ->
        ### This creates an Audio Graph from the given channel data ###
        dataLength = channelData.length
        maxTree = maxWorker.postMessage {
            channelData: channelData
            functionString: max.toString()
        }
        minTree = minWorker.postMessage {
            channelData: channelData
            functionString: min.toString()
        }
        lastMinProgress = 0
        lastMaxProgress = 0

        loadingBar = new LoadingBar(svgElement)

        maxTree.progressed (progress) ->
            lastMaxProgress = progress
            loadingBar.update((lastMinProgress + lastMaxProgress)/2)
            document.querySelector('#progress').innerHTML = "#{progress*100} %"
        minTree.progressed (progress) ->
            lastMinProgress = progress
            loadingBar.update((lastMinProgress + lastMaxProgress)/2)
            document.querySelector('#progress').innerHTML = "#{progress*100} %"
        [minTree, maxTree] = yield Promise.all [
            minTree
            maxTree
        ]
        loadingBar.dispose()
        window.maxTree = maxTree
        window.minTree = minTree
        return new AudioGraph {
            svgElement: svgElement
            dataLength: channelData.length
            maxQuery: rangeQuery(maxTree, max)
            minQuery: rangeQuery(minTree, min)
        }



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
    channelData = audioData.getChannelData(0)#[790000...800000]
    window.channelData = channelData
    $status.innerHTML = 'preprocessing'

    window.graph = yield AudioGraph.fromChannelData(
        document.querySelector('svg'),
        channelData
    )

    $status.innerHTML = 'done and done'

window.async = async
