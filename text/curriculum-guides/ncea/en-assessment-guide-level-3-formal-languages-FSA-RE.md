# Formal languages (3.44) - FSAs and regular expressions
{commment}
[notes removed from chapter]
For most students the first two topics (regular expressions and finite state automata) will be plenty to work on.
{end comment}

## Designing regular languages

The  activity on designing regular languages in the section on [regular expressions and FSAs](chapters/formal-languages.html#regular-expressions-and-fsas) has almost has enough depth for the 3.44 standard, although it may be difficult to use it for excellence. It covers material for an example for the 3.44 standard through the following components:

- Key problem: matching input text
- Practical application: compilers, web site input fields
- Algorithm/technique: regular expressions
- Evaluation: this is required for excellence, and it's hard to see how to do a reasonable evaluation; however, an in-depth reflection on the  design may be suitable if done well
- Personalised student examples: choice of regular expression to use as an example


## Converting Regular Expressions to FSAs

This project covers material for an example for the 3.44 standard through the following components:

- Key problem: checking computer input for meeting rules of a formal language
- Practical application: compilers, web site input fields
- Algorithm/technique: regular expressions and FSAs
- Evaluation: the number of states in the FSA, the way the FSA reflects the meaning of the regular expression
- Personalised student examples: choice of regular expression to use as an example

This project, if done with enough reflection, has sufficient depth to meet the requirements of AS 3.44. The essence of it is to write Regular Expressions, and have them converted to an FSA by software, then demonstrate how strings are processed using the FSA.
Students can make up their own regular expressions, which will make each project unique.

The conversion of a regular expression to an FSA can either be done by [Exorcise](http://www.swisseduc.ch/compscience/exorciser/index.html) or [JFLAP](http://jflap.org). Both are suitable; Exorciser is very simple to use, but is intended for throw-away exercises, so students can't save their work and would have to record their inputs and/or take screenshots, and start from scratch if they need to get back to it. JFLAP requires extra steps to do the conversion and can be a little quirky to use, but all work can be saved, and images can be saved without having to make a screenshot. Also, it can be used for the work in the section on grammars.
Information about both the Exorciser and JFLAP software is given in teacher notes for the projects in the previous section.

For Exorciser, the conversion is intended as an exercise for the student, but that's way beyond the scope of this chapter. However, if you just ask for the solution, it will do the conversion for you, which is what we need.

For JFLAP, there is a tutorial on the [program's website](http://www.jflap.org/tutorial/) and more information in the [regular expressions](formal-languages.html#regular-expressions) section.

If students stick to the instructions given they will be able to use it to create their own FSA from a regular expression.

The important part of the project is for the student to come up with their own regular expressions, and to demonstrate and discuss how that expression is checked by the FSA. An evaluation of the FSA would involve describing the purpose of a variety of nodes and transitions (e.g. "the loop back to node q1 on a corresponds to a* in the regular expression, because no matter how many a's occur, you'll always stay at state q1.)

Note that the symbols used in JFLAP are slightly different to some of the other notations we've used; the main difference is using "+" instead of "|", which could be confusing since "+" normally means "one or more". Also, it's not possible to specify a range, so instead of "[a-d]" you need to type "a+b+c+d" in JFLAP.

Here are some ideas for the types of regular expression to try: aa*, a+ab+abc+abcd [these create a predictable FSA as a warmup] ; (b(aa)*)* [strings where 'a' only appears as a pair]  ; b*(ab*a)b * [strings where there are an even number of 'a's]. As well as these artificial examples, they could explore regular expressions such as (using non-JFLAP notation) [a-zA-Z][a-zA-Z0-9]\*, which checks for identifiers that start with a letter followed any combination of letters and digits.

## Grammars

At present there isn't sufficient information in the field guide to do a project on grammars for 3.44.
However, the material on FSAs and regular expressions is sufficient for what is required for the NZ 3.44 standard.
Interested students may wish to do a project on grammars instead using the projects provided in the section on Grammars, but they will need to be careful that they address the requirements of the standard.
