# Human Computer Interaction

{panel type="teacher-note" summary="Curriculum Guides for Human Computer Interaction"}
TODO
{panel end}

## What's the big picture?

{panel type="teacher-note" summary="The wide scope of user interfaces"}
The material in this chapter relates to "digital devices". While it definitely applies to conventional computers, it also applies to all sorts of other gadgets, such as alarm clocks, air conditioning units, microwave ovens, stopwatches, electronic instruments, point of sale units, parking meters and burglar alarms. In fact, most of the student exercises will be a lot easier to do on a device with few features, since all the likely tasks and sequences can be considered. Evaluating something like "Microsoft Windows" or "iPads" is far too wide a scope, as there are so many subsystems, each of which would make a good project on its own (how menus work, how to find files, how to open a program, perhaps even just how to switch it on!)
{panel end}

{comment}
xtcb check for material from unplugged v2? chinese book?

xtcb cartoons from http://okcancel.com/archives/comic
{comment end}

People often become frustrated with computers. At some point when using these devices, you will be annoyed that the computer did something you didn't want it to do and you can't figure out how to get the computer to do what you want, but why is that? Humans made computers, so why are computers often so frustrating to use by humans?

Computers are becoming hundreds of times more powerful every decade, yet there is one important component of the computer system that hasn't changed significantly in performance since the first computers were developed in the 1940s: the human. For a computer system to work really well, it needs to be designed by people who understand the human part of the system well.

In this chapter we'll look at what typically makes good and bad interfaces. The idea is to make you sensitive to the main issues so that you can critique existing interfaces, and begin to think about how you might design good interfaces.

Often software developers create a computer program or system for a device that requires the user to spend some time to learn how to use the program. These interfaces might be easy to use for the developer since they know the system really well, but a user just wants to get the job done without spending too much time learning the software (they might switch to another program if it's too hard to use). A developer might treat the program and the user separately, however the user is part of the system, and a developer needs to create the software with the user in mind, designing a program that they will find easy to use and intuitive.

Human-computer interaction (HCI) is about trying to make programs useful, usable, and accessible to humans. It goes way beyond choosing layouts, colours, and fonts that aren't Comics Sans for an interface. It's strongly influenced by the psychology of how people interact with digital devices, which means understanding many issues about how people behave, how they perceive things, and how they understand things so that they feel that a system is working to help them and not hinder them. By understanding HCI, developers are more likely to create software that is effective and popular. If you ask people if they have ever been frustrated using a computer system, you’ll probably get a clear message that HCI isn’t always done well.

Try out the following interactive task, and get some friends to try it:

{interactive name="deceiver" type="in-page"}

Did anyone get a wrong answer to the question even though you thought you got it right? You may have noticed that the "Yes" and "No" button sometimes swap.
Inconsistency is almost always a really bad thing in an interface, as it can easily fool the user into making an error.

The only situation it might be desirable is if it was intentionally done to make a computer game more interesting (which perhaps the above interactive could be). But imagine you have a web form in which the "clear" and "submit" buttons often switched places. You would frequently clear the form when you had meant to submit it, or submit the form when you had meant to clear it!

{panel type="teacher-note" summary="Accuracy vs Speed in the above interactive"}
The swapping yes/no interactive may not fool all students, but for some it will be very frustrating. If they decide to use it slowly and carefully they may get the yes/no choices correct, but they will also get lower scores (i.e. lower productivity if this was a real interface).
{panel end}

The study of Human Computer Interaction involves a lot of psychology (how people behave) because this affects how they will use a system. As a simple example, the human short term memory only lasts for a matter of seconds (even in young people!). If a device delays a response for more than about 10 seconds, the user has to make a conscious effort to remember what they were doing, and that’s extra work for the user (which from their point of view, makes the system more tiring to use). Another example is that people get "captured" into sequences: if you start biking on a route that you take each day, you'll soon find yourself arriving without thinking about every turn along the way, which is fine unless you were supposed to go somewhere else on the way, or if you have recently moved to a new house or workplace. A similar effect occurs with confirmation dialogues; perhaps you often accidentally close a file without saving it, and the system says "Do you want to save it?", so you press "Yes". After you've done this a few times you'll be captured into that sequence, so on the one occasion that you don't want to overwrite your old file, you may accidentally click "Yes" anyway.

{panel type="curiosity" summary="Capture errors"}
Getting used to a regular route or procedure, and as a result forgetting something different you had to do that day, is called a *capture error*. This is easy to remember, as you get "captured" in your usual sequence.
{panel end}

A lot of people might blame themselves for such errors, but basic psychology says that this is a natural error to make, and a good system should protect users from such errors (for example, by allowing them to be undone).

{comment}
.. xtcb consider looking at a button's features as an example of fine detail (slide off while pressing etc.)
.. xjrm please put in a simple (normal) checkbox and button (and maybe menu) here so they can experiment with what happens (e.g. click but slide off before release); have widgets, and some text summarising what was selected last
.. jrm Will keep dev log for this in Asana Interactive 1
{comment end}

Designing good interfaces is *very* difficult. Just when you think you've got a clever idea, you'll find that a whole group of people struggle to figure out how to use it, or it backfires in some situation. Even worse, some computer developers think that their users are dummies and that any interface problems are the user’s fault and not the developer’s. But the real problem is that the developer knows the system really well, whereas the user just wants to get their job done without having to spend a lot of time learning the software – if the software is too hard to use, they’ll just find something else that’s easier. Good interfaces are worth a lot in the market.

There are many ways to evaluate and fine tune interfaces, and in this chapter we'll look at some of these. One important principle is that one of the worst people to evaluate an interface is the person who designed and programmed it. They know all the details of how it works, they've probably been thinking about it for weeks, they know the bits that you're not supposed to touch and the options that shouldn't be selected, and of course they have a vested interest in finding out what is *right* with it rather than what is *wrong*. It's also important that the interface should be evaluated by someone who is going to be a typical user; if you get a 12-year-old to evaluate a retirement planning system they may not know what the user will be interested in; and if you get a teacher to try out a system that students will use, they will know what the answers are and what the correct process is.

Often interfaces are evaluated by getting typical users to try them out, and carefully noting any problems they have. There are companies that do nothing but these kinds of user tests – they will be given a prototype product, and pay groups of people to try it out. A report on the product is then produced and given to the people who are working on it. This is an expensive process, but it makes the product a lot better, and may well give it a huge advantage over its competitors. Having it evaluated by a separate company means that you avoid any bias from people in your own company who want to prove (even subconsciously) that they've done a good job designing it, rather than uncover any niggling problems in the software that will annoy users.

Before we look at different ways to evaluate interfaces, we need to consider what is happening with an interface.

## Users and tasks

A very important consideration when designing or evaluating an interface is who the users are likely to be. For example, the typical age of a user can be significant: very young children may have difficulty reading some words and prefer images and animations, while a business person who uses an interface frequently will want it to be very fast to use, perhaps using keyboard shortcuts only.

Think about the kinds of considerations you would have to make for the following user groups.

- Senior citizens
- Gamers
- Casual users
- Foreign visitors

{panel type="spoiler" summary="Some possible answers: Don't open until you've thought about it!"}
- Senior citizens: large print, few features to learn, don't rely so much on memory, poor eyesight and less agile physically (e.g. large buttons help), don't assume previous experience with computers
- Gamers: previous experience with typical game interfaces, expecting challenges, probably running on a high end machine
- Casual users: interface needs to be very easy to learn, perhaps based on widely used systems, needs clear guidance
- Foreign visitors: simple language, use of meaningful images/icons
{panel end}

The interface is the only part of a program that the user sees (that's the definition of an interface!), so if the interface doesn't work for them, then the program doesn't work.

Another important thing to do when designing and evaluating an interface is to think about what tasks it is being used for. Advertisements for digital devices often hide the complexity of a task, and simply point out the features available for doing the task. For example, suppose a smartphone is advertised as having a high resolution camera. The real task that someone might want to do is to take a photo of something they've just spotted, and send it to a friend. If you look at what happens in reality, the smartphone might be in their pocket or bag, and if they see something cool going past, they need to get it out, perhaps unlock it, open the camera app, adjust the lighting and other settings, press a button (is it easy to find when you're holding the camera up?), select the photo, choose an email option, type in the friend's address (does the system help with that?), send it (what happens if you're out of reception range?), and then put the phone away. If any one of these steps is slow or hard to remember, the whole experience can be frustrating, and it's possible the photo opportunity will be missed, or for some other reason the friend won't receive the photo.

It's important to think through all the parts of a task when discussing an interface, as it's the small steps in a task that make all the difference between using the interface in a real situation, compared with a demonstration of some features of the device.

{panel type="challenge" summary="Thinking about the context of tasks"}
It's very important to think about the whole context when describing a task. As an exercise, can you provide an example of a real task, including context, for a real person for each of the following:

- set an alarm clock
- show a slide (Powerpoint) presentation

Discuss your answers with a classmate or a friend. This should help you to evaluate your own answer, and consider other possible examples.
{panel end}

{panel type="teacher-note" summary="Possible answers for above challenge"}
The educational goal for students is to see the big gulf between the naive design view of "set an alarm clock" as being a sufficient task description versus a specific scenario that gives the task much more meaning. It can take some effort for students to break down a task into its critical steps; if they have done the task before they have probably become adept at it and have forgotten any initial challenges, and if they haven't done the task, they may assume that it's easy. Some of the ideas that you could prompt for are:

- set an alarm clock: the task is often done late at night, and if a mistake is made the user may miss an important appointment or flight in the morning, so it's already challenging. Depending on the clock (it might be on a smartphone, or a physical clock), the user needs to set the alarm time (including getting the am/pm part right), switch on the sound for the alarm (perhaps making sure that the device isn't muted), and make sure it has sufficient power to last until the morning. All this is being done while tired, and a mistake could be costly!
- show a slide (Powerpoint) presentation: this task is often done in front of an audience, and there may be limited time e.g. if the room isn't available until a few minutes before the presentation. The computer may need to be connected to a projector (a whole interface challenge in itself), the software put into presentation mode with the right image ready to start, the user needs to be able to move to the next slide, and recover from pressing a wrong key.
{panel end}

{comment}
.. computers can make people feel dumb - dummies books, Windows for idiots etc., and some programmers and help people use derogatory terms like luser , PEBKac Problem Exists Between Keyboard And Chair et.c http://en.wikipedia.org/wiki/User_error
{comment end}

{panel type="project" summary="Sending an email from multiple devices"}
For this project, try sending an email from both a computer and a mobile phone. Take note of all the steps required from when you start using the device until the email is sent.

You will probably notice quite a few differences between the two interfaces.

Keep your notes for later, as you can further analyse them once you have read through more of this chapter.
{panel end}

{panel type="project" summary="Designing stovetops/remote"}
For this project, you will designing the top of a cooking stove. This isn't a computer system, but will help demonstrate some of the issues that come up. Your task is to sketch three different configurations for the stovetop which includes the arrangement of the 4 elements and the 4 control knobs.

The task is [described in detail in the HCI CS Unplugged activity](http://csunplugged.org/human-interface-design).
{panel end}

## Interface Usability

{panel type="teacher-note" summary="Some of the key learning objectives of this chapter"}
Key ideas that students should be picking up include:

-  The “system” that has to work well is the computer and the human together.
-  Many people get frustrated with digital devices. Sometimes they will put up with it because it’s the only option, but in other cases devices and software with good interfaces sell much better or can be priced higher because they help the user get their job done.
-  The worst person to evaluate an interface is the person who designed it. They know exactly how it should work; but if someone else tries it you’ll find out how it looks to a typical user (for this reason a student should not design an interface as a submission for this standard – it would be evidence that they don’t understand HCI evaluation!)
-  An interface is used to do a task, so it makes the most sense to identify the tasks that a particular interface is for, and then consider how difficult those tasks are using that interface. The common mistake is to focus on features of an interface, but in the real world the question is whether or not those features can be used to achieve a task from beginning to end.
{panel end}

Devices are often sold using catch phrases like "user friendly" and "intuitive", but these are vague terms that are hard to pin down. In this section we will use the more technical term, [Usability](http://en.wikipedia.org/wiki/Usability), which is well understood by HCI experts, and gives us some ways to evaluate how suitable an interface is for a particular task. Usability isn't just about an interface being nice to use: poor usability can lead to serious problems, and has been the cause of major disasters, such as airplane crashes, financial disasters, and medical mishaps. It is also important because an interface that requires a lot of dexterity, quick reactions or a good memory makes it less accessible to much of the population, when accessibility can be both a moral and legal expectation.

{panel type="curiosity" summary="When interface design goes horribly wrong"}
- 87 people were killed when [Air Inter Flight 148 crashed](http://en.wikipedia.org/wiki/Air_Inter_Flight_148) due to the pilots entering "33" to get a 3.3 degree descent angle, but the same interface was used to enter the descent rate, which the autopilot interpreted as 3,300 feet per minute. This interface problem is called a "mode error" (described later). There is more information [here](http://blog.martindoms.com/2011/01/24/poor-ui-design-can-kill/).
- 13 people died and many more were injured when the pilots of [Varig Flight 254](https://en.wikipedia.org/wiki/Varig_Flight_254) entered an incorrect heading. The flight plan had specified a heading of 0270, which the captain interpreted and entered into the flight computer as 270 degrees. What it actually meant was 027.0 degrees. This confusion came about due to the format of headings and the position of the decimal point on flight plans being changed without him knowing. Unfortunately, the co-pilot mindlessly copied the captain's heading instead of reading it off the flight plan like he was supposed to. The plane then cruised on autopilot for a few hours. Unfortunately, [confirmation bias](https://en.wikipedia.org/wiki/Confirmation_bias) got the better of the pilots who were convinced they were near their destination, when in fact they were hundreds of miles away. The plane ran out of fuel and crash landed in the Amazon Jungle. Designing aircraft systems which work for humans is a big challenge, and is a part of the wider area of human factors research.
- A bank employee [accidentally gave a customer a loan of $10 million instead of $100,000](http://edition.cnn.com/2012/08/24/world/asia/new-zealand-accidental-millionaire-sentenced/). The customer withdrew most of the money and fled to Asia, the bank lost millions of dollars in the process, and the teller concerned would have had a traumatic time just because of a typing error. The error was due to the employee typing in two extra zeroes, apparently because some interfaces automatically put in the decimal point (you could type 524 to enter $5.24), and others didn't. This error can be explained in terms of a lack of consistency in the interface, causing a mode error.
- A 43-year old woman suffered respiratory arrest after a nurse accidentally entered 5 instead of 0.5 for a dose rate for morphine. The interface should have made it difficult to make an error by a factor of 10. There is a [paper about it](http://www.ncbi.nlm.nih.gov/pubmed/16738293), and an [article about the interface problem](http://hrcak.srce.hr/file/95851). Similar problems can occur in any control system where the operator types in a value; a better interface would force the operator to press an "up" and "down" button, so big changes take a lot of work (this is an example of an "off by one error", where one extra digit is missed or added, and also relates to the principle of commensurate effort)

In all these cases the fault could be blamed on the user (the pilots, the bank teller and the nurse) for making a mistake, but a well designed interface that doesn't cause serious consequences from mistakes that humans can easily make would be much better.
{panel end}

There are many elements that can be considered in usability, and we will mention a few that you are likely to come across when evaluating everyday interfaces. Bear in mind that the interfaces might not just be a computer – any digital device such as an alarm clock, air conditioning remote control, microwave oven, or burglar alarms can suffer from usability problems.

### Consistency

One "golden rule" of usability is *consistency*. If a system keeps changing on you, it's going to be frustrating to use. Earlier we had the example of a yes/no button pair that occasionally swapped places. A positive example is the consistent use of "control-C" and "control-V" in many different programs to copy and paste text or images. This also helps *learnability*: once you have learned copy and paste in one program, you know how to use it in many others. Imagine if every program used different menu commands and keystrokes for this!

A related issue is the [*Mode error*](http://en.wikipedia.org/wiki/Mode_error#Mode_errors), where the behaviour of an action depends on what mode you are in. A simple example is having the caps lock key down (particularly for entering a password, where you can't see the effect of the mode). A classic example is in Excel spreadsheets, where the effect of clicking on a cell depends on the mode: sometimes it selects the cell, and other times it puts the name of the cell you clicked on into another cell. Modes are considered bad practice in interface design because they can easily cause the user to make the wrong action, and should be avoided if possible.


### Response time
The speed at which an interface responds (its *reaction time*) has a significant effect on usability. This is closely related to human perception of time. If something happens fast enough, we will perceive it as being instant.

The following interactive lets you find out how fast "instant" is for you. As you click on each cell, there will sometimes be a random delay before it comes up; other cells won't have a delay. Click on each cell, and if it seems to respond instantly, leave it as it is. However, if you perceive that there is a small delay before the image comes up, click it again (which makes the cell a little lighter). You can't go back and change a cell, so just make a quick, gut-level decision the first time you click each one. The delay may be very short, but only make the cell gray if you are fairly sure you noticed a delay.

{interactive name="delay-analyser" type="whole-page"}

Once you have clicked on all the cells, click on the "Probability of perceiving delays" bar to see a graph of how often you thought there was a delay compared with how long the delay actually was. 100 ms is one tenth of a second; for most people this is where they are likely to start perceiving a delay; anything short (particularly around 50 ms) is very hard to notice. Longer delays (for example, 350 ms, which is over a third of a second) are very easy to notice.

The point of this is that any interface element (such as a button or checkbox) that takes more than 100 ms to respond is likely to be perceived by the user as not working, and they may even click it again. In the case of a checkbox, this may lead to it staying off (from the two clicks), leading the user to think that it's not working.

{interactive name="delayed-checkbox" type="in-page"}

So, as you evaluate interfaces, bear in mind that even very small delays can make a system hard to use.

The following video is of an experiment that was done with virtual reality goggles, to simulate Internet lag in real life situations. It is not in English, although has English captions and the most interesting content is in the imagery.

{video url="https://www.youtube.com/watch?v=_fNp37zFn9Q"}

### Human short term memory

Another important length of time to bear in mind is our *short term memory* time, which is usually a matter of seconds. To remember something for longer, the user needs to rehearse it (repeat it over) or make a note of the information, such as writing it down. If a system takes some time to respond (say, 10 seconds) then chances are the user may have forgotten some detail of what they were going to do with the system. For example, if you have a phone number to type in that someone has just told you, and it takes 12 seconds before you can type it, you may forget the number, whereas if you can access the interface within a couple of seconds, you can probably enter the number without much effort. For this reason, any part of a system that takes more than about 10 seconds to respond forces the user to rehearse or write down key information, which is more tiring.

{comment}
.. xtcb maybe put in 1 second dialogue  - in Jeff's book? or refer to http://www.nngroup.com/articles/response-times-3-important-limits/
{comment end}

### Human spatial memory

Another important usability consideration is *spatial memory* – our ability to remember where things are located (such as where a button or icon is). Human spatial memory has a high capacity (you can probably remember the location of many places and objects), it is long lasting (people visiting a town they grew up in can often remember the layout), and we can remember things very quickly. A very simple aspect of usability that comes from this is that the layout of an interface shouldn't keep changing. The interactive task at the start of this chapter was deliberately set up to be frustrating by swapping the two buttons occasionally; the reason people often make a mistake in that situation is that their spatial memory takes over, so the location of the button is more important than what is written on it. Systems that aren't consistent in their spatial placement of the "OK" and "Cancel" buttons can be frustrating.

Another place that the layout of an interface changes quickly is when a tablet or smartphone is rotated. Some devices rearrange the icons for the new orientation, which loses the spatial layout, while others keep them the same (except they may not look right in the new rotation). Try a few different devices and see which ones change the layout when rotated.

{panel type="curiosity" summary="Common situations where layouts unexpectedly change"}
There are a number of other situations where the layout can change suddenly for the user, and create confusion. Here are some examples:
- The layout may change if a data projector is plugged in and the screen resolution changes (which is particularly frustrating because the user may well be about to present to an audience, and they can't find an icon, with the added awkwardness that lots of people are waiting).
- If you upgrade to a different size device (such as a larger monitor or different smartphone) you may have to re-learn where everything is.
- Layouts often change with new versions of software (which is one reason that upgrading every time a new version comes out may not be the best plan).
- Using the same software on a different operating system may have subtly different layout (e.g. if someone who uses the Chrome browser all the time on Windows starts using Chrome under MacOS). This can be particularly frustrating because the location of common controls (close/maximise window, and even the control key on the keyboard) is different, which frustrates the user's spatial memory.
- The Microsoft Word "ribbon" was particularly frustrating for users when it came out for several of the reasons already mentioned -- the position of each item was quite different to the previous versions.
- Adaptive interfaces can also be a problem; it might seem like a good idea to gradually change a menu in a program so that the frequently used items are near the top, or unused items are hidden, but this can lead to a frustrating treasure hunt for the user as they can't rely on their spatial memory to find things.
{panel end}

Associated with spatial memory is our *muscle memory*, which helps us to locate items without having to look carefully. With some practice, you can probably select a common button with a mouse just by moving your hand the same distance that you always have, rather than having to look carefully. For example, working with a new keyboard can mean having to re-learn the muscle memory that you have developed, and so may slow you down a bit.

### Missing the button

One common human error that an interface needs to take account of is the *off by one error*, where the user accidentally clicks or types on an item next to the one they intended.
For example, if the "save" menu item is next to a "delete" menu item, that is risky because one small slip could cause the user to erase a file instead of saving it.
A similar issue occurs on keyboards; for example, control-W might close just one window in a web browser, and control-Q might close the entire web-browser, so choosing these two adjacent keys is a problem. Of course, this can be fixed by either checking if the user quits, or by having all the windows saved so that the user just needs to open the browser again to get their work back. This can also occur in web forms, where there is a reset button next to the submit button, and the off-by-one error causes the user to lose all the data they just entered.

{comment}
.. xjrm put in menu called "Actions", with "Order a pizza", "Launch nuclear attack", "Launch toy helicopter". Each just brings up a dialogue box saying "Pizza ordered" etc. immediately.
{comment end}

### Deliberately making tasks more challenging

Another idea used by HCI designers is the *principle of commensurate effort*, which says that frequently done simple tasks should be easy to do, but it's ok to require a complex procedure for a complex task. For example, in a word processor, printing a page as it is displayed should be easy, but it's ok if some effort is required to make it double sided, two to a page, with a staple in the top left corner. In fact, sometimes more effort should be *required* if the command has a serious consequence, such as deleting a file, wiping a device, or closing an account. In such cases artificial tasks may be added, such as asking "Are you sure?", or to get an extreme setting on a device (like setting a voltage for a power supply) might require pressing an "up" button many times, rather than letting the user type in an extra couple of zeroes.

### In summary

These are just a few ideas from HCI that will help you to be aware of the kinds of issues that interfaces can have.
In the following project you can observe these kinds of problems firsthand by watching *someone else* use an interface, noting any problems they have.
It's much easier to observe someone else than do this yourself, partly because it's hard to concentrate on the interface and taking notes at the same time, and partly because you might already know the interface and have learned to overcome some of the less usable features.

{panel type="project" summary="Cognitive walk-through"}
The *cognitive walkthrough* is a technique that HCI experts use to do a quick evaluation of an interface. [Details of how to do one are on the cs4fn site](http://www.cs4fn.org/usability/cogwalkthrough.php).

There is more information in the [Wikipedia entry for Cognitive Walkthrough](http://en.wikipedia.org/wiki/Cognitive_walkthrough).
{panel end}

## Usability Heuristics

{panel type="teacher-note" summary="HCI posters for your classroom!"}
A set of posters that support this section have been published by Jennifer Gottschalk. [These are available in PDF format here](files/hci-posters.pdf).
{panel end}

Evaluating an interface is best done by getting feedback from having lots of potential users try it out. However, this can be expensive and time-consuming, so HCI experts have come up with some quick rules of thumb that help us spot obvious problems quickly. The formal word for a rule of thumb is a *heuristic*, and in this section we will look at some common heuristics that can be used to critique an interface.

There are various sets of heuristics that people have proposed for evaluating interfaces, but a Danish researcher called Jakob Nielsen has come up with a set of 10 heuristics that have become very widely used, and we will describe them in this section. If you encounter a usability problem in an interface, it is almost certainly breaking one of these heuristics, and possibly a few of them. It's not easy to design a system that doesn't break any of the heuristics, and sometimes you wouldn't want to follow them strictly – that's why they are called heuristics, and not rules.

Often a confusing feature in an interface design will break multiple heuristics. For example, the following error message (it is for real) doesn't help users recover from errors (the real error is a network setting, but it is explained as causing a flashing light!), and the "Skip", "Cancel" and "Ignore" buttons don't speak the user's language (match between the system and the real world).

### Visibility of system status

*The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.*

This heuristic states that a user should be able to see what the device is doing (the system's status), at all times. This varies from the user being able to tell if the device is turned on or off, to a range of actions. A classic example is the "caps lock" key, which may not clearly show if it is on, and when typing a password the user might not know why it is being rejected; a positive example of this is when a password entry box warns you that the caps lock key is on.

One of the simplest statuses for a device is on or off, which is usually a coloured light on the outside of the computer. However, some devices take a while to show the status (for example, some DVD players take a while to respond when switched on), and the user might press the power button again or otherwise get confused about the status.

There are many tasks that users ask computers to do that require some time including copying documents, downloading files, and loading video games. In this situation, one of the most common ways to keep a user informed of the task is the progress bar.

{comment}
<div class="progress progress-striped active"><div class="progress-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 85%"><span class="sr-only">85% Complete</span></div></div>

TODO: James is going to look at this eventually.
{comment end}

{image filename="human-computer-interaction/windows-busy-cursor.gif" alt="An Windows busy cursor"}
{image filename="human-computer-interaction/apple-busy-cursor.gif" alt="An Apple busy cursor"}

However, progress indicators aren't always helpful; the spinning wheels above don't indicate if you are going to have to wait a few seconds or a few minutes (or even hours) for the task to complete, which can be frustrating.

Giving feedback in a "reasonable time" is really important, and the "reasonable time" is often shorter than what you might think. In the section above there was an experiment to find out at what point people perceive a delayed reaction; you probably found that it was around a tenth of a second. If a computer takes longer than that to respond then it can be confusing to use. There's more about this in the previous section.

{image filename="human-computer-interaction/xkcd-estimation.png" alt="The author of the Windows file copy dialog visits some friends, and struggles to decide what time he will arrive."}

From: http://xkcd.com/612/

There are some other important delay periods in interface evaluation: a delay of around 1 second is where natural dialogues start to get awkward, and around 10 seconds puts a lot of load on the user to remember what they were doing. Nielsen has an [article about the importance of these time periods](http://www.nngroup.com/articles/response-times-3-important-limits/). If you want to test these ideas, try having a conversation with someone where you wait 3 seconds before each response; or put random 10 second delays in when you're working on a task!

And if you haven't tried it already, have a go at the following interactive.

{interactive name="delay-analyser" type="whole-page"}

Getting computers to respond quickly often depends on the algorithms used (covered in the chapter on algorithms), and can also depend on the design of a program (such as whether it stores data on disk or waits for a network response before continuing). It is particularly noticeable on small devices like smartphones, which have limited computing power, and might take a second or two to open an app or respond to some input. It's not too hard to find these sorts of delays in systems when you're evaluating them.

### Match between system and the real world

*The system should speak the users' language, with words, phrases and concepts familiar to the user, rather than system-oriented terms. Follow real-world conventions, making information appear in a natural and logical order.*

The language, colours and notation in an interface should match the user's world, and while this seems obvious and sensible, it's often something that is overlooked. Take for example the following two buttons – can you see what is confusing about them?

{interactive name="confused-buttons" type="in-page"}

{panel type="teacher-note" summary="Answer to what is wrong with the buttons"}
The buttons have the colours switched, the colour for cancel is green (commonly used for go) and the colour for confirm is red (commonly used for stop or warning).
{panel end}

The following interface is from a bank system for paying another person. Suppose you get an email asking someone to pay you $1699.50 dollars for a used car; try entering "$1699.50" into the box.

{interactive name="payment-interface" type="in-page"}

The notation "$1699.50" is a common way to express a dollar amount, but this system forces you to follow its own conventions (probably to make things easier for the programmer who wrote the system).

Try find some other amounts which should be valid, but this system seems to reject. Ideally, the system should be flexible with the inputted text to prevent errors.

{panel type="spoiler" summary="Answers to above, try it before reading this!"}
The dialogue also rejects commas in the input e.g.  "1,000", even though they are a very useful way to read dollar amounts, e.g. it's hard to differentiate between 1000000 and 100000, yet this could make a huge difference! It also doesn't allow you to have a space before or after the number, yet if the number has been copied and pasted from an email, it might look perfectly alright. A less lazy programmer would allow for these situations; the current version is probably using a simple number conversion system that saves having to do extra programming...
{panel end}

### User control and freedom

*Users often choose system functions by mistake and will need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue. Support undo and redo.*

It is very frustrating to make a mistake and not be able to get out of it. It is particularly bad if one small action can wipe a lot of work that can't be recovered. The reset button on some web forms is infamous for this – it is often next to the submit button, and you can wipe all your data with an off-by-one error.

A common way to provide user freedom is an "undo" feature, which means that not only can mistakes be fixed easily, but the user is encouraged to experiment, trying out features of the interface secure in the knowledge that they can just "undo" to get back to how things were, instead of worrying that they'll end up in a state that they can't fix. If "redo" is also available, they can flick back and forth, deciding which is best. (In fact, redo is really an undo for undo!)

Here's an example of a button that doesn't provide user control; if you press it, you'll lose this whole page and have to find your way back (we warned you!)

{interactive name="close-window" type="in-page"}

{panel type="teacher-note" summary="We DID warn you..."}
Pressing the yes button below can be very frustrating! Most modern web browsers provide some user control and freedom in this case – if your students are frustrated at having pressed the button, the page will probably be in their history menu (and some browsers even have a function to restore the last page closed).
{panel end}

Sometimes the interface can force the user into doing something the user does not want to do. For example, it is quite common for operating systems or programs to perform updates automatically that require a restart. Sometimes the interface may not give them the opportunity to cancel or delay this, and restart nevertheless. This is bad if it happens when the user is just about to give a presentation.

Another common form of this problem is not being able to quit a system. A positive example is the "home" button on smartphones, which almost always stops the current app that is in use.

### Consistency and standards

*Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.*

Consistency (something being the same every time) is extremely useful for people using interfaces, and is sometimes called the "golden rule of HCI". If an interface is consistent with other interfaces then learning in one interface transfers directly to another. One of the biggest examples of consistency in computer programs is copy and paste, which works the same way in most software, so users only have to learn the concept once. The shortcut keys for copy and paste are also fairly consistent between programs. But in some software, copy/paste behaves differently, and this can be confusing for users.

An example of inconsistency is generally found within spreadsheet programs, where the result of pushing "control-A" (select all) depends on whether you are editing a cell or just have the cell selected (this particular problem is a 'mode' problem). While this may make sense to a user experienced with spreadsheets, a new user can be very confused when the same action causes a different response.

{image filename="human-computer-interaction/xkcd-standards.png"}

From: https://xkcd.com/927/

A lack of consistency is often the reason behind people not liking a new system. It is particularly noticeable between Mac and Windows user; someone who has only used one system can find the other very frustrating to use because so many things are different (consider the window controls for a start, which are in a different place and have different icons). An experienced user of one interface will think that it is "obvious", and can't understand why the other person finds it frustrating, which can lead to discussions of religious fervour on which interface is best. Similar problems can occur when a radically different version of an operating system comes out (such as Windows 8); a lot of the learning that has been done on the previous system needs to be undone, and the lack of consistency (i.e. losing prior learning) is frustrating.

### Error prevention

*Even better than good error messages is a careful design which prevents a problem from occurring in the first place. Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action.*

A computer program shouldn't make it easy for people to make serious errors. An example of error prevention found in many programs is a menu item on a toolbar or dropdown being 'greyed out' or deactivated. It stops the user from using a function that shouldn't be used in that situation, like trying to copy when nothing is selected. A good program would also inform the user why an item is not available (for example in a tooltip).

Below is a date picker; can you see what errors can be produced with it?

{interactive name="date-picker" type="in-page"}

{panel type="spoiler" summary="Some of the errors you might have observed"}
The date picker allows the user to choose invalid dates, such as Feb 30, or Nov 31. The three-menu date picker is hard to get right, because each menu item limits what can be in the others, but any can be changed. For example, you might pick 29 Feb 2008 (a valid date), then change the year to 2009 (not valid), then back to 2008. When 2009 was chosen the day number would need to change to 28 to prevent errors, but if that was just an accident and the user changes back to 2008, the number has now changed, and might not be noticed. It's preferable to use a more sophisticated date picker that shows a calendar, so the user can only click on valid dates (many websites will offer this). Date picking systems usually provide a rich example for exploring interface issues!
{panel end}

A related problem with dates is when a user needs to pick a start and end date (for example, booking flights or a hotel room); the system should prevent a date prior to the first date being selected for the second date.

Here's a menu system that offers several choices:

{interactive name="available-menu-items" type="in-page"}

Any time a dialogue box comes up that says you weren't allowed to do a certain action, it's frustrating because the system has failed to prevent an error. Of course, it may be difficult to do that because the error can depend on so many user choices, but it is ideal that the system doesn't offer something that it can't do.

Another example of preventing errors is an automatic teller machine (ATM) that can only dispense, say, $20 notes.
If it allows you to enter any amount (such as $53.92, or even $50) then an error would be quite likely.
What techniques have you seen used in ATM software to prevent this kind of error?

{panel type="teacher-note" summary="ATM error prevention"}
Some ATMs make it impossible to enter an incorrect amount by only offering fixed amounts for withdrawal, and/or having buttons such as +$20 and -$20.
Searching the web for images of "ATM enter amount" might produce some reminders of various ways interfaces deal with this problem (or cause it!)
Entering an amount for a *deposit* is different of course, because it could be any amount, so that is likely to use a different interface,
which helps with error prevention, but now reduces consistency!
{panel end}

And here's another example, this time with a computer science slant: the following calculator has a binary mode, where it does calculations on binary numbers.
The trouble is that in this mode you can still type in decimal digits, which gives an error when you do the calculation.
A user could easily not notice that it's in binary mode, and the error message isn't particularly helpful!

{image filename="human-computer-interaction/binary-calculator.png" alt="A calculator in binary mode that still allows you to type in digits other than 0 and 1, but complains later."}

### Recognition rather than recall

*Minimize the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the dialogue to another. Instructions for use of the system should be visible or easily retrievable whenever appropriate.*

Humans are generally very good at recognising items, but computers are good at remembering them accurately. A good example of this is a menu system; if you click on the "Edit" menu in a piece of software, it will remind you of all the editing tasks available, and you can choose the appropriate one easily.
If instead you had to type in a command from memory, that would put more load on the user.
In general it's good for the computer to "remember" details, and the user to be presented with options rather than having to remember them.
The exception is a system that is used all the time by an expert who knows all the options; in this case entering commands directly can sometimes be more flexible and faster than having to select from a list.

For example, when you type in a place name in an online map, the system might start suggesting names based on what you're typing, and probably adapted to focus on your location or past searches.
The following image is from Google maps, which suggests the name of the place you may be trying to type (in this case, the user has only had to type 4 letters, and the system saves them from having the recall the correct spelling of "Taumatawhakatangihangakoauauotamateapokaiwhenuakitanatahu" because they can then select it.)
A similar feature in web browsers saves users from having to remember the exact details of a URL that they have used in the past; a system that required you to type in place names exactly before you could search for them could get rather frustrating.

{image filename="recognition-place-names.png" alt="Map predicting possible place names"}

### Flexibility and efficiency of use

*Accelerators -- unseen by the novice user -- may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users. Allow users to tailor frequent actions.*

When someone is using software every day, they soon have common sequences of operations they do (such as "Open the file, find the next blank space, put in a record of what just happened"). It's good to offer ways to make this quick to do, such as "macros" which do a sequence of actions from a single keystroke.

Similarly, it's good to be able to customise software by allocating keystrokes for frequent actions (such as "file this email in the 'pending' folder").
Common tasks like copy and paste usually have keystrokes added to them, and these allow experienced users to perform the task without having to reach for a mouse.

{comment}
.. xtcb put in more examples/images
.. xtcb talk about learnability - moving from novice to experienced
{comment end}

### Aesthetic and minimalist design

*Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.*

Software can contain many features, and if they are all visible at the same time (for example, on a toolbar), this can be overwhelming, especially for a new user.

TV remote controls often provide a great example of a complicated interface.
One reason that the have so many buttons is that it can help to make the device look impressive in the shop, but once you get it home, many of the buttons become redundant or confusing.
{image filename="remote-complex.jpg" alt="A complex remote control." position="right"}
The remote control shown here has several buttons that could potentially do the same thing: "Direct Navigator", "Guide", "Function Menu", "Status" and "Option" all give access to different functions, but it's hard to predict which is which.
This remote has about 55 buttons altogether!

{image filename="remote-simple.jpg" alt="A simple remote control." position="left"}
In contrast, the Apple remote has very few buttons, and is a good example of a minimalist interface.
There's only one "Menu" to choose, so it's fairly obvious what to do to select the controls needed.
Of course, the simple remote relies on displaying menus on the screen, and these have the potential to make things more complicated.

{image filename="remote-adapted.jpg" alt="An adapted remote control." position="right"}
The third remote control shows a solution for simplifying it to save the user from having to read extensive manual information.
It's a bit drastic, but it might save the user from getting into modes that they can't get out of!
Some people have reported removing keys from mobile phones, or gluing buttons in place, so that the user can't get the device into a state that they shouldn't.
Some controls try to offer the best of both worlds by having a small flap that can be opened to reveal more functionality.

{panel type="curiosity" summary="Scary interfaces"}
The following site identified some of the "scariest" interfaces around, some of which are great examples of *not* having minimalist design:  [OK/Cancel scariest interface](http://okcancel.com/archives/article/2005/11/the-scariest-interface-part-ii.html).

Cartoonist [Roz Chast](http://rozchast.com/) illustrates how scary a remote control can be with her cartoon
["How Grandma sees the remote"](http://www.art.com/products/p15063313199-sa-i6845922/roz-chast-how-grandma-sees-the-remote-new-yorker-cartoon.htm).
{panel end}



### Help users recognize, diagnose, and recover from errors

*Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.*

It’s not hard to find error messages that don’t really tell you what’s wrong!
The most common examples are messages like "Misc error", "Error number -2431", or "Error in one of the input values". These force the user to go on a debugging mission to find out what went wrong, which could be anything from a disconnected cable or unfixable compatibility issue, to a missing digit in a number.

For example, some troubleshooting software produced the "unexpected" error below.
The error message is particularly unhelpful because the software was supposed to help with finding problems, but instead it has given the user a new problem to solve!
There is some extra information not shown below such as "Path: Unknown" and "Error code: 0x80070002".
Searching for the error code can lead to suggested solutions, but it also leads to scam software that claims to fix the problem.
By not giving useful error recovery information, the system has put the user at the mercy of the advice available online!

{image filename="error-vague.png" alt="Vague error message: An unexpected error has occurred."}

A variant of unhelpful error messages is one that gives two alternatives, such as "File may not exist, or it may already be in use".
A better message would save the user having to figure out which of these is the problem.

A positive example can be found in some alarm clocks such as the following one on an Android smartphone.
For example, here the alarm time is shown at "9:00".
In a country that uses 12-hour time, a user might mistake this for 9pm, and the alarm would go off at the wrong time.
{image filename="Android-alarm-9am.png" alt="Android alarm clock set for 9:00."}

However, the interface provides an opportunity to notice it because the display indicates how long it will be until the alarm will go off, making it easier to recognize the error of selecting the wrong time (or day).
{image filename="Android-alarm-message.png" alt="Android alarm clock message showing how long until the alarm will trigger."}


### Help and documentation

Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user's task, list concrete steps to be carried out, and not be too large. The following interactive illustrates a situation you might have run into before!

{interactive name="no-help" type="in-page"}

Often help is an afterthought, and tends to be feature-centred (e.g. a catalogue of menu items), rather than task-centred (the series of actions needed to complete typical tasks, which is more useful for the user). When a user needs help, they typically have a task to complete (such as upload photos from a camera), and good documentation should explain how to do common tasks, rather than explain each feature (such as "Setting the camera to USB mode").

### To find out more about heuristics

You can find more information about the [heuristics online on Jakob Nielsen's website](http://www.nngroup.com/articles/ten-usability-heuristics/).

## The whole story!

In this chapter we've mainly looked at how to critique interfaces, but we haven't said much about how to design good interfaces. That's a whole new problem, although being able to see what's wrong with an interface is a key idea. Many commercial systems are tested using the ideas above to check that people will find them easy to use; in fact, before releasing a new application, often they are tested many times with many users.
Improvements are made, and then more tests need to be run to check that the improvements didn't make some other aspect of the interface worse!
It's no wonder that good software can be expensive – there are many people and a lot of time involved in making sure that it's easy to use before it's released.

There are many other ideas from psychology, physiology, sociology and even anthropology that HCI experts must draw on. Things that come into play include
[Mental models](http://en.wikipedia.org/wiki/Mental_model), about how someone believes a system works compared with how it actually works (these are almost never the same e.g. double clicking on an icon that only needs to be single clicked),
[Fitts's law](http://en.wikipedia.org/wiki/Fitts's_law), about how long it takes to point to objects on a screen (such as clicking on a small button),
the [Hick-Hyman law](http://en.wikipedia.org/wiki/Hick's_law), about how long it takes to make a decision between multiple choices (such as from a menu),
[Miller's law](http://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two) about the number of items a person can think about at once,
[affordances](http://en.wikipedia.org/wiki/Affordance), about how properties of an object help us to perform actions on them,
[interaction design (IxD)](http://en.wikipedia.org/wiki/Interaction_design), about creating digital devices that work for the people who will use the product,
[the NASA TLX (Task Load Index)](http://en.wikipedia.org/wiki/NASA-TLX) for rating the perceived workload that a task puts on a user,
and many more laws, observations and guidelines about designing interfaces that take account of human behaviour and how the human body functions.

{comment}
.. xtcb check with HCI group; could add above: the `Sapir-Whorf hypothesis <http://en.wikipedia.org/wiki/Linguistic_relativity>`, about how the structure of language affects one's view of the world,
{comment end}

### Further reading

- The book "Designing with the mind in mind" by Jeff Johnson provides excellent background reading for many of the issues discussed in this chapter

- The [cs4fn website has a lot of articles and activities on Human Computer Interaction](http://www.cs4fn.org/fundamentals/hci.php), such as [problems around reporting interface problems](http://www.cs4fn.org/chi-med/reportingincidents.php), [cultural issues in interface design](http://www.cs4fn.org/usability/tzeltal.php), and [The importance of Sushi](http://www.cs4fn.org/usability/importanceofsushi.php).

- A classic book relating to usability is "The psychology of everyday things" (later changed to "The design of everyday things") by Don Norman. It's about everyday objects like doors and phones, and it was written a while ago, but it contains lots of thought provoking and often humorous examples.

### Useful Links

- [The ten usability heuristics on Nielsen's website](http://www.nngroup.com/articles/ten-usability-heuristics/), and a [collection of articles about usability heuristics](http://www.nngroup.com/topic/heuristic-evaluation/)
-  There is a [CS Unplugged activity on HCI](http://csunplugged.org/sites/default/files/activity_pdfs_full/unplugged-19-human_interface_design_0.pdf) which includes background information
- There is [extensive material on HCI on the cs4fn website](http://www.cs4fn.org/fundamentals/hci.php)
- A [glossary of usability terms](http://www.usabilityfirst.com/glossary/)

{comment}
.. xjrm everything from here down seems to be raw material; i should go through it sometime(!) but can you either comment it out easily? otherwise put it somewhere else with a link here so its easy to find? -tim

.. xtcb put material from here into body of text/teacher notes

  Ideas for material:
  Think aloud process: Observer needs to press the participant to explain their process. Can be embarrassing, and easy to get flustered.
  Co-operative experiment: 2 people and the process turns to a dialogue and they become critical of the process.
{comment end}
