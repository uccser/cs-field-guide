# Data Representation

{panel type="warning" summary="Interactives in Data Representation"}

Most interactives on this page have not been updated to the new system. Please [view the interactives on the Data Representation page](http://www.csfieldguide.org.nz/releases/1.9.9/DataRepresentation.html) on the older version of the CSFG. We are currently in the process of updating these interactives for the version 2.0 release.

{panel end}

{panel type="teacher-note" summary="Math in Data Representation"}

A lot of the exercises in this chapter involve simple arithmetic. If students struggle to do this by hand, a lot can be done using spreadsheets.

{panel end}

## What's the big picture?

Computers are machines that do stuff with information. They let you view, listen, create, and edit information in documents, images, videos, sound, spreadsheets and databases. They let you play games in simulated worlds that don’t really exist except as information inside the computer’s memory and displayed on the screen. They let you compute and calculate with numerical information; they let you send and receive information over networks.   Fundamental to all of this is that the computer has to represent that information in some way inside the computer’s memory, as well as storing it on disk or sending it over a network.  

To make computers easier to build and keep them reliable, everything is represented using just two values. You may have seen these two values represented as 0 and 1, but on a computer they are represented by anything that can be in two states. For example, in memory a high or low voltage is used to store each 0 or 1. On a magnetic disk it's stored with, surprisingly, magnetism (whether a tiny spot on the disk is magnetised north or south).

When we write what is stored in a computer on paper, we normally use “0” for one of the states, and “1” for the other state. If a piece of computer memory had the following voltages: “low”, “low”, “high”, “low”, “high”, “high”, “high”, “high”, “low”, “high”, “low”, “low”, we could allocate “0” to “low”, and “1” to high” and write this sequence down as 001011110100. While this notation is used extensively, and you may often hear the data being referred to as being “0’s and 1’s”, it is important to remember that a computer does *not* store 0’s and 1’s; it has no way of doing this. They are just using physical mechanisms such as high and low voltage, north or south polarity, and light or dark materials.

{panel type="teacher-note" summary="A warmup for binary representation"}

The CS Unplugged binary activity [on binary representation](http://csunplugged.org/binary-numbers) uses just 5 cards to scaffold an activity that shows students how the abstract concept of two values (black/white, zero/one, on/off or even quack/moo) can be used to represent numbers and letters.
The exercise is engaging and kinesthetic, and is useful for getting students in the right frame of mind about this topic.
{panel end}

{panel type="jargon-buster" summary="Bits"}

The use of the two digits 0 and 1 is so common that some of the best known computer jargon is used for them. Since there are only two digits, the system is called binary. The short word for a "binary digit" is made by taking the first two letters and the last letter --- a *bit* is just a digit that can have two values.

{panel end}

Every file you save, every picture you make, every download, is just a whole lot of bits.
Computer scientists don't spend a lot of time reading bits themselves, but knowing how they are stored is really important because it affects the amount of space that data will use, the amount of time it takes to send the data to a friend (as data that takes more space takes longer to send!) and the quality of what is being stored.
You may have come across things like "24-bit colour", "128-bit encryption", "32-bit IPv4 addresses" or "8-bit ASCII".
Understanding what the bits are doing enables you to work out how much space will be required to get high-quality colour, hard-to-crack secret codes, a unique ID for every device in the world, or text that uses more characters than the usual English alphabet.

This chapter is about some of the different methods that computers use to code different kinds of information in patterns of these bits, and how this affects the cost and quality of what we do on the computer, or even if something is feasible at all.

## Getting Started - Representing text with Braille

{panel type="additional-information" summary="Representing Braille without making holes in paper"}
When working through the material in this section, a good way to draw braille on paper without having to actually make raised dots is to draw a rectangle with 6 small circles in it, and to colour in the circles that are raised, and not colour in the ones that aren’t raised.
{panel end}

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

{panel type="curiosity" summary="Why does adding one more dot double the number of possible patterns?"}
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
As it happens, people have tried to build decimal-based computers, but it's just too hard.
Recording a digit between 0 and 9 involves having accurate equipment for reading voltage levels, magnetisation or reflections, and it's a lot easier just to check if it's mainly one way or the other.
{panel end}

## Representing text with bits

We saw above that 64 unique patterns can be made using 6 dots in Braille.
Count how many different upper-case letters, lower-case letters, numbers, and symbols that you could insert into a text editor using your keyboard. (Don’t forget to count both of the symbols that share the number keys, and the symbols to the side that are for punctuation!)
The collective name for these is *characters* e.g. a, D, 1, h, 6, \*, ], and ~ are all characters.

Would 6 dots (which can represent 64 patterns) be enough to represent all these characters? If you counted correctly, you should find that there were more than 64 characters! How many bits would you need to be able to represent all the characters you counted on your keyboard?

It turns out that 7 dots is enough as this gives 128 possible patterns, and this is exactly what the ASCII code for text does. ASCII is one of the main systems that computers use to represent English text.
It was first used commercially in 1963, and despite the big changes in computers since then, it is still the basis of how English text is stored on computers.

ASCII assigned a different pattern of bits to each of the characters, along with a few other “control” characters that you don’t need to worry about yet. For reasons that we will get to later, each pattern in ASCII is usually stored in 8 bits, with one wasted bit, rather than 7 bits. However, the first bit in each 8-bit pattern is a 0, meaning there are still only 128 possible patterns.

Below is a table that shows the patterns of bits that ASCII uses for each of the characters.

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

Computers can represent pieces of text with sequences of these patterns, much like Braille does. For example, the word “computers” (all lower-case) would be 01100011 01101111 01101101 01110000 01110101 01110100 01100101 01110010 01110011.

How would you represent the word “science” in ASCII? What about “Wellington” (note that it starts with an upper-case “W”)? How would you represent “358” in ASCII (it is three characters, even though it looks like a number)? What about the sentence “Hello, how are you?” (look for the comma, question mark, and space characters in the ASCII table).

{panel type="teacher-note" summary="Answers to questions above"}

"science" = 01110011 01100011 01101001 01100101 01101110 01100011 01100101

"Wellington" = 01010111 01100101 01101100 01101100 01101001 01101110 01100111 01110100 01101111 01101110

"358" = 00110011 00110101 00111000

Note that the text "358" is treated as 3 characters in ASCII, which may be confusing, as the text "358" is different to the number 358! Students may have encountered this distinction in a spreadsheet e.g. if a cell starts with an inverted comma in Excel, it is treated as text rather than a number. One place this comes up is with phone numbers; if you type 027555555 into a spreadsheet as a number, it will come up as 27555555, but as text the 0 can be displayed.

{panel end}

{comment}

.. xHTML we could make an interactive which challenges them to put in the above words. It's a nice sequence, and "358" should be particularly interesting!

.. curiosity-music:

{comment end}

{panel type="curiosity" summary="Representing the alphabet"}

If you *only* wanted to represent the 26 letters of the alphabet, and weren’t worried about upper-case or lower-case, you could get away with using just 5 bits, which allows for up to 32 different patterns. Have a look at the last 5 bits of each of the 26 lower-case letters in ASCII. Do any of the 26 lower-case letters have the same last 5 bits? Have a look at the 26 upper-case letters. Do any of the upper-case letters have the same last 5 bits?

You may have noticed that none of the lower-case letters have the same last 5 bits, but they do have the same last 5 bits as their corresponding upper-case letter!

For example, a = 1100001 and A = 1000001, they both have 00001 as their last 5 bits. As another example, s = 1110011 and S = 1010011, they both have 10011 as their last 5 bits.

An easy way to allocate patterns in this 5 bit system would be to just use the last 5 bits for each character in the ASCII table. Therefore A would be 00001, b would be 00010, c would be 00011, etc.

The word “water” would be
10111
00001
10111
10100
10010

There's an activity that uses [five-bit text codes hidden in music here](http://csunplugged.org/modem).

{panel end}

{panel type="teacher-note" summary="Extra information for curiosity above"}

The five-bit code activity mentioned in the above curiosity includes some songs and a video that contain many hidden messages using this code. Some students will enjoy the challenge of trying to decode the hidden messages.

{panel end}

English text can easily be represented using ASCII, but what about languages such as Chinese where there are thousands of different characters? The 128 patterns aren’t nearly enough to represent such languages! That's where codes that use more than 7 bits become important, and in a later section we'll look at these, but first we need to explore binary number representation and develop some efficient ways to talk about longer binary numbers.

{panel type="curiosity" summary="ASCII"}

The name "ASCII" stands for "American Standard Code for Information Interchange", which was a particular way of assigning bit patterns to the characters on a typewriter. The ASCII system even includes "characters" for ringing a bell (useful for getting attention on old telegraph systems), deleting the previous character (kind of an early "undo"), and "end of transmission" (to let the receiver know that the message was finished). These days those characters are rarely used, but the codes for them still exist (they are the missing patterns in the table above). Nowadays ASCII has been surplanted by a code called "UTF-8", which happens to be the same as ASCII if the extra left-hand bit is a 0, but opens up a huge range of characters if the left-hand bit is a 1.

There are several other codes that were popular before ASCII, including the [Baudot code](http://en.wikipedia.org/wiki/Baudot_code) and [EBCDIC](http://en.wikipedia.org/wiki/EBCDIC). A widely used variant of the Baudot code was the "Murray code", named after New Zealand born inventor [Donald Murray](http://en.wikipedia.org/wiki/Donald_Murray_(inventor\)). One of Murray's significant improvements was to introduce the idea of "control characters", such as the carriage return (new line). The "control" key still exists on modern keyboards.

{panel end}

## Representing numbers with bits

{panel type="teacher-note" summary="CS Unplugged activity"}

If you are doing a warm up exercise with the class, the CS Unplugged binary activity [http://csunplugged.org/binary-numbers](http://csunplugged.org/binary-numbers) provides scaffolding and can be used to teach concepts around binary numbers using only counting or simple addition.  In the chapter we have decided to approach this section by starting with number systems. While this may appear “scary” because of the math, most students should be quite familiar with it as it is first introduced very early in primary school in the form of recognising that numbers are made up of the “ones”, “tens”, “hundreds”, etc, and is further built on until eventually in high school they learn about the exponent notation, i.e. {math}541 = 5 \times 10^2 + 4 \times 10^1 + 1 \times 10^0{math end}. As explained in this section, binary numbers are a base 2 number system, rather than the base 10 number system we are all familiar with. The idea of number systems provides a good stepping stone into binary numbers

We are assuming that students already know about base 10 number systems, including the exponent notation. The initial information in this section on them is only intended to trigger recall, rather than actually teaching them the concept.

Less mathematically able students who are really struggling with number systems should be able to skip over it, and instead go directly to making binary numbers in the interactive.

{panel end}

The number system that humans normally use is in base 10 (also known as decimal).
It's worth revising quickly, because binary numbers use the same ideas as decimal numbers, just with fewer digits!

In decimal, the value of each digit in a number depends on its place in the number.
For example, in the amount $123, the 3 represents $3, whereas the 1 represents $100.
Each place value in a number is worth 10 times more than the place value to its right, i.e. there are the “ones”, the “tens”, the “hundreds”, the “thousands” the “ten thousands”, the “hundred thousands”, the “millions”, etc. Also, there are 10 different digits (0,1,2,3,4,5,6,7,8,9) that can be at each of those place values.

If you were only able to use one digit to represent a number, then the largest number would be 9. After that, you need a second digit, which goes to the left, giving you the next ten numbers (10, 11, 12... 19). It's because we have 10 digits that each one is worth 10 times as much as the one it its right.

You may have encountered different ways of expressing numbers using “expanded form”. For example, if you want to write the number 90328 in expanded form you might have written it as:

{math}90328 = 90000 + 300 + 20 + 8{math end}

A more sophisticated way of writing it is:

{math}90328 = (9 \times 10000) + (0 \times 1000) + (3 \times 100) + (2 \times 10) + (8 \times 1){math end}

If you've learnt about exponents, you could write it as
{math}90328 = (9 \times 10^4) + (0 \times 10^3) + (3 \times 10^2) + (2 \times 10^1) + (8 \times 10^0){math end}

Remember that any number to the power of 0 is 1. i.e. the 8 x {math}10^0{math end} is 8, because the {math}10^0{math end} is 1.

The key ideas to notice from this are that the digit on the right (such as the 8 in 90328) is the one that's worth the least, and that because we have 10 digits, each place is worth 10 times as much as the one to the right (e.g. the 2 in 90328 is the number of tens, the 3 is the number of 100s, and so on). Exactly the same happens with binary numbers.

### Binary numbers

{panel type="teacher-note" summary="Teaching binary numbers"}

This subsection is a prerequisite for the colours section, as colour representations are built on simple binary numbers.

It's very common for computer science courses and books (like this one) to teach students how to convert between binary representation and decimal numbers. In practice, computer scientists hardly ever do this, but the important thing is to understand the patterns and constraints around binary numbers. A key pattern that students should pick up is that adding just one bit to a binary number *doubles* the range it can represent. The patterns around binary numbers come up in many areas of computer science, so it is well worth getting familiar with them.

{panel end}

As discussed earlier, computers can only store information using bits, which only have 2 possible states. This means that they cannot represent base 10 numbers using digits 0 to 9, the way we write down numbers in decimal;  instead, they use a base 2 number system, also called binary.

{panel type="curiosity" summary="The denary number system"}

The base 10 (decimal) system is sometimes called denary, which is more consistent with the the name binary for the base 2 system. The word "denary" also refers to the Roman denarius coin, which was worth ten asses (an "as" was a copper or bronze coin).
The term "denary" seems to be used mainly in the UK; in the US, Australia and NZ the term "decimal" is more common.

{panel end}

Because binary is base 2, there are only 2 possible digits (0 and 1), as opposed to the 10 in our standard number system, and each place value is 2 times bigger than the one to its right (in contrast to our base 10 number system where each place is 10 times bigger).

The interactive below illustrates how this binary number system represents decimal numbers. Have a play around with it to see what patterns you can see. The decimal (base 10) representation for the binary number currently shown is given by the interactive on the far right.

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/DR/DR-base-conversion/public_html/index.html?base=2&columns=7&lines=A,B,C&offset=0" text="Click for interactive: Base Calculator"}

To ensure you are understanding correctly how to use the interactive, verify that when you enter the binary number 101101 it shows that the decimal representation is 45, that when you enter 100000 it shows that the decimal representation is 32, and when you enter 001010 it shows the decimal representation is 10.

You should try using the interactive to convert a decimal number to binary.
For example, choose a number less than 61 (perhaps your house number, a friend's age, or the day of the month you were born on), set all the binary digits to zero, and then start with the *left-most* digit (32), trying out if it should be zero or one.
See if you can find a method for converting the number without too much trial and error.

{panel type="teacher-note" summary="Using the binary number interactive"}

With the interactive, students should discover that they can convert a number by working from left to right through the digits, setting the digit to 1, and resetting it to zero if the total is higher than the number being sought. After converting a few numbers they will start to anticipate what to do. This algorithm is fairly intuitive, and discoverable by quite young students. Discovering it for themselves will give a lot of confidence in their ability to convert numbers. If they need some help, get them to set the *left-most* bit to one, and ask if the total is too high. If it is, set the bit back to zero, otherwise leave it as one. Then repeat this for each bit from left to right. For example, for the number 37, the first bit gives a total of 32, which isn't too high; setting the second bit brings the total to 48, which is too high, so it stays at zero; the third bit gives a total of 32+8 = 40, which is too high; the fourth bit gives 32+4 = 36, which is ok, so that bit is a 1. The fifth bit would give 38 (too high), and the sixth bit gives the required 37, giving the binary number 100101. This approach is explained for students later in the text, but it's better if they can discover it for themselves.

There are a lot of interactive games for exploring binary numbers. The following one works in a web browser: [Cisco Binary game](http://forums.cisco.com/CertCom/game/binary_game_page.htm). While there's a limit to the value of being able to make binary conversions, doing a number of them helps student to discover the kinds of patterns that occur in the binary number system.

There is another algorithm for conversion that is often found in textbooks, and it is easier to write a program for, but a little harder for learners. It isn't necessary to explore the concepts of this chapter, but in case a student wants to implement it, the algorithm is to work from right to left; set the right-most bit to one if the decimal number is odd, otherwise set it to zero, then divide the decimal number by 2 (rounding down), and repeat the procedure for the next digit to the left (set it to one if the number is odd, otherwise zero, then divide by 2).  This is repeated until the decimal number has been reduced to zero.

{panel end}

Can you figure out the binary representation for 23 without using the interactive? What about 4, 0, and 32? Check all your answers using the interactive to verify they are correct.

{panel type="teacher-note" summary="Answers"}

23 is 010111, 4 is 000100, 0 is 000000, and 32 is 100000.

{panel end}

What is the largest number you can make with this binary interactive? What is the smallest? Is there any integer value in between the biggest and the smallest that you can’t make? Are there any numbers with more than one representation? Why/ why not?

{panel type="teacher-note" summary="Answers"}

-  000000 in binary, 0 in decimal is the smallest number.
- 111111 in binary, 63 in decimal is the largest number
- All the integer values (0, 1, 2... 63) in the range can be represented (and there is a unique representation for each one)

The question of uniqueness will be challenging for some students. It addresses the idea that every number has a unique binary representation; students who struggle with the reasoning may be prepared to just accept that this is the case. However, the following reasoning introduces the idea: have a student work out a 5-bit binary representation for, say, 12 (which is 01100). The left-most 0 represents the 16; ask if it would be possible to represent 12 if that bit is a 1 (it's not possible because you'd already have 16, which is more than 12). Now consider the next bit (the 1 represents 8). Is it possible to represent 12 without the 8? (No, because the remaining bits only add up to 7). Following on with this reasoning, the student will establish that 12 *has to* be represented as 01100.

Another way of showing the uniqueness is to work out how many bit combinations there are. For 5 bits, there are two choices for each bit, so 2x2x2x2x2 (i.e. 32) distinct 5-bit binary numbers. Since the 5-bit binary numbers cover the range from 0 to 31, there are 32 numbers, so there's a one-to-one relationship between all possible bit patterns and all numbers they can represent i.e. each number has a unique representation.

{panel end}

You have probably noticed from the interactive that when set to 1, the leftmost bit (the “most significant bit”) adds 32 to the total, the next adds 16, and then the rest add 8, 4, 2, and 1 respectively. When set to 0, a bit does not add anything to the total. So the idea is to make numbers by adding some or all of 32, 16, 8, 4, 2, and 1 together, and each of those numbers can only be included once.

Rather than just using trial and error to figure out what a decimal number is in binary, could you figure out a systematic approach? Have a look at what 100000 is in binary. What about 011111? Is it possible to make a number over 32 if the most significant bit is set to a 0? Why? And what about 001000 and 000111? Can you see a pattern that would lead to a systematic way of converting decimal numbers to binary? Hint: start with deciding the leftmost bit, and then work along to the right, bit by bit.

So what happens if we have fewer than 6 bits? For example, with 5 bits, the place values would be 16, 8, 4, 2 and 1, so the largest value is 11111 in binary, or 31 in decimal.
What's the largest value you can store with 4 bits? 3 bits?

{panel type="teacher-note" summary="Answers"}

The largest value with 4 bits is 1111 in binary, or 15 in decimal. For 3 bits (111 in binary) it is 7 in decimal. Try to guide students to noticing that the largest value is one less than what the next bit value would be; for example, in a 6-bit representation, the highest bit value is the 32 (left-most bit), so the total is one less than 64, which is what the next bit would be. In general, with n bits, the highest value is {math}2^(n-1){math end}.

{panel end}

{comment}

.. xtcb add text on using the interactive with different numbers of bits?

{comment end}

What would happen if we have 7 bits instead of 6? The seventh bit would have a value of 64, and it would be possible to store numbers up to 127.

{panel type="teacher-note" summary="Binary pianos"}

The "binary piano" is a simple binary conversion device that can be printed on paper, and enables students to experiment with these concepts physically.
It can be [downloaded here](files/binary-piano-UC.pdf)
or as a [4-up version here](files/binary-piano-UC-4up.pdf).
These versions have 9 bits; if you want to emphasise that bytes use 8 bits,
you can have students ignore the 9th bit (perhaps by sticking it on 0),
but it is useful when they want to remember the largest 8-bit value,
since they can get it by subtracting one from the value of the 9th bit.
{panel end}

{comment}

.. xtcb  Add links to online resources that also cover this (there are probably more resources covering binary numbers than anything else for high schools!) eg http://www.wikihow.com/Convert-from-Decimal-to-Binary, (the second method), or https://www.khanacademy.org/science/computer-science/v/binary-numbers
.. see also all the games from Ben's thesis

  .. Need to give them some examples to work on.   Not giving the answer to these ones, they can figure it out themselves or ignore it.

{comment end}

{panel type="extra-for-experts" summary="Counting in binary"}

Can you figure out a systematic approach to counting in binary? i.e. start with the number 0, then increment it to 1, then 2, then 3, etc, all the way up to the highest number that can be made with the 7 bits. Try counting from 0 to 16, and see if you can detect a pattern.
Hint: Think about how you add 1 to a number in base 10. e.g. how do you work out 7 + 1, 38 + 1, 19 + 1, 99 + 1, 230899999 + 1, etc? Can you apply that same idea to binary?

Using your new knowledge of the binary number system, can you figure out a way to count to higher than 10 using your 10 fingers? What is the highest number you can represent using your 10 fingers? What if you included your 10 toes as well (so you have 20 fingers and toes to count with).

{panel end}

{panel type="teacher-note" summary="Extra for experts above"}

For the "extra for experts" above, some students may discover that a binary number can be incremented by starting at the right and flipping all consecutive bits until a 1 comes up (which will be on the very first bit half of the time).

Counting on fingers in binary means that you can count to 31 on 5 fingers, and 1023 on 10 fingers. There are a number of videos on YouTube of people counting in binary on their fingers. One twist is to wear white gloves with the numbers 16, 8, 4, 2, 1 on the 5 fingers respectively, which makes it easy to work out the value of having certain fingers raised.

{panel end}

An important concept with binary numbers is the range of values that can be represented using a given number of bits.
One bit on its own might not seem very useful, but it's enough to store things like the state of a checkbox (checked or not checked).
When we have 8 bits the binary numbers start to get useful --- they can represent values from 0 to 255, so it is enough to store someone's age, the day of the month, and so on.

{panel type="jargon-buster" summary="What is a byte?"}

Groups of 8 bits are so useful that they have their own name: a **byte**. Computer memory and disk space is usually divided up into bytes, and bigger values are stored using more than one byte. For example, two bytes (16 bits) are enough to store numbers from 0 to 65,535. Four bytes (32 bits) can store numbers up to 4,294,967,295. You can check these numbers by working out the place values of the bits. Every bit that's added will double the range of the number.

{panel end}

{panel type="curiosity" summary="Binary cakes"}

Candles on birthday cakes use the base 1 numbering system, where each place is worth 1 times the one to its right(!) For example, the number 3 is 111, and 10 is 1111111111. This can cause problems as you get older --- if you've ever seen a cake with 100 candles on it, you'll be aware that it's a serious fire hazard.

{image filename="binary-cakes.png" alt="The image shows two people with birthday cakes, however a cake with 100 candles on it turns into a big fireball!"}

Luckily it's possible to use binary notation for birthday candles --- each candle is either lit or not lit. For example, if you are 18, the binary notation is 10010, and you need 5 candles (with only two of them lit).

There's a [video on using binary notation for counting up to 1023 on your hands, as well as using it for birthday cakes](http://www.youtube.com/watch?v=GUqle9RE3Y8).

{image filename="binary-cake.png" alt="It's a lot smarter to use binary notation on candles for birthdays as you get older, as you don't need as many candles." caption="It's a lot smarter to use binary notation on candles for birthdays as you get older, as you don't need as many candles."}

{panel end}

### Shorthand for binary numbers

Most of the time binary numbers are stored electronically, and we don't need to worry about making sense of them. But sometimes it's useful to be able to write down and share numbers, such as the unique identifier assigned to each digital device (MAC address), or the colours specified in an HTML page.

Writing out long binary numbers is tedious --- for example, suppose you need to copy down the 16-bit number 0101001110010001. A widely used shortcut is to break the number up into 4-bit groups (in this case, 0101 0011 1001 0001), and then write down the digit that each group represents (giving 5391). There's just one small problem: each group of 4 bits can go up to 1111, which is 15, and the digits only go up to 9.

The solution is simple: we introduce symbols for the digits for 1010 (10) to 1111 (15), which are just the letters A to F. So, for example, the 16-bit binary number 1011 1000 1110 0001 can be written more concisely as B8E1. The "B" represents the binary 1011, which is the decimal number 11, and the E represents binary 1110, which is decimal 14.

Because we now have 16 digits, this representation is called hexadecimal (or hex for short). Converting between binary and hexadecimal is very simple, and that's why hexadecimal is a very common way of writing down large binary numbers.

Here's a full table of all the 4-bit numbers and their hexadecimal digit equivalent:

| Binary | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |
| Hex | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |

For example, the largest 8-bit binary number is 11111111. This can be written as FF in hexadecimal. Both of those representations mean 255 in our conventional decimal system (you can check that by converting the binary number to decimal).

The largest 16 bit binary number is 1111111111111111, or FFFF in hexadecimal. Both of these represent 65535 in decimal.

The hexadecimal system is also known as base 16. The following interactive converts hexadecimal numbers to decimal (base 10), which provides another way of thinking about them. But don't forget that the main point is that hexadecimal is an easy shorthand for binary representation.

{comment}

.. xtcb check number of digits and use of ABC lines in following

{comment end}

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/DR/DR-base-conversion/public_html/index.html?base=16&columns=7&lines=A,B,C&offset=0" text="Click for interactive: Base Calculator (Hexadecimal)"}

Which notation you use will depend on the situation; binary numbers represent what is actually stored, but can be confusing to read and write; hexadecimal numbers are a good shorthand; and decimal numbers are used if you're trying to understand the meaning of the number. All three get used in computer science.

### How do binary numbers affect us?

The length of a binary number determines the range of values it can represent. Often on computers we are dealing with text, images and sound rather than numbers, but they do appear in quite a few places, and the accuracy with which they are represented can affect what we can do on a computer.

For example, numbers in spreadsheets usually have a finite precision. Try putting the formula "=1/3" into a spreadsheet, and have it represented with maximum accuracy. How many decimal places does it store? This will be dictated by the number of binary digits that the spreadsheet is storing.

Many programming languages allow the programmer to specify the number of bits used to represent each variable (e.g. in the C language a "short int" is 16 bits or more, and a "long int" is at least 32 bits); if you are working with a language then they could investigate limits on how numbers are represented. Note that some languages, including Python, seamlessly changes the size of the representation of an integer if it gets too large, so it's harder to explore these issues in Python.

Another situation where different numbers of bits in a representation is important is IP (Internet Protocol) and MAC (media access control) addresses for devices; the recent change from IPv4 to IPv6 was driven by the number of devices you could represent, and if you are interested in networks could explore the number of bits used for an address, and how many possible devices could exist before we run out of numbers.


## Representing images with bits

{panel type="caution" summary="Preparation needed"}
This section assumes that you understand binary numbers. If you are confused by binary numbers still, you should go back to the binary numbers section and work through the material there again until you understand it. The first part of this section is possible to understand without understanding binary numbers, although in order to actually use the material for assessment purposes, you will need to understand binary numbers, as the key idea is representing colours using *bits*, and the bits in colours are decided based on numbers.
{panel end}

{panel type="teacher-note" summary="Background information"}
This first subsection is not actually computers representing data using bits (as it is actually about computer screens physically displaying colour), but it provides the background before students learn about how the colours are then stored in computer memory. Students may have covered this material under other topics (e.g. image editing). Its purpose here is to link this topic back to what students are familiar with.
{panel end}

{comment}

xTCB: add text to introduce interactive, that 1) image has pixels 2) pixels have values
JRM: will add interactive back here once text has been added

{comment end}

In school or art class you may have mixed different colours of paint or dye together in order to make new colours.
In painting it's common to use red, yellow and blue as three "primary" colours that can be mixed to produce lots more colours.
Mixing red and blue  give purple, red and yellow give orange, and so on.

Actually, while the colours blue, red and yellow are commonly used in painting, the very similar primary colours that work better for printing are cyan, magenta and yellow (CMY), which are commonly found in computer printers as well as printing presses. This kind of mixing is called "subtractive mixing", because it starts with a white canvas or paper, and subtracts colour from it. The interactive below allows you to experiment with these in case you're not familiar with them, or if you just like mixing colours.
We've also added a "black" colour; it's not strictly necessary (you can get black by putting all the other colours on full), but it's useful for printers because it's such a common colour.

**Note:** The interactive here has not been updated to the new system. Please [view the interactives on the Data Representation page](http://www.csfieldguide.org.nz/releases/1.9.9/DataRepresentation.html) on the older version of the CSFG. We are currently in the process of updating these interactives for release.

{comment}

xJRM insert Mona Lisa image from Chinese book end of topic 4

{comment end}

Computer screens and related devices also rely on mixing three colours, except they need a different set of primary colours because they are *additive*, starting with a black screen and adding colour to it.
For additive colour on computers, the colours red, green and blue (RGB) are used.
Each pixel on a screen is typically made up of three tiny lights; one red, one green, and one blue. By increasing and decreasing the amount of light coming out of each of these three, all the different colours can be made.

You can try additive colours in the following interactive; try different combinations of each slider. How do you generate yellow? What happens if they are all at zero? All at full value (255)? Halfway? What happens if one colour is at full, and the other two are at halfway? How do you get shades of purple, yellow, orange, and pink? What happens when you have the same amount of each colour?

{panel type="teacher-note" summary="Surprising colours"}

Yellow is usually a surprise for students - it's made from red and green, with no blue.
Having all the sliders at the extremes will produce black and white, and if they are all the same value but inbetween, it will be grey (i.e. between black and white).
Pink is made by having red on full value, and green and blue on half; students can think of this as halfway between white (all on full) and red (only the red on full, with the other two off).

{panel end}

**Note:** The interactive here has not been updated to the new system. Please [view the interactives on the Data Representation page](http://www.csfieldguide.org.nz/releases/1.9.9/DataRepresentation.html) on the older version of the CSFG. We are currently in the process of updating these interactives for release.

The key idea is that you can specify the colour of a pixel using three numbers.
In the above example, each number is from 0 to 255.
With 256 possible values for each of the three components, that gives 256 x 256 x 256 = 16,777,216 possible colours, which is more than the human eye can detect.
In other words, using just three numbers, you can specify pretty much any colour you want --- and a lot that you can't tell apart.

Of course, a computer screen or printout doesn't have just one colour on it --- it has millions of small pixels, each of which has a particular colour.

The following interactive allows you to zoom in on an image to see the pixels that are used to represent it. Each pixel is a solid colour square, and the computer needs to store the colour for each pixel.
If you zoom in far enough, the interactive will show you the red-green-blue values for each pixel. You can pick a pixel and put the values on the slider above - it should come out as the same colour as the pixel.

{interactive name="pixel-viewer" type="whole-page" text="Pixel Viewer"}

{panel type="jargon-buster" summary="Pixel"}

The word **pixel** is short for "picture element". On computer screens and printers an image is almost always displayed using a grid of pixels, each one set to the required colour. A pixel is typically a fraction of a millimeter across, and images can be made up of millions of pixels (one megapixel is a million pixels), so you can't usually see the individual pixels.

{panel end}


{panel type="curiosity" summary="Primary colours and the human eye"}
There's a very good reason that we mix three primary colours to specify the colour of a pixel.
The human eye has millions of light sensors in it, and the ones that detect colour are called "cones". There are three different kinds of cones, which detect red, blue, and green light respectively. Colours are perceived by the amount of red, blue, and green light in them. Computer screen pixels take advantage of this by releasing the amounts of red, blue, and green light that will be perceived as the desired colour by your eyes. So when you see "purple", it's really the red and blue cones in your eyes being stimulated, and your brain converts that to a perceived colour.
Scientists are still working out exactly how we perceive colour, but the representations used on computers seem to be good enough give the impression of looking at real images.

This is why computer screens (and TV screens) most commonly use red, green and blue mixed together to create colour images.

{image filename="pixels-on-screens.jpg" alt="This image shows the small red, green, and blue pixels that are used on screens to display colour."}

For more information about RGB displays, see [RGB on Wikipedia](http://en.wikipedia.org/wiki/Rgb); for more information about the eye sensing the three colours, see [Cone cell](http://en.wikipedia.org/wiki/Cone_cell) and [trichromacy ](http://en.wikipedia.org/wiki/Trichromacy) on Wikipedia.

{panel end}


{panel type="teacher-note" summary="Alternative material on bits and colour"}

Another exercise to see the relationship between bit patterns and colour images is [provided here](https://sites.google.com/a/bxs.org.uk/mrkershaw/ict/bitmapgraphics).

{panel end}

It's not unusual for computer screens to have millions of *pixels* on them, and the computer needs to represent a colour for each one of those pixels.
A million pixels is one *megapixel*. Photographs commonly have several megapixels in them.
To store the image, your computer is storing a colour for every one of those pixels, and each of those could be using the three numbers above.
So a 2 megapixel photo, in its simplest form, needs 6 million numbers to be recorded to represent it accurately.

### Representing high quality images using bits

So now, how can computers represent each possible colour using bits? You may have noticed in the above interactive that for each of red, green, and blue, there are 256 different positions the slider can be in (don’t forget to include setting the slider to 0). From the numbers section, you may remember that to get 256 different possibilities, you need 8 bits. So for example, to represent the current value of the red slider, you would need 8 bits ({math}2^8 = 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 = 256{math end}).

Because there are three primary colours,  each of which has 256 different possible values, we need 24 bits in order to have enough possible bit patterns to represent all the possible colours that this scheme can represent ({math}3 x 8 = 24{math end}).

If you calculate {math}2^24{math end} (i.e. the number of bit patterns you can get with 24 bits), and {math}256 \times 256 \times 256{math end} (i.e. the number of possible colours that can be represented using the above interactive), you will find that the result of these two calculations are the same; 16,777,216. This means that there are 16,777,216 different possible colours that can be represented using this scheme, and that's more colours than most people can distinguish, which is why 24-bit colour is regarded as high quality.

{comment}

Might put a box just showing the math, i.e. that {math}2^24{math end} = {math}256^3{math end}. Won’t take too long to do, and I suspect it may be helpful to some people to see that. Trying to cater for as many different learning styles as possible...
I presume you mean something along the lines of
   {math}2^24{math end} = 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2 x 2
			=  (2 x 2 x 2 x 2 x 2 x 2 x 2 x 2) x (2 x 2 x 2 x 2 x 2 x 2 x 2 x 2) x (2 x 2 x 2 x 2 x 2 x 2 x 2 x 2)
			= ({math}2^8{math end}) x ({math}2^8{math end}) x ({math}2^8{math end})
			= 256 x 256 x 256
			= {math}256^3{math end}
I like the idea of boxes and different explanations for different learning styles -tim.

also - emphasise that all this is based on humans and how we percieve colour: cs is about humans

{comment end}

So now that we know we’ll need 24 bits to represent all the possible colours that can be made from the scheme in the interactive, how can we assign colours to bit patterns?

A sensible way is to use 3 binary numbers that represent the amount of each of red, green, and blue in the pixel. In order to do this, you can simply convert the decimal values on the interactive that specify how much of each of the primary colours is making up the resulting colour into binary, and put them side by side to make a full pattern of 24 bits. Because consistency is important in order for a computer to make sense of the bit pattern, the binary number for red should be put first, followed by green, and then finally blue.

{image filename="colour-purple.png" alt="The colour purple."}

As an example, suppose you have the colour that has red = 145, green = 50, and blue = 123 (it is a shade of purple shown in the square above; you can see it if you set the sliders to those values in the interactive above).
You need to convert each of the 3 numbers into binary, using 8 bits for each. You can either do this by hand if you are confident with binary numbers, use [this binary number interactive with 8 columns](DR-base-conversion/public_html/index.html?base=16&columns=7&lines=A,B,C&offset=0), or use a [binary piano](dr-binary-piano-uc.pdf).
You should get red = 10010001,
green = 00110010,
and blue = 01111011.
This can be written as 100100010011001001111011, which is the bit pattern for representing that shade of purple. Note that there are no spaces between the 3 numbers, as this is a pattern of bits rather than actually being 3 binary numbers, and computers don’t have any such concept of a space between bit patterns anyway --- everything must be a 0 or a 1. You could write it with spaces to make it easier to read, and to represent the idea that they are likely to be stored in 3 8-bit bytes, but inside the computer memory there is just a sequence of high and low voltages, so even writing 0 and 1 is an arbitrary notation. Note that all leading and trailing 0’s on each of the components are kept --- without them, it would be representing a shorter number.
Make sure you work through this example yourself, to understand how it works.

As long as the computer knows this is a colour (typically because it has been taken from a file that is specifying colours, such as GIF or HTML), it will know that the first 8 bits specify the amount of red, the next 8 bits specify the amount of green, and the last 8 bits specify the amount of blue. The computer won’t actually convert the number into decimal, as it works with the binary directly --- most of the process that takes the bits and makes the right pixels appear is typically done by a graphics card or a printer.

24 bit colour is sometimes referred to in settings as "True Color" (because it is more accurate than the human eye can see). On Apple systems, it is called "Millions of colours".

### Hexadecimal colour codes

When writing HTML code, you often need to specify colours for text, backgrounds, etc. One way of doing this is to specify the colour name, for example “red”, “blue”, “purple”, or “gold”. The use of names limits the number of colours you can represent and the shade might not be exactly the one you wanted. A better way is to specify the 24 bit colour directly. The problem is that strings of 24 binary digits are hard to read, and so colours in HTML use  hexadecimal codes as a quick way to write the 24 bits, for example #00FF9E. The hash sign just means that it should be interpreted as a hexadecimal representation, and since each hexadecimal digit corresponds to 4 bits, the 6 digits represent 24 bits of colour information.
This "hex triplet" format is used in HTML pages to specify colours for things like the background of the page, the text, and the colour of links.
It is also used in CSS, SVG, and other applications.

In the 24 bit colour example earlier, the 24 bit pattern was 100100010011001001111011.
This can be broken up into groups of 4 bits:  1001   0001   0011   0010   0111   1011.
Substituting a hexadecimal digit for each of the 4-bit groups (using the table above) gives 91327B. This is the hexadecimal code for this colour!

The hexadecimal notation is extremely useful for people to read or write, as it is much easier to type 6 characters rather than 24 1’s and 0’s when specifying a colour!

For example, to specify the background colour of a page in HTML,  the body tag can have a hexadecimal colour added to it like this:

```
<body bgcolor="#00FF9E">
```

You can use an HTML page to experiment with hexadecimal colours.

{panel type="teacher-note" summary="More information about colour representation"}

More information about this kind of representation of colour can be found [here](http://en.wikipedia.org/wiki/Hexadecimal_colour). A colour picker using hex codes can be found [here](http://www.w3schools.com/tags/ref_colorpicker.asp).

{panel end}

Understanding how these hexadecimal colour codes are derived also allows you to change them slightly without having to refer back the colour table, when the colour isn’t exactly the one you want. Remember that in the 24 bit color code, the first 8 bits specify the amount of red (so this is the first 2 digits of the hexadecimal code), the next 8 bits specify the amount of green (the next 2 digits of the hexadecimal code), and the last 8 bits specify the amount of blue (the last 2 digits of the hexadecimal code). To increase the amount of any one of these colours, you can change the appropriate hexadecimal letters.

For example, #000000 has zero for red, green and blue, so setting a higher value to the middle two digits (such as  #002300) will add some green to the colour.
What colours will the following codes give? #FF0000, #FF00FF, #FFFFFF ? (You can try them out using an HTML file).

{comment}

.. tcb xjrm at some stage, repeat the image earlier with zoomed pixels, but show the values in Hex.

{comment end}

### Representing colours using fewer bits

What if we were to use fewer than 24 bits to represent each colour, i.e. each slider didn’t have as many possible positions it could be in? The following interactive shows what would happen with this limitation. You can select a colour by clicking on the image on the left, and then try to match it with the 24-bit colour sliders (if it's too difficult, the system will offer to help you; to move the sliders by small amounts, you can use the arrow keys).

It should be possible to get a perfect match using 24 bit colour. Now try the 8-bit sliders. These ones have only 8 values for red and green, and just 4 values for blue!

**Note:** The interactive here has not been updated to the new system. Please [view the interactives on the Data Representation page](http://www.csfieldguide.org.nz/releases/1.9.9/DataRepresentation.html) on the older version of the CSFG. We are currently in the process of updating these interactives for release.

The above system used 3 bits to specify the amount of red (8 possible values), 3 bits to specify the amount of green (again 8 possible values), and 2 bits to specify the amount of blue (4 possible values). This gives a total of 8 bits (hence the name), which can be used to make 256 different bit patterns, and thus can represent 256 different colours.

Using this scheme to represent all the pixels of an image takes one third of the number of bits required for 24-bit colour, but it is not as good at showing smooth changes of colours or subtle shades, because there are only 256 possible colors for each pixel. This is one of the big tradeoffs in data representation: do you allocate less space (fewer bits), or do you want higher quality?

{panel type="jargon-buster" summary="Bit depth"}

The number of bits used to represent the colours of pixels in a particular image is sometimes referred to as its "colour depth" or "bit depth". For example, an image or display with a colour depth of 8-bits has a choice of 256 colours for each pixel. There is [more information about this in Wikipedia](http://en.wikipedia.org/wiki/Color_depth). Drastically reducing the bit depth of an image can make it look very strange; sometimes this is used as a special effect called "posterisation" (ie. making it look like a poster that has been printed with just a few colours).

{panel end}

The following interactive shows what happens to images when you use a smaller range of colours (including right down to zero bits!) You can choose an image using the menu. In which cases is the change in quality most noticeable? In which is it not? In which would you actually care about the colours in the image? In which situations is colour actually not necessary (i.e. we are fine with two colours)?

{panel type="teacher-note" summary="Software for exploring colour depth"}

Although we provide the simple interactive for reducing the number of bits in an image, students could also use software like Gimp or Photoshop to save files with different colour depths.

{panel end}

One other interesting thing to think about is whether or not we’d want more than 24 bit colour. It turns out that the human eye can only differentiate around 10 million colours, so the 16 million provided by 24 bit colour is already beyond what our eyes can distinguish.
However, if the image were to be processed by some software that enhances the contrast, it may turn out that 24-bit colour isn't sufficient.
Choosing the representation isn't simple!

{panel type="teacher-note" summary="Effect of colour depths"}

8-bit colour looks particularly bad for faces, where we are used to seeing subtle skin tones. Students may perceive that the 16-bit images are as good as 24-bit images. They do indeed have a rich palette ({math}2^16{math end}, or 65,536 different colours), but they aren't true to the high quality image. The benefit is that they use two-thirds (16/24) of the space.

The extreme values are very limited; two-bit colour can have only 4 different colours (the two-bit patterns are 00, 01, 10, and 11). One-bit colour has only two colours (0 and 1). Zero-bit colour is the ultimate space saver - the file doesn't use any space, but the image isn't any use either. Note that so-called "black and white" images usually have more than two colours in them; typically 256 shades of grey (8 bits) works satisfactorilly for monochrome images.

{panel end}

**Note:** The interactive here has not been updated to the new system. Please [view the interactives on the Data Representation page](http://www.csfieldguide.org.nz/releases/1.9.9/DataRepresentation.html) on the older version of the CSFG. We are currently in the process of updating these interactives for release.

So is it worth the space saving to put up with a lower quality image?
An image represented using 24 bit colour would have 24 bits per pixel. In 600 x 800 pixel image (which is a reasonable size for a photo), this would contain 600 x 800 = 480,000 pixels, and thus would use 480,000 x 24 bits = 11,520,000 bits. This works out to around 1.44 megabytes.
If we use 8-bit colour instead, it will use a third of the memory, so it would save nearly a megabyte of storage.

8 bit colour is not used much anymore, although it can still be helpful in situations such as  accessing a computer desktop remotely on a slow internet connection, as the image of the desktop can instead be sent using 8 bit colour instead of 24 bit colour. Even though this may cause the desktop to appear a bit strangely, it doesn’t stop you from getting whatever it was you needed to get done, done. There are also other situations where colour doesn’t matter at all, for example diagrams, and black and white printed images.

If space really is an issue, then this crude method of reducing the range of colours isn't usually used; instead, compression methods such as JPEG, GIF and PNG are used.
These make much more clever compromises to reduce the space that an image takes, without making it look so bad, including choosing a better palette of colours to use rather than just using the simple representation discussed above.
However, compression methods require a lot more processing, and images need to be decoded to the representations discussed in this chapter before they can be displayed.
We will look at compression methods in a later chapter.
The ideas in this present chapter more commonly come up when designing systems (such as graphics interfaces) and working with high-quality images (such as RAW photographs), and typically the goal is to choose the best representation possible without wasting too much space.

{panel type="teacher-note" summary="Colour depth and compression"}

There's a subtle boundary between low quality data representations (such as 8-bit colour) and compression methods. In principle, reducing an image to 8-bit colour is a way to compress it, but it's a very poor approach, and a proper compression method like JPEG will do a much better job.

{panel end}

For the purposes of the New Zealand NCEA standards, reducing the bit depth of an image is ok as a second compression method to compare to specialised compression methods (JPEG, PNG, GIF etc.), but isn't very suitable for explaining how compression works (in the Achieved level requirements).

Now that you know how the 24 bit and 8 bit colour schemes work and how to represent them using bits, what are the implications of this in practice?
The following interactive can be used to upload your own image, and experiment with allocating different numbers of bits to each colour. You can use it to demonstrate the effect of the different numbers of bits for this data representation.

**Note:** The interactive here has not been updated to the new system. Please [view the interactives on the Data Representation page](http://www.csfieldguide.org.nz/releases/1.9.9/DataRepresentation.html) on the older version of the CSFG. We are currently in the process of updating these interactives for release.

{comment}

.. decided to not mention GIF here; have pointed out above that it's compression, not representation, because of being clever about the palette. It can be discussed in the compression chapter (one day)

{comment end}

## General representations of text

In the introduction we looked at 8-bit ASCII representations of text (which really use 7 bits, allowing for 128 different symbols).
As with any other kind of data represented in binary, we can get improvements by considering larger (or smaller) representations.

In the curiosity earlier we observed that 5 bits are sufficient for simple coding of the English alphabet, and for very slow coding systems (like the [video that contains hidden text using musical notes](http://www.youtube.com/watch?v=L-v4Awj_p7g>) using 5 bits instead of 8 can save some time.
The braille system uses only 6 bits for each character, which allows for 64 different characters, and it is also better than using 8 bits since it would take more paper and more time to read if the longer code was used.

But some languages have way more than 32, or 64, or even 128 characters in their alphabet.
In fact, the majority of the world's population use such languages!
In this case, longer codes are needed, and the most widely used approach is a system called *Unicode*.
A commonly used version of Unicode allows 16 bits per character. Because every extra bit that is added doubles the number of patterns possible, 16-bit codes have many more representations than 8 bit codes. In fact, with 16 bits there are {math}2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 \times 2 = 2^16 = 65,536{math end} patterns that can be represented. This is enough to assign a unique pattern of bits to the main characters in the most common languages, although there are also standards that allow 32 bits (4 bytes) for each character.

The Unicode table is far too big to display in this book, but you can find a variety of tables on the internet, and use them to look up codes. [This website displays all unicode characters](http://unicode-table.com/en/) with geographical data for appropriate characters.
The 16- and 32-bit codes are usually written using hexadecimal since this is an easy abbreviation for the long binary codes, and sections of the Unicode alphabet (different languages) tend to be in multiples of 16.

The modern codes associated with Unicode are usually flexible in the size of the representation, so 8-bit characters can be used if that is sufficient, but 16- or 32- bit characters can be invoked for larger alphabets.
If you are investigating these codes, you will come across standards such as the Universal Character Set (UCS), the Unicode/UCS Transformation Format (UTF-8 UTF-16, etc.), and the GB 18030 standard (which was mandated in the People's Republic of China from the year 2000).

{comment}

.. xtcb curiosity [to be fleshed out later]
.. Braille is available as unicode http://www.unicode.org/charts/PDF/U2800.pdf; also, higher grades of braille use compression! Quite a confusing mixture of representations there!!
 .. Link to available braille patterns http://unicode-table.com/en/#braille-patterns

{comment end}

## Computers representing numbers in practice

A common place that numbers are stored on computers is in spreadsheets or databases.
Some of the things that we might think of as numbers, such as the telephone number (03) 555-1234, aren't actually stored as numbers, as they contain important characters (like dashes and spaces) as well as the leading 0 which would be lost if it was stored as a number (the above number would come out as 35551234, which isn't quite right).
On the other hand, things that don't look like a number (such as "30 January 2014") are often stored using a value that is converted to a format that is meaningful to the reader (try typing two dates into Excel, and then subtract one from the other --- the result is a useful number).
Numbers are commonly used to store things as diverse as student marks, prices, statistics, and scientific readings.

{panel type="teacher-note" summary="Representing dates"}

The difference between two dates in Excel is the number of days between them; the date itself (as in many systems) is stored as the amount of time elapsed since a fixed date (such as 1 January 1900). You can test this by typing a date like "1 January 1850" --- chances are that it won't be formatted as a normal date. Likewise, a date sufficiently in the future may behave strangely due to the limited number of bits available to store the date.

{panel end}

Any system that stores numbers needs to make a compromise between the number of bits allocated to store the number, and the range of values that can be stored.
For example, Excel spreadsheets have a maximum value that can be stored --- try calculating 1/3, and display it to as many places of accuracy as possible.
In some systems (like the Java and C programming languages and databases) it's possible to specify how accurately numbers should be stored; in others it is fixed in advance (such as in spreadsheets).
Some are able to work with arbitrarily large numbers by increasing the space used to store them as necessary (e.g. integers in the Python programming language).

There are two commonly used kinds of numbers: integers and floating point numbers. Integers are what you might know as whole numbers, and can be positive or negative, whereas floating point numbers can have a decimal point in them, and can also be positive or negative. In this section we are just going to focus on integers, as representing floating point numbers is a bit more difficult to understand (but well worth understanding if you use them a lot)!

The binary number representation in the previous section only allowed us to represent positive numbers. In practice, we will want to be able to represent negative numbers as well (such as when the amount of money earned goes to a negative amount, or the temperature falls below zero!)
In our normal representation of base 10 numbers, we represent negative numbers by putting a minus sign in front of the number.  
On a computer we don’t have minus signs, but we can do it by allocating one extra bit, called a *sign* bit, to represent the minus sign.
We can choose the leftmost bit as the sign bit --- when the sign bit is set to “0”, that means the number is positive and when the sign bit is set to “1”, the number is negative (just as if there were a minus sign in front of it).
For example, if we wanted to represent the number 41 using 6 bits (like above) along with an additional 7th bit that is the sign bit, assuming the sign bit is first, we would represent it by 0101001. The first bit is a 0, meaning the number is positive, then the remaining 6 bits give 41, meaning the number is +41. If we wanted to make -59, this would be 1111011. The first bit is a 1, meaning the number is negative, and then the remaining 6 bits give 59, meaning the number is -59.

{comment}

.. 1 is for negative sign, 0 for positive: http://en.wikipedia.org/wiki/Sign_bit

.. Might put the answers for these in, as there isn’t a certain way for students to check their answers like there was for the above ones.

{comment end}

Using 7 bits as described above (one for the sign, and 6 for the actual number), what would be the binary representations for 1, -1, -8, 34, -37, -88, and 102?

{panel type="teacher-note" summary="Solution"}

Students should have been able to do most of this by converting the rightmost 6 bits as for numbers earlier, and then putting in the correct sign bit. The answers are:

- 1 is 00000001
-  -1 is 10000001
-  -8 is 10001000
-  34 is 00100010
-  -37 is 10100101
-  -88 is 11011000
-  102 is 01100110

{panel end}

Suppose we have 8-bit numbers, with the left-most bit as a sign bit. What would the decimal values be for the following 10000110? 01111111? How about 10000000?

{panel type="teacher-note" summary="Solution"}

10000110 is -6, and 01111111 is 127 (the maximum value with 8-bit signed numbers). 10000000 means -0, which is the same as 0, and is discussed below.

{panel end}

The representation 10000000 highlights a problem with this notation, as it represents the number -0, which is the same as 0. That is, there are two ways to represent the number 0, which is wasteful, and potentially confusing.

It turns out that there's a notation called "two's complement" for negative numbers, which avoids this wastage, and more importantly, makes it easier to do arithmetic with negative numbers. It's beyond what is needed for this topic, but the following box gives some more information if you'd like to look into it.



{panel type="teacher-note" summary="Two's complement"}

Note for teachers: While we aren’t providing support for using two’s complement, if you are confident at teaching it, or you have a capable student who can teach it to themselves and can understand it, then representing binary numbers in the way this section explains versus representing them using two’s complement would be 2 different representations of numbers that students can compare. This would be a really good approach if you have a student who is so far ahead that they need an extra challenge!
{panel end}

{panel type="extra-for-experts" summary="Two's complement"}

Negative numbers are more often stored on computers using a system called "two's complement". This system makes it very easy to do arithmetic without having to treat negative numbers as a special case, so it's faster and uses less circuitry. The principle is based on a fairly simple idea: for example, in decimal, if you had to subtract the number 4 from a value, it's the same if you add 6 and subtract 10. Using the complement of the number -4 (i.e. 6) plus an indicator that it's negative can make calculations quicker and simpler. A similar approach applies in binary, and it's even easier because there are only two digits. More [information is available here on how negative numbers work](http://www.i-programmer.info/babbages-bag/200-binary-negative-numbers.html?start=1), and also on the [Wikipedia page about two's complement](http://en.wikipedia.org/wiki/Two%27s_complement), although it's quite technical.
{panel end}


{panel type="curiosity" summary="Overflow and Y2K"}

In some programming languages there isn't a check for when a number gets too big (overflows). For example, if you have an 8-bit number using two's complement, then 01111111 is the largest number (127), and if you add one without checking, it will change to 10000000, which happens to be the number -128. This can cause serious problems if not checked for, and is behind a variant of the Y2K problem, called the [Year 2038 problem](http://en.wikipedia.org/wiki/Year_2038_problem), involving a 32-bit number overflowing for dates on Tuesday, 19 January 2038.

{image filename="xkcd-cant-sleep-comic.png" alt="A xkcd comic on number overflow" source="https://xkcd.com/571/"}

{panel end}

Because of the way computer memory is constructed, memory is most commonly used in chunks of  8 bits or 32 bits (or even 64 bits) at a time.  
That means that if the computer is representing an integer as a binary number with a sign bit, it will commonly use 32 bits, where the first bit is the sign bit, and the other 31 bits represent the value of the number.

In a computer that uses 32 bits for a number, how many different numbers could it represent? What’s the largest number it could represent?  Remember that every bit you add doubles how many numbers you can make. If you double 64 another 25 times (so that it is up to 31 bits), i.e. 128, 256, 512, 1024, 2048.... you get an end result of 2,147,483,648. This means that there 2,147,483,648 numbers that can be represented with 31 bits, the highest of which is 2,147,483,647. This number is just over 2 billion. With the 32nd bit, the sign bit, this means that the number can be positive or negative. This is called a *signed 32 bit integer*. So with the signed 32 bit integer, you can represent any number between -2,147,483,647 and +2,147,483,647.

There is also such thing as a **32 bit *unsigned* integer**. This does not have a signed bit, and the 32nd bit is included as part of the value. As a result, it can represent twice as many positive numbers (but no negative numbers) as the 32 bit *signed* integer above. This would be 4,294,967,296 different numbers, with 4,294,967,295 being the highest.

How many people are in the world?
Would a 32 bit integer like described above be large enough to store a different identifier number for each person in the world?
How many bits of accuracy would you want to allow for possible population growth?

{panel type="teacher-note" summary="Solution"}

The world population is approximately 7 billion, so 32 bits isn't quite enough to have an identifier for each person in the world. 64 bits can store up to 18,446,744,073,709,600,000, so that is way more than enough. Since each extra bit doubles the range that can be stored, even 33 bits would be enough for the world population, and 34 bits would be enough even if the population doubles. The idea that one extra bit increases the range so much is an important concept in data representation.

{panel end}

| Type of Number  | Unsigned Range                  |                     Signed Range                         |
|-----------------|---------------------------------|----------------------------------------------------------|
| 8 bit signed    | 0 to 255                        | -128 to 127                                              |
| 16 bit signed   | 0 to 65,535                     | -32,768 to 32,767                                        |
| 32 bit signed   | 0 to 4,294,967,295              | −2,147,483,648 to 2,147,483,647                          |
| 64 bit signed   | 0 to 18,446,744,073,709,551,615 | −9,223,372,036,854,775,808 to 9,223,372,036,854,775,807  |

So when you are storing values on a computer with very limited space, you need to be careful to pick a suitable kind of integer that has enough space, but isn’t wasting space. You also need to think about whether or not a number could potentially be negative.

Think of a few different examples for different sized integers (both signed and unsigned ones) of a piece of data that you could store in that sized integer. For example, the age of a person could be stored in an 8 bit unsigned integer (people can’t be a negative age!), and the number of students in your school could be stored in an 8 bit or 16 bit integer, depending on how big your school is! What other examples can you think of?

What are some examples of numbers you could not represent using any of these integers?

{panel type="extra-for-experts" summary="Floating point values"}

Another type of number used in computer systems is the "floating point" value. While we won't look at it in detail, to get a taste of what's involved, consider the bit values in a 4-bit number, which are 8, 4, 2 and 1. What would the value of a bit *to the right* of the one bit be? And to the right of that one?

The following version of the base conversion interactive has bits that are smaller than the 1-bit. Try representing the decimal number 3.5 using this system. How about 2.8125? What about 2.8?

This system is a fixed-point number system; floating point numbers are based on this idea, but allow for the number of digits to be fixed, but the position of the point to change (by giving an exponent value).
{panel end}

{panel type="teacher-note" summary="Solution for extra for experts"}

The values to the right of the 1-bit continue to be a half of the value to their left, so they are 0.5, 0.25, 0.125 and so on. The decimal number 3.5 can be represented as 11.1, and 2.8125 is 10.1101. The number 2.8 can't be represented accurately in binary! The closest value with the 10 bits in the interactive is 10.11001100. In fact, the number never finishes in binary; it contains "1100" repeating forever! This rounding error can be seen in some spreadsheets: try adding 110 + 2.8 - 2.8 - 100. With enough places of accuracy, you can see that the sum doesn't (quite) come to zero.

**Note:** The interactive here has not been updated to the new system. Please [view the interactives on the Data Representation page](http://www.csfieldguide.org.nz/releases/1.9.9/DataRepresentation.html) on the older version of the CSFG. We are currently in the process of updating these interactives for release.

{panel end}


### Numbers in programming languages

If you are programming in a language (e.g. Python, Java, C, C++, C#) then the limitations of data representations become important very quickly, as you will have to choose what kind of data representation you want to use, and if it is too small then it can "overflow".
For example, if you allocate a variable to be stored as a 16 bit unsigned integer, and you are counting how many characters there are in a file, then it will fail after 65,535 characters --- that's just a 65 kilobyte file.

If the amount of memory your computer has to store its data in is very limited (for example, on a small portable device), you might not want to reserve 32 bits for a number if it is never going to be over 100. Or even if there is plenty of memory, if you are storing millions of data values then using 16-bit integers instead of 8-bit integers will waste millions of bytes of memory.

Working out the size of an integer used in a particular programming language may take some investigation, as they are usually declared with names like "int" and "long", which don't say explicitly how many bits they use. For example, in the Java programming language, there is a data type called the "byte", which is an 8-bit integer that includes negative numbers (it goes from -128 to 127), whereas a "short" integer is 16 bits, an "int" is 32 bits, and a "long" is 64 bits. In some cases (such as the "int" type in C) the length of an integer depends on the version of the language of the type of computer it is running on, and in other cases (such as integers in Python) the representation is automatically changed for you if the number gets too big!

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

The chapter does not (yet) cover other forms of data representation, and you may wish to explore these as alternatives. The common ones are:

- sound (wave files and related storage; for example, 16-bit samples are used for "CD quality", but professional systems use 24-bit or even higher) --- for some information, see the [Teach with ICT page on sound representation](http://teachwithict.weebly.com/6/post/2014/01/teaching-computer-science-day-15-everything-is-sound.html#sthash.8LIc3W01.dpbs).
- video (which are based on multiple images being played one after the other; however, these files are so large that they are almost never stored as a "raw" representation)

{comment}

.. http://community.computingatschool.org.uk/resources/1035 has a plan for image/sound?
.. http://teachwithict.weebly.com/6/post/2014/01/teaching-computer-science-day-15-everything-is-sound.html#sthash.8LIc3W01.dpbs explains sound nicely
.. https://www.youtube.com/watch?v=W2-FP7twy8s explains sampling

.. sound: http://code.org/files/CSEDbinary.pdf

{comment end}

## Further reading

This puzzle can be solved using the pattern in binary numbers: [http://www.cs4fn.org/binary/lock/](http://www.cs4fn.org/binary/lock/)

[This site](http://courses.cs.vt.edu/~csonline/NumberSystems/Lessons/index.html) has more complex activities with binary numbers, including fractions, multiplication and division.


### Useful Links

- [Basics of binary numbers](http://csunplugged.org/binary-numbers)
- [Representing bits using sound](http://csunplugged.org/modem)
- [Hex game](http://www.purposegames.com/game/049fc90a)
- [Thriving in our digital world](http://www.cs.utexas.edu/~engage/) has good illustrations of data representation
- [How a hard disk works](http://ed.ted.com/lessons/how-do-hard-drives-work-kanawat-senanan)
