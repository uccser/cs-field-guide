# Computer Graphics

{teacher}
The following assessment plans also cover this material:

**New Zealand - AS91636 (3.44)**
- [Assessment Overview](/appendices/assessment-guides/new-zealand/computer-graphics.html)
{teacher end}

{comment}
Visual computing is usually graphics (output) and vision (input)

Often the term “visual computing” encompasses computer graphics, so the term “graphics” isn’t strictly required in the name of this area; also note that in this context is does not refer to the use of “visual programming languages” or “visual programming environments” e.g. Visual Studio. The creation of images could be as simple as a 2D drawing program, or as advanced as 3D systems for entertainment or to help visualise a data set.
{comment end}

{video http://www.youtube.com/embed/5kuoRjgfCls}

## What's the big picture?

Computer graphics will be familiar from games, films and images, and there is amazing software available to create images, but how does the software work? The role of a computer scientist is not just to *use* graphics systems, but to *create* them, and especially invent new techniques.

The entertainment industry is always trying to develop new graphics software so that they can push the boundaries and create new experiences. We've seen this in the evolution of animated films, from simple 2D films to realistic computer generated movies with detailed 3D images.

{comment} Consider showing e.g. animated files Lion King - Shrek - Toy Story - Avatar sequence of improvements. {comment end}

Movie and gaming companies can't always just use existing software to make the next great thing --- they need computer scientists to come up with better graphics techniques to make something that's never been seen before. The creative possibilities are endless!

Computer graphics are used in a wide variety of situations: games and animated movies are common examples, but graphics techniques are also used to visualise large amounts of data (such as all cellphone calls being made in one day), to display and animate graphical user interfaces, to create virtual reality and augmented reality worlds, and much more.

{comment} Talk about visualisation of data - any nice examples?{comment end}

In this chapter we'll look at some of the basic techniques that are used to create computer graphics. These will give you an idea of the techniques that are used in graphics programming, although it's just the beginning of what's possible.

For this chapter we are using a system called WebGL which can render 3D graphics in your browser. If your browser is up to date everything should be fine. If you have issues, or if the performance is poor, there is [information here about how to get it going](appendices/webgl_help.html).

## Graphics transforms

{teacher}
This section on transforms covers material for an example for the 3.44 standard through the following components:

- Key problem: Positioning graphics images in 2D and 3D space
- Practical application: Any artificially rendered 2D or 3D image e.g. 3D drawing program, artificial reality, movie animation, 2D drawing programs
- Algorithm/technique: matrix transformation (transforms, translation, scaling, rotation)
- Evaluation: number of calculations or time required to render an image
- Personalised student examples: a student's choice of transform values to illustrate the techniques (values used for scaling, rotation and translation)

This section introduces matrix algebra; it doesn't assume prior knowledge, and the idea is to show the value of matrix multiplication by first having students do the calculations manually.
{teacher end}

A computer graphics image is just the result of a whole lot of mathematical calculations. In fact, every pixel you see in an image has typically had many calculations made to work out what colour it should be, and there are often millions of pixels in a typical image.

Let's start with some simple but common calculations that are needed for in graphics programming.
The following image shows a cube with writing on each face.
You can move it around using what's called a *transform*, which simply adjusts where it is placed in space.

{include interactive computer-graphics-box-translation}

You've just applied 3D *translation transforms* to the cube. Translation just means moving it in the three dimensions up and down, forward and back, and sideways.

{include interactive computer-graphics-box-rotation}

There are several transformations that are used in computer graphics, but the most common ones are translation (moving the object), rotation (spinning it) and scaling (changing its size).
They come up often in graphics because they are applied not only to objects, but to things like the positions of the camera and lighting sources.

In this section you can apply transformations to various images. We'll start by making the changes manually, one point at a time, but we'll move up to a quick shortcut method that uses a *matrix* to do the work for you. We'll start by looking at how these work in two dimensions - it's a bit easier to think about than three dimensions.

The following interactive shows an arrow, and on the right you can see a list of the points that correspond to its 7 corners. The arrow is on a grid (usually referred to as *cartesian coordinates*), where the centre point is the "zero" point. Points are specified using two numbers, *x* and *y*, usually written as (*x*,*y*). The *x* value is how far the point is to the right of the centre and the *y* value is how far above the centre it is. For example, the first point in the list is the tip at (0,2), which means it's 0 units to the right of the centre (i.e. at the centre), and 2 units above it. Which point does the last pair (2,0) correspond to? What does it mean if a coordinate has a negative *x* value?

{teacher}
(2,0) is the right-most corner of the arrow. A negative *x* value means that it's to the *left* of the centre instead of the right. (A negative *y* value is below the centre).
{teacher end}

The first list of coordinates is for the original arrow position, and in the second list, you can type in the transformed points to move the arrow --- the original is shown in green and the moved one is in blue.

{teacher}
This transform translates the arrow 2 units to the right and 3 units up. Subtracting three translates the arrow down and to the left.
{teacher end}

{include interactive computer-graphics-arrow parameters="&quiz=2 0 0 5 0 2 0 4 0 0 2 0 0 0 0 1 &hidetarget=true"}

The above transform is called a *translation* --- it translates the arrow around the grid. This kind of transform is used in graphics to specify where an object should be placed in a scene, but it has many other uses, such as making an animated object move along a path, or specifying the position of the imaginary camera (viewpoint).

{teacher}
Multiplying by 2 makes the arrow twice as large in each dimension. Multiplying by 10 makes it 10 times as large, which won't fit in the view. Multiplying by 0.5 makes the arrow half the size. Multiplying only the x values makes the arrow wider horizontally only.
{teacher end}

{include interactive computer-graphics-arrow parameters="&quiz=0.5 0 0 0 0 0.5 0 0 0 0 1 0 0 0 0 1 &hidetarget=true"}

This transformation is called *scaling*, and although it can obviously be used to control the size of an object, this can in turn be used to create a visual effect such as making the object appear closer or further away.

{include interactive computer-graphics-arrow parameters="&quiz=2 0 0 5 0 2 0 4 0 0 2 0 0 0 0 1"}

{include interactive computer-graphics-arrow parameters="&quiz=0 1 0 0 1 0 0 0 0 0 1 0 0 0 0 1 &hidetarget=true &zoom=-5.0"}

This is a simple *rotation* transformation, also useful for positioning objects in a scene,
but also for specifying things like camera angles.

{comment}We won't mention reflection and shearing etc., but this can go in the "whole story" section.{comment end}

{teacher}
The following part introduces the use of matrices to do the transforms. It doesn't assume that they have encountered matrices before, but if students are completely new to matrix algebra and are also weak in algebra in general, the explanation in this chapter might be a little minimal for them, and extra help will be needed. There are good resources around that explain matrices, although they likely provide more detail than needed. The [Khan academy](http://www.khanacademy.org/math/algebra/algebra-matrices/v/matrix-multiplication--part-1) have videos and quizes explaining matrices (we are particularly interested in multiplying a matrix by a vector, which is what is happening when a matrix transform is applied to a point  - the point is the vector).

Other explanations aimed at school students include:
- [Math is Fun - Matrix multiplying](http://www.mathsisfun.com/algebra/matrix-multiplying.html)
- [Math in Sight - Matrix vector multiplication](http://mathinsight.org/matrix_vector_multiplication)
- [Math Planet - Transformation using matrices](http://www.mathplanet.com/education/geometry/transformations/transformation-using-matrices)
- [Wikipedia entry on matrix transformation](http://en.wikipedia.org/wiki/Transformation_matrix) - which possibly has too much extra detail for students in it
{teacher end}  

### Matrix transforms

There's a much easier way to specify transformations than having to change each coordinate separately.
Transformations are usually done in graphics using *matrix* arithmetic, which is a shorthand notation for doing lots of simple arithmetic operations in one go. The matrix for the two-dimensional transformations we've been doing above has four values in it. For the 2 dimensional scaling transform where we made each *x* and *y* value twice as large, the matrix is written as:

{math-block}
\begin{bmatrix}
2 & 0 \\  
0 & 2 \\  
\end{bmatrix}
{math-block end}

{include interactive computer-graphics-arrow parameters="&quiz=2 0 0 0 0 2 0 0 0 0 2 0 0 0 0 1"}

At this stage you may want to have the widget open in a separate window so that you can read the text below and interact with the widget at the same time.

Now try changing the matrix to

{math-block}
\begin{bmatrix}
3 & 0 \\  
0 & 3 \\  
\end{bmatrix}
{math-block end}

or

{math-block}
\begin{bmatrix}
0.2 & 0 \\  
0 & 0.2 \\  
\end{bmatrix}
{math-block end}

{teacher}
This should create an arrow 3 times as big and 0.2 times as big.
{teacher end}

The "add translate" values in the interactive are added to each *x* and *y* coordinate; experiment with them to see what they do. Now try to find suitable values for these and the matrix to match the arrow up with the red one.

{teacher}
This needs the matrix {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} and the x,y values 5 and 4 (this doubles the size of the arrow and moves it 5 across and 4 up).
{teacher end}

What happens if you use the following matrix?

{math-block}
\begin{bmatrix}
2 & 0 \\  
0 & 4 \\  
\end{bmatrix}
{math-block end}

{teacher}
The x values are doubled but the y values are multiplied by 4, so it is stretched twice as much vertically as horizontally.
{teacher end}

Now try the following matrix:

{math-block}
\begin{bmatrix}
0 & 1 \\  
1 & 0 \\  
\end{bmatrix}
{math-block end}

This matrix should have rotated the arrow to the right.

A simple way of looking at the matrix is that the top row determines the transformed *x* value, simply by saying how much of the original *x* value and *y* value contribute to the new *x* value. So in the matrix:

{math-block}
\begin{bmatrix}
2 & 0 \\  
0 & 4 \\  
\end{bmatrix}
{math-block end}

The top row just means that the new *x* value is 2 lots of the original *x*, and none of the original y, which is why all the *x* values double. The second row determines the *y* value: in the above example, it means that the new *y* value uses none of the original x, but 4 times the original *y* value. If you try this matrix, you should find that the location of all the *x* points is doubled, and the location of all the y points is multiplied by 4.

That now explains the {math}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math end} matrix. The new *x* value has none of the original *x*, but exactly the original *y* value, and vice versa. This swaps all the *x* and *y* coordinates, which is the same as rotating the object to the right.

Where it gets interesting is when you use a little of each value; try the following matrix:

{math-block}
\begin{bmatrix}
0.7 & 0.7 \\  
-0.7 & 0.7 \\  
\end{bmatrix}
{math-block end}

Now the *x* value of each coordinate is a mixture of 0.7 of the original *x*, and 0.7 of the original *y*.

In general, to rotate an image by a given angle you need to use the sine (abbreviated sin) and cosine (abbreviated cos) functions from trigonometry. To rotate the image by {math}\theta{math end} degrees, you'll need the following values in the matrix, which rely on trig functions:

{math-block}
\begin{bmatrix}
\cos(\theta) & -\sin(\theta) \\  
\sin(\theta) & \cos(\theta) \\  
\end{bmatrix}
{math-block end}

{teacher}
If your students aren't familiar with sin and cos, it may be worth going over them separately, including the idea that the angle is usually measured in degrees, and the functions will produce a number between 0  and 1.
{teacher end}

{interactive computer-graphics-arrow parameters="&quiz=0.7 0.7 0 5 -0.7 0.7 0 4 0 0 1 0 0 0 0 1"}

What is the matrix for rotation by 360 degrees?

{teacher}
If you put in 360 for {math}\Theta{math end} in the rotation formula, you get the matrix {math}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math end}. This is also known as the 'identity' matrix because it makes no change to the original image. You get this matrix if you rotate by a multiple of 360 (including 0 degrees of course).
{teacher end}

The general matrix for *scaling* is a bit simpler; if you want to scale by a factor of *s*, then you just use the matrix:

{math-block}
\begin{bmatrix}
s & 0 \\  
0 & s \\  
\end{bmatrix}
{math-block end}

A translation can't be specified by this kind of matrix, but in the interactives we've provided an extra place to specify an *x* and *y* value to translate the input.

{interactive computer-graphics-arrow parameters="&quiz=1 0 0 5 0 1 0 4 0 0 1 0 0 0 0 1"}

{teacher}
Solution: Translate x is 5 and y is 4 (5 to the right and 4 up). The matrix should be {math}\begin{bmatrix}  1 & 0 \\   0 & 1 \\   \end{bmatrix}{math end}
{teacher end}

{interactive computer-graphics-arrow parameters="&quiz=2 0 0 4 0 2 0 3 0 0 2 0 0 0 0 1"}

{teacher}
Solution: The matrix should be {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} (doubles the size). Translate x is 4 and y is 3.
{teacher end}

{interactive computer-graphics-arrow parameters="&quiz=2 0 0 5 0 2 0 4 0 0 2 0 0 0 0 1"}

{teacher}
Solution: The matrix should be {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} (still needed to double the size). However, the translation will be doubled as well since it comes before the matrix, therefore translate x is 2.5 and y is 2 (half of the distance needed).
{teacher end}

In the above, you'll have noticed that scaling is affected by how far the object is from the centre.
If you want to scale around a fixed point in the object (so it expands where it is), then an easy way is to translate it back to the centre (also called the *origin*), scale it, and then translate it back to where it was.  The following interactive allows you to move the arrow, then scale it, and move it back.

{interactive computer_graphics_arrow_transform parameters="&zoom=-15.0 &quiz=2 0 0 -8 0 2 0 3 0 0 2 0 0 0 0 1 &start=1 0 0 -8 0 1 0 5 0 0 1 0 0 0 0 1 &allPrize=5"}

{teacher}
Solution: The first translation is x=8 and y=-7. Now the arrow tip is at the origin, and the doubling will keep the tip where it is. The matrix should be {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} as usual for doubling. The second translation needs to be -8,7 to get the arrow back to the starting point.
{teacher end}

The same problem comes up with rotation.

{interactive computer_graphics_arrow_transform parameters="&zoom=-10.0 &quiz=0.699999988079071 0.699999988079071 0 -4.400000095367432 -0.699999988079071 0.699999988079071 0 4.599999904632568 0 0 1 0 0 0 0 1 &start=1 0 0 -3 0 1 0 4 0 0 1 0 0 0 0 1 &allPrize=5"}

{teacher}
Solution: The first translation is x=8 and y=-7. Now the arrow tip is at the origin, and the doubling will keep the tip where it is. The matrix should be {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} as usual for doubling. The second translation needs to be -8,7 to get the arrow back to the starting point.
{teacher end}

The following two examples combine rotation, scaling and translation. You can use multiple matrices (that's the plural of matrix) to match up the target object --- the product of each matrix becomes the input to the next one. Oh, and the arrow is twice as fat, but still the same hight (from base to tip).

{interactive computer-graphics-arrow-double parameters="&zoom=-10.0 &quiz=0 1 0 4 2 0 0 -2 0 0 1 0 0 0 0 1 &allPrize=5"}

{teacher}
Solution: There are two solutions depending on whether you scale or rotate first. If scaling first, the scaling matrix is {math}\begin{bmatrix}  2 & 0 \\   0 & 1 \\   \end{bmatrix}{math end}. That makes the arrow twice as fat, but still the same height. The rotation matrix is {math}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math end} -- that's a 90 degree clockwise rotation. The translation vector is 4, -2.

If you rotate first, the rotation is still {math}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math end} (90 degrees clockwise) but the scaling is {math}\begin{bmatrix}  1 & 0 \\   0 & 2 \\   \end{bmatrix}{math end}, since it now needs to be scaled in the y direction. The translation vector is still 4, -2.

This can also be done by using only one matrix (if you combine the rotation and scaling); this could be a challenge to give the faster students. In that case the matrix is {math}\begin{bmatrix}  0 & 1 \\   2 & 0 \\   \end{bmatrix}{math end}. The translation is still 4,-2.
{teacher end}

{interactive computer_graphics_arrow_double parameters="&zoom=-6.0 &quiz=0.3499999940395355 -0.3499999940395355 0 -1 0.3499999940395355 0.3499999940395355 0 -2 0 0 1 0 0 0 0 1 &allPrize=5"}

{teacher}
Solution: The solution will depend on the order of scaling and rotating, but a simple solution is {math}\begin{bmatrix}  0.7 & -0.7 \\   0.7 & 0.7 \\   \end{bmatrix}{math end}  for the first matrix, {math}\begin{bmatrix}  0.5 & 0 \\   0 & 0.5 \\   \end{bmatrix}{math end} for the second matrix, and -1,-2 for the translation.
{teacher end}

These combined transformations are common, and they might seem like a lot of work because each matrix has to be applied to every point in an object. Our arrows only had 7 points, but complex images can have thousands or even millions of points in them. Fortunately we can combine all the matrix operations in advance to give just one operation to apply to each point.

### Combining transformations

Several transforms being applied to the same image can be made more efficient by creating one matrix that has the effect of all the transforms combined.The combination is done by "multiplying" all the matrices.

Multiplying two matrices can't be done by just multiplying the corresponding elements; if you are multiplying two matrices with the *a* and *b* values shown below, the resulting values from the multiplication are calculated as follows:

{math-block}

\begin{bmatrix}
a_{11} & a_{21} \\  
a_{12} & a_{22} \\  
\end{bmatrix}
\times
\begin{bmatrix}
b_{11} & b_{21} \\  
b_{12} & b_{22} \\  
\end{bmatrix}
=
\begin{bmatrix}
a_{11}b_{11}+a_{21}b_{12} &  a_{11}b_{21}+a_{21}b_{22} \\  
a_{12}b_{11}+a_{22}b_{12} &  a_{12}b_{21}+a_{22}b_{22} \\  
\end{bmatrix}

{math-block end}

It's a bit complicated, but this calculation is only done once to work out the combined transformation, and it gives you a single matrix that will provide to transforms in one operations.

As a simple example, consider what happens when you scale by 2 and then rotate by 45 degrees. The two matrices to multiply work out like this:

{math-block}

\begin{bmatrix}
2 & 0 \\  
0 & 2 \\  
\end{bmatrix}
\times
\begin{bmatrix}
0.7 & 0.7 \\  
-0.7 & 0.7 \\  
\end{bmatrix}
=
\begin{bmatrix}
2 \times 0.7+ 0 \times -0.7 &  2 \times 0.7+ 0 \times 0.7 \\  
0 \times 0.7+ 2 \times -0.7 &  0 \times 0.7+ 2 \times 0.7 \\  
\end{bmatrix}
=
\begin{bmatrix}
1.4 &  1.4  \\  
-1.4 &  1.4  \\  
\end{bmatrix}

{math-block end}

<p id="arrowEx13Text">Try putting in the final matrix here and see if it does scale by 2 and rotate by 45 degrees.</p><div align="center"><a href="" onclick= "linkSend(this, 'arrowEx13Text', 'static/widgets/CG/CG-arrow/CG-arrow-singlematrix.html','&zoom=-10.0 &quiz=1.4 1.4 0 0 -1.4 1.4 0 0 0 0 1 0 0 0 0 1 &allPrize=5'); return true" target="blank"><img class="widgetimage" src="static/widgets/CG/CG-arrow/CG-arrow-example1.png" alt=""><br />Click to load the widget.</a></div><br />

<p id="arrowEx14Text">Now try multiplying two other transform matrices that you make up yourself, and see if they produce the expected result.</p><div align="center"><a href="" onclick= "linkSend(this, 'arrowEx14Text', 'static/widgets/CG/CG-arrow/CG-arrow-multiply2matrix.html','&zoom=-10.0 &quiz=1.4 1.4 0 0 -1.4 1.4 0 0 0 0 1 0 0 0 0 1 &allPrize=5'); return true" target="blank"><img class="widgetimage" src="static/widgets/CG/CG-arrow/CG-arrow-example1.png" alt=""><br />Click to load the widget.</a></div><br />

In computer graphics systems there can be many transformations combined, and this is done by multiplying them all together (two at a time) to produce one matrix that does all the transforms in one go.
That transform might then be applied to millions of points, so the time taken to do the matrix multiplication at the start will pay off well.

The project below gives the chance to explore combining matrices, and has an interactive that will calculate the multiplied matrices for you.

### 3D transforms

{comment}

.. xJRM Check that the main text and headings on the interactives make sense, and that the images match (they don't quite currently)

{comment end}

So far we've just done the transforms in two dimensions.
To do this in 3D, we need a *z* coordinate as well, which is the depth of the object into the screen.
A matrix for operating on 3D points is 3 by 3. For example, the 3D matrix for doubling the size of an object is as follows; it multiplies each of the *x*, *y* and *z* values of a point by 2.


{math-block}

\begin{bmatrix}
2 & 0 & 0 \\  
0 & 2 & 0 \\  
0 & 0 & 2 \\  
\end{bmatrix}

{math-block end}

<section id="teapot1Text">
 In this interactive, try changing the scaling on the image (it starts with a scaling factor of 10 in all three dimensions).

</section><div align="center"><a href="" onclick="linkSend(this,'teapot1Text','static/widgets/CG/CG-mini-editor/main (cutdown).html',null); return true" target="blank"><img class="widgetimage" src="static/widgets/CG/CG-mini-editor/CG-mini-editor.png" alt=""><br />Click to load the widget.</a></div><br />

The above image mesh has 3644 points in it, and your matrix was applied to each one of them to work out the new image.

<section id="teapot2Text">
Translation requires 3 values, which are added to the *x*, *y* and *z* coordinates of each point in an object.

In the following interactive, try moving the teapot left and right ( *x* ), up and down ( *y* ), and in and out of the screen ( *z* ) by adding a "vector" to the operations. Then try combining all three.

</section><div align="center"><a href="" onclick="linkSend(this,'teapot2Text','static/widgets/CG/CG-mini-editor/main (cutdown).html',null); return true" target="blank"><img class="widgetimage" src="static/widgets/CG/CG-mini-editor/CG-mini-editor.png" alt=""><br />Click to load the widget.</a></div><br />

Rotation is trickier because you can now rotate in different directions.
In 2D rotations were around the centre (origin) of the grid, but in 3D rotations are around a line (either the horizontal x-axis, the vertical y-axis, or the z-axis, which goes into the screen!)

The rotation we used earlier can be applied to 3 dimensions using this matrix:

{math-block}

\begin{bmatrix}
\cos(\theta) & -\sin(\theta) & 0 \\  
\sin(\theta) & \cos(\theta)  & 0 \\  
0   &  0  &  1\\
\end{bmatrix}

{math-block end}

Try applying that to the image above.
This is rotating around the z-axis (a line going into the screen); that is, it's just moving the image around in the 2D plane.
It's really the same as the rotation we used previously, as the last line (0, 0, 1) just keeps the z point the same.

Try the following matrix, which rotates around the x-axis (notice that the x value always stays the same because of the 1,0,0 in the first line):

{math-block}

\begin{bmatrix}
1   &  0  &  0 \\
0 &  \cos(\theta) & -\sin(\theta)  \\  
0 & \sin(\theta) & \cos(\theta)   \\  
\end{bmatrix}

{math-block end}

And this one for the y-axis:

{math-block}

 \begin{bmatrix}
 \cos(\theta) & 0 &\sin(\theta)  \\  
 0   &  1  &  0\\
 -\sin(\theta) & 0 & \cos(\theta)   \\  
 \end{bmatrix}

{math-block end}

The following interactive allows you to combine 3D matrices.

<section id="teapot3Text">
You can experiment with moving the teapot around in space, changing its size, and angle.
Think about the order in which you need to combine the transforms to get a particular image that you want.
For example, if you translate an image and then scale it, you'll get a different effect to scaling it then translating it.
If you want to rotate or scale around a particular point, you can do this in three steps (as with the 2D case above): (1) translate the object so that the point you want to scale or rotate around is the origin (where the x, y and z axes meet), (2) do the scaling/rotation, (3) translate the object back to where it was. If you just scale an object where it is, its distance from the origin will also be scaled up.

{comment}

.. xTCB put in a sidebox on deriving the rotation matrices (one day) (maybe in the 2d part)

{comment end}

</section><div align="center"><a href="" onclick="linkSend(this,'teapot3Text','static/widgets/CG/CG-mini-editor/main (cutdown).html',null); return true" target="blank"><img class="widgetimage" src="static/widgets/CG/CG-mini-editor/CG-mini-editor.png" alt=""><br />Click here for the interactive to combine multiple transforms into one</a></div><br />

In the above examples, when you have several matrices being applied to every point in the image, a lot of time can be saved by converting the series of matrices and transforms to just one formula that does all of the transforms in one go. The following interactive can do those calculations for you.

For example, in the following interactive, type in the matrix for doubling the size of an object (put the number 2 instead of 1 on the main diagonal values), then add another matrix that triples the size of the image (3 on the main diagonal).
The interactive shows a matrix on the right that combines the two --- does it look right?

{teacher}

The combined result of scaling by 2 and then 3 should have 6 down the main diagonal (i.e. 6 times larger). The interactive gives a full derivation of the calculations being done on each x,y,z coordinate of each point in an image, but it really just has three inputs (x,y,z), which give the original position of a point, and three outputs (x',y',z') which give the transformed position of the point.

{teacher end}

<section id="test_text">Multiple transforms</section><div align="center"><a href="" onclick="linkSend(this,'test_text','static/widgets/CG/CG-matrix-simplifier/CG-matrix-simplifier.html',null); return true" target="blank"><img class="widgetimage" src="static/widgets/CG/CG-matrix-simplifier/CG-image.png" alt=""><br />Click to load the widget.</a></div><br />

{comment}

.. xTCB One teacher noted that students where need to know that the it requires transform matrix and one translation

{comment end}

The interactive also allows you to combine in translations (just three numbers, for x, y and z).
Try combining a scaling followed by a translation. What if you add a rotation --- does the order matter?

{curiosity}

In case you're wondering, the interactive is using the following formula to combine two matrices (you don't have to understand this to use it).
It is called matrix multiplication, and while it might be a bit tricky, it's very useful in computer graphics because it reduces all the transformations you need to just one matrix, which is then applied to every point being transformed.
This is way better than having to run all the matrices of every point.

{curiosity end}

{comment}

.. xTCBgive an example for the following one day?

{comment end}

{math-block}
\begin{bmatrix}
a_{11} & a_{21} & a_{31}\\  
a_{12} & a_{22} & a_{32}\\  
a_{13} & a_{23} & a_{33}\\  
\end{bmatrix}
\times
\begin{bmatrix}
b_{11} & b_{21} & b_{31}\\  
b_{12} & b_{22} & b_{32}\\  
b_{13} & b_{23} & b_{33}\\  
\end{bmatrix}
=
\begin{bmatrix}
a_{11}b_{11}+a_{21}b_{12}+a_{31}b_{13} &
a_{11}b_{21}+a_{21}b_{22}+a_{31}b_{23} &  
a_{11}b_{31}+a_{21}b_{32}+a_{31}b_{33}\\  
a_{12}b_{11}+a_{22}b_{12}+a_{32}b_{13} &
a_{12}b_{21}+a_{22}b_{22}+a_{32}b_{23} &
a_{12}b_{31}+a_{22}b_{32}+a_{32}b_{33} \\  
a_{13}b_{11}+a_{23}b_{12}+a_{33}b_{13} &
a_{13}b_{21}+a_{23}b_{22}+a_{33}b_{23}&
a_{13}b_{31}+a_{23}b_{32}+a_{33}b_{33} \\  
\end{bmatrix}
{math-block end}

### Project: 3D transforms

{teacher}

This project involves combining transforms, and discussing the matrices needed, and how they can be combined to just one operation.

This project is suitable for the 3.44 (AS91636) NZ standard. The "key problem" is positioning graphics in 3D space, "practical applications" would be for creating images and animations, the "key algorithm/technique" is matrix algebra. The effectiveness could be evaluated by the number of values needed to specify the transformations (a strong student could also look into the total number of multiplications and additions performed to calculate the positions by the matrix operations). The project should explain the purpose of example values, including translation, scaling and rotation.

{teacher end}

For this project, you will demonstrate what you've learned in the section above by explaining a 3D transformation of a few objects. You should take screenshots of each step to illustrate the process for your report.

The following scene-creation interactive allows you to choose objects (and their colours etc.), and apply one transformation to them. To position them more interestingly, you will need to come up with multiple transformations (e.g. scale, then rotate, then translate), and use the "simplifier" interactive to combine all the matrices into one operation.

The scene-creation interactive can be run from here:

{comment}

.. xjm add links in place of green bits here:

{comment end}

<section id="test_text"></section><div align="center"><a href="" onclick="linkSend(this,'test_text','static/widgets/CG/CG-mini-editor/main.html',null); return true" target="blank"><img class="widgetimage" src="static/widgets/CG/CG-mini-editor/CG-mini-editor.png" alt=""><br />Click to load the widget.</a></div><br />

To generate combined transformations, you can use the following transform simplifier interactive:

<section id="test_text"></section><div align="center"><a href="" onclick="linkSend(this,'test_text','static/widgets/CG/CG-matrix-simplifier/CG-matrix-simplifier.html',null); return true" target="blank"><img class="widgetimage" src="static/widgets/CG/CG-matrix-simplifier/CG-image.png" alt=""><br />Click to load the widget.</a></div><br />

Because you can't save your work in the interactives, keep notes and screen shots as you go along. These will be useful for your report, and also can be used if you need to start over again.

Introduce your project with a examples of 3D images, and how they are used (perhaps from movies or scenes that other people have created). Describe any innovations in the particular image (e.g. computer generated movies usually push the boundaries of what was previously possible, so discuss what boundaries were moved by a particular movie, and who wrote the programs to achieve the new effects).

{teacher}

This matches A1 in the 3.44 standard :"describing key problems that are addressed in selected areas of computer science".

{teacher end}

For your project, try putting a few objects in a particular arrangement (e.g. with the teapot sitting beside some cups), and explain the transforms needed to achieve this, showing the matrices needed.

{teacher}

An initial description of a scene matches A2 "describing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas" i.e. placing objects in a scene. This should refer to the transforms (e.g. rotation by 90 degrees, scaling by a factor of 2) rather than the actual matrices that do these transforms).

{teacher end}

Give simple examples of translation, scaling *and* rotation using your scene.

{teacher}

This is M1: "explaining how key algorithms or techniques are applied in selected areas"

{teacher end}

You should include multiple transforms applied to one object, and show how they can be used to position an object.

{teacher}

This is M2: "explaining examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas."

{teacher end}

Show how the matrices for a series of transforms can be multiplied together to get one matrix that applies all the transforms at once.

{teacher}

This is E1: "discussing examples of practical applications of selected areas to demonstrate the use of key algorithms and/or techniques from these areas"

{teacher end}

Discuss how the single matrix derived from all the others is more efficient, using your scene as an example to explain this.

{teacher}

This is E2: "evaluating the effectiveness of algorithms, techniques, or applications from selected areas". Ideally students should discuss how many individual multiplications and additions are required if the matrices are applied to each point separately, and compare that with the number of operations required if the matrices being combined into one operation (they key here is that the transform is being done to every point in the obect being transformed, so it may be repeated hundreds or even thousands of times.)

{teacher end}

{comment}

.. xTCB add the following later, will need more links and information
.. If you're confident with programming and want more flexibility, you could do a similar project using a graphics programming system such as WebGL <link> (which is the system used in the demonstrations above), or an interactive tutorial called `JPOT <http://www.cs.uwm.edu/%7Egrafix2/>`_  which explores a popular graphics system called OpenGL.

.. Colour models
.. =====================================================

.. this section is yet to be written

.. RGB, CMY, HSV, ... tricolour stimulus

.. For example, see:
.. http://www.cosc.canterbury.ac.nz/mukundan/cogr/applcogr.html colours RGB, HSV

{comment end}

## Drawing lines and circles

{teacher}

This section on transforms covers material for an example for the 3.44 standard through the following components:

- Key problem: rendering lines and circles on a 2D image of pixels
- Practical application: Paint programs, rendering 2D and 3D images, drawing charts and graphs, rendering scalable vector graphics, displaying fonts etc.
- Algorithm/technique: Equation of a line and Bresenham's line-drawing algorithm
- Evaluation: number of calculations required by each approach
- Personalised student examples: a student's randomly chosen start and endpoint for a line drawing example

There are some very good illustrations of approaches to this problem [on this site](http://www.redblobgames.com/grids/line-drawing.html), which could be used as the basis of a project.

{teacher end}

A fundamental operation is computer graphics is to draw lines and circles.
For example, these are used as the components of scalable fonts and vector graphics; the letter "i" is specified as a series of lines and curves, so that when you zoom in on it the computer can redraw it at whatever resolution is needed.

{comment}

 .. xTCB to add sometime, Jargonbuster: pixel (somewhere in the chapter) - also mention pel and bitmap, and origins of the terms. see www.foveon.com/files/ABriefHistoryofPixel2.pdf

{comment end}

{image computer-graphics/CG-i.png alt="The letter i enlarged to show the pixels used to create the word"}

In 3D graphics shapes are often stored using lines and curves that mark out the edges of flat surfaces, each of which is so small that you can't see them unless you zoom right in.

{image computer-graphics/CG-e.gif alt="Comparison between a letter created using pixels to curves"}

The lines and circles that specify an object are usually given using numbers (for example, a line between a given starting and finishing position or a circle with a given centre and radius).
From this a graphics program must calculate which pixels on the screen should be coloured in to represent the line or circle.

For example, here's a grid of pixels with 5 lines shown magnified.
The vertical line would have been specified as going from pixel (2,9) to (2,16) --- that is, starting 2 across and 9 up, and finishing 2 across and 16 up.
Of course, this is only a small part of a screen, as normally they are more like 1000 by 1000 pixels or more; even a smartphone can be hundreds of pixels high and wide.

{image computer-graphics/20grid-example.png alt="Drawing lines with pixels"}

These are things that are easy to do with pencil and paper using a ruler and compass, but on a computer the calculations need to be done for every pixel, and if you use the wrong method then it will take too long and the image will be displayed slowly or a live animation will appear jerky.
In this section we will look into some very simple but clever algorithms that enable a computer to do these calculations very quickly.

### Line drawing

{teacher}

The students are asked to draw several lines in this section on grids; you could print a supply of these for them, or use graph paper. (We have plans to make an interactive grid that they can  use on the web page, but this won't be available in the near future.)

{teacher end}

To draw a line, a computer must work out which pixels need to be filled so that the line looks straight.
You can try this by colouring in squares on a grid, such as the one below (they are many times bigger than the pixels on a normal printer or screen).
We'll identify the pixels on the grid using two values, (*x*,*y*), where *x* is the distance across from the left, and *y* is the distance up from the bottom.
The bottom left pixel below is (0,0), and the top right one is (19,19).


On the following grid, try to draw these straight lines by filling in pixels in the grid:

- from  (2, 17) to (10, 17)
- from  (18, 2) to (18, 14)
- from  (1, 5)  to (8, 12)

{image computer-graphics/20grid.png alt="Grid for drawing line from A to B"}

{comment}

.. xHTML5 long term the grids in this section could be interactive, click on each pixel, and get it to check if the line is correct

{comment end}

{teacher}

The above three lines are easy to draw as they are horizontal, vertical and diagonal.

{image computer-graphics/20grid-answer.png alt="Answer for previous question on grid"}

{teacher end}

Drawing a horizontal, vertical or diagonal line like the ones above is easy; it's the ones at different angles that require some calculation.

Without using a ruler, can you draw a straight line from A to B on the following grid by colouring in pixels?


{image computer-graphics/20grid-ab.png alt="Grid for drawing line from A to B"}

Once you have finished drawing your line, try checking it with a ruler. Place the ruler so that it goes from the centre of A to the centre of B. Does it cross all of the pixels that you have coloured?

### Using a formula to draw a line

The mathematical formula for a line is {math}(y = mx + c){math end}. This gives you the *y* value for each *x* value across the screen, where {math}(m){math end} is the slope of the line and {math}(c){math end} is where it crosses the y axis. In other words, for *x* pixels across, the pixel to colour in would be (*x*,\ {math}(mx + c){math end}).

For example, choosing {math}(m=2){math end} and {math}(c=3){math end} means that the line would go through the points (0,3), (1,5), (2,7), (3,9) and so on.
This line goes up 2 pixels for every one across ({math}(m=2){math end}), and crosses the y axis 3 pixels up ({math}(c=3){math end}).

You should experiment with drawing graphs for various values of {math}(m){math end} and {math}(c){math end} (for example, start with {math}(c=0){math end}, and try these three lines: {math}(m=1){math end}, {math}(m=0.5){math end} and{math}(m=0){math end}) by putting in the values.
What angle are these lines at?

The {math}(mx + c){math end} formula can be used to work out which pixels should be coloured in for a line that goes between {math}((x_1, y_1)){math end} and {math}((x_2, y_2)){math end}. What are {math}((x_1, y_1)){math end} and {math}((x_2, y_2)){math end} for the points A and B on the grid below?

{teacher}

The calculations for a line from A to B above are as follows.

The two points are A = (3,4) and B = (16,9). This gives {math}(x_1 = 3, y_1 = 4, x_2=16){math end} and {math}(y_2 = 9){math end}.

{teacher end}

See if you can work out the {math}(m){math end} and {math}(b){math end} values for a line from A to B, or you can calculate them using the following formulas:

{math-block}

m = \frac{(y_2 - y_1)}{(x_2 - x_1)}
b = \frac{(y_1x_2 - y_2x_1)}{(x_2-x_1)}

{math-block end}

{teacher}

For the formula for a line this results in:

\\[
m = \frac{(9 - 4)}{(16 - 3)}  = 5/13 = 0.384615
b = \frac{(4 \times 16 - 9 \times 3)}{(16-3)} = 37/13 = 2.846154
\\]


So we can use the formula {math}(y = 0.384615x + 2.846154){math end}.

This can be put into a spreadsheet to give the values as follows:

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

{teacher end}

Now draw the same line as in the previous section (between A and B) using the formula {math}(y = mx + c){math end} to calculate *y* for each value of *x* from {math}(x_1){math end} to {math}(x_2){math end} (you will need to round *y* to the nearest integer to work out which pixel to colour in).
If the formulas have been applied correctly, the *y* value should range from  {math}(y_1){math end} to {math}(y_2){math end}.

{image computer-graphics/20-grid-ab.png alt="Grid for drawing line from A to B"}

{teacher}

The following image shows which pixels would be coloured in (rounding the coordinates above to the nearest integer).

{image computer-graphics/20-grid-ab-answer.png alt="Grid for drawing line from A to B"}

{teacher end}

Once you have completed the line, check it with a ruler. How does it compare to your first attempt?

Now  consider the number of calculations that are needed to work out each point.
It won't seem like many, but remember that a computer might be calculating hundreds of points on thousands of lines in a complicated image. In the next section we will explore a method that greatly speeds this up.

{teacher}

Each point requires a multiplication and an addition, and also needs to round the numbers. Multiplications are relatively slow, and one is required for every pixel in the output (there could be thousands or even millions of pixels to calculate, so can be very significant!) Even worse, the numbers are floating point, which usually have slower arithmetic than integers.

{teacher end}

### Bresenham's Line Algorithm

A faster way for a computer to calculate which pixels to colour in is to use Brensenham's Line Algorithm. It follows these simple rules. First, calculate these three values:

{math-block}

A = 2 \times (y_2 - y_1)

B = A - 2 \times (x_2 - x_1)

P = A - (x_2 - x_1)

{math-block end}

To draw the line, fill the starting pixel, and then for every position along the *x* axis:

- if {math}(P){math end} is less than 0, draw the new pixel on the same line as the last pixel, and add {math}(A){math end} to {math}(P){math end}.
- if {math}(P){math end} was 0 or greater, draw the new pixel one line higher than the last pixel, and add {math}(B){math end} to {math}(P){math end}.
- repeat this decision until we reach the end of the line.

Without using a ruler, use Bresenham's Line Algorithm to draw a straight line from A to B:

{image computer-graphics/20grid-ab.png alt="Grid for drawing line from A to B"}

Once you have completed the line, check it with a ruler. How does it compare to the previous attempts?

{teacher}

This table shows the values that would be calculated using Bresenham's method for the above example:

| Calculation | Pixel to colour in |
|-------------|--------------------|
| {math}(A = 10,  B = -16){math end} | Draw the starting pixel |
| {math}(P_0 = -3){math end} | Next pixel (to the right) is on the same row as the starting pixel. |
| {math}(P_1 = 7){math end} | Next pixel is on the row above the previous pixel. |
| {math}(P_1 = -9){math end} | Next pixel is on the same row as the previous pixel. |
| {math}(P_3 = 1){math end} | Next pixel is on the row above the previous pixel. |
| {math}(P_4 = -15){math end} | Next pixel is on the same row as the previous pixel. |
| {math}(P_5 = -5){math end} | Next pixel is on the same row as the previous pixel. |
| {math}(P_6 = 5){math end} | Next pixel is on the row above the previous pixel. |
| {math}(P_7 = -11){math end} | Next pixel is on the same row as the previous pixel. |
| {math}(P_8 = -1){math end} | Next pixel is on the same row as the previous pixel. |
| {math}(P_9 = 9){math end} | Next pixel is on the row above the previous pixel. |
| {math}(P_{10} = -7){math end} | Next pixel is on the same row as the previous pixel. |
| {math}(P_{11} = 3){math end} | Next pixel is on the row above the previous pixel. |
| {math}(P_{12} = -13){math end} | Next pixel is on the row above the previous pixel. |

{teacher end}

### Lines at other angles

So far the version of Bresenham's line drawing algorithm that you have used only works for lines that have a gradient (slope) between 0 and 1 (that is, from horizontal to 45 degrees). To make this algorithm more general, so that it can be used to draw any line, some additional rules are needed:

- If a line is sloping downward instead of sloping upward, then when P is 0 or greater, draw the next column's pixel one row *below* the previous pixel, instead of above it.
- If the change in Y value is greater than the change in X value, then the calculations for A, B, and the initial value for P will need to be changed. When calculating A, B, and the initial P, use X where you previously would have used Y, and vice versa. When drawing pixels, instead of going across every column in the X axis, go through every row in the Y axis, drawing one pixel per row.

{image computer-graphics/20grid.png alt="Grid for drawing line"}

In the grid above, choose two points of your own that are unique to you.
Don't choose points that will give horizontal, vertical or diagonal lines!

Now use Bresenham's algorithm to draw the line.
Check that it gives the same points as you would have chosen using a ruler, or using the formula {math}(y = mx+b){math end}.
How many arithmetic calculations (multiplications and additions) were needed for Bresenhams algorithm?
How many would have been needed if you used the {math}(y = mx+b){math end} formula?
Which is faster (bear in mind that adding is a lot faster than multiplying for most computers).

{teacher}

This method only has to compare an integer with 0 and do one addition for each pixel, which is a lot faster than the calculations in the previous version.

{teacher end}

You could write a program or design a spreadsheet to do these calculations for you --- that's what graphics programmers have to do.


### Circles

As well as straight lines, another common shape that computers often need to draw are circles.
An algorithm similar to Bresenham's line drawing algorithm, called the Midpoint Circle Algorithm, has been developed for drawing a circle efficiently.

A circle is defined by a centre point, and a radius. Points on a circle are all the radius distance from the centre of the circle.

{image computer-graphics/20grid-cr.png alt="Grid for drawing a circle"}

Try to draw a circle by hand by filling in pixels (without using a ruler or compass). Note how difficult it is to make the circle look round.

It is possible to draw the circle using a formula based on Pythagoras' theorem, but it requires calculating a square root for each pixel, which is very slow.
The following algorithm is much faster, and only involves simple arithmetic so it runs quickly on a computer.

### Bresenham's Midpoint Circle Algorithm

{comment}

.. xTCB could mention later that Bresenham didn't invent it, but idea comes from his line algorithm and is often named after him

{comment end}

Here are the rules for the Midpoint Circle Algorithm for a circle around ({math}(c_{x}){math end}, {math}(c_{y}){math end}) with a radius of {math}(R){math end}:

{math-block}

E = -R
X = R
Y = 0

{math-block end}

Repeat the following rules in order until *Y* becomes greater than *X*\ :

- Fill the pixel at coordinate ({math}(c_{x} + X){math end}, {math}(c_{y} + Y){math end})
- Increase *E* by {math}(2 \times Y + 1){math end}
- Increase *Y* by 1
- If *E* is greater than or equal to 0,  subtract {math}((2X - 1)){math end} from *E*, and then subtract 1 from *X*.

Follow the rules to draw a circle on the grid, using ({math}(c_{x}){math end}, {math}(c_{y}){math end})  as the centre of the circle, and {math}(R){math end} the radius.
Notice that it will only draw the start of the circle and then it stops because *Y* is greater than *X*\ !

{image computer-graphics/20grid-cr.png alt="Grid for drawing a circle"}

{teacher}

In the following diagram, the black pixels below represent the initial octant of the circle drawn by the algorithm above, the darker gray pixels represent reflection along the X and Y axis (details are given below), and the lighter gray pixels represent the reflection along a diagonal (see also below).

{image computer-graphics/20grid-cr-answer.png alt="Solution for drawing a circle"}

The values in the calculation for the above example are:

| Calculation | Pixel to colour in |
|-------------|--------------------|
| {math}(E_0 = -7, X_0 = 7, Y_0 = 0){math end} | Plot pixel (16, 9) |
| {math}(E_1 = -6, Y_1 = 1){math end} | Plot pixel (16, 10) |
| {math}(E_2 = -3, Y_2 = 2){math end} | Plot pixel (16, 11) |
| {math}(E_3 = 2, Y_3 = 3){math end} | -  |
| {math}(E_4 = -11, X_4 = 6){math end} | Plot pixel (15, 12) |
| {math}(E_5 = -4, Y_5 = 4){math end} | Plot pixel (15, 13) |
| {math}(E_6 = 5, Y_6 = 5){math end} | - |
| {math}(E_7 = -6, X_7 = 5){math end} | Plot pixel (14, 14) |
| {math}(E_8 = 5, Y_8 = 6){math end} | *y* is greater than *x*, so we can now reflect our octant |

{teacher end}

When *y* becomes greater than *x*, one eighth (an octant) of the circle is drawn.
The remainder of the circle can be drawn by reflecting the octant that you already have (you can think of this as repeating the pattern of steps you just did in reverse).
Reflect pixels along the X and Y axis, such that the line of reflection crosses the middle of the centre pixel of the circle.
Half of the circle is now drawn, the left and the right half.
To add the remainder of the circle, another line of reflection must be used.
Can you work out which line of reflection is needed to complete the circle?

{jargon-buster}

**Jargon Buster** : Octant

A quadrant is a quarter of an area; the four quadrants that cover the whole area are marked off by a vertical and horizontal line that cross. An *octant* is one eighth of an area, and the 8 octants are marked off by 4 lines that intersect at one point (vertical, horizontal, and two diagonal lines).

{jargon-buster end}

To complete the circle, you need to reflect along the diagonal.
The line of reflection should have a gradient of 1 or -1, and should cross through the middle of the centre pixel of the circle.

While using a line of reflection on the octant is easier for a human to understand, a computer can draw all of the reflected points at the same time it draws a point in the first octant because when it is drawing pixel with an offset of (x,y) from the centre of the circle, it can also draw the pixels with offsets (x,-y), (-x,y), (-x,-y), (y,x), (y,-x), (-y,x) and (-y,-x), which give all eight reflections of the original point!

By the way, this kind of algorithm can be adapted to draw ellipses, but it has to draw a whole quadrant because you don't have octant symmetry in an ellipse.

### Practical applications

Computers need to draw lines, circles and ellipses for a wide variety of tasks, from game graphics to lines in an architect's drawing, and even a tiny circle for the dot on the top of the letter 'i' in a word processor.  By combining line and circle drawing with techniques like 'filling' and 'antialiasing', computers can draw smooth, clear images that are resolution independent.
When an image on a computer is described as an outline with fill colours it is called vector graphics --- these can be re-drawn at any resolution. This means that with a vector image, zooming in to the image will not cause the pixelation seen when zooming in to bitmap graphics, which only store the pixels and therefore make the pixels larger when you zoom in.
However, with vector graphics the pixels are recalculated every time the image is redrawn, and that's why it's important to use a fast algorithm like the one above to draw the images.

Outline fonts are one of the most common uses for vector graphics as they allow the text size to be increased to very large sizes, with no loss of quality to the letter shapes.

Computer scientists have found fast algorithms for drawing other shapes too, which means that the image appears quickly and it can be done on relatively slow hardware - for example, a smartphone needs to do these calculations all the time to display images, and reducing the amount of calculations can extend its battery life, as well as make it appear faster.

As usual, things aren't quite as simple as shown here. For example, consider a horizontal line that goes from (0,0) to (10,0), which has 11 pixels.
Now compare it with a 45 degree line that goes from (0,0) to (10,10). It still has 11 pixels, but the line is longer (about 41\% longer to be precise).
This means that the line would appear thinner or fainter on a screen, and extra work needs to be done (mainly anti-aliasing) to make the line look ok. We've only just begun to explore how techniques in graphics are needed to quickly render high quality images.

### Project: Line and circle drawing

To compare Bresenham's method with using the equation of a line ({math}(y = mx+b){math end}), choose your own start and end point of a line (of course, make sure it's at an interesting angle), and show the calculations that would be made by each method. Count up the number of additions, subtractions, multiplications and divisions that are made in each case to make the comparison. Note that addition and subtraction is usually a lot faster than multiplication and division.

You can estimate how long each operation takes on your computer by running a program that does thousands of each operation, and timing how long it takes for each. From this you can estimate the total time taken by each of the two methods. A good measurement for these is how many lines (of your chosen length) your computer could calculate per second.


{teacher}

This project is suitable for the 3.44 (AS91636) NZ standard. The "key problem" is drawing lines and circles in 2D graphics, "practical applications" would be for drawing programs and rendering images based on lines and curves (including scalable fonts), the "key algorithm/technique" is Bresenham's line and circle drawing algorithm. The effectiveness could be evaluated by the number of arithmetic calculations needed to draw a sample line, and students can compare the :math:`\(mx+b\)` method with Bresenham's (the latter will require a lot fewer calculations; these can be counted accurately for a given line, so as long as students choose their own starting and ending points, their calculations are going to be slightly different to others' which gives good authenticity for the project).

For the standard it isn't strictly necessary to measure the actual time of each operation, but this will help to make the experience more authentic since the speed will be for the computer the student is using, and also can lead to very practical estimates, such as how many lines the computer could drawn in a second using each method.

A strong student could also look into the total number of arithmetic operations performed to calculate a circle using Bresenham's method compared with using the equations of a circle (which is based on {math}x^2{math end} + {math}y^2{math end} = {math}r^2{math end}). The project can give visual examples of objects that are specified as lines and circles, such as a scalable font.

These algorithms could be used as a simple programming assignment where the calculations are implemented and the program outputs the coordinates of the line (or draws the pixels if that is easy).

Each student should choose random starting and ending points so each draws a different line. Make sure that they don't choose horizontal, vertical or diagonal lines, as these are trivial (although it would be a good exercise to do these *as well* as one at a more difficult angle to help understand how the algorithm works).

If a class need to choose some points, one way would be to base them on students' names as follows. For the start point of the line, choose the X value as the first letter in the student's given name converted to a number (e.g. Caren would be 3, because C is the third letter in the alphabet). If the number is greater than 19, subtract 20 from it. For the Y value of the start point, choose the number made with the second letter of their first name.  For the end point of the line, use the first two letters of their family name. For example: If the name was John Smith, you would use the 'Jo' in John to choose the starting point (10, 15). You would then use the 'Sm' in Smith to choose the ending point (19, 13). If this produces a trivial line, add one to one of the points.

{teacher end}

{comment}

.. Hidden surface removal
.. =====================================================

.. Occlusion: Painters algorithm, z-buffer, ray tracing

.. Ray tracing
.. =====================================================

.. Define and render a scene using provided ray-tracing software e.g. POV-Ray
.. (http://library.thinkquest.org/3285/)
.. Javascript Ray Tracer
.. (http://blog.vjeux.com/2012/javascript/javascript-ray-tracer.html)
.. Here you can even setup your own scene and render it to an image.
.. (http://fooo.fr/~vjeux/epita/raytracer/raytracer.html#pokeball)
.. Javascript Real-time Raytracer
.. (http://jsray.user2dev.com/l)

.. Projections
.. =====================================================

.. Other possible projects:
.. - Explore modelling surfaces using splines, surfaces of revolution, and simple methods to generate terrain models
.. - Explore computational geometry methods (such as convex hulls and closest pair of points)

{comment end}

## The whole story!

{comment}

.. homogeneous matrices allow combining the multiplication and addition needed in matrix transformations in section xxx

{comment end}

## Further reading

{comment}

.. todo:: this section is yet to be written

{comment end}

### Useful Links

- [http://en.wikipedia.org/wiki/Computer_graphics](http://en.wikipedia.org/wiki/Computer_graphics)
- [http://en.wikipedia.org/wiki/Transformation_matrix](http://en.wikipedia.org/wiki/Transformation_matrix)
- [http://en.wikipedia.org/wiki/Bresenham’s_line_algorithm](http://en.wikipedia.org/wiki/Bresenham’s_line_algorithm)
- [http://en.wikipedia.org/wiki/Ray_trace](http://en.wikipedia.org/wiki/Ray_trace)
- [http://www.cosc.canterbury.ac.nz/mukundan/cogr/applcogr.html](http://www.cosc.canterbury.ac.nz/mukundan/cogr/applcogr.html)
- [http://www.cosc.canterbury.ac.nz/mukundan/covn/applcovn.html](http://www.cosc.canterbury.ac.nz/mukundan/covn/applcovn.html)
- [http://www.povray.org/resources/links/3D_Tutorials/POV-Ray_Tutorials/](http://www.povray.org/resources/links/3D_Tutorials/POV-Ray_Tutorials/)

Computer Graphics, Computer Vision, Bresenham’s Line Algorithm, Ray Tracing, Magnetic Resonance Imaging (MRI), Rendering, 3D Modeling, Animation, WebGL (Web Graphics Library), OpenGL (Open Graphics Library)


### Key concepts

- Algorithms: Bresenham’s algorithm (line and circle drawing), colour space conversion, line anti-aliasing, Bézier and B-spline curves, painter’s algorithm, Z-buffer
- Techniques: Techniques: ray tracing, texture mapping, shading, anti-aliasing, volume rendering, polygonisation, constructive solid geometry, 3D modeling, hidden object removal
- Applications: drawing software, animation

{comment}

.. grand theft auto: "Jacked" book (R warning)

{comment end}
