# Sorting

{panel type="teacher-note"}

# Why are we also covering sorting?

Our main points have already been made — what an algorithm is, how to estimate its cost, and that the cost isn't always proportional to the amount of data.
However, it's good to reinforce this with some different {glossary-link term="algorithm"}algorithms{glossary-link end}.
Sorting algorithms are useful to study because they illustrate many of the key issues that come up in algorithms, and there are some good contrasts, particularly between {glossary-link term="quicksort"}quicksort{glossary-link end} (which is fast and is widely used) and {glossary-link term="selection-sort"}selection{glossary-link end} or {glossary-link term="insertion-sort"}insertion sort{glossary-link end} (which become very slow as the number of items sorted increases).

{panel end}

Sorting is another very important area of algorithms.
Computers often have to sort large amounts of data into order based on some attribute of that data, such as sorting a list of files by their name or size, or emails by the date they were received, or a customer list according to people's names.
Most of the time this is done to make searching easier.
For example you might have a large amount of data and each piece of data could be someone's name and their phone number.
If you want to search for someone by name it would help to first have the data sorted alphabetically according to everyones names, but if you then wanted to search for a phone number it would be more useful to have the data sorted according to people's phone numbers.

Like searching there are many different sorting algorithms, but some take much longer than others.
In this section you will be introduced to two slower algorithms and one much better one.

## Scales interactive

Throughout this section you can use the sorting interactive to test out the algorithms we talk about.
When you're using it make sure you take note of the comparisons at the bottom of the screen, each time you compare two boxes the algorithm is making 'one comparison' so the total number of comparisons you have to make with each algorithm is the cost of that algorithm for the 8 boxes.

Use the scales to compare the boxes (you can only compare two boxes at a time) and then arrange them along the bottom of the screen.
Arrange them so that the lightest box is on the far left and the heaviest is on the far right.
Once you think they are in order click 'Test order'.

If the interactive does not run properly on your computer you can use a set of physical balance scales instead; just make sure you can only tell if one box is heavier than the other, not their exact weight (so not digital scales that show the exact weight).

{interactive slug="sorting-algorithms" type="whole-page" text="true"}

Scales Interactive

{interactive end}

{panel type="teacher-note"}

# Using the sorting interactive for demonstrations

The above interactive has a couple of extra features you can access to demonstrate sorting algorithms.
Configure them here:

{interactive slug="sorting-algorithms-configurator" type="in-page"}

{panel end}

{comment link back to the unplugged activity}

## Selection sort

One of the most intuitive ways to sort a group of boxes into order, from lightest to heaviest, is to start by first finding the lightest (or the heaviest) box and placing that to the side.
Try this with the scales interactive.

After finding the lightest box simply repeat the process again with the remaining boxes until you find the second lightest, now place that to the side alongside the lightest box.
If you keep repeating this process you will eventually find you have placed each box into order.
Try sorting the whole group of boxes in the scales interactive into order using this method and count how many comparisons you have to make.

Tip: Start by moving all the boxes to the right of the screen and then once you have found the lightest box place it to the far right (if you want to find the heaviest first instead then move them all to the left).

If you record how many comparisons you had to make each time to find the next lightest box you might notice a pattern (hint: finding the lightest  should take 7 comparisons, and then finding the second lightest should take 6 comparisons…).
If you can see the pattern then how many comparisons do you think it would take to then sort 9 boxes into order?
What about 20? If you knew how many comparisons it would take to sort 1000 boxes, then how many more comparisons would it take to sort 1001 instead?

{panel type="teacher-note"}

# Answer for box analysis

For a list of 8 objects (like in the interactive) it should take 7 comparisons to find the lightest, 6 to find the next lightest, 5 to find the next, then 4, then 3, then 2, and then 1 to sort the final two boxes.
In total this is \( 7+6+5+4+3+2+1 = 28 \) comparisons.
If there had been 9 boxes it would have taken \( 8+7+6+5+4+3+2+1 = 36 \) comparisons.
20 boxes will take 190. Going from 1000 boxes up to 1001 will require 1000 extra comparisons, even though only 1 box has been added.
Selection sort will always take \( \frac{n(n-1)}{2} \) comparisons to sort *n* items into order.

For example: To calculate the number of comparisons required for 20 boxes, using \( \frac{n(n-1)}{2} \) where *n* = 20:

\( \frac{20(20-1)}{2} \)

\( = \frac{(20 \times 19)}{2} \)

\( = \frac{380}{2} \)

\( = 190 \) comparisons

Some students may recognise this formula as Gauss' trick (see [the anecdotes about Gauss on Wikipedia](https://en.wikipedia.org/wiki/Carl_Friedrich_Gauss#Anecdotes)).
One way of expressing this trick for the above example is that 20 boxes would require summing the numbers \( 1+2+3+...+17+18+19 \).
If we write the numbers backwards ( \( 19+18+17+...3+2+1 \) ) then it would be the same sum.
Now if we add these two lists together, pairing up the corresponding numbers, we get \( (1+19)+(2+18)+(3+17)+...+(17+3)+(18+2)+(19+1) \).
Each pair in this sum adds up to 20, and there are 19 pairs, so adding the two lists together is just \( 20 \times 19 \).
Since both lists add up to the same amount, the original sum is a half of that, or \( \frac{(20 \times 19)}{2} \), which is 190 comparisons, which is what we got from the formula above.
If students can follow this reasoning then they can easily work out the comparisons needed for a large number of boxes, and the don't have to use the "magic" formula given above.
There's a visual explanation in [this video](http://www.numberphile.com/videos/one_to_million.html) and more examples on [this page](http://nzmaths.co.nz/gauss-trick-staff-seminar).

{panel end}

{comment Include a spoiler so that students can see the answer (or an interactive), and additionally a curiosity about Gauss' trick }

This algorithm is called {glossary-link term="selection-sort"}selection sort{glossary-link end}, because each time you look through the list you are 'selecting' the next lightest box and putting it into the correct position.
If you go back to the algorithms racing interactive at the top of the page you might now be able to watch the selection sort list and understand what it is doing at each step.

The selection sort algorithm can be described as follows:

- Find the smallest item in the list and place it to one side. This will be your sorted list.
- Next find the smallest item in the remaining list, remove it and place it into your sorted list beside the item you previously put to the side.
- Repeat this process until all items have been selected and moved into their correct position in the sorted list.

You can swap the word 'smallest' for 'largest' and the algorithm will still work, as long as you are consistent it doesn't matter if you are looking for the smallest or the largest item each time.

## Insertion sort

{panel type="teacher-note"}

# This section could be skipped

This algorithm is useful and commonly taught, although for the purpose of teaching the principles of algorithms, it's doesn't add a lot to what we've just covered with selection sort, so could be skipped.
However, if you have time, it's worth looking at for extra examples.

{panel end}

This algorithm works by removing each box from the original group of boxes and inserting it into its correct position in a new sorted list.
Like selection sort, it is very intuitive and people often perform it when they are sorting objects themselves, like cards in their hands.

Try this with the scales interactive.
Start by moving all the boxes to one side of the screen, this is your original, and unsorted, group.
Now choose a box at random and place that on the other side of the screen, this is the start of your sorted group.

To insert another box into the sorted group, compare it to the box that is already in the sorted group and then arrange these two boxes in the correct order.
Then to add the next box compare it to these boxes (depending on the weight of the box you might only have to compare it to one!) and then arrange these three boxes in the correct order.
Continue inserting boxes until the sorted list is complete.
Don't forget to count how many comparisons you had to make!

This algorithm is called {glossary-link term="insertion-sort"}insertion sort{glossary-link end}.
If you're not quite sure if you've got the idea of the algorithm yet then have a look at [this animation](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif) from [Wikipedia](https://en.wikipedia.org/wiki/Insertion_sort).

Insertion sort can be described with informal instructions as follows:

- Take an item from your unsorted list and place it to the side, this will be your sorted list.
- One by one, take each item from the unsorted list and insert it into the correct position in the sorted list.
- Do this until all items have been sorted.

People often perform this when they physically sort items.
It can also be a very useful algorithm to use if you already have a sorted set of data and want to add a new piece of data into the set.
For example if you owned a library and purchased a new book you wouldn't do a selection sort on the entire library just to place this new book, you would simply insert the new book in its correct place.

## Quicksort

Insertion and selection sort may seem like logical ways to sort things into order, but they both take far too many comparisons when they are used for large amounts of data.
Remember computers often have to search through HUGE amounts of data, so even if they use a good searching algorithm like binary search to look through their data, if they use a bad sorting algorithm to first sort that data into order then finding anything will take far too long!

A much better sorting algorithm is {glossary-link term="quicksort"}quicksort{glossary-link end}! (the name is a bit of a giveaway)

{interactive slug="sorting-algorithms" type="whole-page" text="true" parameters="method=quick"}

Quicksort Interactive

{interactive end}

This algorithm is a little more complicated, but very powerful.
To do this algorithm with the sorting interactive, start by randomly choosing a box and placing it on the scales.
Now compare every other box to the one you selected; heavier boxes should be put on the right of the second row and lighter boxes are put on the left.
When you are done, place the box you were comparing everything else to between these two groups, but to help you keep track of things, put it in the row below.
The following example shows how it might look after this step.
Note that the selected block is in the right place for the final sorted order, and everything on either side will remain on the side that it is on.

{image file-path="img/chapters/quicksort-interactive-step-1.png" alt="Quicksort interactive in progress"}

Now apply this process to each of the two groups of boxes (the lighter ones, then the heavier ones).
Keep on doing this until they are all sorted. The boxes should then be in sorted order!

It might be worth trying this algorithm out a few times and counting the number of comparisons you perform each time.
This is because sometimes you might be unlucky and happen to pick the heaviest, or the lightest box first.
On the other hand you might be very lucky and choose the middle box to compare everything to first.
Depending on this the number of comparisons you perform will change.

Quicksort can be described in the following way:

- Choose an item from the list and compare every other item in the list to this (this item is often called the {glossary-link term="pivot"}pivot{glossary-link end}).
- Place all the items that are greater than it into one subgroup and all the items that are smaller into another subgroup.
Place the pivot item in between these two subgroups.
- Choose a subgroup and repeat this process.
Eventually each subgroup will contain only one item and at this stage the items will be in sorted order.

{panel type="project"}

# Code to run selection sort and quicksort for yourself

The following files will run selection sort and quicksort in various languages; you can use them to generate random lists of values and measure how long they take to be sorted.
Note how long these take for various amounts of input (*n*), and show it in a table or graph.
You should notice that the time taken by quicksort is quite different to that taken by selection sort.

The Scratch implementation of selection sort and quicksort can be downloaded below.

{button-link link="files/selection-quicksort-scratch.zip" text="Download Scratch sorting example" file="yes"}

The following Python implementations of selection sort and quicksort can be run in your browser:

{button-link link="https://repl.it/@uccser/selection-quicksort-python3" text="Python 3"}

{button-link link="https://repl.it/@uccser/selection-quicksort-python2" text="Python 2"}

{panel end}

There are dozens of sorting algorithms that have been invented; most of the ones that are used in practice are based on quicksort and/or mergesort.
These, and many others, can be seen in this intriguing animated video.

{video url="https://www.youtube.com/watch?v=kPRA0W1kECg"}
