# Formal Languages - Checking for valid input in websites

This is a guide for students attempting Formal Languages in digital technologies achievement standard 3.44. This guide is not official, although we intend for it to be helpful, and welcome any feedback.

In order to fully cover the standard, you will also need to have done a project in one other 3.44 topic. The other project should be in either Complexity and Tractability, Intelligence Systems(Artificial Intelligence), Software Engineering, Network Protocols, or Computer Graphics and Computer Vision. Anything outside these topics is not part of the standard.

{panel type="teacher-note" summary="Required skills and preparation for this project"}
Students who chose this project for 3.44 will need to have the following skills (keep this in mind when picking projects, because different projects require different main skills):
- (Strongly recommended) were confident with the programming standards (e.g. 1.45, 1.46, 2.45, 2.46, and 3.46). This assessment requires some understanding and perspective on computation of problems. It helps a lot if the student would have some idea of how they’d write a program to solve the various problems (which does NOT use regular expressions/ finite state automata). At the merit/ excellence level, this will help them to identify whether or not regular expressions are the right tool for a particular problem.
- Are good at math and, computational thinking (this will be essential for excellence).
- This topic may be a good pick for weaker students who prefer following processes. As long as they can figure out a regular expression that works most of the time for email addresses, the rest of achieved is fairly mechanical.
{panel end}

## Overview

Note that a plural means "at least 2" in NZQA documents". Note that because this is one of the two areas of computer science that the student must cover, most of the plurals effectively become singular for this project, which is half their overall report. This project will give them at least one algorithm/technique and practical application, and the other project they do will give them another of each.

- **Achieved [A1]:** "describing key problems that are addressed in selected areas of computer science"
- **Achieved [A2]:** "describing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas"
- **Merit [M1]:** "explaining how key algorithms or techniques are applied in selected areas"
- **Merit [M2]:** "explaining examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas"
- **Excellence [E1]:** "discussing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas"
- **Excellence [E2]:** "evaluating the effectiveness of algorithms, techniques, or applications from selected areas"

The terminology in the 3.44 standard can be challenging to understand because it applies to six different areas. The following list describes how the terminology of the standard maps onto this project.

- **Selected Area:** Formal Languages
- **Key Problem:** Checking whether or not web form input is "valid"
- **Algorithms/ Techniques:** Regular Expressions, Finite State Automata, RE -> FSA conversion algorithm.
- **Practical Application:** Checking various fields in inputs forms

In summary, to satisfy the standard you might do the following:

- Describe the key problems, giving some background information about why they are so important. [A1]
- Describe/ Explain/ Discuss various types of input that need to be checked, and how regular expressions, finite state automata, and other algorithms and techniques from formal languages are used to achieve this.
- Explain (by showing) how regular expressions and finite state automata are used to check inputs (note that this partially overlaps with the previous point).
- Evaluate how effective regular expressions and finite state automata are at checking the validity of various inputs. To do this, you might look at some examples where they are surprisingly ineffective. (Note that this will also help to satisfy E1)

## Reading from the Computer Science Field Guide

Most of the content in the formal languages chapter will help you to complete this project. While you will not be including the examples from the field guide in your report, you should still work through them as they will increase your understanding of regular expressions and finite state automata for when you write your report.

## Project

In this project, you will investigate what inputs can effectively be checked for validity using regular expressions, what inputs it is possible to check with regular expressions (although in some cases it is clearly not the best tool for the job!), and which are computationally impossible to check with regular expressions.

You will also convert a regular expression to its equivalent finite state automata, like what a computer does internally.

This guide is broken into two parts.
- **Achieved/ Merit:** A project which looks at regular expressions and finite state automata for email addresses.
- **Excellence:** Investigating the limits of regular expressions/ finite state automata, the problems which they work well for, the problems which they don’t, and the problems they cannot solve. Unlike most of the assessment guides where most of your discussion and evaluation for excellence is generated from additional reading you have done, this one gives several examples for you to think about and analyse, which you will then consider when writing your discussion and evaluation.

**Important**: If you are only attempting Achieved/ Merit, you should **only** do email addresses (or a similar type of input). It is far better to focus on doing one type of input well rather than covering many different ones. Other inputs looked at should be with the intention of discussing and evaluating the effectivness of regular expressions/ finite state automata.

### Introduction (Achieved/ Merit/ Excellence) [A1 + background for the rest of the report]

This should not take more than 1 paragraph, or around ⅓ of a page. It is essential to do a good job of this part, even if what you are writing seems obvious. Start your report for this project by introducing the key problem, and why it is important to be able to check inputs in a web form (e.g. being able to tell the user straight away that the input is invalid, ensuring invalid data doesn’t end up in a database and cause problems later). *Start the first sentence of your report with "A key problem in computer science is…".* Explain why regular expressions are a popular technique used to address the problem.

Additionally, write something like "The types of input I investigated regular expressions for were" followed by a comma separated list. List (without details) the applications that your report looks at (e.g. email addresses, dates, credit card numbers, mathematical expressions, etc). You might need to write this part after you have written the rest of your report. This summary of what you have investigated will assist the marker.

### Checking whether or not an email address is valid (Achieved/ Merit/ Excellence)

{panel type="additional-information" summary="Bullet points covered in this section"}
[A2, M1, M2] - Bulk of report for Achieved/ Merit. In total, this will take up around 2 - 3 pages. Students should not go beyond 3 pages for this section if they want to attempt the excellence. A further page breakdown is provided within the section.
{panel end}

A common type of input to check is an email address. Write a regular expression to check for a valid email address. You can make the following assumptions about email addresses, although note that real email addresses are a bit more complicated!
- An email address contains two parts: the "local part" and the "domain part", separated with a @. They are in the form of "local part"@"domain part".
- The local part can be made up of any alphanumeric characters (i.e. all the upper and lower cases letters of the alphabet, and the 10 digits), "+" or "." . There cannot be multiple "." in a row.
- The domain part can be made up of any  alphanumeric characters (i.e. all the upper and lower cases letters of the alphabet, and the 10 digits), and ".".
- The local part and domain part cannot start or end with a "+", or ".".

Once you think you have your regular expression correct, convert it into a finite state automata (you can either do this by hand, or by using one of the tools linked to in the field guide). Make sure the states of your finite state automata are numbered (or have some kind of unique ID) as this will help you with your later explanations. You will be including the regular expression and the finite state automata in your report. The regular expression won’t take up much space, although you should ensure that the finite state automata does not take up more than half a page (and less if it is still legible when shrunk down further).

This should be around one paragraph for the regular expression and one paragraph for the finite state automata. All up, there should be about one page once the regular expression, finite state automata, and two paragraphs of explanation have been put together.
Explain how you designed your regular expression (i.e. what does each part of it mean?), and then explain how your finite state automata is equivalent to your regular expression (i.e. which parts of the regular expression map onto what parts of the finite state automata?)

Don’t include this part in your report now, you will include some of them in the next bit (although you must do this testing to ensure you have a correct regular expression/ finite state automata!). Come up with some example email addresses to trace through your regular expression or finite state automata by hand. You should pick examples which are effective in showing that your regular expression accepts valid inputs and rejects invalid inputs. If you find an example that your regular expression does not handle correctly, then you should try and fix it. Your invalid examples should include:
- An email address with multiple dots in a row
- An email address without a @.
- An email address that starts with a @.
- An email address with multiple @’s.
- An email address that ends in a @.
- An email address that starts with a "."
- An email address that starts with a "+".

{panel type="additional-information" summary="Ensuring the work is personalised"}
It is important that students come up with their own examples to test with. This personalises the student’s work. All up, the traces and working should take around 1 to ½ pages. There are several ways of approaching it. The student can either refer to their regular expression or their finite state automata in the explanation (the latter is probably easier, especially if the states have been numbered), and they may use clearly labelled diagrams as part of their explanation (e.g. a drawn on finite state automata). Any diagrams must be clear and legible.
Once you have finished testing and are satisfied that the regular expression/ finite state automata is working correctly, you should pick a couple of valid email addresses and three or four invalid email addresses (e.g. your ones from above) and explain how the finite state automata handles them. Explain how the finite state automata is moved into various states by the email address input. Remember that valid email addresses should end in a terminating state, and invalid email addresses should either end in a non terminating state, or be unable to transition at all at some point. Make sure that each of these worked examples clearly states what email address was used for it (use headings or bold the email address).
{panel end}


### Investigating, discussing, and evaluating the use of regular expressions for checking various inputs (Excellence).

As much as they are loved by computer scientists, regular expressions aren’t always the right tool for the job when we need to validate inputs. In many cases, including the email addresses above, they are very helpful. However, there are also plenty of cases where a few lines of code in a standard programming language (e.g. Python) would be a lot better than using a regular expression. There are also cases where you could never come up with a valid regular expression, even if you had infinite time to and space to write one.

For excellence, you will investigate other types of inputs in order to identify what kinds of problems regular expressions are good for, which they could be used for but should not be, and which there is no regular expression for.

In most assessment guides, you are provided with a set of links and questions for excellence. For this one, most online resources you find will be full of strange mathematical symbols, and won’t be helpful for you writing your report. So instead, we provide you with several interesting problems which involve a type of input. These can be found at the end of the document in the section "Regular Expression Problems for Excellence".  Before you start writing the excellence part of your report, you should explore each of the problems by trying to write a regular expression for them (some parts of them are easier than the email address one), and thinking about why they are either efficient, inefficient, or impossible to solve with a regular expression. Your writing for excellence will be based on your own understanding and thoughts about the problems. Focus on justifying and discussing your thoughts rather than worrying about whether or not you have "correct" answers.

Make a table which summarises the problems you have looked at (there are around 9 of them including the sub problems - a list is included below to help you), and specifies which are possible to solve with regular expressions, which are not, and which should be solved with regular expressions, and which should not. For those which are possible to solve with regular expressions, and are simple enough that they will fit onto one line, include the regular expression in your table. For the ones that are possible but the regular expression is very long, describe in a sentence or two what it would look like, or what kind of thing it would have to do. The table will probably take up around ¾ a page. It provides a summary of the investigations, and gives something to refer to in the discussion/ evaluation.

The problems in the table may include: (Remember to refer to the section at the end for more details!)
- Checking an email address
- Checking that a date entered is (somewhat) sensible
- Checking that a date entered is guaranteed to be valid
- Checking that a credit card number has 16 digits
- Checking what provider a credit card number is with
- Checking if a credit card number is valid (check digit)
- Checking if a simple mathematical equation with numbers and simple operators (+, -, \*, /) is valid.
- Checking if a mathematical equation with parentheses is valid.
- Checking if a string of parentheses is "balanced".

Your written discussion will cover the excellence criteria and should ideally be around 1 to 2 pages long. The key will be to write concisely.
You will then write a discussion/ evaluation on your findings, which addresses the following key points. The problems in the above table should be referred to.

- Discuss which problems seem to be impossible to solve with regular expressions. Can you notice anything in common about these problems?
- Discuss which problems seem to be possible to solve with regular expressions, but it is not the right tool for the job. Can you notice anything in common about these problems? Describe how you’d solve them in a programming language.
- Discuss which kinds of problems seem to be the ones you’d approach with regular expressions (refer to your table). What are regular expressions good for?

## Hints for Success

- Stay focussed on the key problems this assessment guide addresses. There are many cool applications of formal languages, although to satisfy the standard you need to focus on a narrow scope and go "deep" rather than "wide".
- Remember that you can use bold and italics, particularly in explanations which involve tracing inputs, in order to make your explanations easier to read.
- Remember that including inappropriate words and material in your assessed report can land you in some serious trouble. In particular, think carefully about the example email addresses you choose to use.
- Don’t trace examples through the problems in the excellence section. You have already shown that you know how regular expressions process inputs when you did the achieved/ merit.

## Staying within the page limit

The page limit for 3.44 is 10 pages. Remember that you have to do a project on a different topic as well, so that leaves 5 pages for Formal Languages. We recommend aiming for 4 and ½  pages so that if some sections go slightly over, you will still be under 10 pages overall. Also, don’t forget you will need a bibliography at the end.

A plausible breakdown would be:
- ½ page: Introducing the key problems, motivations, and the list of applications which are discussed in the report.
- 1 page: Email address regular expression, finite state automata, and explanations of them both.
- 1 to 1 ½ pages: Examples of email addresses and explanations of how they are processed by the regular expression or finite state automata.
- ¾ - 1 page: Table summarising the other various input problems given.
- 1 page: Discussion/ Evaluation based on the findings about the other input problems.

## Regular Expression Problems for Excellence

Remember that these problems are for you to think about, and it is your own thoughts and reasoning that will get you excellence. You should not include traces of examples through your regular expressions (you have already done this with the email addresses).

### Problem 1: Checking for a valid date

Try writing a regular expression to check for a valid date in the form of dd/mm/yyyy (for example, 08/05/2015).

On the surface, this might have seemed straightforward. But have you managed to ensure all these invalid dates are detected?
- 30/02/2015
- 29/02/2014 (but remember that 29/02/2016 is valid!)
- 31/11/1998
- 21/13/2013
- 38/05/1992

Is it computationally possible to write a regular expression that could be correct in every case? Is it at all practical to do? What would the regular expression look like?

### Problem 2: Checking credit card number validity

A credit card number has to have 16 digits, and you should have no trouble writing a regular expression to ensure that it has 16 digits.

You should even be able to write a regular expression for each of the major providers (mastercard, visa, etc, look on wikipedia to discover how you can identify which is which) that will tell you whether or not a given credit card number is from that provider.

But what about the check digits that you learnt about in 2.44? The 16th digit of the credit card number is calculated from the first 15 digits. Why can this not be done effectively using regular expressions? (Think about what the role of regular expressions is) What would a regular expression that only accepted valid credit card numbers (including the check digit) look like? (Hint: it is at least possible, in theory. But you’d find it impossible to write the entire regular expression by hand in your life-time, as it is just too long…)


### Problem 3: Checking for a valid mathematical expression

Pretend you have a form that you want a user to enter valid mathematical equations into. To be valid, the mathematical equation needs to satisfy the following rules.
- The equation can be made up of all the 10 digits (including multiple digits in a row, and +, -, \*, and /
- The first and last characters must be digits
- There can be any number of \* + - /, although there cannot be 2 of them in a row.

For example: 123*32+317-12 is valid.

For example: 123*/32-23 is not valid.

Try writing a regular expression that can check these inputs. Check it with a few example to ensure it is correct (you should not include the testing in your report, although you should make sure the regular expression that will be going in your report is correct.Testing is important!). This should not be too difficult if you were able to do the email address one without difficulty.

Now, add one extra rule in: Parentheses are allowed, as long as they are "balanced". i.e. there must be the same number of opening ones as closing ones, and if you scan across it from left to right, the current count of closing parenthesis should never be higher than the current count of opening parenthesis, and at the end, the two counts should be the same. There is no limit to the number of parenthesis allowed.

To save you from going crazy, we’ll tell you now that it is impossible. Unlike the other problems so far which were all solvable with regular expressions, even if it was terribly inefficient to write one solution, this one is impossible.The problem is trying to check that the parentheses are balanced. Try and make sense of why it is impossible to use regular expressions to solve this, and what happens when you attempt to do so.

To investigate it, forget about the digits and mathematical operators, and only consider the parentheses, using the "balanced" rules above. For example, it should accept strings like:
- ()
- (())
- (()())
- ((()())())
- (()()(()()()(((()))(()))(()()))

There is no limit to the length of the string of parentheses, as long as it is balanced.

And it should reject strings like
- ((((
- )
- (())) -- Too many closing parenthesis
- (())())( -- At one point there has been more closing than opening
- (()))(() -- At one point there has been more closing than opening

Try to make a regular expression or finite state automata that is able to check for strings like these. Don’t forget that there is no limit to the length of these parenthesis strings. Even if you make a regular expression/ finite state automata able to recognise some patterns, it is impossible to get them all. What happens when you try?
