# Edge detection

A useful technique in computer vision is *edge detection*, where the boundaries between objects are automatically identified.
Having these boundaries makes it easy to *segment* the image (break it up into separate objects or areas), which can then be recognised separately.

For example, here's a photo where you might want to recognise individual objects:

{image file-path="img/chapters/fruit-bowl-photo.jpg" alt="Image of a fruit bowl"}

And here's a version that has been processed by an edge detection algorithm:

{image file-path="img/chapters/fruit-bowl-photo-with-canny-edge-detection.png" alt="The image above with canny edge detection applied"}

Notice that the grain on the table above has affected the quality; some pre-processing to filter that would have helped!

Earlier, we looked at how we could use a *convolutional kernel* to blur an image.
One of the common techniques in edge detection also requires a convolutional kernel.
If we multiply the values of pixels on one side of each point on the image by a negative amount, and pixels on the other side by a positive amount, then combine the results, we'll discover a number which represents the difference between pixels on the two sides.
This technique is called finding the *image gradient*.
The following interactive allows you to do that, then apply a threshold to the result so that you can begin to spot likely edges in a picture.

{interactive slug="pixel-viewer" type="whole-page" text="true" parameters="mode=edgedetection&picturepicker"}

Edge Detection

{interactive end}

There are a few commonly used convolutional kernels that people have come up with for finding edges.
After you've had a go at coming up with some of your own, have a look at the [Prewitt operator](https://en.wikipedia.org/wiki/Prewitt_operator), the [Roberts cross](https://en.wikipedia.org/wiki/Roberts_cross) and [Sobel operator](https://en.wikipedia.org/wiki/Sobel_operator) on wikipedia.
Try these out in the interactive.
What results do you get from each of these?

There are a number of good edge detections out there, but one of the more famous ones is the Canny edge detection algorithm.
This is a widely used algorithm in computer vision, developed in 1986 by John F. Canny. You can read more about [Canny edge detection on Wikipedia](https://en.wikipedia.org/wiki/Canny_edge_detector).

You could extend the techniques used in the above interactive by adding a few more processing stages.
If you were to apply a gaussian filter to the image first, then do some work to favour edges that were connected to other edges, then you would be on your way to implementing the Canny edge detector.

## Activity: Edge detection evaluation

With the canny edge detection interactive above, try uploading different images and determining how good different convolutional kernels are at detecting boundaries in the image.
Capture images to put in your report as examples to illustrate your experiments with the detector.

- Can the detector find all edges in the image?
  If there are some missing, why might this be?
- Are there any false edge detections? Why did they system think that they were edges?
- Does the lighting on the scene affect the quality of edge detection?
- Does the system find the boundary between two colours?
  How similar can the colours be and still have the edge detected?
- How fast can the system process the input? Does this change with more complex kernels?
- How well does the system deal with an image with text on it?

{comment spare material moved to https://docs.google.com/document/d/1qYEMq4LcTvotXrfkhS5rvOu0gQCHezGSSaX3vIi9mVo/}
