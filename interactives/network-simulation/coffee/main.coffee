"use strict"
require("es5-shim")
require("es6-shim")
_ = require("underscore")

Observable = require('./observable.coffee')
{packetTCP} = require('./packets.coffee')


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


corruptString = (string, corruptIndices) ->
    ### Guarantees at least one corruption of a character and corrupts
        others with probability errRate
    ###
    result = ''
    for char, idx in str
        if idx in corruptIndices
            result += '?'
        else
            result += char
    return result




drawCenteredText = (ctx, opts) ->
    ### This draws opts.text using a given CanvasRenderingContext2D
        centered in a box with the equivalent description to ctx.fillRect
        (defaulting to 0 if not provided)
        with opts.font being an object containing fields opts.font.size
        opts.font.name, optionally also include opts.font.fillStyle
    ###
    centerX = opts.x + opts.width/2
    centerY = opts.y + opts.height
    ctx.font = "#{opts.font.size}px #{opts.font.name ? 'Arial'}"
    #ctx.textBaseLine = "middle"
    ctx.textAlign = 'center'
    ctx.textBaseLine = 'top'
    ctx.fillStyle = opts.font.fillStyle ? 'black'
    ctx.fillText(opts.text, centerX, centerY)

## ------------ Main application testing ---------------------


drawPacket = (ctx, packet, time, renderOptions={}) ->
    ### Draws a given packet with the given renderOptions ###
    packetState = packet.state(time)
    ctx.beginPath()
    ctx.fillStyle = 'green'

    location = packetState.location

    left = renderOptions.minX
    distance = (renderOptions.maxX - renderOptions.minX)

    # Find where the corner of the rectangle to render is located
    cornerX = location*distance + left

    if packetState.packetType in ['ack', 'nack']
        cornerY = ctx.canvas.height * 2/3
    else
        cornerY = ctx.canvas.height * 1/3

    # Independent of packet type render the rectangle
    if packetState.packetType is 'nack'
        ctx.fillStyle = 'red'
    else if packetState.packetType is 'ack'
        ctx.fillStyle = 'green'

    segmentWidth = distance*packet.bandwidth

    if packetState.packetType is 'packet'
        for idx in [0...packet.contentLength]
            ctx.fillStyle = 'white'
            ctx.fillRect(
                cornerX + idx*segmentWidth,
                cornerY,
                segmentWidth,
                renderOptions.size
            )
            ctx.strokeRect(
                cornerX + idx*segmentWidth,
                cornerY,
                segmentWidth,
                renderOptions.size
            )
            text = if idx in packetState.corruptIndices
                '?'
            else
                packet.contentValue[idx]
            drawCenteredText ctx,
                text: text
                x: cornerX + idx*segmentWidth
                y: cornerY
                width: segmentWidth
                height: renderOptions.size
                font:
                    size: renderOptions.size
                    name: "monospace"
    else if packetState.packetType in ['ack', 'nack']
        ctx.fillRect(
            cornerX,
            cornerY,
            segmentWidth,
            renderOptions.size
        )
        ctx.strokeRect(
            cornerX,
            cornerY,
            segmentWidth,
            renderOptions.size
        )

do ->
    SPEED = 1/20

    packet = packetTCP
        errRate: 0.2
        contentType: "string"
        contentValue: "ABABABABAB"
        latency: 100
        bandwidth: 0.2

    canvasID = '#interactive-network-simulation-canvas'
    clockViewID = '#interactive-network-simulation-clock-view'

    canvas = $(canvasID)[0]
    ctx = canvas.getContext('2d')


    animationFrames().map((time) -> time*SPEED).subscribe
        next: (time) ->
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            ctx.strokeStyle = 'black'
            ctx.strokeRect(0, 0, canvas.width, canvas.height)

            drawPacket ctx, packet, time,
                size: 30
                minX: 40
                maxX: canvas.width - 40
                centerY: canvas.height/2
            $(clockViewID).text("#{time}")

            ctx.beginPath()
            ctx.moveTo(40, 0)
            ctx.lineTo(40, canvas.height)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(canvas.width-40, 0)
            ctx.lineTo(canvas.width-40, canvas.height)
            ctx.stroke()
