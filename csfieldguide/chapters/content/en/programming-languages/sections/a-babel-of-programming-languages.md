# A babel of programming languages

There are many different programming languages.
Here we have included a small subset of languages, to illustrate the range of purposes that languages are used for.
There are many, many more languages that are used for various purposes, and have a strong following of people who find them particularly useful for their applications.

For a much larger list you can [check Wikipedia here](https://en.wikipedia.org/wiki/List_of_programming_languages).

## Python

Python is a widely used language that has also become very popular as a teaching language.
Many people learn Python as their first programming language.
In the introduction, we looked at some examples of Python programs for those who have never programmed before.

Originally though, Python was intended to be a scripting language.
Scripting languages have syntax that makes them quick to write programs for file processing in, and for doing repetitive tasks on a computer.

As an example of a situation where Python is very useful, imagine your teacher has given 5 quizzes throughout the year, and recorded the results for each student in a file such as this (It could include more than 6 students), where each student’s name is followed by their scores.
Some students didn’t bother going to class for all the quizzes, so have fewer than 5 results recorded.

```text
Karen 12 12 14 18 17
James 9 7 1
Ben 19 17 19 13
Lisa 9 1 3 0
Amalia 20 20 19 15 18
Cameron 19 15 12 9 3
```

Your teacher realises she needs to know the average (assuming 5 quizzes) that each student scored, and with many other things to do she does not want to spend much time on this task.
Using python, she can very quickly generate the data she needs in less than 10 lines of code.

Note that understanding the details of this code is irrelevant to this chapter, particularly if you aren’t yet a programmer.
Just read the comments (the things that start with a "#") if you don’t understand, so that you can get a vague idea of how the problem was approached.

```python3
# Open the raw score file for reading
raw_scores_file = open("scores.txt", "r")
# Create and open a file for writing the processed scores into
processed_scores_file = open("processed_scores.txt", "w")

# For each line in the file
for line in raw_scores_file.readlines():
    # Get the name, which is in the first part of the line
    name = line.split()[0]
    # Get a list of the scores, which are on the remainder of the lines
    scores_on_line = [int(score) for score in line.split()[1:]]
    # Calculate the average, which is the sum of the scores divided by 5
    average = sum(scores_on_line) / 5
    # Write the average to the processed scores output file
    processed_scores_file.write(name + " " + str(average) + "\n")

# Close both files
raw_scores_file.close()
processed_scores_file.close()
```

This will generate a file that contains each student’s name followed by the result of adding their scores and dividing the sum by 5.
You can try the code if you have python installed on your computer (it won’t work on the online interpreter, because it needs access to a file system).
Just put the raw data into a file called "scores.txt" in the same format it was displayed above.
As long as it is in the same directory as the source code file you make for the code, it will work.

This problem could of course be solved in any language, but some languages make it far simpler than others.
Standard software engineering languages such as Java, which we talk about shortly, do not offer such straight forward file processing.
Java requires the programmer to specify what to do if opening the file fails in order to prevent the program from crashing.
Python does not require the programmer to do this, although does have the option to handle file opening failing should the programmer wish to.
Both these approaches have advantages in different situations.
For the teacher writing a quick script to process the quiz results, it does not matter if the program crashes so it is ideal to not waste time writing code to deal with it.
For a large software system that many people use, crashes are inconvenient and a security risk.
Forcing all programmers working on that system to handle this potential crash correctly could prevent a lot of trouble later on, which is where Java’s approach is helpful.

In addition to straight forward file handling, Python did not require the code to be put inside a class or function, and it provided some very useful built in functions for solving the problem.
For example, the function that found the sum of the list, and the line of code that was able to convert the raw line of text into a list of numbers (using a very commonly used pattern).

This same program written in Java would require at least twice as many lines of code.

There are many other scripting languages in addition to Python, such as Perl, Bash, and Ruby.

## Scratch

Scratch is a programming language used to teach people how to program.
A drag and drop interface is used so that new programmers don’t have to worry so much about syntax, and programs written in Scratch are centered around controlling cartoon characters or other sprites on the screen.

Scratch is never used in programming in industry, only in teaching.
If you are interested in trying Scratch, [you can try it out online here](http://scratch.mit.edu/projects/editor/?tip_bar=getStarted), no need to download or install anything.

{button-link link="http://scratch.mit.edu/projects/19711355/#editor" text="Example Scratch project"}

This is an example of a simple program in Scratch that is similar to the programs we have above for Python and Java.
It asks the user for numbers until they say "stop" and then finds the average of the numbers given.

{image file-path="img/chapters/scratch-example-program.png" alt="This image shows a Scratch program that asks the user to enter numbers until they type stop and then computes the average of the numbers given."}

And this is the output that will be displayed when the green flag is clicked:

{image file-path="img/chapters/scratch-example-program-output.png" alt="This image shows the output of the above scratch program when the user enters two numbers that sum up to forty. The output is twenty."}

Scratch can be used for simple calculations, creating games and animations.
However it doesn't have all the capabilities of other languages.

Other educational languages include Alice and Logo.
Alice also uses drag and drop, but in a 3D environment.
Logo is a very old general purpose language based on Lisp.
It is not used much anymore, but it was famous for having a turtle with a pen that could draw on the screen, much like Scratch.
The design of Scratch was partially influenced by Logo.
These languages are not used beyond educational purposes, as they are slow and inefficient.

## Java

Java is a popular general purpose software engineering language.
It is used to build large software systems involving possibly hundreds or even thousands of software engineers.
Unlike Python, it forces programmers to say how certain errors should be handled, and it forces them to state what type of data their variables are intended to hold, e.g. *int* (i.e. a number with no decimal places), or *String* (some text data).
Python does not require types to be stated like this.
All these features help to reduce the number of bugs in the code.
Additionally, they can make it easier for other programmers to read the code, as they can easily see what type each variable is intended to hold (figuring this out in a python program written by somebody else can be challenging at times, making it very difficult to modify their code without breaking it!)

This is the Java code for solving the same problem that we looked at in Python; generating a file of averages.

```java
import java.io.*;
import java.util.*;

public class Averager {
    public static void main() {
        String inputFile = "scores.txt";
        String outputFile = "processed_scores.txt";
       	try {
           	Scanner scanner = new Scanner(new File(inputFile));
           	PrintStream outputFile = new PrintStream(new File(outputFile));
           	while (scanner.hasNextLine()) {
               	String name = scanner.next();
               	Scanner numbersToRead = new Scanner(scanner.nextLine());
               	int totalForLine = 0;
               	while (numbersToRead.hasNextInt()) {
                    totalForLine += numbersToRead.nextInt();
               	}
               	outputFile.println(name + " " + totalForLine/5.0 + "\n");
           	}
           	outputFile.close();
       	} catch (IOException e) {
            System.out.println("The file could not be opened!" + e);
       	}
    System.out.println("I am finished!");
    }
}
```

While the code is longer, it ensures that the program doesn’t crash if something goes wrong.
It says to *try* opening and reading the file, and if an error occurs, then it should *catch* that error and print out an error message to tell the user.
The alternative (such as in Python) would be to just crash the program, preventing anything else from being able to run it.
Regardless of whether or not an error occurs, the "I am finished!" line will be printed, because the error was safely "caught".
Python is able to do error handling like this, but it is up to the programmer to do it.
Java will not even compile the code if this wasn’t done!
This prevents programmers from forgetting or just being lazy.

There are many other general software engineering languages, such as C# and C++.
Python is sometimes used for making large software systems, although is generally not considered an ideal language for this role.

## JavaScript

- Interpreted in a web browser
- Similar language: Actionscript (Flash)

Note that this section will be completed in a future version of the field guide.
For now, you should refer to [Wikipedia](https://en.wikipedia.org/wiki/JavaScript) for more information.

## C

- Low level language with the syntax of a high level language
- Used commonly for programming operating systems and embedded systems
- Programs written in C tend to be very fast (because it is designed in a way that makes it easy to compile it optimally into machine code)
- Bug prone due to the low level details.
  Best not used in situations where it is unnecessary
- Related languages: C++ (somewhat)

Note that this section will be completed in a future version of the field guide.
For now, you should refer to [Wikipedia](https://en.wikipedia.org/wiki/C_%28programming_language%29) for more information.

## Matlab

- Used for writing programs that involve advanced math (calculus, linear algebra, etc.)
- Not freely available
- Related languages: Mathematica, Maple

Note that this section will be completed in a future version of the field guide.
For now, you should refer to [Wikipedia](https://en.wikipedia.org/wiki/MATLAB) for more information.

## Esoteric Programming Languages

Anybody can make their own programming language.
Doing so involves coming up with a syntax for your language, and writing a parser and compiler or interpreter so that programs in your language can be run.
Most programming languages that people have made never become widely used.

In addition to programming languages that have practical uses, people have made many programming languages that were intended to be nothing more than jokes, or to test the limits of how obscure a programming language can be.
Some of them make the low level machine languages you saw earlier seem rather logical!
Wikipedia has a [list of such languages](https://en.wikipedia.org/wiki/Esoteric_programming_language).

You could even make your own programming language if you wanted to!
