# Storing passwords securely

A really interesting puzzle in encryption is storing passwords in a way that even if the database with the passwords gets leaked, the passwords are not in a usable form.
Such a system has many seemingly conflicting requirements.

- When a user logs in, it must be possible to check that they have entered the correct password.
- Even if the database is leaked, and the attacker has huge amounts of computing power:
    - The database should not give away obvious information, such as password lengths, users who chose the same passwords, letter frequencies of the passwords, or patterns in the passwords.
    - At the very least, users should have several days/weeks to be able to change their password before the attacker cracks it.
  Ideally, it should not be possible for them to ever recover the passwords.
- There should be no way of recovering a forgotten password.
  If the user forgets their password, it must be reset.
  Even system administrators should not have access to a user's password.

Most login systems have a limit to how many times you can guess a password.
This protects all but the poorest passwords from being guessed through a well designed login form.
Suspicious login detection by checking IP address and country of origin is also becoming more common.
However, none of these application enforced protections are of any use once the attacker has a copy of the database and can throw as much computational power at it as they want, without the restrictions the application enforces.
This is often referred to "offline" attacking, because the attacker can attack the database in their own time.

In this section, we will look at a few widely used algorithms for secure password storage.
We will then look at a couple of case studies where large databases were leaked.
Secure password storage comes down to using clever encryption algorithms and techniques, and ensuring users choose effective passwords.
Learning about password storage might also help you to understand the importance of choosing good passwords and not using the same password across multiple important sites.

## Hashing passwords

A {glossary-link term="hash-function"}hashing algorithm{glossary-link end} is an {glossary-link term="algorithm"}algorithm{glossary-link end} that takes a password and performs complex computations on it and then outputs a seemingly random string of characters called a *hash*.
This process is called *hashing*.
Good hashing algorithms have the following properties:

- Each time a specific password is hashed, it should give the same hash.
- Given a specific **hash**, it should be impossible to efficiently compute what the original password was.

Mathematically, a hashing algorithm is called a "one way function".
This just means that it is very easy to compute a hash for a given password, but trying to recover the password from a given hash can only be done by brute force.
In other words, it is easy to go one way, but it is almost impossible to reverse it.
A popular algorithm for hashing is called SHA-256.
The remainder of this chapter will focus on SHA-256.

{panel type="jargon-buster"}

# What is meant by brute force?

In the [Caesar cipher section]('chapters:chapter_section' 'coding-encryption' 'substitution-ciphers'), we talked briefly about brute force attacks.
Brute force attack in that context meant trying every possible key until the correct one was found.

More generally, brute force is trying every possibility until a solution is found.
For hashing, this means going through a long list of possible passwords, running each through the hashing algorithm, and then checking if the resulting hash is identical to the one that we are trying to reverse.

{panel end}

For passwords, this is great.
Instead of storing passwords in our database, we can store hashes.
When a user signs up or changes their password, we simply need to put the password through the SHA-256 algorithm and then store the output hash instead of the password.
When the user wants to log in, we just have to put their password through the SHA-256 algorithm again.
If the output hash matches the one in the database, then the user has to have entered the correct password.
If an attacker manages to access the password database, they cannot determine what the actual passwords are.
The hashes themselves are not useful to the attacker.

The following interactive allows you to hash words, such as passwords (but please don't put your real password into it, as you should never enter your password on random sites).
If you were to enter a well chosen password (e.g. a random string of numbers and letters), and it was of sufficient length, you could safely put the hash on a public website, and nobody would be able to determine what your actual password was.

{interactive slug="sha2" type="in-page"}

For example, the following database table shows four users of a fictional system, and the hashes of their passwords.
You could determine their passwords by putting various possibilities through SHA-256 and checking whether or not the output is equivalent to any of the passwords in the database.

{image file-path="img/chapters/hash-passwords-table.png" alt="A table of four passwords and their corresponding hashes."}

It might initially sound like we have the perfect system.
But unfortunately, there is still a big problem.
You can find *rainbow tables* online, which are precomputed lists of common passwords with what value they hash to.
It isn't too difficult to generate rainbow tables containing all passwords up to a certain size (this is one reason why using long passwords is strongly recommended!).
This problem can be avoided by choosing a password that isn't a common word or combination of words.

Hashing is a good start, but we need to further improve our system so that if two users choose the same password, their hash is not the same, while still ensuring that it is possible to check whether or not a user has entered the correct password.
The next idea, salting, addresses this issue.

{panel type="curiosity"}

# Passwords that hash to the same value

When we said that if the hashed password matches the one in the database, then the user has to have entered the correct password, we were not telling the full truth.
Mathematically, we know that there have to be passwords which would hash to the same value.
This is because the length of the output hash has a maximum length, whereas the password length (or other data being hashed) could be much larger.
Therefore, there are more possible inputs than outputs, so some inputs must have the same output.
When two different inputs have the same output hash, we call it a *collision*.

Currently, nobody knows of two unique passwords which hash to the same value with SHA-256.
There is no known mathematical way of finding collisons, other than hashing many values and then trying to find a pair which has the same hash.
The probability of finding one in this way is believed to be in the order of 1 in a trillion trillion trillion trillion trillion.
With current computing power, nobody can come even close to this without it taking longer than the life of the sun and possibly the universe.

Some old algorithms, such as MD5 and SHA-1 were discovered to not be as immune to finding collisions as was initially thought.
It is possible that there are ways of finding collisions more efficiently than by luck.
Therefore, their use is now discouraged for applications where collisions could cause problems.

For password storage, collisions aren't really an issue anyway.
Chances are, the password the user selected is somewhat predictable (e.g. a word out of a dictionary, with slight modifications), and an attacker is far more likely to guess the original password than one that happens to hash to the same value as it.

But hashing is used for more than just password storage.
It is also used for digital signatures, which must be unique.
For those applications, it is important to ensure collisions cannot be found.

{panel end}

## Hashing passwords with a salt

A really clever technique which solves some of the problems of using a plain hash is salting.
Salting simply means to attach some extra data, called {glossary-link term="salt"}salt{glossary-link end}, onto the end of the password and then hash the combined password and salt.
Normally the salt is quite large (e.g. 128 bits).
When a user tries to log in, we will need to know the salt for their password so that it can be added to the password before hashing and checking.
While this initially sounds challenging, the salt should not be treated as a secret.
Knowing the salt does not help the attacker to mathematically reverse the hash and recover the password.
Therefore, a common practice is to store it in plaintext in the database.

So now when a user registers, a long random salt value is generated, added to the end of their password, and the combined password and salt is hashed.
The plaintext salt is stored next to the hash.

{comment add Extra for Experts: Hashing passwords with a salt and stretching}

## The importance of good user passwords

If the passwords are salted and hashed, then a rainbow table is useless to the attacker.
With current computing power and storage, it is impossible to generate rainbow tables for all common passwords with all possible salts.
This slows the attacker down greatly, however they can still try and guess each password one by one.
They simply need to guess passwords, add the salt to them, and then check if the hash is the one in the database.

A common brute force attack is a {glossary-link term="dictionary-attack}dictionary attack{glossary-link end}.
This is where the attacker writes a simple program that goes through a long list of dictionary words, other common passwords, and all combinations of characters under a certain length.
For each entry in the list, the program adds the salt to the entry and then hashes to see if it matches the hash they are trying to determine the password for.
Good hardware can check millions, or even billions, of entries a second.
Many user passwords can be discovered in less than a second using a dictionary attack.

Unfortunately for end users, many companies keep database leaks very quiet as it is a huge embarrassment that could cripple the company.
Sometimes the company doesn't know its database was leaked, or has suspicions that it was but for PR reasons they choose to deny it.
In the best case, they might require you to pick a new password, giving a vague excuse.
For this reason, it is important to use different passwords on every site to ensure that the attacker does not break into accounts you own on other sites.
There are quite possibly passwords of yours that you think nobody knows, but somewhere in the world an attacker has recovered it from a database they broke into.

{comment Add password guessing interactive https://github.com/uccser/cs-field-guide/issues/606}

While in theory, encrypting the salts sounds like a good way to add further security, it isn't as great in practice.
We couldn't use a one way hash function (as we need the salt to check the password), so instead would have to use one of the encryption methods we looked at earlier which use a secret key to unlock.
This secret key would have to be accessible by the program that checks password (else it can't get the salts it needs to check passwords!), and we have to assume the attacker could get ahold of that as well.
The best security against offline brute force attacks is good user passwords.

This is why websites have a minimum password length, and often require a mix of lowercase, uppercase, symbols, and numbers.
There are 96 standard characters you can use in a password.
26 upper case letters, 26 lower case letters, 10 digits, and 34 symbols.
If the password you choose is completely random (e.g. no words or patterns), then each character you add makes your password 96 times more difficult to guess.
Between 8 and 16 characters long can provide a very high level of security, as long as the password is truly random.
Ideally, this is the kind of passwords you should be using (and ensure you are using a different password for each site!).

Unfortunately though, these requirements don't work well for getting users to pick good passwords.
Attackers know the tricks users use to make passwords that meet the restrictions, but can be remembered.
For example, P@$$w0rd contains 8 characters (a commonly used minimum), and contains a mix of different types of characters.
But attackers know that users like to replace S's with $'s, mix o and 0, replace i with !, etc.
In fact, they can just add these tricks into their list they use for dictionary attacks!
For websites that require passwords to have at least one digit, the result is even worse.
Many users pick a standard English word and then add a single digit to the end of it.
This again is easy work for a dictionary attack to crack!

As this xkcd comic points out, most password advice doesn't make a lot of sense.

{image file-path="img/chapters/xkcd-password-strength.png" hover-text="To anyone who understands information theory and security and is in an infuriating argument with someone who does not (possibly involving mixed case), I sincerely apologize." alt="A xkcd comic about password strength" source="https://xkcd.com/936/"}

You might not know what some of the words mean.
In easy terms, what it is saying is that there are significantly fewer modifications of common dictionary words than there is of a random selection of four of the 2000 most common dictionary words.
Note that the estimates are based on trying to guess through a login system.
With a leaked database, the attacker can test billions of passwords a second rather than just a few thousand.

{comment TODO: ## Real world case studies}

{comment TODO: ### Adobethe challenges}

{comment TODO: - Good storage techniques}

{comment TODO: - Unfortunately the most sensitive data was the email addresses}
