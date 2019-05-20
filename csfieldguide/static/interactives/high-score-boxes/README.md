# High Score Boxes Interactive

**Original Author:** Victor Chang

This interactive was developed to give an example of searching to find a maximum
to the learner. The need for an interactive like this arose in the comments
for the source code for the Algorithms chapter in the Field guide. The code for
a program that finds the ”highest score” in an array was given in both Python
and Scratch, but no real example or context was provided, thus the concept for
this interactive was born.

The original idea was that there would be a number of ”boxes” shown to the
user, each containing a number. The user then has to find the highest number
present. Ideally, this interactive will allow the user to ”construct”
the idea of searching to find a maximum themselves. The optimal way
to complete the task is iterating through all the boxes while keeping track of
the highest value so far, which will result in every box only being revealed once.

The user is informed of their ”performance” in the interactive upon
submission of the form - whether they were correct and whether they have
”solved” the interactive in the most efficient manner. The user will also be
informed if they were especially lucky (i.e. submitted the correct answer
without checking every box). The user is also informed about the time
taken to complete the interactive if they were correct and efficient.

## Required Files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.
