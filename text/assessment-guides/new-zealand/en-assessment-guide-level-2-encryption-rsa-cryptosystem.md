# Encryption (2.44) - RSA Cryptosystem

This is a guide for students attempting encryption (one of the three encoding subtopics) in digital technologies achievement standard 2.44 (AS91371).

Remember that you only need to do one of the three encoding topics (Compression, Encryption, or Error Control Coding)  to the excellence level. The other two only need to be done to the achieved level. This guide is suitable for both doing encryption to the excellence level, but can also be used for the achieved level for encryption.

In order to fully cover the standard, you will also need to have done projects covering the topics of *error control coding* and *compression* to at least the achieved level, and projects covering the topics of *representing data using bits* and *human computer interaction*, and included these in your report.

## Overview

Encoding has the following bullet points in achievement standard 2.44 which this guide covers.

**Achieved**: “describing the concept of encoding information using compression coding, error control coding, and encryption; and typical uses of encoded information”

**Merit**: “discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption”

**Excellence**: “evaluating a widely used system for compression coding, error control coding, or encryption”

As with all externally assessed reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

You should read and work through the activities in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

Read all of these sections, as they give the necessary introduction of the topics

[8.1 - What’s the Big Picture?](chapters/coding-encryption.html#whats-the-big-picture)

[8.2 - Substitution Ciphers](chapters/coding-encryption.html#substitution-ciphers)

[8.3 - Problems with Substitution Ciphers (Needed only for Merit/ Excellence)](chapters/coding-encryption.html#problems-with-substitution-ciphers)

[8.4 - Public Key Systems (Needed only for Merit/ Excellence)](chapters/coding-encryption.html#public-key-systems)

[8.5 - The RSA Cryptosystem](chapters/coding-encryption.html#the-rsa-cryptosystem)

Note that for this project, reading the field guide material thoroughly and doing all the activities is particularly important in order to understand and do a good project at the merit/ excellence level.

{teacher}

We strongly recommend staying away from merit/ excellence in encryption for students who won't be willing to properly engage in the field guide material. Understanding the issues well enough to do merit/ excellence requires having worked through the material.

On the other hand, it is probably the most rewarding topics, with very high real world relevance. Many students will be quite concerned about the security of their conversations with their friends over electronic media!

Students initially begin by looking at substitution ciphers, and then the various ways of breaking them. The reason for looking at the various ways substitution ciphers can be broken is intended to give students an appreciation of the various issues that have to be considered when designing a real world cryptosystem.Then, students look at the concept of public key cryptosystems, and the finally an algorithm that is used in real world cryptosystems.

{teacher end}

## Project

For the achieved criteria you will show an example of the Caeser cipher and describe how by using a *key*, *plaintext* can be converted to *ciphertext*, and then the *ciphertext* can be converted back to *plaintext* by anybody who has the key.

{teacher}

Students may point out that Caeser cipher is no good in practice, and wonder why they have to use it in their report.

The reason is that for achieved, it is useful for illustrating the general concepts of encryption in order to demonstrate understanding of what encryption is about.

For merit and excellence, it is also useful as it gives students a benchmark to evaluate a real cryptosystem, such as RSA. An important part of the evaluation is to discuss non trivial issues addressed by RSA, and Caeser cipher illustrates many of these issues.

{teacher end}

For the merit and excellence criteria, you will show an example of the RSA cryptosystem, describing how its differences to Caesar cipher allow it to be used in practice, and then you will show the kinds of attacks and limitations that make the Caesar cipher unsuitable in practice, and discuss whether or not similar limitations exist in RSA.

### Writing your report

**Achieved**

Do the following to make an example to include in your report.

1. Write a short sentence that you could send to a classmate (must be appropriate to include in your report). This message is your *plain text*.
2. Choose a number between 1 and 25 that will be your encryption key.
3. Make a conversion table that shows how each letter in your *plain text* should be changed using your key.
4. *Encrypt* your *plain text* message using your chosen *key* in order to obtain your *ciphertext*.

Include your plain text, key, conversion table, and ciphertext in your report. Be sure to clearly label each of these four parts of your example using the correct terminology. What will your classmate need to decrypt the message?

Why is encryption so important in computer science? (assuming the cipher is one that is a lot more difficult to break than Caesar cipher!)

**Merit/ Excellence**

Generate a pair of RSA keys using the field guide interactive, and encrypt a message with the public key using the other field guide interactive. Then, show how it can be decrypted with the private key. Include the keys, plaintext, ciphertext, and a brief explanation of how public key cryptosystems such as RSA are used, and why they are so useful.

{comment}

Do students actually need to include the acheived stuff at all if doing merit/ excellence?

Could add a note in achieved that: If a student describes the concept of encryption through the merit/excellence guide then it isn't essential to do the work described in this section, but we recommend it as a warmup.

{comment end}

What kinds of systems in the world depend on RSA being able to resist attacks? What kinds of things would happen if somebody came up with a good way of breaking RSA?

In order to do a good evaluation of RSA cryptosystems, you will need to show why particular attacks will not work, and how some potential issues are addressed. Some of this will involve comparing to Caesar cipher. Show personalised examples of the following (come up with your own messages, don’t just copy the field guide ones!) Remember that the interactives in the field guide will help you to generate personalised examples.

- Caesar cipher vs RSA on messages that are very similar (show an example for both algorithms so you can compare them)
- The use of random padding in order to ensure that even if the same plaintext is encrypted more than once with the same public key, the ciphertext for each occurrence is different.
- How long a typical sized RSA key might take to break (make sensible assumptions about the number of bits in the key, the number of computers able to work on breaking it, computer speed, etc). Make sure you discuss the implications, and how much (or little) slightly modifying your assumptions would change the overall conclusion.

For each of your examples, explain why the issue is very important to address (what kinds of attacks could be carried out if the issue had been overlooked?)

RSA isn’t perfect, and there are a few ways to potentially break it which you should have read about in the field guide. What is at least one of these problems? How is it addressed? Is this solution guaranteed to always work?

Discuss what you have found from this evaluation: is RSA a good cryptosystem?

## Hints for success

- Display your examples using the standard font size.
- Put encryption in its own section (your report should have suitable headings and subheadings for each topic to make it clear for the marker) and ensure that you briefly introduce the topic. It is important that your report clearly demonstrates that you know the difference between encryption, error control coding, and compression, and what their different purposes are.
- You should be able to discuss this material, with examples, in about 2 or 3 pages of your report.
