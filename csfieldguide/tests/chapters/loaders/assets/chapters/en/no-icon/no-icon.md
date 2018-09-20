# Chapter 1

For example, computers can perform billions of operations every second, and yet people often complain that they are too slow.
Humans can perceive delays of about one tenth of a second, and if your program takes longer than that to respond it will be regarded as sluggish, jerky or frustrating. 
You've got well under a second to delight the user!
If you are searching millions of items of data, or displaying millions of pixels (megapixels), you can't afford to do things the wrong way, and you can't just tell your users that they should buy a faster computer ... they'll probably just buy someone else's faster software instead!

Here's some advice from Fred Wilson, who has invested in many high profile tech companies:

- First and foremost, we believe that speed is more than a feature. Speed is the most important feature. If your application is slow, people won't use it. I see this more with mainstream users than I do with power users. I think that power users sometimes have a bit of sympathetic eye to the challenges of building really fast web apps, and maybe they're willing to live with it, but when I look at my wife and kids, they're my mainstream view of the world. If something is slow, they're just gone. ... speed is more than a feature. It's a requirement.

- [Fred Wilson](https://en.wikipedia.org/wiki/Fred_Wilson_(financier)) ([Source](http://triple-networks.com/2011/12/06/10-golden-principles-of-successful-web-apps/))

A key theme in computer science is working out how to make things run fast, especially if you want to be able to sell your software to the large market of people using old-generation smartphones, or run it in a data centre where you pay by the minute for computing time.
You can't just tell your customers to buy a faster device --- you need to deliver efficient software.

## Beyond speed

Computer science isn't just about speed.
Try using the following two calculators to make a simple calculation.
They both have the same functionality (they can do the same calculations), but which is nicer to use? Why?

(This book has many interactives like this.
If the calculators don't work properly, you may need to use a more recent browser. 
The interactive material in this book works in most recent browsers; Google Chrome is a particularly safe bet.)

{comment interactive name="awful-calculator" type="in-page"}

The second calculator above is slower, and that can be frustrating.
But it has a fancier interface --- buttons expand when you point to them to highlight what you're doing.
Does this make it easier to use? Did you have problems because the "C" and "=" keys are so close?

How interfaces work is a core part of computer science.
The aesthetics --- images and layout --- are important, but what's much more crucial is the psychology of how people interact.
For example, suppose the "OK" and "Cancel" buttons in dialogue boxes were occasionally reversed.
You would always need to check carefully before clicking on one of them, instead of using the instinctive moves you've made countless times before.
There are some very simple principles based on how people think and behave that you can take advantage of to design systems that people love.

Making software that can scale up is another important theme.
Imagine you've built a web interface and have attracted thousands of customers. 
Everything goes well until your site goes viral overnight, and you suddenly have millions of customers.
If the system becomes bogged down, people will become frustrated waiting for a response, and tomorrow you will have no customers --- they’ll all have moved on to someone else's system.
But if your programs are designed so they can scale up to work with such large amounts of data your main problem will be dealing with offers to buy your company!
