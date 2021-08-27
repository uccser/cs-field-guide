# Finite state automata

{panel type="teacher-note"}

# Treasure hunt (alternative introduction)

There's a fun variant of the challenge at the start of this section that involves running around the playground.
It's described as the [Treasure Hunt](https://classic.csunplugged.org/wp-content/uploads/2014/12/unplugged-11-finite_state_automata.pdf) activity on the CS Unplugged site.
It may be a bit young for some students, but if you can sell it to them, it's a great way to get some physical exercise away from the computers and to see most of the concepts in this section in a kinesthetic activity.
Many variants are possible; for example, it can be run as a card game where the A/B card for each station is turned over on request.
See the Unplugged site for other ideas.

{panel end}

{panel type="video"}

# Introductory videos on finite state automata

We have a [short video series on finite state automata available here](https://www.youtube.com/playlist?list=PL6A42PgbxHNQA4p1SdZYv2a9ByWIBB2KJ).

{panel end}

Here's a map of a commuter train system for the town of Trainsylvania.
The trouble is, it doesn't show where the trains go &ndash; all you know is that there are two trains from each station, the A-train and the B-train.
The inhabitants of Trainsylvania don't seem to mind this &ndash; it's quite fun choosing trains at each station, and after a while you usually find yourself arriving where you intended.

{interactive slug="trainsylvania-blank" type="in-page"}

You can travel around Trainsylvania yourself using the following interactive.
You're starting at the City Mall station, and you need to find your way to Suburbopolis.
At each station you can choose either the A-train or the B-train &ndash; press the button to find out where it will take you.
But, like the residents of Trainsylvania, you'll probably want to start drawing a map of the railway, because later you might be asked to find your way somewhere else.
If you want a template to draw on, you can print one using the button below.

{button-link link="files/trainsylvania-blank.pdf" file="yes" text="Trainsylvania template"}

{interactive slug="trainsylvania" type="in-page"}

{panel type="teacher-note"}

# Using the interactive and solution

You should let students devise their own notation for this.
They will soon learn (possibly the hard way) that they should record all routes with an arrow (since trains don't necessarily return by the same route), and label their arrows with A or B.
The full map for the activity is here, but don't spoil the students' fun by providing it &ndash; at least, not yet.

{interactive slug="trainsylvania-complete" type="in-page"}

{panel end}

Did you find a sequence of trains to get from City Mall to Suburbopolis? You can test it by typing the sequence of trains in the following interactive.
For example, if you took the A-train, then the B-train, then the A-train, type in ABA.

{interactive slug="trainsylvania-planner" type="in-page"}

Can you find a sequence that takes you from City Mall to Suburbopolis?
Can you find another sequence, perhaps a longer one?
Suppose you wanted to take a really long route... can you find a sequence of 12 hops that would get you there?
20 hops?

Here's another map.
It's for a different city, and the stations only have numbers, not names (but you can name them if you want).

{image file-path="img/chapters/finite-state-automata-train-example.png" alt="A simpler train map"}

Suppose you're starting at station 1, and need to get to station 3 (it has a double circle to show that's where you're headed).

- What's the shortest way to get from station 1 to station 3?
- Where do you end up if you start at station 1 and take the trains ABAA?
- Where do you end up if your start at station 1 and take 20 train hops, always alternating A, B, A, B, A, B?
- Can you give an easy-to-describe sequence of 100 or more hops that will get you to station 3?

{panel type="teacher-note"}

# Solutions

Solutions:

- AA
- station 3
- station 4 (each AB just goes back and forward between 2 and 4)
- there are many solutions, but based on the previous question, AB repeated 49 times will get to station 4 (that's 98 hops), then AA gets to station 3.
  Many other solutions are possible, based on going around in circles many times, for example, repeating A 101 times will end up at station 3, because any multiple of 3 "A"s in the middle makes no difference.

{panel end}

The map that we use here, with circles and arrows, is actually a powerful idea from computer science called a finite state automaton, or {glossary-link term="finite-state-automaton" reference-text="FSA abbreviation"}FSA{glossary-link end} for short.
Being comfortable with such structures is a useful skill for computer scientists.

{panel type="jargon-buster"}

# Finite state automaton

The name {glossary-link term="finite-state-automaton" reference-text="Formal languages"}finite state automaton{glossary-link end} (FSA) might seem strange, but each word is quite simple.
"Finite" just means that there is a limited number of states (such as train stations) in the map.
The "state" is just as another name for the train stations we were using.
"Automaton" is an old word meaning a machine that acts on its own, following simple rules (such as the cuckoo in a cuckoo clock).

Sometimes an FSA is called a {glossary-link term="finite-state-machine" reference-text="Formal languages"}finite state machine{glossary-link end} (FSM), or even just a "state machine".
By the way, the plural of "automaton" can be either "automata" or "automatons".
People working with formal languages usually use finite state *automata*, but "FSAs" for short.

{panel end}

An FSA isn't all that useful for train maps, but the notation is used for many other purposes, from checking input to computer programs to controlling the behaviour of an interface.
You may have come across it when you dial a telephone number and get a message saying "Press 1 for this … Press 2 for that … Press 3 to talk to a human operator."
Your key presses are inputs to a finite state automaton at the other end of the phone line.
The dialogue can be quite simple, or very complex.
Sometimes you are taken round in circles because there is a peculiar loop in the finite state automaton.
If this occurs, it is an error in the design of the system &ndash; and it can be extremely frustrating for the caller!

Another example is the remote control for an air conditioning unit.
It might have half a dozen main buttons, and pressing them changes the mode of operation (e.g. heating, cooling, automatic).
To get to the mode you want you have to press just the right sequence, and if you press one too many buttons, it's like getting to the train station you wanted but accidentally hopping on one more train.
It might be a long journey back, and you may end up exploring all sorts of modes to get there!
If there's a manual for the controller, it may well contain a diagram that looks like a finite state automaton.
If there isn't a manual, you may find yourself wanting to draw a map, just as for the trains above, so that you can understand it better.

The map that we used above uses a standard notation.
Here's a smaller one:

{image file-path="img/chapters/finite-state-automata-simple-1.png" alt="A simple finite state automation"}

Notice that this map has routes that go straight back to where they started!
For example, if you start at 1 and take route "b", you immediately end up back at 1.
This might seem pointless, but it can be quite useful.
Each of the "train stations" is called a state, which is a general term that just represents where you are after some sequence of inputs or decisions.
What it actually means depends on what the FSA is being used for.
States could represent a mode of operation (like fast, medium, or slow when selecting a washing machine spin cycle), or the state of a lock or alarm (on, off, exit mode), or many other things.
We’ll see more examples soon.

One of the states has a double circle.
By convention, this marks a "final" or "accepting" state, and if we end up there we've achieved some goal.
There's also a "start" state &ndash; that's the one with an arrow coming from nowhere.
Usually the idea is to find a sequence of inputs that gets you from the start state to a final state.
In the example above, the shortest input to get to state 2 is "a", but you can also get there with "aa", or "aba", or "baaaaa".
People say that these inputs are "accepted" because they get you from the start state to the final state &ndash; it doesn’t have to be the shortest route.

What state would you end up in if the input was the letter "a" repeated 100 times?

Of course, not all inputs get you to state 2.
For example, "aab" or even just "b" aren't accepted by this simple system.
Can you characterise which inputs are accepted?

{panel type="teacher-note"}

# Solution for FSA

The FSA above accepts any string of inputs that end with an "a", so the interactive below behaves pretty trivially: press "a" for it to be accepted, and "b" for not accepted.
It happens to behave like a two-button power switch, with an on and off button.
Although these kind of FSAs seem very trivial, it's important for students to become confident with them.
Some of the FSAs used in practice have just a few states like these, but even small systems can perform quite complex tasks.

{panel end}

Here's an interactive that follows the rules of the FSA above.
You can use it to test different inputs.

{interactive slug="fsa-box" type="iframe" parameters="config=example-1"}

Here's another FSA, which looks similar to the last one but behaves quite differently.
You can test it in the interactive below.

{image file-path="img/chapters/finite-state-automata-simple-2.png" alt="A simple finite state automaton"}

Work out which of the following inputs it accepts.
Remember to start in state 1 each time!

- "aaa"
- "abb"
- "aaaa"
- "bababab"
- "babababa"
- the letter "a" repeated 100 times
- the letter "a" repeated 1001 times
- the letter "b" a million times, then an "a", then another million of the letter "b"

Can you state a general rule for the input to be accepted?

{panel type="teacher-note"}

# Solutions

The general rule is that the input must have an odd number of "a"s in it; the number of "b"s is irrelevant.
So in the above examples, the accepted strings are "aaa", "abb", "bababab", the letter "a" repeated 1001 times, and the last one (the letter "b" a million times, then an "a", then another million of the letter "b").

{panel end}

{interactive slug="fsa-box" type="iframe" parameters="config=example-2"}

To keep things precise, we'll define four further technical terms.
One is the
{glossary-link term="alphabet" reference-text="Formal languages"}alphabet{glossary-link end},
which is just a list of all possible inputs that might happen.
In the last couple of examples the alphabet has consisted of the two letters "a" and "b",
but for an FSA that is processing text typed into a computer, the alphabet will have to include every symbol on the keyboard.

The connections between states are called {glossary-link term="transition" reference-text="Formal languages"}transitions{glossary-link end}, since they are about changing state.
The sequence of characters that we input into the FSA is often called a
{glossary-link term="string" reference-text="Formal languages"}string{glossary-link end}
(it's just a string of letters), and the set of all strings that can be accepted by a particular FSA is called its {glossary-link term="language" reference-text="Formal languages"}language{glossary-link end}.
For the FSA in the last example, its *language* includes the *strings* "a", "aaa", "bab", "ababab", and lots more, because these are accepted by it.
However, it does not include the strings "bb" or "aa".

The language of many FSAs is big.
In fact, the ones we've just looked at are infinite.
You could go on all day listing patterns that they accept.
There's no limit to the length of the strings they can accept.

That's good, because many real-life FSA's have to deal with "infinite" input.
For example, the diagram below shows the FSA for the spin speed on a washing machine, where each press of the spin button changes the setting.

{image file-path="img/chapters/finite-state-automata-spin-speeds.png" alt="FSA for spin setting on a washing machine"}

It would be frustrating if you could only change the spin setting 50 times, and then it stopped accepting input ever again.
If you want, you could switch from fast to slow spin by pressing the spin button 3002 times.
Or 2 times would do.
Or 2 million times (try it if you're not convinced).

{interactive slug="fsa-washing-machine" type="in-page"}

The following diagram summarizes the terminology we have introduced.
Notice that this FSA has two accepting states.
You can have as many as you want, but only one start state.

{interactive slug="fsa-terminology" type="in-page"}

For this FSA, the strings "aa" and "aabba" would be accepted, but "aaa" and "ar" wouldn't.
By the way, notice that we often put inverted commas around strings to make it clear where they start and stop.
Of course, the inverted commas aren't part of the strings.
Notice that "r" always goes back to state 1 &ndash; if it ever occurs in the input then it's like a reset.

Sometimes you'll see an FSA referred to as a finite state machine, or FSM, and there are other closely related systems with similar names.
We'll mention some later in the chapter.

{panel type="teacher-note"}

# Terminology for formal languages

The following website contains a comprehensive list of terminology relating to formal languages, although it goes a lot deeper and more formal than we're going to here: [http://www.csee.umbc.edu/portal/help/theory/lang_def.shtml](http://www.csee.umbc.edu/portal/help/theory/lang_def.shtml)

{panel end}

Now there's something we have to get out of the way before going further.
If we're talking about which strings of inputs will get you into a particular state, and the system starts in that state, then the *empty string* &ndash; that is, a string without any letters at all &ndash; is one of the solutions!
For example, here's a simple finite state automaton with just one input (button a) that represents a strange kind of light switch.
The reset button isn't part of the FSA; it’s just a way of letting you return to the starting state.
See if you can figure out which patterns of input will turn the light on:

{interactive slug="fsa-light" type="iframe" parameters="config=example-1"}

{panel type="teacher-note"}

# Solution

The light comes on with every third button press (which is intentionally confusing &ndash; students will probably expect every second press to work, but this is to get them thinking about what is happening here!).
The sequences that will turn on the light are therefore "aaa", "aaaaaa" and so on &ndash; any number of presses that's a multiple of three.
And, of course, zero presses.

{panel end}

Have you worked out which sequences of button presses turn on the light?
Now think about the *shortest* sequence from a reset that can turn it on.

Since it's already on when it has been reset, the shortest sequence is *zero* button presses.
It's hard to write that down (although you could use ""), so we have a symbol especially for it, which is the Greek letter epsilon: \( \epsilon \).
You'll come across \( \epsilon \) quite often with formal languages.

It can be a bit confusing.
For example, the language (that is, the list of all accepted inputs) of the FSA above includes "aaa", "aaaaaa", and \( \epsilon \).
If you try telling someone that "nothing" will make the light come on that could be confusing &ndash; it might mean that you could never turn the light on &ndash; so it's handy being able to say that the *empty string* (or \( \epsilon \)) will turn the light on.
There are different kinds of "nothing", and we need to be precise about which one we mean!

Here’s the FSA for the strange light switch.
You can tell that \( \epsilon \) is part of the language because the start state is also a final state (in fact, it's the only final state).
Actually, the switch isn't all that strange &ndash; data projectors often require two presses of the power button, to avoid accidentally turning them off.

{image file-path="img/chapters/finite-state-automata-light-switch-example.png" alt="The finite state machine for a strange light switch"}

An important part of the culture of computer science is always to consider extreme cases.
One kind of extreme case is where there is no input at all: what if a program is given an empty file, or your database has zero entries in it?
It's always important to make sure that these situations have been thought through.
So it's not surprising that we have a symbol for the empty string.
Just for variety, you'll occasionally find some people using the Greek letter lambda (\( \lambda \)) instead of \( \epsilon \) to represent the empty string.

{panel type="teacher-note"}

# Epsilon or lambda?

The two main pieces of recommended software in this chapter (Exorciser and JFLAP) use the two notations.
JFLAP can be changed to use epsilon (\( \epsilon \)) from its Preferences menu, so we will use epsilon throughout the chapter.
You may wish to change the preference for JFLAP early on, or else just point out to students that epsilon and lambda (\( \lambda \)) can be used interchangeably.

{panel end}

And by the way, the language of the three-state FSA above is infinitely large because it is the set of all strings that contain the letter "a" in multiples of 3, which is {\( \epsilon \), aaa, aaaaaa, aaaaaaaaa, ...}.
That's pretty impressive for such a small machine.

While we're looking at extremes, here's another FSA to consider.
It uses "a" and "b" as its alphabet.

{image file-path="img/chapters/finite-state-automata-two-or-less-letters.png" alt="FSA for short strings"}

Will it accept the string "aaa"?
Or "aba"?
Or anything of 3 characters or more?

As soon as you get the third character you end up in state 4, which is called a *trap state* because you can't get out.
If this was the map for the commuter train system we had at the start of this section it would cause problems, because eventually everyone would end up in the trap state, and you'd have serious overcrowding.
But it can be useful in other situations &ndash; especially if there's an error in the input, so no matter what else comes up, you don't want to go ahead.

For the example above, the language of the FSA is any mixture of "a"s and "b"s, but only two characters at most.
Don't forget that the empty string is also accepted.
It's a very small language; the only strings in it are:
{\( \epsilon \), a, b, aa, ab, ba, bb}.

Here's another FSA to consider:

{image file-path="img/chapters/finite-state-automata-no-trap-example.png" alt="FSA with missing transitions"}

It's fairly clear what it will accept: strings like "ab", "abab", "abababababab", and, of course \( \epsilon \).
But there are some missing transitions: if you are in state 1 and get a "b" there's nowhere to go.
If an input cannot be accepted, it will be rejected, as in this case.
We could have put in a trap state to make this clear:

{image file-path="img/chapters/finite-state-automata-trap-added-example.png" alt="FSA with missing transitions"}

But things can get out of hand.
What if there are more letters in the alphabet?
We'd need something like this:

{image file-path="img/chapters/finite-state-automata-trap-added-extreme-example.png" alt="FSA with missing transitions"}

So, instead, we just say that any unspecified transition causes the input to be rejected (that is, it behaves as though it goes into a trap state).
In other words, it's fine to use the simple version above, with just two transitions.

Now that we've got the terminology sorted out, let’s explore some applications of this simple but powerful "machine" called the finite state automaton.

## Who uses finite state automata?

Finite state automata are used a lot in the design of digital circuits (like the electronics in a hard drive) and embedded systems (such as burglar alarms or microwave ovens).
Anything that has a few buttons on it and gets into different states when you press those buttons (such as alarm on/off, high/med/low power) is effectively a kind of FSA.

With such gadgets, FSAs can be used by designers to plan what will happen for every input in every situation, but they can also be used to analyse the interface of a device.
If the FSA that describes a device is really complicated, it's a warning that the interface is likely to be hard to understand.
For example, here's an FSA for a microwave oven, though a lot of details have been omitted for clarity.
It reveals that, for example, you can't get from Low Power to High Power without going through the Timer.
Restrictions like this will be very frustrating for a user.
The user has to set a timer for Low Power, then set it to High Power and set another timer for that.
Once you know this sequence it's easy, but the designer should think about whether it's necessary to force the user into that sort of sequence.
These sorts of issues become clear when you look at the FSA.
But we're straying into the area of [Human Computer Interaction]('chapters:chapter' 'human-computer-interaction')!
This isn't surprising because most areas of computer science end up relating to each other.

{image file-path="img/chapters/finite-state-automata-microwave-example.png" alt="FSA for a microwave oven"}

As we shall see in the next section, one of the most valuable uses of the FSA in computer science is for checking input to computers, whether it's a value typed into a dialogue box, a program given to a compiler, or some search text to be found in a large document.
There are also data compression methods that use FSAs to capture patterns in the data being compressed, and variants of FSA are used to simulate large computer systems to see how best to configure it before spending money on actually building it.

{panel type="curiosity"}

# The largest FSA in the world

What's the biggest FSA in the world, one that lots of people use every day?
It's the World-Wide Web.
Each web page is like a state, and the links on that page are the transitions between them.
Back in the year 2000 the web had a billion pages.
In 2008 Google Inc. declared they had found a trillion different web page addresses.
That’s a lot.
A book with a billion pages would be 50 km thick.
With a trillion pages, its thickness would exceed the circumference of the earth.

But the web is just a finite state automaton.
And in order to produce an index for you to use, search engine companies like Google have to examine all the pages to see what words they contain.
They explore the web by following all the links, just as you did in the train travelling exercise.
Only, because it's called the "web," exploring is called "crawling" &ndash; like spiders do.

{panel end}

## Activity: practice creating FSAs

{panel type="teacher-note"}

# Choosing between Exorciser and JFLAP

This section introduces free teaching software that makes it easy for students to create and experiment with FSAs.
This software will also be useful for the next section on regular expressions, so it’s worth becoming familiar with.
You can choose between using "Exorciser" or "JFLAP" (see later).
The Exorciser system from [SwissEduc](http://www.swisseduc.ch/compscience/) is cleaner and simpler, but JFLAP includes some features that are useful for the sections on regular expressions and grammars.
(The Exorciser material on grammars is too advanced, and its features with regular expressions are a little more tedious to use for our purposes).
Both of the systems have extensive features that aren't relevant to this chapter, so students will need to ignore much of what they see!

We recommend starting students with Exorciser, if students want to do some more advanced work then they could get familiar with JFLAP.

One quick tip: to avoid confusion, in Exorciser deselect the option of having an empty-string transition by right-clicking in the background, choosing "A = {a,b}", and unchecking \( \epsilon \).
Students can add other characters to the alphabet from this menu, although just "a" and "b" are enough to experiment with for a start.

{panel end}

This activity involves constructing and testing your own FSA, using free software that you can download yourself.
Before doing that, we'll look at some general ways to create an FSA from a description.
If you want to try out the examples here on a live FSA, read the next two sections about using Exorciser and JFLAP respectively, which allow you to enter FSAs and test them.

A good starting point is to think of the shortest string that is needed for a particular description.
For example, suppose you need an FSA that accepts all strings that contain an even number of the letter "b".
The shortest such string is \( \epsilon \), which means that the starting state must also be a final state, so you can start by drawing this:

{image file-path="img/chapters/finite-state-automata-create-example-1.png" alt="creating an FSA"}

If instead you had to design an FSA where the shortest accepted string is "aba", you would need a sequence of 4 states like this:

{image file-path="img/chapters/finite-state-automata-create-example-2.png" alt="creating an FSA"}

Then you need to think what happens next.
For example, if we are accepting strings with an even number of "b"s, a single "b" would have to take you from the start state to a non-accepting state:

{image file-path="img/chapters/finite-state-automata-create-example-3.png" alt="creating an FSA"}

But another "b" would make an even number, so that's acceptable.
And for any more input the result would be the same even if all the text to that point hadn't happened, so you can return to the start state:

{image file-path="img/chapters/finite-state-automata-create-example-4.png" alt="creating an FSA"}

Usually you can find a "meaning" for a state.
In this example, being in state 1 means that so far you've seen an even number of "b"s, and state 2 means that the number so far has been odd.

Now we need to think about missing transitions from each state.
So far there's nothing for an "a" out of state 1.
Thinking about state 1, an "a" doesn't affect the number of "b"s seen, and so we should remain in state 1:

{image file-path="img/chapters/finite-state-automata-create-example-5.png" alt="creating an FSA"}

The same applies to state 2:

{image file-path="img/chapters/finite-state-automata-create-example-6.png" alt="creating an FSA"}

Now every state has a transition for every input symbol, so the FSA is finished.
You should now try some examples to check that an even number of "b"s always brings it to state 1.

Get some practice doing this yourself! If you prefer, here are instructions for two different programs that allow you to enter and test FSAs.

{panel type="project"}

# Exorciser

This panel shows how to use some educational software called "Exorciser" (The next panel introduces an alternative called JFLAP which is a bit harder to use).
Exorciser has facilities for doing advanced exercises in formal languages; but here we'll use just the simplest ones.

Exorciser can be downloaded [here](http://www.swisseduc.ch/compscience/exorciser/index.html).

When you run it, select "Constructing Finite Automata" (the first menu item); click the "Beginners" link when you want a new exercise.
The challenge in each FSA exercise is the part after the | in the braces (i.e. curly brackets).
For example, in the diagram below you are being asked to draw an FSA that accepts an input string w if "w has length at least 3".
You should draw and test your answer, although initially you may find it helpful to just click on "Solve exercise" to get a solution, and then follow strings around the solution to see how it works.
That’s what we did to make the diagram below.

{image file-path="img/chapters/finite-state-automata-exorciser-screenshot.png" alt="The exorciser software from SwissEduc"}

To draw an FSA in the Exorciser system, right-click anywhere on the empty space and you'll get a menu of options for adding and deleting states, choosing the alphabet, and so on.
To make a transition, drag from the outside circle of one state to another (or out and back to the state for a loop).
You can right-click on states and transitions to change them.
The notation "a|b" means that a transition will be taken on "a" or "b" (it's equivalent to two parallel transitions).

If your FSA doesn't solve their challenge, you'll get a hint in the form of a string that your FSA deals with incorrectly, so you can gradually fix it until it works.
If you're stuck, click "Solve exercise".
You can also track input as you type it: right-click to choose that option.
See the [SwissEduc website](http://www.swisseduc.ch/compscience/) for more instructions.

{image file-path="img/chapters/finite-state-automata-exorciser-error-screenshot.png" alt="The exorciser software from SwissEduc"}

The section after next gives some examples to try.
If you're doing this for a report, keep copies of the automata and tests that you do.
Right-click on the image for a "Save As" option, or else take screenshots of the images.

{panel end}

{panel type="teacher-note"}

# JFLAP

A program called JFLAP is an alternative to Exorciser for students to design and test their own FSA.
It can be downloaded for free, and is widely used for teaching formal languages.
It’s a powerful piece of software that can be used for most of the concepts in this chapter, which makes it worth learning how to use it.
Unfortunately JFLAP has many more features than we need in this chapter, and some teachers have found it difficult to use in a high-school classroom setting,
so we recommend using Exorciser if it's available.
If you use JFLAP we recommend that you become familiar with it first so that you can guide students through it: the interface has many distracting features and can be a little quirky, and fiddling around without taking time to learn how to use it will be a frustrating experience.
Fortunately there's a good tutorial about using JFLAP [here](http://www.jflap.org/tutorial/), and some material from Duke University about FSAs based around JFLAP [here](http://www.cs.duke.edu/csed/pltl/exercises/lessons/29/finiteautomata.zip) (ZIP file).

{panel end}

{panel type="project"}

# JFLAP

Another widely used system for experimenting with FSAs is a program called JFLAP (download it [here](http://jflap.org)).
You can use it as an alternative for Exorciser if necesary.
You'll need to follow instructions carefully as it has many more features than you'll need, and it can be hard to get back to where you started.

Here's how to build an FSA using JFLAP.
As an example, we'll use the following FSA:

{image file-path="img/chapters/jflap-create-state.png" alt="Building an FSA &ndash; example"}

{comment put some screen shots and ideally a video here to show how to use JFLAP.}

To build this, run JFLAP and:

- click on the "Finite Automaton" button in the control panel.
- In the Editor window, click on the picture of a state (with a little q in it), and then click in the window to create states.
- To move the states around, click on the arrow tool in the toolbar (leftmost icon).
  It doesn't matter where the states are, but you want them to be easy to view.
- To put a transition between two states, click on the transition tool (third icon), drag a line between two states, type the label for the transition ("a" or "b" for this exercise), and press return.
  (The system will offer the empty string (\( \lambda \)) as a label, but please don't go there!)
- To make a transition loop back to a state, just click on the state with the transition tool.
- You can choose the start state by selecting the arrow tool (leftmost icon), right-clicking on the state, and selecting "Initial".
  Only one state can be the start state, but you can set more than one "Final" (accepting) state in the same way, by right-clicking on them.

If you need to change something, you can delete things with the delete tool (the skull icon).
Alternatively, select the arrow tool and double-click on a transition label to edit it, or right-click on a state.
You can drag states around using the arrow tool.

To watch your FSA process some input, use the "Input" menu (at the top), choose "Step with closure", type in a short string such as "abaa", and click "OK".
Then at the bottom of the window you can trace the string one character at a time by pressing "Step", which highlights the current state as it steps through the string.
If you step right through the string and end up in a final (accepting) state, the panel will come up green.
To return to the Editor window, go to the "File" menu and select "Dismiss Tab".

{image file-path="img/chapters/jflap-create-accept.png" alt="Building an FSA &ndash; testing with input"}

You can run multiple tests in one go.
From the "Input" menu choose "Multiple Run", and type your tests into the table, or load them from a text file.

{image file-path="img/chapters/jflap-create-accept-multi.png" alt="Building an FSA &ndash; multiple run"}

You can even do tests with the empty string by leaving a blank line in the table, which you can do by pressing the "Enter Lambda" button.

There are some FSA examples in the next section.
If you're doing this for a report, keep copies of the automata and tests that you do (JFLAP's "File" menu has a "Save Image As..." option for taking snapshots of your work; alternatively you can save an FSA that you've created in a file to open later).

{panel end}

### Examples to try

Using Exorciser or JFLAP (or just draw it by hand if you prefer), construct an FSA that takes inputs made of the letters "a" and "b", and accepts the input if it meets one of the following requirements.
You should build a separate FSA for each of these challenges.

- strings that start with the letter "a" (e.g. "aa", "abaaa", and "abbbb").
- strings that end with the letter "a" (e.g. "aa", "abaaa", and "bbbba").
- strings that have an even number of the letter "a" (e.g. "aa", "abaaa", "bbbb"; and don’t forget the empty string \( \epsilon \)).
- strings that have an odd number of the letter "a" (e.g. "a", "baaa", "bbbab", but not \( \epsilon \)).
- strings where the number of "a"s in the input is a multiple of three (e.g. "aabaaaa", "bababab").
- strings where every time an "a" appears in the input, it is followed by a "b" (e.g. "abb", "bbababbbabab", "bab").
- strings that end with "ab"
- strings that start with "ab" and end with "ba", and only have "b" in the middle (e.g. "abba", "abbbbba", but *not* "aba")

{comment at some stage we might offer a rigorous checker for this? or minimise their solution and see if the same as a minimum of the solution}

For the FSAs that you construct, check that they accept valid input, but also make sure they reject invalid input.

{panel type="curiosity"}

# Hint

Checking that invalid input is rejected is important &ndash; otherwise a you could make an FSA that accepts any input, and it will pass on all tests.
Think of examples that exercise different parts of the FSA to show that it doesn't give false positive or false negative results.

{panel end}

{panel type="teacher-note"}

# Solutions

- strings that start with the letter "a".

{image file-path="img/chapters/fsa-solution-startswith-a.png" alt="solution to strings that start with the letter a"}

- strings that end with the letter "a".

{image file-path="img/chapters/fsa-solution-endswith-a.png" alt="solution to strings that end with the letter a"}

- strings that have an even number of the letter "a".

{image file-path="img/chapters/fsa-solution-even-a.png" alt="solution to strings that have an even number of the letter a"}

- strings that have an odd number of the letter "a".

{image file-path="img/chapters/fsa-solution-odd-a.png" alt="solution to strings that have an odd number of the letter a"}

- strings where the number of "a"s in the input is a multiple of three.

{image file-path="img/chapters/fsa-solution-a-multipleof-3.png" alt="solution to strings where the number of as in the input is a multiple of three"}

- strings where every time an "a" appears in the input, it is followed by a "b".

{image file-path="img/chapters/fsa-solution-b-alwaysfollows-a.png" alt="solution to strings where every time an a appears in the input, it is followed by a b"}

- strings that end with "ab".

{image file-path="img/chapters/fsa-solution-endswith-ab.png" alt="solution to strings that end with ab"}

- strings that start with "ab" and end with "ba", and only have "b" in the middle.
Students need to be careful that they don't have more than one "b" transition out of each state.

{image file-path="img/chapters/fsa-solution-ab-bstar-ba.png" alt="solution to strings that start with ab and end with ba, and only have b in the middle"}

{panel end}

Here are some more sequences of characters that you can construct FSAs to detect.
The input alphabet is more than just "a" and "b", but you don't need to put in a transition for every possible character in every state, because an FSA can automatically reject an input if it uses a character that you haven't given a transition for.
Try doing two or three of these:

- a valid three-letter month name (Jan, Feb, Mar, etc.)
- a valid month number (1, 2, ... 12)
- a valid weekday name (Monday, Tuesday, ...)

{panel type="curiosity"}

# Hint

Try to find common elements between accepted strings.
For example: in English, days of the week all end in "day".
However, be wary of oversimplifying your FSAs to take advantage of this, as it could lead to invalid input being accepted.

{panel end}

{panel type="teacher-note"}

# Solutions

These are the most concise solutions, but others are possible.
Currently solutions are only available for English input where relevant.

- a valid three-letter month name

{image file-path="img/chapters/fsa-solution-month-3chars.png" alt="solution to a valid three-letter month name"}

- a valid month number

{image file-path="img/chapters/fsa-solution-month-num.png" alt="solution to a valid month number"}

- a valid weekday name

{image file-path="img/chapters/fsa-solution-weekdays.png" alt="solution to a valid weekday name"}

{panel end}

A classic example of an FSA is an old-school vending machine that only takes a few kinds of coins.
Suppose you have a machine that only takes 5 and 10 cent pieces, and you need to insert 30 cents to get it to work.
The alphabet of the machine is the 5 and 10 cent coin, which we call F and T for short.
For example, TTT would be putting in 3 ten cent coins, which would be accepted.
TFFT would also be accepted, but TFFF wouldn't.
Can you design an FSA that accepts the input when 30 cents or more is put into the machine?
You can make up your own version for different denominations of coins and required total.

{panel type="curiosity"}

# Hint

What it means to be in each state is important.
Try giving meaningful labels to your states, instead of just 1,2,3 or A,B,C.

{panel end}

{panel type="teacher-note"}

# Solution

In this solution, each state represents the amount of money that has been inserted, starting at 0 cents and working up to 30 cents or more.

{image file-path="img/chapters/fsa-solution-coins.png" alt="solution to the 30c in coins problem"}

{panel end}

If you've worked with binary numbers, see if you can figure out what this FSA does.
Try each binary number as input: 0, 1, 10, 11, 100, 101, 110, etc.

{image file-path="img/chapters/finite-state-automata-binary-multiples.png" alt="An FSA to test with binary numbers as input"}

Can you work out what it means if the FSA finishes in state q1? State q2?

{panel type="teacher-note"}

# Solution

This FSA detects binary numbers that are multiples of 3 (i.e. 0, 11, 110, 1001... which are 0, 3, 6, 9... in decimal).
The state it is in represents the remainder when the input so far is divided by 3, so state 0 (accepting) is just no remainder.
As a challenge to top students, see if they can design a machine that finds multiples of 5 (it can be done with 5 states).
This would be a typical interview question for companies wanting to find out if a computer science graduate really knows their stuff! There are answers available on the web because it's such a well-known challenge, but hopefully some of your students will be keen to solve it on their own.

{panel end}

{panel type="activity"}

# Find finite state automata in everyday use

There are lots of systems around that use FSAs.
You could choose a system, explain how it can be represented with an FSA, and show examples of sequences of input that it deals with.
Examples are:

- Board games.
  Simple board games are often just an FSA, where the next move is determined by some input (e.g. a number given by rolling dice), and the final state means that you have completed the game &ndash; so the first person to the final state wins.
  Most games are too complex to draw a full FSA for, but a simple game like snakes and ladders could be used as an example.
  What are some sequences of dice throws that will get you to the end of the game? What are some sequences that don't?!
- Simple devices with a few buttons often have states that you can identify.
  For example, a remote control for a car alarm might have two buttons, and what happens to the car depends on the order in which you press them and the current state of the car (whether it is alarmed or not).
  For devices that automatically turn on or off after a period of time, you may have to include an input such as "waited for 30 seconds".
  Other devices to consider are digital watches (with states like "showing time", "showing date", "showing stopwatch", "stopwatch is running"), the power and eject buttons on a CD player, channel selection on a TV remote (just the numbers), setting a clock, storing presets on a car radio, and burglar alarm control panels.

{panel end}

{panel type="activity"}

# Kara the ladybug

[SwissEduc](http://www.swisseduc.ch/compscience/) has a programming environment called [Kara](http://www.swisseduc.ch/compscience/karatojava/kara/) (requires Java to be installed), which is a programmable ladybug that (in its simplest version) walks around an imaginary world controlled by actions output by a finite state automaton.
The ladybug has (simulated) detectors that sense its immediate surroundings; these serve as input to the FSA.

{comment Currently there seems to be a bug in the simple Kara program, and it only loads to 88% (apparently it is to do with the version of Java). There is a version called "MultiKara" (in the same package) which has multiple ladybugs, so you can just use one ladybug and get a similar effect. http://swisseduc.ch/informatik/karatojava/download.html}

{panel end}

{panel type="teacher-note"}

# Other resources

There are many online resources for experimenting with FSAs; we've described ones that we think are the most accessible.
However, there may be variations that you find helpful, either for various computing platforms, or with themes relevant to your students.
Here are some others that you could explore.

If you use the Java-based graphical educational system [Greenfoot](http://www.greenfoot.org/door) as a programming environment, the [treasure hunt finite state automata exercise](http://greenroom.greenfoot.org/resources/5) is based on the Treasure Island FSA activity from CS Unplugged.
Teachers can register at the [Greenroom](http://greenroom.greenfoot.org/door) resources area to download the software.

If you use [Scratch](http://scratch.mit.edu/), the following program is promising, but it doesn't have an activity or guide, and Level 3 students may have progressed beyond Scratch.
It implements the finite state automata CS Unplugged activity in Scratch, and can be downloaded as part of a [zip file](http://code.google.com/p/scratch-unplugged/downloads/detail?name=scratch-unplugged-1-0.zip&can=2&q=) of a full set of Unplugged activities.
The [ReadMe.txt](http://code.google.com/p/scratch-unplugged/downloads/detail?name=readme.txt&can=2&q=) file has some documentation.
It was developed by [Mordechai (Moti) Ben-Ari](http://www.weizmann.ac.il/sci-tea/benari/home) from the [Weizmann Institute of Science, Israel](http://www.weizmann.ac.il/).

If you need to make diagrams of FSAs, the JFLAP program can be used, or there's a program called graphviz which has many options for drawing this kind of diagram: [http://www.graphviz.org/](http://www.graphviz.org/)

{panel end}
