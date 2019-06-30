# The whole story!

{panel type="teacher-note"}

# Advanced material

In this section we provide some pointers to advanced material on formal languages, which are beyond the scope of this chapter.
We wouldn't expect students to tackle the topics below, but there might be one or two who find the field interesting and want some pointers on where to look further, plus we want to make it clear that the chapter is only the beginning of what is a very rich part of computer science.

{panel end}

If you found the material in this chapter interesting, here are some topics that you might want to look into further, as we've only just scratched the surface of what can be done with formal languages.

Formal languages come up in various areas of computer science, and provide invaluable tools for the computer scientist to reduce incredibly complex systems to a small description, and conversely to create very complex systems from a few simple rules.
They are essential for writing compilers, and so are activated every time someone writes a program! They are also associated with automata theory and questions relating to computability, and are used to some extent in natural language processing, where computers try to make sense of human languages.

Technically the kind of finite state automata (FSA) that we used in the
[Finite state automata]('chapters:chapter_section' 'formal-languages' 'finite-state-automata') section is a kind known as a *Deterministic Finite Automata* (DFA), because the decision about which transition to take is unambiguous at each step.
Sometimes it's referred to as a *Finite State Acceptor* because it accepts and rejects input depending on whether it gets to the final state.
There are all sorts of variants that we didn't mention, including the Mealy and Moore machines (which produce an output for each each transition taken or state reached), the nested state machine (where each state can be an FSA itself), the non-deterministic finite automata (which can have the same label on more than one transition out of a state), and the lambda-NFA (which can include transitions on the empty string, \( \lambda \)).
Believe it or not, all these variations are essentially equivalent, and you can convert from one to the other.
They are used in a wide range of practical situations to design systems for processing input.

{interactive slug="nfa-guesser" type="in-page"}

However, there are also more complex models of computation such as the push-down automaton (PDA) which is able to follow the rules of context-free grammars, and the most general model of computation which is called a Turing machine.
These models are increasingly complicated and abstract, and structures like the Turing machine aren't used as physical devices (except for fun), but instead as a tool for reasoning about the limits on what can be computed.
In fact, in principle every digital computer is a kind of limited Turing machine, so whatever limits we find for a Turing machine gives us limits for everyday computation.

{comment if we decide to cover non deterministic automata - could use a humorous approach - e.g. train route is semi-random, or several passengers try out all routes?}

The Turing machine is named after Alan Turing, who worked on these concepts in the early 20th century (that's the same person from whom we got the Turing test in AI, which is something quite different &ndash; Turing's work comes up in many areas of computer science!) If you want to investigate the idea of a Turing machine and you like chocolate, there's [an activity on the cs4fn site](http://www.cs4fn.org/turing/turingmachines.php) that gives examples of how it works.
The Kara programming environment also has a [demonstration of Turing machines](http://www.swisseduc.ch/compscience/karatojava/turingkara/)

This chapter looked at two main kinds of formal language: the regular expression (RE) and the context-free grammar (CFG). These typify the kinds of languages that are widely used in compilers and file processing systems. Regular expressions are good for finding simple patterns in a file, like identifiers, keywords and numbers in a program, or tags in an HTML file, or dates and URLs in a web form. Context-free grammars are good when you have nested structures, for example, when an expression is made up of other expressions, or when an "if" statement includes a block of statements, which in turn could be "if" statements, ad infinitum.
There are more powerful forms of grammars that exist, the most common being context-sensitive grammars and unrestricted grammars, which allow you to have more than one non-terminal on the left hand side of a production; for example, you could have

xAy \( \to \) aBb,

which is more flexible but a lot harder to work with.
The relationships between the main kinds of grammars was described by the linguist Noam Chomsky, and is often called the {glossary-link term="chomsky-hierarchy" reference-text="Formal languages"}Chomsky Hierarchy{glossary-link end} after him.

There is a direct correspondence between the "machines" (such as the FSA) and languages (such as the Regular Expression), as each increasingly complex language needs the correspondingly complex machine to process it.
For example, an FSA can be used to determine if the input matches a given Regular Expression, but a PDA is needed to match a string to a CFG.
The study of formal languages looks at these relationships, and comes up with ways to create the appropriate machines for a given language and vice versa.

There are many tools available that will read in the specification for a language and produce another program to parse the language; some common ones are called "Lex" and "Flex" (both perform lexical analysis of regular expressions), "Yacc" ("yet another compiler compiler") and "Bison" (an improved version of Yacc).
These systems make it relatively easy to make up your own programming language and construct a compiler for it, although they do demand quite a range of skills to get the whole thing working!

{comment need to check on facts above about lex/flex/yacc/bison}

So we've barely got started on what can be done with formal languages, but the intention of this chapter is to give you a taste of the kind of structures that computer scientists work with, and the powerful tools that have been created to make it possible to work with infinitely complex systems using small descriptions.
