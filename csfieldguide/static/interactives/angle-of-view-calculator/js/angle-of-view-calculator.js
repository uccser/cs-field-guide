/**
 * An object containing important variables for the ruler length visible input.
 */
let rulerInput = {
  button: null,
  field: null
}

/**
 * An object containing important variables for the distance to ruler input.
 */
let distanceInput = {
  button: null,
  field: null
}


/**
 * Initialization. Assigns the values in the rulerInput and distanceInput objects. Prepares the unit dropdown and 'Go!'
 * buttons.
 */
$(document).ready(function () {
  rulerInput.button = $('#ruler-unit');
  rulerInput.field = document.getElementById("ruler-length");
  distanceInput.button =  $('#distance-unit');
  distanceInput.field= document.getElementById("ruler-distance");

  $('#ruler-unit-list a').on('click', function () {unitChangeHandler($(this), rulerInput)});
  $('#distance-unit-list a').on('click', function () {unitChangeHandler($(this), distanceInput)});
  $('#go-button').click(displayResult);
});


/**
 * Handles when the user changes the unit. Updates the displayed unit and converts the unit if necessary.
 */
function unitChangeHandler(selectedUnit, input) {
  let hasChanged = input.button.html() !== $(this).text();
  input.button.html(selectedUnit.text());
  if (hasChanged) {
    if (input.button.html() === "Inches") {
      input.field.value = metresToInches(input.field.value)
    } else {
      input.field.value = inchesToMetres(input.field.value)
    }
  }
}


/**
 * Converts metres to inches.
 * @param metres Int distance in metres.
 * @returns {number} Int distance in inches.
 */
function metresToInches(metres) {
  return  metres * 39.37007874;
}


/**
 * Converts inches to metres.
 * @param inches Int distance in inches.
 * @returns {number} Int distance in metres.
 */
function inchesToMetres(inches) {
  return inches / 39.37007874;
}


/**
 * Checks all the inputs have been supplied and are valid. If so, displays the calculated result.
 */
function displayResult() {
  if (document.getElementById("ruler-length").value === "") {
    alert("Provide a valid ruler length visible.");
    return;
  } else if (document.getElementById("ruler-distance").value === "") {
    alert("Provide a valid distance to the ruler.");
    return;
  }

  document.getElementById("result-title").style.visibility = "visible";
  document.getElementById("result").innerHTML = calculateAngle() + " degrees";
}


/**
 * Calculates the angle of view and returns it as a string rounded to 4 decimal places. Converts inches to metres if
 * necessary.
 * @returns {string} The angle of view as a String rounded to 4 dp.
 */
function calculateAngle() {
  let rulerLength = rulerInput.field.value;
  let rulerDistance = distanceInput.field.value;

  if (rulerInput.button.html() === "Inches") {
    rulerLength = inchesToMetres(rulerLength);
  }
  if (distanceInput.button.html() === "Inches") {
    rulerDistance = inchesToMetres(rulerDistance);
  }

  let angle = 2 * Math.atan(rulerLength / (2 * rulerDistance)) * (180 / Math.PI);
  return angle.toFixed(4)
}