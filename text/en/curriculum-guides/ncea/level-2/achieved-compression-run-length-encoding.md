# Achieved Guide for Compression (2.44) - Run Length Encoding

This is a guide for students attempting compression (one of the three encoding subtopics) in digital technologies achievement standard 2.44 (AS91371)

This is an achieved level guide.

Remember that you only need to do one of the three encoding topics (compression, encryption, and error control coding) to the excellence level. If you are either not interested in getting more than achieved, or are doing either encryption or error control coding to the excellence level, then this is the right guide for you. If you were wanting to do compression up to the excellence level, then you should select the alternate excellence guide instead.

In order to fully cover the standard, you will also need to have done projects covering the topics of encryption and error control coding to at least the achieved level (with one of them to the excellence level if you are attempting to get more than achieved), and projects covering the topics of representing data using bits and human computer interaction, and include these in your report.

## Overview

Encoding has the following *achieved* bullet points in achievement standard 2.44 which this guide covers.

**Achieved**: "describing the concept of encoding information using compression coding, error control coding, and encryption; and typical uses of encoded information"

As with all externally assessed reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

Read all of these sections, as they give the necessary introduction of the topics

[7.1 - What’s the Big Picture?](chapters/coding-compression.html#whats-the-big-picture)

[7.2 - Run Length Encoding](chapters/coding-compression.html#run-length-encoding)

## Project

{panel type="teacher-note" summary="Do not overlook the commas in the Run Length Encoding representation"}
Note that the commas are important; the representation needs to be able to define where each number stops and the next number starts! For example, without commas, we could have the number 234772. There are many ways of interpreting it, e.g. 2 34 7 72 or maybe 23 477 2. Putting spaces would be okay too, although these would still have to be counted in the representation size (as the computer would need to store the spaces!). It makes it more obvious using commas that they have to be counted.
{panel end}

{panel type="teacher-note" summary="Parts of the standard covered"}
This covers "describing the concept of encoding information using compression coding ~~, error control coding, and encryption;~~ and typical uses of encoded information"
{panel end}

Start this section by writing an introduction to the topic of compression. *Briefly* explain what compression is, what it is used for, and what kinds of problems would exist if there was no such thing as compression. This introduction only needs to be a few sentences - you are just showing the marker that you understand the bigger picture of what compression is, and some of the typical uses of it.

Now you are going to make an example of compression in action to include in your report. Start by making a grid of squares (any size is fine, but it should be at least 6x6) and draw a picture by filling some of the squares with black and leave others white. Underneath (or alongside each row), show how a computer could represent your image using Run Length Encoding. You should not worry about how it is represented at the bit level. It is fine to just use normal numbers which are comma separated, like what was done in the field guide chapter on compression.

Count how many characters are needed to represent your image in its original form (i.e. how many squares does it contain?).
Count how many characters were used in your Run Length Encoding representation.
Don’t forget to include the commas! (check the field guide or read the teacher note if you don't understand why we say you must count the commas).
How well did Run Length Encoding compress your image? You might choose to use [the Run Length Encoding interactive](interactives/run-length-encoding/index.html).

*Briefly* describe what Run Length Encoding is, relating back to the example you have just put in your report. Regardless of whether you use the interactive or calculate the run length encoding by hand, describe how you arrived at your answer for a couple of lines in the image. The marker needs to be able to know that you understand the example, and what it is of.

## Hints for success

{panel type="teacher-note" summary="Headings and report organization are important"}
In the past, we have observed that some students just put their 3 encoding examples in their report one after the other without any explanations or headings. It is important that students have clearly demonstrated that they know what purpose each of the three encoding types has, and that they have clearly distinguished between them. Part of this is using sensible headings and ensuring that all examples are clearly labeled with the type of encoding they are (and preferably in their own section)
{panel end}

{panel type="teacher-note" summary="Concepts are more important than precise representations"}
While the less precise representations used in the book are of course not used in practice, they still clearly illustrate the same best and worst cases (examples of images which compress really well and examples of those which don't). It is the general ideas that students need to demonstrate their understanding of, as opposed to the precise representation details that they already covered in the Representing Data using Bits topic.
{panel end}

- Do a realistic image or pattern rather than randomly selecting squares for your example. You want to illustrate that the compression is useful rather than show an unrealistic case where it did more harm than good. Checkerboards or random layouts of black and white squares tend to not compress very well (which is fine, as normally we don't want to store them anyway!).
- Make sure your example is shrunk down enough to not waste space, but that the individual black and white squares and any numbering are still clearly visible.
- Put compression in its own section (your report should have suitable headings and subheadings for each topic to make it clear for the marker) and ensure that you briefly introduce the topic. It is important that your report clearly demonstrates that you know the difference between encryption, error control coding, and compression, and what their different purposes are.
