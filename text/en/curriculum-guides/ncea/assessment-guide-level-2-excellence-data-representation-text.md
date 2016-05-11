# Excellence Guide for Data Representation (2.44) - Text

This is an excellence level guide for students attempting data representation in digital technologies achievement standard 2.44 (AS91371). It is aimed at students aiming for merit or excellence.

**You will need to do one more project in data representation in addition to this one**, because the standard requires you to cover two types of data.
This guide covers only text. Note that there is no excellence requirement for data representation -- it only goes up to merit. This guide is called an excellence guide though to avoid confusion about whether or not it is suitable for students aiming for excellence.

In order to fully cover the standard, as well as one more investigation on data representation for another type of data, you will need to do projects covering the three encoding topics up to the achieved level (error control coding, encryption, and compression), follow one of the three coding methods to excellence level, and a project covering human computer interaction, and include these in your report.

## Overview

The topic of Data Representation has the following bullet points in achievement standard 2.44, which this guide covers.

**Achieved**: "describing ways in which different types of data can be represented using bits"

**Merit**: "comparing and contrasting different ways in which different types of data can be
represented using bits and discussing the implications"

This guide focusses on one of the types of data you will need to cover (you will need to cover two).

As with all externally assessed reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project. Note that while you do not need to write about ASCII in this project; it is assumed you have a solid understanding of ASCII.

- [Representing whole numbers with Binary](chapters/data-representation.html#representing-whole-numbers-in-binary) - Most other representations are based on binary number representations, so understanding these first is essential. You only need to understand the material in this subsection.
- [Representing Text](chapters/data-representation.html#text) - You should read this entire section carefully. It is central to the project.

## Project

### Writing an Introduction to Data Representation

***You only need to do this if you have not already done it (the other guide you follow for data representation will also tell you to write this intro)***

This section will be around ¼ to ½ of a page.

Start the data representation section of your report by writing an introduction to the topic of data representation. Describe what a "bit" is, and why computers use bits to represent data. Briefly describe a couple of the ways in which computers physically represent bits (if you open a computer, you will ***not*** see lots of little 0's and 1's!).

This explanation must be in your own words, based on what you understood in class (e.g. do not paraphrase a definition).

### Representing text with various Unicode systems

***This is the main part of your project.***

This section will be around 1½ pages in your report. There are 5 parts to it.

1. Introducing the idea of Unicode and UTF (up to ½ of a page).
2. Showing your text samples.
3. Showing how one character from each text sample can be represented with UTF-32
4. Showing how one character from each text sample can be represented with UTF-8
5. Comparing the representation size of each text sample using UTF-8, UTF-16 and UTF-32, and explaining your findings.

**Choosing the text samples**

Choose two text samples, which you will use to explain Unicode and the representations for it. One text sample should be in English, and the other should be in an Asian language, for example Japanese. The text samples should be no longer than 50 characters long. You should be able to find a suitable text sample online, for example by visiting a Japanese forum. Check it in [Google Translate](https://translate.google.co.nz/) to ensure it is appropriate for your report.

#### Introduction to Unicode and UTF

Start by writing an introductory paragraph to Unicode and the representations used to represent it. Your paragraph should:
- Explain what Unicode is.
- Explain how Unicode is a character set (and not a representation). Use one character from each of your text samples as examples in your explanation.
- Explain how UTF-8, UTF-16, and UTF-32 are various ways of representing the Unicode characters.
The paragraph should be no more ½ of a page long.

If you are confused, reread the Unicode section in the CS Field Guide or ask your teacher for help.

#### Include your text samples

Show your text samples. Explain that you are going to be using them to explain the concepts in your report.

#### Showing examples of UTF-32 representation

Show how the first character in each of your samples is represented using UTF-32. Briefly explain what UTF-32 does.

#### Showing examples of UTF-8 representation

Show how the first character in each of your samples is represented using UTF-8. Explain the method that was used to convert the character's unicode number into a UTF-8 representation. Your process for each character should be the following (which is in the CS Field Guide).
1. Look up the character in the Unicode table to get its Unicode number
2. Convert the Unicode number into binary
3. Look at the UTF-8 conversion table to find the correct pattern to use
4. Fill in the blanks in the pattern with the bits in the character's binary representation

#### Comparing the various UTF representations

The field guide includes an interactive [coming soon] which is used to determine how many bits are needed to represent a piece of text, using UTF-8, UTF-16, or UTF-32. Use that interactive to determine the best UTF representation for each of your text samples.

Include a table in your report that shows the size for each text sample, with each representation.

Explain your findings. Which seems to be the best for English text? Which seems to be the best for Asian text? Why is this the case?

(optional) If you are keen, you might like to read more about [UTF-16](https://en.wikipedia.org/wiki/UTF-16) and [UTF-32](https://en.wikipedia.org/wiki/UTF-32) to try and figure out why you got the results that you did.

## Hints for success

- Your 2.44 report should be structured in the following way. Note that the bolded parts are recommended headings. Details have not been included for sections covered in other guides. Look carefully at the Representing Data section to ensure you have structured your report properly. This will help the marker find what they need to find.

{text-box indented="True"}
**Computer Science report for 2.44**

-  **Representing Data**

  Put your introduction to what bits are here

  - **Representing Text**

    Put all your project work related to Unicode here

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
- The  Unicode project in this guide should not take up more than 1 to 1½ pages in your report.
