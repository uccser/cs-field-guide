# Analysis

Data analysis methods are algorithms and strategies for finding meaning from raw data.
There are many different methods for doing this, so we’re just going to take a brief look at a few which are commonly used with big data to give you a taster:

## Association Rule Learning

This is a type of analysis used to find relationships (or the probability of relationships existing) between variables in a large data set.
It works by defining a set of rules and gradually adding rules over time as it analyses more data, by finding frequent patterns, correlations and associations.
Large retail chains are famous for using the Association Rule Learning technique to optimise their sales, and chances are you have been influenced by these techniques in the past.

Have you ever wondered why bananas are almost always near the front of the store?
It's not because they are nutritious and delicious, it's because they have been identified as an impulse buy so store owners want to make sure you see them.
Ever wondered why milk isn't at the front of the store?
It's because a lot of people go to the supermarket to buy milk, so by putting it at the back of the store you end up walking past many other items that you didn't know you wanted or needed on the way in!

The rules that have been learned here associate a retail item with a location within the store:

> Bananas + front of store -> consumers buy more bananas

> Milk + back of store -> consumers buy more items

Algorithms such as [Apriori](https://en.wikipedia.org/wiki/Apriori_algorithm) can analyse big data sets of retail transactions for frequent and important item sets and generate these association rules.
A famous example of such a retail market basket analysis is the study that discovered that between 5:00 and 7:00 p.m. that customers of a convenience store often [bought beer and diapers together](http://canworksmart.com/diapers-beer-retail-predictive-analytics/).

Using association rule learning with the millions of online transactions seen by Amazon or song playlists on Spotify allows retailers to find important, but niche and sometimes unexpected, rules. This enables what is referred to as long tail marketing, where rather than trying to appeal to a large general group of consumers, retailers will focus on a large number of small and very specific groups and tailor their advertising specifically to these niche groups. Rules being used for this type of marketing leads to things like advertisements for rock climbing shoes appearing on a web page you visit because you recently purchased a helmet.

Targetted advertising, content recommendation, and market research are by far some of the most popular (and profitable) uses of big data!

## Sentiment Analysis

Sentiment Analysis is sometimes also known as "opinion mining", as it is a method for categorising the opinions expressed in text (for example in a survey, Facebook post, Tweet…). The goal of sentiment analysis is to categorise how the writer feels about some subject. For example, if you tweet the following:

> *"The Matrix was a fantastic movie!"*

That tweet will be put into the positive category. Where this method becomes tricky however, is if you tweet the following:

> *"This movie is surprising with plenty of unsettling plot twists."*

We can see that is probably a positive review, but the word "unsettling" would typically be described as negative, and therefore only a clever algorithm will be able to correctly categorise this message.

{image file-path="img/chapters/customer-satisfaction.png" alt="A happy face and a sad face are shown, with an arrow underneath pointing to the happy face."}

Sentiment Analysis on big data sets such as all news articles that reference the same event or all tweets that reference a political candidate can be used to summarise and infer overall event impacts, or general population support for a candidate. With access to timestamps on articles and tweets, algorithms can also analyse changes in sentiment over time, which might indicate trends, such as a rising political star or emerging community issues.

## Network Analysis

This is the process of investigating structural connections within data using [graph theory](https://en.wikipedia.org/wiki/Graph_theory), where individual pieces of data are called "nodes" and connections between nodes are called "edges". Here are two prominent examples:

- Social Network Analysis: This is used for investigating social structures using networks and graph theory. You can imagine how this works by thinking about the structure of Facebook. You and everyone else on Facebook are a node and two people are connected by an edge if they are Facebook friends. Together, these nodes and edges make a graph structure (a different type of [graph](https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)) to the ones you normally see in maths) that can be analysed. Social Network Analysis is useful for understanding many things, for example information circulation, business networks, social connections and structures, even how quickly a meme spreads.

- Web Page Network Analysis: One of the most famous uses of big data network analysis is the [PageRank](https://en.wikipedia.org/wiki/PageRank) algorithm used by Google to determine which web pages to show users for given search words. Underlying the search results is a complex ranking of more than a billion web pages. The rank of a web page is based on social capital and popularity contest models (and probably some other secret algorithm ingredients). A web page is seen as a node, and a hyperlink to another node (another website) is a directed edge. Every incoming link to a target page gives a small amount of rank proportional to the rank of the source page. Thus something like a Youtube video blog (or even this CS Field Guide Big Data Chapter page that you are reading!) that links a product page with [Whittaker's chocolate](https://www.whittakers.co.nz/en_WW/products/), gives the Whittaker's chocolate page a higher ranking!

Network analysis has become an important technique in many natural science and digital humanities subject areas, including sociology, biology, communication studies, economics, history, and many more.

## Parallel, Distributed, Clustered Computing

When dealing with big data, analysing it in a useful period of time often requires substantial resources. A typical laptop computer is not powerful enough to process such a large amount of data. This is where the idea of parallel, distributed, and clustered computing comes in.
Let's break this down:

**Parallel Computing**: when many calculations/processes are carried out simultaneously across multiple processors in the same computer, in order to solve a problem or complete a task.

{image file-path="img/chapters/parallel-computing-diagram.png" caption="true" alt="Image shows a large block, representing a task, going into a computer and then being broken up into four smaller tasks which each go through a separate processor."}

A computer breaks a task into a set of smaller tasks, each of which is completed by a separate processor at the same time in parallel.

{image end}

**Distributed Computing**: a distributed system is made up of multiple computers or {glossary-link term="server"}servers{glossary-link end}, typically in different physical locations, connected by a network. These computers each carry out processes and communicate with each other to solve a problem or complete a task.

{image file-path="img/chapters/distributed-computing-diagram.png" caption="true" alt="Image shows four computers with arrows pointing to and from each of them, to illustrate that they are connected by a network."}

Separate computers communicate with each other over a network in distributed systems.

{image end}

**Clustered Computing**: A computer cluster is a set of connected computers or servers, typically in the same location, that work together so that they can be viewed as a single system.

{image file-path="img/chapters/cluster-computing-diagram.png" caption="true" alt="Five computers are connected in a circle with a border surrounding all five, to show that it is viewed as one system."}

Multiple computers are connected in a local network and act as one entity in a computer cluster.

{image end}

Each of these approaches processes large amounts of data in a much shorter amount of time than a single computer. They also require any problem they are working on to be broken down, or decomposed into sets of smaller problems or processes, which can each be tackled independently and simultaneously. Computer Scientists and Software Engineers need to come up with good methods to decompose their analysis processes, so that they can be effectively tackled with these approaches. Some problems are easy to decompose into independent pieces and are called *embarrassingly parallel*.

An example is applying the same image smoothing filter to millions of pixels in an image, each computer or processor can apply the filter to a small section of the image and then the results can be recombined to form the new smoothed image. Other problems, such as weather prediction simulations, are harder to decompose, and require advanced techniques including pipe-lining, stochastic sampling, and replication.

**MapReduce**

MapReduce is an example of a general algorithmic method that makes the most of Parallel, Distributed, and Clustered Computing. MapReduce is named as such because it is made up of two steps: "map" and "reduce", and is a type of split-apply-combine strategy for data analysis.

The best way to illustrate how a MapReduce algorithm works is to imagine you and five friends are making a sandwich. In the sandwich you want cucumber, tomato, lettuce, mayonnaise and of course bread on either end.
The first stage is "Map". In this stage, you each take one of the fillings and prepare it to be put in the sandwich (slice the bread in half, wash the lettuce, cut the tomato, etc). This is much quicker than just one of you preparing each ingredient one at a time.
Now that all the ingredients are prepared, you move on to the "Reduce" stage. This is often described as the "summary operation" because each of the 5 ingredients now need to be combined into one.
And now we have a delicious MapReduce sandwich ready to eat.


{panel type="teacher-note"}

# MapReduce Exercise

Print out two copies of a large document. Hand one copy to a single student and ask them to count the number of words in the document. Distribute the other copy between the rest of the students in the class and have them count the number of words on their page (Map). When each student is finished counting, ask for the number of words each and add them up (Reduce). Meanwhile the first student is likely only up to the second or third page! This is a great way to illustrate how a MapReduce solution works, while also demonstrating how much quicker it can be to solve a problem distributed between many students/computers rather than just using a single student/computer.

{panel end}

## Data Stream Analysis

Data stream analysis is about taking actions based on a series of events that have just happened, rather than collecting data and processing it later. This approach involves creating "pipelines" that connect streams of raw data with processing systems.
This is also referred to as analysing and extracting information from data that is "in motion".

For some applications it can be crucial for data to be analysed in real time, as quickly as the data is being produced. This is because in some situations data can very quickly lose its "value", and decisions based on this data need to be made quickly.
If these decisions are not made within a particular time frame the data may be lost, be out of date, or may no longer be of use. For example, a website may want to fine tune their advertising as they track a user browsing their products.
Being able to analyse the users interests quickly means they can choose what advertisements to show them on the next page each time they click a link. If this analysis takes too long however, by the time the system chooses what advertisements to use, the user may have closed the tab and left the website! The data that was produced by their clicks has lost much of its value by this point.

A more serious example could be notifying citizens about national emergencies, such as an incoming hurricane. If the decision to send out an emergency text message takes too long there could be dire consequences.
Data from environmental sensors is being collected constantly and data stream analytics can be hugely beneficial for monitoring and using this data.

We can also refer back to our example of EFTPOS and credit card transactions in section 17.2 on Velocity, if this data is not being analysed and processed in real time then the system will not be of use.
Decisions like whether a transaction is accepted or not can’t be happening slower than the transactions are being made, otherwise the whole system will break down!

## Challenges of Analysis

We have explained just a few of the techniques used to analyse Big Data, and there are obviously many more that you may come across in further reading.
Part of what makes analysing Big Data so challenging is that simply picking which analysis technique to use can influence your results, and is another way for bias to influence studies.
In addition, with so much raw data available and heuristics needed to efficiently find interesting patterns in subsets of the data, it can be easy to manipulate results intentionally or unintentionally.
But doing this can sometimes result in a conclusion too specialised to one group, and can remove the opportunity to find other interesting trends in the data.

When analysing Big Data it is important to think about why you are using the particular analysis method you have chosen, where your data has come from, how it was collected, and how you can best use it for your specific application.
