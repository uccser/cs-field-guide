# Lossy vs Lossless compression

As the compressed representation of the image can be converted back to the original representation, and both the original representation and the compressed representation would give the same image when read by a computer, run length encoding and Huffman coding are called {glossary-link term="lossless"}lossless{glossary-link end}, i.e. none of the data was lost from compressing the image, and as a result the compression could be undone exactly.

Not all compression algorithms are lossless though.
In some types of files, in particular photos, sound, and videos, we are willing to sacrifice a little bit of the quality (i.e. lose a little of the data representing the image) if it allows us to make the file size a lot smaller.
For downloading very large files such as movies, this can be essential to ensure the file size is not so big that it is infeasible to download! These compression methods are called {glossary-link term="lossy"}lossy{glossary-link end}.
If some of the data is lost, it is impossible to convert the file back to the exact original form when lossy compression was used, but the person viewing the movie or listening to the music may not mind the lower quality if the files are smaller.
Later in this chapter, we will investigate the effects some lossy compression algorithms have on images and sound.

Interestingly, it turns out that any *lossless* compression algorithm will have cases where the compressed version of the file is larger than the uncompressed version!
Computer scientists have even proven this to be the case, meaning it is impossible for anybody to ever come up with a lossless compression algorithm that makes *all* possible files smaller.
In most cases this isn’t an issue though, as a good lossless compression algorithm will tend to give the best compression on common patterns of data, and the worst compression on ones that are highly unlikely to occur.

{panel type="challenge"}

# Best and worst cases of run length encoding

What is the image with the best compression (i.e. an image that has a size that is a very small percentage of the original) that you can come up with?
This is the best case performance for this compression algorithm.

What about the worst compression?
Can you find an image that actually has a *larger* compressed representation (don’t forget the commas in the version we used!)?
This is the worst case performance for this compression algorithm.

{panel end}

{panel type="spoiler"}

# Answer for above challenge

The best case above is when the image is entirely white (only one number is used per line).
The worst case is when every pixel is alternating black and white, so there's one number for every pixel.
In fact, in this case the size of the compressed file is likely to be a little larger than the original one because the numbers are likely to take more than one bit to store.
Real systems don't represent the data exactly as we've discussed here, but the issues are the same.

{panel end}

{panel type="curiosity"}

# Compression methods can expand files

In the worst case (with alternating black and white pixels) the run length encoding method will result in a file that's larger than the original!
As noted above, *every* lossless compression method that makes at least one file smaller must also have some files that it makes larger &ndash; it's not
mathematically possible to have a method that always makes files smaller unless the method is lossy.
As a trivial example, suppose someone claims to have a compression method that will convert any 3-bit file into a 2-bit file.
How many different 3-bit files are there? (There are 8.)
How many different 2-bit files are there? (There are 4.)
Can you see the problem?
We've got 8 possible files that we might want to compress, but only 4 ways to represent them.
So some of them will have identical representations, and can't be decoded exactly.

Over the years there have been several frauds based on claims of a lossless compression method that will compress every file that it is given.
This can only be true if the method is lossy (loses information); all lossless methods must expand some files.
It would be nice if all files could be compressed without loss; you could compress a huge file, then apply compression to the compressed file, and make it smaller again, repeating this until it was only one byte &ndash; or one bit!
Unfortunately, this isn't possible.

{panel end}
