# Face recognition

Recognising faces has become a widely used computer vision application.
These days photo album systems like Picasa and Facebook can try to recognise who is in a photo using face recognition.
For example, the following photos were recognised in Picasa as being the same person, so to label the photos with people's names you only need to click one button rather than type each one in.

{image file-path="img/chapters/face-recognition-software-screenshot.jpg" alt="Google's Picasa recognises these photos as being the same person"}

There are lots of other applications.
Security systems such as customs at country borders use face recognition to identify people and match them with their passport.
It can also be useful for privacy — Google Maps streetview identifies faces and blurs them.
Digital cameras can find faces in a scene and use them to adjust the focus and lighting.

There is some information about [how facial recognition works](http://electronics.howstuffworks.com/gadgets/high-tech-gadgets/facial-recognition.htm) that you can read up as background, and some more information at [i-programmer.info](http://www.i-programmer.info/babbages-bag/1091-face-recognition.html).
If you're interested, there is also a Vox video on [how snapchat filters work](https://www.youtube.com/watch?v=Pc2aJxnmzh0) that mentions facial recognition algorithms.

There are some relevant [articles on the cs4fn website](http://www.cs4fn.org/vision/) that also provide some general material on computer vision.

We also have a Viola-Jones Face Detection interactive available, supporting text will be added at a later date.

{interactive slug="viola-jones-face-detector" type="whole-page" text="Viola-Jones Face Detection"}

{comment http://facestuff.wordpress.com/2010/02/15/beady-eyed-tap-face/ Discuss techniques}

{comment extend to template/pattern matching etc (QR codes?), Character/text recognition?}

## Project: Recognising faces

First let's manually try some methods for recognising whether two photographs show the same person.

- Get about 3 photos each of 3 people
- Measure features on the faces such as distance between eyes, width of mouth, height of head etc.
  Calculate the ratios of some of these.
- Do photos of the same person show the same ratios? Do photos of different people show different ratios?
  Would these features be a reliable way to recognise two images as being the same person?
- Are there other features you could measure that might improve the accuracy?

You can evaluate the effectiveness of facial recognition in free software such as Google’s Picasa or the Facebook photo tagging system, but uploading photos of a variety of people and seeing if it recognises photos of the same person.
Are there any false negatives or positives?
How much can you change your face when the photo is being taken to not have it match your face in the system?
Does it recognise a person as being the same in photos taken several years apart?
Does a baby photo match of a person get matched with them when they are five years old?
When they are an adult?
Why or why not does this work?


{comment The below paragraph is commented out because the link displays a 404 page and we cannot find a replacement}

{comment Try using [face recognition on this website](https://inspirit.github.com/jsfeat/sample_haar_face.html) to see how well the Haar face recognition system can track a face in the image.}

{comment What prevents it from tracking a face?}

{comment Is it affected if you cover one eye or wear a hat?}

{comment How much can the image change before it isn't recognised as a face?}

{comment Is it possible to get it to incorrectly recognise something that isn't a face?}
