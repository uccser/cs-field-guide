# Fitts' Law
- Overview of Fitts' Law
- Fundamental idea is that the further away a target is and the smaller the target is, the harder it is to select.
- What about Fitts' Law in a real envrionment such as a plane (interactive below)?

{interactive slug="plane-turbulence" type="whole-page" text="true"}

Plane turbulence

{interactive end}

{comment Change name once we have decided!}

## Fitts' Law

{comment Most of this information is derived from COSC368 notes written by Andy Cockburn. }

- What is Fitts' Law
  - Model of rapid aimed human movement
  - Explain the distance of movement (D) and width (W) of target using a diagram.
  - Explain the Index of Difficulty (ID) formula, which measures the difficulty of rapid aimed movement. Units is bits.
  - \[
    ID = \log_{2} (D/W + 1)
    \]
  - Note the log relationship. E.g. doubling the distance (A) does not double the ID.
  - Movement time (MT) is linear with ID
  - Explain the MT formula. Note other formulas for MT exist.
  - \[
    MT = a + b * ID
    \]
  - The a and b values must be found empirically. Explain what this means.
  - For a mouse, a is typically around 200-500 ms, while b is typically around 100-300 ms/bit
  - Explain the velocity profile. Has an open-loop phase (shooting your pointer to approximately where the target is), and the close-loop phase (making small adjustments).
- Why do we care about Fitts' Law?
  - Helps UI designers (e.g. make commonly used buttons bigger, reduce the distance between buttons that are often used together)
  - Use the Fitts' Law Experiment Interactive below.
  - Another Fitts' Law experiment at http://simonwallner.at/ext/fitts/.


{image file-path="img/chapters/fitts-distance-and-width.png" alt="A diagram explaining what D and W are."}

{image file-path="img/chapters/fitts-velocity-profile.png" alt="A diagram showing the different stages of rapid aimed movement."}

{interactive slug="fitts-law" type="whole-page" text="true"}

Fitts\' Law Experiment

{interactive end}

## Pointing in non-ideal environments

- What about trying to point at things in a shaky environment (e.g. on a plane with turbulence?)

{interactive slug="clicking-with-shaking" type="whole-page" text="true"}

Clicking with Shaking

{interactive end}
