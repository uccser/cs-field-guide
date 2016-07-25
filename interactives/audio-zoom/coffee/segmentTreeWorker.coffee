"use strict"
register = require('./registerPromiseWorker.coffee')
segmentTree = require('./rangeQuery.coffee').segmentTree

register createSegmentTree = ({channelData, functionString}) ->
    func = eval("(#{functionString})")
    tree = segmentTree(channelData, func)
    return tree
