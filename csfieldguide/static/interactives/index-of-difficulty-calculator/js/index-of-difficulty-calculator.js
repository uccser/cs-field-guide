/**
 * A script for calculating the index of difficulty.
 */

/**
 * The distance to the target.
 * @type {number}
 */
let distance = 0;

/**
 * The input for the distance to the target.
 * @type {null}
 */
let distanceInput = null;

/**
 * The width of the target.
 * @type {number}
 */
let width = 0;

/**
 * The input for the width of the target.
 * @type {null}
 */
let widthInput = null;

/**
 * The calculated index of difficulty.
 * @type {number}
 */
let indexOfDifficulty = 0;

/**
 * The original formula.
 * Changing this formula requires changes in updateEquation().
 * @type {string}
 */
let originalFormula = `ID = \\log_{2}\\left({D \\over W}+1\\right)`;

/**
 * The MathJax element for the original formula.
 * @type {null}
 */
let originalFormulaMathJax = null;

/**
 * The MathJax element for the completed formula.
 * @type {null}
 */
let completedEquationMathJax = null;

/**
 * The MathJax element for the Index of Difficulty value.
 * @type {null}
 */
let indexOfDifficultyValueMathJax = null;

/**
 * The div element for results.
 * @type {null}
 */
let resultsDiv = null;

/**
 * The div element for the rounding disclaimer.
 * @type {null}
 */
let roundingDisclaimerDiv = null;


$(document).ready(function () {
    distanceInput = document.getElementById("input-distance");
    widthInput = document.getElementById("input-width");
    resultsDiv = document.getElementById("results");
    roundingDisclaimerDiv = document.getElementById("rounding-disclaimer");

    // Run once MathJax is ready.
    MathJax.Hub.Queue(function () {
        originalFormulaMathJax = MathJax.Hub.getAllJax("original-formula")[0];
        completedEquationMathJax = MathJax.Hub.getAllJax("completed-equation")[0];
        indexOfDifficultyValueMathJax = MathJax.Hub.getAllJax("iod-value")[0];
        MathJax.Hub.Queue(["Text", originalFormulaMathJax, originalFormula]);

        $("#fitts-law-calculator #calculate-button").on("click", calculateEquation);
        $("#fitts-law-calculator input").on("keypress", function (event) {
            // If enter key is pressed
            if (event.which == 13) {
                calculateEquation();
            }
        });
        // Show interactive once ready
        document.getElementById("fitts-law-calculator").classList.remove('d-none');
    });

});


function calculateEquation(event) {
    resultsDiv.classList.add("invisible");
    distance = distanceInput.value;
    width = widthInput.value;
    indexOfDifficulty = Math.log2((distance / width) + 1);

    // If whole number or only 1 decimal place
    if ((indexOfDifficulty * 10) % 1 == 0) {
        roundingDisclaimerDiv.classList.add("invisible");
    } else {
        indexOfDifficulty = Number(indexOfDifficulty).toFixed(1);
        roundingDisclaimerDiv.classList.remove("invisible");
    }

    completedFormula = `${indexOfDifficulty} = \\log_{2}\\left({${distance} \\over ${width}}+1\\right)`;
    indexOfDifficultyValue = `ID = ${indexOfDifficulty}`;

    MathJax.Hub.Queue(["Text", completedEquationMathJax, completedFormula]);
    MathJax.Hub.Queue(["Text", indexOfDifficultyValueMathJax, indexOfDifficultyValue]);
    MathJax.Hub.Queue(
        function () {
            resultsDiv.classList.remove("invisible");
        }
    );

};
