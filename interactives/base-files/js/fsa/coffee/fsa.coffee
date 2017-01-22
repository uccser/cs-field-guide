"use strict"
require('es6-shim')
u = require('underscore')
ArrayMap = require('es6-array-map')

class FSA
    constructor: (fsa) ->
        ### fsa is an object with fields:
            Title: string # Optional, used to display the fsa
            Alphabet: array[string] # Optional, will be inferred otherwise
                                    # strings are the symbols used, they don't
                                    # need to be single characters, they're
                                    # purely symbolic, this is a set
                                    # duplicate values and order are not
                                    # considered
            AlphabetNames: map: string -> string # This converts symbolic
                                                # alphabet characters onto
                                                # names, e.g.
                                                # "<Click>" might be mapped
                                                # onto "Button was Clicked"
                                                # these values can't be used
                                                # however for state transitions
            Deterministic: bool # Optional, if true then we'll verify
                                # that the given States do actually
                                # describe a DFA, highly recommended to specify
                                # alphabet if this option is used
                                # If this is true and the form isn't a DFA
                                # constructor will throw a TypeError

            Start: string | array[string] # This is the start state of the automaton
                                  # if string it's a state label, if its an array
                                  # then we start in more than a single state
            EpsilonName: string # This is a field for specifying an alternative
                                # name for epsilon for view generation
                                # this defaults to the character ε (U+0B35)
            States:
                <label>: # <label> is simply a symbolic name for the state
                         # can be any string, this must be unique
                    name: string # Optional, this is what is displayed on the
                                 # node on a FSA image
                                 # will default to <label> if not given
                    final: bool # Optional, indicates if the state is a final
                                # state
                    transitions:
                        <symbol>: string | array # Symbol refers to a symbol
                                                 # from the alphabet property
                                                 # string|array is simply a set
                                                 # of states reachable via
                                                 # symbol <symbol>
                                                 # if its a string we'll treat
                                                 # it as a single state
                                                 # if its an array we'll treat
                                                 # it as a set of states
                        ...<moreSymbols>
                    epsilonTransitions: array[string] # This is an array of all
                                                      # states reachable via
                                                      # epsilon transitions
                                                      # from the current state
                ...<moreStates>
        ###
        @title = fsa.title
        @states = fsa.States ? {}
        # Just make Start a list of start states
        if fsa.Start.constructor is String
            @start = [fsa.Start]
        else
            @start = fsa.Start

        # Set the alphabet or infer it if neccessary
        if fsa.Alphabet?
            @alphabet = new Set(fsa.Alphabet)
        else
            @alphabet = new Set()
            # Just go through all transitions and add any symbols found to
            # the infered alphabet
            for _, state of fsa.States ? {}
                for symbol of state.transitions ? {}
                    @alphabet.add(symbol)

        ## Ensure alphabet is valid
        for label, state of @states
            for symbol of state.transitions ? {}
                unless @alphabet.has(symbol)
                    throw new TypeError(
                        "State #{label} has transition for #{symbol} but
                        #{symbol} not in Alphabet (#{@alphabet})"
                    )

        ## Normalize state transitions to arrays
        for label, state of @states
            for symbol, transition of state.transitions ? {}
                if transition.constructor is String
                    state.transitions[symbol] = [transition]

        @deterministic = fsa.Deterministic ? false
        if @deterministic
            unless @isDFA()
                throw new TypeError(@isDFA.reason)
        else
            if @isDFA()
                @deterministic = true

        @alphabetNames = fsa.AlphabetNames ? {}
        @epsilonName = fsa.EpsilonName ? 'ε'

    isDFA: ->
        ### This returns true if the current FSA is a DFA,
            this function also stores a metaproperty on the function itself
            with the reason it was false if applicable
        ###
        if @start.length isnt 1
            ## If there's more than 1 start state its not deterministic
            return false
        else
            ## If there's either more than one transition for a single symbol
            ## or if there's a missing transition its non deterministic
            for label, state of @states
                for symbol, transition of state.transitions ? {}
                    unless transition.length is 1
                        ## A transition is either missing or more than one choice
                        if transition.length is 0
                            @isDFA.reason = "State #{label} missing transition
                                             for symbol #{symbol}"
                        else
                            @isDFA.reason = "State #{label} has more than one
                                             transition for symbol #{symbol}"
                        return false
            for symbol in Array.from(@alphabet)
                for label, state of @states
                    unless (state.transitions ? [])[symbol]?
                        ## Missing a transition
                        @isDFA.reason = "State #{label} missing transition for #{symbol}"
            @isDFA.reason = ''
            return true

    nextState: (states, symbol) ->
        ### This returns the next state, if there's only a single state
            it will return it as a String otherwise it will return an array
            if states is null (NOT an empty list) then we'll return the
            epsilon closure of the start state
        ###
        unless states?
            result = @epsilonClosure(@start)
            if result.length is 1
                return result[0]
            else
                return result

        # Ensure type consistency for the following loops
        if states.constructor is String
            states = [states]
        newStates = new Set()
        # Get all states from the epsilon closure
        for state in states
            transitions = @states[state].transitions ? {}
            if symbol of transitions
                for nextState in transitions[symbol]
                    for newState in @epsilonClosure(nextState)
                        newStates.add(newState)

        newStates = Array.from(newStates)
        if newStates.length is 1
            return newStates[0]
        # Consistent return pattern
        return Array.from(newStates).sort()

    isFinal: (states) ->
        ### This returns true if given set of states contain a final state ###
        if states.constructor is String
            states = [states]

        for state in states
            unless state of @states
                throw new Error("State #{state} not an existing state")
            if @states[state].final ? false
                return true
        return false

    epsilonClosure: (states, found=null) ->
        ### This calculates the epsilonClosure of a given state,
            it always returns an array of states within the closure
        ###
        if states.constructor is String
            states = [states]

        missingStates = states.filter (state) => state not of @states
        unless missingStates.length is 0
            return throw new Error("States #{missingStates} not in automaton")

        # Simply use depth first search
        unless found?
            found = new Set(found)

        # Ignore states already searched
        states = states.filter((state) => not found.has(state))
        for state in states
            found.add(state)
        # Search all epsilonTransitions recursively
        for state in states
            for otherState in @states[state].epsilonTransitions ? []
                @epsilonClosure(otherState, found)
        return Array.from(found).sort()

toSet = (arr) ->
    ### This converts an arr into a sorted set ###
    if arr.constructor is String
        arr = [arr]
    return Array.from(new Set(arr)).sort()

class FSARunner
    constructor: (fsa) ->
        if fsa.constructor is FSA
            @fsa = fsa
        else
            @fsa = new FSA(fsa)
        @previousState = null
        @previousSymbol = null
        @currentState = @fsa.nextState()
        @_stateHandlers = {
            entry: new ArrayMap(null, toSet)
            exit: new ArrayMap(null, toSet)
            partialEntry: new ArrayMap(null, toSet)
            partialExit: new ArrayMap(null, toSet)
        }
        @_globalHandlers = new Set()
        @_completeHandlers = new Set()

    ## ----------------- Helper Methods ------------------------

    _bind: (type, states, handler) ->
        ### This binds a state to a given handler ###
        unless @_stateHandlers[type].has(states)
            @_stateHandlers[type].set(states, new Set())
        @_stateHandlers[type].get(states).add(handler)

    _unbind: (type, states, handler) ->
        ### This removes a given handler from the given set of states
        ###
        @_stateHandlers[type].get(states).delete(handler)
        if @_stateHandlers[type].get(states).size is 0
            @_stateHandlers[type].delete(states)

    _unbindAll: (type, states) ->
        ### This removes all handlers from the given set of states ###
        @_stateHandlers[type].delete(states)

    _bindEntry: (states, handler) ->
        ## Call method if we're already in the state
        @_bind('entry', states, handler)

        if u.isEqual(@currentState, states)
            @callHandler(handler)

    _bindPartialEntry: (states, handler) ->
        ### This binds a set of states to a given handler ###
        @_bind('partialEntry', states, handler)

        if u.difference(states, @currentState).length is 0
            @callHandler(handler)

    _bindExit: (states, handler) ->
        ### Binds exiting a state to a given handler ###
        @_bind('exit', states, handler)

    _bindPartialExit: (states, handler) ->
        ### Binds exiting a partial state to a given handler ###
        @_bind('partialExit', states, handler)

    _normalizeStates: (states) ->
        ### This converts states into an array of arrays rather than a arrays of
            strings or arrays
        ###
        states = states[...] # Clone states
        for state, idx in states
            if state.constructor is String
                states[idx] = [state]

        for state in states
            ## Ensure states make sense
            missingStates = state.filter((label) => label not of @fsa.states)
            unless missingStates.length is 0
                throw new Error("States #{missingStates} can't be bound to
                                as they do not exist on the FSA")

        return states

    ## ---------------- Single State ons ----------------------

    on: (states..., handler) ->
        ### This is just an alias for onEntry ###
        return @onEntry(states..., handler)

    onEntry: (states..., handler) ->
        ### For eash state passed we'll call the handler whenever we enter
            such a combination of states, this is an equality check so
            for example fsa.onEntry(["A", "B"], foo) will only fire foo if we enter
            the state ["A", "B"] not for example ["A", "B", "C"]
        ###
        unless handler instanceof Function
            throw new Error("Handler must be a function")

        states = @_normalizeStates(states)

        for state in states
            @_bindEntry(state, handler)
        return this

    onExit: (states..., handler) ->
        ### Equivalent to onEntry but called when exiting the state not
            when entering it
        ###
        unless handler instanceof Function
            throw new Error("Handler must be a function")

        states = @_normalizeStates(states)

        for state in states
            @_bindExit(state, handler)
        return this

    onPartial: (states..., handler) ->
        ### This is just an alias for onPartialEntry ###
        return @onPartialEntry(states..., handler)

    onPartialEntry: (states..., handler) ->
        ### This is equivalent to .on but we'll allow binding to subsets of
            the current set e.g. .onPartialEntry(["A", "B"], foo) will fire
            foo if we enter state ["A", "B", "C"]
        ###
        unless handler instanceof Function
            throw new Error("Handler must be a function")

        states = @_normalizeStates(states)

        for state in states
            @_bindPartialEntry(state, handler)
        return this

    onPartialExit: (states..., handler) ->
        ### This is equivalent to onPartialEntry but for exit ###
        unless handler instanceof Function
            throw new Error("Handler must be a function")

        states = @_normalizeStates(states)

        for state in states
            @_bindPartialExit(state, handler)
        return this


    ## ---------- Single State Offs ----------------------------

    off: (states..., handler) ->
        ### This is just an alias for offEntry ###
        return @offEntry(states..., handler)

    offEntry: (states..., handler) ->
        ### Removes the handler from the given states ###
        states = @_normalizeStates(states)

        for state in states
            @_unbind('entry', state, handler)
        return this

    offPartialEntry: (states..., handler) ->
        states = @_normalizeStates(states)
        for state in states
            @_unbind('partialEntry', state, handler)
        return this

    offExit: (states..., handler) ->
        states = @_normalizeStates(states)
        for state in states
            @_unbind('exit', state, handler)
        return this

    offPartialExit: (states..., handler) ->
        states = @_normalizeStates(states)
        for state in states
            @_unbind('partialExit', state, handler)
        return this


    ## -------- Change Handlers ------------------

    onChange: (handler) ->
        ### This handler is called on any state transition ###
        @_globalHandlers.add(handler)
        @callHandler(handler)
        return this

    offChange: (handler) ->
        ### This removes the given handler (as in) onChange ###
        @_globalHandlers.remove(handler)
        return this


    ## -------- Complete Handlers ----------------
    onComplete: (handler) ->
        ### This handler will be called when .complete is called ###
        @_completeHandlers.add(handler)
        return this

    offComplete: (handler) ->
        @_completeHandlers.delete(handler)
        return this

    ## -------- Event Triggers -------------------

    callHandler: (handler, stateInfo=null) ->
        ### This calls the given handler with current state info ###
        handler(
            previousState: @previousState
            currentState:  @currentState
            symbol:        @previousSymbol
            final:         @isFinal()
        , this)

    trigger: ->
        ### This is simply an alias for triggerEntry ###
        return @triggerEntry()

    triggerEntry: ->
        ### Causes appropriate state entry events to run but does
            not change the current state (use .goto for that), because this
            only triggers entryEvents it will not fire exit events from the
            current state
        ###
        (@_stateHandlers.entry.get(@currentState) ? new Set()).forEach (handler) =>
            @callHandler(handler)

        @_stateHandlers.partialEntry.forEach (handlers, partialStates) =>
            if u.difference(partialStates, @currentState).length is 0
                handlers.forEach (handler) =>
                    @callHandler(handler)

        return this

    triggerExit: (states) ->
        ### Causes appropriate exit handlers to be called when exiting a state
            this is basically the same as triggerEntry
        ###
        if states.constructor is String
            states = [states]
        (@_stateHandlers.exit.get(@previousState) ? new Set()).forEach (handler) =>
            @callHandler(handler)

        @_stateHandlers.partialExit.forEach (handlers, partialStates) =>
            if u.difference(partialStates, @previousState).length is 0
                handlers.forEach (handler) =>
                    @callHandler(handler)
        return this

    triggerStateChange: ->
        ### This causes handlers to be called with the appropriate values ###
        @triggerExit(@previousState)
        @triggerEntry(@currentState)

        @_globalHandlers.forEach (handler) =>
            @callHandler(handler)

    ## ------- Value information -------------------------------------
    state: ->
        ### Gives back the current state, if its a singleton returns a string
            otherwise returns an array
        ###
        if @currentState.length is 1
            return @currentState[0]
        else
            return @currentState[...]

    isFinal: ->
        ### Returns true if we're currently in a final state ###
        return @fsa.isFinal(@currentState)

    ## ------- State Manipulation and Input Handling ----------------------

    goto: (states) ->
        ### Forces a change to state given regardless of current state ###
        @previousState = @currentState
        @currentState = if states.constructor is String
            [states]
        else
            states
        @previousSymbol = null
        @triggerStateChange()
        return this

    next: (symbol) ->
        ### This causes the automaton to move into the next state ###
        @previousState = @currentState
        @currentState = @fsa.nextState(@currentState, symbol)
        @previousSymbol = symbol
        @triggerStateChange()
        return this

    feed: (symbols, done=false) ->
        ### This calls .next on each symbol passed, if done is true it will
            also call .complete when done
        ###
        for symbol in symbols
            @next(symbol)
        if done
            @complete()

    complete: ->
        ### This is to be called when the end of input is reached
            handler will be called with the state currently left in and
            whether or not that state is final
        ###
        @_completeHandlers.forEach (handler) =>
            @callHandler(handler)


module.exports = {
    FSA
    FSARunner
}
