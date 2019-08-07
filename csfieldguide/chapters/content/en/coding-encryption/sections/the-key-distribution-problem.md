# The key distribution problem

{panel type="curiosity"}

# Who are Alice, Bob, and Eve?

When describing an encryption scenario, cryptographers often use the fictitious characters "Alice" and "Bob", with a message being sent from Alice to Bob (A to B).
We always assume that someone is eavesdropping on the conversation (in fact, if you're using a wireless connection, it's trivial to pick up the transmissions between Alice and Bob as long as you're in reach of the wireless network that one of them is using).
The fictitious name for the eavesdropper is usually Eve.

{image file-path="img/chapters/xkcd-protocol.png" alt="A xkcd comic on protocols" hover-text="Changing the names would be easier, but if you're not comfortable lying, try only making friends with people named Alice, Bob, Carol, etc." source="https://xkcd.com/1323/"}

There are several other characters used to describe activities around encryption protocols: for example Mallory (a malicious attacker) and Trudy (an intruder). Wikipedia has a [list of Alice and Bob's friends](https://en.wikipedia.org/wiki/Alice_and_Bob).

{panel end}

If Alice is sending an encrypted message to Bob, this raises an interesting problem in encryption.
The ciphertext itself can safely be sent across an "unsafe" network (one that Eve is listening on), but the key cannot.
How can Alice get the key to Bob? Remember the key is the thing that tells Bob how to convert the ciphertext back to plaintext.
So Alice can’t include it in the encrypted message, because then Bob would be unable to access it.
Alice can’t just include it as plaintext either, because then Eve will be able to get ahold of it and use it to decrypt any messages that come through using it.
You might ask why Alice doesn’t just encrypt the key using a different encryption scheme, but then how will Bob know the new key? Alice would need to tell Bob the key that was used to encrypt it... and so on... this idea is definitely out!

Remember that Alice and Bob might be in different countries, and can only communicate through the internet.
This also rules out Alice simply passing Bob the key in person.

{panel type="curiosity"}

# Are we being paranoid?

In computer security we tend to assume that Eve, the eavesdropper, can read every message between Alice and Bob.
This sounds like an inordinate level of wire tapping, but what about wireless systems?
If you're using wireless (or a mobile phone), then all your data is being broadcast, and can be picked up by any wireless receiver in the vicinity.
In fact, if another person in the room is also using wireless, their computer is already picking up everything being transmitted by your computer, and has to go to some trouble to ignore it.

Even in a wired connection, data is passed from one network node to another, stored on computers inbetween.
Chances are that everyone who operates those computers is trustworthy, but probably don't even know which companies have handled your data in the last 24 hours, let alone whether every one of their employees can be trusted.

So assuming that somone can observe all the bits being transmitted and received from your computer is pretty reasonable.

{panel end}

Distributing keys physically is very expensive, and up to the 1970s large sums of money were spent physically sending keys internationally.
Systems like this are call *symmetric* encryption, because Alice and Bob both need an identical copy of the key.
The breakthrough was the realisation that you could make a system that used different keys for encoding and decoding.
We will look further at this in the next section.

{panel type="curiosity"}

# Some additional viewing

[Simon Singh's video](http://simonsingh.net/media/online-videos/cryptography/the-science-of-secrecy-going-public/) gives a good explanation of key distribution.

Additionally, there's a video illustrating how public key systems work using a padlock analogy.

{video url="https://www.youtube.com/watch?v=a72fHRr6MRU"}

{panel end}

{panel type="teacher-note"}

# Even more about Alice and Bob

There's a [song about Alice and Bob](http://www.catonmat.net/blog/musical-geek-friday-alice-and-bob/) performed by rapper MC++ (yes, he specialises in computer science).
Some of the language may not be suitable for use in class, so discretion is needed for how you might use it.

{image file-path="img/chapters/xkcd-alice-and-bob.png" hover-text="Yet one more reason I'm barred from speaking at crypto conferences." alt="A xkcd comic about Alice and Bob" source="https://xkcd.com/177/"}

{panel end}

## Public key systems

One of the remarkable discoveries in computer science in the 1970s was a method called *public key encryption*, where it's fine to tell everyone what the key is to encrypt any messages, but you need a special private key to decrypt it.
Because Alice and Bob use different keys, this is called an *asymmetric* encryption system.

It's like giving out padlocks to all your friends, so anyone can lock a box and send it to you, but if you have the only (private) key, then you are the only person who can open the boxes.
Once your friend locks a box, even they can't unlock it.
It's really easy to distribute the padlocks.
Public keys are the same – you can make them completely public – often people put them on their website or attach them to all emails they send.
That's quite different to having to hire a security firm to deliver them to your colleagues.

Public key encryption is very heavily used for online commerce (such as internet banking and credit card payment) because your computer can set up a connection with the business or bank automatically using a public key system without you having to get together in advance to set up a key.
Public key systems are generally slower than symmetric systems, so the public key system is often used to then send a new key for a symmetric system just once per session, and the symmetric key can be used from then on with a faster symmetric encryption system.

A very popular public key system is RSA.
For this section on public key systems, we will use RSA as an example.

### Generating the encryption and decryption keys

Firstly, you will need to generate a pair of keys using the key generator interactive.
You should *keep the private key secret*, and *publicly announce the public key* so that your friends can send you messages (e.g. put it on the whiteboard, or email it to some friends).
Make sure you save your keys somewhere so you don’t forget them – a text file would be best.

{interactive slug="rsa-key-generator" type="in-page"}

{panel type="teacher-note"}

# Ideas for RSA fun in the classroom

One thing you might like to do is to ask each student to generate their key pair, and then put their public key alongside their name in a shared spreadsheet (for example, a google doc).
Then when the students would like to send an encrypted message to one of their classmates, they can look up the person's public key in the spreadsheet.

{panel end}

### Encrypting messages with the public key

This next interactive is the encrypter, and it is used to encrypt messages with your **public key**.
Your friends should use this to encrypt messages for you.

{interactive slug="rsa-encryption" type="in-page"}

To ensure you understand, try encrypting a short message with your **public key**.
In the next section, there is an interactive that you can then use to decrypt the message with your private key.

### Decrypting messages with the private key

Finally, this interactive is the decrypter.
It is used to decrypt messages that were encrypted with your public key.
In order to decrypt the messages, you will need your **private key**.

{interactive slug="rsa-decryption" type="in-page"}

Despite even your enemies knowing your public key (as you publicly announced it), they cannot use it to decrypt your messages which were encrypted using the public key.
You are the only one who can decrypt messages, as that requires the private key which hopefully you are the only one who has access to.

Note that this interactive’s implementation of RSA is just for demonstrating the concepts here and is not quite the same as the implementations used in live encryption systems.

{panel type="curiosity"}

# Can we reverse the RSA calculations?

If you were asked to multiply the following two big prime numbers, you might find it a bit tiring to do by hand (although it is definitely achievable), and you could get an answer in a fraction of a second using a computer.

```text
97394932817749829874327374574392098938789384897239489848732984239898983986969870902045828438234520989483483889389687489677903899
```

```text
34983724732345498523673948934032028984850938689489896586772739002430884920489508348988329829389860884285043580020020020348508591
```

If on the other hand you were asked which two prime numbers were multiplied to get the following big number, you’d have a lot more trouble!
(If you do find the answer, let us know! We’d be very interested to hear about it!)

```text
3944604857329435839271430640488525351249090163937027434471421629606310815805347209533599007494460218504338388671352356418243687636083829002413783556850951365164889819793107893590524915235738706932817035504589460835204107542076784924507795112716034134062407
```

Creating an RSA code involves doing the multiplication above, which is easy for computers.
If we could solve the second problem and find the multiples for a big number, we'd be able to crack an RSA code.
However, no one knows a fast way to do that.
This is called a "trapdoor" function &ndash; it's easy to go into the trapdoor (multiply two numbers), but it's pretty much impossible to get back out (find the two factors).

So why is it that despite these two problems being similar, one of them is "easy" and the other one is "hard"? Well, it comes down to the algorithms we have to solve each of the problems.

You have probably done long multiplication in school by making one line for each digit in the second number and then adding all the rows together.
We can analyse the speed of this algorithm, much like we did in the algorithms chapter for sorting and searching.
Assuming that each of the two numbers has the same number of digits, which we will call \(n\) ("Number of digits"), we need to write \(n\) rows.
For each of those \(n\) rows, we will need to do around \(n\) multiplications.
That gives us \(n \times n\) little multiplications.
We need to add the \(n\) rows together at the end as well, but that doesn’t take long so lets ignore that part.
We have determined that the number of small multiplications needed to multiply two big numbers is approximately the square of the number of digits.
So for two numbers with 1000 digits, that’s 1,000,000 little multiplication operations.
A computer can do that in less than a second! If you know about Big-O notation, this is an \( O(n^2) \) algorithm, where \(n\) is the number of digits.
Note that some slightly better algorithms have been designed, but this estimate is good enough for our purposes.

For the second problem, we’d need an algorithm that could find the two numbers that were multiplied together.
You might initially say, why can’t we just reverse the multiplication? The reverse of multiplication is division, so can’t we just divide to get the two numbers?
It’s a good idea, but it won’t work.
For division we need to know the big number, and one of the small numbers we want to divide into it, and that will give us the other small number.
But in this case, we *only* know the big number.
So it isn’t a straightforward long division problem at all!
It turns out that there is no known fast algorithm to solve the problem.
One way is to just try dividing by every number that is less than the number (well, we only need to go up to the square root, but that doesn’t help much!) There are still billions of billions of billions of numbers we need to check.
Even a computer that could check 1 billion possibilities a second isn’t going to help us much with this!
If you know about Big-O notation, this is an \( O(10^n) \) algorithm, where n is the number of digits -- even small numbers of digits are just too much to deal with!
There are slightly better solutions, but none of them shave off enough time to actually be useful for problems of the size of the one above!

The chapter on [complexity and tractability]('chapters:chapter' 'complexity-and-tractability') looks at more computer science problems that are surprisingly challenging to solve.
If you found this stuff interesting, do read about complexity and tractability when you are finished here!

{panel end}

{panel type="curiosity"}

# Encrypting with the private key instead of the public key — digital signatures!

In order to encrypt a message, the public key is used.
In order to decrypt it, the corresponding private key must be used.
But what would happen if the message was encrypted using the *private* key?
Could you then decrypt it with the public key?

Initially this might sound like a pointless thing to do &ndash; why would you encrypt a message that can be decrypted using a key that everybody in the world can access!?!
It turns out that indeed, encrypting a message with the private key and then decrypting it with the public key works, and it has a very useful application.

The only person who is able to *encrypt* the message using the *private* key is the person who owns the private key.
The public key will only decrypt the message if the private key that was used to encrypt it actually is the public key’s corresponding private key.
If the message can’t be decrypted, then it could not have been encrypted with that private key.
This allows the sender to prove that the message actually is from them, and is known as a {glossary-link term="digital-signature"}digital signature{glossary-link end}.

You could check that someone is the authentic private key holder by giving them a phrase to encrypt with their private key. You then decrypt it with the public key to check that they were able to encrypt the phrase you gave them.

This has the same function as a physical signature, but is more reliable because it is essentially impossible to forge.
Some email systems use this so that you can be sure an email came from the person who claims to be sending it.

{panel end}

{comment The following comments are for a section on RSA is to write at a later time}

{comment ## RSA in practice}

{comment ### How does RSA Work?}

{comment ### Preventing known plain text attacks}

{comment ### Common usage}
