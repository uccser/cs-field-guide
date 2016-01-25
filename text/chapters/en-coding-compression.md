# Coding - Compression

## What's the big picture?

Data compression reduces the amount of space needed to store files. If you can halve the size of a file, you can store twice as many files for the same cost, or you can download the files twice as fast (and at half the cost if you're paying for the download).
Even though disks are getting bigger and high bandwidth is becoming common, it's nice to get even more value by working with smaller, compressed files.
For large data warehouses, like those kept by Google and Facebook, halving the amount of space taken can represent a massive reduction in the space and computing required, and consequently big savings in power consumption and cooling, and a huge reduction in the impact on the environment.

Common forms of compression that are currently in use include JPEG (used for photos), MP3 (used for audio), MPEG (used for videos including DVDs), and ZIP (for many kinds of data).
For example, the JPEG method reduces photos to a tenth or smaller of their original size, which means that a camera can store 10 times as many photos, and images on the web can be downloaded 10 times faster.

So what's the catch? Well, there can be an issue with the quality of the data – for example, a highly compressed JPEG image doesn't look as sharp as an image that hasn't been compressed. Also, it takes processing time to compress and decompress the data. In most cases, the tradeoff is worth it, but not always.

{interactive name="compression-comparer" type="in-page"}

In this chapter we'll look at how compression might be done, what the benefits are, and the costs associated with using compressed data that need to be considered when deciding whether or not to compress data.

We'll start with a simple example – Run Length Encoding – which gives some insight into the benefits and the issues around compression.

{panel type="teacher-note" summary="Locked in activity"}
An intriguing activity that relates to compression is the ["locked-in" activity](http://www.cs4fn.org/lockedin.html) from CS4FN.
In this activity, students simulate writing some text using a method used by Jean-Dominique Bauby, who was completely unable to move except for blinking one eye. With a simple binary interface (blinking or not blinking) he was able to author an entire book. It is well worth getting students to work in pairs, and have one try to communicate a word or short phrase strictly by blinking only. It raises many questions, including how it could be done in the shortest time and with the minimum effort. Of course, the first step is to work out how to convey any text at all!
{panel end}


## Run Length Encoding

{video url="http://www.youtube.com/embed/uaV2RuAJTjQ?rel=0"}

Run length encoding (RLE) is a technique that isn't so widely used these days, but it's a great way to get a feel for some of the issues around using compression.

{panel type="teacher-note" summary="Who uses run length encoding?"}
[Run-length_encoding](https://en.wikipedia.org/wiki/Run-length_encoding) was widely used when black and white images were the norm.
One of its key roles was as the compression method that made Fax (facsimile) machines possible in a standard that was adopted in 1980.
The pixels in a fax image are only black or white, and typically there are long runs of white pixels in the margins, so RLE is particularly effective.
Also, the method is very simple, and in the 1980s this was important since it reduced the cost of the electronics inside the machine.

Run length encoding is still used as part of JPEG compression, although not to code runs of pixels (in a photo it's unusual to have runs of exactly the same colour).

We have introduced RLE here because it is a practical approach to compression, and most importantly it shows the key benefits and problems that arise in compression.
{panel end}


Imagine we have the following simple black and white image.

{image filename="pixel-diamond.png" alt="A diamond shape made out of pixels"}

One very simple way a computer can store this image in binary is by using a format where '0' means white and '1' means black (this is a "bit map", because we've mapped the pixels onto the values of bits). Using this method, the above image would be represented in the following way:

```
011000010000110
100000111000001
000001111100000
000011111110000
000111111111000
001111101111100
011111000111110
111110000011111
011111000111110
001111101111100
000111111111000
000011111110000
000001111100000
100000111000001
011000010000110
```

{comment}
Interactive to make
low priority; interactive for images. If we were going to put in the interactive that takes the 1’s and 0’s and converts it into an image for the students, I’d want to put that in here. This would mostly be a convenience thing that allows students to easily see what an image looks like. We would also provide an interactive that can take a number representation and show the image for that. We do NOT want to provide a tool that converts between the 2; we want students to do the converting by hand. The tool will allow them to see if the images they got are the same though.
{comment end}

{panel type="curiosity" summary="The PBM file format"}
There is an image format that uses the simple one-symbol-per-pixel representation we have just described. The format is called "portable bitmap format" (PBM).
PBM files are saved with the file extension “.pbm”, and contain a simple header, followed by the image data.
The data in the file can be viewed by opening it in a text editor, much like opening a .txt file,
and the image itself can be viewed by opening it in a drawing or image viewing program that supports PBM files
(the format isn't very well supported, but a number of image viewing and editing programs can display them).
A pbm file for the diamond image used earlier would be as follows:

```
P1
15 15
011000010000110
100000111000001
000001111100000
000011111110000
000111111111000
001111101111100
011111000111110
111110000011111
011111000111110
001111101111100
000111111111000
000011111110000
000001111100000
100000111000001
011000010000110
```

The first two lines are the header.  The first line specifies the format of the file (P1 means that the file contains ASCII zeroes and ones). The second line specifies the width and then the height of the image in pixels. This allows the computer to know the size and dimensions of the image, even if the newline characters separating the rows in the file were missing.
The rest of the data is the image, just like above.
If you wanted to, you could copy and paste this representation (including the header) into a text file, and save it with the file extension .pbm.
If you have a program on your computer able to open PBM files, you could then view the image with it. You could even write a program to output these files, and then display them as images.

Because the digits are represented using ASCII in this format, it isn't very efficient, but it is useful if you want to read what's inside the file.
There are variations of this format that pack the pixels into bits instead of characters, and variations that can be used for grey scale and colour images. More [information about this format is available on Wikipedia](http://en.wikipedia.org/wiki/Netpbm_format).
{panel end}

The key question in compression is whether or not we can represent the same image using fewer bits, but still be able to reconstruct the original image.

It turns out we can. There are many ways of going about it, but in this section we are focussing on a method called *run length encoding*.

Imagine that you had to read the bits above out to someone who was copying them down... after a while you might say things like "five zeroes" instead of "zero zero zero zero zero". Is the basic idea behind run length encoding (RLE), which is used to save space for storing digital images.
In run length encoding, we replace each row with numbers that say how many consecutive pixels are the same colour, *always starting with the number of white pixels*. For example, the first row in the image above contains one white, two black, four white, one black, four white, two black, and one white pixel.

```
011000010000110
```

This could be represented as follows.

```
1, 2, 4, 1, 4, 2, 1
```

For the second row, because we need to say what the number of white pixels is before we say the number of black, we need to explicitly say there are zero at the start of the row.

```
100000111000001
```

```
0, 1, 5, 3, 5, 1
```

You might ask why we need to say the number of white pixels first, which in this case was zero. The reason is that if we didn't have a clear rule about which to start with, the computer would have no way of knowing which colour was which when it displays the image represented in this form!

The third row contains five whites, five blacks, five whites.

```
000001111100000
```

This is coded as:

```
5, 5, 5
```

That means we get the following representation for the first three rows.

```
1, 2, 4, 1, 4, 2, 1
0, 1, 5, 3, 5, 1
5, 5, 5
```

You can work out what the other rows would be following this same system.

{panel type="spoiler" summary="Representation for the remaining rows"}
The remaining rows are

```
4, 7, 4
3, 9, 3
2, 5, 1, 5, 2
1, 5, 3, 5, 1
0, 5, 5, 5
1, 5, 3, 5, 1
2, 5, 1, 5, 2
3, 9, 3
4, 7, 4
5, 5, 5
0, 1, 5, 3, 5, 1
1, 2, 4, 1, 4, 2, 1
```
{panel end}

{panel type="curiosity" summary="Run Length Encoding in the CS Unplugged show"}
In this video from a Computer Science Unplugged show, a Run length encoded image is decoded using very large pixels (the printer is a spray can!).

{video url="http://www.youtube.com/watch?v=VsjpPs146d8"}
{panel end}

### Converting Run Length Encoding back to the original representation

Just to ensure that we can reverse the compression process, have a go at finding the original representation (zeroes and ones) of this (compressed) image.

```
4, 11, 3
4, 9, 2, 1, 2
4, 9, 2, 1, 2
4, 11, 3
4, 9, 5
4, 9, 5
5, 7, 6
0, 17, 1
1, 15, 2
```

What is the image of? How many pixels were there in the original image? How many numbers were used to represent those pixels?

{panel type="spoiler" summary="Answer for the above image"}
This image is from the [CS Unplugged image representation activity](http://csunplugged.org/image-representation), and the solution is available in the activity (it is a cup and saucer).
{panel end}

The following interactive allows you to experiment further with Run Length Encoding.

{interactive name="run-length-encoding" type="whole-page"}

### Analysing Run Length Encoding

How much space have we saved using this alternate representation, and how can we measure it? One simple way to consider this is to imagine you were typing these representations, so you could think of each of the original bits being stored as one character, and each of the RLE codes using a character for each digit and comma (this is a bit crude, but it's a starting point).

In the original representation, 225 digits (ones and zeroes) were required to represent the image. Count up the number of commas and digits (but not spaces or newlines, ignore those) in the new representation. This is the number of characters required to represent the image with the new representation (to ensure you are on the right track, the first 3 rows that were given to you contain 29 characters).

Assuming you got the new image representation correct, and counted correctly, you should have found there are 119 characters in the new image (double check if your number differs). This means that the new representation only requires around 53% as many characters to represent (calculated using 119/225). This is a significant reduction in the amount of space required to store the image --- it's about half the size. The new representation is a *compressed* form of the old one.

{panel type="curiosity" summary="Run length coding representation in practice"}
In practice this method (with some extra tricks) can be used to compress images to about 15% of their original size. In real systems, the original image only uses one bit for every pixel to store the black and white values (not one character, which we used for our calculations).
However, the run length numbers are also stored much more efficiently, again using bit patterns that take very little space to represent the numbers.
The bit patterns used are usually based on a technique called Huffman coding, but that is beyond what we want to get into here.
{panel end}

### Where is Run Length Encoding used in practice?

The main place that black and white scanned images are used now is on fax machines, which use this approach to compression. One reason that it works so well with scanned pages the number of consecutive white pixels is huge. In fact, there will be entire scanned lines that are nothing but white pixels. A typical fax page is 200 pixels across or more, so replacing 200 bits with one number is a big saving. The number itself can take a few bits to represent, and in some places on the scanned page only a few consecutive pixels are replaced with a number, but overall the saving is significant. In fact, fax machines would take 7 times longer to send pages if they didn't use compression.

{panel type="project" summary="Using Run Length Encoding for yourself"}
Now that you know how run length encoding works, you can come up with and compress your own black and white image, as well as uncompress an image that somebody else has given you.

Start by making your own picture with ones and zeroes. (Make sure it is rectangular – all the rows should have the same length.)  You can either draw this on paper or prepare it on a computer (using a fixed width font, otherwise it can become really frustrating and confusing!) In order to make it easier, you could start by working out what you want your image to be on grid paper (such as that from a math exercise book) by shading in squares to represent the black ones, and leaving them blank to represent the white ones. Once you have done that, you could then write out the zeroes and ones for the image.

Work out the compressed representation of your image using run length coding, i.e. the run lengths separated by commas form that was explained above.

Now give a copy of the *compressed representation* (the run length codes, not the original uncompressed representation) to a friend or classmate, along with an explanation of how it is compressed. Ask them to try and draw the image on some grid paper. Once they are done, check their conversion against your original.

Imagining that you and your friend are both computers, by doing this you have shown that images using these systems of representations can be compressed on one computer, and decompressed on another, as long as you have standards that you've agreed on (e.g. that every line begins with a white pixel).
It is very important for compression algorithms to follow standards so that a file compressed on one computer can be decompressed on another;
for example, songs often follow the "mp3" standard so that when they are downloaded they can be played on a variety of devices.
{panel end}


### Lossy vs Lossless compression

As the compressed representation of the image can be converted back to the original representation, and both the original representation and the compressed representation would give the same image when read by a computer, this compression algorithm is called *lossless*, i.e. none of the data was lost from compressing the image, and as a result the compression could be undone exactly.

Not all compression algorithms are lossless though. In some types of files, in particular photos, sound, and videos, we are willing to sacrifice a little bit of the quality (i.e. lose a little of the data representing the image) if it allows us to make the file size a lot smaller. For downloading very large files such as movies, this can be essential to ensure the file size is not so big that it is infeasible to download! These compression methods are called *lossy*. If some of the data is lost, it is impossible to convert the file back to the exactly the original form when lossy compression was used, but the person viewing the movie or listening to the music may not mind the lower quality if the files are smaller. Later in this chapter, we will investigate the effects some lossy compression algorithms have on images and sound.

Interestingly, it turns out that any *lossless* compression algorithm will have cases where the compressed version of the file is larger than the uncompressed version! Computer scientists have even proven this to be the case, meaning it is impossible for anybody to ever come up with a lossless compression algorithm that makes *all* possible files smaller. In most cases this isn’t an issue though, as a good lossless compression algorithm will tend to give the best compression on common patterns of data, and the worst compression on ones that are highly unlikely to occur.

{panel type="challenge" summary="Best and worse cases of run length encoding"}
What is the image with the best compression (i.e. an image that has a size that is a very small percentage of the original) that you can come up with? This is the best case performance for this compression algorithm.

What about the worst compression? Can you find an image that actually has a *larger* compressed representation? (Don’t forget the commas in the version we used!) This is the worst case performance for this compression algorithm.
{panel end}

{panel type="spoiler" summary="Answer for above challenge"}
The best case above is when the image is entirely white (only one number is used per line).
The worst case is when every pixel is alternating white and black, so there's one number for every pixel.
In fact, in this case the size of the compressed file is likely to be a little larger than the original one because the numbers are likely to take more than one bit to store.
Real systems don't represent the data exactly as we've discussed here, but the issues are the same.
{panel end}

{panel type="curiosity" summary="Compression methods can expand files"}
In the worst case (with alternating black and white pixels) the run length encoding method will result in a file that's larger than the original!
As noted above, *every* lossless compression method that makes at least one file smaller must also have some files that it makes larger --- it's not
mathematically possible to have a method that always makes files smaller unless the method is lossy.
As a trivial example, suppose someone claims to have a compression method that will convert any 3-bit file into a 2-bit file.
How many different 3-bit files are there? (There are 8.) How many different 2-bit files are there? (There are 4.) Can you see the problem? We've got 8 possible files that we might want to compress, but only 4 ways to represent them. So some of them will have identical representations, and can't be decoded exactly.

Over the years there have been several frauds based on claims of a lossless compression method that will compress every file that it is given.
This can only be true if the method is lossy (loses information); all lossless methods must expand some files.
It would be nice if all files could be compressed without loss; you could compress a huge file, then apply compression to the compressed file, and make it smaller again, repeating this until it was only one byte --- or one bit!
Unfortunately, this isn't possible.
{panel end}

## Image compression using JPEG

Images can take up a lot of space, and most of the time that pictures are stored on a computer they are compressed to avoid wasting too much space.
With a lot of images (especially photographs), there's no need to store the image exactly as it was originally, because it contains way more detail than anyone can see.
This can lead to considerable savings in space, especially if the details that are missing are the kind that people have trouble perceiving.
This kind of compression is called lossy compression.
There are other situations where images need to be stored exactly as they were in the original, such as for medical scans or very high quality photograph processing, and in these cases lossless methods are used, or the images aren't compressed at all (e.g. using RAW format on cameras).

In the data representation section we looked at how the size of an image file can be reduced by using fewer bits to describe the colour of each pixel.
However, image compression methods such as JPEG take advantage of patterns in the image to reduce the space needed to represent it, without impacting the image unnecessarily.

The following three images show the difference between reducing bit depth and using a specialised image compression system. The left hand image is the original, which was 24 bits per pixel. The middle image has been compressed to one third of the original size using JPEG; while it is a "lossy" version of the original, the difference is unlikely to be perceptible. The right hand one has had the number of colours reduced to 256, so there are 8 bits per pixel instead of 24, which means it is also stored in a third of the original size. Even though it has lost just as many bits, the information removed has had much more impact on how it looks. This is the advantage of JPEG: it removes information in the image that doesn't have so much impact on the perceived quality. Furthermore, with JPEG, you can choose the tradeoff between quality and file size.

Reducing the number of bits (the colour depth) is sufficiently crude that we don't really regard it as a compression method, but just a low quality representation. Image compression methods like JPEG, GIF and PNG are designed to take advantage of the patterns in an image to get a good reduction in file size without losing more quality than necessary.

{image filename="compression-comparison.png"}

{comment}
.. xtcb low priority: these are all jpgs of the originals; consider replacing them with actual originals (as long as the browser can render them all).
.. ajb these images seem to appear in the wrong order to what is described for me… The middle one and left one should be swapped around?
{comment end}

For example, the following image shows a zoomed in view of the pixels that are part of the detail around an eye from the above (high quality) image.

{image filename="zoomed-eye.png"}

Notice that the colours in adjacent pixels are often very similar, even in this part of the picture that has a lot of detail. For example, the pixels shown in the red box below just change gradually from very dark to very light.

{image filename="zoomed-eye-highlighted.png"}

Run-length encoding wouldn't work in this situation. You could use a variation that specifies a pixel's colour, and then says how many of the following pixels are the same colour, but although most adjacent pixels are nearly the same, the chances of them being identical are very low, and there would be almost no runs of identical colours.

But there is a way to take advantage of the gradually changing colours. For the pixels in the red box above, you could generate an approximate version of those colours by specifying just the first and last one, and getting the computer to calculate the ones in between assuming that the colour changes gradually between them. Instead of storing 5 pixel values, only 2 are needed, yet someone viewing it probably might not notice any difference. This would be *lossy* because you can't reproduce the original exactly, but it would be good enough for a lot of purposes, and save a lot of space.

{panel type="jargon-buster" summary="Interpolation"}
{glossary-definition term="interpolation" definition="Working out values between some given values;
for example, if a sequence of 5 numbers starts with 3 and finishes with 11, we might interpolate the values 5, 7, 9 in between."}

The process of guessing the colours of pixels between two that are known is an example of
{glossary-link term="interpolation" reference-text="compressing images"}interpolation{glossary-link end}.
A *linear* interpolation assumes that the values increase at a constant rate between the two given values; for example, for the five pixels above, suppose the first pixel has a blue colour value of 124, and the last one has a blue value of 136,
then a linear interpolation would guess that the blue values for the ones in between are 127, 130 and 133, and this would save storing them.
In practice, a more complex approach is used to guess what the pixels are, but linear interpolation gives the idea of what's going on.
{panel end}

The JPEG system, which is widely used for photos, uses a more sophisticated version of this idea. Instead of taking a 5 by 1 run of pixels as we did above, it works with 8 by 8 blocks of pixels. And instead of estimating the values with a linear function, it uses combinations of cosine waves.

{comment}
It would be good have a figure that shows a line of pixels, and the corresponding waveform.
{comment end}

{panel type="curiosity" summary="What are cosine waves"}
A cosine wave form is from the trig function that is often used for calculating the sides of a triangle. If you plot the cosine value from 0 to 180 degrees, you get a smooth curve going from 1 to -1. Variations of this plot can be used to approximate the value of pixels, going from one colour to another. If you add in a higher frequency cosine wave, you can produce interesting shapes. In theory, any pattern of pixels can be created by adding together different cosine waves!

The following graph shows the values of {math}\sin(x){math end} and {math}\cos(x){math end} for {math}x{math end} ranging from 0 to 180 degrees.

{image filename="cosine-graph.png" alt="A graph showing cos(x) and sin(x) curves"}
{panel end}

{panel type="curiosity" summary="Adding sine or cosine waves to create any waveform"}
JPEGs (and MP3) are based on the idea that you can add together lots of sine or cosine waves to create any waveform that you want.
Converting a waveform for a block of pixels or sample of music into a sum of simple waves can be done using a technique called a [Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform), and is a widely used idea in signal processing.

You can experiment with adding sine waves together to generate other shapes using the
[spreadsheet provided](files/Adding-Sine-Waves.xls).
In this spreadsheet, the yellow region on the first sheet allows you to choose which sine waves to add.
Try setting the 4 sine waves to frequencies that are 3, 9, 15, and 21 times the fundamental frequency respectively (the "fundamental" is the lowest frequency.)
Now set the "amplitude" (equivalent to volume level) of the four to 0.5, 0.25, 0.125 and 0.0625 respectively (each is half of the previous one).
This should produce the following four sine waves:

{image filename="sine-waves.png" alt="Four sine waves"}

When the above four waves are added together, they interfere with each other, and produce a shape that has sharper transitions:

{image filename="sine-waves-sum.png" alt="The four sine waves added together"}

In fact, if you were to continue the pattern with more than four sine waves, this shape would become a "square wave", which is one that suddenly goes to the maximum value, and then suddenly to the minimum.
The one shown above is bumpy because we've only used 4 sine waves to describe it.

This is exactly what is going on in JPEG if you compress a black and white image.
The "colour" of pixels as you go across the image will either be 0 (black) or full intensity (white), but JPEG will approximate it with a small number of cosine waves (which have basically the same properties as sine waves.)
This gives the "overshoot" that you see in the image above; in a JPEG image, this comes out as bright and dark patches surrounding the sudden change of colour, like here:

{image filename="jpeg-word-zoomed.jpg"}

You can experiment with different combinations of sine waves to get different shapes.
You may need to have more than four to get good approximations to a shape that you want; that's exactly the tradeoff that JPEG is making.
There are some suggestions for parameters on the second sheet of the spreadsheet.

You can also learn about Fourier transforms using the Wolfgram Alpha software; this will require you to install a browser plugin.
The Wolfgram demonstrations include:
[an interactive demonstration of JPEG](http://demonstrations.wolfram.com/JPEGCompressionAlgorithm/),
[showing the relationship between sine saves and creating other waveforms](http://demonstrations.wolfram.com/RecoveringTheFourierCoefficients/), and
[showing how sine waves can be summed to produce other shapes](http://demonstrations.wolfram.com/SumsOfSineWavesWithSeveralStepSizesSawtoothOrSquareApproxima/).

{panel end}

{comment}
.. html5 low priority interactive to add cosine waves to try to match a given waveform e.g. square wave, triangle, random. Select amplitude for various frequencies. I have a spreadsheet that basically does this, could put it in for the meantime - tim
{comment end}

You can see the 8 by 8 blocks of pixels if you zoom in on a heavily compressed JPEG image. For example, the following image has been very heavily compressed using JPEG (it is just 1.5% of its original size).

{image filename="compressed-jpeg.png"}

If we zoom in on the eye area, you can see the 8 x 8 blocks of pixels:

{image filename="compressed-jpeg-zoomed.png"}

Notice that there is very little variation across each block. In the following image the block in the red box only changes from top to bottom, and could probably be specified by giving just two values, and having the ones in between calculated by the decoder as for the line example before. The green square only varies from left to right, and again might only need 2 values stored instead of 64. The blue block has only one colour in it! The yellow block is more complicated because there is more activity in that part of the image, which is where the cosine waves come in. A "wave" value varies up and down, so this one can be represented by a left-to-right variation from dark to light to dark, and a top-to-bottom variation mainly from dark to light. Thus still only a few values need to be stored instead of the full 64.

{image filename="compressed-jpeg-zoomed-highlighted.png"}

The quality is quite low, but the saving in space is huge – it's more than 60 times smaller (for example, it would download 60 times faster). Higher quality JPEG images store more detail for each 8 by 8 block, which makes it closer to the original image, but makes bigger files because more details are being stored. You can experiment with these tradeoffs by saving JPEGs with differing choices of the quality, and see how the file size changes. Most image processing software offers this option when you save an image as a JPEG.

{comment}
low priority : interactive that could load a photo, zoom in on pixels, and change it to different qualities of jpg coding
{comment end}

{panel type="jargon-buster" summary="Where does the term JPEG come from?"}
The name "JPEG" is short for "Joint Photographic Experts Group", a committee that was formed in the 1980s to create standards so that digital photographs could be captured and displayed on different brands of devices. Because some file extensions are limited to three characters, it is often seen as the ".jpg" extension.
{panel end}

{panel type="curiosity" summary="More about cosine waves"}
The cosine waves used for JPEG images are based on a "Discrete Cosine Transform". The "Discrete" means that the waveform is digital – it is the opposite of continuous, where any value can occur. In a JPEG wave, there are only 8 x 8 values (for the block being coded), and each of those values can have a limited range of numbers (binary integers), rather than any value at all.
{panel end}

An important issue arises because JPEG represents images as smoothly varying colours: what happens if the colours change suddenly?
In that case, lots of values need to be stored so that lots of cosine waves can be added together to make the sudden change in colour, or else the edge of the image become fuzzy.
You can think of it as the cosine waves overshooting on the sudden changes, producing artifacts like the ones in the following image where the edges are messy.

{image filename="jpeg-word.jpg"}

The original had sharp edges, but this zoomed in view of the JPEG version of it show that not only are the edges gradual, but some darker pixels occur further into the white space, looking a bit like shadows or echoes.

{image filename="jpeg-word-zoomed.jpg"}

For this reason, JPEG is used for photos and natural images, but other techniques (such as GIF and PNG, which we will look at in another section) work better for artificial images like this one.

{comment}
.. xjrm low priority create an image like the one in this link, with one, two three waveforms added http://mathworld.wolfram.com/images/eps-gif/FourierSeriesSquareWave_800.gif (then Tim to add some text)

.. xhtml5 interactive (medium priority): allow user to switch on and off the 64 basis vectors (http://en.wikipedia.org/wiki/File:Dctjpeg.png) and see the combined result

.. http://www.cs4fn.org/films/jpegit.php
{comment end}

{comment}
## Image compression using GIF and PNG

appearing soon!

.. http://www.cs4fn.org/films/jpegit.php CS4FN on Jpeg and

.. Students should discuss the basics of how one of them works (Not entirely sure how to approach this without it becoming a paraphrase, need to think about it). I’m thinking that an explanation of what it means for a compression algorithm to be lossy is important here.

.. images from compression lectures chapter 10

.. GIF and PNG use a palette; GIF strictly 256 bits - lossless, except GIF reduces colour depth; use LZ - see general purpose
.. best for images that don't have a big variety of colour e.g. cartoons, icons . These sorts of images don't work so well with JPEG compression because it isn't so good at sharp edges.
.. choosing right compression method is important

{comment end}


## General purpose compression

General purpose compression methods need to be lossless because you can't assume that the user won't mind if the data is changed. The most widely used general purpose compression algorithms (such as ZIP, gzip, and rar) are based on a method called "Ziv-Lempel coding", invented by Jacob Ziv and Abraham Lempel in the 1970s.

We'll look at this with a text file as an example.
The main idea of Ziv-Lempel coding is that sequences of characters are often repeated in files (for example, the sequence of characters "image " appears often in this chapter), and so instead of storing the repeated occurrence, you just replace it with a reference to where it last occurred. As long as the reference is smaller than the phrase being replaced, you'll save space. Typically this systems based on this approach can be used to reduce text files to as little as a quarter of their original size, which is almost as good as any method known for compressing text.

The following interactive allows you to explore this idea.
The empty boxes have been replaced with a reference to the text occurring earlier.
You can click on a box to see where the reference is, and you can type the referenced characters in to decode the text.
What happens if a reference is pointing to another reference?
As long as you decode them from first to last, the information will be available before you need it.

{comment}
.. xhtml5 Eventually this could use a parameter so there's one version with no tabs, and a later one with them.
{comment end}

{button link="http://www.csfieldguide.org.nz/_static/widgets/COMPRESSION/LWZ/public_html/index.html" text="View compression interactive"}

{comment}
.. xjrm (or Rhem): pasting text in that is too big causes it to be rejected. It would be nicer if the pasted text is truncated to the maximum length.
{comment end}

You can also enter your own text by clicking on the "Text" tab.
You could paste in some text of your own to see how many characters can be replaced with references.

The references are actually two numbers: the first says how many characters to count back to where the previous phrase starts, and the second says how long the referenced phrase is.
Each reference typically takes about the space of one or two characters, so the system makes a saving as long as two characters are replaced.
The options in the interactive above allow you to require the replaced length to be at least two, to avoid replacing a single character with a reference.
Of course, all characters count, not just letters of the alphabet, so the system can also refer back to the white spaces between words.
In fact, some of the most common sequences are things like a full stop followed by a space.

This approach also works very well for black and white images, since sequences like "10 white pixels" are likely to have occurred before.
Here are some of the bits from the example earlier in this chapter; you can paste them into the interactive above to see how many pointers are needed to represent it.

```
011000010000110
100000111000001
000001111100000
000011111110000
000111111111000
001111101111100
011111000111110
111110000011111
```

In fact, this is essentially what happens with GIF and PNG images; the pixel values are compressed using the Ziv-Lempel algorithm, which works well if you have lots of consecutive pixels the same colour. But it works very poorly with photographs, where pixel patterns are very unlikely to be repeated.

{comment}
.. xtcb extra for experts: compress "aaaaaaaaaa". how can it decode?

.. xtcb  Project
.. Students should try an algorithm [zip, gzip etc.] on several different text files, image files, sound files, and video files.
.. What would happen if text compression was lossy? (I think this should be a part of their merit discussion)
{comment end}

{panel type="teacher-note" summary="Unplugged activity on Ziv-Lempel approach"}
The [CS Unplugged site has activities and information about the Ziv-Lempel approach](http://csunplugged.org/text-compression),
and the ["Computing Science Inside" site also has an activity based on this method](http://csi.dcs.gla.ac.uk/workshop-view.php?workshopID=1).
The CS4FN site discusses [a related approach which is a little simpler, but not so useful in practice](http://www.cs4fn.org/internet/crushed.php).
{panel end}

{panel type="curiosity" summary="ZL or LZ compression?"}
The method we have described here is named “Ziv-Lempel” compression after Jacob Ziv and Abraham Lempel, the two computer scientists who invented it in the 1970s. Unfortunately someone mixed up the order of their names when they wrote an article about it, and called it “LZ” compression instead of “ZL” compression. So many people copied the mistake that Ziv and Lempel’s method is now usually called “LZ compression”!
{panel end}

## Audio compression

One of the most widely used methods for compressing music is MP3, which is actually from a video compression standard called MPEG (Moving Picture Experts Group).


{panel type="curiosity" summary="The naming of mp3"}
The name "mp3" isn't very self explanatory because the "mp" stands for "moving picture", and the 3 is from version 1, but mp3 files are used for music!

The full name of the standard that it comes from is MPEG, and the missing "EG" stands for "experts group", which was a consortium of companies and researchers that got together to agree on a standard so that people could easily play the same videos on different brands of equipment (so, for example, you could play the same DVD on any brand of DVD player).
The very first version of their standards (called MPEG-1) had three methods of storing the sound track (layer 1, 2 and 3).
One of those methods (MPEG-1 layer 3) became very popular for compressing music, and was abbreviated to MP3.

The MPEG-1 standard isn't used much for video now (for example, DVDs and TV mainly use MPEG-2), but it remains very important for audio coding.

The next MPEG version is MPEG-4 (MPEG-3 was redundant before it became a standard).
MPEG-4 offers higher quality video, and is commonly used for digital video files, streaming media, Blu-Ray discs and some broadcast TV.
The Apple AAC audio compression method is also from the MPEG-4 standard.
On computers, MPEG-4 Part 14 is commonly used for video, and it's often abbreviated as "MP4."

So there you have it: MP3 stands for "MPEG-1 layer 3", and MP4 stands for "MPEG-4 part 14".
{panel end}

Most other audio compression methods use a similar approach to the MP3 method, although some offer better quality for the same amount of storage (or less storage for the same quality).
We won't go into exactly how this works, but the general idea is to break the sound down into bands of different frequencies, and then represent each of those bands by adding together the values of a simple formula (the sum of cosine waves, to be precise).

{comment}
.. xtcb sometime could put in an expert section on this, perhaps with recordings or a filter showing the waveforms and adding them. Here are some links in the meantime:
{comment end}

There is some [more detail about how MP3 coding works on the cs4fn site](http://www.cs4fn.org/mathemagic/sonic.html), and also in [an article on the I Programmer site](http://www.i-programmer.info/babbages-bag/1222-mp3.html).

Other audio compression systems that you might come across include AAC, ALAC, Ogg Vorbis, and WMA. Each of these has various advantages over others, and some are more compatible or open than others.

The main questions with compressed audio are how small the file can be made, and how good the quality is of the human ear. (There is also the question of how long it takes to encode the file, which might affect how useful the system is.)
The tradeoff between quality and size of audio files can depend on the situation you're in: if you are jogging and listening to music then the quality may not matter so much, but it's good to reduce the space available to store it.
On the other hand, someone listening to a recording at home on a good sound system might not mind about having a large device to store the music, as long as the quality is high.

To evaluate an audio compression you should choose a variety of recordings that you have high quality originals for, typically on CD (or using uncompressed WAV or AIFF files). Choose different styles of music, and other kinds of audio such as speech, and perhaps even create a recording that is totally silent. Now convert these recordings to different audio format. One system for doing this that is free to download is Apple's iTunes, which can be used to rip CDs to a variety of formats, and gives a choice of settings for the quality and size.
A lot of other audio systems are able to convert files, or have plugins that can do the conversion.

Compress each of your recordings using a variety of methods, making sure that each compressed file is created from a high quality original. Make a table showing how long it took to process each recording, the size of the compressed file, and some evaluation of the quality of the sound compared with the original. Discuss the tradeoffs involved – do you need much bigger files to store good quality sound? Is there a limit to how small you can make a file and still have it sounding ok? Do some methods work better for speech than others? Does a 2 minute recording of silence take more space than a 1 minute recording of silence? Does a 1 minute recording of music use more space than a minute of silence?

{comment}
.. xtcb could have a section on Huffman coding sometime (remove from "the whole story")
{comment end}

## The whole story!

The details of how compression systems work have been glossed over in this chapter, as we have been more concerned about the file sizes and speed of the methods than how they work.
Most compression systems are variations of the ideas that have been covered here, although one fundamental method that we haven't mentioned is Huffman coding, which turns out to be useful as the final stage of *all* of the above methods, and is often one of the first topics mentioned in textbooks discussing compression (there's a brief [explanation of it here](http://www.cimt.plymouth.ac.uk/resources/codes/codes_u17_text.pdf).
A closely related system is Arithmetic coding (there's an [explanation of it here](http://www.cimt.plymouth.ac.uk/resources/codes/codes_u18_text.pdf).
Also, video compression has been omitted, even though compressing videos saves more space than most kinds of compression.
Most video compression is based on the "MPEG" standard (Moving Pictures Experts Group). There is some information about how this works in the [CS4FN article on "Movie Magic"](http://www.cs4fn.org/films/mpegit.php).

{panel type="teacher-note" summary="Teacher guides for Plymouth resources"}
Access to teacher guides for the Plymouth resources (linked in the previous paragraph) above are [available here](http://www.cimt.plymouth.ac.uk/resources/codes/>).
{panel end}

The Ziv-Lempel method shown is a variation of the so-called "LZ77" method. Many of the more popular lossless compression methods are based on this, although there are many variations, and one called "LZW" has also been used a lot. Another high-compression general-purpose compression method is bzip, based on a very clever method called the Burrows-Wheeler Transform.

Questions like "what is the most compression that can be achieved" are addressed by the field of [information theory](http://en.wikipedia.org/wiki/Information_theory). There is an [activity on information theory on the CS Unplugged site](http://csunplugged.org/information-theory), and there is a [fun activity that illustrates information theory](http://www.math.ucsd.edu/~crypto/java/ENTROPY/). Based on this theory, it seems that English text can't be compressed to less than about 12% of its original size at the very best. Images, sound and video can get much better compression because they can use lossy compression, and don't have to reproduce the original data exactly.

{comment}
.. xtcb jargon uncompressed are typically BMP or RAW. TIFF files Tagged Image File Format can contain many formats, including uncompressed, runlength and JPEG.
{comment end}

## Further reading

- "The Data Compression Book" by Mark Nelson and Jean-Loup Gailly is a good overview of this topic
- A list of books on this topic (and lots of other information about compression) is available from [The Data Compression Site](http://www.data-compression.info/Books/>).
- Gleick's book "The Information" has some background to compression, and coding in general.


### Useful Links

- Images, run-length-coding [http://csunplugged.org/image-representation](http://csunplugged.org/image-representation) This is also relevant to binary representations in general, although is probably best used in the compression section.
- There is a detailed section on [JPEG encoding on Wikipedia](http://en.wikipedia.org/wiki/Jpeg).
- Text compression [http://csunplugged.org/text-compression](http://csunplugged.org/text-compression)
