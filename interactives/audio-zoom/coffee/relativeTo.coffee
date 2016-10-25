"use strict"
getViewBox = require('./getViewBox.coffee')

relativeTo = (element, event, bbox=true) ->
    ### This returns the [x, y] coordinates of an event relative to
        the given element
    ###
    x = event.pageX - element.getBoundingClientRect().left
    y = event.pageY - element.getBoundingClientRect().top

    if bbox and element.getBBox?
        x = element.getBBox().width *
            x/element.getBoundingClientRect().width
        y = element.getBBox().height *
            y/element.getBoundingClientRect().height

    return {x, y, event}

module.exports = relativeTo
