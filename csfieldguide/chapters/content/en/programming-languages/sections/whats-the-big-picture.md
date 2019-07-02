# What's the big picture?

We start with an optional subsection on what programming is, for those who have never programmed before and want an idea about what a program is.
Examples of very simple programs in Python are provided, and these can be run and modified slightly.
Working through this section should give you sufficient knowledge for the rest of this chapter to make sense; we won't teach you how to program, but you will get to go through the process that programmers use to get a program to run.
Feel free to skip this section if you are already know a bit about programming.

A subsection on what this chapter focuses on then follows.
Everybody should read that section.

{comment consider introductory video which mentions role of languages: https://www.youtube.com/watch?v=AkFi90lZmXA}

## What is programming?

{panel type="teacher-note"}

# Warm-up activity

Consider doing the following [warm-up activity from CS Unplugged](http://csunplugged.org/programming-languages), or the [extended version here](http://csunplugged.org/wp-content/uploads/2014/12/tellAndDraw1.5.pdf).

Students who have never programmed should also work through the material in this section, intended to give them an overview of what programming is about so that the remainder of this chapter makes sense to them.

{panel end}

*Note:* This section is intended for those who are unfamiliar with programming.
If you already know a little about programming, feel free to skip over this section.
Otherwise, it will give you a quick overview so that the remainder of the chapter makes sense.

An example of the simplest kind of program is as follows — it has five instructions (one on each line) that are followed one after the other.

```python3
print("**********************************************")
print("**********************************************")
print("** Welcome to computer programming, student **")
print("**********************************************")
print("**********************************************")
```

This program is written in a language called Python, and when the program runs, it will print the following text to the screen

```text
**********************************************
**********************************************
** Welcome to computer programming, student **
**********************************************
**********************************************
```

In order to run a Python program, we need something called a Python interpreter.
A Python interpreter is able to read your program and process it.
Below is a Python interpreter that you can use to run your own programs.
If you have a Python interpreter installed on your computer (ask your teacher if you are following this book for a class and are confused) and know how to start it and run programs in it, you can use that.

{interactive slug="python-interpreter" type="in-page"}

Try changing the program so that it says your name instead of *student*.
When you think you have it right, try running the program again to see.
Make sure you don’t remove the double quotes or the parentheses (round brackets) in the program by mistake.
What happens if you spell "programming" wrong? Does the computer correct it? If you are completely stuck, ask your teacher for help before going any further.

Hopefully you figured out how to make the program print your name.
You can also change the asterisks (\*) to other symbols.
What happens if you do remove one of the double quotes or one of the parentheses? Try it!

If you change a critical symbol in the program you will probably find that the Python interpreter gives an error message.
In the Python interpreter interactive above, it says "SyntaxError: bad input on line 1", although different interpreters will express the error in different ways.
If you have trouble fixing the error again, just copy the program back into Python from above.

{comment jargon note on statement (vs command)}

Programming languages can do much more than print out text.
The following program is able to print out multiples of a number.
Try running the program.

{panel type="teacher-note"}

# Python version

The following Python code is written for Python version 3, but will also work with version 2.

{panel end}

```python3
print("I am going to print the first 5 multiples of 3")
for i in range(5):
  print(i * 3)
```

The first line is a print statement, like those you saw earlier, which just tells the system to put the message on the screen.
The second line is a *loop*, which says to repeat the lines after it 5 times.
Each time it loops, the value of i changes.
So, the first time i is 0, then 1, then 2, then 3, and finally 4.
It may seem weird that it goes from 0 to 4 rather than 1 to 5, but programmers tend to like counting from 0 as it makes some things work out a bit simpler.
The third line says to print the current value of i multiplied by 3 (because we want multiples of 3).
Note that there is *not* double quotes around the last print statement, as they are only used when we want to print out a something literally as text.
If we did put them in, this program would print the text "i * 3" out 5 times instead of the value we want!

Try make the following changes to the program.

- Make it print multiples of 5 instead of 3.
  *Hint:* You need to change more than just the first line, you will need to make a change on the third line as well.
- Make it print the first 10 multiples instead of the first 5.
  Make sure it printed 10 multiples, and not 9 or 11!

You can also loop over a list of data.
Try running the program below.
It will generate a series of "spam" messages, one addressed to each person in the recipients list!

Note that the # symbol tells the computer that it should ignore the line, as it is a comment for the programmer.

```python3
# List of recipients to generate messages for
spam_recipients = ["Heidi", "Tim", "Pondy", "Jack", "Caitlin", "Sam", "David"]
# Go through each recipient
for recipient in spam_recipients:
  # Write out the letter for the current recipient
  print("Dear " + recipient + ",\n")
  print("You have been successful in the random draw for all people")
  print("who have walked over a specific piece of ground located 2 meters")
  print("from the Engineering Road entrance to Canterbury University.\n")
  print("For being successful in this draw you, " + recipient + ", win")
  print("a prize of 10 million kilograms of chocolate!!!\n")
  print("And " + recipient + ", if you phone us within the next 10 minutes")
  print("you will get a bonus 5 million kilograms of chocolate!!!\n")
  print("\n\n\n") # Put some new lines between the messages
```

Try changing the recipients or the letter.
Look carefully at all the symbols that were used to include the recipient's name in the letter.

{panel type="jargon-buster"}

# Syntax

The detailed requirements of a programming language about exactly which characters need to be used and where, is called its *{glossary-link term="syntax"}syntax{glossary-link end}*.
In the example above, the syntax for the list of names requires square brackets around the list, quotation marks or inverted commas around the names, and a comma between each one.
If you make a mistake, such as leaving out one of the square brackets, the system will have a *syntax error*, and won't be able to run the program.
Every symbol counts, and one small error in a program can stop it running, or make it do the wrong thing.

{panel end}

Programs can also use *variables* to store the results of calculations in, receive user input, and make decisions (called *conditionals*, such as *if* statements).
Try running this program.
Enter a number of miles to convert after `number_of_miles =`
Don’t put units on the number you enter; for example just put "12".

```python3
print("This program will convert miles to kilometers")
number_of_miles =
if number_of_miles < 0:
  print("Error: Can only convert a positive number of miles!")
else:
  number_of_kilometers = number_of_miles / 0.6214
  print("Calculated number of kilometers...")
  print(number_of_kilometers)
```

The first line is a *print* statement (which you should be very familiar with by now!).
The second line stores a number of miles as a variable (try entering different numbers here when you test it).
The third line uses an *if* statement to check if the number entered was less than 0, so that it can print an error if it is.
Otherwise if the number was okay, the program jumps into the *else* section (the error is not printed because the *if* was not true), calculates the number of kilometers (there are 0.6214 miles in a kilometer), stores it into a *variable* called `number_of_kilometers` for later reference, and then the last line prints it out.
Again, we don’t have quotes around `number_of_kilometers` in the last line as we want to print the value out that is stored in the `number_of_kilometers` variable.
If this doesn’t make sense, don’t worry.
You aren’t expected to know how to program for this chapter, this introduction is only intended for you to have some idea of what a program is and the things it can do.

If you are keen, you could modify this program to calculate something else, such as pounds to kilograms or Fahrenheit to Celsius.
It may be best to use an installed Python interpreter on your computer rather than the web version, as the web version can give very unhelpful error messages when your program has a mistake in it (although all interpreters give terrible error messages at least sometimes!).

Programs can do many more things, such as having a graphical user interface (like most computer programs you will be familiar with), being able to print graphics onto a screen, or being able to write to and read from files on the computer in order to save information between each time you run the program.

## Where are we going?

When you ran the programs, it might have seemed quite magical that the computer was able to instantly give you the output.
Behind the scenes however, the computer was running your example programs through another program in order to convert them into a form that it could make sense of and then run.

Firstly, you might be wondering why we need languages such as Python, and why we can’t give computers instructions in English.
If we typed into the computer "Okay computer, print me the first 5 multiples of 3", there's no reason that it would be able to understand.
For starters, it would not know what a "multiple" is.
It would not even know how to go about this task.
Computers cannot be told what every word means, and they cannot know how to accomplish every possible task.
Understanding human language is a very difficult task for a computer, as you will find out in the Artificial Intelligence chapter.
Unlike humans who have an understanding of the world, and see meaning, computers are only able to follow the precise instructions you give them.
Therefore, we need languages that are constrained and unambiguous that the computer "understands" instructions in.
These can be used to give the computer instructions, like those in the previous section.

It isn’t this simple though, a computer cannot run instructions given directly in these languages.
At the lowest level, a computer has to use physical hardware to run the instructions.
Arithmetic such as addition, subtraction, multiplication, and division, or simple comparisons such as less than, greater than, or equal to are done on numbers represented in binary by putting electricity through physical computer chips containing transistors.
The output is also a number represented in binary.
Building a fast and cheap circuit to do simple arithmetic such as this isn't that hard, but the kind of instructions that people want to give computers (like "print the following sentence", or "repeat the following 100 times") are much harder to build circuitry for.

{panel type="jargon-buster"}

# Binary

The electronics in computers uses circuitry that mainly just works with two values (represented as high and low voltages) to make it reliable and fast.
This system is called *{glossary-link term="binary-number-system"}binary{glossary-link end}*, and is often written on paper using zeroes and ones.
There's a lot more about binary in the [data representation]('chapters:chapter' 'data-representation') chapter, and it's worth having a quick look at the first section of that now if you haven't come across binary before.

{panel end}

{comment put in jargon buster on transistors somewhere (or in representations chapter) need to think about whether to put it here or in data representation. It's mainly something to break up the text, but the topic might be distracting here}

So instead of building computers that can understand these high level instructions that you find in languages like Python (or Java, Basic, JavaScript, C and so on), we build computers that can follow a very limited set of instructions.
Then we write programs that convert the instructions in the standard languages people write programs in to the simple instructions that the circuitry can directly carry out.
The language of these simple instructions is a low level programming language often referred to as machine code.

The conversion from a high level to a low level language can involve *compiling*, which replaces the high level instructions with machine code instructions that can then be run, or it can be done by *interpreting*, where each instruction is converted and followed one by one, as the program is run.
In reality, a lot of languages use a mixture of these, sometimes compiling a program to an intermediate language, then interpreting it (Java does this).
The language we looked at earlier, Python, is an interpreted language.
Other languages such as C++ are compiled.
We will talk more about compiling and interpreting later.

Different levels of programming languages are an abstraction that allows programmers to concern themselves with only the necessary details of a single level.
High level programmers can produce sophisticated programs in Python without expert knowledge of low level languages such as MIPS, x86, or ARM.
Low level programmers can produce embedded programs in ARM without expert knowledge of electronic circuitry.

We will start with looking at low level languages and how computers actually carry out the instructions in them, then we will look at some other programming languages that programmers use to give instructions to computers, and then finally we will talk about how we convert programs that were written by humans in a high level language into a low level language that the computer can carry out.
