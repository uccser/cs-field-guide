"use strict"
module.exports = registerWorker = (func) ->
    ### This registers a worker so that it send messages back to a PromiseWorker
    ###
    self.onmessage = (message) ->
        try
            # If the result gets returned we'll treat it as async and
            # wait for it to complete
            result = func(message.data.message)
            Promise.resolve(result).then (result) ->
                response = {
                    id: message.data.id
                    message: result
                    error: false
                }
                self.postMessage(response, func.transferables)
                delete func.transferables
            .catch (err) ->
                response = {
                    id: message.data.id
                    message: String(err)
                    error: true
                }
                self.postMessage(response, func.transferables)
                delete func.transferables
        catch err
            response = {
                id: message.data.id
                message: String(err)
                error: true
            }
            self.postMessage(response, func.transferables)
            delete func.transferables
