# Algorithms

{teacher}
The following assessment plans also cover this material:

**New Zealand - AS91074 (1.44)**
- [Assessment Overview](/appendices/assessment_guides/new_zealand/assessment-guide-level-1-introduction.html)
- [Searching Algorithms Assessment Guide](/appendices/assessment_guides/new_zealand/assessment-guide-level-1-searching-algorithms.html)
- [Sorting Algorithms Assessment Guide](/appendices/assessment_guides/new_zealand/assessment-guide-level-1-sorting-algorithms.html)
{teacher end}

{comment explain different views of algorithm (programming context) and Algorithm (that have interesting complexity); use https://www.youtube.com/watch?v=6hfOvs8pY1k for the former?}

{include video http://www.youtube.com/embed/FOwCCvHEfY0}

## What's the big picture?

Every computer device you have ever used, from your school computers to your calculator, has been using algorithms to tell it how to do whatever it was doing. Algorithms are a very important topic in Computer Science because they help software developers create efficient and error free programs. The most important thing to remember about algorithms is that there can be many different algorithms for the same problem, but some are much better than others!

{include interactive sorting_animation}

Computers are incredibly fast at manipulating, moving and looking through data. However the amount of data computers use is often so large that it doesn't matter how fast the computer is, it will take it far too long to examine every single piece of data (companies like Google, Facebook and Twitter process about 1 billion things per day). This is where algorithms come in. If a   computer is given a better algorithm to process the data then it doesn't matter how much information it has to look through, it will still be able to do it in a reasonable amount of time.

If you have read through the Introduction chapter you may remember that the speed of an application on a computer makes a big difference to a human using it. If an application you create is too slow, people will get frustrated with it and won't use it. It doesn't matter if your program can solve all their life problems, if it takes too long they will simply get bored and close it!

### Algorithms, Programs and Informal Instructions

At this stage you might be thinking that algorithms and computer programs kind of sound like the same thing, but they are actually two very distinct concepts. Descriptions of these and another important concept, Informal Instructions, are below. They are each different ways of describing how to do something:
- **Informal Instruction:** An instruction using natural language. They are un-precise so computers cannot understand them, but humans are able to use their own intelligence to interpret them. This is the least precise of our three descriptions for doing things, and is typically used to give a very simple description of the general idea of an algorithm. 
- **Algorithm:** step by step process that describes how to solve a problem and/or complete a task, which will always give a result. They are more precise than Informal Instructions and do not require any knowledge or intelligence to follow, however they are still not precise enough for a computer to follow. These are often expressed using [pseudo-code](http://en.wikipedia.org/wiki/Pseudocode), which matches a programming language fairly closely, but leaves out details that could easily be added later by a programmer, and doesn't specify the kinds of commands that can be used.
- **Program:** a specific implementation of an algorithm, which is written in a specific programming language and will give a certain result. This is the most precise of these three descriptions and computers are able to follow and understand these. 

For example...
- **Informal Instruction:** "Get me a glass of water". A human can understand what this means and can figure out how to accomplish this task by thinking, but a computer would have no idea how to do this!
- **Algorithm:** 1) Go to the kitchen. 2) Pick up a glass. 3) Turn on the tap. 4) Put the glass under the running water and remove it once it is almost full. 5) Turn off the tap. 6) Take the glass back to the person who gave the instruction. A human could follow these instructions easily, but a computer could not figure out exactly what to do.
- **Program:** A computer program, written in a programming language, which would tell a robot exactly how to retrieve a glass of water and bring it back to the person who asked for the water.

### Algorithm cost

When Computer Scientists are comparing algorithms they often talk about the 'cost' of an algorithm. The cost of an algorithm can be interpreted in several different ways, but it is always related to how well an algorithm performs based on the size of its input, *n*. In this chapter we will talk about the cost of an algorithm as either the time it takes a program (which performs the algorithm) to complete, and the number of comparisons the algorithm makes before it finishes.

The amount of time a program which performs the algorithm takes to complete may seem like the simplest cost we could look at, but this can actually be affected by a lot of different things, like the speed of the computer being used, or the programming language the program has been written in. This means that if the time the program takes to complete is used to measure the cost of an algorithm it is important to use the same program and the same computer (or another computer with the same speed) for testing the algorithm with different numbers of inputs. 

The number of comparisons an algorithm makes however will not change depending on the speed of a computer, or the programming language the program using the algorithm is written in. Some algorithms will always make the same number of comparisons for a certain input size, while others might vary.

If you want to find out more about how the cost of an algorithm is described in industry, with 'Big-O Notation', then check out "The Whole Story!" section at the end of this chapter.

### Searching and Sorting

In this chapter we will look at two of the most common and important types of algorithms, Searching and Sorting. You probably come across these kinds of algorithms every time you use a computer without even realising! 

{teacher}
**Key Concepts**
- What an algorithm is and how it differs from the related concepts of programs and informal instructions.
- That an algorithm has an associated cost, that this cost may be non-linear and is related to both running-time (of a program implementing the algorithm) and computational complexity.
- That two algorithms may have different costs even if they solve the same problem and that this difference in costs can be non-linear.

For students reports:
- All of the algorithms in this chapter are suitable.
- Programs which compare several of the algorithms in this chapter are available to download
- **Achieved:** describe the differences between an algorithm, a program and informal instructions. Describe an algorithm and show understanding of the steps it involves. Report the cost of the algorithm for an input (one value of n).
- **Merit:**  Explain the difference between an algorithm, a program and informal instructions. Report the cost of the algorithm for a range of different inputs (different values of n).
- **Excellence:** Compare and contrast the concepts of an algorithm, a program and informal instructions. Report the cost of two different algorithms (for the same task) for a range of different values of *n* and talk about the differences in their costs.

More information on this can be found at the end of the chapter.
{teacher end}

## Searching

{teacher}
The present searching game in this section is split into two parts, the first corresponds to the Linear Search algorithm (also known as Sequential Search) and the second corresponds to Binary Search. We recommend you play through the levels yourself for a while, or after reading this description. It is based on the [CS Unplugged Battleships game](http://csunplugged.com/searching-algorithms) which can be used as a classroom activity to enforce the lessons in this chapter (the hashing activity is not used for the present searching game). The present searching game can be done individually by students as they read through the chapter, in groups or as a class activity.

To run this as a classroom activity get all the students to play each section of the game at the same time and then when they have all finished have a discussion about the results. After students have finished the first part ask them questions like "Did anyone find the pet on the first go?", "Did anyone only find it after checking every other present?", or find the average number of presents students had to open to find the pet (this should be around 5 for the first level and around 10 for the second). 

While they are playing the second part some may have trouble finding the correct algorithm to find the pet. If they are finding these levels confusing you can give them a hint like "Why don't you start by opening the present in the centre" and when they do ask them "What does the number you found tell you about all the numbers before it?" if the number is smaller than the one they are looking for, or "all the numbers after it?" if the number is bigger than the one they are looking for. 

When students have finished ask them questions like "Where you able to find the pet even though you had less lives? What strategy did you use to find the pet?", we have found that many students will have ended up doing a binary search (or similar) without even knowing what a binary search is! Explaining these algorithms to students is likely to be easier now that they have seen them in action.
{teacher end}

Searching through collections of data is something computers have to do all the time. It happens every time you type in a search on Google, or when you type in a file name to search for on your computer. Computers deal with such huge amounts of data that we need fast algorithms to help us find information quickly. Lets investigate searching with a game...

{teacher}
Screenshots and an accompanying explanation of what a student has done (step by step would be best) would be sufficient evidence for 'demonstrating understanding of the key characteristics and role of an algorithm' for their 1.44 reports.
{teacher end}

{include interactive_external searching_boxes title="Searching Boxes - Part 1" parameters="max=2"}

You may have noticed that the numbers on the monsters and pets in the game were in a random order, which meant that finding the pet was basically luck! You might have found it on your first try, or if you were less lucky you might have had to look inside almost all the presents before you found it. This might not seem like such a bad thing since you had enough lives to look under all the boxes, but imagine if there had been 1,000 boxes, or worse 1,000,000! It would have taken far too long to look through all the boxes and the pet might have never been found.

Now this next game is slightly different. You have less lives, which makes things a bit more challenging, but this time the numbers inside the boxes will be in order. The monsters, or maybe the pet, with the smallest number is in the present on the far left, and the one with the largest number is in the present on the far right. Let's see if you can collect all the pets without running out of lives...

{include interactive_external searching_boxes title="Searching Boxes - Part 2" parameters="level=3"}

Now that you have played through the whole game (and hopefully found all of the lost pets!) you may have noticed that even though you had less lives in the second part of the game, and lots of presents to search through, you were still able to find the pet. Why was this possible?

### Two contrasting search algorithms

{teacher}
This section focuses on the Linear (Sequential) and Binary Search algorithms; they provide a good contrast in performance to show that different algorithms for the same problem can take very different amounts of time.
{teacher end}

Since the boxes in the first game were in a random order there really wasn't any strategy you could have used to find the pet, except simply keep opening presents one by one until you found the pet. This is very similar to the Linear Search Algorithm (sometimes called a sequential search). In plain english, this algorithm is as follows:
- Check if the first item in a list is the item you are searching for, if it is the one you are looking for, you are done.
- If it isn't the item you are searching for move on and check the next item.
- Continue checking items until you find the one you are searching for.

If you used this algorithm you might get lucky and find what you are looking for on your first go, but if you were really unlucky you might have to look through everything in your list before you found the right object! For a list of 10 items this means on average you would only have to look at 5 items to find what you were looking for, but for a list of 10000 you would have to look through on average 5000.

{curiosity}
#### Bozo Search

If you watched the video at the beginning of the chapter you might be thinking that what you did in the present searching game sounds more like Bozo Search than Linear Search, but actually Bozo Search is even sillier than this! If you were doing a Bozo Search then after unwrapping a present and finding a monster inside, you would wrap the present back up before you moved on to the next one! This means you might end up checking the same present again and again and again and you might never find the pet, even with a small number of presents!
{curiosity end}

A much better algorithm to use is called Binary Search. In the second part of the present searching game the boxes were in order, which meant you were able to be more clever when you were searching for the pet, and you might have been using a Binary Search without realising... 

{teacher}
The binary search algorithm can be demonstrated with a phone book: choose a name, then open at the*middle* page of the book (students might point out that you could guess how far through to open it, but insist on starting in the middle). Rip the book in half at the chosen page, and ask the class which of the two halves contains the name (the ones before the middle, or the ones after). Throw away the half that can't contain the name, pointing out that hundreds of pages have been eliminated by one decision. Repeat this on the remaining half, ripping that in half, then half again, and so on. On the board you can work out the number of pages left; for example, if there were 512 pages in the phone book, after the first rip there are 256, then 128, then 64, 32, 16, 89, 4, 2 and finally just one page. That's  9 pages that were examined to get down to the desired page. (Note that it's easiest to pick numbers that are powers of 2 i.e. 512, 1024, 2048, otherwise you have to deal with halving odd numbers, which works fine, but is a bit distracting). The power of binary search becomes obvious when you ask how long it would take to search a book twice as large. The first rip on the larger book will reduce it to the original problem, so, for example, a book of 1024 pages requires 10 rips instead of the 9 used for 512 pages. A million page phone book (1,048,576 pages to be precise) is reduced to 1 page by only 20 rips (students will probably think that it will be a lot more, but they can work it out by halving 1,048,576 20 times). A billion pages requires only 30 rips - again, have students work this out for themselves, as it is surprising. You could point out that a billion-page phone book could hold every name in the world, and in fact a social network site could have a billion users on it, so searching for someone on a billion-user system could be done *by hand* looking at just 30 names. The catch? They need to be in sorted order, but sorting things into order is easy too if you use the right algorithm. (In practice large systems use a variation of this kind of sorting, but this demonstrates how a very fast algorithm is possible).
{teacher end}

If you used a Binary Search on each of the levels then you would have always had enough lives to find the pet! Informally, the Binary Search algorithm is as follows:
- Look at the item in the centre of the list and compare it to what you are searching for
- If it is what you are looking for then you are done.
- If it is larger than the item you are looking for then you can ignore all the items in the list which are larger than that item (if the list is from smallest to largest this means you can ignore all the items to the right of the centre item).
- If it is smaller then you can ignore all the items in the list which are smaller than that centre item.
- Now repeat the algorithm on the remaining half of the list, checking the middle of the list and choosing one of the halves, until you find the item you are searching for.

Binary Search is a very powerful algorithm. If you had 1000 presents to Search through it would take you at most 10 checks for Binary search to find something and Linear search would take at most 1000 checks, but if you doubled the number of presents to search through how would this change the number of checks made by Binary Search and Linear search? 

Hopefully you've noticed that the answer for each of these algorithms would be different.

{teacher}
The answer to the above question is that the maximum number of checks for Linear Search would double, but the maximum number for Binary Search would only increase by one.

Linear and Binary Search are both good algorithms to look at for 1.44 and a comparison of these two is good for Excellence.
{teacher end}

It is important to remember that you can only perform a Binary Search if the items you are searching through are sorted into order. This makes the sorting algorithms we will look at next even more important because without sorting algorithms we wouldn't be able to use Binary Search to quickly look through data!

{teacher}
The output from these programs can be used in students reports for reporting the cost of algorithms for values of *n*.
{teacher end}

The following files will run linear and binary search in various languages:
- [Scratch]{include file linear-binary-search-scratch.zip}
- [Python (Version 2)]{include file linear-binary-search-python2.py}
- [Python (Version 3)]{include file linear-binary-search-python3.py}
