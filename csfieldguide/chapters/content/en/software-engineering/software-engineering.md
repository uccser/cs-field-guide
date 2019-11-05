# Software Engineering

{panel type="teacher-note"}

# Challenges in teaching Software engineering

Software engineering is a challenging topic to teach for several reasons.
One reason is that many, if not most, textbooks aren't written by practising software engineers, and often contain outdated ideas that are difficult for students to understand.
For example, the waterfall model is often taught near the start, and yet often doesn’t work in practice &ndash; in fact it was originally presented as an example of how *not* to do software engineering.

Furthermore, to get real experience with software engineering would involve being on a team of qualified engineers working on a project with vague and changing needs.
This is very difficult in educational settings where the norm is individual work being done by inexperienced students who are given clear criteria on which they will be graded.

In this chapter we've tried to capture what really happens in industry, and suggest activities that will give students a realistic view of what is involved.

{panel end}

{glossary-link term="software"}Software{glossary-link end} failures happen all the time.
Sometimes it’s a little {glossary-link term="bug"}bug{glossary-link end} that makes a {glossary-link term="program"}program{glossary-link end} difficult to use; other times an error might crash your entire computer.
Some software failures are more spectacular than others.

In 1996, The ARIANE 5 rocket of the European Space Agency was launched for its first test flight: Countdown, ignition, flame and smoke, soaring rocket... then BANG!
Lots of little pieces scattered through the South American rainforest.
Investigators had to piece together what happened and finally tracked down this tiny, irrelevant bug.
A piece of software on board the rocket which was not even needed had reported a value that was too big to be stored.
An error was stored instead, but other software interpreted the error as saying the rocket was 90 degrees off course.
Thankfully, no one was on board but the failure still caused about US$370m damage.

{video url="https://www.youtube.com/embed/gp_D8r-2hwk?rel=0"}

{image file-path="img/chapters/ariane-rocket-cartoon.png" alt="Ariane Cartoon"}

In extreme cases, software bugs can endanger lives.
This happened in the 1980s, for example, when a [radiation therapy machine](https://en.wikipedia.org/wiki/Therac) caused the deaths of 3 patients by giving 100 times the intended dose of radiation.
And in 1979, a US Army computer [almost started a nuclear war](https://nsarchive2.gwu.edu/nukevault/ebb371/), when it misinterpreted a simulation of the Soviet Union launching a missile as the real thing!
If you are interested in other software failures, [CS4FN](http://www.cs4fn.org/softwareengineering/backtodrawingboard.php) lists the most spectacular ones!

Our society today is so reliant on software that we can’t even imagine life without it anymore.
In many ways, software has made our lives easier: we write emails, chat with friends on Facebook, play computer games and search for information on the internet.
Heaps of software is hidden behind the scenes too, so we don’t even know we’re using it.
There's software in cars, traffic lights, TVs, washing machines, Japanese toilets, and hearing aids.
We've become so used to having software, we expect it to work at all times!

So why doesn’t it?
Why do we get bugs in the first place?
As it turns out, writing software is incredibly difficult.
Software isn’t a physical product, so we can’t just look at it to see if it’s correct.
On top of that, most of the software you use every day is huge and extremely complex.
Windows Vista is rumoured to have around 50 million lines of code; MacOSX has 86 million.
If we printed Vista out on paper, we would get an 88m high stack!
That’s as high as a 22 storey building or the Statue of Liberty in New York!
If you wanted to read through Vista and try to understand how it works, you can expect to get through about 120 lines per hour, so it would take you 417,000 hours or 47 ½ years!
(And that’s just to read through it, not write it.)

{image file-path="img/chapters/stacks-of-code-cartoon.png" alt="Stacks of Code Cartoon"}

Software engineering is all about how we can create software despite this enormous size and complexity while hopefully get a working product in the end.
It was first introduced as a topic of computer science in the 1960s during the so-called "[software crisis](https://en.wikipedia.org/wiki/Software_crisis)", when people realised that the capability of hardware was increasing at incredible speeds while our ability to develop software was staying pretty much the same.

As the name software engineering suggests, we are taking ideas and processes from other engineering disciplines (such as building bridges or computer hardware) and applying them to software.
Having a structured process in place for developing software turns out to be hugely important because it allows us to manage the size and complexity of software.
As a result of advances in software engineering, there are many success stories of large and complex software products that work well and contain few bugs.
For example, Google's huge projects (Google search, Gmail, …) are built by teams of thousands of engineers, yet they still manage to create software that does what it should.
