# General purpose compression

General purpose compression methods need to be lossless because you can't assume that the user won't mind if the data is changed.
The most widely used general purpose compression algorithms (such as ZIP, gzip, and rar) are based on a method called "Ziv-Lempel coding", invented by Jacob Ziv and Abraham Lempel in the 1970s.

We'll look at this with a text file as an example.
The main idea of Ziv-Lempel coding is that sequences of characters are often repeated in files (for example, the sequence of characters "image " appears often in this chapter), and so instead of storing the repeated occurrence, you just replace it with a reference to where it last occurred.
As long as the reference is smaller than the phrase being replaced, you'll save space.
Typically the systems based on this approach can be used to reduce text files to as little as a quarter of their original size, which is almost as good as any method known for compressing text.

The following interactive allows you to explore this idea.
The empty boxes have been replaced with a reference to the text occurring earlier.
You can click on a box to see where the reference is, and you can type the referenced characters in to decode the text.
What happens if a reference is pointing to another reference?
As long as you decode them from first to last, the information will be available before you need it.

{comment xhtml5 Eventually this could use a parameter so there's one version with no tabs, and a later one with them.}

{button-link link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/COMPRESSION/LWZ/public_html/index.html" text="View compression interactive"}

{comment xjrm (or Rhem): pasting text in that is too big causes it to be rejected. It would be nicer if the pasted text is truncated to the maximum length.}

You can also enter your own text by clicking on the "Text" tab.
You could paste in some text of your own to see how many characters can be replaced with references.

The references are actually two numbers: the first says how many characters to count back to where the previous phrase starts, and the second says how long the referenced phrase is.
Each reference typically takes about the space of one or two characters, so the system makes a saving as long as two characters are replaced.
The options in the interactive above allow you to require the replaced length to be at least two, to avoid replacing a single character with a reference.
Of course, all characters count, not just letters of the alphabet, so the system can also refer back to the white spaces between words.
In fact, some of the most common sequences are things like a full stop followed by a space.

This approach also works very well for black and white images, since sequences like "10 white pixels" are likely to have occurred before.
Here are some of the bits from the example earlier in this chapter; you can paste them into the interactive above to see how many pointers are needed to represent it.

```
011000010000110
100000111000001
000001111100000
000011111110000
000111111111000
001111101111100
011111000111110
111110000011111
```

In fact, this is essentially what happens with GIF and PNG images; the pixel values are compressed using the Ziv-Lempel algorithm, which works well if you have lots of consecutive pixels the same colour.
But it works very poorly with photographs, where pixel patterns are very unlikely to be repeated.

{comment xtcb extra for experts: compress "aaaaaaaaaa". how can it decode? .. xtcb  Project .. Students should try an algorithm [zip, gzip etc.] on several different text files, image files, sound files, and video files. .. What would happen if text compression was lossy? (I think this should be a part of their merit discussion)}

{panel type="teacher-note"}

# Unplugged activity on Ziv-Lempel approach

The [CS Unplugged site has activities and information about the Ziv-Lempel approach](http://csunplugged.org/text-compression),
and the ["Computing Science Inside" site also has an activity based on this method](https://web.archive.org/web/20150311225517/http://csi.dcs.gla.ac.uk/workshop-view.php?workshopID=1).
The CS4FN site discusses [a related approach which is a little simpler, but not so useful in practice](http://www.cs4fn.org/internet/crushed.php).

{panel end}

{panel type="curiosity"}

# ZL or LZ compression?

The method we have described here is named "Ziv-Lempel" compression after Jacob Ziv and Abraham Lempel, the two computer scientists who invented it in the 1970s.
Unfortunately someone mixed up the order of their names when they wrote an article about it, and called it "LZ" compression instead of "ZL" compression.
So many people copied the mistake that Ziv and Lempel’s method is now usually called "LZ compression"!

{panel end}
