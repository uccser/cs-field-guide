"use strict"

module.exports = registerWorker = (func) ->
    ### This registers a worker so that it send messages back to a PromiseWorker
    ###
    self.onmessage = (message) ->
        messageContext = {
            postProgress: (progressMessage) ->
                ### This can be used to send when progress is made ###
                self.postMessage {
                    id: message.data.id
                    message: progressMessage
                    type: 'progress'
                }
        }
        try
            # If the result gets returned we'll treat it as async and
            # wait for it to complete
            result = func.call(messageContext, message.data.message)
            Promise.resolve(result).then (result) ->
                response = {
                    id: message.data.id
                    message: result
                    type: 'message'
                }
                self.postMessage(response, func.transferables)
                delete func.transferables
            .catch (err) ->
                response = {
                    id: message.data.id
                    message: String(err)
                    type: 'error'
                }
                self.postMessage(response, func.transferables)
                delete func.transferables
        catch err
            response = {
                id: message.data.id
                message: String(err)
                type: 'error'
            }
            self.postMessage(response, func.transferables)
            delete func.transferables
