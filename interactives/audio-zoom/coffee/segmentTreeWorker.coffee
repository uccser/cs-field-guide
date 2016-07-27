"use strict"
register = require('./registerPromiseWorker.coffee')

max = (a, b) ->
    if isNaN(b)
        a
    else if a > b
        a
    else
        b

segmentTree = (arr, queryFunc=max, postProgress=->) ->
    ### This creates a segmentTree from an arr ###
    ArrType = arr.constructor
    # Tree size must bethe size of the nearest (rounded up) power of
    # 2 of the original array + the original array.length
    upperPowerOfTwo = 2**Math.ceil(Math.log2(arr.length))
    treeSize = upperPowerOfTwo + arr.length
    tree = new ArrType(treeSize)
    if ArrType is Array
        tree[upperPowerOfTwo...treeSize] = arr
    else
        tree.set(arr, upperPowerOfTwo)
    progress = upperPowerOfTwo // 100
    done = 0
    for i in [upperPowerOfTwo - 1...0]
        if i % progress is 0
            done += 1
            postProgress(done/100)
        tree[i] = queryFunc(tree[i*2], tree[i*2 + 1])
    return {
        tree: tree
        dataLength: arr.length
    }

register createSegmentTree = ({channelData, functionString}) ->
    func = eval("(#{functionString})")
    tree = segmentTree(channelData, func, @postProgress)
    return tree
