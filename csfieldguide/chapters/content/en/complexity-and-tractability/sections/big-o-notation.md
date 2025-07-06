# Asymptotic Complexity (Big-O Notation)

{panel type="jargon-buster"}

# Asymptotic complexity

If you're reading about complexity, you may come across some terminology like {glossary-link term="big-o"}Big O notation{glossary-link end} and {glossary-link term="asymptotic-complexity"}asymptotic complexity{glossary-link end}, where an algorithm that takes about \( n^2 \) steps is referred to as \( O(n^2) \).

Big O notation is a precise way to talk about complexity, and is referred to as "asymptotic complexity", which simply means how an algorithm performs for large values of \( n \).
The "asymptotic" part means "as \( n \) gets really large" &ndash; when this happens, you are less worried about small details of the running time.
If an algorithm is going to take seven days to complete, it's not that interesting to find out that it's actually 7 days, 1 hour, 3 minutes and 4.33 seconds, and it's not worth wasting time to work it out precisely.

With asymptotic complexity we will make rough estimates of the number of operations that an algorithm will go through.
There's no need to get too hung up on precision since computer scientists are comfortable with a simple characterisation that gives a ballpark indication of speed.

For example, consider using {glossary-link term="selection-sort"}selection sort{glossary-link end} to put a list of \( n \) values into increasing order (this is explained [in the chapter on algorithms]('chapters:chapter_section' 'algorithms' 'sorting')).
Suppose someone tells you that it takes 30 seconds to sort a thousand items.
Does that sound like a good algorithm?
For a start, you'd probably want to know what sort of computer it was running on &ndash; if it's a supercomputer then that's not so good; but if it's a tiny low-power device like a smartphone then maybe it's ok.

Also, a single data point doesn't tell you how well the system will work with larger problems.
If the selection sort algorithm above was given 10 thousand items to sort, it would probably take about 50 minutes (3000 seconds) &ndash; that's 100 times as long to process 10 times as much input.

These data points for a particular computer are useful for getting an idea of the performance (that is, complexity) of the algorithm, but they don't give a clear picture.
It turns out that we can work out how many steps the selection sort algorithm will take for \( n \) items: it will require about \( \frac{n(n-1)}{2} \) operations, or in expanded form,\( \frac{n^2}{2} - \frac{n}{2} \) operations.
This formula applies regardless of the kind of computer it's running on, and while it doesn't tell us the time that will be taken, it can help us to work out if it's going to be reasonable.

From the above formula we can see why it gets bad for large values of \( n \) : the number of steps taken increases with the square of the size of the input.
Putting in a value of 1,000 for \( n \) tells us that it will use 1,000,000/2 - 1,000/2 steps, which is 499,500 steps.

Notice that the second part (1000/2) makes little difference to the calculation.
If we just use the \( \frac{n^2}{2} \) part of the formula, the estimate will be out by 0.1%, and quite frankly, the user won't notice if it takes 20 seconds or 19.98 seconds.
That's the point of asymptotic complexity &ndash; we only need to focus on the most significant part of the formula, which contains \( n^2 \).

Also, since measuring the number of steps is independent of the computer it will run on, it doesn't really matter if it's described as \( \frac{n^2}{2} \) or \( n^2 \).
The amount of time it takes will be proportional to both of these formulas, so we might as well simplify it to \( n^2 \).
This is only a rough characterisation of the selection sort algorithm, but it tells us a lot about it, and this level of accuracy is widely used to quickly but fairly accurately characterise the complexity of an algorithm.
In this chapter we'll be using similar crude characterisations because they are usually enough to know if an algorithm is likely to finish in a reasonable time or not.

{panel end}

The complexity calculations for a simple algorithm can be measured in steps in the algorithm.
A more formal way of writing this is using "big-o" notation, such as \( O(n) \), which is a quick and simple way to characterise an algorithm based on the number of values it has to process.
Basically it's a rough guide on to how quickly the complexity increases based on the size of the problem.
The size of the problem is most commonly written as the variable \( n \).
For example, searching a list of \( n \) values for a given key, or sorting a list of \( n \) values in ascending order.

As an example, the average case of sequential search takes about twice as long if it has twice as much data.
The time taken is proportional to \( n \), and this is simplified to \(O(n)\) in "big-o" notation.
Even if an algorithm takes \( 3n \) steps, we write it as \(O(n)\), since the time taken will be proportional to \( n \).

The big-o notation is called "asymptotic" complexity because "asymptote" means what happens as \( n \) gets very large.
We don't worry much about values of \( n \), since in computer science we're usually dealing with thousands, millions, or billions of items of data.
If an algorithm takes \( n-1 \) step, and \( n \) is a million, then it's accurate enough to say it takes about a million steps, the details aren't a big deal, and so it is characterised as \( O(n) \), and not \( O(n-1) \).

## Examples of Aysmptotic Complexities

**\(O(1)\):** this means the algorithm always takes the same amount of time regardless of the size of the input (the time taken is proportional to the number 1).
The best case of a sequential search is \(O(1)\), which is when the first item checked happens to be the key being searched for.
This best case doesn’t depend on \( n \) (the amount of items being searched).

**\(O(log n)\)**: This is proportional to the logarithm of \( n \).
Logarithms grow very slowly as \( n \) increases, as shown in the graph below.
Binary search in the average and worst case is \(O(log n)\), because it divides the size of the problem in half at each step.
Logarithmic complexity is considered to be extremely good, since even huge values of \( n \) require very few steps (for example, the graph below shows how a binary search of a million items only needs about 20 steps, and for 2 million items, only 21 steps).

{panel type="curiosity"}

# What is a logarithm?

The logarithm function is a very important concept when you’re studying algorithms.
It can be confusing because algorithms and logarithms look like almost the same words, but they have very different meanings.

Here’s an example of the simple mathematics that is wrapped up in a logarithm: imagine that you fold a piece of paper in half, so that it is now 2 sheets thick.
Then you fold it again, so it is 4 sheets thick.
How many times to you need to fold it until it is 32 sheets thick?
The answer is that you need to fold it 5 times; using mathematical terminology, the logarithm of 32 is 5.

In general, the number of folds that you need to make is the logarithm of the thickness of the folded paper.
To get the paper 1024 sheets thick, you need to fold it 10 times, and the logarithm of 1024 is 10.

Following this reasoning, the logarithm of 1,048,576 is 20 (yup, just 20 folds will make the paper over a million pages thick, if you could somehow fold it 20 times.)
The mathematical shorthand for logarithm is log. For example,
    \(log 1024 = 10\)
Strictly speaking, a logarithm also has a “base”; in the example the base is 2, because we are doubling the thickness with each fold, so to be precise, we would use the subscript 2 to indicate this:
    \(log_2 1024 = 10\)

Another way of thinking of a logarithm is that it’s the number of times you can divide something in half until you get one item (which is really just the paper folding in reverse).
So if you start with the number 32, then halve it to 16, then again to 8, 4, 2 and 1, you have done 5 halvings; \(log_2 32\) is 5.

One place where we’ve already seen a logarithm at work is in binary search.
Because binary search halves the number of items to search at each step, it takes at most \(log_2 n\) to search \(n\) items; for example, it takes at most 20 steps to search 1,048,576 items.

From these examples, you can see that the logarithm function grows very slowly; even a billion items only takes 30 steps.
So when we see that the complexity of an algorithm is logarithmic, it’s great news.
Even a vast amount of input data will take a fraction of a second to process.

An easy way to calculate \(log_2\) is to use a spreadsheet; usually you can use a formula like this (the 2 means that it is base 2):
=log(A1,2)

Pocket calculators don’t normally have a \(log_2\) button, but you will probably find \(log_{10}\). You can calculate \(log_2n\) by working out \(\frac{\log_{10}n}{\log_{10}2}\).
In case you’re wondering, logarithms are the inverse of exponential functions. Exponential functions get huge really quickly; logarithms are the opposite. The relationship is that if \(n = 2^k\), then \(k = log_2 n\).

{panel end}

{image file-path="img/chapters/1vslog2n.png" alt="An image showing the graph of O(1) comapred to O(logn)"}

The above graph also shows the shape of the function for the value 1 (in blue).
It’s just a horizontal line!
A typical \(O(1)\) algorithm might actually take a few operations when it runs, but as long as it’s a constant number, then it’s proportional to the value 1, and we write it as \(O(1)\), which just means a constant value.

Although we’ve drawn the graphs here, it’s really informative to draw your own ones, to get a feel just how different these functions are.
And bear in mind that this is often the kind of difference in performance between two algorithms that solve exactly the same problem!

**\(O(n)\):** this means the time taken is roughly proportional to the amount of input.
Sequential search (average and worst case) are \(O(n)\), because searching twice as much data will take about twice as long.
The best case of insertion sort in \(O(n)\), which happens when it is given a list that is nearly in sorted order; this is actually useful in combination with faster algorithms such as quicksort.

**\(O(n log n)\):** this is only slightly worse than \(O(n)\), since the “log *n*” factor is relatively small.
The best sorting algorithms take O(n log n) time on average, and in the best case (including mergesort and quicksort).
Mergesort is also \(O(n log n)\) in the worst case, but quicksort can be \(O(n^2)\) in the worst case.

The following graph plots the value \( n \) (which is just a straight line), and \(n log n\), which looks almost straight, but bends up very slightly since \(log n\) increases very slightly as \( n \) increases.
But \(O(n log n)\) isn’t much worse than \(O(n)\) as far as asymptotic complexity goes.
In the graph below it’s about 10 times worse on the right hand side, but remember that we’re not too worried about constant factors, just the rate of growth.

{image file-path="img/chapters/nvsnlogn.png" alt="An image showing the graph of O(n) comapred to O(nlogn)"}

**\(O(n^2)\):** The time taken increased roughly in proportion to the square of the amount of data.
For example, twice as much data would take 4 times as long; 10 times as much data would take 100 times as long.
Common algorithms that use this amount of time are selection sort (best, worst and average cases), insertion sort (average and worst case), bubblesort (average and worst case).
These algorithms aren’t usually used in practice because the speed is bad for large amounts of data (except insertion sort has some specialist use).
\(O(n^2)\) is sometimes referred to as “quadratic”, since it’s based on a quadratic equation.

The following graph plots \(n^2\), which is the parabola shape that a quadratic function produces.
The key thing is that this function increases faster and faster as \( n \) increases, so it’s really not very good. Notice that the x axis only goes up to 100 here, so an \(O(n^2)\) algorithm isn’t likely to be very good for even moderately large numbers.

{image file-path="img/chapters/n2vsnlogn.png" alt="An image showing the graph of O(n^2) comapred to O(nlogn)"}

**\(O(2^n)\)**: This grows incredibly fast - it is called exponential growth because \( n \) is in the exponent.
For example, for \( n \) = 100 (just 100 items to process), try calculating \(2^100\) and see how much more time an exponential-time algorithm will take compared with a quadratic-time algorithm using \(100^2\) steps.
Algorithms that are \(O(2^n)\) are usually trying out every possible solution to find which is best.
Examples include generating all subsets of a set of items; and trying all combinations of vertices in vertex cover.

The following chart compares \(n^2\) with \(2^n\) - you can hardly see the blue \(n^2\) line (it looks like it’s stuck at the bottom) - the exponential line just heads for the roof impossibly fast.

{image file-path="img/chapters/n2vs2n.png" alt="An image showing the graph of O(2^n) comapred to O(n^2)"}

**\(O(n!)\):** This is factorial time, and usually comes up when trying every order that a set of items can be placed in.
A brute-force solution to the Travelling Salesperson problem does this; after the starting point, there’s a choice of \(n-1\) places to visit first, then \(n-2\) to visit second, and so on.
This works out at \((n-1)!\) orderings for visiting all the locations.
This value grows incredible fast as \( n \) increases.
