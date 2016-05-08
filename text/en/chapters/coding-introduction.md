# Coding - Introduction


## What's the big picture?

The word "code" has lots of meanings in computer science. It's often used to talk about programming, and a program can be referred to as "source code".
Even binary representation of information is sometimes referred to as a code.
However, in this chapter (and the next three chapters),
the sense of coding that will be used is about clever representations of information that address a practical issue,
such as encrypting the data to keep it secret.

In the previous chapter we looked at using binary representations to store all kinds of data --- numbers, text, images and more.
But often simple binary representations don't work so well.
Sometimes they take up too much space,
sometimes small errors in the data can cause big problems,
and sometimes we worry that someone else could easily read our messages.
Most of the the time all three of these things are a problem!
The codes that we will look at here overcome all of these problems, and are widely used for storing and transmitting important information.

The three main reasons that we use more complex representations of binary data are:
- **Compression:** this reduces the amount of space the data needs (for example, coding an audio file using MP3 compression can reduce the size of an audio file to well under 10% of its original size).
- **Encryption:** this changes the representation of data so that you need to have a "key" to unlock the message (for example, whenever your browser uses "https" instead of "http" to communicate with a website, encryption is being used to make sure that anyone eavesdropping on the connection can't make any sense of the information).
- **Error Control:** this adds extra information to your data so that if there are minor failures in the storage device or transmission, it is possible to detect that the data has been corrupted, and even reconstruct the information
(for example, bar codes on products have an extra digit added to them so that if the bar code is scanned incorrectly in a checkout,
it makes a warning sound instead of charging you for the wrong product).

Often all three of these are applied to the same data;
for example, if you take a photo on a smartphone it is usually compressed using JPEG,
stored in the phone's memory with error correction,
and uploaded to the web through a wireless connection using an encryption protocol to prevent other people nearby getting a copy of the photo.

Without these forms of coding, digital devices would be very slow, have limited capacity, be unreliable, and be unable to keep your information private.

## The story of coding

{image filename="shannon-juggling.png" alt="Cartoon of Claude Shannon juggling and riding a unicycle."}
{comment image from http://csunplugged.org/information-theory/}

The idea of encoding data to make the representation more compact, robust or secure is centuries old,
but the solid theory needed to support codes in the information age was developed in the 1940s --- not surprisingly considering that technology played such an important role in World War II, where efficiency, reliability and secrecy were all very important.
One of the most celebrated researchers in this area was Claude Shannon,
who developed the field of "information theory", which is all about how data can be represented effectively
(Shannon was also a juggler, unicyclist, and inventor of fanciful machines).

{panel type="curiosity" summary="Entropy"}

A key concept in Shannon's work is a measure of information called "entropy",
which established mathematical limits like how small files could be compressed,
and how many extra bits must be added to a message to achieve a given level of reliability.
While the idea of entropy is beyond what we need to cover here,
there are some fun games that provide a taste of how you could measure information content by guessing what letter comes next.
For example, think of a sentence, and see if a friend can guess the first letter.
If it's an English sentence, chances are they'll guess that the first letter is "T", "A" or "I", rather than "X" or "Z".
If, after a while, you had guessed that the beginning letters in a sentence are "There is no revers",
you'd probably guess that the next letter is an "e".
Entropy is about how easy it is to guess the next letter;
this is useful in compression (we give short codes to letters that are likely to occur next),
encryption (a good code makes it hard to guess the letters),
and error control (if an error occurs, it needs to be easy to "guess" what the original text was).

You can explore the idea of entropy further using an
[Unplugged activity called Twenty Guesses](http://csunplugged.org/information-theory),
and an [online game for guessing sentences](http://www.math.ucsd.edu/~crypto/java/ENTROPY).
{panel end}

## Further reading

James Gleick's book [The Information: A History, a Theory, a Flood](http://www.amazon.com/The-Information-History-Theory-Flood/dp/1400096235) provides an interesting view of the history of several areas relating to coding.

### Useful Links

- A good collection of resources related to all three kinds of coding is available in the [Bletchley Park Codes Resources](http://www.cimt.plymouth.ac.uk/resources/codes/)
- [Entropy and information theory](https://en.wikipedia.org/wiki/Entropy_(information_theory)
- [History of information theory and its relationship to entropy in thermodynamics](https://en.wikipedia.org/wiki/History_of_entropy#Information_theory)
- [Timeline of information theory](https://en.wikipedia.org/wiki/Timeline_of_information_theory)
- [Shannon's seminal work in information theory](https://en.wikipedia.org/wiki/A_Mathematical_Theory_of_Communication)
