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

## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

Read all of these sections, as they give the necessary introduction of the topics

[7.1 - What’s the Big Picture?](coding-compression.html#whats-the-big-picture)

[7.2 - Run Length Encoding](coding-compression.html#run-length-encoding)

## Project

For the achieved criteria you will show how run length encoding works to compress a simple image. For the merit and excellence criteria you will investigate how and why run length encoding is used by fax machines, and then evaluate how effective it is for this purpose. *If you have chosen to focus on error control coding or encryption for merit and excellence, then you only need to meet the achieved criteria for this project.*

{teacher}

While fax machines are becoming less widespread due to newer technologies, the general ideas are still relevant. Run length encoding is very effective on black and white images, particularly those which contain text, diagrams, and other data which might be found in books and letters.

Other applications such as databases of scanned books (e.g. Google books probably use run length encoding to do at least some of their compression.)

{teacher end}

### Writing your report

**Achieved**

Make a grid of squares (any size is fine, but it should be at least 6x6) and draw a picture by filling some of the squares with black and leave others white. Underneath (or alongside each row), show how a computer could represent your image using run length encoding. You should not worry about how it is represented at the bit level. It is fine to just use normal numbers which are comma separated

{teacher}

Note that the commas are important; the representation needs to be able to define where each number stops and the next number starts! For example, without commas, we could have the number. 234772 There are many ways of interpreting it, e.g. 2 34 7 72 or maybe 23 477 2. Putting spaces would be okay too, although these would still have to be counted in the representation size (as the computer would need to store the spaces!). It makes it more obvious using commas that they have to be counted.

Counting the number of digits and commas is a crude estimate; it is sufficient for the purposes of this report, but some students may want to look into making a more accurate estimate.

{teacher end}

Count how many characters are needed to represent your image in its original form (i.e. how many squares does it contain?). Count how many characters were used in your run length encoding representation. Don’t forget to include the commas! How well did run length encoding compress your image?

Explain why you would want to use run length encoding on an image. Think about a more typical image, such as a scan of a page of writing - what sort of runs of black and white pixels will that have? What is the purpose of compression?

{teacher}

This covers “describing the concept of encoding information using compression coding, error control coding, and encryption; and typical uses of encoded information”.

There are some examples of these kinds of images in the CS Unplugged [Image Representation](http://csunplugged.org/image-representation) activity.

Note that this only covers the compression coding component, NOT error control coding or encryption (all three are needed for achieved).

While this partially covers merit, we include it in achieved to help ensure the student has written at least something about the purpose of compression, as opposed to just focusing on RLE and ignoring the bigger picture.

{teacher end}

**Merit/ Excellence**

As discussed in the field guide, fax machines use run length encoding. What advantages does this provide to fax machines sending and receiving faxes?

{teacher}

This covers "discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption".

Note that the student's explanation should be strengthened by their excellence evaluation. By doing the evaluation part that follows, they will be clearly discussing the value of run length encoding in a fax machine.

We don't think it would be safe to assume just answering this bit would cover merit.

{teacher end}

Is run length encoding guaranteed to always make the amount of data needed to represent the image smaller? Try and come up with an example (to include in your report) where the amount of space required to store your image with run length encoding is more than the original representation. What about an example where it is a very small amount of data? You can use this [Run Length Encoding interactive](http://taylormade.io/run-length-encoding.html) (written by Hannah Taylor, a digital technologies teacher) to help you experiment and to quickly generate examples.

You should have found that in some cases the compression is really good, and in others it makes things worse! You might remember from the book that it is impossible to design a lossless text compression method that makes every possible input smaller. What matters though is how good the compression is for its intended application. What would you expect a typical fax message to look like? (You might like to include an example, although shrink the image down so that it is less than ¼ of the page tall.)

{teacher}

This covers "discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption”.

And it indirectly covers "evaluating a widely used system for compression coding, error control coding, or encryption”.

Good examples would include letters, reports (maybe a page from their 2.44 report converted to black and white if it isn't already!), text from a book, etc.

Note that it does not matter if the text on their example is no longer readable from shrinking it down. The main idea they should see is that a lot of the page contains white, with some black., or zoom in and crop a small part of it). How well do you expect it to compress?

Students should observe that there are, for example, many empty white spaces on the page. What would 100 white pixels in a row compress to? What conclusion can you draw about the effectiveness of run length encoding in fax machines?

This covers "evaluating a widely used system for compression coding, error control coding, or encryption”

And it indirectly covers "discussing how a widely used technology is enabled by one or more of compression coding, error control coding, and encryption”.

{teacher end}

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

Examples where the student had a grid that they showed the run length encoding representation for should be large enough that the individual squares are clearly visible. If the student has included examples of documents that could be faxed (e.g. a letter on an A4 piece of paper), it is fine to shrink the image down so that it is only 1/4 of the page long or less (if there is more than one such image, they should be put side by side). It does not matter if the words on them aren't really readable, the general idea that they are realistic fax documents is still clear.

{teacher end}

- While you could potentially go into the details of how the computer represents the compressed image at the bit level, this is not necessary. The purpose of the encoding topic in 2.44 is for you to investigate the general ideas of how encoding works rather than the precise details of the representation with bits (simpler representations with bits are already covered in the first bullet point of the standard).

{teacher}

While the less precise representations used in the book are of course not used in practice, they still clearly illustrate the same best and worst cases (examples of images which compress really well and examples of those which don't).

{teacher end}
