#!/usr/bin/env coffee
### This is a library to extend zen-observables with some of reactiveX
    extensions
###
"use strict"
Observable = require('zen-observable')

module.exports = Observable

## ----------- Tiny helpers
identity = (value) -> value

## ----------- Core observable methods

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
    ### This starts running an observable even if no one is subscribed
        values are simply lost
    ###
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


Observable::regular = (period) ->
    ### Sends all values but if items come in rapid sequence it delays
        them such that at most one is emitted each period (items may be deferred
        later as its controlled by setTimeout)
    ###
    return new Observable (subscriber) =>
        queue = []
        done = false
        subscription = @subscribe
            start: (value) ->
                subscriber.start?(value)
            next: (value) ->
                queue.push(value)
            error: (err) ->
                subscriber.error?(err)
            complete: (value) ->
                done = true

        handler = ->
            if queue.length > 0
                value = queue.shift(0)
                subscriber.next?(value)
                timeout = setTimeout handler, period
            else if done
                subscriber.complete?(value)
            else
                timeout = setTimeout handler, period

        timeout = setTimeout handler, 0

        return ->
            subscription.unsubscribe()
            clearTimeout(timeout)


Observable::zip = (others...) ->
    ### This combines multiple observables into one that emits lists of values
        essentialy equivalent to underscore.zip but for observables, if any
        error occurs its immediately passed through, starts and completes are
        passed as lists
    ###
    return new Observable (subscriber) =>
        observables = [this, others...]

        num_started = 0
        startValues = (undefined for _ in observables)
        num_complete = 0
        completeValues = (undefined for _ in observables)
        queues = ([] for _ in observables)

        # Subscribe to every observable collecting values until we can
        # send them off
        subscriptions = for observable, idx in observables
            # Do is used here to ensure a closure so callbacks set the right
            # value of idx NOT the current value of idx
            do (observable, idx) ->
                observable.subscribe
                    start: (value) ->
                        num_started += 1
                        startValues[idx] = value
                        if num_started is observables.length
                            subscriber.start?(startValues)
                    next: (value) ->
                        queues[idx].push(value)
                        if queues.every((queue) -> queue.length > 0)
                            nextValues = (queue.shift(0) for queue in queues)
                            subscriber.next?(nextValues)
                    error: (err) ->
                        subscriber.error?(err)
                    complete: (value) ->
                        num_complete += 1
                        completeValues[idx] = value
                        if num_complete is observables.length
                            subscriber.complete?(completeValues)

        return ->
            for subscription in subscriptions
                subscription.unsubscribe()
