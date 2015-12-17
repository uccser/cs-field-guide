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
                    packetType: 'unsent'
                    roundTrip: -1
                    location: -Infinity
                }


            roundTrip = time // roundTripTime

            if roundTrip > roundTrips
                # Packet has since been recieved so return the "recieved"
                # packet
                return {
                    sent: true
                    recieved: true
                    corruptIndices: null
                    packetType: 'recieved'
                    roundTrip: roundTrip
                    location: 1
                }

            # Modulus trip time to see where in the current trip we are
            tripTime = (time %% roundTripTime)
            
