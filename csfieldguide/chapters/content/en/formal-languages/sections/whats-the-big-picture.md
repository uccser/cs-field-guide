# What's the big picture?

Whenever you get errors like the one in the introduction, you're dealing with a {glossary-link term="formal-language"}formal language{glossary-link end}.
Formal languages specify strict rules such as "all parentheses must be balanced", "all commands in the program must be keywords selected from a small set", or "the date must contain three numbers separated by dashes".

Formal languages aren't just used for {glossary-link term="programming-language"}programming languages{glossary-link end} &ndash; they're used anywhere the format of some input is tightly specified, such as typing an email address into a web form.

In all these cases, the commands that you have typed (whether in Python, Scratch, Snap!, C, Pascal, Basic, C#, HTML, or XML) are being read by a computer program (That's right... Python is a program that reads in Python programs).
In fact, the {glossary-link term="compiler"}compiler{glossary-link end} for a programming language is often written in its own language.
Most C compilers are written in C &ndash; which begs the question, who wrote the first C compiler (and what if it had bugs)?!
Computer Scientists have discovered good ways to write programs that process other programs, and a key ingredient is that you have to specify what is allowed in a program very precisely.
That's where formal languages come in.

Many of the concepts we'll look at in this chapter are used in a variety of other situations: checking input to a web page; analysing user interfaces; searching text, particularly with "wild cards" that can match any sequence of character; creating logic circuits; specifying communication protocols; and designing embedded systems.
Some advanced concepts in formal languages are even used to explore limits of what can be computed.

Once you're familiar with the idea of formal languages, you'll possess a powerful tool for cutting complex systems down to size using an easily specified format.

{image file-path="img/chapters/xkcd-tags.png" hover-text="<A>: Like </a>this." alt="A xkcd cartoon comment on HTML tags" source="https://xkcd.com/1144/"}
