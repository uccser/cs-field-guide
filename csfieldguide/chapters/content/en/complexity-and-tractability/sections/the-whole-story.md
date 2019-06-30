# The whole story!

The question of tractability is a big one in computer science &ndash; in fact, what is widely regarded as the biggest unsolved problem in computer science revolves around it.
You may recall that we mentioned that there are thousands of problems that we don't have a tractable solution for, yet a tractable solution to one can be adapted to all the others.
This group of problems is called "NP-complete" (NP stands for non-deterministic polynomial; complete just means that they can all be converted to each other!)
The big question is whether or not there is a polynomial time algorithm for any one of them, in which case all NP problems will have a P (polynomial time) solution.
The question is often referred to as whether or not P equals NP.

Actually, things get worse.
So far we've talked about intractable problems &ndash; ones that can be solved, but might need billions of years on a computer.
If you think it's bad that some problems take that long to solve, that's nothing!
These problems are at least decidable &ndash; if given enough time there exists an algorithm that will always lead to a correct answer.
There are some well known problems that are undecidable -- we know we can *never* write a correct algorithm to solve the problem on a computer.
For example, writing a program that reliably tells you if another program will finish or not is impossible!
There are other examples of such problems here:

- [http://www.cs4fn.org/algorithms/tiles.php](http://www.cs4fn.org/algorithms/tiles.php)
- [http://www.cs4fn.org/algorithms/uncomputable.php](http://www.cs4fn.org/algorithms/uncomputable.php)
- [http://www.cs4fn.org/algorithms/haltingproblem.php](http://www.cs4fn.org/algorithms/haltingproblem.php)

{comment eventually mention: halting problem (Turing), malware detection (tell whether program has malware embedded in it)}

It's good to know about these issues, to avoid getting stuck writing impossible programs.
It's also a fascinating area of research with opportunities to make a discovery that could change the world of computing, as well as contribute to our understanding on what can and can't be computed.

{comment mention quantum computing - might help, but no known NP problems solved yet - see Harel's book, http://nsf.gov/cise/csbytes/newsletter/vol3/pdf/csbb-vol3-i2.pdf}

{comment mention Turing's contributions - halting problem etc.}

{comment another NP-complete problem: https://en.wikipedia.org/wiki/Instant_Insanity}
