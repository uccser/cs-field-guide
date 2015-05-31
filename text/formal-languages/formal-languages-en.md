# Formal Languages

{teacher}

This chapter supports the "Formal languages" option of the NZ achievement standard 3.44.

Currently all material in this chapter is relevant to the standard, although students can choose one or two examples to focus on to meet the requirements of the standard. For most students the first two topics (regular expressions and finite state automata) will be plenty to work on.

{teacher end}

{comment}

.. _fl-bigpic:

{comment end}

## What's the big picture?

{comment}

.. index:: Syntax error

{comment end}

If you've ever written a text-based program, chances are that at some stage the system has told you there's an error in your program even before it runs.

{image fl-syntax-error.png alt="A syntax error in the code x = (a+b) *c+d) as the code is missing an open bracket"}

These "syntax errors" are annoying messages that programmers become excruciatingly familiar with ... it means that they didn't follow the rules somehow, even if it's just a tiny mistake. For example, suppose you intended to write: 

{code}

x = (a+b)*(c+d)

{code end}

but you accidentally left out one of the brackets:

{code}

x = (a+b)*c+d)

{code end}

When you try to compile or run the program, the computer will tell you that there's an error. If it's really helpful, it might even suggest where the error is, but it won't run the program until you fix it.

This might seem annoying, but in fact by enforcing precision and attention to detail it helps pinpoint mistakes before they become bugs in the program that go undetected until someone using it complains that it's not working correctly. 

Whenever you get errors like this, you're dealing with a *formal language*. Formal languages specify strict rules such as "all parentheses must be balanced", "all commands in the program must be keywords selected from a small set", or "the date must contain three numbers separated by dashes".

Formal languages aren't just used for programming languages --- they're used anywhere the format of some input is tightly specified, such as typing an email address into a web form.

.. index:: compiler

In all these cases, the commands that you have typed (whether in Python, Scratch, Snap!, C, Pascal, Basic, C#, HTML, or XML) are being read by a computer program. (That's right... Python is a program that reads in Python programs.) In fact, the compiler for a programming language is often written in its own language. Most C compilers are written in C --- which begs the question, who wrote the first C compiler (and what if it had bugs)?! Computer Scientists have discovered good ways to write programs that process other programs, and a key ingredient is that you have to specify what is allowed in a program very precisely. That's where formal languages come in. 

Many of the concepts we'll look at in this chapter are used in a variety of other situations: checking input to a web page; analysing user interfaces; searching text, particularly with “wild cards” strings that can match any sequence of characters; creating logic circuits; specifying communication protocols; and designing embedded systems.

Once you're familiar with the idea of formal languages, you'll possess a powerful tool for cutting complex systems down to size using an easily specified format.

{image fl-xkcd-tags.png alt="xkcd comment on HTML tags"}

{comment}

.. _fl-gettingstarted:

{comment end}

## Getting started

To give you a taste of what can be done, let's try searching for words that fit particular patterns. 
Suppose you're looking for words that contain the name "tim".

{teacher}

The following web site probably won't handle an entire class using it at the same time. We are developing our own one to replace the link, but in the meantime it's best used as a class demonstration, or for students to use in free time when they aren't all using the site simultaneously.

{teacher end}

Go to the [Regex Dictionary](http://www.visca.com/regexdict/) and type into the "String:" box:

<div align="center"><iframe width="830" height="620" src="_static/widgets/FL/FL-Regex/RegexDic.html" frameborder="0">Your browser does not support iframes. Please contact the computer's administrator and upgrade <a href="http://browsehappy.com/"> to a modern browser</a> (like Google Chrome) to enable all functionality of this online textbook.</iframe></div>

{comment}

.. TCB xHTML5 eventually the above link could be replaced with our own regex box --- should be easy to do a basic search of a dictionary? The following site almost does what we need: http://www.regular-expressions.info/javascriptexample.html

{comment end}

{code}

tim

{code end}

then press the "Search" button to find all words containing "tim".

That's a pretty simple search (though the results may have surprised you!). But now we introduce the *wildcard* code, which in this case is "." ---  a widely used convention. This matches any character at all. So now you can do a search like

{code}

tim.b

{code end}

and you will get any words that have both "tim" and "b" with a single character --- any character --- in between. Are there any words that match "tim..b"? "tim...b"? You can specify any number of occurrences of a symbol by putting a "*" after it (again a widely used convention), so:

{code}

tim.*b

{code end}

will match any words where "tim" is followed by "b", separated by any number of characters --- including zero.

Try the following search. What kind of words does it find?

{code}

x.*y.*z

{code end}

{teacher}

This code finds words that contain x, y and z in that order, but separated by 0 or more characters. At the time of writing, the only two words that come up are oxymetazoline and phenoxybenzamine.

{teacher end}

- Can you find words that contain your name, or your initials?
- What about words containing the letters from your name in the correct order?
- Are there any words that contain all the vowels in order (a, e, i, o, u)?

{teacher}

To find words with all the vowels in order, the code is simply "a.*e.*i.*o.*u". 

Students may ask how to do more complex searches, like letters in any order. If they are interested they can explore this on their own, but this is just a warmup exercise. We'll be covering this more carefully in the section on :ref:`fl-regex`.

{teacher end}

The code you've used above is a part of a formal language called a "regular expression". Computer programs that accept typed input use regular expressions for checking items like dates, credit card numbers and product codes. They’re used extensively by programming language compilers and interpreters to make sense of the text that a programmer types in. 
We'll look at them in more detail in the section on :ref:`fl-regex`.

Next we examine a simple system for reading input called a [finite state automaton][glossary.htm#finate state automaton], which --- as we'll find out later --- is closely related to regular expressions. Later we'll explore the idea of *grammars*, another kind of formal language that can deal with more complicated forms of input.

{teacher}

For a fun discussion, you could have the students look at the `Klingon Linguistics activity at CS4FN <http://www.cs4fn.org/linguistics/klingon.html>`_. This page introduces the fundamentals of languages — words (the [alphabet](glossary.html#alphabet)) and :term:`grammar` (the rules of syntax). It discusses why languages are translated and how meaning can be changed by translation. It also explains why computer languages need to be translated. 

{teacher end}

{comment}

.. _fl-fsa:

{comment end}

## Finite state automata

{teacher}

There's a fun variant of the challenge at the start of this section that involves running around the playground. It's described as the `Treasure Hunt <http://csunplugged.org/finite-state-automata/http://csunplugged.org/information-theory>`_ activity on the CS unplugged site.
It may be a bit young for some students, but if you can sell it to them, it's a great way to get some physical exercise away from the computers and to see most of the concepts in this section in a kinesthetic activity. Many variants are possible; for example, it can be run as a card game where the A/B card for each station is turned over on request. See the Unplugged site for other ideas.

{teacher end}

Here's a map of a commuter train system for the town of Trainsylvania. The trouble is, it doesn't show where the the trains go --- all you know is that there are two trains from each station, the A-train and the B-train. The inhabitants of Trainsylvania don't seem to mind this --- it's quite fun choosing trains at each station, and after a while you usually find yourself arriving where you intended.

{image fl-train-map-incomplete.png alt="An incomplete train map"}

{comment}

.. TCB Suggestions for station names (from Andrew): Not "Happyland"; change to "Railington" or "Enginopolis"?

{comment end}

You can travel around Trainsylvania yourself using the following interactive. You're starting at the City Mall station, and you need to find your way to Suburbopolis. 
At each station you can choose either the A-train or the B-train --- press the button to find out where it will take you. 
But, like the residents of Trainsylvania, you'll probably want to start drawing a map of the railway, because later you might be asked to find your way somewhere else.
If you want a template to draw on, you can [print one out from here](files/formal-languages/fl-trainsylvania-blank.pdf).

{comment}

.. Andrew suggested a new name for Happyland: e.g. "Railington" or "Enginopolis" :-) This image also appears above as FL-trains-incomplete.jpg

{comment end}

<div align="center"><iframe width="450" height="515" src="_static/widgets/fsa-trainsylvania-v4.html?map=puzzle1" frameborder="0">Your browser does not support iframes. Please contact the computer's administrator and upgrade <a href="http://browsehappy.com/"> to a modern browser</a> (like Google Chrome) to enable all functionality of this online textbook.</iframe></div>

{teacher}

You should let students devise their own notation for this. They will soon learn (possibly the hard way) that they should record all routes with an arrow (since trains don't necessarily return by the same route), and label their arrows with A or B. The full map for the activity is below, but don't spoil the students' fun by providing it --- at least, not yet.

{teacher end}

{image fl-train-map-complete.png alt="Solution to the train map"}

Did you find a sequence of trains to get from City Mall to Suburbopolis? You can test it by typing the sequence of trains in the following interactive. For example, if you took the A-train, then the B-train, then an A-train, type in ABA.
 
<div align="center"><iframe width="450" height="350" src="_static/widgets/fsa-trip-planner-v4.html" frameborder="0" allowfullscreen>Your browser does not support iframes. Please contact the computer's administrator and upgrade to a modern browser (like Google Chrome) to enable all functionality of this online textbook.</iframe></div>

Can you find a sequence that takes you from City Mall to Suburbopolis? Can you find another sequence, perhaps a longer one? Suppose you wanted to take a really long route ... can you find a sequence of 12 hops that would get you there? 20 hops?

Here's another map. It's for a different city, and the stations only have numbers, not names (but you can name them if you want).

{image fl-train-fsa-example.png alt="A simpler train map"}

Suppose you're starting at station 1, and need to get to station 3 (it has a double circle to show that's where you're headed.)

- What's the shortest way to get from station 1 to station 3?
- Where do you end up if you start at station 1 and take the trains ABAA?
- Where do you end up if your start at station 1 and take 20 train hops, always alternating A, B, A, B, A, B?
- Can you give an easy-to-describe sequence of 100 or more hops that will get you to station 3?

{teacher}

Solutions: 

- AA
- station 3
- station 4 (each AB just goes back and forward between 2 and 4)
- there are many solutions, but based on the previous question, AB repeated 49 times will get to station 4 (that's 98 hops), then AA gets to station 3. Many other solutions are possible, based on going around in circles many times, for example, repeating A 101 times will end up at station 3, because any multiple of 3 "A"s in the middle makes no difference.

{teacher end}

The map that we use here, with circles and arrows, is actually a powerful idea from computer science called a [Finite State Automaton](glossary.html#Finite State Automaton), or FSA for short. 
Being comfortable with such structures is a useful skill for computer scientists.

{jargon-buster}

**Jargon Buster**

The name [Finite State Automaton](glossary.htm#Finite State Automation) (FSA) might seem strange, but each word is quite simple. "Finite" just means that there is a limited number of states (such as train stations) in the map. The "state" is just as another name for the train stations we were using. "Automaton" is an old word meaning a machine that acts on its own, following simple rules (such as the cuckoo in a cuckoo clock). Sometimes an FSA is called a **Finite State Machine** (FSM), or even just a “state machine”.  By the way, the plural of “Automaton” can be either “Automata” or "Automatons". People working with formal languages usually use Finite State *Automata*, but "FSAs" for short.

{jargon-buster end}

An FSA isn't all that useful for train maps, but the notation is used for many other purposes, from checking input to computer programs to controlling the behaviour of an interface.
You may have come across it when you dial a telephone number and get a message saying "Press 1 for this … Press 2 for that … Press 3 to talk to a human operator." Your key presses are inputs to a [finite state automaton](glossary.htm#finite state automation) at the other end of the phone line. The dialogue can be quite simple, or very complex. Sometimes you are taken round in circles because there is a peculiar loop in the finite-state automaton. If this occurs, it is an error in the design of the system — and it can be extremely frustrating for the caller!

Another example is the remote control for an air conditioning unit. It might have half a dozen main buttons, and pressing them changes the mode of operation (e.g. heating, cooling, automatic). 
To get to the mode you want you have to press just the right sequence, and if you press one too many buttons, it's like getting to the train station you wanted but accidentally hopping on one more train. It might be a long journey back, and you may end up exploring all sorts of modes to get there!
If there's a manual for the controller, it may well contain a diagram that looks like a [Finite State Automaton](glossary.htm#Finite State Automation).
If there isn't a manual, you may find yourself wanting to draw a map, just as for the trains above, so that you can understand it better.

{comment}

.. TCB Don't really need his example
.. Another example is when you get cash from a bank cash machine. The program in the machine’s computer leads you through a sequence of events. Inside the program all the possible sequences are kept as a finite-state automaton. Every key you press takes the automaton to another "station" on the map. Some of the "stations" have instructions for the computer on them, like “dispense $100 of cash” or “print a statement” or “eject the cash card”.

{comment end}

The map that we used above uses a standard notation. Here's a smaller one:

{image fl-fsa-example-1.png alt="A simple [Finite State Automaton](glossary.htm#Finite State Automation)"}

Notice that this map has routes that go straight back to where they started!
For example, if you start at 1 and take route "b", you immediately end up back at 1.
This might seem pointless, but it can be quite useful.
Each of the "train stations" is called a state, which is a general term that just represents where you are after some sequence of inputs or decisions. 
What it actually means depends on what the FSA is being used for. States could represent a mode of operation (like fast, medium, or slow when selecting a washing machine spin cycle), or the state of a lock or alarm (on, off, exit mode), or many other things. We’ll see more examples soon.
 
One of the states has a double circle. 
By convention, this marks a "final” or "accepting” state, and if we end up there we've achieved some goal.
There's also a "start” state --- that's the one with an arrow coming from nowhere.
Usually the idea is to find a sequence of inputs that gets you from the start state to a final state.
In the example above, the shortest input to get to state 2 is "a", but you can also get there with "aa", or "aba", or "baaaaa". People say that these inputs are “accepted” because they get you from the start state to the final state --- it doesn’t have to be the shortest route.

What state would you end up in if the input was the letter "a" repeated 100 times?

Of course, not all inputs get you to state 2. For example, "aab" or even just "b" aren't accepted by this simple system. Can you characterise which inputs are accepted?

{teacher}

The FSA above accepts any string of inputs that end with an "a", so the interactive below behaves pretty trivially: press "a" for it to be accepted, and "b" for not accepted. It happens to behave like a two-button power switch, with an on and off button. Although these kind of FSAs seem very trivial, it's important for students to become confident with them. Some of the FSAs used in practice have just a few states like these, but even small systems can perform quite complex tasks. 

{teacher end}

Here's an interactive which follows the rules of the FSA above. You can use it to test different inputs.

<div align="center"><iframe width="450" height="350" src="_static/widgets/fsa-2state-v3.html?map=one" frameborder="0" allowfullscreen>Your browser does not support iframes. Please contact the computer's administrator and upgrade to a modern browser (like Google Chrome) to enable all functionality of this online textbook.</iframe></div>

Here's another [FSA](glossary.html#FSA), which looks similar to the last one but behaves quite differently. You can test it in the interactive below. 

{image fl-fsa-example-2.png alt="A simple [Finite State Automaton](glossary.htm#Finite State Automation)"}

Work out which of the following inputs it accepts. Remember to start in state 1 each time!

- "aaa"
- "abb"
- "aaaa"
- "bababab"
- "babababa"
- the letter "a" repeated 100 times
- the letter "a" repeated 1001 times
- the letter "b" a million times, then an "a", then another million of the letter "b"

Can you state a general rule for the input to be accepted?

{teacher}

The general rule is that the input must have an odd number of "a"s in it; the number of "b"s is irrelevant. So in the above examples, the accepted [strings](glossary.html#strings) are "aaa", "abb", "bababab", the letter "a" repeated 1001 times, and the last one (the letter "b" a million times, then an "a", then another million of the letter "b").

{teacher end}

<div align="center"><iframe width="450" height="350" src="_static/widgets/fsa-2state-v3.html?map=two" frameborder="0" allowfullscreen>Your browser does not support iframes. Please contact the computer's administrator and upgrade to a modern browser (like Google Chrome) to enable all functionality of this online textbook.</iframe></div>

To keep things precise, we'll define two further technical terms.
One is the [alphabet](glossary.html#alphabet), which is just a list of all possible inputs that might happen.
In the last couple of examples the [alphabet](glossary.html#alphabet) has consisted of the two letters "a" and "b", but for an FSA that is processing text typed into a computer, the [alphabet](glossary.html#alphabet) will have to include every letter on the keyboard.

The connections between states are called *transitions*, since they are about changing state.
The sequence of characters that we input into the FSA is often called a [string](glossary.html#string) (it's just a  [string](glossary.html#string) of letters), and the set of all [strings](glossary.html#strings) that can be accepted by a particular FSA is called its *language*.
For the FSA in the last example, its language includes the [strings](glossary.html#strings) "a", "aaa", "bab", "ababab", and lots more, because these are accepted by it. However, it does not include the [strings](glossary.html#strings) "bb" or “aa”.

The language of many FSAs is big. In fact, the ones we've just looked at are infinite. You could go on all day listing patterns that they accept. There is no limit to the length of the [strings](glossary.html#strings) they can accept.

That's good, because many real-life FSA's have to deal with "infinite" input.
The diagram below shows the FSA for the spin speed on a washing machine, where each press of the spin button changes the setting.

{image fl-fsa-spin-speed-example.png alt="FSA for spin setting on a washing machine"}

It would be frustrating if you could only change the spin setting 50 times, and then it stopped accepting input ever again.
If you want, you could switch from fast to slow spin by pressing the spin button 3002 times.
Or 2 times would do. Or 2 million times (try it if you don't believe me).

<div align="center"><iframe width="450" height="450" src="_static/widgets/fsa-spin-graphic.html" frameborder="0" allowfullscreen>Your browser does not support iframes. Please contact the computer's administrator and upgrade to a modern browser (like Google Chrome) to enable all functionality of this online textbook.</iframe></div>

The following diagram summarizes the terminology we have introduced. Notice that this FSA has two accepting states. You can have as many as you want, but only one start state.

{image fl-fsa-terminology-example.png alt="FSA terminology"}

For this FSA, the [strings](glossary.html#strings) "aa" and "aabba" would be accepted, and "aaa" and "ar" wouldn't. 
By the way, notice that we often put inverted commas around [strings](glossary.html#strings) to make it clear where they start and stop. Of course, the inverted commas aren't part of the strings.

{comment}

.. TCB could mention this, but maybe too much info? Notice that "r" always goes back to state 1 --- if it ever occurs in the input then it's like a reset.

{comment end}

Sometimes you'll see an FSA referred to as a Finite State Machine, or FSM, and there are other closely related systems with similar names. We'll mention some later in the chapter.

{comment}

.. xtcb FSM is defined a second time in the above paragraph

{comment end}

{teacher}

The following website contains a comprehensive list of terminology relating to formal languages, although it goes a lot deeper than the terms we're using: [http://www.csee.umbc.edu/portal/help/theory/lang_def.shtml](http://www.csee.umbc.edu/portal/help/theory/lang_def.shtml)

{teacher end}

Now there's something we have to get out of the way before going further. If we're talking about which [strings](glossary.html#strings) of inputs will get you into a particular state, and the system starts in that state, then the *empty string* --- that is, a string without any letters at all --- is one of the solutions!
For example, here's a simple [finite state automaton](glossary.htm#finite state automation) with just one input (button a) that represents a strange kind of light switch. The reset button isn't part of the FSA; it’s just a way of letting you return to the starting state. See if you can figure out which patterns of input will turn the light on:

<div align="center"><iframe width="450" height="450" src="_static/widgets/fsa-strangelight-v3.html" frameborder="0" allowfullscreen>Your browser does not support iframes. Please contact the computer's administrator and upgrade to a modern browser (like Google Chrome) to enable all functionality of this online textbook.</iframe></div>

{teacher}

The light comes on with every third button press (which is intentionally confusing --- students will probably expect every second press to work, but this is to get them thinking about what is happening here!) The sequences that will turn on the light are therefore "aaa", "aaaaaa" and so on --- any number of presses that's a multiple of three. And, of course, zero presses.

{teacher end}

Have you worked out which sequences of button presses turn on the light? Now think about the *shortest* sequence from a reset that can turn it on. 

Since it's already on when it has been reset, the shortest sequence is *zero* button presses. It's hard to write that down (although you could use “”), so we have a symbol especially for it, which is the Greek letter epsilon: {math}\epsilon{math end}.
You'll come across {math}\epsilon{math end} quite often with formal languages.

It can be a bit confusing. For example, the language (that is, the list of all accepted inputs) of the FSA above includes "aaa", "aaaaaa", and {math}\epsilon{math end}`.
If you try telling someone that "nothing" will make the light come on that could be confusing --- it might mean that you could never turn the light on --- so it's handy being able to say that the *empty string* (or {math}\epsilon{math end}) will turn the light on.
There are different kinds of "nothing", and we need to be precise about which one we mean!

Here’s the FSA for the strange light switch. You can tell that {math}\epsilon{math end} is part of the language because the start state is also a final state (in fact, it's the only final state). Actually, the switch isn't all that strange --- data projectors often require two presses of the power button, to avoid accidentally turning them off.

{image fl-fsa-light-switch-example-3.png alt="The finite state machine for a strange light switch"}

An important part of the culture of computer science is always to consider extreme cases. One kind of extreme case is where there is no input at all: what if a program is given an empty file, or your database has zero entries in it? It's always important to make sure that these situations have been thought through. 
So it's not surprising that we have a symbol for the empty string.
Just for variety, you'll occasionally find some people using the Greek letter lambda ({math}\lambda{math end}) instead of {math}\epsilon{math end} to represent the empty string.

{teacher}

The two main pieces of recommended software use the two notations. JFLAP can be changed to use epsilon ({math}\epsilon{math end}) from its Preferences menu, so we will use epsilon throughout the chapter. You may wish to change the preference for JFLAP early on, or else just point out to students that epsilon and lambda ({math}\lambda{math end}) can be used interchangeably.

{teacher end}

And by the way, the language of the three-state FSA above is infinitely large because it is the set of all [strings](glossary.html#strings) that contain the letter "a" in multiples of 3, which is {{math}\epsilon{math end}, aaa, aaaaaa, aaaaaaaaa, ...}. That's pretty impressive for such a small machine.

While we're looking at extremes, here's another FSA to consider.  It uses "a" and "b" as its [alphabet](glossary.html#alphabet).

{image fl-fsa-abx2-example.png alt="FSA for short strings"}

Will it accept the [string](glossary.html#string) "aaa"? Or "aba"? Or anything of 3 characters or more?

As soon as you get the third character you end up in state 4, which is called a *trap state* because you can't get out. 
If this was the map for the commuter train system we had at the start of this section it would cause problems, because eventually everyone would end up in the trap state, and you'd have serious overcrowding.
But it can be useful in other situations --- especially if there's an error in the input, so no matter what else comes up, you don't want to go ahead.

For the example above, the language of the FSA is any mixture of "a"s and "b"s, but only two characters at most. 
Don't forget that the empty [string](glossary.html#string) is also accepted. It's a very small language; the only [strings](glossary.html#strings) in it are:
{{math}\epsilon{math end}, a, b, aa, ab, ba, bb}.

Here's another FSA to consider:

{image fl-fsa-no-trap-example.png alt="FSA with missing transitions"}

It's fairly clear what it will accept: [strings](glossary.html#strings) like "ab", "abab", "abababababab", and, of course {math}\epsilon{math end}.
But there are some missing transitions: if you are in state 1 and get a "b" there's nowhere to go.
If an input cannot be accepted, it will be rejected, as in this case. We could have put in a trap state to make this clear:

{image fl-fsa-trap-added-example.png alt="FSA with missing transitions"}

But things can get out of hand. What if there are more letters in the [alphabet](glossary.html#alphabet)? We'd need something like this:

{image fl-fsa-trap-added-extreme-example.png alt-"FSA with missing transitions"}

So, instead, we just say that any unspecified transition causes the input to be rejected (that is, it behaves as though it goes into a trap state). In other words, it's fine to use the simple version above, with just two transitions.

Now that we've got the terminology sorted out, let’s explore some applications of this simple but powerful "machine" called the [Finite State Automaton](glossary.html#Finite State Automaton).

Who uses finite state automata?
--------------------------------------------------------------------------------------------------------------------

.. xTCB this would be a good place for an industry video

Finite state automata are used a lot in the design of digital circuits (like the electronics in a hard drive) and embedded systems (such as burglar alarms or microwave ovens).
Anything that has a few buttons on it and gets into different states when you press those buttons (such as alarm on/off, high/med/low power) is effectively a kind of FSA.

With such gadgets, FSAs can be used by designers to plan what will happen for every input in every situation, but they can also be used to analyse the interface of a device.
If the FSA that describes a device is really complicated, it's a warning that the interface is likely to be hard to understand. 
For example, here's an FSA for a microwave oven. It reveals that, for example, you can't get from power2 to power1 without going through timer1. Restrictions like this will be very frustrating for a user. 
For example, if they try to set power1 it won't work until they've set timer1 first.
Once you know this sequence it's easy, but the designer should think about whether it's necessary to force the user into that sort of sequence.
These sorts of issues become clear when you look at the FSA.
But we're straying into the area of Human-Computer Interaction! This isn't surprising because most areas of computer science end up relating to each other --- but let's get back to other applications of FSAs.

.. xTCB get better fsa --- from Harold Thimbleby? Or draw one for a device?

.. figure:: _static/formal_languages/FL-fsa-microwave-example.png
 :alt: FSA for a microwave oven

As we shall see in the next section, one of the most valuable uses of the FSA in computer science is for checking input to computers, whether it's a value typed into a dialogue box, a program given to a compiler, or some search text to be found in a large document.
There are also data compression methods that use FSAs to capture patterns in the data being compressed, and variants of FSA are used to simulate large computer systems to see how best to configure it before spending money on actually building it.

.. _fl-curiosity:

.. container:: curiosity

 **Curiosity**

 What's the biggest FSA in the world, one that lots of people use every day? It's the World-Wide Web. Each web page is like a state, and the links on that page are the transitions between them. Back in the year 2000 the web had a billion pages. In 2008 Google Inc. declared they had found a trillion different web page addresses. That’s a lot. A book with a billion pages would be 50 km thick. With a trillion pages, its thickness would exceed the circumference of the earth.

 But the web is just a finite-state automaton. And in order to produce an index for you to use, search engine companies like Google have to examine all the pages to see what words they contain. They explore the web by following all the links, just as you did in the train travelling exercise. Only, because it's called the "web," exploring is called "crawling" — like spiders do. 


.. still deciding if we should have this Activity: FSA pinball

.. HTML5 "game" where you are given a fsa and need to type characters to get to final state, but can't re-use [strings](glossary.html#strings) Add pinball sounds/effects, ball bouncing around states. Based on this:

Activity: practice creating FSAs
--------------------------------------------------------------------


.. only:: teachers or dev

 .. admonition:: For teachers

  This section uses free teaching software that makes it easy for students to create and experiment with FSAs. This software will also be useful for the next section on regular expressions, so it’s worth becoming familiar with. You can choose between using "Exorciser" or "JFLAP" (see later). The Exorciser system from `SwissEduc <http://www.swisseduc.ch/compscience/>`_  is cleaner and simpler, but JFLAP includes some features that are useful for the sections on regular expressions and grammars. (The Exorciser material on grammars is too advanced, and its features with regular expressions are a little more tedious to use for our purposes). Both of the systems have extensive features that aren't relevant to this chapter, so students will need to ignore much of what they see! 

  We recommend starting students with Exorciser, and those who intend to do the more advanced parts of the topic could then get familiar with JFLAP. 

  One quick tip: to avoid confusion, in Exorciser deselect the option of having an empty-string transition by right-clicking in the background, choosing "A = {a,b}", and unchecking {math}\epsilon{math end}. Students can add other characters to the [alphabet](glossary.html#alphabet) from this menu, although just "a" and "b" are enough to play with for a start.

This activity involves constructing and testing your own FSA, using free software that you can download yourself. Before doing that, we'll look at some general ways to create an FSA from a description. If you want to try out the examples here on a live FSA, read the next two sections about using Exorciser and JFLAP respectively, which allow you to enter FSAs and test them.


A good starting point is to think of the shortest string that is needed for a particular description. For example, suppose you need an FSA that accepts all strings that contain an even number of the letter "b". The shortest such string is {math}\epsilon{math end}, which means that the starting state must also be a final state, so you can start by drawing this:

.. figure:: _static/formal_languages/FL-fsa-create-example-1.png
 :alt: creating an FSA


If instead you had to design an FSA where the shortest accepted string is "aba", you would need a sequence of 4 states like this:

.. figure:: _static/formal_languages/FL-fsa-create-example-2.png
 :alt: creating an FSA


Then you need to think what happens next. For example, if we are accepting strings with an even number of "b"s, a single "b" would have to take you from the start state to a non-accepting state:

.. figure:: _static/formal_languages/FL-fsa-create-example-3.png
 :alt: creating an FSA

But another "b" would make an even number, so that's acceptable. And for any more input the result would be the same even if all the text to that point hadn't happened, so you can return to the start state:

.. figure:: _static/formal_languages/FL-fsa-create-example-4.png
 :alt: creating an FSA

Usually you can find a "meaning" for a state. In this example, being in state 1 means that so far you've seen an even number of "b"s, and state 2 means that the number so far has been odd.

.. xJRM the following two diagrams come up much later in the PDF version; probably a Latex hard-to-solve thing, but a good job for a rainy day!

Now we need to think about missing transitions from each state. 
So far there's nothing for an "a" out of state 1. Thinking about state 1, an "a" doesn't affect the number of "b"s seen, and so we should remain in state 1:

.. figure:: _static/formal_languages/FL-fsa-create-example-5.png
 :alt: creating an FSA

The same applies to state 2:

.. figure:: _static/formal_languages/FL-fsa-create-example-6.png
 :alt: creating an FSA

Now every state has a transition for every input symbol, so the FSA is finished. You should now try some examples to check that an even number of "b"s always brings it to state 1.

Get some practice doing this yourself! Here are instructions for two different programs that allow you to enter and test FSAs.


Exorciser
^^^^^^^^^^^^

This section shows how to use some educational software called "Exorciser". (The next section introduces an alternative called JFLAP which is a bit harder to use.) Exorciser has facilities for doing advanced exercises in formal languages; but we use just the simplest ones.

Exorciser can be downloaded `here <http://www.swisseduc.ch/compscience/exorciser/index.html>`_.

When you run it, select "Constructing Finite Automata" (the first menu item); click the "Beginners" link when you want a new exercise.
The challenge in each FSA exercise is the part after the | in the braces (i.e., curly brackets). For example, in the diagram below you are being asked to draw an FSA that accepts an input [string](glossary.html#string) w if "w has length at least 3". You should draw and test your answer, although initially you may find it helpful to just click on "Solve exercise" to get a solution, and then follow strings around the solution to see how it works. That’s what we did to make the diagram below.

.. figure:: _static/formal_languages/FL-fsa-exorciser.png
 :alt: The exorciser software from SwissEduc

To draw an FSA in the Exorciser system, right-click anywhere on the empty space and you'll get a menu of options for adding and deleting states, choosing the [alphabet](glossary.html#alphabet), and so on. 
To make a transition, drag from the outside circle of one state to another (or out and back to the state for a loop).
You can right-click on states and transitions to change them. 
The notation "a|b" means that a transition will be taken on "a" or "b" (it's equivalent to two parallel transitions).

If your FSA doesn't solve their challenge, you'll get a hint in the form of a [string](glossary.html#string) that your FSA deals with incorrectly, so you can gradually fix it until it works. If you're stuck, click “Solve exercise”.
You can also track input as you type it: right-click to choose that option.
See the `SwissEduc website <http://www.swisseduc.ch/compscience/>`_ for more instructions.

.. figure:: _static/formal_languages/FL-fsa-exorciser-error.png
 :alt: The exorciser software from SwissEduc

The section after next gives some examples to try. 
If you're doing this for a report, keep copies of the automata and tests that you do. Right-click on the image for a "Save As" option, or else take screenshots of the images.


JFLAP
^^^^^^^^^^^^

.. only:: teachers or dev

 .. admonition:: For teachers

  .. _fl-jflap:

  A program called JFLAP is an alternative to Exorciser for students to design and test their own FSA. It can be downloaded for free, and is widely used for teaching formal languages. It’s a powerful piece of software that can be used for most of the concepts in this chapter, which makes it worth learning how to use it. Unfortunately JFLAP has many more features than we need in this chapter, so we recommend using Exorciser if it's available. If you use JFLAP we recommend that you become familiar with it first so that you can guide students through it: the interface has many distracting features and can be a little quirky, and fiddling around without taking time to learn how to use it will be a frustrating experience. Fortunately there's a good tutorial about using JFLAP `here <http://www.jflap.org/tutorial/>`_ , and some material from Duke University about FSAs based around JFLAP `here <http://www.cs.duke.edu/csed/pltl/exercises/lessons/29/finiteautomata.zip>`_ (ZIP file).

  If you have difficulty installing JFLAP or Exorciser, the Dyna Lab http://www.cs.montana.edu/%7Edynalab/ site includes a [Finite State Automaton](glossary.html#Finite State Automaton) Applet where you can create your own FSAs and test them on input strings. It animates the movement around the states (including sound!). Refer to the instructions at http://www.cs.montana.edu/%7Edynalab/fsa/instructions.html. It runs as a Java applet in the browser, so doesn't require installation: just go to the website and select "FSA" in the contents panel.
  There's also an FSA example in the "Java Applets Centre" at http://www.cosc.canterbury.ac.nz/mukundan/thco/DFA.html.


Another widely used system for experimenting with FSAs is a program called JFLAP (download it from http://jflap.org). You can use it as an alternative for Exorciser if necesary. You'll need to follow instructions carefully as it has many more features than you'll need, and it can be hard to get back to where you started.

Here's how to build an FSA using JFLAP. As an example, we'll use the following FSA:

.. figure:: _static/formal_languages/FL-jflap-2-state.png
 :alt: Building an FSA --- example

.. xTCB put some screen shots and ideally a video here to show how to use JFLAP.

To build this, run JFLAP and:

- click on the "Finite Automaton" button in the control panel.
- In the Editor window, click on the picture of a state (with a little q in it), and then click in the window to create states. 
- To move the states around, click on the arrow tool in the toolbar (leftmost icon). It doesn't matter where the states are, but you want them to be easy to view.
- To put a transition between two states, click on the transition tool (third icon), drag a line between two states, type the label for the transition ("a" or "b" for this exercise), and press return. (The system will offer the empty string ({math}\lambda{math end}) as a label, but please don't go there!)
- To make a transition loop back to a state, just click on the state with the transition tool.
- You can choose the start state by selecting the arrow tool (leftmost icon), right-clicking on the state, and selecting "Initial". Only one state can be the start state, but you can set more than one "Final" (accepting) state in the same way, by right-clicking on them.

If you need to change something, you can delete things with the delete tool (the skull icon). Alternatively, select the arrow tool and double-click on a transition label to edit it, or right-click on a state.
You can drag states around using the arrow tool.

To watch your FSA process some input, use the "Input" menu (at the top), choose "Step with closure", type in a short string such as "abaa", and click "OK". Then at the bottom of the window you can trace the [string](glossary.html#string) one character at a time by pressing "Step", which highlights the current state as it steps through the string.
If you step right through the [string](glossary.html#string) and end up in a final (accepting) state, the panel will come up green. To return to the Editor window, go to the “File” menu and select “Dismiss Tab”.

.. figure:: _static/formal_languages/FL-jflap-2-state-accept.png
 :alt: Building an FSA - testing with input

You can run multiple tests in one go. From the "Input" menu choose "Multiple Run", and type your tests into the table, or load them from a text file.

.. figure:: _static/formal_languages/FL-jflap-2-state-accept-multi.png
 :alt: Building an FSA --- multiple run

You can even do tests with the empty [string](glossary.html#string) by leaving a blank line in the table, which you can do by pressing the "Enter Lambda" button.

There are some FSA examples in the next section. 
If you're doing this for a report, keep copies of the automata and tests that you do (JFLAP's "File" menu has a "Save Image As..." option for taking snapshots of your work; alternatively you can save an FSA that you've created in a file to open later).


Examples to try
^^^^^^^^^^^^^^^^^^^^^^^^^

Using Exorciser or JFLAP, construct an FSA that takes inputs made of the letters "a" and "b", and accepts the input if it meets one of the following requirements. You should build a separate FSA for each of these challenges.

- [strings](glossary.html#strings) that start with the letter "a" (e.g. "aa", "abaaa", and "abbbb").
- [strings](glossary.html#strings) that end with the letter "a" (e.g. "aa", "abaaa", and "bbbba").
- [strings](glossary.html#strings) that have an even number of the letter "a" (e.g. "aa", "abaaa", "bbbb"; and don’t forget the empty string {math}\epsilon{math end}).
- [strings](glossary.html#strings) that have an odd number of the letter "a" (e.g. "a", "baaa", "bbbab", but not {math}\epsilon{math end}).
- [strings](glossary.html#strings) where the number of "a"s in the input is a multiple of three (e.g. "aabaaaa", "bababab").
- [strings](glossary.html#strings) where every time an a appears in the input, it is followed by a b (e.g. "abb", "bbababbbabab", "bbb").
- [strings](glossary.html#strings) that end with "ab"
- [strings](glossary.html#strings) that start with "ab" and end with "ba", and only have "b" in the middle (e.g. "abba", "abbbbba")

.. xTCB provide answers/hints for teachers

.. only:: teachers or dev

 .. admonition:: For teachers

  The following solutions are for the smallest/simplest way to represent the above languages, but students may come up with others that are valid. To check them, try examples of strings that are both accepted and not accepted. [Solutions to the above yet to be provided --- contact Tim Bell if you need them and we will prioritise this]

.. xtcb at some stage we might offer a rigorous checker for this? or minimise their solution and see if the same as a minimum of the solution

For the FSA(s) that you construct, check that they accept valid input, but also make sure they reject invalid input. 

.. only:: teachers or dev

 .. admonition:: For teachers

  Checking that invalid input fails is important --- otherwise a student could make an FSA that accepts any input, and it will pass on all tests. Students will need to think of examples that exercise different parts of the FSA to show that it doesn't give false positive or false negative results.

Here are some more sequences of characters that you can construct FSAs to detect. The input [alphabet](glossary.html#alphabet) is more than just "a" and "b", but you don't need to put in a transition for every possible character in every state, because an FSA can automatically reject an input if it uses a character that you haven't given a transition for. Try doing two or three of these:

- the names for international standard paper sizes (A1 to A10, B1 to B10, and so on)
- a valid three-letter month name (Jan, Feb, Mar, etc.)
- a valid month number (1, 2, ... 12)
- a valid weekday name (Monday, Tuesday, ...)

.. only:: teachers or dev

 .. admonition:: For teachers

  Solutions for these will be provided in a later version of this guide. 

.. xTCB provide answers/hints for teachers --- e.g. have "day" as common at end

A classic example of an FSA is an old-school vending machine that only takes a few kinds of coins.
Suppose you have a machine that only takes 5 and 10 cent pieces, and you need to insert 30 cents to get it to work.
The [alphabet](glossary.html#alphabet) of the machine is the 5 and 10 cent coin, which we call F and T for short.
For example, TTT would be putting in 3 ten cent coins, which would be accepted. TFFT would also be accepted, but TFFF wouldn't.
Can you design an FSA that accepts the input when 30 cents or more is put into the machine?
You can make up your own version for different denominations of coins and required total.

.. only:: teachers or dev

 .. admonition:: For teachers

  Solutions for these will be provided in a later version of this guide. 

.. xTCB provide answers


If you've worked with binary numbers, see if you can figure out what this FSA does. Try each binary number as input: 0, 1, 10, 11, 100, 101, 110, etc.

.. figure:: _static/formal_languages/FL-fsa-multiples.png
 :alt: An FSA to test with binary numbers as input

Can you work out what it means if the FSA finishes in state q1? State q2?

.. only:: teachers or dev

 .. admonition:: For teachers

  This FSA detects binary numbers that are multiples of 3 (i.e. 0, 11, 110, 1001... which are 0, 3, 6, 9... in decimal). The state it is in represents the  remainder when the input so far is divided by 3, so state 0 (accepting) is just no remainder. As a challenge to top students, see if they can design a machine that finds multiples of 5 (it can be done with 5 states). This would be a typical interview question for companies wanting to find out if a computer science graduate really knows their stuff! There are answers available on the web because it's such a well-known challenge, but hopefully some of your students will be keen to solve it on their own.


Activity: Find Finite State Automata in everyday use
---------------------------------------------------------------------------

There are lots of systems around that use FSAs. You could choose a system, explain how it can be represented with an FSA, and show examples of sequences of input that it deals with. Examples are:

- Board games. Simple board games are often just an FSA, where the next move is determined by some input (e.g. a number given by rolling dice), and the final state means that you have completed the game --- so the first person to the final state wins. Most games are too complex to draw a full FSA for, but a simple game like snakes and ladders could be used as an example. What are some sequences of dice throws that will get you to the end of the game? What are some sequences that don't?!
- Simple devices with a few buttons often have states that you can identify. For example, a remote control for a car alarm might have two buttons, and what happens to the car depends on the order in which you press them and the current state of the car (whether it is alarmed or not). For devices that automatically turn on or off after a period of time, you may have to include an input such as "waited for 30 seconds". Other devices to consider are digital watches (with states like "showing time", "showing date", "showing stopwatch", "stopwatch is running"), the power and eject buttons on a CD player, channel selection on a TV remote (just the numbers), setting a clock, storing presets on a car radio, and burglar alarm control panels.


Activity: Kara, the ladybug
----------------------------------------------------------------

`SwissEduc <http://www.swisseduc.ch/compscience/>`_ has a programming environment called `Kara <http://www.swisseduc.ch/compscience/karatojava/kara/>`_ (requires Java to be installed), which is a programmable ladybug that (in its simplest version) walks around an imaginary world controlled by actions output by a [Finite State Automaton](glossary.html#Finite State Automaton). The ladybug has (simulated) detectors that sense its immediate surroundings; these serve as input to the FSA.


.. xtcb Currently there seems to be a bug in the simple Kara program, and it only loads to 88% (apparently it is to do with the version of Java). There is a version called "MultiKara" (in the same package) which has multiple ladybugs, so you can just use one ladybug and get a similar effect. http://swisseduc.ch/informatik/karatojava/download.html


.. only:: teachers or dev

 .. admonition:: For teachers

  There are many online resources for experimenting with FSAs;  we've described ones that we think are the most accessible. However, there may be variations that you find helpful, either for various computing platforms, or with themes relevant to your students. Here are some others that you could explore.

  The Manufactoria game is essentially about constructing a finite state machine that represents given rules. Some of the puzzles are quite tricky, and if students can solve them then they've understood FSAs well. (Hints: The conveyor belts are the transitions, the  B/R branches are the states with a transition out for blue or red. You can have conveyor belts that act as bridges). The game is available `here <http://pleasingfungus.com/#Manufactoria>`_ and `here <http://jayisgames.com/games/manufactoria/>`_.

  If you use the Java-based graphical educational system `Greenfoot <http://greenfoot.org/index.html>`_ as a programming environment, the `treasure hunt finite state automata exercise <http://greenroom.greenfoot.org/resources/5>`_ is based on the Treasure Island FSA activity from CS Unplugged. Teachers can register at the `Greenroom <http://greenroom.greenfoot.org/door>`_ resources area to download the software. Students can interact with the activity, without accessing source code, through: http://www.greenfoot.org/scenarios/1678 .

  If you use `Scratch <http://scratch.mit.edu/>`_, the following program is promising, but it doesn't have an activity or guide, and Level 3 students may have progressed beyond Scratch. It implements the Finite State Automata CS Unplugged activity in Scratch, and can be downloaded as part of a `zip file <http://code.google.com/p/scratch-unplugged/downloads/detail?name=scratch-unplugged-1-0.zip&can=2&q=>`_ of a full set of Unplugged activities. The `ReadMe.txt <http://code.google.com/p/scratch-unplugged/downloads/detail?name=readme.txt&can=2&q=>`_ file has some documentation. It was developed by `Mordechai (Moti) Ben-Ari <http://stwww.weizmann.ac.il/g-cs/benari/>`_ from the `Weizmann Institute of Science, Israel <http://www.weizmann.ac.il/>`_.

  If you need to make diagrams of FSAs, the JFLAP program can be used, or there's a program called graphviz which has many options for drawing this kind of diagram: http://www.graphviz.org/



.. Unused material:

.. TCB xJRM [non-urgent] are either of the following videos very helpful?
.. Making Things Interact (MTI) has several videos showing examples of implementing Finite State Machines in various ways
.. YouTube user tarbidian has Finite State Machines - 01 - Introduction illustrated with a good example using a State Transition Diagram Review earlier

.. TCB here's another online FSA simulator (by Mukund), which could be used as a model if we decide to do one in hmtl5
.. TCB can specify and run fsa at: http://www.cosc.canterbury.ac.nz/mukundan/thco/DFA.html
.. TCB this runs ok on Windows apparently, but is cutoff and doesn't quite work on Mac. 

.. an interesting presentation, but doesn't give much detail: http://mtifall09.wordpress.com/category/8-finite-state-machines/ 
.. has machines built by students as project e.g. trick or treat. Mainly just 3 simple states, most of work is in hardware.

.. TCB The following was useful, but it seems to be restricted access now: Merchant Taylors' School UK in its free course on Moodle aimed at AS Computing has an activity in Finite State Machines based on Kara. Their "Getting started with Kara" guide is useful, as the Kara manual is fairly brief. Seems to be gone now

.. exercise/example that wasn't used: for fsa language, transformation for complement (change accept states), reverse?

.. JRM  fsm intro video: http://www.youtube.com/watch?v=Obt3L1YBwlM It's quite clear in it's explanation, but don't know how well it will be received by younger audiences. It's quite long (15 minutes) but pretty standard presentation (powerpoint with hand drawing over top with narration). It was good for me, but don't know how good it is for children. If you watch the first two minutes, you get a good idea of the style. He starts from the basics and builds up at a nice steady pace, he uses 'bits' a lot which is good, but at the start he mentions 'clock pulse' and it took me a while to get it. There is a smaller error in the video, he has an annotation explaining it though. It's a pretty good video overall.

.. For the record, an early and still very readable, article about FSAs appears at the following 
.. site, but it would be distracting to link to it here: 
.. http://www.ccs3.lanl.gov/mega-math/workbk/machine/mabkgd.html

.. Mealy/Moore machines --- beyond scope?
.. If you've worked with binary numbers, see if you can figure out what this
.. FSA does (try each binary number as input: 0, 1, 10, 11, 100, 101, 110 etc.)
.. do with jflap
.. state input transition output
.. s0  0 s0 0
.. s0 1 s1 0
.. s1 0 s0 1
.. s1 1 s1 0
.. feed in binary number msb first -> subtract 3??

.. TCB here's another FSM simulator, but it's not such a nice interface, but might be more accessible http://courses.cs.vt.edu/~cs1104/FSM/FSM.Design.html




.. _fl-regex:

Regular expressions
=====================================================

.. only:: teachers or dev

.. note:: For teachers

  Regular expressions (regex for short) are closely related to FSAs, as we shall see. Much of the terminology that is needed was already covered in the previous section: we'll be using languages, :term:`alphabets`, strings, {math}\epsilon{math end} / {math}\lambda{math end}, and eventually finite state automata. So the previous section on FSAs needs to be covered before embarking on regular expressions.

  It may be that students have used regular expressions already, because they are built into many programming languages and are often used when writing script programs. We'll be looking briefly at such applications --- and they’re very relevant --- but in formal languages we're also interested in the limits of what can be represented, and how to convert a regex to an FSA. So there should be something here to get students thinking, even if they’re expert at programming with regexes.

.. only:: teachers or dev

 .. admonition:: For teachers

  If you have time, the following activity ("Reverse Pictionary") could be done either before or after teaching regular expressions. We recommend using it before, as it becomes a constructivist approach which encourages students to design their own notations for regular languages, and is a motivator for learning a precise notation.

  A useful activity to develop students' familiarity with FSAs and Regular expressions is a "Reverse Pictionary" game for finite state automata, developed by Linda Pettigrew. It uses the handout :download:`found here <_static/formal_languages/FL-reverse-pictionary-worksheet.pdf>` (or you can make up your own simple FSAs).

  Split the class into two groups, A and B. Hand out one copy of FSM-A to each pair of students in group A and FSM-B to pairs in group B. Each pair also requires a language sheet. They will only be writing in the top half of the sheet. Students now need to describe all the acceptable inputs for the given FSA (using whatever notation they can come up with, or regular expressions if they have already encountered them). When they are happy with their description (or five minutes is up) they write it out on the language sheet. Some suitable descriptions are as follows. We've used standard regex notation, but students might make up something different.

 .. code-block:: none

   FSM-A: bee*p(-bee*p)*  or  be*ep(-be*ep)*  or  be+p(-be+p)*
   FSM-B: cl(i|a)ck(-cl(i|a)ck)* 
   FSM-A: mee*o*w  or  me*eo*w  or  me+ow 
   FSM-B: squ((el)|(ir))ch(-squ((el)|(ir))ch)*

  The language sheets from both groups are then collected in. Sheets from group A are distributed to group B, and vice versa. The pairs now read the “language” description and fill in the bottom half of the language sheet with four [strings](glossary.html#strings) that the FSM will accept and four that it will not accept. Here the students are acting as “programmers”, trying to get the computer on the other side to perform a certain task.

  The language sheets are then collected in again, and those from group A distributed to group B and group B’s to group A. There is no need for pairs to get their original sheet back. The pairs are now “computers” and need to check that the input provided at the bottom of the language sheet conforms to the FSA. If one of the [strings](glossary.html#strings) is accepted or rejected incorrectly, groups will need to work out where the error came from.

  Followup discussion can review whether some descriptions were longer than they needed to be or confusing to understand, and whether the language of the machines were captured properly.


.. xtcb consider using http://www.debuggex.com/?re=(foo|bar)baz*&str=

We've already had a taste of regular expressions in the :ref:`fl-gettingstarted` section. They are just a simple way to search for things in the input, or to specify what kind of input will be accepted as legitimate. 
For example, many web scripting programs use them to check input for patterns like dates, email addresses and URLs. They've become so popular that they're now built into most programming languages.

.. only:: teachers or dev

 .. admonition:: For teachers

  Students can work through the following brief examples using Rubular, described below. Alternatively you may prefer to get them to use the excellent tutorial at http://regexone.com/. Both systems require online access. RegexOne provides challenges and tests answers in the same window. Students can get away with inefficient answers, but it's a good environment for playing with the idea:

  .. figure:: _static/formal_languages/FL-regex-regexone-fullscreen.png
   :alt: An incomplete train map

.. tcb if above image is too big, there's a smaller part of the image at FL-regex-regexone-example.png

.. TCB RegexOne was made by http://stackoverflow.com/users/77340/wchung, see his blog at 
.. http://mesopixel.com/article/learning-regular-expressions-from-experimentation
.. Rubular is by Michael Lovitt (http://lovitt.net), and has a Google group: http://groups.google.com/group/rubular , plus accepts donations

.. Here's an alternative to Rubular in case there are problems: http://pcreck.com

.. html5 sometime we could consider having something like http://rubular.com/ or regexOne built in to the system, rather than have the links below, but wait and see how tricky it is for schools to use them externally


You might already have a suspicion that regular expressions are related to finite state automata. And you'd be right, because it turns out that every :term:`regular expression` has a [Finite State Automaton](glossary.html#Finite State Automaton) that can check for matches, and every [Finite State Automaton](glossary.html#Finite State Automaton) can be converted to a :term:`regular expression` that shows exactly what it does (and doesn’t) match. 
Regular expressions are usually easier for humans to read. For machines, a computer program can convert any regular expression to an FSA, and then the computer can follow very simple rules to check the input.

.. TCB Rubular also had a feature where you can pass the data in the URL (http://rubular.com/?regex=ham&test=hamsandwich), but it's currently broken (3 Nov 2012) 
.. info at https://groups.google.com/forum/?fromgroups=#!topic/rubular/VnoDwLRFQB0
.. The permalink is probably better, but this might become an option too
 
The simplest kind of matching is just entering some text to match. Open a new window to the "Rubular" system (a screenshot is shown below) by clicking on the following challenge:
 
.. only:: html or epub

 .. raw:: html

  <a href="http://rubular.com/r/vCD1OSfjAc" target="_blank">Open Rubular using this link and type the text "cat" into the box labeled "Your regular expression" </a>


.. only:: html or epub

 .. raw:: html

  <div align="center"><iframe width="810" height="630" src="_static/widgets/FL/FL-Regex/RegexTxt.html" frameborder="0">Your browser does not support iframes. Please contact the computer's administrator and upgrade <a href="http://browsehappy.com/"> to a modern browser</a> (like Google Chrome) to enable all functionality of this online textbook.</iframe></div>

 .. figure:: _static/formal_languages/FL-regex-rubular-cat1.png
  :alt: Entering ab\*a into JFLAP

.. TCB Here is the material that is in the two Rubulator permalinks:

.. The fat cat sat on the mat.
.. The vindication was catastrophic.
.. The bilocation of the cataract required certification.
.. The 42 buffalo baffled them with a pfffffffft sound.
.. Pennsylvania 6-5000.
.. Assorted exhalations: pfft pffft pft.
.. Was that a match or was it not?

.. meeeeeeeow
.. meoooooooooooow

.. woof
.. mew
.. cluck


.. Contact me at spam@mymail.com or on 555-1234
.. FFE962
.. Details: fred@cheapmail.org.nz (03) 987-6543
.. Looking forward to 21 Oct 2015
.. Good old 5 Nov 1955
.. Back in 2 Sep 1885 is the earliest date
.. ABC123
.. Let's buy another 2 Mac 9012 systems @ $2000 each.

If you've only typed the 3 characters "cat", then it should find 6 matches.

Now try typing a dot (full stop or period) as the fourth character: "cat.". In a regular expression, "." can match any single character. Try adding more dots before and after "cat". How about "cat.s" or "cat..n"?

What do you get if you search for " ... " (three dots with a space before and after)?

Now try searching for "ic.". The "." matches any letter, but if you really wanted a full stop, you need to write it like this "ic\\." --- use this search to find "ic" at the end of a sentence.

Another special symbol is "\\d", which matches any digit. Try matching 2, 3 or 4 digits in a row (for example, two digits in a row is "\\d\\d").

To choose from a small set of characters, try "[ua]ff". Either of the characters in the square brackets will match. Try writing a :term:`regular expression` that will match "fat", "sat" and "mat", but not "cat".


.. only:: teachers or dev

 .. note:: **For teachers**

 A suitable expression is [fsm]at

A shortcut for "[mnopqrs]" is "[m-s]"; try "[m-s]at" and "[4-6]".

Another useful shortcut is being able to match repeated letters. There are four common rules:

- a* matches 0 or more repetitions of a
- a+ matches 1 or more repetitions of a
- a? matches 0 or 1 occurrences of a (that is, a is optional)
- a{5} matches "aaaaa" (that is, a repeated 5 times)

Try experimenting with these. Here are some examples to try:

.. code-block:: none

 f+
 pf*t
 af*
 f*t
 f{5}
 .{5}n

If you want to choose between options, the vertical bar is useful. Try the following, and work out what they match. You can type extra text into the test [string](glossary.html#string) area if you want to experiment:

.. code-block:: none

 was|that|hat
 was|t?hat
 th(at|e) cat
 [Tt]h(at|e) [fc]at
 (ff)+
 f(ff)+

Notice the use of brackets to group parts of the regular expression. It's useful if you want the "+" or "*" to apply to more than one character.


.. container:: jargon-buster

 **Jargon Buster**

 The name :term:`Regular Expression` is sometimes abbreviated to "regex", "regexp", or "RE".  It's "regular" because it can be used to define sets of strings from a very simple class of languages called "regular languages", and it's an "expression" because it is a combination of symbols that follow some rules.

`Click here for another challenge: you should try to write a short regular expression to match the first two words, but not the last three <http://rubular.com/r/AdmyZ5aPtD>`_.

.. only:: teachers or dev

 .. admonition:: For teachers

  "me+o+w" is a good solution. 

Of course, regular expressions are mainly used for more serious purposes. Click on the following challenge to get some new text to search:

`Open this challenge in Rubular and try the following expressions <http://rubular.com/r/kun5ZaJqlL>`_.

The following :term:`regular expression` will find comon NZ number plates in the sample text, but can you find a shorter version using the {n} notation?

.. code-block:: none

 [A-Z][A-Z][A-Z]\d\d\d

.. only:: teachers or dev

 .. admonition:: For teachers

  "[A-Z]{3}\\d{3}"

How about an expression to find the dates in the text? Here's one option, but it's not perfect:

.. code-block:: none

 \d [A-Z][a-z][a-z] \d\d\d\d

Can you improve on it? 

.. only:: teachers or dev

 .. admonition:: For teachers

  The expression "\\d\\d? (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \\d\\d\\d\\d" is more accurate, but a more sophisticated version would be used in practice to take account of various formats.

What about phone numbers? You'll need to think about what variations of phone numbers are common!
How about finding email addresses?

.. only:: teachers or dev

 .. admonition:: For teachers

  Here are two fairly simple solutions for email addresses, but more refined ones are possible:
  - \\w+@\w+\\.\\w+   only finds email address with two parts to the domain
  - \\w+@\\w+(\\.\\w+)* matches more parts of the domain.

.. figure:: _static/formal_languages/FL-xkcd-regular-expressions.png
 :alt: xkcd comment on regular expressions
 :target: http://xkcd.com/208/

 Regular expressions are useful!

The particular form of :term:`regular expression` that we've been using is for the Ruby programming language (a popular language for web site development), although it's very similar to regular expressions used in other languages including Java, JavaScript, PHP, Python, and Microsoft's .NET Framework. Even some spreadsheets have :term:`regular expression` matching facilities.

.. TCB for the record, Google docs does. Excel has it, but it's really VB.

But regular expressions have their limits --- for example, you won't be able to create one that can match palindromes (words and phrases that are the same backwards as forwards, such as "kayak", "rotator" and "hannah"), and you can't use one to detect [strings](glossary.html#strings) that consist of *n* repeats of the letter "a" followed by *n* repeats of the letter "b". We'll look at other systems for doing that in the section on :term:`grammars`. But nevertheless, regular expressions are very useful for a lot of common :term:`pattern matching` requirements.

.. xTCB curiosity: idea comes from Kleene (add some personal information, dates)

Regular expressions and FSAs
--------------------------------------------------

There's a direct relationship between regular expressions and FSAs. For example, consider the following regex, which matches [strings](glossary.html#strings) that begin with an even number of the letter "a" and end with an even number of the letter "b":

.. code-block:: none

 (aa)+(bb)+

Now look at how the following FSA works on these [strings](glossary.html#strings) --- you could try "aabb", "aaaabb", "aaaaaabbbb", and also see what happens for [strings](glossary.html#strings) like "aaabb", "aa", "aabbb", and so on.

.. figure:: _static/formal_languages/FL-re-fsa-aabb-trap.png
 :alt: an FSA for (aa)+(bb)+

You may have noticed that q2 is a "trap state". We can achieve the same effect with the following FSA, where all the transitions to the trap state have been removed --- the FSA can reject the input as soon as a non-existent transition is needed.

.. figure:: _static/formal_languages/FL-re-fsa-aabb.png
 :alt: an FSA for (aa)+(bb)+

Like an FSA, each :term:`regular expression` represents a :term:`language`, which is just the set of all [strings](glossary.html#strings) that match the regular expression. 
In the example above, the shortest [string](glossary.html#string) in the language is "aabb", then there's "aaaabb" and "aabbbb", and of course an infinite number more. 
There's also an infinite number of [strings](glossary.html#strings) that *aren't* in this language, like "a", "aaa", "aaaaaa" and so on.

In the above example, the FSA is a really easy way to check for the :term:`regular expression` --- you can write a very fast and small program to implement it (in fact, it's a good exercise: you typically have an array or list with an entry for each state, and each entry tells you which state to go to next on each character, plus whether or not it's a final state. At each step the program just looks up which state to go to next.)

Fortunately, *every* :term:`regular expression` can be converted to an FSA. We won't look at the process here, but both Exorciser and JFLAP can do it for you anyway (see the activities below).

This is also built into most programming languages.
Programmers usually use regular expressions by calling functions or methods that are passed the regex and the [string](glossary.html#string) to be searched. But behind the scenes, the :term:`regular expression` is converted to a finite state automaton, and then the job of checking your :term:`regular expression` is very easy.


Activity: designing regular expressions
-----------------------------------------------------------

.. only:: teachers or dev

 .. admonition:: For teachers

  This activity almost has enough depth for the 3.44 standard, although it may be difficult to use it for excellence. It covers material for an example for the 3.44 standard through the following components:

  - Key problem: matching input text
  - Practical application: compilers, web site input fields
  - Algorithm/technique: regular expressions
  - Evaluation: this is required for excellence, and it's hard to see how to do a reasonable evaluation; however, an in-depth reflection on the  design may be suitable if done well
  - Personalised student examples: choice of regular expression to use as an example


Here are some ideas for regular expressions for you to try to create. You can check them using `Rubular <http://rubular.com/>`_ as we did earlier, but you'll need to make up your own text to check.
When testing your expressions, make sure that they not only accept correct strings, but reject ones that don't match, even if there's just one character missing.

You may find it easier to have one test match [string](glossary.html#string) per line in "Your test string".
You can force your :term:`regular expression` to match a whole line by putting "^" (start of line) before the regular expression, and "$" (end of line) after it. For example, "^a+$" only matches lines that have nothing but "a"s on them.

Here are some challenges to try to create regular expressions for:

- local forms of non-personalised number plates (e.g. AB1234 or ABC123 in New Zealand)
- any extended form of the word "hello", e.g. "helloooooooooooo"
- variants of "aaaarrrrrgggggghhhh"
- a 24-hour clock time (e.g. 23:00) or a 12-hour time (e.g. 11:55 pm)
- a bank account or credit card number
- a credit card expiry date (must have 4 digits e.g 01/15)
- a password that must contain at least 2 digits
- a date
- a phone number (choose your format e.g. mobile only, national numbers, or international)
- a dollar amount typed into a banking website, which should accept various formats like "$21.43", "$21", "21.43", and "$5,000", but not "21$", "21.5", "5,0000.00", and "300$".
- acceptable identifiers in your programming language (usually something like a letter followed by a combination of letters, digits and some punctuation symbols)
- an integer in your programming language (allow for + and - at the front, and some languages allow suffixes like L, or prefixes like 0x)
- an IP address (e.g. 172.16.5.2  or 172.168.10.10:8080)
- a MAC address for a device (e.g. e1:ce:8f:2a:0a:ba)
- postal codes for several countries e.g. NZ: 8041, Canada: T2N 1N4, US: 90210
- a (limited) http URL, such as "http://abc.xyz", "http://abc.xyz#conclusion", "http://abc.xyz?search=fgh".


.. xTCB give answers for above for teachers


Project: converting Regular Expressions to FSAs 
-----------------------------------------------------------------------------------------


.. only:: teachers or dev

 .. admonition:: For teachers

  This project covers material for an example for the 3.44 standard through the following components:

  - Key problem: checking computer input for meeting rules of a formal language
  - Practical application: compilers, web site input fields
  - Algorithm/technique: regular expressions and FSAs
  - Evaluation: the number of states in the FSA, the way the FSA reflects the meaning of the regular expression
  - Personalised student examples: choice of regular expression to use as an example

  This project, if done with enough reflection, has sufficient depth to meet the requirements of AS 3.44. The essence of it is to write Regular Expressions, and have them converted to an FSA by software, then demonstrate how [strings](glossary.html#strings) are processed using the FSA.
  Students can make up their own regular expressions, which will make each project unique.

  The conversion of a :term:`regular expression` to an FSA can either be done by `Exorciser <http://www.swisseduc.ch/compscience/exorciser/index.html>`_ or `JFLAP <http://jflap.org>`_. Both are suitable; Exorciser is very simple to use, but is intended for throw-away exercises, so students can't save their work and would have to record their inputs and/or take screenshots, and start from scratch if they need to get back to it. JFLAP requires extra steps to do the conversion and can be a little quirky to use, but all work can be saved, and images can be saved without having to make a screenshot. Also, it can be used for the work in the section on grammars.
  Information about both the Exorciser and JFLAP software is given in teacher notes for the projects in the previous section. 

  For Exorciser, the conversion is intended as an exercise for the student, but that's way beyond the scope of this chapter. However, if you just ask for the solution, it will do the conversion for you, which is what we need.

  For JFLAP, there is a tutorial on the `program's website <http://www.jflap.org/tutorial/>` and more information in the :ref:`fl-regex` section.

  If students stick to the instructions given they will be able to use it to create their own FSA from a regular expression. 

  The important part of the project is for the student to come up with their own regular expressions, and to demonstrate and discuss how that expression is checked by the FSA. An evaluation of the FSA would involve describing the purpose of a variety of nodes and transitions (e.g. "the loop back to node q1 on a corresponds to a* in the regular expression, because no matter how many a's occur, you'll always stay at state q1.)

  Note that the symbols used in JFLAP are slightly different to some of the other notations we've used; the main difference is using "+" instead of "|", which could be confusing since "+" normally means "one or more". Also, it's not possible to specify a range, so instead of "[a-d]" you need to type "a+b+c+d" in JFLAP.

  Here are some ideas for the types of :term:`regular expression` to try: aa*, a+ab+abc+abcd [these create a predictable FSA as a warmup] ; (b(aa)*)* [strings where 'a' only appears as a pair]  ; b*(ab*a)b * [strings where there are an even number of 'a's]. As well as these artificial examples, they could explore regular expressions such as (using non-JFLAP notation) [a-zA-Z][a-zA-Z0-9]*, which checks for identifiers that start with a letter followed any combination of letters and digits.

.. xTCB Long term it would be nice to have a converter built into the book page. The following provides Python code for RE to FS conversion http://osteele.com/software/python/fsa/ , but something based on JFLAP or Exorciser would be easier.

.. xTCB better evaluation would be speed of implementations of FSA? http://swtch.com/~rsc/regexp/ gives examples of really good and bad implementations, and tricky RegExs to test them.

.. xTCB more ideas here: http://www.drdobbs.com/architecture-and-design/regular-expressions/184410904

For this project you will make up a regular expression, convert it to an FSA, and demonstrate how some [strings](glossary.html#strings) are processed. 

There's one trick you'll need to know: the software we're using doesn't have all the notations we've been using above, which are common in programming languages, but not used so much in pure formal language theory. In fact, the only ones available are:

- `a*` matches 0 or more repetitions of a
- `a|b` matches a or b
- `(aa|bb)*` Parentheses group commands together; in this case it gives a mixture of pairs of "a"s and pairs of "b"s.

Having only these three notations isn't too much of a problem, as you can get all the other notations using them.
For example, "a+" is the same as "aa*", and "\\d" is "0|1|2|3|4|5|67|8|9". It's a bit more tedious, but we'll mainly use exercises that only use a few characters.

Converting with Exorciser
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use this section if you're using Exorciser; if you're using JFLAP then skip to `Converting with JFLAP`~.

Exorciser is very simple. In fact, unless you change the default settings, it can only convert regular expressions using two characters: "a" and "b". But even that's enough (in fact, in theory any input can be represented with two characters --- that's what binary numbers are about!)

On the plus side, Exorciser has the empty [string](glossary.html#string) symbol available --- if you type "e" it will be converted to {math}\epsilon{math end}.
So, for example, "(a| {math}\epsilon{math end})" means an optional "a" in the input.

To do this project using Exorciser, go to the start ("home") window, and select the second link, "Regular Expression to Finite Automata Conversion".
Now type your :term:`regular expression` into the text entry box that starts with "R =".

As a warmup, try:

.. code-block:: none

 aabb

then click on "solve exercise" (this is a shortcut --- the software is intended for students to create their own FSA, but that's beyond what we're doing in this chapter).

You should get a very simple FSA!

To test your FSA, right-click on the background and choose "Track input".

Now try some more complex regular expressions, such as the following. For each one, type it in, click on "solve exercise", and then track some sample inputs to see how it accepts and rejects different strings.

.. code-block:: none

 aa*b
 a(bb)*
 (bba*)*
 (b*a)*a

Your project report should show the regular expressions, explain what kind of [strings](glossary.html#strings) they match, show the corresponding FSAs, show the sequence of states that some sample test [strings](glossary.html#strings) would go through, and you should explain how the components of the FSA correspond the parts of the :term:`regular expression` using examples.


Converting with JFLAP
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you're using `JFLAP <http://www.jflap.org>`_ for your project, you can have almost any character as input. 
The main exceptions are "*", "+" (confusingly, the "+" is used instead of "|" for alternatives), and "!" (which is the empty [string](glossary.html#string) --- in the preferences you can choose if it is shown as {math}\lambda{math end} or {math}\epsilon{math end}).

So the main operators available in JFLAP are:

- `a*` matches 0 or more repetitions of a
- `a+b` matches a or b
- `(aa+bb)*` Parentheses group commands together; in this case it gives a mixture of pairs of "a"s and pairs of "b"s.

The JFLAP software can work with all sorts of formal languages, so you'll need to ignore a lot of the options that it offers! This section will guide you through exactly what to do.

There are some details about the format that JFLAP uses for regular expressions in the following tutorial --- just read the "Definition" and "Creating a regular expression" sections.

http://www.jflap.org/tutorial/regular/index.html

As a warmup, we'll convert this regex to an FSA:

.. code-block:: none

 ab*b

On the main control window of JFLAP click on "Regular Expression", and type your :term:`regular expression` into JFLAP: 

.. figure:: _static/formal_languages/FL-ab-star-a-regex.png
 :alt: Entering ab\*a into JFLAP

.. TCB details on conversion are at: http://www.jflap.org/tutorial/fa/createfa/fa.html

From the "Convert" menu choose "Convert to NFA". 
This will only start the conversion; press the "Do all" button to complete it (the system is designed to show all the steps of the conversion, but we just want the final result).
For the example, we get the following non-deterministic finite automaton (NFA), which isn't quite what we want and probably looks rather messy:

.. figure:: _static/formal_languages/FL-ab-star-a-nfa.png
 :alt: The NFA produced (messy intermediate version of the FSA)

We need a DFA (deterministic FA), not an NFA.
To convert the NFA to a DFA, press the "Export" button, then from the "Convert" menu, choose "Convert to DFA", press the "Complete" button to complete the conversion, and then the "Done?" button, which will put it in a new window:

.. figure:: _static/formal_languages/FL-ab-star-a-dfa.png
 :alt: After conversion to a DFA

We're nearly there. If it's hard to read the FSA, you can move states around by choosing the arrow tool (on the left of the tool bar --- if the states won't move when you grab them, so make sure you click on the arrow icon before trying to move them). The states may have some extraneous labels underneath them; you can hide those by selecting the arrow tool, right-click on the white part of the window and un-check "Display State Labels".

.. figure:: _static/formal_languages/FL-ab-star-a-dfa-tidy.png
 :alt: After tidying up the DFA

If the FSA is simple enough, it may be just as easy if you now copy the diagram by hand and try to set it out tidily yourself, otherwise you can save it as an image to put into your project.

.. xTCB need to say this here? You'll need to click the "Done" button to finish the conversion.

Now try some sample inputs. The starting state is labeled q0 and will have a large arrow pointing at it. You can get JFLAP to run through some input for you by using the "Input" menu. "Step by state" will follow your input state by state, "Fast run" will show the sequence of states visited for your input, and "Multiple run" allows you to load a list of [strings](glossary.html#strings) to test.

Multiple runs are good for showing lots of tests on your regular expression:

.. figure:: _static/formal_languages/FL-ab-star-a-dfa-tidy-multiple-test.png
 :alt: After tidying up the DFA

For example, "ab" is rejected because it would only get to state 2.

Now you should come up with your own regular expressions that test out interesting patterns, and generate FSA's for them.
In JFLAP you can create FSAs for some of regular expressions we used earlier, such as (simple) dates, email addresses or URLs.

Your project report should show the regular expressions, explain what kind of [strings](glossary.html#strings) they match, show the corresponding FSAs, show the sequence of states that some sample test [strings](glossary.html#strings) would go through, and you should explain how the components of the FSA correspond to the parts of the :term:`regular expression` using examples.

.. regex-projects

Other ideas for projects and activities
----------------------------------------------------------------------------------

Here are some more ideas that you could use to investigate regular expressions:

- On the `regexdict site <http://www.visca.com/regexdict/>`_, read the instructions on the kinds of :term:`pattern matching` it can do, and write regular expressions for finding words such as:

 - words that contain "aa"
 - all words with 3 letters
 - all words with 8 letters
 - all words with more than 8 letters
 - words that include the letters of your name
 - words that are made up *only* of the letters in your name
 - words that contain all the vowels in reverse order
 - words that you can make using only the notes on a piano (i.e the letters A to G and a to g)
 - words that are exceptions to the rule "i before e except after c" --- make sure you find words like "forfeit" as well as "science".


.. only:: teachers or dev

 .. admonition:: For teachers

  For the "i before e" problem, there are two kinds of exception to find, places where "c" is followed by "ie" (easy), and places where a character that isn't "c" is followed by ei.   

  More guidance for the above suggestions will be provided eventually.

.. xtcb provide more guidance above

- Microsoft Word’s *Find* command uses regular expressions if you select the "Use wildcards" option. For more details see `Graham Mayor <http://word.mvps.org/AboutMVPs/graham_mayor.htm>`_'s `Finding and Replacing Characters using Wildcards <http://word.mvps.org/FAQs/General/UsingWildcards.htm>`_.

- Explore regular expressions in spreadsheets. The Google docs spreadsheet has a function called RegExMatch, RegExExtract and RegExReplace. In Excel they are available via Visual Basic.

- Knitting patterns are a form of regular expression. If you're interested in knitting, you could look into how they are related through the `article about knitting and regular expressions at CS4FN site <http://www.cs4fn.org/regularexpressions/knitters.php>`_.

- The Chesapeake NetCraftsmen site provides `a system for practising writing regular expressions <http://www.netcraftsmen.net/presos/Regex_Practice/player.html>`_.

- The "grep" command is available in many command line systems, and matches a :term:`regular expression` in the command with lines in an input file. (the name comes from "Global Regular Expression Parser"). Demonstrate the grep command for various regular expressions.

- Functions for matching against regular expressions appear in most programming languages. If your favourite language has this feature, you could demonstrate how it works using sample regular expressions and strings.

- Advanced: The free tools *lex* and *flex* are able to take specifications for regular expressions and create programs that parse input according to the rules. They are commonly used as a front end to a compiler, and the input is a program that is being compiled. You could investigate these tools and demonstrate a simple implementation.

.. TCB xJRM [non-urgent, and probably not likely to be successful] Are there similar patterns for flax weaving to add to the knitting patterns above? I can't open sites that should have them; for example, are there patterns here? www.alibrown.co.nz/instructions.html These might be more relevant/interesting



.. only:: teachers or dev

 .. admonition:: For teachers - extra resources

  There is a wealth of information on regexes at: http://www.regular-expressions.info/

  `Regex Coach <http://weitz.de/regex-coach/>`_ is a graphical application for Windows that can be used to experiment with regular expressions interactively.

  Other sites for experimenting with regular expressions include:

  - http://regexpal.com/ (matches while typing)
  - http://www.regexplanet.com/advanced/javascript/index.html (has variations of regexes for multiple programming languages)
  - http://www.txt2re.com/ --- you type in a sample text and it tries to suggest a regex!
  - http://www.regextester.com/
  - http://www.pyweek.org/e/RegExExpress/ 
  - https://regexhero.net/  (may have a fee)
  - http://www.brics.dk/automaton/
  - http://www.regular-expressions.info/javascriptexample.html



.. _fl-grammar:

Grammars and parsing
=====================================================

.. warning:: this section hasn't been written yet; the material below is just an introduction

.. only:: teachers or dev

 .. admonition:: For teachers

  The material prior to this section is sufficient for what is required for the NZ 3.44 standard, but for interested students this section provides something different that is accessible at high school level.

  Currently the section is only introductory, and we've left it here in case you have keen students who might want some extra material to investigate.

  There's an introduction to this topic (which dwells more on English grammar) at: http://ozark.hendrix.edu/~burch/cs/150/reading/grammar/index.html. This could be used for class discussion.

  As preparation for reading this chapter, you could do the "planet ABBA" activity with the students as a class, as it will get them familiar with the notation.

.. xtcb either a card game where you can substitute using :term:`grammar` rules (given a string, try to apply :term:`grammar` from bottom up --- replace sequence with terminal, backtracking allowed i.e. replace terminal again - use images instead of a/b? images could be apple/banana, maybe parentheses?), or a html5 where you have to solve a puzzle (rules to get to a given string)

.. xtcb http://cs.jhu.edu/~jason/papers/#eisner-smith-2008-tnlp may be useful (competitive grammar writing)

.. Near start: teacher: Planet ABBA, money :term:`grammar` and silly sentences activity, from http://www.mathmaniacs.org/lessons/06-grammars/index.html, with worksheets added:
.. http://www.cosc.canterbury.ac.nz/tim.bell/dt/fg-images/FL-grammars-mathmaniacs.pdf
.. Gets students thinking about basics of grammars.


With unusual :term:`grammar` Yoda from Star Wars speaks.
Yet still understand him, people can.
The flexibility of the rules of English :term:`grammar` mean that you can usually be understood if you don't get it quite right, but it also means that the rules get very complicated and difficult to apply.

Grammars in formal languages are much more predictable than grammars in human languages --- that's why they're called formal languages!
When you're doing English, :term:`grammar` can be a tricky topic because not only are there are so many rules, but there are also so many exceptions --- for example, you need an apostrophe if you write "the computer's USB port", but you have to leave it out if you say "its USB port".
Grammars in computer science are mainly used to specify programming languages and file formats, and compilers make a fuss even if you leave out just one bracket or comma!
But at least they're predictable.


.. Starting example - only one or two [strings](glossary.html#strings) in language? Planet ABBA ? use simple english grammar? 

In this section we'll look at the kind of grammars that are widely used in computer science.
They are very powerful because they allow a complicated system (like a compiler or a format like HTML) to be specified in a very concise way, and there are programs that will automatically take the :term:`grammar` and build the system for you.
The grammars for conventional programming languages are a bit too unwieldy to use as initial examples (they usually take a few pages to write out), so we're going to work with some small examples here, including parts of the grammars for programming languages. 


Note: the remainder of this section will be developed during 2013.

.. TCB to keep things tidy, raw material has been moved to https://docs.google.com/document/d/1GvMxAGAso8cD5n-tuzJsGgPSQDWmKLuAAWrSFZw4Xbo/edit

Project ideas
------------------------------------------------------------

(Note that these will make more sense when the previous introduction to grammars has been completed!)

.. only:: teachers or dev

 .. admonition:: For teachers

  Note that the projects given earlier (on regular expressions and FSAs) are a good match for the NZ 3.44 standard. The following projects are more advanced than what is required, but would be suitable for students who wish to extend their knowledge in this area

- Demonstrate how compilers, interpreters, parsers or validators find errors in formal languages e.g. introduce an error to a compiled program, XML document file or web page, and show the effect of the error.

- Find a :term:`grammar` for a programming language, and show how a sample program would be parsed using the grammar.

- Use examples to show the :term:`parse tree` (or :term:`syntax` tree) for a correct and incorrect program fragment, or to show a sequence of :term:`grammar` productions to construct a correct program fragment

- Explore the :term:`grammar` for balanced parentheses S -> SS, S -> (S), S -> ( )

- Find a :term:`grammar` for a simple arithmetic expression in a programming language, and show the :term:`parse tree` for sample expressions (such as (a+b)*(c-d) ).

Projects: Grammars in art and music
------------------------------------------------------------

.. figure:: _static/formal_languages/FL-context-free-tree.png
 :alt: A tree drawn using the software from contextfreeart.org

The *context free art* program ( http://www.contextfreeart.org/ ) enables you to specify images using a context-free grammar. For example, the following pictures of trees are defined by just a few rules that are based around a forest being made of trees, a tree being made of branches, and the branches in turn being made of branches themselves! These simple definitions can create images with huge amounts of detail because the drawing process can break down the :term:`grammar` into as many levels as required. You can define your own grammars to generate images, and even make a movie of them being created, like the one below. Of course, if you do this as a project make sure you understand how the system works and can explain the formal language behind your creation.



.. only:: html or epub

 .. raw:: html

  <div class="video-container"><iframe src="http://player.vimeo.com/video/52320658" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>


.. TCB the above context-free-tree video was generated from the context-free program --- you can control the frame rate etc. if a different version is needed. It is just "demo1" in the program. Music is from a song by Andrew Bell

The JFLAP program that we have been using also has a feature for rendering "L-systems" (http://en.wikipedia.org/wiki/L-system), which are another way to use grammars to create structured images.
You'll need to read about how they work in the JFLAP tutorial (www.jflap.org/tutorial/index.html), and there's a more detailed tutorial at http://www.cs.duke.edu/csed/pltl/exercises/lessons/20/L-system.zip.
There are some sample files here to get you inspired: (the ones starting "ex10..." www.cs.duke.edu/csed/jflap/jflapbook/files/ )
and here's an example of the kind of image that can be produced:


.. figure:: _static/formal_languages/FL-ex10-tree-thick-fall-leaves.png
 :alt: A tree drawn using L-systems in JFLAP

 A tree drawn using L-systems in JFLAP


There's also an online system for generating images with L-systems: http://www.kevs3d.co.uk/dev/lsystems/

.. These kinds of images are examples of fractals, which are structures where xxxx in nature: http://paulbourke.net/fractals/googleearth/

..  TCB give link to music :term:`grammar` (info from David Bainbridge below)
.. Grammars have been defined for *music notation* [give link]. 

Grammars have been used for music notation:

.. todo: xTCB need to investigate these.

.. some info at http://www.springerlink.com/content/c235877773143671/

- The following is the BNF :term:`grammar` for the ABC music format: http://www.norbeck.nu/abc/bnf/abc20bnf.htm
- http://abc.sourceforge.net/
- https://meta.wikimedia.org/wiki/Music_markup
- http://www.emergentmusics.org/theory/15-implementation
- analyse a simple piece of music in terms of a formal grammar.

.. Even that, though, could be a bit intimidating. On the plus side, there's software and related .. resources out there to download and mess around with .. The following has a simpler set of rules in it that I think are easier to digest:
.. https://meta.wikimedia.org/wiki/Music_markup
.. and (I think) is a nice motivating example -- something that will let people writing Wikipedia pages concisely include music in the content they are authoring
.. I also stumbled across the following, which might be of interest:
.. http://www.emergentmusics.org/theory/15-implementation

.. _fl-wholestory:

The whole story!
=====================================================

.. TCB In this section we explain where the material above has oversimplified things, and if there are any well-known concepts or techniques that have been deliberately left out because they are too complex for this age group. This may include things that require advanced maths, advanced programming, or things where students have seen the problem but not a thorough solution. Or even simpler concepts that could have gone in, but we didn't want to make the chapter overwhelmingly long.


.. only:: teachers or dev

 .. admonition:: For teachers

  In this section we provide some pointers to advanced material on formal languages, which are beyond the scope of this chapter.
  We wouldn't expect students to tackle the topics below, but there might be one or two who find the field interesting and want some pointers on where to look further, plus we want to make it clear that the chapter is only the beginning of what is a very rich part of computer science.

If you found the material in this chapter interesting, here are some topics that you might want to look into further, as we've only just scratched the surface of what can be done with formal languages.

Formal languages come up in various areas of computer science, and provide invaluable tools for the computer scientist to reduce incredibly complex systems to a small description, and conversely to create very complex systems from a few simple rules.
They are essential for writing compilers, and so are activated every time someone writes a program! They are also associated with automata theory and questions relating to computability, and are used to some extent in natural language processing, where computers try to make sense of human languages.

Technically the kind of finite state automata (FSA) that we used in `Finite state automata`_ section is a kind known as a *Deterministic Finite Automata* (DFA), because the decision about which transition to take is unambiguous at each step. Sometimes it's referred to as a *Finite State Acceptor* because it accepts and rejects input depending on whether it gets to the final state. There are all sorts of variants that we didn't mention, including the Mealy and Moore machines (which produce an output for each each transition taken or state reached), the nested state machine (where each state can be an FSA itself), the non-deterministic finite automata (which can have the same label on more than one transition out of a state), and the lambda-NFA (which can include transitions on the empty string, {math}\lambda{math end}). Believe it or not, all these variations are essentially equivalent, and you can convert from one to the other. They are used in a wide range of practical situations to design systems for processing input. 

However, there are also more complex models of computation such as the push-down automaton (PDA) which is able to follow the rules of context-free grammars, and the most general model of computation which is called a Turing machine. These models are increasingly complicated and abstract, and structures like the Turing machine aren't used as physical devices (except for fun), but as a tool for reasoning about the limits on what can be computed.

.. xtcb reword above; every digital computer is a kind of limited turing machine

.. TCB  if we decide to cover non deterministic automata - could use a humorous approach - e.g. train route is semi-random, or several passengers try out all routes?

The Turing machine is named after Alan Turing, who worked on these concepts in the early 20th century (that's the same person from whom we got the Turing test in AI, which is something quite different --- Turing's work comes up in many areas of computer science!) If you want to investigate the idea of a Turing machine and you like chocolate, there's `an activity on the cs4fn site <http://www.cs4fn.org/turing/turingmachines.php>`_ that gives examples of how it works.
The Kara programming environment also has a `demonstration of Turing machines <http://www.swisseduc.ch/compscience/karatojava/turingkara/>`_

.. other languages

This chapter looked at two main kinds of formal language: the :term:`regular expression` (RE) and the context-free :term:`grammar` (CFG). These typify the kinds of languages that are widely used in compilers and file processing systems. Regular expressions are good for finding simple patterns in a file, like identifiers, keywords and numbers in a program, or tags in an HTML file, or dates and URLs in a web form. Context-free grammars are good when you have nested structures, for example, when an expression is made up of other expressions, or when an "if" statement includes a block of statements, which in turn could be "if" statements, ad infinitum. 
There are more powerful forms of grammars that exist, the most common being context-sensitive grammars and unrestricted grammars, which allow you to have more than one non-terminal on the left hand side of a production; for example, you could have xAy :math:`\(\to\)` aBb, which is more flexible but a lot harder to work with.
The relationships between the main kinds of grammars was described by the linguist Noam Chomsky, and is often called the :term:`Chomsky Hierarchy` after him.

There is a direct correspondence between the "machines" (such as the FSA) and languages (such as the Regular Expression), as each increasingly complex language needs the correspondingly complex machine to process it. 
For example, an FSA can be used to determine if the input matches a given Regular Expression, but a PDA is needed to match a [string](glossary.html#string) to a CFG.
The study of formal languages looks at these relationships, and comes up with ways to create the appropriate machines for a given language and vice versa.

There are many tools available that will read in the specification for a language and produce another program to parse the language; some common ones are called "Lex" and "Flex" (both perform lexical anaylsis of regular expressions), "Yacc" ("yet another compiler compiler") and "Bison" (an improved version of Yacc).
These systems make it relatively easy to make up your own programming language and construct a compiler for it, although they do demand quite a range of skills to get the whole thing working!

.. xTCB need to check on facts above about lex/flex/yacc/bison

So we've barely got started on what can be done with formal languages, but the intention of this chapter is to give you a taste of the kind of structures that computer scientists work with, and the powerful tools that have been created to make it possible to work with infinitely complex systems using small descriptions.

.. _fl-glossary:

Glossary
=====================================================

.. xjrm We could do this for other chapters eventually, if it seems useful, or otherwise remove this one!

Here's a list of the main terms and concepts that come up in this chapter.

[alphabet](glossary.html#alphabet)

[string](glossary.html#string)

[Finite State Automaton](glossary.html#Finite State Automaton)

:term:`Regular expression`

:term:`Pattern matching`

:term:`Lexical analysis`

:term:`Grammar`

:term:`Parsing`

:term:`Parse tree`

:term:`Syntax`

:term:`Syntax diagram`

:term:`Syntactically correct`

:term:`Chomsky hierarchy`

.. _fl-furtherreading:

Further reading
=====================================================

Some of the material in this chapter was inspired by http://www.ccs3.lanl.gov/mega-math/workbk/machine/malearn.html

There's a good article on finite state machines at
http://www.i-programmer.info/babbages-bag/223-finite-state-machines.html

Textbooks on formal languages will have considerably more advanced material and more mathematical rigour than could be expected at High School level, but for students who really want to read more, a popular book is
"Introduction to the Theory of Computation" by Michael Sipser.

Regular expressions and their relationship with FSAs is explained well in the book "Algorithms" by Robert Sedgewick.



Useful Links
---------------------------------------------------------------------------------------------------------------

- http://en.wikipedia.org/wiki/Formal_language
- http://en.wikipedia.org/wiki/Context-free_grammar#Examples
- http://en.wikipedia.org/wiki/Abstract_syntax_tree
- http://en.wikipedia.org/wiki/Regular_expression
- http://csunplugged.org/finite-state-automata
- http://www.i-programmer.info/babbages-bag/223-finite-state-machines.html
- http://www.jflap.org/
- http://en.wikipedia.org/wiki/Deterministic_finite_automaton
- http://en.wikipedia.org/wiki/Finite-state_machine

.. TCB the following is a concise summary of many of the concepts mentioned in this chapter; not directly useful for students, but kept as a comment as it could be useful for chapter authors: http://www.csee.umbc.edu/portal/help/theory/automata_def.shtml and http://www.csee.umbc.edu/portal/help/theory/lang_def.shtml


.. xTCB add some of the following if/when used in the :term:`grammar` section:
.. Formal Language, 
.. Syntax/Railroad Diagrams, 
.. Context-Free Grammar, 
.. Finite State Machines, 
.. Backus Naur Form (BNF), 
.. Regular Expression, 
.. Reverse Polish Notation (RPN) or 
.. Postfix Notation, Infix Notation, 
.. Shunting Yard Algorithm
.. State Diagram or State Transition Diagram (STD)
.. Mealy Machine, Moore Machine

.. See also: Parse Tree/Abstract Syntax Tree, 
.. Well-Formed Formula (WFF), 
.. Formal Semantics of Programming Languages
 

.. only:: dev
 
 .. _fl-brainstorming:
 
 Brainstorming
 ===============================================================

 - this is a place for things to consider for the chapter. They are moved from here into the chapter when they've been dealt with

.. TCB the following PhD thesis is about how to teach this material! repositories.lib.utexas.edu/bitstream/handle/2152/1054/weidmannpk032.pdf?sequence=2

.. TCB the following might have been useful, but seems to be broken;
.. seems to rely on a back-end server, so not ideal for us to recommend anyway: 
.. animation of re and fsa http://osteele.com/tools/reanimator/ 
