"""
Test the relative speeds of linear search and binary search.

This is for Python version 2.7.
Caitlin Duncan, January 2014
Modified by Courtney Bracefield, June 2020
"""

import time
from random import randint

NUMBER_OF_KEYS = [10, 1000]


def binary_search(list_of_keys, search_key):
    """
    Perform a Binary search and return the number of comparisons made.

    Based on code from:
    http://rosettacode.org/wiki/Binary_search#Python:_Iterative
    """
    length = len(list_of_keys)
    if length == 0:
        print "List of keys not found."
        return 0
    if length == 1:
        return 1

    key_comparisons_made = 0
    low = 0
    high = len(list_of_keys) - 1
    while low <= high:
        middle = (low + high) / 2
        key_comparisons_made += 1
        if list_of_keys[middle] > search_key:
            high = middle - 1
        elif list_of_keys[middle] < search_key:
            low = middle + 1
            key_comparisons_made += 1
        else:
            # increment here because the previous comparison was unsuccessful
            key_comparisons_made += 1
            return key_comparisons_made
    return 0


def linear_search(list_of_keys, search_key):
    """Perform a Linear search and return the number of comparisons made."""
    length_of_list = len(list_of_keys)
    if length_of_list == 0:
        print "List of keys not found."
        return 0

    key_comparisons_made = 0
    search_key_index = 0
    while search_key_index < length_of_list:
        key_comparisons_made += 1
        if list_of_keys[search_key_index] == search_key:
            return key_comparisons_made
        search_key_index += 1

    return key_comparisons_made


def test_binary_search(n):
    """
    Perform a Binary search on a list of size n.

    Returns the number of key comparisons made and
    the time taken for the algorithm to run.
    """
    sample_list = range(n)  # create a sorted list of n keys
    item = randint(0, n - 1)

    print "\nBinary Searching for", item, "in a list of", n, "items"

    start = time.clock()
    key_comparisons_made = binary_search(sample_list, item)
    end = time.clock()

    result = "For binary search of {} items, {} comparisons of keys were used"
    time_taken = "Time taken: {:.4f} milliseconds elapsed"
    print result.format(n, key_comparisons_made)
    print time_taken.format((end - start) * 1000)


def test_linear_search(n):
    """
    Perform a Linear search on a list of size n.

    Returns the number of key comparisons made and
    the time taken for the algorithm to run.
    """
    sample_list = range(n)  # create a sorted list of n keys
    item = randint(0, n - 1)

    print "\nLinear Searching for", item, "in a list of", n, "items"

    start = time.clock()
    key_comparisons_made = linear_search(sample_list, item)
    end = time.clock()

    result = "For linear search of {} items, {} comparisons of keys were used"
    time_taken = "Time taken: {:.4f} milliseconds elapsed"
    print result.format(n, key_comparisons_made)
    print time_taken.format((end - start) * 1000)


# This is an example of how to run an experiment
# For thorough results, experiments should be run for a larger range of values
# and experiments should be repeated multiple times
for number_of_keys in NUMBER_OF_KEYS:
    for repeat_of_experiment in range(5):
        test_linear_search(number_of_keys)
    for repeat_of_experiment in range(5):
        test_binary_search(number_of_keys)
