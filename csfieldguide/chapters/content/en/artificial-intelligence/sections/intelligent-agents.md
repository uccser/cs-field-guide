# Intelligent Agents

Artificial Intelligence (also known as {glossary-link term="intelligent-systems"}intelligent systems{glossary-link end}) is about creating and analysing machines and computer systems that act intelligently, or demonstrate intelligence. These machines and systems are often referred to as {glossary-link term="agent"}computational agents{glossary-link end}.

An agent is simply something which executes actions within an environment, which is a very broad definition! It can apply to many things &ndash; robots, cats, air-conditioning units, or humans.
If the decisions and actions made by an agent can be broken down into computational steps (i.e. steps which could be implemented by programming a device) then it is called a *computational* agent.
<!-- this might be a little over simplified? -->

For simplicity, throughout the rest of this chapter we will use the term *agent* to refer specifically to agents made up of digital systems, such as computers and robots.

Not all agents are called intelligent though. In the field of AI, an agent is generally considered to act intelligently if:

- It can mimic elements of human intelligence, such as problem solving and learning.
- It can interpret external data collected from its environment, takes appropriate actions that move it towards its goals, whilst taking into account the future consequences of these actions.
- Or it has the ability to learn from data and past experience, and then make predictions and decisions based on this and its existing knowledge.

For example, lets say you have two little vacuuming cleaning robots that move around your house autonomously.
One of them senses when it collides with walls, or is about to drive of an edge, and changes direction.
As it moves through the house it builds an internal map of its surroundings based on the objects it encounters, and learns how to navigate and make sure it vacuums everywhere.
This robot has a specific goal (to keep your floor nice and clean), and uses knowledge of its environment to inform the decisions it makes as it tries to achieve this goal.
This would be called an intelligent agent.

On the other hand, the second one just rotates a set amount every few minutes, and occasionally goes tumbling down the stairs.
This robot would certainly not be considered intelligent!
While it is trying to achieve the same goal as the other robot and is taking actions to try and achieve this, it is not taking into account its environment and past experiences, or using external data to inform its decisions.
Both of these robots are following a pre-programmed set of instructions, but only one is making decisions based on its knowledge of the world around it.

{panel type="jargon-buster"}

# Environments

Our use of the word *environment* may seem to imply that agents always exist within, and interact with, a physical setting.
For example the vacuuming robots that exist within the physical environment of a house, and interact with it by having sucking up dust and having a physical impact on their environment.

However this is not true for all agents. Some exist within purely artificial computational environments.
Their environments are restricted to the digital data they take in, the computational processes they perform, and the data they output.

Agents tend to operate in one of two types of environments:

- Highly specialised and constrained environments, for example a game of chess and a chess playing program. The agent is designed to function exclusively in this environment and is unable to function in others.
- More general and less controllable environments, for example the open road and a self-driving car. The agent is designed to function in a dynamic, complex, and unpredictable environment.

{panel end}

**temporary diagram:**

{image file-path="img/chapters/intelligent-agent-diagram-temporary.png" alt="A basic diagram of an intelligent agent. Temporary image"}

Some intelligent agents follow preprogrammed rules only, while others are able to learn from their experiences and modify their behaviour.
There is some debate among AI experts about whether or not systems that do not learn should be considered intelligent, and whether the ability to learn is a requirement of AI.
People have different opions of what the definition of AI is, and whether this definition should change over time as technology in this area advances.

In this chapter we will look at examples of both learning, and non-learning agents as examples of artificially intelligent agents.
While you read about these have a think about whether you would consider these different agents to be intelligent, and how you might define intelligence and AI.

## The Turing Test

The Turing test is a famous Artificial Intelligence experiment, that was developed by the Computer Scientist Alan Turing in 1950.
He proposed this test as a way to determine if a computer truly was intelligent.
To pass the Turing test, a computer program must convince a human that it is also a human by having a conversation.
While having a simple conversation seems like a very easy thing to do to us humans, it is actually an extremely complicated thing for a computer to do.
Correctly interpretting what someone says to you, and choosing appropriate things to say based on the conversation is a form of intelligence.
Defining intelligence as having this ability is what Turing based his test on.

{panel type="teacher-note"}

# TED video introducing the Turing test

There is a TED video that gives an overview of the Turing test [on YouTube](https://www.youtube.com/watch?v=3wLqsRLvV-c).

{panel end}

Two humans are required to carry out this test.
One of the humans act as an interrogator, and the other as a "human" to compare the computer program to. The interrogator is put in a separate room from the computer running the computer program and the "human". The interrogator has conversations with both the human and the computer program, but isn’t told which one they are having the conversation with at each time. The conversations are both carried out over something like an instant messaging program so that actual speech isn’t required from the computer program. During the conversations, the human has to convince the interrogator that they are indeed the human, and the computer program has to convince the interrogator that IT is actually the human. At the end of the conversations, the interrogator has to say which was the computer and which was the human. If they can’t reliably tell, then the computer is said to have passed the test.

{image file-path="img/chapters/Turing_Test_version_3.png" source="https://en.wikipedia.org/wiki/File:Turing_Test_version_3.png" alt="A basic Turing test diagram"}

As of the time this chapter was written, no computer program has officially passed the test, but some have been claimed to pass it in [specific circumstances](https://www.cnet.com/news/alphabet-chairman-says-google-duplex-passes-turing-test-in-one-specific-way-io-2018/).

Other forms of the Turing test exist as well. Video games often have computer controlled characters that play with or against you, in place of a second human controlled character. A variation of the Turing test can be used to determine whether or not the computer controlled player seems to have human intelligence by getting an interrogator to play against both the computer character and the human character, and to see whether or not they can tell them apart.

In fact, many parts of human intelligence could be tested using a variation of the Turing test. If you wanted a computer chess player that seemed like a human as opposed to a computer (as some people might prefer to be playing against a human rather than a computer), you could use a Turing test for this as well! What other possible Turing tests can you think of?
