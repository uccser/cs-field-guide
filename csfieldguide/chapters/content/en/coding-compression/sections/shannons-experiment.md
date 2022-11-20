# Shannon's experiment

It turns out that there are limits to how small we can compress a file, and to explore this we’re going to look at multi-million dollar frauds, and a fun game that exposes the limits of compression.

Every so often someone claims to have invented an amazing {glossary-link term="lossless"}lossless{glossary-link end} compression method that can compress *any* file, including compressed files. If that was true, it would mean that you could use the method to compress files down to just a few {glossary-link term="byte"}bytes{glossary-link end}. Any file could be downloaded in a fraction of a second, and computers could store billions of huge video files. It would revolutionise computing! But is there a limit on how small a file can be compressed?

{panel type="curiosity"}

# Fraud in data compression

A number of fake systems have been produced that claim to compress any file as small as you want.
They have even been demonstrated! But they all turn out to be a fake system - the common trick is to have a “compression” program that actually just hides the file being compressed somewhere else on a computer, and replaces it with a tiny file. The decompression program copies the hidden file back. It’s a very simple program to write, and looks very impressive because files are replaced with tiny ones, and then reproduced exactly.

You can find a few examples of these if you search for “Pixelon”, “Adam’s platform”, “Near Zero”, or “Madison Priest” (add the terms “compression” and “fraud” if you are searching for these, as there are other legitimate organisations with similar names). Several of these organisations have taken millions of dollars from investors who didn’t understand the limits of compression, and all ended up failing.

{panel end}

## How small can we compress a file?

With {glossary-link term="lossy"}lossy{glossary-link end} compression, there isn’t a limit to how small you can compress a file, since it’s just a matter of giving up quality to make the file smaller. You could compress a 10-megapixel photo down to just one pixel (perhaps the average colour of the whole photo). It wouldn’t be much use to anyone, but technically it’s a lossy version of the original photo.

But with lossless compression, the original file needs to be able to be restored to exactly its original form.

We’ve seen that compression works by taking advantage of patterns in the data being compressed. 
In the 1950s an interesting experiment was developed by a scientist called Claude Shannon, in which he asked humans to predict English text, and he measured how good the compression would be using their ability to make predictions. 
The idea is that if a computer was as good at English as a human, then that might be near the limit of what is possible.

Shannon’s game is easy to play.
Just click on the letter that you think is coming up next in the sentence (you’ll need to start by guessing the first letter). The number of guesses you make give an indication of how predictable the letter is. 
These guesses are used to estimate how small the data could be compressed -- you can see this estimate by clicking on the “Show statistics” button.
The “bits per character” is the estimate of how many bits would be needed on average to represent each character. 
Plain English text is often stored in 7 or 8 bits for each character (using Unicode or ASCII), and you should find that using your predictions the experiment can do better than that, usually around 2 bits per character.
That’s equivalent to compressing a normal file (8 bits per character) to a quarter of its size.

Try it here:

{interactive slug="shannon-experiment" type="whole-page" alt="Shannon's experiment"}

But it’s very hard to get smaller than 1 bit per character (one eighth of the normal size). 
Shannon found that this seems to be a limit for how much we can compress English text.
And this is one reason that we should be suspicious of any system that claims to compress English text to much smaller than one eighth of its original size.

{panel type="teacher-note"}

# Creating your own experiment

This interactive contains an option to create your own experiment. 
For example, this could be used to tailor the sentence set to use words that are more familiar to your students.

Additionally we have support for multiple different languages and sentence sets. 
Currently, we have a sentence set for Te Reo Māori, and the original sentences used by Shannon in 1951. 

If you would like to use another language with a different set of characters and/or accents, this also works!
When creating a custom sentence, any characters that aren't already on the keyboard get added automatically.

Lastly, you could also considering using a pattern that is easily guessed once they realise what is happening, such as "AAAAAAAAAAAAAAAA", "ABABABABABAB", or "blah blah blah blah blah blah blah blah blah blah".
These have very close to zero information content as they are very predictable.
At the other extreme, a (fake) passowrd such as "P6dQKg#S58dw66p" could be used to explore how hard it is to guess random characters.

{panel end}

{comment - could add more about Shannon, model at sender and received, movie about him}
