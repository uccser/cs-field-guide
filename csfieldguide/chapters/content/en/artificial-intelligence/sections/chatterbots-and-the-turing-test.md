# Chatterbots and the Turing test

{image file-path="img/chapters/computer-studying-turing-test.png" alt="The computer is reading a book titled 'Talk like a human'"}

Many humans take for granted the fact that they can easily have a conversation with another person, and choose appropriate things to say based on the conversation.
The ability to do this is a form of intelligence, and for computers it isn’t so easy!
Many attempts have been made to design {glossary-link term="program"}computer programs{glossary-link end} that can have a conversation with a human and sound intelligent.
These computer programs are called {glossary-link term="chatterbot"}chatterbots{glossary-link end}, or just *chatbots*.

You may come across chatterbots online for serious uses (such as giving help on a booking website).
Sometimes it's hard to tell if you're getting an automated response.
We'll start off by looking at some very simple chatterbots that are only designed as an experiment rather than to offer serious advice.

## A therapy session with Eliza the chatterbot

{panel type="teacher-note"}

# Chatterbots in the classroom

If this material is being used in the classroom, and time is limited, ensure students don’t spend too long talking to each chatterbot.
15 minutes maximum for each of Eliza, Alice, and Cleverbot (45 minutes total), and an extra 15-45 minutes (depending on time constraints) for students to search for other chatterbots will be sufficient for students to learn about the different chatterbots.

{panel end}

One such chatterbot is **Eliza**.
Eliza attempts to sound like a Rogerian Psychotherapist, and sounds most intelligent in the kind of conversation that would be had in a therapy session ([Rogerian Psychotherapy](https://en.wikipedia.org/w/index.php?title=Rogerian_psychotherapy) is a technique that revolves around trying to understand the client by asking questions and reflecting their statements back to clarify that they've been understood).

{panel type="caution"}

# Chatbots and personal information!

Eliza is a system that was intended to get people thinking about AI, and you should *not* use it for your own therapeutic usage.
You should never enter personal information into a computer that you wouldn’t want anybody else reading, as you can never be certain that the website isn’t going to store the information or pass it on to someone.
So you don’t want to be telling Eliza the kinds of things a person would say in a therapy session &ndash; just make stuff up when talking to Eliza!
For the same reason, do *not* tell any chatterbot other personal information such as your full name, date of birth, or address.

{panel end}

Go to the link just below and have a conversation with Eliza (keeping in mind that she is supposed to be a Rogerian Psychotherapist, so will respond like one).

[Click here to use the Eliza chatterbot](http://www.manifestation.com/neurotoys/eliza.php3)

{image file-path="img/chapters/eliza-chatbot-screenshot.png" alt="A screenshot of an Eliza chatbot"}

Do you think Eliza is as smart as a human?
Would you believe she was a human if somebody told you she was?

You will probably agree that while Eliza sounds somewhat intelligent at times, she gives very vague and general replies, forgets earlier parts of the conversation, and says some things that sound very strange!
As an example, here is a conversation with Eliza:

**Eliza**: Hello, I am Eliza.  
**Human**: Hello I am a human  
**Eliza**: Do you believe it is normal to be a human?  
**Human**: Yes  
**Eliza**: Are you Sure?  
**Human**: Yes  
**Eliza**: Why did you repeat yourself?

Eliza often gives very general replies by looking for suitable rules based only on the line you've just typed, and that often leads to some very weird conversations, such as the one above!
In this case Eliza used {glossary-link term="pattern-matching"}pattern matching{glossary-link end} to determine that it might be appropriate to ask "Do you believe it is normal to be a human?", in response to "I am" followed by "a human"; if we had said "I am a banana" then the same rule would have resulted in "Do you believe it is normal to be a banana?."
When we answered "Yes", Eliza didn't actually understand the *meaning* of "Yes", so simply asked if we were sure, as it has a general response that says a good way of responding to somebody saying "Yes" is to ask them if they were sure.
Eliza also has rules that are triggered if somebody repeats themselves, that say she should ask them why.
Because Eliza doesn’t actually understand meanings but instead just follows rules that say what might be appropriate responses, she had no way of knowing that it actually *was* meaningful to respond with "Yes" twice!
This is a big giveaway that Eliza really isn’t that intelligent, and doesn’t actually understand meanings in conversation, or even whether or not a response to her own question is actually reasonable.

{panel type="teacher-note"}

# Eliza's responses

These responses that Eliza is giving are called *canned responses*.

{panel end}

Now go back and have another conversation with Eliza.
There are many other examples of Eliza saying stuff that make no sense such as the above dialogue.
How many can you find?
In addition, investigate how Eliza responds when you do the following:

- Try being a "parrot" that just copies everything Eliza says.
- What happens when you don’t give meaningful answers to her questions?
- If you say the same thing you said earlier in the conversation (not immediately after, as she'll comment on how you repeated yourself), does Eliza always respond in the same way?
- What happens when you talk about things that are unrelated to her domain as a therapist?

## Alice the chatterbot

We saw above that Eliza is a chatterbot who works with a restricted domain (trying to take the role of a therapist), and tried to sound intelligent by giving very general responses.
As you probably found out though, this quickly reveals that Eliza really isn’t intelligent at all, and will just repeat the same things over and over again.
In addition, you probably also noticed that Eliza frequently comes up with sentences that make no sense to a human.

Try having a conversation with another chatterbot &ndash; **A.L.I.C.E**.

[Click here for the Alice chatterbot at pandorabots.com](https://www.pandorabots.com/pandora/talk?botid=b8d616e35e36e881)

{image file-path="img/chapters/alice-chatbot-screenshot.png" alt="The Alice chatbot at pandorabots.com"}

Does Alice sound more intelligent than Eliza?
Does she sound as intelligent as a human, or can you trick her into saying things that make no sense?
Try using the same tricks you used to fool Eliza and see if they fool Alice as well (look back at the list of bullet points in the Eliza section just above).

Like Eliza, Alice also uses predetermined rules to know what to say, although she has a lot more of these rules and a more sophisticated algorithm for choosing which rules should be used to determine what to say.
If you want to know more, just ask Alice how she works, and she’ll tell you!

Some possible rules that Alice might have are:

- If "favourite colours" are mentioned, say your favourite colour is "transparent".
- If family members are mentioned (e.g. "mum", "dad", or "brother") say something that is about family.

To use the rules, the chatterbot analyses your last sentence (and possibly earlier sentences also) by matching the sentence against the patterns in its rules.
If the sentence matches the rule pattern, it "activates" the rule.
The rule will specify a reply.
Sometimes the reply is just a template for a sentence, and the chatterbot analyses the text you typed to extract words that can be inserted into the template.
That’s why the replies sometimes use part of what you typed.

The quality of these rules determines how intelligent the chatterbot will sound.  

While Alice is undoubtedly more intelligent sounding than Eliza, Alice still has her limitations.
Sometimes she even admits to those limitations!

**Human:** What will happen in the year 2000?  
**A.L.I.C.E:** I cannot predict the future.  
**Human:** That is the past  
**A.L.I.C.E:** Yes it is one of the past.  
**Human:** Then why did you say you can't predict the future?  
**A.L.I.C.E:** It was a preprogrammed response completely determined by your statements.

It was a bit mean to trick her by saying *what will*.
Her rules assume a human wouldn’t mislead her like that.

## Chatterbots that learn from humans

We saw examples in the previous sections of two chatterbots that have rules that help them determine suitable things to say.
One of those chatterbots only works in a restricted domain, taking the role of a therapist.
The other is able to have more general conversations but can still trip up responding to something that doesn't quite fit any of her rules.
Both these chatterbots had their *rules* of what to say determined by programmers *at the time of programming*, and these rules will never be changed unless a programmer decides to change them.
This is the most basic form of artificial intelligence.

There are other chatterbots that are able to *learn* their rules from the humans they have conversations with.
By looking at how a human responds to various dialogues, the chatterbot attempts to learn how it should respond in various situations.
The idea is that if it responds in similar ways to what a human does, then perhaps it will sound like a human.
Most of these chatterbots aim to have very general conversations, i.e. they aren’t restrained to one domain such as Eliza the therapist is.

If it is human intelligence you are trying to simulate, then perhaps learning from humans is the way to go?

{panel type="caution"}

# Interacting with chatbots that learn

Please note that the following exercise involves interacting with one of these chatterbots.
Because the chatterbot has learnt from humans, it will quite possibly have been taught to say things that you may find highly offensive.
While we have tried to choose chatterbots that mostly say things that aren’t going to offend, it is impossible to guarantee this, so use your discretion with them; you can skip this section and still cover the main concepts of this chapter.
Because Eliza and Alice don’t learn from humans, they won’t say offensive things unless you do first!

And again, don’t tell the chatterbots your personal details (such as your full name, date of birth, address, or any other personal information).
Just make stuff up where necessary.
A chatterbot that learns from people quite possibly *will* pass on what you say to other people in an attempt to sound intelligent to *them*!

These warnings will make more sense once you’ve learnt how these chatterbots work.

{panel end}

An example of a chatterbot that learns from humans is **Cleverbot**.

[Click on this link to have a conversation with Cleverbot](http://www.cleverbot.com/)

{image file-path="img/chapters/cleverbot-chatbot-screenshot.png" alt="The Cleverbot chatbot"}

Unlike Eliza and Alice, whose rules of what to say were determined by programmers, Cleverbot learns rules based on what people say.
For example, when Cleverbot says "hi" to a person, it keeps track of all the different responses that people make to that, such as "hi", "hello!", "hey ya", "sup!".
A rule is made that says that if somebody says hi to you, then the things that people have commonly said in response to Cleverbot saying hi are appropriate things to say in response to "hi".
In turn, when Cleverbot says something like "sup!" or "hello!", it will look at how humans respond to that in order to learn appropriate response for those.
And then it will learn responses for those responses.
This allows Cleverbot to build up an increasingly large database.

{comment Perhaps we need to include a diagram that shows this learning process so that the students better at understanding diagrams than text have a chance of being able to understand it? It’s kinda recursive, and is a bit confusing!}

An implication of learning from humans is that Cleverbot makes the assumption that the humans actually *are* intelligent, and will teach it to say intelligent things.
If for example people told Cleverbot something like "School is boring" in response to Cleverbot saying "hi", Cleverbot might learn that when a person says "hi" to it, it should say "School is boring"!

{panel type="curiosity"}

# A short film written by Cleverbot

Check out the short film ["Do You Love Me"](https://www.youtube.com/watch?v=QkNA7sy5M5s) (~3 mins), the result when Chris R Wilson collaborated with Cleverbot to write a movie script.

{panel end}

## Even more chatterbots!

There are even more chatterbots you can talk to.
Try looking at the [list on wikipedia](https://en.wikipedia.org/wiki/List_of_chatterbots), or doing a Google search for chatterbots.
Each chatterbot on this list has its own Wikipedia page.
You should be able to find the chatterbots by either an internet search, or looking at the references of the Wikipedia pages.
Some of these will have rules that were determined by programmers, and others will have rules that were learnt from humans.

If you have a device that runs Apple iOS (for example an iPhone), have a look at the [Siri](https://en.wikipedia.org/wiki/Siri_%28software%29) chatterbot in the device’s help system.
Siri is an example of a chatterbot that has the job of *helping* a human, unlike most chatterbots which simply have the purpose of web entertainment.
It also has voice recognition, so you can talk to it rather than just typing to it.

## The Turing test

{panel type="teacher-note"}

# TED video introducing the Turing test

There is a TED video that gives an overview of the Turing test [on YouTube](https://www.youtube.com/watch?v=3wLqsRLvV-c).

{panel end}

In the above sections you met some chatterbots, and (hopefully!) have drawn the conclusion that they aren’t entirely convincing in terms of sounding like a human (although some are better than others!).
But maybe soon, there will be new chatterbots that don’t have the same limitations.
Should we consider them to be intelligent?
How could we tell?
Is there a formal way we can determine whether or not a chatterbot is at the level of human intelligence?

A very famous computer scientist, Alan Turing, answered this question back in 1950, before the first chatterbots even existed!
Alan Turing had an extraordinary vision of the future, and knew that coming up with computers that were intelligent would become a big thing, and that we would need a way to know when we have succeeded in creating a truly intelligent computer.

He thought about how intelligence could be defined (defining intelligence is surprisingly difficult!), and decided that one way would be to say that a human was intelligent, and that if a computer was able to communicate convincingly like a human, then it must be intelligent also.
This definition doesn’t cover all of intelligence, as it only considers what a person or a computer says and ignores other components of intelligence such as determining the best way to walk through a building (or maze) or deciding how to act in a specific situation (such as at a social event, when deciding what to do next at work, or when lost).
However, communication is still a very significant component of human intelligence.

In order to test whether or not a computer program can communicate like a human, Turing proposed a test.
In addition to the computer program, two humans are required to carry out the test.
One of the humans act as an interrogator, and the other as a "human" to compare the computer program to.
The interrogator is put in a separate room from the computer running the computer program and the "human".
The interrogator has conversations with both the human and the computer program, but isn’t told which one they are having the conversation with at each time.
The conversations are both carried out over something like an instant messaging program so that actual speech isn’t required from the computer program.
During the conversations, the human has to convince the interrogator that they are indeed the human, and the computer program has to convince the interrogator that IT is actually the human.
At the end of the conversations, the interrogator has to say which was the computer and which was the human.
If they can’t reliably tell, then the computer is said to have passed the test.

{image file-path="img/chapters/Turing_Test_version_3.png" source="https://en.wikipedia.org/wiki/File:Turing_Test_version_3.png" alt="A basic Turing test diagram"}

This test proposed by Turing eventually became very famous and got the name "The Turing test".
One of the motivations for writing chatterbots is to try and make one that passes the Turing test.
Unfortunately, making a chatterbot that successfully passes the Turing test hasn't yet been achieved, and whether or not it is even possible is still an open question in computer science, along with many other questions in artificial intelligence that you will encounter later in this chapter.

Other forms of the Turing test exist as well.
Video games often have computer controlled characters that play with or against you, in place of a second human controlled character.
A variation of the Turing test can be used to determine whether or not the computer controlled player seems to have human intelligence by getting an interrogator to play against both the computer character and the human character, and to see whether or not they can tell them apart.

In fact, many parts of human intelligence could be tested using a variation of the Turing test.
If you wanted a computer chess player that seemed like a human as opposed to a computer (as some people might prefer to be playing against a human rather than a computer), you could use a Turing test for this as well!
What other possible Turing tests can you think of?

{panel type="curiosity"}

# The real Turing test

Alan Turing actually started by suggesting a simple party game requiring three players, where the first player was female, the second player was male, and the third player could be either male or female, and took the role of the "interrogator".
The interrogator would be in a separate room to the other two players, and could only communicate with them by passing written notes (for example, by passing the notes under a door).
The male had to try and convince the interrogator that he was actually female, and the female had to try and convince the interrogator that she *was* the female.
At the end the interrogator had to say which was the male and which was the female.

{panel end}

{panel type="project"}

# Run your own Turing test on a chatterbot

This section will involve you actually carrying out the Turing test.
Read this entire section carefully (and the previous section if you haven’t done so already) before you start, and make sure you understand it all before starting.

In science classes, such as biology, physics, and chemistry, carrying out experiments is commonly done.
If you have taken classes like these, you will probably know that if an experiment isn’t carried out properly (e.g. in chemistry some students are tempted to put in more of a chemical than the instructions say to, or when timing is important this is easy to get wrong), then the results will not necessarily be the ones you are after and your experiment is essentially meaningless.
You also have to be careful that other factors don’t affect the results.
For example, controlling temperature and moisture in biology experiments that involve growing micro-organisms.

Carrying out the Turing test is carrying out an experiment, just like carrying out experiments in chemistry classes.
And just like the chemistry experiments, carrying out the Turing test requires being careful to follow instructions correctly, and controlling factors that could potentially affect the results but aren’t part of what is being tested.
You should keep this in mind while you are carrying out this project.

For example, most chatterbots communicate in a text form rather than verbal.
Communicating in a verbal form involves not only choosing intelligent sounding things to say, but also involves having a convincing voice and pronouncing words correctly.
Tone of voice or accent could potentially make it very obvious to the interrogator which conversation was with the human and which was the computer, without them even having to consider what was actually said in the conversation.
This is not what the Turing test is supposed to be testing!
Therefore, the Turing test will have both the computer and the human communicating in a written form.

As another example, speed of response could have an impact.
The computer is likely to be able to reply instantly, whereas the human will need time to think and then write their reply.
To prevent the interrogator from making their decision based on the speed instead of the content, the speed of response needs to be controlled as well.
The way of carrying out the Turing test described below tries to control these additional factors.

Choose a chatterbot from the list on Wikipedia (see the above chatterbots section), or possibly use Alice or Cleverbot (Eliza isn’t recommended for this).
You will be taking the role of the interrogator, but will need another person to act as the "human".
For this it is recommended you choose a person in your class who you don’t know very well.
Do *not* choose your best friend in the class, because you will know their responses to questions too well, so will be able to identify them from the chatterbot based on their personality rather than the quality of the chatterbot.

In addition to the chatterbot and your classmate to act as the human, you will need access to: a room with a computer with internet (this could just be the computer classroom); another room outside it (a hallway would be fine); pieces of paper; 2 pens; and a coin or die.

The chatterbot should be loaded on the computer to be used, and your classmate should be in the same room with the computer.
You should be outside that room.
As the interrogator, you will first have a conversation with either your classmate or the computer, and then a conversation with the other one.
You should not know which order you speak to them; to determine which you speak to first your classmate should use the die or the coin to randomly decide (and shouldn’t tell you).

In order to carry out the conversations, start by writing something at the top of the piece of paper such as "hello" or "hi" or "how are you?".
Put a mark next to the line to make it clear that line was written by YOU.
Pass the piece of paper into the room where your classmate and the computer are (if you can, slide it under the door) where your classmate will write a reply on it and pass it back to you.
You should then write a reply to that and repeat the process.
Each conversation should be on a separate piece of paper, and be around 20 to 40 lines long (this means that each person/computer should say around 10-20 lines in each conversation).
Put a mark next to each of the lines you write, so that it is clear who wrote which lines.

If your classmate is currently supposed to be having the conversation (rather than the chatterbot), they will write the reply based on what they would say.

If the chatterbot is currently supposed to be having the conversation, your classmate should type what you said into the chatterbot and then write its reply on the piece of paper.
Before submitting the line to the chatterbot, they should double check it was entered correctly.

A problem is that it will take longer for the conversation between you and the chatterbot than between you and the classmate, because of the need for your classmate to type what you say to the chatterbot.
You wouldn’t want to make it obvious which was the computer and which was the human due to that factor!
To deal with this, the classmate should intentionally delay each reply so that they all take exactly one minute.

You can ask whatever you like, although keep in mind that you should be assuming you don’t know your classmate already, so don’t refer to common knowledge about previous things that happened such as in class or in the weekend in what you ask your classmate or the chatterbot.
This would be unfair to the chatterbot since it can’t possibly know about those things.
Remember you’re evaluating the chatterbot on its ability to display human intelligence, not on what it doesn’t know about.

Good conversation topics would be favourite colours, games, foods, and the kinds of conversation topics you’d have with a person you don’t know but are having a friendly conversation with at work, or a party.
Coming up with good things to ask is challenging but just ask yourself whether something would require knowledge of an event that not everybody could be expected to have.

Once both conversations are complete, you as the interrogator have to analyse the conversations and say which was your classmate, and which was the chatterbot.
Your classmate should tell you whether or not you were correct.

These are some questions you can consider after you have finished carrying out the Turing test:

- How were you able to tell which was the chatterbot and which was your classmate?
- Were there any questions you asked that were "unfair" &ndash; that depended on knowledge your classmate might have but no-one (computer or person) from another place could possibly have?
- Which gave it away more: the content of the answers, or the way in which the content was expressed?

{panel end}

{image file-path="img/chapters/turing-test-dating-show.png" alt="The Turing dating test"}
