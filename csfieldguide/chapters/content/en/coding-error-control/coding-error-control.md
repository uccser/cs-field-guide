# Coding - Error control

This chapter is about guarding against errors in data in its many different forms: data stored on a hard drive, CD, floppy disk or solid state drive (such as that inside a cellphone, camera, or MP3 player); data currently in RAM (particularly on servers where the data correctness is critical); data going between the RAM and hard drive or between an external hard drive and the internal hard drive; data currently being processed in the processor; or data going over a wired or wireless network such as from your computer to a server on the other side of the world.
It even includes data such as the barcodes printed on products or the number on your credit card.

If we don't detect that data has been changed by some physical problem (such as small scratch on a CD, or a failing circuit in a flash drive), the information will just be used with incorrect values.
A very poorly written banking system could potentially result in your bank balance being changed if just one of the bits in a number was changed by a cosmic ray affecting a value in the computer's memory!
If the barcode on the packet of chips you buy from the shop is scanned incorrectly, you might be charged for shampoo instead.
If you transfer a music file from your laptop to your MP3 player and a few of the bits were transferred incorrectly, the MP3 player might play annoying glitches in the music.
Error control codes guard against all these things, so that (most of the time) things just work without you having to worry about such errors.
