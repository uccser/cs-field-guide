# What's the big picture?

Movie and gaming companies can't always use existing software to make the next great thing &ndash; they need computer scientists to come up with better graphics techniques to make something that's never been seen before.
The creative possibilities are endless!

Computer graphics are used in a wide variety of situations: games and animated movies are common examples, but graphics techniques are also used to visualise large amounts of data (such as all cellphone calls being made in one day or friend connections in a social network), to display and animate graphical user interfaces, to create virtual reality and augmented reality worlds, and much more.

{comment talk about visualisation of data - any nice examples?}

{panel type="jargon-buster"}

# Pixels

A digital image on a screen or printer is physically made up of a grid of tiny squares called {glossary-link term="pixel" reference-text="definition"}pixels{glossary-link end}.
They are usually too small to see easily (otherwise the image would look blocky).
The resolution of a modern camera is usually measured in megapixels.
One megapixel is a million pixels; for example, a 4k TV screen (3840 pixels across and 2160 down) has 8,294,400 pixels, or 8.3 megapixels!

The pixel is fundamental to computer graphics.
A lot of the work of a computer graphics programmer is in taking some abstract idea (such as objects in a scene), and working out what colour each pixel should be to trick the viewer into seeing that idea.
A digital camera also does this &ndash; but it just senses the colour falling on each of its millions of sensors, and stores those so that the pixels can be displayed when needed.

{panel end}

In this chapter we'll look at some of the basic techniques that are used to create computer graphics.
This will give you an idea of the techniques that are used in graphics programming, though it's just the beginning of what's possible.

For this chapter we are using a system called WebGL which can render 3D graphics in your browser.
If your browser is up to date everything should be fine.
