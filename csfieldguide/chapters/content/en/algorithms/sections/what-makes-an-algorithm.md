# What makes an algorithm?

We've looked at algorithms that solved well known computational problems of sorting and searching data.
When a computer scientist approaches a new computational problem that does not already have a well known solution they must create an algorithm.

There are three building blocks to develop a new algorithm: sequencing, selection, and iteration.
One interesting early result in computer science is that combined, these three building blocks are sufficient to represent any algorithm that solves a computational problem!

## Sequencing

Sequencing is the technique of deciding the order instructions are executed to produce the correct result.
Imagine that we have the following instructions (A, B, C) to make a loaf of bread:

- **A** llow to sit at room temperature for 1 hour
- **B** ake for 30 minutes
- **C** ombine ingredients

C->A->B is a standard algorithm for a yeast bread.
A different sequence, for example C->B->A, might produce a result that is edible but not high quality.
Even worse, a sequence of B->C->A would not even produce something edible.

## Selection

Selection is the technique of allowing the algorithm to select which instructions to execute depending on criteria.
Using our previous bread baking example, our algorithm C->A->B works if the ingredients include yeast, but C->B would be faster if the ingredients do not include yeast (for example, the recipe might include baking powder as the rising agent).
Selection allows us to create one algorithm to solve both cases:

1. Combine ingredients
2. **If ingredients contain yeast,** allow to sit at room temperature for 1 hour
3. Bake for 30 minutes

## Iteration

Iteration allows an algorithm to repeat instructions.
In its simplest form we might specify the exact number of times.
For example, here is an algorithm to bake 2 loaves of bread:

1. **Repeat 2 times:**
    1. Combine ingredients
    2. If ingredients contain yeast, allow to sit at room temperature for 1 hour
    3. Bake for 30 minutes

This algorithm clearly works but it would take at least 3 hours to complete!
If we had to make 20 loaves we would probably want to design a better algorithm.
We could measure the size of the mixing bowl, how many loaves fit on the table to rise, and how many loaves we could bake at the same time in the oven.
Our algorithm might then look like:

1. **Repeat 10 times**:
    1. Combine ingredients **for 2 loaves**
    2. **Split dough into 2 bread pans**
    3. If ingredients contain yeast, allow to sit at room temperature for 1 hour
    4. Bake bread pans in the same oven for 30 minutes

But what if we upgraded to a larger kitchen?
Most algorithms are written to combine iteration with selection to handle arbitrarily large amounts of data (i.e. an unknown number of loaves of bread).
We might create a general purpose bread baking algorithm:

1. **While we have enough ingredients for at least one loaf:**
    1. Combine ingredients **for up to X loaves** (where X is the maximum number of loaves that can fit in the mixing bowl or rising table)
    2. Split dough into X bread pans
    3. If ingredients contain yeast, allow to sit at room temperature for 1 hour
    4. **While there are still bread pans on the rising table:**
        1. Move **up to Y loaves** from the rising table to the oven (where Y is the maximum number of loaves that can fit in the oven)
        2. Bake bread pans in the same oven for 30 minutes

*Astute observers will note that this algorithm is still inefficient because the rising table and oven are not used at the same time.
Designing algorithms that take advantage of parallelism is an important advanced topic in computer science.*

## Combining algorithms

One of the advantages of the building blocks perspective is that completed algorithms themselves can now be seen as new blocks we can build with.
We can connect complete algorithms or we can interleave parts of algorithms to create new algorithms.

For example, a recipe for croutons might be:

1. Cut a loaf of bread into 2cm cubes
2. Brush cubes lightly with olive oil and season with salt, pepper, and herbs
3. Bake on large tray, flipping the cubes halfway through

We can connect the algorithm for baking bread in the previous section to this algorithm to create a new algorithm that makes croutons from scratch.
If we required other ingredients for our recipe, we could connect multiple algorithms to build very complex algorithms.

Often when we have multiple algorithms that solve a problem there are advantages of each algorithm for specific cases.
Hybrid algorithms take parts of multiple algorithms and combine them to gain the advantages of both original algorithms.
For example, Timsort is one of the fastest known sorting algorithms in practice and it uses parts of insertion sort and merge sort.
Insertion sort is used on very small sequences to take advantage of its speed for already or partially ordered sequences.
Merge sort is used to merge these small sequences into larger ones to take advantage of the better upper bound on algorithm cost for large data sets.

{panel type="curiosity"}

# Why are there so many different programming languages?

So if we know how to define an algorithm, why are there so many {glossary-link term="programming-language"}programming languages{glossary-link end}?
Programming languages are often created or adapted to express algorithms clearly for a specific problem domain.
For example, it is easier to read mathematical algorithms in Python than Scratch.
Similarly, data flow algorithms are clearer in visual programming languages like LabVIEW than Python.

{panel end}
