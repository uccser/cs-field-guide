# AS91887 (1.11)

## Demonstrate understanding of compression coding for a chosen media type

Data compression is widely used to reduce the size of files.
This standard focuses on the technical elements of how the algorithms work to achieve compression, and is an extension of earlier progress outcomes in Computational Thinking that look at how data is represented on computers.
Simple (uncompressed) representations may be familiar to students who have studied DT previously; compression uses more complex binary representations to reduce the space.
While the quality of a compressed image or sound is relevant, a common mistake is for students to focus more on this than the actual algorithm that is applied to the data to change its representation and make it smaller.

The general idea of changing the coding of data from a simple representation is introduced in the [short chapter on "coding"](chapters/coding-introduction.html).
[Compression is covered in its own chapter](chapters/coding-compression.html).

An important concept to get straight is "lossless" vs "lossy" compression; students should make sure that they are clear on the difference between these two similar-sounding ideas that have opposite meanings, as the standard uses both of them in different places!

The achieved level of the standard covers "lossless" methods.
A simple lossless method is [run-length coding](chapters/coding-compression.html#run-length-encoding).
This is suitable for the "achieved" level of the standard, but the merit criteria require an evaluation, which is challenging without a detailed understanding of how it is implemented in practice.
The excellence criteria include "real-world" applications, and although run-length coding is used on fax machines, these are becoming uncommon, so might not be accepted as a "real world" application.
Run length coding is also used as part of JPEG compression, but the way it is used is part of a complex combination of codes, and explaining this well would involve understanding the Discrete Cosine Transform, quantisation, and the Huffman code.

The [next section on JPEG](chapters/coding-compression.html#image-compression-using-jpeg) covers the common lossy method for compressing photographs.
JPEG is good to use as an example of a lossy method, and human perception can be demonstrated by saving images at various levels of compression from an image/photo editing program that allows you to choose the quality of the file being saved - students can compare the quality of the image with the amount of space it takes to store, and explain this in terms of how the general principle that JPEG uses.
Good files to use to evaluate JPEG compression include images containing human faces, an image that is all one colour, an image that is very random (such as a photo of a very detailed surface), and a black-and-white image.
Results should be displayed in a well organised table showing any trends found in the experiment, and images should be shown to demonstrate the quality.
When showing images, think about how the examiner will see them, and consider zooming in on issues rather than relying on it coming out in a (badly) printed report.
Explaining the method in detail requires an understanding of the DCT, quantisation and Huffman codes.
These can look rather mathematical to some students, but the maths used is the cosine function (which are a basic trig concept) and rounding (for quantisation), so it isn't beyond what some year 11 students will have studied.
The interactives in the chapter provide the ability to do personalised explanations, since your own photo can be loaded, and the DCT parameters for it can be calculated online, and explained.

The [section on "General purpose" compression](chapters/coding-compression.html#general-purpose-compression) is about a commonly used lossless method, Ziv-Lempel (LZ) coding.
This is a good example of a lossless method, because it is used in common systems like ZIP and RAR (as well as GIF and PNG image files), which means that the amount of compression on different types of files can be compared by using these programs.
Students could evaluate the compression on files such as a large amount of English text, a file containing a single character repeated thousands of times, a large file containing a foreign language text, and a file containing random characters.
It could also be evaluated using PNG files with a range of images such as a limited range of colours, random pixels, and more complex images.
The results should be presented clearly in a table showing the file sizes from these experiments in a meaningful way, including units (for example, megabytes).

The [section on Huffman coding](chapters/coding-compression.html#huffman-coding) explains a method that is used as part of nearly every compression method.
It has been used in the past as a lossless compression method in its own right, but it isn't used on its own in practice because LZ coding works better.
It could be used for the achieved requirement of the standard ("showing how a lossless compression method works"), and in principle it enables "real-world" compression methods, but showing how it fits into them will require some care (e.g. LZ coding uses Huffman coding to represent the pointers, and JPEG uses Huffman coding to represent the run-length coded quantised values).
As with everything in these standards, students should make sure they understand the broad implications of what they are writing about, and not just latch on to one aspect of an idea, as this can leave markers wondering if they really understand the topic!
