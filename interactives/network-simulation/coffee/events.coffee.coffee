eventStream = (selector="document", events="click", holdoff=false) ->
    ### Returns an Observable which can be subscribed to for the given events
        on a given element, if holdoff is true then wait until previous event
        is processed before waiting for next one
    ###
    subscribers = new Set()
    
    if lazy
        handler = (event) ->
            subscribers.forEach (subscriber) ->
                subscriber.next(event)
            $(selector).one events, handler
        $(selector).one events, handler
    else
        handler = (event) ->
            subscribers.forEach (subscriber) ->
                subscriber.next(event)
        $(selector).on events.join(' '), handler
    return new Observable (subscriber) ->
        subscribers.add(subscriber)
        return ->
            subscribers.delete(subscriber)
