# Reinforcement Learning

The three types of learning we have looked at so far all have one major requirement: they need a set of example data to learn from.
But what if you don’t have access to example data to train your system with?
This is where **Reinforcement Learning** comes in.

In reinforcement learning an agent learns through trial and error, and by exploring their environment.
It performs an action, observes the effect this has on its environment and the reaction it produces, and uses this new knowledge to decide what actions to take in the future.
These inputs it receives from the environment can be considered as "rewards" or "punishments". Rewards and punishments reinforce its behaviour.
The only prior knowledge the agent is given (in most cases) is what a "good" outcome (a reward) is, and what a "bad" one (a punishment) is.

For example, say we have a game playing agent which has the goal of learning to play Tetris. Initially it doesn’t know anything about the game, it doesn’t know the rules, or what the effect of any of its moves have. All it knows is winning is good, and losing is bad. As it plays it is given feedback. It starts of making random moves, and if it happens to win, it knows it did something good, and if it loses it knows it did something bad! Using this knowledge it can begin to build a model of how to play, and ideally win, the game.

[AlphaGo](https://en.wikipedia.org/wiki/AlphaGo) is a famous example of a game playing computer program that used reinforcement learning, along with other ML techniques, to become an expert player of the board game Go and defeated the human world champion in 2016. It has since been surpassed by its successor, [AlphaGo Zero](https://en.wikipedia.org/wiki/AlphaGo_Zero), a system trained entirely with reinforcement learning!

## Robotics

One of the main applications of reinforcement learning is in robotics.
Reinforcement learning is particularly useful for teaching robots to do things that humans cannot directly program them to do, such as responding to unpredictable events, or do things that humans aren't actually very good at themselves!

- Drones flying autonomously in different weather conditions.
- [Balance a vertical pole on a surface](https://www.youtube.com/watch?v=XxFZ-VStApo).
- Adapt to changes in the environment and the robots goals.




<!-- Add agent diagram that is more robot like -->
