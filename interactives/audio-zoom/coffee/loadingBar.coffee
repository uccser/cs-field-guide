"use strict"
getViewBox = require('./getViewBox.coffee')

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

module.exports = LoadingBar
