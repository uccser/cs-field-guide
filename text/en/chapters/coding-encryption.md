# Coding - Encryption

## What's the big picture?

## Substitution Ciphers

## Cryptosystems used in practice

The substitution systems described above don't provide any security for modern digital systems.
In the remainder of this chapter we will look at encryption systems that are used in practice.
The first challenge is to find a way to exchange keys --- after all, if you're communicating to someone over the internet, how are you going to send the key for your secret message to them conveniently?

Cryptosystems are also used for purposes such as *authentication* (checking a password).
This sounds simple, but how do you check when someone logs in, *without* having to store their password (after all, if someone got hold of the password list, that could ruin your reputation and business, so it's even safer not to store them.)

There are good solutions to these problems that are regularly used --- in fact, you probably use them online already, possibly without even knowing!
We'll begin by looking at systems that allow people to decode secret messages without even having to be sent the key!

## The Key Distribution Problem

{panel type="curiosity" summary="Who are Alice, Bob, and Eve?"}
When describing an encryption scenario, cryptographers often use the fictitious characters "Alice" and "Bob", with a message being sent from Alice to Bob (A to B).
We always assume that someone is eavesdropping on the conversation (in fact, if you're using a wireless connection, it's trivial to pick up the transmissions between Alice and Bob as long as you're in reach of the wireless network that one of them is using).
The fictitious name for the eavesdropper is usually Eve.

{image filename="xkcd-protocol.png" alt="A xkcd comic on protocols" hover-text="Changing the names would be easier, but if you're not comfortable lying, try only making friends with people named Alice, Bob, Carol, etc." source="https://xkcd.com/1323/"}

There are several other characters used to describe activities around encryption protocols: for example Mallory (a malicious attacker) and Trudy (an intruder). Wikipedia has a [list of Alice and Bob's friends](https://en.wikipedia.org/wiki/Alice_and_Bob)
{panel end}

If Alice is sending an encrypted message to Bob, this raises an interesting problem in encryption.
The ciphertext itself can safely be sent across an “unsafe” network (one that Eve is listening on), but the key cannot. How can Alice get the key to Bob? Remember the key is the thing that tells Bob how to convert the ciphertext back to plaintext. So Alice can’t include it in the encrypted message, because then Bob would be unable to access it. Alice can’t just include it as plaintext either, because then Eve will be able to get ahold of it and use it to decrypt any messages that come through using it. You might ask why Alice doesn’t just encrypt the key using a different encryption scheme, but then how will Bob know the new key? Alice would need to tell Bob the key that was used to encrypt it... and so on... this idea is definitely out!

Remember that Alice and Bob might be in different countries, and can only communicate through the internet. This also rules out Alice simply passing Bob the key in person.

{panel type="curiosity" summary="Are we being paranoid?"}
In computer security we tend to assume that Eve, the eavesdropper, can read every message between Alice and Bob.
This sounds like an inordinate level of wire tapping, but what about wireless systems?
If you're using wireless (or a mobile phone), then all your data is being broadcast, and can be picked up by any wireless receiver in the vicinity.
In fact, if another person in the room is also using wireless, their computer is already picking up everything being transmitted by your computer, and has to go to some trouble to ignore it.

Even in a wired connection, data is passed from one network node to another, stored on computers inbetween.
Chances are that everyone who operates those computers is trustworthy, but probably don't even know which companies have handled your data in the last 24 hours, let alone whether every one of their employees can be trusted.

So assuming that somone can observe all the bits being transmitted and received from your computer is pretty reasonable.
{panel end}

Distributing keys physically is very expensive, and up to the 1970s large sums of money were spent physically sending keys internationally. Systems like this are call *symmetric* encryption, because Alice and Bob both need an identical copy of the key. The breakthrough was the realisation that you could make a system that used different keys for encoding and decoding. We will look further at this in the next section.

{panel type="curiosity" summary="Some additional viewing"}
[Simon Singh's video](http://simonsingh.net/media/online-videos/cryptography/the-science-of-secrecy-going-public/) gives a good explanation of key distribution.

Additionally, there's a video illustrating how public key systems work using a padlock analogy.

{video url="https://www.youtube.com/watch?v=a72fHRr6MRU"}
{panel end}

{panel type="teacher-note" summary="Even more about Alice and Bob"}
There's a [song about Alice and Bob](http://www.catonmat.net/blog/musical-geek-friday-alice-and-bob/) performed by rapper MC++ (yes, he specialises in computer science). Some of the language may not be suitable for use in class, so discretion is needed for how you might use it.

{image filename="xkcd-alice-and-bob.png" hover-text="Yet one more reason I'm barred from speaking at crypto conferences." alt="A xkcd comic about Alice and Bob" source="https://xkcd.com/177/"}
{panel end}


### Public Key Systems

One of the remarkable discoveries in computer science in the 1970s was a method called *public key encryption*, where it's fine to tell everyone what the key is to encrypt any messages, but you need a special private key to decrypt it. Because Alice and Bob use different keys, this is called an *asymmetric* encryption system.

It's like giving out padlocks to all your friends, so anyone can lock a box and send it to you, but if you have the only (private) key, then you are the only person who can open the boxes. Once your friend locks a box, even they can't unlock it. It's really easy to distribute the padlocks. Public keys are the same – you can make them completely public – often people put them on their website or attach them to all emails they send. That's quite different to having to hire a security firm to deliver them to your colleagues.

Public key encryption is very heavily used for online commerce (such as internet banking and credit card payment) because your computer can set up a connection with the business or bank automatically using a public key system without you having to get together in advance to set up a key. Public key systems are generally slower than symmetric systems, so the public key system is often used to then send a new key for a symmetric system just once per session, and the symmetric key can be used from then on with a faster symmetric encryption system.

A very popular public key system is RSA. For this section on public key systems, we will use RSA as an example.

#### Generating the encryption and decryption keys

{panel type="teacher-note" summary="Ideas for RSA fun in the classroom"}
One thing you might like to do is to ask each student to generate their key pair, and then put their public key alongside their name in a shared spreadsheet (for example, a google doc). Then when the students would like to send an encrypted message to one of their classmates, they can look up the person's public key in the spreadsheet.
{panel end}

Firstly, you will need to generate a pair of keys using the key generator interactive. You should *keep the private key secret*, and *publicly announce the public key* so that your friends can send you messages (e.g. put it on the whiteboard, or email it to some friends). Make sure you save your keys somewhere so you don’t forget them – a text file would be best.

{interactive name="rsa-key-generator" type="in-page"}

#### Encrypting messages with the public key

This next interactive is the encrypter, and it is used to encrypt messages with your **public key**. Your friends should use this to encrypt messages for you.

{interactive name="rsa-no-padding" type="iframe"}

To ensure you understand, try encrypting a short message with your **public key**. In the next section, there is an interactive that you can then use to decrypt the message with your private key.

#### Decrypting messages with the private key

Finally, this interactive is the decrypter. It is used to decrypt messages that were encrypted with your public key. In order to decrypt the messages, you will need your **private key**.

{interactive name="rsa-no-padding" type="iframe" parameters="mode=decrypt"}

Despite even your enemies knowing your public key (as you publicly announced it), they cannot use it to decrypt your messages which were encrypted using the public key. You are the only one who can decrypt messages, as that requires the private key which hopefully you are the only one who has access to.

Note that this interactive’s implementation of RSA is just for demonstrating the concepts here and is not quite the same as the implementations used in live encryption systems.

{panel type="curiosity" summary="Can we reverse the RSA calculations?"}

If you were asked to multiply the following two big prime numbers, you might find it a bit tiring to do by hand (although it is definitely achievable), and you could get an answer in a fraction of a second using a computer.

```
97394932817749829874327374574392098938789384897239489848732984239898983986969870902045828438234520989483483889389687489677903899
```

```
34983724732345498523673948934032028984850938689489896586772739002430884920489508348988329829389860884285043580020020020348508591
```

If on the other hand you were asked which two prime numbers were multiplied to get the following big number, you’d have a lot more trouble!  (If you do find the answer, let us know! We’d be very interested to hear about it!)

```
3944604857329435839271430640488525351249090163937027434471421629606310815805347209533599007494460218504338388671352356418243687636083829002413783556850951365164889819793107893590524915235738706932817035504589460835204107542076784924507795112716034134062407
```

Creating an RSA code involves doing the multiplication above, which is easy for computers.
If we could solve the second problem and find the multiples for a big number, we'd be able to crack an RSA code.
However, no one knows a fast way to do that.
This is called a "trapdoor" function - it's easy to go into the trapdoor (multiply two numbers), but it's pretty much impossible to get back out (find the two factors).

So why is it that despite these two problems being similar, one of them is “easy” and the other one is “hard”? Well, it comes down to the algorithms we have to solve each of the problems.

You have probably done long multiplication in school by making one line for each digit in the second number and then adding all the rows together. We can analyse the speed of this algorithm, much like we did in the algorithms chapter for sorting and searching.
Assuming that each of the two numbers has the same number of digits, which we will call *n* (“Number of digits”), we need to write *n* rows.
For each of those *n* rows, we will need to do around *n* multiplications.
That gives us {math}n \times n{math end} little multiplications.
We need to add the *n* rows together at the end as well, but that doesn’t take long so lets ignore that part.
We have determined that the number of small multiplications needed to multiply two big numbers is approximately the square of the number of digits.
So for two numbers with 1000 digits, that’s 1,000,000 little multiplication operations.
A computer can do that in less than a second! If you know about Big-O notation, this is an {math}O(n^2){math end} algorithm, where *n* is the number of digits.
Note that some slightly better algorithms have been designed, but this estimate is good enough for our purposes.

For the second problem, we’d need an algorithm that could find the two numbers that were multiplied together.
You might initially say, why can’t we just reverse the multiplication? The reverse of multiplication is division, so can’t we just divide to get the two numbers?
It’s a good idea, but it won’t work.
For division we need to know the big number, and one of the small numbers we want to divide into it, and that will give us the other small number.
But in this case, we *only* know the big number. So it isn’t a straightforward long division problem at all!
It turns out that there is no known fast algorithm to solve the problem. One way is to just try dividing by every number that is less than the number (well, we only need to go up to the square root, but that doesn’t help much!) There are still billions of billions of billions of numbers we need to check. Even a computer that could check 1 billion possibilities a second isn’t going to help us much with this! If you know about Big-O notation, this is an {math}O(10^n){math end} algorithm, where n is the number of digits -- even small numbers of digits are just too much to deal with!
There are slightly better solutions, but none of them shave off enough time to actually be useful for problems of the size of the one above!

The chapter on [complexity and tractability](chapters/complexity-tractability.html) looks at more computer science problems that are surprisingly challenging to solve. If you found this stuff interesting, do read about Complexity and Tractability when you are finished here!
{panel end}

{panel type="curiosity" summary="Encrypting with the private key instead of the public key --- Digital Signatures!"}
In order to encrypt a message, the public key is used. In order to decrypt it, the corresponding private key must be used. But what would happen if the message was encrypted using the *private* key? Could you then decrypt it with the public key?

Initially this might sound like a pointless thing to do --- why would you encrypt a message that can be decrypted using a key that everybody in the world can access!?!  It turns out that indeed, encrypting a message with the private key and then decrypting it with the public key works, and it has a very useful application.

The only person who is able to *encrypt* the message using the *private* key is the person who owns the private key. The public key will only decrypt the message if the private key that was used to encrypt it actually is the public key’s corresponding private key. If the message can’t be decrypted, then it could not have been encrypted with that private key.
This allows the sender to prove that the message actually is from them, and is known as a
{glossary-definition term="Digital signature" definition="An encryption system that allows the receiver to verify that a document was sent by the person who claims to have sent it."}
{glossary-link term="Digital signature"}digital signature{glossary-link end}.

You could check that someone is the authentic private key holder by giving them a phrase to encrypt with their private key. You then decrypt it with the public key to check that they were able to encrypt the phrase you gave them.

This has the same function as a physical signature, but is more reliable because it is essentially impossible to forge.
Some email systems use this so that you can be sure an email came from the person who claims to be sending it.

{panel end}

{comment}
This section on RSA is yet to be written
### RSA in practice

Links to RSA interactives using real world jsencrypt library.
{interactive name="rsa-jsencrypt" type="whole-page" text="RSA Encrypter (using padding)"}
{interactive name="rsa-jsencrypt" type="whole-page" text="RSA Decrypter (using padding)" parameters="mode=decrypt"}

#### How does RSA Work?

#### Preventing known plain text attacks

#### Common usage
{comment end}

## Storing Passwords Securely

A really interesting puzzle in encryption is storing passwords in a way that even if the database with the passwords gets leaked, the passwords are not in a usable form. Such a system has many seemingly conflicting requirements.

- When a user logs in, it must be possible to check that they have entered the correct password.
- Even if the database is leaked, and the attacker has huge amounts of computing power...
 - The database should not give away obvious information, such as password lengths, users who chose the same passwords, letter frequencies of the passwords, or patterns in the passwords.
 - At the very least, users should have several days/ weeks to be able to change their password before the attacker cracks it. Ideally, it should not be possible for them to ever recover the passwords.
- There should be no way of recovering a forgotten password. If the user forgets their password, it must be reset. Even system administrators should not have access to a user's password.

Most login systems have a limit to how many times you can guess a password. This protects all but the poorest passwords from being guessed through a well designed login form. Suspicious login detection by checking IP address and country of origin is also becoming more common. However, none of these application enforced protections are of any use once the attacker has a copy of the database and can throw as much computational power at it as they want, without the restrictions the application enforces. This is often referred to "offline" attacking, because the attacker can attack the database in their own time.

In this section, we will look at a few widely used algorithms for secure password storage. We will then look at a couple of case studies where large databases were leaked. Secure password storage comes down to using clever encryption algorithms and techniques, and ensuring users choose effective passwords. Learning about password storage might also help you to understand the importance of choosing good passwords and not using the same password across multiple important sites.

### Hashing passwords

A *hashing algorithm* is an algorithm that takes a password and performs complex computations on it and then outputs a seemingly random string of characters called a *hash*. This process is called *hashing*. Good hashing algorithms have the following properties:

- Each time a specific password is hashed, it should give the same hash.
- Given a specific **hash**, it should be impossible to efficiently compute what the original password was.

Mathematically, a hashing algorithm is called a "one way function". This just means that it is very easy to compute a hash for a given password, but trying to recover the password from a given hash can only be done by brute force. In other words, it is easy to go one way, but it is almost impossible to reverse it. A popular algorithm for hashing is called SHA-256. The remainder of this chapter will focus on SHA-256.

{panel type="jargon-buster" summary="What is meant by brute force?"}
In the Caesar Cipher section, we talked briefly about brute force attacks. Brute force attack in that context meant trying every possible key until the correct one was found.

More generally, brute force is trying every possibility until a solution is found. For hashing, this means going through a long list of possible passwords, running each through the hashing algorithm, and then checking if the outputted hash is identical to the one that we are trying to reverse.
{panel end}

For passwords, this is great. Instead of storing passwords in our database, we can store hashes. When a user signs up or changes their password, we simply need to put the password through the SHA-256 algorithm and then store the output hash instead of the password. When the user wants to log in, we just have to put their password through the SHA-256 algorithm again. If the output hash matches the one in the database, then the user has to have entered the correct password. If an attacker manages to access the password database, they cannot determine what the actual passwords are. The hashes themselves are not useful to the attacker.

The following interactive allows you to hash words, such as passwords (but please don't put your real password into it, as you should never enter your password on random sites). If you were to enter a well chosen password (e.g. a random string of numbers and letters), and it was of sufficient length, you could safely put the hash on a public website, and nobody would be able to determine what your actual password was.

{interactive name="sha2" type="in-page"}

For example, the following database table shows four users of a fictional system, and the hashes of their passwords. You could determine their passwords by putting various possibilities through SHA-256 and checking whether or not the output is equivalent to any of the passwords in the database.

{image filename="hash-passwords-table.png"}

It might initially sound like we have the perfect system. But unfortunately, there is still a big problem.
You can find *rainbow tables* online, which are precomputed lists of common passwords with what value they hash to. It isn't too difficult to generate rainbow tables containing all passwords up to a certain size in fact (this is one reason why using long passwords is strongly recommended!)
This problem can be avoided by choosing a password that isn't a common word or combination of words.

Hashing is a good start, but we need to further improve our system so that if two users choose the same password, their hash is not the same, while still ensuring that it is possible to check whether or not a user has entered the correct password. The next idea, salting, addresses this issue.

{panel type="curiosity" summary="Passwords that hash to the same value"}
When we said that if the hashed password matches the one in the database, then the user has to have entered the correct password, we were not telling the full truth. Mathematically, we know that there have to be passwords which would hash to the same value. This is because the length of the output hash has a maximum length, whereas the password length (or other data being hashed) could be much larger. Therefore, there are more possible inputs than outputs, so some inputs must have the same output. When two different inputs have the same output hash, we call it a *collision*.

Currently, nobody knows of two unique passwords which hash to the same value with SHA-256. There is no known mathematical way of finding collisons, other than hashing many values and then trying to find a pair which has the same hash. The probability of finding one in this way is believed to be in the order of 1 in a trillion trillion trillion trillion trillion. With current computing power, nobody can come even close to this without it taking longer than the life of the sun and possibly the universe.

Some old algorithms, such as MD5 and SHA-1 were discovered to not be as immune to finding collisions as was initially thought. It is possible that there are ways of finding collisions more efficiently than by luck. Therefore, their use is now discouraged for applications where collisions could cause problems.

For password storage, collisions aren't really an issue anyway. Chances are, the password the user selected is somewhat predictable (e.g. a word out of a dictionary, with slight modifications), and an attacker is far more likely to guess the original password than one that happens to hash to the same value as it.

But hashing is used for more than just password storage. It is also used for digital signatures, which must be unique. For those applications, it is important to ensure collisions cannot be found.
{panel end}

### Hashing passwords with a salt

A really clever technique which solves some of the problems of using a plain hash is salting. Salting simply means to attach some extra data, called *salt*, onto the end of the password and then hash the combined password and salt. Normally the salt is quite large (e.g. 128 bits). When a user tries to log in, we will need to know the salt for their password so that it can be added to the password before hashing and checking. While this initially sounds challenging, the salt should not be treated as a secret. Knowing the salt does not help the attacker to mathematically reverse the hash and recover the password. Therefore, a common practice is to store it in plaintext in the database.

So now when a user registers, a long random salt value is generated, added to the end of their password, and the combined password and salt is hashed. The plaintext salt is stored next to the hash.

{comment}
TODO (but beyond what we really need to cover - could be an extra for experts)
### Hashing passwords with a salt and stretching
{comment end}

### The importance of good user passwords

If the passwords are salted and hashed, then a rainbow table is useless to the attacker. With current computing power and storage, it is impossible to generate rainbow tables for all common passwords with all possible salts. This slows the attacker down greatly, however they can still try and guess each password one by one. They simply need to guess passwords, add the salt to them, and then check if the hash is the one in the database.

A common brute force attack is a *dictionary attack*. This is where the attacker writes a simple program that goes through a long list of dictionary words, other common passwords, and all combinations of characters under a certain length. For each entry in the list, the program adds the salt to the entry and then hashes to see if it matches the hash they are trying to determine the password for. Good hardware can check millions, or even billions, of entries a second. Many user passwords can be recovered in less than a second using a dictionary attack.

Unfortunately for end users, many companies keep database leaks very quiet as it is a huge embarrassment that could cripple the company. Sometimes the company doesn't know its database was leaked, or has suspicions that it was but for PR reasons they choose to deny it. In the best case, they might require you to pick a new password, giving a vague excuse. For this reason, it is important to use different passwords on every site to ensure that the attacker does not break into accounts you own on other sites. There are quite possibly passwords of yours that you think nobody knows, but somewhere in the world an attacker has recovered it from a database they broke into.

{comment}
Have a go at the following interactive. It requires you to guess the passwords of the users.
- Alice and Bob both used passwords which are among the most commonly used 20 passwords.
- Casey picked her password out of a dictionary. You might find hers a bit more challenging to figure out, although a computer would get it in a second. If you are keen, you might like to do a dictionary attack on it yourself.
- Dave's password is short, but the 5 characters in it could be symbols, numbers, uppercase, or lowercase. You might find his a bit more challenging to figure out, but again it is easy for a computer and you might like to write a program to help you figure it out if you are keen.
- Evelyn's is also a random mix of characters, but it is 16 characters long. We don't think you will ever guess her password, even if you wrote a program to help you! Do let us know if you figure it out though!
A database is displayed, with a simple checker. For each user, you will need to copy their salt into the box, enter a possible password, and click calculate hash. The interactive will automatically notify you if the resulting hash matches one of the ones in the database above (to save you from having to carefully check the hash strings for a match)

{comment end}

While in theory, encrypting the salts sounds like a good way to add further security, it isn't as great in practice. We couldn't use a one way hash function (as we need the salt to check the password), so instead would have to use one of the encryption methods we looked at earlier which use a secret key to unlock. This secret key would have to be accessible by the program that checks password (else it can't get the salts it needs to check passwords!), and we have to assume the attacker could get ahold of that as well. The best security against offline brute force attacks is good user passwords.

This is why websites have a minimum password length, and often require a mix of lowercase, uppercase, symbols, and numbers. There are 96 standard characters you can use in a password. 26 upper case letters, 26 lower case letters, 10 digits, and 34 symbols. If the password you choose is completely random (e.g. no words or patterns), then each character you add makes your password 96 times more difficult to guess. Between 8 and 16 characters long can provide a very high level of security, as long as the password is truly random. Ideally, this is the kind of passwords you should be using (and ensure you are using a different password for each site!).

Unfortunately though, these requirements don't work well for getting users to pick good passwords. Attackers know the tricks users use to make passwords that meet the restrictions, but can be remembered. For example, P@$$w0rd contains 8 characters (a commonly used minimum), and contains a mix of different types of characters. But attackers know that users like to replace S's with $'s, mix o and 0, replace i with !, etc. In fact, they can just add these tricks into their list they use for dictionary attacks! For websites that require passwords to have at least one digit, the result is even worse. Many users pick a standard English word and then add a single digit to the end of it. This again is easy work for a dictionary attack to crack!

As this xkcd comic points out, most password advice doesn't make a lot of sense.

{image filename="xkcd-password-strength.png" hover-text="To anyone who understands information theory and security and is in an infuriating argument with someone who does not (possibly involving mixed case), I sincerely apologize." alt="A xkcd comic about password strength" source="https://xkcd.com/936/"}

You might not know what some of the words mean. In easy terms, what it is saying is that there are significantly fewer modifications of common dictionary words than there is of a random selection of four of the 2000 most common dictionary words. Note that the estimates are based on trying to guess through a login system. With a leaked database, the attacker can test billions of passwords a second rather than just a few thousand.



{comment}
TODO:
### Real world case studies

#### Adobethe challenges

- Good storage techniques
- Unfortunately the most sensitive data was the email addresses

{comment end}





### The whole story!

The early examples in this chapter use very weak encryption methods that were chosen to illustrate concepts, but would never be used for commercial or military systems.

There are many aspects to computer security beyond encryption. For example, access control (such as password systems and security on smart cards) is crucial to keeping a system secure.
Another major problem is writing secure software that doesn't leave ways for a user to get access to information that they shouldn't (such as typing a database command into a website query and have the system accidentally run it, or overflowing the buffer with a long input, which could accidentally replace parts of the program).
Also, systems need to be protected from "denial of service" (DOS) attacks, where they get so overloaded with requests (e.g. to view a web site) that the server can't cope, and legitimate users get very slow response from the system, or it might even fail completely.

For other kinds of attacks relating to computer security, see the [Wikipedia entry on Hackers](https://en.wikipedia.org/wiki/Hacker_(computer_security)).

There's a dark cloud hanging over the security of all current encryption methods: [Quantum computing](https://en.wikipedia.org/wiki/Quantum_computer).
Quantum computing is in its infancy, but if this approach to computing is successful, it has the potential to run very fast algorithms for attacking our most secure encryption systems (for example, it could be used to factorise numbers very quickly). In fact, the quantum algorithms have already been invented, but we don't know if quantum computers can be built to run them.
Such computers aren't likely to appear overnight, and if they do become possible, they will also open the possibility for new encryption algorithms. This is yet another mystery in computer science where we don't know what the future holds, and where there could be major changes in the future. But we'll need very capable computer scientists around at the time to deal with these sorts of changes!

On the positive side, [quantum information transfer protocols](https://en.wikipedia.org/wiki/Quantum_cryptography_protocol) exist and are used in practice (using specialised equipment to generate quantum bits); these provide what is in theory a perfect encryption system, and don't depend on an attacker being unable to solve a particular computational problem. Because of the need for specialised equipment, they are only used in high security environments such as banking.

Of course, encryption doesn't fix all our security problems, and because we have such good encryption systems available, information thieves must turn to other approaches, especially social engineering. The easiest way to get a user's password is to ask them! A [phishing attack](https://en.wikipedia.org/wiki/Phishing) does just that, and there are estimates that as many as 1 in 20 computer users have given out secret information this way at some stage.

Other social engineering approaches that can be used include bribing or blackmailing people who have access to a system, or simply looking for a password written on a sticky note on someone's monitor! Gaining access to someone's email account is a particularly easy way to get lots of passwords, because many "lost password" systems will send a new password to their email account.

{comment}
.. xtcb possibly link to http://nsf.gov/cise/csbytes/newsletter/vol3/pdf/csbb-vol3-i2.pdf and https://www.youtube.com/watch?v=T2DXrs0OpHU

{comment end}


{comment}
.. e.g. (bb84)

.. enigma story http://www.mtholyoke.edu/~adurfee/cryptology/enigma_j.html
{comment end}

{panel type="curiosity" summary="Steganography"}

Cryptography is about hiding the content of a message, but sometimes it's important to hide the *existence* of the message. Otherwise an enemy might figure out that something is being planned just because a lot more messages are being sent, even though they can't read them.
One way to achieve this is via *steganography*, where a secret message is hidden inside another message that seems innocuous. A classic scenario would be to publish a message in the public notices of a newspaper or send a letter from prison where the number of letters in each word represent a code. To a casual reader, the message might seem unimportant (and even say the opposite of the hidden one), but someone who knows the code could work it out. Messages can be hidden in digital images by making unnoticable changes to pixels so that they store some information. You can find out [more about steganography on Wikipedia](https://en.wikipedia.org/wiki/Steganography) or in this [lecture on steganography](https://www.youtube.com/watch?v=Py-qu9KWXhk#t=29).

Two fun uses of steganography that you can try to decode yourself are a [film about ciphers that contains hidden ciphers (called "The Thomas Beale Cipher")](http://www.thomasbealecipher.com/), and an activity that has [five-bit text codes hidden in music](http://csunplugged.org/modem).

{panel end}


## Further reading

The [Wikipedia entry on cryptography](https://en.wikipedia.org/wiki/Cryptography) has a fairly approachable entry going over the main terminology used in this chapter (and a lot more)

The encryption methods used these days rely on fairly advanced maths; for this reason books about encryption tend to either be beyond high school level, or else are about codes that aren't actually used in practice.

{comment}

.. example of good book of each type?

{comment end}

There are lots of intriguing stories around encryption, including its use in wartime and for spying e.g.

- How I Discovered World War II's Greatest Spy and Other Stories of Intelligence and Code (David Kahn)

- Decrypted Secrets: Methods and Maxims of Cryptology (Friedrich L. Bauer)

- Secret History: The Story of Cryptology (Craig Bauer)

- The Codebreakers: The Comprehensive History of Secret Communication from Ancient Times to the Internet (David Kahn) – this book is an older version of his new book, and may be hard to get

The following activities explore cryptographic protocols using an Unplugged approach; these methods aren't strong enough to use in practice, but provide some insight into what is possible:

- [Information hiding](http://csunplugged.org/information-hiding)

- [Cryptographic protocols](http://csunplugged.org/cryptographic-protocols)

- [Public key encryption](http://csunplugged.org/public-key-encryption)

[War in the fifth domain](http://www.economist.com/node/16478792) looks at how encryption and security are key to our defence against a new kind of war.

There are lots of [articles in cs4fn on cryptography](http://www.cs4fn.org/security/crypto/), including [a statistical attack that lead to a beheading](http://www.cs4fn.org/security/beheading/secrets1.html).

The book "Hacking Secret Ciphers with Python: A beginner's guide to cryptography and computer programming with Python" (by Al Sweigart) goes over some simple ciphers including ones mentioned in this chapter, and how they can be programmed (and attacked) using Python programs.


### Useful Links

- [How Stuff Works entry on Encryption](http://www.howstuffworks.com/encryption.htm)
- [Cryptool](http://www.cryptool.org/) is a free system for trying out classical and modern encryption methods. Some are beyond the scope of this chapter, but many will be useful for running demonstrations and experiments in cryptography.
- [Wikipedia entry on Cryptographic keys](https://en.wikipedia.org/wiki/Key_%28cryptography%29)
- [Wikipedia entry on the Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cypher)
- [Videos about modern encryption methods](http://simonsingh.net/media/online-videos/cryptography/the-science-of-secrecy-going-public/)
- [Online interactives for simple ciphers](http://www.braingle.com/brainteasers/codes/index.php)
