# Text

There are several different ways in which computers use bits to store text.
In this section, we will look at some common ones and then look at the pros and cons of each representation.

## ASCII

We saw earlier that 64 unique patterns can be made using 6 dots in Braille.
A dot corresponds to a bit, because both dots and bits have 2 different possible values.

Count how many different characters &ndash; upper case letters, lower case letters, numbers, and symbols &ndash; that you could type into a text editor using your keyboard.
(Don’t forget to count both of the symbols that share the number keys, and the symbols to the side that are for punctuation!)

{panel type="jargon-buster"}

# Characters

The collective name for upper case letters, lower case letters, numbers, and symbols is *characters* e.g. a, D, 1, h, 6, \*, ], and ~ are all characters.
Importantly, a space is also a character.

{panel end}

If you counted correctly, you should find that there were more than 64 characters, and you might have found up to around 95.
Because 6 bits can only represent 64 characters, we will need more than 6 bits; it turns out that we need at least 7 bits to represent all of these characters as this gives 128 possible patterns.
This is exactly what the *{glossary-link term="ascii"}ASCII{glossary-link end}* representation for text does.

{panel type="challenge"}

# Why 7 bits?

In the previous section, we explained what happens when the number of dots was increased by 1 (remember that a dot in Braille is effectively a bit).
Can you explain how we knew that if 6 bits is enough to represent 64 characters, then 7 bits must be enough to represent 128 characters?

{panel end}

Each pattern in ASCII is usually stored in 8 bits, with one wasted bit, rather than 7 bits.
However, the left-most bit in each 8-bit pattern is a 0, meaning there are still only 128 possible patterns.
Where possible, we prefer to deal with full bytes (8 bits) on a computer, this is why ASCII has an extra wasted bit.

Here is a table that shows the patterns of bits that ASCII uses for each of the characters.

| Binary  | Char  | Binary  | Char &nbsp; &nbsp; | Binary  | Char  |
|---------|-------|---------|------|---------|-------|
| 0100000 &nbsp; &nbsp; | Space &nbsp; &nbsp; | 1000000 &nbsp; &nbsp; | @    | 1100000 &nbsp; &nbsp; | `     |
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
| 0111111 | ?     | 1011111 | _    | 1111111 | Delete |

<br>

For example, the letter "c" (lower case) in the table has the pattern "01100011" (the 0 at the front is just extra padding to make it up to 8 bits).
The letter "o" has the pattern "01101111".
You could write a word out using this code, and if you give it to someone else, they should be able to decode it exactly.

{panel type="teacher-note"}

# Using the table

Exchanging short messages in code will force students to use the table, and they should start to pick up some of the patterns (e.g. capital letters have a different code to lower case letters, but they only have one bit different.)

{panel end}

Computers can represent pieces of text with sequences of these patterns, much like Braille does.
For example, the word "computers" (all lower case) would be 01100011 01101111 01101101 01110000 01110101 01110100 01100101 01110010 01110011.
This is because "c" is "01100011", "o" is "01101111", and so on.
Have a look at the ASCII table above to check if we are right!

{panel type="curiosity"}

# What does ASCII stand for?

The name "ASCII" stands for "American Standard Code for Information Interchange", which was a particular way of assigning bit patterns to the characters on a keyboard.
The ASCII system even includes "characters" for ringing a bell (useful for getting attention on old telegraph systems), deleting the previous character (kind of an early "undo"), and "end of transmission" (to let the receiver know that the message was finished).
These days those characters are rarely used, but the codes for them still exist (they are the missing patterns in the table above).
Nowadays ASCII has been supplanted by a code called "UTF-8", which happens to be the same as ASCII if the extra left-hand bit is a 0, but opens up a huge range of characters if the left-hand bit is a 1.

{panel end}

{panel type="challenge"}

# More practice at ASCII

Have a go at the following ASCII exercises:

- How would you represent "science" in ASCII? (ignore the `"` marks)
- How would you represent "Wellington" in ASCII? (note that it starts with an upper case "W")
- How would you represent "358" in ASCII? (it is three characters, even though it looks like a number)
- How would you represent "Hello, how are you?" in ASCII? (look for the comma, question mark, and space characters in ASCII table)

Be sure to have a go at all of them before checking the answer!

{panel end}

{panel type="spoiler"}

# Answers to questions above

These are the answers.

- "science" = 01110011 01100011 01101001 01100101 01101110 01100011 01100101
- "Wellington" = 01010111 01100101 01101100 01101100 01101001 01101110 01100111 01110100 01101111 01101110
- "358" = 00110011 00110101 00111000
- "Hello, how are you?" = 1001000 1100101 1101100 1101100 1101111 0101100 0100000 1101000 1101111 1110111 0100000 1100001 1110010 1100101 0100000 1111001 1101111 1110101 0111111

Note that the text "358" is treated as 3 characters in ASCII, which may be confusing, as the text "358" is different to the number 358!
You may have encountered this distinction in a spreadsheet e.g. if a cell starts with an inverted comma in Excel, it is treated as text rather than a number.
One place this comes up is with phone numbers; if you type 027555555 into a spreadsheet as a number, it will come up as 27555555, but as text the 0 can be displayed.
In fact, phone numbers aren't really just numbers because a leading zero can be important, as they can contain other characters &ndash; for example, +64 3 555 1234 extn. 1234.

{panel end}

### ASCII usage in practice

ASCII was first used commercially in 1963, and despite the big changes in computers since then, it is still the basis of how English text is stored on computers.
ASCII assigned a different pattern of bits to each of the characters, along with a few other "control" characters, such as delete or backspace.

English text can easily be represented using ASCII, but what about languages such as Chinese where there are thousands of different characters?
Unsurprisingly, the 128 patterns aren’t nearly enough to represent such languages.
Because of this, ASCII is not so useful in practice, and is no longer used widely.
In the next sections, we will look at Unicode and its representations.
These solve the problem of being unable to represent non-English characters.

{panel type="curiosity"}

# What came before ASCII?

There are several other codes that were popular before ASCII, including the [Baudot code](https://en.wikipedia.org/wiki/Baudot_code) and [EBCDIC](https://en.wikipedia.org/wiki/EBCDIC).
A widely used variant of the Baudot code was the "Murray code", named after New Zealand born inventor [Donald Murray](https://en.wikipedia.org/wiki/Donald_Murray_(inventor)).
One of Murray's significant improvements was to introduce the idea of "control characters", such as the carriage return (new line).
The "control" key still exists on modern keyboards.

{panel end}

## Introduction to Unicode

In practice, we need to be able to represent more than just English characters.
To solve this problem, we use a standard called *{glossary-link term="unicode"}Unicode{glossary-link end}*.
Unicode is a **character set** with around 120,000 different characters, in many different languages, current and historic.
Each character has a unique number assigned to it, making it easy to identify.

Unicode itself is not a representation &ndash; it is a character set.
In order to represent Unicode characters as bits, a Unicode **encoding scheme** is used.
The Unicode encoding scheme tells us how each number (which corresponds to a Unicode character) should be represented with a pattern of bits.

The following interactive will allow you to explore the Unicode character set.
Enter a number in the box on the left to see what Unicode character corresponds to it, or enter a character on the right to see what its Unicode number is (you could paste one in from a foreign language web page to see what happens with non-English characters).

{interactive slug="unicode-chars" type="in-page"}

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

## UTF-32

UTF-32 is a **fixed length** Unicode encoding scheme.
The representation for each character is simply its number converted to a 32 bit binary number.
Leading zeroes are used if there are not enough bits (just like how you can represent 254 as a 4 digit decimal number &ndash; 0254).
32 bits is a nice round number on a computer, often referred to as a word (which is a bit confusing, since we can use UTF-32 characters to represent English words!)

For example, the character **H** in UTF-32 would be:

```text
00000000 00000000 00000000 01001000
```

The character **$** in UTF-32 would be:

```text
00000000 00000000 00000000 00100100
```

And the character **犬** (dog in Chinese) in UTF-32 would be:

```text
00000000 00000000 01110010 10101100
```

The following interactive will allow you to convert a Unicode character to its UTF-32 representation.
The Unicode character's number is also displayed.
The bits are simply the binary number form of the character number.

{interactive slug="unicode-binary" type="iframe" parameters="mode=utf32"}

{panel type="project"}

# Represent your name with UTF-32

1. Represent each character in your name using UTF-32.
2. Check how many bits your representation required, and explain why it had this many (remember that each character should have required 32 bits)
3. Explain how you knew how to represent each character.
   Even if you used the interactive, you should still be able to explain it in terms of binary numbers.

{panel end}

ASCII actually took the same approach.
Each ASCII character has a number between 0 and 255, and the representation for the character the number converted to an 8 bit binary number.
ASCII is also a fixed length encoding scheme &ndash; every character in ASCII is represented using 8 bits.

In practice, UTF-32 is rarely used &ndash; you can see that it's pretty wasteful of space.
UTF-8 and UTF-16 are both variable length encoding schemes, and very widely used.
We will look at them next.

{panel type="challenge"}

# How big is 32 bits?

1. What is the largest number that can be represented with 32 bits?
   (In both decimal and binary).

2. The largest number in Unicode that has a character assigned to it is not actually the largest possible 32 bit number &ndash; it is 00000000 00010000 11111111 11111111.
   What is this number in decimal?

3. Most numbers that can be made using 32 bits do not have a Unicode character attached to them &ndash; there is a lot of wasted space.
   There are good reasons for this, but if you had a shorter number that could represent any character, what is the minimum number of bits you would need, given that there are currently around 120,000 Unicode characters?

{panel end}

{panel type="spoiler"}

# Answers to above challenge

1. The largest number that can be represented using 32 bits is 4,294,967,295 (around 4.3 billion).
   You might have seen this number before &ndash; it is the largest unsigned integer that a 32 bit computer can easily represent in programming languages such as C.

2. The decimal number for the largest character is 1,114,111.

3. You can represent all current characters with 17 bits.
   The largest number you can represent with 16 bits is 65,536, which is not enough.
   If we go up to 17 bits, that gives 131,072, which is larger than 120,000.
   Therefore, we need 17 bits.

{panel end}

## UTF-8

UTF-8 is a **variable length** encoding scheme for Unicode.
Characters with a lower Unicode number require fewer bits for their representation than those with a higher Unicode number.
UTF-8 representations contain either 8, 16, 24, or 32 bits.
Remembering that a **byte** is 8 bits, these are 1, 2, 3, and 4 bytes.

For example, the character **H** in UTF-8 would be:

```text
01001000
```

The character **ǿ** in UTF-8 would be:

```text
11000111 10111111
```

And the character **犬** (dog in Chinese) in UTF-8 would be:

```text
11100111 10001010 10101100
```

The following interactive will allow you to convert a Unicode character to its UTF-8 representation.
The Unicode character's number is also displayed.

{interactive slug="unicode-binary" type="iframe" parameters="mode=utf8"}

### How does UTF-8 work?

So how does UTF-8 actually work? Use the following process to do what the interactive is doing and convert characters to UTF-8 yourself.

**Step 1.** Lookup the Unicode number of your character.

**Step 2.** Convert the Unicode number to a binary number, using as **few** bits as necessary.
Look back to the section on binary numbers if you cannot remember how to convert a number to binary.

**Step 3.** Count how many bits are in the binary number, and choose the correct pattern to use, based on how many bits there were.
Step 4 will explain how to use the pattern.

```text
7  or fewer bits: 0xxxxxxx
11 or fewer bits: 110xxxxx 10xxxxxx
16 or fewer bits: 1110xxxx 10xxxxxx 10xxxxxx
21 or fewer bits: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

**Step 4.** Replace the x's in the pattern with the bits of the binary number you converted in Step 2.
If there are more x's than bits, replace extra left-most x's with 0's.

For example, if you wanted to find out the representation for **貓** (cat in Chinese), the steps you would take would be as follows.

**Step 1.** Determine that the Unicode number for **貓** is **35987**.

**Step 2.** Convert **35987** to binary &ndash; giving **10001100 10010011**.

**Step 3.** Count that there are **16** bits, and therefore the third pattern **1110xxxx 10xxxxxx 10xxxxx** should be used.

**Step 4.** Substitute the bits into the pattern to replace the x's &ndash; **11101000 10110010 10010011**.

Therefore, the representation for **貓** is **11101000 10110010 10010011** using UTF-8.

## UTF-16

Just like UTF-8, UTF-16 is a **variable length** encoding scheme for Unicode.
Because it is far more complex than UTF-8, we won't explain how it works here.

However, the following interactive will allow you to represent text with UTF-16.
Try putting some text that is in English and some text that is in Japanese into it.
Compare the representations to what you get with UTF-8.

{interactive slug="unicode-binary" type="iframe" parameters="mode=utf16"}

## Comparison of text representations

We have looked at ASCII, UTF-32, UTF-8, and UTF-16.

The following table summarises what we have said so far about each representation.

Representation &nbsp; &nbsp; &nbsp; | Variable or Fixed &nbsp; &nbsp; &nbsp; | Bits per Character &nbsp; &nbsp; &nbsp; | Real world Usage
--- | --- | --- | ---
*ASCII* | Fixed Length | 8 bits | No longer widely used
*UTF-8* | Variable Length | 8, 16, 24, or 32 bits | Very widely used
*UTF-16* | Variable Length | 16 or 32 bits | Widely used
*UTF-32* | Fixed Length | 32 bits | Rarely used

<br>

In order to compare and evaluate them, we need to decide what it means for a representation to be "good".
Two useful criteria are:

1. Can represent all characters, regardless of language.
2. Represents a piece of text using as few bits as possible.

We know that UTF-8, UTF-16, and UTF-32 can represent all characters, but ASCII can only represent English.
Therefore, ASCII fails the first criterion.
But for the second criteria, it isn't so simple.

The following interactive will allow you to find out the length of pieces of text using UTF-8, UTF-16, or UTF-32.
Find some samples of English text and Asian text (forums or a translation site are a good place to look), and see how long your various samples are when encoded with each of the three representations.
Copy paste or type text into the box.

{interactive slug="unicode-length" type="in-page"}

As a general rule, UTF-8 is better for English text, and UTF-16 is better for Asian text.
UTF-32 always requires 32 bits for each character, so is unpopular in practice.

{panel type="curiosity"}

# Emoji and Unicode

Those cute little characters that you might use in your social media statuses, texts, and so on, are called "emojis", and each one of them has their own Unicode value.
Japanese mobile operators were the first to use emojis, but their recent popularity has resulted in many becoming part of the Unicode Standard and today there are well over 1000 different emojis included.
A [current list of these can be seen here](http://unicode.org/emoji/charts/full-emoji-list.html).
What is interesting to notice is that a single emoji will look very different across different platforms, i.e. &#128518 ("smiling face with open mouth and tightly-closed eyes") in my tweet will look very different to what it does on your iPhone.
This is because the Unicode Consortium only provides the character codes for each emoji and the end vendors determine what that emoji will look like, e.g. for Apple devices the "Apple Color Emoji" typeface is used (there are rules around this to make sure there is consistency across each system).

{panel end}

## Project: Messages hidden in music

There are messages hidden in this video using a 5-bit representation.
See if you can find them!
Start by reading the explanation below to ensure you understand what we mean by a 5-bit representation.

{video url="https://www.youtube.com/watch?v=L-v4Awj_p7g"}

<br>

If you *only* wanted to represent the 26 letters of the alphabet, and weren’t worried about upper case or lower case, you could get away with using just 5 bits, which allows for up to 32 different patterns.

You might have exchanged notes which used 1 for "a", 2 for "b", 3 for "c", all the way up to 26 for "z".
We can convert those numbers into 5 digit binary numbers.
In fact, you will also get the same 5 bits for each letter by looking at the last 5 bits for it in the ASCII table (and it doesn't matter whether you look at the upper case or the lower case letter).

Represent the word "water" with bits using this system.
Check the below panel once you think you have it.

{panel type="spoiler"}

# Representation for water

```text
w: 10111
a: 00001
t: 10111
e: 10100
r: 10010
```

{panel end}

**Now, have a go at decoding the music video!**

{panel type="teacher-note"}

# More information about the video

The video actually contains over 20 hidden messages, all using the 5-bit system.
An easy one to start with is the drum solo at the beginning.
The first 5 sounds are "kick kick snare kick kick".
Students need to decide which is 0 and which is 1; this number could either be 00100 (letter number 4, which is "d") or 11011 (letter number 27, which doesn't exist!)
Carrying on with the first option, the first few letters will spell "drum".

The challenges get harder (there are messages in most instrument parts and singing, as well as the dancing and background colours).
The song itself talks about how it is a form of "steganography", a term that students might like to research.

{panel end}
