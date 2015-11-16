# 2.44 Assessment Guide

This document provides a brief introduction to teachers on the Computer Science Field Guide assessment guides for NCEA Achievement standard AS91371 (2.44).

While there has previously been a recommendation that the same device be used for all aspects of this standard, this can limit the range of observations that students can make (for example, some interfaces that are good to evaluate don't make it easy to find out how they represent data or might not use an aspect of encoding). If a student chooses to use a common theme then that is fine, but if their choice of device or theme doesn't have the richness or transparency to see how all aspects work, it is better to use different devices or examples for different aspects of the standard. Also note that the examples do not have to be related to a "device", for example it is fine to evaluate the interface of an interactive website for Human Computer Interaction or look at check digits on credit cards for Error Control Coding.

## Topics

2.44 has bullet points for the following topics in computer science.

- Representing Data using Bits
- Encoding (split into 3 sub topics)
  - Compression
  - Error Control Coding
  - Encryption
- Human Computer Interaction (different to 1.44)

Each of these topics has a chapter in the Computer Science Field Guide, which this assessment guide is based on.

There are multiple assessment guides for representing data and the encoding topics, of which students need to do a subset. The following explanations outlines what students should cover.

### Representing Data using Bits

Students should choose **two** data types. To get achieved, they should give examples for both their data types of the data type being represented using bits. To get merit, they should show two different representations using bits for each data type, and then compare and contrast them. This topic does not have excellence requirements. For this reason, students going for excellence should put more time into the discussions for encoding and human computer interaction than representing data using bits.

The following table shows common types of data that students could choose. For **achieved**, they should choose two rows in the table, and do what is in the achieved column for their chosen rows. For **merit** they should satisfy the achieved criteria, and additionally choose one data type in the merit column for each of their chosen rows, to compare with their ones from the achieved columns.

| Data Type | Achieved | Merit |
|-----------|-----------|-----------|
| *Binary Numbers (Whole numbers)* | *Positive numbers* | *Negative numbers (simple sign bit)* or Floating point or Twos complement |
| *Characters/ Text* | *ASCII* | *Unicode* |
| *Images/ Colours* | *24 bit colour* | *Colour with fewer bits* |
| Sound | WAV file representation (16 bit, 44KHz) | Higher or lower quality sound (24 bit, 8 bit) and/or different sample rates |

Note that data types and representations currently covered in the field guide are in italics. Binary numbers is a prerequisite for colours, and are recommended for all students. Students who struggle with binary numbers should just aim to represent a few numbers in binary (e.g. their age, birthday, etc) and then move onto representing text.

For example: for **achieved**, a student might choose the *Characters/ Text* and *Binary Numbers* rows, and therefore show examples of *ASCII* and *Positive Numbers* in their report. Another student who hopes to get at least **merit** in the standard might pick the same two rows, and therefore will cover *ASCII* and *Positive Numbers*, but they will also show examples of *Uncode* and *Floating Point Numbers* (they could have picked any of the many suggestions in that row). They will then compare *Unicode* and *ASCII*, and then *Floating Point Numbers* and *Positive Numbers*. They should **not** do comparisons across data types (e.g. they should not compare a text representation with a number representation, as that does not make sense to do).

Most of the data types are based on binary numbers. Therefore, all students will need to learn how to represent whole numbers in binary before writing their report. However, they do not have to choose Binary Numbers as one of their two topics. They can just learn to represent whole numbers in binary, and then move on to using the numbers to representing Images/ Colours or Sound. Most students will find those topics much more interesting to evaluate, and easier to satisfy the merit criteria with - they can actually hear and see the varying Sound and Image qualities that using fewer or more bits leads to, and therefore include this in their discussions.

Doing *Characters/Text* is strongly recommended, because it is the only representation that is not based on binary numbers, and therefore gives students a wider understanding of the topic of data representation. It is also one of the easier data types to understand the representations for.

Generally, the students who are only aiming for achieved will be best picking binary numbers (Positive Numbers) and text (ASCII), as these are the most straightforward data representations.

Another issue is that hexadecimal is not a good example for students to use as a different representation of data, as it is simply a shorthand for binary. Writing a number as 01111010 (binary) or 7A (hexadecimal) represents exactly the same bits stored on a computer with exactly the same meaning; the latter is easier for humans to read and write, but both are 8-bit representations that have the same range of values. It is a useful shorthand, but shouldn't be used as a second representation for a type of data, or as a different type of data.

### Encoding

Students need to describe each of the three encoding topics in order to get achieved, and additionally they need to do a more in-depth project on one of the three topics in order to get merit or excellence.

Students should choose a subset of the provided projects that cover **one** of the following options. The first three options are for students aiming for merit/ excellence. The fourth option is for students just aiming to get achieved.

| Topic                | Option 1         | Option 2         | Option 3         | Option 4          |
|----------------------|------------------|------------------|------------------|-------------------|
| Compression          | Up to Excellence | Only Achieved    | Only Achieved    | Only Achieved     |
| Encryption           | Only Achieved    | Up to Excellence | Only Achieved    | Only Achieved     |
| Error Control Coding | Only Achieved    | Only Achieved    | Up to Excellence | Only Achieved     |

Note that some assessment guides provide projects that cover only achieved, and others go to excellence. Students should choose appropriate assessment guides based on the option they have chosen. It is best to do **one** topic to the excellence level and to focus on doing a really good job, as opposed to doing a not so good job on two or three.

At the excellence level students are required to evaluate "a widely used system for compression coding, error control coding, or encryption". The guides discuss some widely used systems, but it is worth noting that only one system *has* to be considered (e.g. JPEG is a widely used compression system, so evaluating JPEG would be sufficient; an alternative would be checksums used in bar codes). The evaluation would need to involve a comparison with *not* using the system, so for JPEG it might be with a RAW or BMP file; for bar codes, it would be to consider what would be different if a check digit isn't used. In some cases, it might make sense to compare the chosen widely used system with a mediocre alternative (that isn't widely used). One example where this would work is comparing the RSA crypto-system (widely used) with Caeser Cipher (no longer used in practice).

One issue to be aware of is that the data representation section includes reducing the number of bits (the "bit depth") for images and sound to reduce the space that they take. This overlaps with the idea of compression, but is should *not* be used for the compression part of the standards, as it's a very crude way to reduce file size, but not generally regarded as a compression method that takes advantage of the content of a file to make it smaller. For example, students could use examples of images with 16-bit and 24 colour to illustrate two representations of a type of data for data representation, but they should use an image compression method like JPEG, GIF and PNG to illustrate compressing image files. However, findings from reducing bit depth may be very useful to consider when evaluating a real image compression method, as it will allow students to see the lower loss of quality when the bits are cut using a "smart" method rather than simply truncating them.

### Human Computer Interaction

Human Computer Interaction is straightforward, and we provide one 2.44 guide for it. Note that the requirements for 2.44 HCI are different to 1.44 HCI.

## Order of Topics

The three topics can be completed in any order, although encoding is best covered after representing data.

It may be a good idea to cover Human Computer Interaction (HCI) first, as students should already have some familiarity with it if they did 1.44, and it can help if they are able to start work on it early, then work on the other topics, and come back to HCI once they’ve had a while to reflect on the issues.

## Personalisation and Student Voice

It is important that students use personalised examples to base their explanations around, and that the explanations are in their own words, and based on their example (rather than being a paraphrase from wikipedia, for example).

Personalised means that the student’s example is different to their classmates. For example, they may represent their age or name using bits, carry out the parity trick (error control coding) with a friend choosing random combinations and take photos, and they may carry out their own usability exploration of a device or website they chose, and report on it in their own words.

## Report Length

It is important to note that the page limit given by NZQA is not a target. The markers prefer reports that are short and to the point.

A possible breakdown is:

- Representing Data using Bits: 2 pages (1 per data type)
- Encoding: 5 pages (1 for each achieved project and 3 for the achieved/ merit/ excellence project)
- Human Computer Interaction: 3 pages

{teacher}

This leaves 1 additional page to use where necessary (some of it may be needed for the bibliography).

{teacher end}

The assessment guides provide further guidance on how to stay within these limits. With 2.44, it is particularly important to try and keep each individual project in the report within the recommended limit, as space is tighter than for 1.44 and 3.44.

Some hints to reduce total length:

- Only include what is relevant to the standard. While covering additional material in class is valuable for learning, additional content that doesn't demonstrate understanding of the topics in the standard is only a distraction in the report.
- Resize screenshots and photos so that they are still readable, although don’t take up unnecessary space. Use cropping to show the relevant parts of the image.
- Don’t leave unnecessary spaces in the report. It both looks untidy and makes it more difficult for the marker to find what they are looking for.
