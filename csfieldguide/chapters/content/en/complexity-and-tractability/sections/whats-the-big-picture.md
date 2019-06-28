# What's the big picture?

The area of *tractability* explores problems and algorithms that can take an impossible amount of computation to solve except perhaps for very small examples of the problem.

We'll define what we mean by {glossary-link term="tractable" reference-text="complexity and tractability chapter"}tractable{glossary-link end} later on, but put very crudely, a tractable problem is one which we can write programs for that finish in a reasonable amount of time, and an intractable problem is one that will generally end up taking way too long.

Knowing when a problem you are trying to solve is one of these hard problems is very important.
Otherwise it is easy to waste huge amounts of time trying to invent a clever program to solve it, and never getting anywhere.
A computer scientist needs to be able to recognise a problem as an intractable problem, so that they can use other approaches.
A very common approach is to give up on getting a perfect answer, and instead just aim for an approximately correct answer.
There are a variety of techniques for getting good approximate answers to hard problems; a way of getting an answer that isn't guaranteed to give the exact correct answer is sometimes referred to as a *heuristic*.

One important example of an intractable problem that this chapter looks at is the travelling salesman problem (TSP for short).
It's a simple problem; if you've got a collection of places that you need to visit, and you know the distance to travel between each pair of places, what's the shortest route that visits all of the places exactly once?
This is a very practical problem that comes up with courier vehicles choosing routes to deliver parcels, rock bands planning tours, and even a designated driver dropping friends off after an event.
In fact, the measurement between cities doesn’t have to be distance.
It could actually be the dollar cost to travel between each pair of cities.
For example, if you needed to visit Queenstown, Christchurch, Auckland, and Wellington one after the other while minimising airfares and you knew the cost of an airfare between each pair of those 4 cities, you could work out what the cheapest way of flying to each of them is.
This is still an example of TSP.
It can also be applied to problems that don't involve travel; for example, it has been used to [work out how to efficiently synthesise DNA](http://www.i-programmer.info/news/181/9340.html).

The following interactive has a program that solves the problem for however many cities you want to select by trying out all possible routes, and recording the best so far.
You can get a feel for what an intractable problem looks like by seeing how long the interactive takes to solve the problem for different size maps.
Try generating a map with about 5 cities, and press "Start" to solve the problem.

{interactive slug="city-trip" type="whole-page"}

Now try it for 10 cities (twice as many).
Does it take twice as long?
How about twice as many again (20 cities)?
What about 50 cities?
Can you guess how long it would take?
You're starting to get a feel for what it means for a problem to be *intractable*.

Of course, for some situations, intractable problems are a good thing.
In particular, most security and cryptography algorithms are based on intractable problems; the codes could be broken, but it would take billions of years and so would be futile.
In fact, if anyone ever finds a fast algorithm for solving such problems, a lot of computer security systems would stop being secure overnight!
So one of the jobs of computer scientists is to be confident that such solutions *don't* exist!

In this chapter we will look at the TSP and other problems for which *no* tractable solutions are known, problems that would take computers millions of centuries to solve.
And we will encounter what is surely the greatest mystery in computer science today: that *no-one knows* whether there's a more efficient way of solving these problems!
It may be just that no-one has come up with a good way yet, or it may be that there is no good way.
We don't know which.

{image file-path="img/chapters/xkcd-np-complete-cartoon.png" hover-text="General solutions get you a 50% tip." alt="A xkcd comic about NP complete" source="https://xkcd.com/287/"}

But let's start with a familiar problem that we can actually solve.
