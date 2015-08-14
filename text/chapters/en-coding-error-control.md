# Coding - Error Control

{teacher}

The following assessment plans also cover this material:

**New Zealand - AS91371 (2.44)**

- [Assessment Overview](/appendices/assessment-guides/new-zealand/assessment-guide-level-2-introduction)
- [Error Control Coding (Check Sums)](/appendices/assessment-guides/new-zealand/assessment-guide-level-2-error-control-checksums)

{teacher end}  

## What's the big picture?
{teacher}

The parity magic trick can be an intriguing introduction to the idea of error correction, and we recommend using it at the start of teaching this topic. You need to practise it in advance, and for high school students we recommend a grid of about 7x7 or 8x8 cards to have a good impact. Details are in the [Card flip magic section](http://csunplugged.org/error-detection) of the [CS Unplugged site](http://csunplugged.org/).

{teacher end}

{video http://www.youtube.com/embed/OXz64qCjZ6k?rel=0}

The parity magic trick (in the video above) enables the magician to detect which card out of dozens has been flipped over while they weren't looking.
The magic in the trick is actually computer science, using the same kind of technique that computers use to detect and correct errors in data. We will talk about how it works in the next section.

The same thing is happening to data stored on computers --- while you (or the computer) is looking away, some of it might accidentally change because of a minor fault.
When the computer reads the data, you don't want it to just use the incorrect values.
At the least you want it to detect that something has gone wrong, and ideally it should do what the magician did, and put it right.

This chapter is about guarding against errors in data in its many different forms --- data stored on a harddrive, on a CD, on a floppy disk, on a solid state drive (such as that inside a cellphone, camera, or mp3 player), data currently in RAM (particularly on servers where the data correctness is critical), data going between the RAM and hard drive or between an external hard drive and the internal hard drive, data currently being processed in the processor or data going over a wired or wireless network such as from your computer to a server on the other side of the world. It even includes data such as the barcodes printed on products or the number on your credit card.

If we don't detect that data has been changed by some physical problem (such as small scratch on a CD, or a failing circuit in a flash drive), the information will just be used with incorrect values. A very poorly written banking system could potentially result in your bank balance being changed if just one of the bits in a number was changed by a cosmic ray affecting a value in the computer's memory! If the barcode on the packet of chips you buy from the shop is scanned incorrectly, you might be charged for shampoo instead. If you transfer a music file from your laptop to your mp3 player and a few of the bits were transferred incorrectly, the mp3 player might play annoying glitches in the music. Error control codes guard against all these things, so that (most of the time) things just work without you having to worry about such errors.

There are several ways that data can be changed accidentally. Networks that have a lot of "noise" on them (caused by poor quality wiring, electrical interference, or interference from other networks in the case of wireless). The bits on disks are very very small, and imperfections in the surface can eventually cause some of the storage to fail. The surfaces on compact disks and DVDs are exposed, and can easily be damaged by storage (e.g. in heat or humidity) and handling (e.g. scratches or dust). Errors can also occur when numbers are typed in, such as entering a bank account number to make a payment into, or the number of a container that is being loaded onto a ship. A barcode on a product might be slightly scratched or have a black mark on it, or perhaps the package is bent or is unable to be read properly due to the scanner being waved too fast over it. Bits getting changed on permanent storage (such as hard drives, optical disks, and solid state drives) is sometimes referred to as bit rot, and the [wikipedia page on bit rot](http://en.wikipedia.org/wiki/Bit_rot) has a list of more ways that these errors can occur.

Nobody wants a computer that is unreliable and won’t do what it's supposed to do because of bits being changed! So, how can we deal with these problems?

Error control coding is concerned with detecting when these errors occur, and if practical and possible, correcting the data to what it is supposed to be.

Some error control schemes have error correction built into them, such as the parity method that was briefly introduced at the beginning of this section. You might not understand yet how the parity trick worked, but after the card was flipped, the magician *detected* which card was flipped, and was able to *correct* it.

Other error control schemes, such as those that deal with sending data from a server overseas to your computer, send the data in very small pieces called packets (the network protocols chapter talks about this) and each packet has error detection information added to it.

Error detection is also used on barcode numbers on products you buy, as well as the unique ISBN (International Standard Book Number) that all books have, and even the 16 digit number on a credit card. If any of these numbers are typed or scanned incorrectly, there's a good chance that the error will be detected, and the user can be asked to re-enter the data.

By the end of this chapter, you should understand the basic idea of error control coding, the reasons that we require it, the differences between algorithms that can detect errors and those that can both detect and correct errors, and some of the ways that error control coding is used, in particular parity (focussing on the parity magic trick) and the check digits used to ensure book numbers, barcode numbers, and credit card numbers are entered correctly.

## The Parity Magic Trick
{teacher}

Note: It is very helpful if the students either view the video above first, or have a demonstration of the trick from the teacher.

{teacher end}

If you have never seen the parity magic trick before, check out the video in the “What’s the Bigger Picture?” section above. This section assumes that you know what is meant by the parity magic trick, but now we'll explain how it actually works!

{comment}

.. xjrm insert image from http://csunplugged.org/sites/default/files/cartoons/parity_trick.jpg?1286499792

{comment end}

A magician asks an observer to lay out a square grid of two-sided cards, and the magician then says they are going to make it a bit harder, and add an extra row and column to the square. The magician then faces the other way while the observer flips over one card. The magician turns back around again, and tells the observer which card was flipped!

The question now is, how did the magician know which card had been flipped without seeing the card being flipped, or memorising the layout?! The short answer is error control coding. Let's look more closely at that…

### Carrying out the parity trick

You are now going to take the role of the magician and carry out the trick yourself. The interactive below will allow you to practice it.

In the interactive, the computer has a 7x7 grid of black and white cards. You must choose the colour of an extra card for each row (at the right) and column (at the bottom), making an 8x8 grid of cards. Each extra card should be chosen so that each row and column has an even number of black cards (since there are 8 cards, there will also be an even number of white cards).
The bottom right-hand card can be chosen from either its row or column; they should both give the same colour.
Once you think you have this correct, you should tell the computer to flip a card. An animation will appear for a few seconds, and then the cards will reappear with one card flipped (all the rest will be the same as before). Your task is to identify the flipped card. You should be able to do this *without* having memorised the layout. Remember the pattern you made with the extra cards you added? That's the key to figuring it out. Once you think you have identified the card, click it to see whether or not you were right! The interactive will guide you through these instructions. If you are completely stuck identifying the flipped card, a hint follows the interactive, although you should try and figure it out for yourself first! Make sure you add the extra cards correctly; the computer won’t tell you if you get them wrong, and you probably won’t be able to identify the flipped card if the extra cards aren't chosen correctly.

<div class="widget-holder"><a href="static/widgets/DR/DR-Parity/public_html/index.html"  target="blank"><img class="widget-image" src="static/images/EC-ParityThumbnail.png" alt=""><span class="widget-subtitle">Click to load the parity widget</span></a></div>

Remember how you made it so that each column had an even number of black cards? When a card is flipped, this results in the row and column that the card was in having an odd number of black cards. So all you need to do is to identify the row and column that have an odd number of black and white cards, and the card that is at the intersection of them must be the one that was flipped!

What we saw above is a simple error control coding algorithm, known as *2-dimensional parity*.

The cards represent bits, with their two states being black and white (in the "data representation" chapter we looked at how a bit can be stored by anything that can be in one of two states: shiny/not shiny, magnetised/not magnetised, high voltage/low voltage, black/white, etc). The original 7x7 cards that the computer laid out for you could be some kind of data, for example some text represented using bits, or an image, or some numbers.
Although they are laid out in a grid, on a computer the rows of bits would be stored or transmitted one after the other (as 8 lots of 8 bits).

The extra cards you added are called *parity bits*. Parity simply means whether a number is even or odd (the word comes from the same root as "pair"). By adding the extra cards in a way that ensured an even number of black cards in each row and column, you made it so that the rows and columns had what is called *even parity*.

When a card was flipped, this simulated an error being made in your data (such as a piece of dust landing on a bit stored on a CD, or a cosmic ray changing a bit stored on a hard disk, or electrical interference changing a bit being sent over a network cable). Because you knew that each row and column was supposed to have an even number of black and white cards in it, you could tell that there was an error from the fact that there was a column and row that had an odd number of black cards in it. This means that the algorithm is able to detect errors, i.e. it has **error detection**. The specific card that had been flipped was at the intersection of the row and column that had an odd number of black cards and white cards in them, and because you were able to identify exactly which card was flipped, you were able to correct the error, i.e the algorithm has **error correction**.

If you had not added the parity bits, you would have had no way of even knowing an error had occurred, unless you had memorised the entire layout of cards!
And what if more than one bit had been flipped? We'll consider this later.

{curiosity}

 **Being a magician**

Now that you have learnt how the parity trick works, you might like to try it with a physical set of cards like the busker in the video, or you could use any objects with two distinct sides, such as coins or cups. You could use playing cards, but the markings can be distracting, and cards with two colours are easiest (you can make them by cutting up sheets of card with the two colours on, or single coloured card with a scribble or sticker on one side).

You can find details and lots of ideas relating to the trick [here](http://csunplugged.org/error-detection), or follow these instructions:

1. Ask a friend to lay out 25 cards in a 5 by 5 grid, trying to have a reasonably random mix of blacks and whites (this is smaller than the one in the interactive, but it is easier to have fewer cards to avoid errors in the next step!)
2. Take all the remaining cards, and then say that actually, 5 by 5 is too easy so you are going to make it 6 by 6. Instead of adding the new row and column randomly though, you are adding them in the way you did in the interactive (even parity). Do this as fast as you can without making errors (it can look very casual if you practise this, even though the cards are being carefully selected).
3. Tell your friend that you are going to face the other way, and you want them to flip over one card while you are not looking.Check that they've flipped exactly one card.
4. Turn around again once they have flipped a card, look through the rows and columns, identifying a row and then a column that has an odd number of black cards in it. The flipped card will be the one at the intersection of that row and column. Flip that card back over.

It would take some practice to be able to add the extra cards, and identify the flipped card without the observer noticing that you are thinking hard about it. With practice you should be able to do it while having a casual conversation. Once you master it, you've got a great trick for parties, or even for busking.

To make it more showy, you can pretend that you are mind reading the person, waving your hands over the cards. A particular impressive variation is to have an assistant come in to the room after the card has been flipped; even though they haven't seen any of the setup, they will still be able to detect the error.

{curiosity end}

### Investigating the parity trick a little further

{teacher}

This section is an extension aimed at keen students. Primary school kids have been able to understand many of these ideas, although it really depends on how engaged the students are with the material.

{teacher end}

At this point, you should be able to carry out the parity trick well enough that you can demonstrate that you understand how to do it. The remainder of this section is focussed on exploring further ideas in error control coding related to the parity trick. You can either continue to read through the rest of this section and explore the interesting questions raised, or you can skip forward to one of the other sections.

It would be ideal to have some physical parity cards at this point that you can layout in front of you and play around with to explore the questions raised.

{comment}

.. xhtml5 (low priority) Or could we provide an interactive that was just a parity trick sandbox?

{comment end}

An error control coding algorithm can often detect errors more easily than it can correct them. Errors involving multiple bits can sometimes even go undetected. What if the computer (or your friend if you were being a magician with actual parity cards) had been sneaky and turned over two cards instead of one? You could start by getting a friend or classmate to actually do this. Repeat it a few times. Are you always able to correct the errors, or do you get it wrong?

Remember that to *detect* errors using this algorithm, you know that if one or more rows and/or columns has an odd number of blacks and whites in it, that there must be at least one error. In order to *correct* errors you have to be able to pinpoint the specific card(s) that were flipped.

Are you always able to detect when an error has occurred if 2 cards have been flipped? Why? Are you ever able to correct the error? What about with 3 cards?

{teacher}

You can always detect an error when 2 cards have been flipped (i.e. a 2-bit error), but the system can't correct more than a 1-bit error. When two cards are flipped, there will be at least two choices for flipping two cards to make the parity correct, and you won't know which is the correct one. With a 3-bit error (3 cards flipped), it will always be possible to detect that there is an error (an odd number of black bits in at least one row or column), but again, correction isn't possible. With 4 cards being flipped, it's possible (but not likely) that an error can go undetected.

{teacher end}

There is actually a way to flip 4 cards where the error is then *undetected* meaning that the algorithm will be unable to detect the error. Can you find a way of doing this?

With more parity cards, we can detect and possibly correct more errors. Lets explore a very simple system with minimal parity cards. We can have a 7x7 grid of data with just one parity card. That parity card makes it so that there is an even number of black cards in the entire layout (including the parity card). How can you use this to detect errors? Are you ever able to correct errors in this system? In what situations do errors go undetected (think when you have multiple errors, i.e. more than one card flipped).


{teacher}

With only one extra card for parity checking, a single bit error can be detected (the total number of black cards will become odd), but a 2-bit error won't be detected because the number of black cards will be even again. A 3-bit error will be detected, but in general the system isn't very reliable.

{teacher end}

So going back to the actual parity trick that has the 7 by 7 grid, and 15 parity cards to make it 8 by 8, it is interesting to note  that only 1 extra card was needed to detect that an error had occurred, but an extra 15 cards were needed to be able to correct the error. In terms of the cost of an algorithm, it costs a lot more space to be able to correct errors than it does to be able to simply detect them!

What happens when you use grids of different sizes? The grid doesn’t have to have an even number of black cards *and* an even number of white cards, it just happens that whenever you have an even number sized grid with the parity bits added (e.g. the 8x8 we have mostly used in this section) and you have an even number of black cards, you will also have to have an even number of whites, which makes it a bit easier to keep track of.

Try a 6x6 grid with parity cards to make it 7x7. The parity cards simply need to make each row and column have an even number of black cards (in this case there will always be an odd number of white cards in each row and column). The error detection is then looking for rows and columns that have an odd number of black cards in them (but an even number of white cards). Interestingly, the grid doesn’t even have to be a square! You could use 4x7 and it would work!

There's also no limit on the size. You could create a 10x10 grid (100 cards), and still be able to detect which card has been flipped over. Larger grids make for an even more impressive magic trick.

## Check digits on barcodes and other numbers

You probably wouldn’t be very happy if you bought a book online by entering the ISBN (International Standard Book Number), and the wrong book was sent to you, or if a few days after you ordered it, you got an email saying that the credit card number you entered was not yours, but was instead one that was one digit different and another credit card holder had complained about a false charge. Or if you went to the shop to buy a can of drink and the scanner read it as being a more expensive product. Sometimes, the scanner won’t even read the barcode at all, and the checkout operator has to manually enter the number into the computer --- but if they don't enter it exactly as it is on the barcode you could end up being charged for the wrong product. These are all examples of situations that error control coding can help prevent.

Barcode numbers, credit card numbers, ISBNs, the NHI (National Health Index, the unique identifier given to all users of the NZ health system), IRD numbers (Inland Revenue Department number for all NZ taxpayers) all have error control coding in them to help reduce the chance of errors. The last digit in each of these numbers is a check digit, which is obtained doing a special calculation on all the other digits in the number. If for example you enter your credit card number into a web form to buy something, it will calculate what the 16th digit should be, using the first 15 digits and the special calculation (there are 16 digits in a credit card number). If the 16th digit that it expected is not the one you entered, it can tell that there was an error made when the number was entered and will notify you that the credit card number is not valid.

In this section we will be initially looking at one of the most commonly used barcode number formats used on most products you buy from supermarkets and other shops.  We will then be having a look at credit card numbers. You don’t have to understand *why* the calculations work so well (this is advanced math, and isn’t important for understanding the overall ideas), and while it is good for you to know what the calculation is, it is not essential. So if math is challenging and worrying for you, don’t panic too much because what we are looking at in this section isn’t near as difficult as it might initially appear!

### Check Digits On Product Barcodes

{interactive-inpage number-generator}

Most products you can buy at the shop have a barcode on them with a 13 digit global trade item number (referred to as GTIN-13). The first 12 digits are the actual identification number for the product, the 13th is the check digit calculated from the other 12. Not all barcodes are GTIN-13, there are several others around. If the barcode has 13 numbers in it, it is almost certainly GTIN-13.

{image isbn-barcode.png alt="An image of a 13 digit barcode"}

The following spreadsheet checks GTIN-13 barcodes. Enter a barcode number into the interactive, and it will tell you whether or not you typed it correctly! Start by using the barcode number of a box of 30 cans of coke; “9 300675 036009”. What happens if you then change one digit to something else?

{comment}

.. xjrm spreadsheet to be replaced with interactive

{comment end}

<p><a href="static/interactives/ec/isbncreditcardcheckerv2.xlsx">Click here to download the spreadsheet.</a></p>

{comment}

.. ajb this widget seems to check ISBN numbers but is described as checking GTIN-13. Is this a mistake? Should it say “Click to load the barcode calculator”?

{comment end}

Have a look for another product that has a barcode on it, such as a food item from your lunch, or a stationery item. Your teacher might also bring various packaging that has barcodes on it for you to try. Note that some barcodes are a little different. Make sure the barcodes that you are using have 13 digits (although you might like to go and find out how the check digit works on some of the other ones). Hopefully you will find that the interactive is always able to determine whether or not you typed the barcode correctly!

One of the following product numbers has one incorrect digit. Can you tell which of the products is wrong?

- 9 400550 619775
- 9 400559 001014
- 9 300617 013199

{teacher}

The last code has a typo in it; it should have been 9 300617 003199. Students should be able to detect that it is incorrect, but it isn't possible to work out what the correct value is.

{teacher end}

If you were scanning the above barcodes in a supermarket, the incorrect one will need to be rescanned, and the system can tell that it's a wrong number without even having to look it up.

You could try swapping barcode numbers with a classmate, but before giving them the number toss a coin, and if it's heads, change one digit of the barcode before you give it to them.
Can they determine that they've been given an erroneous barcode?

If one of the digits is incorrect, this calculation will produce a different value to the checksum, and signals an error. So single digit errors will always be detected, but what if two digits change --- will that always detect the error?

{teacher}

If two digits are changed, the error may go undetected; for example, changing 9 400559 001014 to 6 500559 001014 will still produce a checksum of 4, and appear to match. However, it's unlikely that two errors will counteract like this (students can investigate how often that will happen).

{teacher end}

What if the error is in the checksum itself but not in the other digits - will that be detected?

{teacher}

Some students might worry that there will be a problem if the checksum changes, but of course if it is typed in incorrectly, it won't match the sum for the other digits, and the error will be detected.

{teacher end}

### How do check digits protect against common human errors?

People can make mistakes when they enter numbers into computers, and even barcode scanners can get a digit wrong. Check digits attempt to detect when an error has occurred and notify the computer and/or person of it. Suppose you give your cellphone number to a friend so that they can contact you later. To ensure that you told them the number correctly, you may get them to text you immediately to confirm (and so that you have their number too). If you don’t get the text you will probably double check the number and will find that your friend made an error, for example they got a digit wrong or they reversed 2 digits next to one another. Mistakes happen, and good systems prevent those mistakes from having annoying or even serious consequences.
If a check digit is being used, there is a good chance that the error will be detected when the check digit is not what the computer expects it to be.

Some of the really common errors are:

- Getting one digit wrong (substitution)
- Swapping two digits that are adjacent (transposition)
- Missing a digit
- Adding a digit

The last two will be picked up from the expected length of the number; for example,a GTIN-13 has 13 numbers, so if 12 or 14 were entered, the computer immediately knows this is not right. The first two depend on the check digit in order to be detected. Interestingly, all one digit errors will be detected by common checksum systems, and *most* transpositions will be detected (can you find examples of transpositions that aren’t detected, using the interactive above?)

There are also some less common errors that people make

- Getting a digit wrong in two or more different places
- Doubling the wrong digit, e.g. putting 3481120 instead of 3481220
- Muddling 3 digits, e.g. 14829 instead of 12489
- Phonetic errors are possible when the number was read and typed by somebody listening (or reading the number to themselves as they type it). For example, "three-forty" (340) might be heard as "three-fourteen" (314), and numbers like 5 and 9 can sound similar on a bad phone line.

Experiment further with the interactives for the product barcodes and/or credit card numbers. What errors are picked up? What errors can you find that are not? Are the really common errors nearly always picked up? Can you find any situations that they are not? Try to find examples of errors that are detected and errors that are not for as many of the different types of errors as you can.

{teacher}

Students may be tempted to do things like reverse all the digits, or completely rearrange them and show that the check digit remains the same and then claim it is a limitation of the algorithm, but this is not a good evaluation. They need to think about the algorithm under normal usage, e.g. a cashier entering a barcode number into a computer, a nurse entering an ID number of a patient, or somebody buying something online and entering their credit card number, and the errors they could realistically be expected to make. The errors listed above cover a good range, although they might think of more. Of course it is more important that the really common errors are picked up, but nice if the less common but still plausible ones are too. But remember that it would be more of an issue for the algorithm if it could not detect 1 digit being changed than if it could not detect 3 being changed for example. Dyslexia and related problems could be an interesting issue to consider, although it needs to be kept in proportion since most people are not dyslexic.

{teacher end}

{teacher}

Writing a program to calculate checksums is a good programming exercise. It can be made simple by having each digit entered separately, or part of the exercise could be to separate the digits. It's also not hard to create a spreadsheet to do these calculations.

{teacher end}

### How is the check digit on product barcodes calculated?

The first 12 numbers of the barcode represent information such as the country origin, manufacturer, and an identifier for the product. The 13th digit is a check digit, it is calculated from the first 12 digits.

So, given the first 12 digits of a barcode number, how is the 13th digit calculated? The following algorithm is used (also, see the example below).

Multiply every second digit (starting with the second digit) by 3, and every other digit by 1 (so they stay the same).
Add up all the multiplied numbers to obtain the *sum*.
The check digit is whatever number would have to be added to the sum in order to bring it up to a multiple of 10 (i.e. the last digit of the sum should be 0). Or more formally, take the last digit of the sum and if it is 0, the check digit is 0. Otherwise, subtract the last digit from 10 to obtain the check digit.

Lets look at an example to illustrate this algorithm. We want to confirm that the check digit that was put on the barcode of a bottle of coke was the correct one. Its barcode number is 9300675032247. The last digit, 7, is the check digit. So we take the first 12 digits and multiply them by 1 or 3, depending on their positions (9x1+3x3+0x1+0x3+6x1+7x3+5x1+0x3+3x1+2x3+2x1+4x3). We then add up all the multiplied numbers, obtaining a sum of 73. We want to add the check digit that will bring the sum up to the nearest multiple of 10, which is 80. This number is 7, which is indeed the check digit on the coke bottle’s barcode.

{comment}

.. xjrm PLEASE INSERT THE GTIN-13 DIAGRAM HERE

{comment end}

The algorithm to check whether or not a barcode number was correctly entered is very similar. This time, we are using all 13 digits.

Multiply every second digit (starting with the second digit) by 3, and every other digit by 1. This includes the 13th digit.
Add up all the multiplied numbers to obtain the *sum*
If the last digit of the sum is a 0, the number was entered correctly.

{panel hint}

A quick way to add up a checksum that can be done in your head with some practice is to separate the numbers to be multiplied by 3, add them up, and then multiply by 3. For the example above (9300675032247) the two groups are 9+0+6+5+3+2+7 = 32 and 3+0+7+0+2+4= 16. So we add 32 + 16x3, which gives the total of 80 including the check digit.

{panel hint end}

{teacher}

Good students should be able to recognise the relationship between the two algorithms. Because the 13th digit is in an odd numbered position, it is multiplied by 1 in the second algorithm before being added to the total. It was also effectively multiplied by 1 before being added to the total in the first algorithm. Because the check digit was chosen so that the last digit of the sum would be 0, it makes sense that a number in the second algorithm was correctly entered its sum also ends in 0.

{teacher end}

{comment}

.. xtcb give answer to question in following in the teacher version (" you see any pairs where the diagonals would add up to the same value? There is one!")

.. xjrm end the first paragraph with " You can find some detailed examples of why the formula works so well <<in this document>>." Then put the rest of them material in a separate document. Or some other way to make the curiosity smaller!

{comment end}

{curiosity}

**For Experts: Why does this algorithm work so well?**

In order to be effective, the algorithm needs to ensure the multiplied digits will not add up to a multiple of 10 any more if the digits are changed slightly. The choice of multipliers affects how likely it is to detect small changes in the input. It's possible to analyse these mathematically to work out what sorts of errors can be detected.

The check digit on barcodes is described in the chapter on [error control coding](coding-error-control.html). Basically every second digit is multiplied by 3, and the sum of these multiples are added to the remaining digits.

Lets look at some smaller examples with 5 digits (4 normal digits and a check digit), as the same ideas will apply to the 13 digit numbers.

If we need a check digit for 8954, we would calculate (8x1)+(9x3)+(5x1)+(4x3)=52, and in order to bring this up to 60, we need to add 8. This makes the full number 89548.

The first thing we should observe is that only the ones column (last digit) of each number added have any impact on the check digit. 8+27+5+12=52, and 8+7+5+2=22 (only looking at the last digit of each number we are adding). Both these end in a 2, and therefore need 8 to bring them up to the nearest multiple of 10. You might be able to see why this is if you consider that the “2” and “1” were cut from the tens column, they are equal to 10+20=30, a multiple of 10. Subtracting them only affects the tens column and beyond. This is always the case, and therefore we can simplify the problem by only adding the ones column of each number to the sum. (This can also be used as a shortcut to calculate the checksum in your head).

*Protection against single digit errors*

Next, lets look at why changing *one* digit in the number to another digit will *always* be detected with this algorithm. Each digit will contribute a number between 0 and 9 to the sum (remember we only care about the ones column now). As long as changing the digit will result in it contributing a different amount to the sum, it becomes impossible for it to still sum to a multiple of 10. Remember that each digit is either multiplied by 1 or 3 before its ones column is added to the sum.

A number being multiplied by 1 will always contribute itself to the sum. If for example the digit was supposed to be 9, no other single digit can contribute 9 to the sum. So those multiplied by 1 are fine.

But what about those multiplied by 3? To answer that, we need to look at what each different digit contributes to the sum when multiplied by 3.

- 1 -> 3
- 2 -> 6
- 3 -> 9
- 4 -> 2 (from 1*2*)
- 5 -> 5 (from 1*5*)
- 6 -> 8 (from 1*8*)
- 7 -> 1 (from 2*1*)
- 8 -> 4 (from 2*4*)
- 9 -> 7 (from 2*7*)
- 0 -> 0

If you look at the right hand column, you should see that no number is repeated twice. This means that no digit contributes the same amount to the sum when it is multiplied by 3!

Therefore, we know that all single digit errors will be detected.

*Protection against swapping adjacent digit errors*

Seeing why the algorithm is able to protect against most swap errors is much more challenging.

If two digits are next to one another, one of them must be multiplied by 1, and the other by 3. If they are swapped, then this is reversed. For example, if the number 89548 from earlier is changed to 8*59*48, then (5x3)+(9x1)=24 is being added to the total instead of (9x3)+(5x1)=32. Because 24 and 32 have different values in their ones columns, the amount contributed to the total is different, and therefore the error will be detected.

But are there any cases where the totals will have the same values in their ones columns? Another way of looking at the problem is to take a pair of rows from the table above, for example:

- 8 -> 4
- 2 -> 6

Remember that the first column is how much will be contributed to the total for digits being multiplied by 1, and the second column is for those being multiplied by 3. Because adjacent digits are each multiplied by a different amount (one by 3 and the other by 1), the numbers diagonal to each other in the chosen pair will be added.

If for example the first 2 digits in a number are “28”, then we will add 2+4=6 to the sum. If they are then reversed, we will add 8+6=14, which is equivalent to 4 as again, the “10” part does not affect the sum. 8+6 and 2+4 are the diagonals of the pair!

- *8* -> **4**
- **2** -> *6*

So the question now is, can you see any pairs where the diagonals would add up to the same value? There is one!

*Protection against twin errors*

A twin error is where a digit that is repeated twice in a number is changed to a different digit that is repeated twice. For example, if we have “22” in the number, somebody might somehow change it to “88”.

When two numbers are side by side, one is multiplied by 3 and the other by 1. So the amount contributed to the total is the sum of the number’s row in the above table.
For example, 2 has the row “2->6”. This means that 2+6=8 will be contributed to the sum as a result of these two digits.

If any rows add up to the same number, this could be a problem. Where the sum was over 10, the tens column has been removed.

- 1 -> 3 adds to “4”
- 2 -> 6 adds to “8”
- 3 -> 9 adds to “2”
- 4 -> 2 adds to “6”
- 5 -> 5 adds to “0”
- 6 -> 8 adds to “4”
- 7 -> 1 adds to “8”
- 8 -> 4 adds to “2”
- 9 -> 7 adds to “6”
- 0 -> 0 adds to “0”

Some of the rows add up to the same number! Because both 4 and 9 add up to 6, the error will not be detected if “44” changes to “99” in a number!

Rows that do not add will be detected. From the example above, if 22 changes to 88, this will be detected because 22’s total is 8, and 88’s total is 2.

*An error which is never detected*

Another error that people sometimes make is the jump transposition error. This is where two digits that have one digit in between them are swapped, for example, 812 to 218.

A pair of numbers that are two apart like this will always be multiplied by the same amount as each other, either 1 or 3. This means that the change in position of the numbers does not affect what they are multiplied by, and therefore what they contribute to the sum. So this kind of error will never be detected.

{curiosity end}

{comment}

.. Check Digits On Credit Card Numbers
.. ----------------------------------------------------------------------------------------------------------------

.. Credit card numbers also have check digits. These can be used by online purchasing systems to ensure that the credit card number entered was entered correctly way before having to check with the bank to see if the number is legitimate. This isn't a good protection against fraud, but it does check that a legitimate user hasn't made a simple mistake that makes it look like they are trying to commit a fraud, or that a completely random number has been typed in. A credit card number has 16 digits in it: 15 digits that make up the number, and then the last digit is a check digit.

.. Before we go any further investigating credit card numbers, there are a few ethical and privacy issues we must consider. While credit card numbers are not secret, just like your home address you would not give your credit card number to just anybody. There are fraudsters around who collect credit card numbers and attempt to use other peoples credit cards. (One of the main reasons Paypal exists is that it hides the credit card number from the seller, and only Paypal needs to be trusted with this sensitive information, rather than every person you make a payment to on the internet.)

.. It is not really a good idea to include experiments in an assessed report that contain your credit card number or your parents’ credit card number. You also need to be careful about making credit card numbers up, as the number you make up could potentially be somebody’s valid credit card number. There is a range of credit card numbers that are only used as test numbers, which start with 5413 30. If you are giving examples using credit cards, we recommend that you use numbers in this range in your report. You can use the following generator to generate test credit card numbers in this range.

.. JACK PUT THE CREDIT CARD NUMBER GENERATOR HERE

.. The interactive below allows you to experiment with numbers from the above generator, and see what kinds of errors are detected and which are not (use the information from the previous sections to guide your experimentation). Note that it only accepts numbers from the above generator, as we don’t want you checking real credit card numbers with this interactive!


.. The algorithm for calculating credit card number check digits
.. ---------------------------------------------------------------------------------------------------------------------------

{comment end}

### The whole story!

The codes discussed in this chapter are all widely used, but the most widely used codes for data storage are more sophisticated because they need to deal with more complex errors than a single bit changing.
For example, if a CD is scratched of a hard disk has a small fault, it's likely to affect many adjacent bits.
These systems use codes based on more advanced mathematical concepts.
The most widely used codes for storage and data transfer are [the Reed-Solomon codes](http://en.wikipedia.org/wiki/Reed_Solomon) and [Cyclic Redundancy Check (CRC)](http://en.wikipedia.org/wiki/CRC32).
For human readable numbers such as bar codes, bank numbers, tax numbers, social security numbers and so on, [checksums](http://en.wikipedia.org/wiki/Checksum) are very common, and the [Luhn algorithm](http://en.wikipedia.org/wiki/Luhn_algorithm) is one of the more widely used.
Larger checksums are also used to check that downloaded files are correct.
The parity method is a form of [Hamming code](http://en.wikipedia.org/wiki/Hamming_code).


## Further reading

###Useful Links
- [CS Unplugged Parity Trick](http://csunplugged.org/error-detection)
- [CS4FN](http:cs4fn.org) has a [free book](http://www.cs4fn.org/magic/) that contains the Parity Trick and a number of other tricks related to computer science.
- Techradar has more [information about error detection and correction](http://www.techradar.com/news/computing/how-error-detection-and-correction-works-1080736)
- [An explanation of error correcting codes](http://www.multiwingspan.co.uk/as1.php?page=error)
- [A check digit calculator for common bar codes](http://www.gs1.org/barcodes/support/check_digit_calculator)
