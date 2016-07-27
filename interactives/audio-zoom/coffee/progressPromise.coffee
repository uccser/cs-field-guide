"use strict"

class ProgressPromise
    constructor: (func) ->
        @finished = false
        @_progressHandlers = []
        progress = (val) =>
            unless finished?
                for handler in @_progressHandlers
                    handler(val)
        @_promise = new Promise (resolve, reject) ->
            return func(resolve, reject, progress)

        @_promise.then =>
            @finished = true

        @_promise.catch =>
            @finished = true

    progressed: (callback) ->
        @_progressHandlers.push(callback)
        return this

    then: (args...) ->
        return @_promise.then(args...)

    catch: (args...) ->
        return @_promise.catch(args...)

module.exports = ProgressPromise
