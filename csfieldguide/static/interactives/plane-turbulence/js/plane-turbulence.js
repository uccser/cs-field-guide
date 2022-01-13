/**
 * The airplane svg.
 */
let svg;

/**
 * The de-ice button container.
 */
let deIceButton;

/**
 * The seatbelt button container.
 */
let stbtButton;

/**
 * The vhf1 button container.
 */
let vhf1Button;

/**
 * The vhf2 button container.
 */
let vhf2Button;

/**
 * The attendant button container.
 */
let attButton;

/**
 * The engine 1 ice warning light.
 */
let eng1WarningLight;

/**
 * The engine 2 ice warning light.
 */
let eng2WarningLight;

/**
 * The communications active frequency text.
 */
let commsValue1;

/**
 * The communications stand-by frequency text.
 */
let commsValue2;

/**
 * The auto-pilot on button container.
 */
let autoPilotOnButton;

/**
 * The auto-pilot nav button container.
 */
let autoPilotNavButton;

/**
 * The auto-pilot fd2 button container.
 */
let autoPilotFd2Button;

/**
 * The communications switch button.
 */
let commsSwitchButton;

/**
 * The vents button container.
 */
let ventButton;

/**
 * The transponder increment button at the first position.
 */
let transponderValuePos1Add;

/**
 * The transponder increment button at the second position.
 */
let transponderValuePos2Add;

/**
 * The transponder increment button at the third position.
 */
let transponderValuePos3Add;

/**
 * The transponder increment button at the fourth position.
 */
let transponderValuePos4Add;

/**
 * The transponder decrement button at the first position.
 */
let transponderValuePos1Subtract;

/**
 * The transponder decrement button at the second position.
 */
let transponderValuePos2Subtract;

/**
 * The transponder decrement button at the third position.
 */
let transponderValuePos3Subtract;

/**
 * The transponder decrement button at the fourth position.
 */
let transponderValuePos4Subtract;

/**
 * A div laid over the svg to show the red flash effect.
 */
let overlay;

/**
 * The main menu div laid over the svg.
 */
let menu;

/**
 * The p for showing the current instruction.
 */
let instructions;

/**
 * The transponder number.
 */
let transponderNumber;

/**
 * Which stage the game is currently at.
 * @type {number}
 */
let stageNum = 0;

/**
 * Which set of the current stage the game is at.
 *
 * The set order is randomised for each stage.
 * @type {number}
 */
let setNum = 0;

/**
 * Which instruction of the current set of the current stage the game is at.
 * @type {number}
 */
let instructionNum = 0;

/**
 * The list of stages.
 *
 * The stages are represented as a list of lists of lists. The outermost list are the stages. Each stage is another
 * list containing sets. Each set is another list containing instruction objects.
 *
 * This example has two stages. The first stage has two sets, each with two instructions. The second stage only has
 * one set with two instructions.
 * [
 *   [
 *     [instruction A1, instruction A2],
 *     [instruction B1, instruction B2]
 *   ],
 *
 *   [
 *     [instruction A3, instruction A4],
 *   ],
 * ]
 *
 * Instruction object keys are explained as follows ('*' means the key is required):
 * relevantWidgets* - A list of elements that are relevant to this instruction. Other elements will result in flash
 *                    being called when clicked.
 * isSatisfied* - A function that must return a boolean, where True means the instruction requirements have been
 *                satisfied.
 * description* - The description of the instruction displayed to the user.
 * resultFunction - A function that can implement any post-conditions that should occur upon satisfaction. The function
 *                  can be async. handleSatisfied will await the function when calling it.
 *
 * Some instructions may have other keys, but these are not used outside of the object.
 */
let stages;

/**
 * The stage 2 cloud 1 SVG element.
 */
let stage2Cloud1;

/**
 * The stage 2 cloud 2 SVG element.
 */
let stage2Cloud2;

/**
 * The stage 2 cloud 3 SVG element.
 */
let stage2Cloud3;

/**
 * The stage 3 cloud 1 SVG element.
 */
let stage3Cloud1;

/**
 * The stage 3 cloud 2 SVG element.
 */
let stage3Cloud2;

/**
 * The stage 3 cloud 3 SVG element.
 */
let stage3Cloud3;

/**
 * The ice SVG element.
 */
let ice;

/**
 * Prepares the game while it is obstructed by the main menu.
 *
 * Assigns the global variable elements not contained within the SVG (e.g. the menu div). Calls setupSVGElements to
 * prepare the SVG, and calls createStages to prepare the stages. Finally, sets the play button's onclick listener.
 */
$(document).ready(function () {
  instructions = document.getElementById("instructions-p");
  svg = document.getElementById("svg-wrapper").firstElementChild;
  overlay = document.getElementById("overlay");
  menu = document.getElementById("menu");

  // Must be called before createStages, as createStages uses variables assigned by setupSVGElements.
  setupSVGElements();
  createStages();
  document.getElementById("play-button").onclick = startGame;
})


/**
 * Starts the game.
 *
 * Hides the menu so the game view is visible, and calls handleSatisfied to run the resultFunction of the first
 * instruction where isSatisfied is presumed to be true.
 */
function startGame() {
    $(menu).animate({ opacity: "0" }, 800, function () {
        menu.hidden = true;
    })
    handleSatisfied();
}


/**
 * A Promise-based implementation of setTimeout.
 *
 * @param ms The time to wait for in milliseconds.
 * @returns {Promise<unknown>} A Promise that can be awaited.
 */
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Instantiates the stages.
 *
 * Stages without any weather sets are created first. This is so that each stage can be shuffled to randomised the
 * order of sets. addWeatherInstruction is called multiple times at the end to add these weather sets.
 */
function createStages() {
  stages = [
    [
      [
        {
          relevantWidgets: [],
          isSatisfied: function() {
            return true;
          },
          description: "",
          resultFunction: async function() {
            await timeout(3000);
          },
        }
      ]
    ],

    [
      [
        {
          relevantWidgets: [stbtButton],
          isSatisfied: function() {
            return isGlowing(stbtButton);
          },
          description: "Turn on the seatbelt sign, labelled 'STBT'.",
        },
      ],
      [
        {
          relevantWidgets: [autoPilotOnButton],
          isSatisfied: function() {
            return !isGlowing(autoPilotOnButton);
          },
          description: "Turn off the autopilot.",
          resultFunction: function() {
            toggleGlow(autoPilotNavButton);
            toggleGlow(autoPilotFd2Button);
          },
        },
      ]
    ],

    [
      [
        {
          relevantWidgets: [vhf1Button],
          isSatisfied: function() {
            return isGlowing(vhf1Button);
          },
          description: "Change the communications to 'VHF1'.",
          resultFunction: function() {
            toggleGlow(vhf2Button);
          },
        },
        {
          relevantWidgets: [commsSwitchButton],
          activeInit: commsValue1.textContent.trim(),
          stbyCrsInit: commsValue2.textContent.trim(),
          isSatisfied: function() {
            return commsValue1.textContent === this.stbyCrsInit && commsValue2.textContent === this.activeInit;
          },
          description: "Transfer standby and active communication frequencies.",
        },
      ],
    ],

    [
      [
        {
          relevantWidgets: [],
          isSatisfied: function() {
            return true;
          },
          description: "",
          resultFunction: async function() {
            await timeout(2000);
            toggleGlow(eng2WarningLight);
            await timeout(1000);
            toggleGlow(eng1WarningLight);
            await timeout(500);
          },
        },
        {
          relevantWidgets: [deIceButton],
          isSatisfied: function() {
            return isGlowing(deIceButton);
          },
          description: "The engines are icing up! Turn on 'DE-ICE'.",
          resultFunction: function() {
            setTimeout(function() {
              toggleGlow(eng1WarningLight);
              toggleGlow(eng2WarningLight);
            }, 5000);
          },
        },
      ],

      [
        {
          relevantWidgets: [ventButton],
          isSatisfied: function() {
            return !isGlowing(ventButton);
          },
          description: "Turn off the vents, with the 'VNT' button.",
        }
      ]
    ],

    [
      [
        {
          relevantWidgets: [],
          isSatisfied: function() {
            return true;
          },
          description: "",
          resultFunction: function() {
            flashACP(attButton);
          },
        },
        {
          relevantWidgets: [attButton],
          isSatisfied: function() {
            return isGlowing(attButton);
          },
          description: "A flight attendant wants to talk to you. Push the 'ATT' button.",
        },
        {
          relevantWidgets: [transponderValuePos1Add, transponderValuePos2Add, transponderValuePos3Add,
            transponderValuePos4Add, transponderValuePos1Subtract, transponderValuePos2Subtract,
            transponderValuePos3Subtract, transponderValuePos4Subtract],
          isSatisfied: function() {
            return transponderNumber.textContent === "7700";
          },
          description: "The flight attendant says a passenger is having a medical emergency. We should ask for " +
            "priority landing. Set the transponder to 7700.",
          resultFunction: function() {
            svg.style.setProperty('--severity', "3");
          },
        },
      ]
    ]
  ]

  for (let i = 0; i < stages.length; i++) {
    shuffleArray(stages[i]);
  }

  addWeatherInstruction(0, {}, 0.25);
  addWeatherInstruction(1, {}, 1);
  addWeatherInstruction(2, {[stage2Cloud1.id]: 2, [stage2Cloud2.id]: 2, [stage2Cloud3.id]: 5}, 2);
  addWeatherInstruction(3, {[stage3Cloud1.id]: 2, [stage3Cloud2.id]: 2, [stage3Cloud3.id]: 5}, 3, true);
  addWeatherInstruction(4, {}, 4);
}


/**
 * A helper function to add a weather-related set containing a single instruction to the stage at index stageNum.
 *
 * The instruction is added to the beginning of a stage (i.e. a new set at the start of the stage containing a single
 * instruction). As such, it needs to be called after any shuffling of sets has occurred as it should be the first set.
 *
 * The instruction has no conditions for satisfaction, allowing the resultFunction to be executed automatically. The
 * description is empty. The result function will update the turbulence animation with the new turbulenceSeverity,
 * and an icing animation if isIcing is true, and add a cloud animation for each cloud specified in cloudToTimes.
 *
 * @param stageNum The index of the stage to add it to.
 * @param cloudToTimes An object mapping cloud element IDs to the time it takes to fade in (in seconds).
 * @param turbulenceSeverity The severity of the turbulence as a number.
 * @param isIcing A boolean of whether the plane should ice up. False by default.
 */
function addWeatherInstruction(stageNum, cloudToTimes, turbulenceSeverity, isIcing=false) {
  let weatherUpdate = {
    relevantWidgets: [],
    isSatisfied: function() {
      return true;
    },
    description: "",
    resultFunction: async function() {
      svg.style.setProperty('--severity', turbulenceSeverity.toString());

      if (isIcing) {
        ice.style.animation = `fade-in 2s forwards`;
      }

      for (const [cloudId, time] of Object.entries(cloudToTimes)) {
        let cloud = svg.getElementById(cloudId);
        cloud.style.animation = `fade-in ${time}s forwards`;
      }

      await timeout( Math.max(...Object.values(cloudToTimes)) * 1000);
    }
  }

  stages[stageNum].unshift([weatherUpdate]);
}


/**
 * Shuffles the elements in an array randomly.
 *
 * Taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param array The array to shuffle.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


/**
 * Gets the current instruction object.
 * @returns {*} The latest instruction object.
 */
function currentInstruction() {
  return stages[stageNum][setNum][instructionNum];
}


/**
 * Updates the instructions p element with the description of the current instruction.
 */
function updateInstructions() {
  instructions.innerText = currentInstruction().description;
}


/**
 * Assigns the global variables that are children of the svg, and assigns click handlers to these.
 *
 * Also turns off buttons that should be off at the start, and initialises the weather.
 */
function setupSVGElements() {
  deIceButton = svg.querySelector("#button-de-ice-container");
  stbtButton = svg.querySelector("#button-stbt-container");
  vhf1Button = svg.querySelector("#button-vhf1-container");
  vhf2Button = svg.querySelector("#button-vhf2-container");
  attButton = svg.querySelector("#button-att-container");
  eng1WarningLight = svg.querySelector("#light-warn-eng-1-ice");
  eng2WarningLight = svg.querySelector("#light-warn-eng-2-ice");
  commsValue1 = svg.querySelector("#comms-value-1");
  commsValue2 = svg.querySelector("#comms-value-2");
  autoPilotOnButton = svg.querySelector("#button-autopilot-on-container");
  autoPilotNavButton = svg.querySelector("#button-autopilot-nav-container");
  autoPilotFd2Button = svg.querySelector("#button-autopilot-fd2-container");
  commsSwitchButton = svg.querySelector("#button-comms-switch");
  ventButton = svg.querySelector("#button-vnt-container");

  stage2Cloud1 = svg.querySelector("#stage-2-cloud-1");
  stage2Cloud2 = svg.querySelector("#stage-2-cloud-2");
  stage2Cloud3 = svg.querySelector("#stage-2-cloud-3");
  stage3Cloud1 = svg.querySelector("#stage-3-cloud-1");
  stage3Cloud2 = svg.querySelector("#stage-3-cloud-2");
  stage3Cloud3 = svg.querySelector("#stage-3-cloud-3");
  ice = svg.querySelector("#ice");

  let allButtons = svg.querySelectorAll('[id$="-container"]');
  for (let button of allButtons) {
    button.onclick = flash;
  }
  svg.querySelector("#dials").onclick = flash;

  // Replaces the onclick for elements that should not flash for all clicks.
  for (let button of [deIceButton, stbtButton, vhf1Button, vhf2Button, attButton, autoPilotOnButton,
    autoPilotNavButton, autoPilotFd2Button, ventButton]) {
    button.onclick = function() { toggleButton(this) };
  }

  commsSwitchButton.onclick = function() {swapCommsValues(this);}
  setUpTransponder();

  setUpDeactivateButtons();
  setUpWeather();
}


/**
 * Calls toggleGlow for all the buttons that should start as off.
 */
function setUpDeactivateButtons() {
  toggleGlow(deIceButton);
  toggleGlow(stbtButton);
  toggleGlow(vhf1Button);
  toggleGlow(attButton);
  toggleGlow(eng1WarningLight);
  toggleGlow(eng2WarningLight);
}


/**
 * Ensures the later stage clouds and ice are hidden by setting their opacity to zero.
 */
function setUpWeather() {
  stage2Cloud1.style.opacity = "0";
  stage2Cloud2.style.opacity = "0";
  stage2Cloud3.style.opacity = "0";
  stage3Cloud1.style.opacity = "0";
  stage3Cloud2.style.opacity = "0";
  stage3Cloud3.style.opacity = "0";
  ice.style.opacity = "0";
}


/**
 * Assigns the global variables that are children of the svg related to the transponder, and assigns click handlers to
 * these.
 */
function setUpTransponder() {
  transponderNumber = svg.querySelector("#transponder-number");
  transponderValuePos1Add = svg.querySelector("#transponder-value-pos-1-add");
  transponderValuePos2Add = svg.querySelector("#transponder-value-pos-2-add");
  transponderValuePos3Add = svg.querySelector("#transponder-value-pos-3-add");
  transponderValuePos4Add = svg.querySelector("#transponder-value-pos-4-add");
  transponderValuePos1Subtract = svg.querySelector("#transponder-value-pos-1-subtract");
  transponderValuePos2Subtract = svg.querySelector("#transponder-value-pos-2-subtract");
  transponderValuePos3Subtract = svg.querySelector("#transponder-value-pos-3-subtract");
  transponderValuePos4Subtract = svg.querySelector("#transponder-value-pos-4-subtract");

  transponderValuePos1Add.onclick = function() {transponderUpdate(0, true, this);}
  transponderValuePos2Add.onclick = function() {transponderUpdate(1, true, this);}
  transponderValuePos3Add.onclick = function() {transponderUpdate(2, true, this);}
  transponderValuePos4Add.onclick = function() {transponderUpdate(3, true, this);}
  transponderValuePos1Subtract.onclick = function() {transponderUpdate(0, false, this);}
  transponderValuePos2Subtract.onclick = function() {transponderUpdate(1, false, this);}
  transponderValuePos3Subtract.onclick = function() {transponderUpdate(2, false, this);}
  transponderValuePos4Subtract.onclick = function() {transponderUpdate(3, false, this);}
}


/**
 * Checks if the supplied button/light is glowing (i.e. display of the glow child is not none).
 *
 * @param element The element to check. Should either be a button container (suffixed with '-container') or a light (no
 * suffix)
 * @returns {boolean} True if the button is on, false otherwise.
 */
function isGlowing(element) {
  return svg.getElementById(getGlowID(element)).style.display === "";
}


/**
 * Toggles a button/light on or off.
 *
 * Obtains the glow child of the element then updates its display property.
 *
 * @param element The element to update the glow child of. Should either be a button container (suffixed with
 * '-container') or a light (no suffix)
 */
function toggleGlow(element) {
  let glowElement = svg.getElementById(getGlowID(element));
  glowElement.style.display = glowElement.style.display === "none" ? "" : "none";
}


/**
 * Gets the ID of the glow child of a button/light.
 *
 * @param element An element that should either be a button container (suffixed with '-container') or a light (no
 * suffix)
 * @returns {string} The ID of the glow child.
 */
function getGlowID(element) {
  let id;
  if (element.id.includes("container")) {
    id = element.id.replace("container", "glow");
  } else {
    id = element.id + "-glow";
  }
  return id;
}


/**
 * Obtains the ID of the pending child of an ACP container.
 * @param container The ACP container element.
 * @returns {string} The ID of the pending child.
 */
function getACPPendingID(container) {
  return container.id.replace("container", "pending");
}


/**
 * Checks if the supplied element is among the relevantWidgets of the current instruction.
 *
 * Flashes the screen if not.
 *
 * @param element The element to check.
 * @returns {boolean} True if it is relevant, false otherwise.
 */
function elementIsRelevant(element) {
    let isRelevant;
  let instruction = currentInstruction();
  if (typeof instruction !== 'undefined' && instruction.relevantWidgets.length > 0) {
    isRelevant = instruction.relevantWidgets.includes(element);
  } else {
    isRelevant = false;
  }
  if (!isRelevant) {
    flash();
  }
  return isRelevant;
}


/**
 * Executes the resultFunction of the current instruction and prepares the game for the next instruction provided the
 * current instruction isSatisfied.
 *
 * Firstly, checks if the current instruction isSatisfied is true, and proceeds if it is. resultFunction is run to
 * handle the instruction's post conditions, which is awaited if it is async. Then goes through the process of
 * updating the instructionNum, setNum, and stageNum. Calls gameOver if the final stage has been completed. Afterwards,
 * a short timeout is set to have a gap in-between each instruction. Then the instruction is updated and calls
 * handleSatisfied again in case the next instruction is already satisfied (such as a weather instruction).
 */
async function handleSatisfied() {
  if (currentInstruction().isSatisfied()) {
    let resultFunction = currentInstruction().resultFunction;
    if (resultFunction) {
      if (resultFunction.constructor.name === "AsyncFunction") {
        await resultFunction();
      } else {
        resultFunction();
      }
    }

    instructionNum++;
    await timeout(500);

    if (instructionNum === stages[stageNum][setNum].length) {
      setNum++;
      instructionNum = 0;

      if (setNum === stages[stageNum].length) {
        stageNum++;
        setNum = 0;

        if (stageNum === stages.length) {
          gameOver();
          return;
        }
      }
    }

    updateInstructions();
    handleSatisfied();
  }
}


/**
 * Displays and prepares the modal to display within the game view.
 *
 * Adapted from https://webkul.com/blog/how-to-display-a-bootstrap-modal-inside-a-div/ so that the modal only appears
 * within the main div.
 */
function gameOver() {
  $('#game-over-modal').modal({backdrop: 'static', keyboard: false});
  document.getElementById("game-over-button").onclick = function() {
    location.reload()
  };
}


/**
 * Flashes the supplied ACP element repeatedly.
 *
 * Will keep flashing until the ACP button is pressed (i.e. isGlowing is true). Obtains the pending child, and sets
 * each line to orange. After a short timeout, the lines are changed back to the original color, and another timout is
 * set.
 *
 * @param element
 * @returns {Promise<void>}
 */
async function flashACP(element) {
  while (!isGlowing(element)) {
    let pendingElement = svg.getElementById(getACPPendingID(element));
    let lines = pendingElement.getElementsByTagName("line");
    let oldStroke = lines[0].style.stroke;

    for (let line of lines) {
      line.style.stroke = "#ffa500";
    }

    await timeout(250);

    for (let line of lines) {
      line.style.stroke = oldStroke;
    }

    await timeout(250);
  }
}


/**
 * Flashes the screen red to indicate a wrong click.
 *
 * Un-hides the overlay, and creates an animation to increase then decrease the opacity before re-hiding the overlay.
 */
function flash() {
  overlay.hidden = false;
  $(overlay).stop().animate({opacity: "0.5"},250,function(){
    $(overlay).stop().animate({opacity: "0"},250, function() {overlay.hidden = true;})
  });
}


/* ------------------------------ WIDGET HANDLERS ------------------------------  */
/*
All widget handlers must have the following format:

if (elementIsRelevant(element)) {
    // Code that changes the game state

    handleSatisfied();
}

The outer if-statement ensures the element is relevant to the current instruction before taking any action.
handleSatisfied must be called to check if the code that changed the game state has satisfied the instruction's
requirements.
 */


/**
 * Handler for a simple button toggle.
 *
 * @param element The element to toggle.
 */
function toggleButton(element) {
  if (elementIsRelevant(element)) {
    toggleGlow(element);
    handleSatisfied();
  }
}


/**
 * Handler for swapping the communications frequency values.
 *
 * @param element The commsSwitchButton element.
 */
function swapCommsValues(element) {
  if (elementIsRelevant(element)) {
    let oldCommsValue1 = commsValue1.textContent.trim();
    commsValue1.textContent = commsValue2.textContent.trim();
    commsValue2.textContent = oldCommsValue1;

    handleSatisfied();
  }
}


/**
 * Handler for a transponder button press to update the transponder value.
 *
 * @param index Which digit of the transponder value to update (where 0 is the leftmost digit).
 * @param increase A boolean, true if the digit is incrementing or false if it is decrementing.
 * @param element The transponder button element.
 */
function transponderUpdate(index, increase, element) {
  if (elementIsRelevant(element)) {
    let currentNumber = transponderNumber.textContent.trim();
    let chars = currentNumber.split('');

    if (increase) {
      if (chars[index] === "9") {
        chars[index] = "0";
      } else {
        chars[index] = String.fromCharCode(chars[index].charCodeAt(0) + 1);
      }
    } else {
      if (chars[index] === "0") {
        chars[index] = "9";
      } else {
        chars[index] = String.fromCharCode(chars[index].charCodeAt(0) - 1);
      }
    }

    transponderNumber.textContent = chars.join("");
    handleSatisfied();
  }
}
