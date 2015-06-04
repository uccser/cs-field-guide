# Software Engineering

{teacher}

This chapter supports the "Software engineering" option of the NZ achievement standard 3.44.
Currently all material in this chapter is relevant to the standard, although students can choose one or two examples to focus on to meet the requirements of the standard.

Software engineering is a challenging topic to teach for several reasons. One is that many, if not most, textbooks aren't written by practising software engineers, and often contain outdated ideas that are difficult for students to understand anyway (for example, the waterfall model is often taught near the start, and yet doesn’t work in practice, and in fact was originally written to tell people how *not* to do software engineering).
Furthermore, to get real experience with software engineering would involve being on a team of qualified engineers working on a project with vague and changing needs. This is very difficult in educational settings where the norm is individual work being done by inexperienced students who are given clear criteria on which they will be graded.
In this chapter we've tried to capture what really happens in industry, and suggest activities that will give students a realistic view of what is involved.

{teacher end}

{comment}

Raw notes are at https://docs.google.com/document/d/1AhHXwY5GSTElcCpfaie-emEBlFv9I6uLn3Dik-yJwQ0/. 

{comment end}

{video http://www.youtube.com/embed/ZNMbEbz2dys?rel=0}

## What's the big picture?

Software failures happen all the time. Sometimes it’s a little bug that makes a program difficult to use; other times an error might crash your entire computer. Some software failures are more spectacular than others. 

In 1996, The ARIANE 5 rocket of the European Space Agency was launched for its first test flight: Countdown, ignition, flame and smoke, soaring rocket... then BANG! Lots of little pieces scattered through the South American rainforest. Investigators had to piece together what happened and finally tracked down this tiny, irrelevant bug. A piece of software on board the rocket which was not even needed had reported an error and started a self-destruct sequence. Thankfully, no one was on board but the failure still caused about US$370m damage. 

{video http://www.youtube.com/embed/gp_D8r-2hwk?rel=0}

{image se-ariane-5-150.png alt="Ariane Cartoon"}

In extreme cases, software bugs can endanger lives. This happened in the 1980s, for example, when a [radiation therapy machine](http://en.wikipedia.org/wiki/Therac) caused the deaths of 3 patients by giving 100 times the intended dose of radiation. And in 1979, a US army computer almost started a nuclear war, when it misinterpreted a simulation of the Soviet Union launching a missile as the real thing! (If you are interested in other software failures, [CS4FN](http://www.cs4fn.org/softwareengineering/backtodrawingboard.php) lists the most spectacular ones!)

Our society today is so reliant on software that we can’t even imagine life without it anymore. In many ways, software has made our lives easier: we write emails, chat with friends on Facebook, play computer games and search for information on Google. Heaps of software is hidden behind the scenes too so we don’t even know we’re using it, for example in cars, traffic lights, TVs, washing machines, Japanese toilets, and hearing aids. We've become so used to having software, we expect it to work at all times!

So why doesn’t it? Why do we get bugs in the first place? As it turns out, writing software is incredibly difficult. Software isn’t a physical product, so we can’t just look at it to see if it’s correct. On top of that, most of the software you use every day is huge and extremely complex. Windows Vista is rumoured to have around 50 million lines of code; MacOSX even has 86 million. If we printed Vista out on paper, we would get a 88m high stack! That’s as high as a 22 storey building or the Statue of Liberty in New York! If you wanted to read through Vista and try to understand how it works, you can expect to get through about 120 lines per hour, so it would take you 417,000 hours or 47 ½ years! (And that’s just to read through it, not write it.)

{image se-stacks-of-code-150.png alt="Stacks of Code Cartoon"}

Software engineering is all about how we can create software despite this enormous size and complexity and hopefully get a working product in the end. It was first introduced as a topic of computer science in the 1960s during the so-called “software crisis”, when people realised that the capability of hardware was increasing at incredible speeds while our ability to develop software is staying pretty much the same. 

As the name software engineering suggests, we are taking ideas and processes from other engineering disciplines (such as building bridges or computer hardware) and applying them to software. Having a structured process in place for developing software turns out to be hugely important because it allows us to manage the size and complexity of software. As a result of advances in software engineering, there are many success stories of large and complex software products which work well and contain few bugs. Think, for example, of Google who have huge projects (Google search, Gmail, …) and thousands of engineers working on them but somehow still manage to create software that does what it should.

{comment}

.. xTCB link to a video here? There's a 5 minute one of someone who works in the Gmail login team, and another longer Google one about what it's like at Google. Good idea! Yes, maybe we could get Wal to do “A day in the life of a software engineer”? Maybe you could do a video about your work? Would be quite a bit of work though I imagine...old bald guy != movie star.

{comment end}

Since the 1960s, software engineering has become a very important part of computer science, so much so that today programmers are rarely called programmers, but software engineers. That’s because making software is much more than just programming. There are a huge number of jobs for software engineers and demand for skilled workers continues to grow. The great thing about being a software engineer is that you get to work in large teams to produce products that will impact the lives of millions of people! Although you might think that software engineers would have to be very smart and a bit geeky, communication and teamwork skills are actually more important; software engineers have to be able to work in teams and communicate with their teammates. The ability to work well with humans is at least as important as the ability to work with computers.

{curiosity}

**Curiosity: Moore’s Law**

In 1965, Gordon Moore noticed that the number of transistors on integrated circuits was doubling about every 2 years. This means that computers’ processing power was doubling roughly every 2 years (sometimes this is quoted as 18 months due to the combination of the numbers *and* speed increasing). Moore said that he expected this trend to continue for at least 10 years.

Believe it or not, Moore’s law didn’t just last for 10 years but is still true nearly 50 years later (although a slowdown is predicted in the next couple of years). This means that computers today are over 100 million times faster than in 1965! (It’s been 47 years since 1965, which means that processing power has doubled about 24 times; :math:`2^{24}` is 16,777,216 so if computers could run one instruction per second in 1965, they can now run 16,777,216!) It also means that if you buy a computer today, you might regret it in two years time when new computers will be twice as fast. Moore’s law also holds for other things, such as processing power in cellphones and the number of pixels in digital cameras.

The exact numbers above will depend on exactly what you're describing, but the main point is that the processing power is increasing *exponentially* --- exponential growth doesn't mean just getting a lot faster, but getting unbelievably faster; nothing in human history has ever grown this quickly! To illustrate this in reverse, the time taken to open an app on a smartphone might be half a second today, but a 1965 smartphone would have taken over a year to open the same app (and the phone would probably have been the size of a football field). It's no wonder that smartphones weren't popular in the 1960s.

{curiosity end}

Although software engineering has come a long way in the last decades, writing software is still difficult today. As a user, you only see the programs that were completed, not those that failed. In 2009, just under a third of all software projects succeeded, while almost a quarter failed outright or were cancelled before the software could be delivered. The remaining projects were either delivered late, were over budget or lacked functionality. A famous recent project failure was the software for the baggage handling system at the new airport in Denver. The system turned out to be more complex than engineers had expected; in the end, the entire airport was ready but had to wait for 16 months before it could be opened because the software for the baggage system was not working. Apparently, the airport lost $1 million every day during these 16 months!

In this chapter, we look at some of the basics of software engineering. We’ll give you an introduction about *analysing* the problem so you know what kind of software to build in the first place; we’ll talk briefly about how to structure and *design* software and tell you a bit about *testing*, one of the most important steps for avoiding software bugs. As you’ll see below, analysis, design and testing are all important steps when making software. The actual programming part usually takes up only 20% of time on a project (and in this chapter we barely even mention it)! Finally, we’ll look at software processes which organise activities including analysis, design and testing so that we always know what we should be doing next.

{teacher}

While it's good if the focus of the student work is on how to make successful software, there is also a lot that can be learnt from failures! Here are some sites that provide further material on this. The first one is specifically written for high-school students.   

- [Back to the drawing board - CS4FN](http://www.cs4fn.org/softwareengineering/backtodrawingboard.php) 
- [Why software fails - IEEE](http://spectrum.ieee.org/computing/software/why-software-fails) 
- [Learning from software failure - IEEE](http://spectrum.ieee.org/computing/software/learning-from-software-failure)
- [Engineering Disasters 13: Software Flaws](http://youtu.be%2FEMVBLg2MrLs) is an excerpt from Engineering Disaster Episode 13 explaining software flaws in Ariane 5 and Patriot Missiles

{teacher end}

## Analysis: What do we build?

To be able to start making software, we first have to decide what we actually want to make. We call this part of the software project *analysis* because we analyse exactly what our software needs to be able to do. Although this sounds trivial, getting the details right is pretty tricky. If someone asked you to design a physical object like a chair or a toaster, you'd probably have a pretty good idea of what the finished product would be like.  No matter how many legs you decide to put on your chair, they will still have to do the job of holding up a person against the force of gravity.  When designing software, we often don't have the benefit of creating familiar objects, or even known constraints like the laws of physics.  If your software was, say, a program to help authors invent imaginary worlds, where would you start?  What could you take for granted? 

Analysis is extremely important. Obviously, if we make a mistake at this stage of the project, the software we end up building may not be what we wanted; all the other work to design, build and test the software could be for nothing. 

For example, imagine your friend Anna asks you to write a program to help her get to school in the morning. You write a great GPS navigation system and show it to Anna, but it turns out that she takes to bus to school so what she really needed was just software showing the current bus timetable. All your hard work was in vain, because you didn’t get the details right in the start!

Sometimes we are making software for ourselves; in that case, we can just decide what the software should do. (But be careful: even if you think you know what you want the software to do when you start developing it, you will probably find that by the end of the project you will have a very different view of what it should do. The problem is that before you have the software, you can’t really predict how you will use it when it’s finished. For example, the people making smart phones and software for smart phones probably didn’t anticipate how many people would want to use their smart phones as torches!)

In many cases, we build software for other people. You might make a website for your aunt’s clothing shop or write software to help your friends with their maths homework. A software company might create software for a local council or a GP’s practice. Google and Microsoft make software used by millions of people around the world. Either way, whether you’re writing a program for your friends or for millions of people, you first have to find out from your customers what they actually need the software to do. 

We call anyone who has an interest in the software a *stakeholder*. These are the people that you need to talk to during the analysis part of your project to find out what they need the software to do. 

Imagine that you are making a phone app that allows students to preorder food from the school cafeteria. They can use the app to request the food in the morning and then just go a pick up the food at lunch time. The idea is that this should help streamline the serving of food and reduce queues in the cafeteria. Obvious stakeholders for your project are the students (who will be using the phone app) and cafeteria staff (who will be receiving requests through the app). Less obvious (and indirect) stakeholders include parents (“I have to buy Johnny an iPhone so he can use this app?”), school admin (“No phones should be used during school time!”) and school IT support who will have to deal with all the students who can’t figure out how to work the app. Different stakeholders might have very different ideas about what the app should do.

To find out what our stakeholders want the software to do, we usually interview them. We ask them questions to find *functional* and *non-functional* requirements for the software. Functional requirements are things the software needs to do. For example, your phone app needs to allow students to choose the food they want to order. It should then send the order to the cafeteria, along with the student’s name so that they can be easily identified when picking up the food. 

Non-functional requirements, on the other hand, don’t tell us *what* the software needs to do but *how* it needs to do it. How efficient does it need to be? How reliable? What sort of computer (or phone) does it need to run on? How easy to use should it be?

So we first figure out who our stakeholders are and then we go to interview them to find the requirements for the software. That doesn’t sound too hard, right? Unfortunately, it’s the communication with the customer that often turns out to be most difficult.

The first problem is that customers and software engineers often don’t speak the same language. Of course, we don’t mean to say that they don’t both speak English, but software engineers tend to use technical language, while customers use language specific to their work. For example, doctors might use a lot of scary medical terms that you don’t understand. 

Imagine that a customer asks you to develop a scoring system for the (fictional) sport of Whacky-Flob. The customer tells you “It’s really simple. You just need to record the foo-whacks, but not the bar-whacks, unless the Flob is circulating”. After this description, you’re probably pretty confused because you don’t know anything about the sport of Whacky-Flob and don’t know the specific terms used. (What on earth are foo-whacks???) To get started, you should attend a few games of Whacky-Flob and observe how the game and the scoring works. This way, you’ll be able to have a much better conversation with the customer since you have some knowledge about the problem domain. (Incidentally, this is one of the cool things about being a software engineer: you get exposure to all kinds of different, exciting problem domains. One project might be tracking grizzly bears, the next one might be identifying cyber terrorists or making a car drive itself.)

You should also never assume that a customer is familiar with technical terms that you might think everyone should know, such as JPEG, database or maybe even operating system. Something like “The metaclass subclass hierarchy was constrained to be parallel to the subclass hierarchy of the classes which are their instances” might make some sense to a software engineer but a customer will just look at you very confused! One of the authors once took part in a customer interview where the stakeholder was asked if they want to use the system through a browser. Unfortunately, the customer had no idea what a browser was. Sometimes, customers may not want to admit that they have no idea what you’re talking about and just say “Yes” to whatever you suggest. Remember, it’s up to you to make sure you and your customer understand each other and that you get useful responses from your customer during the interview!

{image se-design-150.png alt="Design Cartoon"}

Even if you manage to communicate with a customer, you might find that they don’t really know what they want the software to do or can’t express it. They might say they want “software to improve their business” or to “make their work more efficient” but that’s not very specific. (There’s a great cartoon of [Dilbert](http://dilbert.com/strips/comic/2006-01-29/)  which illustrates this point!) When you show them the software you have built, they can usually tell you if that’s what they wanted or what they like and don’t like about it. For that reason, it’s a good idea to build little prototypes while you’re developing your system and keep showing them to customers to get feedback from them. 

You’ll often find that customers have a specific process that they follow already and want the software to fit in with that. We were once involved in a project being done by university students for a library. Their staff used to write down information about borrowed items three times on a paper form, cut up the form and send the pieces to different places as records. When the students interviewed them, they asked for a screen in the program where they could enter the information three times as well (even though in a computer system there really isn’t much point in that)! 

Customers are usually experts in their field and are therefore likely to leave out information that they think is obvious, but may not be obvious to you. Other times, they do not really understand what can and cannot be done with computers and may not mention something because they do not realise that it is possible to do with a computer. Again, it’s up to you to get this information from them and make sure that they tell you what you need to know.

If you have multiple stakeholders, you can get conflicting viewpoints. For example, when you talk to the cafeteria people about your food-ordering app, they may suggest that every student should only be able to order food up to a value of $10. In this way, they want to avoid prank orders. When you talk to a teacher, they agree with this suggestions because they are worried about bullying. They don’t want one student to get pressured into ordering food for lots of other students. But the students tell you that they want to be able to order food for their friends. In their view, $10 isn’t even enough for one student.

What do you do about these conflicting points of view? Situations like this can be difficult to handle, depending on the situation, the stakeholders and the software you are making. In this case, you need the support from the cafeteria and the teachers for your software to work, but maybe you could negotiate a slightly higher order limit of $20 to try to keep all your stakeholders happy.

Finally, even if you get everything right during the analysis stage of your project, talk to all the stakeholders and find all the requirements for the software, requirements can change while you’re making the software. Big software projects can take years to complete. Imagine how much changes in the technology world in a year! While you’re working on the project, new hardware (phones, computers, tablets, …) could come out or a competitor might release software very similar to what you’re making. Your software itself might change the situation: once the software is delivered, the customer will try working with it and may realise it isn’t what they really wanted. So you should never take the requirements for your software to be set in stone. Ideally, you should keep talking to customers regularly throughout the project and always be ready for changes in requirements!


### Project: Finding the Requirements

{teacher}

This project covers material for an example for the 3.44 standard through the following components:

- Key problem: getting information so that software can be designed well
- Practical application: Software engineering projects
- Algorithm/technique: requirements analysis
- Evaluation: students need to prioritise requirements, and find potential conflicts between stakeholders
- Personalised student examples: choice of people to interview

{teacher end}

For this project, you need to find someone for whom you could develop software. This could be someone from your family or a friend. They might, for example, need software to manage information about their business’ customers or their squash club might want software to schedule squash tournaments or help with the timetabling of practices. (For this project, you won’t actually be making the software, just looking at the requirements; if the project is small enough for you to program on your own, it's probably not big enough to be a good example for software engineering!)

Once you’ve found a project, start by identifying and describing the stakeholders for your project. (This project will work best if you have at least two different stakeholders.) Try to find all the stakeholders, remembering that some of them might only have an indirect interest in your software. For example, if you are making a database to store customer information, the customers whose information is being stored have some interest in your software even though they never use it directly; for example, they will want the software to be secure so that their data cannot be stolen. Write up a description about each stakeholder, giving as much background detail as possible. Who are they? What interest do they have in the software? How much technical knowledge do they have? … 

Interview *one* of the stakeholders to find out what they want the software to do. Write up the requirements for your software, giving some detail about each requirement. Try to distinguish between functional and non-functional requirements. Make sure you find out from your stakeholder which things are most important to them. This way you can give each requirement a priority (for example high, medium, low), so that if you would actually build the software you could start with the most important features.

For the other stakeholders, try to imagine what their requirements would be. In particular, try to figure out how the requirements would differ from the other stakeholders. It’s possible that two stakeholders have the same requirements but in that case maybe they have different priorities? See if you can list any potential disagreements or conflicts between your stakeholders? If so, how would you go about resolving them?

{teacher}

This project will work best if the students pick reasonably complex projects with a number of different stakeholders and requirements. A simple customer database for a business is unlikely to generate a lot of interesting requirements.

{teacher end}

## Design: How do we build it?

Once you have decided what your software needs to be able to do, you can actually build it. But just blindly starting to program is likely to get you into trouble; remember that most software is huge and very complex. You need to somehow minimise the amount of complexity in software, otherwise it will become impossible to understand and maintain for other developers in the future.

Software design is all about managing this complexity and making sure that the software we create has a good structure. Before we start writing any code, we design the structure of our software in the *design* phase of the project. When you talk about software design, many people will think that you’re talking about designing what the software will look like. Here, we’re actually going to look at designing the *internal* structure of software.

So how can we design software in a way that it doesn’t end up hugely complex and impossible to understand? Here, we give you an introduction to two important approaches: subdivision and abstraction. Those are pretty scary words, but as you’ll see soon, the concepts behind them are surprisingly simple.

You can probably already guess what *subdivision* means: We break the software into many smaller parts that can be built independently. Each smaller part may again be broken into even smaller parts and so on. As we saw in the introduction, a lot of software is so large and complex that a single person cannot understand it all; we can deal much more easily with smaller parts. Large software is developed by large teams so different people can work on different parts and develop them in parallel, independently of each other. For example, for your cafeteria project, you might work on developing the database that records what food the cafeteria sells and how much each item costs, while your friend works on the actual phone app that students will use to order food.

Once we have developed all the different parts, all we need to do is make them communicate with each other. If the different parts have been designed well, this is relatively easy. Each part has a so-called *interface* which other parts can use to communicate with it. For example, your part of the cafeteria project should provide a way for another part to find out what food is offered and how much each item costs. This way, your friend who is working on the phone app for students can simply send a request to your part and get this information. Your friend shouldn’t need to know exactly how your part of the system works; they should just be able to send off a request and trust that the answer they get from your part is correct. This way, each person working on the project only needs to understand how their own part of the software works.

Ok, so let’s talk about the second concept, *abstraction*. Have you ever thought about why you can drive a car without knowing how its engine works? Or how you can use a computer without knowing much about hardware? Maybe you know what a processor and a hard drive is but could you build your own computer? Could your parents? We don’t need to know exactly how computers or cars work internally to be able to use them thanks to abstraction!

If we look more closely at a computer, we can see that it actually has a number of *layers* of abstraction. Right at the bottom, we have the hardware, including the processor, RAM, hard disk and various complicated looking circuit boards, cables and plugs. 

When you boot your computer, you start running the operating system. The operating system is in charge of communicating with the hardware, usually through special driver software. Once you’ve started your computer, you can run programs, for example your browser. The browser actually doesn’t communicate with the hardware directly but always goes through the operating system. 

Finally, you’re the top layer of the system. You use the program but you will (hopefully) never have to interact with the more complicated parts of the operating system such as driver software, let alone the hardware. In this way, you can use the computer without ever having to worry about these things. 

{image se-computer-layers.png alt="The computer can be broken down into multiple layers, starting with the user, then the programs, then the operating system, then finally the hardware."}

We call a system like this a *layered system*. You can have any number of layers you want but each layer can only communicate with the one directly below it. The operating system can directly access the hardware but a program running on the computer can't. You can use programs but hopefully will never have to access the hardware or the more complex parts of the operating system such as drivers. This again reduces the complexity of the system because each layer only needs to know about the layer directly below it, not any others. 

Each layer in the system needs to provide an interface so that the layer above it can communicate with it. For example, a processor provides a set of instructions to the operating system; the operating system provides commands to programs to create or delete files on the hard drive; a program provides buttons and commands so that you can interact with it. 

One layer knows nothing about the internal workings of the layer below; it only needs to know how to use the layer’s interface. In this way, the complexity of lower layers is completely hidden, or *abstracted*. Each layer represents a higher level of abstraction.

So each layer hides some complexity, so that as we go up the layers things remain manageable. Another advantage of having layers is that we can change one layer without affecting the others, as long as we keep the layer’s interface the same of course. For example, your browser’s code might change but you might never notice as long as the browser still looks and works the same as before. Of course, if the browser stops working or new buttons appear suddenly you know that something has changed. 
 
We can have the same “layered” approach inside a single program. For example, websites are often designed as so-called *three-tier* systems with three layers: a database layer, a logic layer and a presentation layer. The database layer usually consists of a database with the data that the website needs. For example, Facebook has a huge database where it keeps information about its users. For each user, it stores information about who their friends are, what they have posted on their wall, what photos they have added, and so on. The logic layer processes the data that it gets from the database. Facebook’s logic layer, for example, will decide which posts to show on your “Home” feed, which people to suggest as new friends, etc. Finally, the presentation layer gets information from the logic layer which it displays. Usually, the presentation layer doesn’t do much processing on the information it gets but simply creates the HTML pages that you see. 

{image se-facebook-system.png alt="Facebook can be broken down into a three tier system, comprising of the presentations layer, then the logic layer, then finally the data layer."}

{curiosity}

**Curiosity: Reuse - Kangaroos and Helicopters**

Since building software is so difficult and time-consuming, a popular idea has been to reuse existing software. Not surprisingly, we call this *software reuse*. It’s a great idea in theory (why recreate something that already exists?) but turns out to be difficult to put into practice partly because existing software is also huge and complicated. Usually when you reuse software, you want only a small part of the existing software’s functionality, rather than everything. 

An interesting story that illustrates the problems with software reuse (although it is unfortunately not completely accurate, see [http://www.snopes.com/humor/nonsense/kangaroo.asp](http://www.snopes.com/humor/nonsense/kangaroo.asp)) is that of helicopters and kangaroos. The Australian Air Force was developing a new helicopter simulator to train pilots. They wanted the simulator to be as realistic as possible and therefore decided to include herds of kangaroos in the simulation. To save time, they reused code from another simulator which included foot soldiers and simply changed the icons of the soldiers to kangaroos.

Once the program was finished, they demonstrated it to some pilots. One of the pilots decided to fly the helicopter close to a herd of kangaroos to see what would happen. The kangaroos scattered to take cover when the helicopter approached (so far so good) but then, to the pilot’s extreme surprise, pulled out their guns and missile launchers and fired at the helicopter. It seemed the programmer had forgotten to remove *that* part of the code from the original simulator.

{curiosity end}

{comment}

.. We could include a cartoon kangaroo in the curiosity box above?

{comment end}

### Project: Designing your Software

{teacher}

This project covers material for an example for the 3.44 standard through the following components:

- Key problem: assuring that software is suitable for the end user
- Practical application: Software engineering projects
- Algorithm/technique: acceptance testing
- Evaluation: students need to critically evaluate existing software
- Personalised student examples: students choose which software to evaluate

{teacher end}

Think back to the requirements you found in the analysis project described above. In this project, we will look at how to design the software.

Start by thinking about how the software you are trying to build can be broken up into smaller parts. Maybe there is a database or a user interface or a website? For example, imagine you are writing software to control a robot. The robot needs to use its sensors to follow a black line on the ground until it reach a target. The software for your robot should have a part that interacts with the sensors to get information about what they “see”. It should then pass this information to another part, which analyses the data and decides where to move next. Finally, you should have a part of the software which interacts with the robot’s wheels to make it move in a given direction.

Try to break down your software into as many parts as possible (remember, small components are much easier to build!) but don’t go too far - each part should perform a sensible task and be relatively independent from the rest of the system.

For each part that you have identified, write a brief description about what it does. Then think about how the parts would interact. For each part, ask yourself which other parts it needs to communicate with directly. Maybe a diagram could help visualise this?


## Testing: Did we Build the Right Thing / Does it Work?

{comment}

.. html5: some apps for testing to go below; the above applet at http://fac-staff.seattleu.edu/quinnm/web/education/JavaApplets/applets/SoftwareTesting.html may give some ideas

{comment end}

We’ve decided what our software should do (analysis) and designed its internal structure (design), and the system has been programmed according to the design. Now, of course, we have to test it to make sure it works correctly. 

Testing is an incredibly important part of developing software. We cannot really release software that still has lots of bugs to our customers. (Well, we could but our customers wouldn’t be very happy about it.) Remember that software bugs can have both very small and very large effects. On the less serious end of the scale, they might make a program difficult to use or crash your computer. On the other hand, they can cost millions of dollars and even endanger human life. More testing might have prevented the Ariane 5 failure or might have discovered the Therac bug which ended up killing 3 patients.

Unfortunately, testing is again really difficult because of the size and complexity of software. If a piece of software would take years to read and understand, imagine how long it would take to fully test it! 

When we test software, we try lots of different inputs and see what outputs or behaviour the software produces. If the output is incorrect, we have found a bug.

{curiosity}

**Curiosity: Bugs and Moths** 

{image se-harvard-mark-II.jpg alt="The Mark II at Harvard"}

In 1947, engineers working on a computer called the *Mark II* were investigating a computer error and found that it was caused by a moth which had become trapped inside the computer! Since then, we use the word *bug* to refer to computer errors. Of course, today we use the word to refer to errors in programs, rather than actual insects trapped in the computer.

{curiosity end}

The problem with testing is that it can only show the presence of errors, not their absence! If you get an incorrect output from the program, you know that you have found a bug. But if you get a correct output, can you really conclude that the program is correct? Not really. The software might work in this particular case but you cannot assume that it will work in other cases. No matter how thoroughly you test a program, you can never really be 100% sure that it’s correct. In theory, you would have to test every possible input to your system, but that’s not usually possible. Imagine testing Google for everything that people could search for! But even if we can’t test everything, we can try as many different test cases as possible and hopefully at least decrease the probability of bugs.

As with design, we can’t possibly deal with the entire software at once, so we again just look at smaller pieces, testing one of them at a time. We call this approach *unit testing*. A unit test is usually done by a separate program which runs the tests on the program that you're writing. That way you can run the tests as often as you like --- perhaps once a day, or even every time there is a change to the program.
It's not unusual to write a unit test program before you write the actual program. 
It might seem like wasted work to have to write two programs instead of one, but being able to have your system tested carefully any time you make a change greatly improves the reliability of your final product, and can save a lot of time trying to find bugs in the overall system, since you have some assurance that each unit is working correctly.

Once all the separate pieces have been tested thoroughly, we can test the whole system to check if all the different parts work together correctly. This is called *integration testing*. Some testing can be automated while other testing needs to be done manually by the software engineer.

If I give you a part of the software to test, how would you start? Which test inputs would you use? How many different test cases would you need? When would you feel reasonably sure that it all works correctly?

There are two basic approaches you can take, which we call *black-box testing* and *white-box testing*. With black-box testing, you simply treat the program as a black box and pretend you don’t know how it’s structured and how it works internally. You give it test inputs, get outputs and see if the program acts as you expected. 

But how do you select useful test inputs? There are usually so many different ones to choose from. For example, imagine you are asked to test a program that takes a whole number and outputs its successor, the next larger number (e.g. give it 3 and you get 4, give it -10 and you get -9, etc). You can’t try the program for *all* numbers so which ones do you try? 

You observe that many numbers are similar and if the program works for one of them it’s probably safe to assume it works for other similar numbers. For example, if the program works as you expect when you give it the number 3, it’s probably a waste of time to also try 4, 5, 6 and so on; they are just so similar to 3. 

This is the concept of *equivalence classes*. Some inputs are so similar, you should only pick one or two and if the software works correctly for them you assume that it works for all other similar inputs. In the case of our successor program above, there are two big equivalence classes, positive numbers and negative numbers. You might also argue that zero is its own equivalence class, since it is neither positive nor negative. 

For testing, we pick a couple of inputs from each equivalence class. The inputs at the boundary of equivalence classes are usually particularly interesting. Here, we should definitely test -1 (this should output 0), 0 (this should output 1) and 1 (this should output 2). We should also try another negative and positive number not from the boundary, such as -48 and 57. Finally, it can be interesting to try some very large numbers, so maybe we’ll take -2,338,678 and 10,462,873. We have only tested 7 different inputs, but these inputs will probably cover most of the interesting behaviour of our software and should reveal most bugs.

Of course, you might also want to try some invalid inputs, for example “hello” (a word) or “1,234” (a number with a comma in it) or “1.234” (a number with a decimal point). Often, test cases like these can get programs to behave in a very strange way or maybe even crash because the programmer hasn’t considered that the program might be given invalid inputs. Remember that especially human users can give you all sorts of weird inputs, for example if they misunderstand how the program should be used. In case of an invalid input, you probably want the program to tell the user that the input is invalid; you definitely don’t want it to crash!

{comment}

.. html5 App

{comment end}

{teacher}

There is a black-box testing interactive under development which you can try out here. Students should try testing [this program first](http://www.cosc.canterbury.ac.nz/csfieldguide/dev/teacher/_static/widgets/SE/formatCurrencyv3.html) by trying to get it to give wrong results or errors e.g. try numbers like "3.40.3" or even text instead of a number. The test case hints will help students to choose suitable test inputs.

Then you may get the students to [use this program](http://www.cosc.canterbury.ac.nz/csfieldguide/dev/teacher/_static/widgets/SE/validatorv3.html) to have a better understanding of black-box testing. In case of an invalid input, you probably want the program to tell the user that the input is invalid; you definitely don’t want it to crash! 

Finally, [try the triangle problem](http://www.cosc.canterbury.ac.nz/csfieldguide/dev/teacher/_static/widgets/SE/triangle.html). Give it wrong values and see the output and judge whether it is working as intended. It should work in all cases because the program has bugs in it. Think and write down 10 test cases and then go to the [triangle test case validator](http://www.cosc.canterbury.ac.nz/csfieldguide/dev/teacher/_static/software_engineering/SE-triangle-test-cases.pdf) and input the test cases. The validator will indicate how many of the bugs the student's tess have found. Review the feedback to check how many cases they have got right. Enjoy testing!!

Challenge the students to try to find the problem(s) using as few test inputs as possible (by using the concept of equivalence classes). 

A complete solution with all test cases that the interactive is looking for, with their equivalence classes, can be [obtained here](http://www.cosc.canterbury.ac.nz/csfieldguide/dev/teacher/_static/software_engineering/SE-triangle-test-cases-answers.pdf)

{teacher end}

Black-box testing is easy to do but not always enough because sometimes finding the different equivalence classes can be difficult if you don’t know the internal structure of the program. When we do white-box testing, we look at the code we are testing and come up with test cases that will execute as many different lines of code as possible. If we execute each line at least once, we should be able to discover a lot of bugs. We call this approach *code coverage* and aim for 100% coverage, so that each line of code is run at least once. In reality, even 100% code coverage won’t necessarily find all bugs though, because one line of code might work differently depending on inputs and values of variables in a program. Still, it’s a pretty good start.

{comment}

.. html5 App

 App for code coverage: Maybe take the app for blackbox testing as a starting point. For each of the examples, allow students to “step into the code”, a simple flow chart of the method. Then they can see their inputs “flowing” through the program, highlighting the tested paths as they go. In the end, this will show if they managed to test every path through the program and give a code coverage figure (e.g. 80%).

{comment end}

Unit testing is very useful for finding bugs. It helps us find out if the program works as *we* intended. Another important question during testing is if the software does what the *customer* wanted (Did we build the right thing?). *Acceptance testing* means showing your program to your stakeholders and getting feedback about what they like or don’t like. Any mistakes that we made in the analysis stage of the project will probably show up during acceptance testing. If we misunderstood the customer during the interview, our *unit tests* might pass (i.e. the software does what we thought it should) but we may still have an unhappy customer. 

Different stakeholders can be very different, for example in terms of technical skills, or even could have given us conflicting requirements for the software. It’s therefore of course possible to get positive feedback from one stakeholder and negative feedback from another. 

### Project: Acceptance Testing

{teacher}

This project covers material for an example for the 3.44 standard through the following components:

- Key problem: assuring that software is suitable for the end user
- Practical application: Software engineering projects
- Algorithm/technique: acceptance testing
- Evaluation: students need to critically evaluate existing software
- Personalised student examples: students choose which software to evaluate

{teacher end}

For this project, choose a small program such as a Windows desktop gadget or an Apple dashboard widget. (For example, you can find a good selection of Windows gadgets at [http://www.thoosje.com/desktop-gadgets-gallery.html](http://www.thoosje.com/desktop-gadgets-gallery.html) Pick something that you find particularly interesting or useful! Start by reading the description of the program to find out what it does *before* you try it out.

Next, think about a stakeholder for this software. Who would use it and why? Briefly write down some background information about the stakeholder (as in the analysis project) and their main requirements. Note which requirements would be most important to them and why.

Now, you can go ahead and install the program and play around with it. Try to imagine that you are the stakeholder that you described above. Put yourself in this person’s shoes. How would they feel about this program? Does it meet your requirements? What important features are missing? Try to see if you can find any particular problems or bugs in the program. (Tip: sometimes giving programs unexpected input, for example a word when they were expecting a number, can cause some interesting behaviour.)

Write up a brief acceptance test report about what you found. Try to link back to the requirements that you wrote down earlier, noting which have been met (or maybe partially met) and which haven’t. Do you think that overall the stakeholder would be happy with the software? Do you think that they would be likely to use it? Which features would you tell the software developers to implement next? 

{teacher}

It’s important for this project that students read the description of the program and think about a stakeholder and requirements before actually trying out the software, otherwise their thinking about the stakeholder and requirements may be influenced by what they already know about the software. 

{teacher end}

{comment}

.. xtcb It would be nice to add a test-driven project one day. We could provide unit tests (in a couple of common languages) and they have to develop to meet the tests, documenting the process and the kinds of errors that get detected along the way. Could be software to read in a date, or $ amount.

.. xtcb new possible project: The following are example repositories of real defects for real projects in the software industry. Students may be benefitted by reviewing these examples to see how other experienced testers write defect reports.
.. ? https://bugzilla.mozilla.org
.. ? http://bugzilla.kernel.org
.. ? https://issues.apache.org/bugzilla
.. ? http://www.openoffice.org/issues/query.cgi
.. ? https://bugs.eclipse.org/bugs
.. The students can either perform a SUT test or track bugs using Bugzilla, or they may review examples of bug reports prepared by experienced testers. This will also allow them to compare different testing strategies and will give them some understanding about how real bugs are fixed.

{comment end}

## Software processes 

So far in this chapter, you’ve learned about different phases of software development: analysis, design and testing. But how do these phases fit together? At what time during the project do we do what activity? That’s the topic of *software processes*.

The obvious answer would be to start with analysis to figure out what we want to build, then design the structure of the software, implement everything and finally test the software. This is the simplest software process called the *waterfall process*.

{image se-waterfall-diagram.png alt="Waterfall Diagram"}

The waterfall process is borrowed from other kinds of engineering. If we want to build a bridge, we go through the same phases of analysis, design, implementation and testing: we decide what sort of bridge we need (How long should it be? How wide? How much load should it be able to support?), design the bridge, build it and finally test it before we open it to the public. It’s been done that way for many decades and works very well, for bridges at least.

We call this process the waterfall process because once you “jump” from one phase of the project to the next, you can’t go back up to the previous one. In reality, a little bit of backtracking is allowed to fix problems from previous project phases but such backtracking is usually the exception. If during the testing phase of the project you suddenly find a problem with the requirements you certainly won’t be allowed to go back and rewrite the requirements.

{image se-waterfall-150.png alt="Waterfall Cartoon"}

An advantage of the waterfall process is that it’s very simple and easy to follow. At any point in the project, it’s very clear what stage of the project you are at. This also helps with planning: if you’re in the testing stage you know you’re quite far into the project and should finish soon. For these reasons, the waterfall process is very popular with managers who like to feel in control of where the project is and where it’s heading.

{curiosity}

**Curiosity: Hofstadter’s law**

Your manager and customer will probably frequently ask you how much longer the project is going to take and when you will finally have the finished program. Unfortunately, it’s really difficult to know how much longer a project is going to take. According to Hofstadter’s law, “It always takes longer than you expect, even when you take into account Hofstadter's Law.”

{curiosity end}

Because it’s just so nice and simple, the waterfall process is still in many software engineering textbooks and is widely used in industry. The only problem with this is that the waterfall process just does not work for most software projects.

So why does the waterfall process not work for software when it clearly works very well for other engineering products like bridges (after all, most bridges seem to hold up pretty well...)? First of all, we need to remember that software is very different from bridges. It is far more complex. Understanding the plans for a single bridge and how it works might be possible for one person but the same is not true for software. We cannot easily look at software as a whole (other than the code) to see its structure. It is not physical and thus does not follow the laws of physics. Since software is so different from other engineering products, there really is no reason why the same process should necessarily work for both.

To understand why the waterfall process doesn’t work, think back to our section about analysis and remember how hard it is to find the right requirements for software. Even if you manage to communicate with the customers and resolve conflicts between the stakeholders, the requirements could still change while you’re developing the software. Therefore, it is very unlikely that you will get the complete and correct requirements for the software at the start of your project. 

If you make mistakes during the analysis phase, most of them are usually found in the testing stage of the project, particularly when you show the customer your software during acceptance testing. At this point, the waterfall process doesn’t allow you to go back and fix the problems you find. Similarly, you can’t change the requirements halfway through the process. Once the analysis phase of the project is finished, the waterfall process “freezes” the requirements. In the end of your project, you will end up with software that hopefully fulfills *those* requirements, but it is unlikely that those will be the *correct* requirements. 
You end up having to tell the customer that they got what they asked for, not what they needed. If they've hired you, they'll be annoyed; it it's software that you're selling (such as a smartphone app), people just won't bother buying it.

You can also get things wrong at other points in the project. For example, you might realise while you’re writing the code that the design you came up with doesn’t really work. But the waterfall process tells you that you have to stick with it anyway and make it work somehow.

{image se-tree-swing-cartoon.png alt="Software Design of a Tree-Swing"}

Design by [Paragon Innovations](http://www.paragoninnovations.com/guide.shtml) and drawn by [Project Cartoon](http://www.projectcartoon.com/about/)

So if the waterfall process doesn’t work, what can we do instead? Most modern software development processes are based on the concept of iteration. We do a bit of analysis, followed by some design, some programming and some testing. (We call this one iteration.) This gives us a rather rough prototype of what the system will look like. We can play around with the prototype, show it to customers and see what works and what doesn’t. Then, we do the whole thing again. We refine our requirements and do some more design, programming and testing to make our prototype better (another iteration). Over time, the prototype grows into the final system, getting closer and closer to what we want. 

{image se-iterative-development.png alt="The iterative software development cycle starts with feedback from showing the prototype to the customer with analysis, the back to design, implementation and testing, and then starting again with analysis."}

The advantage with this approach is that if you make a mistake, you will find it soon (probably when you show the prototype to the customer the next time) and have the opportunity to fix it. The same is true if requirements change suddenly; you are flexible and can respond to changes quickly. You also get a lot of feedback from the customers as they slowly figures out what they need.

There are a number of different software processes that use iteration (we call them *iterative processes*); a famous one is the *spiral model*. Although the details of the different processes vary, they all use the same iteration structure and tend to work very well for software.

Apart from the question of what we do at what point of the project, another interesting question addressed by software processes is how much time we should spend on the different project phases. You might think that the biggest part of a software project is programming, but in a typical project, programming usually takes up only about 20% of the total time! 40% is spent on analysis and design and another 40% on testing. This shows that software engineering is so much more than programming.

Once you’ve finished developing your program and given it to the customer, the main part of the software project is over. Still, it’s important that you don’t just stop working on it. The next part of the project, which can often go on for years, is called *maintenance*. During this phase you fix bugs, provide customer support and maybe add new features that customers need.

{curiosity}

**Curiosity: Brooks’s law**

Imagine that your project is running late and your customer is getting impatient. Your first instinct might be to ask some of your friends if they can help out so that you have more people working on the project. Brooks’s law, however, suggests that that is exactly the wrong thing to do!

Brooks’s law states that “adding manpower to a late software project makes it later.” This might seem counterintuitive at first because you would assume that more people would get more work done. However, the overhead of getting new people started on the project (getting them to understand what you are trying to build, your design, the existing code, and so on) and of managing and coordinating the larger development team actually makes things slower rather than faster in the short term. 

{curiosity}

### Activity: Fun with the Waterfall Process

The waterfall process is simple and commonly used but doesn’t really work in practice. In this activity, you’ll get to see why. First, you will create a design which you then pass on to another group. They have to implement your design exactly and are not allowed to make any changes, even if it doesn’t work!

You need a deck of cards and at least 6 people. Start by dividing up into groups of about 3-4 people. You need to have at least 2 groups. Each group should grab two chairs and put them about 30cm apart. The challenge is to build a bridge between the two chairs using only the deck of cards!

Before you get to build an actual bridge, you need to think about how you are going to make a bridge out of cards. Discuss with you team members how you think this could work and write up a short description of your idea. Include a diagram to make your description understandable for others.

Now exchange your design with another group. Use the deck of cards to try to build your bridge to the exact specification of the other group. You may not alter their design in any way (you are following the waterfall process here!). As frustrating as this can be (especially if you know how to fix the design), if it doesn’t work, it doesn’t work!

If you managed to build the bridge, congratulations to you and the group that managed to write up such a good specification! If you didn’t, you now have a chance to talk to the other group and give them feedback about the design. Tell them about what problems you had and what worked or didn’t work. The other group will tell you about the problems they had with your design!

Now, take your design back and improve it, using what you just learnt about building bridges out of cards and what the other group told you. You can experiment with cards as you go, and keep changing the design as you learn about what works and what doesn't (this is an agile approach). Keep iterating (developing ideas) until you get something that works.

Which of these two approaches worked best --- designing everything first, or doing it in the agile way?

{teacher}

Usually the point about agile design comes across very strongly; it's rare for a designed bridge to work, but it can usually be done with the iterative agile approach. Students might point out that they aren't experts with cards, but a software engineer should be an expert with software. However, the real issue is that the software engineer probably isn't an expert at the kind of system they're implementing, since the system probably hasn't been built before.

Another option is to get students to build card houses (the main point is that the students should be working in a domain they're not familiar with; if they've build card bridges before then the activity won't work!) This might be easier for younger students; the bridge is quite a challenge! You could challenge students to design and build a tower as high as possible out of cards. Alternatively, you could use lego but cards are definitely more challenging and harder to design with.

{teacher end}

### Activity: A Navigation Language

In this activity, you will develop a language for navigating around your school. Imagine that you need to describe to your friend how to get to a particular classroom. This language will help you give a precise description that your friend can easily follow.

First, figure out what your language has to do (i.e. find the *requirements*). Will your language be for the entire school or only a small part? How exact will the descriptions be? How long will the descriptions be? How easy will they be to follow for someone who does / doesn’t know your language? How easy will it be to learn? …

Now, go ahead and *design* the language. Come up with different commands (e.g. turn left, go forward 10, …). Make sure you have all the commands you need to describe how to get from one place in your school to any other!

Finally, *test* the language using another student. Don’t tell them where they’re going, just give them instructions and see if they follow them correctly. Try out different cases until you are sure that your language works and that you have all the commands that you need. If you find any problems, go back and fix them and try again!

Note down how much time each of the different phases of the project take you. When you have finished, discuss how much time you spent on each phase and compare with other students. Which phase was the hardest? Which took the longest? Do you think you had more time for some of the phases? What problems did you encounter? What would you do differently next time around?


### Activity: Block Building (Precise Communication)

Communicating clearly with other software engineers and customers is essential for software engineers. In this activity, you get to practice communicating as precisely as possible!

Divide up into pairs, with one *creator* and one *builder* in each pair. Each person needs a set of at least 10 coloured building blocks (e.g. lego blocks). Make sure that each pair has a matching set of blocks or this activity won’t work!

The two people in each pair should not be able to see each other but need to be able to hear each other to communicate. Put up a screen between the people in each pair or make them face in opposite directions. Now, the creator builds something with their blocks. The more creative you are the more interesting this activity will be!

When the creator has finished building, it’s the builders turn. His or her aim is to build an exact replica of the creator's structure (but obviously without knowing what it looks like). The creator should describe exactly what they need to do with the blocks. For example, the creator could say “Put the small red block on the big blue block” or “Stand two long blue blocks up vertically with a one block spacing between them, and then balance a red block on top of them”. But the creator should not describe the building as a whole (“Make a doorframe.”).

When the builder thinks they are done, compare what you built! How precise was your communication? Which parts were difficult to describe for the creator / unclear for the builder? Switch roles so that you get to experience both sides!


## Agile software development

*Agile* software development has become popular over the last 10 years; the two most famous agile processes are called [XP](http://en.wikipedia.org/wiki/Extreme_programming) and [Scrum](http://en.wikipedia.org/wiki/Scrum_(development)). Agile software development is all about being extremely flexible and adaptive to change. Most other software processes try to manage and control changes to requirements during the process; agile processes accept and expect change.

Agile processes work similarly to iterative processes in that they do a number of iterations of analysis, design, implementation and testing. However, these iterations are extremely short, each usually lasting only about 2 weeks. 

In many other processes, documentation is important. We document the requirements so that we can look back at them; we document our design so that we can refer back to it when we program the system. Agile software processes expect things to change all the time. Therefore, they do very little planning and documentation because documenting things that will change anyway is a bit of a waste of time.

Agile processes include lots of interesting principles that are quite different from standard software development. We look at the most interesting ones here. If you want to find out more, have a look at [Agile Academy on Youtube](http://www.youtube.com/user/AgileAcademyAus) which has lots of videos about interesting agile practices! There’s also [another video here](http://www.youtube.com/watch?v=kqz_jDS0RWY) which explains the differences between agile software development and the waterfall process. 

Here are some general principles used for agile programming:

**Pair-programming** 
 Programming is done in pairs with one person coding while the other person watches and looks for bugs and special cases that the other might have missed. It’s simply about catching small errors before they become bugs. After all, 4 eyes see more than 2. 

 You might think that pair-programming is not very efficient and that it would be more productive to have programmers working separately; that way, they can write more code more quickly, right? Pair-programming is about reducing errors. Testing, finding and fixing bugs is hard; trying not to create them in the first place is easier. As a result, pair-programming has actually been shown to be more efficient than everyone programming by themselves!

**YAGNI**
 YAGNI stands for “You ain’t gonna need it” and tells developers to keep things simple and only design and implement the things that you know you are really going to need. It can be tempting to think that in the future you might need feature x and so you may as well already create it now. But remember that requirements are likely to change so chances are that you won’t need it after all. 

[{image se-xkcd-the-general-problem.png alt="xkcd comment on YAGNI"}](http://xkcd.com/974/)

 You ain’t gonna need it!

**Constant testing**
 Agile processes take testing very seriously. They usually rely on having lots of automated unit tests that are run at least once a day. That way, if a change is made (and this happens often), we can easily check if this change has introduced an unexpected bug.

**Refactoring**
 There are many different ways to design and program a system. YAGNI tells you to start by doing the simplest thing that’s possible. As the project develops, you might have to change the original, simple design. This is called *refactoring*.

 Refactoring means to change your design or implementation without changing the program’s behaviour. After a refactoring, the program will work exactly the same, but will be better structured in some way. Unit tests really come in handy here because you can use them to check that the code works the same way before and after the refactoring.

 Refactoring only works on software because it is “soft” and flexible. The same concept does not really work for physical engineering products. Imagine that when building a bridge, for example, you started off by doing the simplest possible thing (putting a plank over the river) and then continually refactored the bridge to get the final product. 

**Courage**
 “Courage” might seem like an odd concept in the context of software development. In agile processes, things change all the time and therefore programmers need to have the courage to make changes to the code as needed, fix the problems that need to be fixed, correct the design where needed, throw away code that doesn’t work etc. This might not seem like a big deal, but it can actually be quite scary to change code, particularly if the code is complicated or has been written by a different person. Unit tests really help by giving you courage: you’ll feel more confident to change the code if you have tests that you can run to check your work later.

**Test-driven development** 
 In standard software development, we first write some code and then test it. This makes sense: we need the code before we can test it, right? Test-driven development tells you to do the exact opposite!

 Before you write a piece of code, you should write a test for the code that you are about to write. This forces you to think about exactly what you’re trying to do and what special cases there are. Of course, if you try to run the test, it will fail (since the functionality it is testing does not yet exist). When you have a failing test, you can then write code to make the test pass.

**Programmer welfare** 
 Software developers should not work more than 40 hours per week. If they do overtime one week they should not do more overtime the following week. This helps keep software developers happy and makes sure they don’t get overworked.

**Customer involvement** 
 A customer representative should be part of the developing team (ideally spending full-time with the team), on hand to answer questions or give feedback at all times. This is important to be able to quickly change the requirements or direction of the project. If you have to wait 2 weeks until you can get feedback from your customer, you will not be able to adapt to change very quickly!

 Although having a customer on the development team is a great idea in theory, it is quite hard to achieve in practice. Most customers simply want to tell you their requirements, pay you and then get the software delivered 5 months later. It’s rare to find a customer who is willing and has the time to be more involved in the project.

{curiosity}

**Curiosity: Christopher Alexander**

So far, we’ve mainly compared software development to engineering and building bridges, but you might have noticed that it’s also pretty similar to architecture. In fact, software development (in particular agile software development) has borrowed a lot of concepts from architecture. An architect called Christopher Alexander, for example, suggested involving customers in the design process. Sound familiar? Several other suggestions from Christopher Alexander were also picked up by the agile development community and as a result his thinking about architecture has shaped how we think about software development. This is despite the fact that Christopher Alexander knew nothing about software. He was apparently very surprised when he found out how well known he is among software developers!

{curiosity end}

### Project: Software processes

{teacher}

This project covers material for an example for the 3.44 standard through the following components:

- Key problem: finding and effective software development methodology
- Practical application: Software engineering projects
- Algorithm/technique: a software development process (agile, XP, or other)
- Evaluation: students need to report on the positives and negatives of the particular system
- Personalised student examples: each student has their own interview with a software engineer

{teacher end}

This project will provide insight into a real software engineering process, but you'll need to find a software engineer who is prepared to be interviewed about their work. It will be ideal if the person works in a medium to large size company, and they need to be part of a software engineering team (i.e. not a lone programmer).

The project revolves around interviewing the person about the process they went through for some software development they did recently. They may be reluctant to talk about company processes, in which case it may help to assure them that you will keep their information confidential (your project should only be viewed by you and those involved in supervising and marking it; you should state its confidential nature clearly at the start so that it doesn't later get used as an exemplar).

You need to do substantial preparation for the interview. Find out about the kind of software that the company makes. Read up about software engineering (in this chapter) so that you know the main terminology and techniques.

Now prepare a list of questions for the interviewee.
These should find out what kind of software development processes they use, what aspects your interviewee works on, and what the good and bad points are of the process, asking for examples to illustrate this.

You should take extensive notes during the interview (and record it if the person doesn't mind).

You then need to write up what you have learned, describing the process, discussing the techniques used, illustrating it with examples, and evaluating how well the process works.


## The whole story!

In this chapter, we’ve tried to give you an introduction to the challenges of creating software and some techniques that software engineers use to overcome them. We’ve really only scratched the surface of software analysis, design, testing and software processes; there are entire books about each of these areas!

It can be difficult to understand the importance of some of the problems and techniques we have described here if you have never worked on a larger software project yourself. Some may seem blindingly obvious to you, others may seem irrelevant. When you work on your first large project, come back to this chapter and hopefully you’ll recognise some of the problems we have described here!



## Further reading

### Useful Links
- [Wikipedia - Software engineering](http://en.wikipedia.org/wiki/Software_engineering)
- [CS4FN - Software engineering](http://www.cs4fn.org/fundamentals/softwareeng.php)
- [Teach ICT - Systems Life Cycle](http://www.teach-ict.com/as_a2_ict_new/ocr/A2_G063/331_systems_cycle/slc_stages/home_slc.html)
- [Wikipedia - Software crisis](http://en.wikipedia.org/wiki/Software_crisis)
- [IEEE - Why software fails](http://spectrum.ieee.org/computing/software/why-software-fails)
- [Wikipedia - Software design](http://en.wikipedia.org/wiki/Software_design)
- [Wikipedia - Abstraction](http://en.wikipedia.org/wiki/Abstraction_(computer_science))
- [Wikipedia - Software testing](http://en.wikipedia.org/wiki/Software_testing)
- [Wikipedia - Software development process](http://en.wikipedia.org/wiki/Software_development_process)
- [Wikipedia - Waterfall model](http://en.wikipedia.org/wiki/Waterfall_model)
- [Wikipedia - Iterative and incremental development](http://en.wikipedia.org/wiki/Iterative_and_incremental_development)
- [Wikipedia - Agile software development](http://en.wikipedia.org/wiki/Agile_software_development)
- [Wikipedia - Test driven development](http://en.wikipedia.org/wiki/Test-driven_development)

