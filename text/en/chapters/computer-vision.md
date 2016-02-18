# Computer Vision

{comment}

.. xTCB Link the project directly to A/M/E in the standard (see email from Jenny B)

This chapter supports the vision part of the "Graphics and visual computing" option of the NZ achievement standard 3.44. The topic "Visual computing" is generally regarded to include computer graphics (output) and computer vision (input); this chapter focusses on the latter. For the 3.44 standard a project based on this chapter or the computer graphics chapter would only count as one topic i.e. students shouldn't choose vision and graphics as their two required topics --- but we've chosen to put them in separate chapters.

Currently all material in this chapter is relevant to the standard, although students need choose only one or two examples to focus on to meet the requirements of the standard.

This chapter is currently only a sketch of topics; it should be enough for students to make decisions about which options to choose, but over the next month or two we'll add more specific information and interactives to support projects. Currently the interactives only work with images from a webcam, but a new version that students can load their own photos into will be available soon, as this will allow for more controlled experiments with the techniques. The ability to select example images to test these techniques is a useful skill, and a good choice of original images by students helps to show understanding of the purpose of the technique.

{comment end}

{video url="http://www.youtube.com/embed/bE2u5trQAHM?rel=0"}

## What's the big picture?

When computers were first developed, the only way they could interact with the outside world was through the input that people wired or typed into them. Digital devices today often have cameras, microphones and other sensors through which programs can perceive the world we live in automatically. Processing images from a camera, and looking for interesting information in them, is what we call *computer vision*.

With increases in computer power, the decrease in the size of computers and progressively more advanced algorithms, computer vision has a growing range of applications. While it is commonly used in fields like healthcare, security and manufacturing, we are finding more and more uses for them in our everyday life, too.

For example, here is a sign written in Chinese:

{image filename="no-smoking-sign.jpg" alt="Visual computing: translating a sign"}

If you can’t read the Chinese characters, there are apps available for smartphones that can help:

{image filename="no-smoking-sign-translated.png" alt="Visual computing: translating a sign"}

Having a small portable device that can "see" and translate characters makes a big difference for travellers. Note that the translation given is only for the second part of the phrase (the last two characters). The first part says “please don’t”, so it could be misleading if you think it’s translating the whole phrase!

Recognising of Chinese characters may not work every time perfectly, though. Here is a warning sign:

{image filename="steep-sign-translated.jpg" alt="Visual computing: translating a sign"}

My phone has been able to translate the “careful” and “steep” characters, but it hasn’t recognised the last character in the line. Why do you think that might be?

{panel type="teacher-note" summary="The importance of image segmentation"}

The last character is more difficult to recognise because the picture of the stick figure on a steep slope is too close to the character. The app can’t tell where the character ends and the picture begins. This is a problem of *image segmentation*, which we will look at later.

{panel end}

Giving users more information through computer vision is only one part of the story. Capturing information from the real world allows computers to assist us in other ways too. In some places, computer vision is already being used to help car drivers to avoid collisions on the road, warning them when other cars are too close or there are other hazards on the road ahead. Combining computer vision with map software, people have now built cars that can drive to a destination without needing a human driver to steer them. A wheelchair guidance system can take advantage of vision to avoid bumping into doors, making it much easier to operate for someone with limited mobility.

{comment}

.. http://en.wikipedia.org/wiki/Google_driverless_car

.. I think for this topic, it could be important to mention the links into math, and also provide links to more advanced stuff, as there will be some high school students who are very confident with math, and could investigate this topic quite possibly to the level that more advanced university students would (and there are probably some that already have!). Graphics seems to be popular with the “geekiest” and “smartest” students.

.. Of course students who aren’t so confident in math should still be given stuff they can understand as well.

.. For the students who’re not so math-heavy, I wonder if it’s worth pointing out links into cognitive science (bio/psych), too. The human visual system and a computer vision system may have similar “hardware”, but they don’t interpret images in the same way. Some of the things that we find easy to do (like recognising people’s facial expressions) are challenging for a computer, and some things that we find challenging (like seeing through some optical illusions; e.g. checkerboard illusion) are easy for a computer.

{comment end}

## Lights, Camera, Action!

{comment}

.. big picture: camera models, noise, lighting models

.. [images might be clear to a human, but they are just blurred pixels to a computer --- show closeup of sign]

{comment end}

Digital cameras and human eyes fulfill largely the same function: images come in through a lens and are focused onto a light sensitive surface, which converts them into electrical impulses that can be processed by the brain or a computer respectively. There are some differences, however.

{comment}

.. x JRM diagram of eye vs. diagram of digital camera.(not urgent)

{comment end}

{panel type="teacher-note" summary="Digital camera sensors"}

There are a number of different types of digital camera sensor, but for the purposes of this chapter we will be focusing on the [CMOS](http://en.wikipedia.org/wiki/CMOS_sensor”)sensors which are in most consumer electronics. An alternative kind of sensor is the [Charge-Coupled Device (CCD)](http://en.wikipedia.org/wiki/Charge-coupled_device), which is more commonly used for specialist applications such as astronomy.

{panel end}

**Human eyes** have a very sensitive area in the centre of their field of vision called the fovea. Objects that we are looking at directly are in sharp detail, while our peripheral vision is quite poor. We have separate sets of cone cells in the retina for sensing red, green and blue (RGB) light, but we also have special rod cells that are sensitive to light levels, allowing us to perceive a wide dynamic range of bright and dark colours. The retina has a blind spot (a place where all the nerves bundle together to send signals to the brain through the optic nerve), but most of the time we don’t notice it because we have two eyes with overlapping fields of view, and we can move them around very quickly.

**Digital cameras** have uniform sensitivity to light across their whole field of vision. Light intensity and colour are picked up by RGB sensor elements on a silicon chip, but they aren’t as good at capturing a wide range of light levels as our eyes are. Typically, a modern digital camera can automatically tune its exposure to either bright or dark scenes, but it might lose some detail (e.g. when it is tuned for dark exposure, any bright objects might just look like white blobs).

It is important to understand that neither a human eye nor a digital camera  --- even a very expensive one --- can perfectly capture all of the information in the scene in front of it. Electronic engineers and computer scientists are constantly doing research to improve the quality of the images they capture, and the speed at which they can record and process them.

{panel type="curiosity" summary="Further reading"}

Further reading can be found at [Cambridge in Colour](http://www.cambridgeincolour.com/tutorials/cameras-vs-human-eye.htm) and [Pixiq](https://web.archive.org/web/20130309170941/http://www.pixiq.com/article/eyes-vs-cameras).

{panel end}

## Noise

One challenge when using digital cameras is something called *noise*. That’s when individual pixels in the image appear brighter or darker than they should be, due to interference in the electronic circuits inside the camera. It’s more of a problem when light levels are dark, and the camera tries to boost the exposure of the image so that you can see more. You can see this if you take a digital photo in low light, and the camera uses a high ASA/ISO setting to capture as much light as possible. Because the sensor has been made very sensitive to light, it is also more sensitive to random interference, and gives photos a "grainy" effect.

Noise mainly appears as random changes to pixels. For example, the following image has "salt and pepper" noise.

{image filename="banana-with-salt-and-pepper-noise.jpg" alt="An image of a banana with salt-and-pepper noise"}

Having noise in an image can make it harder to recognise what's in the image, so an important step in computer vision is reducing the effect of noise in an image.
There are well-understood techniques for this, but they have to be careful that they don’t discard useful information in the process. In each case, the technique has to make an educated guess about the image to predict which of the pixels that it sees are supposed to be there, and which aren’t.

{panel type="teacher-note" summary="Image noise on Wikipedia"}

The relevant Wikipedia entry is [Image noise](http://en.wikipedia.org/wiki/Image_noise)

{panel end}

Since a camera image captures the levels of red, green and blue light separately for each pixel, a computer vision system can save a lot of processing time in some operations by combining all three channels into a single “grayscale” image, which just represents light intensities for each pixel.

{comment}

.. todo [Demonstrate a noisy colour image and its combined greyscale]

{comment end}

This helps to reduce the level of noise in the image. Can you tell why, and about how much less noise there might be? (As an experiment, you could take a photo in low light --- can you see small patches on it caused by noise? Now use photo editing software to change it to black and white --- does that reduce the effect of the noise?)

{panel type="teacher-note" summary="Noisy channels"}

Each light-sensing element in the camera sensor is equally susceptible to noise. That means that noise artifacts in the red, green and blue channels are independent of each other. When the three channels are combined into one by averaging, the amount of noise is reduced to approximately one third. The answer isn’t *exactly* a third, though: there is a chance that noise will come through on two or three channels for the same pixel, in which case the averaged value may still be wildly inaccurate.

{panel end}

Rather than just considering the red, green and blue values of each pixel individually, most noise-reduction techniques look at other pixels in a region, to predict what the value in the middle of that neighbourhood ought to be.

A *mean filter* assumes that pixels nearby will be similar to each other, and takes the average (i.e. the *mean*) of all pixels within a square around the centre pixel. The wider the square, the more pixels there are to choose from, so a very wide mean filter tends to cause a lot of blurring, especially around areas of fine detail and edges where bright and dark pixels are next to each other.

A *median filter* takes a different approach. It collects all the same values that the mean filter does, but then sorts them and takes the middle (i.e. the *median*) value. This helps with the edges that the mean filter had problems with, as it will choose either a bright or a dark value (whichever is most common), but won’t give you a value between the two. In a region where pixels are mostly the same value, a single bright or dark pixel will be ignored. However, numerically sorting all of the neighbouring pixels can be quite time-consuming!

A *Gaussian* blur is another common technique, which assumes that the closest pixels are going to be the most similar, and pixels that are farther away will be less similar. It works a lot like the mean filter above, but is statistically weighted according to a *normal distribution*.

{comment}

.. [diagram of the probability curves of a mean and a Gaussian filter]

.. [side by side before-and-after image showing a Gaussian blur on a simple image (white square on black?)]

.. http://en.wikipedia.org/wiki/Gaussian_blur

.. At this point we could do an activity with a noisy image and a Gaussian blur - a light blur improves the picture quality, but increase the blur too much and the features start to become indistinct.

{comment end}

### Activity: noise reduction filters

{comment}

The following activity can be used as part of a project for the 3.44 standard. This project covers material for an example for the 3.44 standard through the following components:

- Key problem: noise in digital images
- Practical application: cleaning up an image to improve the quality of computer vision
- Algorithm/technique: noise reduction filters (mean, median, Gaussian)
- Evaluation: quality of the image and speed of the various approaches with various settings
- Personalised student examples: applying the processing to the student's own image

{comment end}

Open the [noise reduction filtering interactive using this link](http://www.csfieldguide.org.nz/releases/1.9.9/_static/widgets/cv-noise-filters.html) and experiment with settings as below. You will need a webcam, and the interactive will ask you to allow access to it.

Mathematically, this process is applying a special kind of matrix called a *convolution kernel* to the value of each pixel in the source image, averaging it with the values of other pixels nearby and copying that average to each pixel in the new image. The average is weighted, so that the values of nearby pixels are given more importance than ones that are far away. The stronger the blur, the wider the convolution kernel has to be and the more calculations take place.

{comment}

.. xtcb todo [Image of a convolution kernel for a small (3x3, 5x5 or 7x7?) Gaussian blur]

{comment end}

For this activity, investigate the different kinds of noise reduction filter and their settings (mask size, number of iterations) and determine:

- how well they cope with different kinds and levels of noise (you can set this in the interactive).
- how much time it takes to do the necessary processing (the interactive shows the number of frames per second that it can process)
- how they affect the quality of the underlying image (a variety of images + camera)

You can take screenshots of the image to show the effects in your writeup. You can discuss the tradeoffs that need to be made to reduce noise.

## Face recognition

Recognising faces has become a widely used computer vision application.
These days photo album systems like Picasa and Facebook can try to recognise who is in a photo using face recognition ---
for example, the following photos were recognised in Picasa as being the same person, so to label the photos with people's names you only need to click one button rather than type each one in.

{image filename="face-recognition-software-screenshot.jpg" alt="Google's Picasa recognises these photos as being the same person"}

There are lots of other applications.
Security systems such as customs at country borders use face recognition to identify people and match them with their passport.
It can also be useful for privacy --- Google Maps streetview identifies faces and blurs them.
Digital cameras can find faces in a scene and use them to adjust the focus and lighting.

There is some information about [How facial recognition works](http://electronics.howstuffworks.com/gadgets/high-tech-gadgets/facial-recognition.htm) that you can read up as background, and some more information at [i-programmer.info](http://www.i-programmer.info/babbages-bag/1091-face-recognition.html).

There are some relevant [articles on the cs4fn website](http://www.cs4fn.org/vision/) that also provide some general material on computer vision.

{comment}

.. Possible fun image to use:
.. http://facestuff.wordpress.com/2010/02/15/beady-eyed-tap-face/

.. xtcb to do: Discuss techniques

.. extend to template/pattern matching etc (QR codes?), Character/text recognition?

{comment end}

### Project: Recognising faces

{panel type="teacher-note" summary="NCEA"}

The following activity can be used as part of a project for the 3.44 standard. This project covers material for an example for the 3.44 standard through the following components:

- Key problem: face recognition in digital images
- Practical application: security, photo album tagging
- Algorithm/technique: Haar face detector
- Evaluation: ability to recognise faces, false positives and negatives, processing speed
- Personalised student examples: applying the processing to the student's own images

{panel end}

First let's manually try some methods for recognising whether two photographs show the same person.

- Get about 3 photos each of 3 people
- Measure features on the faces such as distance between eyes, width of mouth, height of head etc. Calculate the ratios of some of these.
- Do photos of the same person show the same ratios? Do photos of different people show different ratios? Would these features be a reliable way to recognise two images as being the same person?
- Are there other features you could measure that might improve the accuracy?

You can evaluate the effectiveness of facial recognition in free software such as Google’s Picasa or the Facebook photo tagging system, but uploading photos of a variety of people and seeing if it recognises photos of the same person. Are there any false negatives or positives? How much can you change your face when the photo is being taken to not have it match your face in the system? Does it recognise a person as being the same in photos taken several years apart? Does a baby photo match of a person get matched with them when they are five years old? When they are an adult? Why or why not does this work?

Try using [face recognition on this website](https://inspirit.github.com/jsfeat/sample_haar_face.html) to see how well the Haar face recognition system can track a face in the image. What prevents it from tracking a face? Is it affected if you cover one eye or wear a hat? How much can the image change before it isn't recognised as a face? Is it possible to get it to incorrectly recognise something that isn't a face?

## Edge detection

A useful technique in computer vision is *edge detection*, where the boundaries between objects are automatically identified.
Having these boundaries makes it easy to *segment* the image (break it up into separate objects or areas), which can then be recognised separately.

For example, here's a photo where you might want to recognise individual objects:

{image filename="fruit-bowl-photo.jpg" alt="Image of a fruit bowl"}

And here's a version that has been processed by an edge detection algorithm:

{image filename="fruit-bowl-photo-with-canny-edge-detection.png" alt="The image above with canny edge detection applied"}

Notice that the grain on the table above has affected the quality; some pre-processing to filter that would have helped!

You can experiment with edge-detection yourself with the [Canny edge detector on this website](https://inspirit.github.io/jsfeat/sample_canny_edge.html) (see the information about [Canny edge detection on Wikipedia](http://en.wikipedia.org/wiki/Canny_edge_detector)).
This is a widely used algorithm in computer vision, developed in 1986 by John F. Canny.

### Activity: Edge detection evaluation

{panel type="teacher-note" summary="NCEA"}

The following activity can be used as part of a project for the 3.44 standard. This project covers material for an example for the 3.44 standard through the following components:

- Key problem: edge detection in digital images
- Practical application: segmenting an image into component objects
- Algorithm/technique: Canny Edge detector
- Evaluation: ability to find all real edges (and not get false edges), and speed of the detector with various settings and types of images
- Personalised student examples: applying the processing to the student's own images

{panel end}

With the canny edge detection website above, try putting different images in front of the camera and determine how good the algorithm is at detecting boundaries in the image.
Capture images to put in your report as examples to illustrate your experiments with the detector.

- Can the Canny detector find all edges in the image? If there are some missing, why might this be?
- Are there any false edge detections? Why did they system think that they were edges?
- Does the lighting on the scene affect the quality of edge detection?
- Does the system find the boundary between two colours? How similar can the colours be and still have the edge detected?
- How fast can the system process the input? Does the nature of the image affect this?
- How well does the system deal with a page with text on it?

{comment}

.. spare material moved to https://docs.google.com/document/d/1qYEMq4LcTvotXrfkhS5rvOu0gQCHezGSSaX3vIi9mVo/

{comment end}

## The whole story!

The field of computer vision is changing rapidly at the moment because camera technology has been improving quickly over the last couple of decades.
Not only is the resolution of cameras increasing, but they are more sensitive for low light conditions, have less noise, can operate in infra-red (useful for detecting distances), and are getting very cheap so that it's reasonable to use multiple cameras, perhaps to give different angles or to get stereo vision.

Despite these recent changes, many of the fundamental ideas in computer vision have been around for a while; for example, the "k-means" segmentation algorithm was first described in 1967, and the first digital camera wasn't built until 1975 (it was a 100 by 100 pixel Kodak prototype).

{comment}

.. Computer Vision is a rapidly changing field because camera technology is changing fast - resolution, bnoise, infra red, stereo vision.

{comment end}

(More material will be added to this chapter in the near future)

## Further reading

- [http://en.wikipedia.org/wiki/Computer_vision](http://en.wikipedia.org/wiki/Computer_vision)
- [http://en.wikipedia.org/wiki/Mri](http://en.wikipedia.org/wiki/Mri)
- [http://www.cosc.canterbury.ac.nz/mukundan/cogr/applcogr.html](http://www.cosc.canterbury.ac.nz/mukundan/cogr/applcogr.html)
- [http://www.cosc.canterbury.ac.nz/mukundan/covn/applcovn.html](http://www.cosc.canterbury.ac.nz/mukundan/covn/applcovn.html)
