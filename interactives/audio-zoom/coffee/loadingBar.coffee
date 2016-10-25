"use strict"
svgNS = 'http://www.w3.org/2000/svg'

class LoadingBar
    width: 0.2
    constructor: (@parent) ->
        ### This creates a loading bar on a given svg element ###
        @svgElement = document.createElementNS(svgNS, 'svg')
        @svgElement.setAttributeNS(null, 'width', '100%')
        @svgElement.setAttributeNS(null, 'height', '100%')
        @parent.appendChild(@svgElement)
        # Find the dimensions we need to render within
        @viewBox = @svgElement.getBoundingClientRect()
        # Create a border around the loading bar
        #@createLoadingBorder()
        @update(0)

    createLoadingBorder: ->
        ### This creates a border for the loading bar ###
        @loadingBorder = document.createElementNS(svgNS, 'rect')

        @loadingBorder.classList.add('loading-border')

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

        @loadingBar = document.createElementNS(svgNS, 'rect')
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
        @parent.removeChild(@svgElement)
        #@svgElement.removeChild(@loadingBorder)
        @svgElement.removeChild(@loadingBar)
        @disposed = true

module.exports = LoadingBar
