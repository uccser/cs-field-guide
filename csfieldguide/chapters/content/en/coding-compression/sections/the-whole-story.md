# The whole story!

The details of how compression systems work have been glossed over in this chapter, as we have been more concerned about the file sizes and speed of the methods than how they work.
Most compression systems are variations of the ideas that have been covered here, although one fundamental method that we haven't mentioned is Huffman coding, which turns out to be useful as the final stage of *all* of the above methods, and is often one of the first topics mentioned in textbooks discussing compression (there's a brief [explanation of it here](http://www.cimt.org.uk/resources/codes/codes_u17_text.pdf)).
A closely related system is Arithmetic coding (there's an [explanation of it here](http://www.cimt.org.uk/resources/codes/codes_u18_text.pdf)).
Also, video compression has been omitted, even though compressing videos saves more space than most kinds of compression.
Most video compression is based on the "MPEG" standard (Moving Pictures Experts Group).
There is some information about how this works in the [CS4FN article on "Movie Magic"](http://www.cs4fn.org/films/mpegit.php).

{panel type="teacher-note"}

# Teacher guides for Plymouth resources

Access to teacher guides for the Plymouth resources (linked in the previous paragraph) above are [available here](http://www.cimt.org.uk/resources/codes/).

{panel end}

The Ziv-Lempel method shown is a variation of the so-called "LZ77" method.
Many of the more popular lossless compression methods are based on this, although there are many variations, and one called "LZW" has also been used a lot.
Another high-compression general-purpose compression method is bzip, based on a very clever method called the Burrows-Wheeler Transform.

Questions like "what is the most compression that can be achieved?" are addressed by the field of [information theory](https://en.wikipedia.org/wiki/Information_theory).
There is an [activity on information theory on the CS Unplugged site](http://csunplugged.org/information-theory), and there is a [fun activity that illustrates information theory](http://www.math.ucsd.edu/~crypto/java/ENTROPY/).
Based on this theory, it seems that English text can't be compressed to less than about 12% of its original size at the very best.
Images, sound and video can get much better compression because they can use lossy compression, and don't have to reproduce the original data exactly.

{comment xtcb jargon uncompressed are typically BMP or RAW. TIFF files Tagged Image File Format can contain many formats, including uncompressed, runlength and JPEG.}
