# Complexity and tractability (3.44) - TSP
{commment}
[notes removed from chapter]
{end comment}

This chapter supports the "Complexity and tractability" option of the NZ achievement standard 3.44.

We expect that the “big picture” and the “algorithms, problems, and speed limits” section to be used for teaching the ideas in tractability to students. Exercises have been provided in these sections for this purpose, and teachers should provide as much guidance as necessary to students to work through those exercises. These exercises are *not* suitable for the 3.44 achievement standard, as their main goal is to lay the groundwork for the project(s) which are given later.

The later sections have ideas for personalised projects that students can submit for the 3.44 achievement standard. Currently the only such project is for TSP, although more will be added eventually.

Notes for teachers are provided within the project text, explaining which parts of the standard are being satisfied with different parts of the projects. It is recommended that students aiming for excellence try do all of the exercises, whereas achieved and merit students may skip over the more difficult ones.

panel="teacher" summary=""}

Algs, probs and speed limits
Please note that the work in this section is *NOT* sufficient for fulfilling requirements for the 3.44 assessment because it just lays some of the foundations, introducing concepts in tractability. The intention is for this section to be used for teaching, and teachers can give as much guidance as necessary for this section, but then students can work more independently on one of the projects in the later sections, building on what they learnt in this section

{panel end}

Craypots problem


You should present your findings for this project in a written report where you include your answers to the exercises, the maps you make, and written explanations to explain what you have found out and learnt.

The questions and exercises in this section are suitable for a project to be submitted for assessment. Students should include all their answers, findings, and investigations in a writtten report. They should also make the assumption when writing their report that the readers of it (i.e. the person assigning a grade to it) have never seen this book before! For example, when they come to the part about making craypot maps, they should not just put a map in with no explanation. They should briefly explain the task they were given so that the marker understands.

This project covers material for an example for the 3.44 standard through the following components:

- Key problem: intractability of the TSP
- Practical application: Checking craypots (could be applied to other delivery/pickup route applications).
- Algorithm/technique: Estimating the complexity (time needed) to solve the problem
- Evaluation: feasibility of an optimal (exhaustive search) approach and a greedy (nearest neighbour) approach
- Personalised student examples: a student's randomly chosen layout of craypots

The scenario below is around collecting craypots, but the project would work in any situation where there is a direct path between every pair of points. For example, [delivering pizzas by helicopter may appeal to some students](http://www.nbcnews.com/technology/dominos-domicopter-drone-can-deliver-two-large-pepperonis-6C10182466). The CS4FN website has a similar scenario around [whale watching and visiting volcanic islands](http://www.cs4fn.org/optimization/watchingwhaleswell.php).

At the time of writing there is an alternative context that makes a good illustration of the problem of tractability: there is an app for iPhone called "Ecomaps" which solves the TSP for you (it was drawn to our attention by a music teacher who had to drop off CDs urgently to about 30 students, so they bought the app to work out the best route). Currently the system seems to use an intractable algorithm; it works fine for a few addresses, but when you get up to a couple of dozen it never finishes the calculation. The requirements of the standard would be met nicely by evaluating this app, including how fast it runs for various numbers of addresses, working out at which point it becomes useless, and estimating how many more addresses it could work with on a phone twice as fast. The app nicely illustrates the problem of not knowing about tractability --- the programmers for the app either didn't know this is an issue, or couldn't program heuristic approaches to make it usable.

{panel="teacher" summary="xxxxxxx"}

A2/M2 -  students should be able to identify intractable problems by relating them to known intractable problems. [these notes to teachers refer to bullet points in the 3.44 achievement standard. A2 is the second bullet point in the achieved criteria]

{panel end}

{panel="teacher" summary="xxxxxxx"}

A2 - students should show an example of an optimal TSP solution

{panel end}


{panel="teacher" summary="xxxxxxx"}
Using intuition...
This reveals one of the issues with tractability - you can't even tell if you've got a good solution or not!

{panel end}


{panel="teacher" summary="xxxxxxx"}

M2 - students should show they understand the craypot problem is hard by doing some calculations that show how long it would take to find an optimal solution using the algorithm outlined above.

The number of possible routes for *n* places to visit will be {math}(n-1)!{math end}. This is because the starting point is fixed, then there are {math}n-1{math end} choices for the next point, then {math}n-2{math end} and so on. It is essentially the same as permutation sorting, except that the first value doesn't change.

Note that students shouldn't use the interactive at the start of this chapter to estimate speeds, as it runs at a fixed speed for a particular computer, and the project below will assume we have a very fast computer. And of course, pedagogically it's better for them to do the calculations themselves.

{panel end}



{panel="teacher" summary="xxxxxxx"}

A2 - Students should show an example of the greedy algorithm being used to solve TSP

M2 - Students should show understanding that the approximate solution is not necessarily the optimal one

{panel end}

{panel="teacher" summary="xxxxxxx"}

E2 - Students should evaluate the greedy algorithm by showing why a given approximate solution isn’t an optimal one, using a simple technique such as identifying a few of the craypots that would have been better visited in a different order.  A simple way to "fool" the greedy algorithm is to have the pots in a circle with one pot well outside the circle on the opposite side of the starting point. The pot that is outside the circle won't be visited until after going right around the circle! Students should be able to come up with their own ideas for a unique layout that has a similar problem.

{panel end}

{comment}

.. Do we need to give any further guidance?

.. Here's another way to do the project that we should mention to teachers: https://www.youtube.com/watch?v=t1cTi5T-kxY

{comment end}

{panel="teacher" summary="xxxxxxx"}

M2 - Students should be able to link the theory to the fact that we are dealing with practical problems.

{panel end}

{panel="teacher" summary="xxxxxxx"}

E1 - students should now look beyond just the craypot problem and consider other problems that would be encountered in the real world, and discuss why it is important for companies to be able to solve TSP, i.e., why do we care so much about this problem?

{panel end}

{panel="teacher" summary="xxxxxxx"}

E2 - Students should evaluate the greedy algorithm by showing its best case (i.e. it generates a solution that is optimal, or close to optimal).
Find a craypot layout that will result in the greedy algorithm finding the shortest route. How do you know it is the shortest route? What is a general pattern that seem to work well for this greedy algorithm?

{panel end}

{panel="teacher" summary="xxxxxxx"}

E2 - Students should evaluate the greedy algorithm by showing cases where it isn’t so good (i.e. it generates a solution that is quite long and inefficient). Students do not need to worry about identifying “the very worst case”; a bad case and being able to explain what seems to kill this algorithm is sufficient.

{panel end}

{panel="teacher" summary="xxxxxxx"}

Make sure that students explain the craypot problem and the story, explained how the greedy algorithm works, and have in general provided sufficient background information about the project so that a marker who has not seen this book is able to make sense of it!

{panel end}
