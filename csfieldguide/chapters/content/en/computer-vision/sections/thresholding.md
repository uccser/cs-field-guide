# Thresholding

Another technique that is sometimes useful in computer vision is {glossary-link term="thresholding"}thresholding{glossary-link end}.
This is something which is relatively simple to implement, but can be quite useful.

If you have a greyscale image, and you want to detect regions that are darker or lighter, it could be useful to simply transform any pixel above a certain level of lightness to pure white, and any other pixel to pure black.
In the Data Representation chapter we talked about how pixels are all represented as sets of numbers between 0 and 255 which represent red, green and blue values.
We can change a pixel to greyscale by simply taking the average of all three of these values and setting all three values to be this average.

Once we have done this, we can apply a threshold to the image to decide whether certain pixels are in certain regions.
The following interactive allows you to do this to an image you upload.
Try using different thresholds on different images and observing the results.

{interactive slug="pixel-viewer" type="whole-page" text="true" parameters="mode=thresholdgreyscale"}

Greyscale thresholding

{interactive end}

The next interactive lets you do the same thing, but on the original colour image.
You can set up more complicated statements as your threshold, such as "Red > 127 AND Green < 127 OR Blue > 63".
Does applying these complex thresholds gives you more flexibility in finding specific regions of colour?

{interactive slug="pixel-viewer" type="whole-page" text="true" parameters="mode=threshold"}

Colour thresholding

{interactive end}

Thresholding on its own isn't a very powerful tool, but it can be very useful when combined with other techniques as we shall see later.
