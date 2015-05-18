# Computer Graphics

*******************************************************
Computer graphics
*******************************************************

{teacher}
The following assessment plans also cover this material:

**New Zealand - AS91636 (3.44)**
- [Assessment Overview](/appendices/assessment_guides/new_zealand/computer_graphics.html)
{teacher end}

{comment}
Visual computing is usually graphics (output) and vision (input)

Often the term “visual computing” encompasses computer graphics, so the term “graphics” isn’t strictly required in the name of this area; also note that in this context is does not refer to the use of “visual programming languages” or “visual programming environments” e.g. Visual Studio. The creation of images could be as simple as a 2D drawing program, or as advanced as 3D systems for entertainment or to help visualise a data set. 
{comment end}

{include video http://www.youtube.com/embed/5kuoRjgfCls}

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

{include interactive computer_graphics_box_translation}

You've just applied 3D *translation transforms* to the cube. Translation just means moving it in the three dimensions up and down, forward and back, and sideways. 

{include interactive computer_graphics_box_rotation}

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

{include interactive computer_graphics_arrow parameters="&quiz=2 0 0 5 0 2 0 4 0 0 2 0 0 0 0 1 &hidetarget=true"}

The above transform is called a *translation* --- it translates the arrow around the grid. This kind of transform is used in graphics to specify where an object should be placed in a scene, but it has many other uses, such as making an animated object move along a path, or specifying the position of the imaginary camera (viewpoint).

{teacher}
Multiplying by 2 makes the arrow twice as large in each dimension. Multiplying by 10 makes it 10 times as large, which won't fit in the view. Multiplying by 0.5 makes the arrow half the size. Multiplying only the x values makes the arrow wider horizontally only.
{teacher end}
  
{include interactive computer_graphics_arrow parameters="&quiz=0.5 0 0 0 0 0.5 0 0 0 0 1 0 0 0 0 1 &hidetarget=true"}
  
This transformation is called *scaling*, and although it can obviously be used to control the size of an object, this can in turn be used to create a visual effect such as making the object appear closer or further away.

{include interactive computer_graphics_arrow parameters="&quiz=2 0 0 5 0 2 0 4 0 0 2 0 0 0 0 1"}

{include interactive computer_graphics_arrow parameters="&quiz=0 1 0 0 1 0 0 0 0 0 1 0 0 0 0 1 &hidetarget=true &zoom=-5.0"}

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

{math_block}
\begin{bmatrix} 
2 & 0 \\  
0 & 2 \\  
\end{bmatrix}
{math_block end}

{include interactive computer_graphics_arrow parameters="&quiz=2 0 0 0 0 2 0 0 0 0 2 0 0 0 0 1"}

At this stage you may want to have the widget open in a separate window so that you can read the text below and interact with the widget at the same time.

Now try changing the matrix to 

{math_block}
\begin{bmatrix} 
3 & 0 \\  
0 & 3 \\  
\end{bmatrix}
{math_block end}

or

{math_block}
\begin{bmatrix} 
0.2 & 0 \\  
0 & 0.2 \\  
\end{bmatrix}
{math_block end}

{teacher}
This should create an arrow 3 times as big and 0.2 times as big.
{teacher end}

The "add translate" values in the interactive are added to each *x* and *y* coordinate; experiment with them to see what they do. Now try to find suitable values for these and the matrix to match the arrow up with the red one.

{teacher}
This needs the matrix {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} and the x,y values 5 and 4 (this doubles the size of the arrow and moves it 5 across and 4 up).
{teacher end{

What happens if you use the following matrix?

{math_block}
\begin{bmatrix} 
2 & 0 \\  
0 & 4 \\  
\end{bmatrix}
{math_block end}

{teacher}
The x values are doubled but the y values are multiplied by 4, so it is stretched twice as much vertically as horizontally.
{teacher end}

Now try the following matrix:

{math_block}
\begin{bmatrix} 
0 & 1 \\  
1 & 0 \\  
\end{bmatrix}
{math_block end}

This matrix should have rotated the arrow to the right.

A simple way of looking at the matrix is that the top row determines the transformed *x* value, simply by saying how much of the original *x* value and *y* value contribute to the new *x* value. So in the matrix:

{math_block}
\begin{bmatrix} 
2 & 0 \\  
0 & 4 \\  
\end{bmatrix}
{math_block end}

The top row just means that the new *x* value is 2 lots of the original *x*, and none of the original y, which is why all the *x* values double. The second row determines the *y* value: in the above example, it means that the new *y* value uses none of the original x, but 4 times the original *y* value. If you try this matrix, you should find that the location of all the *x* points is doubled, and the location of all the y points is multiplied by 4.

That now explains the {math}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math end} matrix. The new *x* value has none of the original *x*, but exactly the original *y* value, and vice versa. This swaps all the *x* and *y* coordinates, which is the same as rotating the object to the right.

Where it gets interesting is when you use a little of each value; try the following matrix:

{math_block}
\begin{bmatrix} 
0.7 & 0.7 \\  
-0.7 & 0.7 \\  
\end{bmatrix}
{math_block end}

Now the *x* value of each coordinate is a mixture of 0.7 of the original *x*, and 0.7 of the original *y*.

In general, to rotate an image by a given angle you need to use the sine (abbreviated sin) and cosine (abbreviated cos) functions from trigonometry. To rotate the image by {math}\theta{math end} degrees, you'll need the following values in the matrix, which rely on trig functions:

{math_block}
\begin{bmatrix} 
\cos(\theta) & -\sin(\theta) \\  
\sin(\theta) & \cos(\theta) \\  
\end{bmatrix}
{math_block end}

{teacher}
If your students aren't familiar with sin and cos, it may be worth going over them separately, including the idea that the angle is usually measured in degrees, and the functions will produce a number between 0  and 1.
{teacher end}

{include interactive computer_graphics_arrow parameters="&quiz=0.7 0.7 0 5 -0.7 0.7 0 4 0 0 1 0 0 0 0 1"}

What is the matrix for rotation by 360 degrees?

{teacher{
If you put in 360 for {math}\Theta{math end} in the rotation formula, you get the matrix {math_block}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math_block end}. This is also known as the 'identity' matrix because it makes no change to the original image. You get this matrix if you rotate by a multiple of 360 (including 0 degrees of course).
{teacher end}

The general matrix for *scaling* is a bit simpler; if you want to scale by a factor of *s*, then you just use the matrix:

{math_block}
\begin{bmatrix} 
s & 0 \\  
0 & s \\  
\end{bmatrix}
{math_block end}

A translation can't be specified by this kind of matrix, but in the interactives we've provided an extra place to specify an *x* and *y* value to translate the input.

{include interactive computer_graphics_arrow parameters="&quiz=1 0 0 5 0 1 0 4 0 0 1 0 0 0 0 1"}

{teacher}
Solution: Translate x is 5 and y is 4 (5 to the right and 4 up). The matrix should be {math_block}\begin{bmatrix}  1 & 0 \\   0 & 1 \\   \end{bmatrix}{math_block end}
{teacher end}

{include interactive computer_graphics_arrow parameters="&quiz=2 0 0 4 0 2 0 3 0 0 2 0 0 0 0 1"}

{teacher}
Solution: The matrix should be {math_block}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math_block} (doubles the size). Translate x is 4 and y is 3.
{teacher end}

{include interactive computer_graphics_arrow parameters="&quiz=2 0 0 5 0 2 0 4 0 0 2 0 0 0 0 1"}

{teacher}
Solution: The matrix should be {math_block}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math_block end} (still needed to double the size). However, the translation will be doubled as well since it comes before the matrix, therefore translate x is 2.5 and y is 2 (half of the distance needed). 
{teacher end}

In the above, you'll have noticed that scaling is affected by how far the object is from the centre.
If you want to scale around a fixed point in the object (so it expands where it is), then an easy way is to translate it back to the centre (also called the *origin*), scale it, and then translate it back to where it was.  The following interactive allows you to move the arrow, then scale it, and move it back.

{include interactive computer_graphics_arrow_transform parameters="&zoom=-15.0 &quiz=2 0 0 -8 0 2 0 3 0 0 2 0 0 0 0 1 &start=1 0 0 -8 0 1 0 5 0 0 1 0 0 0 0 1 &allPrize=5"}

{teacher}
Solution: The first translation is x=8 and y=-7. Now the arrow tip is at the origin, and the doubling will keep the tip where it is. The matrix should be {math_block}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math_block end} as usual for doubling. The second translation needs to be -8,7 to get the arrow back to the starting point. 
{teacher end}

The same problem comes up with rotation. 

{include interactive computer_graphics_arrow_transform parameters="&zoom=-10.0 &quiz=0.699999988079071 0.699999988079071 0 -4.400000095367432 -0.699999988079071 0.699999988079071 0 4.599999904632568 0 0 1 0 0 0 0 1 &start=1 0 0 -3 0 1 0 4 0 0 1 0 0 0 0 1 &allPrize=5"}

{teacher}
Solution: The first translation is x=8 and y=-7. Now the arrow tip is at the origin, and the doubling will keep the tip where it is. The matrix should be {math_block}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math_block end} as usual for doubling. The second translation needs to be -8,7 to get the arrow back to the starting point. 
{teacher end}

The following two examples combine rotation, scaling and translation. You can use multiple matrices (that's the plural of matrix) to match up the target object --- the product of each matrix becomes the input to the next one. Oh, and the arrow is twice as fat, but still the same hight (from base to tip).

{include interactive computer_graphics_arrow_double parameters="&zoom=-10.0 &quiz=0 1 0 4 2 0 0 -2 0 0 1 0 0 0 0 1 &allPrize=5"}

{teacher}
Solution: There are two solutions depending on whether you scale or rotate first. If scaling first, the scaling matrix is {math_block}\begin{bmatrix}  2 & 0 \\   0 & 1 \\   \end{bmatrix}{math_block end}. That makes the arrow twice as fat, but still the same height. The rotation matrix is {math_block}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math_block end} -- that's a 90 degree clockwise rotation. The translation vector is 4, -2.

If you rotate first, the rotation is still {math_block}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math_block end} (90 degrees clockwise) but the scaling is {math_block}\begin{bmatrix}  1 & 0 \\   0 & 2 \\   \end{bmatrix}{math_block end}, since it now needs to be scaled in the y direction. The translation vector is still 4, -2.

This can also be done by using only one matrix (if you combine the rotation and scaling); this could be a challenge to give the faster students. In that case the matrix is {math_block}\begin{bmatrix}  0 & 1 \\   2 & 0 \\   \end{bmatrix}{math_block end}. The translation is still 4,-2.
{teacher end}

{include interactive computer_graphics_arrow_double parameters="&zoom=-6.0 &quiz=0.3499999940395355 -0.3499999940395355 0 -1 0.3499999940395355 0.3499999940395355 0 -2 0 0 1 0 0 0 0 1 &allPrize=5"}

{teacher}
Solution: The solution will depend on the order of scaling and rotating, but a simple solution is {math_block}\begin{bmatrix}  0.7 & -0.7 \\   0.7 & 0.7 \\   \end{bmatrix}{math_block end}  for the first matrix, {math_block}\begin{bmatrix}  0.5 & 0 \\   0 & 0.5 \\   \end{bmatrix}{math_block end} for the second matrix, and -1,-2 for the translation.
{teacher end}

These combined transformations are common, and they might seem like a lot of work because each matrix has to be applied to every point in an object. Our arrows only had 7 points, but complex images can have thousands or even millions of points in them. Fortunately we can combine all the matrix operations in advance to give just one operation to apply to each point.

### Combining transformations