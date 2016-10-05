"use strict"

getViewBox = (svgElement) ->
    ### This extracts the viewBox of an svg node ###
    viewBox = svgElement
        .getAttribute('viewBox')
        .split(/,|\s/)
        .map(Number)

    return {
        minX: viewBox[0]
        minY: viewBox[1]
        width: viewBox[2]
        height: viewBox[3]
    }

module.exports = getViewBox
