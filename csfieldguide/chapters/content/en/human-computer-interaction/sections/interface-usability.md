# Interface usability

{panel type="teacher-note"}

# Some of the key learning objectives of this chapter

Key ideas that students should be picking up include:

- The "system" that has to work well is the computer and the human *together*.
- Many people get frustrated with digital devices.
  Sometimes they will put up with it because it’s the only option, but in other cases devices and software with good interfaces sell much better or can be priced higher because they help the user get their job done.
- The worst person to evaluate an interface is the person who designed it.
  They know exactly how it should work; but if someone else tries it you’ll find out how it looks to a typical user (for this reason the projects here aren't about having a student write their own program and evaluate its interface – that would be evidence that they don’t understand HCI evaluation!)
- An interface is used to do a task, so it makes the most sense to identify the tasks that a particular interface is for, and then consider how difficult those tasks are using that interface.
  The common mistake is to focus on features of an interface, but in the real world the question is whether or not those features can be used to do a task from beginning to end.

{panel end}

Devices are often sold using catch phrases like "user friendly" and "intuitive", but these are vague terms that are hard to pin down.
In this section we will use the more technical term, [Usability](https://en.wikipedia.org/wiki/Usability), which is well understood by HCI experts, and gives us some ways to evaluate how suitable an interface is for a particular task.
Usability isn't just about an interface being nice to use: poor usability can lead to serious problems, and has been the cause of major disasters, such as airplane crashes, financial disasters, and medical mishaps.
It is also important because an interface that requires a lot of dexterity, quick reactions or a good memory makes it less accessible to much of the population, when accessibility can be both a moral and legal expectation.

{panel type="curiosity"}

# When interface design goes horribly wrong

- 87 people were killed when [Air Inter Flight 148 crashed](https://en.wikipedia.org/wiki/Air_Inter_Flight_148) due to the pilots entering "33" to get a 3.3 degree descent angle, but the same interface was used to enter the descent rate, which the autopilot interpreted as 3,300 feet per minute.
  This interface problem is called a "mode error" (described later).
  There is more information [here](http://blog.martindoms.com/2011/01/24/poor-ui-design-can-kill/).
- 13 people died and many more were injured when the pilots of [Varig Flight 254](https://en.wikipedia.org/wiki/Varig_Flight_254) entered an incorrect heading.
  The flight plan had specified a heading of 0270, which the captain interpreted and entered into the flight computer as 270 degrees.
  What it actually meant was 027.0 degrees.
  This confusion came about due to the format of headings and the position of the decimal point on flight plans being changed without him knowing.
  Unfortunately, the co-pilot mindlessly copied the captain's heading instead of reading it off the flight plan like he was supposed to.
  The plane then cruised on autopilot for a few hours.
  Unfortunately, [confirmation bias](https://en.wikipedia.org/wiki/Confirmation_bias) got the better of the pilots who were convinced they were near their destination, when in fact they were hundreds of miles away.
  The plane ran out of fuel and crash landed in the Amazon Jungle.
  Designing aircraft systems which work for humans is a big challenge, and is a part of the wider area of human factors research.
- A bank employee [accidentally gave a customer a loan of $10 million instead of $100,000](http://edition.cnn.com/2012/08/24/world/asia/new-zealand-accidental-millionaire-sentenced/).
  The customer withdrew most of the money and fled to Asia, the bank lost millions of dollars in the process, and the teller concerned would have had a traumatic time just because of a typing error.
  The error was due to the employee typing in two extra zeroes, apparently because some interfaces automatically put in the decimal point (you could type 524 to enter $5.24), and others didn't.
  This error can be explained in terms of a lack of consistency in the interface, causing a mode error.
- A 43-year old woman suffered respiratory arrest after a nurse accidentally entered 5 instead of 0.5 for a dose rate for morphine.
  The interface should have made it difficult to make an error by a factor of 10.
  There is a [paper about it](http://www.ncbi.nlm.nih.gov/pubmed/16738293), and an [article about the interface problem](http://hrcak.srce.hr/file/95851).
  Similar problems can occur in any control system where the operator types in a value; a better interface would force the operator to press an "up" and "down" button, so big changes take a lot of work (this is an example of an "off by one error", where one extra digit is missed or added, and also relates to the principle of commensurate effort).

In all these cases the fault could be blamed on the user (the pilots, the bank teller and the nurse) for making a mistake, but a well designed interface that doesn't cause serious consequences from mistakes that humans can easily make would be much better.

{panel end}

There are many elements that can be considered in usability, and we will mention a few that you are likely to come across when evaluating everyday interfaces.
Bear in mind that the interfaces might not just be a computer – any digital device such as an alarm clock, air conditioning remote control, microwave oven, or burglar alarms can suffer from usability problems.

## Consistency

A "golden rule" of usability is *consistency*.
If a system keeps changing on you, it's going to be frustrating to use.
Earlier we had the example of a "Even"/"Odd" button pair that occasionally swapped places.
A positive example is the consistent use of "control-C" and "control-V" in many different programs to copy and paste text or images.
This also helps *learnability*: once you have learned copy and paste in one program, you know how to use it in many others.
Imagine if every program used different menu commands and keystrokes for this!

A related issue is the [*Mode error*](https://en.wikipedia.org/wiki/Mode_error#Mode_errors), where the behaviour of an action depends on what mode you are in.
A simple example is having the caps lock key down (particularly for entering a password, where you can't see the effect of the mode).
A classic example is in Excel spreadsheets, where the effect of clicking on a cell depends on the mode: sometimes it selects the cell, and other times it puts the name of the cell you clicked on into another cell.
Modes are considered bad practice in interface design because they can easily cause the user to make the wrong action, and should be avoided if possible.

## Response time

The speed at which an interface responds (its *reaction time*) has a significant effect on usability.
The way that humans perceive time isn't always proportional to the time taken.
If something happens fast enough, we will perceive it as being instant.
If we have to wait and can't do anything while waiting, time can appear to go slower!

The following interactive lets you find out how fast "instant" is for you.
As you click on each cell, there will sometimes be a random delay before it comes up; other cells won't have a delay.
Click on each cell, and if it seems to respond instantly, leave it as it is.
However, if you perceive that there is a small delay before the image comes up, click it again (which makes the cell green).
Just make a quick, gut-level decision the first time you click each cell &ndash; don't overthink it.
The delay may be very short, but only make the cell green if you are fairly sure you noticed a delay.

{interactive slug="delay-analyser" type="whole-page" text="Delay Analyser interactive"}

Once you have clicked on all the cells, click on "View statistics" to see how long the delays were compared with your perception.
100 ms (100 milliseconds) is one tenth of a second; for most people this is where they are likely to start perceiving a delay;
anything shorter (particularly around 50 ms) is very hard to notice.
Longer delays (for example, 350 ms, which is over a third of a second) are very easy to notice.

The point of this is that any interface element (such as a button or checkbox) that takes more than 100 ms to respond is likely to be perceived by the user as not working, and they may even click it again.
In the case of a checkbox, this may lead to it staying off (from the two clicks), making the user think that it's not working.
Try clicking the following checkbox just enough times to make it show as selected.

{interactive slug="delayed-checkbox" type="in-page"}

So, as you evaluate interfaces, bear in mind that even very small delays can make a system hard to use.

The following video is of an experiment that was done with virtual reality goggles to simulate Internet lag in real life situations.
It has English captions, but the most interesting part is what is happening in the action.

{video url="https://www.youtube.com/watch?v=_fNp37zFn9Q"}

## Human short term memory

Another important length of time to bear in mind is our *short term memory* time, which is usually a matter of seconds.
To remember something for longer, the user needs to rehearse it (repeat it over) or make a note of the information, such as writing it down.
Try the interactive below and see how many items you can remember without using these techniques!

{interactive slug="picture-memory" type="whole-page"}

If a system takes some time to respond (say, 10 seconds) then chances are the user may have forgotten some detail of what they were going to do with the system.
For example, if you have a phone number to type in that someone has just told you, and it takes 12 seconds before you can type it, you may forget the number, whereas if you can access the interface within a couple of seconds, you can probably enter the number without much effort.
For this reason, any part of a system that takes more than about 10 seconds to respond forces the user to rehearse or write down key information, which is more tiring.

There's some more information about "time limits" for interfaces in [this article by Jakob Nielsen](http://www.nngroup.com/articles/response-times-3-important-limits/).


## Human spatial memory

Another important usability consideration is *spatial memory* – our ability to remember where things are located (such as where a button or icon is).
Human spatial memory has a high capacity (you can probably remember the location of many places and objects), it is long lasting (people visiting a town they grew up in can often remember the layout), and we can remember things very quickly.
A very simple aspect of usability that comes from this is that the layout of an interface shouldn't keep changing.
The interactive task at the start of this chapter was deliberately set up to be frustrating by swapping the two buttons occasionally; the reason people often make a mistake in that situation is that their spatial memory takes over, so the location of the button is more important than what is written on it.
Systems that aren't consistent in their spatial placement of the "OK" and "Cancel" buttons can easily cause people to press the wrong one.

Another place that the layout of an interface changes quickly is when a tablet or smartphone is rotated.
Some devices rearrange the icons for the new orientation, which loses the spatial layout, while others keep them the same (except they may not look right in the new rotation).
Try a few different devices and see which ones change the layout when rotated.

{panel type="curiosity"}

# Common situations where layouts unexpectedly change

There are a number of other situations where the layout can change suddenly for the user, and create confusion.
Here are some examples:

- The layout may change if a data projector is plugged in and the screen resolution changes (which is particularly frustrating because the user may well be about to present to an audience, and they can't find an icon, with the added awkwardness that lots of people are waiting).
- If you upgrade to a different size device (such as a larger monitor or different smartphone) you may have to re-learn where everything is.
- Layouts often change with new versions of software (which is one reason that upgrading every time a new version comes out may not be the best plan).
- Using the same software on a different operating system may have subtly different layout (e.g. if someone who uses the Chrome browser all the time on Windows starts using Chrome under MacOS).
  This can be particularly frustrating because the location of common controls (close/maximise window, and even the control key on the keyboard) is different, which frustrates the user's spatial memory.
- The Microsoft Word "ribbon" was particularly frustrating for users when it came out for several of the reasons already mentioned -- the position of each item was quite different to the previous versions.
- Adaptive interfaces can also be a problem; it might seem like a good idea to gradually change a menu in a program so that the frequently used items are near the top, or unused items are hidden, but this can lead to a frustrating treasure hunt for the user as they can't rely on their spatial memory to find things.

{panel end}

Associated with spatial memory is our *muscle memory*, which helps us to locate items without having to look carefully.
With some practice, you can probably select a common button with a mouse just by moving your hand the same distance that you always have, rather than having to look carefully.
Working with a new keyboard can mean having to re-learn the muscle memory that you have developed, and so may slow you down a bit or cause you to press the wrong keys.

## Missing the button

One common human error that an interface needs to take account of is the *off by one error*, where the user accidentally clicks or types on an item next to the one they intended.
For example, if the "save" menu item is next to a "delete" menu item, that is risky because one small slip could cause the user to erase a file instead of saving it.
A similar issue occurs on keyboards; for example, control-W might close just one window in a web browser, and control-Q might close the entire web-browser, so choosing these two adjacent keys is a problem.
Of course, this can be fixed by either checking if the user quits, or by having all the windows saved so that the user just needs to open the browser again to get their work back.
This can also occur in web forms, where there is a reset button next to the submit button, and the off-by-one error causes the user to lose all the data they just entered.

{interactive slug="off-by-one" type="in-page"}

## Deliberately making tasks more challenging

Another idea used by HCI designers is the *principle of commensurate effort*, which says that frequently done simple tasks should be easy to do, but it's ok to require a complex procedure for a complex task.
For example, in a word processor, printing a page as it is displayed should be easy, but it's ok if some effort is required to make it double sided, two to a page, with a staple in the top left corner.
In fact, sometimes more effort should be *required* if the command has a serious consequence, such as deleting a file, wiping a device, or closing an account.
In such cases artificial tasks may be added, such as asking "Are you sure?", or to get an extreme setting on a device (like setting a voltage for a power supply) might require pressing an "up" button many times, rather than letting the user type in an extra couple of zeroes.

{interactive slug="action-menu" type="in-page"}

## In summary

These are just a few ideas from HCI that will help you to be aware of the kinds of issues that interfaces can have.
In the following project you can observe these kinds of problems firsthand by watching *someone else* use an interface, noting any problems they have.
It's much easier to observe someone else than do this yourself, partly because it's hard to concentrate on the interface and take notes at the same time, and partly because you might already know the interface and have learned to overcome some of the less usable features.

{panel type="project"}

# Think aloud protocol

In a think aloud protocol, you observe someone else using the interface that you want to evaluate, and encourage them to explain what they're thinking at each step.
You'll take notes on what they say, and you can reflect on that afterwards to evaluate the interface (it can be helpful to record the session if possible.)

This protocol gives insights into what might be confusing in an interface, and why.

For example, if someone setting an alarm clock says "I'm pressing the up button until I get to 7am &ndash; oh bother, it stopped at 7:09, now I have to go right around again", that gives some insight into how the interface might get in the way of the users completing a task efficiently.

This approach is focussed on observing a user doing a particular *task*, to capture what happens in reality when people use an interface.
*Tasks* are often confused with *features*; you use the features of a device to accomplish a task.
For example, a camera might have a feature of taking multiple photos quickly, but a relevant task is more likely to be to "take a photo of an action event, choose the best photo, and share it".
This could involve a number of user actions: getting into the multi-photo mode, configuring the camera for the lighting conditions, taking the photos, choosing the best one, connect to a computer, transfer the photo to a website, and share it with friends.

The project will be more interesting if your helper isn't completely familiar with the system, or if it's a system that people often find confusing or frustrating.
Your writeup could be used to make decisions about improving the system in the future.

The task could be things like setting the time on a clock, finding a recently dialled number on an unfamiliar phone, or choosing a TV program to record.

To do the evaluation, you should give the device to your helper, explain the task to them, and ask them to explain what they are thinking at each step.
Your helper may not be used to doing that, so you can prompt them as they go with questions like:

- What are you going to do now? Why?
- Why did you choose that button?
- What are you looking for?
- Are you having difficulty? What's the problem?
- Can you see what went wrong?
- How are you feeling about this?

If they get the hang of "thinking aloud", just keep quiet and take notes on what they say.

It's very important not to criticise or intimidate the helper!
If they make a mistake, try to figure out how the interface made them do the wrong thing, rather than blaming them.
Any mistakes they make are going to be valuable for your project!
If they get everything right, it won't be very interesting.

Once you've noted what happened, go over it, looking for explanations for where the user had difficulty.
The examples earlier in the chapter will help you to be sensitive to how interfaces can frustrate the user, and find ways that they could be improved.

There's some [more information about think-aloud protocols on Wikipedia](https://en.wikipedia.org/wiki/Think_aloud_protocol), on [Nielsen's web site](https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/), and [some notes put together by HCI students](http://www.psy.gla.ac.uk/~steve/HCI/cscln/trail1/Lecture5.html).

{panel end}

{panel type="project"}

# Cognitive walk-through

Another way of evaluating an interface is a "Cognitive Walkthrough".
This is normally done without involving someone else, although the description here has been adapted to involve another user to make it a bit easier if you're not experienced at HCI evaluation.
The *cognitive walkthrough* is a technique that HCI experts use to do a quick evaluation of an interface.
It is particularly useful for evaluating interfaces with few steps, that are being used by new or occasional users (such as someone using a car park ticket machine at an airport, setting an alarm clock in a hotel room, or using a museum display).

The first step is to choose a typical task that someone might do with the interface being evaluated (such as get a 2-hour ticket, set the alarm for 5:20am, or find out where a particular display is in a museum).

The goal of the cognitive walkthrough is to identify if the user can see what to do at each step, and especially to notice if there is anything that is confusing or ambiguous (like which button to press next), and to find out if they're confident that the right thing happened.

An experienced HCI evaluator would do this on their own, imagining what a user would do at each step, but it may be easier for you to do this with someone else using the interface, because that lets you see the interface through someone else's eyes.
So we recommend asking a friend to go through a task for you.

The task only needs to have about 3 or 4 steps (e.g. button presses), as you'll be asking three questions at each step and taking notes on their responses, so it could take a while.
You should know how to do the task yourself as we'll be focussing on the few steps needed to accomplish the task; if the user goes off track, you can put them back on task rather than observe them trying to recover from an HCI problem that shouldn't have been there in the first place.
The task might be something like recording a 10-second video on a mobile phone, deleting a text message, or setting a microwave oven to reheat food for 45 seconds.

Present the interface to your helper without giving any instructions on using it, and tell them what the goal of the task is.
Before they take any action, ask: "*Do you know what to try to do at this step?*"
Then have them look at the interface, and ask: "*Can you see how to do it?*"
Then have them take the action they suggested, and ask: "*Are you able to tell that you did the right thing?*"

If their decisions go off track, you can reset the interface, and start over, explaining what to do for the step they took wrong if necessary (but noting that this wasn't obvious to them — it will be a point to consider for improving the interface.)

Once the first action has been completed, repeat this with the next action required (it might be pressing a button or adjusting a control).
Once again, ask the three questions above in the process.

In practice the second question (can you see how to do it?) is usually split into two: do they notice the control at all, and if so, do they realise that it's the one that is needed?
For this exercise we'll simplfy it to just one question.

[More details of how to do a cognitive walkthrough are on the cs4fn site](http://www.cs4fn.org/usability/cogwalkthrough.php).

There is also more information in the [Wikipedia entry for Cognitive Walkthrough](https://en.wikipedia.org/wiki/Cognitive_walkthrough).

{panel end}
