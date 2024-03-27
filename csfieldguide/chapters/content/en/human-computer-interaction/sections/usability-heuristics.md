# Usability heuristics

{panel type="teacher-note"}

# HCI posters for your classroom!

A set of posters that support this section have been published by Jennifer Gottschalk.
These are available in PDF format here:

{button-link link="files/HCI-posters.pdf" file="yes" text="Download HCI Posters"}

{panel end}

Evaluating an {glossary-link term="interface"}interface{glossary-link end} is best done by getting feedback from having lots of potential users try it out.
However, this can be expensive and time-consuming, so HCI experts have come up with some quick rules of thumb that help us spot obvious problems quickly.
The formal word for a rule of thumb is a {glossary-link term="heuristic"}heuristic{glossary-link end}, and in this section we will look at some common heuristics that can be used to critique an interface.

There are various sets of heuristics that people have proposed for evaluating interfaces, but a Danish researcher called Jakob Nielsen has come up with a set of 10 heuristics that have become very widely used, and we will describe them in this section.
If you encounter a usability problem in an interface, it is almost certainly breaking one of these heuristics, and possibly a few of them.
It's not easy to design a system that doesn't break any of the heuristics, and sometimes you wouldn't want to follow them strictly &ndash; that's why they are called heuristics, and not rules.

{interactive slug="confusing-error" type="in-page"}

Often a confusing feature in an interface design will break multiple heuristics.
For example, the above error message (it is genuinely real) doesn't help users recover from errors (the real error is a network setting, but it is explained as causing a flashing light!), and the "Skip", "Cancel" and "Ignore" buttons don't speak the user's language (match between the system and the real world).

## Visibility of system status

*The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.*

This heuristic states that a user should be able to see what the device is doing (the system's status), at all times.
This varies from the user being able to tell if the device is turned on or off, to a range of actions.
A classic example is the "caps lock" key, which may not clearly show if it is on, and when typing a password the user might not know why it is being rejected; a positive example of this is when a password entry box warns you that caps lock is on.

One of the simplest statuses for a device is on or off, which is usually a coloured light on the outside of the computer.
However, some devices take a while to show the status (for example, some DVD players take a while to respond when switched on), and the user might press the power button again or otherwise get confused about the status.

There are many tasks that users ask computers to do that require some time including copying documents, downloading files, and loading video games.
In this situation, one of the most common ways to keep a user informed of the task is the progress bar.

{image file-path="img/chapters/windows-busy-cursor-animation.gif" alt="A Windows busy cursor" alignment="right"}

{image file-path="img/chapters/apple-busy-cursor-animation.gif" alt="An Apple busy cursor" alignment="right"}

However, progress indicators aren't always helpful; the spinning wheels here don't indicate if you are going to have to wait a few seconds or a few minutes (or even hours) for the task to complete, which can be frustrating.

Giving feedback in a "reasonable time" is really important, and the "reasonable time" is often shorter than what you might think.
Earlier there was an experiment to find out at what point people perceive a delayed reaction; you probably found that it was around a tenth of a second.
If a computer takes longer than that to respond then it can be confusing to use.
There's more about this in the previous section.

{image file-path="img/chapters/xkcd-estimation.png" hover-text="They could say 'the connection is probably lost', but it's more fun to do naive time-averaging to give you hope that if you wait around for 1,163 hours, it will finally finish." alt="The author of the Windows file copy dialog visits some friends, and struggles to decide what time he will arrive." source="https://xkcd.com/612/"}

There are some other important delay periods in interface evaluation: a delay of around 1 second is where natural dialogues start to get awkward, and around 10 seconds puts a lot of load on the user to remember what they were doing.
Nielsen has an [article about the importance of these time periods](http://www.nngroup.com/articles/response-times-3-important-limits/).
If you want to test these ideas, try having a conversation with someone where you wait 3 seconds before each response; or put random 10 second delays in when you're working on a task!

And if you haven't tried it already, have a go at the following interactive.

{interactive slug="delay-analyser" type="whole-page" text="Delay Analyser interactive"}

Getting computers to respond quickly often depends on the algorithms used (covered in the chapter on algorithms), and can also depend on the design of a program (such as whether it stores data on disk or waits for a network response before continuing).
It is particularly noticeable on small devices like smartphones, which have limited computing power, and might take a second or two to open an app or respond to some input.
It's not too hard to find these sorts of delays in systems when you're evaluating them.

## Match between system and the real world

*The system should speak the users' language, with words, phrases and concepts familiar to the user, rather than system-oriented terms.
Follow real-world conventions, making information appear in a natural and logical order.*

The language, colours and notation in an interface should match the user's world, and while this seems obvious and sensible, it's often something that is overlooked.
Take for example the following two buttons &ndash; can you see what is confusing about them?

{interactive slug="confused-buttons" type="in-page"}

{panel type="teacher-note"}

# Answer to what is wrong with the buttons

The buttons have the colours switched, the colour for cancel is green (commonly used for go) and the colour for confirm is red (commonly used for stop or warning).

{panel end}

The following interface is from a bank system for paying another person.
Suppose you send an email asking someone to pay you $1699.50 for a used car; try entering "$1699.50" into the box.

{interactive slug="payment-interface" type="in-page"}

The notation "$1699.50" is a common way to express a dollar amount, but this system forces you to follow its own conventions (probably to make things easier for the programmer who wrote the system).

Try find some other amounts which should be valid, but this system seems to reject.
Ideally, the system should be flexible with the inputted text to prevent errors.

{panel type="spoiler"}

# Answers to above, try it before reading this!

The dialogue also rejects commas in the input e.g.  "1,000", even though they are a very useful way to read dollar amounts, e.g. it's hard to differentiate between 1000000 and 100000, yet this could make a huge difference!
It also doesn't allow you to have a space before or after the number, yet if the number has been copied and pasted from an email, it might look perfectly alright.
A less lazy programmer would allow for these situations; the current version is probably using a simple number conversion system that saves having to do extra programming...

{panel end}

## User control and freedom

*Users often choose system functions by mistake and will need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue.
Support undo and redo.*

It is very frustrating to make a mistake and not be able to get out of it.
It is particularly bad if one small action can wipe a lot of work that can't be recovered.
The reset button on some web forms is infamous for this &ndash; it is often next to the submit button, and you can wipe all your data with an off-by-one error.

A common way to provide user freedom is an "undo" feature, which means that not only can mistakes be fixed easily, but the user is encouraged to experiment, trying out features of the interface secure in the knowledge that they can just "undo" to get back to how things were, instead of worrying that they'll end up in a state that they can't fix.
If "redo" is also available, they can flick back and forth, deciding which is best.
(In fact, redo is really an undo for undo!)

Here's an example of a button that doesn't provide user control; if you press it, you'll lose this whole page and have to find your way back (we warned you!)

{interactive slug="close-window" type="in-page"}

{panel type="teacher-note"}

# We DID warn you...

Pressing the yes button can be very frustrating!
Most modern web browsers provide some user control and freedom in this case &ndash; anyone who pressed the button can refresh the page and scroll back down.

{panel end}

Sometimes the interface can force the user into doing something they don't want to do.
For example, it is quite common for operating systems or programs to perform updates automatically that require a restart.
Sometimes the interface may not give them the opportunity to cancel or delay this, and restart nevertheless.
This is bad if it happens when the user is just about to give a presentation.

Another common form of this problem is not being able to quit a system.
A positive example is the "home" button on smartphones, which almost always stops the current app that is in use.

## Consistency and standards

*Users should not have to wonder whether different words, situations, or actions mean the same thing.
Follow platform conventions.*

Consistency (something being the same every time) is extremely useful for people using interfaces, and is sometimes called the "golden rule of HCI".
If an interface is consistent with other interfaces then learning in one interface transfers directly to another.
One of the biggest examples of consistency in computer programs is copy and paste, which works the same way in most software, so users only have to learn the concept once.
The shortcut keys for copy and paste are also fairly consistent between programs.
But in some software, copy/paste behaves differently, and this can be confusing for users.

An example of inconsistency is generally found within spreadsheet programs, where the result of pushing "control-A" (select all) depends on whether you are editing a cell or just have the cell selected (this particular problem is a 'mode' problem).
While this may make sense to a user experienced with spreadsheets, a new user can be very confused when the same action causes a different response.

{image file-path="img/chapters/xkcd-standards-cartoon.png" hover-text="Fortunately, the charging one has been solved now that we've all standardized on mini-USB.
Or is it micro-USB? Shit." alt="A xkcd comic on standards" source="https://xkcd.com/927/"}

A lack of consistency is often the reason behind people not liking a new system.
It is particularly noticeable between Mac and Windows users; someone who has only used one system can find the other very frustrating to use because so many things are different (consider the window controls for a start, which are in a different place and have different icons).
An experienced user of one interface will think that it is "obvious", and can't understand why the other person finds it frustrating, which can lead to discussions of religious fervour on which interface is best.
Similar problems can occur when a radically different version of an operating system comes out (such as Windows 8); a lot of the learning that has been done on the previous system needs to be undone, and the lack of consistency (i.e. losing prior learning) is frustrating.

Consistency is important because it allows users to apply their understanding of one part of an interface to other parts of the same interface or to other interfaces. Consistency is important across all aspects of interface design, including presentational issues, such as colours and layout, as well as functional issues, such as the number of button clicks or the types of gestures used on related interface controls. 

Consistency is sometimes separated into internal and external consistency. **Internal** consistency is about consistency within an application or family of related products (such as the Adobe family of products). One example of internal consistency is the top-right placement of the shopping cart within Amazon’s website. **External** consistency is between unrelated products, and involves general conventions, or design guidelines for a particular system (such as Windows, MacOs, Android and iOS). A common example would be that most software has a “File” and “Edit” menu, but it also involves important considerations such as which way around the “OK” and “Cancel” buttons should be shown. For example, a website that has external consistency will allow a new visitor to quickly work out where to find things like a site menu, search box, privacy statement, or information about the people in an organisation. But a website should also have internal consistency; for example, it would be confusing if a menu list at the top of each web page was slightly different. (You can read more about this in [Nielsen’s commentary on consistency](https://www.nngroup.com/articles/consistency-and-standards/)).

## Error prevention

*Even better than good error messages is a careful design which prevents a problem from occurring in the first place.
Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action.*

A computer program shouldn't make it easy for people to make serious errors.
An example of error prevention found in many programs is a menu item on a toolbar or dropdown being 'greyed out' or deactivated.
It stops the user from using a function that shouldn't be used in that situation, like trying to copy when nothing is selected.
A good program would also inform the user why an item is not available (for example in a tooltip).

Below is a date picker; can you see what errors can be produced with it?

{interactive slug="date-picker" type="in-page"}

{panel type="spoiler"}

# Some of the errors you might have observed

The date picker allows the user to choose invalid dates, such as Feb 30, or Nov 31.
The three-menu date picker is hard to get right, because each menu item limits what can be in the others, but any can be changed.
For example, you might pick 29 Feb 2008 (a valid date), then change the year to 2009 (not valid), then back to 2008.
When 2009 was chosen the day number would need to change to 28 to prevent errors, but if that was just an accident and the user changes back to 2008, the number has now changed, and might not be noticed.
It's preferable to use a more sophisticated date picker that shows a calendar, so the user can only click on valid dates (many websites will offer this).
Date picking systems usually provide a rich example for exploring interface issues!

{panel end}

A related problem with dates is when a user needs to pick a start and end date (for example, booking flights or a hotel room); the system should prevent a date prior to the first date being selected for the second date.

Here's a menu system that offers several choices:

{interactive slug="available-menu-items" type="in-page"}

Any time a dialogue box comes up that says you weren't allowed to do a certain action, it's frustrating because the system has failed to prevent an error.
Of course, it may be difficult to do that because the error can depend on so many user choices, but it is ideal that the system doesn't offer something that it can't do.

Another example of preventing errors is an automatic teller machine (ATM) that can only dispense, say, $20 notes.
If it allows you to enter any amount (such as $53.92, or even $50) then an error would be quite likely.
What techniques have you seen used in ATM software to prevent this kind of error?

{panel type="teacher-note"}

# ATM error prevention

Some ATMs make it impossible to enter an incorrect amount by only offering fixed amounts for withdrawal, and/or having buttons such as +$20 and -$20.
Searching the web for images of "ATM enter amount" might produce some reminders of various ways interfaces deal with this problem (or cause it!).
Entering an amount for a *deposit* is different of course, because it could be any amount, so that is likely to use a different interface,
which helps with error prevention, but now reduces consistency!

{panel end}

And here's another example, this time with a computer science slant: the following calculator has a binary mode, where it does calculations on binary numbers.
The trouble is that in this mode you can still type in decimal digits, which gives an error when you do the calculation.
A user could easily not notice that it's in binary mode, and the error message isn't particularly helpful!

{interactive slug="binary-mode-calculator" type="in-page"}

## Recognition rather than recall

*Minimize the user's memory load by making objects, actions, and options visible.
The user should not have to remember information from one part of the dialogue to another.
Instructions for use of the system should be visible or easily retrievable whenever appropriate.*

Humans are generally very good at recognising items, but computers are good at remembering them accurately.
A good example of this is a menu system; if you click on the "Edit" menu in a piece of software, it will remind you of all the editing tasks available, and you can choose the appropriate one easily.
If instead you had to type in a command from memory, that would put more load on the user.
In general it's good for the computer to "remember" details, and the user to be presented with options rather than having to remember them.
The exception is a system that is used all the time by an expert who knows all the options; in this case entering commands directly can sometimes be more flexible and faster than having to select from a list.

For example, when you type in a place name in an online map, the system might start suggesting names based on what you're typing, and probably adapted to focus on your location or past searches.
The following image is from Google maps, which suggests the name of the place you may be trying to type (in this case, the user has only had to type 4 letters, and the system saves them from having to recall the correct spelling of "Taumatawhakatangihangakoauauotamateapokaiwhenuakitanatahu" because they can then select it.)
A similar feature in web browsers saves users from having to remember the exact details of a URL that they have used in the past; a system that required you to type in place names exactly before you could search for them could get rather frustrating.

{image file-path="img/chapters/recognition-place-names.png" alt="Map predicting possible place names"}

## Flexibility and efficiency of use

*Accelerators &ndash; unseen by the novice user &ndash; may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users.
Allow users to tailor frequent actions.*

When someone is using software every day, they will soon have common sequences of operations they do (such as "Open the file, find the next blank space, type in a record of what just happened").
It's good to offer ways to make this quick to do, such as "macros", which do a sequence of actions from a single keystroke.

Similarly, it's good to be able to customise software by allocating keystrokes for frequent actions (such as "file this email in the 'pending' folder").
Common tasks like copy and paste usually have keystrokes added to them, and these allow experienced users to perform the task without having to reach for a mouse.

An important area of research in HCI is working out how to make shortcuts easy to learn.
You don't want them to get in the way for beginners, but you don't want frequent users to be unaware of them either.
A simple way of doing this is having keystroke equivalents in a menu (an accelerator); the menu displayed here shows that shift-command-O will open a new project, so the user can learn this sequence if they are using the command frequently.

{interactive slug="menu-keystrokes" type="in-page"}

A flexible system would allow the user to add a keystroke equivalent for the "Close Pane" command themselves, if that turned out to be used frequently.
Other systems might offer suggestions to the user if they notice an action being done frequently.
A related approach is offering recent selections near the top of a list of options.

## Aesthetics and minimalist design

*Dialogues should not contain information which is irrelevant or rarely needed.
Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.*

Software can contain many features, and if they are all visible at the same time (for example, on a toolbar), this can be overwhelming, especially for a new user.

TV remote controls often provide a great example of a complicated interface.
One reason that they have so many buttons is that it can help to make the device look impressive in the shop, but once you get it home, many of the buttons become redundant or confusing.

{interactive slug="remote-complicated" type="in-page"}

The remote control shown here has several buttons that could potentially do the same thing: "Guide", "Status", "Menu", "Option" and "Direct Navigator" all give access to different functions, but it's hard to predict which is which.
This remote has 22 buttons altogether!

{interactive slug="remote-simple" type="in-page"}

In contrast, this remote has very few buttons, and is a good example of a minimalist interface.
There's only one "Menu" to choose, so it's fairly obvious what to do to select the controls needed.
Of course, the simple remote relies on displaying menus on the screen, and these have the potential to make things more complicated.

{interactive slug="remote-modified" type="in-page"}

The third remote control shows a solution for simplifying it to save the user from having to read extensive manual information.
It's a bit drastic, but it might save the user from getting into modes that they can't get out of!
Some people have reported removing keys from mobile phones, or gluing buttons in place, so that the user can't get the device into a state that they shouldn't.
Some controls try to offer the best of both worlds by having a small flap that can be opened to reveal more functionality.

{panel type="curiosity"}

# Scary interfaces

In 2005 Tom Chi put out a call for people to nominate the "scariest" interfaces around (the original site is [here](http://okcancel.com/archives/article/2005/11/the-scariest-interface-part-ii.html), although it may be unavailable).
Some of the sites he named include complicated [weather pages](http://www.ussartf.org/predicting_weather.htm), [cluttered interfaces](http://thedailywtf.com/articles/Enter_The_Matrix), and the two top nominations were a [horse rental site](http://horserentals.com/massachusetts.html) and the interface for [Band-in-a-Box](https://en.wikipedia.org/wiki/Band-in-a-Box).
Even if these have been fixed or removed by the time you read this, you probably won't need to look far to find cluttered and confusing interfaces.

Cartoonist [Roz Chast](http://rozchast.com/) illustrates how scary a remote control can be with her cartoon
["How Grandma sees the remote"](http://www.art.com/products/p15063313199-sa-i6845922/roz-chast-how-grandma-sees-the-remote-new-yorker-cartoon.htm).

{panel end}

## Help users recognize, diagnose, and recover from errors

*Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.*

It’s not hard to find error messages that don’t really tell you what’s wrong!
The most common examples are messages like "Misc error", "Error number -2431", or "Error in one of the input values".
These force the user to go on a debugging mission to find out what went wrong, which could be anything from a disconnected cable or unfixable compatibility issue, to a missing digit in a number.

For example, some troubleshooting software produced the "unexpected" error below.
The error message is particularly unhelpful because the software was supposed to help with finding problems, but instead it has given the user a new problem to solve!
There is some extra information not shown below such as "Path: Unknown" and "Error code: 0x80070002".
Searching for the error code can lead to suggested solutions, but it also leads to scam software that claims to fix the problem.
By not giving useful error recovery information, the system has put the user at the mercy of the advice available online!

{interactive slug="unexpected-error" type="in-page"}

A variant of unhelpful error messages is one that gives two alternatives, such as "File may not exist, or it may already be in use".
A better message would save the user having to figure out which of these is the problem.

A positive example can be found in some alarm clocks such as the following one on an Android smartphone.
For example, here the alarm time is shown at "9:00".
In a country that uses 12-hour time, a user might mistake this for 9pm, and the alarm would go off at the wrong time.

{image file-path="img/chapters/android-alarm-9am.png" alt="Android alarm clock set for 9:00."}

However, the interface provides an opportunity to notice it because the display indicates how long it will be until the alarm will go off, making it easier to recognize the error of selecting the wrong time (or day).

{interactive slug="alarm-timer" type="in-page"}

## Help and documentation

Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation.
Any such information should be easy to search, focused on the user's task, list concrete steps to be carried out, and not be too large.
The following interactive illustrates a situation you might have run into before!

{interactive slug="no-help" type="in-page"}

Often help is an afterthought, and tends to be feature-centred (e.g. a catalogue of menu items), rather than task-centred (the series of actions needed to complete typical tasks, which is more useful for the user).
When a user needs help, they typically have a task to complete (such as upload photos from a camera), and good documentation should explain how to do common tasks, rather than explain each feature (such as "Setting the camera to USB mode").

## To find out more about heuristics

You can find more information about the [heuristics online on Jakob Nielsen's website](http://www.nngroup.com/articles/ten-usability-heuristics/).
