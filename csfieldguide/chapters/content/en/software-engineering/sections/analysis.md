# Analysis: What do we build?

Before we start making software, we first have to decide what we actually want to make.
We call this part of the software project *analysis* because we analyse exactly what our software needs to be able to do.
Although this sounds trivial, getting the details right is pretty tricky.
If someone asked you to design a physical object like a chair or a toaster, you'd probably have a pretty good idea of what the finished product would be like.
No matter how many legs you decide to put on your chair, they will still have to do the job of holding up a person against the force of gravity.
When designing software, we often don't have the benefit of creating familiar objects, or even known constraints like the laws of physics.
If your software was, say, a program to help authors invent imaginary worlds, where would you start?
What could you take for granted?

Analysis is extremely important.
Obviously, if we make a mistake at this stage of the project, the software we end up building may not be what was wanted; all the other work to design, build and test the software could be for nothing.

For example, imagine your friend Anna asks you to write a program to help her get to school in the morning.
You write a great GPS navigation system and show it to Anna, but it turns out that she takes the bus to school so what she really needed was just software showing the current bus timetable.
All your hard work was in vain, because you didn’t get the details right in the start!

Sometimes we are making software for ourselves; in that case, we can just decide what the software should do.
But be careful: even if you think you know what you want the software to do when you start developing it, you will probably find that by the end of the project you will have a very different view of what it should do.
The problem is that before you have the software, you can’t really predict how you will use it when it’s finished.
For example, the people making smartphones and software for smart phones probably didn’t anticipate how many people would want to use their smartphones as torches!

In many cases, we build software for other people.
You might make a website for your aunt’s clothing shop or write software to help your friends with their maths homework.
A software company might create software for a local council or a GP’s practice.
Google and Microsoft make software used by millions of people around the world.
Either way, whether you’re writing a program for your friends or for millions of people, you first have to find out from your customers what they actually need the software to do.

We call anyone who has an interest in the software a *stakeholder*.
These are the people that you need to talk to during the analysis part of your project to find out what they need the software to do.

Imagine that you are making a phone app that allows students to preorder food from the school cafeteria.
They can use the app to request the food in the morning and then just go and pick up the food at lunch time.
The idea is that this should help streamline the serving of food and reduce queues in the cafeteria.
Obvious stakeholders for your project are the students (who will be using the phone app) and cafeteria staff (who will be receiving requests through the app).
Less obvious (and indirect) stakeholders include parents ("I have to buy my child a smartphone so they can use this app?"), school admin ("No phones should be used during school time!") and school IT support who will have to deal with all the students who can’t figure out how to work the app or connect to the network.
Different stakeholders might have very different ideas about what the app should do.

To find out what our stakeholders want the software to do, we usually interview them.
We ask them questions to find *functional* and *non-functional* requirements for the software.
Functional requirements are things the software needs to do.
For example, your phone app needs to allow students to choose the food they want to order.
It should then send the order to the cafeteria, along with the student’s name so that they can be easily identified when picking up the food.

Non-functional requirements, on the other hand, don’t tell us *what* the software needs to do but *how* it needs to do it.
How efficient does it need to be?
How reliable?
What sort of computer (or phone) does it need to run on?
How easy to use should it be?

So we first figure out who our stakeholders are and then we go to interview them to find the requirements for the software.
That doesn’t sound too hard, right?
Unfortunately, it’s the communication with the customer that often turns out to be most difficult.

The first problem is that customers and software engineers often don’t speak the same language.
Of course, we don’t mean to say that they don’t both speak English, but software engineers tend to use technical language, while customers use language specific to their work.
For example, doctors might use a lot of medical terms that you don’t understand.

Imagine that a customer asks you to develop a scoring system for the (fictional) sport of Whacky-Flob.
The customer tells you:

"It’s really simple.
You just need to record the foo-whacks, but not the bar-whacks unless the Flob is circulating."

After this description, you’re probably pretty confused because you don’t know anything about the sport of Whacky-Flob and don’t know the specific terms used (what on earth are foo-whacks???).
To get started, you should attend a few games of Whacky-Flob and observe how the game and the scoring works.
This way, you’ll be able to have a much better conversation with the customer since you have some knowledge about the problem domain.
Incidentally, this is one of the cool things about being a software engineer: you get exposure to all kinds of different, exciting problem domains.
One project might be tracking grizzly bears, the next one might be identifying cyber terrorists or making a car drive itself.

You should also never assume that a customer is familiar with technical terms that you might think everyone should know, such as JPEG, database or maybe even operating system.
Something like "The metaclass subclass hierarchy was constrained to be parallel to the subclass hierarchy of the classes which are their instances" might make some sense to a software engineer, but a customer will just look at you very confused!
One of the authors once took part in a customer interview where the stakeholder was asked if they want to use the system through a browser.
Unfortunately, the customer had no idea what a browser was.
Sometimes, customers may not want to admit that they have no idea what you’re talking about and just say "yes" to whatever you suggest.
Remember, it’s up to you to make sure you and your customer understand each other and that you get useful responses from your customer during the interview!

{image file-path="img/chapters/overwhelming-the-user-cartoon.png" alt="Overwhelming the user with questions cartoon"}

Even if you manage to communicate with a customer, you might find that they don’t really know what they want the software to do or can’t express it.
They might say they want "software to improve their business" or to "make their work more efficient" but that’s not very specific (There’s a great cartoon of [Dilbert](http://dilbert.com/strips/comic/2006-01-29/) which illustrates this point!).
When you show them the software you have built, they can usually tell you if that’s what they wanted or what they like and don’t like about it.
For that reason, it’s a good idea to build little prototypes while you’re developing your system and keep showing them to customers to get feedback from them.

You’ll often find that customers have a specific process that they follow already and want the software to fit in with that.
Once, a project was being done by university students for a library.
Their staff used to write down information about borrowed items three times on a paper form, cut up the form and send the pieces to different places as records.
When the students interviewed them, they asked for a screen in the program where they could enter the information three times as well (even though in a computer system there really isn’t much point in that)!

Customers are usually experts in their field and are therefore likely to leave out information that they think is obvious, but may not be obvious to you.
Other times, they do not really understand what can and cannot be done with computers and may not mention something because they do not realise that it is possible to do with a computer.
Again, it’s up to you to get this information from them and make sure that you find out what you need to know.

{image file-path="img/chapters/xkcd-tasks.png" hover-text="In the 60s, Marvin Minsky assigned a couple of undergrads to spend the summer programming a computer to use a camera to identify objects in a scene. He figured they'd have the problem solved by the end of the summer. Half a century later, we're still working on it." alt="A xkcd comic on Computer Science tasks" source="https://xkcd.com/1425/"}

{panel type="curiosity"}

# Easy for computers and hard for humans vs hard for computers and easy for humans

The rollover text of the above image (you will need to view it on [xkcd's website](https://xkcd.com/1425/)) is worth reading too.
Image recognition is a problem that initially seemed straightforward, probably because humans find it easy.
Interestingly, there are many problems that computers find easy, but humans find challenging, such as multiplying large numbers.
Conversely, there are many other problems that computers find hard, yet humans find easy, such as recognizing that the thing in a photo is, for example, a cat.

{panel end}

If you have multiple stakeholders, you can get conflicting viewpoints.
For example, when you talk to the cafeteria people about your food-ordering app, they may suggest that every student should only be able to order food up to a value of $10.
In this way, they can avoid prank orders.
When you talk to a teacher, they agree with this suggestion because they are worried about bullying.
They don’t want one student to get pressured into ordering food for lots of other students.
But the students tell you that they want to be able to order food for their friends.
In their view, $10 could not even be enough for one student.

What do you do about these conflicting points of view?
Situations like this can be difficult to handle, depending on the situation, the stakeholders and the software you are making.
In this case, you need the support from the cafeteria and the teachers for your software to work, but maybe you could negotiate a higher order limit of $20 to try to keep all your stakeholders happy.

Finally, even if you get everything right during the analysis stage of your project, requirements can change while you’re making the software.
Big software projects can take years to complete.
Imagine how much changes in the technology world in a year!
While you’re working on the project, new hardware (phones, computers, tablets) could come out or a competitor might release software very similar to what you’re making.
Your software itself might change the situation: once the software is delivered, the customer will try working with it and may realise it isn’t what they really wanted.
So you should never take the requirements for your software to be set in stone.
Ideally, you should keep talking to customers regularly throughout the project and always be ready for changes in requirements!

{panel type="project"}

# Finding the requirements

For this project, you need to find someone for whom you could develop software.
This could be someone from your family or a friend.
They might, for example, need software to manage information about their business’ customers or their squash club might want software to schedule squash tournaments or help with the timetabling of practices.
For this project, you won’t actually be making the software, just looking at the requirements; if the project is small enough for you to program on your own, it's probably not big enough to be a good example for software engineering!

Once you’ve found a project, start by identifying and describing the stakeholders for your project.
This project will work best if you have at least two different stakeholders.
Try to find all the stakeholders, remembering that some of them might only have an indirect interest in your software.
For example, if you are making a database to store customer information, the customers whose information is being stored have some interest in your software even though they never use it directly; for example, they will want the software to be secure so that their data cannot be stolen.
Write up a description about each stakeholder, giving as much background detail as possible.
Who are they?
What interest do they have in the software?
How much technical knowledge do they have?

Interview *one* of the stakeholders to find out what they want the software to do.
Write up the requirements for your software, giving some detail about each requirement.
Try to distinguish between functional and non-functional requirements.
Make sure you find out from your stakeholder which things are most important to them.
This way you can give each requirement a priority (for example high, medium, low), so that if you would actually build the software you could start with the most important features.

For the other stakeholders, try to imagine what their requirements would be.
In particular, try to figure out how the requirements would differ from the other stakeholders.
It’s possible that two stakeholders have the same requirements but in that case maybe they have different priorities?
See if you can list any potential disagreements or conflicts between your stakeholders?
If so, how would you go about resolving them?

{panel end}

{panel type="teacher-note"}

# Choosing a good topic for the project

This project will work best if the students pick reasonably complex projects with a number of different stakeholders and requirements.
A simple customer database for a business is unlikely to generate a lot of interesting requirements.

{panel end}
