# These programs are provided to experiment with the relative speeds of
# Linear Search and Binary Search for AS91074 (1.44),
# comparing two algorithms of size n
# This is for Python version 2.7, but only the print statements should
# need changing to adapt it for version 3
# Caitlin Duncan, January 2014

import time
from random import randint


def binary_search(array, item):
    # Performs a Binary search and returns the number
    # of comparisons made
    length = len(array)
    if length == 0:
        print "Error: Array is empty"
        return 0
    if length == 1:
        return 1

    count = 0
    while length > 0:
        count += 1
        middle = int(length / 2)

        if array[middle] == item:
            return count
        elif array[middle] > item:
            array = array[:middle]
        else:
            array = array[(middle+1):]

        length = len(array)

    return 0


def linear_search(array, item):
    # Performs a Binary search and returns the number
    # of comparisons made
    length = len(array)
    if length == 0:
        print "Error: Array is empty"
        return 0

    count = 0
    while count < length:
        if array[count] == item:
            count += 1
            return count

        count += 1

    return count


def test_binary(n):
    sample_list = range(n)  # create n keys in ascending order
    item = randint(0, n)

    print "\nBinary Searching for", item, "in a list of", n, "items"

    start = time.clock()
    comparisons_made = binary_search(sample_list, item)
    end = time.clock()

    print "For binary search of", n, "items,", comparisons_made, "comparisons of keys were used"
    print "Time taken: ", (end - start) * 1000, " miliseconds elapsed"


def test_linear(n):
    sample_list = range(n)  # create n keys in order
    item = randint(0, n)

    print "\nLinear Searching for", item, "in a list of", n, "items"

    start = time.clock()
    comparisons_made = linear_search(sample_list, item)
    end = time.clock()

    print "For linear search of", n, "items,", comparisons_made, "comparisons of keys were used"
    print "Time taken: ", (end - start) * 1000, " miliseconds elapsed"


# This is an example of how to run an experiment
# For thorough results, experiments should be run for a larger range of values
# and experiments should be repeated multiple times
for number_of_keys in [10, 20, 50, 100, 1000]:
    for repeat_of_experiment in range(5):
        test_linear(number_of_keys)
    for repeat_of_experiment in range(5):
        test_binary(number_of_keys)
