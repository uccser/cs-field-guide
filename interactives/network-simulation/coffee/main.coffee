"use strict"
require("es5-shim")
require("es6-shim")
_ = require("underscore")

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

randomIndices = (length, errRate) ->
    ### This functions gives a list of indices to corrupt given a length
        and errRate e.g. it might give [0, 2, 7] for a length of 12 and
        errRate of 0.25, at least one index is always chosen with others
        corrupted as a errRate chance
    ###
    result = []
    guaranteedIdx = choice([0...length])
    for idx in [0...length]
        if idx is guaranteedIdx
            result.push(idx)
        else if Math.random() < errRate
            result.push(idx)
    return result


# Just some arbitrary default settings
packetDefaults =
    errRate: 0.5 # This is the chance of a packet "segment" being corrupted
    latency: 100 # This is in "milliseconds" from a conceptual standpoint
    start: 0 # This is the time the packet is created
    bandwidth: 0.1 # This is a proportion of how wide the packet is relative
                   # to latency
    contentType: 'string' # contentType is simply a passthrough to the renderer
    contentValue: 'Hello' # contentValue is simply a passthrough to the renderer

# This object is a reference for what packet.state(time) must return
packetState =
    sent: false # bool: indicates if packet has started to be sent yet
    recieved: false # bool: indicates if the packet has SUCCESSFULLY been
                    # recieved by the reciever
    corruptIndices: [0, 12] # Array[int]|null: indicates which indices of the
                            # if the packet isn't being sent or has been
                            # recieved then it is safe for this to be null
    packetType: 'packet' # string: indicates what a packet currently looks like
                   # valid values are 'packet', 'ack', 'nack', 'unsent' and
                   # 'recieved'
    roundTrip: 27 # int: which round trip we are currently at
    location: 0 # float<=1: indicates where between the two hosts
                # the packet is currently located as a proportion of distance
                # the location is from the most distant part of the packet
                # e.g. a packet with bandwidth 0.5 starts at -0.5 approaching
                # 1, location incidently should never exceed 1



packetTCP = (opts={}) ->
    ### This generates a new packet which returns a function which gives
        its state at some point in time
        NOTE: All the 2s are simply because a single round is both
              forward and back so don't moan about magic numbers
    ###
    # Setup options
    errRate = opts.errRate ? packetDefaults.errRate
    start = opts.start ? packetDefaults.start

    latency = opts.latency ? packetDefaults.latency
    bandwidth = opts.bandwidth ? packetDefaults.bandwidth
    contentType = opts.contentType ? packetDefaults.contentType
    contentValue = opts.contentType ? packetDefaults.contentValue
    contentLength = contentValue.length

    # All fields in the base result need to be returned so ensure this object
    # has them just in case
    baseResult = {
        latency: latency
        bandwidth: bandwidth
        start: start
        contentType: contentType
        contentValue: contentValue
        contentLength: contentLength
        recievedTime: 0
        state: (time) ->
            throw new Error("Must override basePacket.state function")
    }
    # Chance a packet succesfully makes it through during a single sending
    successChance = (1 - errRate)**contentLength
    # Round trips is drawn from a geometric distribution
    roundTrips = geometricRandomNumber(successChance)

    # Calculate how long it will take us to go around
    packetTripTime = contentLength*latency*bandwidth + latency
    ackTripTime = latency*bandwidth + latency # Assume ack obeys same bandwidth
                                              # as packet
    roundTripTime = packetTripTime + ackTripTime

    # If round trips is some value like Infinity or NaN we'll just return
    # a special packet
    unless Number.isSafeInteger(roundTrips)
        return _.extend baseResult,
            recievedTime: Infinity
            state: (time) ->
                recieved: false
                packetType: 'packet'
                sent: (time-start > 0)
                corruptIndices: []
                roundTrip: (time %% roundTripTime)
                location: 1 # Never render

    # Closure state for ensuring a corruption isn't different between function
    # calls
    return _.extend baseResult,
        recievedTime: roundTripTime*roundTrips
        state: (realTime) ->
            ### This returns the state of a packet at a given point in time,
                giving back an object with information that may be useful for
                rendering
            ###

            # Normalize time to 0 start to make calculations simple
            time = realTime - start

            if time < 0
                # If this happens the packet hasn't started to be sent yet
                # so simply return a "unsent" packet
                return {
                    sent: false
                    recieved: false
                    corruptIndices: null

                }


            roundTrip = time // roundTripTime
            # Modulus trip time to see where in the current trip we are
            tripTime = (time %% roundTripTime)


    x = (time) ->
        time = time - (opts.start ? packetDefaults.start)
        result = {}
        result.completionTime = 12
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

->
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
