#!/usr/bin/env coffee
"use strict"
async = require('es6-simple-async')
Selection = require('./selection.coffee')
Graph = require('./boundedGraph.coffee').Graph
getViewBox = require('./getViewBox.coffee')
PromiseWorker = require('./promiseWorker.coffee')
LoadingBar = require('./loadingBar.coffee')
rangeQuery = require('./rangeQuery.coffee').rangeQuery
selectWithin = require('./selectWithin.coffee')
relativeTo = require('./relativeTo.coffee')

audioContext = new AudioContext()

Function::getter = (prop, get) ->
    Object.defineProperty @prototype, prop, {get, configurable: yes}

Function::setter = (prop, set) ->
    Object.defineProperty @prototype, prop, {set, configurable: yes}

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

VALUE_PRECISION = 5
TIME_PRECISION = 5

toProportionalCoords = (element) ->
    ### This returns a function that tranforms the given coordinates
        into proportions of the element
    ###
    {width, height} = element.getBoundingClientRect()
    return ({x, y, event}) ->
        ### The result of this function isn't neccesarily in the range
            [0, 1] as its purely relative to not just within
        ###
        return {
            x: x/width
            y: y/height
        }

toViewBoxCoords = (svgElement) ->
    ### This returns a function that transforms the given proportional
        coordinates to coordinates in the svgElement's viewBox
    ###
    try
        viewBox = svgElement.getAttribute('viewBox').split(',').map(Number)
    catch err
        throw new Error("SVGElement doesn't use the viewBox coordinate system")
    return ({x, y, event}) ->
        return {
            x: x*viewBox[2]
            y: y*viewBox[3]
            event: event
        }

sections = (selection, slices=1) ->
    ### This returns an array of sections where each section describes
        the start and end for each sub selection of size slices
        the resulting array will always be of smaller or equal length
        to the number of slices
    ###
    result = []
    if selection.length > slices
        for i in [0...slices]
            result.push {
                selection: selection.selectProportion(i/slices, (i+1)/slices)
                start: i / slices
                end: (i + 1) / slices
            }
    else
        length = selection.length
        for i in [0...length]
            result.push {
                selection: selection.selectRange(i, i+1)
                start: Math.floor(slices * i/length) / slices
                end: Math.floor(slices * (i+1)/length) / slices
            }

    return result



class Player
    constructor: (audioBuffer) ->
        # We need to store the buffer that we'll render
        @audioBuffer = audioBuffer
        @audioLength = @audioBuffer.length / audioContext.sampleRate

        @onprogress = null
        @source = null

    @getter 'currentPosition', ->
        # This returns the current position through the track
        unless @source?
            return 0
        return audioContext.currentTime / @audioLength

    play: ->
        # This starts playback and
        # sends progress events to the onprogress/onended event handlers
        @stop()
        @source = audioContext.createBufferSource()
        @source.connect(audioContext.destination)
        @source.buffer = @audioBuffer
        @source.start(0)
        # Begun at currentTime
        start = audioContext.currentTime
        progress = =>
            # Work out the current progress through the track as a proportion
            currentProportion = (audioContext.currentTime-start)/@audioLength
            # Send it to onProgress
            if currentProportion > 1
                # and stop if we're done
                @onprogress?(1)
                @onended?()
                return @stop()
            else
                @onprogress?(currentProportion)

            if @source?
                # Only progress if there's still animationFrames
                requestAnimationFrame(progress)

        requestAnimationFrame(progress)

    stop: ->
        @source?.stop?()
        @source = null

class AudioGraph
    maxWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'))
    minWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'))

    constructor: (opts) ->
        @parent = opts.parent
        @audioBuffer = opts.audioBuffer
        @dataLength = opts.dataLength
        @maxQuery   = opts.maxQuery
        @minQuery   = opts.minQuery
        @selection = new Selection(0, @dataLength)
        @slices = 1000

        @graph = new Graph {
            parent: @parent
        }

        @player = new Player(opts.audioBuffer)
        @playbackPosition = null
        @player.onprogress = (proportion) =>
            @_highlightPlaybackPosition(proportion)

    _highlightPlaybackPosition: (proportion) ->
        if @playbackPosition? and
        (0 <= @selection.proportionWithin(@playbackPosition) < 1)
            proportionWithin = @selection.proportionWithin(@playbackPosition)
            barNum = proportionWithin * @graph.barView.bars.length // 1
            @graph.barView.bars[barNum].classList.remove('playback-position')

        proportionWithin = @selection.proportionWithin(proportion)
        if 0 <= proportionWithin < 1
            barNum = proportionWithin * @graph.barView.bars.length // 1
            @graph.barView.bars[barNum].classList.add('playback-position')
        @playbackPosition = proportion

    delete: async ->
        yield @player.stop()
        yield @graph.delete()

    zoom: async (proportionStart=0, proportionEnd=1) ->
        ### Given a proportion to zoom to it zooms into such a selection
            and rerenders
        ###
        @selection = @selection.selectProportion(proportionStart, proportionEnd)
        yield @render()

    render: async ->
        @graph.clear()
        data = sections(@selection, @slices)
            .map ({selection, start, end}) =>
                # Transform each element of data to be used by
                # the Graph renderer
                labelCssClasses = ['audio-bar-label']
                lower = @minQuery(selection.start, selection.end)
                upper = @maxQuery(selection.start, selection.end)
                return {
                    start
                    end
                    lower: Math.min(lower, 0)
                    upper: Math.max(upper, 0)
                    cssClasses: ['audio-bar']
                    label:
                        # Ensure a bit of padding around the text
                        barPadding: 20
                        text: if lower is 0
                            upper.toFixed(VALUE_PRECISION)
                        else
                            lower.toFixed(VALUE_PRECISION)
                        cssClasses: labelCssClasses
                        position: if upper > 0
                            'top'
                        else
                            'bottom'

                }

        minValue = @minQuery(@selection.start, @selection.end)
        maxValue = @maxQuery(@selection.start, @selection.end)
        startTime = @selection.start / audioContext.sampleRate
        endTime = @selection.end / audioContext.sampleRate
        yield @graph.renderData(data, {
            renderLabels: (@selection.length <= 100)
            axis:
                x:
                    left: "#{startTime.toFixed(TIME_PRECISION)}s"
                    right: "#{endTime.toFixed(TIME_PRECISION)}s"
                y:
                    top: Math.max(0, maxValue).toFixed(VALUE_PRECISION)
                    bottom: Math.min(0, minValue).toFixed(VALUE_PRECISION)
        })

        selectWithin(@graph.barView.svgElement, @graph.barView.background)
        .forEach (select) =>
            highlight = document.createElementNS(
                @graph.barView.svgElement.namespaceURI,
                'polygon'
            )
            highlight.classList.add('select')
            @graph.barView.svgElement.appendChild(highlight)


            select.forEach ( [{x: startX}, {x: endX}] ) =>
                points = [
                    [startX, 0]
                    [endX, 0]
                    [endX, @graph.barView.viewBox.height]
                    [startX, @graph.barView.viewBox.height]
                ].map((point) -> point.join(',')).join(' ')
                highlight.setAttribute('points', points)

            select.takeLast(1)
            .forEach ( [{x: startX}, {x: endX}] ) =>
                if startX > endX
                    [startX, endX] = [endX, startX]
                startXProportional = startX / @graph.barView.viewBox.width
                endXProportional = endX / @graph.barView.viewBox.width
                @graph.barView.svgElement.removeChild(highlight)
                @zoom(startXProportional, endXProportional)

        @graph.barView.svgElement.addEventListener 'wheel', (event) =>
            event.preventDefault()
            {x} = toProportionalCoords(@graph.barView.background)(
                relativeTo(@graph.barView.svgElement, event, false)
            )
            if event.deltaY < 0
                @zoom(x-0.25, x+0.25)
            else if event.deltaY > 0
                @zoom(-0.5, 1.5)

    @fromAudioBuffer: async (parent, audioBuffer) ->
        ### This creates an Audio Graph from the given channel data ###
        channelData = audioBuffer.getChannelData(0)
        dataLength = channelData.length
        # create two query trees, one for querying max and one for querying min
        maxTree = maxWorker.postMessage {
            channelData: channelData
            functionString: max.toString()
        }
        minTree = minWorker.postMessage {
            channelData: channelData
            functionString: min.toString()
        }

        # set up a loading bar and progress whenever the tree workers send
        # progress updates
        lastMinProgress = 0
        lastMaxProgress = 0
        loadingBar = new LoadingBar(parent)

        maxTree.progressed (progress) ->
            lastMaxProgress = progress
            loadingBar.update((lastMinProgress + lastMaxProgress)/2)
        minTree.progressed (progress) ->
            lastMinProgress = progress
            loadingBar.update((lastMinProgress + lastMaxProgress)/2)

        # when they're done preprocessing the channelData dispose of the
        # loading bar
        [minTree, maxTree] = yield Promise.all [
            minTree
            maxTree
        ]
        yield loadingBar.dispose()
        # And finally return the AudioGraph with the queries
        return new AudioGraph {
            parent: parent
            dataLength: channelData.length
            audioBuffer: audioBuffer
            maxQuery: rangeQuery(maxTree, max)
            minQuery: rangeQuery(minTree, min)
        }

module.exports = AudioGraph
