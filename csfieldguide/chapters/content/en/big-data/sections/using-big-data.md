# Using Big Data

Now that we understand what big data is, let’s look at how we can use it. There are several stages Big Data goes through, beginning with being captured going through to actually being applied to a real life situation. The diagram illustrates this process.

... add diagram ...

## Capture

So where does all the data come from to make Big Data? Here are a few examples you may have encountered:

### Apps and Websites

Instagram, Facebook, Twitter, SnapChat, TradeMe, Spotify, Uber, Netflix, Messenger, etc, all care about how, when, why, and for how long you use their service. Therefore a lot of what you do while using their service is captured.

### The Internet of Things
The idea of the “Internet of Things” (IoT) is to wirelessly interconnect multiple devices and objects, usually through Bluetooth or through wireless internet. There are a couple of different areas where IoT has really taken off:
  - Appliances: It’s becoming more and more popular for people to do things like turn their lights on by talking to their watch, turn their homes air conditioning on from their phone, automatically have their grocery list made by their fridge, etc. It’s still up for debate as to whether this is really useful or not…
  - Health Care: These days it is not uncommon to see people with devices on their wrist that more or less behave like a tiny smartphone, with the added feature of tracking exercise and heart rate.

But these innovations come with a cost, and that cost is often large amounts of data and security concerns. Often these devices are sending real time data, that means that every minute, second, or even millisecond some data is being captured and sent somewhere.
Estimates for the number of IoT devices that will be online in 2020 range from 30-50 billion, and that will be up to 75 billion by 2025.
That’s billions and billions of extra devices sending, receiving, and generating data over the internet, every day!

### Mobile devices
The number of people using smartphones has exploded in the last few years, to the point where in this modern society it is unusual to come across someone without one.
With this comes opportunity for companies to gain more insight into how consumers spend their time, and therefore a lot of the activity on your phone is captured.
For Pixel users, Google has even released a [new feature](https://play.google.com/store/apps/details?id=com.google.android.apps.wellbeing) for you to see how you use your phone.

### Sensors
Big Data is also being collected from the physical world all around us!
Sensors are devices that detect events or changes in their surrounding environment.
They capture and digitize a vast variety of data about our environment, for example temperature, sound, visual images, air pressure, physical movement, and even sub-atomic energy.
They are often relatively basic devices with limited computing power, and so they send this data to other digital devices for processing.
Environmental sensor data often is captured by proprietary systems and aggregated before being made available to the public.
Here are some examples you may be familiar with:

- Ground, air, and water movement sensors are distributed across the Earth to record wind, seismic activity, and wave patterns. This data can be used to predict and detect natural disaster events such as earthquakes, tornados, and tsunamis.
- Many different types of sensors are used for health care monitoring. For example, sensors are frequently used by cardiologists to continuously monitor the electrical signals in a person’s heart, so that they can record and analyse changes in this.
- There are multiple sensors throughout the  Large Hadron Collider which exist to capture energy readings from subatomic particles. These generate around 25 petabytes of information yearly for physics experiments
- Some satellites continuously stream images of Earth’s atmosphere and land. Using multiple satellites to combine images across time and location, meteorologists use this data to predict the weather

## Bias

The data you choose to capture has a huge effect on the outcome of your analysis.
For example, if you decide to study how often people open their fridge based on how many times a smart fridge detects it is opened and closed, then who have you excluded, and who might be overrepresented?
A smart fridge is certainly a luxury item and therefore mostly those earning more money will be contributing to your study.
Is this group representative of everyone?

This is just a silly example, but think about what happens when you are using Big Data to analyse medical images.
If you are analysing the effectiveness of a treatment on women and your training data only includes Pākehā (NZ european) and european women, then should you automatically apply the same conclusions to Māori women?
No, of course not, there are physiological differences between people of different ethnicities, and it would be inaccurate to generalise them into one group.
This is why it is so important to make sure that you are capturing data that accurately portrays the group of people that you want to investigate.

It’s also important to think about how data sets captured in the past, or by other people, may have been conditioned by the biases of those people.

{interactive slug="data-bias" type="whole-page" text="true"}

Data Bias Interactive

{interactive end}

## Store

So now that all of this data has been collected, it needs to be stored, which is a challenge in itself.
The first issue is simply the amount of data.
As we mentioned earlier, Big Data often begins at Terabytes, but more often than not, this expands to Petabytes.
This is where data centres come in.

... add image ...

Data centres are warehouses (often enormous ones) containing many computers that are connected in a network. They are used to store and process large quantities of data. Data centres have become a popular way for organisations to solve the issue of not having enough computing power for the amount of data they collect. Companies such as Google, Amazon, Microsoft, and even Catalyst here in New Zealand offer services where other organisations can rent space in their data centres instead of having to build their own (an expensive endeavour).

These data centres store a mind-boggling amount of information. Just think, every video uploaded to YouTube, every photo on Facebook, every tweet ever written, and every purchase you may have made on Amazon, exists somewhere in one of these data centres (in fact it will exist in several, as there will be multiple backups of it).

The other issue around storing Big Data is the raw data itself.
There are two general categories we use to classify raw data: structured or unstructured.
When you describe the qualities of a car, you probably list the colour, make, model, whether it is manual or automatic, etc.
We would call this data structured because there is a predetermined data model we can use to describe the qualities of the car.
For unstructured data however, there is no predetermined data model, and the majority of Big Data typically falls into this category.
This is why it cannot easily be poured directly into a typical database, and therefore needs data crunching/preprocessing before it can be stored and used, which takes computing power in itself!
Some common examples of unstructured data are images in the form of a list of pixels, or recordings of human speech used for natural language processing.

{panel type="jargon-buster"}

# Data Crunching

Data Crunching, also called preprocessing, means the process by which a large amount of raw data is prepared for automated processing (see the following Analysis and Visualisation sections).

{panel end}

## Analysis

Raw data is useless if you do not draw new information and meaning from it, otherwise why did you go to the trouble of collecting it?
Data analysis methods are algorithms and strategies for finding meaning from raw data.
There are many different methods for doing this, so we’re just going to take a brief look at a few to give you a taster.

### Association Rule Learning

This is a type of analysis used to show the probability of relationships between variables in a large data set. It works by defining a set of rules and gradually adding rules over time as it analyses more data, by finding frequent patterns, correlations and associations. Large retail chains are famous for using the Association Rule Learning technique to optimise their sales, and chances are you have been influenced by these techniques in the past.

Have you ever wondered why bananas are almost always near the front of the store? It’s not because they are nutritious and delicious, it’s because they have been identified as an impulse buy so store owners want to make sure you see them.
Ever wondered why milk isn't at the front of the store? It’s because a lot of people go to the supermarket to buy milk, so by putting it at the back of the store you end up walking past many other items that you didn't know you needed on the way in!

The rules that have been learned here associate a retail item with a location within the store:

Bananas + front of store -> consumers buy more bananas

Milk + back of store -> consumers buy more items

Algorithms such as Apriori can analyze big data sets of retail transactions for frequent and important item sets and generate these association rules. A famous example of such a retail market basket analysis is the study that discovered that between 5:00 and 7:00 p.m. that customers of a convenience store often [bought beer and diapers together](http://canworksmart.com/diapers-beer-retail-predictive-analytics/) .

Using association rule learning with the millions of online transactions seen by Amazon or song playlists on Spotify allows retailers to find important, but niche and sometimes unexpected, rules. This enables what is referred to as long tail marketing, where rather than trying to appeal to a large general group of consumers, retailers will focus on a large number of small and very specific groups and tailor their advertising specifically to these niche groups. Rules being used for this type of marketing leads to things like advertisements for rock climbing shoes appearing on a web page you visit because you recently purchased a helmet.

### Sentiment Analysis

Sentiment Analysis is sometimes also known as “opinion mining”, as it is a method for categorising the opinions expressed in text (for example in a survey, Facebook post, Tweet…). The goal of sentiment analysis is to categorise how the writer feels about some subject. For example, if you tweet the following:

*"The Matrix was a fantastic movie!"*

That tweet will be categorised into the positive category. Where this method becomes tricky however, is if you tweet the following:

*"The movie is surprising with plenty of unsettling plot twists."*

We can see that is a positive review, but the word "unsettling" would typically be described as negative, and therefore only a clever algorithm will be able to correctly categorise this message.

Sentiment Analysis on big data sets such as all news articles that reference the same event or all tweets that reference a political candidate can be used to summarize and infer overall event impacts, or general population support for a candidate. With access to timestamps on articles and tweets, algorithms can also analyze changes in sentiment over time, which might indicate trends, such as a rising political star or emerging community issues.

### Network Analysis

This is the process of investigating structural connections within data (using graph theory where individual pieces of data are nodes and connections between data are edges). Here are two prominent examples:

- Social Network Analysis: You can imagine this by thinking about the structure of Facebook. You and everyone else on Facebook are a “node”. People are connected by an “edge” if they are Facebook friends. Social Network Analysis is useful for understanding many things, for example, information circulation, business networks, social connections and structures, even how quickly a meme spreads.

- Web Page Network Analysis: One of the most famous uses of big data network analysis is the PageRank algorithm developed at Google to determine which web pages to show users for given search words. Underlying the search results is a complex ranking of billions of web pages. The rank of a web page is based on social capital and popularity contest models. A web page is a node and a hyperlink to another node is a directed edge. Every incoming link to a target page gives a small amount of rank proportional to the rank of the source page. Thus something like a Youtube video blog (or even this CS Field Guide Big Data Chapter page that you are reading!) that links a product page with [Whitaker’s chocolate](https://www.whittakers.co.nz/en_WW/products/), gives the Whitaker’s chocolate page a higher ranking!

Network analysis has become an important technique in many natural science and digital humanities subject areas, including sociology, biology, communication studies, economics, history, and many more.

### Parallel, Distributed, Clustered Computing

When dealing with big data, analysing it in a useful period of time often requires substantial resources. A typical laptop computer is not powerful enough to process such a large amount of data. This is where the idea of parallel, distributed, and clustered computing comes in.
Let’s break this down:

1. Parallel Computing: when many calculations/processes are carried out simultaneously.
2. Distributed Computing: a distributed system is a system whose components are located between different networked computers.
3. Clustered Computing: A computer cluster is a set of connected computers that work together so that they can be viewed as a single system.

Each of these approaches processes large amounts of data in a much shorter amount of time than a single computer. They also require any problem they are working on to be broken down, or decomposed into sets of smaller problems or processes, which can each be tackled independently and simultaneously. Computer Scientists and Software Engineers need to come up with good methods to decompose their analysis processes, so that they can be effectively tackled with these approaches. Some problems are easy to decompose into independent pieces and are called *embarrassingly parallel*.

An example is applying the same image smoothing filter to millions of pixels in an image. Other problems, such as weather prediction simulations, are harder to decompose, and require advanced techniques including pipelining, stochastic sampling, and replication.

**MapReduce**

MapReduce is an example of a general algorithmic method that makes the most of Parallel, Distributed, and Clustered Computing. MapReduce is named as such because it is made up of two steps: "map" and "reduce", and is a type of split-apply-combine strategy for data analysis.

The best way to illustrate how a MapReduce algorithm works is to imagine you and five friends are making a sandwich. In the sandwich you want cucumber, tomato, lettuce, mayonnaise and of course bread on either end.
The first stage is "Map". In this stage, you each take one of the fillings and prepare it to be put in the sandwich (slice the bread in half, shred the lettuce, etc). This is much quicker than just one of you preparing each ingredient one at a time.
Now that all the ingredients are prepared, you move on to the "Reduce" stage. This is often described as the "summary operation" because each of the 5 ingredients now need to be combined into one.
And now we have a delicious MapReduce sandwich ready to eat.

... add image ...

### Data Stream Analysis

...


### Challenges of Analysis

We have explained just a few of the techniques used to analyse Big Data, and there are obviously many more that you may come across in further reading.
Part of what makes analysing Big Data so challenging is that simply picking which analysis technique to use can influence your results, and is another way for bias to influence studies.
In addition, with so much raw data available and heuristics needed to efficiently find interesting patterns in subsets of the data, it can be easy to manipulate results intentionally or unintentionally.
But doing this can sometimes result in a conclusion too specialised to one group and can remove the opportunity to find other interesting trends in the data.

## Visualising Big Data

As humans, it has been said that 90% of all data that is absorbed by your brain is visual, and hence we are not very good at processing large amounts of raw data. Instead we often need something visual to represent the data. “Data visualisation” is a term that is used to describe an effort to convey the significance of data in a visual context. This is an important method that we can use to help us find patterns, trends or correlations that might not have been identified otherwise.

One particularly interesting data visualisation application is Astronomy. Did you know that a lot of the beautiful images of space that NASA releases are not “real” images? They are actually works of [art created by visualisation scientists](https://www.youtube.com/watch?v=xc1V9d8jrr8), not simply photographs taken with a telescope. The reason for this is because the telescopes used by astronomers mainly collect raw data rather than images. Visualisation scientists use this data to create a hypothetical image of what something looks like. This isn't to be confused with ‘just making things up’! The images they create are based on the raw data and their own in depth knowledge.

{panel type="curiosity"}

# Accurate Images of Black Holes

The most accurate image of a black hole created to date was created for the 2014 film [Interstellar](https://www.youtube.com/watch?v=MfGfZwQ_qaY), by a team of over 30 people including an expert theoretical physicist.
Creating the image required over 800 terabytes of data to be processed.

{panel end}

Data visualisations are all around us. As long as something takes some data and turns it into something visual, it is a data visualisation. Chances are you have even made some yourself! Some interesting examples include:

*Add examples once confirmed they can be used*
