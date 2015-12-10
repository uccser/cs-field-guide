#!/usr/bin/env coffee
"use strict"
Observable = require('zen-observable')

module.exports = Observable

Observable::take = (n=1) ->
    ### This takes the first n items from the observable then completes ###
    return new Observable (subscriber) =>
        i = 0
        subscription = @subscribe
            start: (subscription) ->
                subscriber.start?(subscription)

            next: (value) ->
                subscriber.next?(value)
                i += 1
                unless i < n
                    subscriber.complete?()
                    subscription.unsubscribe()

            error: (err) ->
                subscriber.error?(err)
                subscription.unsubscribe()

            complete: (value) ->
                subscriber.complete?(value)
                subscription.unsubscribe()
        return ->
            subscription.unsubscribe()

Observable::broadcast = ->
    ### Broadcast creates a new Observable that can be subscribed to by multiple
        subscribers all recieving the same values, a broadcast only starts
        emitting when at least one subscriber subscribes, and stops emitting
        when no subscribers are subscribed
    ###
    subscription = null
    subscribers = new Set()
    return new Observable (subscriber) =>
        subscribers.add(subscriber)
        unless subscription?
            subscription = @subscribe
                start: (subscription) ->
                    subscribers.forEach (subscriber) ->
                        subscriber.start?(subscription)
                next: (value) ->
                    subscribers.forEach (subscriber) ->
                        subscriber.next?(value)
                error: (err) ->
                    subscribers.forEach (subscriber) ->
                        subscriber.error?(err)
                        subscription.unsubscribe()
                        subscription = null

                complete: (value) ->
                    subscribers.forEach (subscriber) ->
                        subscriber.complete?()
                        subscription.unsubscribe()
                        subscription = null
        return ->
            subscribers.delete(subscriber)
            if subscribers.size is 0
                subscription.unsubscribe()

Observable::start = ->
    subscriber = null
    subscription = @subscribe
        start: (value) ->
            if subscriber?
                subscriber.start?(value)

        next: (value) ->
            if subscriber?
                subscriber.next?(value)

        error: (err) ->
            if subscriber?
                subscriber.error?(err)
                subscription.unsubscribe()

        complete: (value) ->
            if subscriber?
                subscriber.complete?(value)
                subscription.unsubscribe()

    observable = new Observable (_subscriber) ->
        subscriber = _subscriber
        return ->
            subscriber = null

    observable.stop = ->
        if subscriber?
            subscriber.complete?()
        subscription.unsubscribe()

    return observable


identity = (value) -> value

Observable::distinct = (keySelector=identity) ->
    ### Emits only distinct values, accepts a function for determining equality
    ###
    return new Observable (subscriber) =>
        found = new Set()
        subscript = @subscribe
            start: (value) ->
                susbcriber.start?(value)
            next: (value) ->
                unless found.has(keySelector(value))
                    subscriber.next?(value)
            error: (err) ->
                subscriber.error?(err)
            complete: (value) ->
                subscriber.complete?(value)

        return ->
            subscription.unsubscribe()

Observable::debounce = (time) ->
    ### Dicards values until the time time has passed since the previous value
        of the parent observable was emitted (e.g. if debouncing clicks for
        3 seconds this won't emit until 3 seconds have passed since the LAST
        click whether it was emitted or not)
    ###
    return new Observable (subscriber) =>
        last = -Infinity
        subscription = @subscribe
            start: (value) ->
                subscriber.start?(value)
            next: (value) ->
                current = Date.now()
                if (current - last) > time
                    subscriber.next?(value)
                last = current
            error: (err) ->
                subscriber.error?(err)

            complete: (value) ->
                subscriber.complete?(value)

        return ->
            subscription.unsubscribe()

Observable::throttle = (period) ->
    ### Allow only one item through within each period ###
    return new Observable (subscriber) =>
        last = -Infinity
        subscription = @subscribe
            start: (value) ->
                subscriber.start?(value)
            next: (value) ->
                current = Date.now()
                if current - last > period
                    last = current
                    subscriber.next?(value)
            error: (err) ->
                subscriber.error?(value)
            complete: (value) ->
                subscriber.complete?(value)

        return ->
            subscription.unsubscribe()

Observable::replay = ->
    ### Sends all values that were previously emitted to any new subscriber ###
    values = []
    return new Observable (subscriber) =>
        subscription = @subscribe
            start: (value) ->
                subscriber.start?(value)
                values.forEach (pastValue) ->
                    subscriber.next?(pastValue)
            next: (value) ->
                values.push(value)
                subscriber.next?(value)
            error: (err) ->
                subscriber.error?(err)
            complete: (value) ->
                subscriber.complete?(value)
        return ->
            subscription.unsubscribe()

Observable::regular = (period) ->
    ### Sends all values but if items come in rapid sequence it delays
        them such that at most one is emitted each period (items may be deferred
        later as its controlled by setTimeout)
    ###
    return new Observable (subscriber) =>
        last = -Infinity # Allow first through immediately
        queue = []

        sendNext = (value) ->
            if queue.length
                queue.push(value)
                subscriber.next?(queue.shift(0))
            else
                subscriber.next?(value)

        subscription = @subscribe
            start: (value) ->
                subscriber.start?(value)
            next: (value) ->
                current = Date.now()
                if current - last >= period
                    sendNext(value)
                else
                    delay = period - (current - last)
                    setTimeout ->
                        sendNext(value)
                    , delay
                last = current
            error: (err) ->
                subscriber.error?(err)
            complete: (value) ->
                subscriber.value?(err)

        return ->
            subscription.unsubscribe()

beat = ->
    return new Observable (subscriber) ->
        setTimeout ->
            subscriber.next?(1)
            setTimeout ->
                subscriber.next?(2)
                setTimeout ->
                    subscriber.next?(3)
                    setTimeout ->
                        subscriber.next?(4)
                    , 500
                , 500
            , 500
        , 500
        return ->

beat().regular(1000).subscribe
    next: (n) ->
        console.log "Beat #{n}"
