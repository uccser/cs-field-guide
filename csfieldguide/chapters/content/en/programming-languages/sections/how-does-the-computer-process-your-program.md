# How does the computer process your program?

A programming language such as Python or Java is implemented using a program itself — the thing that takes your Python program and runs it is a program that someone has written!

Since the computer hardware can only run programs in a low level language (machine code), the programming system has to make it possible for your Python instructions to be executed using only machine language.
There are two broad ways to do this: interpreting and compiling.

[This 1983 video](https://www.youtube.com/watch?v=_C5AHaS1mOA) provides a good analogy of the difference between an interpreter and a compiler.

The main difference is that a compiler is a program that converts your program to machine language, which is then run on the computer.
An interpreter is a program that reads your program line by line, works out what those instructions are, and does them immediately.

There are advantages to both approaches, and each one suits some languages better than others.
In reality, most modern languages use a mixture of compiling and interpreting.
For example, most Java programs are *compiled* to an "intermediate language" called ByteCode, which is closer to machine code than Java.
The ByteCode is then executed by an interpreter.

If your program is to be distributed for widespread use, you will usually want it to be in machine code because it will run faster, the user doesn't have to have an interpreter for your particular language installed, and when someone downloads the machine code, they aren't getting a copy of your original high-level program.
Languages where this happens include C#, Objective C (used for programming iOS devices), Java, and C.

Interpreted programs have the advantage that they can be easier to program because you can test them quickly, trace what is happening in them more easily, and even sometimes type in single instructions to see what they do, without having to go through the whole compilation process.
For this reason they are widely used for introductory languages (for example, Scratch and Alice are interpreted), and also for simple programs such as scripts that perform simple tasks, as they can be written and tested quickly (for example, languages like PHP, Ruby and Python are used in these situations).

The diagram below shows the difference between what happens in an interpreter and compiler if you write and run a program that sorts some numbers.
The compiler produces a machine code program that will do the sorting, and the data is fed into that second program to get the sorted result.
The interpreter simply does the sorting on the input by immediately following the instructions in the program.
The compiler produces a machine code program that you can distribute, but it involves an extra phase in the process.

{interactive slug="flowcharts-interpreter-compiler" type="iframe"}

{comment mention cross compilers, especially for mobile apps}
