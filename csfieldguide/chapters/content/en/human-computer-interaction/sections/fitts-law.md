# Pointing at things: Fitts' Law

A lot of interfaces use pointing as input: clicking on the screen with a mouse, pointing on a phone with your finger, or tapping with a pen are common.
Since these techniques are used so often, it's good to know how much time they will take.
Should you have bigger buttons on a screen so they are easier to press? Or is it better to have lots of small ones close together?
And how is the affected if you're in a difficult environment such as bouncing around in a vehicle or helping after a natural disaster?

The amount of time it takes to point at things on a digital device is surprisingly predictable, and we're going to explore a common way to make predictions about this based on the work of the psychologist Paul Fitts.

Try the following experiment to see how quickly you're able to point at different "targets", and think about what makes pointing slower or faster for different layouts. The experiment will collect some data that you can save in a file to analyse later.

{interactive slug="fitts-law" type="whole-page" text="true"}
Fitts\' Law Experiment
{interactive end}

This experiment demonstrates how the amount of time it takes to point at object depends on two things:
- the width of the object and
- the distance you have to move to point at it.

This observation can be measured mathematically using a formula known as Fitts' law.


## Fitts' Law

Fitts' law gives a formula to help us estimate how long it will take someone to click or tap at something on a screen.
The thing that you're pointing at might be a button, menu, sprite, text box or something else, but the general word we use for it is the "target".
When we write a formula for this, we use D for the distance to the target, and W for the "width" (size) of the target.

{image file-path="img/chapters/fitts-distance-and-width.png" alt="A diagram explaining what D and W are."}

The units of measurement don't really matter as long they are consistent - it might be pixels, centimetres or inches.

The heart of Fitts' law is the ratio of D/W. For example, if you need to move a mouse 14cm to get to a 2cm target, D is 14cm and W is 2cm, so D/W is 7.

One simple prediction from Fitts' law predicts that if this ratio is the same, then the time to point at the target will be the same.
For example, moving a distance of 7cm to get to a 1cm target also has D/W ratio of 7, so should take about the same amount of time as moving 14cm to a 2cm target.

However, if the ratio doubles, the time *does not* double. In fact it only goes up a small amount.
To work this out, Fitts introduced the "Index of Difficulty" (ID), which is proportional to how long it should take to point at a target.
The formula for the Index of Difficulty is as follows; you don't need to worry too much about the details because we've provided a calculator to work it out.

#**** embed the ID calculator here ******

For example, if you put in a distance of 14 and a width of 2, the index of difficulty is 3.0.
If you wanted to make the pointing take twice as long, you'd need the ID to be twice as much (6.0).
Try experimenting with the distance in the formula above to get an ID of 6.0.
You'll find that it needs to be more than twice as big; in fact, it needs to be 126cm --- that's right, the distance needs to be a lot larger to make the pointing take twice as long.


{panel type="curiosity"}

# Understanding Fitts' formula

The experiment that you've been using already calculates the ID, so you don't need to worry about these details too much, but in case you're wondering, here's how it works.

The  \( \log_{2} \) function in the formula means the "logarithm to base 2".
which is just the number of times you can multiply by 2 until you get to that number.
For example, the logarithm of 8 is 3, because it is \( 2 \times 2 \times 2 \).
The logarithm of 32 is 5, since \( 32 = 2 \times 2 \times 2 \times 2 \times 2 \) i.e. two multiplied by itself 5 times.

An easy way to calculate a base 2 logarithm  using the Google search box; to get the base 2 logarithm of 32, you can type "log2 32" (without the inverted commas).

You could also work our roughly what it is by halving the number until you get close to 1. For example, if you start with 30, and halve it to get 15, then 7.5, then 3.75, then 1.875, then 0.9375, that is 5 halvings to get to just under 1, so log2 of 30 must be just under 5.

You can also work it out in a spreadsheet using the formula =LOG(A1,2) to get the logarithm of cell A1.

In Fitts' law, you just calculate (D/W + 1) and then put it into the log2 function to get the index of difficulty. That's what is meant by:
\[
  ID = \log_{2} (D/W + 1)
  \]

The main point about the "logarithmic" relationship is that doubling the distance doesn't double the time taken to point; it only has a small effect on the time.
Logarithms come up a lot in computer science; the same thing happens with the binary search algorith: searching twice as much data doesn't take twice as long.
It also happens with binary data representation: if you have twice as many numbers to represent, you only need to use one more bit to the representation.
In fact, the units of measurement for Fitts' ID is bits.

By the way, there are a few very slightly different versions of the formula for Fitts' law, but the one we've used here is one of the more popular ones.
{panel end}

You can estimate how long pointing will take by using the data from the experiment above (or run it again using this interactive[[link to interactive slug="fitts-law"]]).
Save the data to a file, or copy it to the clipboard, and then load the data into a spreadsheet.

[Instructions on plotting trend line in spreadsheet to be added]

Fitts' law predicts that the time taken to point at a target will be proportional to the "Index of Difficulty".
We can test this with your experimental data.

To do this, put the data into a spreadsheet (Excel or Google sheets work fine), and graph a scatterplot of the ID and time taken as follows:
 - select the two columns (Index of Difficulty, Average Time)
 - click on the "Insert" menu
 - choose "Chart"
 - choose Scatter as the kind of chart.

This should produce a chart something like the following:

{image file-path="img/chapters/fitts-scatter.png" alt="A diagram showing a scatter plot from Fitts' experiment."}

To make predictions from this graph, you can add a trend line to it. Here's how to do it on Excel or Google sheets:

{panel type="project"}

# Adding a trend line in Excel

- Right-click on any data point and choose "Add trend line"
- Make sure that "Linear" is chosen in the options
- Select "Display equation on chart"
- Select "Display R-squared value on chart"
- Change the axes to start at zero
- Adjust the "Forecast" so that the trendline crosses the y-axis
{panel end}

{panel type="project"}

# Adding a trend line in Google sheets

- Use the "Chart editor" on the right of the window (double click on the chart if it isn't visible)
- At the right, click on "Customize"
- Choose "Series"
- Select "Trendline"
= Under "Label" select "Use equation"
- Select "Show \( R^2 \)"

{panel end}

You should end up with a graph like the following one:

{image file-path="img/chapters/fitts-scatter-regression.png" alt="A diagram showing a scatter plot from Fitts' experiment."}


This particular graph can be used how long it would take someone to point at a different sized object at a different position; all you need to do is work out the ID using the formula above, and then look it up on the chart.
For example, if a new button was placed with an ID of 3.0, the graph indicates that it would take about 850 milliseconds to point at it.
If you make it bigger, the ID would be less, but even it is huge, you can see that for this particular user, it will still probably take about 500 milliseconds (half a second).

It's important to note that this estimate only applies for the person and the pointing device that the experiment was done with, and of course, it's only an estimate.

The \(R^2\) value (which is 0.721 in the graph above) tells you how well correlated the measurements are.
If the value is 1, the correlation is perfect, but not all the dots are close to the line, so we can see that this experiment had a bit of variation.

The formula that is given (which is 197*x + 278 in the graph above) can be used to calculate values.
The x variable is the ID value, so if the ID is 3.0, the estimated time is 197*3.0 + 278, which is 869.
That's a more accurate version of what we read off the graph for ID = 3.0

#{image file-path="img/chapters/fitts-velocity-profile.png" alt="A diagram showing the different stages of rapid aimed movement."}

Fitts' law is used in designing all sorts of interfaces to predict how efficient they will be to use, without having to build the interface and have someone try it out.

Fitts' law applies to many forms of pointing: clicking a mouse, touching a screen, using a stylus, using a touchpad, and even moving between dance pads or the brake and accelerator pedals in a car!
You only need to measure how long pointing takes on your device for one or two layouts, and then you can use the formula to predict how long other layouts of the interface will take, or how long other tasks will take.
As a simple example, you could measure how long it takes to dial a two-digit phone number, and from that work out how long other numbers would take to dial; for example, 555 will be a lot faster than 191, and Fitts' law can be used estimate what the difference is.

A particularly interesting example of pointing is to menus at the top of a screen.
At first you might think it would be fairly slow because it is a small word a long way from other places on the screen.
However, if you 'overshoot' when pointing to the top of the screen, the cursor stays at the top. This means that the size of the target is actually very big and users can be fairly careless about pointing exactly at the menu word.
Based on Fitts' law, if the target is very big, it will be very fast to point at, making this some of the most valuable real estate on the screen!



#  - Another Fitts' Law experiment at http://simonwallner.at/ext/fitts/.


## Pointing in non-ideal environments

Sometimes pointing at objects in a device is difficult, particularly if you are being bounced around in a vehicle.
Imagine you're on a fire engine racing through traffic, or a plane being bounced around by turbulence.
In these situations, operating devices to find a route or get information is critical, yet the environment can make it challenging.

Try the following interactive where you'll get to experience this firsthand.

{interactive slug="plane-turbulence" type="whole-page" text="true"}
{interactive end}

{comment Change name once we have decided!}

The basic ideas from Fitts' law still apply in this situation, but things are a whole lot harder.


{panel type="curiosity"}

# Fitts and plane interfaces
Interestingly, Paul Fitts worked on interfaces for planes, although one of his main achievements was with B-17 bombers used in World War II.
A number of times these planes would survive a dangerous mission, only to inexplicably crash when they were coming in to land.
For a long time these accidents were put down to "pilot error".

After a lot of investigation, Fitts found that the controls for the landing gear and the flaps were almost identical, and pilots (without even realising) would engage the wing flaps instead of lowering the landing gear, leading to the unfortunate consequence of bringing the plane down heavily without the landing gear down.

This is a good example of a bad interface, and was an early turning point where it became apparent that the design of an interface might be more to blame than the competence of the user.

{panel end}

For a more controlled experiment on how shaking affects the index of difficulty, the following interactive lets you try it out while the target button is moving around.
It's hard work, but this will give you insight into how people need to design interfaces for people working in difficult environments where they are moving around a lot!

{interactive slug="clicking-with-shaking" type="whole-page" text="true"}

Clicking with Shaking

{interactive end}

You could compare the index of difficulty for the moving target with the one for a still target to see how much harder it is!

This kind of experiment is used to inform people making mobile devices, such as a radio that police or firefighters would use while driving or working in a dangerous situation.
They also need to take into account factors such as the user wearing safety equipment like gloves and helmets.
An ordinary mobile phone interface just won't work in those situation!
