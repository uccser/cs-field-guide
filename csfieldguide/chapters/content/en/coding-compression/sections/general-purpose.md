# General purpose compression

General purpose compression methods need to be lossless because you can't assume that the user won't mind if the data is changed.
The most widely used general purpose compression algorithms (such as ZIP, gzip, and rar) are based on a family of methods called "Ziv-Lempel coding", invented by Jacob Ziv and Abraham Lempel in the 1970s.

The main idea of Ziv-Lempel coding is that sequences of characters are often repeated in files, so instead of storing the repeated occurrence, it is replaced with a reference to where it occurred earlier in the file.
As long as the reference is smaller than the phrase being replaced, you’ll save space, and this is how we get compression.
Typically the systems based on the Ziv-Lempel approach can be used to reduce text files to as little as a quarter of their original size, which is almost as good as any method known for compressing text.

The interactive below illustrates this idea using a variation of the Ziv-Lempel approach called LZSS (Lempel–Ziv–Storer–Szymanski); you should open it in a separate window, and try it out while reading the description below.

{interactive slug="lzss-compression" type="whole-page"}

In LZSS, a reference to where some text occurred before is actually two numbers: the first says how many characters to count back to where the previous phrase starts, and the second says how long the referenced phrase is.
Each reference typically takes the space of about one or two characters, so the system makes a saving as long as two characters are replaced.
The options in the interactive above allow you to require the replaced length to be at least two characters, to avoid replacing a single character with a reference.
Of course, all characters count, not just letters of the alphabet, so the system can also refer back to the spaces between words.
In fact, some of the most common sequences are things like a full stop followed by a space.

This approach also works very well for simple images, since sequences like "10 white pixels in a row" are likely to have occurred before.
Here are some of the bits from the example image earlier in this chapter; you can paste them into the interactive above to see how many pointers are needed to represent it (in this example there's just one bit for each pixel because the image has only two colours, but in practice LZ methods are likely to code images with a bigger range of pixel colours, such as 8-bit pixels with 256 different colours).

```text
011000010000110
100000111000001
000001111100000
000011111110000
000111111111000
001111101111100
011111000111110
111110000011111
```

What you just tried is essentially what happens with PNG images; the pixel values are compressed using a similar Ziv-Lempel algorithm, which works well if you have lots of consecutive pixels that are the same colour.
But it works very poorly with photographs, where pixel patterns are very unlikely to be repeated exactly.
For example, in the following row of pixels from a photo nearly all of them are the same colour, yet the number representing the colour value fluctuates slightly, so there aren't many repeated patterns that an LZ method would pick up:

{image file-path="img/chapters/pixel-viewer-photo-values.png" alt="Row from pixel viewer interactive showing different colours in a photo." caption="true"}

This image from a photo was generated using the Pixel Viewer Interactive.

{image end}

In contrast, the following zoomed in image from a cartoon has a lot of repeated pixel colours:

{image file-path="img/chapters/pixel-viewer-cartoon-values.png" alt="Row from pixel viewer interactive showing similar colours in a cartoon." caption="true"}

This image from a cartoon was generated using the Pixel Viewer Interactive.

{image end}

{panel type="teacher-note"}

# Teacher note

Ask your students to use the Pixel Viewer Interactive to load a photo and a cartoon to see this for themselves.

{panel end}

In the next section we’ll take a look at a variation of “Ziv-Lempel coding” creatively called “Lempel-Ziv-Welch coding”, which is often referred to as LZW to make things easier.
LZW uses a dictionary-like structure based on key and value pairs &ndash; these are based on the metaphor of looking up a word (key) and its definition (value) in a dictionary, but in this case the key is a number, and the value is a phrase of text that it represents.
The phrase might be as small as two characters, or could be a few words.
The dictionary keeps track of phrases it has encountered and gradually adds new ones to the dictionary.

Let's think about how to use a dictionary for compression.
Here's a short dictionary with 4 entries, numbered from 0 to 3 (the last entry in the dictionary is a comma):

| Code | Character String |
|------|------------------|
| 0    | I                |
| 1    | AM               |
| 2    | SAM              |
| 3    | ,                |


If you receive the code `0 1 2 3 2 0 1`, you could look up each number in the "dictionary", and translate it to `I AM SAM, SAM I AM`.
Of course, data on a computer is represented as binary numbers; with 4 entries in the dictionary, you'd need 2 bits for each number.
The code would actually be `00 01 10 11 10 00 01` and the dictionary would look like this:

| Code (in binary) | Character String |
|------------------|------------------|
| 00               | I                |
| 01               | AM               |
| 10               | SAM              |
| 11               | ,                |

This dictionary is way too small for regular text.
Suppose you were allowed to use a dictionary of 4096 {glossary-link term="string"}strings{glossary-link end} of characters instead of just 4.
Which strings of characters would you put in the dictionary to make sure it could represent any possible text?
And how many bits are needed to give the index number in the dictionary?

You can try creating your own dictionary for some text in the following interactive &ndash; see how few dictionary entries you need to cover as much of the text as possible.

{interactive slug="dictionary-compression" type="whole-page"}

{panel type="teacher-note"}

# Teacher note

Students might think of putting in common words like “the” and “of”.
Or even better, the strings might include a space after them  “the “ and “of “. But to be sure of representing any text, they’ll also need to include letters of the alphabet, and other symbols.
If given long strings of text, such as "as soon as", then large amounts of text can be replaced with one code, but the longer strings might not occur a lot.
Choosing a dictionary is hard work!

{panel end}


Choosing good entries for a dictionary is hard; the LZW method that we're about to look at has a clever way of making a dictionary that suits the particular language being compressed, and it builds the dictionary while the file is being compressed!

The interactive below demonstrates LZW compression.
You might want to have it open in a separate window to try things out while you read how it works below.

{interactive slug="lzw-compression" parameters="message-length=short" type="whole-page"}

## LZW Encoding

Initially the LZW encoder begins with a dictionary that can store up to 4096 strings of characters.
Codes 0 to 255 represent single character sequences (the alphabet, punctuation, etc).
The codes will need to be stored as binary numbers, therefore each code needs 12 bits to represent it in order to represent a total of 4096 entries (since 12 bits allows us to represent 4096 different values).

As the message is being compressed, at each step the encoder adds a new string of characters to the dictionary (filling in dictionary spots 255 - 4095).
Let’s use an example to step through how this happens.
This is the message we are wanting to encode:

`IAMSAMSAMIAM`

In this case, this is our initial dictionary (usually we would use 255 characters, as mentioned above, but let’s just keep things simple and only use the four characters in our string):

| Code | Bits         | Character String |
|------|--------------|------------------|
| 0    | 000000000000 | I                |
| 1    | 000000000001 | A                |
| 2    | 000000000010 | M                |
| 3    | 000000000011 | S                |

We use this dictionary to start encoding the message from the first character.

| Step | Current Sequence | Next Character | Code | New Dictionary Entry Code | New Dictionary Sequence |
|------|------------------|----------------|------|---------------------|-------------------|
| 1    | I                | A              | 0    | 4                   | IA                |

The first character is already in the dictionary, so we replace it with the corresponding dictionary code (`0`).
We also add the `current sequence + the next character` to the next available position in the dictionary (`4`).

Our dictionary now looks like this:

| Code | Code (Binary Representation) | Sequence |
|------|------------------------------|----------|
| 0    | 000000000000                 | I        |
| 1    | 000000000001                 | A        |
| 2    | 000000000010                 | M        |
| 3    | 000000000011                 | S        |
| 4    | 000000000100                 | IA       |

We then proceed to the next character in the message, adding a new sequence to the dictionary each with each step:

| Step | Current Sequence | Next Character | Code | New Dictionary Entry Code | New Dictionary Sequence |
|------|------------------|----------------|------|---------------------|-------------------|
| 2    | A                | M              | 1    | 5                   | AM                |
| 3    | M                | S              | 2    | 6                   | MS                |
| 4    | S                | A              | 3    | 7                   | SA                |
| 5    | AM               | S              | 5    | 8                   | AMS               |

In step 5, the sequence is `A`, and the next character is `M`.
But the sequence `AM` is already in the dictionary, so we replace the whole sequence with the corresponding dictionary code (`5`), and add `AMS` to the dictionary instead (as `S` is the next character).

| Step | Current Sequence | Next Character | Code | New Dictionary Entry Code | New Dictionary Sequence |
|------|------------------|----------------|------|---------------------|-------------------|
| 6    | SA               | M              | 7    | 9                   | SAM               |
| 7    | M                | I              | 2    | 10                  | MI                |
| 8    | IA               | M              | 4    | 11                  | IAM               |
| 9    | M                | -              | 2    | -                   | -                 |

When we have finished encoding the string, we now have a dictionary that looks like this:

| Code | Code (Binary Representation) | Sequence |
|------|------------------------------|----------|
| 0    | 000000000000                 | I        |
| 1    | 000000000001                 | A        |
| 2    | 000000000010                 | M        |
| 3    | 000000000011                 | S        |
| 4    | 000000000100                 | IA       |
| 5    | 000000000101                 | AM       |
| 6    | 000000000110                 | MS       |
| 7    | 000000000111                 | SA       |
| 8    | 000000001000                 | AMS      |
| 9    | 000000001001                 | SAM      |
| 10   | 000000001010                 | MI       |
| 11   | 000000001011                 | IAM      |

And the string has been replaced with a series of codes, each corresponding to a value in the dictionary.
`0 1 2 3 5 7 2 4 2`

To see just how much compression we achieved, let’s take a look at the binary behind the characters.
We'll assume that the characters are coded in 8 bits each (this is typical), based on UTF-8 coding (which is the same as ASCII for these characters).
In binary, originally our message looked like this:

```text
IAMSAMSAMIAM

01001001 01000001 01001101 01010011 01000001 01001101 01010011 01000001 01001101 01001001 01000001 01001101
```

The uncompressed version has 12 characters, each using 8 bits, so there are 92 bits used to store it.

And this is the compressed message:
```text
000000000000 000000000001 000000000010 000000000011 000000000101 000000000111 000000000010 000000000100 000000000010
```

The compressed version shown here uses only 9 LZW codes, but each is 12 bits each, so this version would use 108 bits.
This is more than the original, although we'll see later on (check out the "Representing the codes in fewer than 12 bits" panel at the end of this section) that there's an easy trick that can be used to reduce this to just 3 or 4 bits per code, so it would use no more than 4 x 9 = 36 bits, which is less than 40% of the original size.

We were encoding quite a short message, so the longest sequence in the dictionary is just three characters.
The longer the message that we are encoding, the longer these sequences can get, therefore allowing us to potentially represent reasonably long substrings with just one code, resulting in effective compression.
You can see this for yourself in the LZW compression interactive below:

{interactive slug="lzw-compression" parameters="message-length=long" type="whole-page"}

{panel type="challenge"}

# Challenge

This compression algorithm works best for text with plenty of repeated sequences.
To see this for yourself, try encoding the following string using the LZW interactive:

```text
The fox jumped over the lazy dog.
```

While this string is longer than the one used in our example, there are fewer repeated sequences and therefore not nearly as much opportunity for compression!

{panel end}


## LZW Decoding

Decoding a message from LZW is a little tricky, but makes an interesting puzzle.
The main point is that anything that has been encoded can be decoded to exactly the same as it was before it was compressed, but here's an illustration of how it works in case you're curious about how it's even possible.
Let’s now try to decode our encoded message.

The decoder starts with the same initial dictionary of single characters as the encoder (again, usually we would use 255 characters, but we’re keeping things simple and only using the four characters used in our string):

| Code | Bits         | Character String |
|------|--------------|------------------|
| 0    | 000000000000 | I                |
| 1    | 000000000001 | A                |
| 2    | 000000000010 | M                |
| 3    | 000000000011 | S                |

The encoded message is as follows (we've shown each 12-bit code as a decimal number):

```text
0 1 2 3 5 7 2 4 2
```

The initial dictionary has values for codes `0 - 3`, so what is the decoder meant to do when it gets to `4`?
Well, at each step it makes an addition to the dictionary, just as the encoder did.
We’ll walk through this step by step:

| Step | Code | Output | New Dictionary Entry Code | New Dictionary Sequence | Next Proposed Dictionary Sequence |
|------|------|--------|---------------------|-------------------|-----------------------------|
| 1    | 0    | I      | -                   | -                 | I?                          |

The first code in the encoded message is `0`.
`0` is in the initial dictionary, so 0 is decodes to the letter `I` with the corresponding sequence (`I`), so our message now looks like this:

```text
I
```

The decoder knows that `I` followed by the next character must be the next string to add to the dictionary.

We then continue to the next character:

| Step | Code | Output | New Dictionary Entry Code | New Dictionary Sequence | Next Proposed Dictionary Sequence |
|------|------|--------|---------------------|-------------------|-----------------------------|
| 2    | 1    | A      | 4                   | IA                | A?                          |

In step 2, the code is `1`, which is also in the initial dictionary so we output the corresponding value (A), so our message now looks like this:

```text
I A
```

Now, recall that the decoder knows that `I + <the next character>` must be the next dictionary entry.
	The decoder just discovered that the next character is A, so the sequence is:

```text
Sequence  = I + the next character
	      = I + A
		  = IA
```

`IA` is not already in the dictionary, so it is added and assigned to the code 4.
The docoder’s dictionary now looks like this:

| Code | Bits         | Sequence |
|------|--------------|----------|
| 0    | 000000000000 | I        |
| 1    | 000000000001 | A        |
| 2    | 000000000010 | M        |
| 3    | 000000000011 | S        |
| 4    | 000000000100 | IA       |

And we continue on to the next few characters in the message:

| Step | Code | Output | New Dictionary Entry Code | New Dictionary Sequence | Next Proposed Dictionary Sequence |
|------|------|--------|---------------------|-------------------|-----------------------------|
| 3    | 2    | M      | 5                   | AM                | M?                          |
| 4    | 3    | S      | 6                   | MS                | S?                          |
| 5    | 5    | AM     | 7                   | SA                | AM?                         |

In step 5 we have to decode 5.
Recall that 5 wasn’t in the initial dictionary, but since we added it in step 2 are able to decode it.

| Step | Code | Output | New Dictionary Entry Code | New Dictionary Sequence | Next Proposed Dictionary Sequence |
|------|------|--------|---------------------|-------------------|-----------------------------|
| 6    | 7    | SA     | 8                   | AMS               | SA?                         |
| 7    | 2    | M      | 9                   | SAM               | M?                          |
| 8    | 4    | IA     | 10                  | MI                | IA?                         |
| 9    | 2    | M      | 11                  | IAM               | M?                          |

Once we have decoded the whole message we now have the following string:

```text
IAMSAMSAMIAM
```

So we successfully encoded and decoded the message!
And this is the dictionary that the decoder created:

| Code | Bits         | Sequence |
|------|--------------|----------|
| 0    | 000000000000 | I        |
| 1    | 000000000001 | A        |
| 2    | 000000000010 | M        |
| 3    | 000000000011 | S        |
| 4    | 000000000100 | IA       |
| 5    | 000000000101 | AM       |
| 6    | 000000000110 | MS       |
| 7    | 000000000111 | SA       |
| 8    | 000000001000 | AMS      |
| 9    | 000000001001 | SAM      |
| 10   | 000000001010 | MI       |
| 11   | 000000001011 | IAM      |

Notice that it is exactly the same dictionary as the encoder created &ndash; the dictionary has been reconstructed without having to send it to the decoder!


{panel type="extra-for-experts"}

# Other languages

But what about different languages?
Since the dictionary builds up based on the characters it has seen, it will simply adapt to whatever language is being used, whether it is English, French, Chinese, or even a computer programming language.
Each language will have its own common substrings, and these will end up in the dictionary.

{panel end}

{panel type="extra-for-experts"}

# Representing the codes in fewer than 12 bits

While the dictionary is being built initially it doesn’t make sense to use 12 bits to store so few entries.
Instead, while there are fewer than 4 entries we could use 2 bits, when there are more than 4 but fewer than 8 entries we could used 3 bits, etc.
Eventually the dictionary will fill all 4096 (12 bit) entries, then what do we do?
There are different ways to deal with this: a simple system just keeps the dictionary the same from then on and hopes the nature of the text doesn’t change.
Another option is to start over with a completely new dictionary.
A compromise would be to monitor the amount of compression and reset the dictionary if it is getting worse.

{panel end}
