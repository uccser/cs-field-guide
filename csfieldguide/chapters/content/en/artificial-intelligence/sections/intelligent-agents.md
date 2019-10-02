# Intelligent Agents

Artificial Intelligence (also known as {glossary-link term="intelligent-systems"}intelligent systems{glossary-link end}) is about creating and analysing machines and computer systems that act intelligently, or demonstrate intelligence. These machines and systems are often referred to as {glossary-link term="agent"}*computational agents*{glossary-link end}.

An agent is simply something which executes actions within an environment, which is a very broad definition! It can apply to many things &ndash; robots, cats, air-conditioning units, or humans.
If the decisions and actions made by an agent can be broken down into computational steps (i.e. steps which could be implemented by programming a device) then it is referred to as a *computational* agent.
<!-- this might be a little over simplified? -->

For simplicity, throughout the rest of this chapter we will use the term *agent* to refer specifically to agents made up of digital systems, such as computers and robots.

Not all agents are called intelligent though. In the field of AI, an agent is generally considered to act intelligently if:

- It can mimic elements of human intelligence, such as problem solving and learning.
- It can interpret external data collected from its environment, takes appropriate actions that move it towards it's goals, whilst taking into account the future consequences of these actions.
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

- Highly specialised and constrained environments, for example, a game of chess and a chess playing agent. The agent is designed to function exclusively in this environment and is unable to function in others.
- More general and less controllable environments, for example, the open road and a self-driving car. The agent is designed to function in a dynamic, complex, and unpredictable environment.

{panel end}

<!-- Add in diagram of agent -->

Some intelligent agents follow preprogrammed rules only, while others are able to learn from their experiences and modify their behaviour.
There is some debate among AI experts about whether or not systems that do not learn are examples of AI, and whether the ability to learn should be considered a requirement of *intelligence*.
People have different opions of what the definition of AI is, and whether this definition will change in the future as technology in this area advances.

In this chapter we will look at examples of both learning, and non-learning agents as examples of artificially intelligent agents.
While you read about these have a think about whether you would consider these different agents to be intelligent, and how you might define intelligence and AI.
