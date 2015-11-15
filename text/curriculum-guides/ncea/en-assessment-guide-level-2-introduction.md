# 2.44 Assessment Guide

This document provides a brief introduction to teachers on the Computer Science Field Guide assessment guides for NCEA Achievement standard AS91371 (2.44).

## Topics

2.44 has bullet points for the following topics in computer science.

- Representing Data using Bits
- Encoding (split into 3 sub topics)
  - Compression
  - Error Control Coding
  - Encryption
- Human Computer Interaction (different to 1.44)

Each of these topics has a chapter in the Computer Science Field Guide, which this assessment guide is based on.

There are multiple assessment guides for representing data and the encoding topics, of which students need to do a subset. The following explanations outline what students should cover.

### Representing Data using Bits

Students should choose at least **two** data types and cover the "ways in which different types of data can be represented using bits" in order to get achieved, and they should choose at least two different representations for **each** of their chosen data types for the merit level.
(While two representations of two types is sufficient to meet the exact requirements of the standard, it needn't take a lot of space to go a little beyond this, and this can be more convincing for showing student understanding compared with doing the bare minimum.)
The following table shows common types of data that students could choose (they should choose two rows from the table to meet the achieved requirement). For merit they should should choose an alternative representation with a different number of bits; examples are shown in the "Merit" column.

| Data Type | Achieved | Merit |
|-----------|-----------|-----------|
| Binary Numbers (Whole numbers) | Positive numbers | Negative numbers (simple sign bit) or Floating point or Twos complement |
| Characters/ Text | ASCII | Unicode |
| Images/ Colours | 24 bit colour | Colour with fewer bits |
| Sound | WAV file representation (16 bit, 44KHz) | Higher or lower quality sound (24 bit, 8 bit) and/or different sample rates |

Note that data types and representations currently covered in the field guide are in italics. Binary numbers is a prerequisite for colours, and are recommended for all students. Students who struggle with binary numbers should just aim to represent a few numbers in binary (e.g. their age, birthday, etc) and then move onto representing text.

In general, we recommend choosing binary numbers for all projects.

If students are using a common device as an example, chances are they won't be able to find out how it represents data, but they could say how they would represent the data if they had to write the program that is running on the device e.g. how they might store the name of a song, a date, the length of a file, the number of tracks etc. These will typically have minimum and maximum values that will dictate the number of bits needed to store them.

This topic does not have excellence requirements.

### Encoding

For the standard, students need to describe each of the three encoding topics in order to get achieved, and do a more in-depth project on one in order to get merit or excellence.

Students should choose do projects that cover **one** of the following options:

| Topic                | Option 1         | Option 2         | Option 3         |
|----------------------|------------------|------------------|------------------|
| Compression          | Up to Excellence | Only Achieved    | Only Achieved    |
| Encryption           | Only Achieved    | Up to Excellence | Only Achieved    |
| Error Control Coding | Only Achieved    | Only Achieved    | Up to Excellence |

Note that some assessment guides provide projects that cover only achieved, and others go to excellence. For topics that students are only covering to achieved, they can either follow an achieved guide, or the achieved component of an excellence guide.

At the excellence level students are required to evaluate "a widely used system for compression coding, error control coding, or encryption". The guides discuss some widely used systems, but the thing to note is that only *one* system need be considered (e.g. JPEG is a widely used compression system, so evaluating JPEG would be sufficient; an alternative would be checksums used in bar codes). The evaluation would need to involve a comparison with *not* using the system, so for JPEG it might be with a RAW or BMP file; for bar codes, it would be to consider what would be different if a check digit isn't used.

One issue to be aware of is that the data representation section includes reducing the number of bits (the "bit depth") for images and sound to reduce the space that they take.
This overlaps with the idea of compression, but is should *not* be used for the compression part of the standards, as it's a very crude way to reduce file size, but not generally regarded as a compression method that takes advantage of the content of a file to make it smaller.
For example, students could use examples of images with 16-bit and 24 colour to illustrate two representations of a type of data for data representation, but they should use an image compression method like JPEG, GIF and PNG to illustrate compressing image files.

Another issue is that hexadecimal is not a good example for students to use as a different representation of data, as it is simply a shorthand for binary. Writing a number as 01111010 (binary) or 7A (hexadecimal) represents exactly the same bits stored on a computer with exactly the same meaning; the latter is easier for humans to read and write, but both are 8-bit representations that have the same range of values. It is a useful shorthand, but shouldn't be used as a second representation for a type of data, or as a different type of data.

### Human Computer Interaction

Human Computer Interaction is straightforward, and we provide one 2.44 guide for it. Note that the requirements for 2.44 HCI are different to 1.44 HCI.

## Order of Topics

The three topics can be completed in any order, although encoding is best covered after representing data.

It may be a good idea to cover Human Computer Interaction (HCI) first, as students should already have some familiarity with it if they did 1.44, and it can help if they are able to start work on it early, then work on the other topics, and come back to HCI once they’ve had a while to reflect on the issues.

## Personalisation and Student Voice

It is important that students use personalised examples to base their explanations around, and that the explanations are in their own words, and based on their example (rather than being a paraphrase from wikipedia, for example).

Personalised means that the student’s example is different to their classmates. For example, they may represent their age or name using bits, carry out the parity trick (error control coding) with a friend choosing random combinations and take photos, and they may carry out their own usability exploration of a device they chose, and report on it in their own words.

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
