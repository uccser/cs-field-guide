# Computer Graphics

{video url="https://www.youtube.com/embed/5kuoRjgfCls"}

## What's the big picture?

Computer graphics will be familiar from games, films and images, and there is amazing software available to create images, but how does the software work? The role of a computer scientist is not just to *use* graphics systems, but to *create* them, and especially invent new techniques.

The entertainment industry is always trying to develop new graphics software so that they can push the boundaries and create new experiences. We've seen this in the evolution of animated films, from simple 2D films to realistic computer generated movies with detailed 3D images.
The names of dozens of computer scientists now regularly appear in the credits for films that us CGI or animation, and [some have even won Oscars for their innovative software](http://www.oscars.org/news/11-scientific-and-technical-achievements-be-honored-academy-awardsr)!

{comment} Consider showing e.g. animated files Lion King - Shrek - Toy Story - Avatar sequence of improvements. {comment end}

Movie and gaming companies can't always just use existing software to make the next great thing --- they need computer scientists to come up with better graphics techniques to make something that's never been seen before. The creative possibilities are endless!

Computer graphics are used in a wide variety of situations: games and animated movies are common examples, but graphics techniques are also used to visualise large amounts of data (such as all cellphone calls being made in one day or friend connections in a social network), to display and animate graphical user interfaces, to create virtual reality and augmented reality worlds, and much more.

{comment} Talk about visualisation of data - any nice examples?{comment end}

{panel type="jargon-buster" summary="Pixels"}
{glossary-definition term="Pixel" definition="This term is an abbreviation of *picture element*, the name given to the tiny squares that make up a grid that is used to represent images on a computer."}
A digital image on a screen or printer is physically made up of a grid of tiny squares called
{glossary-link term="pixel" reference-text="definition"}pixels{glossary-link end}.
They are usually too small to see easily (otherwise the image would look blocky).
Photographs usually use millions of pixels (a megapixel is a million pixels; for example, a screen that is 1080 pixels across and 720 down would contain 777,600 pixels, or 0.7776 megapixels).

The pixels is fundamental to computer graphics, as a lot of the work of computer graphics programmers is taking some abstract idea (such as objects in a scene), and working out the colour each pixel should be to make the viewer think they are looking at the scene.
A digital camera also does this - but it just senses the colour falling on each of its millions of sensors, and stores those so that the pixels can be displayed when needed.
{panel end}

In this chapter we'll look at some of the basic techniques that are used to create computer graphics. These will give you an idea of the techniques that are used in graphics programming, although it's just the beginning of what's possible.

For this chapter we are using a system called WebGL which can render 3D graphics in your browser. If your browser is up to date everything should be fine. If you have issues, or if the performance is poor, there is [information here about how to get it going](further-information/interactives.html).

## Graphics transformations

A computer graphics image is just the result of a whole lot of mathematical calculations. In fact, every pixel you see in an image has usually had many calculations made to work out what colour it should be, and there are often millions of pixels in a typical image.

Let's start with some simple but common calculations that are needed for in graphics programming.
The following interactive shows a cube with writing on each face.
You can move it around using what's called a *transform*, which simply adjusts where it is placed in space.
Try typing in 3D coordinates into this interactive to find each code.

{comment}{include interactive computer-graphics-box-translation}{comment end}
{interactive name="box-translation" type="whole-page" text="Box Translation interactive"}

You've just applied 3D *translation transforms* to the cube. Translation just means moving it in the three dimensions up and down, forward and back, and sideways.

Now try the following challenge, which requires you to rotate the box to find the codes.

{comment}{include interactive computer-graphics-box-rotation}{comment end}
{interactive name="box-rotation" type="whole-page" text="Box Rotation interactive"}

There are several transformations that are used in computer graphics, but the most common ones are translation (moving the object), rotation (spinning it) and scaling (changing its size).
They come up often in graphics because they are applied not only to objects, but to things like the positions of the camera and lighting sources.

In this section you can apply transformations to various images. We'll start by making the changes manually, one point at a time, but we'll move up to a quick shortcut method that uses a *matrix* to do the work for you. We'll start by looking at how these work in two dimensions - it's a bit easier to think about than three dimensions.

The following interactive shows an arrow, and on the right you can see a list of the points that correspond to its 7 corners. The arrow is on a grid (usually referred to as *cartesian coordinates*), where the centre point is the "zero" point. Points are specified using two numbers, *x* and *y*, usually written as (*x*,*y*). The *x* value is how far the point is to the right of the centre and the *y* value is how far above the centre it is. For example, the first point in the list is the tip at (0,2), which means it's 0 units to the right of the centre (i.e. at the centre), and 2 units above it. Which point does the last pair (2,0) correspond to? What does it mean if a coordinate has a negative *x* value?

{panel type="teacher-note" summary="Solutions to questions"}
(2,0) is the right-most corner of the arrow. A negative *x* value means that it's to the *left* of the centre instead of the right. (A negative *y* value is below the centre).
{panel end}

The first list of coordinates is for the original arrow position, and in the second list, you can type in the transformed points to move the arrow --- the original is shown in green and the moved one is in blue.

{comment}{include interactive computer-graphics-arrow parameters="&quiz=2 0 0 5 0 2 0 4 0 0 2 0 0 0 0 1 &hidetarget=true"}{comment end}
{button link="http://csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-points.html?info=Your%20first%20challenge%20is%20to%20add%202%20to%20all%20the%20%3Cem%3Ex%3C/em%3E%20points,%20and%203%20to%20all%20the%20%3Cem%3Ey%3C/em%3E%20points%20(you%20can%20either%20type%20the%20new%20number%20or%20put%20the%20calculation%20in%20the%20box%20e.g.%20%220.5+2%22.%0AWhat%20effect%20does%20this%20have%20on%20the%20original%20arrow?%20(Be%20careful%20to%20add%20the%20negative%20numbers%20correctly;%20for%20example,%20adding%202%20to%20-0.5%20gives%201.5.)%20What%20happens%20if%20you%20subtract%203%20from%20each%20of%20the%20original%20coordinate%20values?%0A&quiz=2%200%200%205%200%202%200%204%200%200%202%200%200%200%200%201%20&hidetarget=true" text="Click for interactive: changing point locations"}


{panel type="teacher-note" summary="Solution"}
The transform in this interactive *translates* the arrow 2 units to the right and 3 units up. Subtracting three translates the arrow down and to the left.
{panel end}

The above transform is called a *translation* --- it translates the arrow around the grid. This kind of transform is used in graphics to specify where an object should be placed in a scene, but it has many other uses, such as making an animated object move along a path, or specifying the position of the imaginary camera (viewpoint).

The next challenge involves changing the size of the image.

{comment}{include interactive computer-graphics-arrow parameters="&quiz=0.5 0 0 0 0 0.5 0 0 0 0 1 0 0 0 0 1 &hidetarget=true"}{comment end}
{button link="http://csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-points.html?info=In%20this%20next%20interactive,%20try%20replacing%20the%20coordinates%20in%20the%20second%20list%20with%20all%20the%20original%20values%20multiplied%20by%202.%20What%20is%20the%20effect%20of%20this%20transform?%20What%20would%20happen%20if%20you%20multiply%20each%20value%20by%2010?%20How%20about%200.5?%20What%20if%20you%20only%20multiply%20the%20%3Cem%3Ex%3C/em%3E%20values?&quiz=0.5%200%200%200%200%200.5%200%200%200%200%201%200%200%200%200%201%20&hidetarget=true" text="Click for interactive: scaling"}


{panel type="teacher-note" summary="Solution"}
Multiplying by 2 makes the arrow twice as large in each dimension. Multiplying by 10 makes it 10 times as large, which won't fit in the view. Multiplying by 0.5 makes the arrow half the size. Multiplying only the x values makes the arrow wider horizontally only.
{panel end}

This transformation is called *scaling*, and although it can obviously be used to control the size of an object, this can in turn be used to create a visual effect such as making the object appear closer or further away.

In the following interactive, try to get the blue arrow to match up with the red one. It will require a mixture of scaling and translation.

{comment}{include interactive computer-graphics-arrow parameters="&quiz=2 0 0 5 0 2 0 4 0 0 2 0 0 0 0 1"}{comment end}
{button link="http://csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-points.html?info=%20Try%20to%20get%20the%20blue%20arrow%20to%20match%20up%20with%20the%20red%20one.%20It%20will%20require%20a%20mixture%20of%20scaling%20and%20translation.&quiz=2%200%200%205%200%202%200%204%200%200%202%200%200%200%200%201" text="Click for interactive: combining scaling and translation challenge"}

Next, see what happens if you swap the *x* and *y* value for each coordinate.

{comment}{include interactive computer-graphics-arrow parameters="&quiz=0 1 0 0 1 0 0 0 0 0 1 0 0 0 0 1 &hidetarget=true &zoom=-5.0"}{comment end}
{button link="http://csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-points.html?info=Next,%20see%20what%20happens%20if%20you%20swap%20the%20%3Cem%3Ex%3C/em%3E%20and%20%3Cem%3Ey%3C/em%3E%20value%20for%20each%20coordinate.&quiz=0%201%200%200%201%200%200%200%200%200%201%200%200%200%200%201%20&hidetarget=true%20&zoom=-5.0" text="Click for interactive: swapping coordinates"}

This is a simple *rotation* transformation, also useful for positioning objects in a scene,
but also for specifying things like camera angles.

Typing all these coordinates by hand is inefficent.
Luckily there's a much better way of achieving all this.
Read on!

{comment}We won't mention reflection and shearing etc., but this can go in the "whole story" section.{comment end}

### Matrix transformations

{panel type="teacher-note" summary="Extra preparation for using matrix transforms"}

This section introduces the use of matrices to do the transforms. It doesn't assume that they have encountered matrices before, but if students are completely new to matrix algebra and are also weak in algebra in general, the explanation in this chapter might be a little minimal for them, and extra help will be needed. There are good resources around that explain matrices, although they likely provide more detail than needed. The
[Khan academy](https://www.khanacademy.org/math/precalculus/precalc-matrices) have videos and quizzes explaining matrices (we are particularly interested in multiplying a matrix by a vector, which is what is happening when a matrix transform is applied to a point  - the point is the vector).

Other explanations aimed at school students include:
- [Math is Fun - Matrix multiplying](http://www.mathsisfun.com/algebra/matrix-multiplying.html)
- [Math in Sight - Matrix vector multiplication](http://mathinsight.org/matrix_vector_multiplication)
- [Math Planet - Transformation using matrices](http://www.mathplanet.com/education/geometry/transformations/transformation-using-matrices)
- [Wikipedia entry on matrix transformation](https://en.wikipedia.org/wiki/Transformation_matrix) - which likely has too much extra detail for students in it
{panel end}  


There's a much easier way to specify transformations than having to change each coordinate separately.
Transformations are usually done in graphics using *matrix* arithmetic, which is a shorthand notation for doing lots of simple arithmetic operations in one go. The matrix for the two-dimensional transformations we've been doing above has four values in it. For the 2 dimensional scaling transform where we made each *x* and *y* value twice as large, the matrix is written as:

{math-block}
\begin{bmatrix}
2 & 0 \\  
0 & 2 \\  
\end{bmatrix}
{math-block end}

You can try it out in the following interactive:

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-matrix.html?info=You%20can%20type%20the%20scaling%20matrix%20into%20this%20interactive%20to%20see%20what%20it%20does%20(replace%20the%20ones%20with%20twos).%20The%20top%20left-hand%20value%20just%20means%20multiply%20all%20the%20%3Cem%3Ex%3C/em%3E%20values%20by%202,%20and%20the%20bottom%20right%20one%20means%20multiply%20all%20the%20%3Cem%3Ey%3C/em%3E%20values%20by%202.%20For%20the%20meantime,%20leave%20the%20translate%20values%20as%200.&quiz=2%200%200%200%200%202%200%200%200%200%202%200%200%200%200%201" text="Click for interactive: 2D scaling"}

At this stage you may want to have the interactive open in a separate window so that you can read the text below and work on the interactive at the same time.

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

{panel type="teacher-note" summary="Explanation"}

These should create an arrow 3 times as big and 0.2 (i.e. scaled down to one fifth of the size) times as big respectively.
{panel end}

The "add translate" values in the interactive are added to each *x* and *y* coordinate; experiment with them to see what they do. Now try to find suitable values for these and the matrix to match the arrow up with the red one.

{panel type="teacher-note" summary="Explanation"}

This needs the matrix {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} and the x,y values 5 and 4 (this doubles the size of the arrow and moves it 5 across and 4 up).
{panel end}

What happens if you use the following matrix?

{math-block}
\begin{bmatrix}
2 & 0 \\  
0 & 4 \\  
\end{bmatrix}
{math-block end}

{panel type="teacher-note" summary="Explanation"}

The x values are doubled but the y values are multiplied by 4, so it is stretched twice as much vertically as horizontally.
{panel end}

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
This is called a *rotation*.

In general, to rotate an image by a given angle you need to use the sine (abbreviated sin) and cosine (abbreviated cos) functions from trigonometry. To rotate the image anticlockwise by {math}\theta{math end} degrees, you'll need the following values in the matrix, which rely on trig functions:

{math-block}
\begin{bmatrix}
\cos(\theta) & -\sin(\theta) \\  
\sin(\theta) & \cos(\theta) \\  
\end{bmatrix}
{math-block end}

{panel type="teacher-note" summary="Explanation"}

If your students aren't familiar with sin and cos, it may be worth going over them separately, including the idea that the angle is usually measured in degrees, and the sin and cos functions will produce a number between 0  and 1.
The [Khan Academy](https://www.khanacademy.org/math/trigonometry/trigonometry-right-triangles) has more information about sine and cosine functions, explained in terms of triangles.
{panel end}

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-matrix.html?info=You%20can%20type%20calculations%20directly%20into%20the%20interactive%20-%20if%20you%20type%20cos(60)%20it%20will%20work%20out%20the%20cosine%20of%2060%20degrees%20for%20you,%20which%20happens%20to%20be%20exactly%200.5.%20Or%20you%20can%20just%20type%20in%20the%20sin%20and%20cosine%20values;%20the%200.7%20numbers%20in%20the%20rotation%20matrix%20are%20just%20the%20values%20for%20sin(45)%20and%20so%20on%20(or%20at%20least,%20they%20approximately%20the%20value;%20it%27s%20actually%200.70710678...,%20which%20happens%20to%20be%20the%20square%20root%20of%200.5,%20but%200.7%20is%20close%20enough%20for%20our%20example).&quiz=0.7%200.7%200%205%20-0.7%200.7%200%204%200%200%201%200%200%200%200%201" text="Click for interactive: matrix rotation"}

What is the matrix for rotation by 360 degrees?

{panel type="teacher-note" summary="Explanation"}
If you put in 360 for {math}\Theta{math end} in the rotation formula, you get the matrix {math}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math end},
because
{math}\cos(360)=1{math end} and
{math}\sin(360)=1{math end}.
This is also known as the 'identity' matrix because it makes no change to the original image. You get this matrix if you rotate by a multiple of 360 (including 0 degrees of course).
{panel end}

The general matrix for *scaling* is a bit simpler than the one for rotation; if you want to scale by a factor of *s*, then you just use the matrix:

{math-block}
\begin{bmatrix}
s & 0 \\  
0 & s \\  
\end{bmatrix}
{math-block end}

A translation can't be specified by this kind of matrix, so in the interactives we've provided an extra place to specify an *x* and *y* value to translate the input.
Try it out in the following interactive.

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-matrix.html?info=Try%20translating%20the%20original%20arrow%20so%20that%20it%20matches%20up%20with%20the%20red%20arrow.&quiz=1%200%200%205%200%201%200%204%200%200%201%200%200%200%200%201" text="Click for interactive: translation challenge"}

{panel type="teacher-note" summary="Solution"}
Translate x is 5 and y is 4 (5 to the right and 4 up). The matrix should be {math}\begin{bmatrix}  1 & 0 \\   0 & 1 \\   \end{bmatrix}{math end}
{panel end}

The next interactive needs you to combine translation with scaling.

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-matrix.html?info=Now%20try%20to%20scale%20the%20original%20arrow%20in%20the%20following,%20and%20translate%20it%20to%20match%20the%20red%20arrow.&quiz=2%200%200%204%200%202%200%203%200%200%202%200%200%200%200%201" text="Click for interactive: scaling and translation challenge"}

{panel type="teacher-note" summary="Solution"}
The matrix should be {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} (doubles the size). Translate x is 4 and y is 3.
{panel end}

The order in which translation and scaling happen makes a difference.
Try the following challenge!

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-matrix-reversed.html?info=The%20following%20interactive%20has%20the%20translation%20and%20scaling%20the%20other%20way%20around.%20Use%20this%20one%20to%20transform%20the%20blue%20arrow%20to%20the%20red%20arrow.%20The%20order%20in%20which%20the%20operations%20happen%20makes%20a%20difference!%20&quiz=2%200%200%205%200%202%200%204%200%200%202%200%200%200%200%201" text="Click for interactive: translation before scaling"}

{panel type="teacher-note" summary="Solution"}
The matrix should be {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} (still needed to double the size). However, the translation will be doubled as well since it comes before the matrix, therefore translate x is 2.5 and y is 2 (half of the distance needed).
{panel end}

In the above, you'll have noticed that scaling is affected by how far the object is from the centre.
If you want to scale around a fixed point in the object (so it expands where it is), then an easy way is to translate it back to the centre (also called the *origin*), scale it, and then translate it back to where it was.  The following interactive allows you to move the arrow, then scale it, and move it back.

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-transmatrix.html?info=The%20tip%20is%20at%20(-8,7),%20so%20you%20should%20translate%20it%20to%20(0,0),%20scale%20by%202,%20and%20translate%20back%20to%20(-8,%207).&zoom=-15.0%20&quiz=2%200%200%20-8%200%202%200%203%200%200%202%200%200%200%200%201%20&start=1%200%200%20-8%200%201%200%205%200%200%201%200%200%200%200%201%20&allPrize=5" text="Click for interactive: using translation to simplify scaling"}

{panel type="teacher-note" summary="Solution"}
The first translation is x=8 and y=-7. Now the arrow tip is at the origin, and the doubling will keep the tip where it is. The matrix should be {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} as usual for doubling. The second translation needs to be -8,7 to get the arrow back to the starting point.
{panel end}

The same problem comes up with rotation.
The following interactive allows you to use a translation first to make the scaling more predicable.

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-transmatrix.html?info=Try%20rotating%20this%20image%20by%2045%20degrees.You%27ll%20need%20to%20translate%20the%20tip%20to%20the%20origin,%20apply%20the%20rotation,%20and%20translate%20it%20back.&zoom=-10.0%20&quiz=0.699999988079071%200.699999988079071%200%20-4.400000095367432%20-0.699999988079071%200.699999988079071%200%204.599999904632568%200%200%201%200%200%200%200%201%20&start=1%200%200%20-3%200%201%200%204%200%200%201%200%200%200%200%201%20&allPrize=5" text="Click for interactive: using translation to simpilfy rotation"}

{panel type="teacher-note" summary="Solution"}

The first translation is x=8 and y=-7. Now the arrow tip is at the origin, and the doubling will keep the tip where it is. The matrix should be {math}\begin{bmatrix}  2 & 0 \\   0 & 2 \\   \end{bmatrix}{math end} as usual for doubling. The second translation needs to be -8,7 to get the arrow back to the starting point.
{panel end}

The following two examples combine rotation, scaling and translation. You can use multiple matrices (that's the plural of matrix) to match up the target object --- the product of each matrix becomes the input to the next one. Oh, and the arrow is twice as fat, but still the same height (from base to tip).

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-doublematrix.html?info=Try%20matching%20the%20blue%20arrow%20to%20the%20red%20one%20using%20two%20matrices%20(one%20to%20scale%20and%20one%20to%20rotate),%20and%20adding%20a%20vector.&zoom=-10.0%20&quiz=0%201%200%204%202%200%200%20-2%200%200%201%200%200%200%200%201%20&allPrize=5" text="Click for interactive: combining translation, scaling and rotation"}

{panel type="teacher-note" summary="Solution"}

There are two solutions depending on whether you scale or rotate first. If scaling first, the scaling matrix is {math}\begin{bmatrix}  2 & 0 \\   0 & 1 \\   \end{bmatrix}{math end}. That makes the arrow twice as fat, but still the same height. The rotation matrix is {math}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math end} -- that's a 90 degree clockwise rotation. The translation vector is 4, -2.

If you rotate first, the rotation is still {math}\begin{bmatrix}  0 & 1 \\   1 & 0 \\   \end{bmatrix}{math end} (90 degrees clockwise) but the scaling is {math}\begin{bmatrix}  1 & 0 \\   0 & 2 \\   \end{bmatrix}{math end}, since it now needs to be scaled in the y direction. The translation vector is still 4, -2.

This can also be done by using only one matrix (if you combine the rotation and scaling); this could be a challenge to give the faster students. In that case the matrix is {math}\begin{bmatrix}  0 & 1 \\   2 & 0 \\   \end{bmatrix}{math end}. The translation is still 4,-2.
{panel end}

Here's another challenge combining all three transformations:

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-doublematrix.html?info=You%20will%20need%20to%20use%20all%20three%20operations%20to%20do%20this%20next%20one.&zoom=-6.0%20&quiz=0.3499999940395355%20-0.3499999940395355%200%20-1%200.3499999940395355%200.3499999940395355%200%20-2%200%200%201%200%200%200%200%201%20&allPrize=5" text="Click for interactive: multiple transformation challenge"}

{panel type="teacher-note" summary="Solution"}

The solution will depend on the order of scaling and rotating, but a simple solution is {math}\begin{bmatrix}  0.7 & -0.7 \\   0.7 & 0.7 \\   \end{bmatrix}{math end}  for the first matrix, {math}\begin{bmatrix}  0.5 & 0 \\   0 & 0.5 \\   \end{bmatrix}{math end} for the second matrix, and -1,-2 for the translation.
{panel end}

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

It's a bit complicated, but this calculation is only done once to work out the combined transformation, and it gives you a single matrix that will provide two transforms in one operation.

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

You can put the matrix we just calculated into the following interactive to see if it does indeed scale by 2 and rotate 45 degrees.

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-singlematrix.html?info=Try%20putting%20in%20the%20final%20matrix%20here%20and%20see%20if%20it%20does%20scale%20by%202%20and%20rotate%20by%2045%20degrees.&zoom=-10.0%20&quiz=1.4%201.4%200%200%20-1.4%201.4%200%200%200%200%201%200%200%200%200%201%20&allPrize=5" text="Click for interactive: check a single matrix"}

Now try making up your own combination of transforms to see if they give the result you expect.
In this interactive you can drag the matrices to change their order.

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-arrow/CG-arrow-multiply2matrix.html?info=Now%20try%20multiplying%20two%20other%20transform%20matrices%20that%20you%20make%20up%20yourself,%20and%20see%20if%20they%20produce%20the%20expected%20result.&zoom=-10.0%20&quiz=1.4%201.4%200%200%20-1.4%201.4%200%200%200%200%201%200%200%200%200%201%20&allPrize=5" text="Click for interactive: multiple matrices"}

In computer graphics systems there can be many transformations combined, and this is done by multiplying them all together (two at a time) to produce one matrix that does all the transforms in one go.
That transform might then be applied to millions of points, so the time taken to do the matrix multiplication at the start will pay off well.

The project below gives the chance to explore combining matrices, and has an interactive that will calculate the multiplied matrices for you.


### 3D transforms

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

You can try out this 3D matrix in the following interactive.

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-mini-editor/main%20(cutdown).html?info=%0AIn%20this%20interactive,%20try%20changing%20the%20scaling%20on%20the%20image%20(it%20starts%20with%20a%20scaling%20factor%20of%2010%20in%20all%20three%20dimensions)." text="Click for interactive: 3D transform matrix"}

The above image mesh has 3644 points in it, and your matrix was applied to each one of them to work out the new image.

The next interactive allows you to do translation (using a vector).
Use it to get used to translating in the three dimensions (don't worry about using matrices this time.)

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-mini-editor/main%20(cutdown).html?info=%0ATranslation%20requires%203%20values,%20which%20are%20added%20to%20the%20*x*,%20*y*%20and%20*z*%20coordinates%20of%20each%20point%20in%20an%20object.%3Cp%3EIn%20the%20following%20interactive,%20try%20moving%20the%20teapot%20left%20and%20right%20(%20%3Cem%3Ex%3C/em%3E%20),%20up%20and%20down%20(%20%3Cem%3Ey%3C/em%3E%20),%20and%20in%20and%20out%20of%20the%20screen%20(%20%3Cem%3Ez%3C/em%3E%20)%20by%20adding%20a%20%E2%80%9Cvector%E2%80%9D%20to%20the%20operations.%20Then%20try%20combining%20all%20three.%3C/p%3E%0A" text="Click for interactive: 3D translation"}

Rotation is trickier because you can now rotate in different directions.
In 2D rotations were around the centre (origin) of the grid, but in 3D rotations are around a line (either the horizontal x-axis, the vertical y-axis, or the z-axis, which goes into the screen!)

The 2D rotation we used earlier can be applied to 3 dimensions using this matrix:

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

{comment}

.. xTCB put in a sidebox on deriving the rotation matrices (one day) (maybe in the 2d part)

{comment end}

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-mini-editor/main%20(cutdown).html?info=%0AYou%20can%20experiment%20with%20moving%20the%20teapot%20around%20in%20space,%20changing%20its%20size,%20and%20angle.%3Cdl%20class=%22docutils%22%3E%0A%3Cdt%3EThink%20about%20the%20order%20in%20which%20you%20need%20to%20combine%20the%20transforms%20to%20get%20a%20particular%20image%20that%20you%20want.%3C/dt%3E%0A%3Cdd%3EFor%20example,%20if%20you%20translate%20an%20image%20and%20then%20scale%20it,%20you%E2%80%99ll%20get%20a%20different%20effect%20to%20scaling%20it%20then%20translating%20it.%0AIf%20you%20want%20to%20rotate%20or%20scale%20around%20a%20particular%20point,%20you%20can%20do%20this%20in%20three%20steps%20(as%20with%20the%202D%20case%20above):%20(1)%20translate%20the%20object%20so%20that%20the%20point%20you%20want%20to%20scale%20or%20rotate%20around%20is%20the%20origin%20(where%20the%20x,%20y%20and%20z%20axes%20meet),%20(2)%20do%20the%20scaling/rotation,%20(3)%20translate%20the%20object%20back%20to%20where%20it%20was.%20If%20you%20just%20scale%20an%20object%20where%20it%20is,%20its%20distance%20from%20the%20origin%20will%20also%20be%20scaled%20up.%3C/dd%3E%0A%3C/dl%3E%0A" text="Click for interactive: 3D with multiple matrices and vectors"}

In the above examples, when you have several matrices being applied to every point in the image, a lot of time can be saved by converting the series of matrices and transforms to just one formula that does all of the transforms in one go. The following interactive can do those calculations for you.

For example, in the following interactive, type in the matrix for doubling the size of an object (put the number 2 instead of 1 on the main diagonal values), then add another matrix that triples the size of the image (3 on the main diagonal).
The interactive shows a matrix on the right that combines the two --- does it look right?

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-matrix-simplifier/CG-matrix-simplifier.html?info=Multiple%20transforms" text="Click for interactive: matrix simplifier"}

{panel type="teacher-note" summary="Explanation"}

The combined result of scaling by 2 and then 3 should have 6 down the main diagonal (i.e. 6 times larger). The interactive gives a full derivation of the calculations being done on each x,y,z coordinate of each point in an image, but it really just has three inputs (x,y,z), which give the original position of a point, and three outputs (x',y',z') which give the transformed position of the point.

{panel end}
{comment}
.. xTCB One teacher noted that students where need to know that the it requires transform matrix and one translation; not sure if this is now applicable
{comment end}

The interactive also allows you to combine in translations (just three numbers, for x, y and z).
Try combining a scaling followed by a translation. What if you add a rotation --- does the order matter?

{panel type="curiosity" summary="Matrix multiplication in 3D"}
In case you're wondering, the interactive is using the following formula to combine two matrices (you don't have to understand this to use it).
It is called matrix multiplication, and while it might be a bit tricky, it's very useful in computer graphics because it reduces all the transformations you need to just one matrix, which is then applied to every point being transformed.
This is way better than having to run all the matrices of every point.

{comment}
.. xTCB give an example for the following one day?
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
{math-block end}
{panel end}

{panel type="project" summary="3D transforms"}
For this project, you will demonstrate what you've learned in the section above by explaining a 3D transformation of a few objects. You should take screenshots of each step to illustrate the process for your report.

The following scene-creation interactive allows you to choose objects (and their colours etc.),
and apply one transformation to them.
To position them more interestingly, you will need to come up with multiple transformations
(e.g. scale, then rotate, then translate),
and use the "simplifier" interactive to combine all the matrices into one operation.

The scene-creation interactive can be run from here:

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-mini-editor/main.html?info=Multiple%20transforms" text="Click for interactive: scene creation"}

To generate combined transformations, you can use the following transform simplifier interactive:

{button link="http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/CG/CG-matrix-simplifier/CG-matrix-simplifier.html?info=Multiple%20transforms" text="Click for interactive: matrix simplifier"}

Because you can't save your work in the interactives, keep notes and screen shots as you go along. These will be useful for your report, and also can be used if you need to start over again.

Introduce your project with a examples of 3D images, and how they are used (perhaps from movies or scenes that other people have created). Describe any innovations in the particular image (e.g. computer generated movies usually push the boundaries of what was previously possible, so discuss what boundaries were moved by a particular movie, and who wrote the programs to achieve the new effects).
One way to confirm that a movie is innovative in this area is if it has won an award for the graphics software.

To show the basics of computer graphics,
try putting a few objects in a particular arrangement (e.g. with the teapot sitting beside some cups),
and explain the transforms needed to achieve this, showing the matrices needed.

Give simple examples of translation, scaling *and* rotation using your scene.
You should include multiple transforms applied to one object, and show how they can be used to position an object.

Show how the matrices for a series of transforms can be multiplied together to get one matrix that applies all the transforms at once.

Discuss how the single matrix derived from all the others is more efficient, using your scene as an example to explain this.
{panel end}
{comment}
End of 3D transform project
{comment end}

{panel type="project" summary="WebGL and OpenGL"}
If you're confident with programming and want to explore graphics at a more practical level,
you could do a similar project to the previous one using a graphics programming system such as
[WebGL](https://en.wikipedia.org/wiki/WebGL) (which is the system used in the demonstrations above),
or a widely used graphics system such as
[OpenGL](https://en.wikipedia.org/wiki/OpenGL).
There is an interactive tutorial on OpenGL called
[JPOT](http://www.cs.uwm.edu/%7Egrafix2/).

Note that these project can be very time consuming because these are powerful systems,
and there is quite a bit of detail to get right even for a simple operation.
{panel end}
{comment}
End of WebGL project
{comment end}


{comment}
.. ## Colour models

.. this section is yet to be written

.. RGB, CMY, HSV, ... tricolour stimulus

.. For example, see:
.. http://www.cosc.canterbury.ac.nz/mukundan/cogr/applcogr.html colours RGB, HSV

{comment end}

## Drawing lines and circles

A fundamental operation is computer graphics is to draw lines and circles.
For example, these are used as the components of scalable fonts and vector graphics;
the letter "g" is specified as a series of lines and curves,
so that when you zoom in on it the computer can redraw it at whatever resolution is needed.
If the system only stored the pixels for the letter shape, then zooming in would result in a low quality image.

{comment}

 .. xTCB to add sometime, Jargonbuster: pixel (somewhere in the chapter) - also mention pel and bitmap, and origins of the terms. see www.foveon.com/files/ABriefHistoryofPixel2.pdf

{comment end}

{image filename="vector-letter-with-outline.png" caption="The points used to create the letter 'g' in Google's logo"}

In 3D graphics shapes are often stored using lines and curves that mark out the edges of tiny flat surfaces (usually triangles), each of which is so small that you can't see them unless you zoom right in.

{image filename="dolphin-triangle-mesh.png"}
{comment}
Public domain image: https://en.wikipedia.org/wiki/Triangle_mesh#/media/File:Dolphin_triangle_mesh.png
{comment end}

The lines and circles that specify an object are usually given using numbers (for example, a line between a given starting and finishing position or a circle with a given centre and radius).
From this a graphics program must calculate which pixels on the screen should be coloured in to represent the line or circle, or it may just need to work out where the line is without drawing it.

For example, here's a grid of pixels with 5 lines shown magnified.
The vertical line would have been specified as going from pixel (2,9) to (2,16) --- that is, starting 2 across and 9 up, and finishing 2 across and 16 up.
Of course, this is only a small part of a screen, as normally they are more like 1000 by 1000 pixels or more; even a smartphone can be hundreds of pixels high and wide.

{image filename="grid-20x20-example.png" alt="An example of 5 lines drawn on a grid of pixels"}

These are things that are easy to do with pencil and paper using a ruler and compass, but on a computer the calculations need to be done for every pixel, and if you use the wrong method then it will take too long and the image will be displayed slowly or a live animation will appear jerky.
In this section we will look into some very simple but clever algorithms that enable a computer to do these calculations very quickly.

### Line drawing

{panel type="teacher-note" summary="Handouts for students to work on"}
The students are asked to draw several lines in this section on grids;
you could print a supply of these for them, or use graph paper.
{panel end}

To draw a line, a computer must work out which pixels need to be filled so that the line looks straight.
You can try this by colouring in squares on a grid, such as the one below (they are many times bigger than the pixels on a normal printer or screen).
We'll identify the pixels on the grid using two values, (*x*,*y*), where *x* is the distance across from the left, and *y* is the distance up from the bottom.
The bottom left pixel below is (0,0), and the top right one is (19,19).

On the following grid, try to draw these straight lines by filling in pixels in the grid:

- from  (2, 17) to (10, 17)
- from  (18, 2) to (18, 14)
- from  (1, 5)  to (8, 12)

{image filename="grid-20x20-blank.png" alt="Grid for drawing line from A to B"}

{comment}

.. xHTML5 The grids in this section could be interactive, click on each pixel, and get it to check if the line is correct

{comment end}

{panel type="teacher-note" summary="Solution"}

The above three lines are easy to draw as they are horizontal, vertical and diagonal.

{image filename="grid-20x20-answer-1.png" alt="Answer for previous question on grid"}

{panel end}

Drawing a horizontal, vertical or diagonal line like the ones above is easy; it's the ones at different angles that require some calculation.

Without using a ruler, can you draw a straight line from A to B on the following grid by colouring in pixels?

{image filename="grid-20x20-diagonal-question.png" alt="Grid for drawing line from A to B"}

Once you have finished drawing your line, try checking it with a ruler. Place the ruler so that it goes from the centre of A to the centre of B. Does it cross all of the pixels that you have coloured?

### Using a formula to draw a line

{glossary-definition term="Slope" definition="This is a way of expressing the angle or gradient of a line. The slope is simply how far up the line goes for every unit we move to the right. For example, if we have a line with a slope of 2, then after moving 3 units to the right, it will have gone up 6 units. A line with a slope of 0 is horizontal.
Normally the slope of a line is represented using the symbol {math}m{math end}."}
The mathematical formula for a line is {math}y = mx + c{math end}.
This gives you the *y* value for each *x* value across the screen,
and you get to specify two things: the
{glossary-link term="slope" reference-text="computer graphics"}slope{glossary-link end} of the line,
which is {math}m{math end},
and where the line crosses the *y* axis, which is {math}c{math end}.
In other words, when you are *x* pixels across the screen with your line, the pixel to colour in would be ({math}x{math end}, {math}mx + c{math end}).

For example, choosing {math}m=2{math end} and {math}c=3{math end} means that the line would go through the points (0,3), (1,5), (2,7), (3,9) and so on.
This line goes up 2 pixels for every one across {math}m=2{math end}, and crosses the y axis 3 pixels up ({math}c=3{math end}).

You should experiment with drawing graphs for various values of {math}m{math end} and {math}c{math end} (for example, start with {math}c=0{math end}, and try these three lines: {math}m=1{math end}, {math}m=0.5{math end} and{math}m=0{math end}) by putting in the values.
What angle are these lines at?

{panel type="teacher-note" summary="Solution"}
A slope of 0 is a horizontal line, using {math}m=1{math end} will be at 45 degrees, because you go up 1 pixel for each one that you go across.
A slope of a half ({math}m=0.5{math end}) is just under 27 degrees.
There's a [demonstration here](http://www.mathopenref.com/coordslope.html) of slopes, which has an option for showing the angle (which might be more familiar to students.)
{panel end}

The {math}mx + c{math end} formula can be used to work out which pixels should be coloured in for a line that goes between {math}(x_1, y_1){math end} and {math}(x_2, y_2){math end}.
What are {math}(x_1, y_1){math end} and {math}(x_2, y_2){math end} for the points A and B on the grid below?

{panel type="teacher-note" summary="Solution"}
The calculations for a line from A to B above are as follows.
The two points are A = (3,4) and B = (16,9). This means that {math}x_1 = 3, y_1 = 4, x_2=16{math end} and {math}y_2 = 9{math end}.
{panel end}

See if you can work out the {math}m{math end} and {math}b{math end} values for a line from A to B, or you can calculate them using the following formulas:

{math-block}

m = \frac{(y_2 - y_1)}{(x_2 - x_1)}\\
b = \frac{(y_1x_2 - y_2x_1)}{(x_2-x_1)}

{math-block end}

{panel type="teacher-note" summary="Solution"}
For the formula for a line this results in:

\\[
m = \frac{(9 - 4)}{(16 - 3)}  = 5/13 = 0.384615
b = \frac{(4 \times 16 - 9 \times 3)}{(16-3)} = 37/13 = 2.846154
\\]


So we can use the formula {math}y = 0.384615x + 2.846154{math end}.

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

Now draw the same line as in the previous section (between A and B) using the formula {math}y = mx + c{math end} to calculate {math}y{math end} for each value of {math}x{math end} from {math}x_1{math end} to {math}x_2{math end} (you will need to round {math}y{math end} to the nearest integer to work out which pixel to colour in).
If the formulas have been applied correctly, the {math}y{math end} value should range from  {math}y_1{math end} to {math}y_2{math end}.

{image filename="grid-20x20-diagonal-question.png" alt="Grid for drawing line from A to B"}

{panel type="teacher-note" summary="Solution"}

The following image shows which pixels would be coloured in (rounding the coordinates above to the nearest integer).
{image filename="grid-20x20-diagonal-answer.png" alt="Grid for drawing line from A to B"}

{panel end}

Once you have completed the line, check it with a ruler. How does it compare to your first attempt?

Now  consider the number of calculations that are needed to work out each point.
It won't seem like many, but remember that a computer might be calculating hundreds of points on thousands of lines in a complicated image.
Although this formula works fine, it's too slow to generate the complex graphics needed for good animations and games.
In the next section we will explore a method that greatly speeds this up.

{panel type="teacher-note" summary="Solution"}
Each point requires a multiplication and an addition, and also needs to round the numbers. Multiplications are relatively slow, and one is required for every pixel in the output (there could be thousands or even millions of pixels to calculate, so can be very significant!) Even worse, the numbers are floating point, which usually have slower arithmetic than integers.
{panel end}

### Bresenham's Line Algorithm

A faster way for a computer to calculate which pixels to colour in is to use Bresenham's Line Algorithm. It follows these simple rules. First, calculate these three values:

{math-block}
A = 2 \times (y_2 - y_1)
\\
B = A - 2 \times (x_2 - x_1)
\\
P = A - (x_2 - x_1)
{math-block end}

To draw the line, fill the starting pixel, and then for every position along the *x* axis:

- if {math}P{math end} is less than 0, draw the new pixel on the same line as the last pixel, and add {math}A{math end} to {math}P{math end}.
- if {math}P{math end} was 0 or greater, draw the new pixel one line higher than the last pixel, and add {math}B{math end} to {math}P{math end}.
- repeat this decision until we reach the end of the line.

Without using a ruler, use Bresenham's Line Algorithm to draw a straight line from A to B:

{image filename="grid-20x20-diagonal-question.png" alt="Grid for drawing line from A to B"}

Once you have completed the line, check it with a ruler. How does it compare to the previous attempts?

{panel type="teacher-note" summary="Solution"}
This table shows the values that would be calculated using Bresenham's method for the above example:

| Calculation | Pixel to colour in |
|-------------|--------------------|
| {math}A = 10,  B = -16{math end} | Draw the starting pixel |
| {math}P_0 = -3{math end} | Next pixel (to the right) is on the same row as the starting pixel. |
| {math}P_1 = 7{math end} | Next pixel is on the row above the previous pixel. |
| {math}P_2 = -9{math end} | Next pixel is on the same row as the previous pixel. |
| {math}P_3 = 1{math end} | Next pixel is on the row above the previous pixel. |
| {math}P_4 = -15{math end} | Next pixel is on the same row as the previous pixel. |
| {math}P_5 = -5{math end} | Next pixel is on the same row as the previous pixel. |
| {math}P_6 = 5{math end} | Next pixel is on the row above the previous pixel. |
| {math}P_7 = -11{math end} | Next pixel is on the same row as the previous pixel. |
| {math}P_8 = -1{math end} | Next pixel is on the same row as the previous pixel. |
| {math}P_9 = 9{math end} | Next pixel is on the row above the previous pixel. |
| {math}P_{10} = -7{math end} | Next pixel is on the same row as the previous pixel. |
| {math}P_{11} = 3{math end} | Next pixel is on the row above the previous pixel. |
| {math}P_{12} = -13{math end} | Next pixel is on the same row as the previous pixel. |

{panel end}

### Lines at other angles

So far the version of Bresenham's line drawing algorithm that you have used only works for lines that have a gradient (slope) between 0 and 1 (that is, from horizontal to 45 degrees). To make this algorithm more general, so that it can be used to draw any line, some additional rules are needed:

- If a line is sloping downward instead of sloping upward, then when P is 0 or greater, draw the next column's pixel one row *below* the previous pixel, instead of above it.
- If the change in {math}y{math end} value is greater than the change in {math}x{math end} value (which means that the slope is more than 1), then the calculations for A, B, and the initial value for P will need to be changed. When calculating A, B, and the initial P, use X where you previously would have used Y, and vice versa. When drawing pixels, instead of going across every column in the X axis, go through every row in the Y axis, drawing one pixel per row.

{image filename="grid-20x20-blank.png" alt="Grid for drawing line"}

In the grid above, choose two points of your own that are unique to you.
Don't choose points that will give horizontal, vertical or diagonal lines!

Now use Bresenham's algorithm to draw the line.
Check that it gives the same points as you would have chosen using a ruler, or using the formula {math}y = mx+b{math end}.
How many arithmetic calculations (multiplications and additions) were needed for Bresenham's algorithm?
How many would have been needed if you used the {math}y = mx+b{math end} formula?
Which is faster (bear in mind that adding is a lot faster than multiplying for most computers).

{panel type="teacher-note" summary="Speed of Bresenham's method"}
This method only has to compare an integer with 0 and do one addition for each pixel, which is a lot faster than the calculations in the previous version.
{panel end}

You could write a program or design a spreadsheet to do these calculations for you --- that's what graphics programmers have to do.

### Circles

As well as straight lines, another common shape that computers often need to draw are circles.
An algorithm similar to Bresenham's line drawing algorithm, called the Midpoint Circle Algorithm, has been developed for drawing a circle efficiently.

A circle is defined by a centre point, and a radius. Points on a circle are all the radius distance from the centre of the circle.

{image filename="grid-20x20-circle-question.png" alt="Grid for drawing a circle"}

Try to draw a circle by hand by filling in pixels (without using a ruler or compass). Note how difficult it is to make the circle look round.

It is possible to draw the circle using a formula based on Pythagoras' theorem, but it requires calculating a square root for each pixel, which is very slow.
The following algorithm is much faster, and only involves simple arithmetic so it runs quickly on a computer.

### Bresenham's Midpoint Circle Algorithm

{comment}

.. xTCB could mention later that Bresenham didn't invent it, but idea comes from his line algorithm and is often named after him

{comment end}

Here are the rules for the Midpoint Circle Algorithm for a circle around ({math}c_{x}{math end}, {math}c_{y}{math end}) with a radius of {math}R{math end}:

{math-block}

E = -R\\
X = R\\
Y = 0

{math-block end}

Repeat the following rules in order until {math}Y{math end} becomes greater than {math}X{math end}:

- Fill the pixel at coordinate ({math}c_{x} + X{math end}, {math}c_{y} + Y{math end})
- Increase {math}E{math end} by {math}2 \times Y + 1{math end}
- Increase {math}Y{math end} by 1
- If {math}E{math end} is greater than or equal to 0,  subtract {math}2 \times X - 1{math end} from {math}E{math end}, and then subtract 1 from {math}X{math end}.

Follow the rules to draw a circle on the grid, using ({math}c_{x}{math end}, {math}c_{y}{math end})  as the centre of the circle, and {math}R{math end} the radius.
Notice that it will only draw the start of the circle and then it stops because {math}Y{math end} is greater than {math}X{math end}!

{image filename="grid-20x20-circle-question.png" alt="Grid for drawing a circle"}

{panel type="teacher-note" summary="Solution"}
In the following diagram, the black pixels below represent the initial octant of the circle drawn by the algorithm above, the darker gray pixels represent reflection along the {math}X{math end} and {math}Y{math end} axis (details are given below), and the lighter gray pixels represent the reflection along a diagonal (see also below).

{image filename="grid-20x20-circle-answer.png" alt="Solution for drawing a circle"}

The values in the calculation for the above example are:

| Calculation | Pixel to colour in |
|-------------|--------------------|
| {math}E_0 = -7, X_0 = 7, Y_0 = 0{math end} | Plot pixel (16, 9) |
| {math}E_1 = -6, Y_1 = 1{math end} | Plot pixel (16, 10) |
| {math}E_2 = -3, Y_2 = 2{math end} | Plot pixel (16, 11) |
| {math}E_3 = 2, Y_3 = 3{math end} | -  |
| {math}E_4 = -11, X_4 = 6{math end} | Plot pixel (15, 12) |
| {math}E_5 = -4, Y_5 = 4{math end} | Plot pixel (15, 13) |
| {math}E_6 = 5, Y_6 = 5{math end} | - |
| {math}E_7 = -6, X_7 = 5{math end} | Plot pixel (14, 14) |
| {math}E_8 = 5, Y_8 = 6{math end} | *y* is greater than *x*, so we can now reflect our octant |

{panel end}

When {math}Y{math end} becomes greater than {math}X{math end}, one eighth (an octant) of the circle is drawn.
The remainder of the circle can be drawn by reflecting the octant that you already have (you can think of this as repeating the pattern of steps you just did in reverse).
You should reflect pixels along the X and Y axis, so that the line of reflection crosses the middle of the centre pixel of the circle.
Half of the circle is now drawn, the left and the right half.
To add the remainder of the circle, another line of reflection must be used.
Can you work out which line of reflection is needed to complete the circle?

{panel type="jargon-buster" summary="Quadrants and octants"}
A quadrant is a quarter of an area; the four quadrants that cover the whole area are marked off by a vertical and horizontal line that cross. An *octant* is one eighth of an area, and the 8 octants are marked off by 4 lines that intersect at one point (vertical, horizontal, and two diagonal lines).
{panel end}

To complete the circle, you need to reflect along the diagonal.
The line of reflection should have a slope of 1 or -1, and should cross through the middle of the centre pixel of the circle.

While using a line of reflection on the octant is easier for a human to understand, a computer can draw all of the reflected points at the same time it draws a point in the first octant because when it is drawing pixel with an offset of (x,y) from the centre of the circle, it can also draw the pixels with offsets (x,-y), (-x,y), (-x,-y), (y,x), (y,-x), (-y,x) and (-y,-x), which give all eight reflections of the original point!

By the way, this kind of algorithm can be adapted to draw ellipses, but it has to draw a whole quadrant because you don't have octant symmetry in an ellipse.

### Practical applications

Computers need to draw lines, circles and ellipses for a wide variety of tasks, from game graphics to lines in an architect's drawing, and even a tiny circle for the dot on the top of the letter 'i' in a word processor.  By combining line and circle drawing with techniques like 'filling' and 'antialiasing', computers can draw smooth, clear images that are resolution independent.
When an image on a computer is described as an outline with fill colours it is called vector graphics --- these can be re-drawn at any resolution. This means that with a vector image, zooming in to the image will not cause the pixelation seen when zooming in to bitmap graphics, which only store the pixels and therefore make the pixels larger when you zoom in.
However, with vector graphics the pixels are recalculated every time the image is redrawn, and that's why it's important to use a fast algorithm like the one above to draw the images.

Outline fonts are one of the most common uses for vector graphics as they allow the text size to be increased to very large sizes, with no loss of quality to the letter shapes.

Computer scientists have found fast algorithms for drawing other shapes too, which means that the image appears quickly, and graphics can display quickly on relatively slow hardware - for example, a smartphone needs to do these calculations all the time to display images, and reducing the amount of calculations can extend its battery life, as well as make it appear faster.

As usual, things aren't quite as simple as shown here. For example, consider a horizontal line that goes from (0,0) to (10,0), which has 11 pixels.
Now compare it with a 45 degree line that goes from (0,0) to (10,10). It still has 11 pixels, but the line is longer (about 41% longer to be precise).
This means that the line would appear thinner or fainter on a screen, and extra work needs to be done (mainly anti-aliasing) to make the line look ok. We've only just begun to explore how techniques in graphics are needed to quickly render high quality images.

{panel type="project" summary="Line and circle drawing"}

To compare Bresenham's method with using the equation of a line ({math}y = mx+b{math end}), choose your own start and end point of a line (of course, make sure it's at an interesting angle), and show the calculations that would be made by each method. Count up the number of additions, subtractions, multiplications and divisions that are made in each case to make the comparison. Note that addition and subtraction is usually a lot faster than multiplication and division on a computer.

You can estimate how long each operation takes on your computer by running a program that does thousands of each operation, and timing how long it takes for each. From this you can estimate the total time taken by each of the two methods. A good measurement for these is how many lines (of your chosen length) your computer could calculate per second.

If you're evaluating how fast circle drawing is, you can compare the number of addition and multiplication operations with those required by the Pythagoras formula that is a basis for the simple [equation of a circle](https://en.wikipedia.org/wiki/Circle#Equations) (for this calculation, the line from the centre of the circle to a particular pixel on the edge is the hypotenuse of a triangle, and the other two sides are a horizontal line from the centre, and a vertical line up to the point that we're wanting to locate. You'll need to calculate the *y* value for each *x* value; the length of the hypotenuse is always equal to the radius).
{panel end}

{comment}
Other topics to be added:

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

We've only scraped the surface of the field of computer graphics.
Computer scientists have developed algorithms for many areas of graphics, including:
 - lighting (so that virtual lights can be added to the scene, which then creates shading and depth)
 - texture mapping (to simulate realistic materials like grass, skin, wood, water, and so on),
 - anti-aliasing (to avoid jaggie edges and strange artifacts when images are rendered digitally)
 - projection (working out how to map the 3D objects in a scene onto a 2D screen that the viewer is using),
 - hidden object removal (working out which parts of an image can't be seen by the viewer),
 - photo-realistic rendering (making the image as realistic as possible), as well as deliberately un-realistic simulations, such as "painterly rendering" (making an image look like it was done with brush strokes), and
 - efficiently simulating real-world phenomena like fire, waves, human movement, and so on.

The matrix multiplication system used in this chapter is a simplified version of the one used by production systems, which are based on [homogeneous coordinates](https://en.wikipedia.org/wiki/Homogeneous_coordinates).
A homogeneous system uses a 4 by 4 matrix  (instead of 3 by 3 that we were using for 3D).
It has the advantage that all operations can be done by multiplication (in the 3 by 3 system that we used, you had to multiply for scaling and rotation, but add for translation), and it also makes some other graphics operations a lot easier.
Graphics processing units (GPUs) in modern desktop computers are particularly good at processing homogeneous systems, which gives very fast graphics.

{panel type="Curiosity" summary="Moebius strips and GPUs"}
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



## Further reading

{comment}

.. todo:: this section is yet to be written

{comment end}

### Useful Links

- [https://en.wikipedia.org/wiki/Computer_graphics](https://en.wikipedia.org/wiki/Computer_graphics)
- [https://en.wikipedia.org/wiki/Transformation_matrix](https://en.wikipedia.org/wiki/Transformation_matrix)
- [https://en.wikipedia.org/wiki/Bresenham’s_line_algorithm](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm)
- [https://en.wikipedia.org/wiki/Ray_trace](https://en.wikipedia.org/wiki/Ray_trace)
- [http://www.cosc.canterbury.ac.nz/mukundan/cogr/applcogr.html](http://www.cosc.canterbury.ac.nz/mukundan/cogr/applcogr.html)
- [http://www.cosc.canterbury.ac.nz/mukundan/covn/applcovn.html](http://www.cosc.canterbury.ac.nz/mukundan/covn/applcovn.html)
- [http://www.povray.org/resources/links/3D_Tutorials/POV-Ray_Tutorials/](http://www.povray.org/resources/links/3D_Tutorials/POV-Ray_Tutorials/)


{comment}

### Key concepts

- Algorithms: Bresenham’s algorithm (line and circle drawing), colour space conversion, line anti-aliasing, Bézier and B-spline curves, painter’s algorithm, Z-buffer
- Techniques: Techniques: ray tracing, texture mapping, shading, anti-aliasing, volume rendering, polygonisation, constructive solid geometry, 3D modeling, hidden object removal
- Applications: drawing software, animation

Computer Graphics, Computer Vision, Bresenham’s Line Algorithm, Ray Tracing, Magnetic Resonance Imaging (MRI), Rendering, 3D Modeling, Animation, WebGL (Web Graphics Library), OpenGL (Open Graphics Library)

{comment end}
