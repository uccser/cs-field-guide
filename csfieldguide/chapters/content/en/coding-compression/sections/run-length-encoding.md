# Run length encoding

{video url="https://www.youtube.com/embed/uaV2RuAJTjQ?rel=0"}

Run length encoding (RLE) is a technique that isn't so widely used these days, but it's a great way to get a feel for some of the issues around using compression.

{panel type="teacher-note"}

# Who uses run length encoding?

[Run length encoding](https://en.wikipedia.org/wiki/Run-length_encoding) was widely used when black and white images were the norm.
One of its key roles was as the compression method that made Fax (facsimile) machines possible in a standard that was adopted in 1980.
The {glossary-link term="pixel"}pixels{glossary-link end} in a fax image are only black or white, and typically there are long runs of white pixels in the margins, so RLE is particularly effective.
Also, the method is very simple, and in the 1980s this was important since it reduced the cost of the electronics inside the machine.

Run length encoding is still used as part of JPEG compression, although not to code runs of pixels (in a photo it's unusual to have runs of exactly the same colour).

We have introduced RLE here because it is a practical approach to compression, and most importantly it shows the key benefits and problems that arise in compression.

{panel end}

Imagine we have the following simple black and white image.

{image file-path="img/chapters/pixel-diamond.png" alt="A diamond shape made out of pixels"}

One very simple way a computer can store this image in {glossary-link term="binary-number-system"}binary{glossary-link end} is by using a format where '0' means white and '1' means black (this is a "bitmap", because we've mapped the pixels onto the values of bits).
Using this method, the above image would be represented in the following way:

```text
011000010000110
100000111000001
000001111100000
000011111110000
000111111111000
001111101111100
011111000111110
111110000011111
011111000111110
001111101111100
000111111111000
000011111110000
000001111100000
100000111000001
011000010000110
```

{comment Interactive to make low priority; interactive for images. If we were going to put in the interactive that takes the 1’s and 0’s and converts it into an image for the students, I’d want to put that in here. This would mostly be a convenience thing that allows students to easily see what an image looks like. We would also provide an interactive that can take a number representation and show the image for that. We do NOT want to provide a tool that converts between the 2; we want students to do the converting by hand. The tool will allow them to see if the images they got are the same though.}

{panel type="curiosity"}

# The PBM file format

There is an image format that uses the simple one-symbol-per-pixel representation we have just described.
The format is called "portable bitmap format" (PBM).
PBM files are saved with the file extension ".pbm", and contain a simple header, followed by the image data.
The data in the file can be viewed by opening it in a text editor, much like opening a .txt file,
and the image itself can be viewed by opening it in a drawing or image viewing program that supports PBM files
(the format isn't very well supported, but a number of image viewing and editing programs can display them).
A PBM file for the diamond image used earlier would be as follows:

```text
P1
15 15
0 1 1 0 0 0 0 1 0 0 0 0 1 1 0
1 0 0 0 0 0 1 1 1 0 0 0 0 0 1
0 0 0 0 0 1 1 1 1 1 0 0 0 0 0
0 0 0 0 1 1 1 1 1 1 1 0 0 0 0
0 0 0 1 1 1 1 1 1 1 1 1 0 0 0
0 0 1 1 1 1 1 0 1 1 1 1 1 0 0
0 1 1 1 1 1 0 0 0 1 1 1 1 1 0
1 1 1 1 1 0 0 0 0 0 1 1 1 1 1
0 1 1 1 1 1 0 0 0 1 1 1 1 1 0
0 0 1 1 1 1 1 0 1 1 1 1 1 0 0
0 0 0 1 1 1 1 1 1 1 1 1 0 0 0
0 0 0 0 1 1 1 1 1 1 1 0 0 0 0
0 0 0 0 0 1 1 1 1 1 0 0 0 0 0
1 0 0 0 0 0 1 1 1 0 0 0 0 0 1
0 1 1 0 0 0 0 1 0 0 0 0 1 1 0
```

The first two lines are the header.
The first line specifies the format of the file (P1 means that the file contains ASCII zeroes and ones).
The second line specifies the width and then the height of the image in pixels.
This allows the computer to know the size and dimensions of the image, even if the newline characters separating the rows in the file were missing.
The rest of the data is the image, just like above.
If you wanted to, you could copy and paste this representation (including the header) into a text file, and save it with the file extension .pbm.
If you have a program on your computer able to open PBM files, you could then view the image with it.
You could even write a program to output these files, and then display them as images.

Because the digits are represented using ASCII in this format, it isn't very efficient, but it is useful if you want to read what's inside the file.
There are variations of this format that pack the pixels into bits instead of characters, and variations that can be used for greyscale and colour images.
More [information about this format is available on Wikipedia](https://en.wikipedia.org/wiki/Netpbm_format).

{panel end}

The key question in compression is whether or not we can represent the same image using fewer bits, but still be able to reconstruct the original image.

It turns out we can.
There are many ways of going about it, but in this section we are focussing on a method called *run length encoding*.

Imagine that you had to read the bits above out to someone who was copying them down... after a while you might say things like "five zeroes" instead of "zero zero zero zero zero".
This is the basic idea behind run length encoding (RLE), which is used to save space when storing digital images.
In run length encoding, we replace each row with numbers that say how many consecutive pixels are the same colour, *always starting with the number of white pixels*.
For example, the first row in the image above contains one white, two black, four white, one black, four white, two black, and one white pixel.

```text
011000010000110
```

This could be represented as follows.

```text
1, 2, 4, 1, 4, 2, 1
```

For the second row, because we need to say what the number of white pixels is before we say the number of black, we need to explicitly say there are zero at the start of the row.

```text
100000111000001
```

```text
0, 1, 5, 3, 5, 1
```

You might ask why we need to say the number of white pixels first, which in this case was zero.
The reason is that if we didn't have a clear rule about which to start with, the computer would have no way of knowing which colour was which when it displays the image represented in this form!

The third row contains five whites, five blacks, five whites.

```text
000001111100000
```

This is coded as:

```text
5, 5, 5
```

That means we get the following representation for the first three rows.

```text
1, 2, 4, 1, 4, 2, 1
0, 1, 5, 3, 5, 1
5, 5, 5
```

You can work out what the other rows would be following this same system.

{panel type="spoiler"}

# Representation for the remaining rows

The remaining rows are

```text
4, 7, 4
3, 9, 3
2, 5, 1, 5, 2
1, 5, 3, 5, 1
0, 5, 5, 5
1, 5, 3, 5, 1
2, 5, 1, 5, 2
3, 9, 3
4, 7, 4
5, 5, 5
0, 1, 5, 3, 5, 1
1, 2, 4, 1, 4, 2, 1
```

{panel end}

{panel type="curiosity"}

# Run length encoding in the CS Unplugged show

In this video from a Computer Science Unplugged show, a run length encoded image is decoded using very large pixels (the printer is a spray can!).

{video url="https://www.youtube.com/watch?v=VsjpPs146d8"}

{panel end}

## Converting run length encoding back to the original representation

Just to ensure that we can reverse the compression process, have a go at finding the original representation (zeroes and ones) of this (compressed) image.

```text
4, 11, 3
4, 9, 2, 1, 2
4, 9, 2, 1, 2
4, 11, 3
4, 9, 5
4, 9, 5
5, 7, 6
0, 17, 1
1, 15, 2
```

What is the image of?
How many pixels were there in the original image?
How many numbers were used to represent those pixels?

{panel type="spoiler"}

# Answer for the above image

This image is from the [CS Unplugged image representation activity](http://csunplugged.org/image-representation), and the solution is available in the activity (it is a cup and saucer).

{panel end}

The following interactive allows you to experiment further with run length encoding.

{interactive slug="run-length-encoding" type="whole-page" alt="Run length encoding interactive"}

## Analysing run length encoding

How much space have we saved using this alternate representation, and how can we measure it?
One simple way to consider this is to imagine you were typing these representations, so you could think of each of the original bits being stored as one character, and each of the RLE codes using a character for each digit and comma (this is a bit crude, but it's a starting point).

In the original representation, 225 digits (ones and zeroes) were required to represent the image.
Count up the number of commas and digits (but not spaces or newlines, ignore those) in the new representation.
This is the number of characters required to represent the image with the new representation (to ensure you are on the right track, the first 3 rows that were given to you contain 29 characters).

Assuming you got the new image representation correct, and counted correctly, you should have found there are 121 characters in the new image (double check if your number differs).
This means that the new representation only requires around 54% as many characters to represent (calculated using 121/225).
This is a significant reduction in the amount of space required to store the image &ndash; it's about half the size.
The new representation is a *compressed* form of the old one.

{panel type="curiosity"}

# Run length encoding representation in practice

In practice this method (with some extra tricks) can be used to compress images to about 15% of their original size.
In real systems, the original image only uses one bit for every pixel to store the black and white values (not one character, which we used for our calculations).
However, the run length numbers are also stored much more efficiently, again using bit patterns that take very little space to represent the numbers.
The bit patterns used are usually based on a technique called Huffman coding, but we will get to that later.

{panel end}

## Where is run length encoding used in practice?

The main place that black and white scanned images are used now is on fax machines, which use this approach to compression.
One reason that it works so well with scanned pages is that the number of consecutive white pixels is huge.
In fact, there will be entire scanned lines that are nothing but white pixels.
A typical fax page is 200 pixels across or more, so replacing 200 bits with one number is a big saving.
The number itself can take a few bits to represent, and in some places on the scanned page only a few consecutive pixels are replaced with a number, but overall the saving is significant.
In fact, fax machines would take 7 times longer to send pages if they didn't use compression.

{panel type="project"}

# Using run length encoding for yourself

Now that you know how run length encoding works, you can come up with and compress your own black and white image, as well as decompress an image that somebody else has given you.

Start by making your own picture with ones and zeroes (make sure it is rectangular &ndash; all the rows should have the same length).
You can either draw this on paper or prepare it on a computer (using a fixed width font, otherwise it can become really frustrating and confusing!).
In order to make it easier, you could start by working out what you want your image to be on grid paper (such as that from a math exercise book) by shading in squares to represent the black ones, and leaving them blank to represent the white ones.
Once you have done that, you could then write out the zeroes and ones for the image.

Work out the compressed representation of your image using run length encoding, i.e. the run lengths separated by commas form that was explained above.

Now give a copy of the *compressed representation* (the run length codes, not the original uncompressed representation) to a friend or classmate, along with an explanation of how it is compressed.
Ask them to try and draw the image on some grid paper.
Once they are done, check their conversion against your original.

Imagine that you and your friend are both computers; by doing this you have shown that images using these systems of representations can be compressed on one computer, and decompressed on another, as long as you have standards that you've agreed on (e.g. that every line begins with a white pixel).
It is very important for compression algorithms to follow standards so that a file compressed on one computer can be decompressed on another.
For example, songs often follow the "mp3" standard so that when they are downloaded they can be played on a variety of devices.

{panel end}
