# Drawing lines and circles

A fundamental operation in computer graphics is to draw lines and circles.
For example, these are used as the components of scalable fonts and vector graphics;
the letter "g" is specified as a series of lines and curves,
so that when you zoom in on it the computer can redraw it at whatever resolution is needed.
If the system only stored the pixels for the letter shape, then zooming in would result in a low quality image.

{comment to add sometime, Jargonbuster: pixel (somewhere in the chapter) - also mention pel and bitmap, and origins of the terms. see www.foveon.com/files/ABriefHistoryofPixel2.pdf}

{image file-path="img/chapters/vector-letter-with-outline.png" caption="true" alt="The points used to create the letter g."}

The points used to create the letter 'g' in Google's logo"

{image end}

In 3D graphics shapes are often stored using lines and curves that mark out the edges of tiny flat surfaces (usually triangles), each of which is so small that you can't see them unless you zoom right in.

{image file-path="img/chapters/dolphin-triangle-mesh.png" alt="3D image of a dolphin constructed out of triangles."}

{comment Public domain image: https://en.wikipedia.org/wiki/Triangle_mesh#/media/File:Dolphin_triangle_mesh.png}

The lines and circles that specify an object are usually given using numbers (for example, a line between a given starting and finishing position or a circle with a given centre and radius).
From this a graphics program must calculate which pixels on the screen should be coloured in to represent the line or circle, or it may just need to work out where the line is without drawing it.

For example, here's a grid of pixels with 5 lines shown magnified.
The vertical line would have been specified as going from pixel (2, 9) to (2, 16) &ndash; that is, starting 2 across and 9 up, and finishing 2 across and 16 up.
Of course, this is only a small part of a screen, as normally they are more like 1000 by 1000 pixels or more; even a smartphone screen is hundreds of pixels high and wide.

{interactive slug="pixel-grid" type="iframe" parameters="eg=basic&noedit"}

These are things that are easy to do with pencil and paper using a ruler and compass, but on a computer the calculations need to be done for every pixel, and if you use the wrong method then it will take too long and the image will be displayed slowly or a live animation will appear jerky.
In this section we will look into some very simple but clever algorithms that enable a computer to do these calculations very quickly.

## Line drawing

{panel type="teacher-note"}

# Handouts for students to work on

The students are asked to draw several lines in this section on grids;
you could print a supply of these for them, or use graph paper.

{panel end}

To draw a line, a computer must work out which pixels need to be filled so that the line looks straight.
You can try this by colouring in squares on a grid, such as the one below (they are many times bigger than the pixels on a normal printer or screen).
We'll identify the pixels on the grid using two values, (*x*, *y*), where *x* is the distance across from the left, and *y* is the distance up from the bottom.
The bottom left pixel below is (0, 0), and the top right one is (19, 19).

Try to draw these straight lines by clicking on pixels in the following grid:

- from  (2, 17) to (10, 17)
- from  (18, 2) to (18, 14)
- from  (1, 5)  to (8, 12)

{interactive slug="pixel-grid" type="iframe"}

{comment The grids in this section could be interactive, click on each pixel, and get it to check if the line is correct}

{panel type="teacher-note"}

# Solution

The above three lines are easy to draw as they are horizontal, vertical and diagonal.

{interactive slug="pixel-grid" type="iframe" parameters="eg=s3l&noedit"}

{panel end}

Drawing a horizontal, vertical or 45 degree line like the ones above is easy; it's the ones at different angles that require some calculation.

Without using a ruler, can you draw a straight line from A to B on the following grid by colouring in pixels?

{interactive slug="pixel-grid" type="iframe" parameters="Ax=3&Ay=4&Bx=16&By=9"}

Once you have finished drawing your line, try checking it with a ruler.
Place the ruler so that it goes from the centre of A to the centre of B.
Does it cross all of the pixels that you have coloured?

## Using a formula to draw a line

The mathematical formula for a line is \( y = mx + c \).
This gives you the *y* value for each *x* value across the screen,
and you get to specify two things: the
{glossary-link term="slope" reference-text="computer graphics"}slope{glossary-link end} of the line,
which is \( m \),
and where the line crosses the *y* axis, which is \( c \).
In other words, when you are *x* pixels across the screen with your line, the pixel to colour in would be (\( x \), \( mx + c \)).

For example, choosing \( m=2 \) and \( c=3 \) means that the line would go through the points (0, 3), (1, 5), (2, 7), (3, 9) and so on.
This line goes up 2 pixels for every one across \( m=2 \), and crosses the y axis 3 pixels up (\( c=3 \)).

You should experiment with drawing graphs for various values of \( m \) and \( c \) (for example, start with \( c=0 \), and try these three lines: \( m=1 \), \( m=0.5 \) and \( m=0 \)) by putting in the values.
What angle are these lines at?

{panel type="teacher-note"}

# Solution

A slope of 0 is a horizontal line. Using \( m=1 \) will be at 45 degrees, because you go up 1 pixel for each one that you go across.
A slope of a half (\( m=0.5 \)) is just under 27 degrees.
There's a [demonstration here](http://www.mathopenref.com/coordslope.html) of slopes, which has an option for showing the angle (which might be more familiar to students.)

{panel end}

The \( mx + c \) formula can be used to work out which pixels should be coloured in for a line that goes between \( (x_1, y_1) \) and \( (x_2, y_2) \).
What are \( (x_1, y_1) \) and \( (x_2, y_2) \) for the points A and B on the grid below?

{panel type="teacher-note"}

# Solution

The calculations for a line from A to B above are as follows.
The two points are A = (3, 4) and B = (16, 9).
This means that \( x_1 = 3, y_1 = 4, x_2 = 16 \) and \( y_2 = 9 \).

{panel end}

See if you can work out the \( m \) and \( b \) values for a line from A to B, or you can calculate them using the following formulas:

\[
m = \frac{(y_2 - y_1)}{(x_2 - x_1)}\\
b = \frac{(y_1x_2 - y_2x_1)}{(x_2-x_1)}
\]

{panel type="teacher-note"}

# Solution

For the formula for a line this results in:

\\[
m = \frac{(9 - 4)}{(16 - 3)}  = 5/13 = 0.384615
\\]
\\[
b = \frac{(4 \times 16 - 9 \times 3)}{(16-3)} = 37/13 = 2.846154
\\]

So we can use the formula \( y = 0.384615x + 2.846154 \).

For the next question, this can be put into a spreadsheet to give the values for the pixel locations as follows:

| *x* | *y* |
|-----|-----|
| 3  |  4.000 |
| 4  |  4.385 |
| 5  |  4.769 |
| 6  |  5.154 |
| 7  |  5.538 |
| 8  |  5.923 |
| 9  |  6.308 |
| 10 |  6.692 |
| 11 |  7.077 |
| 12 |  7.462 |
| 13 |  7.846 |
| 14 |  8.231 |
| 15 |  8.615 |
| 16 |  9.000 |

{panel end}

Now draw the same line as in the previous section (between A and B) using the formula \( y = mx + c \) to calculate \( y \) for each value of \( x \) from \( x_1 \) to \( x_2 \) (you will need to round \( y \) to the nearest integer to work out which pixel to colour in).
If the formulas have been applied correctly, the \( y \) value should range from  \( y_1 \) to \( y_2 \).

{interactive slug="pixel-grid" type="iframe" parameters="Ax=3&Ay=4&Bx=16&By=9"}

{panel type="teacher-note"}

# Solution

The following image shows which pixels would be coloured in (rounding the coordinates above to the nearest integer).

{interactive slug="pixel-grid" type="iframe" parameters="eg=sod&noedit"}

{panel end}

Once you have completed the line, check it with a ruler.
How does it compare to your first attempt?

Now  consider the number of calculations that are needed to work out each point.
It won't seem like many, but remember that a computer might be calculating hundreds of points on thousands of lines in a complicated image.
Although this formula works fine, it's too slow to generate the complex graphics needed for good animations and games.
In the next section we will explore a method that greatly speeds this up.

{panel type="teacher-note"}

# Solution

Each point requires a multiplication and an addition, and also needs to round the numbers.
Multiplications are relatively slow, and one is required for every pixel in the output (there could be thousands or even millions of pixels to calculate, so can be very significant!).
Even worse, the numbers are floating point, which usually have slower arithmetic than integers.

{panel end}

## Bresenham's Line Algorithm

A faster way for a computer to calculate which pixels to colour in is to use Bresenham's line algorithm.
It follows these simple rules.
First, calculate these three values:

\[
A = 2 \times (y_2 - y_1)
\\
B = A - 2 \times (x_2 - x_1)
\\
P = A - (x_2 - x_1)
\]

To draw the line, fill the starting pixel, and then for every position along the *x* axis:

- If \( P \) is less than 0, draw the new pixel on the same line as the last pixel, and add \( A \) to \( P \).
- If \( P \) was 0 or greater, draw the new pixel one line higher than the last pixel, and add \( B \) to \( P \).
- Repeat this decision until we reach the end of the line.

Without using a ruler, use Bresenham's line algorithm to draw a straight line from A to B:

{interactive slug="pixel-grid" type="iframe" parameters="Ax=3&Ay=4&Bx=16&By=9"}

Once you have completed the line, check it with a ruler.
How does it compare to the previous attempts?

{panel type="teacher-note"}

# Solution

This table shows the values that would be calculated using Bresenham's method for the above example:

| Calculation | Pixel to colour in |
|-------------|--------------------|
| \( A = 10,  B = -16 \) | Draw the starting pixel |
| \( P_0 = -3 \) | Next pixel (to the right) is on the same row as the starting pixel. |
| \( P_1 = 7 \) | Next pixel is on the row above the previous pixel. |
| \( P_2 = -9 \) | Next pixel is on the same row as the previous pixel. |
| \( P_3 = 1 \) | Next pixel is on the row above the previous pixel. |
| \( P_4 = -15 \) | Next pixel is on the same row as the previous pixel. |
| \( P_5 = -5 \) | Next pixel is on the same row as the previous pixel. |
| \( P_6 = 5 \) | Next pixel is on the row above the previous pixel. |
| \( P_7 = -11 \) | Next pixel is on the same row as the previous pixel. |
| \( P_8 = -1 \) | Next pixel is on the same row as the previous pixel. |
| \( P_9 = 9 \) | Next pixel is on the row above the previous pixel. |
| \( P_{10} = -7 \) | Next pixel is on the same row as the previous pixel. |
| \( P_{11} = 3 \) | Next pixel is on the row above the previous pixel. |
| \( P_{12} = -13 \) | Next pixel is on the same row as the previous pixel. |

{panel end}

## Lines at other angles

So far the version of Bresenham's line drawing algorithm that you have used only works for lines that have a gradient (slope) between 0 and 1 (that is, from horizontal to 45 degrees).
To make this algorithm more general, so that it can be used to draw any line, some additional rules are needed:

- If a line is sloping downward instead of sloping upward, then when P is 0 or greater, draw the next column's pixel one row *below* the previous pixel, instead of above it.
- If the change in \( y \) value is greater than the change in \( x \) value (which means that the slope is more than 1), then the calculations for A, B, and the initial value for P will need to be changed.
  When calculating A, B, and the initial P, use X where you previously would have used Y, and vice versa.
  When drawing pixels, instead of going across every column in the X axis, go through every row in the Y axis, drawing one pixel per row.

{interactive slug="pixel-grid" type="iframe"}

In the grid above, choose two points of your own that are unique to you.
Don't just choose points that will give horizontal or vertical lines!

Now use Bresenham's algorithm to draw the line.
Check that it gives the same points as you would have chosen using a ruler, or using the formula \( y = mx+b \).
How many arithmetic calculations (multiplications and additions) were needed for Bresenham's algorithm?
How many would have been needed if you used the \( y = mx+b \) formula?
Which is faster (bear in mind that adding is a lot faster than multiplying for most computers).

{panel type="teacher-note"}

# Speed of Bresenham's method

This method only has to compare an integer with 0 and do one addition for each pixel, which is a lot faster than the calculations in the previous version.

{panel end}

You could write a program or design a spreadsheet to do these calculations for you &ndash; that's what graphics programmers have to do.

## Circles

As well as straight lines, another common shape that computers often need to draw are circles.
An algorithm similar to Bresenham's line drawing algorithm, called the Midpoint Circle Algorithm, has been developed for drawing a circle efficiently.

A circle is defined by a centre point, and a radius.
Points on a circle are all the radius distance from the centre of the circle.

{interactive slug="pixel-grid" type="iframe" parameters="Cx=9&Cy=9&Rx=16&Ry=9"}

Try to draw a circle by hand by filling in pixels (without using a ruler or compass).
Note how difficult it is to make the circle look round.

It is possible to draw the circle using a formula based on Pythagoras' theorem, but it requires calculating a square root for each pixel, which is very slow.
The following algorithm is much faster, and only involves simple arithmetic so it runs quickly on a computer.

## Bresenham's Midpoint Circle Algorithm

{comment could mention later that Bresenham didn't invent it, but idea comes from his line algorithm and is often named after him}

Here are the rules for the midpoint circle algorithm for a circle around (\( c_{x} \), \( c_{y} \)) with a radius of \( R \):

\[
E = -R\\
X = R\\
Y = 0
\]

Repeat the following rules in order until \( Y \) becomes greater than \( X \):

- Fill the pixel at coordinate (\( c_{x} + X \), \( c_{y} + Y \))
- Increase \( E \) by \( 2 \times Y + 1 \)
- Increase \( Y \) by 1
- If \( E \) is greater than or equal to 0,  subtract \( 2 \times X - 1 \) from \( E \), and then subtract 1 from \( X \).

Follow the rules to draw a circle on the grid, using (\( c_{x} \), \( c_{y} \))  as the centre of the circle, and \( R \) the radius.
Notice that it will only draw the start of the circle and then it stops because \( Y \) is greater than \( X \)!

{interactive slug="pixel-grid" type="iframe" parameters="Cx=9&Cy=9&Rx=16&Ry=9"}

{panel type="teacher-note"}

# Solution

In the following diagram, the black pixels below represent the initial octant of the circle drawn by the algorithm above, the darker gray pixels represent reflection along the \( X \) and \( Y \) axis (details are given below), and the lighter gray pixels represent the reflection along a diagonal (see also below).

{image file-path="img/chapters/grid-20x20-circle-answer.png" alt="Solution for drawing a circle"}

The values in the calculation for the above example are:

| Calculation | Pixel to colour in |
|-------------|--------------------|
| \( E_0 = -7, X_0 = 7, Y_0 = 0 \) | Plot pixel (16, 9) |
| \( E_1 = -6, Y_1 = 1 \) | Plot pixel (16, 10) |
| \( E_2 = -3, Y_2 = 2 \) | Plot pixel (16, 11) |
| \( E_3 = 2, Y_3 = 3 \) | -  |
| \( E_4 = -11, X_4 = 6 \) | Plot pixel (15, 12) |
| \( E_5 = -4, Y_5 = 4 \) | Plot pixel (15, 13) |
| \( E_6 = 5, Y_6 = 5 \) | - |
| \( E_7 = -6, X_7 = 5 \) | Plot pixel (14, 14) |
| \( E_8 = 5, Y_8 = 6 \) | *y* is greater than *x*, so we can now reflect our octant |

{panel end}

When \( Y \) becomes greater than \( X \), one eighth (an octant) of the circle is drawn.
The remainder of the circle can be drawn by reflecting the octant that you already have (you can think of this as repeating the pattern of steps you just did in reverse).
You should reflect pixels along the X and Y axis, so that the line of reflection crosses the middle of the centre pixel of the circle.
Half of the circle is now drawn, the left and the right half.
To add the remainder of the circle, another line of reflection must be used.
Can you work out which line of reflection is needed to complete the circle?

{panel type="jargon-buster"}

# Quadrants and octants

A quadrant is a quarter of an area; the four quadrants that cover the whole area are marked off by a vertical and horizontal line that cross.
An *octant* is one eighth of an area, and the 8 octants are marked off by 4 lines that intersect at one point (vertical, horizontal, and two diagonal lines).

{panel end}

To complete the circle, you need to reflect along the diagonal.
The line of reflection should have a slope of 1 or -1, and should cross through the middle of the centre pixel of the circle.

While using a line of reflection on the octant is easier for a human to understand, a computer can draw all of the reflected points at the same time it draws a point in the first octant because when it is drawing pixel with an offset of (x,y) from the centre of the circle, it can also draw the pixels with offsets (x, -y), (-x, y), (-x, -y), (y, x), (y, -x), (-y, x) and (-y, -x), which give all eight reflections of the original point!

By the way, this kind of algorithm can be adapted to draw ellipses, but it has to draw a whole quadrant because you don't have octant symmetry in an ellipse.

## Practical applications

Computers need to draw lines, circles and ellipses for a wide variety of tasks, from game graphics to lines in an architect's drawing, and even a tiny circle for the dot on the top of the letter 'i' in a word processor.
By combining line and circle drawing with techniques like 'filling' and 'antialiasing', computers can draw smooth, clear images that are resolution independent.
When an image on a computer is described as an outline with fill colours it is called vector graphics &ndash; these can be re-drawn at any resolution.
This means that with a vector image, zooming in to the image will not cause the pixelation seen when zooming in to bitmap graphics, which only store the pixels and therefore make the pixels larger when you zoom in.
However, with vector graphics the pixels are recalculated every time the image is redrawn, and that's why it's important to use a fast algorithm like the one above to draw the images.

Outline fonts are one of the most common uses for vector graphics as they allow the text size to be increased to very large sizes, with no loss of quality to the letter shapes.

Computer scientists have found fast algorithms for drawing other shapes too, which means that the image appears quickly, and graphics can display quickly on relatively slow hardware &ndash; for example, a smartphone needs to do these calculations all the time to display images, and reducing the amount of calculations can extend its battery life, as well as make it appear faster.

As usual, things aren't quite as simple as shown here.
For example, consider a horizontal line that goes from (0, 0) to (10, 0), which has 11 pixels.
Now compare it with a 45 degree line that goes from (0, 0) to (10, 10).
It still has 11 pixels, but the line is longer (about 41% longer to be precise).
This means that the line would appear thinner or fainter on a screen, and extra work needs to be done (mainly anti-aliasing) to make the line look ok.
We've only just begun to explore how techniques in graphics are needed to quickly render high quality images.

{panel type="project"}

# Line and circle drawing

To compare Bresenham's method with using the equation of a line (\( y = mx+b \)), choose your own start and end point of a line (of course, make sure it's at an interesting angle), and show the calculations that would be made by each method.
Count up the number of additions, subtractions, multiplications and divisions that are made in each case to make the comparison.
Note that addition and subtraction is usually a lot faster than multiplication and division on a computer.

You can estimate how long each operation takes on your computer by running a program that does thousands of each operation, and timing how long it takes for each.
From this you can estimate the total time taken by each of the two methods.
A good measurement for these is how many lines (of your chosen length) your computer could calculate per second.

If you're evaluating how fast circle drawing is, you can compare the number of addition and multiplication operations with those required by the Pythagoras formula that is a basis for the simple [equation of a circle](https://en.wikipedia.org/wiki/Circle#Equations) (for this calculation, the line from the centre of the circle to a particular pixel on the edge is the hypotenuse of a triangle, and the other two sides are a horizontal line from the centre, and a vertical line up to the point that we're wanting to locate.
You'll need to calculate the *y* value for each *x* value; the length of the hypotenuse is always equal to the radius).

{panel end}
