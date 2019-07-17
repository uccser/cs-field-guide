# Substitution ciphers

A substitution cipher takes each character (sometimes groups of characters) in a message and replaces it with a different character according to fixed rules.
Every occurrence of one character will be *substituted* with the same replacement character.

An encrypted message can then be decrypted with another substitution cipher, this time set to substitute each character with the one that it originally replaced.
It is a very simple system which, as we'll find out, makes it a very insecure method of encryption!

{panel type="teacher-note"}

# Starting with a very insecure cipher!

This section provides an introduction to the idea of encryption, using a very simple substitution cipher called the Caesar cipher.
While the Caesar cipher is no longer used in practice, it is still very useful as a teaching tool for illustrating the basic ideas and terminology in encryption.
The Caesar cipher is very easily broken, even without the help of a computer, but it is for this reason that it is a good introduction to the processes around ciphers.
The only reason it worked in the time of Julius Caesar was that it relied on a low level of literacy amongst those you might expect to come across it, and they would assume it was a foreign language rather than try to attack it.
A 21st century high school student should have all the literacy and mathematical tools needed to break this code.

Once students understand the basic concepts in Caesar cipher, they can move on to understanding the sophisticated ciphers used in practice.

{panel end}

## Getting started with Caesar cipher

In this section, we will be looking at a simple substitution cipher called Caesar cipher.
Caesar cipher is over 2000 years old, invented by a guy called Julius Caesar.
Before we go any further, have a go at cracking this simple code.
If you're stuck, try working in a small group with friends and classmates so that you can discuss ideas.
A whiteboard or pen and paper would be helpful for doing this exercise.

```text
DRO BOCMEO WSCCSYX GSVV ECO K ROVSMYZDOB,
KBBSFSXQ KD XYYX DYWYBBYG.
LO BOKNI DY LBOKU YED KC CYYX
KC IYE ROKB DRBOO
LVKCDC YX K GRSCDVO.
S'VV LO GOKBSXQ K BON KBWLKXN.
```

Once you have figured out what the text says, make a table with the letters of the alphabet in order and then write the letter they are represented with in the cipher text.
You should notice an interesting pattern.

Given how easily broken this cipher is, you probably don't want your bank details encrypted with it.
In practice, far stronger ciphers are used, although for now we are going to look a little bit further at Caesar cipher, because it is a great introduction to the many ideas in encryption.

{panel type="teacher-note"}

# Answer for cipher

The answer is:

```text
THE RESCUE MISSION WILL USE A HELICOPTER,
ARRIVING AT NOON TOMORROW.
BE READY TO BREAK OUT AS SOON
AS YOU HEAR THREE
BLASTS ON A WHISTLE.
I'LL BE WEARING A RED ARMBAND.
```

Some of the techniques that students might have used to decipher it include:

- Looking for interesting letter patterns.
  For example, the word "S’VV" in the ciphertext.
  There aren’t that many contractions (words shortened with an apostrophe) in the English language, much less ones that have the last 2 letters the same.
- Looking at one letter words.
  Generally they’ll be "A" or "I".
- As they figure out which letters in the ciphertext correspond to which letters in the plaintext, they should have been making a list of what they’d figured out, and looking at other words in the ciphertext using those same letters.
- Looking for letters in the ciphertext that seem to appear a lot; these are likely to correspond to common letters in the english alphabet.
- Looking at letters that DIDN’T appear (perhaps they correspond to letters like Q and Z).

If students are stuck, you might need to give them a few hints.

The table they should have gotten should look like this.

{image file-path="img/chapters/caesar-cipher-table-2.png" alt="A table of the English alphabet showing the ciphertext of each letter."}

The learning objective for this activity was for students to think like cryptanalysts and to see why Caesar cipher is not useful in practice.

{panel end}

## How does the Caesar cipher work?

When you looked at the Caesar cipher in the previous section and (hopefully) broke it and figured out what it said, you probably noticed that there was a pattern in how letters from the original message corresponded to letters in the decoded one.
Each letter in the original message decoded to the letter that was 10 places before it in the alphabet.
The conversion table you drew should have highlighted this.
Here's the table for the letter correspondences, where the letter "K" translates to an "A".
It is okay if your conversion table mapped the opposite way, i.e. "A" to "K" rather than "K" to "A".
If you were unable to break the Caesar cipher in the previous section, go back to it now and decode it using the table.

{image file-path="img/chapters/caesar-cipher-table-2.png" alt="A table of the English alphabet showing the ciphertext of each letter."}

For this example, we say the key is *10* because keys in Caesar cipher are a number between 1 and 25 (think carefully about why we wouldn't want a key of 26!), which specify how far the alphabet should be rotated.
If instead we used a key of *8*, the conversion table would be as follows.

{image file-path="img/chapters/caesar-cipher-table-3.png" alt="A table of the English alphabet showing the ciphertext of each letter."}

{panel type="jargon-buster"}

# What is a key?

In a Caesar cipher, the key represents how many places the alphabet should be rotated.
In the examples above, we used keys of "8" and "10".
More generally though, a key is simply a value that is required to do the math for the encryption and decryption.
While Caesar cipher only has 25 possible keys, real encryption systems have an incomprehensibly large number of possible keys, and preferably use keys which contains hundreds or even thousands of binary digits.
Having a huge number of different possible keys is important, because it would take a computer less than a second to try all 25 Caesar cipher keys.

In the physical world, a combination lock is completely analagous to a cipher (in fact, you could send a secret message in a box locked with a combination lock).
We'll assume that the only way to open the box is to work out the combination number.
The combination number is the *key* for the box.
If it's a three-digit lock, you'll only have 1000 values to try out, which might not take too long.
A four-digit lock has 10 times as many values to try out, so is way more secure.
Of course, there may be ways to reduce the amount of work required - for example, if you know that the person who locked it never has a correct digit showing, then you only have 9 digits to guess for each place, rather than 10, which would take less than three quarters of the time!

{panel end}

Try experimenting with the following interactive for Caesar cipher.
You will probably want to refer back to it later while working through the remainder of the sections on Caesar cipher.

{interactive slug="caesar-cipher" type="iframe"}

### Decryption with Caesar cipher

Before, we looked at how to *crack* Casear cipher &ndash; getting the plaintext from the ciphertext without being told the key beforehand.
It is even easier to *decrypt* Caesar cipher when we **do** have the key.
In practice, a good encryption system ensures that the plaintext cannot be obtained from the ciphertext without the key, i.e. it can be *decrypted* but not *cracked*.

As an example of *decrypting* with Caesar cipher, assume that we have the following ciphertext, and that the key is 6.

```text
ZNK WAOIQ HXUCT LUD PASVY UBKX ZNK RGFE JUM
```

Because we know that the key is 6, we can subtract 6 places off each character in the ciphertext.
For example, the letter 6 places before "Z" is "T", 6 places before "N" is "H", and 6 places before "K" is "E".
From this, we know that the first word must be "THE".
Going through the entire ciphertext in this way, we can eventually get the plaintext of:

```text
THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG
```

The interactive above can do this process for you.
Just put the ciphertext into the box on the right, enter the key, and tell it to decrypt.
You should ensure you understand how to encrypt messages yourself though!

{panel type="challenge"}

# Decrypting a Caesar cipher

**Challenge 1**

Decrypt the following message using Caesar cipher.
The key is 4.

```text
HIGVCTXMRK GEIWEV GMTLIV MW IEWC
```

**Challenge 2**

What is the key for the following *cipher text*?

```text
THIS IS A TRICK QUESTION
```

{panel end}

{panel type="teacher-note"}

# Answers for decrypting Caesar cipher

For the first challenge, the answer is:

```text
DECRYPTING CAESAR CIPHER IS EASY
```

For the second challenge, the answer is 26 (or 0, or any multiple of 26).
Because that is a full rotation, the ciphertext and plaintext are equivalent.

{panel end}

### Encryption with Caesar cipher

Encryption is equally straightforward.
Instead of rotating backwards (subtracting) like we did for decrypting, we rotate forwards (add) the key to each letter in the plaintext.
For example, assume we wanted to encrypt the following text with a key of 7.

```text
HOW ARE YOU
```

We would start by working that the letter that is 7 places ahead of "H" is "O", 7 places ahead of "O" is "V", and 7 places ahead of "W" is "D".
This means that the first word of the plaintext encrypts to "OVD" in the ciphertext.
Going through the entire plaintext in this way, we can eventually get the ciphertext of:

```text
OVD HYL FVB
```

{panel type="challenge"}

# Encrypting with Caesar cipher

**Challenge 1**

Encrypt the following message using Caesar cipher and a key of 20:

```text
JUST ANOTHER RANDOM MESSAGE TO ENCRYPT
```

**Challenge 2**

Why is using a key of 26 on the following message not a good idea?

```text
USING A KEY OF TWENTY SIX IN CAESAR CIPHER IS NOT A GOOD IDEA
```

{panel end}

{panel type="teacher-note"}

# Answers for encrypting with Caesar cipher

For the first challenge, the answer is:

```text
DOMN UHINBYL LUHXIG GYMMUAY NI YHWLSJN
```

Note that if students subtracted instead of added, or used the interactive incorrectly, then they will get the wrong answer.

For the second challenge, the answer is hopefully obvious to the students.
Using a key of 26 makes the plaintext and the ciphertext the same – the equivalent of not using encryption at all!

{panel end}

{panel type="curiosity"}

# ROT13 Caesar cipher

The Caesar cipher with a key of 13 is the same as an approach called [ROT13 (rotate 13 characters)](https://en.wikipedia.org/wiki/Rot_13), which is sometimes used to obscure things like the punchline of a joke, a spoiler for a story, the answer to a question, or text that might be offensive.
It is easy to decode (and there are plenty of automatic systems for doing so), but the user has to deliberately ask to see the deciphered version.
A key of 13 for a Caesar cipher has the interesting property that the encryption method is identical to the decryption method i.e. the same program can be used for both.
Many strong encryption methods try to make the encryption and decryption processes as similar as possible so that the same software and/or hardware can be used for both parts of the task, generally with only minor adaptions.

{panel end}

## Problems with substitution ciphers

{panel type="jargon-buster"}

# What is a substitution cipher?

A substitution cipher simply means that each letter in the plaintext is substituted with another letter to form the ciphertext.
If the same letter occurs more than once in the plaintext then it appears the same at each occurrence in the ciphertext.
For example the phrase "HELLO THERE" has multiple H's, E's, and L's.
All the H's in the plaintext might change to "C" in the ciphertext for example.
Caesar cipher is an example of a substitution cipher.
Other substitution ciphers improve on the Caesar cipher by not having all the letters in order, and some older written ciphers use different symbols for each symbol.
However, substitution ciphers are easy to attack because a statistical attack is so easy: you just look for a few common letters and sequences of letters, and match that to common patterns in the language.

{panel end}

So far, we have considered one way of cracking Caesar cipher: using patterns in the text.
By looking for patterns such as one letter words, other short words, double letter patterns, apostrophe positions, and knowing rules such as all words must contain at least one of a, e, i, o, u, or y (excluding some acronyms and words written in txt language of course), cracking Caesar cipher by looking for patterns is easy.
Any good cryptosystem should not be able to be analysed in this way, i.e. it should be *semantically secure*.

{panel type="jargon-buster"}

# What do we mean by semantically secure?

Semantically secure means that there is no known efficient algorithm that can use the ciphertext to get any information about the plaintext, other than the length of the message.
It is very important that cryptosystems used in practice are semantically secure.

As we saw above, Caesar cipher is not semantically secure.

{panel end}

There are many other ways of cracking Caeser cipher which we will look at in this section.
Understanding various common attacks on ciphers is important when looking at sophisticated cryptosystems which are used in practice.

### Frequency analysis attacks

Frequency analysis means looking at how many times each letter appears in the encrypted message, and using this information to crack the code.
A letter that appears many times in a message is far more likely to be "T" than "Z", for example.

The following interactive will help you analyze a piece of text by counting up the letter frequencies.
You can paste in some text to see which are the most common (and least common) characters.

{interactive slug="frequency-analysis" type="iframe"}

The following text has been coded using a Caesar cipher.
To try to make sense of it, paste it into the statistical analyser above.

```text
F QTSL RJXXFLJ HTSYFNSX QTYX TK
XYFYNXYNHFQ HQZJX YMFY HFS GJ
ZXJI YT FSFQDXJ BMFY YMJ RTXY
KWJVZJSY QJYYJWX FWJ, FSI JAJS
YMJ RTXY HTRRTS UFNWX TW YWNUQJX
TK QJYYJWX HFS MJQU YT GWJFP
YMJ HTIJ
```

{panel type="teacher-note"}

# Alternative analysis system

There are also text analysers available online, such as the one on [this website](http://www.richkni.co.uk/php/crypta/freq.php).
For the text given, it gives the output in the table below.

```text
Number of occurrences of each letter in the ciphertext

J: 22          Q: 9          K: 3          D: 1
Y: 21          W: 8          U: 3          B: 1
F: 15          H: 7          Z: 3          P: 1
X: 15          M: 6          I: 3          V: 1
T: 13          N: 5          G: 2          A: 1
S: 10          R: 5          L: 2
```

{panel end}

"E" is the most common letter in the English alphabet.
It is therefore a reasonable guess that "J" in the ciphertext represents "E" in the plaintext.
Because "J" is 5 letters ahead of "E" in the alphabet, we can guess that the key is 5.
If you put the ciphertext into the above interactive and set a key of 5, you will find that this is indeed the correct key.

{interactive slug="caesar-cipher" type="iframe"}

{panel type="spoiler"}

# Decrypted message

The message you should have decrypted is:

```text
A LONG MESSAGE CONTAINS LOTS OF
STATISTICAL CLUES THAT CAN BE
USED TO ANALYSE WHAT THE MOST
FREQUENT LETTERS ARE, AND EVEN
THE MOST COMMON PAIRS OR TRIPLES
OF LETTERS CAN HELP TO BREAK
THE CODE
```

{panel end}

As the message says, long messages contain a lot of statistical clues.
Very short messages (e.g. only a few words) are unlikely to have obvious statistical trends.
Very long messages (e.g. entire books) will *almost* always have "E" as the most common letter.
Wikipedia has a [list of letter frequencies](https://en.wikipedia.org/wiki/Letter_frequency#Relative_frequencies_of_letters_in_the_English_language), which you might find useful.

{panel type="challenge"}

# Frequency analysis

Put the ciphertext into the above frequency analyser, guess what the key is (using the method explained above), and then try using that key with the ciphertext in the interactive above.
Try to guess the key with as few guesses as you can!

**Challenge 1**

```text
WTGT XH PCDIWTG BTHHPVT IWPI NDJ HWDJAS WPKT CD IGDJQAT QGTPZXCV LXIW ATIITG UGTFJTCRN PCPANHXH
```

**Challenge 2**

```text
OCDN ODHZ OCZ HZNNVBZ XJIOVDIN GJON JA OCZ GZOOZM O, RCDXC DN OCZ NZXJIY HJNO XJHHJI GZOOZM DI OCZ VGKCVWZO
```

**Challenge 3**

```text
BGDTCU BCEJ, BCXKGT, CPF BCPG BQQOGF VJTQWIJ VJG BQQ
```

{panel end}

{panel type="teacher-note"}

# Answers for frequency analysis

For the first challenge, the most common letter is "E", with a key of 15:

```text
HERE IS ANOTHER MESSAGE THAT YOU SHOULD HAVE NO TROUBLE BREAKING WITH LETTER FREQUENCY ANALYSIS
```

For the second challenge, the most common letter is "T", with a key of 21:

```text
THIS TIME THE MESSAGE CONTAINS LOTS OF THE LETTER T, WHICH IS THE SECOND MOST COMMON LETTER IN THE ALPHABET
```

For the third challenge, the most common letter is "Z", with a key of 2. Obviously this one was a lot more challenging than the other two!

```text
ZEBRAS ZACH, ZAVIER, AND ZANE ZOOMED THROUGH THE ZOO
```

{panel end}

{panel type="curiosity"}

# The letter E isn't always the most common letter...

Although in almost all English texts the letter E is the most common letter, it isn't always.
For example, the [1939 novel *Gadsby* by Ernest Vincent Wright](https://en.wikipedia.org/wiki/Gadsby_(novel)) doesn't contain a single letter E (this is called a lipogram).
Furthermore, the text you're attacking may not be English.
During World War 1 and 2, the US military had many Native American [Code talkers](https://en.wikipedia.org/wiki/Code_talker) translate messages into their own language, which provided a strong layer of security at the time.

{panel end}

{panel type="curiosity"}

# The Vigenere cipher

A slightly stronger cipher than the Caesar cipher is the [Vigenere cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher), which is created by using multiple Caesar ciphers, where there is a key phrase (e.g. "acb"), and each letter in the key gives the offset (in the example this would be 1, 3, 2).
These offsets are repeated to give the offset for encoding each character in the plaintext.

By having multiple Caesar ciphers, common letters such as E will no longer stand out as much, making frequency analysis a lot more challenging.
The following website shows the effect on the distribution: [The Black Chamber - Vigenere Strength](http://www.simonsingh.net/The_Black_Chamber/vigenere_strength.html)

However, while this makes the Vigenere cipher more challenging to crack than the Caeser cipher, ways have been found to crack it quickly.
In fact, once you know the key length, it just breaks down to cracking several Caesar ciphers (which as you have seen is straightforward, and you can even use frequency analysis on the individual Caesar ciphers!).
Several statistical methods have been devised for working out the key length.

Attacking the Vigenere cipher by trying every possible key is hard because there are a lot more possible keys than for the Caesar cipher, but a statistical attack can work quite quickly.
The Vigenere cipher is known as a *polyalphabetic substitution cipher*, since it is uses multiple substitution rules.

{panel end}

### Known plaintext attacks

Another kind of attack is the *known plaintext* attack, where you know part or all of the solution.
For example, if you know that I start all my messages with "HI THERE", you can easily determine the key for the following message.

```text
AB MAXKX LXVKXM FXXMBGZ TM MPH TF MANKLWTR
```

Even if you did not know the key used a simple rotation (not all substitution ciphers are), you have learnt that A->H, B->I, M->T, X->E, and K->R.
This goes a long way towards deciphering the message.
Filling in the letters you know, you would get:

```text
AB MAXKX LXVKXM FXXMBGZ TM MPH TF MANKLWTR
HI THERE _E__ET _EETI__ _T T__ __ TH______
```

By using the other tricks above, there are a very limited number of possibilities for the remaining letters.
Have a go at figuring it out.

{panel type="spoiler"}

# The above message is...

The deciphered message is:

```text
HI THERE SECRET MEETING AT TWO AM THURSDAY
```

{panel end}

A known plaintext attack breaks a Caesar cipher straight away, but a good cryptosystem shouldn't have this vulnerability because it can be surprisingly easy for someone to know that a particular message is being sent.
For example, a common message might be "Nothing to report", or in online banking there are likely to be common messages like headings in a bank account or parts of the web page that always appear.
Even worse is a *chosen plaintext attack*, where you trick someone into sending your chosen message through their system so that you can see what its ciphertext is.

For this reason, it is essential for any good cryptosystem to not be breakable, even if the attacker has pieces of plaintext along with their corresponding ciphertext to work with.
For this, the cryptosystem should give different ciphertext each time the same plaintext message is encrypted.
It may initially sound impossible to achieve this, although there are several clever techniques used by real cryptosystems.

{panel type="curiosity"}

# More general substitution ciphers

While Caesar cipher has a key specifying a rotation, a more general substitution cipher could randomly scramble the entire alphabet.
This requires a key consisting of a sequence of 26 letters or numbers, specifying which letter maps onto each other one.
For example, the first part of the key could be "D, Z, E", which would mean D: A, Z: B, E:C.
The key would have to have another 23 letters in order to specify the rest of the mapping.

This increases the number of possible keys, and thus reduces the risk of a brute force attack.
A can be substituted for any of the 26 letters in the alphabet, B can then be substituted for any of the 25 remaining letters (26 minus the letter already substituted for A), C can then be substituted for any of the 24 remaining letters, and so on.

This gives us 26 possibilities for A times 25 possibilities for B times 24 possibilities for C, all the way down to 2 possibilities for Y and 1 possibility for Z.

\[
26 \times 25 \times 24 \times 23 \times 22 \times 21 \times 20 \times 19 \times 18 \times 17 \times\\
16 \times 15 \times 14 \times 13 \times 12 \times 11 \times 10 \times 9 \times 8 \times 7 \times 6 \times\\
5 \times 4 \times 3 \times 2 \times 1 = 26!
\]

Representing each of these possibilities requires around 88 bits, making the cipher’s key size around 88 bits, which is below modern standards, although still not too bad!

However, this only solves one of the problems.
The other techniques for breaking Caeser cipher we have looked at are still highly effective on all substitution ciphers, in particular the frequency analysis.
For this reason, we need better ciphers in practice, which we will look at shortly.

{panel end}

### Brute force attacks

Another approach to cracking a ciphertext is a *brute force attack*, which involves trying out all possible keys, and seeing if any of them produce intelligible text.
This is easy for a Caesar cipher because there are only 25 possible keys.
For example, the following ciphertext is a single word, but is too short for a statistical attack.
Try putting it into the decoder above, and trying keys until you decipher it.

```text
EIJUDJQJYEKI
```

{panel type="teacher-note"}

# Answer for the above question

The word is "ostentatious", and has been coded by shifting 16 letters to the right (or 10 to the left).

{panel end}

These days encryption keys are normally numbers that are 128 bits or longer.
You could calculate how long it would take to try out every possible 128 bit number if a computer could test a million every second (including testing if each decoded text contains English words).
It will eventually crack the message, but after the amount of time it would take, it's unlikely to be useful anymore – and the user of the key has probably changed it!

In fact, if we analyse it, a 128 bit key at 1,000,000 per second would take 10,790,283,070,000,000,000,000,000 years to test.
Of course, it might find something in the first year, but the chances of that are ridiculously low, and it would be more realistic to hope to win the top prize in Lotto three times consecutively (and you'd probably get more money).
On average, it will take around half that amount, i.e. a bit more than 5,000,000,000,000,000,000,000,000 years.
Even if you get a really fast computer that can check one trillion keys a second (rather unrealistic in practice), it would still take around 5,000,000,000,000 years.
Even if you could get one million of those computers (even more unrealistic in practice), it would still take 5,000,000 years.

And even if you did have the hardware that was considered above, then people would start using bigger keys.
Every bit added to the key will double the number of years required to guess it.
Just adding an extra 15 or 20 bits to the key in the above example will safely push the time required back to well beyond the expected life span of the Earth and Sun! This is how real cryptosystems protect themselves from brute force attacks.
Cryptography relies a lot on low probabilities of success.

The calculator below can handle really big numbers.
You can double check our calculations above if you want! Also, work out what would happen if the key size was double (i.e. 256 bits), or if a 1024 or 2048 bit key (common these days) was used.

{interactive slug="big-number-calculator" type="in-page"}

{panel type="curiosity"}

# Tractability – problems that take too long to solve

Brute force attacks try out every possible key, and the number of possible keys grows *exponentially* as the key gets longer.
As we saw above, no modern computer system could try out all possible 128 bit key values in a useful amount of time, and even if it were possible, adding just one more bit would double how long it would take.

In computer science, problems that take an exponential amount of time to solve are generally regarded as not being
{glossary-link term="tractable" reference-text="encryption"}tractable{glossary-link end}
— that is, you can't get any traction on them; it's as if you're spinning your wheels.
Working out which problems are tractable and which are intractable is a major area of research in computer science — many other problems that we care about appear to be intractable, much to our frustration.
The area of encryption is one of the few situations where we're pleased that an algorithm is intractible!

This guide has a [whole chapter about tractability]('chapters:chapter' 'complexity-and-tractability'), where you can explore these issues further.

{panel end}

{panel type="jargon-buster"}

# Terminology you should now be familiar with

The main terminology you should be familiar with now is that a *plaintext* is *encrypted* by a *cipher* to create a *ciphertext* using an *encryption key*.
Someone without the encryption key who wants to *attack* the cipher could try various approaches, including a *brute force attack* (trying out all possible keys), a *frequency analysis attack* (looking for statistical patterns), and a *known plaintext attack* (matching some known text with the cipher to work out the key).

If you were given an example of a simple cipher being used, you should be able to talk about it using the proper terminology.

{panel end}
