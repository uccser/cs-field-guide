/**
 * A special implementation of Heap's Algorithm for generating permutations of objects.
 * 
 * Each permutation is returned as it is found. This is preferred as the number of permutations
 * found grows exponentially with the size of the array.
 * 
 * Function and variables are based on the non-recursive format defined here:
 * https://en.wikipedia.org/wiki/Heap%27s_algorithm
 */

var static_n;
var static_A;
var static_c;
var static_i;

/**
 * Swap elements at the ith and jth indexes with each other and return.
 */
function swap(A, i, j) {
    [A[i], A[j]] = [A[j], A[i]];
    return A;
}

/**
 * Prepares for this implementation of Heap's Algorithm, with the given n and array A
 */
function initHeapsAlgorithm(A) {
    static_n = A.length;
    static_A = A;
    static_c = new Array(A.length).fill(0);
    static_i = 0;
}

/**
 * Returns the next permutation of the array (previously initialised) found.
 * If there are none left to find, returns false.
 */
function getNextPermutation() {
    while (static_i < static_n) {
        if (static_c[static_i] < static_i) {
            if (static_i % 2 == 0) {
                // i is even
                swap(static_A, 0, static_i);
            } else {
                swap(static_A, static_c[static_i], static_i)
            }
            // Simulate incrementing the for-loop counter
            static_c[static_i]++;
            // Simulate recursive call reaching the base case
            static_i = 0;
            if (static_A[0] <= static_A[static_n-1]) {
                // The next permutation has been found, so return it and stop processing
                return static_A;
            }
        } else {
            // Reset the state and simulate popping the stack by incrementing the pointer.
            static_c[static_i] = 0;
            static_i++;
        }
    }
    // If the while loop exits, all permutations have already been found
    return false;
}

module.exports = {
    initHeapsAlgorithm,
    getNextPermutation
}
