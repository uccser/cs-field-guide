# Artificial Intelligence

{teacher}
The following assessment plans also cover this material:

**New Zealand - AS91636 (3.44)**
- [Artificial Intelligence (Turing Test)](/appendices/assessment_guides/new_zealand/assessment-guide-level-3-artificial-intelligence-turing-test.html)
{teacher end}

{video https://www.youtube.com/watch?v=ia-oYtacJHE}

## What's the big picture?

Artificial Intelligence conjures up all sorts of images --- perhaps you think of friendly systems that can talk to you and solve tough problems; or maniac robots that are bent on world domination? There's the promise of driverless cars that are safer than human drivers, and the worry of  medical advice systems that hold peoples lives in their virtual hands. The field of Artificial Intelligence is a part of computer science that has a lot of promise and also raises a lot of concerns. It can be used to make decisions in systems as large as an aeroplane or an [autonomous dump truck](http://www.komatsu.com/ce/currenttopics/v09212/index.html), or as small as a mobile phone that accurately predicts text being typed into it. What they have in common is that they try to mimic aspects of human intelligence. And importantly, such systems can be of significant help in people's everyday lives.

AI (also known as intelligent systems) is primarily a branch of computer science but it has borrowed a lot of concepts and ideas from other fields, especially [mathematics](http://en.wikipedia.org/wiki/Mathematics)(particularly logic, combinatorics, statistics, probability and optimisation theory), [biology](http://en.wikipedia.org/wiki/Biology), [psychology](http://en.wikipedia.org/wiki/Psychology), [linguistics](http://en.wikipedia.org/wiki/Linguistics), [neuroscience](http://en.wikipedia.org/wiki/Neuroscience) and [philosophy](http://en.wikipedia.org/wiki/Philosophy).

In this chapter we'll explore a range of these intelligent systems. Inevitably this will mean dealing with ethical and philosophical issues too --- do we really want machines to take over some of our jobs? Can we trust them? Might it all go too far one day? What do we really mean by a computer being intelligent? While we won't address these questions directly in this chapter, gaining some technical knowledge about AI will enable you to make more informed decisions about the deeper issues.

## Chatterbots and The Turing Test

{image computer-studying-turing-test.png alt="The computer is reading a book titled 'Talk like a human'"}

Many humans take for granted the fact that they can easily have a conversation with another person, and choose appropriate things to say based on the conversation. The ability to do this is a form of intelligence, and for computers it isn’t so easy! Many attempts have been made to design computer programs that can have a conversation with a human and sound intelligent. These computer programs are called *chatterbots*, or just *chatbots*. This book uses the former term, although you may see both being used in other books or websites.

### A Therapy Session with Eliza the Chatterbot

{teacher}
If this material is being used in the classroom, and time is limited, ensure students don’t spend too long talking to each chatterbot. 15 minutes maximum for each of Eliza, Alice, and Cleverbot (45 minutes total), and an extra 15 - 45 minutes (depending on time constraints) for students to search for other chatterbots will be sufficient for students to learn about the different chatterbots.
{teacher end}

One such chatterbot is **Eliza**. Eliza attempts to sound like a Rogerian Psychotherapist, and sounds most intelligent in the kind of conversation that would be had in such a therapy session. ([Rogerian Psychotherapy](http://en.wikipedia.org/w/index.php?title=Rogerian_psychotherapy) is a technique that revolves around trying to understand the client by asking questions and reflecting their statements back to clarify that they've been understood).

{warning}
Eliza is a system that was intended to get people thinking about AI, and you should *not* use it for your own therapeutic usage. You should never enter personal information into a computer that you wouldn’t want anybody else reading, as you can never be certain that the web site isn’t going to store the information or pass it on to someone. So you don’t want to be telling Eliza the kinds of things a person would say in a therapy session --- just make stuff up when talking to Eliza! For the same reason, do *not* tell any chatterbot other personal information such as your full name, date of birth, or address.
{warning end}

Go to the link just below and have a conversation with Eliza (keeping in mind that she is supposed to be a Rogerian Psychotherapist, so will respond like one).

[Click here for the Eliza chatterbot at nlp-addiction.com](http://nlp-addiction.com/eliza/)

{image ai-eliza-nlp-addiction.png alt="The Eliza chatbot at nlp-addiction.com"}

Do you think Eliza is as smart as a human? Would you believe she was a human if somebody told you she was?

You will probably agree that while Eliza sounds somewhat intelligent at times, she gives very vague and general replies, forgets earlier parts of the conversation, and says some things that sound very strange! As an example, here is a conversation with Eliza:

**Eliza**: Hello, I am Eliza.  
**Human**: Hello I am a human  
**Eliza**: Do you believe it is normal to be a human?  
**Human**: Yes  
**Eliza**: Are you Sure?  
**Human**: Yes  
**Eliza**: Why did you repeat yourself?

Eliza often gives very general replies by looking for suitable rules based only on the line you've just typed, and that often leads to some very weird conversations, such as the one above! In this case Eliza used pattern matching to determine that it might be appropriate to ask me "Do you believe it is normal to be a human?", as I had said I was a human; if I had said "I am a banana" then the same rule would have responded with "Do you believe it is normal to be a banana?". When I answered "Yes", Eliza didn't actually understand the *meaning* of me saying "Yes", so simply asked me if I was sure, as it has a general response that says a good way of responding to somebody saying "Yes" is to ask them if they were sure. Eliza also has rules that are triggered if somebody repeats themselves that say she should ask them why. Because Eliza doesn’t actually understand meanings but instead just follows rules that say what might be appropriate responses, she had no way of knowing that it actually *was* meaningful for me to respond with "Yes" twice! This is a big giveaway that Eliza really isn’t that intelligent, and doesn’t actually understand meanings in conversation, or even whether or not a response to her own question is actually reasonable.

{teacher}
These responses that Eliza is giving are called *canned responses*.
{teacher end}

Now go back and have another conversation with Eliza. There are many other examples of Eliza saying stuff that makes no sense such as the above dialogue. How many can you find? In addition, how does Eliza respond when you do the following things?

- Try being a "parrot" that just copies everything Eliza says.
- What happens when you don’t give meaningful answers to her questions?
- If you say the same thing you said earlier in the conversation, does Eliza always respond in the same way? (When you say it immediately after, she probably won’t, as she’ll comment on the fact that you repeated yourself the second time!)
- What happens when you talk about things that are unrelated to what would be said in a therapy session, i.e. you try to have a general conversation with Eliza (remember that Eliza works in a restricted domain, i.e. she assumes she is a therapist).

### Alice the Chatterbot

We saw above that Eliza is a chatterbot who works with a restricted domain (trying to take the role of a therapist), and tried to sound intelligent by giving very general responses. As you probably found out though, this quickly reveals that Eliza really isn’t intelligent at all, and will just repeat the same things over and over again. In addition, you probably also noticed that Eliza frequently doesn’t make a lot of sense, and comes up with sentences that make no sense to a human.

Try having a conversation with another chatterbot --- Alice. Note that she knows you as "judge". You might work out why she calls you this once you have read the sections on the Turing Test below!

[Click here for the Alice chatterbot at pandorabots.com](http://www.pandorabots.com/pandora/talk?botid=f5d922d97e345aa1)

{image ai-alice-pandorabots.png alt="The Alice chatbot at pandorabots.com"}

Does Alice sound more intelligent than Eliza? Does she sound as intelligent as a human, or can you trick her into saying things that make no sense? Try using the same tricks you used to fool Eliza and see if they fool Alice as well (look back at the list of bullet points in the Eliza section just above).

Like Eliza, Alice also uses hard coded rules to know what to say, although she has a lot more of these rules and a more sophisticated algorithm for choosing which rules should be used to determine what to say. If you want to know more, just ask Alice how she works, and she’ll tell you!

Some possible rules that Alice might have are:
- If "favourite colours" are mentioned,  say your favourite colour is "green".
- If family members are mentioned (e.g. "mum", "dad", or "brother") say something that is about family.

To use the rules, the chatterbot analyses your last sentence (and possibly earlier sentences also) by matching the sentence against the patterns in its rules.  If the sentence matches the rule pattern, it "activates" the rule. The rule will specify a reply. Sometimes the reply is just a template for a sentence, and the chatterbot analyses the text you typed to extract words that can be inserted into the template. That’s why the replies sometimes use part of what you typed.

The quality of these rules determines how intelligent the chatterbot will sound.  

While Alice is undoubtedly more intelligent than Eliza, Alice still has her limitations. Sometimes she even admits to those limitations!

**Judge**: What will happen in the year 2000  
**Alice**: I cannot predict the future.  
**Judge**: That is the past  
**Alice**: Yes it is one of the past.  
**Judge**: Then why did you say you can't predict the future?  
**Alice**: It was a preprogrammed response completely determined by your statements.

I suppose I was a bit mean for tricking her and saying "what will". Her rules assume a human wouldn’t mislead her like that.

### Chatterbots that learn from humans

We saw in the previous sections examples of two chatterbots that have rules that help them determine suitable things to say. One of those chatterbots only works in a restricted domain, taking the role of a therapist, and is unable to have very general conversations, and the other is able to have more general conversations. Both these chatterbots had their *rules* of what to say determined by programmers *at the time of programming*, and these rules will never be changed unless a programmer decides to change them.

There are other chatterbots that are able to *learn* their rules from the humans they have conversations with. By looking at how a human responds to various dialogues, the chatterbot attempts to learn how it should respond in various situations. The idea is that if it responds in similar ways to what a human does, then perhaps it will sound like a human. Most of these chatterbots aim to have very general conversations, i.e. they aren’t restrained to one domain such as Eliza the therapist is.

If it is human intelligence you are trying to simulate, then perhaps learning from humans is the way to go?

{warning}
Please note that the following exercise involves interacting with one of these chatterbots. Because the chatterbot has learnt from humans, it will quite possibly have been taught to say things that you may find highly offensive. While we have tried to choose chatterbots that mostly say things that aren’t going to offend, it is impossible to guarantee this, so use your discretion with them; you can skip this section and still cover the main concepts of this chapter. Because Eliza and Alice don’t learn from humans, they won’t say offensive things unless you do first!

And again, don’t tell the chatterbots your personal details (such as your full name, date of birth, address, or any other information you wouldn’t be happy sharing with everybody). Make stuff up where necessary. A chatterbot that learns from people quite possibly *will* pass on what you say to other people in an attempt to sound intelligent to *them*!

These warnings will make more sense once you’ve learnt how these chatterbots work.
{warning end}

An example of a chatterbot that learns from humans is Cleverbot.

[Click on this link to have a conversation with Cleverbot](http://www.cleverbot.com/)

{image ai-cleverbot.png alt="The Cleverbot chatbot"}

Unlike Eliza and Alice, whose rules of what to say were determined by programmers, Cleverbot learns rules based on what people say. For example, when Cleverbot says "hi" to a person, it keeps track of all the different responses that people make to that, such as "hi", "hello!", "hey ya", "sup!". A rule is made that says that if somebody says hi to you, then the things that people have commonly said in response to Cleverbot saying hi are appropriate things to say in response to "hi". In turn, when Cleverbot says something like "sup!" or "hello!", it will look at how humans respond to that in order to learn appropriate response for those. And then it will learn responses for those responses. This allows Cleverbot to built up an increasingly large database.

{comment}
Perhaps we need to include a diagram that shows this learning process so that the students better at understanding diagrams than text have a chance of being able to understand it? It’s kinda recursive, and is a bit confusing!
{comment end}

An implication of learning from humans is that Cleverbot makes the assumption that the humans actually *are* intelligent, and will teach it to say intelligent things. If for example people told Cleverbot something like "School is boring" in response to Cleverbot saying "hi", Cleverbot might learn that when a person says "hi" to it, it should say "School is boring"!

{curiosity}
##### A short film written by Cleverbot

Check out the short film ["Do You Love Me"](http://www.youtube.com/watch?v=QkNA7sy5M5s) (~3 mins), the result when Chris R Wilson collaborated with Cleverbot to write a movie script.
{curiosity end}

### Even more Chatterbots!

There are even more chatterbots you can talk to. Try looking at the [list on wikipedia](http://en.wikipedia.org/wiki/List_of_chatterbots), or doing a google search for chatterbots. Each chatterbot on this list has its own wikipedia page. You should be able to find the chatterbots by either an internet search, or looking at the references of the wikipedia pages. Some of these will have rules that were determined by programmers, and others will have rules that were learnt from humans.

If you have a device that runs Apple iOS (for example an iPhone), have a look at the [Siri](http://en.wikipedia.org/wiki/Siri_%28software%29) chatterbot in the device’s help system. Siri is an example of a chatterbot that has the job of *helping* a human, unlike most chatterbots which simply have the purpose of web entertainment.  It also has voice recognition, so you can talk to it rather than just typing to it.

### The Turing Test

In the above sections you met some chatterbots, and (hopefully!) have drawn the conclusion that they aren’t entirely convincing in terms of sounding like a human (although some are better than others!). But maybe soon, there will be new chatterbots that don’t have the same limitations. Should we consider them to be intelligent?  How could we tell?  Is there a formal way we can determine whether or not a chatterbot is of the level of human intelligence?

A very famous computer scientist, Alan Turing, answered this question back in 1950, before the first chatterbots even existed! Alan Turing had an extraordinary vision of the future, and knew that coming up with computers that were intelligent would become a big thing, and that we would need a way to know when we have succeeded in creating a truly intelligent computer.

He thought about how intelligence could be defined (defining intelligence is surprisingly difficult!), and decided that one way would be to say that a human was intelligent, and that if a computer was able to communicate convincingly like a human, then it must be intelligent also. This definition doesn’t cover all of intelligence, as it only considers what a person or a computer says and ignores other components of intelligence such as determining the best way to walk through a building (or maze) or deciding how to act in a specific situation (such as at a social event, when deciding what to do next at work, or when lost). However, communication is still a very significant component of human intelligence.

In order to test whether or not a computer program can communicate like a human, Turing proposed a test. In addition to the computer program, two humans are required to carry out the test. One of the humans act as an interrogator, and the other as a "human" to compare the computer program to. The interrogator is put in a separate room from the computer running the computer program and the "human". The interrogator has conversations with both the human and the computer program, but isn’t told which one they are having the conversation with at each time. The conversations are both carried out over something like an instant messaging program so that actual speech isn’t required from the computer program. During the conversations, the human has to convince the interrogator that they are indeed the human, and the computer program has to convince the interrogator that IT is actually the human. At the end of the conversations, the interrogator has to say which was the computer and which was the human. If they can’t reliably tell, then the computer is said to have passed the test.

This test proposed by Turing eventually became very famous and got the name "The Turing Test". One of the motivations for writing chatterbots is to try and make one that passes the Turing Test. Unfortunately, making a chatterbot that successfully passes the Turing Test hasn't yet been achieved, and whether or not it is even possible is still an open question in computer science, along with many other questions in artificial intelligence that you will encounter later in this chapter.

Other forms of the Turing Test exist as well. Action games sometimes have computer controlled characters that fight your own character, in place of a second human controlled character. A variation of the Turing Test can be used to determine whether or not the computer controlled player seems to have human intelligence by getting an interrogator to play against both the computer character and the human character, and to see whether or not they can tell them apart.

Infact, many parts of human intelligence could be tested using a variation of the Turing Test. If you wanted a computer chess player that seemed like a human as opposed to a computer (as some people might prefer to be playing against a human rather than a computer), you could use a Turing Test for this as well! What other possible Turing Tests can you think of?

In the next section, you will actually carry out the Turing Test on a chatterbot.

{curiosity}
##### The real Turing test**

Alan Turing actually started by suggesting a simple party game requiring three players, where the first player was female, the second player was male, and the third player could be either male or female, and took the role of the "interrogator". The interrogator would be in a separate room to the other two players, and could only communicate with them by passing written notes (for example, by passing the notes under a door). The male had to try and convince the interrogator that he was actually female, and the female had to try and convince the interrogator that she *was* the female. At the end the interrogator had to say which was the male and which was the female, and if the interrogator guessed incorrectly, then the male "won".
{curiosity end}

### Activity: Run your own Turing test

{teacher}
**New Zealand teachers:** This activity on its own is NOT suitable for 3.44. The next section contains a project that is designed for 3.44, and involves doing this activity and doing further work that satisfies the requirements of 3.44.
{teacher end}

This section will involve you actually carrying out the Turing Test. Read this entire section carefully (and the previous section if you haven’t done so already) before you start, and make sure you understand it all before starting.

In science classes, such as biology, physics, and chemistry, carrying out experiments is commonly done. If you have taken classes like these, you will probably know that if an experiment isn’t carried out properly (e.g. in chemistry some students are tempted to put in more of a chemical than the instructions say to, or when timing is important this is easy to get wrong), then the results will not necessarily be the ones you are after and your experiment is essentially meaningless and pointless. You also have to be careful that other factors don’t affect the results. e.g. controlling temperature and moisture in biology experiments that involve growing micro-organisms.

Carrying out the Turing Test is carrying out an experiment, just like carrying out experiments in chemistry classes. And just like the chemistry experiments, carrying out the Turing Test requires being careful to follow instructions correctly, and controlling factors that could potentially affect the results but aren’t part of what is being tested. You should keep this in mind while you are carrying out this project.

For example, most chatterbots communicate in a text form rather than verbal. Communicating in a verbal form involves not only choosing intelligent sounding things to say, but also involves having a convincing voice and pronouncing words correctly.  Tone of voice or accent could potentially make it very obvious to the interrogator which conversation was with the human and which was the computer, without them even having to consider what was actually said in the conversation. This is not what the Turing Test is supposed to be testing! Therefore, the Turing Test will have both the computer and the human communicating in a written form.

As another example, speed of response could have an impact. The computer is likely to be able to reply instantly, whereas the human will need time to think and then write their reply. To prevent the interrogator from making their decision based on the speed instead of the content,  the speed of response needs to be controlled as well. The way of carrying out the Turing Test described below tries to control these additional factors.

Choose a chatterbot from the list on Wikipedia (see the above chatterbots section), or possibly use Alice or Cleverbot (Eliza isn’t recommended for this). You will be taking the role of the interrogator, but will need another person to act as the "human". For this it is recommended you choose a person in your class who you don’t know very well. Do *not* choose your best friend in the class, because you will know their responses to questions too well, so will be able to identify them from the chatterbot based on their personality rather than the quality of the chatterbot.

In addition to the chatterbot and your classmate to act as the human, you will need access to a room with a computer with internet (this could just be the computer classroom), another room outside it (a hallway would be fine), pieces of paper, 2 pens, and a coin or a dice.

The chatterbot should be loaded on the computer to be used, and your classmate should be in the same room with the computer. You should be outside that room. As the interrogator, you will first have a conversation with either your classmate or the computer, and then a conversation with the other one. You should not know which order you will speak to them; to determine which you speak to first your classmate should use the dice or the coin to randomly decide (and shouldn’t tell you).

In order to carry out the conversations, start by writing something at the top of the piece of paper such as "hello" or "hi" or "how are you?". Put a mark next to the line to make it clear that line was written by YOU. Pass the piece of paper into the room where your classmate and the computer are (if you can, slide it under the door) where your classmate will write a reply on it and pass it back to you. You should then write a reply to that and repeat the process. Each conversation should be on a separate piece of paper, and be around 20 to 40 lines long (this means that each person/ computer should say around 10 - 20 lines in each conversation). Put a mark next to each of the lines you write, so that it is clear who wrote which lines.

If your classmate is currently supposed to be having the conversation (rather than the chatterbot), they will write the reply based on what they would say.

If the chatterbot is currently supposed to be having the conversation, your classmate should type what you said into the chatterbot and then write its reply on the piece of paper. Before submitting the line to the chatterbot, they should double check it was entered correctly.

A problem is that it will take longer for the conversation between you and the chatterbot than between you and the classmate, because of the need for your classmate to type what you say to the chatterbot. You wouldn’t want to make it obvious which was the computer and which was the human due to that factor! To deal with this, you could intentionally delay for a while before each reply to that they all take exactly one minute.

You can ask whatever you like, although keep in mind that you should be assuming you don’t know your classmate already, so don’t refer to common knowledge about previous things that happened such as in class or in the weekend in what you ask your classmate or the chatterbot. This would be unfair to the chatterbot since it can’t possibly know about those things.  Remember you’re evaluating the chatterbot on its ability to display human intelligence, not on what it doesn’t know about.

Good conversation topics would be favourite colours, games, foods, the weather, and the kinds of conversation topics you’d have with a person you don’t know but are having a friendly conversation with at work, the supermarket, or a party. Coming up with good things to ask is challenging but just ask yourself whether something would require knowledge of an event that not everybody could be expected to have.

Once both conversations are complete, you as the interrogator has to say which was your classmate, and which was the chatterbot. Your classmate should tell you whether or not you were correct.

These are some questions you can consider after you have finished carrying out the Turing Test:
- How were you able to tell which was the chatterbot and which was your classmate?
- Were there any questions you asked that were "unfair" --- that depended on knowledge your classmate might have but no-one (computer or person) from another place could possibly have?
- Which gave it away more: the content of the answers, or the way in which the content was expressed?

{image ai-turing-dating.png alt="The Turing dating test"}

### Project: Investigating chatterbots and the Turing test

{teacher}
This project is primarily intended to be presented as a written report for school assessment purposes. It is suitable for use for NZ digital technologies achievement standard 3.44. Students should work through this entire section (Chatterbot and the Turing Test) before attempting it.

There are 2 main components to this project: demonstrating understanding of chatterbots, and demonstrating understanding of turing test. In order to completely satisfy the standard, students should attempt both these components. Weaker students should focus on doing all the achieved parts rather than attempting some of achieved and some of merit. This is one of the two projects that students will need to do to satisfy the requirements of 3.44 (they will have to pick a project from one of the other five areas of computer science as well).

Students will demonstrate understanding of the current limitations of chatterbots, the techniques used by chatterbots, carrying out the Turing test on a chatterbot, and the idea that the Turing Test is a *formal* experiment used to determine whether or not a computer program is "intelligent"

Students should start this project by carrying out the Turing Test on a chatterbot they have chosen. They should ensure they keep a copy of each of the conversations. All students will need to take a turn as the interrogator, and the conversations they include in their report should be the ones obtained when they were the interrogator.
{teacher end}

In this project, you will write a report about your investigations of Chatterbots and the Turing Test.

The report consists of 2 parts. The first involves demonstrating that you understand the Turing Test by carrying out your own Turing Test and then answering some questions about the Turing Test. The second part involves having conversations with several chatterbots and investigating some common techniques they used in order to sound as though they have human intelligence.

If you haven’t already, carry out the Turing Test in the project in the above section. Once you have carried out the Turing Test and have your two conversations, answer the following questions in your report, to show you understand the Turing Test. *Make sure you include the two conversations in your report!*

{teacher}
A1 - The Turing Test attempts to address a key problem in AI; students should show they understand this problem. [this note and the following ones give the match between the student task and the requirements of the 3.44 standard. A1 means bullet point 1 of the achieved requirements]
{teacher end}

Explain what the Turing Test is for, using your experience with chatterbots as an example.

{teacher}
A2 - Students should describe an example of applying the Turing Test.
{teacher end}

Describe what you did to run a Turing Test, including a copy of the two conversations.

{teacher}
M1 - Students should describe the factors to be careful of when carrying out the Turing Test to show understanding of how the Turing Test works.
{teacher end}

When you were carrying out the Turing Test, you had to be careful to avoid external factors that gave away which was the computer and which was the human.  Explain some of these factors and why it is important to avoid them. (Some of them were mentioned in the text above!)

{teacher}
M2 E1- Students should discuss applications of the Turing test.
{teacher end}

Explain how the Turing Test could be used to evaluate a new chatbot. Discuss other possible applications of the Turing Test or similar tests for other programs that are supposed to be intelligent.  

{teacher}
E2 - Students should evaluate the effectiveness of the Turing test, discussing whether or not it is a good measure of intelligence, and the limitations of it.
{teacher end}

Discuss whether or not the Turing test is a good test of intelligence, giving reasons for your answer and using examples from your chatterbot experiments. What parts of *human* intelligence would the Turing test not capture?

Before completing this second part of your report, you should ensure you have talked to at least three chatterbots (either the ones talked about in this book or other ones you find).

{teacher}
A1 - Students should describe the key problem(s) that chatterbots are addressing
{teacher end}

What is it that chatterbots are trying to accomplish?

{teacher}
A2 - Students should describe various chatterbots, and show examples of conversations with the chatterbots.
{teacher end}

Describe the chatterbots that you have investigated. Show a brief conversation with each of them to illustrate what they do (no more than 10 lines for each conversation).

{teacher}
A2, M1, M2, E1, E2 - This exercise combines several of the requirements. Students have to describe/ explain/ discuss conversations with chatterbots to show they understand the different techniques that chatterbots use to sound like they have human intelligence (A2/M2/E1/E2), along with explaining how the technique actually works to show they understand the technique itself (M1)
{teacher end}

Choose at least two techniques used by chatterbots in an attempt to sound like they have human intelligence. The techniques you choose could be the identification of key words, canned responses, learning from humans, giving very general replies, or anything else you notice about how a chatterbot tends to speak or react that is an attempt to make it sound human (including techniques that make sense in some cases that the chatterbot uses them, but not in others!)

For each of the techniques you choose, do the following:
- Explain how the technique works, using specific examples.
- Give examples of specific chatterbots that use this technique, and examples of conversations with these chatterbots where it is obvious that they are using these techniques.
- Explain your examples in terms of the technique(s) they are illustrating.
- Discuss how well the techniques work and when they break.

{teacher}
E2 Students need to evaluate the chatterbots and the techniques they use.
{teacher end}

Which techniques seemed to be the most effective, if any? How could you tell that these chatterbots weren’t actually human? What were the main limitations of the chatterbots? Which chatterbot out of the ones you talked to do you think was the most intelligent? Which was the least intelligent? Why?

{teacher}
E1 This further builds on E1, getting students to discuss further practical applications on chatterbots, beyond the web entertainment ones they have looked at.
{teacher end}

Most of the chatterbots you have looked at here exist solely for the purpose of web entertainment, or as attempts to pass the Turing Test. These however aren’t the only applications of chatterbots. Discuss how chatterbots be useful in other applications, for example, help systems and games? Can you think of any other possible applications for chatterbots?

{teacher}
As further guidance as to what students should do, we have made this overall outline of how the project fits the standard. Note that this covers one of the two areas of computer science students have to cover in their report. They must pick one other area of computer science to do a project on as well.

- **Selected Area**: Artificial Intelligence
- **Key Problems**: Determining whether or not a computer program is intelligent, designing computer programs that have human intelligence
- **Key algorithm/Techniques**: The Turing Test, various chatterbot design techniques
- **Examples of practical applications**: various Chatterbots, carrying out the Turing Test.
- **Personalised student examples**: each student conversation should be unique

**For achieved, it could be expected that a student...**

*"describing key problems that are addressed in selected areas of computer science"*

- Describing the problem of designing intelligent computer programs and/or
- Describing the problem of determining whether or not a computer program is intelligent.

*"describing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas"*

- Carrying out a Turing Test experiment taking the role as the interrogator
- Describing how the Turing Test was carried out
- Reporting on the results
- Describing at least 2 or 3 chatterbots
- Showing conversations with at least 2 or 3 chatterbots
- Describe one technique that chatterbots use to construct their replies, including an example.

**For merit, it could be expected that a student...**

*"explaining how key algorithms or techniques are applied in selected areas"*

- Explaining what factors have to be considered when carrying out the Turing Test, to ensure a valid result.
- Explaining the details of at least two techniques chatterbots use to attempt to sound human

*"explaining examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas."*

- Explaining how the Turing Test could be used to evaluate a new chatterbot
- Giving examples of conversations with chatterbots that illustrate at least two of the techniques chatterbots use attempting to sound human

**For excellence, it could be expected that a student...**

"discussing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas"

- Discussing other possible applications of chatterbots, other than web entertainment.
- Discussing other possible applications of a Turing Test like experiment

*"evaluating the effectiveness of algorithms, techniques, or applications from selected areas."*

- Discussing the various chatterbots, and the techniques they use
- Discussing the effectiveness of the Turing Test
{teacher end}

## The whole story!

In this chapter so far, we have only talked about one application of AI. AI contains many more exciting applications, such as computers that are able to play board games against humans, computers that are able to learn, and computers that are able to control robots that are autonomously exploring an environment too dangerous for humans to enter.

Eventually further sections on other topics in AI will be added to this chapter.

## Further reading

- [Artificial Intelligence Strong and Weak - I Programmer](http://www.i-programmer.info/babbages-bag/297-artificial-intelligence.html)
- [The Paradox of Artificial Intelligence - I Programmer](http://www.i-programmer.info/programming/artificial-intelligence/2437-the-paradox-of-artificial-intelligence.html)

### Useful Links

- [CS Unplugged - Programming Languages - Harold the Robot](http://csunplugged.org/programming-languages-0)- related to why AI is so tricky
- [CS Unplugged - Artificial Intelligence - The Intelligent Piece of Paper](http://csunplugged.org/intelligent-paper)
- [CS Unplugged - The Turing Test - Conversations with Computers](http://csunplugged.org/turing-test)
- [Wikipedia- Outline of Artificial Intelligence](http://en.wikipedia.org/wiki/Outline_of_artificial_intelligence)
- [Wikipedia - Turing Test](http://en.wikipedia.org/wiki/Turing_test)
- [Wikipedia - Machine Learning](http://en.wikipedia.org/wiki/Machine_learning)
- [CS 4 FUN - Meet the Chatterbots](http://www.cs4fn.org/ai/meetthechatterbots.php)
- [CS 4 FUN - The Illusion of Intelligence](http://www.cs4fn.org/ai/illusionintelligence.php)
- [Alice Bot](http://www.alicebot.org/)
- [IEEE Spectrum](http://spectrum.ieee.org/robotics/artificial-intelligence)
- [TED Conversations matching Artificial Intelligence](http://www.ted.com/conversations/topics/artificial+intelligence)
