# What's the big picture?

Data is all around us, and it always has been. We use data to finish a biology report, determine what route to take to a friend's house, and to view an amusing comic.
However, the way data is delivered to us to carry out these tasks even just 20 years ago was very different to how it is now.
Your parents probably tell you stories about how "back in my day" they had encyclopedias to learn from, physical maps to navigate their way around the city, and newspapers with comic strips for morning entertainment.
Think about how you carry out these tasks now, would you know how to use an encyclopedia?

With each day that passes, hundreds of millions of data points are being generated and collected in a variety of different mediums.
When you search for penguins and end up on Wikipedia, get directions to your friend's house on Google Maps or react to someone's meme on Facebook, that generates (potentially hundreds) of data points that are stored, along with the many others from other people using the internet.
Together, these data points are used to work out patterns and trends to more accurately predict user behaviour.
These predictions are used by companies in many ways, for example to make whatever you search for online easier to find.

"Big Data" is the result of you, and millions of other people, generating data.
In this chapter we look at the journey these data points take, how they are used, and why we are interested in it in the first place.


## Big Data and The Three V's

Being able to find patterns in huge amounts of data can be incredibly valuable for making decisions, setting prices, making recommendations, and detecting suspicious activities, which is why Big Data is a bit of a buzzword in the tech industry these days. But how big does it have to be to call it *"Big Data"*? Big Data is a phrase used to mean an amount of data that is so large and incoming so quickly that it is difficult to store and analyse using traditional sequential programming and system techniques. This can be translated to having three main qualities: Volume, Velocity and Variety (often referred to as the "3Vs").

## Volume

Volume refers to the quantity of data.
Your phone might have about 64GB of storage space and it takes a long time for the typical smartphone user to run out of space.
A laptop might have 256GB of storage space, and some users will never get close to using all that space.
It wasn't long ago that running out of space was a common problem for users, but advances in engineering of transistor density have continued at a steady pace: doubling the capacity of a single computer's integrated circuit every two years (Moore's Law), so if you're reading this several years after it was written 256GB might sound quite small!

So how big does data have to be to be considered big? Well, it usually starts in the terabytes, then petabytes, then exabytes, and so on… Big Data is so big that simply storing it is an issue in itself; a single computer cannot store the amount of data on its own and multiple computers must be used.
<!-- https://everysecond.io/the-internet -->

## Velocity

There are two ways to measure Velocity: the speed at which the data is being generated, and the speed at which it is being processed.
Big Data tends to be produced continually, and is available in real time.
For example, every time you make a purchase using your EFTPOS card, that transaction is recorded.
In New Zealand there are typically 50-60 EFTPOS transactions every single second, and this more than doubles in the Christmas period.
Every time you scroll through Facebook, that is recorded.
In September 2018, Facebook had an average of 1.49 billion active users each day.
Some of those users would have posted photos, liked posts, played games, sent messages, shared life events, etc.
All of this data is recorded as it happens, and needs to be processed just as instantly in order for Facebook to see trends. Imagine all of a sudden there was no activity coming from Australasia.
That is likely to indicate an issue with their system in this part of the world, and Facebook needs to know about that immediately in order to diagnose and fix the problem.

One of the most extreme examples of data velocity is YouTube uploads.
As of October 2019, over [300 hours](https://everysecond.io/youtube) of video content is uploaded to YouTube every minute!
That means if you wanted to watch every video that was uploaded today it would take you over 1000 years!
And YouTube needs to process this data as fast as it is uploaded to keep its services running.

## Variety

Variety refers to the many different types of data (plain text, images, videos, audio, and many more types) that are generated and stored.
Big Data almost always uses more than one data type, and this contributes to the complexity of it.
Different data types have different attributes and therefore the data doesn't simply fit into rows and columns of a spreadsheet or database (e.g. the dimensions of an image will not fit into the same field as the length of an audio clip).
