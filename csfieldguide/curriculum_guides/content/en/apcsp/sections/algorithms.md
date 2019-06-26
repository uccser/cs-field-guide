# Algorithms

## Overview

- EU 4.1 Algorithms are precise sequences of instructions for processes that can be executed by a computer and are implemented using programming languages.
- EU 4.2 Algorithms can solve many, but not all, computational problems.

## Reading from the Computer Science Field Guide

Start by reading through:

- [Algorithms]('chapters:chapter' 'algorithms')
- [Complexity and Tractability]('chapters:chapter' 'complexity-and-tractability')

## Learning objectives

The above chapter readings include specific knowledge for EKs marked in bold. Work to include unmarked learning objectives in the CS Field Guide is currently in progress.

### LO 4.1.1 Develop an algorithm for implementation in a program

- EK 4.1.1A Sequencing, selection, and iteration are building blocks of algorithms.
- EK 4.1.1B Sequencing is the application of each step of an algorithm in the order in which the statements are given.
- EK 4.1.1C Selection uses a Boolean condition to determine which of two parts of an algorithm is used.
- EK 4.1.1D Iteration is the repetition of part of an algorithm until a condition is met or for a specified number of times.
- EK 4.1.1E Algorithms can be combined to make new algorithms.
- EK 4.1.1F Using existing correct algorithms as building blocks for constructing a new algorithm helps ensure the new algorithm is correct.
- **EK 4.1.1G Knowledge of standard algorithms can help in constructing new algorithms.**
- **EK 4.1.1H Different algorithms can be developed to solve the same problem.**
- EK 4.1.1I Developing a new algorithm to solve a problem can yield insight into the problem.

### LO 4.1.2 Express an algorithm in a language.

- **EK 4.1.2A Languages for algorithms include natural language, pseudocode, and visual and textual programming languages.**
- **EK 4.1.2B Natural language and pseudocode describe algorithms so that humans can understand them.**
- **K 4.1.2C Algorithms described in programming languages can be executed on a computer.**
- EK 4.1.2D Different languages are better suited for expressing different algorithms.
- EK 4.1.2E Some programming languages are designed for specific domains and are better for expressing algorithms in those domains.

### LO 4.2.1 Explain the difference between algorithms that run in a reasonable time and those that do not run in a reasonable time.

{panel type="teacher-note"}

# EXCLUSION STATEMENT (for LO 4.2.1):
  
Any discussion of nondeterministic polynomial (NP) is beyond the scope of this course and the AP Exam.

{panel end}

- **EK 4.2.1A Many problems can be solved in a reasonable time.**
- **EK 4.2.1B Reasonable time means that the number of steps the algorithm takes is less than or equal to a polynomial function (constant, linear, square, cube, etc.) of the size of the input.**

{panel type="teacher-note"}

# EXCLUSION STATEMENT (for EK 4.2.1B):

Using nonpolynomial functions to describe relationships between the number of steps required by an algorithm and the input size is beyond the scope of this course and the AP Exam.

{panel end}

- **EK 4.2.1C Some problems cannot be solved in a reasonable time, even for small input sizes.**
- **EK 4.2.1D Some problems can be solved but not in a reasonable time. In these cases, heuristic approaches may be helpful to
find solutions in reasonable time.**

### LO 4.2.2 Explain the difference between solvable and unsolvable problems in computer science.

{panel type="teacher-note"}

# EXCLUSION STATEMENT (for LO 4.2.2):

Determining whether a given problem is solvable or unsolvable is beyond the scope of this course and the AP Exam.

{panel end}

- **EK 4.2.2A A heuristic is a technique that may allow us to find an approximate solution when typical methods fail to find an exact solution.**
- **EK 4.2.2B Heuristics may be helpful for finding an approximate solution more quickly when exact methods are too slow.**

{panel type="teacher-note"}

# EXCLUSION STATEMENT (for EK 4.2.2B):

Specific heuristic solutions are beyond the scope of this course and the AP Exam.

{panel end}

- **EK 4.2.2C Some optimization problems such as "find the best" or "find the smallest" cannot be solved in a reasonable time but approximations to the optimal solution can.**
- **EK 4.2.2D Some problems cannot be solved using any algorithm.**

### LO 4.2.3 Explain the existence of undecidable problems in computer science.

- **EK 4.2.3A An undecidable problem may have instances that have an algorithmic solution, but there is no algorithmic solution that solves all instances of the problem.**
- EK 4.2.3B A decidable problem is one in which an algorithm can be constructed to answer "yes" or "no" for all inputs (e.g. "is the number even?").
- EK 4.2.3C An undecidable problem is one in which no algorithm can be constructed that always leads to a correct yes-or-no answer.

{panel type="teacher-note"}

# EXCLUSION STATEMENT (for EK 4.2.3C):
  
Determining whether a given problem is undecidable is beyond the scope of this course and the AP Exam.

{panel end}

### LO 4.2.4 Evaluate algorithms analytically and empirically for efficiency, correctness, and clarity.

- EK 4.2.4A Determining an algorithm’s efficiency is done by reasoning formally or mathematically about the algorithm.
- EK 4.2.4B Empirical analysis of an algorithm is done by implementing the algorithm and running it on different inputs.
- EK 4.2.4C The correctness of an algorithm is determined by reasoning formally or mathematically about the algorithm, not by testing an implementation of the algorithm.

{panel type="teacher-note"}

# EXCLUSION STATEMENT (for EK 4.2.4C):
  
Formally proving program correctness is beyond the scope of this course and the AP Exam.

{panel end}

- **EK 4.2.4D Different correct algorithms for the same problem can have different efficiencies.**
- **EK 4.2.4E Sometimes, more efficient algorithms are more complex.**
- **EK 4.2.4F Finding an efficient algorithm for a problem can help solve larger instances of the problem.**
- EK 4.2.4G Efficiency includes both execution time and memory usage.

{panel type="teacher-note"}

# EXCLUSION STATEMENT (for EK 4.2.4G):
  
Formal analysis of algorithms (Big-O) and formal reasoning using mathematical formulas are beyond the scope of this course and the AP Exam.

{panel end}

- **EK 4.2.4H Linear search can be used when searching for an item in any list; binary search can be used only when the list is sorted.**
