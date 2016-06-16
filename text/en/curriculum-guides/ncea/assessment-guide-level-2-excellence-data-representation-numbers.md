# Excellence Guide for Data Representation (2.44) - Numbers

This is a merit/excellence level guide for students attempting data representation in digital technologies achievement standard 2.44 (AS91371). It is aimed at students aiming for merit or excellence.

**You will need to do one more project in data representation in addition to this one**, because the standard requires you to cover two types of data.
This guide covers only numbers (positive and negative numbers).
Note that there is no excellence requirement for data representation -- it only goes up to merit. This guide is called an excellence guide though to avoid confusion about whether or not it is suitable for students aiming for excellence.

In order to fully cover the standard, as well as one more investigation on data representation for another type of data, you will need to do projects covering the three encoding topics up to the achieved level (error control coding, encryption, and compression), follow one of the three coding methods to excellence level, and a project covering human computer interaction, and include these in your report.

## Overview

The topic of Data Representation has the following bullet points in achievement standard 2.44, which this guide covers.

**Achieved**: "describing ways in which different types of data can be represented using bits"

**Merit**: "comparing and contrasting different ways in which different types of data can be
represented using bits and discussing the implications"

This guide focuses on one of the types of data you will need to cover (you will need to cover two).

As with all externally assessed reports, you should base your explanations around personalised examples.

## Reading from the Computer Science Field Guide

You should read and work through the interactives in the following sections of the CS Field Guide in order to prepare yourself for the assessed project.

- [Representing whole numbers with Binary](chapters/data-representation.html#representing-whole-numbers-in-binary) - It is important that you understand this section really well before going any further, as every other concept is based on it.
- [Representing numbers in practice](chapters/data-representation.html#computers-representing-numbers-in-practice) - This section is useful background, which explains the issues we need to consider in practice when representing numbers in binary.
- [How many bits are used in practice](chapters/data-representation.html#how-many-bits-are-used-in-practice)
- [Representing negative numbers in practice](chapters/data-representation.html#representing-negative-numbers-in-practice) - It is important that you understand this section really well, because it is central to this project. You should understand what we mean by a simple sign bit, Two's Complement, and how to add and subtract binary numbers, and the implications for simple sign bits vs Two's Complement.

## Project

### Writing an Introduction to Data Representation

***You only need to do this if you have not already done it (the other guide you follow for data representation will also tell you to write this intro)***

This section will be around ¼ to ½ of a page.

Start the data representation section of your report by writing an introduction to the topic of data representation. Describe what a "bit" is, and why computers use bits to represent data. Briefly describe a couple of the ways in which computers physically represent bits (if you open a computer, you will ***not*** see lots of little 0's and 1's!).

This explanation must be in your own words, based on what you understood in class (e.g. do not paraphrase a definition).

### Representing Positive and Negative Numbers in Binary

***This is the main part of your project.***

This section will be around 2 pages in your report. There are 4 parts to it.

1. Showing how **positive** numbers can be represented in binary, and clearly explaining the process.
2. Showing how **negative** numbers can be represented in binary with a simple sign bit.
3. Showing how **negative** numbers can be represented in binary using Two's Complement, and clearly explaining the process.
4. Explaining reasons why Two's Complement is widely used, and simple sign bits are not, by showing examples of addition and subtraction. Also explain why the way a simple sign bit represents 0 is problematic.

**Choosing three numbers for your examples**

You will need to pick three numbers, which you will you use to illustrate the various ways of representing numbers in binary. Your chosen numbers should **not** be in field guide examples.

1. A **positive** number **between 65 and 120**
2. A **negative** number **between -10 and -64**
3. A **additional positive** number, which is the "positive" form of your negative number (i.e. if you had chosen -11, this number would be 11). This number is **only used in the last part of the project**.

The numbers **should be within the ranges**, to ensure they work with all the representations you'll be using them for.

#### Representing positive numbers in binary

Show how your **positive** number is represented in binary. Explain clearly how you figured it out.

This section should not take up more than ⅓ of a page.

#### Representing numbers in binary with a simple sign bit

Show how your **positive** number is represented in binary with a simple sign bit.

Show how your **negative** number is represented in binary with a simple sign bit.

This section should not take up more than ¼ of a page. Keep it very brief, and you should be able to explain it in no more than 1 - 2 sentences.

#### Representing numbers in binary with Two's Complement

Show how your **negative** number is represented in binary with Two's Complement. Explain clearly how you arrived at that answer. This could involve clearly listing the steps, and showing the result after each one.

***Common pitfall warning***: Don't forget to remove the sign bit before calculating the Two's Complement representation!

This section should not take up more than ⅓ of a page.

#### Explaining reasons why Two's Complement is widely used, and simple sign bits are not

**Briefly** explain why the simple sign bit representation for **0** is problematic.

The field guide showed a few examples of adding and subtracting binary numbers using a simple sign bit, and then Two's Complement. These examples illustrated that Two's Complement is far easier to work with than a simple sign bit. You'll now be doing your own calculations to illustrate this point.

Start by ensuring you have all the following binary representations ready to use (some of them you will not have done yet so will need to do now, but do not show any more conversions to binary in your report).

*All the numbers should be 8 bits long. Add leading 0's if needed, but put them* **after** *the simple sign bit if there is one*.

{text-box}
Number 1: **positive number** in binary with a **simple sign bit**.  
Number 2: **additional positive number** in binary with a **simple sign bit**.  
Number 3: **positive number** in binary, using Two's Complement (remember that this is just a plain binary number).  
Number 4: **negative number** in binary, using Two's Complement.  
Number 5: **additional positive number** in binary, using Two's Complement (remember that this is just a plain binary number).
{text-box end}

Now, show and explain the following calculations. Indicate whether or not they lead to a correct answer. You might find it easier to do them on paper, and then scan and include them as images in your report. Read the hints for success for advice on this.

{text-box}
**Calculation 1:** Number 3 {math}+{math end} Number 5
{text-box end}

Use this first calculation to show how two positive binary numbers can be added.

{text-box}
**Calculation 2:** Number 1 {math}-{math end} Number 2
{text-box end}

This calculation shows whether or not subtraction can be done with two positive numbers using simple sign bits, without making a special case for the sign.

{text-box}
**Calculation 3:** Number 3 {math}+{math end} Number 4
{text-box end}

This calculation shows that subtraction can be done by **adding** a negative number to the positive number. (Remember that with decimal numbers, adding the negative of a number is the same as subtracting the number. It's the same for binary.)

{text-box}
**Calculation 4:** Number 5 {math}+{math end} Number 4
{text-box end}

This calculation shows what happens when a bigger number is subtracted from a smaller number.

Explain what you have found.

**Hint:** You should find that calculation 1 works (it's just adding positive numbers, so no surprise), calculation 2 fails (the sign bits mess up the calculation), and calculations 3 and 4 work (thanks to Two's Complement).

This section should not take more than 1 page in your report.

## Hints for success

- Your 2.44 report should be structured in the following way. Note that the bolded parts are recommended headings. Details have not been included for sections covered in other guides. Look carefully at the Representing Data section to ensure you have structured your report properly. This will help the marker find what they need to find.

{text-box indented="True"}
**Computer Science Report for 2.44**

- **Representing Data**

  Put your introduction to what bits are here

  - **Representing Numbers**

       Put all your project work related to Binary numbers and Two's Complement here

  - **Representing [other topic]**

       (see relevant guide for information on structuring this section)

- **Encoding**

  (see relevant guide for information on structuring this section)

- **Human Computer Interaction**

  (see relevant guide for information on structuring this section)
{text-box end}

- Be careful to put your explanations and examples under the correct headings.
- Do not include large lists or tables, for example do not include an ASCII table or a list of binary number conversions.
- The introduction to data representation should not take more than ½ of a page in your report.
- If you choose to include some information as scanned writing/drawings, do **not** save as JPEG! Use PNG instead. JPEG distorts writing really badly! Be sure to use a dark pen, and if you use a camera rather than scanner to do the scanning, make sure the image is focussed properly.
- The project on positive and negative numbers should not take up more than 1½ to 2 pages in your report.
