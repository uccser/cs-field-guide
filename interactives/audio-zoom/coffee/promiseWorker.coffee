#!/usr/bin/env coffee
"use strict"

class PromiseWorker
    constructor: (@worker) ->
        @waiting = {}
        @currentID = 0
        @worker.onmessage = (event) =>
            unless event.data.error
                @waiting[event.data.id].resolve(event.data.message)
            else
                @waiting[event.data.id].reject(event.data.message)
            delete @waiting[event.data.id]

        @worker.onerror = (err) ->
            console.error("If you see this error please put in a bug report")

    postMessage: (message, transferables) ->
        ### This posts a message to the worker and returns a promise that'll
            resolve when the message is returned
        ###
        return new Promise (resolve, reject) =>
            @waiting[@currentID] = {
                resolve: resolve
                reject: reject
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
