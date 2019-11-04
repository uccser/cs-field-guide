# Using Big Data

Now that we understand what big data is, let’s look at how we can use it. There are several stages Big Data goes through, beginning with being captured going through to actually being applied to a real life situation. The diagram illustrates this process.

... add diagram ...

## Capture

So where does all the data come from to make Big Data? Here are a few examples you may have encountered:



## Bias

The data you choose to capture has a huge effect on the outcome of your analysis.
For example, if you decide to study how often people open their fridge based on how many times a smart fridge detects it is opened and closed, then who have you excluded, and who might be overrepresented?
A smart fridge is certainly a luxury item and therefore mostly those earning more money will be contributing to your study.
Is this group representative of everyone?
This is just a silly example, but think about what happens when you are using Big Data to analyse medical images.
If you are analysing the effectiveness of a treatment on women and your training data only includes Pākehā (NZ european) and european women, then should you automatically apply the same conclusions to Māori women?
No, of course not, there are physiological differences between people of different ethnicities, and it would be inaccurate to generalise them into one group.
This is why it is so important to make sure that you are capturing data that accurately portrays the group of people that you want to investigate.

## Store

So now that all of this data has been collected, it needs to be stored, which is a challenge in itself.
The first issue is simply the amount of data.
As we mentioned earlier, Big Data often begins at Terabytes, but more often than not, this expands to Petabytes.
This is where data centers come in.

... add image ...

Data centers are warehouses (often quite large ones) containing many computers that are connected in a network. They are used to store and process large quantities of data. Data centers have become a popular way for organisations to solve the issue of not having enough computing power for the amount of data they collect. Companies such as Google, Amazon, Microsoft, and even Catalyst here in New Zealand offer services where other organisations can rent space in their data centers instead of having to build their own (an expensive endeavour).

These data centers store a mind-boggling amount of information. Just think, every video uploaded to YouTube, every photo on Facebook, every tweet ever written, exists somewhere in one of these data centers (in fact it will exist in several, as there will be multiple backups of it).

The other issue around storing Big Data is the raw data itself. There are two general categories we use to classify raw data: structured or unstructured. When you describe the qualities of a car, you probably list the colour, make, model, manual or automatic, etc. We would call this data structured because there is a predetermined data model we can use to describe the qualities of the car. For unstructured data however, there is no predetermined data model, and Big Data typically falls into this category. This is why it cannot easily be poured directly into a typical database, and therefore needs data crunching/preprocessing before it can be stored and used, which takes computing power in itself!

{panel type="jargon-buster"}

# Data Crunching

Data Crunching, also called preprocessing, means the process by which a large amount of raw data is prepared for automated processing (see the following Analysis and Visualisation sections).

{panel end}

## Analysis

Raw data is useless if you do not draw new information and meaning from it, otherwise why did you go to the trouble of collecting it? Data analysis methods are algorithms and strategies for finding meaning from raw data. There are many different methods, we’re just going to take a brief look at a few to give you a taster.
