# Searching

{panel type="teacher-note"}

# Presenting searching in the classroom

The box searching game in this section is split into two parts, the first corresponds to the {glossary-link term="linear-search"}linear search{glossary-link end} algorithm (also known as sequential search) and the second corresponds to {glossary-link term="binary-search"}binary search{glossary-link end}.

We recommend you play through the levels yourself for a while, or after reading this description.
It is based on the [CS Unplugged Battleships game](http://csunplugged.com/searching-algorithms) which can be used as a classroom activity to enforce the lessons in this chapter (the hashing activity is not used for the box searching game).

To run this as a classroom activity get all the students to play each section of the game at the same time and then when they have all finished have a discussion about the results.
After students have finished the first part ask them questions like "Did anyone find the target number on the first go?", "Did anyone only find it after checking every other box?", or find the average number of boxes students had to open to find the target number (this should be around 5 for the first level and around 10 for the second).

While they are playing the second part some may have trouble finding the correct algorithm to find the target number.
If they are finding these levels confusing you can give them a hint like "Why don't you start by opening the box in the centre" and when they do ask them "What does the number you found tell you about all the numbers before it?" if the number is smaller than the one they are looking for, or "all the numbers after it?" if the number is bigger than the one they are looking for.

When students have finished ask them questions like "Were you able to find the target number even though you had fewer lives? What strategy did you use to find the target number?", we have found that many students will have ended up doing a binary search (or similar) without even knowing what a binary search is!
Explaining these algorithms to students is likely to be easier now that they have seen them in action.

{panel end}

Searching through collections of data is something computers have to do all the time.
It happens every time you type in a search on Google, or when you type in a file name to search for on your computer.
Computers deal with such huge amounts of data that we need fast algorithms to help us find information quickly.

Lets investigate searching with a game...

{interactive slug="searching-algorithms" type="whole-page" text="true" parameters="start=1&end=2"}

Searching Boxes - Part 1

{interactive end}

You may have noticed that the numbers on the boxes in the game were in a random order, which meant that finding the target number was basically luck!
You might have found it on your first try, or if you were less lucky you might have had to look inside almost all the boxes before you found it.
This might not seem like such a bad thing since you had enough lives to look under all the boxes, but imagine if there had been 1,000 boxes, or worse 1,000,000!
It would have taken far too long to look through all the boxes and the target number might have never been found.

Now this next game is slightly different.
You have fewer lives, which makes things a bit more challenging, but this time the numbers inside the boxes will be in order.
The box with the smallest number is on the far left, and the one with the largest number is on the far right.
Let's see if you can find all the target numbers without running out of lives...

{interactive slug="searching-algorithms" type="whole-page" text="true" parameters="start=3"}

Searching Boxes - Part 2

{interactive end}

Now that you have played through the whole game (and hopefully found all of the target numbers!) you may have noticed that even though you had less lives in the second part of the game, and lots of boxes to search through, you were still able to find the target number. Why was this possible?

## Linear search

Since the boxes in the first game were in a random order there really wasn't any strategy you could have used to find the target number, except simply keep opening boxes one by one until you found the target number.
This is essentially the {glossary-link term="linear-search"}linear search{glossary-link end} algorithm (sometimes called a sequential search).
In simpler terms, linear search algorithm is as follows:

- Check if the first item in a list is the item you are searching for, if it is the one you are looking for, you are done.

- If it isn't the item you are searching for move on and check the next item.

- Continue checking items until you find the one you are searching for.

If you used this algorithm you might get lucky and find what you are looking for on your first go, but if you were really unlucky you might have to look through everything in your list before you found the right object!
For a list of 10 items this means on average you would only have to look at 5 items to find what you were looking for, but for a list of 10000 you would have to look through on average 5000.

{panel type="curiosity"}

# How is bozo search different from linear search?

If you watched the video at the beginning of the chapter you might be thinking that what you did in the box searching game sounds more like {glossary-link term="bozo-search"}bozo search{glossary-link end} than {glossary-link term="linear-search"}linear search{glossary-link end}, but actually bozo search is even sillier than this!
If you were doing a bozo search then after opening a box and finding the wrong number, you would close the box back up and try another one at random!
This means you might end up checking the same box again and again and again and you might never find the target number, even with a small number of boxes!

{panel end}

## Binary search

A much better algorithm to use is called {glossary-link term="binary-search"}binary search{glossary-link end}.
In the second part of the box searching game the boxes were in order, which meant you were able to be more clever when you were searching for the target number, and you might have been using a binary search without realising!

{panel type="teacher-note"}

# Teaching binary search with a phone book

The binary search algorithm can be demonstrated with a phone book or dictionary: choose a name, then open it at the *middle* page of the book (students might point out that you could guess how far through to open it, but insist on starting in the middle).
If you can spare the book, rip it in half at the chosen page, and ask the class which of the two halves contains the name (the ones before the middle, or the ones after).
If you don't have replacement books available, you can still proceed by just holding up the chosen half, but it will be more memorable for students when they see the problem literally divided in half.
Throw away the half that can't contain the name, pointing out that hundreds of pages have been eliminated by one decision.
Repeat this on the remaining half, ripping that in half, then half again, and so on.
On the board you can work out the number of pages left; for example, if there were 512 pages in the phone book, after the first rip there are 256, then 128, then 64, 32, 16, 89, 4, 2 and finally just one page.
That's 9 pages that were examined to get down to the desired page.
Note that it's easiest to pick numbers that are powers of 2 i.e. 512, 1024, 2048, otherwise you have to deal with halving odd numbers, which works fine, but is a bit distracting.

The power of binary search becomes obvious when you ask how long it would take to search a book twice as large.
The first rip on the larger book will reduce it to the original problem, so, for example, a book of 1024 pages requires 10 rips instead of the 9 used for 512 pages.
A million page phone book (1,048,576 pages to be precise) is reduced to 1 page by only 20 rips (students will probably think that it will be a lot more, but they can work it out by halving 1,048,576 20 times).
A billion pages requires only 30 rips - again, have students work this out for themselves, as it is surprising.
You could point out that a billion-page phone book could hold every name in the world, and in fact a social network site could have a billion users on it, so searching for someone on a billion-user system could be done *by hand* looking at just 30 names.
The catch? They need to be in sorted order, but sorting things into order is easy too if you use the right algorithm.
(In practice large systems use a variation of this kind of searching, but this demonstrates how a very fast algorithm is possible on very large amounts of data, such as those used by search engines or social networks).

{panel end}

If you used a binary search on each of the levels then you would have always had enough lives to find the target number!
Informally, the binary search algorithm is as follows:

- Look at the item in the centre of the list and compare it to what you are searching for

- If it is what you are looking for then you are done.

- If it is larger than the item you are looking for then you can ignore all the items in the list which are larger than that item (if the list is from smallest to largest this means you can ignore all the items to the right of the centre item).

- If it is smaller then you can ignore all the items in the list which are smaller than that centre item.

- Now repeat the algorithm on the remaining half of the list, checking the middle of the list and choosing one of the halves, until you find the item you are searching for.

Binary search is a very powerful algorithm.
If you had 1000 boxes to search through it would take you at most 10 checks for binary search to find something and linear search would take at most 1000 checks, but if you doubled the number of boxes to search through how would this change the number of checks made by binary search and linear search?

{panel type="spoiler"}

# How does doubling the number of boxes affect the number of checks required?

The answer to the above question is that the maximum number of checks for linear search would double, but the maximum number for binary search would only increase by one.

{panel end}

It is important to remember that you can only perform a binary search if the items you are searching through are sorted into order.
This makes the sorting algorithms we will look at next even more important because without sorting algorithms we wouldn't be able to use binary search to quickly look through data!

{panel type="project"}

# Code to run linear and binary search for yourself

The following files will run linear and binary search in various languages; you can use them to generate random lists of values and measure how long they take to find a given value.
Your project is to measure the amount of time taken as the number of items (*n*) increases; try drawing a graph showing this.

{button-link link="files/linear-binary-search-scratch.zip" text="Download Scratch search example" file="yes"}

{button-link link="files/linear-binary-search-python2.py" text="Download Python 2 search example" file="yes"}

{button-link link="files/linear-binary-search-python3.py" text="Download Python 3 search example" file="yes"}

{panel end}
