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


depthOf = (i, length) ->
    ### Returns the depth if binary searching an item ###
    unless 0 <= i < length
        throw new Error("Index #{i} out of range")
    if length//2 is i
        return 1
    else if i < length//2
        return 1 + depthOf(i, length//2)
    else
        newIdx = i - length//2 - 1
        newLength = (length-1)//2
        return 1 + depthOf(newIdx, newLength)
        if length % 2 is 1
            newLength = length//2
            return 1 + depthOf(newIdx, newLength)
        else
            newLength = length//2 - 1
            return 1 + depthOf(newIdx, newLength)

ofDepth = (depth, length) ->
    if length <= 0
        return []
    else if depth is 1
        return [length//2]
    else if length % 2 is 1
        left = ofDepth(depth-1, length//2)
        right = ofDepth(depth-1, length//2).map (idx) ->
            idx + length//2 + 1
        return [
            left...
            right...
        ]
    else # even
        left = ofDepth(depth-1, length//2)
        right = ofDepth(depth-1, length//2-1).map (idx) ->
            idx + length//2 + 1
        return [
            left...
            right...
        ]

maxDepth = (length) ->
    if length is 0
        return undefined
    else if length is 1
        return 1
    else
        return 1 + maxDepth(length//2)

class BoundedGraph
    svgNS: "http://www.w3.org/2000/svg"
    constructor: (opts) ->
        @parent = opts.parent
        # Create an svg element to place the entire view in
        # Create an svg element to place the graph in
        @view = document.createElementNS(@svgNS, 'svg')
        @graphElement = document.createElementNS(@svgNS, 'svg')
        @viewBox = opts.viewBox ? {width: 1000, height: 1000}
        viewBoxAttr = "
            0,
            0,
            #{@viewBox.width ? 1000},
            #{@viewBox.height ? 1000}
        "
        # Set its viewBox to the given value (use higher values for more
        # precise rendering)
        @graphElement.setAttribute('viewBox', viewBoxAttr)
        @slices = opts.slices ? @viewBox.width
        # Place the svg into the parent
        @parent.appendChild(@view)
        @view.appendChild(@graphElement)
        @elements = {}
        @location = null

    placeAt: (location) ->
        # This places the graph at a particular location within the parent
        @location = location
        @graphElement.setAttribute('x', location.x ? 0)
        @graphElement.setAttribute('y', location.y ? 0)
        @graphElement.setAttribute('width', location.width)
        @graphElement.setAttribute('height', location.height)

    renderData: (sections) ->
        throw new Error("Can't render abstract BoundedGraph")


class RangeBarGraph extends BoundedGraph
    constructor: (args...) ->
        super(args...)
        @elements.bars = new Set()
        @elements.labels = new Set()
        @elements.axis = {
            bar: null
            nibs: new Set() # The things that point down from
                                # the axis line
            labels: new Set()
        }

    _createLabel: async ({lower, upper, label}) ->
        ### Creates a label from the given data and opts ###
        labelElement = document.createElementNS(
            @graphElement.namespaceURI,
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
        @graphElement.appendChild(labelElement)
        @elements.labels.add(labelElement)
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
        width = @viewBox.width * (longestData.endSlice - longestData.startSlice) / @slices
        scale = width / longestLabel.getBBox().width
        labels.forEach (label) ->
            # Find current fontSize
            fontSizeString = window.getComputedStyle(label)
                .getPropertyValue('font-size')
            fontSize = Number /(\d+)px/.exec(fontSizeString)[1]
            # And scale it accordingly
            label.setAttributeNS(null, 'font-size', fontSize*scale // 1)
        return labels

    _deleteLabel: (labelElement) ->
        # Removes a given label from the graph
        @graphElement.removeChild(labelElement)
        @elements.labels.delete(labelElement)

    _deleteBar: (barElement) ->
        @graphElement.removeChild(barElement)
        @elements.bars.delete(barElement)


    clear: async (labelElement) ->
        # Clears the graph
        @elements.labels.forEach (label) =>
            @_deleteLabel(label)
        @elements.bars.forEach (bar) =>
            @_deleteBar(bar)
        @_deleteAxis()
        yield return

    _renderSingle: async (opts) ->
        ### This renders a single bar and its associated label ###
        {viewBottom, viewTop} = opts
        {dataLength, item, label} = opts
        {left, right} = opts
        {max, min} = opts
        viewHeight = viewBottom - viewTop
        diff = max - min
        # Find the bounding sides of our bar
        x1 = @viewBox.width * item.startSlice/@slices
        x2 = @viewBox.width * item.endSlice/@slices
        y1 = viewTop + viewHeight * (max - item.upper) / diff
        y2 = viewTop + viewHeight * (max - item.lower) / diff
        # And create an svg rectangle with that box
        rect = svgRectangle {
            x1, x2, y1, y2,
            svgElement: @graphElement
        }
        # Add css classes for the given data element
        for _class in item.cssClasses
            rect.classList.add(_class)

        # Add it to our graph
        @graphElement.appendChild(rect)
        @elements.bars.add(rect)
        # Move the label to be in the appropriate location relative to the bar

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
        unless data.length <= @slices
            throw new Error("More data than slices to place in")

        # Create all labels needed for the data
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
            })


        yield @_createAxis(data, opts.axis)

        return {
            top: viewTop
            bottom: viewBottom
            topValue: max
            bottomValue: min
        }

    _createAxisLabel: async (item) ->
        ### Creates a label for the axis ###
        label = document.createElementNS(@svgNS, 'text')
        label.setAttributeNS(null, 'x', 0)
        label.setAttributeNS(null, 'y', 0)
        label.textContent = item.axis.value
        for cssClass in item.axis.cssClasses ? []
            label.classList.add(cssClass)
        # Dummy font-size so that we don't get a font size of zero
        label.setAttributeNS(null, 'font-size', '100px')
        @view.appendChild(label)
        @elements.axis.labels.add(label)
        yield return label

    _barCenter: (item) ->
        ### This returns where the center of the bar will be placed for a given item ###
        centerGraphCoords = (item.startSlice + item.endSlice)/2
        centerViewCoords = @location.x + @location.width *
            centerGraphCoords / @slices
        return centerViewCoords

    _createAxisNib: async (baseLine, height, xPos, axis={}) ->
        ### Creates a single nib pointing out of the axis ###
        nib = document.createElementNS(@svgNS, 'line')
        nib.setAttributeNS(null, 'x1', xPos)
        nib.setAttributeNS(null, 'x2', xPos)
        nib.setAttributeNS(null, 'y1', baseLine)
        nib.setAttributeNS(null, 'y2', baseLine + height)
        @view.appendChild(nib)
        @elements.axis.nibs.add(nib)
        for cssClass in axis.cssClasses ? []
            nib.classList.add(cssClass)

        yield return nib

    _createAxisNibs: async (data, axis, baseLine, baseHeight=30) ->
        ### Creates the bits of the axis that point out ###
        nibs = []
        # Start nib should be extra size
        nibs.push(yield @_createAxisNib(baseLine, baseHeight, @_barCenter(data[0]), axis))
        # Do all the rest of the of the data except the last
        for item, idx in data[1...-1]
            height = baseHeight * axis.nibScale**depthOf(idx, data.length)
            nib = yield @_createAxisNib(baseLine, height, @_barCenter(item), axis)
            nibs.push(nib)
        # And do the last extra size as well
        nibs.push(yield @_createAxisNib(baseLine, baseHeight, @_barCenter(data[data.length-1]), axis))

        yield return nibs

    _createAxisBar: async (axis) ->
        ### Creates the bar for a given axis ###
        yield return

    _createAxis: async (data, axis={}) ->
        ### Creates an axis below the graph containing
            the labels for given data, unlike labels above
            it only renders the ones it needs
        ###

        # Create a line across the bottom of the graph
        axisY = @location.y + @location.height + (axis.padding ? 0)
        line = document.createElementNS(@svgNS, 'line')
        line.setAttributeNS(null, 'x1', @location.x)
        line.setAttributeNS(null, 'x2', @location.x + @location.width)
        line.setAttributeNS(null, 'y1', axisY)
        line.setAttributeNS(null, 'y2', axisY)
        for class_ in axis.cssClasses ? []
            line.classList.add(class_)

        labels = yield Promise.all data.map (item) =>
            return @_createAxisLabel(item)

        # Add it to the view
        @view.appendChild(line)
        @elements.axis.bar = line

        yield @_placeAxisLabels(
            data,
            axis
        )

    _scaledSize: async (labels, maxWidth) ->
        ### Scales all labels to the same size font such that
            no label goes beyond maxWidth
        ###
        yield return labels.map ({label}) ->
            getFontSize(label) * label.getBBox().width / maxWidth
        .reduce (acc, fontSize) ->
            return if fontSize < acc then fontSize else acc

    _placeAxisLabelsOfDepth: async (data, nibs, depth, fontSize) ->
        ### Places  ###
        if depth is 0
            indices = [0, data.length-1]
        else
            indices = ofDepth(depth, data.length-2)

        pairs = yield Promise.all indices.map async (idx) =>
            return [
                yield @_createAxisLabel(data[idx]),
                yield @_createAxisNib(idx, dataLength)
            ]

        pairs.map ([label, nib]) ->
            nib.setAttributeNS(null, 'data-depth', depth)
            label.setAttributeNS(null, 'data-depth', depth)
            label.setAttributeNS(null, 'font-size', "#{fontSize}px")
            label.setAttributeNS(null, 'y',
                nib.getBBox().y + nib.getBBox().height + label.getBBox().height
            )
            label.setAttributeNS(null, 'x',
                nib.getBBox().x - label.getBBox().width/2
            )

    _placeAxisLabels: async (data, axis) ->
        ###  ###
        depth1 = yield Promise.all [0, data.length-1].map async (idx) =>
            return {
                label: yield @_createAxisLabel(data[idx])
                nib: nibs[idx]
                idx: idx
            }

        baseFontSize = yield @_scaledSize(
            depth1,
            axis.fontProportion*@location.width
        )

        depth1.map ({label}) =>
            @view.removeChild(label)
            @elements.axis.labels.delete(label)

        total = axis.fontProportion*2
        @_placeAxisLabelsOfDepth(data, 0, baseFontSize)
        for depth in [1..maxDepth(data.length)]
            @_placeAxisLabelsOfDepth(
                data,
                depth, baseFontSize*axis.nibScale**depth
            )
            total += ofDepth(depth).length*axis.fontProportion
            if total > 1
                break
        yield return

    _deleteAxis: async ->
        @elements.axis.nibs.forEach (nib) =>
            @view.removeChild(nib)
            @elements.axis.nibs.delete(nib)
        @elements.axis.labels.forEach (label) =>
            @view.removeChild(label)
            @elements.axis.labels.delete(label)

        yield return

exports.RangeBarGraph = RangeBarGraph
