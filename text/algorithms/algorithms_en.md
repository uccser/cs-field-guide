# Algorithms

{teacher}
The following assessment plans also cover this material:

**New Zealand - AS91074 (1.44)**
- [Assessment Overview](/appendices/assessment_guides/new_zealand/assessment_guide_level_1_introduction.html)
- [Searching Algorithms Assessment Guide](/appendices/assessment_guides/new_zealand/assessment_guide_level_1_searching_algorithms.html)
- [Sorting Algorithms Assessment Guide](/appendices/assessment_guides/new_zealand/assessment_guide_level_1_sorting_algorithms.html)
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

{page break}

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
- [Scratch](file linear-binary-search-scratch.zip)
- [Python (Version 2)](file linear-binary-search-python2.py)
- [Python (Version 3)](file linear-binary-search-python3.py)

{page break}

## Sorting algorithms

{teacher}
Sorting algorithms are useful to study because they illustrate many of the key issues that come up in algorithms, and there are some good contrasts, particularly between quicksort (which is fast and is widely used) and selection or insertion sort (which become very slow as the number of items sorted increases).
{teacher end}

Sorting is another very important area of algorithms. Computers often have to sort large amounts of data into order based on some attribute of that data, such as sorting a list of files by their name or size, or emails by the date they were received, or a customer list according to people's names. Most of the time this is done to make searching easier. For example you might have a large amount of data and each piece of data could be someone's name and their phone number. If you want to search for someone by name it would help to first have the data sorted alphabetically according to everyones names, but if you then wanted to search for a phone number it would be more useful to have the data sorted according to people's phone numbers.

Like searching there are many different sorting algorithms, but some take much longer than others. In this section you will be introduced to two slower algorithms and one much better one.

### Scales Interactive

Throughout this section you can use the sorting interactive to test out the algorithms we talk about. When you're using it make sure you take note of the comparisons at the bottom of the screen, each time you compare two boxes the algorithm is making 'one comparison' so the total number of comparisons you have to make with each algorithm is the cost of that algorithm for the 8 boxes.

Use the scales to compare the boxes (you can only compare two boxes at a time) and then arrange them along the bottom of the screen. Arrange them so that the lightest box is on the far left and the heaviest is on the far right. Once you think they are in order click 'Test order'.

If the interactive does not run properly on your computer you can use a set of physical balance scales instead; just make sure you can only tell if one box is heavier than the other, not their exact weight (so not digital scales that show the exact weight).

{include interactive_external sorting_boxes title="Algorithm Sorting interactive"}

### Selection Sort

One of the most intuitive ways to sort a group of boxes into order, from lightest to heaviest, is to start by first finding the lightest (or the heaviest) box and placing that to the side. Try this with the scales interactive. 

After finding the lightest box simply repeat the process again with the remaining boxes until you find the second lightest, now place that to the side alongside the lightest box. If you keep repeating this process you will eventually find you have placed each box into order. Try sorting the whole group of boxes in the scales interactive into order using this method and count how many comparisons you have to make. 

Tip: Start by moving all the boxes to the right of the screen and then once you have found the lightest box place it to the far right (if you want to find the heaviest first instead then move them all to the left).

If you record how many comparisons you had to make each time to find the next lightest box you might notice a pattern (hint: finding the lightest  should take 7 comparisons, and then finding the second lightest should take 6 comparisons…). If you can see the pattern then how many comparisons do you think it would take to then sort 9 boxes into order? What about 20? If you knew how many comparisons it would take to sort 1000 boxes, then how many more comparisons would it take to sort 1001 instead?

{teacher}
For a list of 8 objects (like in the interactive) it should take 7 comparisons to find the lightest, 6 to find the next lightest, 5 to find the next, then 4, then 3, then 2, and then 1 to sort the final two boxes. In total this is 7+6+5+4+3+2+1 = 28 comparisons. If there had been 9 boxes it would have taken 8+7+6+5+4+3+2+1 = 36 comparisons. 20 boxes will take 190. Going from 1000 boxes up to 1001 will require 1000 extra comparisons, even though only 1 box has been added. Selection sort will always take (n*(n-1))/2 comparisons to sort *n* items into order.

For example: To calculate the number of comparisons required for 20 boxes, using (n*(n-1))/2 where n = 20:
  
(20*(20-1))/2

= (20*19)/2

= 380/2

= 190 comparisons

Some students may recognise this formula as Gauss' trick (see [the anecdotes about Gauss on Wikipedia](http://en.wikipedia.org/wiki/Carl_Friedrich_Gauss#Anecdotes). One way of expressing this trick for the above example is that 20 boxes would require summing the numbers 1+2+3+...+17+18+19. If we write the numbers backwards (19+18+17+...3+2+1) then it would be the same sum. Now if we add these two lists together, pairing up the corresponding numbers, we get (1+19)+(2+18)+(3+17)+...+(17+3)+(18+2)+(19+1). Each pair in this sum adds up to 20, and there are 19 pairs, so adding the two lists together is just 20x19. Since both lists add up to the same amount, the original sum is a half of that, or 20x19/2, which is 190 comparisons, which is what we got from the formula above. If students can follow this reasoning then they can easily work out the comparisons needed for a large number of boxes, and the don't have to use the "magic" formula given above. There's a visual explanation in [this video](http://www.numberphile.com/videos/one_to_million.html) and more examples on [this page](http://nzmaths.co.nz/gauss-trick-staff-seminar).
{teacher end}

This algorithm is called Selection sort, because each time you look through the list you are 'selecting' the next lightest box and putting it into the correct position. If you go back to the algorithms racing interactive at the top of the page you might now be able to watch the selection sort list and understand what it is doing at each step.

The selection sort algorithm can be described as follows:
- Find the smallest item in the list and place it to one side. This will be your sorted list.
- Next find the smallest item in the remaining list, remove it and place it into your sorted list beside the item you previously put to the side.
- Repeat this process until all items have been selected and moved into their correct position in the sorted list.

You can swap the word 'smallest' for 'largest' and the algorithm will still work, as long as you are consistent it doesn't matter if you are looking for the smallest or the largest item each time.

### Insertion Sort

This algorithm works by removing each box from the original group of boxes and inserting it into its correct position in a new sorted list. Like Selection Sort, it is very intuitive and people often perform it when they are sorting objects themselves, like cards in their hands. 

Try this with the scales interactive. Start by moving all the boxes to one side of the screen, this is your original, and unsorted, group. Now choose a box at random and place that on the other side of the screen, this is the start of your sorted group. 

To insert another box into the sorted group, compare it to the box that is already in the sorted group and then arrange these two boxes in the correct order. Then to add the next box compare it to these boxes (depending on the weight of the box you might only have to compare it to one!) and then arrange these three boxes in the correct order. Continue inserting boxes until the sorted list is complete. Don't forget to count how many comparisons you had to make!

This algorithm is called Insertion Sort. If you're not quite sure if you've got the idea of the algorithm yet then have a look at [this animation](http://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif) from [Wikipedia](http://en.wikipedia.org/wiki/Insertion_sort). 

Insertion sort can be described with informal instructions as follows:
- Take an item from your unsorted list and place it to the side, this will be your sorted list.
- One by one, take each item from the unsorted list and insert it into the correct position in the sorted list.
- Do this until all items have been sorted.

{teacher}
The above informal instructions for insertion sort are fairly detailed and are getting close to pseudocode. An even more informal description might be "Insert items one at a time at the correct point into the sorted list". It can be recognised as insertion sort, but doesn't give much detail on how it works.
{teacher end}

People often perform this when they physically sort items. It can also be a very useful algorithm to use if you already have a sorted set of data and want to add a new piece of data into the set. For example if you owned a library and purchased a new book you wouldn't do a Selection Sort on the entire library just to place this new book, you would simply insert the new book in its correct place.

### Quicksort

Insertion and Selection Sort may seem like logical ways to sort things into order, but they both take far too many comparisons when they are used for large amounts of data. Remember computers often have to search through HUGE amounts of data, so even if they use a good searching algorithm like Binary Search to look through their data, if they use a bad sorting algorithm to first sort that data into order then finding anything will take far too long!

A much better sorting algorithm is Quicksort! (the name is a bit of a giveaway) 

{include interactive_external sorting_boxes title="Quicksort interactive"  parameters="method=quick"}

{comment The initial description here enables students to work out the algorithm for themselves, but some may need the more complete description below to understand it.}

This algorithm is a little more complicated, but is very powerful. To do this algorithm with the sorting interactive, start by randomly choosing a box and placing it on the scales. Now compare every other box to the one you selected; heavier boxes should be put on the right of the second row and lighter boxes are put on the left. When you are done, place the box you were comparing everything else to between these two groups, but to help you keep track of things, put it in the row below. The following example shows how it might look after this step. Note that the selected block is in the right place for the final sorted order, and everything on either side will remain on the side that it is on.

{include image alg-quicksort-interactive-step-1.png alt="Quicksort interactive in progress"}

Now apply this process to each of the two groups of boxes (the lighter ones, then the heavier ones). Keep on doing this until they are all sorted. The boxes should then be in sorted order! 

It might be worth trying this algorithm out a few times and counting the number of comparisons you perform each time. This is because sometimes you might be unlucky and happen to pick the heaviest, or the lightest box first. On the other hand you might be very lucky and choose the middle box to compare everything to first. Depending on this the number of comparisons you perform will change.

Quicksort can be described in the following way:
- Choose an item from the list and compare every other item in the list to this (this item is often called the pivot).
- Place all the items that are greater than it into one subgroup and all the items that are smaller into another subgroup. Place the pivot item in between these two subgroups.
- Choose a subgroup and repeat this process. Eventually each subgroup will contain only one item and at this stage the items will be in sorted order.

The following files will run quicksort in various languages:
- [Scratch](file selection-quicksort-scratch.zip)
- [Python (Version 2)](file selection-quicksort-python2.py)
- [Python (Version 3)](file selection-quicksort-python3.py)

{teacher}
There are dozens of sorting algorithms that have been invented; most of the ones that are used in practice are based on quicksort and/or mergesort. For the purposes of the 1.44 standard, students need only compare two algorithms, and selection sort and quicksort provide the kind of contrast that make a project straightforward to do. If students want to investigate other sorting algorithms, the more common ones that would be useful here are insertion sort and mergesort. These, and many others, can be seen in an intriguing animated form on this video that represents the [algorithms using images and sound](http://www.youtube.com/watch?v=kPRA0W1kECg).

{page break}

## The whole story!

We've only really scraped the surface of algorithms in this chapter, as there are millions of different algorithms for millions of different problems! Algorithms are used in maths, route planning, network planning and operation, problem solving, artificial intelligence, genetic programming, computer vision, the list goes on and on! But by going through this chapter you should have gained an understanding of the key concepts of algorithms and will be well prepared to tackle more complicated ones in the future.

In this chapter we have only talked about the number of comparisons an algorithm makes, and the amount of time a program takes to complete as 'costs' of algorithms. There are actually many other ways of measuring the cost of an algorithm. These include the amount of memory the algorithm uses and its computational complexity. Computer Scientists use 'Big O notation' to more accurately describe the performance or complexity of an algorithm, and you are likely to come across this notation very quickly when investigating the performance of algorithms. It characterises the resources needed by an algorithm and is usually applied to the execution time required, or sometimes the space used by the algorithm. 

Here are some Big O examples:
- {math}O(1){math end} - An algorithm with O(1) complexity will always execute in the same amount of time regardless of how much data you give it to process
- {math}O(n){math end} - The amount of time an algorithm with O(n) complexity will take to execute will increase  linearly and in direct proportion to the amount of data you give it to process. Remember that Big O describes the worst case scenario so the algorithm might sometimes take less time, but the greatest amount of time it can take will increase in direct proportion to the amount of data it is given.
- {math}O(n^{2}){math end} - The performance of an algorithm with this complexity is directly proportional to the square of the size of the input data set.
- {math}O(2^{n}){math end} - The amount of time an algorithm with this complexity will take to complete will double with each additional element added to the data set! Does this remind you of any of the algorithms you have looked at in this chapter?

Big O Notation however requires some advanced mathematics to explore thoroughly so has been intentionally left out of this main chapter, but if you want to learn more check out the Useful Links section. These topics are looked at in more depth in the Complexity and Tractability chapter.

To make things even more complicated, in practice algorithms are running on computers that have cached memory and virtual memory, where the time to access a particular value can be particularly short, or particularly long. There is a whole range of algorithms that are used for this situation to make sure that the algorithm still runs efficiently in such environments. Such algorithms are still based on the ideas we've looked at in this chapter, but require some clever adjustments to ensure that they work well.

{teacher}
Information for NZ teachers on students 1.44 reports (incomplete)

It is *strongly discouraged* that students use algorithms they have created themselves for standard 1.44. Implementing the algorithms described in this chapter could be a good exercise for students (depending on their interest and ability in programming), however students should not use their own programs for testing algorithms and reporting their results in the standard. This is because a mistake in their program could lead them to obtain incorrect results and draw incorrect conclusions about the algorithms performance. 

All the algorithms described in this chapter are suitable for students to use in their reports. If students are aiming for excellence the ideal algorithm comparisons are Linear vs Binary Search, Selection sort vs Quicksort, and Insertion sort vs Quicksort. Insertion and Selection sort are not suitable algorithms to compare.

**Achieved**

- A1 - “describing the key characteristics and roles of algorithms, programs, and informal instructions”
  - This can be done by showing that they have performed an algorithm or applied it to a situation, giving the informal instructions for an algorithm and showing or describing a program for that algorithm. The program does not need to be written by the student, they can be provided with one (this also applies to M1 and E1).
  - For example to show that they have applied an algorithm a student could do any of the CS unplugged algorithms activities, take photos of this and describe it in their report (can also be done as a class activity). They could also use the interactives in this chapter, take screenshots and then describe what they did in their report.
- A2 - “describing an algorithm for a task, showing understanding of the kinds of steps that can be in an algorithm, and determining the cost of an algorithm for a problem of a particular size”
  - This can be shown by describing an algorithm and identifying what specific steps a person or a program would need to be able to perform to complete the algorithm. The student also needs to state how many comparisons the algorithm made, or how long a program implementing that algorithm took to complete, for one data set.
  - For example: they could describe Selection sort, identify that to perform it a person would need to be able to compare two items and identify the larger and also be able to put items in specific places, and state that the algorithm performed 45 comparisons to sort 10 items.

**Merit** 

- M1 - “explaining how algorithms are distinct from related concepts such as programs and informal instructions”
  - This can be done by showing that they have performed an algorithm or applied it to a situation, giving the informal instructions and a program for an algorithm and explaining the differences between each of these.
- M2 - “showing understanding of the way steps in an algorithm for a task can be combined in sequential, conditional, and iterative structures and determining the cost of an iterative algorithm for a problem of size n”
  - This can be shown by describing an algorithm and identifying what specific steps a person or a program would need to be able to perform to complete the algorithm. The description should use sequential, conditional and iterative structures and the student needs to illustrate that they understand what these structures are/do
  - The student also needs to state how many comparisons the algorithm made, or how long a program implementing that algorithm took to complete, for a range of data sets of different sizes. The best way to display these results is with a table or a graph with clear axis labels and a title (enough so that it is clear to the marker what the graph shows).
  - It is important to encourage students to to test a large range of different inputs, e.g. 10, 50, 100, 500, 1000, 5000, 10000..., rather than small ranges e.g. 10, 12, 14, 16...

**Excellence**

- E1 - comparing and contrasting the concepts of algorithms, programs, and informal instructions
  - This can be done by showing that they have performed an algorithm or applied it to a situation, giving the informal instructions and a program for the algorithm and discussing the differences between each of these and comparing their different uses.
- E2 - determining and comparing the costs of two different iterative algorithms for the same problem of size n
  - In addition to M2  the student needs to report the cost of a second algorithm, which performs the same task, for the same range of data set sizes used for the first algorithm. The best way to display these is with a table or a graph (again it is very important to make sure the graph makes it clear to the marker exactly what is being shown) or both.
  - The student needs to compare the costs of these two algorithms and discuss what happens as the data sets the algorithms take in increases. The key concept students should realise is that the difference between the two algorithms (if appropriate algorithms have been chosen) is non-linear. In other words one algorithm isn't twice as good as another, or 10 times as good, one algorithm can be exponentially better than another.
{teacher end}

## Further reading

### Other topics in algorithms

- There is another searching algorithm which performs even better than Binary Search. It is called Hashing and can be investigated with the CS Unplugged [Battleships Game](http://csunplugged.org/searching-algorithms).
- There are some problems for which no good algorithms have been found (and many people believe they will never be found). For more on these kinds of algorithms see the Complexity and Tractability chapter in the Field Guide.

### Useful Links

- [CS Unplugged Searching algorithms](http://csunplugged.org/searching-algorithms)
- CS Unplugged [Sorting algorithms](http://csunplugged.org/sorting-algorithms)
- [Searching algorithm game, may not be suitable](http://csunplugged.org/divideAndConquer)
- Wikipedia has more details on [Linear Search](http://en.wikipedia.org/wiki/Linear_search), [Binary Search](http://en.wikipedia.org/wiki/Binary_search), [Selection sort](http://en.wikipedia.org/wiki/Selection_sort), [Insertion sort](http://en.wikipedia.org/wiki/Insertion_sort) and  [Quicksort](http://en.wikipedia.org/wiki/Quicksort). 
- The [Sorting Bricks game](http://mathsite.math.berkeley.edu/sorting/brick.html) is a great way to learn about several sorting algorithms (requires Java).
- [Sorting Algorithms Visualisations](http://www.sorting-algorithms.com/) shows several different sorting algorithms racing and contains information and pseudocode for each.
- [Beginners Guide to Big O Notation](http://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/)