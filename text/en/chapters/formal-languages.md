# Formal Languages

{video url="https://www.youtube.com/embed/VnMGOSDkEx4"}

## What's the big picture?

{comment}
.. index:: Syntax error
{comment end}

If you've ever written a text-based program or typed a formula in a spreadsheet,
chances are that at some stage the system has told you there's an error and won't even attempt to follow your instructions.

{image filename="python-syntax-error.png" alt="A syntax error in the code x = (a+b) \*c+d) as the code is missing an open bracket"}

These "syntax errors" are annoying messages that programmers become excruciatingly familiar with ... it means that they didn't follow the rules somehow, even if it's just a tiny mistake. For example, suppose you intended to write:

```
x = (a+b)*(c+d)
```

but you accidentally left out one of the brackets:

```
x = (a+b)*c+d)
```

When you try to compile or run the program, the computer will tell you that there's an error. If it's really helpful, it might even suggest where the error is, but it won't run the program until you fix it.

This might seem annoying, but in fact by enforcing precision and attention to detail it helps pinpoint mistakes before they become bugs in the program that go undetected until someone using it complains that it's not working correctly.

Whenever you get errors like this, you're dealing with a *formal language*. Formal languages specify strict rules such as "all parentheses must be balanced", "all commands in the program must be keywords selected from a small set", or "the date must contain three numbers separated by dashes".

Formal languages aren't just used for programming languages --- they're used anywhere the format of some input is tightly specified, such as typing an email address into a web form.

In all these cases, the commands that you have typed (whether in Python, Scratch, Snap!, C, Pascal, Basic, C#, HTML, or XML) are being read by a computer program. (That's right... Python is a program that reads in Python programs.) In fact, the compiler for a programming language is often written in its own language. Most C compilers are written in C --- which begs the question, who wrote the first C compiler (and what if it had bugs)?! Computer Scientists have discovered good ways to write programs that process other programs, and a key ingredient is that you have to specify what is allowed in a program very precisely. That's where formal languages come in.

Many of the concepts we'll look at in this chapter are used in a variety of other situations: checking input to a web page; analysing user interfaces; searching text, particularly with “wild cards” that can match any sequence of characters; creating logic circuits; specifying communication protocols; and designing embedded systems.
Some advanced concepts in formal languages even used to explore limits of what can be computed.

Once you're familiar with the idea of formal languages, you'll possess a powerful tool for cutting complex systems down to size using an easily specified format.

{image filename="xkcd-tags.png" hover-text="<A>: Like </a>this." alt="A xkcd cartoon comment on HTML tags" source="https://xkcd.com/1144/"}

## Getting started

To give you a taste of what can be done, let's try searching for words that fit particular patterns.
Suppose you're looking for words that contain the name "tim", type the word "tim" (or a few letters from your name), then press the "Filter words" button to find all words containing "tim".

{interactive name="regular-expression-filter" type="in-page"}

That's a pretty simple search (though the results may have surprised you!).
But now we introduce the *wildcard* code, which in this case is "." ---  this is a widely used convention in formal languages.
This matches any character at all.
So now you can do a search like

```
tim.b
```

and you will get any words that have both "tim" and "b" with a single character --- any character --- in between. Are there any words that match "tim..b"? "tim...b"? You can specify any number of occurrences of a symbol by putting a '\*' after it (again a widely used convention), so:

```
tim.*b
```

will match any words where "tim" is followed by "b", separated by any number of characters --- including none.

Try the following search. What kind of words does it find?

```
x.*y.*z
```

{panel type="teacher-note" summary="Explanation of previous search"}

This code finds words that contain x, y and z in that order, but separated by 0 or more characters. There are 16 words is the data set which match this.

{panel end}

- Can you find words that contain your name, or your initials?
- What about words containing the letters from your name in the correct order?
- Are there any words that contain all the vowels in order (a, e, i, o, u)?

{panel type="teacher-note" summary="Vowels solution"}

To find words with all the vowels in order, the code is simply "a.\*e.\*i.\*o.\*u", there are 47 matches.

Students may ask how to do more complex searches, like letters in any order. If they are interested they can explore this on their own, but this is just a warmup exercise. We'll be covering this more carefully in the section on [regular expressions](chapters/formal-languages.html#regular-expressions).

{panel end}

The code you've used above is a part of a formal language called a "regular expression". Computer programs that accept typed input use regular expressions for checking items like dates, credit card numbers and product codes. They’re used extensively by programming language compilers and interpreters to make sense of the text that a programmer types in.
We'll look at them in more detail in the section on [regular expressions](chapters/formal-languages.html#regular-expressions).

Next we examine a simple system for reading input called a
{glossary-link term="finite state automaton" reference-text="Formal languages"}finite state automaton{glossary-link end},
which --- as we'll find out later --- is closely related to
{glossary-link term="regular expression"}regular expressions{glossary-link end}.
Later we'll explore the idea of
{glossary-link term="grammar"}grammars{glossary-link end},
another kind of formal language that can deal with more complicated forms of input.

{panel type="teacher-note" summary="Klingon linguistics activity"}

For a fun discussion, you could have the students look at the [Klingon Linguistics activity at CS4FN](http://www.cs4fn.org/linguistics/klingon.html). This page introduces the fundamentals of languages — words (the alphabet) and {glossary-link term="grammar"}grammar{glossary-link end} (the rules of syntax). It discusses why languages are translated and how meaning can be changed by translation. It also explains why computer languages need to be translated.

{panel end}


## Finite state automata

{panel type="teacher-note" summary="Treasure hunt (alternative introduction)"}

There's a fun variant of the challenge at the start of this section that involves running around the playground. It's described as the [Treasure Hunt](http://csunplugged.org/wp-content/uploads/2014/12/unplugged-11-finite_state_automata.pdf) activity on the CS unplugged site.
It may be a bit young for some students, but if you can sell it to them, it's a great way to get some physical exercise away from the computers and to see most of the concepts in this section in a kinesthetic activity. Many variants are possible; for example, it can be run as a card game where the A/B card for each station is turned over on request. See the Unplugged site for other ideas.

{panel end}

Here's a map of a commuter train system for the town of Trainsylvania. The trouble is, it doesn't show where the the trains go --- all you know is that there are two trains from each station, the A-train and the B-train. The inhabitants of Trainsylvania don't seem to mind this --- it's quite fun choosing trains at each station, and after a while you usually find yourself arriving where you intended.

{image filename="trainsylvania-blank.png" alt="An incomplete train map" caption="Click image to enlarge"}

You can travel around Trainsylvania yourself using the following interactive. You're starting at the City Mall station, and you need to find your way to Suburbopolis.
At each station you can choose either the A-train or the B-train --- press the button to find out where it will take you.
But, like the residents of Trainsylvania, you'll probably want to start drawing a map of the railway, because later you might be asked to find your way somewhere else.
If you want a template to draw on, you can [print one out from here](files/trainsylvania-blank.pdf).

{interactive name="trainsylvania" type="in-page"}

{panel type="teacher-note" summary="Using the interactive and solution"}

You should let students devise their own notation for this. They will soon learn (possibly the hard way) that they should record all routes with an arrow (since trains don't necessarily return by the same route), and label their arrows with A or B. The full map for the activity is below, but don't spoil the students' fun by providing it --- at least, not yet.

{image filename="trainsylvania-complete.png" alt="Solution to the train map" caption="Click image to enlarge"}

{panel end}

Did you find a sequence of trains to get from City Mall to Suburbopolis? You can test it by typing the sequence of trains in the following interactive. For example, if you took the A-train, then the B-train, then an A-train, type in ABA.

{interactive name="trainsylvania-planner" type="in-page"}

Can you find a sequence that takes you from City Mall to Suburbopolis? Can you find another sequence, perhaps a longer one? Suppose you wanted to take a really long route ... can you find a sequence of 12 hops that would get you there? 20 hops?

Here's another map. It's for a different city, and the stations only have numbers, not names (but you can name them if you want).

{image filename="finite-state-automata-train-example.png" alt="A simpler train map"}

Suppose you're starting at station 1, and need to get to station 3 (it has a double circle to show that's where you're headed.)

- What's the shortest way to get from station 1 to station 3?
- Where do you end up if you start at station 1 and take the trains ABAA?
- Where do you end up if your start at station 1 and take 20 train hops, always alternating A, B, A, B, A, B?
- Can you give an easy-to-describe sequence of 100 or more hops that will get you to station 3?

{panel type="teacher-note" summary="Solutions"}

Solutions:

- AA
- station 3
- station 4 (each AB just goes back and forward between 2 and 4)
- there are many solutions, but based on the previous question, AB repeated 49 times will get to station 4 (that's 98 hops), then AA gets to station 3. Many other solutions are possible, based on going around in circles many times, for example, repeating A 101 times will end up at station 3, because any multiple of 3 "A"s in the middle makes no difference.

{panel end}

The map that we use here, with circles and arrows, is actually a powerful idea from computer science called a Finite State Automaton, or {glossary-link term="finite state automaton" reference-text="FSA abbreviation"}FSA{glossary-link end} for short.
Being comfortable with such structures is a useful skill for computer scientists.

{panel type="jargon-buster" summary="Finite State Automaton"}

{glossary-definition term="Finite State Automaton" definition="In formal languages, a simple "machine" that has states, and transitions from one state to another based on strings of input symbols."}
The name
{glossary-link term="finite state automaton" reference-text="Formal languages"}finite state automaton{glossary-link end} (FSA) might seem strange, but each word is quite simple.
"Finite" just means that there is a limited number of states (such as train stations) in the map. The "state" is just as another name for the train stations we were using. "Automaton" is an old word meaning a machine that acts on its own, following simple rules (such as the cuckoo in a cuckoo clock).

{glossary-definition term="Finite State Machine" definition="Alternative name for a finite state automaton."}
Sometimes an FSA is called a
{glossary-link term="Finite State Machine" reference-text="Formal languages"}Finite State Machine{glossary-link end} (FSM),
or even just a “state machine”.
By the way, the plural of “Automaton” can be either “Automata” or "Automatons".
People working with formal languages usually use Finite State *Automata*, but "FSAs" for short.
{panel end}

An FSA isn't all that useful for train maps, but the notation is used for many other purposes, from checking input to computer programs to controlling the behaviour of an interface.
You may have come across it when you dial a telephone number and get a message saying "Press 1 for this … Press 2 for that … Press 3 to talk to a human operator." Your key presses are inputs to a finite state automaton at the other end of the phone line. The dialogue can be quite simple, or very complex. Sometimes you are taken round in circles because there is a peculiar loop in the finite-state automaton. If this occurs, it is an error in the design of the system — and it can be extremely frustrating for the caller!

Another example is the remote control for an air conditioning unit. It might have half a dozen main buttons, and pressing them changes the mode of operation (e.g. heating, cooling, automatic).
To get to the mode you want you have to press just the right sequence, and if you press one too many buttons, it's like getting to the train station you wanted but accidentally hopping on one more train. It might be a long journey back, and you may end up exploring all sorts of modes to get there!
If there's a manual for the controller, it may well contain a diagram that looks like a Finite State Automaton.
If there isn't a manual, you may find yourself wanting to draw a map, just as for the trains above, so that you can understand it better.

{comment}

.. TCB Don't really need this example
.. Another example is when you get cash from a bank cash machine. The program in the machine’s computer leads you through a sequence of events. Inside the program all the possible sequences are kept as a finite-state automaton. Every key you press takes the automaton to another "station" on the map. Some of the "stations" have instructions for the computer on them, like “dispense $100 of cash” or “print a statement” or “eject the cash card”.

{comment end}

The map that we used above uses a standard notation. Here's a smaller one:

{image filename="finite-state-automata-simple-1.png" alt="A simple Finite State Automation"}

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

{panel type="teacher-note" summary="Solution for FSA"}

The FSA above accepts any string of inputs that end with an "a", so the interactive below behaves pretty trivially: press "a" for it to be accepted, and "b" for not accepted. It happens to behave like a two-button power switch, with an on and off button. Although these kind of FSAs seem very trivial, it's important for students to become confident with them. Some of the FSAs used in practice have just a few states like these, but even small systems can perform quite complex tasks.

{panel end}

Here's an interactive that follows the rules of the FSA above. You can use it to test different inputs.

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/fsa-2state-v3.html?map=one" text="View state interactive (1)"}

Here's another FSA, which looks similar to the last one but behaves quite differently. You can test it in the interactive below.

{image filename="finite-state-automata-simple-2.png" alt="A simple Finite State Automaton"}

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

{panel type="teacher-note" summary="Solutions"}

The general rule is that the input must have an odd number of "a"s in it; the number of "b"s is irrelevant. So in the above examples, the accepted strings are "aaa", "abb", "bababab", the letter "a" repeated 1001 times, and the last one (the letter "b" a million times, then an "a", then another million of the letter "b").

{panel end}

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/fsa-2state-v3.html?map=two" text="View state interactive (2)"}

{glossary-definition term="Alphabet" definition="In formal languages, a list of characters that may occur in a language, or more generally, a list of all possible inputs that might happen."}
To keep things precise, we'll define four further technical terms.
One is the
{glossary-link term="alphabet" reference-text="Formal languages"}alphabet{glossary-link end},
which is just a list of all possible inputs that might happen.
In the last couple of examples the alphabet has consisted of the two letters "a" and "b",
but for an FSA that is processing text typed into a computer, the alphabet will have to include every letter on the keyboard.

{glossary-definition term="Transition" definition="In a finite state machine, the links between the states."}
{glossary-definition term="String" definition="A sequence of characters."}
{glossary-definition term="Language" definition="In formal languages, it's the set of all strings that the language accepts i.e. that are correct."}
The connections between states are called
{glossary-link term="transition" reference-text="Formal languages"}transitions{glossary-link end},
since they are about changing state.
The sequence of characters that we input into the FSA is often called a
{glossary-link term="string" reference-text="Formal languages"}string{glossary-link end},
(it's just a string of letters),
and the set of all strings that can be accepted by a particular FSA is called its
{glossary-link term="language" reference-text="Formal languages"}language{glossary-link end}.
For the FSA in the last example, its *language* includes the *strings* "a", "aaa", "bab", "ababab", and lots more, because these are accepted by it.
However, it does not include the strings "bb" or “aa”.

The language of many FSAs is big. In fact, the ones we've just looked at are infinite. You could go on all day listing patterns that they accept.
There's no limit to the length of the strings they can accept.

That's good, because many real-life FSA's have to deal with "infinite" input.
For example, the diagram below shows the FSA for the spin speed on a washing machine, where each press of the spin button changes the setting.

{image filename="finite-state-automata-spin-speeds.png" alt="FSA for spin setting on a washing machine"}

It would be frustrating if you could only change the spin setting 50 times, and then it stopped accepting input ever again.
If you want, you could switch from fast to slow spin by pressing the spin button 3002 times.
Or 2 times would do. Or 2 million times (try it if you're not convinced).

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/fsa-spin-graphic.html" text="View spinner interactive"}

The following diagram summarizes the terminology we have introduced. Notice that this FSA has two accepting states. You can have as many as you want, but only one start state.

{image filename="finite-state-automata-train-example-terminology.png" alt="FSA terminology explained"}

For this FSA, the strings "aa" and "aabba" would be accepted, and "aaa" and "ar" wouldn't.
By the way, notice that we often put inverted commas around strings to make it clear where they start and stop.
Of course, the inverted commas aren't part of the strings.
Notice that "r" always goes back to state 1 --- if it ever occurs in the input then it's like a reset.

Sometimes you'll see an FSA referred to as a Finite State Machine, or FSM, and there are other closely related systems with similar names. We'll mention some later in the chapter.

{panel type="teacher-note" summary="Terminology for formal languages"}
The following website contains a comprehensive list of terminology relating to formal languages, although it goes a lot deeper and more formal than we're going to here: [http://www.csee.umbc.edu/portal/help/theory/lang_def.shtml](http://www.csee.umbc.edu/portal/help/theory/lang_def.shtml)
{panel end}

Now there's something we have to get out of the way before going further. If we're talking about which strings of inputs will get you into a particular state, and the system starts in that state, then the *empty string* --- that is, a string without any letters at all --- is one of the solutions!
For example, here's a simple finite state automaton with just one input (button a) that represents a strange kind of light switch.
The reset button isn't part of the FSA; it’s just a way of letting you return to the starting state.
See if you can figure out which patterns of input will turn the light on:

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/fsa-strangelight-v3.html" text="View light interactive"}

{panel type="teacher-note" summary="Solution"}
The light comes on with every third button press (which is intentionally confusing --- students will probably expect every second press to work, but this is to get them thinking about what is happening here!) The sequences that will turn on the light are therefore "aaa", "aaaaaa" and so on --- any number of presses that's a multiple of three. And, of course, zero presses.
{panel end}

Have you worked out which sequences of button presses turn on the light? Now think about the *shortest* sequence from a reset that can turn it on.

Since it's already on when it has been reset, the shortest sequence is *zero* button presses.
It's hard to write that down (although you could use “”), so we have a symbol especially for it, which is the Greek letter epsilon: {math}\epsilon{math end}.
You'll come across {math}\epsilon{math end} quite often with formal languages.

It can be a bit confusing. For example, the language (that is, the list of all accepted inputs) of the FSA above includes "aaa", "aaaaaa", and {math}\epsilon{math end}.
If you try telling someone that "nothing" will make the light come on that could be confusing --- it might mean that you could never turn the light on --- so it's handy being able to say that the *empty string* (or {math}\epsilon{math end}) will turn the light on.
There are different kinds of "nothing", and we need to be precise about which one we mean!

Here’s the FSA for the strange light switch. You can tell that {math}\epsilon{math end} is part of the language because the start state is also a final state (in fact, it's the only final state). Actually, the switch isn't all that strange --- data projectors often require two presses of the power button, to avoid accidentally turning them off.

{image filename="finite-state-automata-light-switch-example.png" alt="The finite state machine for a strange light switch"}

An important part of the culture of computer science is always to consider extreme cases. One kind of extreme case is where there is no input at all: what if a program is given an empty file, or your database has zero entries in it? It's always important to make sure that these situations have been thought through.
So it's not surprising that we have a symbol for the empty string.
Just for variety, you'll occasionally find some people using the Greek letter lambda ({math}\lambda{math end}) instead of {math}\epsilon{math end} to represent the empty string.

{panel type="teacher-note" summary="Epsilon or lambda?"}

The two main pieces of recommended software in this chapter (Exorciser and JFLAP) use the two notations.
JFLAP can be changed to use epsilon ({math}\epsilon{math end}) from its Preferences menu, so we will use epsilon throughout the chapter.
You may wish to change the preference for JFLAP early on, or else just point out to students that epsilon and lambda ({math}\lambda{math end}) can be used interchangeably.

{panel end}

And by the way, the language of the three-state FSA above is infinitely large because it is the set of all strings that contain the letter "a" in multiples of 3, which is {{math}\epsilon{math end}, aaa, aaaaaa, aaaaaaaaa, ...}. That's pretty impressive for such a small machine.

While we're looking at extremes, here's another FSA to consider.  It uses "a" and "b" as its alphabet.

{image filename="finite-state-automata-two-or-less-letters.png" alt="FSA for short strings"}

Will it accept the string "aaa"? Or "aba"? Or anything of 3 characters or more?

As soon as you get the third character you end up in state 4, which is called a *trap state* because you can't get out.
If this was the map for the commuter train system we had at the start of this section it would cause problems, because eventually everyone would end up in the trap state, and you'd have serious overcrowding.
But it can be useful in other situations --- especially if there's an error in the input, so no matter what else comes up, you don't want to go ahead.

For the example above, the language of the FSA is any mixture of "a"s and "b"s, but only two characters at most.
Don't forget that the empty string is also accepted. It's a very small language; the only strings in it are:
{{math}\epsilon{math end}, a, b, aa, ab, ba, bb}.

Here's another FSA to consider:

{image filename="finite-state-automata-no-trap-example.png" alt="FSA with missing transitions"}

It's fairly clear what it will accept: strings like "ab", "abab", "abababababab", and, of course {math}\epsilon{math end}.
But there are some missing transitions: if you are in state 1 and get a "b" there's nowhere to go.
If an input cannot be accepted, it will be rejected, as in this case. We could have put in a trap state to make this clear:

{image filename="finite-state-automata-trap-added-example.png" alt="FSA with missing transitions"}

But things can get out of hand. What if there are more letters in the alphabet? We'd need something like this:

{image filename="finite-state-automata-trap-added-extreme-example.png" alt-"FSA with missing transitions"}

So, instead, we just say that any unspecified transition causes the input to be rejected (that is, it behaves as though it goes into a trap state). In other words, it's fine to use the simple version above, with just two transitions.

Now that we've got the terminology sorted out, let’s explore some applications of this simple but powerful "machine" called the Finite State Automaton.

### Who uses finite state automata?

Finite state automata are used a lot in the design of digital circuits (like the electronics in a hard drive) and embedded systems (such as burglar alarms or microwave ovens).
Anything that has a few buttons on it and gets into different states when you press those buttons (such as alarm on/off, high/med/low power) is effectively a kind of FSA.

With such gadgets, FSAs can be used by designers to plan what will happen for every input in every situation, but they can also be used to analyse the interface of a device.
If the FSA that describes a device is really complicated, it's a warning that the interface is likely to be hard to understand.
For example, here's an FSA for a microwave oven. It reveals that, for example, you can't get from power2 to power1 without going through timer1. Restrictions like this will be very frustrating for a user.
For example, if they try to set power1 it won't work until they've set timer1 first.
Once you know this sequence it's easy, but the designer should think about whether it's necessary to force the user into that sort of sequence.
These sorts of issues become clear when you look at the FSA.
But we're straying into the area of Human-Computer Interaction! This isn't surprising because most areas of computer science end up relating to each other --- but this isn't a major application of FSAs, so let's get back to more common uses.

{image filename="finite-state-automata-microwave-example.png" alt="FSA for a microwave oven"}

As we shall see in the next section, one of the most valuable uses of the FSA in computer science is for checking input to computers, whether it's a value typed into a dialogue box, a program given to a compiler, or some search text to be found in a large document.
There are also data compression methods that use FSAs to capture patterns in the data being compressed, and variants of FSA are used to simulate large computer systems to see how best to configure it before spending money on actually building it.


{panel type="curiosity" summary="The largest FSA in the world"}
What's the biggest FSA in the world, one that lots of people use every day? It's the World-Wide Web. Each web page is like a state, and the links on that page are the transitions between them. Back in the year 2000 the web had a billion pages. In 2008 Google Inc. declared they had found a trillion different web page addresses. That’s a lot. A book with a billion pages would be 50 km thick. With a trillion pages, its thickness would exceed the circumference of the earth.

But the web is just a finite-state automaton. And in order to produce an index for you to use, search engine companies like Google have to examine all the pages to see what words they contain. They explore the web by following all the links, just as you did in the train travelling exercise. Only, because it's called the "web," exploring is called "crawling" — like spiders do.

{panel end}

{comment}

.. consider adding this Activity: FSA pinball

.. HTML5 "game" where you are given a fsa and need to type characters to get to final state, but can't re-use strings Add pinball sounds/effects, ball bouncing around states. Based on this:

{comment end}

### Activity: practice creating FSAs

{panel type="teacher-note" summary="Choosing between Exorciser and JFLAP"}

This section uses free teaching software that makes it easy for students to create and experiment with FSAs. This software will also be useful for the next section on regular expressions, so it’s worth becoming familiar with. You can choose between using "Exorciser" or "JFLAP" (see later). The Exorciser system from [SwissEduc](http://www.swisseduc.ch/compscience/)  is cleaner and simpler, but JFLAP includes some features that are useful for the sections on regular expressions and grammars. (The Exorciser material on grammars is too advanced, and its features with regular expressions are a little more tedious to use for our purposes). Both of the systems have extensive features that aren't relevant to this chapter, so students will need to ignore much of what they see!

We recommend starting students with Exorciser, if students want to do some more advanced work then they could get familiar with JFLAP.

One quick tip: to avoid confusion, in Exorciser deselect the option of having an empty-string transition by right-clicking in the background, choosing "A = {a,b}", and unchecking {math}\epsilon{math end}. Students can add other characters to the alphabet from this menu, although just "a" and "b" are enough to experiment with for a start.

{panel end}

This activity involves constructing and testing your own FSA, using free software that you can download yourself. Before doing that, we'll look at some general ways to create an FSA from a description. If you want to try out the examples here on a live FSA, read the next two sections about using Exorciser and JFLAP respectively, which allow you to enter FSAs and test them.


A good starting point is to think of the shortest string that is needed for a particular description. For example, suppose you need an FSA that accepts all strings that contain an even number of the letter "b". The shortest such string is
{math}\epsilon{math end},
which means that the starting state must also be a final state, so you can start by drawing this:

{image filename="finite-state-automata-create-example-1.png" alt="creating an FSA"}


If instead you had to design an FSA where the shortest accepted string is "aba", you would need a sequence of 4 states like this:

{image filename="finite-state-automata-create-example-2.png" alt="creating an FSA"}


Then you need to think what happens next. For example, if we are accepting strings with an even number of "b"s, a single "b" would have to take you from the start state to a non-accepting state:

{image filename="finite-state-automata-create-example-3.png" alt="creating an FSA"}

But another "b" would make an even number, so that's acceptable. And for any more input the result would be the same even if all the text to that point hadn't happened, so you can return to the start state:

{image filename="finite-state-automata-create-example-4.png" alt="creating an FSA"}

Usually you can find a "meaning" for a state. In this example, being in state 1 means that so far you've seen an even number of "b"s, and state 2 means that the number so far has been odd.

{comment}

.. xJRM the following two diagrams come up much later in the PDF version; probably a Latex hard-to-solve thing, but a good job for a rainy day!

{comment end}

Now we need to think about missing transitions from each state.
So far there's nothing for an "a" out of state 1. Thinking about state 1, an "a" doesn't affect the number of "b"s seen, and so we should remain in state 1:

{image filename="finite-state-automata-create-example-5.png" alt="creating an FSA"}

The same applies to state 2:

{image filename="finite-state-automata-create-example-6.png" alt="creating an FSA"}

Now every state has a transition for every input symbol, so the FSA is finished. You should now try some examples to check that an even number of "b"s always brings it to state 1.

Get some practice doing this yourself! Here are instructions for two different programs that allow you to enter and test FSAs.


#### Exorciser

This section shows how to use some educational software called "Exorciser". (The next section introduces an alternative called JFLAP which is a bit harder to use.) Exorciser has facilities for doing advanced exercises in formal languages; but here we'll use just the simplest ones.

Exorciser can be downloaded [here](http://www.swisseduc.ch/compscience/exorciser/index.html).

When you run it, select "Constructing Finite Automata" (the first menu item); click the "Beginners" link when you want a new exercise.
The challenge in each FSA exercise is the part after the | in the braces (i.e., curly brackets). For example, in the diagram below you are being asked to draw an FSA that accepts an input string w if "w has length at least 3". You should draw and test your answer, although initially you may find it helpful to just click on "Solve exercise" to get a solution, and then follow strings around the solution to see how it works. That’s what we did to make the diagram below.

{image filename="finite-state-automata-exorciser-screenshot.png" alt="The exorciser software from SwissEduc"}

To draw an FSA in the Exorciser system, right-click anywhere on the empty space and you'll get a menu of options for adding and deleting states, choosing the alphabet, and so on.
To make a transition, drag from the outside circle of one state to another (or out and back to the state for a loop).
You can right-click on states and transitions to change them.
The notation "a|b" means that a transition will be taken on "a" or "b" (it's equivalent to two parallel transitions).

If your FSA doesn't solve their challenge, you'll get a hint in the form of a string that your FSA deals with incorrectly, so you can gradually fix it until it works. If you're stuck, click “Solve exercise”.
You can also track input as you type it: right-click to choose that option.
See the [SwissEduc website](http://www.swisseduc.ch/compscience/) for more instructions.

{image filename="finite-state-automata-exorciser-error-screenshot.png" alt="The exorciser software from SwissEduc"}

The section after next gives some examples to try.
If you're doing this for a report, keep copies of the automata and tests that you do. Right-click on the image for a "Save As" option, or else take screenshots of the images.


#### JFLAP

{panel type="teacher-note" summary="JFLAP"}

A program called JFLAP is an alternative to Exorciser for students to design and test their own FSA. It can be downloaded for free, and is widely used for teaching formal languages. It’s a powerful piece of software that can be used for most of the concepts in this chapter, which makes it worth learning how to use it. Unfortunately JFLAP has many more features than we need in this chapter, and some teachers have found it difficult to use in a high-school classroom setting,
so we recommend using Exorciser if it's available.
If you use JFLAP we recommend that you become familiar with it first so that you can guide students through it: the interface has many distracting features and can be a little quirky, and fiddling around without taking time to learn how to use it will be a frustrating experience. Fortunately there's a good tutorial about using JFLAP [here](http://www.jflap.org/tutorial/), and some material from Duke University about FSAs based around JFLAP [here](http://www.cs.duke.edu/csed/pltl/exercises/lessons/29/finiteautomata.zip) (ZIP file).

If you have trouble using Exorciser or JFLAP, there's also an FSA example in the "Java Applets Centre" at [http://www.cosc.canterbury.ac.nz/mukundan/thco/DFA.html](http://www.cosc.canterbury.ac.nz/mukundan/thco/DFA.html).

{panel end}

Another widely used system for experimenting with FSAs is a program called JFLAP (download it from http://jflap.org). You can use it as an alternative for Exorciser if necesary. You'll need to follow instructions carefully as it has many more features than you'll need, and it can be hard to get back to where you started.

Here's how to build an FSA using JFLAP. As an example, we'll use the following FSA:

{image filename="jflap-create-state.png" alt="Building an FSA --- example"}

{comment}

.. xTCB put some screen shots and ideally a video here to show how to use JFLAP.

{comment end}

To build this, run JFLAP and:

- click on the "Finite Automaton" button in the control panel.
- In the Editor window, click on the picture of a state (with a little q in it), and then click in the window to create states.
- To move the states around, click on the arrow tool in the toolbar (leftmost icon). It doesn't matter where the states are, but you want them to be easy to view.
- To put a transition between two states, click on the transition tool (third icon), drag a line between two states, type the label for the transition ("a" or "b" for this exercise), and press return. (The system will offer the empty string ({math}\lambda{math end}) as a label, but please don't go there!)
- To make a transition loop back to a state, just click on the state with the transition tool.
- You can choose the start state by selecting the arrow tool (leftmost icon), right-clicking on the state, and selecting "Initial". Only one state can be the start state, but you can set more than one "Final" (accepting) state in the same way, by right-clicking on them.

If you need to change something, you can delete things with the delete tool (the skull icon). Alternatively, select the arrow tool and double-click on a transition label to edit it, or right-click on a state.
You can drag states around using the arrow tool.

To watch your FSA process some input, use the "Input" menu (at the top), choose "Step with closure", type in a short string such as "abaa", and click "OK". Then at the bottom of the window you can trace the string one character at a time by pressing "Step", which highlights the current state as it steps through the string.
If you step right through the string and end up in a final (accepting) state, the panel will come up green. To return to the Editor window, go to the “File” menu and select “Dismiss Tab”.

{image filename="jflap-create-accept.png" alt="Building an FSA - testing with input"}

You can run multiple tests in one go. From the "Input" menu choose "Multiple Run", and type your tests into the table, or load them from a text file.

{image filename="jflap-create-accept-multi.png" alt="Building an FSA --- multiple run"}

You can even do tests with the empty string by leaving a blank line in the table, which you can do by pressing the "Enter Lambda" button.

There are some FSA examples in the next section.
If you're doing this for a report, keep copies of the automata and tests that you do (JFLAP's "File" menu has a "Save Image As..." option for taking snapshots of your work; alternatively you can save an FSA that you've created in a file to open later).


#### Examples to try

Using Exorciser or JFLAP, construct an FSA that takes inputs made of the letters "a" and "b", and accepts the input if it meets one of the following requirements. You should build a separate FSA for each of these challenges.

- strings that start with the letter "a" (e.g. "aa", "abaaa", and "abbbb").
- strings that end with the letter "a" (e.g. "aa", "abaaa", and "bbbba").
- strings that have an even number of the letter "a" (e.g. "aa", "abaaa", "bbbb"; and don’t forget the empty string {math}\epsilon{math end}).
- strings that have an odd number of the letter "a" (e.g. "a", "baaa", "bbbab", but not {math}\epsilon{math end}).
- strings where the number of "a"s in the input is a multiple of three (e.g. "aabaaaa", "bababab").
- strings where every time an "a" appears in the input, it is followed by a "b" (e.g. "abb", "bbababbbabab", "bbb").
- strings that end with "ab"
- strings that start with "ab" and end with "ba", and only have "b" in the middle (e.g. "abba", "abbbbba")

{comment}

.. xTCB provide answers/hints for teachers

{comment end}

{panel type="teacher-note" summary="Solutions"}

The following solutions are for the smallest/simplest way to represent the above languages, but students may come up with others that are valid. To check them, try examples of strings that are both accepted and not accepted. [Solutions to the above yet to be provided --- contact Tim Bell if you need them and we will prioritise this]

{panel end}

{comment}

.. xtcb at some stage we might offer a rigorous checker for this? or minimise their solution and see if the same as a minimum of the solution

{comment end}

For the FSA(s) that you construct, check that they accept valid input, but also make sure they reject invalid input.

{panel type="teacher-note" summary="Hint"}

Checking that invalid input fails is important --- otherwise a student could make an FSA that accepts any input, and it will pass on all tests. Students will need to think of examples that exercise different parts of the FSA to show that it doesn't give false positive or false negative results.

{panel end}

Here are some more sequences of characters that you can construct FSAs to detect. The input alphabet is more than just "a" and "b", but you don't need to put in a transition for every possible character in every state, because an FSA can automatically reject an input if it uses a character that you haven't given a transition for. Try doing two or three of these:

- the names for international standard paper sizes (A1 to A10, B1 to B10, and so on)
- a valid three-letter month name (Jan, Feb, Mar, etc.)
- a valid month number (1, 2, ... 12)
- a valid weekday name (Monday, Tuesday, ...)

{panel type="teacher-note" summary="Solutions"}

Solutions for these will be provided in a later version of this guide.

{panel end}

{comment}

.. xTCB provide answers/hints for teachers --- e.g. have "day" as common at end

{comment end}

A classic example of an FSA is an old-school vending machine that only takes a few kinds of coins.
Suppose you have a machine that only takes 5 and 10 cent pieces, and you need to insert 30 cents to get it to work.
The alphabet of the machine is the 5 and 10 cent coin, which we call F and T for short.
For example, TTT would be putting in 3 ten cent coins, which would be accepted. TFFT would also be accepted, but TFFF wouldn't.
Can you design an FSA that accepts the input when 30 cents or more is put into the machine?
You can make up your own version for different denominations of coins and required total.

{panel type="teacher-note" summary="Solutions"}

Solutions for these will be provided in a later version of this guide.

{panel end}

{comment}

.. xTCB provide answers

{comment end}

If you've worked with binary numbers, see if you can figure out what this FSA does. Try each binary number as input: 0, 1, 10, 11, 100, 101, 110, etc.

{image filename="finite-state-automata-binary-multiples.png" alt="An FSA to test with binary numbers as input"}

Can you work out what it means if the FSA finishes in state q1? State q2?

{panel type="teacher-note" summary="Solution"}

This FSA detects binary numbers that are multiples of 3 (i.e. 0, 11, 110, 1001... which are 0, 3, 6, 9... in decimal). The state it is in represents the  remainder when the input so far is divided by 3, so state 0 (accepting) is just no remainder. As a challenge to top students, see if they can design a machine that finds multiples of 5 (it can be done with 5 states). This would be a typical interview question for companies wanting to find out if a computer science graduate really knows their stuff! There are answers available on the web because it's such a well-known challenge, but hopefully some of your students will be keen to solve it on their own.

{panel end}

{panel type="activity" summary="Find Finite State Automata in everyday use"}
There are lots of systems around that use FSAs. You could choose a system, explain how it can be represented with an FSA, and show examples of sequences of input that it deals with. Examples are:

- Board games. Simple board games are often just an FSA, where the next move is determined by some input (e.g. a number given by rolling dice), and the final state means that you have completed the game --- so the first person to the final state wins. Most games are too complex to draw a full FSA for, but a simple game like snakes and ladders could be used as an example. What are some sequences of dice throws that will get you to the end of the game? What are some sequences that don't?!
- Simple devices with a few buttons often have states that you can identify. For example, a remote control for a car alarm might have two buttons, and what happens to the car depends on the order in which you press them and the current state of the car (whether it is alarmed or not). For devices that automatically turn on or off after a period of time, you may have to include an input such as "waited for 30 seconds". Other devices to consider are digital watches (with states like "showing time", "showing date", "showing stopwatch", "stopwatch is running"), the power and eject buttons on a CD player, channel selection on a TV remote (just the numbers), setting a clock, storing presets on a car radio, and burglar alarm control panels.
{panel end}

{panel type="activity" summary="Kara the ladybug"}

[SwissEduc](http://www.swisseduc.ch/compscience/) has a programming environment called [Kara](http://www.swisseduc.ch/compscience/karatojava/kara/) (requires Java to be installed), which is a programmable ladybug that (in its simplest version) walks around an imaginary world controlled by actions output by a Finite State Automaton. The ladybug has (simulated) detectors that sense its immediate surroundings; these serve as input to the FSA.
{comment}
.. xtcb Currently there seems to be a bug in the simple Kara program, and it only loads to 88% (apparently it is to do with the version of Java). There is a version called "MultiKara" (in the same package) which has multiple ladybugs, so you can just use one ladybug and get a similar effect. http://swisseduc.ch/informatik/karatojava/download.html
{comment end}
{panel end}

{panel type="teacher-note" summary="Other resources"}

There are many online resources for experimenting with FSAs; we've described ones that we think are the most accessible. However, there may be variations that you find helpful, either for various computing platforms, or with themes relevant to your students. Here are some others that you could explore.

The Manufactoria game is essentially about constructing a finite state machine that represents given rules. Some of the puzzles are quite tricky, and if students can solve them then they've understood FSAs well. (Hints: The conveyor belts are the transitions, the  B/R branches are the states with a transition out for blue or red. You can have conveyor belts that act as bridges). The game is available [here](http://pleasingfungus.com/#Manufactoria) and [here](http://jayisgames.com/games/manufactoria/).

If you use the Java-based graphical educational system [Greenfoot](http://www.greenfoot.org/door) as a programming environment, the [treasure hunt finite state automata exercise](http://greenroom.greenfoot.org/resources/5) is based on the Treasure Island FSA activity from CS Unplugged. Teachers can register at the [Greenroom](http://greenroom.greenfoot.org/door) resources area to download the software. Students can interact with the activity, without accessing source code, through: http://www.greenfoot.org/scenarios/1678 .

If you use [Scratch](http://scratch.mit.edu/), the following program is promising, but it doesn't have an activity or guide, and Level 3 students may have progressed beyond Scratch. It implements the Finite State Automata CS Unplugged activity in Scratch, and can be downloaded as part of a [zip file](http://code.google.com/p/scratch-unplugged/downloads/detail?name=scratch-unplugged-1-0.zip&can=2&q=) of a full set of Unplugged activities. The [ReadMe.txt](http://code.google.com/p/scratch-unplugged/downloads/detail?name=readme.txt&can=2&q=) file has some documentation. It was developed by [Mordechai (Moti) Ben-Ari](http://stwww.weizmann.ac.il/g-cs/benari/) from the [Weizmann Institute of Science, Israel](http://www.weizmann.ac.il/).

If you need to make diagrams of FSAs, the JFLAP program can be used, or there's a program called graphviz which has many options for drawing this kind of diagram: [http://www.graphviz.org/](http://www.graphviz.org/)

{panel end}

{comment}

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

.. JRM  fsm intro video: https://www.youtube.com/watch?v=Obt3L1YBwlM It's quite clear in it's explanation, but don't know how well it will be received by younger audiences. It's quite long (15 minutes) but pretty standard presentation (powerpoint with hand drawing over top with narration). It was good for me, but don't know how good it is for children. If you watch the first two minutes, you get a good idea of the style. He starts from the basics and builds up at a nice steady pace, he uses 'bits' a lot which is good, but at the start he mentions 'clock pulse' and it took me a while to get it. There is a smaller error in the video, he has an annotation explaining it though. It's a pretty good video overall.

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

{comment end}

{comment}

.. fl-regex:

{comment end}

## Regular expressions

{panel type="teacher-note" summary="Regular expressions"}

Regular expressions (regex for short) are closely related to FSAs, as we shall see. Much of the terminology that is needed was already covered in the previous section: we'll be using
{glossary-link term="alphabet"}alphabets{glossary-link end} to
put together a
{glossary-link term="string"}string{glossary-link end}
of letters,
and the set of all strings that can be accepted by a particular FSA is called its
{glossary-link term="language"}language{glossary-link end}.
We'll need the concept of the empty string ({math}{\epsilon}{math end} or {math}{\lambda}{math end}),
and eventually
{glossary-link term="finite state automaton"}finite state automata{glossary-link end}.
So the previous section on FSAs needs to be covered before embarking on regular expressions.

It may be that students have used regular expressions already, because they are built into many programming languages and are often used when writing script programs. We'll be looking briefly at such applications --- and they’re very relevant --- but in formal languages we're also interested in the limits of what can be represented, and how to convert a regex to an FSA. So there should be something here to get students thinking, even if they’re expert at programming with "regexes".

{panel end}

{panel type="teacher-note" summary="Reverse Pictionary activity"}

If you have time, the following activity ("Reverse Pictionary") could be done either before or after teaching regular expressions. We recommend using it before, as it becomes a constructivist approach that encourages students to design their own notations for regular languages, and is a motivator for learning a precise notation.

A useful activity to develop students' familiarity with FSAs and Regular expressions is a "Reverse Pictionary" game for finite state automata, developed by Linda Pettigrew. It uses the handout [found here](files/reverse-pictionary-worksheet.pdf) (or you can make up your own simple FSAs).

Split the class into two groups, A and B. Hand out one copy of FSM-A to each pair of students in group A and FSM-B to pairs in group B. Each pair also requires a language sheet. They will only be writing in the top half of the sheet. Students now need to describe all the acceptable inputs for the given FSA (using whatever notation they can come up with, or regular expressions if they have already encountered them). When they are happy with their description (or five minutes is up) they write it out on the language sheet. Some suitable descriptions are as follows. We've used standard regex notation, but students might make up something different.

```
FSM-A: bee*p(-bee*p)*  or  be*ep(-be*ep)*  or  be+p(-be+p)*
FSM-B: cl(i|a)ck(-cl(i|a)ck)*
FSM-A: mee*o*w  or  me*eo*w  or  me+ow
FSM-B: squ((el)|(ir))ch(-squ((el)|(ir))ch)*
```

The language sheets from both groups are then collected in. Sheets from group A are distributed to group B, and vice versa. The pairs now read the “language” description and fill in the bottom half of the language sheet with four strings that the FSM will accept and four that it will not accept. Here the students are acting as “programmers”, trying to get the computer on the other side to perform a certain task.

The language sheets are then collected in again, and those from group A distributed to group B and group B’s to group A. There is no need for pairs to get their original sheet back. The pairs are now “computers” and need to check that the input provided at the bottom of the language sheet conforms to the FSA. If one of the strings is accepted or rejected incorrectly, groups will need to work out where the error came from.

Follow-up discussion can review whether some descriptions were longer than they needed to be or confusing to understand, and whether the language of the machines were captured properly.

{panel end}

We've already had a taste of
{glossary-link term="Regular expression" reference-text="introduction"}regular expressions{glossary-link end}
in the [getting started](chapters/formal-languages.html#getting-started) section. They are just a simple way to search for things in the input, or to specify what kind of input will be accepted as legitimate.
For example, many web scripting programs use them to check input for patterns like dates, email addresses and URLs. They've become so popular that they're now built into most programming languages.

You might already have a suspicion that regular expressions are related to
{glossary-link term="finite state automaton" reference-text="related to regular expressions"}finite state automata{glossary-link end}.
And you'd be right, because it turns out that every regular expression has a Finite State Automaton that can check for matches, and every Finite State Automaton can be converted to a regular expression that shows exactly what it does (and doesn’t) match.
Regular expressions are usually easier for humans to read. For machines, a computer program can convert any regular expression to an FSA, and then the computer can follow very simple rules to check the input.

The simplest kind of matching is just entering some text to match. Open the interactive below and type the text "cat" into the box labeled "Regular expression":

{interactive name="regular-expression-search" type="whole-page" text="Regular Expression Search - Exercise 1" parameters="text=The fat cat sat on the mat.%0AThe vindication was catastrophic.%0AThe bilocation of the cataract required certification.%0AThe 42 buffalo baffled them with a pfffffffft sound.%0APennsylvania 6-5000.%0AAssorted exhalations: pfft pffft pft.%0AWas that a match or was it not?"}

{panel type="teacher-note" summary="Alternative websites for practicing regular expressions"}

Students can also work through the examples in this section using either [Rubular](http://rubular.com/) or [Regex101](https://regex101.com/).

Alternatively you may prefer to get them to use the excellent tutorial at [RegexOne](http://regexone.com/). RegexOne provides challenges and tests answers in the same window. Students can get away with inefficient answers, but it's a good environment for playing with the idea.

{image filename="regexone-example-screenshot.png" alt="Regexone screenshot"}

{comment}

Consider using http://www.debuggex.com/?re=(foo|bar)baz* however as of 31/03/2016 the website appears to not be actively maintained

{comment end}

{panel end}

If you've only typed the 3 characters "cat", then it should find 6 matches.

Now try typing a dot (full stop or period) as the fourth character: "cat.". In a regular expression, "." can match any single character. Try adding more dots before and after "cat". How about "cat.s" or "cat..n"?

What do you get if you search for " ... " (three dots with a space before and after)?

Now try searching for "ic.". The "." matches any letter, so if you really wanted a full stop, you need to write it like this "ic\\." --- use this search to find "ic" at the end of a sentence.

Another special symbol is "\\d", which matches any digit. Try matching 2, 3 or 4 digits in a row (for example, two digits in a row is "\\d\\d").

To choose from a small set of characters, try "[ua]ff". Either of the characters in the square brackets will match. Try writing a regular expression that will match "fat", "sat" and "mat", but not "cat".

{panel type="teacher-note" summary="Solution"}

A suitable expression is [fsm]at

{panel end}

A shortcut for "[mnopqrs]" is "[m-s]"; try "[m-s]at" and "[4-6]".

Another useful shortcut is being able to match repeated letters. There are four common rules:

- a* matches 0 or more repetitions of a
- a+ matches 1 or more repetitions of a
- a? matches 0 or 1 occurrences of a (that is, a is optional)
- a{5} matches "aaaaa" (that is, a repeated 5 times)

Try experimenting with these. Here are some examples to try:

```
f+
pf*t
af*
f*t
f{5}
.{5}n
```

If you want to choose between options, the vertical bar is useful. Try the following, and work out what they match. You can type extra text into the test string area if you want to experiment:

```
was|that|hat
was|t?hat
th(at|e) cat
[Tt]h(at|e) [fc]at
(ff)+
f(ff)+
```

Notice the use of brackets to group parts of the regular expression. It's useful if you want the "+" or "\*" to apply to more than one character.

{panel type="jargon-buster" summary="Regular expression"}
{glossary-definition term="Regular expression" definition="A formula used to describe a pattern in a text that is to be matched or searched for. These are typically used for finding elements of a program (such as variable names) and checking input in forms (such as checking that an email address has the right format.)"}
The term
{glossary-link term="regular expression" reference-text="abbreviations"}regular expression{glossary-link end}
is sometimes abbreviated to "regex", "regexp", or "RE".  It's "regular" because it can be used to define sets of strings from a very simple class of languages called "regular languages", and it's an "expression" because it is a combination of symbols that follow some rules.

{panel end}

Click here for another challenge: you should try to write a short regular expression to match the first two words, but not the last three:

{interactive name="regular-expression-search" type="whole-page" text="Regular Expression Search - Exercise 2" parameters="text=meeeeeeeow%0Ameoooooooooooow%0A%0Awoof%0Amew%0Acluck"}

{panel type="teacher-note" summary="Solution"}

"me+o+w" is a good solution.

{panel end}

Of course, regular expressions are mainly used for more serious purposes. Click on the following interactive to get some new text to search:

{interactive name="regular-expression-search" type="whole-page" text="Regular Expression Search - Exercise 3" parameters="text=Contact me at spam@mymail.com or on 555-1234%0AFFE962%0ADetails: fred@cheapmail.org.nz (03) 987-6543%0ALooking forward to 21 Oct 2015%0AGood old 5 Nov 1955%0ABack in 2 Sep 1885 is the earliest date%0AABC123%0ALet's buy another 2 Mac 9012 systems @ $2000 each."}

The following regular expression will find common New Zealand number plates in the sample text, but can you find a shorter version using the {n} notation?

```
[A-Z][A-Z][A-Z]\d\d\d
```

{panel type="teacher-note" summary="Solution"}

"[A-Z]{3}\\d{3}"

{panel end}

How about an expression to find the dates in the text? Here's one option, but it's not perfect:

```
\d [A-Z][a-z][a-z] \d\d\d\d
```

Can you improve on it?

{panel type="teacher-note" summary=""}

The expression "\\d\\d? (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \\d\\d\\d\\d" is more accurate, but a more sophisticated version would be used in practice to take account of various formats.

{panel end}

What about phone numbers? You'll need to think about what variations of phone numbers are common!
How about finding email addresses?

{panel type="teacher-note" summary="Solutions"}

Here are two fairly simple solutions for email addresses, but more refined ones are possible:

- \\w+@\w+\\.\\w+   only finds email address with two parts to the domain
- \\w+@\\w+(\\.\\w+)* matches more parts of the domain.

{panel end}

{image filename="xkcd-regular-expressions.png" hover-text="Wait, forgot to escape a space.  Wheeeeee[taptaptap]eeeeee." alt="A xkcd cartoon comment on regular expressions" source="https://xkcd.com/208/"}

Regular expressions are useful!

The particular form of regular expression that we've been using is for the Ruby programming language (a popular language for web site development), although it's very similar to regular expressions used in other languages including Java, JavaScript, PHP, Python, and Microsoft's .NET Framework. Even some spreadsheets have regular expression matching facilities.

{comment}

.. TCB for the record, Google docs does. Excel has it, but it's really VB.

{comment end}

But regular expressions have their limits --- for example, you won't be able to create one that can match palindromes (words and phrases that are the same backwards as forwards, such as "kayak", "rotator" and "hannah"), and you can't use one to detect strings that consist of *n* repeats of the letter "a" followed by *n* repeats of the letter "b".
For those sort of patterns you need a more powerful system called a grammar (see the [section on Grammars](chapters/formal-languages.html#grammars-and-parsing)).
But nevertheless, regular expressions are very useful for a lot of common pattern matching requirements.

{comment}

.. xTCB curiosity: idea comes from Kleene (add some personal information, dates)

{comment end}

### Regular expressions and FSAs

There's a direct relationship between regular expressions and FSAs. For example, consider the following regex, which matches strings that begin with an even number of the letter "a" and end with an even number of the letter "b":

```
(aa)+(bb)+
```

Now look at how the following FSA works on these strings --- you could try "aabb", "aaaabb", "aaaaaabbbb", and also see what happens for strings like "aaabb", "aa", "aabbb", and so on.

{image filename="finite-state-automata-aabb-trap.png" alt="an FSA for (aa)+(bb)+"}

You may have noticed that q2 is a "trap state". We can achieve the same effect with the following FSA, where all the transitions to the trap state have been removed --- the FSA can reject the input as soon as a non-existent transition is needed.

{image filename="finite-state-automata-aabb.png" alt="an FSA for (aa)+(bb)+"}

Like an FSA, each regular expression represents a
{glossary-link term="language" reference-text="regular expression"}language{glossary-link end},
which is just the set of all
{glossary-link term="string" reference-text="regular expression"}strings{glossary-link end}
that match the regular expression.
In the example above, the shortest string in the language is "aabb", then there's "aaaabb" and "aabbbb", and of course an infinite number more.
There's also an infinite number of strings that *aren't* in this language, like "a", "aaa", "aaaaaa" and so on.

In the above example, the FSA is a really easy way to check for the regular expression --- you can write a very fast and small program to implement it (in fact, it's a good exercise: you typically have an array or list with an entry for each state, and each entry tells you which state to go to next on each character, plus whether or not it's a final state. At each step the program just looks up which state to go to next.)

Fortunately, *every* regular expression can be converted to an FSA. We won't look at the process here, but both Exorciser and JFLAP can do it for you anyway (see the activities below).

Converting a regex to an FSA is also built into most programming languages.
Programmers usually use regular expressions by calling functions or methods that are passed the regex and the string to be searched.
Behind the scenes, the regular expression is converted to a finite state automaton, and then the job of checking your regular expression is very easy.

{panel type="project" summary="Designing regular expressions"}

Here are some ideas for regular expressions for you to try to create. You can check them using the [Regular Expression Searcher](interactives/regular-expression-search/index.html?reference=true) as we did earlier, but you'll need to make up your own text to check your regular expression.
When testing your expressions, make sure that they not only accept correct strings, but reject ones that don't match, even if there's just one character missing.

You may find it easier to have one test match string per line in "Your test string".
You can force your regular expression to match a whole line by putting "^" (start of line) before the regular expression, and "$" (end of line) after it. For example, "^a+$" only matches lines that have nothing but "a"s on them.

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

{panel end}

{panel type="project" summary="Converting Regular Expressions to FSAs"}

{comment}

.. xTCB Long term it would be nice to have a converter built into the book page. The following provides Python code for RE to FS conversion http://osteele.com/software/python/fsa/ , but something based on JFLAP or Exorciser would be easier.

.. xTCB better evaluation would be speed of implementations of FSA? http://swtch.com/~rsc/regexp/ gives examples of really good and bad implementations, and tricky RegExs to test them.

.. xTCB more ideas here: http://www.drdobbs.com/architecture-and-design/regular-expressions/184410904

{comment end}

For this project you will make up a regular expression, convert it to an FSA, and demonstrate how some strings are processed.

There's one trick you'll need to know: the software we're using doesn't have all the notations we've been using above, which are common in programming languages, but not used so much in pure formal language theory. In fact, the only ones available are:

- `a*` matches 0 or more repetitions of a
- `a|b` matches a or b
- `(aa|bb)*` Parentheses group commands together; in this case it gives a mixture of pairs of "a"s and pairs of "b"s.

Having only these three notations isn't too much of a problem, as you can get all the other notations using them.
For example, "a+" is the same as "aa*", and "\\d" is "0|1|2|3|4|5|67|8|9". It's a bit more tedious, but we'll mainly use exercises that only use a few characters.

**Converting with Exorciser**

Use this section if you're using Exorciser; we recommend Exorciser for this project, but if you're using JFLAP then skip to **Converting with JFLAP** below.

Exorciser is very simple. In fact, unless you change the default settings, it can only convert regular expressions using two characters: "a" and "b". But even that's enough (in fact, in theory any input can be represented with two characters --- that's what binary numbers are about!)

On the plus side, Exorciser has the empty string symbol available --- if you type "e" it will be converted to {math}\epsilon{math end}.
So, for example, "(a| {math}\epsilon{math end})" means an optional "a" in the input.

To do this project using Exorciser, go to the start ("home") window, and select the second link, "Regular Expression to Finite Automata Conversion".
Now type your regular expression into the text entry box that starts with "R =".

As a warmup, try:

```
aabb
```

then click on "solve exercise" (this is a shortcut --- the software is intended for students to create their own FSA, but that's beyond what we're doing in this chapter).

You should get a very simple FSA!

To test your FSA, right-click on the background and choose "Track input".

Now try some more complex regular expressions, such as the following. For each one, type it in, click on "solve exercise", and then track some sample inputs to see how it accepts and rejects different strings.

```
aa*b
a(bb)*
(bba*)*
(b*a)*a
```

Your project report should show the regular expressions, explain what kind of strings they match, show the corresponding FSAs, show the sequence of states that some sample test strings would go through, and you should explain how the components of the FSA correspond the parts of the regular expression using examples.


**Converting with JFLAP**

If you're using [JFLAP](http://www.jflap.org) for your project, you can have almost any character as input.
The main exceptions are "\*", "+" (confusingly, the "+" is used instead of "|" for alternatives), and "!" (which is the empty string --- in the preferences you can choose if it is shown as {math}\lambda{math end} or {math}\epsilon{math end}).

So the main operators available in JFLAP are:

- `a*` matches 0 or more repetitions of a
- `a+b` matches a or b
- `(aa+bb)*` Parentheses group commands together; in this case it gives a mixture of pairs of "a"s and pairs of "b"s.

The JFLAP software can work with all sorts of formal languages, so you'll need to ignore a lot of the options that it offers! This section will guide you through exactly what to do.

There are some details about the format that JFLAP uses for regular expressions in the following tutorial --- just read the "Definition" and "Creating a regular expression" sections.

[http://www.jflap.org/tutorial/regular/index.html](http://www.jflap.org/tutorial/regular/index.html)

As a warmup, we'll convert this regex to an FSA:

```
ab*b
```

On the main control window of JFLAP click on "Regular Expression", and type your regular expression into JFLAP:

{image filename="jflap-ab-star-a-regex-screenshot.png" alt="Entering ab\*a into JFLAP"}

{comment}

.. TCB details on conversion are at: http://www.jflap.org/tutorial/fa/createfa/fa.html

{comment}

From the "Convert" menu choose "Convert to NFA".
This will only start the conversion; press the "Do all" button to complete it (the system is designed to show all the steps of the conversion, but we just want the final result).
For the example, we get the following non-deterministic finite automaton (NFA), which isn't quite what we want and probably looks rather messy:

{image filename="jflap-ab-star-a-nfa-screenshot.png" alt="The NFA produced (messy intermediate version of the FSA)"}

We need a DFA (deterministic FA), not an NFA.
To convert the NFA to a DFA, press the "Export" button, then from the "Convert" menu, choose "Convert to DFA", press the "Complete" button to complete the conversion, and then the "Done?" button, which will put it in a new window:

{image filename="jflap-ab-star-a-dfa-screenshot.png" alt="After conversion to a DFA"}

We're nearly there. If it's hard to read the FSA, you can move states around by choosing the arrow tool (on the left of the tool bar --- if the states won't move when you grab them, so make sure you click on the arrow icon before trying to move them). The states may have some extraneous labels underneath them; you can hide those by selecting the arrow tool, right-click on the white part of the window and un-check "Display State Labels".

{image filename="jflap-ab-star-a-dfa-tidy-screenshot.png" alt="After tidying up the DFA"}

If the FSA is simple enough, it may be just as easy if you now copy the diagram by hand and try to set it out tidily yourself, otherwise you can save it as an image to put into your project.

{comment}

.. xTCB need to say this here? You'll need to click the "Done" button to finish the conversion.

{comment end}

Now try some sample inputs. The starting state is labeled q0 and will have a large arrow pointing at it. You can get JFLAP to run through some input for you by using the "Input" menu. "Step by state" will follow your input state by state, "Fast run" will show the sequence of states visited for your input, and "Multiple run" allows you to load a list of strings to test.

Multiple runs are good for showing lots of tests on your regular expression:

{image filename="jflap-ab-star-a-dfa-tidy-output-screenshot.png" alt="After tidying up the DFA"}

For example, "ab" is rejected because it would only get to state 2.

Now you should come up with your own regular expressions that test out interesting patterns, and generate FSA's for them.
In JFLAP you can create FSAs for some of regular expressions we used earlier, such as (simple) dates, email addresses or URLs.

Your project report should show the regular expressions, explain what kind of strings they match, show the corresponding FSAs, show the sequence of states that some sample test strings would go through, and you should explain how the components of the FSA correspond to the parts of the regular expression using examples.

{panel end}

{panel type="project" summary="Other ideas for projects and activities"}

Here are some more ideas that you could use to investigate regular expressions:

- On the [regexdict site](http://www.visca.com/regexdict/), read the instructions on the kinds of
{glossary-definition term="Pattern matching" definition="In formal languages, finding text that matches a particular rule, typically using a regular expression to give the rule."}
{glossary-link term="pattern matching" reference-text="Formal languages"}pattern matching{glossary-link end}
it can do, and write regular expressions for finding words such as:

 - words that contain "aa"
 - all words with 3 letters
 - all words with 8 letters
 - all words with more than 8 letters
 - words that include the letters of your name
 - words that are made up *only* of the letters in your name
 - words that contain all the vowels in reverse order
 - words that you can make using only the notes on a piano (i.e the letters A to G and a to g)
 - words that are exceptions to the rule "i before e except after c" --- make sure you find words like "forfeit" as well as "science".

- Microsoft Word’s *Find* command uses regular expressions if you select the "Use wildcards" option. For more details see [Graham Mayor](http://word.mvps.org/AboutMVPs/graham_mayor.htm)'s [Finding and Replacing Characters using Wildcards](http://word.mvps.org/FAQs/General/UsingWildcards.htm).

- Explore regular expressions in spreadsheets. The Google docs spreadsheet has a function called RegExMatch, RegExExtract and RegExReplace. In Excel they are available via Visual Basic.

- Knitting patterns are a form of regular expression. If you're interested in knitting, you could look into how they are related through the [article about knitting and regular expressions at CS4FN site](http://www.cs4fn.org/regularexpressions/knitters.php).

- The "grep" command is available in many command line systems, and matches a regular expression in the command with lines in an input file. (the name comes from "Global Regular Expression Parser"). Demonstrate the grep command for various regular expressions.

- Functions for matching against regular expressions appear in most programming languages. If your favourite language has this feature, you could demonstrate how it works using sample regular expressions and strings.

- Advanced: The free tools *lex* and *flex* are able to take specifications for regular expressions and create programs that parse input according to the rules. They are commonly used as a front end to a compiler, and the input is a program that is being compiled. You could investigate these tools and demonstrate a simple implementation.

{comment}
.. TCB xJRM [non-urgent, and probably not likely to be successful] Are there similar patterns for flax weaving to add to the knitting patterns above? I can't open sites that should have them; for example, are there patterns here? www.alibrown.co.nz/instructions.html These might be more relevant/interesting
{comment end}
{panel end}

{panel type="teacher-note" summary="More information on regular expressions"}

There is a wealth of information on regexes at: [http://www.regular-expressions.info/](http://www.regular-expressions.info/)

[Regex Coach](http://weitz.de/regex-coach/) is a graphical application for Windows that can be used to experiment with regular expressions interactively.

Other sites for experimenting with regular expressions include:

- [http://regexpal.com/](http://regexpal.com/) (matches while typing)
- [http://www.regexplanet.com/advanced/javascript/index.html](http://www.regexplanet.com/advanced/javascript/index.html) (has variations of regexes for multiple programming languages)
- [http://www.txt2re.com/](http://www.txt2re.com/) --- you type in a sample text and it tries to suggest a regex!
- [http://www.regextester.com/](http://www.regextester.com/)
- [http://www.pyweek.org/e/RegExExpress/](http://www.pyweek.org/e/RegExExpress/)
- [https://regexhero.net/  (may have a fee)](https://regexhero.net/)
- [http://www.brics.dk/automaton/](http://www.brics.dk/automaton/)
- [http://www.regular-expressions.info/javascriptexample.html](http://www.regular-expressions.info/javascriptexample.html)


{panel end}

## Grammars and parsing

{comment}
.. warning:: this section hasn't been completed yet; the material below is just an introduction
{comment end}

{panel type="teacher-note" summary="Section is incomplete"}
Currently the section is only introductory.

There's an introduction to this topic (which dwells more on English grammar) at: [http://ozark.hendrix.edu/~burch/cs/150/reading/grammar/index.html](http://ozark.hendrix.edu/~burch/cs/150/reading/grammar/index.html). This could be used for class discussion.

As preparation for reading this chapter, you could do the "planet ABBA" activity with the students as a class, as it will get them familiar with the notation.
{panel end}

{comment}

.. xtcb either a card game where you can substitute using grammar rules (given a string, try to apply grammar from bottom up --- replace sequence with terminal, backtracking allowed i.e. replace terminal again - use images instead of a/b? images could be apple/banana, maybe parentheses?), or a html5 where you have to solve a puzzle (rules to get to a given string)

.. xtcb http://cs.jhu.edu/~jason/papers/#eisner-smith-2008-tnlp may be useful (competitive grammar writing)

.. Near start: teacher: Planet ABBA, money grammar and silly sentences activity, from http://www.mathmaniacs.org/lessons/06-grammars/index.html, with worksheets added:
.. http://www.cosc.canterbury.ac.nz/tim.bell/dt/fg-images/FL-grammars-mathmaniacs.pdf
.. Gets students thinking about basics of grammars.

{comment end}

With unusual grammar Yoda from Star Wars speaks.
Yet still understand him, people can.
The flexibility of the rules of English grammar mean that you can usually be understood if you don't get it quite right, but it also means that the rules get very complicated and difficult to apply.

Grammars in formal languages are much more predictable than grammars in human languages --- that's why they're called *formal* languages!
When you're doing English, grammar can be a tricky topic because not only are there are so many rules, but there are also so many exceptions --- for example, you need an apostrophe if you write "the computer's USB port", but you have to leave it out if you say "its USB port".

{glossary-definition term="Grammar" definition="In formal languages, a set of rules for specifying a language, for example, to specify syntax for programming languages."}
{glossary-link term="grammar" reference-text="Formal languages"}Grammars{glossary-link end}
in computer science are mainly used to specify programming languages and file formats, and compilers make a fuss even if you leave out just one bracket or comma!
But at least they're predictable.

{comment}

.. Starting example - only one or two strings in language? Planet ABBA ? use simple english grammar?

{comment end}

In this section [when it is finished!] we'll look at the kind of grammars that are widely used in computer science.
They are very powerful because they allow a complicated system (like a compiler or a format like HTML) to be specified in a very concise way, and there are programs that will automatically take the grammar and build the system for you.
The grammars for conventional programming languages are a bit too unwieldy to use as initial examples (they usually take a few pages to write out), so we're going to work with some small examples here, including parts of the grammars for programming languages.


Note: the remainder of this section is yet to be developed.

{comment}

.. TCB to keep things tidy, raw material has been moved to https://docs.google.com/document/d/1GvMxAGAso8cD5n-tuzJsGgPSQDWmKLuAAWrSFZw4Xbo/edit

{comment end}


{panel type="project" summary="Other ideas for projects and activities"}

(Note that these will make more sense when the previous introduction to grammars has been completed!)

- Demonstrate how compilers, interpreters, parsers or validators find errors in formal languages e.g. introduce an error to a compiled program, XML document file or web page, and show the effect of the error.

- Find a grammar for a programming language, and show how a sample program would be parsed using the grammar.

- Use examples to show the parse tree (or tree) for a correct and incorrect program fragment, or to show a sequence of grammar productions to construct a correct program fragment

- Explore the grammar for balanced parentheses S -> SS, S -> (S), S -> ( )

- Find a grammar for a simple arithmetic expression in a programming language, and show the parse tree for sample expressions (such as (a+b)\*(c-d) ).

{panel end}

{panel type="project" summary="Grammars in art and music"}


{image filename="context-free-tree-screenshot.png" alt="A tree drawn using the software from contextfreeart.org" source="http://contextfreeart.org/"}

The *context free art* program ( [http://www.contextfreeart.org/](http://www.contextfreeart.org/) ) enables you to specify images using a context-free grammar. For example, the following pictures of trees are defined by just a few rules that are based around a forest being made of trees, a tree being made of branches, and the branches in turn being made of branches themselves! These simple definitions can create images with huge amounts of detail because the drawing process can break down the grammar into as many levels as required. You can define your own grammars to generate images, and even make a movie of them being created, like the one below. Of course, if you do this as a project make sure you understand how the system works and can explain the formal language behind your creation.

{video url="http://player.vimeo.com/video/52320658"}

{comment}

.. TCB the above context-free-tree video was generated from the context-free program --- you can control the frame rate etc. if a different version is needed. It is just "demo1" in the program. Music is from a song by Andrew Bell

{comment end}

The JFLAP program also has a feature for rendering "L-systems" ([https://en.wikipedia.org/wiki/L-system](https://en.wikipedia.org/wiki/L-system)), which are another way to use grammars to create structured images.
You'll need to read about how they work in the JFLAP tutorial
([http://www.jflap.org/tutorial/index.html](http://www.jflap.org/tutorial/index.html)),
and there's a more detailed tutorial at [http://www.cs.duke.edu/csed/pltl/exercises/lessons/20/L-system.zip](http://www.cs.duke.edu/csed/pltl/exercises/lessons/20/L-system.zip).
There are some sample files here to get you inspired: (the ones starting "ex10..." [http://www.cs.duke.edu/csed/jflap/jflapbook/files/](http://www.cs.duke.edu/csed/jflap/jflapbook/files/) )
and here's an example of the kind of image that can be produced:

{image filename="jflap-tree-leaves-l-systems-screenshot.png" alt="A tree drawn using L-systems in JFLAP"}

There's also an online system for generating images with L-systems: [http://www.kevs3d.co.uk/dev/lsystems/](http://www.kevs3d.co.uk/dev/lsystems/)

{comment}

.. These kinds of images are examples of fractals, which are structures where xxxx in nature: http://paulbourke.net/fractals/googleearth/

..  TCB give link to music grammar (info from David Bainbridge below)
.. Grammars have been defined for *music notation* [give link].

{comment end}

Grammars have been used for music notation:

{comment}

.. todo: xTCB need to investigate these.

.. some info at http://www.springerlink.com/content/c235877773143671/

{comment end}

- The following is the [BNF grammar for the ABC music format](http://web.archive.org/web/20080309023424/http://www.norbeck.nu/abc/abcbnf.htm)
- [http://abc.sourceforge.net/](http://abc.sourceforge.net/)
- [https://meta.wikimedia.org/wiki/Music_markup](https://meta.wikimedia.org/wiki/Music_markup)
- [http://www.emergentmusics.org/theory/15-implementation](http://www.emergentmusics.org/theory/15-implementation)
- analyse a simple piece of music in terms of a formal grammar.

{comment}

.. Even that, though, could be a bit intimidating. On the plus side, there's software and related .. resources out there to download and mess around with .. The following has a simpler set of rules in it that I think are easier to digest:
.. https://meta.wikimedia.org/wiki/Music_markup
.. and (I think) is a nice motivating example -- something that will let people writing Wikipedia pages concisely include music in the content they are authoring
.. I also stumbled across the following, which might be of interest:
.. http://www.emergentmusics.org/theory/15-implementation

{comment end}

{panel end}

## The whole story!


{panel type="teacher-note" summary="Advanced material"}
In this section we provide some pointers to advanced material on formal languages, which are beyond the scope of this chapter.
We wouldn't expect students to tackle the topics below, but there might be one or two who find the field interesting and want some pointers on where to look further, plus we want to make it clear that the chapter is only the beginning of what is a very rich part of computer science.
{panel end}

If you found the material in this chapter interesting, here are some topics that you might want to look into further, as we've only just scratched the surface of what can be done with formal languages.

Formal languages come up in various areas of computer science, and provide invaluable tools for the computer scientist to reduce incredibly complex systems to a small description, and conversely to create very complex systems from a few simple rules.
They are essential for writing compilers, and so are activated every time someone writes a program! They are also associated with automata theory and questions relating to computability, and are used to some extent in natural language processing, where computers try to make sense of human languages.

Technically the kind of finite state automata (FSA) that we used in the
[Finite state automata](chapters/formal-languages.html#regular-expressions-and-fsas)
section is a kind known as a *Deterministic Finite Automata* (DFA), because the decision about which transition to take is unambiguous at each step.
Sometimes it's referred to as a *Finite State Acceptor* because it accepts and rejects input depending on whether it gets to the final state.
There are all sorts of variants that we didn't mention, including the Mealy and Moore machines (which produce an output for each each transition taken or state reached), the nested state machine (where each state can be an FSA itself), the non-deterministic finite automata (which can have the same label on more than one transition out of a state), and the lambda-NFA (which can include transitions on the empty string, {math}\lambda{math end}).
Believe it or not, all these variations are essentially equivalent, and you can convert from one to the other. They are used in a wide range of practical situations to design systems for processing input.

However, there are also more complex models of computation such as the push-down automaton (PDA) which is able to follow the rules of context-free grammars, and the most general model of computation which is called a Turing machine.
These models are increasingly complicated and abstract, and structures like the Turing machine aren't used as physical devices (except for fun), but instead as a tool for reasoning about the limits on what can be computed.
In fact, in principle every digital computer is a kind of limited turing machine, so whatever limits we find for a Turing machine gives us limits for everyday computation.

{comment}
.. TCB  if we decide to cover non deterministic automata - could use a humorous approach - e.g. train route is semi-random, or several passengers try out all routes?
{comment end}

The Turing machine is named after Alan Turing, who worked on these concepts in the early 20th century (that's the same person from whom we got the Turing test in AI, which is something quite different --- Turing's work comes up in many areas of computer science!) If you want to investigate the idea of a Turing machine and you like chocolate, there's [an activity on the cs4fn site](http://www.cs4fn.org/turing/turingmachines.php) that gives examples of how it works.
The Kara programming environment also has a [demonstration of Turing machines](http://www.swisseduc.ch/compscience/karatojava/turingkara/)

{comment}

.. other languages

{comment end}

This chapter looked at two main kinds of formal language: the regular expression (RE) and the context-free grammar (CFG). These typify the kinds of languages that are widely used in compilers and file processing systems. Regular expressions are good for finding simple patterns in a file, like identifiers, keywords and numbers in a program, or tags in an HTML file, or dates and URLs in a web form. Context-free grammars are good when you have nested structures, for example, when an expression is made up of other expressions, or when an "if" statement includes a block of statements, which in turn could be "if" statements, ad infinitum.
There are more powerful forms of grammars that exist, the most common being context-sensitive grammars and unrestricted grammars, which allow you to have more than one non-terminal on the left hand side of a production; for example, you could have

xAy {math}\to{math end} aBb,

which is more flexible but a lot harder to work with.
The relationships between the main kinds of grammars was described by the linguist Noam Chomsky, and is often called the
{glossary-definition term="Chomsky Hierarchy" definition="A hierarchy of four classifications of formal languages, ranging from simple regular expressions to very flexible (but computationally difficult) grammars."}
{glossary-link term="Chomsky Hierarchy" reference-text="Formal languages"}Chomsky Hierarchy{glossary-link end}
after him.

There is a direct correspondence between the "machines" (such as the FSA) and languages (such as the Regular Expression), as each increasingly complex language needs the correspondingly complex machine to process it.
For example, an FSA can be used to determine if the input matches a given Regular Expression, but a PDA is needed to match a string to a CFG.
The study of formal languages looks at these relationships, and comes up with ways to create the appropriate machines for a given language and vice versa.

There are many tools available that will read in the specification for a language and produce another program to parse the language; some common ones are called "Lex" and "Flex" (both perform lexical anaylsis of regular expressions), "Yacc" ("yet another compiler compiler") and "Bison" (an improved version of Yacc).
These systems make it relatively easy to make up your own programming language and construct a compiler for it, although they do demand quite a range of skills to get the whole thing working!

{comment}
.. xTCB need to check on facts above about lex/flex/yacc/bison
{comment end}

So we've barely got started on what can be done with formal languages, but the intention of this chapter is to give you a taste of the kind of structures that computer scientists work with, and the powerful tools that have been created to make it possible to work with infinitely complex systems using small descriptions.


## Further reading

Some of the material in this chapter was inspired by [http://www.ccs3.lanl.gov/mega-math/workbk/machine/malearn.html](https://web.archive.org/web/20130102053644/http://www.ccs3.lanl.gov/mega-math/workbk/machine/malearn.html)

There's a good article on finite state machines at
[http://www.i-programmer.info/babbages-bag/223-finite-state-machines.html](http://www.i-programmer.info/babbages-bag/223-finite-state-machines.html)

### Books

Textbooks on formal languages will have considerably more advanced material and more mathematical rigour than could be expected at High School level, but for students who really want to read more, a popular book is
"Introduction to the Theory of Computation" by Michael Sipser.

Regular expressions and their relationship with FSAs is explained well in the book "Algorithms" by Robert Sedgewick.


### Useful Links

- [https://en.wikipedia.org/wiki/Formal_language](https://en.wikipedia.org/wiki/Formal_language)
- [https://en.wikipedia.org/wiki/Context-free_grammar#Examples](https://en.wikipedia.org/wiki/Context-free_grammar#Examples)
- [https://en.wikipedia.org/wiki/Abstract_syntax_tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
- [https://en.wikipedia.org/wiki/Regular_expression](https://en.wikipedia.org/wiki/Regular_expression)
- [http://csunplugged.org/finite-state-automata](http://csunplugged.org/finite-state-automata)
- [http://www.i-programmer.info/babbages-bag/223-finite-state-machines.html](http://www.i-programmer.info/babbages-bag/223-finite-state-machines.html)
- [http://www.jflap.org/](http://www.jflap.org/)
- [https://en.wikipedia.org/wiki/Deterministic_finite_automaton](https://en.wikipedia.org/wiki/Deterministic_finite_automaton)
- [https://en.wikipedia.org/wiki/Finite-state_machine](https://en.wikipedia.org/wiki/Finite-state_machine)

{comment}

.. TCB the following is a concise summary of many of the concepts mentioned in this chapter; not directly useful for students, but kept as a comment as it could be useful for chapter authors: http://www.csee.umbc.edu/portal/help/theory/automata_def.shtml and http://www.csee.umbc.edu/portal/help/theory/lang_def.shtml


.. xTCB add some of the following if/when used in the grammar section:
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

{comment end}
