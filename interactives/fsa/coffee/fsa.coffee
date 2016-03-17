class FSA
    constructor: (fsa) ->
        ### fsa is a yaml fsa with fields:
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

            Start: string | array # This is the start state of the automaton
                                  # if string its a state label, if its an
                                  # array then we'll treat it as a state key

            States:
                <label>: # <label> is simply a symbolic name for the state
                         # can be any string
                    name: string # Optional, this is what is displayed on the
                                 # node on a FSA image
                                 # will default to <label> if not given
                    key: array # Optional, if supplied you can refer to this
                               # state in the keyTransitions property
                               # can be useful for representing product
                               # automaton e.g. key: [q0, q1]
                               # this key will be treated as a set
                               # as its designed for product automatons
                    final: true
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
                                                 # to refer to keys use
                                                 # an array of arrays
                    epsilonTransitions: array # This is an array of all states
                                              # reachable via epsilon from the
                                              # current state, contents
                                              # of the array can be either
                                              # strings or arrays (keys)
                ...
        ###
        @title = fsa.title
        if fsa.Alphabet?
            @alphabet = new Set(fsa.Alphabet)
        else
            @alphabet = new Set()
            for state in fsa.States
                for symbol in state.transitions
                    @alphabet.add(symbol)

    epsilonClosure: (state) ->


fs = require('fs')
yaml = require('js-yaml')

file = fs.readFileSync('../sample-fsas/alpha-infer-test.yaml').toString('utf8')

console.log yaml.load(file)
console.log new FSA(yaml.load(file))
