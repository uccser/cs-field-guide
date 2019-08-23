# What's the big picture?

Common forms of compression that are currently in use include JPEG (used for photos), MP3 (used for audio), MPEG (used for videos including DVDs), and ZIP (for many kinds of data).
For example, the JPEG method reduces photos to a tenth or smaller of their original size, which means that a camera can store 10 times as many photos, and images on the web can be downloaded 10 times faster.

So what's the catch?
Well, there can be an issue with the quality of the data &ndash; for example, a highly compressed JPEG image doesn't look as sharp as an image that hasn't been compressed.
Also, it takes processing time to compress and decompress the data.
In most cases, the tradeoff is worth it, but not always.

{interactive slug="compression-comparer" type="in-page"}

In this chapter we'll look at how compression might be done, what the benefits are, and the costs associated with using compressed data that need to be considered when deciding whether or not to compress data.

We'll start with a simple example &ndash; Run Length Encoding &ndash; which gives some insight into the benefits and the issues around compression.

{panel type="teacher-note"}

# Locked-in activity

An intriguing activity that relates to compression is the ["locked-in" activity](http://www.cs4fn.org/lockedin.html) from CS4FN.
In this activity, students simulate writing some text using a method used by Jean-Dominique Bauby, who was completely unable to move except for blinking one eye.
With a simple binary interface (blinking or not blinking) he was able to author an entire book.
It is well worth getting students to work in pairs, and have one try to communicate a word or short phrase strictly by blinking only.
It raises many questions, including how it could be done in the shortest time and with the minimum effort.
Of course, the first step is to work out how to convey any text at all!

{panel end}
