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

And the character **犬** in UTF-32 would be:
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
