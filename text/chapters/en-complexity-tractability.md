#Complexity and tractability

{panel type="teacher-note" summary="Large numbers ahead!"}
This chapter deals a lot with very large numbers and especially the problem of exponential explosion of time taken. There are a number of resources around that illustrate these concepts. The video [The Power of Exponentials, Big and Small](http://blossoms.mit.edu/videos/lessons/power_exponentials_big_and_small) from MIT is downloadable, and illustrates exponential growth with some humorous examples.
{panel end}

## What's the big picture?

{comment}

.. xtcb - consider using this somewhere: David Harel earlier in the year about algorithms, and he made the point that getting students to plot running times on a log-log graph can be useful because polynomial time algorithms form a straight line, but exponential don't.

{comment end}

Are there problems that are too hard even for computers?  It turns out that there are.  In the chapter on Artificial Intelligence we'll see that just having a conversation --- chatting --- is something computers can't do well, not because they can't speak but rather because they can't understand or think of sensible things to say. However, that’s not the kind of hard problem we’re talking about here --- it's not that computers couldn’t have conversations, more that we don't know just how we do it ourselves and so we can't tell the computer what to do.  

In this chapter we're going to look at problems where it's easy to tell the computer what to do --- by writing a program --- but the computer *can’t* do what we want because it takes far too long: millions of centuries, perhaps.  Not much good buying a faster computer either: if it were a hundred times faster it would still take millions of years; even one a million times faster would take hundreds of years.  That's what you call a *hard* problem --- one where it takes far longer than the lifetime of the fastest computer imaginable to come up with a solution!

The area of *tractability* explores problems and algorithms that can take an impossible amount of computation to solve except perhaps for very small examples of the problem.

{glossary-definition term="Tractable" definition="A *tractable* problem is one that can be solved in a reasonable amount of time; usually the distinction between tractable and intractable is drawn at the boundary between problems that can be solved in an amount of time that is polynomial; those that require exponential time are regarded as intractable."}
We'll define what we mean by {glossary-link term="tractable" reference-text="complexity and tractability chapter"}tractable{glossary-link end} later on, but put very crudely, a tractable problem is one which we can write programs for that finish in a reasonable amount of time, and an intractable problem is one that will generally end up taking way too long.

Knowing when a problem you are trying to solve is one of these hard problems is very important.
Otherwise it is easy to waste huge amounts of time trying to invent a clever program to solve it, and never getting anywhere.  A computer scientist needs to be able to recognise a problem as an intractable problem, so that they can use other approaches.  A very common approach is to give up on getting a perfect answer, and instead just aim for an approximately correct answer.  There are a variety of techniques for getting good approximate answers to hard problems; a way of getting an answer that isn't guaranteed to give the exact correct answer is sometimes referred to as a *heuristic*.

One important example of an intractable problem that this chapter looks at is the travelling salesman problem (TSP for short).
It's a simple problem; if you've got a collection of places that you need to visit, and you know the distance to travel between each pair of places, what's the shortest route that visits all of the places exactly once?
This is a very practical problem that comes up with courier vehicles choosing routes to deliver parcels, rock bands planning tours, and even a designated driver dropping friends off after an event.
In fact, the measurement between cities doesn’t have to be distance. It could actually be the dollar cost to travel between each pair of cities. For example, if you needed to visit Queenstown, Christchurch, Auckland, and Wellington one after the other while minimising airfares and you knew the cost of an airfare between each pair of those 4 cities, you could work out what the cheapest way of flying to each of them is. This is still an example of TSP.
And it can also be applied to problems that don't involve travel; for example, it has been used to [work out how to efficiently synthesise DNA](http://www.i-programmer.info/news/181/9340.html).

The following interactive has a program that solves the problem for however many cities you want to select by trying out all possible routes, and recording the best so far.  You can get a feel for what an intractable problem looks like by seeing how long the interactive takes to solve the problem for different size maps.
Try generating a map with about 5 cities, and press "Start" to solve the problem.

{button link="http://www.csfieldguide.org.nz/_static/widgets/tract-tsp-basic-v2.html" text="View city trip interactive"}

Now try it for 10 cities (twice as many). Does it take twice as long? How about twice as many again (20 cities)? What about 50 cities? Can you guess how long it would take?
You're starting to get a feel for what it means for a problem to be *intractable*.

Of course, for some situations, intractable problems are a good thing.
In particular, most security and cryptography algorithms are based on intractable problems; the codes could be broken, but it would take billions of years and so would be futile.
In fact, if anyone ever finds a fast algorithm for solving such problems, a lot of computer security systems would stop being secure overnight!
So one of the jobs of computer scientists is to be confident that such solutions *don't* exist!

In this chapter we will look at the TSP and other problems for which *no* tractable solutions are known, problems that would take computers millions of centuries to solve.  And we will encounter what is surely the greatest mystery in computer science today: that *no-one knows* whether there's a more efficient way of solving these problems!  It may be just that no-one has come up with a good way yet, or it may be that there is no good way.  We don't know which.  

{image filename="xkcd-np-complete-cartoon.png" alt="A xkcd comic about NP complete" source="http://xkcd.com/287/"}

But let's start with a familiar problem that we can actually solve.

## Algorithms, problems, and speed limits

{comment}

.. [put this in when the algorithms chapter is available] It is recommended that you work through the chapter on algorithms first if you aren’t familiar with the idea of the complexity of an algorithm, or sorting algorithms. The ideas in this chapter build on the chapter on algorithms.

{comment end}

{comment}

.. note that complexity will have been explained in the algorithms chapter when that's available, and some of this could be changed to refer back to it once that chapter is done

.. xTCB consider making Complexity a section rather than a jargon buster

{comment end}

[Complexity](glossary.html#complexity) is an important concept with problems and algorithms that solve them.
Usually complexity is just the amount of time it takes to solve a problem, but there are several ways that we can measure the "time".
Using the actual time on a particular computer can be useful, but to get a rough idea of the inherent behaviour of an algorithm, computer scientists often start by estimating the number of steps the algorithm will take for *n* items.
For example, a linear search can end up checking each of *n* items being searched, so the algorithm will take *n* steps.
An algorithm that compares every pair of values in a list of *n* items will have to make {math}n^2{math end} comparisons, so we can characterise it as taking about {math}n^2{math end} steps.
This gives us a lot of information about how good an algorithm is without going into details of which computer it was running on, which language, and how well written the program was.
The term *complexity* is generally used to refer to these rough measures.

Having a rough idea of the complexity of a problem helps you to estimate how long it's likely to take. For example, if you write a program and run it with a simple input, but it doesn't finish after 10 minutes, should you quit, or is it about to finish? It's better if you can estimate the number of steps it needs to make, and then extrapolate from the time it takes other programs to find related solutions.

{comment}

.. If the paragraphs above turned into a section, then the following ones should stay in a box - they are going somewhat further than is necessary.

{comment end}

{panel type="jargon-buster" summary="Asymptotic complexity"}

If you're reading about complexity, you may come across some terminology like "Big Oh" notation and "asymptotic complexity", where an algorithm that takes about {math}n^2{math end} steps is referred to as {math}O(n^2){math end}. We won't get into these in this chapter, but here's a little information in case you come across the terms in other reading.
"Big Oh" notation is a precise way to talk about complexity, and is used with "asymptotic complexity", which simply means how an algorithm performs for large values of *n*. The "asymptotic" part means as *n* gets really large --- when this happens, you are less worried about small details of the running time. If an algorithm is going to take seven days to complete, it's not that interesting to find out that it's actually 7 days, 1 hour, 3 minutes and 4.33 seconds, and it's not worth wasting time to work it out precisely.

We won't use precise notation for asymptotic complexity (which says which parts of speed calculations you can safely ignore), but we will make rough estimates of the number of operations that an algorithm will go through. There's no need to get too hung up on precision since computer scientists are comfortable with a simple characterisation that gives a ballpark indication of speed.

For example, consider using selection sort to put a list of *n* values into increasing order.
(This is explained in the chapter on algorithms).
Suppose someone tells you that it takes 30 seconds to sort a thousand items. Does that sounds like a good algorithm?
For a start, you'd probably want to know what sort of computer it was running on - if it's a supercomputer then  that's not so good; if it's a tiny low-power device like a smartphone then maybe it's ok.

Also, a single data point doesn't tell you how well the system will work with larger problems.
If the selection sort algorithm above was given 10 thousand items to sort, it would probably take about 50 minutes (3000 seconds) --- that's 100 times as long to process 10 times as much input.

These data points for a particular computer are useful for getting an idea of the performance (that is, complexity) of the algorithm, but they don't give a clear picture. It turns out that we can work out exactly how many steps the selection sort algorithm will take for *n* items: it will require about {math}\frac{n(n-1)}{2}{math end} operations, or in expanded form,{math}\frac{n^2}{2} - \frac{n}{2}{math end} operations.
This formula applies regardless of the kind of computer its running on, and while it doesn't tell us the time that will be taken, it can help us to work out if it's going to be reasonable.

From the above formula we can see why it gets bad for large values of *n* : the number of steps taken increases with the square of the size of the input.
Putting in a value of 1 thousand for *n* tells us that it will use 1,000,000/2 - 1,000/2 steps, which is 499,500 steps.

Notice that the second part (1000/2) makes little difference to the calculation.
If we just use the {math}\frac{n^2}{2}{math end} part of the formula, the estimate will be out by 0.1%, and quite frankly, the user won't notice if it takes 20 seconds or 19.98 seconds. That's the point of asymptotic complexity --- we only need to focus on the most significant part of the formula, which contains {math}n^2{math end}.

Also, since measuring the number of steps is independent of the computer it will run on, it doesn't really matter if it's described as {math}\frac{n^2}{2}{math end} or {math}n^2{math end}.
The amount of time it takes will be proportional to both of these formulas, so we might as well simplify it to {math}n^2{math end}.
This is only a rough characterisation of the selection sort algorithm, but it tells us a lot about it, and this level of accuracy is widely used to quickly but fairly accurately characterise the complexity of an algorithm.
In this chapter we'll be using similar crude characterisations because they are usually enough to know if an algorithm is likely to finish in a reasonable time or not.

{panel end}

If you've studied algorithms, you will have learnt that some sorting algorithms, such as mergesort and quicksort, are inherently faster than other algorithms, such as insertion sort, selection sort, or bubble sort. It’s obviously better to use the faster ones. The first two have a complexity of {math}nlog(n){math end} time (that is, the number of steps that they take is roughly proportional to {math}nlog(n){math end}), whereas the last three have complexity of {math}n^2{math end}. Generally the consequence of using the wrong sorting algorithm will be that a user has to wait many minutes (or perhaps hours) rather than a few seconds or minutes.

Here we're going to consider another possible sorting algorithm, called *permutation sort*. Permutation sort says “Let’s list all the possible orderings (“permutations”) of the values to be sorted, and check each one to see if it is sorted, until the sorted order is found”.  This algorithm is straightforward to describe, but is it any good?

{panel type="teacher-note" summary="Permutation sort isn't any use in practice!"}

Note that permutation sort is *not* a reasonable way to sort at all; it's just an idea to help us think about tractability. It should be obvious to students fairly quickly that it's grossly inefficient. The main thing is that is does produce the correct result, so it's an extreme example of an algorithm that works correctly, yet is way too inefficient (intractable) to be useful.

{panel end}

{comment}

.. xHRN You've used orderings most of the time below, but why not use permutations as long as it's defined, which i've sort of done in the next sentence? Or we can use both... i'm not sure which is the most common term!
.. We discussed that and came to the conclusion that “orderings” was better.

{comment end}

For example, if you are sorting the numbers 45, 21 and 84, then every possible order they can be put in (that is, all permutations) would be listed as:

45, 21, 84

45, 84, 21

21, 45, 84

21, 84, 45

84, 21, 45

84, 45, 21

Going through the above list, the only line that is in order is 21, 45, 84, so that's the solution.
It's a very inefficient approach, but it will help to illustrate what we mean by tractability.

In order to understand how this works, and the implications, choose four different words (in the example below we have used colours) and list all the possible orderings of the four words. Each word should appear exactly once in each ordering. You can either do this yourself, or use an online permutation generator such as [JavaScriptPermutations](http://users.telenet.be/vdmoortel/dirk/Maths/permutations.html) or [Text Mechanic](http://textmechanic.com/Permutation-Generator.html).

{comment}

.. xHTML5 build the permutation generator into the page

{comment end}

For example if you’d picked red, blue, green, and yellow, the first few orderings could be:

red, blue, green, yellow  
red, blue, yellow, green  
red, yellow, blue, green  
red, yellow, green, blue  

They do not need to be in any particular order, although a systematic approach is recommended to ensure you don’t forget any!

{panel type="teacher-note" summary="Solution"}

For four different words, there will be 4x3x2x1 = 24 different orders for them. For example, there are 6 starting with "red", 6 starting with "blue", and so on.

{panel end}

Once your list of permutations is complete, search down the list for the one that has the words sorted in alphabetical order. The process you have just completed is using permutation sort to sort the words.

Now add another word. How many possible orderings will there be with 5 words? What about with only 2 and 3 words --- how many orderings are there for those? If you gave up on writing out all the orderings with 5 words, can you now figure out how many there might be? Can you find a pattern? How many do you think there might be for 10 words? (You don’t have to write them all out!).

{panel type="teacher-note" summary="Solution"}

The number of orderings (permutations) for n words is the factorial of n; this is explained below, but basically there are n choices for the first word, n-1 for the next, and so on. For example, for 15 words, there are 15 x 14 x 13 x 12 x ... x 1 permutations, which is 1,307,674,368,000. It's a big number!

The factorial of a number can be calculated using a spreadsheet (in Excel the formula for {math}15!{math end} is =FACT(15). A lot of calculators have a factorial button ("!").  You can even type {math}15!{math end} into a Google search and get the answer. However, for dealing with very large numbers, the field guide has a simple calculator that can work with huge numbers; it is in the text below, or you can open it [here](_static/widgets/big-calculator.html?plain=true frameborder="0").  

For the above questions, the number of permutations are:

- 5 words: 120 permutations
- 2 words: 2 permutations (just the original two values and the reverse)
- 3 words: 6 permutations
- 10 words: 3,628,800 permutations

{panel end}

If you didn’t find the pattern for the number of orderings, think about using factorials. For 3 words, there are {math}3!{math end} (“3 factorial”) orderings. For 5 words, there are {math}5!{math end} orderings. Check the jargon buster below if you don’t know what a “factorial” is, or if you have forgotten!

{panel type="jargon-buster" summary="Factorials"}

Factorials are very easy to calculate; just multiply together all the integers from the number down to 1. For example, to calculate {math}5!{math end} you would simply multiply: 5 x 4 x 3 x 2 x 1 = 120. For {math}8!{math end} you would simply multiply 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1 = 40,320.

As stated above, the factorial of a number tells you how many permutations (orderings) there would be for that number of words (assuming they are all different). This means that if you are arranging 8 words, there will be 40,320 ways of arranging them (which is why you weren’t asked to try this in the first exercise!!)

Your calculator may have a "!" button for calculating factorials and spreadsheets usually have a "FACT" function, although for the factorials under 10 in this section, we recommend that you calculate them the long way, and then use the calculator as a double check. Ensuring you understand how a factorial is calculated is essential for understanding the rest of this section!

{panel end}

For factorials of larger numbers, most desktop calculators won't work so well; for example, 100! has 158 digits. You can use the calculator below to work with huge numbers (especially when using factorials and exponents).  

{comment}
interactive needs fixing
{comment end}

{button link="http://www.csfieldguide.org.nz/_static/widgets/big-calculator.html?plain=true%20frameborder=" text="View big number calculator"}

Try calculating 100! using this calculator --- that's the number of different routes that a travelling salesman might take to visit 100 places (not counting the starting place). With this calculator you can copy and paste the result back into the input if you want to do further calculations on the number. If you are doing these calculations for a report, you should also copy each step of the calculation into your report to show how you got the result.

There are other big number calculators available online; for example, the [Big Integer Calculator](http://www.javascripter.net/math/calculators/100digitbigintcalculator.htm). Other big calculators are available online, or you could look for one to download for a desktop machine or smartphone.

As a final exercise on permutation sort, calculate how long a computer would take to use permutation sort to sort 100 numbers. Remember that you can use the calculator that was linked to above. Assume that you don’t have to worry about how long it will take to generate the permutations, only how long it will take to check them. Assume that you have a computer that creates and checks an ordering every nanosecond.

- How many orderings need to be checked for sorting 100 numbers?
- How many orderings can be checked in a second?
- How many orderings can be checked in a year?
- How many years will checking all the orderings take?

{panel type="teacher-note" summary="Solution"}

The number of orderings for 100 numbers is 100!, which is 93, 326, 215, 443, 944, 152, 681, 699, 238, 856, 266, 700, 490, 715, 968, 264, 381, 621, 468, 592, 963, 895, 217, 599, 993, 229, 915, 608, 941, 463, 976, 156, 518, 286, 253, 697, 920, 827, 223, 758, 251, 185, 210, 916, 864, 000, 000, 000, 000, 000, 000, 000, 000.

A nanosecond is 1/1,000,000,000 of a second, so the suggested system can check a billion orderings per second.

There are 60x60x24x365 seconds in a non-leap year, which is 31,536,000, so the proposed system could check 31,536,000 *billion* orderings in a year, so dividing 100! by this number, we get 2, 959, 354, 878, 359, 467, 043, 432, 877, 944, 452, 901, 461, 527, 015, 736, 440, 310, 168, 334, 378, 611, 593, 658, 041, 388, 569, 114, 946, 139, 776, 006, 992, 588, 985, 721, 014, 739, 574, 573, 764, 941, 185, 024, 000, 000, 000, 000 years. That's an inconceivable amount of time, just to sort 100 values. This algorithm really is intractable!

{panel end}

And as an interesting thing to think about, do some calculations based on the assumptions listed below. How long would it take to use permutation sort on 100 numbers? What would happen first: the algorithm would finish, or the universe would end?

- There are {math}10^{82}{math end} atoms in the universe
- The universe has another 14 billion years before it ends
- Suppose every atom in the universe is a computer that can check an ordering every nanosecond

{panel type="teacher-note" summary="Solution"}

In the above example, the universe would end before the 100 numbers have been sorted!

{panel end}

{comment}

.. xtcb put in the calcuations for teachers (and check my ones in the previous teacher note!) I had to use two calculators, one for !, and this one because it can have values pasted in: https://defuse.ca/big-number-calculator.htm

{comment end}

By now, you should be very aware of the point that is being made. Permutation sort is so inefficient that sorting 100 numbers with it takes so long that it is essentially impossible. Trying to use permutation sort with a non trivial number of values simply won’t work. While selection sort is a lot slower than quick sort or merge sort, it wouldn’t be impossible for Facebook to use selection sort to sort their list of 1 billion users. It would take a lot longer than quick sort would, but it would be doable. Permutation sort on the other hand would be impossible to use!

At this point, we need to now distinguish between algorithms that are essentially usable, and algorithms that will take billions of year to finish running, even with a small input such as 100 values.

Computer Scientists call an algorithm “intractable” if it would take a completely unreasonable amount of time to run on reasonably sized inputs.  Permutation sort is a good example of an intractable algorithm.
The term "intractable" is used a bit more formally in computer science; it's explained in the next section.

But the *problem* of sorting items into order is not intractable - even though the Permutation sort algorithm is intractable,  there are lots of other efficient and not-so-efficient algorithms that you could use to solve a sorting problem in a reasonable amount of time:  quick sort, merge sort, selection sort, even bubble sort!  However, there are some problems in which the ONLY known algorithm is one of these intractable ones. Problems in this category are known as *intractable problems*.

{panel type="curiosity" summary="Towers of Hanoi"}

The Towers of Hanoi problem is a challenge where you have a stack of disks of increasing size on one peg, and two empty pegs. The challenge is to move all the disks from one peg to another, but you may not put a larger disk on top of a smaller one. There's a description of it at [Wikipedia](http://en.wikipedia.org/wiki/Tower_of_Hanoi).

This problem cannot be solved in fewer than {math}2^{n-1}{math end} moves, so it's an intractable problem (a computer program that lists all the moves to make would use at least {math}2^{n-1}{math end} steps). For 6 disks it only needs 63 moves, but for 50 disks this would be 1,125,899,906,842,623 moves.

We usually characterise a problem like this as having a complexity of {math}2^n{math end}, as subtracting one to get a precise value makes almost no difference, and the shorter expression is simpler to communicate to others.

The Towers of Hanoi is one problem where we know for sure that it will take exponential time. There are many intractable problems where this isn't the case --- we don't have tractable solutions for them, but we don't know for sure if they don't exist. Plus this isn't a real problem --- it's just a game (although there is a backup system based on it). But it is a nice example of an exponential time algorithm, where adding one disk will double the number of steps required to produce a solution.

{panel end}

{comment}
.. xtcb mention the myth(s) of Hanoi (for fun, in a later version of the guide :-)
{comment end}

## Tractability

{panel type="teacher-note" summary="Working with big numbers"}

The following section relies on students using the built-in interactive to experiment with the calculations on the huge numbers that come up with the intractable problems. This may be best run as a class activity where students are guided through calculating the stupendously big numbers that come up, and they should be encouraged to appreciate how impractical the amount of time taken by a program would be --- for example, a program that takes a million years to find a solution won't be of any interest to the person who started it running, and even if a computer turned up that is 1000 times as fast, it would still take 1000 years to complete. Some of the times that turn up below are so long that they are beyond our ability to imagine, and are best illustrated by seeing how futile the times are even with 1000, a million or even a billion times the computing power.

An earlier version of this chapter provided the following spreadsheet for doing these calculations; we've retained the link here for the meantime, but the new online interactive can cope a lot better with the large numbers in the calculations. If you are interested, you can [download the spreadsheet here](files/tractable-spreadsheet.xlsx) to do the calculations.

{panel end}

There's a very simple rule that computer scientists use to decide if an algorithm is tractable or not, based on the complexity (estimated number of steps) of the algorithm.
Essentially, if the algorithm takes an exponential amount of time or worse for an input of size *n*, it is labelled as intractable.
This simple rule is a bit crude, but it's widely used and provides useful guidance.
(Note that a factorial amount of time, *n!*, is intractable because it's bigger than an exponential function.)

To see what this means, let's consider how long various algorithms might take to run.
The following interactive will do the calculations for you to estimate how long an algorithm might take to run. You can choose if the running time is exponential (that is, {math}2^n{math end}, which is the time required for the Towers of Hanoi problem with *n* disks), or factorial (that is, {math}n!{math end}, which is the time required for checking all possible routes a travelling salesman would make to visit *n* places other than the starting point). You can use the interactive below to calculate the time.

For example, try choosing the factorial time for the TSP, and put in 20 for the value of *n* (i.e. this is to check all possible travelling salesman visits to 20 places).
Press the return or tab key to update the calculation.
The calculator will show a large number of seconds that the program will take to run; you can change the units to years to see how long this would be.

{panel type="teacher-note" summary="Solution"}

With the initial settings in the interactive, the TSP for 20 places will take 2,432,902,008,176,640,000.00 seconds, which is 773,056,638.51 centuries (note that the calculator needs to be set to n! to apply to the TSP). By the way, we're giving very precise numbers here just so that you know you have the right calculations in place; in practice the estimate is very crude, and rather than 773,056,638.51 centuries, it's just as accurate to say "about 770 million centuries", or even just "hundreds of millions of centuries". It may be more meaningful to students it this is converted to some geological time frame.

{panel end}

{button link="http://www.csfieldguide.org.nz/_static/widgets/tract-scaling-v2.html" text="View big time calculator"}

So far the calculation assumes that the computer would only do 1 operation per second; try changing to a million (1,000,000) operations per second, which is more realistic, and see how long that would take.

{panel type="teacher-note" summary="Solution"}

When the computer is a million times faster, the time for TSP on 20 places reduces from 773,056,638.51 centuries to 773.06 centuries. It's still completely impractical!

{panel end}

Another way to solve problems faster is to have multiple processors work on different solutions at the same time.
If you were to buy 1,000 processors (e.g. 1,000 computers, or 250 4-core computers) and have each one test out different routes, then the solution could be found 1,000 times faster. Try changing the number of processors to 1,000, and see how long that would take (you may need to change the units back --- is it seconds? hours? days?)

{panel type="teacher-note" summary="Solution"}

1,000 processors reduces the running time to 77.31 years. That's still too much computing power to be practical, but it's starting to get into the region where it's not completely impossible.

{panel end}

The interactive above estimates the amount of time taken for various algorithms to run given *n* values to be processed.
Let's assume that we have a *very* fast computer, faster than any that exist.
Try putting in the assumption that the computer can do a million million (1,000,000,000,000) steps per second.
Is that achievable? But what if you add just two more locations to the problem (i.e. n=22 instead of n=20)?

{panel type="teacher-note" summary="Solution"}

This incredibly high speed would reduce the time to 40.55 seconds. However, increasing the problem to just 22 cities blows it out again to 13.01 days. The main point is that even if you get a massively fast bank of computers that can solve a particular problem, just adding a few items to the problem will put it out of reach again.

{panel end}

Now, consider an algorithm that has a complexity of {math}n^2{math end} (there are lots that take roughly this number of steps, including selection sort which was mentioned earlier).
Type in a value of 1,000,000 for *n*  to see how long it might take to sort a million items on a single processor (keep the number of steps per second at 1,000,000,000,000, but set the number of processors to just 1) --- it should show that it will only take about 1 second on our hypothetical very fast machine.
Now put in 10 million for *n* --- although it's sorting a list 10 times as big, it takes more than 10 times as long, and will now take a matter of minutes rather than seconds.
At what value of *n* does the amount of time become out of the question --- that is, how large would the problem need to be for it to take years to finish?
Is anyone ever likely to be sorting this many values --- for example, what if for some reason you were sorting the name of every person in the world, or every base in the human genome?

{panel type="teacher-note" summary="Solution"}

The {math}n^2{math end} algorithm with 10 million items takes 100 seconds above (each time n is multiplied by 10, it will take 100 times as long).

When n is a thousand million, it takes nearly 12 days, at which point you might consider it to be out of the question. At n=10,000,000,000 it takes about 3.18 years, which is likely to be longer than a computer could run for continuously. But that's a pretty big number of items to process --- for example, it's big enough to cope with the population of the whole world. And there's room for improvement by using a reasonable number of multiple processors.

{panel end}

What about an algorithm with complexity of {math}n^3{math end}? What's the largest size input that it can process in a reasonable amount of time?

{panel type="teacher-note" summary="Solution"}

The {math}n^3{math end} algorithm can process 1,000,000 items in 11.57 days. A million is nothing near the population of the world, or even a lot of countries, but a lot of real life problems are smaller than that.

{panel end}

Now try the same when the number of steps is {math}2^n{math end}, but start with a value of 10 for *n* , then try 30, 40 , 50 and so on.
You'll probably find that for an input of about 70 items it will take an unreasonable amount of time.
Is it much worse for 80 items?

{panel type="teacher-note" summary="Solution"}

The {math}2^n{math end} algorithm is in a completely different league to the previous ones. 10 items take a fraction of a second (1.02 nanoseconds to be precise), and 60 items take 13.34 days, but just 70 items blows out to 37.51 years, and 80 items takes 384 centuries. Small increases in the number of items (eg. cities for the TSP to visit) result in HUGE increases in the time taken to evaluate them all.

{panel end}

Now try increasing the number of operations per second to 10 times as many. Does this help to solve bigger problems?

{panel type="teacher-note" summary="Solution"}

10 times faster reduces 384 centuries to 38.4 centuries - much faster, but it is still an impossibly large amount of time. The lesson is that the algorithm will be so slow that even massive improvements in hardware won't have a useful impact.

{panel end}

Trying out these figures you will likely have encountered the barrier between "tractable" and "intractable" problems.
Algorithms that take {math}n^2{math end}, {math}n^3{math end} or even {math}n^4{math end} time to solve a problem (such as sorting a list) aren't amazing, but at least with a fast enough computer and for the size of inputs we might reasonably encounter, we have a chance of running them within a human lifetime, and these are regarded as *tractable* .
However, for algorithms that take {math}2^n{math end}, {math}3^n{math end} or more steps, the amount of time taken can end up as billions of years even for fairly small problems, and using computers that are thousand times faster still doesn't help to solve much bigger problems. Such problems are regarded as *intractable* .
Mathematically, the boundary between tractable and intractable is between a polynomial number of steps (polynomials are formulas made up of {math}n^2{math end}, {math}n^3{math end}, {math}n^4{math end} and so on), and an exponential number of steps ({math}2^n{math end}, {math}3^n{math end}, {math}4^n{math end}, and so on).

The two formulas {math}n^2{math end} and {math}2^n{math end} look very similar, but they are really massively different, and can mean a difference between a few seconds and many millennia for the program to finish.
The whole point of this chapter is to develop an awareness that there are many problems that we have tractable algorithms for, but there are also many that we haven't found any tractable algorithms for.
It's very important to know about these, since it will be futile to try to write programs that are intractable, unless you are only going to be processing very small problems.

Note that algorithms that take a factorial amount of time ({math}n!{math end}, or {math}1 \times 2 \times 3 \times \ldots n{math end}) are in the intractable category (in fact, they take times that are a lot worse than {math}2^n{math end}).

Essentially any algorithm that tries out all combinations of the input will inevitably be intractable because the number of combinations is likely to be exponential or factorial.
Thus an important point is that it's usually not going to work to design a system that just tries out all possible solutions to see which is the best.

Although we've provided {math}n^6{math end} as an example of a tractable time, nearly all algorithms you're likely to encounter will be {math}n^3{math end} and better, or  {math}2^n{math end} and worse --- only very specialised ones fall in the gap between those. So there's a big gulf between tractable and intractable problems, and trying to grapple with it is one of the biggest problems in computer science!

What about Moore's law, which says that computing power is increasing exponentially?
Perhaps that means that if we wait a while, computers will be able to solve problems that are currently intractable?
Unfortunately this argument is wrong; intractable problems are also exponential, and so the rate of improvement due to Moore's law means that it will only allow for slightly larger intractable problems to be solved.
For example, if computing speed is doubling every 18 months (an optimistic view of Moore's law), and we have an intractable problem that takes {math}2^n{math end} operations to solve (many take longer than this), then in 18 months we will be able to solve a problem that's just one item bigger.
For example, if you can solve an exponential time problem for 50 items (50 countries on a map to colour, 50 cities for a salesman to tour, or 50 rings on a Towers of Hanoi problem) in 24 hours, then in 18 months you can expect to buy a computer that could solve it for 51 items at best!
And in 20 years you're likely to be able to get a computer that could solve for 55 items in one day.
You're going to have to be more than patient if you want Moore's law to help out here --- you have to be prepared to wait for decades for a small improvement!

Remember that if you need to do calculations of huge numbers, there's a calculator here that you can use:

{button link="http://www.csfieldguide.org.nz/_static/widgets/big-calculator.html?plain=true%20frameborder=" text="View big number calculator"}

{comment}

.. xJRM force above link to open in new window; also, nice if there's an icon/screenshot/image in the link

.. Exercise: password cracking
.. ------------------------------------------------------------

.. todo: xtcb a brief section on 2\ :sup:`n` operations to crack passwords
.. 2\ :sup:`n` example: trying all values in an n-bit password

.. xHTML5 interactive that attempts all 2\ :sup:`n` values to find a random one

{comment end}

## The Travelling Salesman Problem

An example of an intractable problem is the Travelling Salesman Problem (TSP). The TSP involves a bunch of locations (cities, houses, airports,....) where you can travel between any possible pair of locations. The goal is to find the shortest route that will go through all the locations once --- this is what the interactive at the start of this chapter does.

Researchers have spent a lot of time trying to find efficient solutions to the Travelling Salesman Problem, yet have been unable to find a *tractable* algorithm for solving it. As you learnt in the previous section, *intractable* algorithms are very slow, to the point of being impossible to use. As the only solutions to TSP are intractable, TSP is known as an *intractable problem*.

It hasn’t actually been *proven* that there is no tractable solution to TSP, although many of the world’s top computer scientists have worked on this problem for the last 40 years, trying to find a solution but without success.
What they have managed to do is find thousands of other problems that are also intractable, and more importantly, if a solution is found for any one of these problems, we know how to convert it to a solution for any of the others (these are called NP-complete problems). They all stand and fall together, including the TSP problem.
So it's not just being lazy if you give up on finding an optimal TSP algorithm --- people have tried for decades and not found a tractable algorithm.
Of course, this is also a strong motivator to try to find one --- if you do, you will have solved thousands of other problems at the same time!
This is a great thing for a researcher to do, but if you have a program to get finished by the end of the month, it's not a good bet to work on it.

Current algorithms for finding the optimal TSP solution aren't a lot better than simply trying out all possible paths through the map (as in the interactive at the start of this chapter). The number of possible paths gets out of hand; it's an intractable approach. In the project below you'll be estimating how long it would take.

While TSP was originally identified as being the problem that sales people face when driving to several different locations and wanting to visit them in the order that leads to the shortest route (less petrol usage), the same problem applies to many other situations as well.
Courier and delivery companies have variants of this problem --- often with extra constraints such as limits on how long a driver can work for, or allowing for left hand turns being faster than right-hand ones (in NZ at least!)

{panel type="teacher-note" summary="More on the TSP"}

There is an extensive website about the state of the art for the TSP at [http://www.tsp.gatech.edu/](http://www.tsp.gatech.edu/) . This includes games and information about the current largest solved problem (which typically take months or years to run on very powerful computers).

{panel end}

{comment}

.. xHRN Put in a paragraph or two about the greedy heuristic as a practical way to solve the problem (but point out that it's not the best heuristic, give some % bounds to give an idea of the accuracy --- according to http://en.wikipedia.org/wiki/Travelling_salesman_problem#Heuristic_and_approximation_algorithms the greedy algorithm averages 25% worse than optimal; there are more complex algorithms that typically come within about 3% of optimal.)

{comment end}

Since these problems are important for real companies, it is not reasonable to simply give up and say there is no solution.  Instead, when confronted with an intractable problem, computer scientists look for algorithms that produce approximate solutions --- solutions that are not perfectly correct or optimal, but are hopefully close enough to be useful.  By relaxing the requirement that the solution has to be perfectly correct, it is often possible to come up with tractable algorithms that will find good enough solutions in a reasonable time. This kind of algorithm is called a *heuristic* - it uses rules of thumb to suggest good choices and build up a solution made of pretty good choices.

A simple heuristic that often works OK is a *greedy* heuristic algorithm --- an algorithm that just takes what looks like the best choice at each step.  For example, for the TSP, a greedy heuristic algorithm might repeatedly take the route to the next closest city.  This won’t always be the best choice, but it is very fast, and experience shows that it is typically no more than 25% worse than the optimal.  There are more sophisticated ways of designing approximate algorithms that can do better than this (some can get within 3% of optimal for the TSP), but they take longer to run.

There are software companies that work on trying to make better and better approximate algorithms for guiding vehicles by GPS for delivery routes. Companies that write better algorithms can charge a lot of money if their routes are faster, because of all the fuel and time savings that can be made.

An interesting thing with intractability is that you can have two very similar problems, with one being intractable and the other being tractable. For example, finding the shortest route between two points (like a GPS device usually does) is a tractable problem, yet finding the shortest route around multiple points (the TSP) isn't.
By the way, finding the *longest* path between two points (without going along any route twice) is also intractable, even though finding the *shortest* path is tractable!


{panel type="project" summary="The craypots problem"}

This project is based around a scenario where there is a cray fisher who has around 18 craypots that have been laid out in open water. Each day the fisher uses a boat to go between the craypots and check each one for crayfish.

{comment}
.. Trying to get away from listing a range of numbers, as that may make it seem the problem is dynamic
{comment end}

The cray fisher has started wondering what the shortest route to take to check all the craypots would be, and has asked you for your help. Because every few weeks the craypots need to be moved around, the fisher would prefer a general way of solving the problem, rather than a solution to a single layout of craypots. Therefore, your investigations must consider more than one possible layout of craypots, and the layouts investigated should have the craypots placed *randomly* i.e. not in lines, patterns, or geometric shapes.

When asked to generate a random map of craypots, get a pile of coins (or counters) with however many craypots you need, and scatter them onto an A4 piece of paper. If any land on top of each other, place them beside one another so that they are touching but not overlapping. One by one, remove the coins, making a dot on the paper in the centre of where each coin was. Number each of the dots. Each dot represents one craypot that the cray fisher has to check. You should label the top left corner or the paper as being the boat dock, where the cray fisher stores the boat.

Generate a map with 7 or 8 craypots using the random map generation method described above. *Make an extra copy of this map, as you will need it again later.*

Using your intuition, find the shortest path between the craypots.

Now generate a map (same method as above) with somewhere between 15 and 25 craypots. *Make more than one copy of this map, as you will need it again later*

Now on this new map,  try to use your intuition to find the shortest path between the craypots. Don’t spend more than 5 minutes on this task; you don’t need to include the solution in your report. Why was this task very challenging? Can you be sure you have an optimal solution?

{comment}
.. How relevant is this to the standard? Need to check.
{comment end}

Unless your locations were laid out in a circle or oval, you probably found it very challenging to find the shortest route. A computer would find it even harder, as you could at least take advantage of your visual search and intuition to make the task easier. A computer could only consider two locations at a time, whereas you can look at more than two. But even for you, the problem would have been challenging! Even if you measured the distance between each location and put lines between them and drew it on the map so that you didn’t have to judge distances between locations in your head, it’d still be very challenging for you to figure out!

A straightforward algorithm to guarantee that you find the shortest route is to check *all* possible routes. This involves working out what all the possible routes are, and then checking each one. A possible route can be written as a list of the locations (i.e. the numbers on the craypots), in the order to go between them. This should be starting to sound familiar to you assuming you did the permutation sort discussed above. Just like in that activity you listed all the possible ordering for the values in the list to be sorted, this algorithm would require listing all the possible orderings of the craypots, which is equivalent (although you don’t need to list all the orderings for this project!).

How many possible routes are there for the larger example you have generated? How is this related to permutation sort, and factorials? How long would it take to calculate the shortest route in your map, assuming the computer can check 1 billion (1,000,000,000) possible routes per second? (i.e. it can check one route per nanosecond) What can you conclude about the cost of this algorithm? Would this be a good way for the cray fisher to decide which path to take?

{comment}
.. I have considered getting them to pick a random number between 50 - 100, and to do the calculation for that as well, to increase personalisation. Although would this be too much work to expect of them to have to do this calculation twice? I really think it’d be best to do this though.
{comment end}

Make sure you show *all* your mathematical working in your answers to the above questions!

So this algorithm is intractable,  but maybe there is a more clever algorithm that is tractable?  
The answer is No.

You should be able to tell that this problem is equivalent to the TSP, and therefore it is intractable.  How can you tell? What is the equivalent to a town in this scenario? What is the equivalent to a road?

Since we know that this craypot problem is an example of the TSP, and that there is no known tractable algorithm for the TSP,  we know there is no tractable algorithm for the craypot problem either.  Although there are slightly better algorithms than the one we used above, they are still intractable and with enough craypots, it would be impossible to work out a new route before the cray fisher has to move the pots again!

{comment}
.. xHRN xTCB the following introduces the idea of a heuristic/approximate solution; should it be in a main section rather than buried in the project? Either mention it earlier, or split the project in two parts, with a section on heuristics between them.  
.. This project is weird in that it kinda contains content and project mixed into together. I might briefly mention the idea of using approximate solutions/ heuristics in the general TSP section (which is just above this)?
.. xHRN Yup, please introduce the greedy algorithm in the main text before the project. The next couple of paragraphs have a lot of the material. (Let me know if you'd rather that i move it around).  I think I have done this now.
{comment end}

Instead of wasting time on trying to invent a clever algorithm that no-one has been able to find, we need to rely on a algorithm that will generate an approximate solution. The cray fisher would be happy with an approximate solution that is say, 10% longer more than the best possible route, but which the computer can find quickly.

There are several ways of approaching this. Some are better than others in general, and some are better than others with certain layouts.  One of the more obvious approximate algorithms, is to start from the boat dock in the top left corner of your map and to go to the nearest craypot. From there, you should go to the nearest craypot from that craypot, and repeatedly go to the nearest craypot that hasn’t yet been checked. This approach is known as a *greedy heuristic algorithm* as it always makes the decision that looks the best at the current time, rather than making a not so good decision now to try and get a bigger pay off later. You will understand why this doesn’t necessarily lead to the optimal solution after completing the following exercises.

On a copy of each of your 2 maps you generated, draw lines between the craypots to show the route you would find following the greedy algorithm (you should have made more than one copy of each of the maps!)

For your map with the smaller number of craypots (7 or 8), compare your optimal solution and your approximate solution. Are they the same? Or different? If they are the same, would they be the same in all cases? Show a map where they would be different (you can choose where to place the craypots yourself, just use as many craypots as you need to illustrate the point).

For your larger map, show why you don’t have an optimal solution. The best way of doing this is to show a route that is similar to, but shorter than the approximate solution. The shorter solution you find doesn’t have to be the optimal solution, it just has to be shorter than the one identified by the approximate algorithm (Talk to your teacher if you can’t find a shorter route and they will advise on whether or not you should generate a new map). You will need to show a map that has a greedy route and a shorter route marked on it. Explain the technique you used to show there was a shorter solution. Remember that it doesn’t matter how much shorter the new solution you identify is, just as long as it is at least slightly shorter than the approximate solution --- you are just showing that the approximate solution couldn’t possibly be the optimal solution by showing that there is a shorter solution than the approximate solution.

Even though the greedy algorithm only generates an approximate solution, as opposed to the optimal solution, explain why is it more suitable for the cray fisher than generating an optimal solution would be?

Why would it be important to the cray fisher to find a short route between the craypots, as opposed to just visiting them in a random order?  Discuss other problems that are equivalent to TSP that real world companies encounter every day. Why is it important to these companies to find good solutions to TSP? Estimate how much money might a courier company be wasting over a year if their delivery routes were 10% worse than the optimal.  How many different locations/towns/etc might their TSP solutions have to be able to handle?

Find a craypot layout that results in the greedy algorithm finding what seem to be a really inefficient route. Why is it inefficient? Don’t worry about trying to find an actual worst case, just find a case that seems to be quite bad. What is a general pattern that seems to make this greedy algorithm inefficient?

Don't forget to include an introductory paragraph in your report that outlines the key ideas. It should include a brief description of what an intractable problem is, and how a computer scientist goes about dealing with such a problem. The report should also describe the Travelling Salesman Problem and the craypot problem in your own words. Explain why the craypot problem is a realistic problem that might matter to someone.

{panel end}

{comment}

.. possible material on NP completeness: And that's not all.  There are thousands of problems that, although they look completely different, are equivalent in the sense that if an efficient method is found to solve one, it can be converted into an efficient method to solve them all.  In this chapter you will learn about these problems. Song: https://www.youtube.com/watch?feature=player_embedded&v=a3ww0gwEszo http://www.jakubw.pl/inne/longest.html

{comment end}

## Other intractable problems

{panel type="teacher-note" summary="Under construction"}

More material on the many intractable problems that exist is yet to be written, but in the meantime, here are some alternatives to the TSP problem that can be used to explore intractability if you have students who can work on this independently.

{panel end}

There are thousands of problems like the TSP for which no tractable solution is known. Extra sections will eventually be added here to introduce some of them, but in the meantime, if you are keen you might like to explore some of these problems:

- [map and graph colouring](http://csunplugged.org/graph-colouring) (these can be reduced to a timetabling problem and vice versa, showing how NP-complete problems can relate to each other)
- [the knapsack problem](http://en.wikipedia.org/wiki/Knapsack_problem)
- [the bin packing problem](http://en.wikipedia.org/wiki/Bin_packing_problem)
- [Hamiltonian paths](http://en.wikipedia.org/wiki/Hamiltonian_path>) (no tractable solution for this is known, yet the very similar Eulerian path, which is often presented as the seven bridges problem, has an easy tractable solution)
- [Steiner trees](http://www.csunplugged.org/steiner-trees)
- [Dominating sets](http://www.csunplugged.org/dominating-sets)
- [Longest path](http://en.wikipedia.org/wiki/Longest_path) (this is interesting because finding the longest path is intractable, yet finding the shortest path is tractable - the shortest path is calculated when a GPS device works out the shortest route to a destination. Also, a Hamiltonian problem can be reduced easily to longest path, showing the concept of reduction when one NP-complete problem is used to solve another). [And here's a song about it!](https://www.youtube.com/watch?feature=player_embedded&v=a3ww0gwEszo)
- [the Battleship problem](http://en.wikipedia.org/wiki/Battleship_(puzzle))

{comment}

.. TCB bin packing could make a good interactive, and students can try heuristics:  first-fit, best-fit and next-fit algorithms and offline (all items known in advance) first-fit and best-fit algorithms. [from paper at sigcse 2013]

{comment end}

## The whole story!

The question of tractability is a big one in computer science --- in fact, what is widely regarded as the biggest unsolved problem in computer science revolves around it.
You may recall that we mentioned that there are thousands of problems that are we don't have a tractable solution for, yet a tractable solution to one can be adapted to all the others.
This groups of problems is called "NP-complete" (NP stands for non-deterministic polynomial if you really want to know; complete just means that they can all be converted to each other!)
The big question is whether or not there is a polynomial time algorithm for any one of them, in which case all NP problems will have a P (polynomial time) solution.
The question is often referred to as whether or not P equals NP.

Actually, things get worse.
So far we've talked about intractable problems --- ones that can be solved, but might need billions of years on a computer.
If you think it's bad that some problems take that long to solve, that's nothing!
There are some well known problems that we know can *never* be solved on a computer.
For example, writing a program that reliably tells you if another program will finish or not is impossible!
There are other examples of such problems here:

- [http://www.cs4fn.org/algorithms/tiles.php](http://www.cs4fn.org/algorithms/tiles.php)
- [http://www.cs4fn.org/algorithms/uncomputable.php](http://www.cs4fn.org/algorithms/uncomputable.php)
- [http://www.cs4fn.org/algorithms/haltingproblem.php](http://www.cs4fn.org/algorithms/haltingproblem.php)

{comment}

.. eventually mention: halting problem (Turing), malware detection (tell whether program has malware embedded in it)

{comment end}

It's good to know about these issues, to avoid getting stuck writing impossible programs.
It's also a fascinating area of research with opportunities to make a discovery that could change the world of computing, as well as contribute to our understanding on what can and can't be computed.

{comment}

.. mention quantum computing - might help, but no known NP problems solved yet - see Harel's book, http://nsf.gov/cise/csbytes/newsletter/vol3/pdf/csbb-vol3-i2.pdf

.. mention Turing's contributions - halting problem etc.

.. another NP-complete problem: http://en.wikipedia.org/wiki/Instant_Insanity

{comment end}

## Further reading

This topic is covered very thoroughly in a way that is accessible to non-specialists in a popular book by David Harel called "Computers Ltd.: What They Really Can't Do".

### Useful Links

- [http://en.wikipedia.org/wiki/Computational_complexity_theory](http://en.wikipedia.org/wiki/Computational_complexity_theory)
- [http://www.tsp.gatech.edu/games/index.html](http://www.tsp.gatech.edu/games/index.html)
- [http://csunplugged.org/graph-colouring](http://csunplugged.org/graph-colouring)
- [http://en.wikipedia.org/wiki/Travelling_salesman_problem](http://en.wikipedia.org/wiki/Travelling_salesman_problem)
- [http://en.wikipedia.org/wiki/Knapsack_problem](http://en.wikipedia.org/wiki/Knapsack_problem)
- [http://en.wikipedia.org/wiki/Bin_packing_problem](http://en.wikipedia.org/wiki/Bin_packing_problem)
- [http://en.wikipedia.org/wiki/Hamiltonian_path](http://en.wikipedia.org/wiki/Hamiltonian_path)
- [http://en.wikipedia.org/wiki/Brute-force_search](http://en.wikipedia.org/wiki/Brute-force_search)
