# What's the big picture?

{panel type="teacher-note"}

# Using the parity trick in a classroom

The parity magic trick can be an intriguing introduction to the idea of error correction, and we recommend using it at the start of teaching this topic.
You need to practise it in advance, and for high school students we recommend a grid of about 7x7 or 8x8 cards to have a good impact.
Details are in the [Card flip magic section](http://csunplugged.org/error-detection) of the [CS Unplugged site](https://www.csunplugged.org/).

{panel end}

{video url="https://www.youtube.com/embed/OXz64qCjZ6k?rel=0"}

The parity magic trick (in the video above) enables the magician to detect which card out of dozens has been flipped over while they weren't looking.
The magic in the trick is actually computer science, using the same kind of technique that computers use to detect and correct errors in data.
We will talk about how it works in the next section.

The same thing is happening to data stored on computers --- while you (or the computer) is looking away, some of it might accidentally change because of a minor fault.
When the computer reads the data, you don't want it to just use the incorrect values.
At the least you want it to detect that something has gone wrong, and ideally it should do what the magician did, and put it right.

This chapter is about guarding against errors in data in its many different forms --- data stored on a harddrive, on a CD, on a floppy disk, on a solid state drive (such as that inside a cellphone, camera, or mp3 player), data currently in RAM (particularly on servers where the data correctness is critical), data going between the RAM and hard drive or between an external hard drive and the internal hard drive, data currently being processed in the processor or data going over a wired or wireless network such as from your computer to a server on the other side of the world.
It even includes data such as the barcodes printed on products or the number on your credit card.

If we don't detect that data has been changed by some physical problem (such as small scratch on a CD, or a failing circuit in a flash drive), the information will just be used with incorrect values.
A very poorly written banking system could potentially result in your bank balance being changed if just one of the bits in a number was changed by a cosmic ray affecting a value in the computer's memory!
If the barcode on the packet of chips you buy from the shop is scanned incorrectly, you might be charged for shampoo instead.
If you transfer a music file from your laptop to your mp3 player and a few of the bits were transferred incorrectly, the mp3 player might play annoying glitches in the music.
Error control codes guard against all these things, so that (most of the time) things just work without you having to worry about such errors.

There are several ways that data can be changed accidentally.
Networks that have a lot of "noise" on them (caused by poor quality wiring, electrical interference, or interference from other networks in the case of wireless).
The bits on disks are very very small, and imperfections in the surface can eventually cause some of the storage to fail.
The surfaces on compact disks and DVDs are exposed, and can easily be damaged by storage (e.g. in heat or humidity) and handling (e.g. scratches or dust).
Errors can also occur when numbers are typed in, such as entering a bank account number to make a payment into, or the number of a container that is being loaded onto a ship.
A barcode on a product might be slightly scratched or have a black mark on it, or perhaps the package is bent or is unable to be read properly due to the scanner being waved too fast over it.
Bits getting changed on permanent storage (such as hard drives, optical disks, and solid state drives) is sometimes referred to as data rot, and the [wikipedia page on bit rot](https://en.wikipedia.org/wiki/Data_degradation) has a list of more ways that these errors can occur.

Nobody wants a computer that is unreliable and won’t do what it's supposed to do because of bits being changed!
So, how can we deal with these problems?

Error control coding is concerned with detecting when these errors occur, and if practical and possible, correcting the data to what it is supposed to be.

Some error control schemes have error correction built into them, such as the parity method that was briefly introduced at the beginning of this section.
You might not understand yet how the parity trick worked, but after the card was flipped, the magician *detected* which card was flipped, and was able to *correct* it.

Other error control schemes, such as those that deal with sending data from a server overseas to your computer, send the data in very small pieces called packets (the network protocols chapter talks about this) and each packet has error detection information added to it.

Error detection is also used on barcode numbers on products you buy, as well as the unique ISBN (International Standard Book Number) that all books have, and even the 16 digit number on a credit card.
If any of these numbers are typed or scanned incorrectly, there's a good chance that the error will be detected, and the user can be asked to re-enter the data.

By the end of this chapter, you should understand the basic idea of error control coding, the reasons that we require it, the differences between algorithms that can detect errors and those that can both detect and correct errors, and some of the ways that error control coding is used, in particular parity (focussing on the parity magic trick) and the check digits used to ensure book numbers, barcode numbers, and credit card numbers are entered correctly.
