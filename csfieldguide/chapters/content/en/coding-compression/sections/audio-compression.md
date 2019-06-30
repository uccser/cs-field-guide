# Audio compression

One of the most widely used methods for compressing music is MP3, which is actually from a video compression standard called MPEG (Moving Picture Experts Group).

{panel type="curiosity"}

# The naming of MP3

The name "MP3" isn't very self explanatory because the "MP" stands for "moving picture", and the 3 is from version 1, but MP3 files are used for music!

The full name of the standard that it comes from is MPEG, and the missing "EG" stands for "experts group", which was a consortium of companies and researchers that got together to agree on a standard so that people could easily play the same videos on different brands of equipment (so, for example, you could play the same DVD on any brand of DVD player).
The very first version of their standards (called MPEG-1) had three methods of storing the sound track (layer 1, 2 and 3).
One of those methods (MPEG-1 layer 3) became very popular for compressing music, and was abbreviated to MP3.

The MPEG-1 standard isn't used much for video now (for example, DVDs and TV mainly use MPEG-2), but it remains very important for audio coding.

The next MPEG version is MPEG-4 (MPEG-3 was redundant before it became a standard).
MPEG-4 offers higher quality video, and is commonly used for digital video files, streaming media, Blu-Ray discs and some broadcast TV.
The AAC audio compression method, used by Apple among others, is also from the MPEG-4 standard.
On computers, MPEG-4 Part 14 is commonly used for video, and it's often abbreviated as "MP4."

So there you have it: MP3 stands for "MPEG-1 layer 3", and MP4 stands for "MPEG-4 part 14".

{panel end}

Most other audio compression methods use a similar approach to the MP3 method, although some offer better quality for the same amount of storage (or less storage for the same quality).
We won't go into exactly how this works, but the general idea is to break the sound down into bands of different frequencies, and then represent each of those bands by adding together the values of a simple formula (the sum of cosine waves, to be precise).

{comment xtcb sometime could put in an expert section on this, perhaps with recordings or a filter showing the waveforms and adding them. Here are some links in the meantime:}

There is some [more detail about how MP3 coding works on the cs4fn site](http://www.cs4fn.org/mathemagic/sonic.html), and also in [an article on the I Programmer site](http://www.i-programmer.info/babbages-bag/1222-mp3.html).

Other audio compression systems that you might come across include AAC, ALAC, Ogg Vorbis, and WMA.
Each of these has various advantages over others, and some are more compatible or open than others.

The main questions with compressed audio are how small the file can be made, and how good the quality is of the human ear.
(There is also the question of how long it takes to encode the file, which might affect how useful the system is).
The tradeoff between quality and size of audio files can depend on the situation you're in: if you are jogging and listening to music then the quality may not matter so much, but it's good to reduce the space available to store it.
On the other hand, someone listening to a recording at home on a good sound system might not mind about having a large device to store the music, as long as the quality is high.

To evaluate an audio compression you should choose a variety of recordings that you have high quality originals for, typically on CD (or using uncompressed WAV or AIFF files).
Choose different styles of music, and other kinds of audio such as speech, and perhaps even create a recording that is totally silent.
Now convert these recordings to different audio formats.
One system for doing this that is free to download is Apple's iTunes, which can be used to rip CDs to a variety of formats, and gives a choice of settings for the quality and size.
A lot of other audio systems are able to convert files, or have plugins that can do the conversion.

Compress each of your recordings using a variety of methods, making sure that each compressed file is created from a high quality original.
Make a table showing how long it took to process each recording, the size of the compressed file, and some evaluation of the quality of the sound compared with the original.
Discuss the tradeoffs involved – do you need much bigger files to store good quality sound? Is there a limit to how small you can make a file and still have it sounding ok? Do some methods work better for speech than others? Does a 2 minute recording of silence take more space than a 1 minute recording of silence? Does a 1 minute recording of music use more space than a minute of silence?

{comment xtcb could have a section on Huffman coding sometime (remove from "the whole story")}
