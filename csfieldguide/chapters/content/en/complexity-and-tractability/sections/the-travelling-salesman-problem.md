# The Travelling Salesperson Problem

An example of an intractable problem is the travelling salesperson problem (TSP).
The TSP involves a bunch of locations (cities, houses, airports,....) where you can travel between any possible pair of locations.
The goal is to find the shortest route that will go through all the locations once &ndash; this is what the City Trip interactive below (and at the start of this chapter) does.

{interactive slug="city-trip" type="whole-page"}

Researchers have spent a lot of time trying to find efficient solutions to the travelling salesperson problem, yet have been unable to find a *tractable* algorithm for solving it.
As you learnt in the previous section, *intractable* algorithms are very slow, to the point of being impossible to use.
As the only solutions to TSP are intractable, TSP is known as an *intractable problem*.

It hasn’t actually been *proven* that there is no tractable solution to TSP, although many of the world’s top computer scientists have worked on this problem for the last 40 years, trying to find a fast algorithm but without success.
What they have managed to do is find thousands of other problems that are also intractable, and more importantly, if a solution is found for any one of these problems, we know how to convert it to a solution for any of the others (these are called NP-complete problems).
They all stand and fall together, including the TSP problem.
So it's not just being lazy if you give up on finding an optimal TSP algorithm &ndash; people have tried for decades and not found a tractable algorithm.
Of course, this is also a strong motivator to try to find one &ndash; if you do, you will have solved thousands of other problems at the same time!
This is a great thing for a researcher to do, but if you have a program to get finished by the end of the month, it's not a good bet to work on it.

Current algorithms for finding the optimal TSP solution aren't a lot better than simply trying out all possible paths through the map (as in the interactive at the start of this chapter).
The number of possible paths gets out of hand; it's an intractable approach.

While TSP was originally identified as being the problem that sales people face when driving to several different locations and wanting to visit them in the order that leads to the shortest route (less petrol usage), the same problem applies to many other situations as well.
Courier and delivery companies have variants of this problem &ndash; often with extra constraints such as limits on how long a driver can work for, or allowing for left hand turns being faster than right-hand ones (in New Zealand at least!).

{panel type="teacher-note"}

# More on the TSP

There is an extensive website about the state of the art for the TSP at [http://www.tsp.gatech.edu/](http://www.tsp.gatech.edu/).
This includes games and information about the current largest solved problem (which typically take months or years to run on very powerful computers).

{panel end}

{comment Put in a paragraph or two about the greedy heuristic as a practical way to solve the problem but point out that it's not the best heuristic. Give some % bounds to give an idea of the accuracy - according to https://en.wikipedia.org/wiki/Travelling_salesman_problem#Heuristic_and_approximation_algorithms the greedy algorithm averages 25% worse than optimal; there are more complex algorithms that typically come within about 3% of optimal.}

Since these problems are important for real companies, it is not reasonable to simply give up and say there is no solution.
Instead, when confronted with an intractable problem, computer scientists look for algorithms that produce approximate solutions &ndash; solutions that are not perfectly correct or optimal, but are hopefully close enough to be useful.
By relaxing the requirement that the solution has to be perfectly correct, it is often possible to come up with tractable algorithms that will find good enough solutions in a reasonable time.
This kind of algorithm is called a {glossary-link term="heuristic"}heuristic{glossary-link end} &ndash; it uses rules of thumb to suggest good choices and build up a solution made of pretty good choices.

A simple heuristic that often works okay is a {glossary-link term="greedy-algorithm"}greedy heuristic algorithm{glossary-link end} &ndash; an algorithm that just takes what looks like the best choice at each step.
For example, for the TSP, a greedy heuristic algorithm might repeatedly take the route to the next closest city (this is called the nearest neighbour heuristic).
This won’t always be the best choice, but it is very fast, and experience shows that it is typically no more than 25% worse than the optimal.
There are more sophisticated ways of designing approximate algorithms that can do better than this (some can get within 3% of optimal for the TSP), but they take longer to run.

There are software companies that work on trying to make better and better approximate algorithms for guiding vehicles by GPS for delivery routes.
Companies that write better algorithms can charge a lot of money if their routes are faster, because of all the fuel and time savings that can be made.

An interesting thing within tractability is that you can have two very similar problems, with one being intractable and the other being tractable.
For example, finding the shortest route between two points (like a GPS device usually does) is a tractable problem, yet finding the shortest route around multiple points (the TSP) isn't.
By the way, finding the *longest* path between two points (without going along any route twice) is also intractable, even though finding the *shortest* path is tractable!
