
# trAIning ground Interactive

**Created by:**

- Lia Dawson
- William Taylor
- Greg Mohler
- Rachel Muzzelo

The original can be found [here](https://github.com/wtaylor45/374-sticks-game).

**Rebuilt by:** Alasdair Smith

This interactive demonstrates how an AI makes decisions through a neural network.

## The game

The goal of the game is to pick up the final stick from a pile.
The player and AI (Nathaniel) will alternate picking up between 1 and 3 sticks.
At the conclusion of the game, Nathaniel will update its neural network based on the moves it made and the result of the game.
Its neural network can be seen by the player as a probability table on the right side of the screen.

## URL Parameters

Type `?[parameters]` after the interactive URL for the following parameters, where `[parameters]` is any number of the following, in any order, separated by `&`:

- `playerStart=true|false|X` (default = false): Sets the probability of the player taking their turn first.
  - If `true` or `X`>=`1` the player will always go first.
  - If `false` or `X`<=`0` the AI will always go first.
  - If `X` is between `0` and `1` the given number will be assigned as the probability.
- `selfStudy=true|false` (default = false): Sets whether the AI will run simulations against itself (`true`) or an intelligent opponent with its own preset probability table (`false`).

## Assets

- `stick.png`: Public domain image from [publicdomainvectors.org](https://publicdomainvectors.org/en/free-clipart/Stick-vector-image/81315.html)

## Licences

This interactive uses [noUiSlider](https://refreshless.com/nouislider/) by Léon Gersen.
Its licence can be found in `LICENCE-THIRD-PARTY` with a full copy available in the `third-party-licences` directory.
