# Computer graphics (3.44) - Transformations
{commment}
[notes removed from chapter - need to be adapted for being a separate document]
{end comment}

{panel type="teacher-note" summary="xx"}

The section on [matrix transformations](chapters/computer-graphics.html#matrix-transforms) covers material for an example for the 3.44 standard through the following components:

- Key problem: Positioning graphics images in 2D and 3D space
- Practical application: Any artificially rendered 2D or 3D image e.g. 3D drawing program, artificial reality, movie animation, 2D drawing programs
- Algorithm/technique: matrix transformation (transforms, translation, scaling, rotation)
- Evaluation: number of calculations or time required to render an image
- Personalised student examples: a student's choice of transform values to illustrate the techniques (values used for scaling, rotation and translation)

This section introduces matrix algebra; it doesn't assume prior knowledge, and the idea is to show the value of matrix multiplication by first having students do the calculations manually.
{panel end}

## Notes on the "3D transforms" projects

{panel type="teacher-note" summary="Explanation"}
This project involves combining transforms, and discussing the matrices needed, and how they can be combined to just one operation.

This project is suitable for the 3.44 (AS91636) NZ standard. The "key problem" is positioning graphics in 3D space, "practical applications" would be for creating images and animations, the "key algorithm/technique" is matrix algebra. The effectiveness could be evaluated by the number of values needed to specify the transformations (a strong student could also look into the total number of multiplications and additions performed to calculate the positions by the matrix operations). The project should explain the purpose of example values, including translation, scaling and rotation.

{panel end}

The introduction (examples of the use of graphics in movies etc.) matches A1 in the 3.44 standard :"describing key problems that are addressed in selected areas of computer science".

Having students make up their own simple 3D scene personalises the work, so the markers can be assured that the student has developed themselves.
An initial description of a scene matches A2 "describing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas" i.e. placing objects in a scene. This should refer to the transforms (e.g. rotation by 90 degrees, scaling by a factor of 2) rather than the actual matrices that do these transforms).

The simple examples of translation, scaling *and* rotation cover M1: "explaining how key algorithms or techniques are applied in selected areas"

Showing how an object can be positioned to a desired location covers M2: "explaining examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas."

Showing the matrices used is E1: "discussing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas"

Discussing how matrices are combined into one single operation, if done carefully, covers E2: "evaluating the effectiveness of algorithms, techniques, or applications from selected areas". Ideally students should discuss how many individual multiplications and additions are required if the matrices are applied to each point separately, and compare that with the number of operations required if the matrices being combined into one operation (they key here is that the transform is being done to every point in the object being transformed, so it may be repeated hundreds or even thousands of times.)

The alternative project using WebGL or OpenGL should only be tackled by students with a lot of confidence in the relevant programming languages; it will likely take more time than the previous project, and students will need to be aware that they will be marked on their report on the key concepts, not on their achievement in programming.
However, by programming a graphics system, they will gain a deeper understanding of the issues.
