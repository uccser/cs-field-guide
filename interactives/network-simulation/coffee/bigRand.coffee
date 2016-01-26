math = require('mathjs').create(number: 'bignumber', precision: 64)

random = ->
    ### Returns a random number returned as a bignumber ###
    return math.bignumber(math.random())

geometricRandom = (bernoulliProb) ->
    ### This picks a random number that is drawn from a geometric
        distribution using the formula from
        http://stackoverflow.com/questions/23517138/
            random-number-generator-using-geometric-distribution
    ###
    if math.equal(bernoulliProb, 1)
        return 1
    else
        return math.eval "ceil( log(1-r) / log(1 - p) )",
            r: random()
            p: bernoulliProb

exports = {
    random
    geometricRandom
}
