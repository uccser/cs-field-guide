"use strict"
ProgressPromise = require('./progressPromise.coffee')

class PromiseWorker
    constructor: (@worker) ->
        @waiting = {}
        @currentID = 0
        @worker.onmessage = (event) =>
            switch event.data.type
                when 'error'
                    @waiting[event.data.id].reject(event.data.message)
                    delete @waiting[event.data.id]
                when 'progress'
                    @waiting[event.data.id].progress(event.data.message)
                else
                    @waiting[event.data.id].resolve(event.data.message)
                    delete @waiting[event.data.id]

        @worker.onerror = (err) ->
            console.error("If you see this error please put in a bug report")

    postMessage: (message, transferables, onProgress=null) ->
        ### This posts a message to the worker and returns a promise that'll
            resolve when the message is returned
        ###
        return promise = new ProgressPromise (resolve, reject, progress) =>
            @waiting[@currentID] = {
                resolve: resolve
                reject: reject
                progress: progress
            }
            newMessage = {
                id: @currentID
                message: message
            }
            @worker.postMessage(newMessage, transferables)
            @currentID += 1

    terminate: ->
        @worker.terminate()

module.exports = PromiseWorker
