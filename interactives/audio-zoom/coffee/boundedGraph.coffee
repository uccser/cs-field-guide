"use strict"
_ = require('underscore')
async = require('es6-simple-async')

svgRectangle = ({x1, x2, y1, y2, svgElement}) ->
    ### Creates an SVG Polygon element shaped like a rectangle from
        the given points
    ###
    namespace = svgElement?.namespaceURI ? "http://www.w3.org/2000/svg"
    rectangle = document.createElementNS(
        namespace,
        "polygon"
    )

    points = [
        [x1, y1],
        [x1, y2],
        [x2, y2],
        [x2, y1]
    ]

    pointsString = points
        .map((point) -> point.join(',')).join(' ')

    rectangle.setAttributeNS(null, "points", pointsString)
    return rectangle


Object.defineProperty Array.prototype, 'select',
    # Use Object.defineProperty to prevent (for in (javascript) loops)
    set: ->
    get: ->
        return (compareFunc) ->
            ### This selects the best item from array,
                the function compareFunc will be passed two parameters:
                  the first parameter is the best value found thus far
                  the second value is each item in order in the array
            ###
            if this.length is 0
                return undefined
            best = this[0]
            for item in this[1...]
                if compareFunc(best, item)
                    best = item
            return best



getFontSize = (element) ->
    ### Returns the font size of a given element as a Number ###
    fontSizeString = getComputedStyle(element).getPropertyValue('font-size')
    fontSize = Number /(\d+)px/.exec(fontSizeString)[1]
    return fontSize


scaleToWidth = (textElements, width) ->
    ### Sets the text font size such that it fits within the given width
        all textElements should start with the same fontSize
    ###
    maxWidthElement = textElements[0]
    for item in textElements[1...]
        if item.getBBox().width > maxWidthElement.getBBox().width
            maxWidthElement = item
    currentFontSize = getFontSize(maxWidthElement)
    scale = width / maxWidthElement.getBBox().width
    for textElement in textElements
        textElement.setAttributeNS(null, 'font-size', currentFontSize * scale)

scaleToBox = (textElements, width, height) ->
    ### Sets the text font size such that it fits within both width and
        height given
    ###
    textElements.map (textElement) ->
        textElement.setAttributeNS(null, 'font-size', 100)
    maxWidthElement = textElements[0]
    for item in textElements[1...]
        if item.getBBox().width > maxWidthElement.getBBox().width
            maxWidthElement = item

    currentFontSize = getFontSize(maxWidthElement)
    scale = width / maxWidthElement.getBBox().width
    for textElement in textElements
        textElement.setAttributeNS(null, 'font-size', currentFontSize * scale)

    # Scale down if they don't fit within height now
    currentFontSize = currentFontSize * scale
    if textElements[0].getBBox().height > height
        scale = height / textElements[0].getBBox().height

    for textElement in textElements
        textElement.setAttributeNS(null, 'font-size', currentFontSize * scale)

SVG_NS = "http://www.w3.org/2000/svg"

class BarView
    defaultSize: 10000
    constructor: (opts) ->
        @parentSVG = opts.parent
        @viewBox = {
            width: @defaultSize
            height: @defaultSize*opts.ratio
        }
        @position = opts.position
        @svgElement = document.createElementNS(SVG_NS, 'svg')
        @parentSVG.appendChild(@svgElement)
        @svgElement.setAttributeNS(
            null,
            'viewBox',
            "0, 0, #{@viewBox.width}, #{@viewBox.height}"
        )
        @bars = []
        @_placeAt(@position)
        @_addBackground()

    _addBackground: ->
        ### This adds a background to the svg such that events will actually
            be triggered in the svg
        ###
        @background = document.createElementNS(SVG_NS, 'rect')
        @background.setAttributeNS(null, 'fill', 'lightblue')
        @background.setAttributeNS(null, 'x', 0)
        @background.setAttributeNS(null, 'y', 0)
        @background.setAttributeNS(null, 'height', @viewBox.height)
        @background.setAttributeNS(null, 'width', @viewBox.width)
        @svgElement.appendChild(@background)

    _placeAt: ->
        @svgElement.setAttributeNS(null, 'x', @position.x)
        @svgElement.setAttributeNS(null, 'y', @position.y)
        @svgElement.setAttributeNS(null, 'height', @position.height)
        @svgElement.setAttributeNS(null, 'width', @position.width)

    _createLabel: async ({lower, upper, label}) ->
        ### Creates a label from the given data and opts ###
        labelElement = document.createElementNS(
            @svgElement.namespaceURI,
            'text'
        )
        # In order to measure it we need to have it placed somewhere so just
        # place it at the origin
        labelElement.setAttributeNS(null, 'x', 0)
        labelElement.setAttributeNS(null, 'y', 0)
        # Add desired cssClasses to the label
        for _class in label.cssClasses ? []
            labelElement.classList.add(_class)
        # Set the text value to the label
        labelElement.textContent = label.text
        # Set a dummy size for the fontSize
        labelElement.setAttributeNS(null, 'font-size', '100px')
        @svgElement.appendChild(labelElement)
        yield return labelElement

    _createLabels: async (data, width) ->
        ### This creates a set of labels from the data and normalizes their
            size such that the longest label fits just within width
        ###
        # turn each data item in a label asynchronously
        labels = yield Promise.all data.map((item) => @_createLabel(item))
        [longestData, longestLabel] = _.zip(data, labels)
            .select ([..., best], [..., item]) ->
                # Find the longest label
                return item.getBBox().width > best.getBBox().width
        # and scale all other labels to have the same fontSize as needed
        # by the largest label
        width = @viewBox.width * (longestData.end - longestData.start)
        scale = width / longestLabel.getBBox().width
        labels.forEach (label) ->
            # Find current fontSize
            fontSizeString = window.getComputedStyle(label)
                .getPropertyValue('font-size')
            fontSize = Number /(\d+)px/.exec(fontSizeString)[1]
            # And scale it accordingly
            label.setAttributeNS(null, 'font-size', fontSize*scale*0.95 // 1)
        return labels

    _renderSingle: async (opts, renderLabel) ->
        ### This renders a single bar and its associated label ###
        {viewBottom, viewTop} = opts
        {dataLength, item, label} = opts
        {left, right} = opts
        {max, min} = opts
        {renderLabel} = opts
        viewHeight = viewBottom - viewTop
        diff = max - min
        # Find the bounding sides of our bar
        x1 = @viewBox.width * item.start
        x2 = @viewBox.width * item.end
        y1 = viewTop + viewHeight * (max - item.upper) / diff
        y2 = viewTop + viewHeight * (max - item.lower) / diff
        # And create an svg rectangle with that box
        rect = svgRectangle {
            x1, x2, y1, y2,
            svgElement: @svgElement
        }
        # Add css classes for the given data element
        for _class in item.cssClasses
            rect.classList.add(_class)

        # Add it to our graph
        @svgElement.appendChild(rect)
        @bars.push(rect)

        if renderLabel
            # Move the label to be in the appropriate location
            # relative to the bar
            label.setAttribute(
                'x',
                (x1+x2)/2 - label.getBBox().width/2
            )
            if item.label.position is 'bottom'
                yPos = y2 + label.getBBox().height + (item.label.barPadding ? 0)
                label.setAttribute('y', yPos)
            else
                yPos = y1 - (item.label.barPadding ? 0)
                label.setAttribute('y', yPos)

        yield return [rect, label]

    renderData: async (data, opts={}) ->
        ### Given an array of data this renders it within the graph,
            it returns the bounding region of the graph (excluding the labels)
            data should be of the form:
            {
                lower: Number
                upper: Number
                startSlice: Integer
                endSlice: Integer
                cssClasses: [String, ...]
                label:
                    text: String?
                    cssClasses: [String, ...]
                    padding: Number?
                    position: 'top' | 'bottom'
                    visible: Boolean
            }
        ###

        # Create all labels needed for the data
        if opts.renderLabels
            labels = yield @_createLabels data

            # Find the label which is tallest and its corresponding element
            tallest = _.zip(data, labels).filter ([item]) ->
                return item.label.position isnt 'bottom'
            .select ([..., best], [..., label]) ->
                return best.getBBox().height > label.getBBox().height
            # Same for any such label rendered below the bar
            tallestBottom = _.zip(data, labels).filter ([item]) ->
                return item.label.position is 'bottom'
            .select ([..., best], [..., label]) ->
                return best.getBBox().height > label.getBBox().height
        else
            labels = []

        # Find the max and min and the range between them
        maxItem = data.select ({upper: upper1}, {upper: upper2}) ->
            upper1 < upper2
        minItem = data.select ({lower: lower1}, {lower: lower2}) ->
            lower1 > lower2
        max = maxItem.upper
        min = minItem.lower
        diff = max - min
        # Bars should be rendered beginning at the highest label (with padding
        # as neccesary
        viewTop = if tallest?
            tallest[1].getBBox().height + (tallest[0].label.barPadding ? 0)
        else
            0
        # Ensure room at the bottom for the bottom label
        viewBottom = if tallestBottom?
            @viewBox.height - tallestBottom[1].getBBox().height - (
                tallestBottom[0].label.barPadding ? 0
            )
        else
            @viewBox.height

        # Now just render each bar
        for [item, label], idx in _.zip(data, labels)
            @_renderSingle({
                idx
                item
                label
                max
                min
                viewTop
                viewBottom
                dataLength: data.length
                renderLabel: opts.renderLabels
            })

        return {
            top: viewTop
            bottom: viewBottom
            topValue: max
            bottomValue: min
        }

    delete: ->
        @parentSVG.removeChild(@svgElement)

class Graph
    svgNS: 'http://www.w3.org/2000/svg'
    constructor: (opts) ->
        @parent = opts.parent
        @svgElement = document.createElementNS(@svgNS, 'svg')
        @svgElement.setAttributeNS(null, 'width', '100%')
        @svgElement.setAttributeNS(null, 'height', '100%')
        for _class in opts.classes ? []
            @svgElement.classList.add(_class)
        @parent.appendChild(@svgElement)
        @barView = null

        @axis = {x: {}, y: {}}

    renderData: async (data, {renderLabels, axis}) ->
        size =
            width: @parent.getBoundingClientRect().width
            height: @parent.getBoundingClientRect().height
        @barView = new BarView({
            parent: @svgElement
            ratio: size.height/size.width
            position:
                x: size.width*0.1
                y: size.height*0.1
                width: size.width*0.8
                height: size.height*0.8
        })
        yield @barView.renderData(data, {renderLabels})
        yield @renderAxis(axis)

    renderAxis: (axis) ->
        ### Render's the axis for the given data ###
        # --- Bottom axis ---
        @axis.x.left = document.createElementNS(SVG_NS, 'text')
        @axis.x.right = document.createElementNS(SVG_NS, 'text')
        @axis.x.left.textContent = axis.x.left
        @axis.x.right.textContent = axis.x.right
        @svgElement.appendChild(@axis.x.left)
        @svgElement.appendChild(@axis.x.right)

        scaleToBox(
            [@axis.x.left, @axis.x.right],
            0.8*@parent.getBoundingClientRect().width / 3,
            0.1*@parent.getBoundingClientRect().height#*0.95
        )

        # --- Bottom axis placement ---
        @axis.x.left.setAttributeNS(null, 'x',
            0.1*@parent.getBoundingClientRect().width
        )
        @axis.x.left.setAttributeNS(null, 'y',
            0.9*@parent.getBoundingClientRect().height
        )
        @axis.x.left.setAttributeNS(null, 'dominant-baseline', 'hanging')

        @axis.x.right.setAttributeNS(null, 'x',
            0.9*@parent.getBoundingClientRect().width
        )
        @axis.x.right.setAttributeNS(null, 'y',
            0.9*@parent.getBoundingClientRect().height
        )
        @axis.x.right.setAttributeNS(null, 'dominant-baseline', 'hanging')
        @axis.x.right.setAttributeNS(null, 'text-anchor', 'end')


        # --- Side axis ---
        @axis.y.top = document.createElementNS(SVG_NS, 'text')
        @axis.y.bottom = document.createElementNS(SVG_NS, 'text')
        @axis.y.top.textContent = axis.y.top
        @axis.y.bottom.textContent = axis.y.bottom
        @svgElement.appendChild(@axis.y.top)
        @svgElement.appendChild(@axis.y.bottom)

        # --- Scale y text so it fits within the gap ---
        scaleToWidth(
            [@axis.y.top, @axis.y.bottom],
            0.1*@parent.getBoundingClientRect().width * 0.95
        )
        @axis.y.top.setAttributeNS(null, 'x',
            0.1*@parent.getBoundingClientRect().width
        )
        @axis.y.top.setAttributeNS(
            null,
            'y',
            0.1*@parent.getBoundingClientRect().height
        )
        @axis.y.top.setAttributeNS(null, 'dominant-baseline', 'hanging')
        @axis.y.top.setAttributeNS(null, 'text-anchor', 'end')

        @axis.y.bottom.setAttributeNS(null, 'x',
            0.1*@parent.getBoundingClientRect().width
        )
        @axis.y.bottom.setAttributeNS(
            null,
            'y',
            0.9*@parent.getBoundingClientRect().height
        )
        @axis.y.bottom.setAttributeNS(null, 'text-anchor', 'end')



    clear: async ->
        yield @barView?.delete()
        try
            @svgElement.removeChild(@axis.y.top)
            @svgElement.removeChild(@axis.y.bottom)
            @svgElement.removeChild(@axis.x.left)
            @svgElement.removeChild(@axis.x.right)
    delete: async ->
        yield @parent.removeChild(@svgElement)


exports.Graph = Graph
