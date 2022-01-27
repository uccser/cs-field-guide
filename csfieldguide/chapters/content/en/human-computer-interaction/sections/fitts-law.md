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

****Jack: embed the ID calculator here ******

For example, if you put in a distance of 14 and a width of 2, the index of difficulty is 3.0.
If you wanted to make the pointing take twice as long, you'd need the ID to be twice as much (6.0).
Try experimenting with the distance in the formula above to get an ID of 6.0.
You'll find that it needs to be more than twice as big; in fact, it needs to be 126cm --- that's right, the distance needs to be a lot larger to make the pointing take twice as long.

******Jack Dropdown Understanding the Fitts' formula

The experiment that you've been using already calculates the ID, so you don't need to worry about these details too much, but in case you're wondering, here's how it works.

The  [\log_{2}] function in the formula means the "logarithm to base 2".
which is just the number of times you can multiply by 2 until you get to that number.
For example, the logarithm of 8 is 3, because it is 2x2x2. The logarithm of 32 is 5, since 32 = 2x2x2x2x2 i.e. two multiplied by itself 5 times.

An easy way to calculate a base 2 logarithm  using the Google search box; to get the base 2 logarithm of 32, you can type "log2 32" (without the inverted commas).

You could also work our roughly what it is by halving the number until you get close to 1. For example, if you start with 30, and halve it to get 15, then 7.5, then 3.75, then 1.875, then 0.9375, that is 5 halvings to get to just under 1, so log2 of 30 must be just under 5.

You can also work it out in a spreadsheet using the formula =LOG(A1,2) to get the logarithm of cell A1.

In Fitt's law, you just calculate (D/W + 1) and then put it into the log2 function to get the index of difficulty. That's what is meant by:
[
  ID = \log_{2} (D/W + 1)
  \]

******Jack end of dropdown

You can estimate how long pointing will take by using the data from the experiment above (or run it again using this interactive[[link to interactive slug="fitts-law"]]).
Save the data to a file, or copy it to the clipboard, and then load the data into a spreadsheet.

[Instructions on plotting trend line in spreadsheet to be added]

{comment Most of this information is derived from COSC368 notes written by Andy Cockburn. }

- What is Fitts' Law
  - Model of rapid aimed human movement
  - Explain the distance of movement (D) and width (W) of target using a diagram.
  - Explain the Index of Difficulty (ID) formula, which measures the difficulty of rapid aimed movement. Units is bits.
  - \[
    ID = \log_{2} (D/W + 1)
    \]
  - Note the log relationship. E.g. doubling the distance (A) does not double the ID.
  - Movement time (MT) is linear with ID
  - Explain the MT formula. Note other formulas for MT exist.
  - \[
    MT = a + b * ID
    \]
  - The a and b values must be found empirically. Explain what this means.
  - For a mouse, a is typically around 200-500 ms, while b is typically around 100-300 ms/bit
  - Explain the velocity profile. Has an open-loop phase (shooting your pointer to approximately where the target is), and the close-loop phase (making small adjustments).
- Why do we care about Fitts' Law?
  - Helps UI designers (e.g. make commonly used buttons bigger, reduce the distance between buttons that are often used together)
  - Use the Fitts' Law Experiment Interactive below.
  - Another Fitts' Law experiment at http://simonwallner.at/ext/fitts/.



{image file-path="img/chapters/fitts-velocity-profile.png" alt="A diagram showing the different stages of rapid aimed movement."}

Fitts' law applies to many forms of pointing: clicking a mouse, touching a screen, using a stylus, using a touchpad, and even moving between dance pads or the brake and accelerator pedals in a car!
You only need to measure how long pointing takes on your device for one or two layouts, and then you can use the formula to predict how long other layouts of the interface will take, or how long other tasks will take.
As a simple example, you could measure how long it takes to dial a two-digit phone number, and from that work out how long other numbers would take to dial; for example, 555 will be a lot faster than 191, and Fitts' law can be used estimate what the difference is.

A particularly interesting example of pointing is to menus at the top of a screen.
At first you might think it would be fairly slow because it is a small word a long way from other places on the screen.
However, if you 'overshoot' when pointing to the top of the screen, the cursor stays at the top. This means that the size of the target is actually very big and users can be fairly careless about pointing exactly at the menu word.
Based on Fitts' law, if the target is very big, it will be very fast to point at, making this some of the most valuable real estate on the screen!


## Pointing in non-ideal environments

Sometimes pointing at objects in a device is difficult, particularly if you are being bounced around in a vehicle.
Imagine you're on a fire engine racing through traffic, or a plane being bounced around by turbulence.
In these situations, operating devices to find a route or get information is critical, yet the environment can make it challenging.

Try the following interactive where you'll get to experience this firsthand.

{interactive slug="plane-turbulence" type="whole-page" text="true"}
{interactive end}

{comment Change name once we have decided!}

The basic ideas from Fitts' law still apply in this situation, but things are a whole lot harder.


****Jackdrop down panel - curiosity: Fitts and plane interfaces
Interestingly, Paul Fitts worked on interfaces for planes, although one of his main achievements was with B-17 bombers used in World War II.
A number of times these planes would survive a dangerous mission, only to inexplicably crash when they were coming in to land.
For a long time these accidents were put down to "pilot error".

After a lot of investigation, Fitts found that the controls for the landing gear and the flaps were almost identical, and pilots (without even realising) would engage the wing flaps instead of lowering the landing gear, leading to the unfortunate consequence of bringing the plane down heavily without the landing gear down.

This is a good example of a bad interface, and was an early turning point where it became apparent that the design of an interface might be more to blame than the competence of the user.
****** end dropdown

For a more controlled experiment on how shaking affects the index of difficulty, the following interactive lets you try it out while the target button is moving around.
It's hard work, but this will give you insight into how people need to design interfaces for people working in difficult environments where they are moving around a lot!

{interactive slug="clicking-with-shaking" type="whole-page" text="true"}

Clicking with Shaking

{interactive end}
