# Excellence Guide for Compression (2.44) - Run Length Encoding

This is a guide for students attempting compression (one of the three encoding subtopics) in digital technologies achievement standard 2.44 (AS91371)

Remember that you only need to do one of the three encoding topics (compression, encryption, and error control coding)  to the excellence level. The other two only need to be done to the achieved level. Because this guide is an excellence guide, you should only be looking at it if you have chosen compression as your encoding topic to take to the excellence level.

In order to fully cover the standard, you will also need to have done projects covering the topics of encryption and error control coding to the achieved level, and projects covering the topics of representing data using bits and human computer interaction, and include these in your report.

## Overview

Encoding has the following bullet points in achievement standard 2.44 which this guide covers.

**Achieved**: “describing the concept of encoding information using compression coding, error control coding, and encryption; and typical uses of encoded information”

**Merit**: “discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption”

**Excellence**: “evaluating a widely used system for compression coding, error control coding, or encryption”

As with all externally assessed reports, you should base your explanations around personalised examples.

### Clarification on terminology

In this guide, the widely used technology and widely used system are:

*Widely used Technology*: Fax machines

*Widely used System*: Run Length Encoding


## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

Read all of these sections, as they give the necessary introduction of the topics

[7.1 - What’s the Big Picture?](coding-compression.html#whats-the-big-picture)

[7.2 - Run Length Encoding](coding-compression.html#run-length-encoding)

## Project

**Achieved/ Merit/ Excellence**

{panel type="teacher-note" summary="Relevance of fax machine inspired compression"}
While fax machines are becoming less widespread due to newer technologies, the general ideas are still relevant. Run Length Encoding is very effective on black and white images, particularly those which contain text, diagrams, and other data which might be found in books and letters. Fax machines are still a useful application for students to consider.

Other applications such as databases of scanned books (e.g. Google books probably use Run Length Encoding to do at least some of their compression.)
{panel end}

{panel type="teacher-note" summary="Do not overlook the commas in the Run Length Encoding representation"}
Note that the commas are important; the representation needs to be able to define where each number stops and the next number starts! For example, without commas, we could have the number. 234772 There are many ways of interpreting it, e.g. 2 34 7 72 or maybe 23 477 2. Putting spaces would be okay too, although these would still have to be counted in the representation size (as the computer would need to store the spaces!). It makes it more obvious using commas that they have to be counted.
{panel end}

{panel type="teacher-note" summary="Parts of the standard covered"}
The first part covers "describing the concept of encoding information using compression coding ~~, error control coding, and encryption;~~ and typical uses of encoded information"

Counting the number of digits and commas is a crude estimate; it is sufficient for the purposes of this report, but some students may want to look into making a more accurate estimate.
{panel end}

Start this section by writing an introduction to the topic of compression. *Briefly* explain what compression is, what it is used for, and what kinds of problems would exist if there was no such thing as compression. This introduction only needs to be a few sentences - you are just showing the marker that you understand the bigger picture of what compression is, and some of the typical uses of it.

Now you are going to make an example of compression in action to include in your report. Start by making a grid of squares (any size is fine, but it should be at least 6x6) and draw a picture by filling some of the squares with black and leave others white. Underneath (or alongside each row), show how a computer could represent your image using Run Length Encoding. You should not worry about how it is represented at the bit level. It is fine to just use normal numbers which are comma separated, like what was done in the field guide chapter on compression.

Count how many characters are needed to represent your image in its original form (i.e. how many squares does it contain?). Count how many characters were used in your Run Length Encoding representation. Don’t forget to include the commas! (check the field guide or read the teacher note if you don't understand why we say you must count the commas). How well did Run Length Encoding compress your image? You might choose to use [Hannah Taylor's Run Length Encoding interactive](http://taylormade.io/run-length-encoding.html), although you will need to add an additional explanation about HOW the number of characters for Run Length Encoding was calculated, to convince the marker that you could have done it yourself.

{panel type="teacher-note" summary="Parts of the standard covered"}
This next part partially covers "discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption". Note that the final part (the evaluation) also partially covers this, as students will probably gain some useful insights in their evaluation.
{panel end}

Next, you are going to focus on how fax machines (the "widely used technology") are enabled by the use of Run Length Encoding. The field guide discusses how fax machines use Run Length Encoding. What advantages does this provide to fax machines sending and receiving faxes? Think carefully about how fax machines are used, and what medium they are using to transfer data (it might help for you to ask your teacher what the early days of the Internet were like, back when we used "dial up" instead of broadband). Think about a more typical image that might be sent with a fax machine, such as a scan of a page of writing - what sort of runs of black and white pixels will that have? One well written paragraphs would be ideal here. Remember to ensure that your explanation stays on topic and satisfies its purpose - discussing how fax machines are enabled by Run Length Encoding.

{panel type="teacher-note" summary="Parts of the standard covered"}
The final part mostly covers "evaluating a widely used system for compression coding, error control coding, or encryption", although it will also provide useful evidence for the merit criteria, as at the end it asks students to think back on the practical use, i.e. the fax machines.
{panel end}

Finally, you need to evaluate Run Length Encoding. This will involve identifying the cases in which the "compressed" data is far smaller than the original, and those in which it is around the same size, or possibly even larger. The [Run Length Encoding interactive](http://taylormade.io/run-length-encoding.html) may come in handy for your experimentation.

Is Run Length Encoding guaranteed to always make the amount of data needed to represent the image smaller? Try and come up with an example (to include in your report) where the amount of space required to store your image with Run Length Encoding is more than the original representation. Also, find an example where the image compresses really well.

You should have found that in some cases Run Length Encoding is a really good form of compression, and in others it makes things worse! You might remember from the book that it is impossible to design a lossless text compression method that makes every possible input smaller. What matters though is how good the compression is for its intended application. What would you expect a typical fax message to look like, and how will this impact Run Length Encoding being used on it? You might like to include a few examples of pages that might be sent through a fax machine to illustrate your answer, although shrink the images down so that each is less than ½ of the page tall, and alongside text or other similar images. Don't worry if the text on the example is no longer readable. As long as you can see the general patterns of which parts of white, and which parts of black, then it will be useful for you to discuss which parts will compress well (or won't).

## Hints for success

- When you make your image for the achieved level, make it a real image rather than a grid containing random black and white squares.

{teacher}

It is best if the image's compressed representation is smaller than its original one, so that students are clearly demonstrating the purpose of compression (rather than suggesting it serves no purpose other than making images take more space!)

Many realistic images will achieve this, as will some patterns.

Checkerboards or random layouts of black and white squares tend to not compress very well (which is fine, as normally we don't want to store them anyway!)

{teacher end}

- Put compression in its own section (your report should have suitable headings and subheadings for each topic to make it clear for the marker) and ensure that you briefly introduce the topic. It is important that your report clearly demonstrates that you know the difference between encryption, error control coding, and compression, and what their different purposes are.

{teacher}

In the past, we have observed that some students just put their 3 encoding examples in their report one after the other without any explanations or headings.

It is important that students have clearly demonstrated that they know what purpose each of the three encoding types has, and that they have clearly distinguished between them.

{teacher end}

- If you did compression only to the achieved level, half to one page should be enough. If you did merit and excellence, a couple of pages should be enough (shrink down the examples as much as is reasonable, particularly if you included a lot of them)

{teacher}

Examples where the student had a grid that they showed the Run Length Encoding representation for should be large enough that the individual squares are clearly visible. If the student has included examples of documents that could be faxed (e.g. a letter on an A4 piece of paper), it is fine to shrink the image down so that it is only 1/4 of the page long or less (if there is more than one such image, they should be put side by side). It does not matter if the words on them aren't really readable, the general idea that they are realistic fax documents is still clear.

{teacher end}

- While you could potentially go into the details of how the computer represents the compressed image at the bit level, this is not necessary. The purpose of the encoding topic in 2.44 is for you to investigate the general ideas of how encoding works rather than the precise details of the representation with bits (simpler representations with bits are already covered in the first bullet point of the standard).

{teacher}

While the less precise representations used in the book are of course not used in practice, they still clearly illustrate the same best and worst cases (examples of images which compress really well and examples of those which don't).

{teacher end}
