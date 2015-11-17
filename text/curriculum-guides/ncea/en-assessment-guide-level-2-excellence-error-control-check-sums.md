# Excellence Guide for Error Control Coding (2.44) - Check Sums

This is a guide for students attempting error control coding (one of the three encoding subtopics) in digital technologies achievement standard 2.44 (AS91371).

Remember that you only need to do one of the three encoding topics (compression, encryption, and error control coding)  to the excellence level. The other two only need to be done to the achieved level. Because this guide is an excellence guide, you should only be looking at it if you have chosen error control coding as your encoding topic to take to the excellence level.

In order to fully cover the standard, you will also need to have done projects covering the topics of encryption and compression to the achieved level, and projects covering the topics of representing data using bits and human computer interaction, and include these in your report.

## Overview

Encoding has the following bullet points in achievement standard 2.44 which this guide covers.

**Achieved**: “describing the concept of encoding information using compression coding, error control coding, and encryption; and typical uses of encoded information”

**Merit**: “discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption”

**Excellence**: “evaluating a widely used system for compression coding, error control coding, or encryption”

As with all externally assessed reports, you should base your explanations around personalised examples.

### Clarification on terminology

In this guide, the widely used technology and widely used system are:

*Widely used Technology*: Product barcode numbers

*Widely used System*: Check digits

## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

Read all of these sections, as they give the necessary introduction of the topics

[9.1 - What’s the Big Picture?](chapters/coding-error-control.html#whats-the-big-picture)

[9.3 - Check digits on barcodes and other numbers](chapters/coding-error-control.html#check-digits-on-barcodes-and-other-numbers)

## Project

{panel type="teacher-note" summary="Alternatives to product barcode numbers"}
This activity could also be carried out using ISBN numbers on library books or credit card numbers.

Credit card numbers may be problematic for privacy and security reasons.
{panel end}

{panel type="teacher-note" summary="Getting the barcode numbers needed"}
Students could either bring some (clean!) food packaging from home, or you could build up a large collection of food packaging that they can use (making sure to have enough so that each student can use on a different one in their example.
{panel end}

{panel type="teacher-note" summary="Parts of the standard covered"}
The first part covers “describing the concept of encoding information using ~~compression coding,~~ error control coding ~~, and encryption;~~ and typical uses of encoded information”
{panel end}

Start this section by writing an introduction to the topic of error control coding. *Briefly* explain what error control coding is, what it is used for, and what kinds of problems would exist if there was no such thing as error control coding. Briefly describe what a check digit is, and how it fits into the larger topic of error control coding. This introduction only needs to be a few sentences - you are just showing the marker that you understand the bigger picture of what error control coding is, and some of the typical uses of it.

Now you are going to show an example of error control coding in action to include in your report. Get the packaging for a food you like, ensuring it has a barcode on it. Take a photo of the barcode and include it in your report, with a small caption saying what the product is and that you are going to use it to investigate check digits.

Enter the barcode number into the interactive in the field guide, and take a screenshot of the interactive showing that the barcode number is valid. Change *one* digit of the barcode number in the interactive and show that the interactive now says it is invalid.

Describe how the barcode number checker interactive was able to determine whether or not the barcode number was valid. You might choose to do this by showing and describing the calculation that was used in both cases.

{panel type="teacher-note" summary="Parts of the standard covered"}
This next part covers "discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption".

Students should write their explanation in their own words, and link it back to their example.
{panel end}

Next, you are going to discuss the importance of check digits in ensuring barcode numbers are entered correctly. What could be some of the implications of not having check digits, a number being entered incorrectly, and then not being detected? What kinds of things could happen to the shop? One or maybe two well written paragraph(s) would be ideal here. Remember to ensure that your explanation stays on topic and satisfies its purpose - discussing how reliable barcode number entry is enabled by check digits.

{panel type="teacher-note" summary="Parts of the standard covered"}
The final part mostly covers "evaluating a widely used system for compression coding, error control coding, or encryption", although it will also provide useful evidence for the merit criteria.
{panel end}

{panel type="teacher-note" summary="Keeping the evaluation realistic"}
A student might say that when they push random numbers on the keyboard, they sometimes get a "valid" barcode number. This however is irrelevant - there is a 1 in 10 chance of a randomly entered number being valid, and what shop person is going to do this and then actually believe they have entered a valid number, when they weren't even trying to?

As a less extreme case, it is also important to consider which errors are really common, and which are really rare. For example, getting one digit wrong or swapping two adjacent digits are probably the most common errors. These are the most important for the check digit to pick up. Other errors, such as getting three digits in a row wrong are far less likely, and it is a bonus if the check digit does pick it up, but it is not as important as the more common errors.
{panel end}

Finally, you are going to evaluate the effectiveness of check digits. A good evaluation involves identifying realistic cases, and giving more weight to the common cases than the really rare ones.

Start by making a list of common errors that a human might make if manually entering the number into a computer. What mistakes are easy to make? (clue: missing a digit or swapping 2 adjacent digits are common mistakes, however there are others as well). Optionally think about what could cause errors if a scanner was being used to read the barcode.

Using the barcode you were using earlier, replicate some of the common errors that would occur when a person manually enters the number into the computer by entering the mistakes into the checker. Try lots of variations of the errors, and see if the errors are always detected. Which errors always seem to be detected? Which do not? Show and *briefly* explain two examples of common errors being detected. Try to find an example of a (somewhat) common error *not* being detected. Again, show and *briefly* explain your example.

Discuss whether or not the check digits decrease the chances of errors, particularly common ones. Think carefully about how commonly undetected errors you identified are likely to occur in practice. Do you think that sometimes mistakes do go undetected? Remember that really obscure errors (such as getting 3 digits in a row incorrect) will probably never occur in practice, and the intention of the check digit is to pick up *common* mistakes.

## Hints for success

- Put error control coding in its own section (your report should have suitable headings and subheadings for each topic to make it clear for the marker) and ensure that you briefly introduce the topic. It is important that your report clearly demonstrates that you know the difference between encryption, error control coding, and compression, and what their different purposes are.
- Be sure to shrink down examples so they do not take up too much space. A barcode only needs to be big enough for the numbers to be readable; it does not need to take up half a page!
- For merit, you should not just paraphrase information. You need to use your own thinking to generate some of the answers, as your own experiences should enable you to come up with a lot of the answers. As an example, you should already know that if you bought something from the shop, and the scanner read the barcode wrong, and you were charged twice as much, you would not be happy about it! The implications of not having the technology are an important part of the discussion — what would happen if these systems weren’t used?
- For excellence, don’t simply discuss whether or not the algorithm is good without examples. You *must* have examples so that your work is personalised. Show some of the errors and whether or not they generate the correct check digit. If you find examples with simple common errors where the error did give the correct check digit, this is really good to show.
- You should be able to discuss this material, with examples, in about 2 or 3 pages of your report.
