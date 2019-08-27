# The whole story!

The kind of image representations covered here are the basic ones used in most digital systems, and the main point of this chapter is to understand how digital representations work, as well as the compromises needed between the number of bits, storage used, and quality.

The colour representation discussed is what is often referred to as "raw" or "bitmap" (bmp) representation.
For large images, real systems use compression methods such as JPEG, GIF or PNG to reduce the space needed to store an image, but at the point where an image is being captured or displayed it is inevitably represented using the raw bits as described in this chapter, and the basic choices for capturing and displaying images will affect the quality and cost of a device.
{glossary-link term="compression"}Compression{glossary-link end} is regarded as a form of encoding, and is covered in a later chapter.

The representation of numbers is a whole area of study in itself.
The choice of representation affects how quickly arithmetic can be done on the numbers, how accurate the results are, and how much memory or disk space is used up storing the data.
Even integers have issues like the order in which a large number is broken up across multiple bytes.
Floating point numbers generally follow common standards (the IEEE 754 standard is the most common one) to make it easy to design compatible hardware to process them.
Spreadsheets usually store numbers using a floating point format, which limits the precision of calculations (typically about 64 bits are used for each number).
There are many experiments that can be done (such as calculating 1/3, or adding a very large number to a very small one) that demonstrate the limitations of floating point representations.
