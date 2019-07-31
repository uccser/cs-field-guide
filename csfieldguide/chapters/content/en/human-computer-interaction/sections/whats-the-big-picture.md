# What's the big picture?

Computers are becoming hundreds of times more powerful every decade, yet there is one important component of the computer system that hasn't changed significantly in performance since the first computers were developed in the 1940s: the human.
For a computer system to work really well, it needs to be designed by people who understand the human part of the system well.

In this chapter we'll look at what typically makes good and bad {glossary-link term="interface"}interfaces{glossary-link end}.
The idea is to make you sensitive to the main issues so that you can critique existing interfaces, and begin to think about how you might design good interfaces.

Often software developers create a {glossary-link term="program"}computer program{glossary-link end} or system for a device that requires the {glossary-link term="user"}user{glossary-link end} to spend some time to learn how to use.
The interface might be easy to use for the developer since they know the system really well, but a user just wants to get the job done without spending too much time learning the software (and they might switch to another program if it's too hard to use).
A developer might think of the program and the user separately, but the user is part of the system, and a developer needs to create the software with the user in mind, designing a program that they will find easy to use and intuitive.

{glossary-link term="human-computer-interaction"}Human-computer interaction{glossary-link end} (HCI) is about trying to make programs useful, usable, and accessible to humans.
It goes way beyond choosing layouts, colours, and fonts for an interface.
It's strongly influenced by the psychology of how people interact with digital devices, which means understanding many issues about how people behave, how they perceive things, and how they understand things so that they feel that a system is working to help them and not hinder them.
By understanding HCI, developers are more likely to create software that is effective and popular.
If you ask people if they have ever been frustrated using a computer system, you’ll probably get a clear message that HCI isn’t always done well.

Try out the following interactive task, and get some friends to try it:

{interactive slug="deceiver" type="in-page"}

Did anyone get a wrong answer to the question even though they thought they got it right?
You may have noticed that the "Even" and "Odd" buttons sometimes swap.
Inconsistency is almost always a really bad thing in an interface, as it can easily fool the user into making an error.

The only situation it might be desirable is if it was intentionally done to make a computer game more interesting (which perhaps the above interactive could be).
But imagine you have a web form in which the "reset" and "submit" buttons often switched places.
Users would frequently clear the form when they meant to submit it, or submit the form when they had meant to clear it!

{panel type="teacher-note"}

# Accuracy vs Speed in the above interactive

The swapping even/odd interactive may not fool all students, but for some it will be very frustrating.
If they decide to use it slowly and carefully they may get the even/odd choices correct, but they will also get lower scores (i.e. lower productivity if this was a real interface).

{panel end}

The study of HCI involves a lot of psychology (how people behave) because this affects how they will use a system.
As a simple example, the human short term memory only lasts for a matter of seconds (even in young people!)
If a device delays a response for more than about 10 seconds, the user has to make a conscious effort to remember what they were doing, and that’s extra work for the user (which from their point of view, makes the system more tiring to use).
Another example is that people get "captured" into sequences: if you start biking on a route that you take each day, you'll soon find yourself arriving without thinking about every turn along the way, which is fine unless you were supposed to go somewhere else on the way, or if you have recently moved to a new house or workplace.
A similar effect occurs with confirmation dialogues; perhaps you often accidentally close a file without saving it, and the system says "Do you want to save it?", so you press "Yes".
After you've done this a few times you'll be captured into that sequence, so on the one occasion that you don't want to overwrite your old file, you may accidentally click "Yes" anyway.

{panel type="curiosity"}

# Capture errors

Getting used to a regular route or procedure, and as a result forgetting something different you had to do that day, is called a *capture error*.
This is easy to remember, as you get "captured" in your usual sequence.
Capture is a good thing much of the time, as it saves you having to think hard about everyday actions (which can literally be more tiring),
but it can also trick you into doing something you didn't intend.
A good interface designer will be aware of this, and avoid setting up the interface so that a user might be captured into doing something that they can't undo.

{panel end}

A lot of people might blame themselves for such errors, but basic psychology says that this is a natural error to make, and a good system should protect users from such errors (for example, by allowing them to be undone).

{comment Consider looking at a button's features as an example of fine detail (slide off while pressing etc.); could add an interactive with a simple (normal) checkbox and button (and maybe menu) here so they reader can experiment with what happens (e.g. click but slide off before release)}

Designing good interfaces is *very* difficult.
Just when you think you've got a clever idea, you'll find that a whole group of people struggle to figure out how to use it, or it backfires in some situation.
Even worse, some computer developers think that their users are dummies and that any interface problems are the users' fault and not the developer's.
But the real problem is that the developer knows the system really well, whereas the user just wants to get their job done without having to spend a lot of time learning the software &ndash; if the software is too hard to use and they have a choice, they'll just find something else that's easier.
Good interfaces are worth a lot in the market!

There are many ways to evaluate and fine tune interfaces, and in this chapter we'll look at some of these.
One important principle is that one of the worst people to evaluate an interface is the person who designed and programmed it.
They know all the details of how it works, they've probably been thinking about it for weeks, they know the bits that you're not supposed to touch and the options that shouldn't be selected, and of course they have a vested interest in finding out what is *right* with it rather than what is *wrong*.
It's also important that the interface should be evaluated by someone who is going to be a typical user; if you get a 12-year-old to evaluate a retirement planning system they may not know what the user will be interested in; and if you get a teacher to try out a system that students will use, they may know what the answers are and what the correct process is.

Often interfaces are evaluated by getting typical users to try them out, and carefully noting any problems they have.
There are companies that do nothing but these kinds of user tests &ndash; they will be given a prototype product, and pay groups of people to try it out.
A report on the product is then produced and given to the people who are working on it.
This is an expensive process, but it makes the product a lot better, and may well give it a huge advantage over its competitors.
Having it evaluated by a separate company means that you avoid any bias from people in your own company who want to prove (even subconsciously) that they've done a good job designing it, rather than uncover any niggling problems in the software that will annoy users.

Before we look at different ways to evaluate interfaces, we need to consider what is happening with an interface.
