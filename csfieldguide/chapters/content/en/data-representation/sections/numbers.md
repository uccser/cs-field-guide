# Numbers

{panel type="teacher-note"}

# CS Unplugged activity

If you are doing a warm up exercise with the class, the [CS Unplugged binary numbers lesson](https://csunplugged.org/en/topics/binary-numbers/unit-plan/how-binary-digits-work/) provides scaffolding and can be used to teach concepts around binary numbers using only counting or simple addition.
We also have an interactive which emulates the physical binary cards here:

{interactive slug="binary-cards" type="whole-page" text="Binary Cards"}

In the chapter we have decided to approach this section by starting with number systems.
While this may appear "scary" because of the math, most students should be quite familiar with it as it is first introduced very early in primary school in the form of recognising that numbers are made up of the "ones", "tens", "hundreds", etc, and is further built on until eventually in high school they learn about the exponent notation, i.e. \( 541 = 5 \times 10^2 + 4 \times 10^1 + 1 \times 10^0 \).
As explained in this section, binary numbers are a base 2 number system, rather than the base 10 number system we are all familiar with.
The idea of number systems provides a good stepping stone into binary numbers

We are assuming that students already know about base 10 number systems, including the exponent notation.
The initial information in this section on them is only intended to trigger recall, rather than actually teaching them the concept.

Less mathematically able students who are really struggling with number systems should be able to skip over it, and instead go directly to making binary numbers in the interactive.

{panel end}

In this section, we will look at how computers represent numbers.
To begin with, we'll revise how the {glossary-link term="decimal-number-system"}base-10 number system{glossary-link end} that we use every day works, and then look at {glossary-link term="binary-number-system"}binary{glossary-link end}, which is base-2.
After that, we'll look at some other charactertistics of numbers that computers must deal with, such as negative numbers and numbers with decimal points.

## Understanding the base 10 number system

The number system that humans normally use is in base 10 (also known as decimal).
It's worth revising quickly, because binary numbers use the same ideas as decimal numbers, just with fewer digits!

In decimal, the value of each digit in a number depends on its **place** in the number.
For example, in $123, the 3 represents $3, whereas the 1 represents $100.
Each place value in a number is worth 10 times more than the place value to its right, i.e. there are the "ones", the "tens", the "hundreds", the "thousands" the "ten thousands", the "hundred thousands", the "millions", and so on.
Also, there are 10 different **digits** (0,1,2,3,4,5,6,7,8,9) that can be at each of those place values.

If you were only able to use one digit to represent a number, then the largest number would be 9.
After that, you need a second digit, which goes to the left, giving you the next ten numbers (10, 11, 12... 19).
It's because we have 10 digits that each one is worth 10 times as much as the one to its right.

You may have encountered different ways of expressing numbers using "expanded form".
For example, if you want to write the number 90328 in expanded form you might have written it as:

\( 90328 = 90000 + 300 + 20 + 8 \)

A more sophisticated way of writing it is:

\( 90328 = (9 \times 10000) + (0 \times 1000) + (3 \times 100) + (2 \times 10) + (8 \times 1) \)

If you've learnt about exponents, you could write it as:

\( 90328 = (9 \times 10^4) + (0 \times 10^3) + (3 \times 10^2) + (2 \times 10^1) + (8 \times 10^0) \)

Remember that any number to the power of 0 is 1. i.e. the 8 x \( 10^0 \) is 8, because the \( 10^0 \) is 1.

The key ideas to notice from this are:

- Decimal has 10 **digits** &ndash; 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.
- A **place** is the place in the number that a digit is, i.e. ones, tens, hundreds, thousands, and so on.
  For example, in the number 90328, 3 is in the "hundreds" place, 2 is in the "tens" place, and 9 is in the "ten thousands" place.
- Numbers are made with a sequence of digits.
- The right-most digit is the one that's worth the least (in the "ones" place).
- The left-most digit is the one that's worth the most.
- Because we have 10 digits, the digit at each place is worth 10 times as much as the one immediately to the right of it.

All this probably sounds really obvious, but it is worth thinking about consciously, because binary numbers have the same properties.

## Representing whole numbers in binary

{panel type="teacher-note"}

# Teaching binary numbers

This subsection is a prerequisite for the colours section, as colour representations are built on simple binary numbers.

It's very common for computer science courses and books (like this one) to teach students how to convert between binary representation and decimal numbers.
In practice, computer scientists hardly ever do this, but the important thing is to understand the patterns and constraints around binary numbers.
A key pattern that students should pick up is that adding just one bit to a binary number *doubles* the range it can represent.
The patterns around binary numbers come up in many areas of computer science, so it is well worth getting familiar with them.

{panel end}

{panel type="teacher-note"}

# Binary windows

The "binary windows" are a simple binary conversion device that can be printed on paper, and enables students to experiment with these concepts physically.
It can be [downloaded on the CS Unplugged website](https://csunplugged.org/en/resources/binary-windows/).

{panel end}

As discussed earlier, computers can only store information using bits, which only have 2 possible states.
This means that they cannot represent base 10 numbers using digits 0 to 9, the way we write down numbers in decimal.
Instead, they must represent numbers using just 2 digits &ndash; 0 and 1.

Binary works in a very similar way to decimal, even though it might not initially seem that way.
Because there are only 2 digits, this means that each digit is **2** times the value of the one immediately to the right.

{panel type="curiosity"}

# The denary number system

The base 10 (decimal) system is sometimes called denary, which is more consistent with the name binary for the base 2 system.
The word "denary" also refers to the Roman denarius coin, which was worth ten asses (an "as" was a copper or bronze coin).
The term "denary" seems to be used mainly in the UK; in the US, Australia and New Zealand the term "decimal" is more common.

{panel end}

The interactive below illustrates how this binary number system represents numbers.
Have a play around with it to see what patterns you can see.

{interactive slug="base-calculator" type="whole-page" text="Binary Number Calculator"}

**To ensure you are understanding correctly how to use the interactive, verify that when you enter the binary number 101101 it shows that the decimal representation is 45, that when you enter 100000 it shows that the decimal representation is 32, and when you enter 001010 it shows the decimal representation is 10.**

{panel type="teacher-note"}

# Using the binary number interactive

With the interactive, students should discover that they can convert a number by working from left to right through the digits, setting the digit to 1, and resetting it to zero if the total is higher than the number being sought.
After converting a few numbers they will start to anticipate what to do.
This algorithm is fairly intuitive, and discoverable by quite young students.
Discovering it for themselves will give a lot of confidence in their ability to convert numbers.
If they need some help, get them to set the *left-most* bit to one, and ask if the total is too high.
If it is, set the bit back to zero, otherwise leave it as one.
Then repeat this for each bit from left to right.
For example, for the number 37, the first bit gives a total of 32, which isn't too high; setting the second bit brings the total to 48, which is too high, so it stays at zero; the third bit gives a total of 32+8 = 40, which is too high; the fourth bit gives 32+4 = 36, which is ok, so that bit is a 1.
The fifth bit would give 38 (too high), and the sixth bit gives the required 37, giving the binary number 100101.
This approach is explained for students later in the text, but it's better if they can discover it for themselves.

There are a lot of interactive games for exploring binary numbers.
The following one works in a web browser: [Cisco Binary game](http://forums.cisco.com/CertCom/game/binary_game_page.htm).
While there's a limit to the value of being able to make binary conversions, doing a number of them helps student to discover the kinds of patterns that occur in the binary number system.

There is another algorithm for conversion that is often found in textbooks, and it is easier to write a program for, but a little harder for learners.
It isn't necessary to explore the concepts of this chapter, but in case a student wants to implement it, the algorithm is to work from right to left; set the right-most bit to one if the decimal number is odd, otherwise set it to zero, then divide the decimal number by 2 (rounding down), and repeat the procedure for the next digit to the left (set it to one if the number is odd, otherwise zero, then divide by 2).
This is repeated until the decimal number has been reduced to zero.

{panel end}

Find the representations of 4, 7, 12, and 57 using the interactive.

What is the largest number you can make with the interactive?
What is the smallest?
Is there any integer value in between the biggest and the smallest that you can’t make?
Are there any numbers with more than one representation? Why/ why not?

{panel type="spoiler"}

# Largest and smallest numbers

- 000000 in binary, 0 in decimal is the smallest number.
- 111111 in binary, 63 in decimal is the largest number.
- All the integer values (0, 1, 2... 63) in the range can be represented (and there is a unique representation for each one).
  This is exactly the same as decimal!

{panel end}

{panel type="teacher-note"}

# Understanding unique representations

The question of uniqueness will be challenging for some students.
It addresses the idea that every number has a unique binary representation; students who struggle with the reasoning may be prepared to just accept that this is the case.
However, the following reasoning introduces the idea: have a student work out a 5-bit binary representation for, say, 12 (which is 01100).
The left-most 0 represents the 16; ask if it would be possible to represent 12 if that bit is a 1 (it's not possible because you'd already have 16, which is more than 12).
Now consider the next bit (the 1 represents 8).
Is it possible to represent 12 without the 8? (No, because the remaining bits only add up to 7).
Following on with this reasoning, the student will establish that 12 *has to* be represented as 01100.

Another way of showing the uniqueness is to work out how many bit combinations there are.
For 5 bits, there are two choices for each bit, so 2x2x2x2x2 (i.e. 32) distinct 5-bit binary numbers.
Since the 5-bit binary numbers cover the range from 0 to 31, there are 32 numbers, so there's a one-to-one relationship between all possible bit patterns and all numbers they can represent i.e. each number has a unique representation.

{panel end}

You have probably noticed from the interactive that when set to 1, the leftmost bit (the "most significant bit") adds 32 to the total, the next adds 16, and then the rest add 8, 4, 2, and 1 respectively.
When set to 0, a bit does not add anything to the total.
So the idea is to make numbers by adding some or all of 32, 16, 8, 4, 2, and 1 together, and each of those numbers can only be included once.

{image file-path="img/chapters/xkcd-1-to-10.png" alt="If you get an 11/100 on a CS test, but you claim it should be counted as a &#39;C&#39;, they&#39;ll probably decide you deserve the upgrade." source="https://xkcd.com/953/"}

Choose a number less than 61 (perhaps your house number, your age, a friend's age, or the day of the month you were born on), set all the binary digits to zero, and then start with the *left-most* digit (32), trying out if it should be zero or one.
See if you can find a method for converting the number without too much trial and error.
Try different numbers until you find a quick way of doing this.

Figure out the binary representation for 23 **without** using the interactive?
What about 4, 0, and 32? Check all your answers using the interactive to verify they are correct.

{panel type="challenge"}

# Counting in binary

Can you figure out a systematic approach to counting in binary? i.e. start with the number 0, then increment it to 1, then 2, then 3, and so on, all the way up to the highest number that can be made with the 7 bits.
Try counting from 0 to 16, and see if you can detect a pattern.
Hint: Think about how you add 1 to a number in base 10. e.g. how do you work out 7 + 1, 38 + 1, 19 + 1, 99 + 1, 230899999 + 1, etc?
Can you apply that same idea to binary?

Using your new knowledge of the binary number system, can you figure out a way to count to higher than 10 using your 10 fingers?
What is the highest number you can represent using your 10 fingers?
What if you included your 10 toes as well (so you have 20 fingers and toes to count with).

{panel end}

{panel type="spoiler"}

# Counting in binary

A binary number can be incremented by starting at the right and flipping all consecutive bits until a 1 comes up (which will be on the very first bit half of the time).

Counting on fingers in binary means that you can count to 31 on 5 fingers, and 1023 on 10 fingers.
There are a number of videos on YouTube of people counting in binary on their fingers.
One twist is to wear white gloves with the numbers 16, 8, 4, 2, 1 on the 5 fingers respectively, which makes it easy to work out the value of having certain fingers raised.

{panel end}

The interactive used exactly 6 bits.
In practice, we can use as many or as few bits as we need, just like we do with decimal.
For example, with 5 bits, the place values would be 16, 8, 4, 2 and 1, so the largest value is 11111 in binary, or 31 in decimal.
Representing 14 with 5 bits would give 01110.

{panel type="challenge"}

# Representing numbers with bits

Write representations for the following.
If it is not possible to do the representation, put "Impossible".

- Represent **101** with **7 bits**
- Represent **28** with **10 bits**
- Represent **7** with **3 bits**
- Represent **18** with **4 bits**
- Represent **28232** with **16 bits**

{panel end}

{panel type="spoiler"}

# Answers for above challenge

The answers are (spaces are added to make the answers easier to read, but are not required).

- 101 with 7 bits is: **110 0101**
- 28 with 10 bits is: **00 0001 1100**
- 7 with 3 bits is: **111**
- 18 with 4 bits is: **Impossible** (not enough bits to represent value)
- 28232 with 16 bits is: 0110 1110 0100 1000

{panel end}

An important concept with binary numbers is the range of values that can be represented using a given number of bits.
When we have 8 bits the binary numbers start to get useful — they can represent values from 0 to 255, so it is enough to store someone's age, the day of the month, and so on.

{panel type="jargon-buster"}

# What is a byte?

Groups of 8 bits are so useful that they have their own name: a *{glossary-link term="byte"}byte{glossary-link end}*.
Computer memory and disk space are usually divided up into bytes, and bigger values are stored using more than one byte.
For example, two bytes (16 bits) are enough to store numbers from 0 to 65,535.
Four bytes (32 bits) can store numbers up to 4,294,967,295.
You can check these numbers by working out the place values of the bits.
Every bit that's added will double the range of the number.

{panel end}

In practice, computers store numbers with either 16, 32, or 64 bits.
This is because these are full numbers of bytes (a byte is 8 bits), and makes it easier for computers to know where each number starts and stops.

{panel type="curiosity"}

# Binary cakes &ndash; preventing fires

Candles on birthday cakes use the base 1 numbering system, where each place is worth 1 more than the one to its right.
For example, the number 3 is 111, and 10 is 1111111111.
This can cause problems as you get older — if you've ever seen a cake with 100 candles on it, you'll be aware that it's a serious fire hazard.

{image file-path="img/chapters/binary-cakes.png" alt="The image shows two people with birthday cakes, however a cake with 100 candles on it turns into a big fireball!"}

Luckily it's possible to use binary notation for birthday candles — each candle is either lit or not lit.
For example, if you are 18, the binary notation is 10010, and you need 5 candles (with only two of them lit).

There's a [video on using binary notation for counting up to 1023 on your hands, as well as using it for birthday cakes](https://www.youtube.com/watch?v=GUqle9RE3Y8).

{image file-path="img/chapters/binary-cake.png" alt="It's a lot smarter to use binary notation on candles for birthdays as you get older, as you don't need as many candles." caption="true"}

It's a lot smarter to use binary notation on candles for birthdays as you get older, as you don't need as many candles.

{image end}

{panel end}

## Shorthand for binary numbers - Hexadecimal

Most of the time binary numbers are stored electronically, and we don't need to worry about making sense of them.
But sometimes it's useful to be able to write down and share numbers, such as the unique identifier assigned to each digital device (MAC address), or the colours specified in an HTML page.

Writing out long binary numbers is tedious — for example, suppose you need to copy down the 16-bit number 0101001110010001.
A widely used shortcut is to break the number up into 4-bit groups (in this case, 0101 0011 1001 0001), and then write down the digit that each group represents (giving 5391).
There's just one small problem: each group of 4 bits can go up to 1111, which is 15, and the digits only go up to 9.

The solution is simple: we introduce symbols for the digits from 1010 (10) to 1111 (15), which are just the letters A to F.
So, for example, the 16-bit binary number 1011 1000 1110 0001 can be written more concisely as B8E1.
The "B" represents the binary 1011, which is the decimal number 11, and the E represents binary 1110, which is decimal 14.

Because we now have 16 digits, this representation is base 16, and known as hexadecimal (or hex for short).
Converting between binary and hexadecimal is very simple, and that's why hexadecimal is a very common way of writing down large binary numbers.

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

For example, the largest 8-bit binary number is 11111111.
This can be written as FF in hexadecimal.
Both of those representations mean 255 in our conventional decimal system (you can check that by converting the binary number to decimal).

Which notation you use will depend on the situation; binary numbers represent what is actually stored, but can be confusing to read and write; hexadecimal numbers are a good shorthand of the binary; and decimal numbers are used if you're trying to understand the meaning of the number or doing normal math.
All three are widely used in computer science.

It is important to remember though, that computers **only** represent numbers using binary.
They **cannot** represent numbers directly in decimal or hexadecimal.

## Computers representing numbers in practice

A common place that numbers are stored on computers is in spreadsheets or databases.
These can be entered either through a spreadsheet program or database program, through a program you or somebody else wrote, or through additional hardware such as sensors, collecting data such as temperatures, air pressure, or ground shaking.

Some of the things that we might think of as numbers, such as the telephone number (03) 555-1234, aren't actually stored as numbers, as they contain important characters (like dashes and spaces) as well as the leading 0 which would be lost if it was stored as a number (the above number would come out as 35551234, which isn't quite right).
These are stored as **text**, which is discussed in the next section.

On the other hand, things that don't look like a number (such as "30 January 2014") are often stored using a value that is converted to a format that is meaningful to the reader (try typing two dates into Excel, and then subtract one from the other — the result is a useful number).
In the underlying representation, a number is used.
Program code is used to translate the underlying representation into a meaningful date on the user interface.

{panel type="curiosity"}

# More on date representation

The difference between two dates in Excel is the number of days between them; the date itself (as in many systems) is stored as the amount of time elapsed since a fixed date (such as 1 January 1900).
You can test this by typing a date like "1 January 1850" — chances are that it won't be formatted as a normal date.
Likewise, a date sufficiently in the future may behave strangely due to the limited number of bits available to store the date.

{panel end}

Numbers are used to store things as diverse as dates, student marks, prices, statistics, scientific readings, sizes and dimensions of graphics.

The following issues need to be considered when storing numbers on a computer:

- What range of numbers should be able to be represented?
- How do we handle negative numbers?
- How do we handle decimal points or fractions?

## How many bits are used in practice?

In practice, we need to allocate a fixed number of bits to a number, before we know how big the number is.
This is often 32 bits or 64 bits, although can be set to 16 bits, or even 128 bits, if needed.
This is because a computer has no way of knowing where a number starts and ends, otherwise.

Any system that stores numbers needs to make a compromise between the number of bits allocated to store the number, and the range of values that can be stored.

In some systems (like the Java and C {glossary-link term="programming-language"}programming languages{glossary-link end} and databases) it's possible to specify how accurately numbers should be stored; in others it is fixed in advance (such as in spreadsheets).

Some are able to work with arbitrarily large numbers by increasing the space used to store them as necessary (e.g. integers in the Python programming language).
However, it is likely that these are still working with a multiple of 32 bits (e.g. 64 bits, 96 bits, 128 bits, 160 bits, etc).
Once the number is too big to fit in 32 bits, the computer would reallocate it to have up to 64 bits.

In some programming languages there isn't a check for when a number gets too big (overflows).
For example, if you have an 8-bit number using two's complement, then 01111111 is the largest number (127), and if you add one without checking, it will change to 10000000, which happens to be the number -128.
(Don't worry about two's complement too much, it's covered later in this section.)
This can cause serious problems if not checked for, and is behind a variant of the Y2K problem, called the [Year 2038 problem](https://en.wikipedia.org/wiki/Year_2038_problem), involving a 32-bit number overflowing for dates on Tuesday, 19 January 2038.

{image file-path="img/chapters/xkcd-cant-sleep-comic.png" alt="A xkcd comic on number overflow" source="https://xkcd.com/571/"}

On tiny computers, such as those embedded inside your car, washing machine, or a tiny sensor that is barely larger than a grain of sand, we might need to specify more precisely how big a number needs to be.
While computers prefer to work with chunks of 32 bits, we could write a program (as an example for an earthquake sensor) that knows the first 7 bits are the lattitude, the next 7 bits are the longitude, the next 10 bits are the depth, and the last 8 bits are the amount of force.

Even on standard computers, it is important to think carefully about the number of bits you will need.
For example, if you have a field in your database that could be either "0", "1", "2", or "3" (perhaps representing the four bases that can occur in a DNA sequence), and you used a 64 bit number for every one, that will add up as your database grows.
If you have 10,000,000 items in your database, you will have wasted 62 bits for each one (only 2 bits is needed to represent the 4 numbers in the example), a total of 620,000,000 bits, which is around 74 MB.
If you are doing this a lot in your database, that will really add up &ndash; human DNA has about 3 billion base pairs in it, so it's incredibly wasteful to use more than 2 bits for each one.

And for applications such as Google Maps, which are storing an astronomical amount of data, wasting space is not an option at all!

{panel type="challenge"}

# How many bits will you need?

It is really useful to know roughly how many bits you will need to represent a certain value.
Have a think about the following scenarios, and choose the best number of bits out of the options given.
You want to ensure that the largest possible number will fit within the number of bits, but you also want to ensure that you are not wasting space.

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

{panel type="spoiler"}

# Answers for above challenge

1. `b` (actually, 3 bits is enough as it gives 8 values, but amounts that fit evenly into 8-bit bytes are easier to work with)
2. `c` (32 bits is slightly too small, so you will need 64 bits)
3. `b` (This is a challenging question, but one a database designer would have to think about. There's about 94,000 km of roads in New Zealand, so if the average length of a road was 1km, there would be too many roads for 16 bits. Either way, 32 bits would be a safe bet.)
4. `d` (Even 64 bits is not enough, but 128 bits is plenty! Remember that 128 bits isn't twice the range of 64 bits.)

{panel end}

## Representing negative numbers in practice

The binary number representation we have looked at so far allows us to represent positive numbers only.
In practice, we will want to be able to represent negative numbers as well, such as when the balance of an account goes to a negative amount, or the temperature falls below zero.
In our normal representation of base 10 numbers, we represent negative numbers by putting a minus sign in front of the number.
But in binary, is it this simple?

We will look at two possible approaches: Adding a simple sign bit, much like we do for decimal, and then a more useful system called two's complement.

### Using a simple sign bit

On a computer we don’t have minus signs for numbers (it doesn't work very well to use the text based one when representing a number because you can't do arithmetic on characters), but we can do it by allocating one extra bit, called a *sign* bit, to represent the minus sign.
Just like with decimal numbers, we put the negative indicator on the left of the number — when the sign bit is set to "0", that means the number is positive and when the sign bit is set to "1", the number is negative (just as if there were a minus sign in front of it).

For example, if we wanted to represent the number **41** using 7 bits along with an additional bit that is the sign bit (to give a total of 8 bits), we would represent it by **00101001**.
The first bit is a 0, meaning the number is positive, then the remaining 7 bits give **41**, meaning the number is **+41**.
If we wanted to make **-59**, this would be **10111011**.
The first bit is a 1, meaning the number is negative, and then the remaining 7 bits represent **59**, meaning the number is **-59**.

{panel type="challenge"}

# Representing negative numbers with sign bit

Using 8 bits as described above (one for the sign, and 7 for the actual number), what would be the binary representations for 1, -1, -8, 34, -37, -88, and 102?

{panel end}

{panel type="spoiler"}

# Representing negative numbers with sign bit

The spaces are not necessary, but are added to make reading the binary numbers easier

-  1 is 0000 0001
-  -1 is 1000 0001
-  -8 is 1000 1000
-  34 is 0010 0010
-  -37 is 1010 0101
-  -88 is 1101 1000
-  102 is 0110 0110

{panel end}

Going the other way is just as easy.
If we have the binary number **10010111**, we know it is negative because the first digit is a 1.
The number part is the next 7 bits **0010111**, which is **23**.
This means the number is **-23**.

{panel type="challenge"}

# Converting binary with sign bit to decimal

What would the decimal values be for the following, assuming that the first bit is a sign bit?

- 00010011
- 10000110
- 10100011
- 01111111
- 11111111

{panel end}

{panel type="spoiler"}

# Converting binary with sign bit to decimal

- 00010011 is 19
- 10000110 is -6
- 10100011 is -35
- 01111111 is 127
- 11111111 is -127

{panel end}

But what about **10000000?** That converts to **-0**.
And **00000000** is **+0**.
Since -0 and +0 are both just 0, it is very strange to have two different representations for the same number.

This is one of the reasons that we don't use a simple sign bit in practice.
Instead, computers usually use a more sophisticated representation for negative binary numbers called *Two's Complement*.

### Two's Complement

There's an alternative representation called *Two's Complement*, which avoids having two representations for 0, and more importantly, makes it easier to do arithmetic with negative numbers.

***Representing positive numbers with two's complement***

Representing positive numbers is the same as the method you have already learnt.
Using **8 bits**,the leftmost bit is a zero and the other 7 bits are the usual binary representation of the number; for example, **1** would be **00000001**, and **50** would be **00110010**.

***Representing negative numbers with two's complement***

This is where things get more interesting.
In order to convert a negative number to its two's complement representation, use the following process.
1. Convert the number to binary (don't use a sign bit, and pretend it is a positive number).
2. Invert all the digits (i.e. change 0's to 1's and 1's to 0's).
3. Add 1 to the result (Adding 1 is easy in binary; you could do it by converting to decimal first, but think carefully about what happens when a binary number is incremented by 1 by trying a few; there are more hints in the panel below).

For example, assume we want to convert **-118** to its two's complement representation.
We would use the process as follows.
1. The binary number for **118** is **01110110**.
2. **01110110** with the digits inverted is **10001001**.
3. **10001001 + 1** is **10001010**.

Therefore, the two's complement representation for **-118** is **10001010**.

{panel type="challenge"}

# Adding one to a binary number

The rule for adding one to a binary number is pretty simple, so we'll let you figure it out for yourself.
First, if a binary number ends with a 0 (e.g. 1101010), how would the number change if you replace the last 0 with a 1?
Now, if it ends with 01, how much would it increase if you change the 01 to 10?
What about ending with 011? 011111?

The method for adding is so simple that it's easy to build computer hardware to do it very quickly.

{panel end}

{panel type="teacher-note"}

# Method for adding one to a binary number

Students should be able to work out the rule for adding 1 to a binary number by trying it out with a few numbers.

There are different ways to express the process.
In the "Unplugged" exercise at the start of this chapter one of the challenges was to count up through the numbers, which is adding one repeatedly, and it's not unusual for students to see the pattern when they do that.
In that situation the rule could be expressed as "start at the right hand end, and flip bits from right to left until you change a 0 to a 1"
(If the number ends in zero then that would be immediately.)

Another way to express the rule is to find the right most zero in the number, change it to a 1, and change all 1's to its right to zero.
For example, consider adding 1 to 1001**0**111.
The right-most 0 is shown in bold; it changes to 1, and the three 1's to its right change to 0, giving 10011000.

If you get a number with no zeroes in it (e.g. 1111111), you can put one on the left (01111111), then apply the rule, which in this case gives 10000000.

It may help some students to consider what the equivalent rule is in decimal for adding 1 &ndash; how do you add one to 284394? To 38999? 9999799?

{panel end}

{panel type="challenge"}

# Determining the Two's Complement

What would be the two's complement representation for the following numbers, **using 8 bits**?
Follow the process given in this section, and remember that you do not need to do anything special for positive numbers.

1. 19
2. -19
3. 107
4. -107
5. -92

{panel end}

{panel type="spoiler"}

# Determining the Two's Complement

1. 19 in binary is **0001 0011**, which is the two's complement for a positive number.
2. For -19, we take the binary of the positive, which is 0001 0011 (above), invert it to 1110 1100, and add 1, giving a representation of **1110 1101**.
3. 107 in binary is **0110 1011**, which is the two's complement for a positive number.
4. For -107, we take the binary of the positive, which is 0110 1011 (above), invert it to 1001 0100, and add 1, giving a representation of **1001 0101**.
5. For -92, we take the binary of the positive, which is 0101 1100, invert it to 1010 0011, and add 1, giving a representation of **1010 0100**. (If you have this incorrect, double check that you incremented by 1 correctly).

{panel end}

***Converting a two's complement number back to decimal***

In order to reverse the process, we need to know whether the number we are looking at is positive or negative.
For positive numbers, we can simply convert the binary number back to decimal.
But for negative numbers, we first need to convert it back to a normal binary number.

So how do we know if the number is positive or negative?
It turns out (for reasons you will understand later in this section) that two's complement numbers that are negative always start in a 1, and positive numbers always start in a 0.
Have a look back at the previous examples to double check this.

So, if the number starts with a 1, use the following process to convert the number back to a negative decimal number.

1. Subtract 1 from the number.
2. Invert all the digits.
3. Convert the resulting binary number to decimal.
4. Add a minus sign in front of it.

So if we needed to convert 11100010 back to decimal, we would do the following.

1. Subtract **1** from **11100010**, giving **11100001**.
2. Invert all the digits, giving **00011110**.
3. Convert **00011110** to a binary number, giving **30**.
4. Add a negative sign, giving **-30**.

{panel type="challenge"}

# Reversing Two's Complement

Convert the following two's complement numbers to decimal.

1. 00001100
2. 10001100
3. 10111111

{panel end}

{panel type="spoiler"}

# Reversing Two's Complement

1. **12**
2. 10001100 -> (-1) 10001011 -> (inverted) 01110100 -> (to decimal) 116 -> (negative sign added) **-116**
3. 10111111 -> (-1) 10111110 -> (inverted) 01000001 -> (to decimal) 65 -> (negative sign added) **-65**

{panel end}

***How many numbers can be represented using two's complement?***

While it might initially seem that there is no bit allocated as the sign bit, the left-most bit behaves like one.
With 8 bits, you can still only make 256 possible patterns of 0's and 1's.
If you attempted to use 8 bits to represent positive numbers up to 255, and negative numbers down to -255, you would quickly realise that some numbers were mapped onto the same pattern of bits.
Obviously, this will make it impossible to know what number is actually being represented!

In practice, numbers within the following ranges can be represented.
**Unsigned Range** is how many numbers you can represent if you only allow positive numbers (no sign is needed), and **two's complement Range** is how many numbers you can represent if you require both positive and negative numbers.
You can work these out because the range of 8-bit values if they are stored using unsigned numbers will be from 00000000 to 11111111 (i.e. 0 to 255 in decimal), while the signed two's complement range is from 10000000 (the lowest number, -128 in decimal) to 01111111 (the highest number, 127 in decimal).
This might seem a bit weird, but it works out really well because normal binary addition can be used if you use this representation even if you're adding a negative number.

| **Number** | **Unsigned Range** | **Two's Complement Range** |
|--------|----------------|------------------------|
| 8 bit | 0 to 255 | -128 to 127 |
| 16 bit | 0 to 65,535 | -32,768 to 32,767 |
| 32 bit | 0 to 4,294,967,295 | −2,147,483,648 to 2,147,483,647 |
| 64 bit &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | 0 to 18,446,744,073,709,551,615 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | −9,223,372,036,854,775,808 to 9,223,372,036,854,775,807  |

### Adding negative binary numbers

Before adding negative binary numbers, we'll look at adding positive numbers.
It's basically the same as the addition methods used on decimal numbers, except the rules are way simpler because there are only two different digits that you might add!

You've probably learnt about column addition.
For example, the following column addition would be used to do **128 + 255**.

```text
  1   (carries)
 128
+255
----
 383
```

When you go to add 5 + 8, the result is higher than 9, so you put the 3 in the one's column, and carry the 1 to the 10's column.
Binary addition works in exactly the same way.

***Adding positive binary numbers***

If you wanted to add two positive binary numbers, such as **00001111** and **11001110**, you would follow a similar process to the column addition.
You only need to know 0+0, 0+1, 1+0, and 1+1, and 1+1+1.
The first three are just what you might expect.
Adding 1+1  causes a carry digit, since in binary 1+1 = 10, which translates to "0, carry 1" when doing column addition.
The last one, 1+1+1 adds up to 11 in binary, which we can express as "1, carry 1".
For our two example numbers, the addition works like this:

```text
    111   (carries)
 11001110
+00001111
---------
 11011101
```

Remember that the digits can be only 1 or 0.
So you will need to carry a 1 to the next column if the total you get for a column is (decimal) 2 or 3.

***Adding negative numbers with a simple sign bit***

With negative numbers using sign bits like we did before, this does not work.
If you wanted to add **+11 (01011)** and **-7 (10111)**, you would expect to get an answer of **+4 (00100)**.

```text
11111 (carries)
 01011
+10111
100010
```

Which is **-2**.

One way we could solve the problem is to use column subtraction instead.
But this would require giving the computer a hardware circuit which could do this.
Luckily this is unnecessary, because addition with negative numbers works automatically using two's complement!

***Adding negative numbers with two's complement***

For the above addition (+11 + -7), we can start by converting the numbers to their 5-bit two's complement form.
Because **01011 (+11)** is a positive number, it does not need to be changed.
But for the negative number, **00111 (-7)** (sign bit from before removed as we don't use it for two's complement), we need to invert the digits and then add 1, giving **11001**.

Adding these two numbers works like this:

```text
 01011
 11001
100100
```

Any extra bits to the left (beyond what we are using, in this case 5 bits) have been truncated.
This leaves **00100**, which is **4**, like we were expecting.

We can also use this for subtraction.
If we are subtracting a positive number from a positive number, we would need to convert the number we are subtracting to a negative number.
Then we should add the two numbers.
This is the same as for decimal numbers, for example 5 - 2 = 3 is the same as 5 + (-2) = 3.

This property of two's complement is very useful.
It means that positive numbers and negative numbers can be handled by the same computer circuit, and addition and subtraction can be treated as the same operation.

{panel type="curiosity"}

# What's going on with Two's complement?

The idea of using a "complementary" number to change subtraction to addition can be seen by doing the same in decimal.
The complement of a decimal digit is the digit that adds up to 10; for example, the complement of 4 is 6, and the complement of 8 is 2.
(The word "complement" comes from the root "complete" - it completes it to a nice round number.)

Subtracting 2 from 6 is the same as adding the complement, and ignoring the extra 1 digit on the left.
The complement of 2 is 8, so we add 8 to 6, giving (1)4.

For larger numbers (such as subtracting the two 3-digit numbers 255 - 128), the complement is the number that adds up to the next power of 10 i.e. 1000-128 = 872.
Check that adding 872 to 255 produces (almost) the same result as subtracting 128.

Working out complements in binary is way easier because there are only two digits to work with, but working them out in decimal may help you to understand what is going on.

{panel end}

### Using sign bits vs using Two's Complement

We have now looked at two different ways of representing negative numbers on a computer.
In practice, a simple sign bit is rarely used, because of having two different representations of zero, and requiring a different computer circuit to handle negative and positive numbers, and to do addition and subtraction.

Two's complement is widely used, because it only has one representation for zero, and it allows positive numbers and negative numbers to be treated in the same way, and addition and subtraction to be treated as one operation.

There are other systems such as "One's Complement" and "Excess-k", but two's complement is by far the most widely used in practice.
