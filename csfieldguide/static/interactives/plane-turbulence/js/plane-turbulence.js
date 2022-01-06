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
 * Whether any ACP button is flashing or not.
 * @type {boolean}
 */
let acpFlashing = false;

/**
 * A div laid over the svg to show the red flash effect.
 */
let overlay;

/**
 * The main menu div laid over the svg.
 */
let menu;

/**
 * The div for showing the current instruction.
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
 * The stages are represented as a list of lists of lists. The outermost lists are the stages. Inside these lists are
 * a list
 */
let stages;

let stage2Cloud1;
let stage2Cloud2;
let stage2Cloud3;
let stage3Cloud1;
let stage3Cloud2;
let stage3Cloud3;
let ice;


$(document).ready(function () {
  instructions = document.getElementById("instructions-p");
  let object = document.getElementById("airplane-object");
  svg = object.contentDocument.getElementById("airplane-svg");
  overlay = document.getElementById("overlay");
  menu = document.getElementById("menu");
  overlay.style.height = object.offsetHeight + "px";
  setupSVGElements();
  createSets();
  document.getElementById("play-button").onclick = setUp;
})


function setUp() {
  updateInstructions();
  menu.hidden = true;
  handleSatisfied();
}


function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function createSets() {
  stages = [
    [
      [
        {
          relevantWidgets: [stbtButton],
          isSatisfied: function() {
            return buttonIsOn(stbtButton);
          },
          description: "Turn on the seatbelt sign",
        },
      ],
      [
        {
          relevantWidgets: [autoPilotOnButton],
          isSatisfied: function() {
            return !buttonIsOn(autoPilotOnButton);
          },
          description: "Disable the autopilot",
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
            return buttonIsOn(vhf1Button);
          },
          description: "Change to VHF1",
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
          description: "Transfer standby and active frequencies",
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
            await timeout(3000);
            toggleGlow(eng2WarningLight);
            await timeout(1000);
            toggleGlow(eng1WarningLight);
            await timeout(500);
          },
        },
        {
          relevantWidgets: [deIceButton],
          isSatisfied: function() {
            return buttonIsOn(deIceButton);
          },
          description: "The engines are icing! Press de-ice",
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
            return !buttonIsOn(ventButton);
          },
          description: "Turn off the vents.",
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
            acpFlashing = true;
            flashACP(attButton);
          },
        },
        {
          relevantWidgets: [attButton],
          isSatisfied: function() {
            return buttonIsOn(attButton);
          },
          description: "A flight attendant wants to talk to you. Push the 'ATT' button.",
          resultFunction: function() {
            acpFlashing = false;
          },
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
            acpFlashing = false;
          },
        },
      ]
    ]
  ]

  for (let i = 0; i < stages.length; i++) {
    shuffleArray(stages[i]);
  }

  let gap = {
    relevantWidgets: [],
    isSatisfied: function() {
      return true;
    },
    description: "",
    resultFunction: async function() {
      await timeout(3000);
    },
  }

  stages.unshift([[gap]]);
  stages.push([[gap]]);

  addWeatherInstruction(0, {}, 0.25);
  addWeatherInstruction(1, {}, 1);
  addWeatherInstruction(2, {[stage2Cloud1.id]: 2, [stage2Cloud2.id]: 2, [stage2Cloud3.id]: 5}, 2);
  addWeatherInstruction(3, {[stage3Cloud1.id]: 2, [stage3Cloud2.id]: 2, [stage3Cloud3.id]: 5}, 3, true);
  addWeatherInstruction(4, {}, 4);
}


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
 * From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param array
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function currentInstruction() {
  return stages[stageNum][setNum][instructionNum];
}


function updateInstructions() {
  instructions.innerText = currentInstruction().description;
}


function buttonIsOn(element) {
  return svg.getElementById(getGlowID(element)).style.display === "";
}


function setupSVGElements() {
  deIceButton = svg.getElementById("button-de-ice-container");
  stbtButton = svg.getElementById("button-stbt-container");
  vhf1Button = svg.getElementById("button-vhf1-container");
  vhf2Button = svg.getElementById("button-vhf2-container");
  attButton = svg.getElementById("button-att-container");
  eng1WarningLight = svg.getElementById("light-warn-eng-1-ice");
  eng2WarningLight = svg.getElementById("light-warn-eng-2-ice");
  commsValue1 = svg.getElementById("comms-value-1");
  commsValue2 = svg.getElementById("comms-value-2");
  autoPilotOnButton = svg.getElementById("button-autopilot-on-container");
  autoPilotNavButton = svg.getElementById("button-autopilot-nav-container");
  autoPilotFd2Button = svg.getElementById("button-autopilot-fd2-container");
  commsSwitchButton = svg.getElementById("button-comms-switch");
  ventButton = svg.getElementById("button-vnt-container");
  transponderNumber = svg.getElementById("transponder-number");

  stage2Cloud1 = svg.getElementById("stage-2-cloud-1");
  stage2Cloud2 = svg.getElementById("stage-2-cloud-2");
  stage2Cloud3 = svg.getElementById("stage-2-cloud-3");
  stage3Cloud1 = svg.getElementById("stage-3-cloud-1");
  stage3Cloud2 = svg.getElementById("stage-3-cloud-2");
  stage3Cloud3 = svg.getElementById("stage-3-cloud-3");
  ice = svg.getElementById("ice");

  let allButtons = svg.querySelectorAll('[id$="-container"]');
  for (let button of allButtons) {
    button.onclick = flash;
  }
  svg.getElementById("dials").onclick = flash;

  for (let button of [deIceButton, stbtButton, vhf1Button, vhf2Button, attButton, autoPilotOnButton,
    autoPilotNavButton, autoPilotFd2Button, ventButton]) {
    button.onclick = function() { toggleButton(this) };
  }

  commsSwitchButton.onclick = function() {swapCommsValues(this);}
  setUpDeactivateButtons();
  setUpWeather();
  setUpTransponder();
}


function setUpDeactivateButtons() {
  svg.getElementById(getGlowID(deIceButton)).style.display = "None";
  svg.getElementById(getGlowID(stbtButton)).style.display = "None";
  svg.getElementById(getGlowID(vhf1Button)).style.display = "None";
  svg.getElementById(getGlowID(attButton)).style.display = "None";
  svg.getElementById(getGlowID(eng1WarningLight)).style.display = "None";
  svg.getElementById(getGlowID(eng2WarningLight)).style.display = "None";
}


function setUpWeather() {
  stage2Cloud1.style.opacity = "0";
  stage2Cloud2.style.opacity = "0";
  stage2Cloud3.style.opacity = "0";
  stage3Cloud1.style.opacity = "0";
  stage3Cloud2.style.opacity = "0";
  stage3Cloud3.style.opacity = "0";
  ice.style.opacity = "0";
}


function toggleGlow(element) {
  let glowElement = svg.getElementById(getGlowID(element));
  glowElement.style.display = glowElement.style.display === "none" ? "" : "none";
}


function getGlowID(element) {
  let id;
  if (element.id.includes("container")) {
    id = element.id.replace("container", "glow");
  } else {
    id = element.id + "-glow";
  }
  return id;
}


function getACPPendingID(container) {
  return container.id.replace("container", "pending");
}


function setUpTransponder() {
  transponderValuePos1Add = svg.getElementById("transponder-value-pos-1-add");
  transponderValuePos2Add = svg.getElementById("transponder-value-pos-2-add");
  transponderValuePos3Add = svg.getElementById("transponder-value-pos-3-add");
  transponderValuePos4Add = svg.getElementById("transponder-value-pos-4-add");
  transponderValuePos1Subtract = svg.getElementById("transponder-value-pos-1-subtract");
  transponderValuePos2Subtract = svg.getElementById("transponder-value-pos-2-subtract");
  transponderValuePos3Subtract = svg.getElementById("transponder-value-pos-3-subtract");
  transponderValuePos4Subtract = svg.getElementById("transponder-value-pos-4-subtract");

  transponderValuePos1Add.onclick = function() {transponderUpdate(0, true, this);}
  transponderValuePos2Add.onclick = function() {transponderUpdate(1, true, this);}
  transponderValuePos3Add.onclick = function() {transponderUpdate(2, true, this);}
  transponderValuePos4Add.onclick = function() {transponderUpdate(3, true, this);}
  transponderValuePos1Subtract.onclick = function() {transponderUpdate(0, false, this);}
  transponderValuePos2Subtract.onclick = function() {transponderUpdate(1, false, this);}
  transponderValuePos3Subtract.onclick = function() {transponderUpdate(2, false, this);}
  transponderValuePos4Subtract.onclick = function() {transponderUpdate(3, false, this);}
}


function elementIsRelevant(element) {
  let isRelevant = currentInstruction().relevantWidgets.includes(element);
  if (!isRelevant) {
    flash();
  }
  return isRelevant;
}


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

    await timeout(500);
    updateInstructions();
    handleSatisfied();
  }
}


function gameOver() {
  menu.getElementsByTagName('p')[0].innerText = "You won!";
  let button = menu.getElementsByTagName('button')[0];
  button.innerText = "Play Again!";
  button.onclick = function () { location.reload(); };
  menu.hidden = false;
}


async function flashACP(element) {
  if (acpFlashing) {
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
    flashACP(element);
  }
}


function flash() {
  overlay.hidden = false;
  $(overlay).stop().animate({opacity: "0.5"},250,function(){
    $(overlay).stop().animate({opacity: "0"},250, function() {overlay.hidden = true;})
  });
}


/* ------------------------------ WIDGET HANDLERS ------------------------------  */


function toggleButton(element) {
  if (elementIsRelevant(element)) {
    toggleGlow(element);
    handleSatisfied();
  }
}


function swapCommsValues(element) {
  if (elementIsRelevant(element)) {
    let oldCommsValue1 = commsValue1.textContent.trim();
    commsValue1.textContent = commsValue2.textContent.trim();
    commsValue2.textContent = oldCommsValue1;

    handleSatisfied();
  }
}


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
