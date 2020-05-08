# What's the big picture?

To make computers easier to build and keep them reliable, everything is represented using just two values.
You may have seen these two values represented as 0 and 1, but on a computer they are represented by anything that can be in two states.
For example, in memory a low or high voltage is used to store each 0 or 1.
On a magnetic disk it's stored with magnetism (whether a tiny spot on the disk is magnetised north or south).

The idea that *everything* stored and transmitted in our digital world is represented using just two values might seem somewhat fantastic, but here's an exercise that will give you a little experience using just black and white cards to represent numbers.
In the following interactive, click on the last card (on the right) to reveal that it has one dot on it.
Now click on the previous card, which should have two dots on it.
Before clicking on the next one, how many dots do you predict it will have?
Carry on clicking on each card moving left, trying to guess how many dots each has.

{interactive slug="binary-cards" type="whole-page" text="Binary Cards" parameters="cards=5&start=BBBBB&input=false"}

The challenge for you now is to find a way to have exactly 22 dots showing
(the answer is in the spoiler below).
Now try making up other numbers of dots, such as 11, 29 and 19.
Is there any number that can't be represented? To test this, try counting up from 0.

{panel type="teacher-note"}

# Patterns in the cards

This exercise comes up again below as an introduction to representing numbers.
The card interactive can also be done with physical cards as a change from doing things on a computer.

If students have trouble solving the puzzles, start at the left and ask "Can you use the 16 dots? 8 dots?" and so on.
Each one will either be obviously too big, or otherwise it should be used.

With some guidance students should notice patterns, for example,
that the one-dot card is coming up every second time (the odd numbers).

{panel end}

{panel type="spoiler"}

# Solution to card puzzles

You may have noticed that each card shows twice as many dots as the one to its right.
This is an important pattern in data representation on computers.

The number 22 requires the cards to be "white, black, white, white, black",
11 is "black, white, black, white, white",
29 is "white, white, white, black, white", and
19 is "white, black, black, white, white".

{panel end}

You should have found that any number from 0 to 31 can be represented with 5 cards.
Each of the numbers could be communicated using just two words: black and white.
For example, 22 dots is "white, black, white, white, black".
Or you could decode "black, black, white, white, white" to the number 7.
This is the basis of data representation &ndash; anything that can have two different states can represent anything on a digital device.

When we write what is stored in a computer on paper, we normally use "0" for one of the states, and "1" for the other state.
For example, a piece of computer memory could have the following voltages:

```text
low low high low high high high high low high low low
```

We could allocate **"0"** to **"low"**, and **"1"** to **"high"** and write this sequence down as:

```text
0 0 1 0 1 1 1 1 0 1 0 0
```

While this notation is used extensively, and you may often hear the data being referred to as being "0’s and 1’s", it is important to remember that a computer does *not* store 0’s and 1’s; it has no way of doing this.
They are just using physical mechanisms such as high and low voltage, north or south polarity, and light or dark materials.

{panel type="jargon-buster"}

# Bits

The use of the two digits 0 and 1 is so common that some of the best known computer jargon is used for them.
Since there are only two digits, the system is called {glossary-link term="binary-number-system"}binary{glossary-link end}.
The short word for a "binary digit" is made by taking the first two letters and the last letter &ndash; a {glossary-link term="bit"}bit{glossary-link end} is just a digit that can have two values.

{panel end}

Every file you save, every picture you make, every download, every digital recording, every web page is just a whole lot of bits.
These binary digits are what make digital technology *digital*!
And the nature of these digits unlock a powerful world of storing and sharing a wealth of information and entertainment.

Computer scientists don't spend a lot of time reading bits themselves, but knowing how they are stored is really important because it affects the amount of space that data will use, the amount of time it takes to send the data to a friend (as data that takes more space takes longer to send!) and the quality of what is being stored.
You may have come across things like "24-bit colour", "128-bit encryption", "32-bit IPv4 addresses" or "8-bit ASCII".
Understanding what the bits are doing enables you to work out how much space will be required to get high-quality colour, hard-to-crack secret codes, a unique ID for every device in the world, or text that uses more characters than the usual English alphabet.

This chapter is about some of the different methods that computers use to code different kinds of information in patterns of these bits, and how this affects the cost and quality of what we do on the computer, or even if something is feasible at all.
