# Design: How do we build it?

Once you have decided what your software needs to be able to do, you can actually build it.
But just blindly starting to program is likely to get you into trouble; remember that most software is huge and very complex.
You need to somehow minimise the amount of complexity in software, otherwise it will become impossible to understand and maintain for other developers in the future.

Software design is all about managing this complexity and making sure that the software we create has a good structure.
Before we start writing any code, we design the structure of our software in the *design* phase of the project.
When you talk about software design, many people will think that you’re talking about designing what the software will look like.
Here, we’re actually going to look at designing the *internal* structure of software.

So how can we design software in a way that it doesn’t end up hugely complex and impossible to understand?
Here, we give you an introduction to two important approaches: subdivision and abstraction.
Those are pretty scary words, but as you’ll see soon, the concepts behind them are surprisingly simple.

You can probably already guess what *subdivision* means: We break the software into many smaller parts that can be built independently.
Each smaller part may again be broken into even smaller parts and so on.
As we saw in the introduction, a lot of software is so large and complex that a single person cannot understand it all; we can deal much more easily with smaller parts.
Large software is developed by large teams so different people can work on different parts and develop them in parallel, independently of each other.
For example, for the cafeteria project, you might work on developing the database that records what food the cafeteria sells and how much each item costs, while your friend works on the actual phone app that students will use to order food.

Once we have developed all the different parts, all we need to do is make them communicate with each other.
If the different parts have been designed well, this is relatively easy.
Each part has a so-called *interface* which other parts can use to communicate with it.
For example, your part of the cafeteria project should provide a way for another part to find out what food is offered and how much each item costs.
This way, your friend who is working on the phone app for students can simply send a request to your part and get this information.
Your friend shouldn’t need to know exactly how your part of the system works; they should just be able to send off a request and trust that the answer they get from your part is correct.
This way, each person working on the project only needs to understand how their own part of the software works.

Let’s talk about the second concept, *abstraction*.
Have you ever thought about why you can drive a car without knowing how its engine works?
Or how you can use a computer without knowing much about hardware?
Maybe you know what a processor and a hard drive is but could you build your own computer?
Could your parents?
We don’t need to know exactly how computers or cars work internally to be able to use them thanks to abstraction!

If we look more closely at a computer, we can see that it actually has a number of *layers* of abstraction.
Right at the bottom, we have the hardware, including the processor, RAM, hard drive and various complicated looking circuit boards, cables and plugs.

When you boot your computer, you start running the operating system.
The operating system is in charge of communicating with the hardware, usually through special driver software.
Once you’ve started your computer, you can run programs, for example your browser.
The browser doesn’t actually communicate with the hardware directly but always goes through the operating system.

Finally, you’re the top layer of the system.
You use the program but you will (hopefully) never have to interact with the more complicated parts of the operating system such as driver software, let alone the hardware.
In this way, you can use the computer without ever having to worry about these things.

{interactive slug="system-layers" type="in-page"}

We call a system like this a *layered system*.
You can have any number of layers you want but each layer can only communicate with the one directly below it.
The operating system can directly access the hardware but a program running on the computer can't.
You can use programs but hopefully will never have to access the hardware or the more complex parts of the operating system such as drivers.
This again reduces the complexity of the system because each layer only needs to know about the layer directly below it, not any others.

Each layer in the system needs to provide an interface so that the layer above can communicate with it.
For example, a processor provides a set of instructions to the operating system; the operating system provides commands to programs to create or delete files on the hard drive; a program provides buttons and commands so that you can interact with it.

One layer knows nothing about the internal workings of the layer below; it only needs to know how to use the layer’s interface.
In this way, the complexity of lower layers is completely hidden, or *abstracted*.
Each layer represents a higher level of abstraction.

So each layer hides some complexity, so that as we go up the layers things remain manageable.
Another advantage of having layers is that we can change one layer without affecting the others &ndash; as long as we keep the layer’s interface the same of course.
For example, your browser’s code might change but you might never notice as long as the browser still looks and works the same as before.
Of course, if the browser stops working or new buttons appear suddenly you know that something has changed.

We can have the same "layered" approach inside a single program.
For example, websites are often designed as so-called *three-tier* systems with three layers: a data layer, a logic layer and a presentation layer.
The data layer usually consists of a database with the data that the website needs.
For example, Facebook has a huge database where it keeps information about its users.
For each user, it stores information about who their friends are, what they have posted on their wall, what photos they have added, and so on.
The logic layer processes the data that it gets from the database.
Facebook’s logic layer, for example, will decide which posts to show on your "Home" feed, which people to suggest as new friends, etc.
Finally, the presentation layer gets information from the logic layer which it displays.
Usually, the presentation layer doesn’t do much processing on the information it gets but simply creates the HTML pages that you see.

{interactive slug="three-tier-website" type="in-page"}

{panel type="curiosity"}

# Reuse: kangaroos and helicopters

Since building software is so difficult and time-consuming, a popular idea has been to reuse existing software.
Not surprisingly, we call this *software reuse*.
It’s a great idea in theory (why recreate something that already exists?) but turns out to be difficult to put into practice partly because existing software is also huge and complicated.
Usually when you reuse software, you want only a small part of the existing software’s functionality, rather than everything.

An interesting story that illustrates the problems with software reuse (although it is unfortunately not completely accurate, see [this article](http://www.snopes.com/humor/nonsense/kangaroo.asp)) is that of helicopters and kangaroos.
The Australian Air Force was developing a new helicopter simulator to train pilots.
They wanted the simulator to be as realistic as possible and therefore decided to include herds of kangaroos in the simulation.
To save time, they reused code from another simulator which included foot soldiers and simply changed the icons of the soldiers to kangaroos.

Once the program was finished, they demonstrated it to some pilots.
One of the pilots decided to fly the helicopter close to a herd of kangaroos to see what would happen.
The kangaroos scattered to take cover when the helicopter approached (so far so good) but then, to the pilot’s extreme surprise, pulled out their guns and missile launchers and fired at the helicopter.
It seemed the programmer had forgotten to remove *that* part of the code from the original simulator.

{comment We could include a cartoon kangaroo in this curiosity box}

{panel end}

{panel type="project"}

# Designing your software

Think back to the requirements you found in the analysis project described above.
In this project, we will look at how to design the software.

Start by thinking about how the software you are trying to build can be broken up into smaller parts.
Maybe there is a database or a user interface or a website?
For example, imagine you are writing software to control a robot.
The robot needs to use its sensors to follow a black line on the ground until it reaches a target.
The software for your robot should have a part that interacts with the sensors to get information about what they "see".
It should then pass this information to another part, which analyses the data and decides where to move next.
Finally, you should have a part of the software which interacts with the robot’s wheels to make it move in a given direction.

Try to break down your software into as many parts as possible (remember, small components are much easier to build!) but don’t go too far &ndash; each part should perform a sensible task and be relatively independent from the rest of the system.

For each part that you have identified, write a brief description about what it does.
Then think about how the parts would interact.
For each part, ask yourself which other parts it needs to communicate with directly.
Maybe a diagram could help visualise this?

{panel end}
