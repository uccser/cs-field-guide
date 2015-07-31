# Error Control Coding (2.44) - Check Sums

This is a guide for students attempting error control coding (one of the three encoding subtopics) in digital technologies achievement standard 2.44 (AS91371).

Remember that you only need to do one of the three encoding topics (Compression, Encryption, or Error Control Coding)  to the excellence level. The other two only need to be done to the achieved level. This guide is suitable for both doing error control coding to the excellence level, but can also be used for the achieved level for error control coding.

In order to fully cover the standard, you will also need to have done projects covering the topics of *encryption* and *compression* to at least the achieved level, and projects covering the topics of *representing data using bits* and *human computer interaction*, and included these in your report.

## Overview

Encoding has the following bullet points in achievement standard 2.44 which this guide covers.

**Achieved**: “describing the concept of encoding information using compression coding, error control coding, and encryption; and typical uses of encoded information”

**Merit**: “discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption”

**Excellence**: “evaluating a widely used system for compression coding, error control coding, or encryption”

As with all externally assessed reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

Read all of these sections, as they give the necessary introduction of the topics

[9.1 - What’s the Big Picture?](chapters/coding-error-control.html#whats-the-big-picture)

[9.3 - Check digits on barcodes and other numbers](chapters/coding-error-control.html#check-digits-on-barcodes-and-other-numbers)

## Project

For the achieved criteria you will show how the barcode on a product you chose has a check digit which helps to ensure that when a shop assistant scans or enters the number into a computer, that the computer is able to notify them if it was entered incorrectly. For the merit and excellence criteria, you will explain why this is so important, and evaluate how effective it is.

{teacher}

This activity could also be carried out using ISBN numbers on library books or credit card numbers.

Credit card numbers may be problematic for privacy and security reasons.

{teacher end}

### Writing your report

**Achieved**

Find some products with barcodes on them, and the checker will tell you whether or not it is a correct barcode. Try a few others. Does it ever seem to say a number was wrong? Now try change one digit in a barcode. Does it ever still say the barcode is correct? Choose one product to take a photo of the barcode, and describe how the last digit is a check digit that ensures the number was entered correctly (it's a good idea to include the calculation that was used to calculate the check digit’s value). Show that when you enter the number into the barcode and change one of the digits, the last digit is no longer correct.

{teacher}

Students could either bring some (clean!) food packaging from home, or you could build up a large collection of food packaging that they can use (making sure to have enough so that each student can use on a different one in their example.

{teacher end}

{comment}

.. close paren needed at end (most food packaging will contain a barcode). Enter one of the barcode numbers into the barcode checker in the field guide

.. Tim: IMPORTANT, this interactive needs to be redone asap!!!

.. For CS4HS we could use the spreadsheet, then work on the interactive over summer.
Explain why you would want to use a check digit on a barcode. What is the purpose of error control coding?

{comment end}

{teacher}

This covers “describing the concept of encoding information using compression coding, error control coding, and encryption; and typical uses of encoded information”

While this partially covers merit, we include it in achieved to help ensure the student has written at least something about the purpose of error control coding, as opposed to just focussing on check digits and ignoring the bigger picture.

{teacher end}

**Merit/ Excellence**

What could be some of the implications of a number being entered incorrectly, and this not being detected? What kinds of things could happen to the shop?

Think of what some of the common errors could be if somebody was manually entering the number into a computer. What mistakes are easy to make? (clue: missing a digit or swapping 2 adjacent digits are common mistakes, however there are others as well). Also think about what could cause errors if a scanner was being used to read the barcode.

Using the barcodes you found earlier, replicate some of the common errors that would occur when a person manually enters the number into the computer by entering the mistakes into the checker. Try lots of variations of the errors, and see if the errors are always detected. Which errors always seem to be detected? Which do not? Discuss whether or not the check digits decrease the chances of errors, particularly common ones. Do you think that sometimes mistakes do go undetected? Remember that really obscure errors (such as getting 3 digits in a row incorrect) will probably never occur in practice, and the intention of the check digit is to pick up small mistakes.

{teacher}

This covers “discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption”

and “evaluating a widely used system for compression coding, error control coding, or encryption”.

While students might be able to satisfy the merit criteria with just the first part, this is probably risky. Students are best covering the merit criteria by doing the excellence evaluation well, as this will show why the check digits are so important.

{teacher end}

Your discussion should include a few examples of common errors you tried replicating (use screenshots), and whether or not the check digit was able to detect them.

## Hints for success

- Put error control coding in its own section (your report should have suitable headings and subheadings for each topic to make it clear for the marker) and ensure that you briefly introduce the topic. It is important that your report clearly demonstrates that you know the difference between encryption, error control coding, and compression, and what their different purposes are.
- Be sure to shrink down examples so they do not take up too much space. A barcode only needs to be big enough for the numbers to be readable; it does not need to take up half a page!
- For merit, you should not just paraphrase information. You need to use your own thinking to generate some of the answers, as your own experiences should enable you to come up with a lot of the answers. As an example, you should already know that if you bought something from the shop, and the scanner read the barcode wrong, and you were charged twice as much, you would not be happy about it! The implications of not having the technology are an important part of the discussion — what would happen if these systems weren’t used?
- For excellence, don’t simply discuss whether or not the algorithm is good without examples. You *must* have examples so that your work is personalised. Show some of the errors and whether or not they generate the correct check digit. If you find examples with simple common errors where the error did give the correct check digit, this is really good to show.
- You should be able to discuss this material, with examples, in about 2 or 3 pages of your report.
