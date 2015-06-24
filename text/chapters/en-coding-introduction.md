# Coding Introduction

{teacher}
This chapter supports the "coding" part of the NZ achievement standard AS91371 (2.44). The topic of "coding" is broken into three subtopics, and these are covered in one chapter each, so this chapter is just in introduction and overview. For the standard, students need to describe *each of the three encoding topics* in order to get achieved, and do a more in-depth project on just one in order to get merit or excellence.
{teacher end}

## What's the big picture?

The word "code" has lots of meanings in computer science. It's often used to talk about programming, and a program can be referred to as "source code". However, in this chapter (and the next three chapters), we will use it to talk about representing information in useful ways, such as secret codes. In the previous chapter we looked at using binary representations to store all kinds of data --- numbers, text, images and more. But often simple binary representations aren't so useful. Sometimes they take up too much space, sometimes small errors in the data can cause big problems, and sometimes we worry that someone else could easily read our messages. Most of the the time all three of these things are a problem! The codes that we will look overcome all of these problems, and are widely used for storing and transmitting important information.

The three main reasons that we use more complex representations of binary data are:
- **Compression:** this reduces the amount of space the data needs (for example, coding an audio file using MP3 compression can reduce the size of an audio file to well under 10% of its original size)
- **Encryption:** this changes the representation of data so that you need to have a "key" to unlock the message (for example, whenever your browser uses "https" instead of "http" to communicate with a website, encryption is being used to make sure that anyone eavesdropping on the connection can't make any sense of the information)
- **Error Control:** this adds extra information to your data so that if there are minor failures in the storage device or transmission, it is possible to detect that the data has been corrupted, and even reconstruct the information (for example, every bar code has an extra digit added to it so that if the bar code is scanned incorrectly in a checkout, it makes a warning sound instead of charging you for the wrong product).

Often all three of these are applied to the same data; for example, a photo taken on a camera is often compressed using JPG, stored on the camera card with error correction, and stored on a backup disk with encryption so that if the disk was stolen the data couldn't be accessed.

{comment}or uploaded through a wireless connection using an encryption protocol.{comment end}

Without these forms of coding, digital devices would be very slow, have limited capacity, be unreliable, and be unable to keep your information private.

{teacher}
The 2.44 standard requires that students show a basic understanding of all three kinds of coding to get the achieved level, but only one of the three needs to be investigated to the excellence level. The standard is focussed on practical applications of coding, which is a valuable motivator: what would go wrong in a student's world if coding didn't happen (mp3 players would store very few songs; online banking wouldn't be possible; and data on computers couldn't be trusted to stay accurate).

Despite the focus on practical applications, we recommend that you get students to investigate a basic algorithm for each of the topics, and this is included in the three following chapters. It's a bit more than the standard requires, but it is ideal that students will go away from this understanding what each of these three topics is about, and knowing how the algorithms work for some simple examples will help them to see the importance of coding. Simple examples are:
- Error control coding: The Parity Trick (or ISBN/ Food barcodes)
- Encryption: Caesar Cipher (not a good encryption method, but is suitable for explaining terminology)
- Compression: Run length encoding (a simple compression method that was used for Fax machines), Ziv-Lempel compression (a method that is fairly easy to understand in principle, and is widely used for zip files, GIF images, and more).

The Merit and Excellence levels will require a discussion and evaluation of a widely used technology. Ideas are provided in the chapters; examples are:
- Error control coding: ISBN book numbers, food barcodes, or possibly RAID disks
- Encryption: the HTTPS protocol or the PGP encryption system are easy to access.
- Compression: Commonly used methods are JPEG (for photos), MP3 and AAC (for audio), zip and rar (for general files), and GIF and PNG (for simple images). Issues that can be investigated include lossy versus lossless compression, and the tradeoffs between them. Students will probably do this either using lossless algorithms that are used for file compression, or lossy algorithms that are used for image and sound compression.
{teacher end}

## The whole story!

The idea of encoding data to make the representation more compact, robust or secure is centuries old, but the solid theory needed to support codes in the information age was developed in the 1940s --- not surprisingly considering that technology played such an important role in World War II, where efficiency, reliability and secrecy were all very important.
One of the most celebrated researchers in this area was Claude Shannon, who developed the field of "information theory", which is all about how data can be represented effectively.

A key concept in Shannon's work is a measure of information called "entropy", which  established mathematical limits like how small files could be compressed, and how many extra bits must be added to a message to achieve a given level of reliability.
While the idea of entropy is beyond the scope of this section, there are some fun games that provide a taste of how you could measure information content by guessing what letter comes next; there's an Unplugged activity called []Twenty Guesses](http://csunplugged.org/information-theory), and an [online game for guessing sentences](http://www.math.ucsd.edu/~crypto/java/ENTROPY).

## Further reading

James Gleick's book [The Information: A History, a Theory, a Flood](http://www.amazon.com/The-Information-History-Theory-Flood/dp/1400096235) provides an interesting view of the history of several areas relating to coding.

### Useful Links

- A good collection of resources related to all three kinds of coding is available in the [Bletchley Park Codes Resources](http://www.cimt.plymouth.ac.uk/resources/codes/)
- [Entropy and information theory](http://en.wikipedia.org/wiki/Entropy_(information_theory))
- [History of information theory and its relationship to entropy in thermodynamics](http://en.wikipedia.org/wiki/History_of_entropy#Information_theory)
- [Timeline of information theory](http://en.wikipedia.org/wiki/Timeline_of_information_theory)_
- [Shannon's seminal work in information theory](http://en.wikipedia.org/wiki/A_Mathematical_Theory_of_Communication)
