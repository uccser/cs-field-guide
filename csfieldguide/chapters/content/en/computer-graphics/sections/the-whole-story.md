## The whole story!

We've only scraped the surface of the field of computer graphics.
Computer scientists have developed algorithms for many areas of graphics, including:

- Lighting (so that virtual lights can be added to the scene, which then creates shading and depth)
- Texture mapping (to simulate realistic materials like grass, skin, wood, water, and so on),
- Anti-aliasing (to avoid jaggie edges and strange artifacts when images are rendered digitally)
- Projection (working out how to map the 3D objects in a scene onto a 2D screen that the viewer is using),
- Hidden object removal (working out which parts of an image can't be seen by the viewer),
- Photo-realistic rendering (making the image as realistic as possible), as well as deliberately un-realistic simulations, such as "painterly rendering" (making an image look like it was done with brush strokes), and
- Efficiently simulating real-world phenomena like fire, waves, human movement, and so on.

The matrix multiplication system used in this chapter is a simplified version of the one used by production systems, which are based on [homogeneous coordinates](https://en.wikipedia.org/wiki/Homogeneous_coordinates).
A homogeneous system uses a 4 by 4 matrix  (instead of 3 by 3 that we were using for 3D).
It has the advantage that all operations can be done by multiplication (in the 3 by 3 system that we used, you had to multiply for scaling and rotation, but add for translation), and it also makes some other graphics operations a lot easier.
Graphics processing units (GPUs) in modern desktop computers are particularly good at processing homogeneous systems, which gives very fast graphics.

{panel type="curiosity"}

# Möbius strips and GPUs

Homogeneous coordinate systems, which are fundamental to modern computer graphics systems,
were first introduced in 1827 by a German mathematician called
[August Ferdinand Möbius](https://en.wikipedia.org/wiki/August_Ferdinand_M%C3%B6bius).
Möbius is perhaps better known for coming up with the [Möbius strip](https://en.wikipedia.org/wiki/M%C3%B6bius_strip),
which is a piece of paper with only one side!

Matrix operations are used for many things other than computer graphics, including computer vision, engineering simulations, and solving complex equations.
Although GPUs were developed for computer graphics, they are often used as processors in their own right because they are so fast at such calculations.

The idea of homogeneous coordinates was developed 100 years before the first working computer existed, and it's almost 200 years later that Möbius's work is being used on millions of computers to render fast graphics.
An [animation of a Möbius strip](https://www.youtube.com/watch?v=ZN4TxmWK0bE) therefore uses two of his ideas, bringing things full circle, so to speak.

{panel end}
