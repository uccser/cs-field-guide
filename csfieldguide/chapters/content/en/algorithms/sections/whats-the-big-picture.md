# What's the big picture?

Computers are incredibly fast at manipulating, moving and looking through data.
However the amount of data computers use is often so large that it doesn't matter how fast the computer is, it will take it far too long to examine every single piece of data (companies like Google, Facebook and Twitter routinely process billions of things per day, and in some cases, per minute!).
This is where algorithms come in.
If a computer is given a better algorithm to process the data then it doesn't matter how much information it has to look through, it will still be able to do it in a reasonable amount of time.

{interactive slug="sorting-algorithm-comparison" type="in-page"}

If you have read through the Introduction chapter you may remember that the speed of an application on a computer makes a big difference to a human using it.
If an application you create is too slow, people will get frustrated with it and won't use it.
It doesn't matter if your software is amazing, if it takes too long they will simply give up and try something else!

## Algorithms, programs and informal instructions

At this stage you might be thinking that algorithms and computer programs kind of sound like the same thing, but they are actually two very distinct concepts.
They are each different ways of describing how to do something, but at different levels of precision:

Often you can get away with describing a process just using some sort of informal instructions using natural language; for example, an informal instruction in a non computing context might be
"please get me a glass of water".
A human can understand what this means and can figure out how to accomplish this task by thinking, but a computer would have no idea how to do this!

{interactive slug="high-score-boxes" type="whole-page" text="High Score Boxes"}

An example in a computational context might be if you wanted to find a high score in a table of scores:
go through each score keeping track of the largest so far.
Informal instructions like this aren't precise; there's no way that a computer could follow those instructions exactly, but a human could probably get the general idea of what you mean if they know what you're trying to achieve.
This sort of description is only useful for quickly giving another human the general idea of what you mean, and even then there's a risk that they won't properly understand it.

In contrast, an algorithm is a step by step process that describes how to solve a problem and/or complete a task, which will always give the correct result.
For our previous non-computing example, the algorithm might be

1. Go to the kitchen.
2. Pick up a glass.
3. Turn on the tap.
4. Put the glass under the running water and remove it once it is almost full.
5. Turn off the tap.
6. Take the glass back to the person who gave the instruction.

A human could follow these instructions easily, but it's still using general English language rather than a strict list of computer instructions.

Algorithms are often expressed using a loosely defined format called [pseudo-code](https://en.wikipedia.org/wiki/Pseudocode), which matches a {glossary-link term="programming-language"}programming language{glossary-link end} fairly closely, but leaves out details that could easily be added later by a programmer.
Pseudocode doesn't have strict rules about the sorts of commands you can use, but it's halfway between an informal instruction and a specific computer program.

With the high score problem, the algorithm might be written in pseudo-code like this:

```text
if the table is empty
  display that there is no high score, and quit
otherwise, note the first score in the table
for each of the other scores in the table,
  if that score is larger than the one noted,
    replace the noted one with the current score
display the currently noted score
```

Algorithms are more precise than informal instructions and do not require any insight to follow. Informal instructions are still not precise enough for a computer to follow in the form they are written, but are precise enough for a human so they can then work out how to implement your algorithm, either doing it themselves, or writing a computer program to do it.
The other important thing with this level of precision is that we can often make a good estimate of how fast it will be.
For the high score problem above, if the score table gets twice as big, the algorithm will take about twice as long.
If the table could be very big (perhaps we're tracking millions of games and serving up the high score many times each second), that might already be enough to tell us that we need a better algorithm to track high scores regardless of which language it's going to be programmed in; or if the table only ever has 10 scores in it, then we know that the program is only going to do a few dozen operations, and is bound to be really fast even on a slow computer.

The most precise way of giving a set of instructions is in the form of a program, which is a specific implementation of an algorithm, written in a specific programming language, with a very specific result for any particular input.
This is the most precise of these three descriptions and computers are able to follow and understand these.

For the example with getting a drink, we might program a robot to do that; it would be written in some programming language that the robot's computer can run, and would tell the robot exactly how to retrieve a glass of water and bring it back to the person who asked for the water.

With the high-score problem, it would be written in a particular language; even in a particular language there are lots of choices about how to write it, but here's one particular way of working out a high score (don't worry too much about the detail of the program if the language isn't familiar; the main point is that you could give it to a computer that runs Python, and it would follow the instructions exactly):

```python3
def find_high_score(scores):
    if len(scores) == 0:
        print("No high score, table is empty")
        return -1
    else:
        highest_so_far = scores[0]
        for score in scores[1:]:
            if score > highest_so_far:
                highest_so_far = score
        return highest_so_far
```

But here's another program that implements exactly the same algorithm, this time in the Scratch language.

{image file-path="img/chapters/highscore-in-scratch.png" alt="High score program in Scratch"}

Both of the above programs are the same algorithm.
In this chapter we'll look in more detail about what an algorithm is, and why they are such a fundamental idea in computer science.
Because algorithms exist even if they aren't turned in to programs, we won't need to look at programs at all for this topic, unless you particularly want to.

{glossary-link term="algorithm" reference-text="algorithm cost"}{glossary-link end}

### Algorithm cost

When Computer Scientists are comparing algorithms they often talk about the 'cost' of an algorithm.
The cost of an algorithm can be interpreted in several different ways, but it is always related to how well an algorithm performs based on the size of its input, *n*.
In this chapter we will talk about the cost of an algorithm as either the time it takes a program (which performs the algorithm) to complete, or the number of steps that the algorithm makes before it finishes.

For example, one way of expressing the cost of the high score algorithm above would be to observe that for a table of 10 values, it does about 10 sets of operations to find the best score, whereas for a table of 20 scores, it would do about twice as many operations.
In general the number of operations for a table of *n* items will be proportional to *n*.
Not all algorithms take double the time for double the input; some take a lot more than double, while others take a lot less.
That's worth knowing in advance because we usually need our programs to scale up well; in the case of the high scores, if you're running a game that suddenly becomes popular, you want to know in advance that the high score algorithm will be fast enough if you get more scores to check.

{panel type="extra-for-experts"}

# Algorithm complexity

The formal term for working out the cost of an algorithm is [algorithm analysis](https://en.wikipedia.org/wiki/Analysis_of_algorithms), and we often refer to the cost as the algorithm's *{glossary-link term="complexity"}complexity{glossary-link end}*.
The most common complexity is the "time complexity" (a rough idea of how long it takes to run), but often the "space complexity" is of interest - how much memory or disk space will the algorithm use up when it's running?

There's more about how the cost of an algorithm is described in industry, using a widely agreed on convention called {glossary-link term="big-o"}'Big O Notation'{glossary-link end}, in the ["The whole story!"]('chapters:chapter_section' 'algorithms' 'the-whole-story') section at the end of this chapter.

{panel end}

The amount of time a program which performs the algorithm takes to complete may seem like the simplest cost we could look at, but this can actually be affected by a lot of different things, like the speed of the computer being used, or the programming language the program has been written in.
This means that if the time the program takes to complete is used to measure the cost of an algorithm it is important to use the same program and the same computer (or another computer with the same speed) for testing the algorithm with different numbers of inputs.

The number of operations (such as comparisons of data items) that an algorithm makes however will not change depending on the speed of a computer, or the programming language the program using the algorithm is written in.
Some algorithms will always make the same number of comparisons for a certain input size, while others might vary.

## Algorithm correctness

If we develop or are given an algorithm to solve a problem, how do we know that it works?
Sometimes we create test cases to verify the algorithm produces correct output for specific input values.
While this is a useful practice and can help verify that we are on the right track, it is not enough to show that our algorithm is correct.
The old saying "even a broken watch is correct twice a day" is a good analogy.
Even an algorithm that is correct for two test cases might be incorrect for every other input.
A computer scientist must reason formally or mathematically about an algorithm to show its correctness.
Typically this is done by classifying ranges of input values and showing that algorithm produces expected results for boundary values of the range and all values in between.

Correctness is particularly important when comparing two algorithms that solve the same problem.
If one algorithm is very fast to complete but produces incorrect results some of the time it may be far less useful than a correct algorithm that is slower.
Correctness is also important when using an algorithm as the building block for another algorithm.
Here is an algorithm for assigning animals as pets to people on a waitlist:

1. Search for the person who is earliest on the waitlist
2. Assign the person who is earliest on the waitlist with their preferred animal as a pet
3. Repeat 1-2 until no people remain on the waitlist

This algorithm relies on a correct search algorithm in the first step.
If the search algorithm incorrectly chose a random person, the algorithm for assigning animals as pets would also be incorrect.

As you will see in this chapter with searching and sorting there are multiple correct algorithms for the same problem.
Often there are good reasons to know multiple correct algorithms because there are tradeoffs in simplicity, algorithm cost, and assumptions about inputs.

## Searching and sorting

In this chapter we will look at two of the most common and important types of algorithms, searching and sorting.
You probably come across these kinds of algorithms every time you use a computer without even realising!
They also happen to be great for illustrating some of the key concepts that arise with algorithms.

{glossary-link term="algorithm" reference-text="searching algorithms"}{glossary-link end}
