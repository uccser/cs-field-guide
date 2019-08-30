# Cryptosystems used in practice

The substitution systems described before don't provide any security for modern digital systems.
In the remainder of this chapter we will look at encryption systems that are used in practice.
The first challenge is to find a way to exchange keys &ndash; after all, if you're communicating to someone over the internet, how are you going to send the key for your secret message to them conveniently?

Cryptosystems are also used for purposes such as *authentication* (checking a password).
This sounds simple, but how do you check when someone logs in, *without* having to store their password (after all, if someone got hold of the password list, that could ruin your reputation and business, so it's even safer not to store them).

There are good solutions to these problems that are regularly used &ndash; in fact, you probably use them online already, possibly without even knowing!
We'll begin by looking at systems that allow people to decode secret messages without even having to be sent the key!
