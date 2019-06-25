# Programming Languages (1.44)

{panel type="teacher-note" summary="Disclaimer"}
This guide is not official, but is based information gained from a lot of experience with the standard, so reflects our best understanding of what is expected.
{panel end}

This is a guide for students attempting the *Programming Languages* topic of digital technologies achievement standard 1.44 (AS91074).

In order to fully cover the standard, you will also need to have done projects covering the topics of *Algorithms* and *Human Computer Interaction*, and included these in your report.

## Overview

Programming Languages has the following bullet points in achievement standard 1.44, which this guide covers. Note that merit is split into two bullet points.

**Achieved**: "describing the role and characteristics of programming languages, including the different roles and characteristics of high level languages and low level (or machine) languages, and the function of a compiler"

**Merit**: "explaining how the characteristics of programming languages, including the different characteristics of high level and low level (or machine) languages, are important for their roles" and "explaining the need for programs to translate between high and low level languages"

**Excellence**: "comparing and contrasting high level and low level (or machine) languages, and explaining different ways in which programs in a high level programming language are translated into a machine language

{panel type="teacher-note" summary="Definition of translation"}
Note that *translation* refers to compilers, interpreters, and a combination of the two.
{panel end}

As with all externally assessed reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

You should read and work through the interactives and activities in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

[4.1 - What’s the Big Picture?](chapters/programming-languages.html#whats-the-big-picture) (and an introduction to what programming is, intended for those of you with limited programming experience)

[4.2 - Machine Code (Low Level Languages)](chapters/programming-languages.html#machine-code-low-level-languages)

[4.3 - A Babel of Programming Languages (High Level Languages)](chapters/programming-languages.html#a-babel-of-programming-languages) (optional, don't spend too much time on this)

[4.4 - How does the Computer Process your Program? (Compilers and Interpreters)](chapters/programming-languages.html#how-does-the-computer-process-your-program)

It is very important that you actually do the activities in 4.2 (and 4.1 if you don’t know much about programming).

## Project

This project consists of three main components. The first involves making a couple of examples. The second involves investigating the differences between high level and low level languages using your examples, and then the third involves investigating the different ways that high level languages can be converted to low level languages.

### Making Examples for your Report

{panel type="teacher-note" summary="The examples personalize the student's work"}
This is to ensure the student's work is personalised and that they have something to base explanations around that illustrate some of the concepts, and the second involves explaining why we need both high and low level languages, and what the role of compilers and interpreters is.
{panel end}

You will need two examples of programs to include in your report; one that is in a high level language and one that is in a low level language. For the high level language example, you should use a program you wrote yourself, or make a small modification of a high level language program from the field guide. For the low level language example, you should make a small modification to one of the programs from the field guide (as long as you worked through the exercises in the low level languages section, you should be able to modify one of the programs without difficulty).

Include your program examples in your report as either screenshots or plain text. Note that the Hints for Success section has some advice on displaying code in a report which you should read first.

Briefly explain what each of the programs does (ideally you should have run them). e.g. does it add numbers, or does it print some output?. What output do your programs give? You do not need to explain how it does it (i.e. no need to explain what each statement in the program does). The purpose of this is to show the marker that you do know what your example does, as opposed to just copying code you know nothing about.

### High and Low level languages (Achieved/Merit/ Excellence)

{panel type="teacher-note" summary="Why this part of the project is not split into achievement levels"}
Note that this project isn't split into Achieved, Merit, and Excellence in the same way as most of the other projects are. This is because the step ups in the standard are mostly dependent on the quality of explanations, rather than any additional content at the high levels (except for interpreters only being required for excellence).
{panel end}

{panel type="teacher-note" summary="Programming in a low level language does NOT make a program faster"}
Note that students should not say that high level languages are slow and low level languages are fast. In the past, many students have claimed the reason for low level languages is to make programs "fast". This is not the reason, and isn't even entirely true anymore!

It was true in the past, because writing directly in a low level language allowed the programmer to ensure there was less lines of code in the low level language than there would have been if a high level language had been compiled into the low level language. These days however, compilers are much smarter, and in many cases can optimise the code far better than a human can.
{panel end}

{panel type="teacher-note" summary="Parts of the standard covered"}
"describing the role and characteristics of programming languages, including the different roles and characteristics of high level languages and low level (or machine) languages"

"explaining how the characteristics of programming languages, including the different characteristics of high level and low level (or machine) languages, are important for their roles"

"comparing and contrasting high level and low level (or machine) languages"
{panel end}

In order to make your answers to the following questions really clear (and to make it obvious that this is your own work), you should quote a few lines of your code examples which illustrate the points you make (e.g. some code that is cryptic and some code that you can tell easily what it does).

What is the main difference(s) you see between the high level language and the low level language? Why would a human not want to program in the language shown in your low level programming language example? What made modifying the low level programs in the field guide challenging? Given that a human probably doesn’t want to program in a low level language, why do we need low level programming languages at all? What is their purpose?  

When you wrote your high level program (or modified an existing program), what features of the language made this easier compared to when you attempted to modify the low level program? Why are there many different high level programming languages?

### Compilers and Interpreters

**Achieved/ Merit**

{panel type="teacher-note" summary="Parts of the standard covered"}
"describing the function of a compiler"

"explaining the need for programs to translate between high and low level languages"
{panel end}

If you have a compiler for the language your high level program example is written in, how would you use it to allow the computer to run your program? (Even if your language is an interpreted one, such as Python, just explain what would happen if you had a compiler for it, as technically a compiler can be written for any language, and there are infact compilers for Python). What is the purpose of the compiler?

**Excellence**

{panel type="teacher-note" summary="Parts of the standard covered"}
This covers "explaining different ways in which programs in a high level programming language are translated into a machine language"
{panel end}

What about an interpreter? How does the interpreter’s function differ from a compiler in the way interpreted programs and compiled programs are run? Which is mostly used?

Here are some ideas for comparing compilers and interpreters: One way to consider the difference is to explain what happens if a program is transferred from one computer to another. Does it still run on the other computer? Does someone else need the same compiler or interpreter to run your software? Can you type in each line of a program and have it executed as you type it, or does the whole program have to be available before it can be run?

## Hints for Success

{panel type="teacher-note" summary="Avoid paraphrasing Wikipedia"}

In the past, many students have tried to satisfy this part of the standard by paraphrasing Wikipedia definitions. We discourage this, and recommend that students generate personalised examples (the projects explain how this could be done), and then base their explanations and discussions of the concepts around their own examples. This makes it clear to the markers that what the student has presented is their own work.

{panel end}

- You should easily be able to explain the concepts in half to one page of writing (in addition to the program examples). Any more than this is probably unnecessary.
- Don’t use large programs in the examples. Keep it to 5 to 10 lines (slightly fewer is okay!) for the high level program, and a bit more for the low level program. A good trick for displaying the low level program without wasting space is to use 2 columns, because the low level language statements are so short (you could remove the comments in the code). If using a screenshot, get 2 screenshots with roughly half the program each and put them side by side, and if using text directly in report, just format it to 2 columns.
- If displaying the program examples as plain text in your report, then make the font size smaller for the code to try and prevent lines splitting (8pt or 9pt should be fine, as long as your explanations in the rest of your report are using the font size that NZQA requires!) Preferably use a fixed width font for program code as a variable width font can mess up the layout.
- If displaying the program examples as screenshots and the editor background is darker than the text colour, invert the colours using an image editor so as to make it easier to read on paper, and not waste black ink/toner!
- Paraphrasing definitions of high level languages, low level languages, compilers, and interpreters from Wikipedia or another site is not satisfactory for the standard. The marker needs to see what you understand, not what Wikipedia understands! You can show your understanding by explaining the ideas using your own examples.
- Overall, you should expect to spend less time on this part of the standard than on the Algorithms and Human Computer Interaction.

## Recommended Number of Pages

Within the 2 pages we recommend using for programming languages, a possible breakdown is:

- ½ page: Example of low level program (If it is larger than this, you've probably put too much or not resized it as well as you could have)
- ½ page: Example of high level program (If it is larger than this, you've probably put too much or not resized it as well as you could have)
- ½ page: High Level and Low Level languages discussion
- ½ page: Compilers and Interpreters discussion

These are *maximums*, not targets!

Note that if you go over 2 pages for Programming Languages, then you may have to use fewer pages for one of the other two topics, which could be problematic. No other material should be included for Programming Languages.
