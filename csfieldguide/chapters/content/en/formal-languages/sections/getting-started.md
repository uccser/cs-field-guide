# Getting started

To give you a taste of what can be done, let's try searching for words that fit particular patterns.
Suppose you're looking for words that contain the name "tim", type the word "tim" (or a few letters from your name), then press the "Filter words" button to find all words containing "tim".

{interactive slug="regular-expression-filter" type="in-page"}

That's a pretty simple search (though the results may have surprised you!).
But now we introduce the *wildcard* code, which in this case is "." &ndash;  this is a widely used convention in formal languages.
This matches any character at all.
So now you can do a search like

```text
tim.b
```

and you will get any words that have "tim" followed by "b" with a single character &ndash; any character &ndash; in between.
Are there any words that match "tim..b"? "tim...b"?
You can specify any number of occurrences of a symbol by putting a '\*' after it (again a widely used convention), so:

```text
tim.*b
```

will match any words where "tim" is followed by "b", separated by any number of characters &ndash; including none.

Try the following search.
What kind of words does it find?

```text
x.*y.*z
```

{panel type="teacher-note"}

# Explanation of previous search

This code finds words that contain x, y and z in that order, but separated by 0 or more characters.
There are 16 words is the data set which match this.

{panel end}

- Can you find words that contain your name, or your initials?
- What about words containing the letters from your name in the correct order?
- Are there any words that contain all the vowels in order (a, e, i, o, u)?

{panel type="teacher-note"}

# Vowels solution

To find words with all the vowels in order, the code is simply "a.\*e.\*i.\*o.\*u", there are 47 matches.

Students may ask how to do more complex searches, like letters in any order.
If they are interested they can explore this on their own, but this is just a warmup exercise.
We'll be covering this more carefully in the section on [regular expressions]('chapters:chapter_section' 'formal-languages' 'regular-expressions').

{panel end}

The code you've used above is a part of a formal language called a "regular expression".
Computer programs that accept typed input use regular expressions for checking items like dates, credit card numbers and product codes.
They’re used extensively by programming language compilers and interpreters to make sense of the text that a programmer types in.
We'll look at them in more detail in the section on [regular expressions]('chapters:chapter_section' 'formal-languages' 'regular-expressions').

Next we examine a simple system for reading input called a
{glossary-link term="finite-state-automaton" reference-text="Formal languages"}finite state automaton{glossary-link end},
which &ndash; as we'll find out later &ndash; is closely related to
{glossary-link term="regular-expression"}regular expressions{glossary-link end}.
Later we'll explore the idea of
{glossary-link term="grammar"}grammars{glossary-link end},
another kind of formal language that can deal with more complicated forms of input.

{panel type="teacher-note"}

# Klingon linguistics activity

For a fun discussion, you could have the students look at the [Klingon Linguistics activity at CS4FN](http://www.cs4fn.org/linguistics/klingon.html).
This page introduces the fundamentals of languages &ndash; words (the alphabet) and {glossary-link term="grammar"}grammar{glossary-link end} (the rules of syntax).
It discusses why languages are translated and how meaning can be changed by translation.
It also explains why computer languages need to be translated.

{panel end}
