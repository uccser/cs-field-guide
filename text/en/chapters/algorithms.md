# Algorithms

{comment explain different views of algorithm (programming context) and Algorithm (that have interesting complexity); use https://www.youtube.com/watch?v=6hfOvs8pY1k for the former?}

{video url="http://www.youtube.com/embed/FOwCCvHEfY0"}

## What's the big picture?

Every computer device you have ever used, from your school computers to your calculator, has been using algorithms to tell it how to do whatever it was doing. Algorithms are a very important topic in Computer Science because they help software developers create efficient and error free programs. The most important thing to remember about algorithms is that there can be many different algorithms for the same problem, but some are much better than others!

{interactive name="sorting-algorithm-comparison" type="in-page"}

Computers are incredibly fast at manipulating, moving and looking through data. However the amount of data computers use is often so large that it doesn't matter how fast the computer is, it will take it far too long to examine every single piece of data (companies like Google, Facebook and Twitter routinely process billions of things per day, and in some cases, per minute!) This is where algorithms come in. If a computer is given a better algorithm to process the data then it doesn't matter how much information it has to look through, it will still be able to do it in a reasonable amount of time.

If you have read through the Introduction chapter you may remember that the speed of an application on a computer makes a big difference to a human using it. If an application you create is too slow, people will get frustrated with it and won't use it. It doesn't matter if your software is amazing,
if it takes too long they will simply give up and try something else!

### Algorithms, Programs and Informal Instructions

At this stage you might be thinking that algorithms and computer programs kind of sound like the same thing, but they are actually two very distinct concepts.
They are each different ways of describing how to do something, but at different levels of precision:

Often you can get away with describing a process just using some sort of informal instructions using natural language; for example, an informal instruction in a non computing context might be
"please get me a glass of water".
A human can understand what this means and can figure out how to accomplish this task by thinking, but a computer would have no idea how to do this!

{comment}
[Add new text and interactive here for finding the high score in a table.
Interactive could have doors or boxes to open with numbers in them; only one is visible at a time, and the challenge is to find the highest number.
There could be a space to type the number, and a button to press to check if it's correct.
The preceding text could be as follows:]
For example, suppose you have to work out the highest score from a group of players.
It sounds easy enough for a small list like this one:
[image of list of 5 high scores]
But what about this list:
[image of list of about 100 high scores, not lined up, non-proportional font, not so easy to spot large numbers]
Now you need some sort of organised process --- an algorithm --- to find the highest score with absolute certainty.
Try finding the high score the following interactive, thinking about what process you'll use to be sure of getting the right answer.
(The process will be fairly simple; we're not looking for a particularly clever solution, but just want to think about how to express the process really clearly.)
[note: will also need to make slight changes to the next few paragraphs that mention a high-score algorithm.]
{comment end}

An example in a computational context might be if you wanted to find a high score in a table of scores:
go through each score keeping track of the largest so far.
Informal instructions like this aren't precise; there's no way that a computer could follow those instructions exactly, but a human could probably get the general idea of what you mean if they know what you're trying to achieve. This sort of description is only useful for quickly giving another human the general idea of what you mean, and even then there's a risk that they won't properly understand it.

{glossary-definition term="Algorithm" definition="A step by step process that describes how to solve a problem and/or complete a task, which will always give a result."}

In contrast, an {glossary-link term="algorithm" reference-text="introduction"}algorithm{glossary-link end} is a step by step process that describes how to solve a problem and/or complete a task, which will always give the correct result.
For our previous non-computing example, the algorithm might be
1) Go to the kitchen. 2) Pick up a glass. 3) Turn on the tap. 4) Put the glass under the running water and remove it once it is almost full. 5) Turn off the tap. 6) Take the glass back to the person who gave the instruction. A human could follow these instructions easily, but it's still using general English language rather than a strict list of computer instructions.

Algorithms are often expressed using a loosely defined format called [pseudo-code](http://en.wikipedia.org/wiki/Pseudocode),
which matches a programming language fairly closely,
but leaves out details that could easily be added later by a programmer.
Pseudocode doesn't have strict rules about the sorts of commands you can use, but it's halfway between an informal instruction and a specific computer program.

With the high score problem, the algorithm might be written in pseudo-code like this:

```
if the table is empty
  display that there is no high score, and quit
otherwise, note the first score in the table
for each of the other scores in the table,
  if that score is larger than the one noted,
    replace the noted one with the current score
display the currently noted score
```

Algorithms are more precise than informal instructions and do not require any insight to follow;
they are still not precise enough for a computer to follow in the form they are written,
but are precise enough for a human to know exactly what you mean,
so they can then work out how to implement your algorithm,
either doing it themselves, or writing a computer program to do it.
The other important thing with this level of precision is that we can often make a good estimate of how fast it will be.
For the high score problem above, if the score table gets twice as big, the algorithm will take about twice as long.
If the table could be very big (perhaps we're tracking millions of games and serving up the high score many times each second), that might already be enough to tell us that we need a better algorithm to track high scores regardless of which language it's going to be programmed in;
or if the table only ever has 10 scores in it, then we know that the program is only going to do a few dozen operations, and is bound to be really fast even on a slow computer.

The most precise way of giving a set of instructions is in the form of a
{glossary-link term="Algorithm" reference-text="computer program"}program{glossary-link end},
which is a specific implementation of an algorithm, written in a specific programming language,
with a very specific result for any particular input.
This is the most precise of these three descriptions and computers are able to follow and understand these.

For the example with getting a drink, we might program a robot to do that;
it would be written in some programming language that the robot's computer can run,
and would tell the robot exactly how to retrieve a glass of water and bring it back to the person who asked for the water.

With the high-score problem, it would be written in a particular language; even in a particular language there are lots of choices about how to write it, but here's one particular way of working out a high score
(don't worry too much about the detail of the program if the language isn't familiar; the main point is that you could give it to a computer that runs Python, and it would follow the instructions exactly):

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

{image filename="highscore-in-scratch.png" alt="High score program in Scratch"}

Both of the above programs are the same algorithm.
In this chapter we'll look in more detail about what an algorithm is, and why they are such a fundamental idea in computer science.
Because algorithms exist even if they aren't turned in to programs, we won't need to look at programs at all for this topic, unless you particularly want to.


{glossary-link term="Algorithm" reference-text="algorithm cost"}{glossary-link end}
### Algorithm cost

When Computer Scientists are comparing algorithms they often talk about the 'cost' of an algorithm. The cost of an algorithm can be interpreted in several different ways, but it is always related to how well an algorithm performs based on the size of its input, *n*. In this chapter we will talk about the cost of an algorithm as either the time it takes a program (which performs the algorithm) to complete, or the number of steps that the algorithm makes before it finishes.

For example, one way of expressing the cost of the high score algorithm above would be to observe that for a table of 10 values, it does about 10 sets of operations to find the best score,
whereas for a table of 20 scores, it would do about twice as many operations.
In general the number of operations for a table of *n* items will be proportional to *n*.
Not all algorithms take double the time for double the input; some take a lot more than double, while others take a lot less.
That's worth knowing in advance because we usually need our programs to scale up well;
in the case of the high scores, if you're running a game that suddenly becomes popular, you want to know in advance that the high score algorithm will be fast enough if you get more scores to check.

{panel type="extra-for-experts" "Algorithm complexity"}
The formal term for working out the cost of an algorithm is [algorithm analysis](https://en.wikipedia.org/wiki/Analysis_of_algorithms),
and we often refer to the cost as the algorithm's *complexity*.
The most common complexity is the "time complexity" (a rough idea of how long it takes to run),
but often the "space complexity" is of interest - how much memory or disk space will the algorithm use up when it's running?

There's more about how the cost of an algorithm is described in industry,
using a widely agreed on convention called 'Big-O Notation',
in the ["The whole story!"](chapters/algorithms.html#the-whole-story) section at the end of this chapter.
{panel end}

The amount of time a program which performs the algorithm takes to complete may seem like the simplest cost we could look at, but this can actually be affected by a lot of different things, like the speed of the computer being used, or the programming language the program has been written in. This means that if the time the program takes to complete is used to measure the cost of an algorithm it is important to use the same program and the same computer (or another computer with the same speed) for testing the algorithm with different numbers of inputs.

The number of operations (such as comparisons of data items) that an algorithm makes however will not change depending on the speed of a computer, or the programming language the program using the algorithm is written in. Some algorithms will always make the same number of comparisons for a certain input size, while others might vary.


### Searching and Sorting

In this chapter we will look at two of the most common and important types of algorithms, Searching and Sorting. You probably come across these kinds of algorithms every time you use a computer without even realising!
They also happen to be great for illustrating some of the key concepts that arise with algorithms.

{glossary-link term="Algorithm" reference-text="searching algorithms"}{glossary-link end}

## Searching

{panel type="teacher-note" summary="Presenting searching in the classroom"}

{glossary-definition term="Binary search" definition="Searching a sorted list by looking at the middle item, and then searching the appropriate half recursively (used for phone books, dictionaries and computer algorithms)."}

The present searching game in this section is split into two parts, the first corresponds to the Linear Search algorithm (also known as Sequential Search) and the second corresponds to {glossary-link term="Binary Search"}Binary Search{glossary-link end}. We recommend you play through the levels yourself for a while, or after reading this description. It is based on the [CS Unplugged Battleships game](http://csunplugged.com/searching-algorithms) which can be used as a classroom activity to enforce the lessons in this chapter (the hashing activity is not used for the present searching game). The

To run this as a classroom activity get all the students to play each section of the game at the same time and then when they have all finished have a discussion about the results. After students have finished the first part ask them questions like "Did anyone find the pet on the first go?", "Did anyone only find it after checking every other present?", or find the average number of presents students had to open to find the pet (this should be around 5 for the first level and around 10 for the second).

While they are playing the second part some may have trouble finding the correct algorithm to find the pet. If they are finding these levels confusing you can give them a hint like "Why don't you start by opening the present in the centre" and when they do ask them "What does the number you found tell you about all the numbers before it?" if the number is smaller than the one they are looking for, or "all the numbers after it?" if the number is bigger than the one they are looking for.

When students have finished ask them questions like "Where you able to find the pet even though you had less lives? What strategy did you use to find the pet?", we have found that many students will have ended up doing a binary search (or similar) without even knowing what a binary search is! Explaining these algorithms to students is likely to be easier now that they have seen them in action.
{panel end}

Searching through collections of data is something computers have to do all the time. It happens every time you type in a search on Google, or when you type in a file name to search for on your computer. Computers deal with such huge amounts of data that we need fast algorithms to help us find information quickly.

Lets investigate searching with a game...

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/interactives/alg/searching/index.html?max=2" text="Searching Boxes - Part 1"}
{comment}
{interactive name="searching-boxes" type="whole-page" title="Searching Boxes - Part 1" parameters="max=2"}
{comment end}

You may have noticed that the numbers on the monsters and pets in the game were in a random order, which meant that finding the pet was basically luck! You might have found it on your first try, or if you were less lucky you might have had to look inside almost all the presents before you found it. This might not seem like such a bad thing since you had enough lives to look under all the boxes, but imagine if there had been 1,000 boxes, or worse 1,000,000! It would have taken far too long to look through all the boxes and the pet might have never been found.

Now this next game is slightly different. You have less lives, which makes things a bit more challenging, but this time the numbers inside the boxes will be in order. The monsters, or maybe the pet, with the smallest number is in the present on the far left, and the one with the largest number is in the present on the far right. Let's see if you can collect all the pets without running out of lives...

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/interactives/alg/searching/index.html?level=3" text="Searching Boxes - Part 2"}
{comment}
{interactive name="searching-boxes" type="whole-page" text="Searching Boxes - Part 2" parameters="level=3"}
{comment end}

Now that you have played through the whole game (and hopefully found all of the lost pets!) you may have noticed that even though you had less lives in the second part of the game, and lots of presents to search through, you were still able to find the pet. Why was this possible?

### Linear Search

Since the boxes in the first game were in a random order there really wasn't any strategy you could have used to find the pet, except simply keep opening presents one by one until you found the pet. This is essentially the *Linear Search* algorithm (sometimes called a sequential search). In plain English, Linear Search algorithm is as follows:
- Check if the first item in a list is the item you are searching for, if it is the one you are looking for, you are done.
- If it isn't the item you are searching for move on and check the next item.
- Continue checking items until you find the one you are searching for.

If you used this algorithm you might get lucky and find what you are looking for on your first go, but if you were really unlucky you might have to look through everything in your list before you found the right object! For a list of 10 items this means on average you would only have to look at 5 items to find what you were looking for, but for a list of 10000 you would have to look through on average 5000.

{panel type="curiosity" summary="How is Bozo search different from Linear search?"}
If you watched the video at the beginning of the chapter you might be thinking that what you did in the present searching game sounds more like Bozo Search than Linear Search, but actually Bozo Search is even sillier than this! If you were doing a Bozo Search then after unwrapping a present and finding a monster inside, you would wrap the present back up and try another one at random! This means you might end up checking the same present again and again and again and you might never find the pet, even with a small number of presents!
{panel end}

### Binary search

A much better algorithm to use is called Binary Search. In the second part of the present searching game the boxes were in order, which meant you were able to be more clever when you were searching for the pet, and you might have been using a Binary Search without realising!

{panel type="teacher-note" summary="Teaching binary search with a phone book"}
The binary search algorithm can be demonstrated with a phone book or dictionary: choose a name, then open it at the *middle* page of the book (students might point out that you could guess how far through to open it, but insist on starting in the middle).
If you can spare the book, rip it in half at the chosen page, and ask the class which of the two halves contains the name (the ones before the middle, or the ones after).
If you don't have replacement books available, you can still proceed by just holding up the chosen half, but it will be more memorable for students when they see the problem literally divided in half.
Throw away the half that can't contain the name, pointing out that hundreds of pages have been eliminated by one decision. Repeat this on the remaining half, ripping that in half, then half again, and so on. On the board you can work out the number of pages left; for example, if there were 512 pages in the phone book, after the first rip there are 256, then 128, then 64, 32, 16, 89, 4, 2 and finally just one page. That's  9 pages that were examined to get down to the desired page. (Note that it's easiest to pick numbers that are powers of 2 i.e. 512, 1024, 2048, otherwise you have to deal with halving odd numbers, which works fine, but is a bit distracting).

The power of binary search becomes obvious when you ask how long it would take to search a book twice as large. The first rip on the larger book will reduce it to the original problem, so, for example, a book of 1024 pages requires 10 rips instead of the 9 used for 512 pages. A million page phone book (1,048,576 pages to be precise) is reduced to 1 page by only 20 rips (students will probably think that it will be a lot more, but they can work it out by halving 1,048,576 20 times). A billion pages requires only 30 rips - again, have students work this out for themselves, as it is surprising. You could point out that a billion-page phone book could hold every name in the world, and in fact a social network site could have a billion users on it, so searching for someone on a billion-user system could be done *by hand* looking at just 30 names. The catch? They need to be in sorted order, but sorting things into order is easy too if you use the right algorithm. (In practice large systems use a variation of this kind of searching, but this demonstrates how a very fast algorithm is possible on very large amounts of data, such as those used by search engines or social networks).
{panel end}

If you used a Binary Search on each of the levels then you would have always had enough lives to find the pet! Informally, the Binary Search algorithm is as follows:
- Look at the item in the centre of the list and compare it to what you are searching for
- If it is what you are looking for then you are done.
- If it is larger than the item you are looking for then you can ignore all the items in the list which are larger than that item (if the list is from smallest to largest this means you can ignore all the items to the right of the centre item).
- If it is smaller then you can ignore all the items in the list which are smaller than that centre item.
- Now repeat the algorithm on the remaining half of the list, checking the middle of the list and choosing one of the halves, until you find the item you are searching for.

Binary Search is a very powerful algorithm. If you had 1000 presents to search through it would take you at most 10 checks for Binary search to find something and Linear search would take at most 1000 checks, but if you doubled the number of presents to search through how would this change the number of checks made by Binary Search and Linear search?

{panel type="spoiler" summary="How does doubling the number of boxes affect the number of checks required?"}
The answer to the above question is that the maximum number of checks for Linear Search would double, but the maximum number for Binary Search would only increase by one.
{panel end}

It is important to remember that you can only perform a Binary Search if the items you are searching through are sorted into order. This makes the sorting algorithms we will look at next even more important because without sorting algorithms we wouldn't be able to use Binary Search to quickly look through data!


{panel type="project" summary="Code to   run linear and binary search for yourself"}
The following files will run linear and binary search in various languages; you can use them to generate random lists of values and measure how long they take to find a given value.
Your project is to measure the amount of time taken as the number of items (*n*) increases; try drawing a graph showing this.
- [Scratch](files/linear-binary-search-scratch.zip) - [Download Scratch here](https://scratch.mit.edu/scratch2download/)
- [Python (Version 2)](files/linear-binary-search-python2.py) - [Download Python 2 here](https://www.python.org/downloads/)
- [Python (Version 3)](files/linear-binary-search-python3.py) - [Download Python 3 here](https://www.python.org/downloads/)
{panel end}

{glossary-link term="Algorithm" reference-text="sorting algorithms"}{glossary-link end}

## Sorting algorithms

{panel type="teacher-note" summary="Why are we also covering sorting?"}
Our main points have already been made --- what an algorithm is, how to estimate its cost, and that the cost isn't always proportional to the amount of data.
However, it's good to reinforce this with some different algorithms.
Sorting algorithms are useful to study because they illustrate many of the key issues that come up in algorithms, and there are some good contrasts, particularly between quicksort (which is fast and is widely used) and selection or insertion sort (which become very slow as the number of items sorted increases).
{panel end}

Sorting is another very important area of algorithms. Computers often have to sort large amounts of data into order based on some attribute of that data, such as sorting a list of files by their name or size, or emails by the date they were received, or a customer list according to people's names. Most of the time this is done to make searching easier. For example you might have a large amount of data and each piece of data could be someone's name and their phone number. If you want to search for someone by name it would help to first have the data sorted alphabetically according to everyones names, but if you then wanted to search for a phone number it would be more useful to have the data sorted according to people's phone numbers.

Like searching there are many different sorting algorithms, but some take much longer than others. In this section you will be introduced to two slower algorithms and one much better one.

### Scales Interactive

Throughout this section you can use the sorting interactive to test out the algorithms we talk about. When you're using it make sure you take note of the comparisons at the bottom of the screen, each time you compare two boxes the algorithm is making 'one comparison' so the total number of comparisons you have to make with each algorithm is the cost of that algorithm for the 8 boxes.

Use the scales to compare the boxes (you can only compare two boxes at a time) and then arrange them along the bottom of the screen. Arrange them so that the lightest box is on the far left and the heaviest is on the far right. Once you think they are in order click 'Test order'.

If the interactive does not run properly on your computer you can use a set of physical balance scales instead; just make sure you can only tell if one box is heavier than the other, not their exact weight (so not digital scales that show the exact weight).

{interactive name="sorting-algorithms" type="whole-page" text="Scales Interactive"}

{comment}
TODO: link back to the unplugged activity
{comment end}

### Selection Sort

One of the most intuitive ways to sort a group of boxes into order, from lightest to heaviest, is to start by first finding the lightest (or the heaviest) box and placing that to the side. Try this with the scales interactive.

After finding the lightest box simply repeat the process again with the remaining boxes until you find the second lightest, now place that to the side alongside the lightest box. If you keep repeating this process you will eventually find you have placed each box into order. Try sorting the whole group of boxes in the scales interactive into order using this method and count how many comparisons you have to make.

Tip: Start by moving all the boxes to the right of the screen and then once you have found the lightest box place it to the far right (if you want to find the heaviest first instead then move them all to the left).

If you record how many comparisons you had to make each time to find the next lightest box you might notice a pattern (hint: finding the lightest  should take 7 comparisons, and then finding the second lightest should take 6 comparisons…). If you can see the pattern then how many comparisons do you think it would take to then sort 9 boxes into order? What about 20? If you knew how many comparisons it would take to sort 1000 boxes, then how many more comparisons would it take to sort 1001 instead?

{panel type="teacher-note" summary="Answer for box analysis"}
For a list of 8 objects (like in the interactive) it should take 7 comparisons to find the lightest, 6 to find the next lightest, 5 to find the next, then 4, then 3, then 2, and then 1 to sort the final two boxes. In total this is 7+6+5+4+3+2+1 = 28 comparisons. If there had been 9 boxes it would have taken 8+7+6+5+4+3+2+1 = 36 comparisons. 20 boxes will take 190. Going from 1000 boxes up to 1001 will require 1000 extra comparisons, even though only 1 box has been added. Selection sort will always take
{math}(n\times(n-1))/2{math end} comparisons to sort *n* items into order.

For example: To calculate the number of comparisons required for 20 boxes, using {math}(n\times(n-1))/2{math end} where *n* = 20:

(20*(20-1))/2

= (20*19)/2

= 380/2

= 190 comparisons

Some students may recognise this formula as Gauss' trick (see [the anecdotes about Gauss on Wikipedia](http://en.wikipedia.org/wiki/Carl_Friedrich_Gauss#Anecdotes). One way of expressing this trick for the above example is that 20 boxes would require summing the numbers 1+2+3+...+17+18+19. If we write the numbers backwards (19+18+17+...3+2+1) then it would be the same sum. Now if we add these two lists together, pairing up the corresponding numbers, we get (1+19)+(2+18)+(3+17)+...+(17+3)+(18+2)+(19+1). Each pair in this sum adds up to 20, and there are 19 pairs, so adding the two lists together is just 20x19. Since both lists add up to the same amount, the original sum is a half of that, or 20x19/2, which is 190 comparisons, which is what we got from the formula above. If students can follow this reasoning then they can easily work out the comparisons needed for a large number of boxes, and the don't have to use the "magic" formula given above. There's a visual explanation in [this video](http://www.numberphile.com/videos/one_to_million.html) and more examples on [this page](http://nzmaths.co.nz/gauss-trick-staff-seminar).
{panel end}

{comment}
TODO: Include a spoiler so that students can see the answer (or an interactive), and additionally a curiosity about Gauss' trick
{comment end}

This algorithm is called Selection sort, because each time you look through the list you are 'selecting' the next lightest box and putting it into the correct position. If you go back to the algorithms racing interactive at the top of the page you might now be able to watch the selection sort list and understand what it is doing at each step.

The selection sort algorithm can be described as follows:
- Find the smallest item in the list and place it to one side. This will be your sorted list.
- Next find the smallest item in the remaining list, remove it and place it into your sorted list beside the item you previously put to the side.
- Repeat this process until all items have been selected and moved into their correct position in the sorted list.

You can swap the word 'smallest' for 'largest' and the algorithm will still work, as long as you are consistent it doesn't matter if you are looking for the smallest or the largest item each time.

### Insertion Sort

{panel type="teacher-note" summary="This section could be skipped"}
This algorithm is useful and commonly taught, although for the purpose of teaching the principles of algorithms, it's doesn't add a lot to what we've just covered with selection sort, so could be skipped.
However, if you have time, it's worth looking at for extra examples.
{panel end}
This algorithm works by removing each box from the original group of boxes and inserting it into its correct position in a new sorted list. Like Selection Sort, it is very intuitive and people often perform it when they are sorting objects themselves, like cards in their hands.

Try this with the scales interactive. Start by moving all the boxes to one side of the screen, this is your original, and unsorted, group. Now choose a box at random and place that on the other side of the screen, this is the start of your sorted group.

To insert another box into the sorted group, compare it to the box that is already in the sorted group and then arrange these two boxes in the correct order. Then to add the next box compare it to these boxes (depending on the weight of the box you might only have to compare it to one!) and then arrange these three boxes in the correct order. Continue inserting boxes until the sorted list is complete. Don't forget to count how many comparisons you had to make!

This algorithm is called Insertion Sort. If you're not quite sure if you've got the idea of the algorithm yet then have a look at [this animation](http://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif) from [Wikipedia](http://en.wikipedia.org/wiki/Insertion_sort).

Insertion sort can be described with informal instructions as follows:
- Take an item from your unsorted list and place it to the side, this will be your sorted list.
- One by one, take each item from the unsorted list and insert it into the correct position in the sorted list.
- Do this until all items have been sorted.

People often perform this when they physically sort items. It can also be a very useful algorithm to use if you already have a sorted set of data and want to add a new piece of data into the set. For example if you owned a library and purchased a new book you wouldn't do a Selection Sort on the entire library just to place this new book, you would simply insert the new book in its correct place.


{glossary-definition term="Quicksort" definition="A process for achieving an outcome, normally for a general problem such as searching, sorting, finding an optimal path through a map and so on."}

### Quicksort

Insertion and Selection Sort may seem like logical ways to sort things into order, but they both take far too many comparisons when they are used for large amounts of data. Remember computers often have to search through HUGE amounts of data, so even if they use a good searching algorithm like Binary Search to look through their data, if they use a bad sorting algorithm to first sort that data into order then finding anything will take far too long!

A much better sorting algorithm is {glossary-link term="quicksort"}Quicksort!{glossary-link end} (the name is a bit of a giveaway)

{interactive name="sorting-algorithms" type="whole-page" text="Quicksort interactive" parameters="method=quick" thumbnail="thumbnail-quick.png"}

This algorithm is a little more complicated, but is very powerful. To do this algorithm with the sorting interactive, start by randomly choosing a box and placing it on the scales. Now compare every other box to the one you selected; heavier boxes should be put on the right of the second row and lighter boxes are put on the left. When you are done, place the box you were comparing everything else to between these two groups, but to help you keep track of things, put it in the row below. The following example shows how it might look after this step. Note that the selected block is in the right place for the final sorted order, and everything on either side will remain on the side that it is on.

{image filename="quicksort-interactive-step-1.png" alt="Quicksort interactive in progress"}

Now apply this process to each of the two groups of boxes (the lighter ones, then the heavier ones). Keep on doing this until they are all sorted. The boxes should then be in sorted order!

It might be worth trying this algorithm out a few times and counting the number of comparisons you perform each time. This is because sometimes you might be unlucky and happen to pick the heaviest, or the lightest box first. On the other hand you might be very lucky and choose the middle box to compare everything to first. Depending on this the number of comparisons you perform will change.

Quicksort can be described in the following way:
- Choose an item from the list and compare every other item in the list to this (this item is often called the pivot).
- Place all the items that are greater than it into one subgroup and all the items that are smaller into another subgroup. Place the pivot item in between these two subgroups.
- Choose a subgroup and repeat this process. Eventually each subgroup will contain only one item and at this stage the items will be in sorted order.

{panel type="project" summary="Code to run selection sort and quicksort for yourself"}
The following files will run selection sort and quicksort in various languages; you can use them to generate random lists of values and measure how long they take to be sorted.
Note how long these take for various amounts of input (*n*), and show it in a table or graph.
You should notice that the time taken by Quicksort is quite different to that taken by selection sort.
- [Scratch](files/selection-quicksort-scratch.zip) - [Download Scratch here](https://scratch.mit.edu/scratch2download/)
- [Python (Version 2)](files/selection-quicksort-python2.py) - [Download Python 2 here](https://www.python.org/downloads/)
- [Python (Version 3)](files/selection-quicksort-python3.py) - [Download Python 3 here](https://www.python.org/downloads/)
{panel end}

There are dozens of sorting algorithms that have been invented; most of the ones that are used in practice are based on quicksort and/or mergesort. These, and many others, can be seen in this intriguing animated video.

{video url="http://www.youtube.com/watch?v=kPRA0W1kECg"}

## The whole story!

We've only really scratched the surface of algorithms in this chapter, as there are millions of different algorithms for millions of different problems! Algorithms are used in maths, route planning, network planning and operation, problem solving, artificial intelligence, genetic programming, computer vision, the list goes on and on! But by going through this chapter you should have gained an understanding of the key concepts of algorithms and will be well prepared to tackle more complicated ones in the future.

The algorithms introduced in this chapter aren't even necessarily the best for any situation; there are several other common ways of searching (e.g. hashing and search trees) and sorting (e.g. mergesort), and a computer scientist needs to know them, and be able to apply and fine tune the right one to a given situation.

In this chapter we have only talked about the number of comparisons an algorithm makes, and the amount of time a program takes to complete as 'costs' of algorithms. There are actually many other ways of measuring the cost of an algorithm. These include the amount of memory the algorithm uses and its computational complexity. Computer Scientists use 'Big O notation' to more accurately describe the performance or complexity of an algorithm, and you are likely to come across this notation very quickly when investigating the performance of algorithms. It characterises the resources needed by an algorithm and is usually applied to the execution time required, or sometimes the space used by the algorithm.

{panel type="extra-for-experts" summary="Examples of Big O notation"}
Here are some Big O examples:
- {math}O(1){math end} - An algorithm with {math}O(1){math end} complexity will always execute in the same amount of time regardless of how much data you give it to process. For example, finding the smallest value in a sorted list is always easy.
- {math}O(n){math end} - The amount of time an algorithm with {math}O(n){math end} complexity will take to execute will increase roughly linearly with (i.e. in direct proportion to) the amount of data you give it to process. The high-score algorithm was {math}O(n){math end}, and so was the linear search.
- {math}O(n^{2}){math end} - The performance of an algorithm with this complexity is roughly proportional to the square of the size of the input data set. Selection sort and insertion sort take {math}O(n^{2}){math end} time. That's not very good value - 10 times the amount of input will take 100 times as long!
- {math}O(2^{n}){math end} - The amount of time an algorithm with this complexity will take to complete will double with each additional element added to the data set! We haven't seen these kinds of situations in this chapter, but they are common, and are a theme of the Complexity and Tractability chapter. Algorithms that are this slow can be almost impossible to use!
{panel end}

Big O Notation however requires some advanced mathematics to explore thoroughly so has been intentionally left out of this main chapter, but if you want to learn more check out the Useful Links section. These topics are looked at in more depth in the Complexity and Tractability chapter.

To make things even more complicated, in practice algorithms are running on computers that have cached memory and virtual memory, where the time to access a particular value can be particularly short, or particularly long. There is a whole range of algorithms that are used for this situation to make sure that the algorithm still runs efficiently in such environments. Such algorithms are still based on the ideas we've looked at in this chapter, but require some clever adjustments to ensure that they work well.

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
- [Beginner's Guide to Big O Notation](http://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/)
