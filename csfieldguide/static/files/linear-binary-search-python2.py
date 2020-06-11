"""
These programs are provided to experiment with the relative speeds of
Linear Search and Binary Search, comparing two algorithms of size n.
This is for Python version 2.7.
Caitlin Duncan, January 2014
Modified by Courtney Bracefield, June 2020
"""

import time
from random import randint

NUMBER_OF_KEYS = [10, 1000]


def binary_search(list_of_keys, search_key):
    """Perform a Binary search and return the number of comparisons made."""
    length = len(list_of_keys)
    if length == 0:
        print "List of keys not found."
        return 0
    if length == 1:
        return 1

    num_key_comparisons = 0
    low = 0
    high = len(list_of_keys) - 1
    while low <= high: 
        middle = (low + high) / 2
        num_key_comparisons += 1
        if list_of_keys[middle] > search_key:
            high = middle - 1
        elif list_of_keys[middle] < search_key:
            low = middle + 1
            num_key_comparisons += 1
        else:
            # increment here because the previous comparison was unsuccessful
            num_key_comparisons += 1
            return num_key_comparisons
    return 0


def linear_search(list_of_keys, search_key):
    """Perform a Linear search and return the number of comparisons made."""
    length_of_list = len(list_of_keys)
    if length_of_list == 0:
        print "List of keys not found."
        return 0

    num_key_comparisons = 0
    search_key_index = 0
    while search_key_index < length_of_list:
        num_key_comparisons += 1
        if list_of_keys[search_key_index] == search_key:
            return num_key_comparisons
        search_key_index += 1

    return num_key_comparisons


def test_binary_search(n):
    """
    Perform a Binary search on a list of size n.

    Returns the number of key comparisons made and the time taken for the algorithm to run.
    """
    sample_list = range(n)  # create a sorted list of n keys
    item = randint(0, n - 1)

    print "\nBinary Searching for", item, "in a list of", n, "items"

    start = time.clock()
    comparisons_made = binary_search(sample_list, item)
    end = time.clock()

    print "For binary search of", n, "items,", comparisons_made, "comparisons of keys were used"
    print "Time taken: ", (end - start) * 1000, " miliseconds elapsed"


def test_linear_search(n):
    """
    Perform a Linear search on a list of size n.

    Returns the number of key comparisons made and the time taken for the algorithm to run.
    """
    sample_list = range(n)  # create a sorted list of n keys
    item = randint(0, n - 1)

    print "\nLinear Searching for", item, "in a list of", n, "items"

    start = time.clock()
    comparisons_made = linear_search(sample_list, item)
    end = time.clock()

    print "For linear search of", n, "items,", comparisons_made, "comparisons of keys were used"
    print "Time taken: ", (end - start) * 1000, " miliseconds elapsed"


# This is an example of how to run an experiment
# For thorough results, experiments should be run for a larger range of values
# and experiments should be repeated multiple times
for number_of_keys in NUMBER_OF_KEYS:
    for repeat_of_experiment in range(5):
        test_linear_search(number_of_keys)
    for repeat_of_experiment in range(5):
        test_binary_search(number_of_keys)
