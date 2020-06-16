"""
Tests the relative speeds of linear search and binary search.
The current output is human readable, but for large-scale experiments you will
want to modify it so that the output can be graphed
(e.g. generate CSV to put in a spreadsheet, or introduce a plotting library).

The following constants should be modified to run the experiments on a wider range of data:
NUMBER_OF_KEYS
NUMBER_OF_REPEATED_EXPERIMENTS

This is for Python version 3.
Caitlin Duncan, January 2014
Modified by Courtney Bracefield, June 2020
"""

import time
from random import randint

# Each searching method will be evaluated for lists of the following sizes
NUMBER_OF_KEYS = [10, 1000]
# The experiments will be repeated this many times
NUMBER_OF_REPEATED_EXPERIMENTS = 10


def binary_search_count(list_of_keys, search_key):
    """
    Perform a Binary search and return the number of comparisons required.

    Based on code from:
    http://rosettacode.org/wiki/Binary_search#Python:_Iterative
    """
    length = len(list_of_keys)
    if length == 0:
        print("List of keys not found.")
        return 0
    if length == 1:
        return 1

    key_comparisons_made = 0
    low = 0
    high = len(list_of_keys) - 1
    while low <= high:
        middle = (low + high) // 2
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


def linear_search_count(list_of_keys, search_key):
    """Perform a Linear search and return the number of comparisons required."""
    length_of_list = len(list_of_keys)
    if length_of_list == 0:
        print("List of keys not found.")
        return 0

    key_comparisons_made = 0
    search_key_index = 0
    while search_key_index < length_of_list:
        key_comparisons_made += 1
        if list_of_keys[search_key_index] == search_key:
            return key_comparisons_made
        search_key_index += 1

    return key_comparisons_made


def test_binary_search_count(n):
    """
    Perform a Binary search on a list of size n.

    Returns the number of key comparisons made and
    the time taken for the algorithm to run.
    """
    sample_list = list(range(n))  # create a sorted list of n keys
    search_key = randint(0, n - 1)

    print("\nBinary Searching for", search_key, "in a list of", n, "items")

    start = time.time()
    key_comparisons_made = binary_search_count(sample_list, search_key)
    end = time.time()

    result = "For binary search of {} items, {} comparisons of keys were used"
    time_taken = "Time taken: {:.4f} milliseconds elapsed"
    print(result.format(n, key_comparisons_made))
    print(time_taken.format((end - start) * 1000))


def test_linear_search_count(n):
    """
    Perform a Linear search on a list of size n.

    Returns the number of key comparisons made and
    the time taken for the algorithm to run.
    """
    sample_list = list(range(n))  # create a sorted list of n keys
    search_key = randint(0, n - 1)

    print("\nLinear Searching for", search_key, "in a list of", n, "items")

    start = time.time()
    key_comparisons_made = linear_search_count(sample_list, search_key)
    end = time.time()

    result = "For linear search of {} items, {} comparisons of keys were used"
    time_taken = "Time taken: {:.4f} milliseconds elapsed"
    print(result.format(n, key_comparisons_made))
    print(time_taken.format((end - start) * 1000))


# This is an example of how to run an experiment
# For thorough results, experiments should be run for a larger range of values
# and should experiments should be repeated multiple times
for number_of_keys in NUMBER_OF_KEYS:
    for repeat_of_experiment in range(NUMBER_OF_REPEATED_EXPERIMENTS):
        test_linear_search_count(number_of_keys)
    for repeat_of_experiment in range(NUMBER_OF_REPEATED_EXPERIMENTS):
        test_binary_search_count(number_of_keys)
