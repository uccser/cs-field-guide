# Grammars and parsing

{panel type="teacher-note"}

# Section is incomplete

Currently the section is only introductory.

There's an introduction to this topic (which dwells more on English grammar) at Dr. Carl Burch's [foundations of computer science website](http://www.cburch.com/cs/150/reading/grammar/index.html). This could be used for class discussion.

As preparation for reading this chapter, you could do the "planet ABBA" activity with the students as a class, as it will get them familiar with the notation.

{panel end}

With unusual grammar Yoda from Star Wars speaks.
Yet still understand him, people can.
The flexibility of the rules of English grammar mean that you can usually be understood if you don't get it quite right, but it also means that the rules get very complicated and difficult to apply.

{glossary-link term="grammar" reference-text="Formal languages"}Grammars{glossary-link end} in formal languages are much more predictable than grammars in human languages &ndash; that's why they're called *formal* languages!
When you're doing English, grammar can be a tricky topic because not only are there are so many rules, but there are also so many exceptions &ndash; for example, you need an apostrophe if you write "the computer's USB port", but you have to leave it out if you say "its USB port".

Grammars in computer science are mainly used to specify programming languages and file formats, and compilers make a fuss even if you leave out just one bracket or comma!
But at least they're predictable.

In this section [when it is finished!] we'll look at the kind of grammars that are widely used in computer science.
They are very powerful because they allow a complicated system (like a compiler or a format like HTML) to be specified in a very concise way, and there are programs that will automatically take the grammar and build the system for you.
The grammars for conventional programming languages are a bit too unwieldy to use as initial examples (they usually take a few pages to write out), so we're going to work with some small examples here, including parts of the grammars for programming languages.

Note: the remainder of this section is yet to be developed.

{panel type="project"}

# Other ideas for projects and activities

(Note that these will make more sense when the previous introduction to grammars has been completed!)

- Demonstrate how compilers, interpreters, parsers or validators find errors in formal languages e.g. introduce an error to a compiled program, XML document file or web page, and show the effect of the error.

- Find a grammar for a programming language, and show how a sample program would be parsed using the grammar.

- Use examples to show the parse tree (or tree) for a correct and incorrect program fragment, or to show a sequence of grammar productions to construct a correct program fragment.

- Explore the grammar for balanced parentheses: S -> SS, S -> (S), S -> ( )

- Find a grammar for a simple arithmetic expression in a programming language, and show the parse tree for sample expressions (such as (a+b)\*(c-d) ).

{panel end}

{panel type="project"}

# Grammars in art and music

{image file-path="img/chapters/context-free-tree-screenshot.png" alt="A tree drawn using the software from contextfreeart.org" source="http://contextfreeart.org/"}

The *context free art* program ( [http://www.contextfreeart.org/](http://www.contextfreeart.org/) ) enables you to specify images using a context-free grammar.
For example, the following pictures of trees are defined by just a few rules that are based around a forest being made of trees, a tree being made of branches, and the branches in turn being made of branches themselves! These simple definitions can create images with huge amounts of detail because the drawing process can break down the grammar into as many levels as required.
You can define your own grammars to generate images, and even make a movie of them being created, like the one below.
Of course, if you do this as a project make sure you understand how the system works and can explain the formal language behind your creation.

{video url="http://player.vimeo.com/video/52320658"}

The JFLAP program also has a feature for rendering "L-systems" ([https://en.wikipedia.org/wiki/L-system](https://en.wikipedia.org/wiki/L-system)), which are another way to use grammars to create structured images.
You'll need to read about how they work in the JFLAP tutorial
([http://www.jflap.org/tutorial/index.html](http://www.jflap.org/tutorial/index.html)),
and there's a more detailed tutorial at [http://www.cs.duke.edu/csed/pltl/exercises/lessons/20/L-system.zip](http://www.cs.duke.edu/csed/pltl/exercises/lessons/20/L-system.zip).
There are some sample files here to get you inspired: (the ones starting "ex10..." [http://www.cs.duke.edu/csed/jflap/jflapbook/files/](http://www.cs.duke.edu/csed/jflap/jflapbook/files/) )
and here's an example of the kind of image that can be produced:

{image file-path="img/chapters/jflap-tree-leaves-l-systems-screenshot.png" alt="A tree drawn using L-systems in JFLAP"}

There's also an online system for generating images with L-systems: [http://www.kevs3d.co.uk/dev/lsystems/](http://www.kevs3d.co.uk/dev/lsystems/)

Grammars have been used for music notation:

- The following is the [BNF grammar for the ABC music format](http://web.archive.org/web/20080309023424/http://www.norbeck.nu/abc/abcbnf.htm)
- [http://abc.sourceforge.net/](http://abc.sourceforge.net/)
- [https://meta.wikimedia.org/wiki/Music_markup](https://meta.wikimedia.org/wiki/Music_markup)
- [http://www.emergentmusics.org/theory/15-implementation](http://www.emergentmusics.org/theory/15-implementation)
- analyse a simple piece of music in terms of a formal grammar.

{panel end}
