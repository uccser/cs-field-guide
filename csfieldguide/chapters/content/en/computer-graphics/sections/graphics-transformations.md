# Graphics transformations

A computer graphics image is just the result of a whole lot of mathematical calculations.
In fact, every pixel you see in an image has usually had many calculations made to work out what colour it should be, and there are millions of pixels in a typical image.

Let's start with some simple but common calculations that are needed in graphics programming.
The following interactive shows a cube with symbols on each face.
You can move it around using what's called a *transform*, which simply adjusts where it is placed in space.
The camera will always focus on the cube, so to see the back of the cube move it behind the camera.
Try typing 3D coordinates into this interactive to find each symbol.

{interactive slug="box-translation" type="whole-page" alt="Box Translation interactive"}

You've just applied 3D *translation transforms* to the cube.
Translation just means moving it in the three dimensions up and down, forward and back, and left and right.

Now try the following challenge, which requires you to rotate the box to find the codes.

{interactive slug="box-rotation" type="whole-page" alt="Box Rotation interactive"}

There are several transformations that are used in computer graphics, but the most common ones are translation (moving the object), rotation (spinning it) and scaling (changing its size).
They come up often in graphics because they are applied not only to objects, but to things like the positions of the camera and lighting sources.

In this section you can apply transformations to various images.
We'll start by making the changes manually, one point at a time, but we'll move up to a quick shortcut method that uses a *matrix* to do the work for you.
We'll start by looking at how these work in two dimensions &ndash; it's a bit easier to think about than three dimensions.

The following interactive shows a shape, and on the left you can see a list of the points that correspond to its 7 corners (usually referred to as *cartesian coordinates*).
The shape is on a grid, where the center point is the "zero" point.
Points are specified using two numbers, *x* and *y*, usually written as (*x*, *y*).
The *x* value is how far the point is to the right of the center and the *y* value is how far above the center it is.
For example, the first point in the list is the tip at (0, 4), which means it's 0 units to the right of the center (i.e.
at the center), and 4 units above it.
Which point does the last pair (3, 1) correspond to?
What does it mean if a coordinate has a negative *x* value?

{panel type="teacher-note"}

# Solutions to questions

(3, 1) is the right-most corner of the shape.
A negative *x* value means that it's to the *left* of the center instead of the right.
(A negative *y* value is below the center).

{panel end}

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=coord-translate"}

Translating

{interactive end}

{panel type="teacher-note"}

# Solution

The transform in this interactive *translates* the shape 2 units to the right and 3 units up.
Subtracting three translates the shape down and to the left.

{panel end}

The transform you did in the above interactive is called a *translation* &ndash; it translates the shape around the grid.
This kind of transform is used in graphics to specify where an object should be placed in a scene, but it has many other uses, such as making an animated object move along a path, or specifying the position of the imaginary camera (viewpoint).

The next challenge involves changing the size of the image.

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=coord-scale"}

Scaling

{interactive end}

{panel type="teacher-note"}

# Solution

Multiplying by 2 makes the shape twice as large in each dimension.
Multiplying by 10 makes it 10 times as large.
Multiplying by 0.5 makes the shape half the size.
Multiplying only the x values makes the shape wider horizontally only.

{panel end}

This transformation is called *scaling*, and although it can obviously be used to control the size of an object, this can in turn be used to create a visual effect such as making the object appear closer or further away.

In the following interactive, try to get the blue shape to match up with the red one.
It will require a mixture of scaling and translation.

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=coord-scale-translate"}

Scaling and Translating

{interactive end}

Next, see what happens if you swap the *x* and *y* value for each coordinate.

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=coord-swap"}

Swapping Coordinates

{interactive end}

This is a simple *rotation* transformation, useful for positioning objects in a scene,
but also for specifying things like camera angles.

Typing all these coordinates by hand is inefficent.
Luckily there's a much better way of achieving all this.
Read on!

{comment We won't mention reflection and shearing etc., but this can go in the "whole story" section}

## Matrix transformations

{panel type="teacher-note"}

# Extra preparation for using matrix transforms

This section introduces the use of matrices to do the transforms.
It doesn't assume that they have encountered matrices before, but if students are completely new to matrix algebra and are also weak in algebra in general, the explanation in this chapter might be a little minimal for them, and extra help will be needed.
There are good resources around that explain matrices, although they likely provide more detail than needed.
The
[Khan academy](https://www.khanacademy.org/math/precalculus/precalc-matrices) have videos and quizzes explaining matrices (we are particularly interested in multiplying a matrix by a vector, which is what is happening when a matrix transform is applied to a point &ndash; the point is the vector).

Other explanations aimed at school students include:
- [Math is Fun - Matrix multiplying](http://www.mathsisfun.com/algebra/matrix-multiplying.html)
- [Math in Sight - Matrix vector multiplication](https://mathinsight.org/matrix_vector_multiplication)
- [Math Planet - Transformation using matrices](http://www.mathplanet.com/education/geometry/transformations/transformation-using-matrices)
- [Wikipedia entry on matrix transformation](https://en.wikipedia.org/wiki/Transformation_matrix) &ndash; which likely has too much extra detail for students in it

{panel end}  

There's a much easier way to specify transformations than having to change each coordinate separately.
Transformations are usually done in graphics using *matrix* arithmetic, which is a shorthand notation for doing lots of simple arithmetic operations in one go.
The matrix for the two-dimensional transformations we've been doing above has four values in it.
For the 2 dimensional scaling transform where we made each *x* and *y* value twice as large, the matrix is written as:

\[
\begin{bmatrix}
2 & 0 \\  
0 & 2 \\  
\end{bmatrix}
\]

where the top left value just means multiply all the x values by 2, and the bottom right value means multiply all the y values by 2.

You can try it out in the following interactive:

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-scale"}

2D Scaling

{interactive end}

At this stage you may want to have the interactive open in a separate window so that you can read the text below and work on the interactive at the same time.

Let's take a closer look at what is happening here.
As we mentioned earlier, each point on our shape can be represented by two values (x and y).
The rightmost point, on the shape in the interactive above, we say is at point (3, 1) in our coordinate space.

When we are applying a scaling transformation we are actually doing a type of "matrix multiplication."
For example, let's scale point (3, 1) by a factor of 2 as we did in the previous interactive:

\[
\begin{bmatrix}
2 & 0 \\  
0 & 2 \\  
\end{bmatrix}
\times
\begin{bmatrix}
3 \\
1 \\
\end{bmatrix}
=
\begin{bmatrix}
6 \\
2 \\
\end{bmatrix}
\]

This gives us a new position of (6, 2) for the rightmost point, which matches the previous interactive after applying the scaling matrix!
This same matrix multiplication is applied to each of the seven points on the shape.

Now try changing the matrix to

\[
\begin{bmatrix}
3 & 0 \\  
0 & 3 \\  
\end{bmatrix}
\]

For the rightmost point (starting at (3, 1)), the matrix muliplication for scaling by a factor of 3 is:

\[
\begin{bmatrix}
3 & 0 \\  
0 & 3 \\  
\end{bmatrix}
\times
\begin{bmatrix}
3 \\
1 \\
\end{bmatrix}
=
\begin{bmatrix}
9 \\
3 \\
\end{bmatrix}
\]

Now let's try scaling with a number less than one:

\[
\begin{bmatrix}
0.2 & 0 \\  
0 & 0.2 \\  
\end{bmatrix}
\]

For the rightmost point (starting at (3, 1)), the matrix muliplication for scaling by a factor of 0.2 is:

\[
\begin{bmatrix}
0.2 & 0 \\  
0 & 0.2 \\  
\end{bmatrix}
\times
\begin{bmatrix}
3 \\
1 \\
\end{bmatrix}
=
\begin{bmatrix}
0.6 \\
0.2 \\
\end{bmatrix}
\]

{panel type="teacher-note"}

# Explanation

These should create a shape 3 times as big and 0.2 (i.e. scaled down to one fifth of the size) times as big respectively.

{panel end}

By now you might be starting to see a recurring pattern in our matrix multiplication for scaling.
To scale by a factor of s, we can apply the general rule:

\[
\begin{bmatrix}
s & 0 \\  
0 & s \\  
\end{bmatrix}
\times
\begin{bmatrix}
x \\
y \\
\end{bmatrix}
=
\begin{bmatrix}
sx \\
sy \\
\end{bmatrix}
\]

{panel type="extra-for-experts"}

# Matrix multiplication challenge

Pick 2 or 3 more points on the shape (include some with negative x and y values) and try to do the matrix multiplication for scaling each factor above (2, 3 and 0.2).
You'll know if you got the correct answer because it should match the scaled shape in the interactive!

{panel end}

What happens if you use the following matrix?

\[
\begin{bmatrix}
2 & 0 \\  
0 & 4 \\  
\end{bmatrix}
\]

{panel type="teacher-note"}

# Explanation

The x values are doubled but the y values are multiplied by 4, so it is stretched twice as much vertically as horizontally.

{panel end}

A simple way of looking at the matrix is that the top row determines the transformed *x* value, simply by saying how much of the original *x* value and *y* value contribute to the new *x* value.
So in the matrix:

\[
\begin{bmatrix}
2 & 0 \\  
0 & 4 \\  
\end{bmatrix}
\]

the top row just means that the new *x* value is 2 lots of the original *x*, and none of the original y, which is why all the *x* values double.
The second row determines the *y* value: in the above example, it means that the new *y* value uses none of the original x, but 4 times the original *y* value.
If you try this matrix, you should find that the location of all the *x* points is doubled, and the location of all the y points is multiplied by 4.

Now try the following matrix:

\[
\begin{bmatrix}
0 & 1 \\  
1 & 0 \\  
\end{bmatrix}
\]

This matrix should have rotated the shape to the right.

The new *x* value has none of the original *x*, but exactly the original *y* value, and vice versa.
This swaps all the *x* and *y* coordinates, which is the same as rotating the object to the right.

Where it gets interesting is when you use a little of each value; try the following matrix:

\[
\begin{bmatrix}
0.7 & 0.7 \\  
-0.7 & 0.7 \\  
\end{bmatrix}
\]

Now the *x* value of each coordinate is a mixture of 0.7 of the original *x*, and 0.7 of the original *y*.
This is called a *rotation*.

In general, to rotate an image by a given angle you need to use the sine (abbreviated sin) and cosine (abbreviated cos) functions from trigonometry.
You can use the interactive below to calculate values for the sin and cos functions.

{interactive slug="trig-function-calculator" type="whole-page" alt="Trig Function Calculator"}

To rotate the image anticlockwise by \( \theta \) degrees, you'll need the following values in the matrix, which rely on trig functions:

\[
\begin{bmatrix}
\cos(\theta) & -\sin(\theta) \\  
\sin(\theta) & \cos(\theta) \\  
\end{bmatrix}
\]

{panel type="teacher-note"}

# Explanation

If your students aren't familiar with sin and cos, it may be worth going over them separately, including the idea that the angle is usually measured in degrees, and the sin and cos functions will produce a number between 0  and 1.
The [Khan Academy](https://www.khanacademy.org/math/trigonometry/trigonometry-right-triangles) has more information about sine and cosine functions, explained in terms of triangles.

{panel end}

Note that the following interactives involving rotation transformations expect accuracy of 2 decimal places.

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-rotate"}

Matrix Rotation

{interactive end}

{panel type="teacher-note"}

# Solution

Using x = 45 in the trig function calculator, the matrix should be \( \begin{bmatrix}  0.71 & 0.71 \\   -0.71 & 0.71 \\   \end{bmatrix} \).
The translation needs to be 5,4.

{panel end}

What is the matrix for rotation by 360 degrees?

{panel type="teacher-note"}

# Explanation

If you put in 360 for \( \Theta \) in the rotation formula, you get the matrix \( \begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix} \),
because
\( \cos(360)=1 \) and
\( \sin(360)=1 \).
This is also known as the 'identity' matrix because it makes no change to the original image.
You get this matrix if you rotate by a multiple of 360 (including 0 degrees of course).

{panel end}

Recall that the general matrix for scaling is:

\[
\begin{bmatrix}
s & 0 \\  
0 & s \\  
\end{bmatrix}
\]

A bit simpler than the one for rotation!

A translation can't be specified by this kind of matrix, so in the interactives we've provided an extra place to specify an *x* and *y* value to translate the input.
Try it out in the following interactive.

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-translate"}

Translation Challenge

{interactive end}

{panel type="teacher-note"}

# Solution

Translate x is 9 and y is -7 (9 to the right and 7 down).

{panel end}

The next interactive needs you to combine translation with scaling.

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-scale-translate"}

Scaling and Translation Challenge

{interactive end}

{panel type="teacher-note"}

# Solution

The matrix should be \( \begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix} \) (doubles the size).
Translate x is 9 and y is -6.

{panel end}

The order in which translation and scaling happen makes a difference.
Try the following challenge!

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-scale-translate-2"}

Translation Before Scaling

{interactive end}

{panel type="teacher-note"}

# Solution

The matrix should be \( \begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix} \) (still needed to double the size).
However, the translation will be doubled as well since it comes before the matrix, therefore translate x is 4.5 and y is -3 (half of the distance needed).

{panel end}

In the above interactive, you'll have noticed that scaling is affected by how far the object is from the center.
If you want to scale around a fixed point in the object (so it expands where it is), then an easy way is to translate it back to the center (also called the *origin*), scale it, and then translate it back to where it was.
 The following interactive allows you to move the shape, then scale it, and move it back.

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-scale-translate-3"}

Using Translation to Simplify Scaling

{interactive end}

{panel type="teacher-note"}

# Solution

The first translation is x = -12 and y = -12.
Now the shape tip is at the origin, and the doubling will keep the tip where it is.
The matrix should be \( \begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix} \) as usual for doubling.
The second translation needs to be 12,12 to get the shape back to the starting point.

{panel end}

The same problem comes up with rotation.
The following interactive allows you to use a translation first to make the scaling more predicable.

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-rotate-translate"}

Using Translation to Simplify Rotation

{interactive end}

{panel type="teacher-note"}

# Solution

The first translation is -5,-12 to put the shape tip at the origin.
Using x = 45 in the trig function calculator, the matrix should be \( \begin{bmatrix}  0.71 & -0.71 \\   0.71 & 0.71 \\   \end{bmatrix} \).
The second translation needs to be 5,12 to get the shape back to the starting point.

{panel end}

Now that you've had a bit of practice with translation, scaling and rotation, try out these two challenges that combine all three:

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-rotate-scale-translate"}

Combining Translation, Scaling and Rotation

{interactive end}

{panel type="teacher-note"}

# Solution

Scale matrix is \( \begin{bmatrix}  2 & 0 \\   0 & 1 \\   \end{bmatrix} \).
Using x = -90 in the trig function calculator, the rotation matrix is \( \begin{bmatrix}  0 & 1 \\  -1 & 0 \\   \end{bmatrix} \) -- that's a 90 degree clockwise rotation.
The translation vector is 8,4.

{panel end}

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-rotate-scale-translate-2"}

Multiple Transformation Challenge

{interactive end}

{panel type="teacher-note"}

# Solution

Scale matrix is \( \begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix} \).
Using x = 45 in the trig function calculator, the rotation matrix is \( \begin{bmatrix}  0.71 & -0.71 \\  0.71 & 0.71 \\   \end{bmatrix} \) -- that's a 45 degree anticlockwise rotation.
The translation vector is -4,-7.

{panel end}

These combined transformations are common, and they might seem like a lot of work because each matrix has to be applied to every point in an object.
Our shapes only had 7 points, but complex images can have thousands or even millions of points in them.
Fortunately we can combine all the matrix operations in advance to give just one operation to apply to each point.

## Combining transformations

Several transforms being applied to the same image (for example, rotate, move and scale the wheel of a car) can be made more efficient by creating one matrix that has the effect of all the transforms combined.The combination is done by "multiplying" all the matrices.

Multiplying two matrices can't be done by just multiplying the corresponding elements (as we learned earlier when applying scaling transformations); if you are multiplying two 2x2 matrices with the *a* and *b* values shown below, the resulting values from the multiplication are calculated as follows:

\[
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
\]

It's a bit complicated, but this calculation is only done once to work out the combined transformation, and it gives you a single matrix that will provide two transforms in one operation.

As a simple example, consider what happens when you scale by 2 and then rotate by 45 degrees.
The two matrices to multiply work out like this:

\[
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
\]

You can put the matrix we just calculated into the following interactive to see if it does indeed scale by 2 and rotate 45 degrees.
Also try making up your own combination of transforms to see if they give the result you expect.

{interactive slug="2d-shape-manipulations" type="whole-page" text="true" parameters="config=matrix-single"}

Check a Single Matrix

{interactive end}

In computer graphics systems there can be many transformations combined, and this is done by multiplying them all together (two at a time) to produce one matrix that does all the transforms in one go.
That transform might then be applied to millions of points, so the time taken to do the matrix multiplication at the start will pay off well.

The project below gives the chance to explore combining matrices, and has an interactive that will calculate the multiplied matrices for you.

## 3D transforms

So far we've just done the transforms in two dimensions.
To do this in 3D, we need a *z* coordinate as well, which is the depth of the object into the screen.
A matrix for operating on 3D points is 3 by 3.
For example, the 3D matrix for doubling the size of an object is as follows; it multiplies each of the *x*, *y* and *z* values of a point by 2.

\[
\begin{bmatrix}
2 & 0 & 0 \\  
0 & 2 & 0 \\  
0 & 0 & 2 \\  
\end{bmatrix}
\]

You can try out this 3D matrix in the following interactive.

{button-link link="https://archive.csfieldguide.org.nz/1.9.9/_static/widgets/CG/CG-mini-editor/main%20(cutdown).html?info=%0AIn%20this%20interactive,%20try%20changing%20the%20scaling%20on%20the%20image%20(it%20starts%20with%20a%20scaling%20factor%20of%2010%20in%20all%20three%20dimensions)" text="Click for interactive: 3D transform matrix"}

The above image mesh has 3644 points in it, and your matrix was applied to each one of them to work out the new image.

The next interactive allows you to do translation (using a vector).
Use it to get used to translating in the three dimensions (don't worry about using matrices this time.)

{button-link link="https://archive.csfieldguide.org.nz/1.9.9/_static/widgets/CG/CG-mini-editor/main%20(cutdown).html?info=%0ATranslation%20requires%203%20values,%20which%20are%20added%20to%20the%20*x*,%20*y*%20and%20*z*%20coordinates%20of%20each%20point%20in%20an%20object.%3Cp%3EIn%20the%20following%20interactive,%20try%20moving%20the%20teapot%20left%20and%20right%20(%20%3Cem%3Ex%3C/em%3E%20),%20up%20and%20down%20(%20%3Cem%3Ey%3C/em%3E%20),%20and%20in%20and%20out%20of%20the%20screen%20(%20%3Cem%3Ez%3C/em%3E%20)%20by%20adding%20a%20%E2%80%9Cvector%E2%80%9D%20to%20the%20operations.%20Then%20try%20combining%20all%20three.%3C/p%3E%0A" text="Click for interactive: 3D translation"}

Rotation is trickier because you can now rotate in different directions.
In 2D rotations were around the center (origin) of the grid, but in 3D rotations are around a line (either the horizontal x-axis, the vertical y-axis, or the z-axis, which goes into the screen!)

The 2D rotation we used earlier can be applied to 3 dimensions using this matrix:

\[
\begin{bmatrix}
\cos(\theta) & -\sin(\theta) & 0 \\  
\sin(\theta) & \cos(\theta)  & 0 \\  
0   &  0  &  1\\
\end{bmatrix}
\]

Try applying that to the image above.
This is rotating around the z-axis (a line going into the screen); that is, it's just moving the image around in the 2D plane.
It's really the same as the rotation we used previously, as the last line (0, 0, 1) just keeps the z point the same.

Try the following matrix, which rotates around the x-axis (notice that the x value always stays the same because of the 1,0,0 in the first line):

\[
\begin{bmatrix}
1   &  0  &  0 \\
0 &  \cos(\theta) & -\sin(\theta)  \\  
0 & \sin(\theta) & \cos(\theta)   \\  
\end{bmatrix}
\]

And this one for the y-axis:

\[
 \begin{bmatrix}
 \cos(\theta) & 0 &\sin(\theta)  \\  
 0   &  1  &  0\\
 -\sin(\theta) & 0 & \cos(\theta)   \\  
 \end{bmatrix}
\]

The following interactive allows you to combine 3D matrices.

{comment put in a sidebox on deriving the rotation matrices (one day) (maybe in the 2d part)}

{button-link link="https://archive.csfieldguide.org.nz/1.9.9/_static/widgets/CG/CG-mini-editor/main%20(cutdown).html?info=%0AYou%20can%20experiment%20with%20moving%20the%20teapot%20around%20in%20space,%20changing%20its%20size,%20and%20angle.%3Cdl%20class=%22docutils%22%3E%0A%3Cdt%3EThink%20about%20the%20order%20in%20which%20you%20need%20to%20combine%20the%20transforms%20to%20get%20a%20particular%20image%20that%20you%20want.%3C/dt%3E%0A%3Cdd%3EFor%20example,%20if%20you%20translate%20an%20image%20and%20then%20scale%20it,%20you%E2%80%99ll%20get%20a%20different%20effect%20to%20scaling%20it%20then%20translating%20it.%0AIf%20you%20want%20to%20rotate%20or%20scale%20around%20a%20particular%20point,%20you%20can%20do%20this%20in%20three%20steps%20(as%20with%20the%202D%20case%20above):%20(1)%20translate%20the%20object%20so%20that%20the%20point%20you%20want%20to%20scale%20or%20rotate%20around%20is%20the%20origin%20(where%20the%20x,%20y%20and%20z%20axes%20meet),%20(2)%20do%20the%20scaling/rotation,%20(3)%20translate%20the%20object%20back%20to%20where%20it%20was.%20If%20you%20just%20scale%20an%20object%20where%20it%20is,%20its%20distance%20from%20the%20origin%20will%20also%20be%20scaled%20up.%3C/dd%3E%0A%3C/dl%3E%0A" text="Click for interactive: 3D with multiple matrices and vectors"}

In the above examples, when you have several matrices being applied to every point in the image, a lot of time can be saved by converting the series of matrices and transforms to just one formula that does all of the transforms in one go.
The following interactive can do those calculations for you.

For example, in the following interactive, type in the matrix for doubling the size of an object (put the number 2 instead of 1 on the main diagonal values), then add another matrix that triples the size of the image (3 on the main diagonal).
The interactive shows a matrix on the right that combines the two &ndash; does it look right?

{button-link link="https://archive.csfieldguide.org.nz/1.9.9/_static/widgets/CG/CG-matrix-simplifier/CG-matrix-simplifier.html?info=Multiple%20transforms" text="Click for interactive: matrix simplifier"}

{panel type="teacher-note"}

# Explanation

The combined result of scaling by 2 and then 3 should have 6 down the main diagonal (i.e. 6 times larger).
The interactive gives a full derivation of the calculations being done on each x,y,z coordinate of each point in an image, but it really just has three inputs (x,y,z), which give the original position of a point, and three outputs (x',y',z') which give the transformed position of the point.

{panel end}

{comment One teacher noted that students where need to know that the it requires transform matrix and one translation; not sure if this is now applicable}

The interactive also allows you to combine in translations (just three numbers, for x, y and z).
Try combining a scaling followed by a translation.
What if you add a rotation &ndash; does the order matter?

{panel type="curiosity"}

# Matrix multiplication in 3D

In case you're wondering, the interactive is using the following formula to combine two matrices (you don't have to understand this to use it).
It is called matrix multiplication, and while it might be a bit tricky, it's very useful in computer graphics because it reduces all the transformations you need to just one matrix, which is then applied to every point being transformed.
This is way better than having to run all the matrices of every point.

{comment give an example for the following one day?}

\[
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
=\\
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
\]

{panel end}

{panel type="project"}

# 3D transforms

For this project, you will demonstrate what you've learned in the section above by explaining a 3D transformation of a few objects.
You should take screenshots of each step to illustrate the process for your report.

The following scene-creation interactive allows you to choose objects (and their colours etc.),
and apply one transformation to them.
To position them more interestingly, you will need to come up with multiple transformations
(e.g. scale, then rotate, then translate),
and use the "simplifier" interactive to combine all the matrices into one operation.

The scene-creation interactive can be run from here:

{button-link link="https://archive.csfieldguide.org.nz/1.9.9/_static/widgets/CG/CG-mini-editor/main.html?info=Multiple%20transforms" text="Click for interactive: scene creation"}

To generate combined transformations, you can use the following transform simplifier interactive:

{button-link link="https://archive.csfieldguide.org.nz/1.9.9/_static/widgets/CG/CG-matrix-simplifier/CG-matrix-simplifier.html?info=Multiple%20transforms" text="Click for interactive: matrix simplifier"}

Because you can't save your work in the interactives, keep notes and screen shots as you go along.
These will be useful for your report, and also can be used if you need to start over again.

Introduce your project with a examples of 3D images, and how they are used (perhaps from movies or scenes that other people have created).
Describe any innovations in the particular image (e.g. computer generated movies usually push the boundaries of what was previously possible, so discuss what boundaries were moved by a particular movie, and who wrote the programs to achieve the new effects).
One way to confirm that a movie is innovative in this area is if it has won an award for the graphics software.

To show the basics of computer graphics,
try putting a few objects in a particular arrangement (e.g. with the teapot sitting beside some cups),
and explain the transforms needed to achieve this, showing the matrices needed.

Give simple examples of translation, scaling *and* rotation using your scene.
You should include multiple transforms applied to one object, and show how they can be used to position an object.

Show how the matrices for a series of transforms can be multiplied together to get one matrix that applies all the transforms at once.

Discuss how the single matrix derived from all the others is more efficient, using your scene as an example to explain this.

{panel end}

{panel type="project"}

# WebGL and OpenGL

If you're confident with programming and want to explore graphics at a more practical level, you could do a similar project to the previous one using a graphics programming system such as [WebGL](https://en.wikipedia.org/wiki/WebGL) (which is the system used in the demonstrations above), or a widely used graphics system such as [OpenGL](https://en.wikipedia.org/wiki/OpenGL).

Note that these project can be very time consuming because these are powerful systems,
and there is quite a bit of detail to get right even for a simple operation.

{panel end}

{comment Colour models RGB, CMY, HSV, ... tricolour stimulus}
