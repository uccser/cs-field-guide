# The whole story!

We've only really scratched the surface of algorithms in this chapter, as there are millions of different algorithms for millions of different problems!
Algorithms are used in maths, route planning, network planning and operation, problem solving, artificial intelligence, genetic programming, computer vision, the list goes on and on!
But by going through this chapter you should have gained an understanding of the key concepts of algorithms and will be well prepared to tackle more complicated ones in the future.

The algorithms introduced in this chapter aren't even necessarily the best for any situation; there are several other common ways of searching (e.g. hashing and search trees) and sorting (e.g. mergesort), and a computer scientist needs to know them, and be able to apply and fine tune the right one to a given situation.

In this chapter we have only talked about the number of comparisons an algorithm makes, and the amount of time a program takes to complete as 'costs' of algorithms.
There are actually many other ways of measuring the cost of an algorithm.
These include the amount of memory the algorithm uses and its computational complexity.

An algorithm often uses computer memory to store temporary data such as a partial sum of a list of numbers or a list of products that match some search criteria.
With the large size of modern computer memory this may seem to not be as important as the number of steps an algorithm takes, but a poorly performing algorithm in terms of computer memory may be limited in its ability to work with the large data sets common in many industry applications.
For example, a query algorithm that stored even a single bit for each record it searched could quickly overwhelm a web server's memory if it was searching a large data set such as Netflix's current movie offerings.
Minimising memory usage while also minimizing the number of steps an algorithm takes is not always possible; there is often a tradeoff between computation and memory usage.

Computer Scientists use '{glossary-link term="big-o"}Big O notation{glossary-link end}' to more accurately describe the performance or complexity of an algorithm, and you are likely to come across this notation very quickly when investigating the performance of algorithms.
It characterises the resources needed by an algorithm and is usually applied to the execution time required, or sometimes the space used by the algorithm.

{panel type="extra-for-experts"}

# Examples of Big O notation

Here are some Big O examples:

- \( O(1) \)
    - An algorithm with \( O(1) \) complexity will always execute in the same amount of time regardless of how much data you give it to process. For example, finding the smallest value in a sorted list is always easy.
- \( O(n) \)
    - The amount of time an algorithm with \( O(n) \) complexity will take to execute will increase roughly linearly with (i.e. in direct proportion to) the amount of data you give it to process. The high-score algorithm was \( O(n) \), and so was the linear search.
- \( O(n^2) \)
    - The performance of an algorithm with this complexity is roughly proportional to the square of the size of the input data set. Selection sort and insertion sort take \( O(n^2) \) time. That's not very good value &ndash; 10 times the amount of input will take 100 times as long!
- \( O(2^n) \)
    - The amount of time an algorithm with this complexity will take to complete will double with each additional element added to the data set! We haven't seen these kinds of situations in this chapter, but they are common, and are a theme of the [Complexity and Tractability chapter]('chapters:chapter' 'complexity-and-tractability'). Algorithms that are this slow can be almost impossible to use!

{panel end}

Big O notation however requires some advanced mathematics to explore thoroughly so has been intentionally left out of this main chapter, but if you want to learn more check out the [Further reading]('chapters:chapter_section' 'algorithms' 'further-reading') section.
These topics are looked at in more depth in the [Complexity and Tractability chapter]('chapters:chapter' 'complexity-and-tractability').

To make things even more complicated, theoretical analysis techniques such as Big O Notation are extremely useful when designing and predicting performance but empirical analysis such as stopwatch timing shows that in practice algorithm performance can vary greatly due to hardware and operating system design.
Most computers have cached memory and virtual memory, where the time to access a particular value can be particularly short, or particularly long.
There is a whole range of algorithms that are used for this situation to make sure that the algorithm still runs efficiently in such environments.
Such algorithms are still based on the ideas we've looked at in this chapter, but require some clever adjustments to ensure that they work well.
