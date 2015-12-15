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

geometricRandomNumber = (bernoulliProb) ->
    ### This picks a random number that is drawn from a geometric
        distribution using the formula from
        http://stackoverflow.com/questions/23517138/
            random-number-generator-using-geometric-distribution
    ###
    if bernoulliProb is 1
        return 1
    else
        return Math.ceil(Math.log(1-Math.random()) / Math.log(1-bernoulliProb))

choice = (indexable) ->
    ### Given an array-like object picks a random element ###
    return indexable[Math.floor(Math.random() * indexable.length)]

corruptString = (str, errRate) ->
    ### Guarantees at least one corruption of a character and corrupts
        others with probability errRate
    ###
    result = ''
    corruptIdx = choice([0...str.length])
    for char, idx in str
        if corruptIdx is idx
            result += '?'
        else if Math.random() > errRate
            result += char
        else
            result += '?'
    return result


# Just some arbitrary default settings
packetDefaults =
    errRate: 0.5
    latency: 100
    start: 0


packet = (opts={}) ->
    ### This generates a new packet which returns a function which gives
        its state at some point in time
        NOTE: All the 2s are simply because a single round is both
              forward and back so don't moan about magic numbers
    ###
    successChance = (1 -(opts.errRate ? packetDefaults.errRate))**
        opts.value.length
    roundTrips = geometricRandomNumber(successChance)
    unless Number.isSafeInteger(roundTrips)
        return ->
            result =
                type: 'recieved'
                value: opts.value
                big: yes
    latency = opts.latency ? packetDefaults.latency
    mostRecentRound = 0
    mostRecentValue = opts.value
    mostRecentValueCorrupted = false
    return (time) ->
        time = time - (opts.start ? packetDefaults.start)
        result = {}
        result.completionTime =
        # Half-trip proportion
        tripProportion = (time %% (2*latency)) / (latency)
        # If we're on the final round of the packet then
        # we need to do special actions
        round = time//(2*latency) + 1
        # This determines what the packet currently looks like, depending on
        # the time it might be being send, or it might just be an ack and or
        # a nack for the packet
        if round > roundTrips
            result.type = 'recieved'
        else if tripProportion < 1
            result.type = 'packet'
        else if round < roundTrips # Proportion > 0.5 implies ack or nack
            # round < roundTrips means we haven't accepted the packet yet
            # so its a nack
            result.type = 'nack'
        else
            # other possibilities exhausted so its an ack
            result.type = 'ack'

        # This tells us what the packet currently looks like,
        # because the packet might need to be rendered multiple times we store
        # current state in the closure
        if round is mostRecentRound
            result.value = mostRecentValue
        else
            result.value = opts.value
        mostRecentValue = result.value


        # Corrupt the value when we pass half way of the sender->reciever trip
        if tripProportion >= 0.5 and not mostRecentValueCorrupt \
        and not (round is roundTrips)
            result.value = corruptString(result.value, opts.errRate)
            mostRecentValueCorrupt = true
        # Location is a proportion of how far to the reciever we are
        if tripProportion >= 1
            result.location = 1 - (tripProportion %% 1)
        else
            result.location = tripProportion
        return result

drawCenteredText = (ctx, opts={}) ->
    ### This draws opts.text using a given CanvasRenderingContext2D
        at specified points opts.centerX and opts.centerY
        (defaulting to 0 if not provided)
        with opts.font being an object containing fields opts.font.size
        opts.font.name, optionally also include opts.font.fillStyle
    ###
    ctx.font = "#{opts.font.size}px #{opts.font.name ? 'Arial'}"
    #ctx.textBaseLine = "middle"
    ctx.textAlign = 'center'
    ctx.fillStyle = opts.font.fillStyle ? 'black'
    drawY = opts.centerY + opts.font.size/2
    ctx.fillText(opts.text, opts.centerX, drawY)

## ------------ Main application testing ---------------------

SPEED = 1/5

#pState = packet
#    errRate: 0.2
#    value: "CATS IN HATS TALKING TO BATS"
#    latency: 300

pState = packet
    errRate: 0.2
    value: "Z"
    latency: 300

canvasID = '#interactive-network-simulation-canvas'
clockViewID = '#interactive-network-simulation-clock-view'

canvas = $(canvasID)[0]
ctx = canvas.getContext('2d')

drawPacket = (ctx, packetState, renderOptions={}) ->
    ### Draws a given packet with the given renderOptions ###
    ctx.beginPath()
    ctx.fillStyle = 'green'

    proportion = packetState.location

    viewValue = if packetState.type in ['ack', 'nack']
        packetState.type
    else
        packetState.value

    textWidth = ctx.measureText(viewValue).width
    # Find where the corner of the rectangle to render is located
    centerX = renderOptions.minX + proportion * (
        renderOptions.maxX - renderOptions.minX
    )
    cornerX = centerX - textWidth/2
    cornerY = renderOptions.centerY - renderOptions.size/2

    # Independent of packet type render the rectangle
    if packetState.type is 'ack'
        ctx.fillStyle = 'green'
    else if packetState.type is 'nack'
        ctx.fillStyle = 'pink'
    else
        ctx.fillStyle = 'lightblue'


    unless packetState.type is 'recieved'
        ctx.fillRect(
            cornerX,
            cornerY,
            textWidth,
            renderOptions.size
        )

        drawCenteredText ctx,
            font:
                name: 'monospace'
                size: renderOptions.size
            centerX: centerX
            centerY: renderOptions.centerY
            text: viewValue



animationFrames().map((time) -> time*SPEED).subscribe
    next: (time) ->
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = 'black'
        ctx.strokeRect(0, 0, canvas.width, canvas.height)

        drawPacket ctx, pState(time),
            size: 30
            minX: 40
            maxX: canvas.width - 40
            centerY: canvas.height/2
        $(clockViewID).text("#{time}")
