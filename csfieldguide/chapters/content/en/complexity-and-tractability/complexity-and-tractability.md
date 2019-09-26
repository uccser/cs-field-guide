# Complexity and Tractability

{comment consider using this somewhere: David Harel earlier in the year about algorithms, and he made the point that getting students to plot running times on a log-log graph can be useful because polynomial time algorithms form a straight line, but exponential don't.}

Are there problems that are too hard even for computers?
It turns out that there are.
In the chapter on [artificial intelligence]('chapters:chapter' 'artificial-intelligence') we saw that just having a conversation &ndash; chatting &ndash; is something computers can't do well, not because they can't speak but rather because they can't understand or think of sensible things to say.
However, that’s not the kind of hard problem we’re talking about here &ndash; it's not that computers couldn’t have conversations, more that we don't know just how we do it ourselves and so we can't tell the computer what to do.

In this chapter we're going to look at problems where it's easy to tell the computer what to do &ndash; by writing a {glossary-link term="program"}program{glossary-link end} &ndash; but the computer *can’t* do what we want because it takes far too long: millions of centuries, perhaps.
Not much good buying a faster computer either: if it were a hundred times faster it would still take millions of years; even one a million times faster would take hundreds of years.
That's what you call a *hard* problem &ndash; one where it takes far longer than the lifetime of the fastest computer imaginable to come up with a solution!

{panel type="teacher-note"}

# Large numbers ahead!

This chapter deals a lot with very large numbers and especially the problem of exponential explosion of time taken.
There are a number of resources around that illustrate these concepts.
The video [The Power of Exponentials, Big and Small](http://blossoms.mit.edu/videos/lessons/power_exponentials_big_and_small) from MIT is downloadable, and illustrates exponential growth with some humorous examples.

{panel end}
