# What's the big picture?

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

# Moore's law

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
