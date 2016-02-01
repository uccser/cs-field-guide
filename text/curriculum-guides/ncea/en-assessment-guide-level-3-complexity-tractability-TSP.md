# Complexity and Tractability (3.44) - The Traveling Salesman Problem

{panel type="teacher-note" summary="Required skills and preparation for this project"}
A good understanding of the concepts from 1.44 algorithms, and optionally 2.44 encryption will be helpful. If the student did not do 1.44 and has never studied algorithms and their costs, we recommend either going through the Algorithms chapter of the Field Guide first, or choosing a different topic, as a basic knowledge of the costs of algorithms is assumed and necessary to fully understand this topic.
{panel end}

This is a guide for students attempting Complexity and Tractability in digital technologies achievement standard 3.44. This guide is not official, although we intend for it to be helpful, and welcome any feedback.

In order to fully cover the standard, you will also need to have done a project in one other 3.44 topic. The other project should be in either Software Engineering, Artificial Intelligence, Formal Languages, Network Protocols, or Graphics and Visual Computing.

## Overview

Each project needs to satisfy all bullet points in the standard, which given below.

Note that a plural means “at least 2” in NZQA documents. Because this is one of the two areas of computer science that the student must cover, most of the plurals effectively become singular for this project, which is half their overall report. This project will give them at least one algorithm/technique and practical application, and the other project they do will give them another of each.

- **Achieved: [A1]** “describing key problems that are addressed in selected areas of computer science”
- **Achieved: [A2]** “describing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas“
- **Merit: [M1]** “explaining how key algorithms or techniques are applied in selected areas”
- **Merit: [M2]** “explaining examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas”
- **Excellence: [E1]** “discussing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas”
- **Excellence: [E2]** “evaluating the effectiveness of algorithms, techniques, or applications from selected areas”

The terminology in the 3.44 standard can be challenging to understand because it applies to six different areas. The following list describes how the terminology of the standard maps onto this project.

- *Selected Area:* Complexity and Tractability
- *Key Problem:* Finding solutions for problems in which the optimal solution would take an impractical amount of time to find. In this case, the problem is finding the shortest path to visit a number of locations and return to the starting point (the Travelling Salesman Problem).
- *Algorithms/ Techniques:* Brute force algorithms, Greedy algorithms, Heuristic algorithms.
- *Practical Application:* Solving the Cray Pot Problem (or another problem based on the Travelling Salesperson Problem)

{panel type="jargon-buster" summary="What is meant by 'Heuristics'?"}
Note that the term heuristics means “rules of thumb”, and that this should not be confused with the more general idea of heuristics with the heuristics that you learnt about in Human Computer Interaction.

The heuristics in this context are “rules of thumb” for solving the algorithmic problems encountered in complexity and tractability; in this context, a heuristic isn't guaranteed to give the best possible solution, but usually will give a fairly good result.
{panel end}

In summary, to satisfy the standard you might do the following:
- Describe the key problem(s). [A1]
- Show (explain) how a brute force algorithm (that gives the optimal result) and at least one heuristic (e.g. In TSP, one greedy algorithm is Nearest Neighbour, which is a heuristic that is greedy.) can be used to find a solution to an instance of the Cray Pot Problem that you have made. [A2 (partially), M1]
- Explain the results, and what each of the the algorithms has calculated. [A2, M2]
- Discuss some real world examples with specific maps, and how each of the two algorithms would work for them. [E1]
- Evaluate the use of the two algorithms in real world problems. This will involve considering the cost vs benefit tradeoff of finding better solutions, giving examples that show how an heuristic might not find the optimal solution, and possibly looking at additional problems that the basic algorithms cannot solve (e.g. traffic conditions and roadworks). [E2]

{panel type="teacher-note" summary="Be sure to use real world examples for Excellence"}
Generally, markers prefer to see real world examples at the excellence level (e.g. big companies that do deliveries). Artificial problems such as the Cray Pot Problem are ideal for satisfying the Achieved and Merit criteria, because they allow the student to go into depth about the details of the algorithms, and to show specific examples of how they are applied.

Artificial problems also require students to explain why the problem is equivalent to the TSP - being able to identify that a problem is actually equivalent to a well known intractable problem is an essential programming skill. Some programmers have been known to waste time trying to find an efficient algorithm that finds the optimal solution, without realising that it is probably impossible!
{panel end}

## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

- 11.1 - What’s the Big Picture?
- 11.2 - Algorithms, problems, and Speed Limits
- 11.3 - Tractability
- 11.4 - The Travelling Salesman Problem

## Project

This project is based around a fictional scenario where there is a cray fisher who has around 18 cray pots that have been laid out in open water. Each day the fisher uses a boat to go between the cray pots and check each one for crayfish.

The cray fisher has started wondering what the shortest route to take to check all the cray pots would be, and has asked you for your help. Because every few weeks the craypots need to be moved around, the fisher would prefer a general way of solving the problem, rather than a solution to a single layout of craypots. Therefore, your investigations must consider more than one possible layout of craypots, and the layouts investigated should have the cray pots placed randomly i.e. not in lines, patterns, or geometric shapes.

### Generating a Craypot Map

In order to generate a random map of craypots that can be used as your own unique personalised example, get a pile of coins (or counters) with however many craypots you need, and scatter them onto an A4 piece of paper. If any land on top of each other, place them beside one another so that they are touching but not overlapping. One by one, remove the coins, making a dot on the paper in the centre of where each coin was. Number each of the dots. Each dot represents one craypot that the cray fisher has to check. You should label a point in the top left corner or the paper as being the boat dock, where the cray fisher stores the boat.

In this project, you will need to make two maps. A “small” map and a “large” map.

## Writing your report

### Introduction (Achieved/ Merit/ Excellence)
[A1 + background for the rest of the report]

This should not take more than 1 paragraph, or ⅓ of a page. It is essential to do a good job of this part, even if what you are writing seems obvious.

Briefly introduce the Cray Pot Problem. You should be able to explain how the Craypot Problem is equivalent to the Travelling Salesman Problem. Briefly describe how you determined this, and what the equivalent of a town and road is in the Craypot Problem. Explain  why computer scientists are so interested in the Travelling Salesman Problem. Include this introduction at the start of the complexity/ tractability section of your report. We strongly recommend the following sentence being at the start or end of the introduction “The key problem I am looking at is [a few words describing the problem]”, so that it is really clear to the marker.

### Showing and explaining a brute force approach and then a heuristic approach (Achieved/ Merit/ Excellence)

{panel type="additional-information" summary="Ensuring you cover the achieved and merit criteria sufficiently"}
Showing how the brute force algorithm can be applied to the Cray Pot Problem + Explaining why it is not helpful to the crayfisherman + Showing how a greedy heuristic algorithm can be applied to the Cray Pot problem + Explaining what kind of solution the greedy heuristic algorithm has found, and why this is more helpful to the cray fisher (A2/M1/M2).

Note that the difference between achieved and merit will be in the quality of the explanations (i.e whether or not the marker considers them to be “describing” or “explaining”. Generating the personalised examples is necessary for achieved, because the marker needs to be able to see that the student has done their own work

It is important that students discuss both algorithms (brute force and greedy heuristic), because doing the brute force algorithm is necessary to show that it is unhelpful in practice, and then students need to explore approaches that can be used in practice, such as the greedy heuristic algorithm. This allows them to give a solid explanation of TSP based problems and how computer scientists deal with them.]
{panel end}

Generate a map with 7 or 8 craypots using the random map generation method described above. This is your “small” map. Then make a map with somewhere between 15 and 25 craypots. This is your “large” map. Make a copy of each of your maps, as you will need them again. Read the “hints for success” at the bottom of this guide before making the maps, because it has some advice on making the maps so that they are legible and minimise the usage of precious space in your report.

Using your intuition, find the shortest path between the cray pots in your small map. Do the same with your large map. Don’t spend more than 5 minutes on the large map - you don’t need to include a solution to the large map in your report. It is extremely unlikely you’ll find the optimum for the large map (Recognising the challenges in the problem is far more important than finding a solution). Number the order in which you visit the cray pots on your map.

Use the field guide interactive to estimate how long it would take a computer to solve each of your craypot problems and find an optimal solution.

Explain why using the brute force algorithm to find the optimal route is unhelpful to the cray fisher (remember that they generally have between 20 - 25 cray pots in the water at a time). Save this explanation so that you can include it in your report later. One paragraph is enough.

Unless your locations were laid out in a circle or oval, you probably found it very challenging to find the shortest route. A computer could find it even harder, as you could at least take advantage of your visual search and intuition to make the task easier. A computer could only consider two locations at a time, whereas you can look at more than two. But even for you, the problem would have been challenging! Even if you measured the distance between each location and put lines between them and drew it on the map so that you didn’t have to judge distances between locations in your head, it’d still be very challenging for you to figure out! It is clear the cray fisher isn’t going to want to wait for you to calculate the optimal solution. But can you still provide a solution that is better than visiting the cray pots in a random order?

There are several ways of approaching this. Some are better than others in general, and some are better than others with certain layouts. One of the more obvious approximate algorithms is to start from the boat dock in the top left corner of your map and to go to the nearest craypot. From there, you should go to the nearest cray pot from that cray pot, and repeatedly go to the nearest craypot that hasn’t yet been checked. This approach is known as the "Nearest Neighbour" algorithm, and is an example of a greedy heuristic algorithm, as it always makes the decision that looks the best at the current time, rather than making a not so good choice now to try and get a bigger pay off later.  In the excellence part of this guide, you will explore why it is not always optimal, even though it might initially seem like it is.

For both your small map and large map, use this greedy algorithm to find a solution (it shouldn’t take you too long). Number the order in which you visit the cray pots on your map. A computer would be a lot faster than you at this, so you should have a pretty good idea about how the two algorithms compare.

Explain which algorithm is more suitable for determining a route for the crayfisherman, and why. What are the implications for each choice that you considered to arrive at your conclusion? (e.g. how long would he have to wait for it vs how much time and fuel the fisher saves going between cray pots) Save this explanation so that you can include it in your report later. 2 to 3 paragraphs is enough.

You should now have 4 maps (small + brute force algorithm, large + brute force algorithm, small + greedy heuristic algorithm, large + greedy heuristic algorithm), and several explanations. You now need to put your findings into report form. After your introduction, briefly explain how a computer would do a brute force algorithm (hint: check the field guide; the principle of the algorithm is simple, but it is very inefficient!). Next, include your two maps for the brute force algorithm, and briefly explain why the large one was so challenging, followed by your explanation on why this algorithm is no good for the cray fisher. Then explain how the greedy heuristic algorithm you used works, and include your two maps for it. Finally, these include your explanation where you determined which algorithm was best for the Cray Pot problem, and the implications of each choice. All up, you should have around 2 to 3 pages (if you have more, and are planning on attempting excellence, you might want to consider shortening some parts or shrinking down images a little more).

### Discussing real world examples of the traveling salesman problem and evaluating the effectiveness of the algorithms on the real world problems (Excellence)

In order to gain Excellence in the standard, you will need to go beyond just applying and explaining algorithms used on the Cray Pots Problem (and TSP). The reports of students who gain excellence in this standard generally have explored the algorithms and their implications in depth and/ or done their own research into real world applications of TSP. You should ensure you have discussed the practical applications and the algorithms, and have evaluated the algorithms in terms of the practical applications (i.e. are the algorithms any good in practice?) You might choose to do this by following some or all of the following suggestions (Focussing on two would probably be ideal). Remember that you should only use 5 pages on complexity/tractability in total, so your discussion and evaluation for excellence should take up no more than about 2 pages.
- Analyse the greedy heuristic algorithm (e.g. cases where it finds a really bad solution, and cases where it finds the optimal solution), and explore how effective it would be in practice. One way you could do this is to do a search in Google maps for something like supermarkets in a city (ideally you’ll want at least 20 to 30 to appear), and then ensuring the the roads are visible on the map, take a screenshot of it. Trace a greedy heuristic algorithm path onto it, and then evaluate how effective it was. You will probably find that some parts of the path make sense, although in other parts it is inefficient because a destination was “skipped” when others that were somewhat near it were visited, and the shortest path heuristic pulled the path away from that destination. What kinds of heuristics would you use to get a better solution? (e.g. could you somehow break the TSP into a bunch of clusters, in which you visit all in the cluster before moving onto the next cluster?). You might want to include a second map showing your other heuristic ideas. The maps should take up around ½ a page each. Make sure to discuss your conclusions.
- Exploring and discussing why companies that carry out tasks such as delivering goods (e.g. Coca Cola sending people around to restock their many vending machines or a courier service delivering parcels to various addresses) are willing to invest so much money in finding better solutions to their own travelling salesman problems (and the closely related problems that arise when additional constraints such as speed limits and road blocks are added).
- Investigating and discussing real world examples of the Travelling Salesman Problem e.g. Coca Cola sending people around to restock their many vending machines or a courier service delivering parcels to various addresses, or Tim Bell and his Christmas CD delivery each year to 25 music students throughout Christchurch.  
- Identifying and discussing some of the additional issues that come up in real world examples, for example, traffic conditions, temporary roadblocks, roads only going between some of the destinations, speed limits, police checkpoints, and traffic lights. Once these are added in, the problem is no longer strictly the Travelling Salesman Problem, although it is still likely to be an intractable problem (although some of the additional issues can actually make the problem easier to solve; identifying thee and exploiting them is another big goal for solutions)
- Evaluating some of the Android and iPhone apps that claim to help the user with TSP style problems. Do they live up to the claims they make?


## Hints for Success

You should be able to write up the project in about 4 to 5 pages.

- This project is one that might be difficult to fit into the page limit because of all the diagrams. You want to be able to make the diagrams as small as possible, while ensuring they are still legible. It would be possible to get the cray pot maps side by side in pairs to save space. The following tips may also help.
Consider making them vertical rather than horizontal (you will need to make this decision before starting, because the numbering must be the right way up). This means that you could place two side by side, taking up about half the page in total. The total space of your four maps would be 1 page.
 - Use a fine tipped marker or pen that gives a solid line to draw the dots and lines.
 - Use a ruler to draw the lines.
 - If the scanner makes any lines unclear, just redraw them with image editing software.
 - Use image sharpening or increase the contrast. It is okay if the image is black and white.
 - Don’t save them as jpegs (If this seems strange to you, read about [how JPEG compression works](coding-compression.html#image-compression-using-jpeg) when you have some spare time)
- Remember that the marker wants to know about the applications, and the use of algorithms to solve them. This is what the standard asks for, and should always be kept in mind. Real world implications are important, i.e. in practice, the optimal solution is not essential to be efficient.
- For excellence, you will need to do additional background reading. Be careful what you include in your report; it is very obvious to the marker when a student has copied text from a source that they don’t actually understand. In particular, be sure that you understand the jargon you use so that you can be certain you are using it correctly. Incorrectly used jargon sounds really bad to a reader (e.g. marker) who knows the topic!
- Note that it is essential for Achieved, Merit, and Excellence that you start with your own examples (e.g. craypot maps) and explain those, rather than simply paraphrasing information from the field guide and other sources.



## Staying within the page limit

The page limit for 3.44 is 10 pages. Remember that you have to do a project on a different topic as well, so that leaves 5 pages for Complexity and Tractability. We recommend aiming for 4 and ½  pages so that if some sections go slightly over, you will still be under 10 pages overall. Also, don’t forget you will need a bibliography at the end.

A plausible breakdown would be:
- ½ page: introducing the key problem, the Cray Pot Problem, and why the Cray Pot Problem is equivalent to the Travelling Salesman problem
- 1 page: Craypot maps (Achieved/ Merit Excellence). Note that they are not necessarily on the same page, although their total area should not exceed 1 page.
- 1 page: Explanations about the Craypot maps from the Achieved/Merit part of the guide (Achieved/Merit/ Excellence)
- 2 pages: Whatever you decide to do for excellence. This might include diagrams or discussions. Don’t let diagrams take up more than 1 page though, because you need to have an in depth discussion as well.

The project in this assessment guide may be challenging to fit into 5 pages (because of the diagrams/ maps), particularly for students who have aimed for excellence. Some of the topics fit well into 3 to 4 pages, so you may be able to go slightly over 5 pages for this topic if your other topic requires less space.
