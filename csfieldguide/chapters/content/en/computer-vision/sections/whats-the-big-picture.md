# What's the big picture?

With increases in computer power, the decrease in the size of computers and progressively more advanced algorithms, computer vision has a growing range of applications.
While it is commonly used in fields like healthcare, security and manufacturing, we are finding more and more uses for them in our everyday life, too.

For example, here is a sign written in Chinese:

{image file-path="img/chapters/no-smoking-sign.jpg" alt="Visual computing: translating a sign"}

If you can’t read the Chinese characters, there are apps available for smartphones that can help:

{image file-path="img/chapters/no-smoking-sign-translated.png" alt="Visual computing: translating a sign"}

Having a small portable device that can "see" and translate characters makes a big difference for travellers.
Note that the translation given is only for the second part of the phrase (the last two characters).
The first part says "please don’t", so it could be misleading if you think it’s translating the whole phrase!

Recognition of Chinese characters may not work perfectly every time, though.
Here is a warning sign:

{image file-path="img/chapters/steep-sign-translated.jpg" alt="Visual computing: translating a sign"}

This app has been able to translate the "careful" and "steep" characters, but it hasn’t recognised the last character in the line.
Why do you think that might be?

{panel type="teacher-note"}

# The importance of image segmentation

The last character is more difficult to recognise because the picture of the stick figure on a steep slope is too close to the character.
The app can’t tell where the character ends and the picture begins.
This is a problem of *image segmentation*, which we will look at later.

{panel end}

Giving users more information through computer vision is only one part of the story.
Capturing information from the real world allows computers to assist us in other ways too.
In some places, computer vision is already being used to help car drivers to avoid collisions on the road; warning them when other cars are too close or if there are other hazards on the road ahead.
Combining computer vision with map software, people have now built cars that can drive to a destination without needing a human driver to steer them.
A wheelchair guidance system can take advantage of vision to avoid bumping into doors, making it much easier to operate for someone with limited mobility.
