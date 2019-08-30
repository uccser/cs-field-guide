# What's the big picture?

In [the previous chapter]('chapters:chapter' 'data-representation') we looked at using binary representations to store all kinds of data &ndash; numbers, text, images and more.
But often simple binary representations don't work so well.
Sometimes they take up too much space, sometimes small errors in the data can cause big problems, and sometimes we worry that someone else could easily read our messages.
Most of the time all three of these things are a problem!
The codes that we will look at here overcome all of these problems, and are widely used for storing and transmitting important information.

The three main reasons that we use more complex representations of binary data are:

- **Compression:** this reduces the amount of space the data needs (for example, encoding an audio file using MP3 compression can reduce it to well under 10% of its original size).

- **Encryption:** this changes the representation of data so that you need to have a "key" to unlock the message (for example, whenever your browser uses "https" instead of "http" to communicate with a website, encryption is being used to make sure that anyone eavesdropping on the connection can't make any sense of the information).

- **Error Control:** this adds extra information to your data so that if there are minor failures in the storage device or transmission, it is possible to detect that the data has been corrupted, and even reconstruct the information (for example, bar codes on products have an extra digit added to them so that if the bar code is scanned incorrectly in a checkout, it makes a warning sound instead of charging you for the wrong product).

Often all three of these are applied to the same data; for example, if you take a photo on a smartphone it is usually compressed using JPEG, stored in the phone's memory with error correction, and uploaded to the web through a wireless connection using an encryption protocol to prevent other people nearby getting a copy of the photo.

Without these forms of coding, digital devices would be very slow, have limited capacity, be unreliable, and be unable to keep your information private.
