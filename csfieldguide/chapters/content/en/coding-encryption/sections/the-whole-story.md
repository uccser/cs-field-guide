# The whole story!

The early examples in this chapter use very weak encryption methods that were chosen to illustrate concepts, but would never be used for commercial or military systems.

There are many aspects to computer security beyond encryption.
For example, access control (such as password systems and security on smart cards) is crucial to keeping a system secure.
Another major problem is writing secure software that doesn't leave ways for a user to get access to information that they shouldn't (such as typing a database command into a website query and have the system accidentally run it, or overflowing the buffer with a long input, which could accidentally replace parts of the program).
Also, systems need to be protected from "denial of service" (DOS) attacks, where they get so overloaded with requests (e.g. to view a website) that the server can't cope, and legitimate users get very slow response from the system, or it might even fail completely.

For other kinds of attacks relating to computer security, see the [Wikipedia entry on Hackers](https://en.wikipedia.org/wiki/Hacker_(computer_security)).

There's a dark cloud hanging over the security of all current encryption methods: [Quantum computing](https://en.wikipedia.org/wiki/Quantum_computer).
Quantum computing is in its infancy, but if this approach to computing is successful, it has the potential to run very fast algorithms for attacking our most secure encryption systems (for example, it could be used to factorise numbers very quickly).
In fact, the quantum algorithms have already been invented, but we don't know if quantum computers can be built to run them.
Such computers aren't likely to appear overnight, and if they do become possible, they will also open the possibility for new encryption algorithms.
This is yet another mystery in computer science where we don't know what the future holds, and where there could be major changes in the future.
But we'll need very capable computer scientists around at the time to deal with these sorts of changes!

On the positive side, [quantum information transfer protocols](https://en.wikipedia.org/wiki/Quantum_cryptography_protocol) exist and are used in practice (using specialised equipment to generate quantum bits); these provide what is in theory a perfect encryption system, and don't depend on an attacker being unable to solve a particular computational problem.
Because of the need for specialised equipment, they are only used in high security environments such as banking.

Of course, encryption doesn't fix all our security problems, and because we have such good encryption systems available, information thieves must turn to other approaches, especially social engineering.
The easiest way to get a user's password is to ask them! A [phishing attack](https://en.wikipedia.org/wiki/Phishing) does just that, and there are estimates that as many as 1 in 20 computer users have given out secret information this way at some stage.

Other social engineering approaches that can be used include bribing or blackmailing people who have access to a system, or simply looking for a password written on a sticky note on someone's monitor!
Gaining access to someone's email account is a particularly easy way to get lots of passwords, because many "lost password" systems will send a new password to their email account.

{comment possibly link to http://nsf.gov/cise/csbytes/newsletter/vol3/pdf/csbb-vol3-i2.pdf and https://www.youtube.com/watch?v=T2DXrs0OpHU}

{comment e.g. (bb84)}

{comment enigma story http://www.mtholyoke.edu/~adurfee/cryptology/enigma_j.html}

{panel type="curiosity"}

# Steganography

Cryptography is about hiding the content of a message, but sometimes it's important to hide the *existence* of the message.
Otherwise an enemy might figure out that something is being planned just because a lot more messages are being sent, even though they can't read them.
One way to achieve this is via *steganography*, where a secret message is hidden inside another message that seems innocuous.
A classic scenario would be to publish a message in the public notices of a newspaper or send a letter from prison where the number of letters in each word represent a code.
To a casual reader, the message might seem unimportant (and even say the opposite of the hidden one), but someone who knows the code could work it out.
Messages can be hidden in digital images by making unnoticable changes to pixels so that they store some information.
You can find out [more about steganography on Wikipedia](https://en.wikipedia.org/wiki/Steganography) or in this [lecture on steganography](https://www.youtube.com/watch?v=Py-qu9KWXhk#t=29).

Two fun uses of steganography that you can try to decode yourself are a [film about ciphers that contains hidden ciphers (called "The Thomas Beale Cipher")](http://www.thomasbealecipher.com/), and an activity that has [five-bit text codes hidden in music](http://csunplugged.org/modem).

{panel end}
