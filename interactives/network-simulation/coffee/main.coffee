"use strict"
require("es5-shim")
require("es6-shim")

Observable = require('./observable.coffee')

## ---------- Observable library things --------------------

eventStream = (selector="document", events="click", holdoff=false) ->
    ### Returns an Observable which can be subscribed to for the given events
        on a given element, if holdoff is true then wait until previous event
        is processed before waiting for next one
    ###
    subscribers = new Set()

    if holdoff
        handler = (event) ->
            subscribers.forEach (subscriber) ->
                subscriber.next(event)
            $(selector).one events, handler
        $(selector).one events, handler
    else
        handler = (event) ->
            subscribers.forEach (subscriber) ->
                subscriber.next(event)
        $(selector).on events, handler
    return new Observable (subscriber) ->
        subscribers.add(subscriber)
        return ->
            subscribers.delete(subscriber)


animationFrames = ->
    ### Creates an observable of animation frames ###
    return new Observable (subscriber) ->
        subscriber.start?()

        start = null

        begin = (time) ->
            start = time
            subscriber.next?(0) # Animation starts at time zero and all
                                # following times are relative to start
            requestID = window.requestAnimationFrame handler

        handler = (time) ->
            subscriber.next?(time-start)
            requestID = window.requestAnimationFrame handler

        requestID = window.requestAnimationFrame begin

        return ->
            window.cancelAnimationFrame(requestID)


class SendMessage
    ### A SendMessage is simply a host that sends a message
    ###
    constructor: ->
        @time = 0
    




    next: (packet) ->
        ### On recieving a packet we'll assume its an ACK or a NACK so inspect
            it and add it to the start of the message queue if its a NACK
        ###

    connect: (network) ->
        ### Connects a network to the given host by subscribing the network
            to the sender and vice versa via the observable interface
        ###


    sendMessage: (message) ->
        ### Loads a message reading for sending when a new timestamp comes in
            since the last message was sended
        ###
