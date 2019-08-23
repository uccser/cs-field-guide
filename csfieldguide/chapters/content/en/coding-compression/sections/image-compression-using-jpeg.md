# Image compression using JPEG

Images can take up a lot of space, and most of the time that pictures are stored on a computer they are compressed to avoid wasting too much space.
With a lot of images (especially photographs), there's no need to store the image exactly as it was originally, because it contains way more detail than anyone can see.
This can lead to considerable savings in space, especially if the details that are missing are the kind that people have trouble perceiving.
This kind of compression is called {glossary-link term="lossy"}lossy{glossry-link end} compression.
There are other situations where images need to be stored exactly as they were in the original, such as for medical scans or very high quality photograph processing, and in these cases lossless methods are used, or the images aren't compressed at all (e.g. using RAW format on cameras).

In the [data representation chapter]('chapters:chapter' 'data-representation') we looked at how the size of an image file can be reduced by using fewer bits to describe the colour of each pixel.
However, image compression methods such as JPEG take advantage of patterns in the image to reduce the space needed to represent it, without impacting the image unnecessarily.

The following three images show the difference between reducing bit depth and using a specialised image compression system.
The left hand image is the original, which was 24 bits per pixel.
The middle image has been compressed to one third of the original size using JPEG; while it is a "lossy" version of the original, the difference is unlikely to be perceptible.
The right hand one has had the number of colours reduced to 256, so there are 8 bits per pixel instead of 24, which means it is also stored in a third of the original size.
Even though it has lost just as many bits, the information removed has had much more impact on how it looks.
This is the advantage of JPEG: it removes information in the image that doesn't have so much impact on the perceived quality.
Furthermore, with JPEG, you can choose the tradeoff between quality and file size.

Reducing the number of bits (the colour depth) is sufficiently crude that we don't really regard it as a compression method, but rather just a low quality representation.
Image compression methods like JPEG, GIF and PNG are designed to take advantage of the patterns in an image to get a good reduction in file size without losing more quality than necessary.

{image file-path="img/chapters/compression-comparison.png" alt="This image compares three images, two of which are good quality with no perceived difference. The third image is very poor quality."}

{comment xtcb low priority: these are all jpgs of the originals; consider replacing them with actual originals (as long as the browser can render them all). ..ajb these images seem to appear in the wrong order to what is described for me… The middle one and left one should be swapped around?}

For example, the following image shows a zoomed in view of the pixels that are part of the detail around an eye from the above (high quality) image.

{image file-path="img/chapters/zoomed-eye.png" alt="Zoomed in view of pixels."}

Notice that the colours in adjacent pixels are often very similar, even in this part of the picture that has a lot of detail.
For example, the pixels shown in the red box below just change gradually from very dark to very light.

{image file-path="img/chapters/zoomed-eye-highlighted.png" alt="This image has a red box around five pixels that gradually change from very dark to very light in colour."}

Run length encoding wouldn't work in this situation.
You could use a variation that specifies a pixel's colour, and then says how many of the following pixels are the same colour, but although most adjacent pixels are nearly the same, the chances of them being identical are very low, and there would be almost no runs of identical colours.

But there is a way to take advantage of the gradually changing colours.
For the pixels in the red box above, you could generate an approximate version of those colours by specifying just the first and last one, and getting the computer to calculate the ones in between assuming that the colour changes gradually between them.
Instead of storing 5 pixel values, only 2 are needed, yet someone viewing it probably might not notice any difference.
This would be *lossy* because you can't reproduce the original exactly, but it would be good enough for a lot of purposes, and save a lot of space.

{panel type="jargon-buster"}

# Interpolation

The process of guessing the colours of pixels between two that are known is an example of {glossary-link term="interpolation" reference-text="compressing images"}interpolation{glossary-link end}.

A *linear* interpolation assumes that the values increase at a constant rate between the two given values; for example, for the five pixels above, suppose the first pixel has a blue colour value of 124, and the last one has a blue value of 136,
then a linear interpolation would guess that the blue values for the ones in between are 127, 130 and 133, and this would save storing them.
In practice, a more complex approach is used to guess what the pixels are, but linear interpolation gives the idea of what's going on.

{panel end}

The JPEG system, which is widely used for photos, uses a more sophisticated version of this idea.
Instead of taking a 5 by 1 run of pixels as we did above, it works with 8 by 8 blocks of pixels.
And instead of estimating the values with a linear function, it uses combinations of cosine waves.

{comment It would be good have a figure that shows a line of pixels, and the corresponding waveform.}

{panel type="curiosity"}

# What are cosine waves

A cosine wave form is from the trigonometry function that is often used for calculating the sides of a triangle.
If you plot the cosine value from 0 to 180 degrees, you get a smooth curve going from 1 to -1.
Variations of this plot can be used to approximate the value of pixels, going from one colour to another.
If you add in a higher frequency cosine wave, you can produce interesting shapes.
In theory, any pattern of pixels can be created by adding together different cosine waves!

The following graph shows the values of \(\sin(x)\) and \(\cos(x)\) for \(x\) ranging from 0 to 180 degrees.

{image file-path="img/chapters/cosine-graph.png" alt="A graph showing cos(x) and sin(x) curves"}

{panel end}

{panel type="curiosity"}

# Adding sine or cosine waves to create any waveform

JPEGs (and MP3) are based on the idea that you can add together lots of sine or cosine waves to create any waveform that you want.
Converting a waveform for a block of pixels or sample of music into a sum of simple waves can be done using a technique called a [Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform), and is a widely used idea in signal processing.

You can experiment with adding sine waves together to generate other shapes using the following spreadsheet:

{button-link link="files/Adding-Sine-Waves.xls" text="Download sine waves spreadsheet" file="yes"}

In this spreadsheet, the yellow region on the first sheet allows you to choose which sine waves to add.
Try setting the 4 sine waves to frequencies that are 3, 9, 15, and 21 times the fundamental frequency respectively (the "fundamental" is the lowest frequency).
Now set the "amplitude" (equivalent to volume level) of the four to 0.5, 0.25, 0.125 and 0.0625 respectively (each is half of the previous one).
This should produce the following four sine waves:

{image file-path="img/chapters/sine-waves.png" alt="Four sine waves"}

When the above four waves are added together, they interfere with each other, and produce a shape that has sharper transitions:

{image file-path="img/chapters/sine-waves-sum.png" alt="The four sine waves added together"}

In fact, if you were to continue the pattern with more than four sine waves, this shape would become a "square wave", which is one that suddenly goes to the maximum value, and then suddenly to the minimum.
The one shown above is bumpy because we've only used 4 sine waves to describe it.

This is exactly what is going on in JPEG if you compress a black and white image.
The "colour" of pixels as you go across the image will either be 0 (black) or full intensity (white), but JPEG will approximate it with a small number of cosine waves (which have basically the same properties as sine waves.)
This gives the "overshoot" that you see in the image above; in a JPEG image, this comes out as bright and dark patches surrounding the sudden change of colour, like here:

{image file-path="img/chapters/jpeg-word-zoomed.jpg" alt="This image zooms in on the bright and dark pixels surrounding the sudden change of colour."}

You can experiment with different combinations of sine waves to get different shapes.
You may need to have more than four to get good approximations to a shape that you want; that's exactly the tradeoff that JPEG is making.
There are some suggestions for parameters on the second sheet of the spreadsheet.

{panel end}

{comment html5 low priority interactive to add cosine waves to try to match a given waveform e.g. square wave, triangle, random. Select amplitude for various frequencies. I have a spreadsheet that basically does this, could put it in for the meantime - tim}

Each 8 by 8 block of pixels in a JPEG image can be created by adding together different amounts of up to 64 patterns based on cosine waves.
The waves can be represented visually as patterns of white and black pixels, as shown in the image below.

{image file-path="img/chapters/jpeg-discrete-cosine-transform.png" alt="An 8x8 grid of black and white pixel patterns."}

These particular waves are known as "basis functions" because any 8 by 8 block of pixels can be created by combining them.
The basis function in the top left is the average colour of the 8 by 8 block.
By adding more of it (increasing the coefficient that it is multiplied by) the resultant 8 by 8 block will become darker.
The basis functions become more complex towards the bottom right, and are therefore used less commonly.
How often would an image have every pixel a different color, as in the bottom right basis function?
To investigate how the 64 basis functions can be combined to form any pattern in 8 by 8 block of pixels - try out this puzzle!

{interactive slug="jpeg-compression" type="whole-page" parameters="puzzle=true" text="JPEG puzzle interactive"}

So 64 pixels (in an 8 by 8 block) can be represented by 64 coefficients that tell us how much of each basis function to use.
But how does this help us save space and compress the image?
At the moment we are still storing exactly the same amount of data, just in a different way.

{panel type="jargon-buster"}

# Where does the term JPEG come from?

The name "JPEG" is short for "Joint Photographic Experts Group", a committee that was formed in the 1980s to create standards so that digital photographs could be captured and displayed on different brands of devices.
Because some file extensions are limited to three characters, it is often seen as the ".jpg" extension.

{panel end}

{panel type="curiosity"}

# More about cosine waves

The cosine waves used for JPEG images are based on a "Discrete Cosine Transform".
The "Discrete" means that the waveform is digital – it is the opposite of continuous, where any value can occur.
In a JPEG wave, there are only 8 x 8 values (for the block being coded), and each of those values can have a limited range of numbers (binary integers), rather than any value at all.

{panel end}

The advantage of using this DCT representation is that it allows us to separate the low frequency changes (top left ones) from high frequency changes (bottom right), and JPEG compression uses that to its advantage.
The human eye does not usually notice high frequency changes in an image so they can often be discarded without affecting the visual quality of the image.
The low frequency (less varied) basis functions are far more important to an image.

JPEG compression uses a process called quantisation to set any insignificant basis function coefficients to zero.
But how do we decide what is insignificant? Quantisation requires a quantisation table of 64 numbers.
Each coefficient value is divided by the corresponding value in the quantisation table and rounded down to the nearest integer.
This means many coefficients become zero, and when multiplied back with the quantisation table, remain zero.

There is no optimal quantisation table for every image, but many camera or image processing companies have worked to develop very good quantisation tables.
As a result, many are kept secret.
Some companies have also developed software to analyse images and select the most appropriate quantisation table for the particular image.
For example, for an image with text in it, high frequency detail is important, so the quantisation table should have lower values in the bottom right so more detail is kept.
Of course, this will also result in the image size remaining relatively large.
Lossy compression is all about compromise!

The figure below shows an image before and after it has had quantisation applied to it.

Before Quantisation:

{image file-path="img/chapters/before.png" alt="Before quantisation."}

{image file-path="img/chapters/beforedct.png" alt="Quantisation table before."}

After Quantisation:

{image file-path="img/chapters/after.png" alt="After quantisation."}

{image file-path="img/chapters/afterdct.png" alt="Quantisation table after."}

Notice how the images look very similar, even though the second one has many zero coefficients. The differences we can see will be barely visible when the image is viewed at its original size.

Try this out yourself:

{interactive slug="jpeg-compression" type="whole-page" text="JPEG interactive"}

We still have 64 numbers even with the many zeros, so how do we save space when storing the zeros?
You will notice that the zeros are bunched towards the bottom right. This means if we list the coefficients in a zig-zag, starting from the top left corner, we will end up with many zeros in a row.
Instead of writing 20 zeros we can store the fact that there are 20 zeros using a method of run-length encoding very similar to the one discussed earlier in this chapter.

{image file-path="img/chapters/direction.png" alt="Shows the order in which the coefficients are listed."}

And finally, the numbers that we are left with are converted to bits using Huffman coding, so that more common values take less space and vice versa.

All those things happen every time you take a photo and save it as a JPEG file, and it happens to every 8 by 8 block of pixels.
When you display the image, the software needs to reverse the process, adding all the basis functions together for each block - and there will be hundereds of thousands of blocks for each image.

An important issue arises because JPEG represents images as smoothly varying colours: what happens if the colours change suddenly?
In that case, lots of values need to be stored so that lots of cosine waves can be added together to make the sudden change in colour, or else the edges of the image become fuzzy.
You can think of it as the cosine waves overshooting on the sudden changes, producing artifacts like the ones in the following image where the edges are messy.

{image file-path="img/chapters/jpeg-word.jpg" alt="The word JPEG has fuzzy edges."}

The original had sharp edges, but this zoomed in view of the JPEG version of it show that not only are the edges gradual, but some darker pixels occur further into the white space, looking a bit like shadows or echoes.

{image file-path="img/chapters/jpeg-word-zoomed.jpg" alt="Zoomed in view of the fuzzy edges."}

For this reason, JPEG is used for photos and natural images, but other techniques (such as GIF and PNG, which we will look at in another section) work better for artificial images like this one.

{comment xjrm low priority create an image like the one in this link, with one, two three waveforms added http://mathworld.wolfram.com/images/eps-gif/FourierSeriesSquareWave_800.gif (then Tim to add some text) .. xhtml5 interactive (medium priority): allow user to switch on and off the 64 basis vectors (https://en.wikipedia.org/wiki/File:Dctjpeg.png) and see the combined result .. http://www.cs4fn.org/films/jpegit.php }

{comment ## Image compression using GIF and PNG appearing soon! .. http://www.cs4fn.org/films/jpegit.php CS4FN on Jpeg and .. Students should discuss the basics of how one of them works (Not entirely sure how to approach this without it becoming a paraphrase, need to think about it). I’m thinking that an explanation of what it means for a compression algorithm to be lossy is important here. .. images from compression lectures chapter 10 .. GIF and PNG use a palette; GIF strictly 256 bits - lossless, except GIF reduces colour depth; use LZ - see general purpose .. best for images that don't have a big variety of colour e.g. cartoons, icons . These sorts of images don't work so well with JPEG compression because it isn't so good at sharp edges. .. choosing right compression method is important}
