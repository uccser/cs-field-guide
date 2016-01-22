### This is a set of functions for calculating error correction characters
    needed to correct a given number of errors
###

math = require('mathjs')

{geometricRandom} = require('./bigRand.coffee')

# Alias for bignumber
big = math.bignumber
# Bignumbers everywhere for simplicity
math.config
    number: 'bignumber'
    precision: 64

# ----------

binomialCoefficient = (n, k) ->
    ### Simply an approximation of n choose k ###
    [n, k] = [big(n), big(k)]

    console.assert n.gte(k), "k must be smaller or equal to n"

    over = math.factorial n
    under = math.factorial n.minus(k)
    result = over.div(under)
    return result

canCorrect = (messageLength, numErrors, correction=null) ->
    ### Returns true if we can correct numErrors with n correction bits/bytes
        on a given messageLength, all 3 should be in the same unit
        e.g. all 3 in bits, all 3 in bytes, etc
    ###
    correction ?= big(0)
    [ml, ne, cc] = [messageLength, numErrors, correction].map (a) -> big(a)
    if ne.eq(0)
        return true

    coeff = binomialCoefficient(ml.plus(cc), ne)
    return ne.plus(cc).gte(
        ne.plus(
            ne.plus(cc).plus(1).plus(coeff).log(2)
        )
    )

binaryPartitionSearch = (predicate, lower, upper, searchDepth=1024) ->
    ### Searches a range [lower, upper] up to searchDepth levels of recursion
        trying to find when the predicate is satisfied, this is to quickly
        solve inequalities
    ###
    lower = big(lower)
    upper = big(upper)
    if searchDepth is 0
        return upper
    else if lower.eq upper
        return upper
    else
        mid = lower.plus(upper).divToInt(2)
        if predicate(mid)
            return binaryPartitionSearch(predicate, lower, mid, searchDepth-1)
        else
            return binaryPartitionSearch(predicate, mid, upper, searchDepth-1)

fastSearch = (predicate, binarySearchDepth=1024) ->
    ### Searches all positive integers until minimum value
        for predicate is satisfied, starts by exponetially increasing upwards
        then when upper and lower bounds are found performs binary search
        e.g. fastSearch((x) -> x > 10) will double values of x until it finds
        the range [8, 16] then will apply binary search till it finds 10,
        returns NaN if predicate is not satisfied
    ###
    if predicate big(0)
        return big(0)

    lower = big(0)
    upper = big(1)

    until predicate(upper)
        lower = upper
        upper = upper.times(2)
    return binaryPartitionSearch(predicate, lower, upper, binarySearchDepth)

errorCorrection = (messageLength, numErrors=0) ->
    ### Returns how many units of error correction are needed to correct
        numErrors on a message with size of messageLength
        both messageLength and number of errors should be same units
        e.g. both bits, both bytes, etc
    ###
    return switch numErrors
        when 0 then 0
        else
            return fastSearch (correction) ->
                return canCorrect(messageLength, numErrors, correction)

exports = {
    errorCorrection
}
