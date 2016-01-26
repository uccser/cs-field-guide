"use strict"

_ = require('underscore')
math = require('mathjs')

{geometricRandom} = require('./bigRand.coffee')
{errorCorrection} = require('./errorCorrection.coffee')

# Alias for bignumber
big = math.bignumber
# Bignumbers everywhere for simplicity
math.config
    number: 'bignumber'
    precision: 64


# ---------------------

choice = (indexable) ->
    ### Given an array-like object picks a random element ###
    console.log math.floor(math.random())
    console.assert indexable.length > 0,
        "Can't pick element from empty array/string"
    return indexable[math.floor(math.random() * indexable.length)]

randomIndices = (length=10, errRate=0.5) ->
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

# This object is a reference for what should be passed to messageTCP
messageOpts =
    message: 'hello' # string or array: This is the data to be split
                     # into packets to be sent
    packetSize: 2 # int: this is the size of the packets to split the message
                  # into
    header: 1 # int: size of the header, add
    distance: 10 # number|bignumber: this is
    bandwidth: 2 # number|bignumber: this is how wide the packet is
               # this must be the same units as

messageTCP = (opts={}) ->
    ### This generates an array of packets to send a given message ###


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
    contentValue = opts.contentValue ? packetDefaults.contentValue
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
            if tripTime < packetTripTime
                packetType = 'packet'
                location = (tripTime - (packetTripTime-latency))/latency
            else
                ackTime = tripTime - packetTripTime
                location = 1 - ackTime/latency
                if roundTrip is roundTrips
                    packetType = 'ack'
                else
                    packetType = 'nack'


            return {
                sent: true
                recieved: false
                corruptIndices: randomIndices(contentLength, errRate)
                packetType: packetType
                roundTrip: roundTrip
                location: location
            }


module.exports = {
    packetTCP
}
