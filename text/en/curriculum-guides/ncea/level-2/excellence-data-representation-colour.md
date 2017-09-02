# Excellence Guide for Data Representation (2.44) - Colours

This is an excellence level guide for students attempting data representation in digital technologies achievement standard 2.44 (AS91371). It is aimed at students going for merit or excellence.

You will need to do one more project in data representation in addition to this one, because the standard requires you to cover two. This guide only covers text. Note that there is no excellence requirements for data representation -- it only goes up to merit. This guide is called an excellence guide though to avoid confusion about whether or not it is suitable for students aiming for excellence.

In order to fully cover the standard, you will also need to have done one more project on data representation, projects covering the three encoding topics up to the achieved level (error control coding, encryption, and compression), and a project covering human computer interaction, and included these in your report.

## Overview

The topic of Data Representation has the following bullet points in achievement standard 2.44, which this guide covers.

- **Achieved**: "describing ways in which different types of data can be represented using bits"
- **Merit**: "comparing and contrasting different ways in which different types of data can be
represented using bits and discussing the implications"

This guide focusses on one of the types of data you will need to cover (you will need to cover 2).

As with all externally assessed reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

- [Representing whole numbers with Binary](chapters/data-representation.html#representing-whole-numbers-in-binary) - It is important that you understand this section really well before going any further, as every other concept is based on it.
- [Images and Colours](chapters/data-representation.html) - You will need to read this entire section well, as the project is based on it.

## Project

### Writing an Introduction to Data Representation

***You only need to do this if you have not already done it (the other guide you follow for data representation will also tell you to write this intro)***

This section will be around ¼ to ½ of a page.

Start the data representation section of your report by writing an introduction to the topic of data representation. Describe what a "bit" is, and why computers use bits to represent data. Briefly describe a couple of the ways in which computers physically represent bits (if you open a computer, you will ***not*** see lots of little 0's and 1's!).

This explanation must be in your own words, based on what you understood in class (e.g. do not paraphrase a definition)

***This is the main part of your project.***

This section will be around 1 to 1½ pages in your report. There are 4 parts to it.

1. Choosing a colour that you like, explaining how it is represented with red, green, and blue components, explaining why computers represent colours in this way.
2. Converting your chosen colour to its 24 bit binary representation, explaining the process clearly.
3. Showing how your colour would be represented with 8 bits, and explaining whether or not the colour is still the same as it was with 24 bits, and why.
4. Discussing why we commonly use 24 bit colour as opposed to 8 bit colour or 16 bit colour, but not a higher number of bits, such as 32 bits or more.

Each of the subsections will look at one of these parts.

#### Explaining how a colour is represented with red, green, and blue components

**Choose a colour**, using the RGB colour mixer which is near the start of the section on colours (do not use the CMY one). Include a sample of your chosen colour in your report (it just needs to be a small rectangle, no more than about 50 pixels tall), and specify how much red, green, and blue your chosen colour has.

Briefly explain (1 - 2 sentences) why colours are described as amounts of red, green, and blue.

This section should be no longer than ⅓ of a page in your report.

#### Converting a colour to a 24 bit representation

Start by briefly explaining (1 - 2 sentences) what is meant by colour depth, and "8 bit colour", "16 bit colour", and "24 bit colour"

Show the 24 bit representation for your chosen colour, clearly explaining the process you used to get to it.

This section should be no longer than ⅓ of a page in your report.

#### Converting a colour to a 8 bit Representation

Convert your chosen colour to an 8 bit representation. The best way of doing this is to take your 24 bit colour representation, and remove all the bits except for the leftmost 3 red bits, leftmost 3 green bits, and leftmost 2 blue bits. Put your colour into the 8 bit colour interactive to see what it looks like.

Explain whether or not your colour looks different with just 8 bits. How many different colours can be represented with 8 bits? And what about 24 bits? Why is it impossible to represent every colour that can be represented with 24 bits, with just 8 bits?

This section should be no longer than ⅓ of a page in your report.

#### Discussing the use of 24 bit colour and alternatives

24 bit colour is the most widely used representation of colour, but it is not the only one. Sometimes we can use 8 bit colour or especially 16 bit colour, and sometimes we want more than 24 bit colour, even though the human eye can't actually distinguish between more than 24 bits worth of colours. In this section, you should write about why we mostly use 24 bit colour, and the situations where we might use more or less bits for colours.

The field guide contains a few ideas, and you may find the interactives useful for experimenting, although you should do some of your own reading as well. [Wikipedia is a good place to start](https://en.wikipedia.org/wiki/Color_depth#Direct_color), although remember not to paraphrase information. Put it into your own words, and relate it back to your own understand of representing colours.

**This section should be no longer than ½ to 1 page in your report**. There should be no more than **½ a page of text** --- only go up to 1 page if you have included diagrams or images. Any images you include must be entirely your own work, and if you use the field guide interactives which show how images appear with a different number of bits, then you must **use your own image**, setting it with the "Choose file" option in the interactive. Your explanation must explain what your image is demonstrating.

Be sure that your final report is printed in colour, if you include images.

## Hints for success

- Your 2.44 report should be structured in the following way. Note that the bolded parts are recommended headings. Details have not been included for sections covered in other guides. Look carefully at the Representing Data section to ensure you have structured your report properly. This will help the marker find what they need to find.

{text-box indented="True"}
**Computer Science report for 2.44**

-  **Representing Data**

  Put your introduction to what bits are here

  - **Representing Colours**

     Put all your project work related to representing colours here

  - **Representing [other topic]**

     (see relevant guide for information on structuring this section)

- **Encoding**

   (see relevant guide for information on structuring this section)

- **Human Computer Interaction**

  (see relevant guide for information on structuring this section)
{text-box end}

- Be careful to put your explanations and examples under the correct headings.
- Do not include large lists or tables, for example do not include an ASCII or Unicode table or a list of binary number conversions.
- The introduction to data representation should not take more than ½ of a page in your report.
- The Colours project in this guide should not take up more than 1½ to 2 pages in your report.
- It is recommended to print your final report for marking in colour, so that all the colours you have used are visible to the marker :)
