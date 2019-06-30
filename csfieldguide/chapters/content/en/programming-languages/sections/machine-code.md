# Machine code (low level languages)

{panel type="teacher-note"}

# We're not expecting students to write machine code!

Students are NOT expected (or even encouraged) to be able to write their own program in these languages.
The purpose of the examples and getting the students to modify them is to help them understand why programming directly in these languages is best avoided, and thus the reason for high level languages.

If they have trouble with a lot of the modifications that are suggested, this is fine.
They should not be concerned about it.
Remind students that if they were able to modify the high level language programs, but really struggle with these ones, that this is the point of the exercise and that they should explain why it was so difficult in their report.

Having an old CPU (that you will never want to use again) that the students can pass around and look at could be a good thing to do if you can find one.

{panel end}

{comment consider putting in alternative assembler examples e.g. 8080, http://www.cs.hmc.edu/~cs5grad/cs5/hmmm/documentation/documentation.html}

A computer has to carry out instructions on physical circuits.
These circuits contain transistors laid out in a special way that will give a correct output based on the inputs.

{comment Put an example here of a simple adder, or in meantime link to something on web}

Data such as numbers (represented using binary) have to be put into storage places called registers while the circuit is processing them.
Registers can be set to values, or data from memory can be put into registers.
Once in registers, they can be added, subtracted, multiplied, divided, or be checked for equality, greater than, or less than.
The output is put into a register, where it can either be retrieved or used in further arithmetic.

All computers have a machine code language (commonly referred to as an instruction set) that is used to tell the computer to put values into registers, to carry out arithmetic with the values in certain registers and put the result into another specified register like what we talked about above.
Machine code also contains instructions for loading and saving values from memory (into or out of registers),  jumping to a certain line in the program (that is either before or after the current line), or to jump to the line only if a certain condition is met (by doing a specified comparisons on values in registers).
There are also instructions for handling simple input/ output, and interacting with other hardware on the computer.

The instructions are quite different to the ones you will have seen before in high level languages.
For example, the following program is written in a machine language called MIPS; which is used on some embedded computer systems.
We will use MIPS in examples throughout this chapter.

Don’t worry, we aren’t about to make you learn how to actually program in this language!
If you don’t understand the program, that’s also fine because many software engineers wouldn’t either!
We are showing it to you to help you appreciate the purpose of both low and high level languages.

It starts by adding 2 numbers (that have been put in registers $t0 and $t1) and printing out the result.
It then prints `Hello World!`.

```mips
.data
str:  .asciiz "\nHello World!\n"
# You can change what is between the quotes if you like

.text
.globl main

main:
# Do the addition
# For this, we first need to put the values
# to add into registers ($t0 and $t1)
# You can change the 30 below to another value
li $t0, 30
# You can change the 20 below to another value
li $t1, 20

# Now we can add the values in $t0
# and $t1, putting the result in special register $a0
add $a0, $t0, $t1

# Set up for printing the value in $a0.
# A 1 in $v0 means we want to print an int
li $v0, 1

# The system call looks at what is in $v0
# and $a0, and knows to print what is in $a0
syscall

# Now we want to print Hello World
# So we load the (address of the) string into $a0
la $a0, str

# And put a 4 in $v0 to mean print a string
li $v0, 4

# And just like before syscall looks at
# $v0 and $a0 and knows to print the string
syscall

# Nicely end the program
li $v0, 0
jr $ra
```

You can run this program using a MIPS emulator like these interactives:

{interactive slug="mips-assembler" type="whole-page"}

Copy the plain output in the "Assembler Output" box and paste it into the box in this simulator interactive:

{interactive slug="mips-simulator" type="whole-page"}

Once you have got the program working, try changing the values that are added.
The comments tell you where these numbers that can be changed are.
You should also be able to change the string (text) that is printed without too much trouble also.
As a challenge, can you make it so that it subtracts rather than adds the numbers?
Clue: instruction names are always very short.
Unfortunately you won’t be able to make it multiply or divide using this simulator as this is not currently supported.
Remember that to rerun the program after changing it, you will have to reassemble it first.

You may be wondering why you have to carry out both these steps.
Because computers work in binary (1s and 0s), the instructions need be assembled into {glossary-link term="hexadecimal"}hexadecimal{glossary-link end}.
Hexadecimal is a shorthand notation for binary numbers.
*Don’t muddle this process with compiling or interpreting!* Unlike these, assembling is much simpler as, in general, each instruction from the source code ends up being one line in the hexadecimal.

One thing you might have noticed while reading over the possible instructions is that there is no loop instruction in MIPS.
Using several instructions though, it actually is possible to write a loop using this simple language.
It requires being quite creative!

We can jump to a line, and branch if a condition is met, in order to make loops!
A very simple program we could write that requires a loop is one that counts down from five and then says "Go!!!!" once it gets down to one.
In Python we can easily write this program in three lines.

```python3
# Start at 5, count down by 1 each time, and stop before we get to 0
for number in range(5, 0, -1):
   print(number)
print("GO!!!!!")
```

But in MIPS, it isn’t that straightforward.
We need to put values into registers, and we need to build the loop out of jump statements.
Firstly, how can we design the loop?

{comment Add flow chart}

The full MIPS program for this is as follows.
It's the "advanced example" from the assembler interactive.

```mips
# Define the data strings
.data
go_str:   .asciiz "GO!!!!!\n"
new_line: .asciiz "\n"

.text
# Where should we start?
.globl main

main:
  # Put our starting value 5 into register $t0. We will update it as we go
  li $t0, 5
  # Put our stopping value 0 into register $t1
  li $t1, 0

# This label is just used for the jumps to refer to
start_loop:
  # This says that if the values in $t0 and $t1 are the same,
  # it should jump down to the end_loop label. This is the
  # main loop condition
  beq $t0, $t1, end_loop
  # These three lines prepare for and print the current int
  # It must be moved into $a0 for the printing
  move $a0, $t0
  li $v0, 1
  syscall
  # These three lines print a new line character so that
  # each number is on a new line
  li $v0, 4
  la $a0, new_line
  syscall
  # Add -1 to the value in $t0, i.e decrement it by 1
  addi $t0, $t0, -1
  # Jump back up to the start_loop label
  j start_loop

# This is the end loop label that we jump to
# when the loop condition becomes true
end_loop:
  # These three lines print the “GO!!!!” string.
  li $v0, 4
  la $a0, go_str
  syscall
  # And these two lines make the program exit nicely
  li $v0, 0
  jr $ra
```

Can you change the Python program so that it counts down from 10?
What about so it stops at 5?
(You might have to try a couple of times, as it is somewhat counter intuitive.
Remember that when i is the stopping number, it stops there and does not run the loop for that value!).
And what about decrementing by 2 instead of 1?
And changing the string (text) that is printed at the end?

You probably found the Python program not too difficult to modify.
See if you can make these same changes to the MIPS program.

If that was too easy for you, can you make both programs print out "GO!!!!" twice instead of once?
(you don’t have to use a loop for that).
And if THAT was too easy, what about making each program print out "GO!!!!" 10 times?
Because repeating a line in a program 10 times without a loop would be terrible programming practice, you’d need to use a loop for this task.

More than likely, you’re rather confused at this point and unable to modify the MIPS program with all these suggested changes.
And if you do have an additional loop in your MIPS program correctly printing "GO!!!" 10 times, then you are well on your way to being a good programmer!

So, what was the point of all this?
These low level instructions may seem tedious and a bit silly, but the computer is able to directly run them on hardware due to their simplicity.
A programmer can write a program in this language if they know the language, and the computer would be able to run it directly without doing any further processing.
As you have probably realised though, it is extremely time consuming to have to program in this way.
Moving stuff in and out of registers, implementing loops using jump and branch statements, and printing strings and integers using a three line pattern that you’d probably never have guessed was for printing had we not told you, leaves even more opportunities for bugs in the program.
Not to mention, the resulting programs are extremely difficult to read and understand.

Because computers cannot directly run the instructions in the languages that programmers like, high level programming languages by themselves are not enough.
The solution to this problem of different needs is to use a compiler or interpreter that is able to convert a program in the high level programming language that the programmer used into the machine code that the computer is able to understand.

These days, few programmers program directly in these languages.
In the early days of computers, programs written directly in machine language tended to be faster than those compiled from high level languages.
This was because compilers weren’t very good at minimising the number of machine language instructions, referred to as *optimising*, and people trained to write in machine code were better at it.
These days however, compilers have been made a lot smarter, and can optimise code far better than most people can.
Writing a program directly in machine code may now result in a program that is *less* optimised than one that was compiled from a high level language.
Don’t put in your report that low level languages are faster!

{comment point out that compiling for large software can be slow https://xkcd.com/303/}

This isn’t the full story; the MIPS machine code described here is something called a Reduced Instruction Set Architecture (RISC).
Many computers these days use a Complex Instruction Set Architecture (CISC).
This means that the computer chips can be a little more clever and can do more in a single step.
This is well beyond the scope of this book though, and understanding the kinds of things RISC machine code can do, and the differences between MIPS and high level languages is fine at this level, and fine for most computer scientists and software engineers.

In summary, we require low level programming languages because the computer can understand them, and we require high level programming languages because humans can understand them.
A later section talks more about compilers and interpreters; programs that are used to convert a program that is written in a high level language (for humans) into a low level language (for computers).
