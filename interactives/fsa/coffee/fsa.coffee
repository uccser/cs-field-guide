
class State
    constructor: (state) ->
        ### state must be an object containing fields:
            reference: string
            name: string
            final: bool | undefined
            transitions: Map-Like: string -> State # Where string is a symbol
            epsilsonTransitions: set of states connected by epsilon (iterable)
        ###
        {
            @reference
            @name
            @final
            transitions
            epsilonTransitions
        } = state
        @transitions = new Map(transitions ? [])
        @epsilonTransitions = new Set(epsilonTransitions ? [])

    next: (symbol) ->
        ### Gives the next state when given a particular symbol ###
        return @transitions.get(symbol)

    epsilonClosure: ->
        ### Returns an ES6 set containing the epsilon closure of  ###
        closure = new Set()
        size = 0


    addTransition: (symbol, state) ->
        ### Adds a transition to the state's transition map ###
        @transitions.set(symbol, state)

    addEpsilonTransition: (state) ->
        ### Adds an epsilon transition from this to given state ###
        @epsilonTransitions.add(state)


q0 = new State()
