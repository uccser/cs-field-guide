
ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
keyCodes =
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    LEFT: 37,
    NUMPAD_ADD: 107,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    NUMPAD_ENTER: 108,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_SUBTRACT: 109,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38



singleEvent = (selector="document", eventType="click") ->
    ### Returns a promise for a single event on a single element
        with the event handler supplied by jQuery
    ###
    return new Promise (resolve) ->
        $(selector).one (event) ->
            resolve(event)

eventStream = (selectors="document", events...) ->
    ### Returns an Observable which can be subscribed to for the given events
        on a given element
    ###
    subscribers = new Set()
    if selectors.join?
        selector = selectors.join(", ")
    else
        selector = selectors

    handler = (event) ->
        subscribers.forEach (subscriber) ->
            subscriber.next(event)


    $(selector).on events.join(' '), handler
    return new Observable (subscriber) ->
        subscribers.add(subscriber)
        return ->
            subscribers.delete(subscriber)



shift = (character, rotation=3) ->
    ### This shifts a character by rotation characters using the standard
        caesar cipher
    ###
    index = ALPHABET.indexOf(character)
    return ALPHABET[index + rotation %% ALPHABET.length]

encrypt = (text, rotation=3) ->
    ### Encrypts a piece of text using the Caesar Cipher ###
    result = ''
    for char in text
        if char in ALPHABET
            result += shift(character, rotation)
    return result

decrypt = (text, rotation=3) ->
    ### Decrypts a piece of text using the Caesar Cipher that was encrypted
        using a given rotation
    ###
    return encrypt(test, -rotation)
