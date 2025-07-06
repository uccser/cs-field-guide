# Polynomial Time and Non-polynomial Time

Computer scientists often draw a line between algorithms that require exponential time (that is, they are \(O(2^n)\) or worse), and those that require polynomial time, which require times like \(O(n^2)\), \(O(n^3)\), \(O(n^4)\) and so on including things like \(O(n)\) and \(O(log n)\). 
The latter ones are referred to as “polynomial time”, since the amount of time they take is proportional to a polynomial. 
Those that are \(O(2^n)\) or worse are sometimes loosely referred to as “non-polynomial”, although “exponential” or “superpolynomial” is probably a better description.

{panel type="curiosity"}

# What is the exponent in an "exponential"?

The word "exponential" is often used inaccurately in casual use, often to refer to something that grows quickly.
But the real meaning of "exponential" is that it has \(n\) in the exponent, such as \(2^n\), \(3^n\), or even \(n^n\) (which is similar to \(n!\)).
This means that \(n^2\), or even \(n^5\) is not **not** exponential, since \(n\) is not in the exponent. 
They grow quite quickly as \(n\) increases, but they are nothing like as bad as \(2^n\).

{panel end}


## Tractability

Polynomial time algorithms are generally referred to as “tractable”, because chances are a powerful enough computer will be able to run them in a reasonable time, even if \( n \) is fairly big.
Exponential (or non-polynomial) time algorithms are generally referred to as “intractable”, because even if the algorithm runs fast enough for a given value of \( n \), it will probably be too slow if \( n \) increases by just a small amount. 
Of course, some polynomial time algorithms are also too slow to use, but it’s a simple distinction that usually provides a good warning if things are going to get out of hand.

## NP-complete

NP-complete is a term for a [huge set of problems](https://en.wikipedia.org/wiki/List_of_NP-complete_problems) that we just can’t seem to find tractable algorithms for, and yet if we find a solution for one of them, we know how to get a fast solution for all of them. 
Finding out if one of these solutions exists is considered one of the biggest questions in computer science, and there’s even a $1,000,000 prize for finding a solution (it’s one of the “Millenium Prize Problems”). 
Examples of these problems include [TSP](https://en.wikipedia.org/wiki/Travelling_salesman_problem), [bin-packing](https://en.wikipedia.org/wiki/Bin_packing_problem) and the [knapsack problem](https://en.wikipedia.org/wiki/Knapsack_problem).

The **“NP”** in the name stands for “non-deterministic polynomial-time”, which means that it’s part of a class of problems that could be solved by a “non-deterministic” machine (these don’t exist in reality) in polynomial time (that is, a tractable amount of time). 
In reality, computer scientists have only found exponential time algorithms for them (which are loosely referred to as using non-polynomial time).

The **“complete”** in NP-complete mainly means that any algorithm for one NP-complete problem can be converted to another in polynomial time, so if a fast algorithm for one is discovered, then we have instantly found a polynomial time algorithm for all of them.

## Heuristics and approximation algorithms

Because many of the NP-complete problems solve important real world problems (like reducing the amount of fuel used for deliveries, or loading aeroplanes optimally), we need to use heuristics or approximation algorithms that don’t necessarily find the best solution, but at least find a fairly good solution in a reasonable amount of time. 
For example, for the TSP, the “nearest neighbour” heuristic can work reasonably well - it just chooses the nearest unvisited location at each step. 
This typically gives a solution about 25% worse than the optimal one, but it runs in polynomial time. 
Another example is for bin-packing, where a heuristic “next-fit” algorithm just puts an item in the first bin that has space for it. 
It can run in O(n) time, but it might use up to about twice as many bins as an optimal algorithm.

## What if we find that P=NP?

While it seems unlikely, it is possible that someone will find a polynomial time algorithm for an NP-complete problem, in which case we’ll have one for all NP-complete problems! 
This might seem positive, since we can then optimal decisions about things like transport and timetabling, but one interesting social consequence of this is that it also means that cryptographic methods relying on the algorithms to take exponential time may now be useless. 
In fact, a solution to any NP-complete problem would be like the discovery of nuclear fission - it is both an incredible benefit, and a huge threat! 
There’s a [thriller movie](https://en.wikipedia.org/wiki/Travelling_Salesman_(2012_film)) that imagines a group solving the TSP problem, and the consequences.