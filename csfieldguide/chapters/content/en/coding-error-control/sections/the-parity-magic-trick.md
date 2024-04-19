# The parity magic trick

{panel type="teacher-note"}

# Using the parity trick in a classroom

The parity magic trick can be an intriguing introduction to the idea of error correction, and we recommend using it at the start of teaching this topic.
You need to practice it in advance, and for high school students we recommend a grid of about 7x7 or 8x8 cards to have a good impact.
Details are in the [Card flip magic section](http://csunplugged.org/error-detection) of the [CS Unplugged site](https://www.csunplugged.org/).

{panel end}

If you have never seen the parity magic trick before, check out [this video](https://www.youtube.com/watch?v=OXz64qCjZ6k).
This section assumes that you know what is meant by the parity magic trick, but now we'll explain how it actually works!

{image file-path="img/chapters/parity-trick-cartoon.jpg" alt="The parity magic trick" alignment="left"}

A magician asks an observer to lay out a square grid of two-sided cards, and the magician then says they are going to make it a bit harder, and add an extra row and column to the square.
The magician then faces the other way while the observer flips over one card.
The magician turns back around again, and tells the observer which card was flipped!

The question now is, how did the magician know which card had been flipped without seeing the card being flipped, or memorising the layout?!
The short answer is error control coding.
Let's look more closely at that…

## Carrying out the parity trick

In the following interactive, the computer has a 7x7 grid of black and white cards.
You must choose the colour of an extra card for each row (at the right) and column (at the bottom), making an 8x8 grid of cards.
Each extra card should be chosen so that each row and column has an even number of black cards (since there are 8 cards, there will also be an even number of white cards).
The bottom right-hand card can be chosen from either its row or column; they should both give the same colour.

Once you think you have this correct, you should tell the computer to flip a card.
An animation will appear for a few seconds, and then the cards will reappear with one card flipped (all the rest will be the same as before).
Your task is to identify the flipped card.
You should be able to do this *without* having memorised the layout.
Remember the pattern you made with the extra cards you added?
That's the key to figuring it out.
Once you think you have identified the card, click it to see whether or not you were right.
The interactive will guide you through these instructions.
If you are completely stuck identifying the flipped card, a hint follows the interactive, although you should try and figure it out for yourself first.
Make sure you add the extra cards correctly; the computer won’t tell you if you get them wrong, and you probably won’t be able to identify the flipped card if the extra cards aren't chosen correctly.

{interactive slug="parity" type="whole-page" text="Parity Trick interactive"}

Remember how you made it so that each column had an even number of black cards?
When a card is flipped, this results in the row and column that the card was in having an odd number of black cards.
So all you need to do is to identify the row and column that have an odd number of black and white cards, and the card that is at the intersection of them must be the one that was flipped!

What we saw above is a simple error control coding {glossary-link term="algorithm"}algorithm{glossary-link end}, known as 2-dimensional {glossary-link term="parity"}parity{glossary-link end}.

## How does the parity trick relate to error control coding?

The cards represent bits, with their two states being black and white (in the "data representation" chapter we looked at how a bit can be stored by anything that can be in one of two states: shiny/not shiny, magnetised/not magnetised, high voltage/low voltage, black/white, etc).
The original 7x7 cards that the computer laid out for you could be some kind of data, for example some text represented using bits, or an image, or some numbers.
Although they are laid out in a grid, on a computer the rows of bits would be stored or transmitted one after the other (as 8 lots of 8 bits).

The extra cards you added are called *parity bits*.
[Parity](https://en.wikipedia.org/wiki/Parity_%28mathematics%29)
simply means whether a number is even or odd (the word comes from the same root as "pair").
By adding the extra cards in a way that ensured an even number of black cards in each row and column, you made it so that the rows and columns had what is called *even parity*.

When a card was flipped, this simulated an error being made in your data (such as a piece of dust landing on a bit stored on a CD, or a cosmic ray changing a bit stored on a hard disk, or electrical interference changing a bit being sent over a network cable).
Because you knew that each row and column was supposed to have an even number of black and white cards in it, you could tell that there was an error from the fact that there was a column and row that had an odd number of black cards in it.
This means that the algorithm is able to detect errors, i.e. it has **error detection**.
The specific card that had been flipped was at the intersection of the row and column that had an odd number of black cards and white cards in them, and because you were able to identify exactly which card was flipped, you were able to correct the error, i.e the algorithm has **error correction**.

If you had not added the parity bits, you would have had no way of even knowing an error had occurred, unless you had memorised the entire layout of cards!
And what if more than one bit had been flipped?
We'll consider this later.

{panel type="project"}

# Being a magician or using the parity trick as a party trick!

Now that you have learnt how the parity trick works, you might like to try it with a physical set of cards like the busker in the video, or you could use any objects with two distinct sides, such as coins or cups.
You could use playing cards, but the markings can be distracting, and cards with two colours are easiest (you can make them by cutting up sheets of card with the two colours on, or single coloured card with a scribble or sticker on one side).

You can find details and lots of ideas relating to the trick [here](https://www.csunplugged.org/error-detection), or follow these instructions:

1. Ask a friend to lay out 25 cards in a 5x5 grid, trying to have a reasonably random mix of blacks and whites (this is smaller than the one in the interactive, but it is easier to have fewer cards to avoid errors in the next step!)
2. Take all the remaining cards, and then say that actually, 5x5 is too easy so you are going to make it 6x6.
  Instead of adding the new row and column randomly though, you are adding them in the way you did in the interactive (even parity).
  Do this as fast as you can without making errors (it can look very casual if you practise this, even though the cards are being carefully selected).
3. Tell your friend that you are going to face the other way, and you want them to flip over one card while you are not looking. Check that they've flipped exactly one card.
4. Turn around again once they have flipped a card, look through the rows and columns, identifying a row and then a column that has an odd number of black cards in it.
  The flipped card will be the one at the intersection of that row and column.
  Flip that card back over.

It would take some practice to be able to add the extra cards, and identify the flipped card without the observer noticing that you are thinking hard about it.
With practice you should be able to do it while having a casual conversation.
Once you master it, you've got a great trick for parties, or even for busking.

To make it more showy, you can pretend that you are mind reading the person, waving your hands over the cards.
A particular impressive variation is to have an assistant come in to the room after the card has been flipped; even though they haven't seen any of the setup, they will still be able to detect the error.

{panel end}

## Analysing the parity trick

{panel type="teacher-note"}

# This section contains extension material

This section is an extension aimed at keen students.
Primary school kids have been able to understand many of these ideas, although it really depends on how engaged the students are with the material.

{panel end}

At this point, you should be able to carry out the parity trick well enough that you can demonstrate that you understand how to do it.
The remainder of this section is focussed on exploring further ideas in error control coding related to the parity trick.

It would be ideal to have some physical parity cards at this point that you can layout in front of you and play around with to explore the questions raised.

An error control coding algorithm can often detect errors more easily than it can correct them.
Errors involving multiple bits can sometimes even go undetected.
What if the computer (or your friend if you were being a magician with actual parity cards) had been sneaky and turned over two cards instead of one?
You could start by getting a friend or classmate to actually do this.
Repeat it a few times.
Are you always able to correct the errors, or do you get it wrong?

Remember that to *detect* errors using this algorithm, you know that if one or more rows and/or columns has an odd number of blacks and whites in it, that there must be at least one error.
In order to *correct* errors you have to be able to pinpoint the specific card(s) that were flipped.

Are you always able to detect when an error has occurred if 2 cards have been flipped?
Why?
Are you ever able to correct the error?
What about with 3 cards?

It turns out that you can always detect an error when 2 cards have been flipped (i.e. a 2-bit error), but the system can't correct more than a 1-bit error.
When two cards are flipped, there will be at least two choices for flipping two cards to make the parity correct, and you won't know which is the correct one.
With a 3-bit error (3 cards flipped), it will always be possible to detect that there is an error (an odd number of black bits in at least one row or column), but again, correction isn't possible.
With 4 cards being flipped, it's possible (but not likely) that an error can go undetected.

There is actually a way to flip 4 cards where the error is then *undetected* meaning that the algorithm will be unable to detect the error.
Can you find a way of doing this?

With more parity cards, we can detect and possibly correct more errors.
Let's explore a very simple system with minimal parity cards.
We can have a 7x7 grid of data with just one parity card.
That parity card makes it so that there is an even number of black cards in the entire layout (including the parity card).
How can you use this to detect errors?
Are you ever able to correct errors in this system?
In what situations do errors go undetected (think when you have multiple errors, i.e. more than one card flipped).

With only one extra card for parity checking, a single bit error can be detected (the total number of black cards will become odd), but a 2-bit error won't be detected because the number of black cards will be even again.
A 3-bit error will be detected, but in general the system isn't very reliable.

So going back to the actual parity trick that has the 7x7 grid, and 15 parity cards to make it 8x8, it is interesting to note that only 1 extra card was needed to detect that an error had occurred, but an extra 15 cards were needed to be able to correct the error.
In terms of the {glossary-link term="cost"}cost{glossary-link end} of an algorithm, it costs a lot more space to be able to correct errors than it does to be able to simply detect them!

What happens when you use grids of different sizes?
The grid doesn’t have to have an even number of black cards *and* an even number of white cards, it just happens that whenever you have an even number sized grid with the parity bits added (e.g. the 8x8 we have mostly used in this section) and you have an even number of black cards, you will also have to have an even number of whites, which makes it a bit easier to keep track of.

Try a 6x6 grid with parity cards to make it 7x7.
The parity cards simply need to make each row and column have an even number of black cards (in this case there will always be an odd number of white cards in each row and column).
The error detection is then looking for rows and columns that have an odd number of black cards in them (but an even number of white cards).
Interestingly, the grid doesn’t even have to be a square!
You could use 4x7 and it would work!

There's also no limit on the size.
You could create a 10x10 grid (100 cards), and still be able to detect which card has been flipped over.
Larger grids make for an even more impressive magic trick.
