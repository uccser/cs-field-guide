# Delay Anaylser Interactive

**Original Author:** Rhem Munro  
**Modified By:** Jack Morgan

This interactive is created for testing users reaction times and showing what they perceive as a delay. The interactive provides statistics after running the experiment to show what delays the user perceived.

The original code was provided by Rhem Munro (around 2012/2013), and was modified to fit the new CSFG requirements (responsive design, etc) by Jack Morgan (in 2015).

## Degree of accuracy in delays

Tiles are revealed at a set delay however computers do take time to process the instructions to perform the actions. On standard computer hardware with an updated browser, the delay may have up to an extra 25 milliseconds added. This seems to happen more for lower times like 0 delay, but for tiles with 600 the added delay is much smaller (around 1-2 milliseconds). To test the timings, we had to add extra processing times so real world performance should be slower as performance testing code is removed.

## Changes to consider

- Should 0 delay be removed since all clicks have a small delay (or possibly switched to 10-15), and a 1000 delay added.
- Should the user be able to change previous tiles (old version you were unable to but this fixes misclicks).
- Should grid be visible after statistics are shown.

## Required Files

- This interactive uses jQuery (loaded from base-files folder).
