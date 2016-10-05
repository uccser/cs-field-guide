#!/usr/bin/env coffee
"use strict"
async = require('es6-simple-async')
Selection = require('./selection.coffee')
RangeBarGraph = require('./boundedGraph.coffee').RangeBarGraph
getViewBox = require('./getViewBox.coffee')
PromiseWorker = require('./promiseWorker.coffee')
LoadingBar = require('./loadingBar.coffee')
rangeQuery = require('./rangeQuery.coffee').rangeQuery
selectWithin = require('./selectWithin.coffee')

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

relativeTo = (element) -> (event) ->
    ### This returns the [x, y] coordinates of an event relative to
        the given element
    ###
    x = event.pageX - element.getBoundingClientRect().left
    y = event.pageY - element.getBoundingClientRect().top
    return {
        x
        y
        event
    }

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
        the start and end slice for each sub selection of size slices
        the resulting array will always be of smaller or equal length
        to the number of slices
    ###
    result = []
    if selection.length > slices
        for i in [0...slices]
            result.push {
                selection: selection.selectProportion(i/slices, (i+1)/slices)
                startSlice: i
                endSlice: i + 1
            }
    else
        length = selection.length
        for i in [0...length]
            result.push {
                selection: selection.selectRange(i, i+1)
                startSlice: Math.floor(slices * i/length)
                endSlice: Math.floor(slices * (i+1)/length)
            }

    return result

class AudioGraph
    maxWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'))
    minWorker = new PromiseWorker(new Worker('./segmentTreeWorker.js'))

    constructor: (opts) ->
        @svgElement = opts.svgElement
        @dataLength = opts.dataLength
        @maxQuery   = opts.maxQuery
        @minQuery   = opts.minQuery
        @selection = new Selection(0, @dataLength)
        @viewBox = getViewBox(@svgElement)
        @slices = opts.slices ? @viewBox.width

        @graph = new RangeBarGraph {
            parent: @svgElement
            viewBox: @viewBox
        }

        @graph.placeAt {
            x: @viewBox.width*0.1
            y: @viewBox.width*0.1
            width: @viewBox.width*0.8
            height: @viewBox.height*0.8
        }
        selectWithin(@svgElement)
        .forEach (select) =>
            highlight = document.createElementNS(
                @graph.graphElement.namespaceURI,
                'polygon'
            )
            highlight.classList.add('select')
            @graph.graphElement.appendChild(highlight)

            proportionalCoords = select
                .map((points) => points.map(
                    toProportionalCoords(@graph.graphElement)
                ))


            proportionalCoords
            .map((points) => points.map(toViewBoxCoords(@graph.graphElement)))
            .forEach ( [{x: startX}, {x: endX}] ) =>
                points = [
                    [startX, 0]
                    [endX, 0]
                    [endX, @graph.viewBox.height]
                    [startX, @graph.viewBox.height]
                ].map((point) -> point.join(',')).join(' ')

                highlight.setAttribute('points', points)

            proportionalCoords
            .takeLast(1)
            .forEach ( [{x: startX}, {x: endX}] ) =>
                if startX > endX
                    [startX, endX] = [endX, startX]
                @graph.graphElement.removeChild(highlight)
                @zoom(startX, endX)

        @svgElement.addEventListener 'wheel', (event) =>
            event.preventDefault()
            {x} = toProportionalCoords(@graph.graphElement)(
                relativeTo(@graph.graphElement)(event)
            )
            if event.deltaY < 0
                @zoom(x-0.25, x+0.25)
            else if event.deltaY > 0
                @zoom(-0.5, 1.5)


    clear: async ->
        yield @graph.clear()

    zoom: async (proportionStart=0, proportionEnd=1) ->
        ### Given a proportion to zoom to it zooms into such a selection
            and rerenders
        ###
        @selection = @selection.selectProportion(proportionStart, proportionEnd)
        yield @render()

    render: async ->
        @clear()
        data = sections(@selection, @slices)
            .map ({selection, startSlice, endSlice}) =>
                # Transform each element of data to be used by
                # RangeBarGraph
                labelCssClasses = ['audio-bar-label']
                lower = @minQuery(selection.start, selection.end)
                upper = @maxQuery(selection.start, selection.end)
                return {
                    startSlice
                    endSlice
                    lower: Math.min(lower, 0)
                    upper: Math.max(upper, 0)
                    cssClasses: ['audio-bar']
                    label:
                        padding: 5 # Ensure a bit of padding around the text
                        text: if lower is 0
                            upper.toFixed(4)
                        else
                            lower.toFixed(4)
                        cssClasses: labelCssClasses
                        position: if upper > 0
                            'top'
                        else
                            'bottom'
                    axis:
                        value: selection.start

                }
        yield @graph.renderData(data, {
            renderLabels: (@selection.length <= 100)
            axis:
                nibScale: 2/3
                cssClasses: ['axis']
                fontProportion: 0.2
        })


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
        yield loadingBar.dispose()
        # And finally return the AudioGraph with the queries
        return new AudioGraph {
            svgElement: svgElement
            dataLength: channelData.length
            maxQuery: rangeQuery(maxTree, max)
            minQuery: rangeQuery(minTree, min)
        }

module.exports = AudioGraph
