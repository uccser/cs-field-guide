# Best, Worst, and Average Case Complexity

## Complexity

{glossary-link term="complexity" reference-text="problems and algorithms"}Complexity{glossary-link end} is an important concept with problems and algorithms that solve them.
Usually complexity is just the amount of time it takes to solve a problem, but there are several ways that we can measure the "time".
Using the actual time on a particular computer can be useful, but to get a rough idea of the inherent behaviour of an algorithm, computer scientists often start by estimating the number of steps the algorithm will take for \(n\) items.
For example, a linear search can end up checking each of \(n\) items being searched, so the algorithm will take \(n\) steps.
An algorithm that compares every pair of values in a list of \(n\) items will have to make \( n^2 \) comparisons, so we can characterise it as taking about \( n^2 \) steps.
This gives us a lot of information about how good an algorithm is without going into details of which computer it was running on, which language, and how well written the program was.
The term *complexity* is generally used to refer to these rough measures.

Having a rough idea of the complexity of a problem helps you to estimate how long it's likely to take.
For example, if you write a program and run it with a simple input, but it doesn't finish after 10 minutes, should you quit, or is it about to finish?
It's better if you can estimate the number of steps it needs to make, and then {glossary-link term="extrapolation"}extrapolate{glossary-link end} from the time it takes other programs to find related solutions.


If you've studied algorithms, you will have learnt that some sorting algorithms, such as mergesort and quicksort, are inherently faster than other algorithms, such as insertion sort, selection sort, or bubble sort.
It’s obviously better to use the faster ones.
The first two have a complexity of \( nlog n \) time (that is, the number of steps they take is roughly proportional to \( nlogn \)), whereas the last three have complexity of \( n^2 \).
Generally the consequence of using the wrong sorting algorithm will be that a user has to wait many minutes (or perhaps hours) rather than a few seconds or minutes.

Here we're going to consider another possible sorting algorithm, called *permutation sort*.
Permutation sort says "Let’s list all the possible orderings ({glossary-link term="permutation"}permutations{glossary-link end}) of the values to be sorted, and check each one to see if it is sorted, until the sorted order is found".
This algorithm is straightforward to describe, but is it any good?

{panel type="teacher-note"}

# Permutation sort is no good in practice!

Note that permutation sort is *not* a reasonable way to sort at all; it's just an idea to help us think about tractability.
It should be obvious to students fairly quickly that it's grossly inefficient.
The main thing is that is does produce the correct result, so it's an extreme example of an algorithm that works correctly, yet is way too inefficient (intractable) to be useful.

{panel end}

For example, if you are sorting the numbers 45, 21 and 84, then every possible order they can be put in (that is, all permutations) would be listed as:

45, 21, 84

45, 84, 21

21, 45, 84

21, 84, 45

84, 21, 45

84, 45, 21

Going through the above list, the only line that is in order is 21, 45, 84, so that's the solution.
It's a very inefficient approach, but it will help to illustrate what we mean by tractability.

In order to understand how this works, and the implications, choose four different words (in the example below we have used colours) and list all the possible orderings of the four words.
Each word should appear exactly once in each ordering.
You can either do this yourself, or use an online permutation generator such as [Text Mechanic](http://textmechanic.com/Permutation-Generator.html).

{comment build the permutation generator into the page}

For example if you had picked red, blue, green, and yellow, the first few orderings could be:

red, blue, green, yellow
red, blue, yellow, green
red, yellow, blue, green
red, yellow, green, blue

They do not need to be in any particular order, although a systematic approach is recommended to ensure you don’t forget any!

{panel type="teacher-note"}

# Solution

For four different words, there will be 4x3x2x1 = 24 different orders for them.
For example, there are 6 starting with "red", 6 starting with "blue", and so on.

{panel end}

Once your list of permutations is complete, search down the list for the one that has the words sorted in alphabetical order.
The process you have just completed is using permutation sort to sort the words.

Now add another word.
How many possible orderings will there be with 5 words?
What about with only 2 or 3 words &ndash; how many orderings are there for those?
If you gave up on writing out all the orderings with 5 words, can you now figure out how many there might be?
Can you find a pattern?
How many do you think there might be for 10 words?
(You don’t have to write them all out!)

{panel type="teacher-note"}

# Solution

The number of orderings (permutations) for \( n \) words is the factorial of n; this is explained below, but basically there are \( n \) choices for the first word, n-1 for the next, and so on.
For example, for 15 words, there are 15 x 14 x 13 x 12 x ... x 1 permutations, which is 1,307,674,368,000.
It's a big number!

The factorial of a number can be calculated using a spreadsheet (in Excel the formula for \( 15! \) is =FACT(15).
A lot of calculators have a factorial button ("!").
You can even type \( 15! \) into a Google search and get the answer.
However, for dealing with very large numbers, the field guide has a simple calculator that can work with huge numbers; it is in the text below, or you can open it here:

{interactive slug="big-number-calculator" type="whole-page" text="Big Number Calculator"}

For the above questions, the number of permutations are:

- 5 words: 120 permutations
- 2 words: 2 permutations (just the original two values and the reverse)
- 3 words: 6 permutations
- 10 words: 3,628,800 permutations

{panel end}

If you didn’t find the pattern for the number of orderings, think about using factorials.
For 3 words, there are \( 3! \) ("3 factorial") orderings.
For 5 words, there are \( 5! \) orderings.
Check the jargon buster below if you don’t know what a "factorial" is, or if you have forgotten!

{panel type="jargon-buster"}

# Factorials

Factorials are very easy to calculate; just multiply together all the integers from the number down to 1.
For example, to calculate \( 5! \) you would simply multiply: 5 x 4 x 3 x 2 x 1 = 120.
For \( 8! \) you would simply multiply 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1 = 40,320.

As stated above, the factorial of a number tells you how many permutations (orderings) there would be for that number of words (assuming they are all different).
This means that if you are arranging 8 words, there will be 40,320 ways of arranging them (which is why you weren’t asked to try this in the first exercise!!)

Your calculator may have a "!" button for calculating factorials and spreadsheets usually have a "FACT" function, although for the factorials under 10 in this section, we recommend that you calculate them the long way, and then use the calculator as a double check.
Ensuring you understand how a factorial is calculated is essential for understanding the rest of this section!

{panel end}

For factorials of larger numbers, most desktop calculators won't work so well; for example, \( 100! \) has 158 digits.
You can use the calculator below to work with huge numbers (especially when using factorials and exponents).

{interactive slug="big-number-calculator" type="whole-page" text="Big Number Calculator"}

Try calculating \( 100! \) using this calculator &ndash; that's the number of different routes that a travelling salesman might take to visit 100 places (not counting the starting place).
With this calculator you can copy and paste the result back into the input if you want to do further calculations on the number.

There are other big number calculators available online; for example, the [Big Integer Calculator](http://www.javascripter.net/math/calculators/100digitbigintcalculator.htm).
Or you could look for one to download for a desktop machine or smartphone.

As a final exercise on permutation sort, calculate how long a computer would take to use permutation sort to sort 100 numbers.
Remember that you can use the calculator that was linked to above.
Assume that you don’t have to worry about how long it will take to generate the permutations, only how long it will take to check them.
Assume that you have a computer that creates and checks an ordering every nanosecond.

- How many orderings need to be checked for sorting 100 numbers?
- How many orderings can be checked in a second?
- How many orderings can be checked in a year?
- How many years will checking all the orderings take?

{panel type="teacher-note"}

# Solution

The number of orderings for 100 numbers is \( 100! \), which is 93,326,215,443,944,152,681,699,238,856,266,700,490,715,968,264,381,621,468,592,963,895,217,599,993,229,915,608,941,463,976,156,518,286,253,697,920,827,223,758,251,185,210,916,864,000,000,000,000,000,000,000,000 permutations.

A nanosecond is 1/1,000,000,000 of a second, so the suggested system can check a billion orderings per second.

There are 60x60x24x365 seconds in a non-leap year, which is 31,536,000, so the proposed system could check 31,536,000 *billion* orderings in a year, so dividing 100! by this number, we get 2,959,354,878,359,467,043,432,877,944,452,901,461,527,015,736,440,310,168,334,378,611,593,658,041,388,569,114,946,139,776,006,992,588,985,721,014,739,574,573,764,941,185,024,000,000,000,000 years.
That's an inconceivable amount of time, just to sort 100 values.
This algorithm really is intractable!

{panel end}

And as an interesting thing to think about, do some calculations based on the assumptions listed below.
How long would it take to use permutation sort on 100 numbers?
What would happen first: the algorithm would finish, or the universe would end?

- There are \( 10^{82} \) atoms in the universe
- The universe has another 14 billion years before it ends
- Suppose every atom in the universe is a computer that can check an ordering every nanosecond

{panel type="teacher-note"}

# Solution

In the above example, the universe would end before the 100 numbers have been sorted!

{panel end}

{comment put in the calcuations for teachers (and check my ones in the previous teacher note!) I had to use two calculators, one for !, and this one because it can have values pasted in: https://defuse.ca/big-number-calculator.htm}

By now, you should be very aware of the point that is being made.
Permutation sort is so inefficient that sorting 100 numbers with it takes so long that it is essentially impossible.
Trying to use permutation sort with a non trivial number of values simply won’t work.
While selection sort is a lot slower than quicksort or mergesort, it wouldn’t be impossible for a social network site to use selection sort to sort a list of 1 billion users.
It would take a lot longer than quicksort would, but it would be doable.
Permutation sort on the other hand would be impossible to use!

At this point, we need to now distinguish between algorithms that are essentially usable, and algorithms that will take billions of year to finish running, even with a small input such as 100 values.

Computer scientists call an algorithm "intractable" if it would take a completely unreasonable amount of time to run on reasonably sized inputs.
Permutation sort is a good example of an intractable algorithm.
The term "intractable" is used a bit more formally in computer science; it's explained in the next section.

But the *problem* of sorting items into order is not intractable &ndash; even though the permutation sort algorithm is intractable, there are lots of other efficient and not-so-efficient algorithms that you could use to solve a sorting problem in a reasonable amount of time: quicksort, mergesort, selection sort, even bubble sort!
However, there are some problems in which the ONLY known algorithm is one of these intractable ones.
Problems in this category are known as *intractable problems*.

{panel type="curiosity"}

# Towers of Hanoi

The Towers of Hanoi problem is a challenge where you have a stack of disks of increasing size on one peg, and two empty pegs.
The challenge is to move all the disks from one peg to another, but you may not put a larger disk on top of a smaller one.
There's a description of it at [Wikipedia](https://en.wikipedia.org/wiki/Tower_of_Hanoi).

This problem cannot be solved in fewer than \( 2^n - 1 \) moves, so it's an intractable problem (a computer program that lists all the moves to make would use at least \( 2^n - 1 \) steps).
For 6 disks it only needs 63 moves, but for 50 disks this would be 1,125,899,906,842,623 moves.

We usually characterise a problem like this as having a complexity of \( 2^n \), as subtracting one to get a precise value makes almost no difference, and the shorter expression is simpler to communicate to others.

The Towers of Hanoi is one problem where we know for sure that it will take exponential time.
There are many intractable problems where this isn't the case &ndash; we don't have tractable solutions for them, but we don't know for sure if they don't exist.
Plus this isn't a real problem &ndash; it's just a game (although there is a backup system based on it).
But it is a nice example of an exponential time algorithm, where adding one disk will double the number of steps required to produce a solution.

{panel end}

{comment mention the myth(s) of Hanoi (for fun, in a later version of the guide}

## Complexity Cases

Complexity is usually measured in the number of steps an algorithm takes, rather than the amount of time, since the time depends on what kind of computer you run it on.
Complexity for an algorithm is often separated into best, average and worst case.

For example, the Python “in” function applied to a list does a sequential search by checking each value in sequence until it either finds the value wanted, or gets to the end of the list.
The three complexity cases for this are:

- Best case, when the value being searched for is first in the list e.g. 45 in [45, 32, 52]

This only takes one step - the value 45 is compared with the first 45 in the list, and the algorithm stops.
You’re probably thinking that the best case is a bit optimistic, and it is!
If there were a million items in the list, there’s only one chance in a million that the best case will happen.
The best case is not very useful in this situation, but for some algorithms their best case is terrible, in which as it’s not even worth worrying about the other cases.

- Worst case, when the value being searched for is last in the list e.g. 52 in [45, 32, 52]

This example will take 3 comparisons, and you can’t do worse than that.
If there were a million items in the list, it would take a million steps, and you need to be aware that there’s this possibility that it might occasionally take that long (which would really annoy the person waiting for it.)
It seems pessimistic, but it’s useful to know that it might happen sometimes, and if that’s not acceptable, you’d look for a different algorithm.

- Average case, which is what happens averaged over lots of searches.

Sometimes the value will be near the start of the list, and sometimes near the end, but on average the algorithm will go about halfway through the list.
If the list has a million values in it, then on average it will take about half a million steps.
This is a realistic view of the algorithm’s performance.

For a simple algorithm like the sequential search that we’ve been using as an example, it’s fairly easy to work out every single step that will occur.
However, this is usually more detail than is needed, and so in the next section we will look at a less precise, but still very useful, way to measure complexity of an algorithm, sometimes referred to as “big-o” notation.
