# User Experience

So far in this chapter we have gone into detail about HCI and the principles behind it.
In the tech industry it is not very often that you meet someone with a job title of “HCI Expert”, instead, they are called *User Experience (UX) Designers*, and HCI is recognised as their academic background.
UX Designers look at the big picture.
They think about everything from a user’s first encounter with a product to their day-to-day interactions with it.
How it affects their job or life, and even how they feel about it.
In contrast, HCI tends to focus on specific tasks and elements of the interface.

{glossary-link term="user-experience" reference-text="definition"}User experience{glossary-link end} is all about *how* the user interacts with the device or application.
Is it intuitive, or is it confusing?
Do the interactions feel natural, or are they unfamiliar?
Is it easy to use, or does the user feel like they are struggling?
A UX Designer has to consider all of these things when designing a new application and there are many different methods they use to do this.
In this section we’ll look at a few different methods and how they fit into a *UX Study* when designing a new product from scratch.

## User experience study

A user experience study is an investigation of users and their needs, in the context of a particular problem.
A **user** experience Study uses **user**-centered design, which means that at every single stage of the design process, the user is our primary focus.
Unless we understand the user’s needs, feelings and emotions, we won't be able to deliver a good user experience, which is why we will carry out user experience studies.

**For our example study, we are going to design an app that helps people to improve their sleep habits.**

In this section we’ll walk through a few different methods for interface design and evaluation in a UX study.
Keep in mind that there are many different methods available to UX designers, and the methods that a UX designer chooses will vary from project to project depending on the resources they have available (such as time, the number of users available for testing/feedback, etc) and the project itself.
You should therefore use this section as an example only and do further research to help you decide which methods are most suited to your project and resources.

### Step 1: Understand the problem and the user

**UX method: User survey**

Before we jump into designing the interface, we need to identify exactly what the problem is that we are trying to solve.
“I want to help people improve their sleep habits” is a pretty broad statement, and doesn’t give us much direction to go on.
Instead, we will use the following questions to help us narrow the scope of this project:

- Who are our target users?

- What assumptions can we make about them?

For our sleep habits app we decide our target users will be high school students and those in higher education (university, institute of technology etc).
We assume that they have trouble managing their sleep due to demands from their studies.
In order to truly improve their sleep habits, they want to know how much sleep they really need and what the flow on effects of a good or poor quality sleep are.

Answering these simple questions has already helped us to narrow down the scope of the problem and gives us a starting point for our research.
What we think our users want and what they actually want are often two different things.
Therefore it’s important to get some user input early on so we can better understand our users' wants and needs.
We are going to start involving the users by creating a simple survey.

First, we decide on what we actually want to learn from our users:

- The “why” behind their current behaviour,

- their frustrations,

- where they want to improve, and

- what would help make this process easier.

However, these general questions would be difficult for our target users to answer, so we translate them into more specific questions:

- *On average, how many hours of sleep do you get each night?*

- *Do you usually feel rested when you wake up?*

- *Do you wake up naturally most mornings or do you use an alarm clock to wake you?*

- *Describe for me what your bedtime routine looks like.*

With only these four questions we can already start to determine the users current behaviour, what influences it, as well as their frustrations.
A comprehensive survey will give us a much deeper understanding of the user.

{panel type="teacher-note"}

# Survey tips

A 20-30 question survey given to 10-20 people should give a useful amount of data for the students to work with.

Remind your students about the ethics of collecting people’s data.
Their surveys should be anonymous (i.e. don’t ask for names or contact information) as there shouldn’t be any need to tie a response to a particular person.

{panel end}

### Step 2: Identify your competitors

**UX method: Competitive analysis**

Thanks to our survey in Step 1 we now have a much better idea of our target users and what their needs are.
The next step is therefore to do some research on what solutions are already out there.

We’ll use what is called a *competitive analysis*.
A *competitive analysis* is when you research the existing solutions for your particular problem.
Key questions you want to answer are:

- What worked for them?

- What didn’t?

- What features do they have in common?

Here’s a very simple example of a competitive analysis table for our sleep app:

|                                         | App A  | App B  | App C  | App D  |
|-----------------------------------------|--------|--------|--------|--------|
| Utilises additional device              | Yes    | No     | No     | No     |
| Tracks movement                         | Yes    | Yes    | Yes    | Yes    |
| Has alarm                               | No     | Yes    | Yes    | Yes    |
| Dynamically chooses time to start alarm | N/A    | Yes    | Yes    | Yes    |
| Makes graph of sleep patterns           | Yes    | Yes    | Yes    | Yes    |
| Suggests bedtime                        | No     | Yes    | No     | No     |
| Advertises better sleep habits          | No     | No     | No     | No     |

{panel type="teacher-note"}

# Competitive analysis tips

This is a very small competitive analysis table.
Your students should be able to identify 5-10 distinct features for at least 5 products.
If they can’t find 5 products, encourage them to widen the scope of their search.

{panel end}

The features common across all four apps is the movement tracking and graph of sleep patterns, so this indicates that these could be a feature that users look for in their sleep app.
Apps B, C and D all have alarms that dynamically choose their wake-up time, so this could be another feature we need to include.
Only App B reminds the user that it is time for bed, so there is a potential gap that our app could fill here.

These apps advertise that they can track your sleep.
In contrast, we have said that we want to help people *improve their sleep habits*.
This is a slightly different focus so there is already room for our app to stand out here.

### Step 3: Identify the common themes

**UX method: Affinity diagram**

The survey in Step 1 gave us an insight into our users, and the competitive analysis in Step 2 gave us context for what solutions already exist for the problem we are trying to solve.
It’s likely that we’ve got a lot of anecdotal data (stories, opinions, etc) from our survey rather than quantitative data (numbers) and somehow we need to draw meaning from this.
We’ll use an affinity diagram to do this.
Affinity diagrams are a way to group the data based on their relationships, which in turn will help us to identify the common themes.

To create our affinity diagram we’ll be using a pen, sticky notes, and a wall.
These are the steps we’ll carry out:

1.  On each of the sticky notes, write down one of the facts, drawings, ideas or observations made in the survey results.
    (e.g. *“I often lose track of time and go to bed too late”, “I always wake up feeling really tired”*).

2.  Next, pick a sticky note at random and put it on the wall.
    Then pick another sticky note and compare it to the first, is it similar or different?
    If it’s similar then put it with the first sticky note, if it’s different then put it somewhere else on the wall.

3.  Repeat the previous step for each sticky note, putting similar ideas together and starting new groups for those that don’t quite fit in yet.

4.  Eventually, clusters of sticky notes will form, give each cluster a title that best represents the theme of those notes.

In particular, the data we want to extract from the survey is how the user currently feels and thinks.
Why do/don’t they use any of the existing sleep apps?
What frustrates them about their existing sleep habits?
What mood are they usually in when they are thinking about this?

Here’s a small affinity diagram for our app:

{image file-path="img/chapters/affinity-diagrams.png" alt="Two photographs of the same example Affinity Diagram. The diagram on the right shows the diagram with three themes highlighted ('Waking up unrested', 'Unsure about sleep requirements', 'Staying up too late')."}

We’ve sorted the sticky notes into just 3 main themes:

1.  Waking up unrested

2.  Unsure about sleep requirements

3.  Staying up too late

If we had identified more themes then we might choose to rank them in order of priority.
The size of each cluster would be a good indication of what the strongest themes are.
For example, if we had 16 sticky notes under “waking up unrested” and only 5 under “unsure about sleep requirements” and “staying up too late” then we would confidently consider “waking up unrested” to be a high priority concern for our users.

{panel type="teacher-note"}

# Affinity diagram tips

This is a very small affinity diagram.
Your students should have a lot of data to work with from their surveys and therefore should have at least 20 sticky notes that they can sort into 4 or 5 strong themes.

{panel end}

### Step 4: Describe your user.

**UX methods: Empathy map, user personas and user stories**

Now that we’ve established who our users are and what they want, it would be useful to create *user personas*.
A *user persona* is a hypothetical character that is representative of your target user.
To help us with creating a user persona, we will use an *empathy map* to give us a structure to work with.
An *empathy map* defines four aspects of the persona in quadrants: how they Think and Feel, and what they Do and Say.
We’ve created a very basic one below to help us develop a persona for the target users of our sleep habits app:

|                                                                                                                                          	| **User**                                                                                                                                                                                                                    	|
|------------------------------------------------------------------------------------------------------------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| **Says**<br>Things the user says out loud in an interview or wrote in their survey.<br><br>*I am so tired.<br>I think I stayed up too late last night.* 	| **Thinks**<br>What do they think about? What are their needs, goals and motivations?<br><br>*I wish I could get more sleep.<br>Maybe I should go to bed earlier.<br>How many hours of sleep do I actually need?<br>Why am I always tired?* 	|
| **Does**<br>What actions does the user do?<br><br>*Always hits “snooze” on the alarm.<br>Drinks coffee first thing in the morning.*                     	| **Feels**<br>Consider the tone they use in an interview and/or survey answers.<br><br>*Tired.<br>Annoyed.<br>Frustrated.*                                                                                                                	|

Using our empathy map we are able to derive the target users' needs and from here we created persona representatives of our target user.
Meet some students representing our target audience, though for this example we'll just focus on Bevan:

{panel type="curiosity"}

# Be aware of your audience

The three examples below are possible users for this application.
When performing your own user studies, you should list and research their gender, age, culture, etc.

For example: Elderly people generally have poorer levels of fine motor skills compared to young adults.
If your target users include the elderly, you should research how this might impact how they interact with your product.

Then when you go to build your persona, try to include the most important aspects of everyone.
If it really isn't working out, expand to two personas &ndash; perhaps that would be a better fit for your product.

{panel end}

{interactive slug="persona-carousel" type="in-page" alt="Slideshow of example personas"}

User Personas are commonly used in software development.
The idea is that they help you to step out of yourself and think from the character's perspective instead, serving as a reminder that everyone has different needs and expectations.
If we are to provide a good user experience for Bevan we need to consider his wants and needs rather than our own.
Since Bevan is a fictional character, compiled of data from multiple different users, serving a good UX to Bevan will serve a good UX to our users.

{panel type="teacher-note"}

# User persona tip

It doesn't always make sense to create multiple user personas.
Three examples are given here to get students to think more broadly about their target users, but they should try to stick to just one specific persona.
If they are stuggling, allow them to try and split it into two and see if that is a better fit for their product.

{panel end}

We can derive our users' needs from this persona.
Bevan is frustrated that he goes to bed too late only to then have poor quality sleep, which then impacts his mood and productivity the next day.
Instead he wants to wake up with more energy that he can sustain throughout the day.
In short, Bevan needs better quality sleep.
It can be useful to turn these needs into {glossary-link term="user-story" reference-text="definition"}user stories{glossary-link end}, which are very simple outlines of a requirement of the app.
They should contain just enough information in order for the developers creating the product to determine a reasonable estimate of the time required to produce that feature, and this makes them a very useful and commonly used tool in agile software development.

For example, here are a couple of user stories for our sleep habits app:

- *As Alex, I want to be reminded to go to bed at a certain time, so I don’t stay up too late.*
- *As Taylor, I want to be woken up when I’m only sleeping lighty, so that I feel more refreshed rather than sleepy.*

We’ve used this template: `As [persona], I [want to], [so that].`
Think of this as person + need + purpose.
This encourages us to keep the user as the center of attention when designing our app.
Once we’ve written a few different user stories, we’ll be able to establish what the basic functions and features of the app will be.

### Step 5: Decide on your Minimum Viable Product (MVP)

At this point we can use what we’ve learned to create a list of features for our Minimum Viable Product (MVP):

- Ability for user to set desired bedtime and waking time.

- An automatic reminder to start winding down 30 minutes before bedtime.

- Use the desired bedtime and desired wake up time to calculate appropriate time for alarm to sound depending on the REM cycle.

- A quiz at the start and end of day that asks the user how they feel (tired, awake, energetic, etc).

- A summary of quiz results so the user can see trends over time.

This is a pretty short feature list, which is why it is called an MVP.
These are the most fundamental features we think the app needs to have in order to meet our goal of helping people to improve their sleep habits.

### Step 6: Build a site map

You’ve probably seen the term site map on websites before, but a site map does not necessarily refer exclusively to a website.
A site map is simply a representation of the features of an application and how a user would flow between pages.
It can be particularly useful to visualise your site map by drawing it out, or using sticky notes on the wall.

Here’s an example site map for our app:

{image file-path="img/chapters/sleep-app-site-map.png" alt="Flow chart of pages in the sleep habits app."}

This site map should help you to see what pages you need to design, and how they should fit together.
It is a particularly useful tool for visualising the user stories we created in Step 5.

### Step 7: Create a low fidelity prototype

**UX method: Wireframes**

Using our site map, it’s time to start designing the wireframes for the app.
Wireframes are a very common tool used in the early stages of software development as they are an efficient way to plan the layout of content and functionality of a page and therefore help to get ideas out.
They are purely for establishing the basic structure of the pages, before thinking about the content and visual design (i.e. colours, fonts, etc).
Your wireframes don’t need to be anything fancy, a pen and paper will do.
Sketch as many ideas as possible and then from there pick out your favourites.
You might find that this takes a few iterations until you come up with a design you are happy to move further with.

Below are some example wireframes for our app:

{image file-path="img/chapters/sleep-app-wireframes.png" alt="Hand drawn wireframes for four different pages in the app."}

We’re keeping things simple here by just showing 4 pages, usually we’d draw every single page of the app, using as many different layouts as possible.
Our wireframes are nice and simple, with just a few annotations to explain how the user would interact with different parts of the page.

{panel type="teacher-note"}

# Wireframe tips

Encourage the students to come up with multiple different designs, then they should pick their favourite and add annotations (e.g. explain what happens when you click a button, etc).

{panel end}

When drawing our wireframes it was important for us to think about what the user would be doing, thinking and feeling when interacting with the app.
For example, in our MVP we’ve said that our app will give the user a simple survey about how they are feeling.
It’s pretty likely that they are going to be tired first thing in the morning and last thing at night, so our app should reflect that.
A larger survey with long text answers would be overwhelming to the user while they are in this state.
Instead we’ve gone with a simple one word survey, and we’ve associated an emoji with each answer so the user has a visual cue to help them answer the question.

Wireframes are an example of a *low fidelity prototype*, i.e. they are simple and test broad functionality and concepts (such as the flow rather than the visual appearance of the app).

### Step 8: Test

**UX method: Usability testing with low fidelity prototypes**

Before implementing the wireframes, we’ll test them with target users first.
This will give us a chance to see if the design we have proposed is actually working the way we intended it to.
But more importantly, by testing with real users we will be able to see if we have actually designed a viable solution to the problem.
We want to take particular note of what they think of our solution (e.g. does it look to be helpful in addressing their needs?) and how it makes them feel (e.g. does it make them feel more motivated and able to improve their sleep habits?).

There are many different ways to test a low fidelity prototype.
One way is to implement the wireframe on a tool like PowerPoint or Keynote, where clicking a button goes to a different slide.
Another common approach is called paper prototyping.
This is when you model the interface using paper and act as the computer by manually changing the state in real time, i.e. move pieces of paper around to mimic the change in the interface when the user “clicks” buttons.
Pick a method that works for you and test it out on a few different people.

During the tests take note of what goes well and what doesn’t go so well.
Can the user figure out the app without your help?
Are the instructions clear?
Are there any pain points?
Remember that negative feedback is just as useful as positive feedback.
If users feel confused by some actions, then take that on board and adjust your design.
You may find that you want to repeat this step more than once before proceeding.

### Step 9: Create a high fidelity prototype

**UX method: Usability testing with high fidelity prototypes**

Through steps 1-8 we researched our user and used this to understand the features and flow for our app.
Now we are ready to make a high fidelity prototype.
Recall that a low fidelity prototype tests the flow and basic functionality of an app, whereas a high fidelity prototype should appear and function very similarly to the actual app that will be released.
This means that we care about the content, fonts, colours, images, spacing etc.
This is work for a *User Interface (UI) Designer*.

The design of the UI elements matters a lot.
For example, we think that users will likely open the app soon before going to bed, so using extremely bright colours is counterintuitive and will not aid in helping them to go to sleep.

{panel type="curiosity"}

# UX vs UI design

Often UX design and UI design is lumped together into one term (“UI/UX”), but they are two separate things, and in fact, bigger teams will have specific UX and UI designers.

UI Designers are graphic designers.
It is their job to make sure that the app is themed well to match the app's purpose and that it is visually interesting.
Whereas a UX Designer is concerned about how users interact with an app and how it makes them feel.

More reading on UX vs UI is available [here](https://uxplanet.org/what-is-ui-vs-ux-design-and-the-difference-d9113f6612de).

{panel end}

Useful tools for creating a high fidelity prototype could be slideshow software such as PowerPoint, Keynote or Google Slides.
There are even more sophisticated options available such as [InVision](https://www.invisionapp.com/) or [Marvel](https://marvelapp.com/features/prototyping).
These are particularly useful for mimicking the animations that will happen when a user clicks a button on their phone (e.g. the next page sliding in from the left, rather than just “appearing” in our paper prototypes).

Again, we will test our prototype with our users.
Since our high fidelity prototype looks a lot like the final product to our users, they are likely to use it much more naturally (compared to our low fidelity prototype).
This gives us the opportunity to test and validate the usability of the app.
Things to watch out for include:

- Is navigation easy and intuitive?

- Is it obvious how to provide input when required?

- Is the language easy to understand? (e.g. is it clear what headings mean or do they indicate something different to the user?)

- Does the app feel easy or difficult to use? Does it feel smooth or clunky?

We’ll use this feedback to make a few final tweaks to our design (and we could even test again if we had to make substantial changes to the design).

### Step 10: Build and test

**UX method: User interviews**

Finally, it’s time to build the app!
We’ll hand the designs over to the developers and then once it’s built we’ll test it again.

Even though our app is built, that doesn’t mean our job as UX Designers is over!
Often how we imagine a product is being used and how it is really being used are two different things, so we should test our app again to make sure it is meeting the needs of the users and that we have achieved our initial goal: help users to improve their sleep habits.

To investigate this we’ll conduct some one-on-one user interviews.
Interviews are a great way to help us see exactly how users are interacting with the interface.
As the designers of the interface we are experts in how to use it, which means it is easy for us to make the mistake of believing it is intuitive when maybe it is not.
User interviews will quickly bring issues like this to light.

We want to understand what the user is thinking and feeling in our interviews (recall “Think Aloud Protocol” in the section on [interface usability]('chapters:chapter_section' 'human-computer-interaction' 'interface-usability')).
At each step we want to encourage the user to explain what they are thinking as this will give us insight as to what is confusing and why.
We’ll ask them what they are about to do and why, what made them choose that particular button, etc.
It’s important to make sure they feel comfortable explaining what they are doing and therefore we make sure not to criticise their decisions.
Afterall, if users are consistently making the same mistake, then the mistake is in the interface and not the user.

Our user interview will have two parts:

1.  Tasks

    This stage is about understanding how they usually interact with the app, and how they handle being asked to complete unfamiliar tasks.
    We will note down how they complete these tasks, giving particular attention to when they do something incorrect and get stuck or when they do something without realising there is a more efficient way for that task to be completed.

    Asking the user to complete tasks is also a great way to identify any issues.
    It is difficult to come up with an answer for “did any tasks feel awkward, difficult or frustrating?" on the spot, but answers will naturally surface when the user tells you about previous usage, or as you watch them complete a task.

	Questions and tasks could be:

	- *When was the last time you used the app? Please give as much detail as you can.*
	  This is a great question to ask as the interview is an artificial environment we’ve set up, and their behaviour will change slightly because of it, so asking about the last time they used the app will give great insight as to what they are usually doing, feeling and thinking.

	- Please show me how you would set your desired bed time.

	- Please show me how you would set your desired number of hours of sleep.

2.  Questions

	In this stage we want to get more information about how the user feels about the app.

	Questions could be:

	- Is there any feature you feel is missing from the app?

	- What do you like about the app? What do you not like about it?

	- Do you feel that the app is helping you to improve your sleep habits?

{panel type="teacher-note"}

# Interview planning tip

It can be a challenge for students to identify specific tasks sometimes, e.g. they might say the task is “set an alarm”, whereas the real task is to make the alarm sound at a particular time.
In this case, they are mixing up the task with the feature of the app.

{panel end}

The feedback from the one-on-one interviews is what will help us to determine what the next steps are.
Perhaps there is a particular feature a lot of people are requesting, or maybe there is an existing feature being underutilized.
An affinity map could be useful for identifying and prioritising these changes.

### Study overview

In this study we used several different UX methods to take us from a simple idea to a solution.
The table below provides an overview of our study, including what methods we used and the purpose of that method.

| **Step** 	| **Method**                                         	| **Purpose**                                                                                                                      	|
|------	|------------------------------------------------	|------------------------------------------------------------------------------------------------------------------------------	|
| **1**    	| User survey                                    	| Understand the problem and the user.                                                                                         	|
| **2**    	| Competitive analysis                           	| Identify the current solutions, including their strengths and weaknesses.                                                    	|
| **3**    	| Affinity diagram                               	| Identify the main themes from user’s thoughts on the problem.                                                                	|
| **4**    	| Empathy map, user persona and user stories     	| Understand the user’s needs and expectations for the solution.                                                               	|
| **5**    	| Design an MVP (not strictly a UX method)      	| Establish the minimal requirements/features of the application.                                                              	|
| **6**    	| Site map                                       	| Establish the pages that will need to be designed and how they relate to each other.                                         	|
| **7**    	| Low fidelity prototypes (wireframes)           	| Brainstorm design ideas and establish the layout of the app/product.                                                         	|
| **8**    	| Usability testing                              	| Get feedback from users on the flow and feel of the app.                                                                     	|
| **9**    	| High fidelity prototypes and usability testing 	| Get feedback from users on a design that is as close to the actual product as possible to get feedback on the finer details. 	|
| **10**   	| Build and test (user one-on-One interviews)   	| Investigate how users interact with the product, if they use it as intended, and identify any usability flaws.               	|

It is important to note that this is just one UX study and yours could be very different to ours, it could have fewer steps and use completely different methods.
This is because every UX study should be designed to meet the needs and resources for that specific project.
In the following section we’ll cover a few more UX methods that could be used.

## Other UX methods

In this section we’ve listed a few more UX methods that are commonly used.
For a complete list of methods and when to use each, check out [this page from the Nielsen Norman Group](https://www.nngroup.com/articles/which-ux-research-methods/).
[This page from UX Planet](https://uxplanet.org/most-common-ux-design-methods-and-techniques-c9a9fdc25a1e), written by a UX Designer, provides overviews and useful links for many different methods.

**Card Sorting**

This is a method for grouping information into logical groups.
This is particularly useful for content heavy websites and apps (think of websites with a large navigation bar with sub menus).
Users are given labelled cards and asked to sort them into categories.
They can either decide on the categories themselves, or you can provide a predefined set of categories.
The former is useful for learning what terms/labels participants use for the categories, the latter is useful for seeing how users sort the topics into each category.
Like affinity mapping, this is a great opportunity to pull out the sticky notes and cover a wall!

**Information architecture**

This refers to the organisation and structure of information in a website or app.
The goal is to structure the information in such a way that a user can easily find the information they want, in relation to their current “position.”
The information architecture should be carefully thought out, particularly for websites/apps with large amounts of content that contains relationships to each other.
There are many different things information architects need to consider, including cognitive load, visual hierarchy, mental models, and many more.
As UX Designers, card sorting (mentioned above) can be a useful tool to use as a starting point.

Further reading on information architecture is available [here](https://theblog.adobe.com/a-beginners-guide-to-information-architecture-for-ux-designers/).

**Content strategy**

This is closely related to information architecture.
Content strategy is concerned with the planning, creation and delivery of all content on a website/app (i.e. text, images, videos, etc).
This includes conducting user research and a competitive analysis in order to understand what content needs to be created, and from there devising a strategy to create, deliver and maintain the content.

Further reading on content strategy is available [here](https://www.usability.gov/what-and-why/content-strategy.html).

**Usability testing using A/B testing**

A/B testing is when you “split” your users into two groups, where each group is presented with a different interface for the same task.
For example, maybe 50% of visitors to a website are presented with one home page and the other 50% are given a different home page.
The point of this is to analyze which interface performed better (according to whatever metrics you are interested in, e.g. perhaps you are aiming to maximise the time spent on the home page).
This is a useful method for testing new features and/or designs.

**Feedback**

For existing products it is common to assess UX by embedding feedback services within the product itself.
For example:

-   Analytics services (e.g. Google Analytics).
    These services track details about visitors to apps/websites such as:

    -   Time spent on each page

    -   How they got there e.g. by clicking on an ad, organic search (i.e. using a search engine), direct link, etc.

    -   What kind of device they are using e.g. Android phone, iPad, etc.

    This information is very useful to us as it helps us to understand who the audience for our app is and what pages of the app they are (or are not) using.

-   Feedback survey: A simple survey that asks one or two questions asking what the user thinks about the app.

-   Bug reporting: A button somewhere that says “Report an issue” where the user can report any bugs they encounter.
    A buggy app can create a poor user experience, and therefore bug reports should be taken seriously.

**Different kinds of data**

There are several different ways to classify data.
For example:

-   Quantitative vs Qualitative

    -   *Quantitative* data is measured numerically (e.g. “70% of users open the app daily”).
    Whereas *Qualitative* data is more anecdotal (e.g. “A user reported that the font is too small to read on their phone.”).

-   Attitudinal vs Behavioural

    -   *Attitudinal* data measures how users feel about a product (e.g. “many users gave positive reviews on the app store.”).
    Whereas *Behavioural* data explains what users do with the product (e.g. how they navigate through a website).

There are many more ways to classify data.
Different methods will give you different kinds of data, for example, one-on-one user interviews will give you attitudinal and behavioural data (which are both qualitative types of data), whereas analytics collected by Google Analytics will give you have behavioural and quantitative data.
It is important to get a balance of those mentioned above to be informed about your users, and hence why we use multiple different methods when collecting data on our users.

## User experience overview

User experience Design is all about putting yourself in the users' shoes.
What motivates them, how do they behave and what their needs are.
Think about a product you’ve used that made you frustrated, maybe you even avoid having to use it again.
This is likely a product that didn’t use user-centered design, and hence resulted in a negative experience for you.
It is our job as UX Designers to make sure this doesn’t happen.
However, in reality not every software team has a UX designer and therefore it is important that every software engineer should have at least a basic understanding of UX.
This doesn’t mean carrying out a UX study for every design change, but knowing your user and being able to empathise for them will make this process a lot easier.
