# Rule-based Systems

Rule-based systems, sometimes referred to as expert systems, are probably the simplest form of AI used (and not everyone considers them a form of AI anymore), but they can still be very powerful, particularly when used in conjunction with other AI techniques.
They have been used for many purposes, such as diagnosing medical conditions, creating game playing AI's and, as will explore in this chapter, simulating human conversation.

These systems are designed to simulate the decision making ability of a human-expert in a specific domain.
They operate by following a set of pre-programmed rules, or logical statements.

 - write some kind of example. "Think of..." - Medical diagnosis

- considered by some to not actually be a form of AI
- Has a fixed set of knowledge/rules that it then applies. Rigid intelligence
- Follows a pre-determined set of rules, which it uses to make decisions about input data.
- Simplest form of AI,

Started from the idea that you could represent human knowledge as simple rules. If this then that.


Commonly used for...

<!-- https://en.wikipedia.org/wiki/Clinical_decision_support_system#Knowledge-based_CDSS -->

<!-- https://en.wikipedia.org/wiki/Computer-aided_diagnosis -->

What they are good at and not so good at...

- Narrow intelligence
- focus on doing a small range of tasks well.


<!-- Would be awesome to work in a little bit of prolog -->

<!-- Game stuff? Medical diagnosis? -->


- Decision trees to classify an animal?


Sometimes combined with ML, generally with ML algorithms which produce rule based systems.

- ML that produces decision trees



## Chatbots

*This section may be replaced in the future*

As was discussed in the previous section on the Turing test, having the ability to carry out a sensible conversation with a human is something that shows a computer is intelligent.
Many attempts have been made to design {glossary-link term="program"}computer programs{glossary-link end} that can have a conversation with a human and sound intelligent.
These computer programs are called {glossary-link term="chatbot"}chatbots{glossary-link end}.

You may come across chatbots online for specific uses (such as giving help on a booking website). Sometimes it's hard to tell if you're getting an automated response, or actually speaking to a human.
We'll start off by looking at some very simple chatbots that are only designed as experiments, rather than to offer serious advice.

One example of these chatbots is **Eliza**, one of the earliest developed {glossary-link term="natural-language-processing"}natural language processing{glossary-link end} computer programs. This system was intended to get people thinking about AI.

Eliza attempts to sound like a Rogerian Psychotherapist, and sounds most intelligent in the kind of conversation that would be had in a therapy session ([Rogerian Psychotherapy](https://en.wikipedia.org/w/index.php?title=Rogerian_psychotherapy) is a technique that revolves around trying to understand the client by asking questions and reflecting their statements back to clarify that they've been understood).

{panel type="caution"}

# Chatbots and personal information!

Eliza is a system that was intended to get people thinking about AI, and you should *not* use it for your own therapeutic usage.
You should never enter personal information into a computer that you wouldn’t want anybody else reading, as you can never be certain that the website isn’t going to store the information or pass it on to someone.
So you don’t want to be telling Eliza the kinds of things a person would say in a therapy session &ndash; just make stuff up when talking to Eliza!
For the same reason, do *not* tell any chatbot other personal information such as your full name, date of birth, or address.

{panel end}

Go to the link just below and have a conversation with Eliza (keeping in mind that it is supposed to be a Rogerian Psychotherapist, so will respond like one).

[Click here to use the Eliza chatbot](http://www.manifestation.com/neurotoys/eliza.php3)

{image file-path="img/chapters/eliza-chatbot-screenshot.png" alt="A screenshot of an Eliza chatbot"}

Do you think Eliza is as smart as a human?
Would you believe it was a human if somebody told you it was?

While Eliza might sound somewhat intelligent at times, it gives very vague and general replies, forgets earlier parts of the conversation, and says some things that sound very strange!
As an example, here is a conversation with Eliza:

**Eliza**: Hello, I am Eliza.  
**Human**: Hello I am a human  
**Eliza**: Do you believe it is normal to be a human?  
**Human**: Yes  
**Eliza**: Are you Sure?  
**Human**: Yes  
**Eliza**: Why did you repeat yourself?

Eliza gives very general replies by looking for suitable rules based only on the line you've just typed, and that often leads to some very weird conversations, such as the one above!
In this case Eliza used {glossary-link term="pattern-matching"}pattern matching{glossary-link end} to determine that it might be appropriate to ask "Do you believe it is normal to be a human?", in response to "I am" followed by "a human"; if we had said "I am a banana" then the same rule would have resulted in "Do you believe it is normal to be a banana?"

When we answered "Yes", Eliza didn't actually understand the *meaning* of "Yes", so simply asked if we were sure, as it has a general response that says a good way of responding to somebody saying "Yes" is to ask them if they were sure.
Eliza also has rules that are triggered if somebody repeats themselves, that say it should ask them why.
Because Eliza doesn’t actually understand meanings but instead just follows rules that say what might be appropriate responses, it had no way of knowing that it actually *was* meaningful to respond with "Yes" twice!
This is a big giveaway that Eliza really isn’t that intelligent, and doesn’t actually understand meanings in conversation, or even whether or not a response to their own question makes sense.
These responses that Eliza is giving are called *canned responses*.

Another example of a rule-based chat-bot is **A.L.I.C.E** (or simply Alice), which stands for "Artificial Linguistic Internet Computer Entity".

While Eliza is a chatbot that works with a restricted domain (trying to take the role of a therapist), the creators of Alice aimed to make it work for more general conversation.
Try having a conversation with Alice.

[Click here for the Alice chatbot at pandorabots.com](https://www.pandorabots.com/pandora/talk?botid=b8d616e35e36e881)

{image file-path="img/chapters/alice-chatbot-screenshot.png" alt="The Alice chatbot at pandorabots.com"}

Does Alice sound more intelligent than Eliza?
Does it sound as intelligent as a human, or can you trick them into saying things that make no sense?

Like Eliza, Alice also uses predetermined rules to know what to say, although it has a lot more of these rules and a more sophisticated algorithm for choosing which rules should be used to determine what to say.
If you want to know more, just ask Alice how it works, and it will tell you!

Some possible rules that Alice might have are:

- If family members are mentioned (e.g. "mum", "dad", or "brother") say something that is about family.
- If "favourite colours" are mentioned, say your favourite colour is "transparent".

To use the rules, the chatbot analyses your last sentence (and possibly earlier sentences also) by matching the sentence against the patterns in its rules.
If the sentence matches the rule pattern, Alice will give the reply that the rule specifies
Sometimes the reply is just a template for a sentence, and the chatbot analyses the text you typed to extract words that can be inserted into the template.
That’s why the replies sometimes use part of what you typed.

The quality of these rules determines how intelligent the chatbot will sound.  

While Alice is undoubtedly more intelligent sounding than Eliza, Alice still has it's limitations.
Sometimes it even admits to those limitations!
Try asking it why it said something that didn't make sense.

These two chatbots are entirely rule-based, but these days many of the chatbots you can interactive with online also incorporate Machine Learning algorithms, which we will look at in the next section.
