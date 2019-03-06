# Formal Languages

If you've ever written a text-based program or typed a formula in a spreadsheet,
chances are that at some stage the system has told you there's an error and won't even attempt to follow your instructions.

{interactive slug="python-syntax-error" type="in-page"}

These "syntax errors" are annoying messages that programmers become excruciatingly familiar with... it means that they didn't follow the rules somehow, even if it's just a tiny mistake.
For example, suppose you intended to write:

```
x = (a+b) * (c+d)
```

but you accidentally left out one of the brackets:

```
x = (a+b) * c+d)
```

When you try to compile or run the program, the computer will tell you that there's an error.
If it's really helpful, it might even suggest where the error is, but it won't run the program until you fix it.

This might seem annoying, but in fact by enforcing precision and attention to detail it helps pinpoint mistakes before they become bugs in the program that go undetected until someone using it complains that it's not working correctly.

Whenever you get errors like this, you're dealing with a *formal language*.
Formal languages specify strict rules such as "all parentheses must be balanced", "all commands in the program must be keywords selected from a small set", or "the date must contain three numbers separated by dashes".

Formal languages aren't just used for programming languages — they're used anywhere the format of some input is tightly specified, such as typing an email address into a web form.

In all these cases, the commands that you have typed (whether in Python, Scratch, Snap!, C, Pascal, Basic, C#, HTML, or XML) are being read by a computer program (That's right... Python is a program that reads in Python programs).
In fact, the compiler for a programming language is often written in its own language.
Most C compilers are written in C — which begs the question, who wrote the first C compiler (and what if it had bugs)?! Computer Scientists have discovered good ways to write programs that process other programs, and a key ingredient is that you have to specify what is allowed in a program very precisely.
That's where formal languages come in.

Many of the concepts we'll look at in this chapter are used in a variety of other situations: checking input to a web page; analysing user interfaces; searching text, particularly with "wild cards" that can match any sequence of characters: creating logic circuits; specifying communication protocols; and designing embedded systems.
Some advanced concepts in formal languages are even used to explore limits of what can be computed.

Once you're familiar with the idea of formal languages, you'll possess a powerful tool for cutting complex systems down to size using an easily specified format.

{image file-path="img/chapters/xkcd-tags.png" hover-text="<A>: Like </a>this." alt="A xkcd cartoon comment on HTML tags" source="https://xkcd.com/1144/"}
