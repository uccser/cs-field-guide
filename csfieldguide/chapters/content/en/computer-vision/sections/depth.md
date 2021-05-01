# Depth
Depth is a key part of computer vision, which gives the computer information about the locations of objects relative to the camera.
For example, a self-driving car would want to know how far away the car ahead of it is to avoid collisions.
One way of obtaining depth information is by using more than two cameras.
Stereo vision uses two cameras to take two images. 
Objects that are close to the cameras will have a greater horizontal disparity in the images, whereas far away objects will have a smaller disparity.
Here, disparity refers to the difference between the positions of the object in the two images.
Humans and many other animals also use this technique to obtain depth information.
Each eye sees a slightly different image, which is used to tell whether an object is close or far away.

## The Maths...
One possible method of programmatically obtaining the distance to an object from stereo images is detailed below. 
Other methods may provide better or worse results, but the following one is (relatively) simple. 
For those looking to learn more, the full paper this was inspired by can be found [here](https://www.researchgate.net/publication/320336266_Distance_Measurement_for_Self-Driving_Cars_Using_Stereo_Camera).
Only the situation where the object is horizontally between the two camera positions is considered here.


The same camera should be used to take both pictures. 
An important aspect of the camera we need to know its angle of view, which is the horizontal angle that the camera can see.
If you cannot find the technical specifications of your camera, there is an easy way to obtain this. 
Prop a ruler up vertically.
Then, take a picture of the ruler, aligning the start of the ruler with the left edge of the photo. 
Ensure that ruler exceeds the width of the photo (the right end is not visible) and measure the distance between the camera and the ruler (e.g. by using another ruler).

{image file-path="img/chapters/ruler-angle-of-view.PNG" alt="A diagram showing the components of the ruler technique."}

As seen in the diagram, finding the angle of view becomes a very simple trigonometry problem. 
We obtain the follow equation to obtain the half angle of view.

\[
\theta = \tan^{-1}\frac{r}{2d}
\]

Where \(r\) is the length of the ruler visible in the picture and \(d\) is the distance of the ruler from the camera.
Doubling the half angle of view gives us the full angle of view, \(\theta_0\). 
When using the camera for the next part, it is important that you use the same camera settings (e.g. zoom level) so that the angle of view does not change.
Below is a calculator to calculate the angle of view.

{interactive slug="angle-of-view-calculator" type="in-page"}


Two stereo pictures are taken of an object, where the object is between the two camera positions.
A diagram showing the setup can be seen below.
For both pictures, the cameras should be pointing in the same direction such that the axes of view are parallel (or as close as you can get).
A possible way of ensuring they are as parallel as possible is to align the camera with a straight line on the floor.
Note down the distance between the camera positions and the actual distance to the object with rulers or measuring tape.

{image file-path="img/chapters/stereo-vision-diagram-1.PNG" alt="A diagram showing the main setup."}

\(\theta_0\) is the camera’s angle of view, which is the same for both cameras as the same camera is used for both pictures.
\(B_1\) and \(B_2\) are the distances between the centre of the object and the left and right camera, respectively.
Their sum is \(B\), the distance between the cameras.
\(\theta_1\) and \(\theta_2\) is the angle between the camera's axis of view and the line going from the camera to the object.
Finally, \(D\) is the distance to the object.


A triangle is formed by the left camera LC, the right camera RC, and the object O, which is comprised of two right-angle triangles as seen below.

{image file-path="img/chapters/stereo-vision-diagram-2.PNG" alt="A diagram showing the main setup."}

From basic trigonometry, it is known that θ_1 and θ_2 are the same as those in Figure 1. 
Using trigonometry, the following can be derived:

\[
B_1 = D tan \theta_1\\
B_2 = D tan \theta_2
\]

Therefore:
\[
B = D tan \theta_1 + D tan \theta_2\\
B = D(tan \theta_1 + tan \theta_2)\\
D = \frac{B}{tan \theta_1 + tan \theta_2}
\]


The following diagram shows the two camera views taken out from the first diagram for clarity.
Think of each image as a grid, where the origin is the centre of the image.

{image file-path="img/chapters/stereo-vision-diagram-3.PNG" alt="A diagram showing the main setup."}

\(x_0\) is the width of the image in pixels. 
The terms \(x_1\) and \(x_2\) are the x-coordinates of the object in the left and right images, respectively.
As an example, consider the left view.
There are two right-angle triangles, both of which share the side \(D\).
The smaller triangle has a top that goes up to \(x1\).
This is also the top's length, as \(x1\) is the x-coordinate where the centre is the origin.
The bigger triangle has a top that goes up to the end of the image.
Using the smaller triangles in both views, we know the following using some basic trigonometry.

\[
D = \frac{x_1}{tan\theta_1}\\
D = \frac{-x_2}{tan\theta_2}
\]

\(x_2\) is negated as widths should be positive.
Now consider the bigger triangles.
As they go up to the end of the image, their widths are half of the width of the image, \(x_0\).
More trigonometry ensues...

\[
D = \frac{frac{x_0}{2}}{tan\frac{\theta_0}{2}}
\]

Equating equations (2) and (4), we get:

\[
\frac{x_1}{tan\theta_1} = \frac{frac{x_0}{2}}{tan\frac{\theta_0}{2}}\\
tan\theta_1 = x_1 \div \frac{frac{x_0}{2}}{tan\frac{\theta_0}{2}}\\
tan\theta_1 = \frac{2 x_1 tan \frac{\theta_0}{2}}{x_0}
\]

Similarly, equating equations (3) and (4), we get:

\[
\frac{-x_2}{tan\theta_2} = \frac{frac{x_0}{2}}{tan\frac{\theta_0}{2}}\\
tan\theta_2 = -x_2 \div \frac{frac{x_0}{2}}{tan\frac{\theta_0}{2}}\\
tan\theta_2 = \frac{-2 x_2 tan \frac{\theta_0}{2}}{x_0}
\]

We're nearly there! Adding equations (5) and (6) gives:

\[
tan\theta_1 + tan\theta_2 = \frac{2 x_1 tan \frac{\theta_0}{2}}{x_0} + \frac{-2 x_2 tan \frac{\theta_0}{2}}{x_0}\\
tan\theta_1 + tan\theta_2 = \frac{2 tan \frac{\theta_0}{2} (x_1 - x_2)}{x_0}
\]

Substituting (7) back into (1) gives us our final equation:

\[
D = \frac{B x_0}{2 tan \frac{\theta_0}{2} (x_1 - x_2)}
\]

\((x_1 - x_2)\) is the disparity of the objects in the pictures.
However, the disparity will be the same no matter what we choose as the origin of the coordinate system.
As such, we can treat \(x_1\) as the x-coordinate of the pixel from the left of the left image, and \(x_2\) as the x-coordinate of the pixel from the left of the right image.
Thus, we can determine the distance of an object from the cameras only with the distance between the cameras \(B\), the width of the images in pixels \(x_0\), the angle of view \(x_0\), and the x-coordinates of the objects in the images \(x_1\) and \(x_2\).
The following interactive shows the equation in action.

{interactive slug="distance-from-stereo-images" type="whole-page" text="true"}

Distance from stereo images

{interactive end}