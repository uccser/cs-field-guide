# QR codes

{video url="https://vimeo.com/675710457"}

Quick Response codes, usually called QR codes, are a great way to transmit data from paper to a digital device.
All you need to read them is a camera on a mobile device (which is pretty common these days).
In fact, most QR codes can be read within a camera app, although if you’re experimenting with them, it can be worth installing a custom QR code scanner app that can give you more details about the contents of the code.

Try scanning the following QR code by pointing a mobile phone camera at it (on some phones you may need to adjust the settings so that a camera recognises a QR code).
This pattern represents the very simple text “ABCDEFG”.

{image file-path="img/chapters/qr-code-abcdefg.png" alt="A QR code that contains the string 'ABCDEFG'."}

The black and white squares on the code just represent binary digits (bits), which might be interpreted as text, URLs, or even pictures.
The bits include information about what kind of data it contains.

QR codes are used in all sorts of situations - advertising, making payments, providing information, contact tracing, and even headstones.
Because they are often in public places, they might be read under poor lighting conditions and are vulnerable to damage, so they rely on error correction codes to make sure the data can be scanned reliably.

## Experiments with QR codes

{panel type="project" expanded="always"}

# Exercise: The game of “will it scan?”

Look for QR codes that you come across in your daily life.
Find examples of ways that they can be “damaged” e.g. torn paper, bad lighting, glare and reflections on glass, or accidental markings.
Try scanning them with a QR reader.
Include scanning the back of a QR code in a window, and try odd angles.
How often do imperfect codes still scan?

{panel end}

{panel type="project" expanded="always"}

# Exercise: Testing the limits by damaging a QR code

Print out a couple of copies of a QR code.
You can either make one online using a free QR code generator, or print out the PDF file below.

{button-link link="files/test-qr-codes.pdf" file="yes" text="Test QR Codes"}

- Scan the printed QR code to check that it works.
- Now colour in one of the white squares with a black pen, so that you’re changing one of the binary digits (bits).
  Hint: *Don’t* colour in near the three large squares in the corners, as most QR scanners need these to align the image.
- Scan your “damaged” QR code again.
  Did changing one of the bits change how it scanned?
- Now try colouring in a second white square (bit), or you can use white-out and change a black square to white.
- Does the image with two changed bits still give the same message?
- Try changing about 5 of the bits.
  Does it still scan?
  What about 10 bits?
- At some point it will refuse to scan the code.
  Try to find out how many bits you need to change to make this happen.

{panel end}

In the previous exercise, you should have found that a small number of changes to the bits doesn’t cause a change in the message.
What is happening here is exactly the same principle that’s at work in the parity magic trick.
When one bit is changed (either white to black, or black to white), it’s easy for the software to detect that this has happened, and it can change it back.
However, QR codes use a stronger error control code than the parity trick; even if you change several bits, it can usually work out the original message.
This is error *correction* at work.

Eventually, when too many bits are changed, QR codes can’t make the correction.
What’s really impressive is that they still perform error *detection*: they won’t read the data incorrectly, instead they just refuse to give any data at all, rather than giving you incorrect data.
You would have been able to do this in the parity trick if someone changed two or more cards.
You can tell something is wrong, but you can’t be sure about how to fix it.
The main thing is that at least you know that something is wrong.

The “damage” to the data (such as colouring in a white square on a QR code) is causing an error in the data; it is sometimes referred to as “corruption” of the data, or “noise”.
On a QR code, data corruption could be caused by things like splashing the surface, getting ripped from wear and tear, people bumping it and leaving a mark, or light reflecting off the paper and creating a bright spot where it should be black.
In situations other than QR codes, it is caused by physical damage to disks (such as scratching a DVD), and in data transmission it might come from electrical interference messing with wifi transmission, or unreliable equipment randomly changing some of the transmission.

The powerful method that QR codes use to deal with data corruption is called Reed-Solomon error correction, which we’ll discuss in the next section.

{panel type="jargon-buster"}

# Forward error correction (FEC)

This is when enough extra bits are added to data so that when it is received, reconstruction of the data can happen even when some of the bits are corrupted.
It’s putting a little extra information into the data in advance (forward) so that it can be corrected if necessary.
The parity magic trick is a form of FEC, and QR codes use the Reed-Solomon method for FEC.

{panel end}

{panel type="jargon-buster"}

# Automatic repeat request (ARQ)

This is an error control system where an error in the data can be detected, but it can’t be corrected, so the sender has to be asked to repeat the data transmission.
This happens when scanning product codes on grocery items; if the check digit doesn’t match, an error is detected.
The scanner will give an error message, and the user has to scan the product again (repeat the transmission).
It also happens with credit cards (which use the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm)) - if you type a credit card number incorrectly into a website, it will usually just ask you to type it again (a repeat request) and certainly won’t try to correct it.
ARQ doesn’t need as much extra space for the error control digits, but you have to be in a position to have the data sent again.
On a QR code, that would involve asking the owner to provide a new copy, which isn’t very practical.
This is why QR codes rely on FEC.

{panel end}

## Reed-Solomon error correction

The Reed-Solomon method, used in QR codes, works in a similar way to the parity error correction used earlier in this chapter - it adds extra bits to the data so that errors can be corrected.
However, the Reed-Solomon code is able to deal with a lot more errors in the data than the parity method can.
Reed-Solomon error correction has been around since 1960, and remains one of the most widely used ways of dealing with errors introduced accidentally when data is stored.
It is used for hard disks and optical disks (CDs, DVDs and Blu-ray), and, of course, QR codes.
The Reed-Solomon method is a form of Forward Error Correction, which is important on file storage devices: if an error is detected in a file on a disk that was saved a year ago, you can’t travel back in time and ask someone to save another copy.
(Actually, you kind of can travel back in time: if someone made a backup of the file a year ago, you could use that, but small errors occur in storage devices regularly, so it’s not ideal to go to backups every time there’s a small failure in a disk.)

{panel type="curiosity"}

# Fun fact

Reed-Solomon error correction is also used by the Voyager spacecraft to make sure data sent back from the edge of the solar system can be reconstructed if it encounters interference - which is very likely!
Signals from Voyager 1 can take 20 hours to get to earth, so an ARQ (asking for it to retransmit if the data has an error) would be very impractical.

{panel end}

{panel type="jargon-buster"}

# Channel coding

Forward error correction is sometimes called **channel coding**, because it adjusts how the data is represented in advance to protect it against problems likely to be caused by the channel it is being transmitted through.
It’s called a channel even if (in the case of storage), the data is basically being transmitted through time to a future user.

{panel end}

{panel type="jargon-buster"}

# Code-rate and overhead

The **code-rate** of an error correction method is based on how much of the final coded message contains the original data.
For example, with a 5x5 grid of bits that we used in the parity trick (25 bits in the data) there were 11 bits added (the extra row and column), giving 36 bits in total.
In this case the **code-rate** is 25/36, which is about 69.4%.
In other words, only about 69.4% of the data is useful to the end user.
The rest (30.6% of the data) is **overhead**, which is there just in case the data gets corrupted along the way.
Of course, this is way better than sending the data twice, because that would be a code-rate of 50% and the overhead is 50%, since the original data was only half of the data that ended up being sent.
In general, if \(k\) bits of useful data are represented using \(n\) bits in total, the code-rate is \(k/n\).
If you have no error correction bits added, the code-rate is 100%, but you’ll never know if the data has been corrupted!

{panel end}

{panel type="project"}

# Exercise: Calculating code-rate and overhead

If a 9x9 block of data has a parity row and column added to it, what is the code-rate and overhead?

Hint: the 9x9 block has 81 bits in it, so you’ll want to work out how many bits there are after the extra column and row of parity bits have been added.

{panel type="spoiler"}

# Exercise answers

The code-rate is 81%, and the overhead is 19%, but how was it calculated?

{panel end}

{panel end}

The maximum number of errors that a Reed-Solomon code can correct is one half of the amount of extra error correcting data added to it.
This means that if k bits of useful data are represented using n bits in total, the maximum number of bit errors that can be corrected, is \((n-k)/2\).
For example, if a QR code has 55 bytes of data, and 14 bytes of error correction added, then it can correct up to 7 bytes (56 bits) of errors.
In this case, \(n=55+14\) and \(k=55\), so the rate is 79.7%. Reed-Solomon codes can detect twice as many errors as they can correct, so it can detect up to \(n-k\) errors (14 bytes in the example).
It will probably detect errors if there are more than that many, but at that stage there are so many errors that it might accidentally be treated as an error correction situation for some different data.

A key feature of Reed-Solomon codes is that the code-rate \((k/n)\) can be adjusted depending on how many errors are expected.
In the case of QR codes, a mark or splash on the code could easily change several of the bits, and by using a lower code-rate (more redundant bits), larger amounts of corruption can be tolerated.
A simplistic way of thinking of Reed-Solomon codes is that they are like the parity error correction method, except instead of being based on single bits being added to a row of data, they are based on much larger groups of bits being added - the “parity” in this case is multiple bits.
This allows for the code-rate to be adjusted, and also copes well with a lot of adjacent bits being corrupted (for example, when there’s a scratch on a DVD, a burst of interference in a radio transmission, or dirt splashed on a QR code).

## The QR code standard

{image file-path="img/chapters/qr-code-abcdefg.png" alt="A QR code that contains the string 'ABCDEFG'."}

The layout of a QR code is based on a standard that shows where different elements are stored in the code
There are 40 possible sizes (called “versions”), and each has 4 different encodings for the data (numeric, alphanumeric, byte and Kanji), and also a choice of 4 error correction levels (low, medium, quartile, and high).
Each black or white square (“dot” or “module”) corresponds to one bit of data.
The example at the start of this section is the smallest size QR code (version 1), and is 21 dots wide and 21 dots tall.
Some of the dots are used up for the alignment markers.

The error correction levels indicate how much of the QR code is used up for error correction.
The highest level means that 30% of the data can be corrupted, yet still be corrected.
The example above uses low error correction, which means that it can only correct the data if no more than 7% of the data is changed.

For the “quartile” level of error correction, which can correct up to 25% of the data being corrupted, about half of the data in the QR code is used for error correction.
For example, a Version 3 QR code (29x29 dots) holds 70 bytes of information, and to get quartile level error correction, it needs to use 34 of the bytes for the data, and 36 bytes for Reed-Solomon codes, which means that the code-rate is 34/70, or 48.5%.
That might seem wasteful, but it’s incredibly resilient to errors.

The “low” level of error detection of Version 3 QR codes had 55 bytes for data and 15 bytes for Reed-Solomon codes, which is a rate of 78.6%, yet it can still correct the information if up to 7% of the data (about 5 bytes, or 40 dots) is corrupted.
(Theoretically Reed-Solomon codes should be able to deal with about 10% of the data being corrupted in this situation, but there’s a bit more going on in the details that we haven’t covered here!)

In contrast, the 5x5 block of data with parity error correction (used in the magic trick earlier in this chapter) could correct only 1 bit error out of the 25 data bits, which is 4% of the data being corrupted.
However, for this case, the code-rate is 25/36, or 69%, since the 25 bits had 11 extra bits added to them.
So Reed-Solomon codes can get a good level of error correction without having to have the code-rate too low.

{panel type="project"}

# Experiment

{image file-path="img/chapters/qr-code-abcdefg.png" alt="A QR code that contains the string 'ABCDEFG'."}

For the Level 1 QR code above, change one dot at a time, scanning the QR code after each change, and find out at what point it is unable to correct the error.
What percentage of corruption is this code able to deal with?

{panel end}
