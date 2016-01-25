# Computer graphics (3.44) - Bresenham line and circle drawing
{commment}
[notes removed from chapter - need to be adapted for being a separate document]
{end comment}

## Notes on Bresenham project

This section on transforms covers material for an example for the 3.44 standard through the following components:

- Key problem: rendering lines and circles on a 2D image of pixels
- Practical application: Paint programs, rendering 2D and 3D images, drawing charts and graphs, rendering scalable vector graphics, displaying fonts etc.
- Algorithm/technique: Equation of a line and Bresenham's line-drawing algorithm
- Evaluation: number of calculations required by each approach
- Personalised student examples: a student's randomly chosen start and endpoint for a line drawing example

There are some very good illustrations of approaches to this problem [on this site](http://www.redblobgames.com/grids/line-drawing.html), which could be used as the basis of a project.


This project is suitable for the 3.44 (AS91636) NZ standard. The "key problem" is drawing lines and circles in 2D graphics, "practical applications" would be for drawing programs and rendering images based on lines and curves (including scalable fonts), the "key algorithm/technique" is Bresenham's line and circle drawing algorithm. The effectiveness could be evaluated by the number of arithmetic calculations needed to draw a sample line, and students can compare the {math}mx+b{math end} method with Bresenham's (the latter will require a lot fewer calculations; these can be counted accurately for a given line, so as long as students choose their own starting and ending points, their calculations are going to be slightly different to others' which gives good authenticity for the project).

For the standard it isn't strictly necessary to measure the actual time of each operation, but this will help to make the experience more authentic since the speed will be for the computer the student is using, and also can lead to very practical estimates, such as how many lines the computer could drawn in a second using each method.

A strong student could also look into the total number of arithmetic operations performed to calculate a circle using Bresenham's method compared with using the equation of a circle (which is based on {math}x^2{math end} + {math}y^2{math end} = {math}r^2{math end}). The project can give visual examples of objects that are specified as lines and circles, such as a scalable font.

These algorithms could be used as a simple programming assignment where the calculations are implemented and the program outputs the coordinates of the line (or draws the pixels if that is easy in the language being used).

Each student should choose random starting and ending points so each draws a different line. Make sure that they don't choose horizontal, vertical or diagonal lines, as these are trivial (although it would be a good exercise to do these *as well* as one at a more difficult angle to help understand how the algorithm works).

If a class need to choose some points, the teacher could allocate different pairs to each student,
Another way would be to base them on students' names as follows. For the start point of the line, choose the X value as the first letter in the student's given name converted to a number (e.g. Caren would be 3, because C is the third letter in the alphabet). If the number is greater than 19, subtract 20 from it. For the Y value of the start point, choose the number made with the second letter of their first name.  For the end point of the line, use the first two letters of their family name. For example: If the name was John Smith, you would use the 'Jo' in John to choose the starting point (10, 15). You would then use the 'Sm' in Smith to choose the ending point (19, 13). If this produces a trivial line (horizonal or diagonal), add one to one of the points.
