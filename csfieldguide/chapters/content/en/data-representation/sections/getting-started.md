# Getting started

To begin with, we'll look at Braille.
Braille is not actually a way that computers represent data, but is a great introduction to the topic.

{panel type="additional-information"}

# Representing Braille without making holes in paper

When working through the material in this section, a good way to draw braille on paper without having to actually make raised dots is to draw a rectangle with 6 small circles in it, and to colour in the circles that are raised, and not colour in the ones that aren’t raised.

{panel end}

## What is Braille?

More than 200 years ago a 15-year-old French boy invented a system for representing text using combinations of flat and raised dots on paper so that they could be read by touch.
The system became very popular with people who had visual impairment as it provided a relatively fast and reliable way to "read" text without seeing it.
Louis Braille's system is an early example of a "binary" representation of data &ndash; there are only two symbols (raised and flat), and yet combinations of them can be used to represent reference books and works of literature.
Each character in braille is represented with a cell of 6 dots.
Each dot can either be raised or not raised.
Different numbers and letters can be made by using different patterns of raised and not raised dots.

{interactive slug="braille-alphabet" type="in-page"}

Let's work out how many different patterns can be made using the 6 dots in a Braille character.
Use the interactive below to investigate how many patterns you can make with just 2 or 3 dots.

{interactive slug="dot-combinations" type="in-page"}

You may have noticed that there are twice as many patterns with 3 dots as there are with 2 dots.
It turns out that every time you add an extra dot, that gives twice as many patterns, so with 4 dots there are 16 patterns, 5 dots has 32 patterns, and 6 dots has 64 patterns.
Can you come up with an explanation as to why this doubling of the number of patterns occurs?

{panel type="spoiler"}

# Why does adding one more dot double the number of possible patterns?

The reason that the number of patterns doubles with each extra dot is that with, say, 3 dots you have 8 patterns, so with 4 dots you can use all the 3-dot patterns with the 4th dot flat, and all of them with it raised.
This gives 16 4-dot patterns.
And then, you can do the same with one more dot to bring it up to 5 dots.
This process can be repeated indefinitely.

{panel end}

{panel type="teacher-note"}

# Importance of students understanding why the number of patters double with every dot

This concept is a fundamental one for students to grasp with binary representation: each extra bit doubles the number of values that can be stored.
This becomes very important in choosing the right number of bits for a value.
For example, a 101-bit encryption key is *twice* as hard to crack as a 100-bit key, even though it's only 1% larger!

{panel end}

So, Braille, with its 6 dots, can make 64 patterns.
That's enough for all the letters of the alphabet, and other symbols too, such as digits and punctuation.

## So how does Braille relate to data representaton?

The reason we're looking at Braille in this chapter is because it is a representation using bits.
That is, it contains 2 different values (raised and not raised) and contains sequences of these to represent different patterns.
The letter m, for example, could be written as 110010, where "1" means raised dot, and "0" means not raised dot (assuming we're reading from left to right and then down).
This is the same as how we sometimes use 1's and 0's to show how a computer is representing data.

Braille also illustrates why binary representation is so popular.
It would be possible to have three kinds of dot: flat, half raised, and raised.
A skilled braille reader could distinguish them, and with three values per dot, you would only need 4 dots to represent 64 patterns.
The trouble is that you would need more accurate devices to create the dots, and people would need to be more accurate at sensing them.
If a page was squashed, even very slightly, it could leave the information unreadable.

Digital devices almost always use two values (binary) for similar reasons: computer disks and memory can be made cheaper and smaller if they only need to be able to distinguish between two extreme values (such as a high and low voltage), rather than fine-grained distinctions between very subtle differences in voltages.
Using ten digits (like we do in our every day decimal counting system) would obviously be too challenging.

{panel type="curiosity"}

# Decimal-based computers

Why are digital systems so hung up on only using two digits? After all, you could do all the same things with a {glossary-link term="decimal-number-system"}10 digit system{glossary-link end}?

As it happens, people have tried to build decimal-based computers, but it's just too hard.
Recording a digit between 0 and 9 involves having accurate equipment for reading voltage levels, magnetisation or reflections, and it's a lot easier just to check if it's mainly one way or the other.

There's a more in-depth discussion on why we use binary here:

{video url="https://www.youtube.com/watch?v=thrx3SBEpL8"}

{panel end}
