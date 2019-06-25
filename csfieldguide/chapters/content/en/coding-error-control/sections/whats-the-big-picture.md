# What's the big picture?

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

By the end of this chapter, you should understand the basic idea of error control coding, the reasons that we require it, the differences between algorithms that can detect errors and those that can both detect and correct errors, and some of the ways that error control coding is used. In particular parity (focussing on the parity magic trick) and the check digits used to ensure book numbers, barcode numbers, and credit card numbers are entered correctly.
