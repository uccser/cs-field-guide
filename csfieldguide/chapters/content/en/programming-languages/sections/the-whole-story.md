# The whole story!

There are many different programming languages, and new ones are always being invented.
Each new language will need a new compiler and/or interpreter to be developed to support it.
Fortunately there are good tools to help do this quickly, and some of these ideas will come up in the [Formal Languages]('chapters:chapter' 'formal-languages') chapter, where things like regular expressions and grammars can be used to describe a language, and a compiler can be built automatically from the description.

The languages we have discussed in this chapter are ones that you are likely to come across in introductory programming, but there are some completely different styles of languages that have very important applications.
There is an approach to programming called [functional programming](https://en.wikipedia.org/wiki/Functional_programming) where all operations are formulated as mathematical functions.
Common languages that use functional techniques include Lisp, Scheme, Haskell, Clojure and F#; even some conventional languages (such as Python) include ideas from functional programming.
A pure functional programming style eliminates a problem called *side effects*, and without this problem it can be easier to make sure a program does exactly what it is intended to do.
Another important type of programming is [logic programming](https://en.wikipedia.org/wiki/Logic_programming), where a program can be thought of as a set of rules stating what it should do, rather than instructions on how to do it.
The most well-known logic programming language is Prolog.
