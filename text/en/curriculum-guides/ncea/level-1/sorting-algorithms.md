# Algorithms (1.44) - Sorting Algorithms

{panel type="teacher-note" summary="Disclaimer"}
This guide is not official, but is based information gained from a lot of experience with the standard, so reflects our best understanding of what is expected.

Note that there is an alternative project which instead focuses on searching. Students should only do one project for algorithms.
{panel end}

This is a guide for students attempting the *Algorithms* topic of digital technologies achievement standard 1.44 (AS91074). If you follow this guide, then you do **not** need to follow the searching algorithms one.

In order to fully cover the standard, you will also need to have done projects covering the topics of *Programming Languages* and *Human Computer Interaction* in the standard, and included these in your report.

## Overview

The topic of *Algorithms* has the following bullet points in achievement standard 1.44, which this guide covers. This guide separates them into two categories.

### Comparing algorithms, programs, and informal instructions

**Achieved**: "describing the key characteristics, and roles of algorithms, programs and informal instructions"

**Merit**: "explaining how algorithms are distinct from related concepts such as programs and informal instructions"

**Excellence**: "comparing and contrasting the concepts of algorithms, programs, and informal instructions"

### Determining the cost of algorithms and understanding various kinds of steps in algorithms

**Achieved**: "describing an algorithm for a task, showing understanding of the kinds of steps that can be in an algorithm, and determining the cost of an algorithm for a problem of a particular size"

**Merit**: "showing understanding of the way steps in an algorithm for a task can be combined in sequential, conditional, and iterative structures and determining the cost of an iterative algorithm for a problem of size *n*"

**Excellence**: "determining and comparing the costs of two different iterative algorithms for the same problem of size *n*"

As with all externally assessed Digital Technology reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

[2.1 - What’s the bigger picture?](chapters/algorithms.html#whats-the-big-picture)

[2.3 - Sorting Algorithms](chapters/algorithms.html#sorting)

Note that 2.2 is not necessary for this project, as 2.2 focuses on *searching* algorithms, whereas this project focuses on *sorting* algorithms.

## Project

This project involves understanding how selection sort works and the types of steps that can be in it and other algorithms, and then comparing the cost of selection sort to the cost of quicksort.

{panel type="teacher-note" summary="Choosing alternate algorithms"}
This assessment uses selection sort and quicksort. It uses comparisons as the measure of "cost". Insertion sort could be used instead of selection sort, and merge sort could be used instead of quicksort. It is important to NOT try and compare insertion sort and selection sort, or quicksort and mergesort, as the algorithms have similar costs and won’t allow students to draw the conclusions they need to.

Another algorithm you may have heard of is bubble sort. Bubble sort has not been mentioned because it is never used in practice (insertion sort and selection sort have practical uses in some cases, despite being slower than quicksort and mergesort), and pedagogically it has no value as it is confusing and teaches a poor way of sorting. We recommend staying away from it.
{panel end}

### Writing your report for the main bullet points that cover algorithms


{panel type="teacher-note" summary="Do the Algorithms vs Informal Instructions vs Programs bit after Programming Languages"}
It is probably best to do the first lot of algorithms bullet points after the programming languages section has been done (as this might give students more of an idea of the difference between an algorithm and a program). Therefore, this guide starts with the second lot of algorithms bullet points.
{panel end}

**Achieved**

{panel type="teacher-note" summary="Personalising the achieved criteria"}
It doesn’t matter if many of the students have the same answer here. The important thing is how they arrive at their answer, i.e. they need to actually count. All students showing selection sort on, say, 8 items will use 28 comparisons, but the order of the values they are sorting is very unlikely to be the same (there are over 40,000 ways the 8 items could have been ordered at the start), so their reports will be personalised.  In their screenshots, they should have the number of comparisons made so far, this helps to show the marker that they determined it themselves. If they are making a trace by hand, they need to make it clear where each comparison is.

Selection sort is recommended for the achieved criteria; while it is not a very good algorithm (in merit/ excellence, students will explore why this is!), it is much easier to understand and to make meaningful explanations and examples of. There is no advantage to using quicksort for the first part of the assessment.
{panel end}

{panel type="teacher-note" summary="Parts of the standard covered"}
"describing an algorithm for a task"

"determining the cost of an algorithm for a problem of a particular size"
{panel end}

Carry out selection sort on a small amount of data.  You can do this either using the balance scale interactive in the field guide (recommended), a physical set of balance scales if your school has them (normal scales that show the exact weights are unsuitable), or as a trace you did using pencil and paper (not recommended). Count how many comparisons you made to sort the items.

Take screenshots/ photos of you using the interactive or balance scales to do the sorting. Three or four pictures would be ideal (i.e. one showing the initial state of the scales and weights, one or two in the middle where you are comparing weights, and one at the end where all the weights are sorted). Use a drawing program to draw on each of the pictures and show which weights have been sorted so far, and which have not. Put on the screenshots how many comparisons have been made so far in the sorting process. Write a short explanation of what is happening in the images. Make sure you include the total number of comparisons that was needed to sort the items in your report.

Describe (in your own words with a few sentences) the overall process you carried out to sort the weights or numbers. Try and make your explanation general, e.g. if you gave the instructions to somebody who needs to know how to sort 100 numbers, or 500 numbers, the instructions would be meaningful.

{panel type="teacher-note" summary="Parts of the standard covered"}
"showing understanding of the kinds of steps that can be in an algorithm"

"showing understanding of the way steps in an algorithm for a task can be combined in sequential, conditional, and iterative structures"

Note that while only the first part is necessary for achieved, it is probably easier to cover the achieved by doing the merit. Teachers should supply a suitable program for the student's to annotate.
{panel end}

You also need to show the kinds of steps that can be an algorithm, such as iterative, conditional, and sequential. If you don’t know what these terms mean, go have another look at the field guide. Get a Scratch program (or another language if you are fairly confident with understanding the language) that implements selection sort. Take a screenshot of it, or a large part of it (you want to ensure that the screenshot takes up no more than half a page in the report, but is still readable) and open it in a drawing program such as paint. Add arrows and notes showing a part of the algorithm that is sequential, part that is conditional, and part that is iterative.

**Merit**

{panel type="teacher-note" summary="Parts of the standard covered"}
"determining the cost of an iterative algorithm for a problem of size n"

Note that the excellence activity subsumes this one, so actually writing it up in their report is unnecessary if they are attempting excellence.
{panel end}

Remember that some algorithms are a lot faster than others, especially as the size of the problem gets bigger. It isn’t necessarily the case that if you try to sort twice as many items then it will take twice as long. As a quick warm up investigation to give you some idea of this, try the following.

Get an implementation of selection sort (there are some linked to at the end of the chapter in the field guide). Start by choosing a number between 10 and 20. How many comparisons does it take to sort that many randomly generated numbers with your chosen algorithm? Now, try sorting twice as many numbers. How many comparisons did it take now? Does it take twice as many? Now, try sorting 10 times as many numbers. Does it take 10 times as many comparisons? How many more times the original problem size’s number of comparisons does it actually take? Hopefully you are starting to see a trend here.

*If you aren’t attempting excellence,* include the numbers you got from the warm up investigation, along with an explanation of the trend you found. *If you are attempting excellence, you should do the warm up investigation as it will help you (and will only take a few minutes), but you don’t need to write about it.*

**Excellence**

{panel type="teacher-note" summary="It isn't as mathematical as it sounds!"}
This part of the standard has sometimes been misunderstood to be very mathematical. While students could do the math to calculate how long an algorithm will take with a problem of size n without running it, this is not necessary. The objective is to run the algorithm for various input sizes and to see what the relationship between the size of the input and the time taken (or number of comparisons) is. Students may be surprised that when they double the input size, it takes much more than twice as long.
{panel end}

{panel type="teacher-note" summary="Parts of the standard covered"}
"determining the cost of an iterative algorithm for a problem of size n"

"determining and comparing the costs of two different iterative algorithms for the same problem of size n"
{teacher end}

You probably found in the activity for merit that selection sort isn’t a very good algorithm. So how much better is quicksort? Does the difference become more noticeable as you try to sort more numbers? For your report, you are going to compare selection sort with quicksort. Your objective is to show how much the difference in comparisons between selection sort and quicksort changes as the number of items to be sorted is increased.

{panel type="teacher-note" summary="Why pick 10 random numbers between 1 and 1000?""}
While it may seem unusual to pick any 10 numbers between 10 and 1000 rather than say 100, 200, 300, 400... , this is recommended because it helps to ensure the work is the student’s own (i.e. their friend should not have picked the same 10 numbers!). Students should plot the data using a scatter plot (there are other ways, but a scatter plot is probably the easiest). If the students are having trouble knowing how to make a scatter plot, it is okay to assist them. But the student must be the one to draw conclusions from the graph.
{panel end}

Choose 10 to 20 numbers in the range of 1 to 1000 (you will need a good variety of numbers, some high and some low. Do not pick the same numbers as your classmates!) For each of your 10 numbers, try sorting that many values with each of the sorting algorithms. Record your results in a table that has a column for the problem size, a column for how many comparisons selection sort used, and a column for how many comparisons quicksort used.

The best way of visualising the data you have just collected is to make a graph (e.g. using Excel). Your graph should have 2 lines; one for quicksort and one for selection sort, showing how the number of comparisons increases as the size of the problem goes up. Make sure you label the graph well. A simple way of making the graph is to use a scatter plot and put in lines connecting the dots (make sure the data for the graph is increasing order with the smallest problem sizes first and largest last so that the line gets drawn properly). Ask your teacher for guidance if you are having difficulty with excel.

Look at your graph. Does the rate of increase for the two algorithms seem to be quite different? Discuss what your graph shows. If you aren’t sure what to include in the discussion of your findings, you could consider the following questions.

- What happens to the number of comparisons when you double how many numbers you are sorting with quicksort? What about when you sort 10 times as many numbers? How is this different to when you used selection sort at the start?
- What is the largest problem you can solve within a few seconds using selection sort? What about with quicksort?
- If you had a database with 1 million people in it and you needed to sort them by age, which of the two algorithms would you choose? Why? What would happen if you chose the other algorithm?  

### Writing the part of your report for the other algorithms bullet points

**Achieved/ Merit/ Excellence**

{panel type="teacher-note" summary="Parts of the standard covered"}
"comparing and contrasting the concepts of algorithms, programs, and informal instructions" (along with the achieved/ merit criteria)

Note that the term "informal instructions" isn't a well defined term outside of this NCEA standard, so it will be hard to find descriptions of it. However, it is explained in the field guide.
{panel end}

We recommend doing this part after you have done programming languages.

All three levels (A/M/E) are subsumed by the E requirement, so you should try to do that i.e. "comparing and contrasting the concepts of algorithms, programs, and informal instructions". You should refer to examples you used in your report or include additional examples (e.g. a program used as an example in the programming languages topic, or an algorithm describing the sorting process, etc). If you are confused, have another look at the field guide. You should only need to write a few sentences to address this requirement.

## Hints for success

{panel type="teacher-note" summary="Some advice on keeping examples compact"}
The page limit for NCEA reports is a *limit*, not a target. There is no bonus for having more pages. We have gotten the impression that some students try to increase the amount of pages by bulking it out with wasted space or irrelevant content. This makes the report annoying to read, and doesn't help to keep the marker happy.

Some students showed a detailed example of how a sorting algorithm sorted a small list of numbers, spanning 3 or more pages and wasting a lot of space. While they were still within the page limit, it was unnecessary and almost certainly annoyed the marker. Some advice on traces if they are included (although this guide suggested some better alternatives to "by hand" algorithm traces):

- Don’t let it take more than 1 page (half a page would be ideal)
- Use 5 or 6 numbers if the entire sequence of the algorithm is to be displayed (any more than that is unnecessary)
- Use single spacing, showing at least 1 comparison on each line

Don’t include material unnecessary for the standard in the report. More unnecessary material contained in the report makes it harder for the marker to find the content that is relevant, and there are no additional marks for unnecessary content!
{panel end}

- Don’t confuse "algorithm cost" with the "algorithm length". The number of lines in the algorithm or program normally unrelated to the cost. Cost is the time the algorithm actually takes to run, or the number of comparisons that have to be made. You can find more information in the Field Guide if you are not sure.
- While we recommend using the balance scales interactive (or real balance scales), if you do instead decide to include a pen and paper trace, don’t give yourself more than 5 or 6 values to sort, and use an efficient layout that ensures the entire trace takes no more than about half a page.
- Resize screenshots/ photos so that they are large enough to see what is on them, but not taking up unnecessary space.
- Be sure to label the axis of your graph clearly so that the marker knows what your graph shows.

{panel type="teacher-note" summary="In reference to the above list:"}
- Students should not even mention algorithm length or program length in their report as this shows misunderstanding.
- Teachers should provide guidance to students on this, as it is not something that is assessed (because it isn’t computer science), but helps to leave a positive impression on the markers.
{panel end}

## Recommended Number of Pages

Within the 4 pages we recommend for algorithms, a possible breakdown is:

- 1 ¼ pages: Screenshots and explanations of you carrying out a chosen algorithm and determining the cost of it for your example problem (**Achieved**)
- ¼ page: General instructions for carrying out your chosen algorithm (**Achieved**)
- ½ page: Example of the iterative, conditional, and sequential steps that can be in an algorithm (**Merit**)
- 1 ½ pages: Your investigation and data collected for merit/ excellence. Including results and discussion (**Merit/ Excellence**)
- ¼ page to ½ page: Explanation of the difference between algorithms, programs, and informal instructions **(Achieved/ Merit/ Excellence)**

These are *maximums*, not targets!

Note that if you go over 4 pages for Algorithms, then you may have to use fewer pages for one of the other two topics, which could be problematic. No other material should be included for Algorithms.
