# Encryption (2.44) - RSA Cryptosystem (Excellence level)

{panel type="additional-information" summary="Required skills and preparation for this project"}
Note that for this project, reading the field guide material thoroughly and doing all the activities is particularly important in order to understand and do a good project at the merit/ excellence level. We strongly recommend staying away from merit/ excellence in encryption for students who won't be willing to properly engage in the field guide material. Understanding the issues well enough to do merit/ excellence requires having worked through the material.

On the other hand, it is probably the most rewarding topics, with very high real world relevance. Many students will be quite concerned about the security of their conversations with their friends over electronic media!

Students initially begin by looking at substitution ciphers, and then the various ways of breaking them. The reason for looking at the various ways substitution ciphers can be broken is intended to give students an appreciation of the various issues that have to be considered when designing a real world cryptosystem.Then, students look at the concept of public key cryptosystems, and the finally an algorithm that is used in real world cryptosystems.
{panel end}

This is a guide for students attempting encryption (one of the three encoding subtopics) in digital technologies achievement standard 2.44 (AS91371).

Remember that you only need to do one of the three encoding topics (Compression, Encryption, or Error Control Coding)  to the excellence level. The other two only need to be done to the achieved level. This guide is suitable for doing encryption to the excellence level, but can also be used for the achieved level for encryption.

In order to fully cover the standard, you will also need to have done projects covering the topics of *error control coding* and *compression* to at least the achieved level, and projects covering the topics of *representing data using bits* and *human computer interaction*, and included these in your report.

## Overview

Encoding has the following bullet points in achievement standard 2.44 which this guide covers.
- **Achieved**: “describing the concept of encoding information using compression coding, error control coding, and encryption; and typical uses of encoded information”
- **Merit**: “discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption”
- **Excellence**: “evaluating a widely used system for compression coding, error control coding, or encryption”

As with all externally assessed reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

You should read and work through the activities in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

Read all of these sections, as they give the necessary introduction of the topics

TODO


## Project

### Achieved

{panel type="teacher-note" summary="Why look at Caesar Cipher?"}
Students may point out that Caeser cipher is no good in practice, and wonder why they have to use it in their report.

Firstly, it ensures the student actually has done the minimum required for Achieved.

For Merit and Excellence it is also useful, as it gives students a benchmark to evaluate a real cryptosystem, such as RSA. An important part of the evaluation is to discuss non trivial issues addressed by RSA, and Caeser cipher illustrates many of these issues.
{panel end}

Do the following to make an example to include in your report. This will ensure you satisfy the achieved criteria, and give you a starting point for your merit/ excellence discussion.

1. Write a short sentence that you could send to a classmate (must be appropriate to include in your report). This message is your *plain text*.
2. Choose a number between 1 and 25 that will be your encryption key.
3. Make a conversion table that shows how each letter in your *plain text* should be changed using your key.
4. *Encrypt* your *plain text* message using your chosen *key* in order to obtain your *ciphertext*.

Include your plain text, key, conversion table, and ciphertext in your report. Be sure to clearly label each of these four parts of your example using the correct terminology. What will your classmate need to decrypt the message?

Why is encryption so important in computer science? (assuming the cipher is one that is a lot more difficult to break than Caesar cipher!)

Explain why Caesar Cipher is unsuitable in practice. One medium sized paragraph should be enough (e.g. 3 to 5 sentences).

### Merit

Public Key Encryption is essential for e-commerce. For the next part of your project, you are going to show and explain how it is used in practice.

Your example should include:
- A public/private key pair for a public key system (use the RSA interactives in the field guide)
 - Remember that the website is the only one who has access to the private key.
 - And the public key is available to anybody who wants it.
- A private key for a single key cipher (e.g. AES or DES)
- The process of using the public key system's keys to safely transfer the private key for AES or DES.

Your explanation should cover the following points:
- How public key encryption differs from encryption that uses the same key for both encrypting and decrypting.
- How public key encryption is used to set up a secure communication between the shopper and the website.
- Why public key encryption is essential for this process (e.g. what problems would occur if we could only use ciphers with the same key for encrypting and decrypting).
- Why AES or DES is used after the initial set up.
- Why this process is so important for secure and efficient e-commerce.

All up, you should aim for around 1 page of writing and diagrams for this part of the project.

### Excellence

For this final part, you will evaluate RSA -- the algorithm used by public key systems. Remember back to Caesar Cipher, and its many weaknesses. Does RSA have any of the same weaknesses? Some points you might like to investigate or discuss include:
- Caesar cipher vs RSA on messages that are very similar (show an example for both algorithms so you can compare them). Does RSA give away information about the plaintext like Caesar Cipher does?
- The use of random padding by RSA in order to ensure that even if the same plaintext is encrypted more than once with the same public key, the ciphertext for each occurrence is different.
- How long a typical sized RSA key might take to break (make sensible assumptions about the number of bits in the key, the number of computers able to work on breaking it, computer speed, etc). Make sure you discuss the implications, and how much (or little) slightly modifying your assumptions would change the overall conclusion.

Be sure to show examples to illustrate all the points you make.

RSA isn’t perfect, and there are a few ways to potentially break it which you should have read about in the field guide. What is at least one of these problems? How is it addressed? Is this solution guaranteed to always work?

Discuss what you have found from this evaluation: is RSA a good cryptosystem?

All up, you should aim for around 1 page of writing and examples for this part of the project (a little less is okay, and infact desirable, if you wrote very concisely)

## Hints for success

- Display your examples using the standard font size.
- Put encryption in its own section (your report should have suitable headings and subheadings for each topic to make it clear for the marker) and ensure that you briefly introduce the topic. It is important that your report clearly demonstrates that you know the difference between encryption, error control coding, and compression, and what their different purposes are.
- You should be able to discuss this material, with examples, in about 3 pages of your report.
