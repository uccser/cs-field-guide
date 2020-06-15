"""
Tests the relative speeds of quicksort and selection sort.
The current output is human readable, but for large-scale experiments you will
want to modify it so that the output can be graphed
(e.g. generate CSV to put in a spreadsheet, or introduce a plotting library).
You should also consider generating special cases of lists, such as already-sorted lists
and reverse-sorted lists.
The following constants should be modified to run the experiments on a wider range of data:
NUMBER_OF_KEYS
NUMBER_OF_REPEATED_EXPERIMENTS

This is for Python version 2.7.
Tim Bell, August 2012
Modified by Courtney Bracefield, June 2020
"""

from random import shuffle
import time

# Each sorting method will be evaluated for lists of the following sizes
NUMBER_OF_KEYS = [10, 1000]
# The experiments will be repeated this many times
NUMBER_OF_REPEATED_EXPERIMENTS = 10


def selection_sort_count(sample_list):
    """
    Perform min selection sort on values in sample_list.

    Returns the number of comparisons required.
    """
    key_comparisons_made = 0
    for i in range(0, len(sample_list) - 1):
        min_position_so_far = i
        for j in range(i + 1, len(sample_list)):
            key_comparisons_made += 1
            if sample_list[j] < sample_list[min_position_so_far]:
                min_position_so_far = j
        temp = sample_list[min_position_so_far]
        sample_list[min_position_so_far] = sample_list[i]
        sample_list[i] = temp
    return key_comparisons_made


def quick_sort_count(sample_list):
    """
    Perform quicksort on values in sample_list.

    Return the number of comparisons required.
    Based on code from "Problem Solving with Algorithms and Data Structures"
    By Brad Miller and David Ranum, runestoneinteractive.org
    """
    return quicksort_partial_list(sample_list, 0, len(sample_list) - 1)


def quicksort_partial_list(sample_list, first, last):
    """Recursively quicksort sample_list between first and last inclusive."""
    comparisons = 0
    if first < last:
        partition_point = partition(sample_list, first, last)
        # partition compares one less than items in list
        comparisons += (last - first)
        left_comps = quicksort_partial_list(
            sample_list,
            first,
            partition_point - 1
        )
        right_comps = quicksort_partial_list(
            sample_list,
            partition_point + 1,
            last
        )
        comparisons += left_comps + right_comps
        return comparisons
    else:
        return 0  # no comparisons as sublist is empty


def partition(alist, first, last):
    """
    Partition alist into smaller and larger values.

    Returns pivot position.
    """
    pivot_value = alist[first]
    left_to_right, right_to_left = first + 1, last
    done = False
    while not done:
        while (left_to_right <= right_to_left and
                alist[left_to_right] <= pivot_value):
            left_to_right = left_to_right + 1
        while (alist[right_to_left] >= pivot_value and
                left_to_right <= right_to_left):
            right_to_left = right_to_left - 1
        if right_to_left < left_to_right:
            done = True
        else:
            temp = alist[left_to_right]
            alist[left_to_right] = alist[right_to_left]
            alist[right_to_left] = temp
    alist[first], alist[right_to_left] = alist[right_to_left], alist[first]
    return right_to_left


def test_selection_sort_count(n, show_list):
    """Measure the performance of selection sort on a random list."""
    sample_list = range(n)  # create a sorted list of n keys
    shuffle(sample_list)  # shuffle them
    print "\nSelection sorting", n, "keys"
    if show_list:
        print "Test list is", sample_list
    start = time.clock()
    key_comparisons_made = selection_sort_count(sample_list)
    end = time.clock()
    if show_list:
        print "Selection sort output is", sample_list

    result = "For selection sort of {} items, {} comparisons of keys were used"
    time_taken = "Time taken: {:.4f} milliseconds elapsed"
    print result.format(n, key_comparisons_made)
    print time_taken.format((end - start) * 1000)


def test_quick_sort_count(n, show_list):
    """Create a random list and measure the performance of quicksort on it."""
    sample_list = range(n)  # create a sorted list of n keys
    shuffle(sample_list)  # shuffle them
    print "\nQuick sorting", n, "keys"
    if show_list:
        print "Test list is", sample_list
    start = time.clock()
    key_comparisons_made = quick_sort_count(sample_list)
    end = time.clock()
    if show_list:
        print "Quicksort output is", sample_list
    result = "For quicksort of {} items, {} comparisons of keys were used"
    time_taken = "Time taken: {:.4f} milliseconds elapsed"
    print(result.format(n, key_comparisons_made))
    print(time_taken.format((end - start) * 1000))


# This is an example of how to run an experiment
# For thorough results, experiments should be run for a larger range of values
# and should experiments should be repeated multiple times
for number_of_keys in NUMBER_OF_KEYS:
    for repeat_of_experiment in range(NUMBER_OF_REPEATED_EXPERIMENTS):
        test_selection_sort_count(number_of_keys, False)
    for repeat_of_experiment in range(NUMBER_OF_REPEATED_EXPERIMENTS):
        test_quick_sort_count(number_of_keys, False)
