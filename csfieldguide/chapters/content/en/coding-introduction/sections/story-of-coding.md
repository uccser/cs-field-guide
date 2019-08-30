# The story of coding

{image file-path="img/chapters/shannon-juggling.png" alt="Cartoon of Claude Shannon juggling and riding a unicycle."}

{comment image from http://csunplugged.org/information-theory/}

The idea of encoding data to make the representation more compact, robust or secure is centuries old, but the solid theory needed to support codes in the information age was developed in the 1940s &ndash; not surprisingly considering that technology played such an important role in World War II, where efficiency, reliability and secrecy were all very important.
One of the most celebrated researchers in this area was Claude Shannon, who developed the field of "information theory", which is all about how data can be represented effectively (Shannon was also a juggler, unicyclist, and inventor of fanciful machines).

{panel type="curiosity"}

# Entropy

A key concept in Shannon's work is a measure of information called "entropy",
which established mathematical limits like how small files could be compressed,
and how many extra bits must be added to a message to achieve a given level of reliability.
While the idea of entropy is beyond what we need to cover here, there are some fun games that provide a taste of how you could measure information content by guessing what letter comes next.
For example, think of a sentence, and see if a friend can guess the first letter.
If it's an English sentence, chances are they'll guess that the first letter is "T", "A" or "I", rather than "X" or "Z".
If, after a while, you had guessed that the beginning letters in a sentence are "There is no revers", you'd probably guess that the next letter is an "e".
Entropy is about how easy it is to guess the next letter; this is useful in compression (we give short codes to letters that are likely to occur next), encryption (a good code makes it hard to guess the letters), and error control (if an error occurs, it needs to be easy to "guess" what the original text was).

You can explore the idea of entropy further using an [Unplugged activity called Twenty Guesses](http://csunplugged.org/information-theory), and an [online game for guessing sentences](http://www.math.ucsd.edu/~crypto/java/ENTROPY).

{panel end}
