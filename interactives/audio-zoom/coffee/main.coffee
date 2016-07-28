"use strict"
async = require('es6-simple-async')
rangeQuery = require('./rangeQuery.coffee').rangeQuery
PromiseWorker = require('./promiseWorker.coffee')
selectWithin = require('./selectWithin.coffee')

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

relativeTo = (element) -> (event) ->
    ### This returns the [x, y] coordinates of an event relative to
        the given element
    ###
    x = event.pageX - element.getBoundingClientRect().left
    y = event.pageY - element.getBoundingClientRect().top
    return [x, y]

toProportionalCoords = (element) ->
    ### This returns a function that tranforms the given coordinates
        into proportions of the element
    ###
    {width, height} = element.getBoundingClientRect()
    return ([x, y]) ->
        ### The result of this function isn't neccesarily in the range
            [0, 1] as its purely relative to not just within
        ###
        return [x/width, y/height]

toViewBoxCoords = (svgElement) ->
    ### This returns a function that transforms the given proportional
        coordinates to coordinates in the svgElement's viewBox
    ###
    try
        viewBox = svgElement.getAttribute('viewBox').split(',').map(Number)
    catch err
        throw new Error("SVGElement doesn't use the viewBox coordinate system")
    return ([x, y]) ->
        return [x*viewBox[2], y*viewBox[3]]

class Selection
    constructor: (@start=0, @end=null, @dataLength=null) ->
        @end ?= start + 1
        @dataLength ?= @end - @start
        @length = @end - @start
        if @dataLength is 0
            throw new Error('Data must be longer than 0')

    select: (proportionStart=0, proportionEnd=1) ->
        ### This returns a new selection that represents a selection
            of a selection
        ###
        unless proportionStart < proportionEnd
            throw new Error("Start must be lower than end")
        newStart = Math.min @dataLength, Math.max(
            0,
            Math.round(@start + proportionStart*@length)
        )
        newEnd = Math.max 0, Math.min(
            @dataLength,
            Math.round(@start + proportionEnd*@length)
        )
        if newEnd - newStart is 0
            if newEnd is @dataLength
                newStart -= 1
            else
                newEnd += 1

        return new Selection(newStart, newEnd, @dataLength)


class AudioGraph
    maxWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'))
    minWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'))

    constructor: ({@svgElement, @dataLength, @maxQuery, @minQuery}) ->
        @selection = new Selection(0, @dataLength)
        @viewBox = getViewBox(@svgElement)
        @render()

        selectWithin(@svgElement)
        .forEach (select) =>
            highlight = document.createElementNS(
                @svgElement.namespaceURI,
                'polygon'
            )
            highlight.classList.add('select')
            @svgElement.appendChild(highlight)

            proportionalCoords = select
                .map((points) => points.map(toProportionalCoords(@svgElement)))

            proportionalCoords
            .map((points) => points.map(toViewBoxCoords(@svgElement)))
            .forEach ( [[startX], [endX]] ) =>
                points = [
                    [startX, 0]
                    [endX, 0]
                    [endX, @viewBox.height]
                    [startX, @viewBox.height]
                ].map((point) -> point.join(',')).join(' ')

                highlight.setAttribute('points', points)

            proportionalCoords.last().forEach ( [[startX], [endX]] ) =>
                @svgElement.removeChild(highlight)
                @zoom(startX, endX)

        @svgElement.addEventListener 'wheel', (event) =>
            event.preventDefault()
            [x] = toProportionalCoords(@svgElement)(
                relativeTo(@svgElement)(event)
            )
            if event.deltaY < 0
                @zoom(x-0.25, x+0.25)
            else if event.deltaY > 0
                @zoom(-0.5, 1.5)


    clear: ->
        while @svgElement.lastChild
            @svgElement.removeChild(@svgElement.lastChild)

    zoom: (proportionStart=0, proportionEnd=1) ->
        ### Given a proportion to zoom to it zooms into such a selection
            and rerenders
        ###
        @selection = @selection.select(proportionStart, proportionEnd)
        @render()

    render: ->
        @clear()
        maxHeight = Math.max(
            Math.abs(@maxQuery(@selection.start, @selection.end)),
            Math.abs(@minQuery(@selection.start, @selection.end))
        )
        sectionWidth = @selection.length / @viewBox.width
        lines = for idx in [0...@viewBox.width]
            rangeMax = Math.max 0, @maxQuery(
                @selection.start + Math.floor(sectionWidth*idx),
                @selection.start + Math.ceil(sectionWidth*(idx+1))
            )
            rangeMin = Math.min 0, @minQuery(
                @selection.start + Math.floor(sectionWidth*idx),
                @selection.start + Math.ceil(sectionWidth*(idx+1))
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
        loadingBar = new LoadingBar(svgElement)

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
        loadingBar.dispose()
        # And finally return the AudioGraph with the queries
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
