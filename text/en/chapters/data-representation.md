# Data Representation

{panel type="teacher-note" summary="Math in Data Representation"}
A lot of the exercises in this chapter involve simple arithmetic. If students struggle to do this by hand, a lot can be done using spreadsheets.
{panel end}

## What's the big picture?

Computers are machines that do stuff with information. They let you view, listen, create, and edit information in documents, images, videos, sound, spreadsheets and databases. They let you play games in simulated worlds that don’t really exist except as information inside the computer’s memory and displayed on the screen. They let you compute and calculate with numerical information; they let you send and receive information over networks.  Fundamental to all of this is that the computer has to represent that information in some way inside the computer’s memory, as well as storing it on disk or sending it over a network.  

To make computers easier to build and keep them reliable, everything is represented using just two values. You may have seen these two values represented as 0 and 1, but on a computer they are represented by anything that can be in two states. For example, in memory a low or high voltage is used to store each 0 or 1. On a magnetic disk it's stored with magnetism (whether a tiny spot on the disk is magnetised north or south).

The idea that *everything* stored and transmitted in our digital world is stored using just two values might seem somewhat fantastic, but here's an exercise that will give you a little experience using just black and white cards to represent numbers.
In the following interactive, click on the last card (on the right) to reveal that it has one dot on it.
Now click on the previous card, which should have two dots on it.
Before clicking on the next one, how many dots do you predict it will have?
Carry on clicking on each card moving left, trying to guess how many dots each has.

{interactive name="binary-cards" type="whole-page" text="Binary Cards" parameters="digits=5&start=BBBBB"}

The challenge for you now is to find a way to have exactly 22 dots showing
(the answer is in the spoiler below).
Now try making up other numbers of dots, such as 11, 29 and 19.
Is there any number that can't be represented? To test this, try counting up from 0.

{panel type="teacher-note" summary="Patterns in the cards"}

This exercise comes up again below as an introduction to representing numbers.
The card interactive can also be done with physical cards as a change from doing things on a computer.

If students have trouble solving the puzzles, start at the left and ask "Can you use the 16 dots? 8 dots?" and so on.
Each one will either be obviously too big, or otherwise it should be used.

With some guidance students should notice patterns, for example,
that the one-dot card is coming up every second time (the odd numbers).

{panel end}

{panel type="spoiler" summary="Solution to card puzzles"}

You may have noticed that each card shows twice as many dots as the one to its right.
This is an important pattern in data representation on computers.

The number 22 requires the cards to be "white, black, white, white, black",
11 is "black, white, black, white, white",
29 is "white, white, white, black, white", and
19 is "white, black, black, black, white".

{panel end}




You should have found that any number from 0 to 31 can be represented with 5 cards.
Each of the numbers could be communicated using just two words: black and white.
For example, 22 dots is "white, black, white, white, black".
Or you could decode "black, black, white, white, white" to the number 7.
This is the basis of data representation - anything that can have two different states can represent anything on a digital device.

When we write what is stored in a computer on paper, we normally use “0” for one of the states, and “1” for the other state. For example, a piece of computer memory could have the following voltages:

```
low low high low high high high high low high low low
```

We could allocate **“0”** to **“low”**, and **“1”** to **“high”** and write this sequence down as:

```
0 0 1 0 1 1 1 1 0 1 0 0
```

While this notation is used extensively, and you may often hear the data being referred to as being “0’s and 1’s”, it is important to remember that a computer does *not* store 0’s and 1’s; it has no way of doing this. They are just using physical mechanisms such as high and low voltage, north or south polarity, and light or dark materials.

{panel type="jargon-buster" summary="Bits"}

The use of the two digits 0 and 1 is so common that some of the best known computer jargon is used for them. Since there are only two digits, the system is called binary. The short word for a "binary digit" is made by taking the first two letters and the last letter --- a *bit* is just a digit that can have two values.

{panel end}

Every file you save, every picture you make, every download, every digital recording, every web page is just a whole lot of bits.
These binary digits are what make digital technology *digital*!
And the nature of these digits unlock a powerful world of storing and sharing a wealth of information and entertainment.

Computer scientists don't spend a lot of time reading bits themselves, but knowing how they are stored is really important because it affects the amount of space that data will use, the amount of time it takes to send the data to a friend (as data that takes more space takes longer to send!) and the quality of what is being stored.
You may have come across things like "24-bit colour", "128-bit encryption", "32-bit IPv4 addresses" or "8-bit ASCII".
Understanding what the bits are doing enables you to work out how much space will be required to get high-quality colour, hard-to-crack secret codes, a unique ID for every device in the world, or text that uses more characters than the usual English alphabet.

This chapter is about some of the different methods that computers use to code different kinds of information in patterns of these bits, and how this affects the cost and quality of what we do on the computer, or even if something is feasible at all.

## Getting Started

To begin with, we'll look at Braille. Braille is not actually a way that computers represent data, but is a great introduction to the topic.

{panel type="additional-information" summary="Representing Braille without making holes in paper"}
When working through the material in this section, a good way to draw braille on paper without having to actually make raised dots is to draw a rectangle with 6 small circles in it, and to colour in the circles that are raised, and not colour in the ones that aren’t raised.
{panel end}

### What is Braille?

More than 200 years ago a 15-year-old French boy invented a system for representing text using combinations of flat and raised dots on paper so that they could be read by touch.
The system became very popular with people who had visual impairment as it provided a relatively fast and reliable way to "read" text without seeing it.
Louis Braille's system is an early example of a "binary" representation of data --- there are only two symbols (raised and flat), and yet combinations of them can be used to represent reference books and works of literature.
Each character in braille is represented with a cell of 6 dots. Each dot can either be raised or not raised. Different numbers and letters can be made by using different patterns of raised and not raised dots.

{image filename="braille-alphabet-diagram.jpg" alt="The braille alphabet"}

Let's work out how many different patterns can be made using the 6 dots in a Braille character.
If braille used only 2 dots, there would be 4 patterns.
And with 3 dots there would be 8 patterns

{image filename="two-and-three-dot-combinations-diagram.png" alt="Combinations of both two and three dots"}

You may have noticed that there are twice as many patterns with 3 dots as there are with 2 dots. It turns out that every time you add an extra dot, that gives twice as many patterns, so with 4 dots there are 16 patterns, 5 dots has 32 patterns, and 6 dots has 64 patterns. Can you come up with an explanation as to why this doubling of the number of patterns occurs?

{panel type="spoiler" summary="Why does adding one more dot double the number of possible patterns?"}
The reason that the number of patterns doubles with each extra dot is that with, say, 3 dots you have 8 patterns, so with 4 dots you can use all the 3-dot patterns with the 4th dot flat, and all of them with it raised.
This gives 16 4-dot patterns.
And then, you can do the same with one more dot to bring it up to 5 dots.
This process can be repeated infinitely.
{panel end}

{panel type="teacher-note" summary="Importance of students understanding why the number of patters double with every dot"}
This concept is a fundamental one for students to grasp with binary representation: each extra bit doubles the number of values that can be stored. This becomes very important in choosing the right number of bits for a value. For example, a 101-bit encryption key is *twice* as hard to crack as a 100-bit key, even though it's only 1% larger!
{panel end}

So, Braille, with its 6 dots, can make 64 patterns.
That's enough for all the letters of the alphabet, and other symbols too, such as digits and punctuation.

### So how does Braille relate to data representaton?

The reason we're looking at Braille in this chapter is because it is a representation using bits.
That is, it contains 2 different values (raised and not raised) and contains sequences of these to represent different patterns.
The letter m, for example, could be written as 110010, where "1" means raised dot, and "0" means not raised dot (assuming we're reading from left to right and then down).
This is the same as how we sometimes use 1's and 0's to show how a computer is representing data.

Braille also illustrates why binary representation is so popular. It would be possible to have three kinds of dot: flat, half raised, and raised.
A skilled braille reader could distinguish them, and with three values per dot, you would only need 4 dots to represent 64 patterns.
The trouble is that you would need more accurate devices to create the dots, and people would need to be more accurate at sensing them.
If a page was squashed, even very slightly, it could leave the information unreadable.

Digital devices almost always use two values (binary) for similar reasons: computer disks and memory can be made cheaper and smaller if they only need to be able to distinguish between two extreme values (such as a high and low voltage), rather than fine-grained distinctions between very subtle differences in voltages.
Using ten digits (like we do in our every day decimal counting system) would obviously be too challenging.

{panel type="curiosity" summary="Decimal-based computers"}
Why are digital systems so hung up on only using two digits? After all, you could do all the same things with a 10 digit system?

As it happens, people have tried to build decimal-based computers, but it's just too hard.
Recording a digit between 0 and 9 involves having accurate equipment for reading voltage levels, magnetisation or reflections, and it's a lot easier just to check if it's mainly one way or the other.

There's a more in-depth discussion on why we use binary here:

{video url="https://www.youtube.com/watch?v=thrx3SBEpL8"}
{panel end}


## Numbers

{panel type="teacher-note" summary="CS Unplugged activity"}
If you are doing a warm up exercise with the class, the CS Unplugged binary activity [http://csunplugged.org/binary-numbers](http://csunplugged.org/binary-numbers) provides scaffolding and can be used to teach concepts around binary numbers using only counting or simple addition.
We also have an interactive which emulates the physical binary cards here:

{interactive name="binary-cards" type="whole-page" text="Binary Cards"}

In the chapter we have decided to approach this section by starting with number systems. While this may appear “scary” because of the math, most students should be quite familiar with it as it is first introduced very early in primary school in the form of recognising that numbers are made up of the “ones”, “tens”, “hundreds”, etc, and is further built on until eventually in high school they learn about the exponent notation, i.e. {math}541 = 5 \times 10^2 + 4 \times 10^1 + 1 \times 10^0{math end}. As explained in this section, binary numbers are a base 2 number system, rather than the base 10 number system we are all familiar with. The idea of number systems provides a good stepping stone into binary numbers

We are assuming that students already know about base 10 number systems, including the exponent notation. The initial information in this section on them is only intended to trigger recall, rather than actually teaching them the concept.

Less mathematically able students who are really struggling with number systems should be able to skip over it, and instead go directly to making binary numbers in the interactive.
{panel end}

In this section, we will look at how computers represent numbers. To begin with, we'll revise how the base-10 number system that we use every day works, and then look at binary, which is base-2. After that, we'll look at some other charactertistics of numbers that computers must deal with, such as negative numbers and numbers with decimal points.

### Understanding the base 10 number system

The number system that humans normally use is in base 10 (also known as decimal). It's worth revising quickly, because binary numbers use the same ideas as decimal numbers, just with fewer digits!

In decimal, the value of each digit in a number depends on its **place** in the number. For example, in $123, the 3 represents $3, whereas the 1 represents $100. Each place value in a number is worth 10 times more than the place value to its right, i.e. there are the “ones”, the “tens”, the “hundreds”, the “thousands” the “ten thousands”, the “hundred thousands”, the “millions”, and so on. Also, there are 10 different **digits** (0,1,2,3,4,5,6,7,8,9) that can be at each of those place values.

If you were only able to use one digit to represent a number, then the largest number would be 9. After that, you need a second digit, which goes to the left, giving you the next ten numbers (10, 11, 12... 19). It's because we have 10 digits that each one is worth 10 times as much as the one to its right.

You may have encountered different ways of expressing numbers using “expanded form”. For example, if you want to write the number 90328 in expanded form you might have written it as:

{math}90328 = 90000 + 300 + 20 + 8{math end}

A more sophisticated way of writing it is:

{math}90328 = (9 \times 10000) + (0 \times 1000) + (3 \times 100) + (2 \times 10) + (8 \times 1){math end}

If you've learnt about exponents, you could write it as
{math}90328 = (9 \times 10^4) + (0 \times 10^3) + (3 \times 10^2) + (2 \times 10^1) + (8 \times 10^0){math end}

Remember that any number to the power of 0 is 1. i.e. the 8 x {math}10^0{math end} is 8, because the {math}10^0{math end} is 1.

The key ideas to notice from this are:

- Decimal has 10 **digits** -- 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.
- A **place** is the place in the number that a digit is, i.e. ones, tens, hundreds, thousands, and so on. For example, in the number 90328, 3 is in the "hundreds" place, 2 is in the "tens" place, and 9 is in the "ten thousands" place.
- Numbers are made with a sequence of digits.
- The right-most digit is the one that's worth the least (in the "ones" place).
- The left-most digit is the one that's worth the most.
- Because we have 10 digits, the digit at each place is worth 10 times as much as the one immediately to the right of it.

All this probably sounds really obvious, but it is worth thinking about consciously, because binary numbers have the same properties.

### Representing whole numbers in Binary

{panel type="teacher-note" summary="Teaching binary numbers"
This subsection is a prerequisite for the colours section, as colour representations are built on simple binary numbers.

It's very common for computer science courses and books (like this one) to teach students how to convert between binary representation and decimal numbers. In practice, computer scientists hardly ever do this, but the important thing is to understand the patterns and constraints around binary numbers. A key pattern that students should pick up is that adding just one bit to a binary number *doubles* the range it can represent. The patterns around binary numbers come up in many areas of computer science, so it is well worth getting familiar with them.
{panel end}

{panel type="teacher-note" summary="Binary pianos"}
The "binary piano" is a simple binary conversion device that can be printed on paper, and enables students to experiment with these concepts physically.
It can be [downloaded here](files/binary-piano-UC.pdf)
or as a [4-up version here](files/binary-piano-UC-4up.pdf).
These versions have 9 bits; if you want to emphasise that bytes use 8 bits,
you can have students ignore the 9th bit (perhaps by sticking it on 0),
but it is useful when they want to remember the largest 8-bit value,
since they can get it by subtracting one from the value of the 9th bit.
{panel end}

As discussed earlier, computers can only store information using bits, which only have 2 possible states. This means that they cannot represent base 10 numbers using digits 0 to 9, the way we write down numbers in decimal. Instead, they must represent numbers using just 2 digits -- 0 and 1.

Binary works in a very similar way to Decimal, even though it might not initially seem that way. Because there are only 2 digits, this means that each digit is **2** times the value of the one immediately to the right.

{panel type="curiosity" summary="The Denary number system"}
The base 10 (decimal) system is sometimes called denary, which is more consistent with the the name binary for the base 2 system. The word "denary" also refers to the Roman denarius coin, which was worth ten asses (an "as" was a copper or bronze coin).
The term "denary" seems to be used mainly in the UK; in the US, Australia and NZ the term "decimal" is more common.
{panel end}

The interactive below illustrates how this binary number system represents numbers. Have a play around with it to see what patterns you can see.

{interactive name="base-calculator" type="whole-page" text="Binary Number Calculator"}

**To ensure you are understanding correctly how to use the interactive, verify that when you enter the binary number 101101 it shows that the decimal representation is 45, that when you enter 100000 it shows that the decimal representation is 32, and when you enter 001010 it shows the decimal representation is 10.**

{panel type="teacher-note" summary="Using the binary number interactive"}
With the interactive, students should discover that they can convert a number by working from left to right through the digits, setting the digit to 1, and resetting it to zero if the total is higher than the number being sought. After converting a few numbers they will start to anticipate what to do. This algorithm is fairly intuitive, and discoverable by quite young students. Discovering it for themselves will give a lot of confidence in their ability to convert numbers. If they need some help, get them to set the *left-most* bit to one, and ask if the total is too high. If it is, set the bit back to zero, otherwise leave it as one. Then repeat this for each bit from left to right. For example, for the number 37, the first bit gives a total of 32, which isn't too high; setting the second bit brings the total to 48, which is too high, so it stays at zero; the third bit gives a total of 32+8 = 40, which is too high; the fourth bit gives 32+4 = 36, which is ok, so that bit is a 1. The fifth bit would give 38 (too high), and the sixth bit gives the required 37, giving the binary number 100101. This approach is explained for students later in the text, but it's better if they can discover it for themselves.

There are a lot of interactive games for exploring binary numbers. The following one works in a web browser: [Cisco Binary game](http://forums.cisco.com/CertCom/game/binary_game_page.htm). While there's a limit to the value of being able to make binary conversions, doing a number of them helps student to discover the kinds of patterns that occur in the binary number system.

There is another algorithm for conversion that is often found in textbooks, and it is easier to write a program for, but a little harder for learners. It isn't necessary to explore the concepts of this chapter, but in case a student wants to implement it, the algorithm is to work from right to left; set the right-most bit to one if the decimal number is odd, otherwise set it to zero, then divide the decimal number by 2 (rounding down), and repeat the procedure for the next digit to the left (set it to one if the number is odd, otherwise zero, then divide by 2).  This is repeated until the decimal number has been reduced to zero.
{panel end}

Find the representations of 4, 7, 12, and 57 using the interactive.

What is the largest number you can make with the interactive? What is the smallest? Is there any integer value in between the biggest and the smallest that you can’t make? Are there any numbers with more than one representation? Why/ why not?

{panel type="spoiler" summary="Largest and smallest numbers"}
-  000000 in binary, 0 in decimal is the smallest number.
- 111111 in binary, 63 in decimal is the largest number
- All the integer values (0, 1, 2... 63) in the range can be represented (and there is a unique representation for each one). This is exactly the same as decimal!
{panel end}

{panel type="teacher-note" summary="Understanding unique representations"}
The question of uniqueness will be challenging for some students. It addresses the idea that every number has a unique binary representation; students who struggle with the reasoning may be prepared to just accept that this is the case. However, the following reasoning introduces the idea: have a student work out a 5-bit binary representation for, say, 12 (which is 01100). The left-most 0 represents the 16; ask if it would be possible to represent 12 if that bit is a 1 (it's not possible because you'd already have 16, which is more than 12). Now consider the next bit (the 1 represents 8). Is it possible to represent 12 without the 8? (No, because the remaining bits only add up to 7). Following on with this reasoning, the student will establish that 12 *has to* be represented as 01100.

Another way of showing the uniqueness is to work out how many bit combinations there are. For 5 bits, there are two choices for each bit, so 2x2x2x2x2 (i.e. 32) distinct 5-bit binary numbers. Since the 5-bit binary numbers cover the range from 0 to 31, there are 32 numbers, so there's a one-to-one relationship between all possible bit patterns and all numbers they can represent i.e. each number has a unique representation.
{panel end}

You have probably noticed from the interactive that when set to 1, the leftmost bit (the “most significant bit”) adds 32 to the total, the next adds 16, and then the rest add 8, 4, 2, and 1 respectively. When set to 0, a bit does not add anything to the total. So the idea is to make numbers by adding some or all of 32, 16, 8, 4, 2, and 1 together, and each of those numbers can only be included once.

{image filename="xkcd-1-to-10.png" alt="If you get an 11/100 on a CS test, but you claim it should be counted as a &#39;C&#39;, they&#39;ll probably decide you deserve the upgrade." source="https://xkcd.com/953/"}

Choose a number less than 61 (perhaps your house number, your age, a friend's age, or the day of the month you were born on), set all the binary digits to zero, and then start with the *left-most* digit (32), trying out if it should be zero or one. See if you can find a method for converting the number without too much trial and error. Try different numbers until you find a quick way of doing this.

Figure out the binary representation for 23 **without** using the interactive? What about 4, 0, and 32? Check all your answers using the interactive to verify they are correct.

{panel type="challenge" summary="Counting in binary"}
Can you figure out a systematic approach to counting in binary? i.e. start with the number 0, then increment it to 1, then 2, then 3, and so on, all the way up to the highest number that can be made with the 7 bits. Try counting from 0 to 16, and see if you can detect a pattern.
Hint: Think about how you add 1 to a number in base 10. e.g. how do you work out 7 + 1, 38 + 1, 19 + 1, 99 + 1, 230899999 + 1, etc? Can you apply that same idea to binary?

Using your new knowledge of the binary number system, can you figure out a way to count to higher than 10 using your 10 fingers? What is the highest number you can represent using your 10 fingers? What if you included your 10 toes as well (so you have 20 fingers and toes to count with).
{panel end}

{panel type="spoiler" summary="Counting in binary"}
A binary number can be incremented by starting at the right and flipping all consecutive bits until a 1 comes up (which will be on the very first bit half of the time).

Counting on fingers in binary means that you can count to 31 on 5 fingers, and 1023 on 10 fingers. There are a number of videos on YouTube of people counting in binary on their fingers. One twist is to wear white gloves with the numbers 16, 8, 4, 2, 1 on the 5 fingers respectively, which makes it easy to work out the value of having certain fingers raised.
{panel end}

The interactive used exactly 6 bits. In practice, we can use as many or as few bits as we need, just like we do with decimal. For example, with 5 bits, the place values would be 16, 8, 4, 2 and 1, so the largest value is 11111 in binary, or 31 in decimal. Representing 14 with 5 bits would give 01110.

{panel type="Challenge" summary="Representing numbers with bits"}
Write representations for the following. If it is not possible to do the representation, put "Impossible".

- Represent **101** with **7 bits**
- Represent **28** with **10 bits**
- Represent **7** with **3 bits**
- Represent **18** with **4 bits**
- Represent **28232** with **16 bits**
{panel end}

{panel type="spoiler" summary="Answers for above challenge"}
The answers are (spaces are added to make the answers easier to read, but are not required)
- 101 with 7 bits is: **110 0101**
- 28 with 10 bits is: **00 0001 1100**
- 7 with 3 bits is: **111**
- 18 with 4 bits is: **Impossible to represent** (not enough bits)
- 28232 with 16 bits is: 0110 1110 0100 1000
{panel end}

An important concept with binary numbers is the range of values that can be represented using a given number of bits. When we have 8 bits the binary numbers start to get useful --- they can represent values from 0 to 255, so it is enough to store someone's age, the day of the month, and so on.

{panel type="jargon-buster" summary="What is a byte?"}
Groups of 8 bits are so useful that they have their own name: a **byte**. Computer memory and disk space are usually divided up into bytes, and bigger values are stored using more than one byte. For example, two bytes (16 bits) are enough to store numbers from 0 to 65,535. Four bytes (32 bits) can store numbers up to 4,294,967,295. You can check these numbers by working out the place values of the bits. Every bit that's added will double the range of the number.
{panel end}

In practice, computers store numbers with either 16, 32, or 64 bits. This is because these are full numbers of bytes (a byte is 8 bits), and makes it easier for computers to know where each number starts and stops.

{panel type="curiosity" summary="Binary cakes -- preventing fires"}
Candles on birthday cakes use the base 1 numbering system, where each place is worth 1 more than the one to its right. For example, the number 3 is 111, and 10 is 1111111111. This can cause problems as you get older --- if you've ever seen a cake with 100 candles on it, you'll be aware that it's a serious fire hazard.

{image filename="binary-cakes.png" alt="The image shows two people with birthday cakes, however a cake with 100 candles on it turns into a big fireball!"}

Luckily it's possible to use binary notation for birthday candles --- each candle is either lit or not lit. For example, if you are 18, the binary notation is 10010, and you need 5 candles (with only two of them lit).

There's a [video on using binary notation for counting up to 1023 on your hands, as well as using it for birthday cakes](https://www.youtube.com/watch?v=GUqle9RE3Y8).

{image filename="binary-cake.png" alt="It's a lot smarter to use binary notation on candles for birthdays as you get older, as you don't need as many candles." caption="It's a lot smarter to use binary notation on candles for birthdays as you get older, as you don't need as many candles."}
{panel end}

### Shorthand for binary numbers - Hexadecimal

Most of the time binary numbers are stored electronically, and we don't need to worry about making sense of them. But sometimes it's useful to be able to write down and share numbers, such as the unique identifier assigned to each digital device (MAC address), or the colours specified in an HTML page.

Writing out long binary numbers is tedious --- for example, suppose you need to copy down the 16-bit number 0101001110010001. A widely used shortcut is to break the number up into 4-bit groups (in this case, 0101 0011 1001 0001), and then write down the digit that each group represents (giving 5391). There's just one small problem: each group of 4 bits can go up to 1111, which is 15, and the digits only go up to 9.

The solution is simple: we introduce symbols for the digits from 1010 (10) to 1111 (15), which are just the letters A to F. So, for example, the 16-bit binary number 1011 1000 1110 0001 can be written more concisely as B8E1. The "B" represents the binary 1011, which is the decimal number 11, and the E represents binary 1110, which is decimal 14.

Because we now have 16 digits, this representation is base 16, and known as hexadecimal (or hex for short). Converting between binary and hexadecimal is very simple, and that's why hexadecimal is a very common way of writing down large binary numbers.

Here's a full table of all the 4-bit numbers and their hexadecimal digit equivalent:

| **Binary** | **Hex** |
|------------|---------|
| 0000       | 0       |
| 0001       | 1       |
| 0010       | 2       |
| 0011       | 3       |
| 0100       | 4       |
| 0101       | 5       |
| 0110       | 6       |
| 0111       | 7       |
| 1000       | 8       |
| 1001       | 9       |
| 1010       | A       |
| 1011       | B       |
| 1100       | C       |
| 1101       | D       |
| 1110       | E       |
| 1111       | F       |

For example, the largest 8-bit binary number is 11111111. This can be written as FF in hexadecimal. Both of those representations mean 255 in our conventional decimal system (you can check that by converting the binary number to decimal).

Which notation you use will depend on the situation; binary numbers represent what is actually stored, but can be confusing to read and write; hexadecimal numbers are a good shorthand of the binary; and decimal numbers are used if you're trying to understand the meaning of the number or doing normal math. All three are widely used in computer science.

It is important to remember though, that computers **only** represent numbers using binary. They **cannot** represent numbers directly in decimal or hexadecimal.

### Computers representing numbers in practice

A common place that numbers are stored on computers is in spreadsheets or databases. These can be entered either through a spreadsheet program or database program, through a program you or somebody else wrote, or through additional hardware such as sensors, collecting data such as temperatures, air pressure, or ground shaking.

Some of the things that we might think of as numbers, such as the telephone number (03) 555-1234, aren't actually stored as numbers, as they contain important characters (like dashes and spaces) as well as the leading 0 which would be lost if it was stored as a number (the above number would come out as 35551234, which isn't quite right). These are stored as **text**, which is discussed in the next section.

On the other hand, things that don't look like a number (such as "30 January 2014") are often stored using a value that is converted to a format that is meaningful to the reader (try typing two dates into Excel, and then subtract one from the other --- the result is a useful number). In the underlying representation, a number is used. Program code is used to translate the underlying representation into a meaningful date on the user interface.

{panel type="curiosity" summary="More on date representation"}
The difference between two dates in Excel is the number of days between them; the date itself (as in many systems) is stored as the amount of time elapsed since a fixed date (such as 1 January 1900). You can test this by typing a date like "1 January 1850" --- chances are that it won't be formatted as a normal date. Likewise, a date sufficiently in the future may behave strangely due to the limited number of bits available to store the date.
{panel end}

Numbers are used to store things as diverse as dates, student marks, prices, statistics, scientific readings, sizes and dimensions of graphics.

The following issues need to be considered when storing numbers on a computer

- What range of numbers should be able to be represented?
- How do we handle negative numbers?
- How do we handle decimal points or fractions?

### How many bits are used in practice?

In practice, we need to allocate a fixed number of bits to a number, before we know how big the number is. This is often 32 bits or 64 bits, although can be set to 16 bits, or even 128 bits, if needed. This is because a computer has no way of knowing where a number starts and ends, otherwise.

Any system that stores numbers needs to make a compromise between the number of bits allocated to store the number, and the range of values that can be stored.

In some systems (like the Java and C programming languages and databases) it's possible to specify how accurately numbers should be stored; in others it is fixed in advance (such as in spreadsheets).

Some are able to work with arbitrarily large numbers by increasing the space used to store them as necessary (e.g. integers in the Python programming language). However, it is likely that these are still working with a multiple of 32 bits (e.g. 64 bits, 96 bits, 128 bits, 160 bits, etc). Once the number is too big to fit in 32 bits, the computer would reallocate it to have up to 64 bits.

In some programming languages there isn't a check for when a number gets too big (overflows). For example, if you have an 8-bit number using two's complement, then 01111111 is the largest number (127), and if you add one without checking, it will change to 10000000, which happens to be the number -128. This can cause serious problems if not checked for, and is behind a variant of the Y2K problem, called the [Year 2038 problem](https://en.wikipedia.org/wiki/Year_2038_problem), involving a 32-bit number overflowing for dates on Tuesday, 19 January 2038.

{image filename="xkcd-cant-sleep-comic.png" alt="A xkcd comic on number overflow" source="https://xkcd.com/571/"}

On tiny computers, such as those embedded inside your car, washing machine, or a tiny sensor that is barely larger than a grain of sand, we might need to specify more precisely how big a number needs to be. While computers prefer to work with chunks of 32 bits, we could write a program (as an example for an earthquake sensor) that knows the first 7 bits are the lattitude, the next 7 bits are the longitude, the next 10 bits are the depth, and the last 8 bits are the amount of force.

Even on standard computers, it is important to think carefully about the number of bits you will need. For example, if you have a field in your database that could be either "0", "1", "2", or "3" (perhaps representing the four bases that can occur in a DNA sequence), and you used a 64 bit number for every one, that will add up as your database grows. If you have 10,000,000 items in your database, you will have wasted 62 bits for each one (only 2 bits is needed to represent the 4 numbers in the example), a total of 620,000,000 bits, which is around 74 MB. If you are doing this a lot in your database, that will really add up -- human DNA has about 3 billion base pairs in it, so it's incredibly wasteful to use more than 2 bits for each one.

And for applications such as Google Maps, which are storing an astronomical amount of data, wasting space is not an option at all!

{panel type="challenge" summary="How many bits will you need?"}
It is really useful to know roughly how many bits you will need to represent a certain value. Have a think about the following scenarios, and choose the best number of bits out of the options given. You want to ensure that the largest possible number will fit within the number of bits, but you also want to ensure that you are not wasting space.

1. Storing the day of the week
  - a) 1 bit
  - b) 4 bits
  - c) 8 bits
  - d) 32 bits
2. Storing the number of people in the world
  - a) 16 bits
  - b) 32 bits
  - c) 64 bits
  - d) 128 bits
3. Storing the number of roads in New Zealand
  - a) 16 bits
  - b) 32 bits
  - c) 64 bits
  - d) 128 bits
4. Storing the number of stars in the universe
  - a) 16 bits
  - b) 32 bits
  - c) 64 bits
  - d) 128 bits
{panel end}

{panel type="spoiler" summary="Answers for above challenge"}
1. b (actually, 3 bits is enough as it gives 8 values, but amounts that fit evenly into 8-bit bytes are easier to work with)
2. c (32 bits is slightly too small, so you will need 64 bits)
3. b (This is a challenging question, but one a database designer would have to think about. There's about 94,000 km of roads in NZ, so if the average length of a road was 1km, there would be too many roads for 16 bits. Either way, 32 bits would be a safe bet.)
4. d (Even 64 bits is not enough, but 128 bits is plenty! Remember that 128 bits isn't twice the range of 64 bits.)
{panel end}

### Representing negative numbers in practice

The binary number representation we have looked at so far allows us to represent positive numbers only. In practice, we will want to be able to represent negative numbers as well, such as when the balance of an account goes to a negative amount, or the temperature falls below zero. In our normal representation of base 10 numbers, we represent negative numbers by putting a minus sign in front of the number.  But in binary, is it this simple?

We will look at two possible approaches: Adding a simple sign bit, much like we do for decimal, and then a more useful system called Two's Complement.

#### Using a simple sign bit

On a computer we don’t have minus signs for numbers (it doesn't work very well to use the text based one when representing a number because you can't do arithmetic on characters), but we can do it by allocating one extra bit, called a *sign* bit, to represent the minus sign. Just like with decimal numbers, we put the negative indicator on the left of the number --- when the sign bit is set to “0”, that means the number is positive and when the sign bit is set to “1”, the number is negative (just as if there were a minus sign in front of it).

For example, if we wanted to represent the number **41** using 7 bits along with an additional bit that is the sign bit (to give a total of 8 bits), we would represent it by **00101001**. The first bit is a 0, meaning the number is positive, then the remaining 7 bits give **41**, meaning the number is **+41**. If we wanted to make **-59**, this would be **10111011**. The first bit is a 1, meaning the number is negative, and then the remaining 7 bits represent **59**, meaning the number is **-59**.

{panel type="challenge" summary="Representing negative numbers with sign bit"}
Using 8 bits as described above (one for the sign, and 7 for the actual number), what would be the binary representations for 1, -1, -8, 34, -37, -88, and 102?
{panel end}

{panel type="spoiler" summary="Representing negative numbers with sign bit"}
The spaces are not necessary, but are added to make reading the binary numbers easier

-   1  is 0000 0001
-  -1  is 1000 0001
-  -8  is 1000 1000
-  34  is 0010 0010
-  -37 is 1010 0101
-  -88 is 1101 1000
-  102 is 0110 0110
{panel end}

Going the other way is just as easy. If we have the binary number **10010111**, we know it is negative because the first digit is a 1. The number part is the next 7 bits **0010111**, which is **23**. This means the number is **-23**.

{panel type="challenge" summary="Converting binary with sign bit to decimal"}
What would the decimal values be for the following, assuming that the first bit is a sign bit?
- 00010011
- 10000110
- 10100011
- 01111111
- 11111111
{panel end}

{panel type="spoiler" summary="Converting binary with sign bit to decimal"}
- 00010011 is 19
- 10000110 is -6
- 10100011 is -35
- 01111111 is 127
- 11111111 is -127
{panel end}

But what about **10000000?** That converts to **-0**. And **00000000** is **+0**.
Since -0 and +0 are both just 0, it is very strange to have two different representations for the same number.

This is one of the reasons that we don't use a simple sign bit in practice.
Instead, computers usually use a more sophisticated representation for negative binary numbers called *Two's Complement*.

#### Two's Complement

There's an alternative representation called *Two's Complement*, which avoids having two representations for 0, and more importantly, makes it easier to do arithmetic with negative numbers.

***Representing positive numbers with Two's Complement***

Representing positive numbers is the same as the method you have already learnt. Using **8 bits**,
the leftmost bit is a zero and the other 7 bits are the usual binary representation of the number;
for example, **1** would be **00000001**, and 65 would be **00110010**.

***Representing negative numbers with Two's Complement***

This is where things get more interesting. In order to convert a negative number to its two's complement representation, use the following process.
1. Convert the number to binary (don't use a sign bit, and pretend it is a positive number).
2. Invert all the digits (i.e. change 0's to 1's and 1's to 0's).
3. Add 1 to the result (Adding 1 is easy in binary; you could do it by converting to decimal first, but think carefully about what happens when a binary number is incremented by 1 by trying a few;
  there are more hints in the panel below).

For example, assume we want to convert **-118** to its Two's Complement representation. We would use the process as follows.
1. The binary number for **118** is **01110110**
2. **01110110** with the digits inverted is **10001001**
3. **10001001 + 1** is **10001010**

Therefore, the Two's Complement representation for **-118** is **10001010**.

{panel type="challenge" summary="Adding one to a binary number"}
The rule for adding one to a binary number is pretty simple, so we'll let you figure it out for yourself.
First, if a binary number ends with a 0 (e.g. 1101010), how would the number change if you replace the last 0 with a 1?
Now, if it ends with 01, how much would it increase if you change the 01 to 10?
What about ending with 011? 011111?

The method for adding is so simple that it's easy to build computer hardware to do it very quickly.
{panel end}

{panel type="teacher-note" summary="Method for adding one to a binary number"}
Students should be able to work out the rule for adding 1 to a binary number by trying it out with a few numbers.

There are different ways to express the process.
In the "Unplugged" exercise at the start of this chapter one of the challenges was to count up through the numbers, which is adding one repeatedly, and it's not unusual for students to see the pattern when they do that.
In that situation the rule could be expressed as "start at the right hand end, and flip bits from right to left until you change a 0 to a 1."
(If the number ends in zero then that would be immediately.)

Another way to express the rule is to find the right most zero in the number, change it to a 1, and change all 1's to its right to zero.
For example, consider adding 1 to 1001**0**111.
The right-most 0 is shown in bold; it changes to 1, and the three 1's to its right change to 0, giving 10011000.

If you get a number with no zeroes in it (e.g. 1111111), you can put one on the left (01111111), then apply the rule, which in this case gives 10000000.

It may help some students to consider what the equivalent rule is in decimal for adding 1 -- how do you add one to 284394? To 38999? 9999799?
{panel end}



{panel type="challenge" summary="Determining the Two's Complement"}
What would be the two's complement representation for the following numbers, **using 8 bits**? Follow the process given in this section, and remember that you do not need to do anything special for positive numbers.
1. 19
2. -19
3. 107
4. -107
5. -92
{panel end}

{panel type="spoiler" summary="Determining the Two's Complement"}
1. 19 in binary is **0001 0011**, which is the two's complement for a positive number.
2. For -19, we take the binary of the positive, which is 0001 0011 (above), invert it to 1110 1100, and add 1, giving a representation of **1110 1101**.
3. 107 in binary is **0110 1011**, which is the two's complement for a positive number.
4. For -107, we take the binary of the positive, which is 0110 1011 (above), invert it to 1001 0100, and add 1, giving a representation of **1001 0101**.
5. For -92, we take the binary of the positive, which is 0101 1100, invert it to 1010 0011, and add 1, giving a representation of **1010 0100**. (If you have this incorrect, double check that you incremented by 1 correctly).
{panel end}

***Converting a Two's Complement number back to decimal***

In order to reverse the process, we need to know whether the number we are looking at is positive or negative. For positive numbers, we can simply convert the binary number back to decimal. But for negative numbers, we first need to convert it back to a normal binary number.

So how do we know if the number is positive or negative? It turns out (for reasons you will understand later in this section) that Two's Complement numbers that are negative always start in a 1, and positive numbers always start in a 0. Have a look back at the previous examples to double check this.

So, if the number starts with a 1, use the following process to convert the number back to a negative decimal number.

1. Subtract 1 from the number
2. Invert all the digits
3. Convert the resulting binary number to decimal
4. Add a minus sign in front of it.

So if we needed to convert 11100010 back to decimal, we would do the following.

1. Subtract **1** from **11100010**, giving **11100001**.
2. Invert all the digits, giving **00011110**.
3. Convert **00011110** to a binary number, giving **30**.
4. Add a negative sign, giving **-30**.

{panel type="challenge" summary="Reversing Two's Complement"}
Convert the following Two's Complement numbers to decimal.
1. 00001100
2. 10001100
3. 10111111
{panel end}

{panel type="spoiler" summary="Reversing Two's Complement"}
1. **12**
2. 10001100 -> (-1) 10001011 -> (inverted) 01110100 -> (to decimal) 116 -> (negative sign added) **-116**
3. 10111111 -> (-1) 10111110 -> (inverted) 01000001 -> (to decimal) 65 -> (negative sign added) **-65**
{panel end}


***How many numbers can be represented using Two's Complement?***

While it might initially seem that there is no bit allocated as the sign bit, the left-most bit behaves like one.
With 8 bits, you can still only make 256 possible patterns of 0's and 1's. If you attempted to use 8 bits to represent positive numbers up to 255, and negative numbers down to -255, you would quickly realise that some numbers were mapped onto the same pattern of bits. Obviously, this will make it impossible to know what number is actually being represented!

In practice, numbers within the following ranges can be represented. **Unsigned Range** is how many numbers you can represent if you only allow positive numbers (no sign is needed), and **Two's Complement Range** is how many numbers you can represent if you require both positive and negative numbers.
You can work these out because the range of 8-bit values if they are stored using unsigned numbers will be from 00000000 to 11111111 (i.e. 0 to 255 in decimal), while the signed two's complement range is from 10000000 (the lowest number, -128 in decimal) to 01111111 (the highest number, 127 in decimal).
This might seem a bit weird, but it works out really well because normal binary addition can be used if you use this representation even if you're adding a negative number.

|      Number     |        Unsigned Range           |                Two's Complement Range                    |
|-----------------|---------------------------------|----------------------------------------------------------|
| 8 bit		  | 0 to 255                        | -128 to 127                                              |
| 16 bit	  | 0 to 65,535                     | -32,768 to 32,767                                        |
| 32 bit	  | 0 to 4,294,967,295              | −2,147,483,648 to 2,147,483,647                          |
| 64 bit	  | 0 to 18,446,744,073,709,551,615 | −9,223,372,036,854,775,808 to 9,223,372,036,854,775,807  |


#### Adding negative binary numbers

Before adding negative binary numbers, we'll look at adding positive numbers.
It's basically the same as the addition methods used on decimal numbers, except the rules are way simpler because there are only two different digits that you might add!

You've probably learnt about column addition. For example, the following column addition would be used to do **128 + 255**.

```
  1   (carries)
 128
+255
----
 383
```
When you go to add 5 + 8, the result is higher than 9, so you put the 3 in the one's column, and carry the 1 to the 10's column. Binary addition works in exactly the same way.

***Adding positive binary numbers***

If you wanted to add two positive binary numbers, such as **00001111** and **11001110**, you would follow a similar process to the column addition.
You only need to know 0+0, 0+1, 1+0, and 1+1, and 1+1+1.
The first three are just what you might expect.
Adding 1+1  causes a carry digit, since in binary 1+1 = 10, which translates to "0, carry 1" when doing column addition.
The last one, 1+1+1 adds up to 11 in binary, which we can express as "1, carry 1".
For our two example numbers, the addition works like this:

```
    111   (carries)
 11001110
+00001111
---------
 11011101
```

Remember that the digits can be only 1 or 0. So you will need to carry a 1 to the next column if the total you get for a column is (decimal) 2 or 3.

***Adding negative numbers with a simple sign bit***

With negative numbers using sign bits like we did before, this does not work. If you wanted to add **+11 (01011)** and **-7 (10111)**, you would expect to get an answer of **+4 (00100)**.

```
11111 (carries)
 01011
+10111
100010
```

Which is **-2**.

One way we could solve the problem is to use column subtraction instead. But this would require giving the computer a hardware circuit which could do this.
Luckily this is unnecessary, because addition with negative numbers works automatically using Two's Complement!

***Adding negative numbers with Two's Complement***

For the above addition (+11 + -7), we can start by converting the numbers to their 5-bit Two's Complement form. Because **01011 (+11)** is a positive number, it does not need to be changed. But for the negative number, **00111 (-7)** (sign bit from before removed as we don't use it for Two's Complement), we need to invert the digits and then add 1, giving **11001**.

Adding these two numbers works like this:

```
 01011
 11001
100100
```

Any extra bits to the left (beyond what we are using, in this case 5 bits) have been truncated.
This leaves **00100**, which is **4**, like we were expecting.

We can also use this for subtraction. If we are subtracting a positive number from a positive number, we would need to convert the number we are subtracting to a negative number. Then we should add the two numbers. This is the same as for decimal numbers, for example 5 - 2 = 3 is the same as 5 + (-2) = 3.

This property of Two's Complement is very useful. It means that positive numbers and negative numbers can be handled by the same computer circuit, and addition and subtraction can be treated as the same operation.

{panel type="curiosity" summary="What's going on with Two's complement?"}

The idea of using a "complementary" number to change subtraction to addition can be seen by doing the same in decimal.
The complement of a decimal digit is the digit that adds up to 10; for example, the complement of 4 is 6, and the complement of 8 is 2.
(The word "complement" comes from the root "complete" - it completes it to a nice round number.)

Subtracting 2 from 6 is the same as adding the complement, and ignoring the extra 1 digit on the left.
The complement of 2 is 8, so we add 8 to 6, giving (1)4.

For larger numbers (such as subtracting the two 3-digit numbers 255 - 128), the complement is the number that adds up to the next power of 10 i.e. 1000-128 = 872.
Check that adding 872 to 255 produces (almost) the same result as subtracting 128.

Working out complements in binary is way easier because there are only two digits to work with, but working them out in decimal may help you to understand what is going on.
{panel end}



#### Using sign bits vs using Two's Complement

We have now looked at two different ways of representing negative numbers on a computer. In practice, a simple sign bit is rarely used, because of having two different representations of zero, and requiring a different computer circuit to handle negative and positive numbers, and to do addition and subtraction.

Two's Complement is widely used, because it only has one representation for zero, and it allows positive numbers and negative numbers to be treated in the same way, and addition and subtraction to be treated as one operation.

There are other systems such as "One's Complement" and "Excess-k", but Two's Complement is by far the most widely used in practice.


{comment}

TODO: Write this section

### Representing decimal points and fractions in practice

Another type of number used in computer systems is the "floating point" value. While we won't look at it in detail, to get a taste of what's involved, consider the bit values in a 4-bit number, which are 8, 4, 2 and 1. What would the value of a bit *to the right* of the one bit be? And to the right of that one?

The following version of the base conversion interactive has bits that are smaller than the 1-bit. Try representing the decimal number 3.5 using this system. How about 2.8125? What about 2.8?

This system is a fixed-point number system; floating point numbers are based on this idea, but allow for the number of digits to be fixed, but the position of the point to change (by giving an exponent value).
{panel end}

{panel type="teacher-note" summary="Solution for extra for experts"}

The values to the right of the 1-bit continue to be a half of the value to their left, so they are 0.5, 0.25, 0.125 and so on. The decimal number 3.5 can be represented as 11.1, and 2.8125 is 10.1101. The number 2.8 can't be represented accurately in binary! The closest value with the 10 bits in the interactive is 10.11001100. In fact, the number never finishes in binary; it contains "1100" repeating forever! This rounding error can be seen in some spreadsheets: try adding 110 + 2.8 - 2.8 - 100. With enough places of accuracy, you can see that the sum doesn't (quite) come to zero.

**Note:** The interactive here has not been updated to the new system. Please [view the interactives on the Data Representation page](http://www.csfieldguide.org.nz/releases/1.9.9/DataRepresentation.html) on the older version of the CSFG. We are currently in the process of updating these interactives for release.

{panel end}

{comment end}

## Text

There are several different ways in which computers use bits to store text. In this section, we will look at some common ones and then look at the pros and cons of each representation.

### ASCII

We saw earlier that 64 unique patterns can be made using 6 dots in Braille. A dot corresponds to a bit, because both dots and bits have 2 different possible values.

Count how many different characters -- upper-case letters, lower-case letters, numbers, and symbols -- that you could type into a text editor using your keyboard. (Don’t forget to count both of the symbols that share the number keys, and the symbols to the side that are for punctuation!)

{panel type="jargon-buster" summary="Characters"}
The collective name for upper-case letters, lower-case letters, numbers, and symbols is *characters* e.g. a, D, 1, h, 6, \*, ], and ~ are all characters.
Importantly, a space is also a character.
{panel end}

If you counted correctly, you should find that there were more than 64 characters, and you might have found up to around 95.
Because 6 bits can only represent 64 characters, we will need more than 6 bits;
it turns out that we need at least 7 bits to represent all of these characters as this gives 128 possible patterns.
This is exactly what the **ASCII** representation for text does.

{panel type="challenge" summary="Why 7 bits?"}
In the previous section, we explained what happens when the number of dots was increased by 1 (remember that a dot in Braille is effectively a bit). Can you explain how we knew that if 6 bits is enough to represent 64 characters, then 7 bits must be enough to represent 128 characters?
{panel end}


Each pattern in ASCII is usually stored in 8 bits, with one wasted bit, rather than 7 bits. However, the left-most bit in each 8-bit pattern is a 0, meaning there are still only 128 possible patterns. Where possible, we prefer to deal with  full bytes (8 bits) on a computer, this is why ASCII has an extra wasted bit.

Here is a table that shows the patterns of bits that ASCII uses for each of the characters.

| Binary  | Char  | Binary  | Char | Binary  | Char  |
|---------|-------|---------|------|---------|-------|
| 0100000 | Space | 1000000 | @    | 1100000 | `     |
| 0100001 | !     | 1000001 | A    | 1100001 | a     |
| 0100010 | "     | 1000010 | B    | 1100010 | b     |
| 0100011 | #     | 1000011 | C    | 1100011 | c     |
| 0100100 | $     | 1000100 | D    | 1100100 | d     |
| 0100101 | %     | 1000101 | E    | 1100101 | e     |
| 0100110 | &     | 1000110 | F    | 1100110 | f     |
| 0100111 | '     | 1000111 | G    | 1100111 | g     |
| 0101000 | (     | 1001000 | H    | 1101000 | h     |
| 0101001 | )     | 1001001 | I    | 1101001 | i     |
| 0101010 | \*    | 1001010 | J    | 1101010 | j     |
| 0101011 | \+    | 1001011 | K    | 1101011 | k     |
| 0101100 | ,     | 1001100 | L    | 1101100 | l     |
| 0101101 | \-    | 1001101 | M    | 1101101 | m     |
| 0101110 | .     | 1001110 | N    | 1101110 | n     |
| 0101111 | /     | 1001111 | O    | 1101111 | o     |
| 0110000 | 0     | 1010000 | P    | 1110000 | p     |
| 0110001 | 1     | 1010001 | Q    | 1110001 | q     |
| 0110010 | 2     | 1010010 | R    | 1110010 | r     |
| 0110011 | 3     | 1010011 | S    | 1110011 | s     |
| 0110100 | 4     | 1010100 | T    | 1110100 | t     |
| 0110101 | 5     | 1010101 | U    | 1110101 | u     |
| 0110110 | 6     | 1010110 | V    | 1110110 | v     |
| 0110111 | 7     | 1010111 | W    | 1110111 | w     |
| 0111000 | 8     | 1011000 | X    | 1111000 | x     |
| 0111001 | 9     | 1011001 | Y    | 1111001 | y     |
| 0111010 | :     | 1011010 | Z    | 1111010 | z     |
| 0111011 | ;     | 1011011 | [    | 1111011 | {     |
| 0111100 | <     | 1011100 | \\   | 1111100 | \|    |
| 0111101 | =     | 1011101 | ]    | 1111101 | }     |
| 0111110 | >     | 1011110 | ^    | 1111110 | ~     |
| 0111111 | ?     | 1011111 | _    | 1111111 | Delete   |

For example, the letter c (lower-case) in the table has the pattern “01100011” (the 0 at the front is just extra padding to make it up to 8 bits). The letter o has the pattern “01101111”. You could write a word out using this code, and if you give it to someone else, they should be able to decode it exactly.

{panel type="teacher-note" summary="Using the table"}
Exchanging short messages in code will force students to use the table, and they should start to pick up some of the patterns (e.g. capital letters have a different code to lower case letters, but they only have one bit different.)
{panel end}

Computers can represent pieces of text with sequences of these patterns, much like Braille does. For example, the word “computers” (all lower-case) would be 01100011 01101111 01101101 01110000 01110101 01110100 01100101 01110010 01110011. This is because "c" is "01100011", "o" is "01101111", and so on.
Have a look at the ASCII table above to check that we are right!

{panel type="curiosity" summary="What does ASCII stand for?"}
The name "ASCII" stands for "American Standard Code for Information Interchange", which was a particular way of assigning bit patterns to the characters on a keyboard.
The ASCII system even includes "characters" for ringing a bell (useful for getting attention on old telegraph systems),
deleting the previous character (kind of an early "undo"),
and "end of transmission" (to let the receiver know that the message was finished).
These days those characters are rarely used, but the codes for them still exist (they are the missing patterns in the table above).
Nowadays ASCII has been supplanted by a code called "UTF-8",
which happens to be the same as ASCII if the extra left-hand bit is a 0,
but opens up a huge range of characters if the left-hand bit is a 1.
{panel end}


{panel type="challenge" summary="More practice at ASCII"}
Have a go at the following ASCII exercises

- How would you represent “science” in ASCII?
- How would you represent "Wellington" in ASCII? (note that it starts with an upper-case “W”)
- How would you represent “358” in ASCII (it is three characters, even though it looks like a number)
- How would you represent "Hello, how are you?" (look for the comma, question mark, and space characters in ASCII table)

Be sure to have a go at all of them before checking the answer!
{panel end}

{panel type="spoiler" summary="Answers to questions above"}

These are the answers.

- "science" = 01110011 01100011 01101001 01100101 01101110 01100011 01100101
- "Wellington" = 01010111 01100101 01101100 01101100 01101001 01101110 01100111 01110100 01101111 01101110
- "358" = 00110011 00110101 00111000

Note that the text "358" is treated as 3 characters in ASCII, which may be confusing, as the text "358" is different to the number 358! You may have encountered this distinction in a spreadsheet e.g. if a cell starts with an inverted comma in Excel, it is treated as text rather than a number. One place this comes up is with phone numbers; if you type 027555555 into a spreadsheet as a number, it will come up as 27555555, but as text the 0 can be displayed.
In fact, phone numbers aren't really just numbers because a leading zero can be important, as they can contain other characters -- for example, +64 3 555 1234 extn. 1234.
{panel end}

#### ASCII usage in practice

ASCII was first used commercially in 1963, and despite the big changes in computers since then, it is still the basis of how English text is stored on computers. ASCII assigned a different pattern of bits to each of the characters, along with a few other “control” characters, such as delete or backspace.

English text can easily be represented using ASCII, but what about languages such as Chinese where there are thousands of different characters? Unsurprisingly, the 128 patterns aren’t nearly enough to represent such languages. Because of this, ASCII is not so useful in practice, and is no longer used widely. In the next sections, we will look at Unicode and its representations. These solve the problem of being unable to represent non-English characters.

{panel type="curiosity" summary="What came before ASCII?"}
There are several other codes that were popular before ASCII, including the [Baudot code](https://en.wikipedia.org/wiki/Baudot_code) and [EBCDIC](https://en.wikipedia.org/wiki/EBCDIC). A widely used variant of the Baudot code was the "Murray code", named after New Zealand born inventor [Donald Murray](https://en.wikipedia.org/wiki/Donald_Murray_(inventor\)). One of Murray's significant improvements was to introduce the idea of "control characters", such as the carriage return (new line). The "control" key still exists on modern keyboards.
{panel end}

### Introduction to Unicode

In practice, we need to be able to represent more than just English characters. To solve this problem, we use a standard called **Unicode**. Unicode is a **character set** with around 120,000 different characters, in many different languages, current and historic. Each character has a unique number assigned to it, making it easy to identify.

Unicode itself is not a representation -- it is a character set. In order to represent Unicode characters as bits, a Unicode **encoding scheme** is used. The Unicode encoding scheme tells us how each number (which corresponds to a Unicode character) should be represented with a pattern of bits.

The following interactive will allow you to explore the Unicode character set. Enter a number in the box on the left to see what Unicode character corresponds to it, or enter a character on the right to see what its Unicode number is (you could paste one in from a foreign language web page to see what happens with non-English characters).

{interactive name="unicode-chars" type="in-page"}

The most widely used Unicode encoding schemes are called UTF-8, UTF-16, and UTF-32;
you may have seen these names in email headers or describing a text file.
Some of the Unicode encoding schemes are **fixed length**, and some are **variable length**.
**Fixed length** means that each character is represented using the same number of bits.
**Variable length** means that some characters are represented with fewer bits than others.
It's better to be **variable length**, as this will ensure that the most commonly used characters are represented with fewer bits than the uncommonly used characters.
Of course, what might be the most commonly used character in English is not necessarily the most commonly used character in Japanese.
You may be wondering why we need so many encoding schemes for Unicode.
It turns out that some are better for English language text, and some are better for Asian language text.

The remainder of the text representation section will look at some of these Unicode encoding schemes so that you understand how to use them, and why some of them are better than others in certain situations.

### UTF-32

UTF-32 is a **fixed length** Unicode encoding scheme. The representation for each character is simply its number converted to a 32 bit binary number. Leading zeroes are used if there are not enough bits (just like how you can represent 254 as a 4 digit decimal number -- 0254).
32 bits is a nice round number on a computer, often referred to as a word (which is a bit confusing, since we can use UTF-32 characters to represent English words!)

For example, the character **H** in UTF-32 would be:
```
00000000 00000000 00000000 01001000
```

The character **$** in UTF-32 would be:
```
00000000 00000000 00000000 00100100
```

And the character **犬** (dog in Chinese) in UTF-32 would be:
```
00000000 00000000 01110010 10101100
```

The following interactive will allow you to convert a Unicode character to its UTF-32 representation. The Unicode character's number is also displayed. The bits are simply the binary number form of the character number.

{interactive name="unicode-binary" type="iframe" parameters="mode=utf32"}

{panel type="project" summary="Represent your name with UTF-32"}
1. Represent each character in your name using UTF-32.
2. Check how many bits your representation required, and explain why it had this many (remember that each character should have required 32 bits)
3. Explain how you knew how to represent each character. Even if you used the interactive, you should still be able to explain it in terms of binary numbers.
{panel end}

ASCII actually took the same approach. Each ASCII character has a number between 0 and 255, and the representation for the character the number converted to an 8 bit binary number. ASCII is also a fixed length encoding scheme -- every character in ASCII is represented using 8 bits.

In practice, UTF-32 is rarely used -- you can see that it's pretty wasteful of space.
UTF-8 and UTF-16 are both variable length encoding schemes, and very widely used. We will look at them next.

{panel type="challenge" summary="How big is 32 bits?"}
1. What is the largest number that can be represented with 32 bits? (In both decimal and binary).

2. The largest number in Unicode that has a character assigned to it is not actually the largest possible 32 bit number -- it is 00000000 00010000 11111111 11111111. What is this number in decimal?

3. Most numbers that can be made using 32 bits do not have a Unicode character attached to them -- there is a lot of wasted space. There are good reasons for this, but if you had a shorter number that could represent any character, what is the minimum number of bits you would need, given that there are currently around 120,000 Unicode characters?
{panel end}

{panel type="spoiler" summary="Answers to above challenge"}
1. The largest number that can be represented using 32 bits is 4,294,967,295 (around 4.3 billion). You might have seen this number before -- it is the largest unsigned integer that a 32 bit computer can easily represent in programming languages such as C.

2. The decimal number for the largest character is 1,114,111.

3. You can represent all current characters with 17 bits. The largest number you can represent with 16 bits is 65,536, which is not enough.
If we go up to 17 bits, that gives 131,072, which is larger than 120,000. Therefore, we need 17 bits.
{panel end}

### UTF-8

UTF-8 is a **variable length** encoding scheme for Unicode. Characters with a lower Unicode number require fewer bits for their representation than those with a higher Unicode number. UTF-8 representations contain either 8, 16, 24, or 32 bits. Remembering that a **byte** is 8 bits, these are 1, 2, 3, and 4 bytes.

For example, the character **H** in UTF-8 would be:
```
01001000
```
The character **ǿ** in UTF-8 would be:
```
11000111 10111111
```

And the character **犬** in UTF-8 would be:
```
11100111 10001010 10101100
```

The following interactive will allow you to convert a Unicode character to its UTF-8 representation. The Unicode character's number is also displayed.

{interactive name="unicode-binary" type="iframe" parameters="mode=utf8"}

#### How does UTF-8 work?

So how does UTF-8 actually work? Use the following process to do what the interactive is doing and convert characters to UTF-8 yourself.

1. Lookup the Unicode number of your character.

2. Convert the Unicode number to a binary number, using as **few** bits as necessary.
Look back to the section on binary numbers if you cannot remember how to convert a number to binary.

3. Count how many bits are in the binary number, and choose the correct pattern to use, based on how many bits there were. Step 4 will explain how to use the pattern.

  ```
  7  or fewer bits: 0xxxxxxx
  11 or fewer bits: 110xxxxx 10xxxxxx
  16 or fewer bits: 1110xxxx 10xxxxxx 10xxxxxx
  21 or fewer bits: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
  ```

4. Replace the x's in the pattern with the bits of the binary number you converted in 2. If there are more x's than bits, replace extra left-most x's with 0's.

For example, if you wanted to find out the representation for **貓** (cat in Chinese), the steps you would take would be as follows.

1. Determine that the Unicode number for **貓** is **35987**.
2. Convert **35987** to binary -- giving **10001100 10010011**.
3. Count that there are **16** bits, and therefore the third pattern **1110xxxx 10xxxxxx 10xxxxx** should be used.
4. Substitute the bits into the pattern to replace the x's -- **11101000 10110010 10010011**.

Therefore, the representation for **貓** is **11101000 10110010 10010011** using UTF-8.

### UTF-16

Just like UTF-8, UTF-16 is a **variable length** encoding scheme for Unicode. Because it is far more complex than UTF-8, we won't explain how it works here.

However, the following interactive will allow you to represent text with UTF-16. Try putting some text that is in English and some text that is in Japanese into it. Compare the representations to what you get with UTF-8.

{interactive name="unicode-binary" type="iframe" parameters="mode=utf16"}

### Comparison of text representations

We have looked at ASCII, UTF-32, UTF-8, and UTF-16.

The following table summarises what we have said so far about each representation.

Representation | Variable or Fixed | Bits per Character | Real world Usage
--- | --- | --- | ---
*ASCII* | Fixed Length | 8 bits | No longer widely used
*UTF-8* | Variable Length | 8, 16, 24, or 32 bits | Very widely used
*UTF-16* | Variable Length | 16 or 32 bits | Widely used
*UTF-32* | Fixed Length | 32 bits | Rarely used

In order to compare and evaluate them, we need to decide what it means for a representation to be "good". Two useful criteria are:

1. Can represent all characters, regardless of language.
2. Represents a piece of text using as few bits as possible.

We know that UTF-8, UTF-16, and UTF-32 can represent all characters, but ASCII can only represent English. Therefore, ASCII fails the first criterion.
But for the second criteria, it isn't so simple.

The following interactive will allow you to find out the length of pieces of text using UTF-8, UTF-16, or UTF-32. Find some samples of English text and Asian text (forums or a translation site are a good place to look), and see how long your various samples are when encoded with each of the three representations. Copy paste or type text into the box.

{interactive name="unicode-length" type="in-page"}

As a general rule, UTF-8 is better for English text, and UTF-16 is better for Asian text. UTF-32 always requires 32 bits for each character, so is unpopular in practice.

{panel type="curiosity" summary="Emoji and Unicode"}
Those cute little characters that you might use in your Facebook statuses, tweets, texts, and so on, are called "emojis", and each one of them has their own Unicode value.
Japanese mobile operators were the first to use emojis, but their recent popularity has resulted in many becoming part of the Unicode Standard and today there are well over 1000 different emojis included.
A current list of these can be seen [here](http://unicode.org/emoji/charts/full-emoji-list.html).
What is interesting to notice is that a single emoji will look very different across different platforms, i.e. &#128518 ("smiling face with open mouth and tightly-closed eyes") in my tweet will look very different to what it does on your iPhone.
This is because the Unicode Consortium only provides the character codes for each emoji and the end vendors determine what that emoji will look like, e.g. for Apple devices the "Apple Color Emoji" typeface is used (there are rules around this to make sure there is consistency across each system).
{panel end}

### Project: Messages hidden in music

There are messages hidden in this video using a 5-bit representation. See if you can find them! Start by reading the explanation below to ensure you understand what we mean by a 5-bit representation.

{video url="https://www.youtube.com/watch?v=L-v4Awj_p7g"}

If you *only* wanted to represent the 26 letters of the alphabet, and weren’t worried about upper-case or lower-case, you could get away with using just 5 bits, which allows for up to 32 different patterns.

You might have exchanged notes which used 1 for "a", 2 for "b", 3 for "c", all the way up to 26 for "z". We can convert those numbers into 5 digit binary numbers.
In fact, you will also get the same 5 bits for each letter by looking at the last 5 bits for it in the ASCII table (and it doesn't matter whether you look at the upper case or the lower case letter).

Represent the word "water" with bits using this system. Check the below panel once you think you have it.

{panel type="spoiler" summary="Representation for water}
```
w: 10111
a: 00001
t: 10111
e: 10100
r: 10010
```
{panel end}

**Now, have a go at decoding the music video!**

{panel type="teacher-note" summary="More information about the video"}
The video actually contains over 20 hidden messages, all using the 5-bit system.
An easy one to start with is the drum solo at the beginning.
The first 5 sounds are "kick kick snare kick kick".
Students need to decide which is 0 and which is 1; this number could either be 00100
(letter number 4, which is "d") or 11011 (letter number 27, which doesn't exist!)
Carrying on with the first option, the first few letters will spell "drum".

The challenges get harder (there are messages in most instrument parts and singing, as well as the dancing and background colours).
The song itself talks about how it is a form of "steganography", a term that students might like to research.

{panel end}


## Images and Colours

### How do computers display colours?

In school or art class you may have mixed different colours of paint or dye together in order to make new colours.
In painting it's common to use red, yellow and blue as three "primary" colours that can be mixed to produce lots more colours.
Mixing red and blue give purple, red and yellow give orange, and so on. By mixing red, yellow, and blue, you can make many new colours.

For printing, printers commonly use three slightly different primary colours: cyan, magenta, and yellow (CMY). All the colours on a printed document were made by mixing these primary colours.

Both these kinds of mixing are called "subtractive mixing", because they start with a white canvas or paper, and "subtract" colour from it. The interactive below allows you to experiment with CMY incase you are not familiar with it, or if you just like mixing colours.

{interactive name="cmy-mixer" type="in-page"}

Computer screens and related devices also rely on mixing three colours, except they need a different set of primary colours because they are *additive*, starting with a black screen and adding colour to it.
For additive colour on computers, the colours red, green and blue (RGB) are used.
Each pixel on a screen is typically made up of three tiny "lights"; one red, one green, and one blue. By increasing and decreasing the amount of light coming out of each of these three, all the different colours can be made. The following interactive allows you to play around with RGB.

{interactive name="rgb-mixer" type="in-page"}

See what colours you can make with the **RGB** interactive. Can you make black, white, shades of grey, yellow, orange, and purple?

{panel type="spoiler" summary="Hints for above"}
Having all the sliders at the extremes will produce black and white, and if they are all the same value but in between, it will be grey (i.e. between black and white).

Yellow is not what you might expect - it's made from red and green, with no blue.
{panel end}

{panel type="curiosity" summary="Primary colours and the human eye"}
There's a very good reason that we mix three primary colours to specify the colour of a pixel.
The human eye has millions of light sensors in it, and the ones that detect colour are called "cones". There are three different kinds of cones, which detect red, blue, and green light respectively. Colours are perceived by the amount of red, blue, and green light in them. Computer screen pixels take advantage of this by releasing the amounts of red, blue, and green light that will be perceived as the desired colour by your eyes. So when you see "purple", it's really the red and blue cones in your eyes being stimulated, and your brain converts that to a perceived colour.
Scientists are still working out exactly how we perceive colour, but the representations used on computers seem to be good enough give the impression of looking at real images.

{image filename="pixels-on-screens.jpg" alt="This image shows the small red, green, and blue pixels that are used on screens to display colour."}

For more information about RGB displays, see [RGB on Wikipedia](https://en.wikipedia.org/wiki/Rgb); for more information about the eye sensing the three colours, see [Cone cell](https://en.wikipedia.org/wiki/Cone_cell) and [trichromacy ](https://en.wikipedia.org/wiki/Trichromacy) on Wikipedia.
{panel end}

### Describing a colour with numbers

Because a colour is simply made up of amounts of the primary colours -- red, green and blue -- three numbers can be used to specify how much of each of these primary colours is needed to make the overall colour.

{panel type="jargon-buster" summary="Pixel"}
The word **pixel** is short for "picture element". On computer screens and printers an image is almost always displayed using a grid of pixels, each one set to the required colour. A pixel is typically a fraction of a millimeter across, and images can be made up of millions of pixels (one megapixel is a million pixels), so you can't usually see the individual pixels. Photographs commonly have several megapixels in them.

It's not unusual for computer screens to have millions of *pixels* on them, and the computer needs to represent a colour for each one of those pixels.
{panel end}

A commonly used scheme is to use numbers in the range 0 to 255. Those numbers tell the computer how fully to turn on each of the primary colour "lights" in an individual pixel. If red was set to 0, that means the red "light" is completely off. If the red "light" was set to 255, that
would mean the "light" was fully on.

With 256 possible values for each of the three primary colours (don't forget to count 0!), that gives 256 x 256 x 256 = 16,777,216 possible colours -- more than the human eye can detect!

{panel type="challenge" summary="What is special about 255?"}
Think back to the binary numbers section. What is special about the number 255,
which is the maximum colour value?

We'll cover the answer later in this section if you are still not sure!
{panel end}

The following interactive allows you to zoom in on an image to see the pixels that are used to represent it. Each pixel is a solid colour square, and the computer needs to store the colour for each pixel.
If you zoom in far enough, the interactive will show you the red-green-blue values for each pixel. You can pick a pixel and put the values on the slider above - it should come out as the same colour as the pixel.

{interactive name="pixel-viewer" type="whole-page" text="Pixel Viewer interactive"}

{panel type="curiosity" summary="Alternative material on bits and colour"}
Another exercise to see the relationship between bit patterns and colour images is [provided here](https://sites.google.com/a/bxs.org.uk/mrkershaw/ict/bitmapgraphics).
{panel end}

### Representing a colour with bits

The next thing we need to look at is how bits are used to represent each colour in a high quality image. Firstly, how many bits do we need? Secondly, how should we decide the values of each of those bits? This section will work through those problems.

#### How many bits will we need for each colour in the image?

With 256 different possible values for the amount of each primary colour, this means 8 bits would be needed to represent the number.

{math}2^8 = 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 = 256{math end}

The smallest number that can be represented using 8 bits is 00000000 -- which is 0. And the largest number that can be represented using 8 bits is 11111111 -- which is 255.

Because there are three primary colours, each of which will need 8 bits to represent each of its 256 different possible values, we need **24 bits in total** to represent a colour.

{math}3 \times 8 = 24{math end}

So, how many colours are there in total with 24 bits? We know that there is 256 possible values each colour can take, so the easiest way of calculating it is:

{math}256 \times 256 \times 256 = 16,777,216 {math end}

This is the same as {math}2^{24}{math end}.

Because 24 bits are required, this representation is called **24 bit colour**. 24 bit colour is sometimes referred to in settings as "True Color" (because it is more accurate than the human eye can see). On Apple systems, it is called "Millions of colours".

#### How do we use bits to represent the colour?

A logical way is to use 3 binary numbers that represent the amount of each of red, green, and blue in the pixel. In order to do this, convert the amount of each primary colour needed to an 8 bit binary number, and then put the 3 binary numbers side by side to give 24 bits.

Because consistency is important in order for a computer to make sense of the bit pattern, we normally adopt the convention that the binary number for red should be put first, followed by green, and then finally blue. The only reason we put red first is because that is the convention that most systems assume is being used.
If everybody had agreed that green should be first, then it would have been green first.

For example, suppose you have the colour that has red = 145, green = 50, and blue = 123 that you would like to represent with bits. If you put these values into the interactive, you will get the colour below.

{image filename="colour-purple.png" alt="The colour purple."}

Start by converting each of the three numbers into binary, using 8 bits for each.

You should get:
- red = 10010001,
- green = 00110010,
- blue = 01111011.

Putting these values together gives 100100010011001001111011, which is the bit representation for the colour above.

There are **no spaces** between the three numbers, as this is a pattern of bits rather than actually being three binary numbers, and computers don’t have any such concept of a space between bit patterns anyway --- everything must be a 0 or a 1. You could write it with spaces to make it easier to read, and to represent the idea that they are likely to be stored in 3 8-bit bytes, but inside the computer memory there is just a sequence of high and low voltages, so even writing 0 and 1 is an arbitrary notation.

Also, all leading and trailing 0’s on each part are kept --- without them, it would be representing a shorter number. If there were 256 different possible values for each primary colour, then the final representation **must** be 24 bits long.

{panel type="curiosity" summary="Monochromatic images"}
"Black and white" images usually have more than two colours in them; typically 256 shades of grey, represented with 8 bits.

Remember that shades of grey can be made by having an equal amount of each of the 3 primary colours, for example red = 105, green = 105, and blue = 105.

So for a monochromatic image, we can simply use a representation which is a single binary number between 0 and 255, which tells us the value that all 3 primary colours should be set to.
{panel end}

The computer won’t ever convert the number into decimal, as it works with the binary directly --- most of the process that takes the bits and makes the right pixels appear is typically done by a graphics card or a printer. We just started with decimal, because it is easier for humans to understand.
The main point about knowing this representation is to understand the trade-off that is being made between the accuracy of colour (which should ideally be beyond human perception) and the amount of storage (bits) needed (which should be as little as possible).

{panel type="curiosity" summary="Hexadecimal colour codes"}
If you haven't already, read the section on [Hexadecimal](chapters/data-representation.html#shorthand-for-binary-numbers---hexadecimal), otherwise this section might not make sense!

When writing HTML code, you often need to specify colours for text, backgrounds, and so on. One way of doing this is to specify the colour name, for example “red”, “blue”, “purple”, or “gold”. For some purposes, this is okay.

However, the use of names limits the number of colours you can represent and the shade might not be exactly the one you wanted. A better way is to specify the 24 bit colour directly. Because 24 binary digits are hard to read, colours in HTML use **hexadecimal codes** as a quick way to write the 24 bits, for example #00FF9E. The hash sign means that it should be interpreted as a hexadecimal representation, and since each hexadecimal digit corresponds to 4 bits, the 6 digits represent 24 bits of colour information.

This "hex triplet" format is used in HTML pages to specify colours for things like the background of the page, the text, and the colour of links. It is also used in CSS, SVG, and other applications.

In the 24 bit colour example earlier, the 24 bit pattern was 100100010011001001111011.

This can be broken up into groups of 4 bits:  1001   0001   0011   0010   0111   1011.

And now, each of these groups of 4 bits will need to be represented with a **hexadecimal** digit.

- 1001 -> 5
- 0001 -> 1
- 0011 -> 3
- 0010 -> 2
- 0111 -> 7
- 1011 -> B

Which gives #51327B.

Understanding how these hexadecimal colour codes are derived also allows you to change them slightly without having to refer back the colour table, when the colour isn’t exactly the one you want. Remember that in the 24 bit color code, the first 8 bits specify the amount of red (so this is the first 2 digits of the hexadecimal code), the next 8 bits specify the amount of green (the next 2 digits of the hexadecimal code), and the last 8 bits specify the amount of blue (the last 2 digits of the hexadecimal code). To increase the amount of any one of these colours, you can change the appropriate hexadecimal letters.

For example, #000000 has zero for red, green and blue, so setting a higher value to the middle two digits (such as  #004300) will add some green to the colour.

You can use this HTML page to experiment with hexadecimal colours. Just enter a colour in the space below:

{interactive name="hex-background-colour" type="in-page"}

{panel end}


### Representing colours with fewer bits

What if we were to use fewer than 24 bits to represent each colour? How much space will be saved, compared to the impact on the image?

#### The range of colours with fewer bits

The following interactive gets you to try and match a specific colour using 24 bits, and then 8 bits.

It should be possible to get a perfect match using 24 bit colour. But what about 8 bits?

{interactive name="colour-matcher" type="whole-page" text="Colour Matcher interactive"}

The above system used 3 bits to specify the amount of red (8 possible values), 3 bits to specify the amount of green (again 8 possible values), and 2 bits to specify the amount of blue (4 possible values). This gives a total of 8 bits (hence the name), which can be used to make 256 different bit patterns, and thus can represent 256 different colours.

You may be wondering why blue is represented with fewer bits than red and green. This is because the human eye is the least sensitive to blue, and therefore it is the least important colour in the representation. The representation uses 8 bits rather than 9 bits because it's easiest for computers to work with full bytes.

Using this scheme to represent all the pixels of an image takes one third of the number of bits required for 24-bit colour, but it is not as good at showing smooth changes of colours or subtle shades, because there are only 256 possible colors for each pixel. This is one of the big tradeoffs in data representation: do you allocate less space (fewer bits), or do you want higher quality?

{panel type="jargon-buster" summary="Colour depth"}
The number of bits used to represent the colours of pixels in a particular image is sometimes referred to as its "colour depth" or "bit depth". For example, an image or display with a colour depth of 8-bits has a choice of 256 colours for each pixel. There is [more information about this in Wikipedia](https://en.wikipedia.org/wiki/Color_depth). Drastically reducing the bit depth of an image can make it look very strange; sometimes this is used as a special effect called "posterisation" (ie. making it look like a poster that has been printed with just a few colours).
{panel end}

{panel type="curiosity" summary="Colour depth and compression"}
There's a subtle boundary between low quality data representations (such as 8-bit colour) and compression methods. In principle, reducing an image to 8-bit colour is a way to compress it, but it's a very poor approach, and a proper compression method like JPEG will do a much better job.
{panel end}

#### What impact does fewer bits have on the overall image?

The following interactive shows what happens to images when you use a smaller range of colours (including right down to zero bits!) You can choose an image using the menu or upload your own one. In which cases is the change in quality most noticeable? In which is it not? In which would you actually care about the colours in the image? In which situations is colour actually not necessary (i.e. when are we fine with two colours)?

{interactive name="image-bit-comparer" type="whole-page" text="Image Bit Comparer"}

{panel type="additional-information" summary="Software for exploring colour depth"}
Although we provide a simple interactive for reducing the number of bits in an image, you could also use software like Gimp or Photoshop to save files with different colour depths.
{panel end}

You probably noticed that 8-bit colour looks particularly bad for faces, where we are used to seeing subtle skin tones. Even the 16-bit colour is noticably worse for faces.

In other cases, the 16-bit images are almost as good as 24-bit images unless you look really carefully. They also use two-thirds (16/24) of the space that they would with 24-bit colour. For images that will need to be downloaded on 3G devices where internet is expensive, this is worth thinking about carefully.

Have an experiement with the following interactive, to see what impact different numbers of bits for each colour has. Do you think 8 bit colour was right in having 2 bits for blue, or should it have been green or red that got only 2 bits?

{interactive name="image-bit-comparer" type="whole-page" text="Image Bit Comparer - Change Bits mode" parameters="change-bits=true"}

{panel type="curiosity" summary="Do we ever need more than 24 bit colour?"}
One other interesting thing to think about is whether or not we’d want more than 24 bit colour. It turns out that the human eye can only differentiate around 10 million colours, so the ~ 16 million provided by 24 bit colour is already beyond what our eyes can distinguish. However, if the image were to be processed by some software that enhances the contrast, it may turn out that 24-bit colour isn't sufficient. Choosing the representation isn't simple!
{panel end}

#### How much space will low quality images save?

An image represented using 24 bit colour would have 24 bits per pixel. In 600 x 800 pixel image (which is a reasonable size for a photo), this would contain {math}600 \times 800 = 480,000 {math end} pixels, and thus would use {math}480,000 \times 24 bits = 11,520,000 {math end} bits. This works out to around 1.44 megabytes. If we use 8-bit colour instead, it will use a third of the memory, so it would save nearly a megabyte of storage. Or if the image is downloaded then a megabyte of bandwidth will be saved.

8 bit colour is not used much anymore, although it can still be helpful in situations such as accessing a computer desktop remotely on a slow internet connection, as the image of the desktop can instead be sent using 8 bit colour instead of 24 bit colour. Even though this may cause the desktop to appear a bit strange, it doesn’t stop you from getting whatever it was you needed to get done, done. Seeing your desktop in 24 bit colour would not be very helpful if you couldn't get your work done!

In some countries, mobile internet data is very expensive. Every megabyte that is saved will be a cost saving. There are also some situations where colour doesn’t matter at all, for example diagrams, and black and white printed images.

#### What about in practice?

If space really is an issue, then this crude method of reducing the range of colours isn't usually used; instead, compression methods such as JPEG, GIF and PNG are used.

These make much more clever compromises to reduce the space that an image takes, without making it look so bad, including choosing a better palette of colours to use rather than just using the simple representation discussed above.
However, compression methods require a lot more processing, and images need to be decoded to the representations discussed in this chapter before they can be displayed.

The ideas in this present chapter more commonly come up when designing systems (such as graphics interfaces) and working with high-quality images (such as RAW photographs), and typically the goal is to choose the best representation possible without wasting too much space.

Have a look at the Compression Chapter to find out more!

## Program Instructions

{panel type="caution" expanded="True"}
Before reading this section, you should have an understanding of low level languages (see the section on [Machine Code in the Programming Languages](chapters/programming-languages.html#machine-code-low-level-languages) chapter).
{panel end}

In a similar fashion to representing text or numbers using binary, we can represent an entire actual program using binary.
Since a program is just a sequence of instructions, we need to decide how many bits will be used to represent a single instruction and then how we are going to interpret those bits.
Machine code instructions typically have a combination of two pieces: operation and operand.

```
li $t0, 10 #Load the value 10 into register $t0
li $t1, 20 #Load the value 20 into register $t1
#Add the values in $t0 and $t1, put the result in register $a0
add $a0, $t0, $t1
```

In the above machine code program li and add are considered to be operations to "load an integer" and "add two integers" respectively.
$t0, $t1, and $a0 are register operands and represent a place to store values inside of the machine.
10 and 20 are literal operands and allow instructions to represent the exact integer values 10 and 20.
If we were using a 32-bit operating system we might encode the above instructions with each instruction broken into 4 8-bit pieces as follows:

| Operation |    Op1   |    Op2   |   Op3    |
|-----------|----------|----------|----------|
| 00001000  | 00000000 | 00000000 | 00001010 |
| 00001000  | 00000001 | 00000000 | 00010100 |
| 00001010  | 10000000 | 00000000 | 00000001 |

Our operation will always be determined by the bits in the first 8-bits of the 32-bit instruction.
In this example machine code, 00001000 means li and 00001010 means add.
For the li operation, the bits in Op1 are interpreted to be a storage place, allowing 00000000 to represent $t0.
Similarly the bits in Op1 for the add instruction represent $a0.
Can you figure out what the bits in Op3 for each instruction represent?

Using bits to represent both the program instructions and data forms such as text, numbers, and images allows entire computer programs to be represented in the same binary format.
This allows programs to be stored on disks, in memory, and transferred over the internet as easily as data.

## The whole story!

The kind of image representations covered here are the basic ones used in most digital systems, and the main point of this chapter is to understand how digital representations work, and the compromises needed between the number of bits, storage used, and quality.

The colour representation discussed is what is often referred to as "raw" or "bitmap" (bmp) representation.
For large images, real systems use compression methods such as JPEG, GIF or PNG to reduce the space needed to store an image, but at the point where an image is being captured or displayed it is inevitably represented using the raw bits as described in this chapter, and the basic choices for capturing and displaying images will affect the quality and cost of a device.
Compression is regarded as a form of encoding, and is covered in a later chapter.

The representation of numbers is a whole area of study in itself.
The choice of representation affects how quickly arithmetic can be done on the numbers, how accurate the results are, and how much memory or disk space is used up storing the data.
Even integers have issues like the order in which a large number is broken up across multiple bytes.
Floating point numbers generally follow common standards (the IEEE 754 standard is the most common one) to make it easy to design compatible hardware to process them.
Spreadsheets usually store numbers using a floating point format, which limits the precision of calculations (typically about 64 bits are used for each number).
There are many experiments that can be done (such as calculating 1/3, or adding a very large number to a very small one) that demonstrate the limitations of floating point representations.


## Further reading

This puzzle can be solved using the pattern in binary numbers: [http://www.cs4fn.org/binary/lock/](http://www.cs4fn.org/binary/lock/)

[This site](http://courses.cs.vt.edu/~csonline/NumberSystems/Lessons/index.html) has more complex activities with binary numbers, including fractions, multiplication and division.


### Useful Links

- [Basics of binary numbers](http://csunplugged.org/binary-numbers)
- [Representing bits using sound](http://csunplugged.org/modem)
- [Hex game](http://www.purposegames.com/game/049fc90a)
- [Thriving in our digital world](http://www.cs.utexas.edu/~engage/) has good illustrations of data representation
- [How a hard disk works](http://ed.ted.com/lessons/how-do-hard-drives-work-kanawat-senanan)
