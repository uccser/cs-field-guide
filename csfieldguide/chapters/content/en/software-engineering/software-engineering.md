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

Software failures happen all the time.
Sometimes it’s a little bug that makes a program difficult to use; other times an error might crash your entire computer.
Some software failures are more spectacular than others.

In 1996, The ARIANE 5 rocket of the European Space Agency was launched for its first test flight: Countdown, ignition, flame and smoke, soaring rocket... then BANG!
Lots of little pieces scattered through the South American rainforest.
Investigators had to piece together what happened and finally tracked down this tiny, irrelevant bug.
A piece of software on board the rocket which was not even needed had reported a value that was too big to be stored.
An error was stored instead, but other software interpreted the error as saying the rocket was 90 degrees off course.
Thankfully, no one was on board but the failure still caused about US$370m damage.

{video url="https://www.youtube.com/embed/gp_D8r-2hwk?rel=0"}

In extreme cases, software bugs can endanger lives.
This happened in the 1980s, for example, when a [radiation therapy machine](https://en.wikipedia.org/wiki/Therac) caused the deaths of 3 patients by giving 100 times the intended dose of radiation.
And in 1979, a US Army computer [almost started a nuclear war](https://nsarchive2.gwu.edu/nukevault/ebb371/), when it misinterpreted a simulation of the Soviet Union launching a missile as the real thing!
(If you are interested in other software failures, [CS4FN](http://www.cs4fn.org/softwareengineering/backtodrawingboard.php) lists the most spectacular ones!)

Our society today is so reliant on software that we can’t even imagine life without it anymore.
In many ways, software has made our lives easier: we write emails, chat with friends on Facebook, play computer games and search for information on Google.
Heaps of software is hidden behind the scenes too, so we don’t even know we’re using it.
There's software in cars, traffic lights, TVs, washing machines, Japanese toilets, and hearing aids.
We've become so used to having software, we expect it to work at all times!

So why doesn’t it?
Why do we get bugs in the first place?
As it turns out, writing software is incredibly difficult.
Software isn’t a physical product, so we can’t just look at it to see if it’s correct.
On top of that, most of the software you use every day is huge and extremely complex.
Windows Vista is rumoured to have around 50 million lines of code; MacOSX has 86 million.
If we printed Vista out on paper, we would get a 88m high stack!
That’s as high as a 22 storey building or the Statue of Liberty in New York!
If you wanted to read through Vista and try to understand how it works, you can expect to get through about 120 lines per hour, so it would take you 417,000 hours or 47 ½ years!
(And that’s just to read through it, not write it.)

{image file-path="img/chapters/stacks-of-code-cartoon.png" alt="Stacks of Code Cartoon"}

Software engineering is all about how we can create software despite this enormous size and complexity while hopefully get a working product in the end.
It was first introduced as a topic of computer science in the 1960s during the so-called "[software crisis](https://en.wikipedia.org/wiki/Software_crisis)", when people realised that the capability of hardware was increasing at incredible speeds while our ability to develop software is staying pretty much the same.

As the name software engineering suggests, we are taking ideas and processes from other engineering disciplines (such as building bridges or computer hardware) and applying them to software.
Having a structured process in place for developing software turns out to be hugely important because it allows us to manage the size and complexity of software.
As a result of advances in software engineering, there are many success stories of large and complex software products that work well and contain few bugs.
For example, Google's huge projects (Google search, Gmail, …) are built by teams of thousands of engineers, yet they still manage to create software that does what it should.

Since the 1960s, software engineering has become a very important part of computer science &ndash; so much so that today's programmers are rarely called *programmers*, but instead called *software engineers*.
That’s because making software is much more than just programming.
There are a huge number of jobs for software engineers, and the demand for skilled workers continues to grow.
The great thing about being a software engineer is that you get to work in large teams to produce products that will impact the lives of millions of people!
Although you might think that software engineers would have to be very smart and a bit geeky, communication and teamwork skills are actually more important.
Software engineers have to be able to work in teams and communicate with their teammates &ndash; the ability to work well with humans is at least as important as the ability to work well with computers.

As software becomes larger, the teams working on it have grown, and good communication skills have become even more important than in the past.
Furthermore, computer systems are only useful if they make things better for humans, so developers need to be good at understanding the users they are developing software for.
As computers become smaller and cheaper, we've gone from having shared computers that humans have to queue up to use, to having multiple digital devices for each person.
Now, it's the devices that have to wait until the human is ready.
In a digital system, the human is the most important part!

{panel type="curiosity"}

# Moore's Law

In 1965, Gordon Moore noticed that the number of transistors on integrated circuits was doubling about every 2 years.
This means that computers’ processing power was also doubling roughly every 2 years (sometimes this is quoted as 18 months due to the combination of the numbers *and* speed increasing).
Moore said that he expected this trend to continue for at least 10 years.

Believe it or not, Moore’s law didn’t just last for 10 years, but was still accurate 50 years later (it has slowed down a little since 2015).
This means that computers today are over tens of million times faster than in 1965!
Moore’s law also applies to other improvements in digital devices, such as processing power in cellphones and the number of pixels in digital cameras.

The exact numbers will depend on what is being described, but the main point is that the processing power is increasing *exponentially* &ndash; exponential growth doesn't mean just getting a lot faster, but getting unbelievably faster; nothing in human history has ever grown this quickly!
To illustrate this in reverse, the time taken to open an app on a smartphone might be half a second today, but a 1965 smartphone would have taken over a year to open the same app (and the phone would probably have been the size of a football field).
It's no wonder that smartphones weren't popular in the 1960s.

{panel end}

Although software engineering has come a long way in the last few decades, writing software is still difficult today.
As a user, you only see the programs that were completed, not those that failed.
In 2009, just under a third of all software projects succeeded, while almost a quarter failed outright or were cancelled before the software could be delivered.
The remaining projects were delivered late, over budget, or lacked functionality.
A famous recent project failure was the software for the baggage handling system at the new airport in Denver.
The system turned out to be more complex than engineers had expected; in the end, the entire airport was ready but had to wait for 16 months before it could be opened because the software for the baggage system was not working.
Apparently, the airport lost $1 million every day during these 16 months!

In this chapter, we look at some of the basics of software engineering.
We’ll give you an introduction about *analysing* the problem so you know what kind of software to build in the first place.
We’ll talk briefly about how to structure and *design* software.
We'll also tell you a bit about *testing*, one of the most important steps for avoiding software bugs.
As you’ll see, analysis, design and testing are all important steps when making software.
The actual programming part usually takes up only 20% of time on a project (and in this chapter we barely even mention it)!
Finally, we’ll look at software processes which organise activities including analysis, design and testing so that we always know what we should be doing next.

{panel type="curiosity"}

# More about software failures

While successful projects are desirable, there is a lot that can be learnt from failures!
Here are some sites that provide further material on this if you are interested.

- [Back to the drawing board &ndash; CS4FN](http://www.cs4fn.org/softwareengineering/backtodrawingboard.php)
- [Why software fails &ndash; IEEE](http://spectrum.ieee.org/computing/software/why-software-fails)
- [Learning from software failure &ndash; IEEE](http://spectrum.ieee.org/computing/software/learning-from-software-failure)
- [Engineering Disasters 13: Software Flaws](http://youtu.be/EMVBLg2MrLs) is an excerpt from Engineering Disaster Episode 13 explaining software flaws in Ariane 5 and Patriot Missiles

{panel end}
