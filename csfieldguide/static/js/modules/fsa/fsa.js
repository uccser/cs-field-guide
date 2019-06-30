/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS201: Simplify complex destructure assignments
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
"use strict";
const u = require('underscore');
const ArrayMap = require('es6-array-map');

class FSA {
    constructor(fsa) {
        /* fsa is an object with fields:
            Title: string # Optional, used to display the fsa
            Alphabet: array[string] # Optional, will be inferred otherwise
                                    * strings are the symbols used, they don't
                                    * need to be single characters, they're
                                    * purely symbolic, this is a set
                                    * duplicate values and order are not
                                    * considered
            AlphabetNames: map: string -> string # This converts symbolic
                                                * alphabet characters onto
                                                * names, e.g.
                                                * "<Click>" might be mapped
                                                * onto "Button was Clicked"
                                                * these values can't be used
                                                * however for state transitions
            Deterministic: bool # Optional, if true then we'll verify
                                * that the given States do actually
                                * describe a DFA, highly recommended to specify
                                * alphabet if this option is used
                                * If this is true and the form isn't a DFA
                                * constructor will throw a TypeError

            Start: string | array[string] # This is the start state of the automaton
                                  * if string it's a state label, if its an array
                                  * then we start in more than a single state
            EpsilonName: string # This is a field for specifying an alternative
                                * name for epsilon for view generation
                                * this defaults to the character ε (U+0B35)
            States:
                <label>: # <label> is simply a symbolic name for the state
                         * can be any string, this must be unique
                    name: string # Optional, this is what is displayed on the
                                 * node on a FSA image
                                 * will default to <label> if not given
                    final: bool # Optional, indicates if the state is a final
                                * state
                    transitions:
                        <symbol>: string | array # Symbol refers to a symbol
                                                 * from the alphabet property
                                                 * string|array is simply a set
                                                 * of states reachable via
                                                 * symbol <symbol>
                                                 * if its a string we'll treat
                                                 * it as a single state
                                                 * if its an array we'll treat
                                                 * it as a set of states
                        ...<moreSymbols>
                    epsilonTransitions: array[string] # This is an array of all
                                                      * states reachable via
                                                      * epsilon transitions
                                                      * from the current state
                ...<moreStates>
        */
        let state, symbol;
        this.title = fsa.title;
        this.states = fsa.States != null ? fsa.States : {};
        // Just make Start a list of start states
        if (fsa.Start.constructor === String) {
            this.start = [fsa.Start];
        } else {
            this.start = fsa.Start;
        }

        // Set the alphabet or infer it if neccessary
        if (fsa.Alphabet != null) {
            this.alphabet = new Set(fsa.Alphabet);
        } else {
            this.alphabet = new Set();
            // Just go through all transitions and add any symbols found to
            // the infered alphabet
            const object = fsa.States != null ? fsa.States : {};
            for (let _ in object) {
                state = object[_];
                for (symbol in state.transitions != null ? state.transitions : {}) {
                    this.alphabet.add(symbol);
                }
            }
        }

        //# Ensure alphabet is valid
        for (var label in this.states) {
            state = this.states[label];
            for (symbol in state.transitions != null ? state.transitions : {}) {
                if (!this.alphabet.has(symbol)) {
                    throw new TypeError(
                        `State ${label} has transition for ${symbol} but \
${symbol} not in Alphabet (${this.alphabet})`
                    );
                }
            }
        }

        //# Normalize state transitions to arrays
        for (label in this.states) {
            state = this.states[label];
            const object1 = state.transitions != null ? state.transitions : {};
            for (symbol in object1) {
                const transition = object1[symbol];
                if (transition.constructor === String) {
                    state.transitions[symbol] = [transition];
                }
            }
        }

        this.deterministic = fsa.Deterministic != null ? fsa.Deterministic : false;
        if (this.deterministic) {
            if (!this.isDFA()) {
                throw new TypeError(this.isDFA.reason);
            }
        } else {
            if (this.isDFA()) {
                this.deterministic = true;
            }
        }

        this.alphabetNames = fsa.AlphabetNames != null ? fsa.AlphabetNames : {};
        this.epsilonName = fsa.EpsilonName != null ? fsa.EpsilonName : 'ε';
    }

    isDFA() {
        /* This returns true if the current FSA is a DFA,
            this function also stores a metaproperty on the function itself
            with the reason it was false if applicable
        */
        if (this.start.length !== 1) {
            //# If there's more than 1 start state its not deterministic
            return false;
        } else {
            //# If there's either more than one transition for a single symbol
            //# or if there's a missing transition its non deterministic
            let state, symbol;
            for (var label in this.states) {
                state = this.states[label];
                const object = state.transitions != null ? state.transitions : {};
                for (symbol in object) {
                    const transition = object[symbol];
                    if (transition.length !== 1) {
                        //# A transition is either missing or more than one choice
                        if (transition.length === 0) {
                            this.isDFA.reason = `State ${label} missing transition \
for symbol ${symbol}`;
                        } else {
                            this.isDFA.reason = `State ${label} has more than one \
transition for symbol ${symbol}`;
                        }
                        return false;
                    }
                }
            }
            for (symbol of Array.from(Array.from(this.alphabet))) {
                for (label in this.states) {
                    state = this.states[label];
                    if ((state.transitions != null ? state.transitions : [])[symbol] == null) {
                        //# Missing a transition
                        this.isDFA.reason = `State ${label} missing transition for ${symbol}`;
                    }
                }
            }
            this.isDFA.reason = '';
            return true;
        }
    }

    nextState(states, symbol) {
        /* This returns the next state, if there's only a single state
            it will return it as a String otherwise it will return an array
            if states is null (NOT an empty list) then we'll return the
            epsilon closure of the start state
        */
        if (states == null) {
            const result = this.epsilonClosure(this.start);
            if (result.length === 1) {
                return result[0];
            } else {
                return result;
            }
        }

        // Ensure type consistency for the following loops
        if (states.constructor === String) {
            states = [states];
        }
        let newStates = new Set();
        // Get all states from the epsilon closure
        for (let state of Array.from(states)) {
            const transitions = this.states[state].transitions != null ? this.states[state].transitions : {};
            if (symbol in transitions) {
                for (let nextState of Array.from(transitions[symbol])) {
                    for (let newState of Array.from(this.epsilonClosure(nextState))) {
                        newStates.add(newState);
                    }
                }
            }
        }

        newStates = Array.from(newStates);
        if (newStates.length === 1) {
            return newStates[0];
        }
        // Consistent return pattern
        return Array.from(newStates).sort();
    }

    isFinal(states) {
        /* This returns true if given set of states contain a final state */
        if (states.constructor === String) {
            states = [states];
        }

        for (let state of Array.from(states)) {
            if (!(state in this.states)) {
                throw new Error(`State ${state} not an existing state`);
            }
            if (this.states[state].final != null ? this.states[state].final : false) {
                return true;
            }
        }
        return false;
    }

    epsilonClosure(states, found=null) {
        /* This calculates the epsilonClosure of a given state,
            it always returns an array of states within the closure
        */
        if (states.constructor === String) {
            states = [states];
        }

        const missingStates = states.filter(state => !(state in this.states));
        if (missingStates.length !== 0) {
            return (() => { throw new Error(`States ${missingStates} not in automaton`); })();
        }

        // Simply use depth first search
        if (found == null) {
            found = new Set(found);
        }

        // Ignore states already searched
        states = states.filter(state => !found.has(state));
        for (var state of Array.from(states)) {
            found.add(state);
        }
        // Search all epsilonTransitions recursively
        for (state of Array.from(states)) {
            for (let otherState of Array.from(this.states[state].epsilonTransitions != null ? this.states[state].epsilonTransitions : [])) {
                this.epsilonClosure(otherState, found);
            }
        }
        return Array.from(found).sort();
    }
}

const toSet = function(arr) {
    /* This converts an arr into a sorted set */
    if (arr.constructor === String) {
        arr = [arr];
    }
    return Array.from(new Set(arr)).sort();
};

class FSARunner {
    constructor(fsa) {
        if (fsa.constructor === FSA) {
            this.fsa = fsa;
        } else {
            this.fsa = new FSA(fsa);
        }
        this.previousState = null;
        this.previousSymbol = null;
        this.currentState = this.fsa.nextState();
        this._stateHandlers = {
            entry: new ArrayMap(null, toSet),
            exit: new ArrayMap(null, toSet),
            partialEntry: new ArrayMap(null, toSet),
            partialExit: new ArrayMap(null, toSet)
        };
        this._globalHandlers = new Set();
        this._completeHandlers = new Set();
    }

    //# ----------------- Helper Methods ------------------------

    _bind(type, states, handler) {
        /* This binds a state to a given handler */
        if (!this._stateHandlers[type].has(states)) {
            this._stateHandlers[type].set(states, new Set());
        }
        return this._stateHandlers[type].get(states).add(handler);
    }

    _unbind(type, states, handler) {
        /* This removes a given handler from the given set of states
         */
        this._stateHandlers[type].get(states).delete(handler);
        if (this._stateHandlers[type].get(states).size === 0) {
            return this._stateHandlers[type].delete(states);
        }
    }

    _unbindAll(type, states) {
        /* This removes all handlers from the given set of states */
        return this._stateHandlers[type].delete(states);
    }

    _bindEntry(states, handler) {
        //# Call method if we're already in the state
        this._bind('entry', states, handler);

        if (u.isEqual(this.currentState, states)) {
            return this.callHandler(handler);
        }
    }

    _bindPartialEntry(states, handler) {
        /* This binds a set of states to a given handler */
        this._bind('partialEntry', states, handler);

        if (u.difference(states, this.currentState).length === 0) {
            return this.callHandler(handler);
        }
    }

    _bindExit(states, handler) {
        /* Binds exiting a state to a given handler */
        return this._bind('exit', states, handler);
    }

    _bindPartialExit(states, handler) {
        /* Binds exiting a partial state to a given handler */
        return this._bind('partialExit', states, handler);
    }

    _normalizeStates(states) {
        /* This converts states into an array of arrays rather than a arrays of
            strings or arrays
        */
        let state;
        states = states.slice(); // Clone states
        for (let idx = 0; idx < states.length; idx++) {
            state = states[idx];
            if (state.constructor === String) {
                states[idx] = [state];
            }
        }

        for (state of Array.from(states)) {
            //# Ensure states make sense
            const missingStates = state.filter(label => !(label in this.fsa.states));
            if (missingStates.length !== 0) {
                throw new Error(`States ${missingStates} can't be bound to \
as they do not exist on the FSA`);
            }
        }

        return states;
    }

    //# ---------------- Single State ons ----------------------

    on(...args) {
        const adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        /* This is just an alias for onEntry */
        return this.onEntry(...Array.from(states), handler);
    }

    onEntry(...args) {
        let adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        /* For eash state passed we'll call the handler whenever we enter
            such a combination of states, this is an equality check so
            for example fsa.onEntry(["A", "B"], foo) will only fire foo if we enter
            the state ["A", "B"] not for example ["A", "B", "C"]
        */
        if (!(handler instanceof Function)) {
            throw new Error("Handler must be a function");
        }

        states = this._normalizeStates(states);

        for (let state of Array.from(states)) {
            this._bindEntry(state, handler);
        }
        return this;
    }

    onExit(...args) {
        let adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        /* Equivalent to onEntry but called when exiting the state not
            when entering it
        */
        if (!(handler instanceof Function)) {
            throw new Error("Handler must be a function");
        }

        states = this._normalizeStates(states);

        for (let state of Array.from(states)) {
            this._bindExit(state, handler);
        }
        return this;
    }

    onPartial(...args) {
        const adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        /* This is just an alias for onPartialEntry */
        return this.onPartialEntry(...Array.from(states), handler);
    }

    onPartialEntry(...args) {
        let adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        /* This is equivalent to .on but we'll allow binding to subsets of
            the current set e.g. .onPartialEntry(["A", "B"], foo) will fire
            foo if we enter state ["A", "B", "C"]
        */
        if (!(handler instanceof Function)) {
            throw new Error("Handler must be a function");
        }

        states = this._normalizeStates(states);

        for (let state of Array.from(states)) {
            this._bindPartialEntry(state, handler);
        }
        return this;
    }

    onPartialExit(...args) {
        let adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        /* This is equivalent to onPartialEntry but for exit */
        if (!(handler instanceof Function)) {
            throw new Error("Handler must be a function");
        }

        states = this._normalizeStates(states);

        for (let state of Array.from(states)) {
            this._bindPartialExit(state, handler);
        }
        return this;
    }


    //# ---------- Single State Offs ----------------------------

    off(...args) {
        const adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        /* This is just an alias for offEntry */
        return this.offEntry(...Array.from(states), handler);
    }

    offEntry(...args) {
        let adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        /* Removes the handler from the given states */
        states = this._normalizeStates(states);

        for (let state of Array.from(states)) {
            this._unbind('entry', state, handler);
        }
        return this;
    }

    offPartialEntry(...args) {
        let adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        states = this._normalizeStates(states);
        for (let state of Array.from(states)) {
            this._unbind('partialEntry', state, handler);
        }
        return this;
    }

    offExit(...args) {
        let adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        states = this._normalizeStates(states);
        for (let state of Array.from(states)) {
            this._unbind('exit', state, handler);
        }
        return this;
    }

    offPartialExit(...args) {
        let adjustedLength = Math.max(args.length, 1),
            states = args.slice(0, adjustedLength - 1),
            handler = args[adjustedLength - 1];
        states = this._normalizeStates(states);
        for (let state of Array.from(states)) {
            this._unbind('partialExit', state, handler);
        }
        return this;
    }


    //# -------- Change Handlers ------------------

    onChange(handler) {
        /* This handler is called on any state transition */
        this._globalHandlers.add(handler);
        this.callHandler(handler);
        return this;
    }

    offChange(handler) {
        /* This removes the given handler (as in) onChange */
        this._globalHandlers.remove(handler);
        return this;
    }


    //# -------- Complete Handlers ----------------
    onComplete(handler) {
        /* This handler will be called when .complete is called */
        this._completeHandlers.add(handler);
        return this;
    }

    offComplete(handler) {
        this._completeHandlers.delete(handler);
        return this;
    }

    //# -------- Event Triggers -------------------

    callHandler(handler, stateInfo=null) {
        /* This calls the given handler with current state info */
        return handler({
            previousState: this.previousState,
            currentState:  this.currentState,
            symbol:        this.previousSymbol,
            final:         this.isFinal()
        }
        , this);
    }

    trigger() {
        /* This is simply an alias for triggerEntry */
        return this.triggerEntry();
    }

    triggerEntry() {
        /* Causes appropriate state entry events to run but does
            not change the current state (use .goto for that), because this
            only triggers entryEvents it will not fire exit events from the
            current state
        */
        let left;
        ((left = this._stateHandlers.entry.get(this.currentState)) != null ? left : new Set()).forEach(handler => {
            return this.callHandler(handler);
        });

        this._stateHandlers.partialEntry.forEach((handlers, partialStates) => {
            if (u.difference(partialStates, this.currentState).length === 0) {
                return handlers.forEach(handler => {
                    return this.callHandler(handler);
                });
            }
        });

        return this;
    }

    triggerExit(states) {
        /* Causes appropriate exit handlers to be called when exiting a state
            this is basically the same as triggerEntry
        */
        let left;
        if (states.constructor === String) {
            states = [states];
        }
        ((left = this._stateHandlers.exit.get(this.previousState)) != null ? left : new Set()).forEach(handler => {
            return this.callHandler(handler);
        });

        this._stateHandlers.partialExit.forEach((handlers, partialStates) => {
            if (u.difference(partialStates, this.previousState).length === 0) {
                return handlers.forEach(handler => {
                    return this.callHandler(handler);
                });
            }
        });
        return this;
    }

    triggerStateChange() {
        /* This causes handlers to be called with the appropriate values */
        this.triggerExit(this.previousState);
        this.triggerEntry(this.currentState);

        return this._globalHandlers.forEach(handler => {
            return this.callHandler(handler);
        });
    }

    //# ------- Value information -------------------------------------
    state() {
        /* Gives back the current state, if its a singleton returns a string
            otherwise returns an array
        */
        if (this.currentState.length === 1) {
            return this.currentState[0];
        } else {
            return this.currentState.slice();
        }
    }

    isFinal() {
        /* Returns true if we're currently in a final state */
        return this.fsa.isFinal(this.currentState);
    }

    //# ------- State Manipulation and Input Handling ----------------------

    goto(states) {
        /* Forces a change to state given regardless of current state */
        this.previousState = this.currentState;
        this.currentState = states.constructor === String ?
            [states]
        :
            states;
        this.previousSymbol = null;
        this.triggerStateChange();
        return this;
    }

    next(symbol) {
        /* This causes the automaton to move into the next state */
        this.previousState = this.currentState;
        this.currentState = this.fsa.nextState(this.currentState, symbol);
        this.previousSymbol = symbol;
        this.triggerStateChange();
        return this;
    }

    feed(symbols, done) {
        if (done == null) { done = false; }
        /* This calls .next on each symbol passed, if done is true it will
            also call .complete when done
        */
        for (let symbol of Array.from(symbols)) {
            this.next(symbol);
        }
        if (done) {
            return this.complete();
        }
    }

    complete() {
        /* This is to be called when the end of input is reached
            handler will be called with the state currently left in and
            whether or not that state is final
        */
        return this._completeHandlers.forEach(handler => {
            return this.callHandler(handler);
        });
    }
}


module.exports = {
    FSA,
    FSARunner
};
