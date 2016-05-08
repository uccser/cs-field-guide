# Introduction

{panel type="teacher-note" summary="Introduction for teachers"}

This guide is an online interactive textbook to support teaching computer science in high schools.
It was initially developed to support the new achievement standards in Computer Science that are being rolled out in New Zealand from 2011 to 2013,
but eventually will be expanded to support other curricula.

The version that you are reading now is the teachers' version, in which chapters are interspersed with information for teachers, like this box. It will include answers and hints, so this version shouldn't be released to students (although because the material is open-source, a resourceful student may well find the teachers' version).

Because the guide is constantly under revision, we welcome feedback so that we can improve, clarify, and correct the material.
The best way to provide feedback is through the "Give us feedback" link (this can range from a typo to a broad suggestion). You can also contact us about more general matters by emailing jack.morgan@canterbury.ac.nz, or tim.bell@canterbury.ac.nz .

{panel end}

{video url="https://www.youtube.com/embed/v5yeq5u2RMI?rel=0"}

## What's the big picture?

Why is it that people have a love-hate relationship with computers? Why are some people so fanatical about particular types of computers, while others have been so angry at digital devices that they have been physically violent with them? And what does this have to do with computer science? And what is computer science anyway?

I'm glad you asked! Put simply, computer science is about tools and techniques for designing and building applications that are very fast, have great interfaces, are reliable, secure, helpful --- even fun.

A lot of people confuse computer science with programming. It has been said that "computer science is no more about programming than astronomy is about telescopes" ([Mike Fellows](http://en.wikiquote.org/wiki/Computer_science)).
Programming is the tool that computer scientists use to bring great ideas to life, but just knowing how to give programmed instructions to a computer isn't enough to create software that delights and empowers people.

For example, computers can perform billions of operations every second, and yet people often complain that they are too slow. Humans can perceive delays of about one tenth of a second, and if your program takes longer than that to respond it will be regarded as sluggish, jerky or frustrating. You've got well under a second to delight the user! If you are searching millions of items of data, or displaying millions of pixels (megapixels), you can't afford to do things the wrong way, and you can't just tell your users that they should buy a faster computer ... they'll probably just buy someone else's faster software instead!

Here's some advice from Fred Wilson, who has invested in many high profile tech companies:

> First and foremost, we believe that speed is more than a feature. Speed is the most important feature. If your application is slow, people won't use it. I see this more with mainstream users than I do with power users. I think that power users sometimes have a bit of sympathetic eye to the challenges of building really fast web apps, and maybe they're willing to live with it, but when I look at my wife and kids, they're my mainstream view of the world. If something is slow, they're just gone. ... speed is more than a feature. It's a requirement.

> -- [Fred Wilson](https://en.wikipedia.org/wiki/Fred_Wilson_(financier\)) ([Source](http://triple-networks.com/2011/12/06/10-golden-principles-of-successful-web-apps/))

A key theme in computer science is working out how to make things run fast, especially if you want to be able to sell your software to the large market of people using old-generation smartphones, or run it in a data centre where you pay by the minute for computing time.
You can't just tell your customers to buy a faster device --- you need to deliver efficient software.

## Beyond speed

Computer science isn't just about speed.
Try using the following two calculators to make a simple calculation.
They both have the same functionality (they can do the same calculations), but which is nicer to use? Why?

(This book has many interactives like this. If the calculators don't work properly, you may need to use a more recent browser. The interactive material in this book works in most recent browsers; Google Chrome is a particularly safe bet.)

{interactive name="awful-calculator" type="in-page"}

The second calculator above is slower, and that can be frustrating.
But it has a fancier interface --- buttons expand when you point to them to highlight what you're doing.
Does this make it easier to use? Did you have problems because the "C" and "=" keys are so close?

How interfaces work is a core part of computer science. The aesthetics --- images and layout --- are important, but what's much more crucial is the psychology of how people interact. For example, suppose the "OK" and "Cancel" buttons in dialogue boxes were occasionally reversed. You would always need to check carefully before clicking on one of them, instead of using the instinctive moves you've made countless times before. There are some very simple principles based on how people think and behave that you can take advantage of to design systems that people love.

Making software that can scale up is another important theme. Imagine you've built a web interface and have attracted thousands of customers. Everything goes well until your site goes viral overnight, and you suddenly have millions of customers. If the system becomes bogged down, people will become frustrated waiting for a response, and tomorrow you will have no customers --- they’ll all have moved on to someone else's system. But if your programs are designed so they can scale up to work with such large amounts of data your main problem will be dealing with offers to buy your company!

Some of these problems can be solved by buying more equipment, but that can be an expensive and wasteful option (not just for cost, but because of the impact on the environment, including the wasted power used to do the processing inefficiently). With mobile computing it's even more important to keep things lean and efficient --- heavy duty programs chew up valuable battery life, and processing and memory must be used sparingly as these affect the size, weight and even heat dissipation of devices.

If your system is successful and becomes really popular, pretty soon people will be trying to hack into it to steal valuable customer data or passwords. How can you design systems so that you know they are secure from such attacks and your customers can trust you with their personal information or business transactions?

All these questions and more are addressed by the field of computer science. The purpose of this guide is to introduce you to those ideas so that you have a better idea of whether this field is for you. It is aimed at high-school level, and is intended to bring you to the point where you have a good overview of the field, and are well prepared for further in-depth study to become an expert.

We've broken computer science up into a whole lot of topics that you'll often find in curricula around the world, such as algorithms, human-computer interaction, compression, cryptography, computer graphics, and artificial intelligence. The reality is that all these topics interact, so be on the lookout for the connections.

This guide isn't a list of facts for you to memorise, or to copy and paste into projects! It is mainly a guide to things you can do --- experiences that will engage you with the topics. In fact, we won't go through all the topics in great detail, but will give you references to websites and books that explain things thoroughly. The idea of this guide is to give you enough background to understand the topics, and to do something meaningful with them.

## Programming

And what about programming? You can get through this whole guide without doing any programming, although we'll suggest exercises. Ultimately, however, all the concepts here are reflected in programs that people write. If you want to learn programming there are many excellent courses available. It takes time and practice, and is well worth doing in parallel with working through the topics in this guide. There are a number of free online systems and books that you can use to teach yourself programming.
A list of options for learning to program is being compiled by [code.org](http://www.code.org/), where there is also a popular video of some well-known high-fliers in computing that is good to show classes. Here are some other sources that might suit you:

-  [The NCEA year 12 workbook](http://www.cs.otago.ac.nz/year12dt/) is a book (two actually) on programming in Java and Python, written for the NZ achievement standards. The authors are developing a second book for the year 13 programming standard.
- [CodeAvengers](http://www.codeavengers.com)  is an online system where you can work through challenges that will introduce you to programming in Javascript. This system matches the NZ programming achievement standards from level 1 to 3.
- [Interactive Python](http://interactivepython.org/) has a free online "book" called "How to Think Like a Computer Scientist: Interactive Edition" (also referred to as "Think Python") which teaches the Python language, and enables students to edit and run Python examples within the web browser. The original book is open source and is also available in various non-interactive versions.
- [Codecademy](http://www.codecademy.com) is an online system where you can learn languages including Python and Javascript
- [Coder Dojo](http://coderdojo.com) is a "movement orientated around running free not-for-profit coding clubs and regular sessions for young people".
- [Python tutor](http://pythontutor.com/) allows you to run Python in your web browser --- no installation needed.
- [CodingBat](http://codingbat.com) has hundreds of programming challenges that you can try to check on how you are progressing with learning to program.
- [Greenfoot](http://greenfoot.org/) is a visual, interactive system that teaches object orientation with Java. You create 'actors' that live in 'worlds' to build games, simulations, and other graphical programs.
- [Khan Academy](http://www.khanacademy.org/cs/) has a "Computer Science" section; most of the material here is about programming rather than computer science in general.
- [Grok Learning](https://groklearning.com/) is a new site for learning to code
- [Learn Python the Hard Way](http://learnpythonthehardway.org/) is a rigorous (but fun) introduction to Python for beginners who are prepared to work hard. It's available for free online, or you can buy a book. It comes with the warning that it may cause students to think!

The following programming teaching systems are aimed more at younger students, or are based around a "drag and drop" language which is only intended as a teaching tool:

- [ScratchEd](http://scratched.media.mit.edu) provides extensive educational material for Scratch, which is a drag-and-drop programming language centred around creating 2D animations. Scratch has many of the features of more conventional languages. The [Snap! (BYOB)](http://byob.berkeley.edu/) system is based on Scratch, and has some more advanced features.
- [Computer Science Concepts in Scratch](http://stwww.weizmann.ac.il/g-cs/scratch/scratch_en.html) is a book on programming in Scratch.
- [Alice](http://alice.org/) is an educational programming language based around creating 3D animations.
- [Kodu](http://www.kodugamelab.com/) is a visual programming tool that is also available of Xbox.
- [Snake wrangling for kids](http://briggs.net.nz/snake-wrangling-for-kids.html) is a free downloadable book that introduces younger students to Python programming.

And there are [dozens of other websites and systems](https://en.wikipedia.org/wiki/List_of_educational_programming_languages) for learning about programming.

Programming is just one of the skills you'll need to be a computer scientist. In this book you'll be exercising many other skills --- maths, psychology, and communication are important ones.

## How to use this guide

This guide is intended to support a variety of curricula, and teacher guides will become available for using it in different contexts. For students, we've designed most chapters so that they can stand alone; the few that build on previous chapters explain at the outset what preparation you need (the most useful general preparation is the chapter on data representation, because everything on a computer is stored using binary numbers and so they have an important role in many areas of computer science.)

Each chapter begins with a section about the "big picture" --- why the topic is useful for understanding and designing computer systems, and what can be achieved using the main ideas in the chapter. You'll then be introduced to key ideas and applications of the topic through examples, and wherever possible we'll have interactive activities that enable you to work with the ideas first hand. Sometimes these will be simplified versions of the full sized problems that computer scientists need to deal with -- our intention is for you to actually interact with the ideas, not just read about them. Make sure you give them a go!

We finish each chapter by talking about the "whole story," giving hints about parts of the topic that we omitted because we didn't want to make the chapter too overwhelming. There will be pointers for further reading, but be warned that some of it might be quite deep, and require advanced math or programming skills.

If you are doing this for formal study, you'll end up having to do some sort of assessment. The chapters provide ideas for projects and activities that could be used for this, and the appendix has more detailed guidance for assessment (currently designed for the New Zealand NCEA requirements).

## About this guide

This guide is free for you to copy, share and even modify. It is currently available online, and we plan to have versions available for ebooks, and as a downloadable PDF file (although it's much better viewed in the other formats because you can watch the videos and use the interactive activities).
The source material (all raw text, images, videos and interactive programs) is available through the "Contribute on GitHub" link.

This guide is licenced under a [Creative Commons Attribution-NonCommercial-ShareAlike licence](http://creativecommons.org/licenses/by-nc-sa/4.0/), which means that you are welcome to take copies and modify them. If you do make improvements, we ask that you share those, and acknowledge this guide by linking back to our web site. You can give away the guide (or any derivatives), and you can use it for teaching, but you’re not allowed to sell it directly for profit.

Production of the guide was partially funded by a generous grant from Google Inc., and supported by the University of Canterbury. Of course, we welcome donations to support further work on the guide.

## Further reading
Each chapter gives suggestions for further reading for that particular topic. There are also plenty of general books and websites about computer science that you might want to read to keep your view of the topic broad.

Books that we particularly recommend include:

- Algorithmics, by David Harel
- [Computational fairy tales](http://computationaltales.blogspot.co.nz), by Jeremy Kubica
- Algorithmic adventures: from knowledge to magic, by Jurag Hromkovic
- The Turing Omnibus, by A.K. Dewdney

Wikipedia has a fairly extensive [entry on computer science](https://en.wikipedia.org/wiki/Computer_science).

The  AQA Computing A2 book(s), by Sylvia Langfield and Kevin Bond, give a more detailed account of many of these topics.

The ["Nested" Youtube channel](https://www.youtube.com/channel/UCp-hlYynzR5VW18ITtrcMtQ) has some videos that introduce different computer science topics (for example: binary search) and closely match the topics in this Field Guide.

There are also some excellent general web sites about Computer Science, many of which we've referenced in other chapters:

- [Computer Science For Fun](http://www.cs4fn.org) --- a very readable collection of short articles about practical applications of topics in computer science
- [Babbage's bag](http://www.i-programmer.info/babbages-bag/) is an excellent collection of technical articles on many topics in computing.
- [CS Bytes](http://www.nsf.gov/cise/csbytes/) has up-to-date articles about applications of computer science.
- [Thriving in our digital world](http://www.cs.utexas.edu/~engage/) has some excellent information and  interactive material on topics from computer science.
- [The Virginia tech online interactive modules for teaching computer science](http://courses.cs.vt.edu/csonline/) cover a range of relevant topics.
- [CS animated](http://www.csanimated.com/) has interactive activities on computer science.
- [CS for All](http://www.cs.hmc.edu/csforall/)
