# Software processes

So far in this chapter we've covered different phases of software development: analysis, design and testing.
But how do these phases fit together?
At what time during the project do we do what activity?
That’s the topic of *software processes*.

The obvious answer would be to start with analysis to figure out what we want to build, then design the structure of the software, implement everything and finally test the software.
This is the simplest software process, called the *waterfall process*.

{interactive slug="waterfall-process" type="iframe"}

The waterfall process is borrowed from other kinds of engineering.
If we want to build a bridge, we go through the same phases of analysis, design, implementation and testing:

- Decide what sort of bridge we need (how long should it be? How wide? How much load should it be able to support?).
- Design the bridge.
- Build it.
- And finally test it before we open it to the public.

It’s been done that way for many decades and works very well, for bridges at least.

We call this process the waterfall process because once you "jump" from one phase of the project to the next, you can’t go back up to the previous one.
In reality, a little bit of backtracking is allowed to fix problems from previous project phases but such backtracking is usually the exception.
If during the testing phase of the project you suddenly find a problem with the requirements you certainly can't go back and rewrite the requirements.

{image file-path="img/chapters/waterfall-process-cartoon.png" alt="Waterfall Cartoon"}

An advantage of the waterfall process is that it’s very simple and easy to follow.
At any point in the project, it’s very clear what stage of the project you are at.
This also helps with planning: if you’re in the testing stage you know you’re quite far into the project and should finish soon.
For these reasons, the waterfall process is very popular with managers who like to feel in control of where the project is and where it’s heading.

{panel type="curiosity"}

# Hofstadter’s law

Your manager and customer will probably frequently ask you how much longer the project is going to take and when you will finally have the finished program.
Unfortunately, it’s really difficult to know how much longer a project is going to take.
According to Hofstadter’s law, "it always takes longer than you expect, even when you take into account Hofstadter's Law."
Learning to make good estimates is an important part of software engineering.

{panel end}

Because it’s just so nice and simple, the waterfall process is still in many software engineering textbooks and is widely used in industry.
The only problem with this is that the waterfall process just **does not work** for most software projects.

So why does the waterfall process not work for software when it clearly works very well for other engineering products like bridges (after all, most bridges seem to hold up pretty well...)?
First of all, we need to remember that software is very different from bridges.
It is far more complex.
Understanding the plans for a single bridge and how it works might be possible for one person but the same is not true for software.
We cannot easily look at software as a whole (other than the code) to see its structure.
It is not physical and thus does not follow the laws of physics.
Since software is so different from other engineering products, there the same process won't necessarily work for both.

To understand why the waterfall process doesn’t work, think back to our section about analysis and remember how hard it is to find the right requirements for software.
Even if you manage to communicate with the customers and resolve conflicts between the stakeholders, the requirements could still change while you’re developing the software.
Therefore, it is very unlikely that you will get the complete and correct requirements for the software at the start of your project.

If you make mistakes during the analysis phase, most of them are usually found in the testing stage of the project, particularly when you show the customer your software during acceptance testing.
At this point, the waterfall process doesn’t allow you to go back and fix the problems you find.
Similarly, you can’t change the requirements halfway through the process.
Once the analysis phase of the project is finished, the waterfall process "freezes" the requirements.
In the end of your project, you will end up with software that hopefully fulfills *those* requirements, but it is unlikely that those will be the *correct* requirements.

You end up having to tell the customer that they got what they asked for, not what they needed.
If they've hired you, they'll be annoyed; if it's software that you're selling (such as a smartphone app), people just won't bother buying it.
You can also get things wrong at other points in the project.
For example, you might realise while you’re writing the code that the design you came up with doesn’t really work.
But the waterfall process tells you that you have to stick with it anyway and make it work somehow.

{comment image file-path="img/chapters/software-engineering/se-tree-swing-cartoon.png" alt="Software Design of a Tree-Swing" Design by [Paragon Innovations](http://www.paragoninnovations.com/guide.shtml) and drawn by [Project Cartoon](http://www.projectcartoon.com/about/)}

So if the waterfall process doesn’t work, what can we do instead?
Most modern software development processes are based on the concept of iteration.
We do a bit of analysis, followed by some design, some programming and some testing (we call this one iteration).
This gives us a rather rough prototype of what the system will look like.
We can play around with the prototype, show it to customers and see what works and what doesn’t.
Then, we do the whole thing again.
We refine our requirements and do some more design, programming and testing to make our prototype better (another iteration).
Over time, the prototype grows into the final system, getting closer and closer to what we want.
Methodologies based on this idea are often referred to as *agile* &ndash; they can easily adapt as changes become apparent.

{interactive slug="iterative-software-development" type="iframe"}

The advantage with this approach is that if you make a mistake, you will find it soon (probably when you show the prototype to the customer the next time) and have the opportunity to fix it.
The same is true if requirements change suddenly; you are flexible and can respond to changes quickly.
You also get a lot of feedback from the customers as they slowly figure out what they need.

There are a number of different software processes that use iteration (we call them *iterative processes*); a famous one is the *spiral model*.
Although the details of the different processes vary, they all use the same iteration structure and tend to work very well for software.

Apart from the question of what we do at what point of the project, another interesting question addressed by software processes is how much time we should spend on the different project phases.
You might think that the biggest part of a software project is programming, but in a typical project, programming usually takes up only about 20% of the total time!
40% is spent on analysis and design and another 40% on testing.
This shows that software engineering is so much more than programming.

Once you’ve finished developing your program and given it to the customer, the main part of the software project is over.
Still, it’s important that you don’t just stop working on it.
The next part of the project, which can often go on for years, is called *maintenance*.
During this phase you fix bugs, provide customer support and maybe add new features that customers need.

{panel type="curiosity"}

# Brooks' law

Imagine that your project is running late and your customer is getting impatient.
Your first instinct might be to ask some of your friends if they can help out so that you have more people working on the project.
Brooks’ law, however, suggests that that is exactly the wrong thing to do!

{glossary-link term="brooks-law" reference-text="software engineering"}Brooks’ law{glossary-link end} states that "adding manpower to a late software project makes it later." This might seem counterintuitive at first because you would assume that more people would get more work done.
However, the overhead of getting new people started on the project (getting them to understand what you are trying to build, your design, the existing code, and so on) and of managing and coordinating the larger development team actually makes things slower rather than faster in the short term.

{panel end}

{panel type="project"}

# Fun with the Waterfall and Agile processes

The waterfall process is simple and commonly used but doesn’t really work in practice.
In this activity, you’ll get to see why.
First, you will create a design which you then pass on to another group.
They have to implement your design exactly and are not allowed to make any changes, even if it doesn’t work!

You need a deck of cards and at least 6 people.
Start by dividing up into groups of about 3-4 people.
You need to have at least 2 groups.
Each group should grab two chairs and put them about 30cm apart.
The challenge is to build a bridge between the two chairs using only the deck of cards!

Before you get to build an actual bridge, you need to think about how you are going to make a bridge out of cards.
Discuss with your team members how you think this could work and write up a short description of your idea.
Include a diagram to make your description understandable for others.

Now exchange your design with another group.
Use the deck of cards to try to build your bridge to the exact specification of the other group.
You may not alter their design in any way (you are following the waterfall process here!).
As frustrating as this can be (especially if you know how to fix the design), if it doesn’t work, it doesn’t work!

If you managed to build the bridge, congratulations to you and the group that managed to write up such a good specification!
If you didn’t, you now have a chance to talk to the other group and give them feedback about the design.
Tell them about what problems you had and what worked or didn’t work.
The other group will tell you about the problems they had with your design!

Now, take your design back and improve it, using what you just learnt about building bridges out of cards and what the other group told you.
You can experiment with cards as you go, and keep changing the design as you learn about what works and what doesn't (this is an agile approach, which we are going to be looking at further shortly).
Keep iterating (developing ideas) until you get something that works.

Which of these two approaches worked best &ndash; designing everything first, or doing it in the agile way?

{panel end}

{panel type="teacher-note"}

# Solution

Here is an example solution students might come up with after a few revisions:

{image file-path="img/chapters/card-bridge-solution.jpg" alt="Image of a potential solution to the card bridge"}

{panel end}

{panel type="teacher-note"}

# Further advice on the above project

Usually the point about agile design comes across very strongly; it's rare for a designed bridge to work, but it can usually be done with the iterative agile approach.
Students might point out that they aren't experts with cards, but a software engineer should be an expert with software.
However, the real issue is that the software engineer probably isn't an expert at the kind of system they're implementing, since the system probably hasn't been built before.

Another option is to get students to build card houses (the main point is that the students should be working in a domain they're not familiar with; if they've built card bridges before then the activity won't work!) A card house might be easier for younger students; the bridge is quite a challenge!
You could challenge students to design and build a tower as high as possible out of cards.
Alternatively, you could use Lego but cards are definitely more challenging and harder to design with.

{panel end}

{panel type="project"}

# A navigation language

In this activity, you will develop a formal language for navigating around your school.
Imagine that you need to describe to your friend how to get to a particular classroom.
This language will help you give a precise description that your friend can easily follow.

First, figure out what your language has to do (i.e. find the *requirements*).
Will your language be for the entire school or only a small part?
How exact will the descriptions be?
How long will the descriptions be?
How easy will they be to follow for someone who does / doesn’t know your language?
How easy will it be to learn?
Etc.

Now, go ahead and *design* the language.
Come up with different commands (e.g. turn left, go forward 10, …).
Make sure you have all the commands you need to describe how to get from one place in your school to any other!

Finally, *test* the language using another student.
Don’t tell them where they’re going, just give them instructions and see if they follow them correctly.
Try out different cases until you are sure that your language works and that you have all the commands that you need.
If you find any problems, go back and fix them and try again!

Note down how much time each of the different phases of the project take you.
When you have finished, discuss how much time you spent on each phase and compare with other students.
Which phase was the hardest?
Which took the longest?
Do you think you had more time for some of the phases?
What problems did you encounter?
What would you do differently next time around?

{panel end}

{panel type="project"}

# Block building (precise communication)

Communicating clearly with other software engineers and customers is essential for software engineers.
In this activity, you get to practice communicating as precisely as possible!

Divide up into pairs, with one *creator* and one *builder* in each pair.
Each person needs a set of at least 10 coloured building blocks (e.g. Lego blocks).
Make sure that each pair has a matching set of blocks or this activity won’t work!

The two people in each pair should not be able to see each other but need to be able to hear each other to communicate.
Put up a screen between the people in each pair or make them face in opposite directions.
Now, the creator builds something with their blocks.
The more creative you are the more interesting this activity will be!

When the creator has finished building, it’s the builder's turn.
His or her aim is to build an exact replica of the creator's structure (but obviously without knowing what it looks like).
The creator should describe exactly what they need to do with the blocks.
For example, the creator could say "Put the small red block on the big blue block" or "Stand two long blue blocks up vertically with a one block spacing between them, and then balance a red block on top of them".
But the creator should not describe the building as a whole (i.e. don't say "make a doorframe.").

When the builder thinks they are done, compare what you built!
How precise was your communication?
Which parts were difficult to describe for the creator / unclear for the builder?
Switch roles so that you get to experience both sides!

{panel end}
