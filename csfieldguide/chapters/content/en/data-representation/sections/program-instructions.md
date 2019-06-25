# Program Instructions

{panel type="caution" expanded="true"}

# Caution

Before reading this section, you should have an understanding of low level languages (see the section on [Machine Code in the Programming Languages]('chapters:chapter_section' 'programming-languages' 'machine-code-low-level-languages') chapter).

{panel end}

In a similar fashion to representing text or numbers using binary, we can represent an entire actual {glossary-link term="program"}program{glossary-link end} using binary.
Since a program is just a sequence of instructions, we need to decide how many bits will be used to represent a single instruction and then how we are going to interpret those bits.
Machine code instructions typically have a combination of two pieces: operation and operand.

```text
li $t0, 10 #Load the value 10 into register $t0
li $t1, 20 #Load the value 20 into register $t1
#Add the values in $t0 and $t1, put the result in register $a0
add $a0, $t0, $t1
```

In the above machine code program li and add are considered to be operations to "load an integer" and "add two integers" respectively.
$t0, $t1, and $a0 are register operands and represent a place to store values inside of the machine.
10 and 20 are literal operands and allow instructions to represent the exact integer values 10 and 20.
If we were using a 32-bit operating system we might encode the above instructions with each instruction broken into 4 8-bit pieces as follows:

| Operation |    Op1   |    Op2   |   Op3    |
|-----------|----------|----------|----------|
| 00001000 &nbsp; &nbsp; &nbsp; | 00000000 &nbsp; &nbsp; &nbsp; | 00000000 &nbsp; &nbsp; &nbsp; | 00001010 &nbsp; &nbsp; &nbsp; |
| 00001000  | 00000001 | 00000000 | 00010100 |
| 00001010  | 10000000 | 00000000 | 00000001 |

<br>

Our operation will always be determined by the bits in the first 8-bits of the 32-bit instruction.
In this example machine code, 00001000 means li and 00001010 means add.
For the li operation, the bits in Op1 are interpreted to be a storage place, allowing 00000000 to represent $t0.
Similarly the bits in Op1 for the add instruction represent $a0.
Can you figure out what the bits in Op3 for each instruction represent?

Using bits to represent both the program instructions and data forms such as text, numbers, and images allows entire computer programs to be represented in the same binary format.
This allows programs to be stored on disks, in memory, and transferred over the internet as easily as data.
