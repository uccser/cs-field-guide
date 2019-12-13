# Big Data and The Three V's

Being able to find patterns in huge amounts of data can be incredibly valuable for making decisions, for example for setting prices, making recommendations, and detecting suspicious activities.
This is why Big Data is a bit of a buzzword in tech and in commercial industries these days.
But how big does it have to be to be called "*Big Data*"?

Big Data is a phrase used to mean an amount of data that is so large and is generated so quickly that it is difficult to store and analyse using traditional sequential programming and storage techniques.
Big Data has three main qualities: Volume, Variety, and Velocity (often referred to as the "3Vs"), and we'll look at each of these in this section

## Volume

Volume refers to the quantity of data, and when it comes to Big Data there is a lot of it.
Have a look at this website showing what happens on the internet [every second](https://everysecond.io/the-internet) to get an idea of just how much data is constantly produced online!

Your phone might have about 64GB of storage space, and it takes a long time for the typical smartphone user to run out of space.
A laptop might have 1TB of storage, and some users will never get close to using all that space.
It wasn't long ago that running out of space was a common problem for all users, but advances in engineering of transistor density have continued at a steady pace.
Since the 60's the capacity of a single computer's integrated circuit has been doubling roughly every two years ([Moore's Law](https://en.wikipedia.org/wiki/Moore%27s_law)), so if this continues and you're reading this several years after it was written, 1TB might sound quite small!

These amounts are nowhere near large enough to be considered Big Data though.
So how big does data have to be to be considered *big*? Well, it usually starts in the terabytes, then petabytes, then exabytes, and so on… Big Data is so big that simply storing it is an issue in itself; a single computer cannot store the amount of data on its own, and multiple computers must be used.

One of the most extreme examples of data volume is YouTube uploads.
As of October 2019, over [8 hours](https://everysecond.io/youtube) of video content is uploaded to YouTube every second!
That's over 80 years worth of videos every day, and YouTube has to be able to store all of this data to keep its services running.


## Variety

Variety refers to the many different types of data (plain text, images, videos, and many many more) that are generated and stored.
Online transactions, emails, and even individual mouse clicks on a webpage are generating data of different types.

{image file-path="img/chapters/different-data-types.png" alt="Icons representing seven different types of files or data points are shown.
These are audio files, mouse clicks, online transactions, online messages, email, images, and a spreadsheet."}

Big Data almost always uses more than one data type, and this contributes to the complexity of it.
Different data types have different attributes and therefore the data doesn't simply fit into rows and columns of a spreadsheet or database (e.g. the dimensions of an image will need to be recorded in a different way to the length of an audio clip).

## Velocity

There are two ways to measure Velocity: the speed at which the data is being generated, and the speed at which it is being {glossary-link term="data-processing"}processed{glossary-link end}.
Big Data tends to be produced continually, and is available in real time.
In many situations it also needs to be processed in real time, and processing this data as quickly as it is created is not easy!

For example, every time you make a purchase using your debit or credit card on an EFTPOS machine, that transaction is recorded and processed.
In 2018 there were on average 50-60 EFTPOS transactions every single second [in New Zealand](https://www.paymentsnz.co.nz/resources/articles/nz-payments-stats-2018-in-review/), and this more than doubled in the Christmas period.
When one of these transactions is made it doesn't just mean a message is sent to your bank and they take the money out of your account; there is much more than that happening.
The EFTPOS machine must first establish a connection with a card processor network (such as Visa or MasterCard), who connect with your specific bank and pass on the transaction information to ask for approval.
Checks are run to see if you have enough money, if your PIN is correct, loyalty programs such as petrol points or airpoints might need to be computed, fraud checks might be run, and your bank may send data to a third party to perform some of these steps for them.
Only after all this happens will your bank authorise (or decline it!) the transaction, send an approval back to the card processor network, then back to the EFTPOS machine saying the payment has been processed - and this all has to happen in a matter of seconds!

Another example of just how quickly large amounts of real time data needs to be processed is social networking websites.
Every time you scroll through Facebook, you are generating data.
In September 2018, Facebook had an average of 1.49 billion active users each day.
Many of those users would have posted photos, liked posts, played games, sent messages, shared life events, etc.
All of this is generating data, which is recorded as it happens, and needs to be processed just as quickly as it is created in order for Facebook to keep its services running, and to see trends.
Imagine all of a sudden there was no activity coming from Australasia.
That is likely to indicate an issue with their system in this part of the world, and Facebook needs to know about that immediately in order to diagnose and fix the problem.
