# Testing: Did we build the right thing and does it work?

{comment some apps for testing to go below}

We’ve decided what our software should do (analysis) and designed its internal structure (design), and the system has been programmed according to the design.
Now, of course, we have to test it to make sure it works correctly.

Testing is an incredibly important part of developing software.
We cannot really release software that still has lots of bugs to our customers (well, we could but our customers wouldn’t be very happy about it).
Remember that software bugs can have both very small and very large consequences.
On the less serious end of the scale, they might make a program difficult to use or crash your computer.
On the other hand, they can cost millions of dollars and even endanger human life.
More testing might have prevented the Ariane 5 failure or might have discovered the Therac bug that ended up killing three patients.

Unfortunately, testing is again really difficult because of the size and complexity of software.
If a piece of software would take years to read and understand, imagine how long it would take to fully test it!

When we test software, we try lots of different inputs and see what outputs or behaviour the software produces.
If the output is incorrect, we have found a bug.

{panel type="curiosity"}

# Bugs and moths

{image file-path="img/chapters/harvard-mark-ii.jpg" alt="The Mark II at Harvard" caption="true"}

The Mark II at Harvard

{image end}

In 1947, engineers working on a computer called the *Mark II* were investigating a computer error and found that it was caused by a moth which had become trapped inside the computer!
This incident is an early example of using the word *bug* to refer to computer errors.
Of course, today we use the word to refer to errors in programs, rather than actual insects trapped in the computer.

{panel end}

The problem with testing is that it can only show the presence of errors, not their absence!
If you get an incorrect output from the program, you know that you have found a bug.
But if you get a correct output, can you really conclude that the program is correct?
Not really.
The software might work in this particular case but you cannot assume that it will work in other cases.
No matter how thoroughly you test a program, you can never really be 100% sure that it’s correct.
In theory, you would have to test every possible input to your system, but that’s not usually possible.
Imagine testing Google for everything that people could search for!
But even if we can’t test everything, we can design tests to cover as much as possible and hopefully at least decrease the probability of bugs.

As with design, we can’t possibly deal with the entire software at once, so we again just look at smaller pieces, testing one of them at a time.
We call this approach *unit testing*.
A unit test is usually done by a separate program which runs the tests on the program that you're writing.
That way you can run the tests as often as you like — perhaps once a day, or even every time there is a change to the program.

It's not unusual to write a unit test program before you write the actual program.
It might seem like wasted work to have to write two programs instead of one, but being able to have your system tested carefully any time you make a change greatly improves the reliability of your final product, and can save a lot of time trying to find bugs in the overall system, since you have some assurance that each unit is working correctly.

Once all the separate pieces have been tested thoroughly, we can test the whole system to check if all the different parts work together correctly.
This is called *integration testing*.
Some testing can be automated while other testing needs to be done manually by the software engineer.

If I give you a part of the software to test, how would you start?
Which test inputs would you use?
How many different test cases would you need?
When would you feel reasonably sure that it all works correctly?

There are two basic approaches you can take, which we call *black-box testing* and *white-box testing*.
With black-box testing, you simply treat the program as a black box and pretend you don’t know how it’s structured and how it works internally.
You give it test inputs, get outputs and see if the program acts as you expected.

But how do you select useful test inputs?
There are usually so many different ones to choose from.
For example, imagine you are asked to test a program that takes a whole number and outputs its successor, the next larger number (e.g. give it 3 and you get 4, give it -10 and you get -9, etc).
You can’t try the program for *all* numbers so which ones do you try?

You observe that many numbers are similar and if the program works for one of them it’s probably safe to assume it works for other similar numbers.
For example, if the program works as you expect when you give it the number 3, it’s probably a waste of time to also try 4, 5, 6 and so on; they are just so similar to 3.

This is the concept of *equivalence classes*.
Some inputs are so similar, you should only pick one or two and if the software works correctly for them you assume that it works for all other similar inputs.
In the case of our successor program above, there are two big equivalence classes, positive numbers and negative numbers.
You might also argue that zero is its own equivalence class, since it is neither positive nor negative.

For testing, we pick a couple of inputs from each equivalence class.
The inputs at the boundary of equivalence classes are usually particularly interesting.
Here, we should definitely test -1 (this should output 0), 0 (this should output 1) and 1 (this should output 2).
We should also try another negative and positive number not from the boundary, such as -48 and 57.
Finally, it can be interesting to try some very large numbers, so maybe we’ll take -2,338,678 and 10,462,873.
We have only tested 7 different inputs, but these inputs will probably cover almost all of the interesting behaviour of our software and should reveal most bugs.

Of course, you might also want to try some invalid inputs, for example "hello" (a word) or "1,234" (a number with a comma in it) or "1.234" (a number with a decimal point).
Often, test cases like these can get programs to behave in a very strange way or maybe even crash because the programmer hasn’t considered that the program might be given invalid inputs.
Remember that human users in particular can give you all sorts of weird inputs, for example if they misunderstand how the program should be used.
In case of an invalid input, you probably want the program to tell the user that the input is invalid; you definitely don’t want it to crash!

Black-box testing is easy to do but not always enough because sometimes finding the different equivalence classes can be difficult if you don’t know the internal structure of the program.
When we do white-box testing, we look at the code we are testing and come up with test cases that will execute as many different lines of code as possible.
If we execute each line at least once, we should be able to discover a lot of bugs.
We call this approach *code coverage* and aim for 100% coverage, so that each line of code is run at least once.
In reality, even 100% code coverage won’t necessarily find all bugs though, because one line of code might work differently depending on inputs and values of variables in a program.
Still, it’s a pretty good start.

{comment App for code coverage: Maybe take the app for blackbox testing as a starting point. For each of the examples, allow students to "step into the code", a simple flow chart of the method. Then they can see their inputs "flowing" through the program, highlighting the tested paths as they go. In the end, this will show if they managed to test every path through the program and give a code coverage figure (e.g. 80%).}

Unit testing is very useful for finding bugs.
It helps us find out if the program works as *we* intended.
Another important question during testing is if the software does what the *stakeholder* wanted (did we build the right thing?).
*Acceptance testing* means showing your program to your stakeholders and getting feedback about what they like or don’t like.
Any mistakes that we made in the analysis stage of the project will probably show up during acceptance testing.
If we misunderstood the customer during the interview, our *unit tests* might pass (i.e. the software does what we thought it should) but we may still have an unhappy customer.

Different stakeholders can be very different in terms of technical skills, or even could have given us conflicting requirements for the software.
It’s therefore possible to get positive feedback from one stakeholder and negative feedback from another.

{panel type="project"}

# Acceptance testing

For this project, choose a small program such as a Windows desktop app or an Apple dashboard widget.
Pick something that you find particularly interesting or useful (such as a timer, dictionary or calculator).
Start by reading the description of the program to find out what it does *before* you try it out.

Next, think about a stakeholder for this software.
Who would use it and why?
Briefly write down some background information about the stakeholder (as in the analysis project) and their main requirements.
Note which requirements would be most important to them and why.

Now, you can go ahead and install the program and play around with it.
Try to imagine that you are the stakeholder that you described above.
Put yourself in this person’s shoes.
How would they feel about this program?
Does it meet your requirements?
What important features are missing?
Try to see if you can find any particular problems or bugs in the program.

Tip: sometimes giving programs unexpected input, for example a word when they were expecting a number, can cause some interesting behaviour.

Write up a brief acceptance test report about what you found.
Try to link back to the requirements that you wrote down earlier, noting which have been met (or maybe partially met) and which haven’t.
Do you think that overall the stakeholder would be happy with the software?
Do you think that they would be likely to use it?
Which features would you tell the software developers to implement next?

{panel end}

{panel type="teacher-note"}

# Reading the description

It’s important for this project that students read the description of the program and think about a stakeholder and requirements before actually trying out the software, otherwise their thinking about the stakeholder and requirements may be influenced by what they already know about the software.

{panel end}
