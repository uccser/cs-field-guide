# AS91887 (1.11)

## Demonstrate understanding of compression coding for a chosen media type

Data compression is widely used to reduce the size of files.
This standard focuses on the technical elements of how the algorithms work to achieve compression, and is an extension of earlier progress outcomes in Computational Thinking that look at how data is represented on computers.
Simple (uncompressed) representations may be familiar to students who have studied DT previously; compression uses more complex representation to reduce the space.
While the quality of a compressed image or sound is relevant, a common mistake is for students to focus more on this than the actual algorithm that is applied to the data to change its representation and make it smaller.

The general idea of changing the coding of data from a simple representation is introduced in the [short chapter on "coding"](chapters/coding-introduction.html).
[Compression is covered in its own chapter](chapters/coding-compression.html).

An important concept to get straight is "lossless" vs "lossy" compression; students should make sure that they are clear on the difference between those two similar-sounding ideas that have opposite meanings!

The achieved level of the standard covers "lossless" methods.
A simple lossless method is [run-length coding](chapters/coding-compression.html#run-length-encoding).
This is suitable for the "achieved" level of the standard, but the merit criteria require an evaluation, which is challenging without a detailed understanding of how it is implemented in practice.
The excellence criteria include "real-world" applications, and although run-length coding is used on fax machines, but these are becoming uncommon.
It is also used as part of JPEG compression, but the way it is used is part of a complex combination of codes, and explaining this well

The [next section on JPEG](chapters/coding-compression.html#image-compression-using-jpeg) covers the common lossy method for compressing photographs.
This method is good to use as an example of a lossy method, and human perception can be demonstrated by saving images at various levels of compression from an image editing program - students can compare the quality of the image with the amount of space it takes to store, and explain this in terms of how general principle that JPEG uses.
Good files to use to evaluate JPEG compression include images containing human faces, an image that is all one colour, an image that is very random (such as a photo of a very detailed surface), and a black-and-white image.
Results should be displayed in a well organised table showing any trends found in the experiment, and images should be shown to demonstrate the quality.
When showing images, think about how the examiner will see them, and consider zooming in on issues rather than relying on it coming out in a printed report.

The [section on "General purpose" compression](chapters/coding-compression.html#general-purpose-compression) is about a commonly used lossless method, Ziv-Lempel coding.
This is a good example of a lossless method, and because it is used in common systems like `zip` and `rar`, the amount of compression on different types of files can be compared by using these programs.
Students could evaluate the compression on files such as a large amount of English text, a file containing a single character repeated thousands of times, a large file containing a foreign language text, and a file containing random characters.
The results should be presented clearly in a table showing the results from these experiments.
