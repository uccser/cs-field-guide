# FSA Base

This is a shared base for FSA based interactives, its designed to be a generic base for both DFA and NFA based interactives in order to use it you can either just include the fsa.js file with a script tag or you can use it with require/browserify if preferred.

If including via a script tag it will create a global object called FSA with two constructor functions:
`FSA` and `FSARunner`.

## FSA.FSA

The FSA.FSA class is way to have an FSA without the actual state tracking, its probably not neccesary to use it directly, its used in FSARunner to do the state transitions, it can abstract over both DFAs and NFAs.

### Arguments
FSA.FSA can take an object of the format down below (for NFAs), for the most part you'll probably only need an object of the following form if you're only dealing with DFAs

```
Alphabet: array[string] # This specifies the set of symbols to use
                        # e.g. ['x', 'y']
                        # or even ['click', 'button1']
                        # any string is valid

Deterministic: true     # If you're using a DFA I'd recommend specifying this
                        # option as then it'll throw an error if it isn't
                        # actually a DFA

Start: string           # Use this to specifiy which of the states in the
                        # States property is the starting state

States:
    <label>:            # This is the name of the state, e.g. LightOn
        final: bool?    # True if this is a final state, defaults to false
                        # if not given
        transitions:
            <symbol>: <other label> # symbol must be from Alphabet and
                                    # other label must be from States
            moreTransitions...
    moreStates...
```

For example FSA might be created like:

```javascript
lights = new FSA.FSA({
    Alphabet: ['switchUp', 'switchDown'],
    Deterministic: true,
    Start: 'LightOff',
    States: {
        LightOn: {
            final: true,
            transitions: {
                switchUp: LightOff
                switchDown: LightOn
            }
        }
        LightOff: {
            transitions: {
                switchUp: LightOff
                switchDown: LightOn
            }
        }
    }
})

```

Full argument specification:

```
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
```

## FSA.FSARunner

This is the class you'll probably want if you're using this library it gives two way communication for the FSA similar to jQuery, the argument to the function should be the same as you'd pass to the FSA.FSA class (see above).

## Methods

## DFA and NFA Methods

### `.next(symbol)`

Call this method when you want the automaton to move to the next state e.g.

```javascript
var light = new FSA.FSARunner(
    // Using the light example from earlier
);

light.next('switchDown');
light.state(); // "LightOn"
light.next('switchUp');
light.state(); // "LightOff"
```

### ``.complete()```

This method should be called when there is no input remaining, it simply causes any event handlers waiting for the FSA to finish to fire (see .onComplete).

### `.feed([symbols], done=false)`

This is essentially just a way to call ``.next`` multiple times, if done is true we'll also call `.complete()`.

```javascript
...
light.feed(['switchDown', 'switchUp']);
light.state(); // "LightOff"
```

## Binding Methods

All .on binding methods have a corresponding ``.off`` method which removes the
associated handler, those won't be mentioned, they always have the same arguments
as the ``.on`` methods.

All handlers are passed the same arguments:

stateChangeInfo = {
    previousState: # This is the previous state we were in
    currentState : # This is the state we have entered
    symbol       : # What symbol caused this transition
    final        : # Whether or not the current state is a final state
}
fsa = # The fsa that called the handler

e.g. it might be called with `handler({
    previousState: "lightOff",
    currentState: "lightOn",
    final: true,
    symbol: "switchDown"}
, FSA.FSARunner(...))`

### `.on`/`.onEntry (state, handler)`

This is a way to bind entering a state (aka when .currentState is the given state) for example:

```javascript
function animateLightOn(state) {
    if (state.previousState != state.currentState) {
        // Animate light if the light wasn't already on
    }
}

light.on("LightOn", animateLightOn);

$("#switchDownButton").click(function() {
    light.next('switchDown'); // Causes Animate lightOn to fire whenever
                              // switchDownButton is clicked
});

```

### `.onExit (state, handler)`

This is similar to ``.onEntry`` but fires instead when leaving a state rather than entering (aka when previousState is the given state)

```javascript
function animateLightOff(state) {
    if (state.previousState != state.currentState) {
        // Animate light off
    }
};

light.onExit("LightOn", animateLightOff);

$("#switchUpButton").click(function() {
    light.next("switchUp"); // Causes light to be animated to off
});


```

### ``.onChange (handler)``

onChange is similar to onEntry but no specific binding is given so any state change will cause the handler to fire

```javascript
light.onChange(function(state) {
    // Highlight edge between state.previousState and state.currentState
});

light.next('switchDown'); // would highlight edge switchDown between LightOff and LightOn

```

### ``.onComplete(handler)``

This is called when the input is fully consumed, the input is considered fully consumed when .complete() is called.

```javascript
// Suppose a regexFSA
regexFSA.onComplete(function() {
    // Indicate the string is accepted or rejected
});

light.next("a");
light.next("b");
light.next("a");
light.complete(); // Indicate whether it was accepted by the fsa
```

### NFA Differences

All methods that work on DFAs work on NFAs it just happens that an NFA might return a list of states its current in instead of a single state e.g.:

```javascript
var fsa = new FSA.FSARunner({
    Start: 'Start',
    States: {
        Start: {
            transitions: {
                'x': ["A", "B"]
            }
        },
        A: {},
        B: {}
    }
});

fsa.state(); // "Start"
fsa.next('x');
fsa.state(); // ["A", "B"]
```

For methods .onEntry/.onExit we can only consider total matches e.g. if we have
the FSA from above:

```javascript

fsa.onEntry("A", function () {console.log("Hello")});
fsa.next('x'); // Displays nothing
fsa.state();   // ["A", "B"]

// --------------- Reset FSA --------------
fsa = new FSA.FSARunner(...); // Recreate above
fsa.onEntry(["A", "B"], function() {console.log("Hello")});
fsa.next('x'); // Displays Hello
```

instead we have `.onPartialEntry`/`onPartialExit` for that:

```javascript
fsa.onPartialEntry("A", function() {console.log("Hello")});
fsa.next('x'); // Displays Hello
fsa.state();

```
