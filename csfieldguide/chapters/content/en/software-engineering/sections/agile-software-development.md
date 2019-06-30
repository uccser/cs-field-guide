# Agile software development

*Agile* software development has become popular over the last 10 years; two of the most famous agile processes are called [XP](https://en.wikipedia.org/wiki/Extreme_programming) and [Scrum](https://en.wikipedia.org/wiki/Scrum_(development)).
Agile software development is all about being extremely flexible and adaptive to change.
Most other software processes try to manage and control changes to requirements during the process.
With Agile, we can develop software quickly, correctly, and be adaptive to change.

{image file-path="img/chapters/xkcd-good-code.png" hover-text="You can either hang out in the Android Loop or the HURD loop." alt="A xkcd comic on good code" source="https://xkcd.com/844/"}

Agile processes work similarly to iterative processes in that they do a number of iterations of analysis, design, implementation and testing.
However, these iterations are extremely short, each usually lasting only about 2 weeks.

In many other processes, documentation is important.
We document the requirements so that we can look back at them; we document our design so that we can refer back to it when we program the system.
Agile software processes expect things to change all the time.
Therefore, they do very little planning and documentation because documenting things that will change anyway is a bit of a waste of time.

Agile processes include lots of interesting principles that are quite different from standard software development.
We look at the most interesting ones here.
If you want to find out more, have a look at [Agile Academy on Youtube](https://www.youtube.com/user/AgileAcademyAus) which has lots of videos about interesting agile practices!
There’s also [another video here](https://www.youtube.com/watch?v=kqz_jDS0RWY) that explains the differences between agile software development and the waterfall process.

Here are some general principles used for agile programming:

## Pair-programming

Programming is done in pairs with one person coding while the other person watches and looks for bugs and special cases that the other might have missed.
It’s simply about catching small errors before they become bugs.
After all, 4 eyes see more than 2.

You might think that pair-programming is not very efficient and that it would be more productive to have programmers working separately; that way, they can write more code more quickly, right?
Pair-programming is about reducing errors.
Testing, finding and fixing bugs is hard; trying not to create them in the first place is easier.
As a result, pair-programming has actually been shown to be more efficient than everyone programming by themselves!

## YAGNI

YAGNI stands for "You Ain’t Gonna Need It" and tells developers to keep things simple and only design and implement the things that you know you are really going to need.
It can be tempting to think that in the future you might need feature x and so you may as well already create it now.
But remember that requirements are likely to change so chances are that you won’t need it after all.

{image file-path="img/chapters/xkcd-the-general-problem.png" hover-text="I find that when someone's taking time to do something right in the present, they're a perfectionist with no ability to prioritize, whereas when someone took time to do something right in the past, they're a master artisan of great foresight." alt="A xkcd comic on the general problem" source="https://xkcd.com/974/"}

You ain’t gonna need it!

## Constant testing

Agile processes take testing very seriously.
They usually rely on having lots of automated unit tests that are run at least once a day.
That way, if a change is made (and this happens often), we can easily check if this change has introduced an unexpected bug.

## Refactoring

There are many different ways to design and program a system.
YAGNI tells you to start by doing the simplest thing that’s possible.
As the project develops, you might have to change the original, simple design.
This is called *refactoring*.

Refactoring means to change your design or implementation without changing the program’s behaviour.
After a refactoring, the program will work exactly the same, but will be better structured in some way.
Unit tests really come in handy here because you can use them to check that the code works the same way before and after the refactoring.

Refactoring only works on software because it is "soft" and flexible.
The same concept does not really work for physical engineering products.
Imagine that when building a bridge, for example, you started off by doing the simplest possible thing (putting a plank over the river) and then continually refactored the bridge to get the final product.

## Test-driven development

In standard software development, we first write some code and then test it.
This makes sense: we need the code before we can test it, right?
Test-driven development tells you to do the exact opposite!

Before you write a piece of code, you should write a test for the code that you are about to write.
This forces you to think about exactly what you’re trying to do and what special cases there are.
Of course, if you try to run the test, it will fail (since the functionality it is testing does not yet exist).
When you have a failing test, you can then write code to make the test pass.

## Programmer welfare

Software developers should not work more than 40 hours per week.
If they do overtime one week they should not do more overtime the following week.
This helps keep software developers happy, productive, creative and energetic, and makes sure they don’t burn out.

## Customer involvement

A customer representative should be part of the developing team (ideally working full-time with the team), on hand to answer questions or give feedback.
This is important to be able to quickly change the requirements or direction of the project.
If you have to wait 2 weeks until you can get feedback from your customer, you will not be able to adapt to change very quickly!

Although having a customer on the development team is a great idea in theory, it is quite hard to achieve in practice.
Most customers simply want to tell you their requirements, pay you and then get the software delivered 5 months later.
It’s rare to find a customer who is willing and has the time to be more involved in the project.
Sometimes companies will hire an expert to be part of the team; for example, a company working on health software might have a doctor on the team, or if they are working on educational software, they may hire a teacher.
This sounds expensive, but since failed software can cost millions of dollars, paying the salary of an expert is a relatively small part of the overall cost, and much more likely to lead to success.

{panel type="curiosity"}

# Christopher Alexander

So far, we’ve mainly compared software development to engineering and building bridges, but you might have noticed that it’s also pretty similar to architecture.
In fact, software development (in particular agile software development) has borrowed a lot of concepts from architecture.
An architect called Christopher Alexander, for example, suggested involving customers in the design process.
Sound familiar?
Several other suggestions from Christopher Alexander were also picked up by the agile development community and as a result his thinking about architecture has shaped how we think about software development.
This is despite the fact that Christopher Alexander knew nothing about software development.
He was apparently very surprised when he found out how well known he is among software developers!

{panel end}

## Courage

"Courage" might seem like an odd concept in the context of software development.
In agile processes, things change all the time and therefore programmers need to have the courage to make changes to the code as needed, fix the problems that need to be fixed, correct the design where needed, throw away code that doesn’t work, and so on.
This might not seem like a big deal, but it can actually be quite scary to change code, particularly if the code is complicated or has been written by a different person.
Unit tests really help by giving you courage: you’ll feel more confident to change the code if you have tests that you can run to check your work later.

{panel type="project"}

# Software processes

This project will provide insight into a real software engineering process, but you'll need to find a software engineer who is prepared to be interviewed about their work.
It will be ideal if the person works in a medium to large size company, and they need to be part of a software engineering team (i.e. not a lone programmer).

The project revolves around interviewing the person about the process they went through for some software development they did recently.
They may be reluctant to talk about company processes, in which case it may help to assure them that you will keep their information confidential (your project should only be viewed by you and those involved in supervising and marking it; you should state its confidential nature clearly at the start and ensure it doesn't get published later).

You need to do substantial preparation for the interview.
Find out about the kind of software that the company makes.
Read up about software engineering (in this chapter) so that you know the main terminology and techniques.

Now prepare a list of questions for the interviewee.
These should find out what kind of software development processes they use, what aspects your interviewee works on, and what the good and bad points are of the process, asking for examples to illustrate this.

You should take extensive notes during the interview (and record it if the person doesn't mind).

You then need to write up what you have learned, describing the process, discussing the techniques used, illustrating it with examples, and evaluating how well the process works.

{panel end}
