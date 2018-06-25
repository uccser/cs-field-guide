# These programs are provided to experiment with the relative speeds of
# quicksort and selection sort for AS91074 (1.44),
# comparing two algorithms of size n
# This is for Python version 2.7, but only the print statements should
# need changing to adapt it for version 3
# Tim Bell, August 2012

from random import shuffle
import time


def test_selection_sort(n, show_list):
    '''Create a random list and measure the performance of selection sort on it'''
    sample_list = range(n)  # create n keys
    shuffle(sample_list)  # shuffle them
    print "Selection sorting", n, "keys"
    if show_list:
        print "Test list is", sample_list
    start = time.clock()
    comparisons_made = selection_sort(sample_list)
    end = time.clock()
    if show_list:
        print "Selection sort output is", sample_list
    print "For selection sort of", n, "keys,", comparisons_made, "comparisons of keys were used"
    print "Time taken: ", (end - start)*1000, " milliseconds elapsed"


def selection_sort(sample_list):
    '''Perform min selection sort on values in sample_list and
    return the number of comparisons required'''
    comparisons_made = 0
    for i in range(0, len(sample_list)-1):
        min_position_so_far = i
        for j in range(i+1, len(sample_list)):
            comparisons_made += 1
            if sample_list[j] < sample_list[min_position_so_far]:
                min_position_so_far = j
        sample_list[min_position_so_far], sample_list[i] = sample_list[i], sample_list[min_position_so_far]
    return comparisons_made


def test_quick_sort(n, show_list):
    '''Create a random list and measure the performance of quicksort on it'''
    sample_list = range(n)  # create n keys
    shuffle(sample_list)  # shuffle them
    print "\nQuick sorting", n, "keys"
    if show_list:
        print "Test list is", sample_list
    start = time.clock()
    comparisons_made = quick_sort(sample_list)
    end = time.clock()
    if show_list:
        print "Quicksort output is", sample_list
    print "For quicksort of", n, "keys,", comparisons_made, "comparisons of keys were used"
    print "Time taken: ", (end - start)*1000, " milliseconds elapsed"


def quick_sort(sample_list):
    '''Perform quicksort on values in sample_list and
    return the number of comparisons required'''
    # Based on code from "Problem Solving with Algorithms and Data Structures"
    # By Brad Miller and David Ranum, runestoneinteractive.org
    return quicksort_partial_list(sample_list, 0, len(sample_list)-1)


def quicksort_partial_list(sample_list, first, last):
    '''Recursively quicksort sample_list between first and last inclusive'''
    comparisons = 0
    if first < last:
        partition_point = partition(sample_list, first, last)
        comparisons += (last - first)  # partition compares one less than items in list
        left_comps = quicksort_partial_list(sample_list, first, partition_point-1)
        right_comps = quicksort_partial_list(sample_list, partition_point+1, last)
        comparisons += left_comps + right_comps
        return comparisons
    else:
        return 0  # no comparisons as sublist is empty


def partition(alist, first, last):
    '''Partition alist into smaller and larger values,
    returns pivot position'''
    pivotvalue = alist[first]
    left_to_right, right_to_left = first + 1, last
    done = False
    while not done:
        while left_to_right <= right_to_left and alist[left_to_right] <= pivotvalue:
            left_to_right = left_to_right + 1
        while alist[right_to_left] >= pivotvalue and left_to_right <= right_to_left:
            right_to_left = right_to_left - 1
        if right_to_left < left_to_right:
            done = True
        else:
            alist[left_to_right], alist[right_to_left] = alist[right_to_left], alist[left_to_right]
    alist[first], alist[right_to_left] = alist[right_to_left], alist[first]
    return right_to_left


# This is an example of how to run an experiment
# For thorough results, experiments should be run for a larger range of values
for number_of_keys in [10, 20, 50, 100, 1000]:
    for repeat_of_experiment in range(3):
        test_selection_sort(number_of_keys, False)
        test_quick_sort(number_of_keys, False)
