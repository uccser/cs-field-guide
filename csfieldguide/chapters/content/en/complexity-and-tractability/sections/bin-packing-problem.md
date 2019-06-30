# Bin packing problem

The bin packing problem is another intractable problem that is encountered in many different forms in everyday life.
In the bin packing problem there are a number of items of varying sizes and the goal is to minimise the number of bins required to fit all the items.
A real life example of this would be packing boxes into the back of a truck.

There is no known tractable solution to this problem, which means that we only currently have exponential-time algorithms that work out the minimum number of bins needed.
However, there are a number of heuristics that can very quickly give a non-optimal solution.
One of these is the first fit algorithm.
This algorithm uses the following steps:

1. Select an item.
2. Place it in the first bin that has space available for it.
   If there are no bins with space, add a new bin.

These steps are repeated until there are no items left.

A variation of the first fit algorithm involves sorting the items in decreasing order first.
This means the largest items are packed first.

Try out these algorithms or your own ideas using this interactive:

{interactive slug="bin-packing" type="whole-page" text="Bin Packing Interactive"}
