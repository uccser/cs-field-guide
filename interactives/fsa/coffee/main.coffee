class ArrayMap
    ### NOTE: The methods on this class are O(array.length) time
        The space taken by this class is between
            O(no_keys*log(array.length) and O(no_keys*array.length)
        depending on how similar the prefixes of the keys are

        This maps arrays to values similar to ES6 maps e.g.
        map = new ArrayMap();
        map.set([1,2], 12);
        map.get([1,2]); // 12 even though [1,2] !== [1,2]
    ###
    constructor: (recursive=false) ->
        @size = 0
        @nodes = null # Set recursive structure to null to be more space
                      # efficient on the leaves
        @value = undefined
        @_hasValue = false

    clear: ->
        ### Removes all key/values from the ArrayMap ###
        @constructor() # Just reset all the values

    has: (key) ->
        ### Returns true if the key has an associated value
            (undefined from .get does not imply it wasn't set
        ###
        ## If the key is [] then base case and return 0
        if key.length is 0
            return @_hasValue
        else unless @nodes?
            return false
        else


    set: (array, value) ->
        ### Sets the value of array to value in the ArrayMap
            gives back the ArrayMap
        ###
        console?.assert?(
            array instanceof Array,
            "Array map can only use arrays for keys"
        )

        ## Increase size of map by 1 if we don't already have a value for
        ## the element
        unless @has(array)
            @size += 1

        ## Base case just return the value
        if array.length is 0
            @value = value
            @_hasValue = true
            return this

        ## If we need to go recursive ensure @nodes exists to store
        ## the tree structure
        unless @nodes?
            @nodes = new Map()

        ## Check if an ArrayMap already exists for the first element of
        ## the array
        if @nodes.has(array[0])
            ## If so just get the ArrayMap and set the value recursively
            @nodes.get(array[0]).set(array[1...], value)
        else
            ## Else create one, add it to @nodes and set it recursively
            newMap = new ArrayMap()
            @nodes.set(array[0], newMap)
            @nodes.get(array[0]).set(array[1...], value)

        return this

    get: (array) ->
        ### This returns the value associated with a given array
        ###
        console?.assert?(
            array instanceof Array,
            "Array map can only use arrays for keys"
        )
        ## Base case is we're at list []
        if array.length is 0
            return @value
        ## Else check if the first element of the array even exists
        ## returning undefined like es6 Maps if not
        else unless @nodes.has(array[0])
            return undefined
        ## Else recursively go down the tree until we find it
        else
            return @nodes.get(array[0]).get(array[1...])


class FSA
    constructor: (transitions, finalStates, startState='Start') ->
