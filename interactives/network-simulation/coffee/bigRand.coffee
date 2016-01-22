math = require('mathjs')

math.config
    number: 'bignumber'
    precision: 64

random = ->
    ### Returns a random number returned as a bignumber ###
    return math.bignumber(math.random())

geometricRandom = (bernoulliProb) ->
    ### This picks a random number that is drawn from a geometric
        distribution using the formula from
        http://stackoverflow.com/questions/23517138/
            random-number-generator-using-geometric-distribution
    ###
    if math.bignumber(bernoulliProb).eq(1)
        return 1
    else
        return math.ceil(
            math.log(1 - random()) / math.log(math.subtract(1, bernoulliProb))
        )

exports = {
    random
    geometricRandom
}
