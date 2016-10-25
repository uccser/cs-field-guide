"use strict"

class Selection
    constructor: (@start=0, @end=null, @dataLength=null) ->
        @end ?= start + 1
        @dataLength ?= @end
        @length = @end - @start
        if @dataLength is 0
            throw new Error('Data must be longer than 0')

    selectProportion: (proportionStart=0, proportionEnd=1) ->
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

    selectRange: (start=0, end=@length) ->
        ### This selects a range from within the given selection
            e.g. new Selection(100, 200, 300).selectRange(0, 20) is equal to
            new Selection(100, 120, 300)
        ###
        unless start < end
            throw new Error("Start must be lower than end")

        newStart = Math.min(@dataLength, Math.max(0, @start + start))
        newEnd   = Math.max(0, Math.min(@dataLength, @start + end))

        if newEnd - newStart is 0
            if newEnd is @dataLength
                newStart -= 1
            else
                newEnd += 1

        return new Selection(newStart, newEnd, @dataLength)

    proportionWithin: (overallProportion) ->
        ### This returns how far as proportion of the current selection that
            a given proportion over the whole data range is
            e.g.
            new Selection(0, 100, 1000).proportionWithin(0.05) will
            return 0.5 as 0.05 globally is 50% within the selection
        ###
        return (overallProportion * @dataLength - @start) / @length


module.exports = Selection
