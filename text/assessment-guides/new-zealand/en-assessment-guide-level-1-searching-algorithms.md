# Algorithms (1.44) - Searching Algorithms

{teacher}

This guide is not official, but is based information gained from a lot of experience with the standard, so reflects our best understanding of what is expected.

Note that there is an alternative project that instead focuses on sorting. Students should do only one of these projects for algorithms.

In 2012 we did a study that looked over 151 student submissions for 1.44 in 2011. This was the first year 1.44 was offered, although the lessons learnt are still relevant, particularly for teachers teaching the standard for the first time. A WIPSCE paper was written presenting our findings of how well students approached the standard and our recommendations for avoiding pitfalls. Some of the key findings are included in this teacher guide, although reading the entire paper would be worthwhile.

The paper was Bell, T., Newton, H., Andreae, P., & Robins, A. (2012). The introduction of Computer Science to NZ High Schools --- an analysis of student work. In M. Knobelsdorf & R. Romeike (Eds.), The 7th Workshop in Primary and Secondary Computing Education (WiPSCE 2012). Hamburg, Germany. The [paper is available here](http://nzacditt.org.nz/system/files/Student-work-WiPCSE2012-final-submission-dl.pdf).

{teacher end}

This is a guide for students attempting the *Algorithms* topic of digital technologies achievement standard 1.44 (AS91074).

In order to fully cover the standard, you will also need to have done projects covering the topics of *Programming Languages* and *Human Computer Interaction* in the standard, and included these in your report.

## Overview

The topic of *Algorithms* has the following bullet points in achievement standard 1.44, which this guide covers. This guide separates them into two categories.

### Comparing algorithms, programs, and informal instructions

**Achieved** (A1): “describing the key characteristics, and roles of algorithms, programs and informal instructions”

**Merit** (M1): “explaining how algorithms are distinct from related concepts such as programs and informal instructions”

**Excellence** (E1): “comparing and contrasting the concepts of algorithms, programs, and informal instructions”

### Determining the cost of algorithms and understanding various kinds of steps in algorithms

**Achieved** (A2): “describing an algorithm for a task, showing understanding of the kinds of steps that can be in an algorithm, and determining the cost of an algorithm for a problem of a particular size”

**Merit** (M2): “showing understanding of the way steps in an algorithm for a task can be combined in sequential, conditional, and iterative structures and determining the cost of an iterative algorithm for a problem of size *n*”

**Excellence** (E2): “determining and comparing the costs of two different iterative algorithms for the same problem of size *n*”

As with all externally assessed Digital Technology reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

[2.1 - What’s the big picture?](algorithms.html#whats-the-big-picture)

[2.2 - Searching Algorithms](algorithms.html#searching-algorithms)

## Project

This project involves understanding linear search and binary search.

### Writing your report for the main bullet points that cover algorithms

{teacher}

It is probably best to do A1/M1/E1 after the programming languages section has been done (as this might give students more of an idea of the difference between an algorithm and a program). Therefore, this teacher guide starts with A2/M2/E2. This teacher guide shows one way of approaching the standard, intended for teachers who do not yet have much experience with computer science.

{teacher end}

**Achieved**

Try both the box searching interactives linked to in the field guide. For one of them you have to use linear search, and for the other you have to use binary search.

Pick one of these algorithms to focus on for achieved. Carry out the interactive and then take a screenshot. Show on your screenshot which boxes you opened, and put how many boxes you opened. The number of boxes you opened is the *cost* of the algorithm in this particular case.

{teacher}

This covers:

"describing an algorithm for a task"

"determining the cost of an algorithm for a problem of a particular size"

{teacher end}

If you did the search with this same number of boxes lots of times (but with different numbers in the boxes), on average how many boxes would you need to check? This is the *cost* for a problem of this particular size (the problem size is the number of boxes).

{teacher}

This covers: "determining the cost of an algorithm for a problem of a particular size"

{teacher end}

Describe (in your own words with a few sentences) the overall process you carried out to search through the boxes. Try and make your explanation general, e.g. if you gave the instructions to somebody who needs to know how to search 100 boxes, or 500 boxes, the instructions would be meaningful.

{teacher}

This covers: "showing understanding of the kinds of steps that can be in an algorithm"

{teacher end}

**Merit/ Excellence**

{teacher}

Weaker students may be able to attempt an adapted assessment that just uses the interactives to cover merit/ excellence.

In order to really give students an appreciation of how good binary search is in practice, we have recommend looking at much larger problem sizes. This will allow them to see that it isn't even a plausible option to use linear search in many cases (with just a few items, they could rightfully argue that computers are so fast it doesn't matter which algorithm they use), and allow them to write convincing discussions at the excellence level.

Another practical application that may interest students is auto correct/flagging of misspelled words. A dictionary contains many words in alphabetical order, which needs to be searched in order to check whether or not words are valid. Students will learn in human computer interaction that if a computer takes longer than a tenth of a second to respond, this is noticeable (and potentially irritating/ frustrating to use) to people! So the problem is, how can the autocorrect appear as though it is working in real time?

While a super powerful computer could use either linear search or binary search with ease, your home computer is not likely to be this powerful. Linear search is likely to have very noticeable delays. So in this case, binary search is essential.

{teacher end}

For merit, you need to make it clear that you understand that algorithms can contain iterative, conditional, and sequential steps. If you don’t know what these terms mean, go have another look at the field guide. Get a Scratch program (or another language if you are fairly confident with understanding the language) that implements your sorting algorithm. Take a screenshot of it, or a large part of it (you want to ensure that the screenshot takes up no more than half a page in the report, but is still readable) and open it in a drawing program such as paint. Add arrows and notes showing a part of the algorithm that is sequential, part that is conditional, and part that is iterative.

{teacher}

"showing understanding of the way steps in an algorithm for a task can be combined in sequential, conditional, and iterative structures"

Or if the student’s description of the algorithm written for achieved is fairly well written, they could annotate that instead of the program code.

{teacher end}

It should be obvious by now that binary search is far better than linear search! Although you still might say, why not just use a faster computer? To explore this possibility, you are now going to analyse what happens with a **huge** amount of data. Pick a really large number (e.g. in the billions, or even bigger - this is the amount of data that large online companies have to search). Imagine you have this number of boxes that you have to search. Rather than actually carrying out the searching, you are going to determine how long it would take if you use linear search, and how long it would take if you used binary search. Computer scientists call this *analysing* an algorithm, and often it is better to work out how long an algorithm can be expected to take before waiting years for it to run and wondering if it will ever complete.

*Remember that you can use the [big number calculator](interactives/big-number-calculator/index.html) and the [time calculator](interactives/time-calculator/index.html) in the field guide.*

How many boxes on average will you have to search if you use a linear search?

What about with binary search? If you are unsure on how to calculate this, remember that each box you check cuts the number of boxes you still need to consider in half. Therefore, you can determine approximately how many boxes you will need to check by continually halving the total number of boxes until it gets down to 1. You should include all the working (i.e. the result of each division by 2) in your report.

Don’t worry if your answer isn’t perfect; it’s okay to be within 5 or so of the correct answer. This means that if while halving your number it  never gets down to exactly 1 (e.g. it gets down to 1.43 and then 0.715), your answer will be near enough. As long as you have halved your number repeatedly until it gets down to a number that is less than 1, your answer will be accurate.

{teacher}

This is important, because some students obsess over getting the "correct" answer, and in the case of binary search it can be quite challenging to be exactly correct because of ending up with fractional numbers.

The objective is for them to see the *massive* difference between binary and linear search. A slight margin of error in the binary search comparison count is nothing compared to the difference between the two algorithms.

{teacher end}

Calculate how long it would take for each algorithm, assuming you have a computer that can look in a million boxes per second. Don’t worry about being too accurate (e.g. just round to the nearest second, minute, hour, day, month, or year).

{teacher}

Again, it is important that students don't obsess about getting the math perfect, as it is not the point of the exercise.

{teacher end}

You should see a very big difference between the two numbers. What will happen if you have twice as many boxes? What about four times as many? How long will it take for each algorithm? You should easily be able to calculate these numbers based on your previous calculations.

Include a table in your report that shows the time it would take for your 15 digit number of boxes using each algorithm, and then for two times, four times, and eight times the number of boxes. If you are keen you could look at 128 times as well (that is doubling the problem size 7 times).

Write about what you observe in the time increase when you have doubled the number of boxes.

With such a large number of boxes, how important is it to use binary search if you can? Imagine if you were a computer scientist with the task of searching these boxes, and in order to do your work you need to search for many pieces of data each day. What would happen if you were trying to use linear search?

{teacher}

"determining the cost of an iterative algorithm for a problem of size n" (Merit)

"determining and comparing the costs of two different iterative algorithms for the same problem of size n" (Excellence)

{teacher end}

### Writing the part of your report that addresses "comparing Algorithms/ Programs/ Informal Instructions"

**Achieved/ Merit/ Excellence**

We recommend doing this part after you have done programming languages.

All three levels (A/M/E) are subsumed by the E requirement, so you should try to do that i.e. “comparing and contrasting the concepts of algorithms, programs, and informal instructions”. You should refer to examples you used in your report or include additional examples (e.g. a program used as an example in the programming languages topic, or an algorithm describing the searching process, etc). If you are confused, have another look at the field guide. You should only need to write a few sentences to address this requirement.

## Hints for success

- Don’t confuse “algorithm cost” with the “algorithm length”. The number of lines in the algorithm or program normally unrelated to the cost. Cost is the time the algorithm actually takes to run, or the number of comparisons that have to be made. You can find more information in the Field Guide if you are not sure.
- Resize screenshots/ photos so that they are large enough to see what is on them, but not taking up unnecessary space.

{teacher}

In reference to the above list

- Students should not even mention algorithm length or program length in their report as this shows misunderstanding.
- Teachers should provide guidance to students on formatting reports, as it is not something that is assessed (because it isn’t computer science), but helps to leave a positive impression on the markers.

{teacher end}

## Recommended Number of Pages

Within the 4 pages recommended for algorithms, a possible breakdown is:

- 1 ½ pages: Screenshots and explanations of you carrying out a chosen algorithm **(Achieved)**
- ¼ page: General instructions for carrying out your chosen algorithm **(Achieved)**
- ½ page: Example of the iterative, conditional, and sequential steps that can be in an algorithm **(Merit)**
- 1 ½ pages: Your investigation and data collected for merit/ excellence. Including results and discussion **(Merit/ Excellence)**
- ¼ page: Explanation of the difference between algorithms, programs, and informal instructions **(Achieved/ Merit/ Excellence)**

These are *maximums*, not targets!

For the topic of searching algorithms you probably won’t need this much space (sorting algorithms tends to require more space). In particular, you should only need 1 page to introduce your chosen algorithm for achieved, and 1 page or less for your investigation for merit/ excellence. This might allow you to allocate more pages to one of the other two topics.

Note that if you go over 4 pages for Algorithms, then you may have to use fewer pages for one of the other two topics, which could be problematic. No other material should be included for Algorithms.
