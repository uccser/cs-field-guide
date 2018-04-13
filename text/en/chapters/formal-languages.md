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

The language sheets from both groups are then collected in. Sheets from group A are distributed to group B, and vice versa. The pairs now read the "language" description and fill in the bottom half of the language sheet with four strings that the FSM will accept and four that it will not accept. Here the students are acting as "programmers", trying to get the computer on the other side to perform a certain task.

The language sheets are then collected in again, and those from group A distributed to group B and group B’s to group A. There is no need for pairs to get their original sheet back. The pairs are now "computers" and need to check that the input provided at the bottom of the language sheet conforms to the FSA. If one of the strings is accepted or rejected incorrectly, groups will need to work out where the error came from.

Follow-up discussion can review whether some descriptions were longer than they needed to be or confusing to understand, and whether the language of the machines were captured properly.

{panel end}

{panel type="video" summary="Introductory videos on regular expressions"}

We have a [short video series on regular expressions available here](https://www.youtube.com/playlist?list=PL6A42PgbxHNQ5U_GHkTfR_CooeAXnZDcA).

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

- Knitting patterns are a form of regular expression. If you're interested in knitting, you could look into how they are related through the [article about knitting and regular expressions at the CS4FN site](http://www.cs4fn.org/regularexpressions/knitters.php).

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

{interactive name="nfa-guesser" type="in-page"}

However, there are also more complex models of computation such as the push-down automaton (PDA) which is able to follow the rules of context-free grammars, and the most general model of computation which is called a Turing machine.
These models are increasingly complicated and abstract, and structures like the Turing machine aren't used as physical devices (except for fun), but instead as a tool for reasoning about the limits on what can be computed.
In fact, in principle every digital computer is a kind of limited Turing machine, so whatever limits we find for a Turing machine gives us limits for everyday computation.

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

{glossary-link term="Chomsky Hierarchy" reference-text="Formal languages"}Chomsky Hierarchy{glossary-link end}
after him.

There is a direct correspondence between the "machines" (such as the FSA) and languages (such as the Regular Expression), as each increasingly complex language needs the correspondingly complex machine to process it.
For example, an FSA can be used to determine if the input matches a given Regular Expression, but a PDA is needed to match a string to a CFG.
The study of formal languages looks at these relationships, and comes up with ways to create the appropriate machines for a given language and vice versa.

There are many tools available that will read in the specification for a language and produce another program to parse the language; some common ones are called "Lex" and "Flex" (both perform lexical analysis of regular expressions), "Yacc" ("yet another compiler compiler") and "Bison" (an improved version of Yacc).
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
