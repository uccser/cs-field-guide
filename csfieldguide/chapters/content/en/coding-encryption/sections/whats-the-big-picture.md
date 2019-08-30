# What's the big picture?

An encryption system often consists of two computer programs: one to *encrypt* some data (referred to as {glossary-link term="plaintext"}plaintext{glossary-link end}) into a form that looks like nonsense (the {glossary-link term="ciphertext"}ciphertext{glossary-link end}), and a second program that can *decrypt* the ciphertext back into the plaintext form.
The encryption and decryption is carried out using some very clever math on the text with a chosen {glossary-link term="encryption-key"}key{glossary-link end}.
You will learn more about these concepts shortly.

Of course, we wouldn't need encryption if we lived in a world where everyone was honest and could be trusted, and it was ok for anyone to have access to all your personal information such as health records, online discussions, bank accounts and so on, and if you knew that no-one would interfere with things like aircraft control systems and computer controlled weapons.
However, information is worth money, people value their privacy, and safety is important, so encryption has become fundamental to the design of computer systems.
Even breaking the security on a traffic light system could be used to personal advantage.

{panel type="curiosity"}

# A case of hacking traffic lights

An interesting example of the value of using encryption outside of secret messages is the two engineers who were convicted of [changing traffic light patterns to cause chaos during a strike](http://latimesblogs.latimes.com/lanow/2009/12/engineers-who-hacked-in-la-traffic-signal-computers-jamming-traffic-sentenced.html).
A related problem in the US was traffic signals that could respond to codes from emergency vehicles to change to green; originally these didn't use encryption, and people could figure out how to trigger them to their own advantage.

{panel end}

A big issue with encryption systems is people who want to break into them and decrypt messages without the key (which is some secret value or setting that can be used to unlock an encrypted file).
Some systems that were used many years ago were discovered to be insecure because of attacks, so could no longer be used.
It is possible that somebody will find an effective way of breaking into the widespread systems we use these days, which would cause a lot of problems.

Like all technologies, encryption can be used for good and bad purposes.
A human rights organisation might use encryption to secretly send photographs of human rights abuse to the media, while drug traffickers might use it to avoid having their plans read by investigators.
Understanding how encryption works and what is possible can help to make informed decisions around things like freedom of speech, human rights, tracking criminal activity, personal privacy, identity theft, online banking and payments, and the safety of systems that might be taken over if they were "hacked into".

{panel type="jargon-buster"}

# Deciphering, decrypting, attacking, cracking, hacking, cryptanalysts, hackers, and crackers

There are various words that can be used to refer to trying to get the plaintext from a ciphertext, including decipher, decrypt, crack, and cryptanalysis.
Often the process of trying to break cryptography is referred to as an "attack".
The term "hack" is also sometimes used, but it has other connotations, and is only used informally.

People who try to decrypt messages are called cryptanalysts; more informal terms like hackers and crackers are sometimes used, generally with the implication that they have bad intentions.
Being a cryptanalyst is generally a good thing to do though: people who use encryption systems actually want to know if they have weaknesses, and don't want to wait until the bad guys find out for them.
It's like a security guard checking doors on a building; the guard hopes that they can't get in, but if a door is found unlocked, they can do something about it to make sure the bad guys can't get in.
Of course, if a security guard finds an open door, and takes advantage of that to steal something for themselves, they're no longer doing their job properly!

{panel end}
