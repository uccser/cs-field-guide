# Grammars and Parsing

The regular languages that we looked at in previous sections are great for some common applications, but they can’t do the kind of processing needed to create programming languages and some other important applications.
For these we need grammars, which are more powerful than regular expressions.
In this section we’ll look at a particularly useful kind of grammar called the “context-free grammar”, or CFG.
Don’t worry too much about the long name; “context-free” just refers to what it can’t do.
A CFG is fairly simple, but it can achieve a lot of important work for us.

Bear in mind that the whole point of formal languages is that they make complicated things easy to do.
CFGs are widely used in computer science to write new programming languages, and to implement markup languages like HTML and XML.
They are very powerful because they allow a complicated system (like a compiler, or HTML display software) to be specified in a very concise way, and there are programs that will automatically take the grammar and build the system for you.
The grammars for conventional programming languages are a bit too unwieldy to use as initial examples (they usually take a few pages to write out), so we're going to work with some small examples here, but we’ll include parts of the grammars that are used for programming languages.

{panel type="additional-information"}

# Grammar? Isn’t that about all the archaic rules for writing in English

With unusual grammar Yoda from Star Wars speaks.
Yet still understand him, people can.
The flexibility of the rules of English grammar means that you can usually be understood if you don't get it quite right, but it also means that the rules get very complicated and difficult to apply.

In Computer Science, “formal languages” use grammars that are much more predictable than grammars in human languages – that's why they're called formal languages!
When you're learning English, grammar can be a tricky topic because not only are there so many rules, but there are also so many exceptions – for example, you need an apostrophe if you write "plug into the computer's USB port", but you have to leave it out if you say "plug into its USB port".

Grammars in computer science are mainly used to specify programming languages and file formats, and these systems make a fuss even if you leave out just one bracket or comma!

But at least the errors are easy to explain, and easy to fix.

{panel end}

## Starting off with a simple grammar

{panel type="teacher-note"}

# Teacher Note

The URLs for the grammar interactive in this section contain productions and sample strings for students to try to solve.
We’ve provided many examples, but if you are used to working with CFGs, you can create your own grammar using the "Customise productions" button in the interactive to generate a URL for your own example.
A dialogue box will come up explaining how to do this.
You can also start with the examples we’ve provided, and make changes to them by copying the links and editing the URLs.

{panel end}

To show you how grammars work, we’re going to make you do the work that we’d normally get a computer to do with a grammar.
The ones we’ll start with are just “toy” examples; they’re simpler than most grammars that are used in practice, but they’re a good stepping stone.
Watch this video for a demonstration of the system we’ll use.

{video url="https://vimeo.com/673021979"}

Now it’s your turn to experiment with a grammar!
In the interactive you’ll see a large “S” in the middle.
Clicking on the S lets you replace it using one of the two rules (the technical name for the substitution rules is productions).
See if you can work out the productions you need to choose to generate the text in the white box - the generated text will show a green background if you get it right.
This “History” box will show the sequence of productions that you used.

Hint: you can get different challenges by clicking on the “Next” button.
Hit the “Reset” button to start over.

{interactive slug="cfg-parsing-challenge" type="whole-page" text="true" parameters="productions=S:%27a%27%20S%20%27a%27%20%7C%20%27b%27&examples=b%7Caba%7Caabaa%7Caaabaaa&hide-generator=true"}

CFG Parsing Challenge #1

{interactive end}

{panel type="spoilers"}

# CFG Parsing Challenge #1 - Answers

If the text is just a “b”, click on S → b.

If it is “aba”, click on S → aSa, then S → b.

If it is “aabaa”, click on S → aSa, then S → aSa again, then S → b.

{panel end}

{panel type="curiosity"}

# What is this puzzle solving?

By finding the productions to get from S to the string of characters you’ve been given, you are working out if the string is in the language of the grammar.
In practice, the string is often a whole computer program that is being checked - for example, if you write a program in a language like Python, Java, JavaScript or C#, before it can run it will be checked using a grammar designed for the language.
So the work you’ve just been doing is what happens every time you run or compile a program, only with a much bigger grammar and longer input string.
At the same time, it’s working out the structure of the program, which it will need to run it.

{panel end}

The examples you’ve tried so far are all strings of characters that are valid in the language.
Try solving this challenge - can you make the string “a” or “abaa” using the productions given?
If there’s no way to generate it, then the string isn’t in the language of the grammar.
The string has a syntax error.
You may have seen a syntax error before when you type in a program that doesn’t match the grammar of your programming language - it’s a grammar that is used to check if your text is in the language or not.

For example, the following Python code has a red underline at the end of the line:

{image file-path="img/chapters/python-grammar-example.png" alt="The image shows Python code with 'for i in range(23)' on the first line with a red underline under the final character"}

This is because the grammar requires a colon (:) at the end of the “for” command, but it got the end of the line instead.
Every time you get a syntax error in a program, it is an example of a grammar at work.

As mentioned earlier, the rules, such as “S → aSa”, are called productions.
In this case, the whole process starts with an “S”, and ends up producing a mixture of “a”s and “b”s.
The characters “a” and “b” are called terminals because they can’t be replaced by anything - they are a terminal state.
“S” is called a “non-terminal” because it is on the left hand side of a production, and will be replaced with something else.
In most of our examples, non-terminals are written as a capital letter, and terminals are in lower case.

You can type in your own challenges.
For example, type in “aaaabaaaa” into the white box in the interactive, and see if you can form it below using the rules.

The productions you are working with accept strings of characters that have a particular pattern.
A string is accepted if there’s a way to generate it with the grammar.
Can you give an English description of what kind of pattern the grammar above accepts?

{panel type="spoilers"}

# CFG Parsing Challenge #1 - Grammar description

These productions accept a “b” with an equal number of “a”s on each side of it.

{panel end}

Here’s a different grammar that you can try out:

{interactive slug="cfg-parsing-challenge" type="whole-page" text="true" parameters="productions=S:%27a%27%20S%20%27b%27%7C%27ab%27&examples=ab%7Caabb%7Caaaabbbb%7Caaaaaabbbbbb&hide-generator=true"}

CFG Parsing Challenge #2

{interactive end}

How would you explain the kinds of strings that this accepts?

{panel type="spoilers"}

# CFG Parsing Challenge #2 - Grammar description

The productions above accept strings that begin with some number of “a”s, followed by exactly the same number of “b”s.

{panel end}

Now here are some more challenges.
Note that the first production produces two “S” non-terminals, and although they are both called “S”, they don’t have to be the same.

{interactive slug="cfg-parsing-challenge" type="whole-page" text="true" parameters="productions=S:S%20S%20%7C%20%27a%27%20S%20%27b%27%7C%27ab%27&examples=ab%7Cabab%7Caabbaabb%7Cababab%7Cababaaaabbbb%7Caaaabbbbabaaabbbab&hide-generator=true"}

CFG Parsing Challenge #3

{interactive end}

The grammar above is a bit more complicated to describe in English, but you’ll probably get an idea of what sort of strings it accepts after you’ve tried a few examples.

The grammars we’ve used so far might not be directly useful, but hopefully you get the feel for how the productions in a grammar work.
Productions are used to check if the string you have is accepted by the rules of the grammar.
As with regular languages in the previous section, a string is either accepted by the grammar, or not.
For example, in the first grammar above, “aaabaaa” is accepted, but “bba” isn’t.
If you are given a string that isn’t in the grammar, then you won’t be able to find any combination of productions that can be used to create it.

**An important thing about CFG productions is that they can be used to check rules that a regular language can’t.**
(Remember that regular languages use regular expressions and finite state automata).
You won’t be able to build an FSA that checks that the number of “a”s before the “b” is the same as the number after it - try to create one and you’ll see the issue!

{panel type="jargon-buster"}

# Parsing

The process of working out the grammar rules that match a particular input string is called {glossary-link term="parsing" reference-text="Context-free grammars"}parsing{glossary-link end}.
The exercises you’ve been doing have been to parse the input using the context-free grammar you were given.

{panel end}

We sometimes explain how a string was parsed using a {glossary-link term="parse-tree" reference-text="Context-free grammars"}parse tree{glossary-link end}.
We’ll use this grammar as an example:

{image file-path="img/chapters/parse-tree-productions.png" alt="The image shows the productions S to SS, S to ab, and S to aSb."}

The following parse tree shows how you could use it to produce the string “abaabb”.
It starts with S at the top, and each branch in the tree (arrow) represents a production being used to replace a non-terminal.
For example, the top two arrows show S → SS, and the three-way branch from the right-hand S shows S → aSb (with the middle S then having its own two branches).


{panel type="project"}

# Grammars in art and music

{image file-path="img/chapters/context-free-tree-screenshot.png" alt="A tree drawn using the software from contextfreeart.org" source="http://contextfreeart.org/"}

The [context free art program](http://www.contextfreeart.org/) enables you to specify images using a context-free grammar.
For example, the following pictures of trees are defined by just a few rules that are based around a forest being made of trees, a tree being made of branches, and the branches in turn being made of branches themselves!
These simple definitions can create images with huge amounts of detail because the drawing process can break down the grammar into as many levels as required.
You can define your own grammars to generate images, and even make a movie of them being created, like the one below.
Of course, if you do this as a project make sure you understand how the system works and can explain the formal language behind your creation.

{video url="http://player.vimeo.com/video/52320658"}

The JFLAP program also has a feature for rendering "[L-systems](https://en.wikipedia.org/wiki/L-system)", which are another way to use grammars to create structured images.
You'll need to read about how they work in the [JFLAP tutorial](http://www.jflap.org/tutorial/index.html),
and there's a more detailed tutorial at [cs.duke.edu](http://www.cs.duke.edu/csed/pltl/exercises/lessons/20/L-system.zip).
There are some more sample files at [cs.duke.edu](http://www.cs.duke.edu/csed/jflap/jflapbook/files/) to get you inspired: (the ones starting "ex10...".
and here's an example of the kind of image that can be produced:

{image file-path="img/chapters/jflap-tree-leaves-l-systems-screenshot.png" alt="A tree drawn using L-systems in JFLAP"}

There's also an [online system for generating images with L-systems](http://www.kevs3d.co.uk/dev/lsystems/).

Grammars have been used for music notation:

- The following is the [BNF grammar for the ABC music format](http://web.archive.org/web/20080309023424/http://www.norbeck.nu/abc/abcbnf.htm)
- [abc.sourceforge.net](http://abc.sourceforge.net/)
- [wikimedia.org - Music_markup](https://meta.wikimedia.org/wiki/Music_markup)
- [emergentmusics.org](http://www.emergentmusics.org/theory/15-implementation)
- Analyse a simple piece of music in terms of a formal grammar.

{panel end}
