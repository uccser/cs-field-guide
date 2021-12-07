/**
 * The datatable to show the results.
 * @type {null}
 */
let table = null;

/**
 * How many times the user has missed the target for the current set.
 * @type {number}
 */
let misses = 0;

/**
 * How many times the user has hit the target for the current set.
 * @type {number}
 */
let hits = 0;

/**
 * The user's current score.
 *
 * Hits increment the score while misses decrement the score. The score should not go below 0. The user has won when
 * the score is equal to GOAL_SCORE.
 * @type {number}
 */
let score = 0;

/**
 * The score the user needs to reach to pass the current set.
 * @type {number}
 */
let GOAL_SCORE = 5;

/**
 * The button element that the user must click.
 * @type {null}
 */
let target = null;

/**
 * The button element that starts/restarts/resumes the game when clicked.
 * @type {null}
 */
let playButton = null;

/**
 * The button element that toggles whether sfx will be played.
 * @type {null}
 */
let muteButton = null;

/**
 * The button element that skips the remaining sets and shows the results.
 * @type {null}
 */
let skipButton = null;

/**
 * The datetime when the current set started to calculate how long it took the user to complete the set.
 * @type {null}
 */
let startTime = null;

/**
 * A list of the button CSS classes defined in clicking-with-shaking.scss.
 *
 * Used to update the target style (size) and used to check whether special behaviour should activate, such as whether
 * the button should also shift in addition to vibrating.
 * @type {string[]}
 */
let buttonSizeClasses = ["btn-large", "btn-medium", "btn-small", "btn-small-moving"];

/**
 * The set number the user is up to. Goes up to the size of buttonSizeClasses exclusive.
 * @type {number}
 */
let set = 0;

/**
 * The span element to update to show the time elapsed for the current set.
 * @type {null}
 */
let timeElement = null;

/**
 * The span element to update to show the current set number.
 * @type {null}
 */
let setElement = null;

/**
 * A list of POJOs.
 *
 * Each POJO has the following keys: buttonSize, hits, misses, accuracy, time, averageTime. The set number can be
 * inferred from the index in the list.
 *
 * buttonSize: A string with the format w x h, where w is the target width and h is the height in pixels for the set.
 * hits: The number of hits for the set.
 * misses: The number of misses for the set.
 * accuracy: A floating number representing the user's accuracy for the set (hits divided by the sum of hits and
 *           misses).
 * time: The time in milliseconds the user took to complete the set.
 * averageTime: The average time between each successful click (hits divided by time).
 *
 * @type {null}
 */
let results = [];

/**
 * The div element set as the boundary for the game.
 *
 * Clicking within this div will result in either a hit or miss, which clickHandler checks.
 * @type {null}
 */
let clickArea = null;

/**
 * The timeout object the progress bar uses to time when the bar color should return to normal.
 *
 * Required to store the reference so the timeout can be cancelled when needed (e.g. another click has occurred that
 * should overwrite the color change).
 * @type {null}
 */
let progressBarTimeout = null;

/**
 * The context for playing sfx.
 * @type {null}
 */
let audioContext = null;

/**
 * The audio buffer for the hit sound effect.
 * @type {null}
 */
let hitSFXBuffer = null;

/**
 * The audio buffer for the miss sound effect.
 * @type {null}
 */
let missSFXBuffer = null;

/**
 * A boolean representing whether the game is currently muted.
 * @type {boolean}
 */
let mute = false;

/**
 * The div for the progress bar.
 *
 * Used to update the progress bar width and style.
 * @type {null}
 */
let progressBar = null;

/**
 * Whether the button is currently offset.
 *
 * Required to ensure the button is only offset in one direction at a time i.e. shift() can only be called when
 * buttonIsOffset is false.
 * @type {boolean}
 */
let buttonIsOffset = false;

/**
 * A style element to force the placeholder button to have no display.
 *
 * The placeholder button is created during the shake effect. However, it also temporarily affects the button height of
 * the play button when the target is hidden, as the placeholder is not immediately destroyed. This style element must
 * be added to the DOM at the correct points of execution to stop the placeholder from affecting the play again button
 * height. Adding it at the wrong time will result in the target button not displaying correctly.
 * @type {null}
 */
let forceHidePlaceholderSheet = null;

/**
 * Sets up the page for the game.
 *
 * Assigns values to some of the global variables. Sets the initial target class. Sets up the click handlers for the
 * clickArea and buttons. Calls setUpAudio. Sets up the results datatable.
 */
$(document).ready(function() {
  target = document.getElementById("target");
  muteButton = document.getElementById("mute");
  skipButton = document.getElementById("give-up");
  playButton = document.getElementById("play");
  timeElement = document.getElementById("time");
  setElement = document.getElementById("set");
  clickArea = document.getElementById("game-view");
  progressBar = document.getElementById("game-progress");

  target.classList.add(buttonSizeClasses[set]);
  clickArea.addEventListener('mousedown', clickHandler, false);
  $(playButton).click(toggleState);
  $(muteButton).click(toggleMute);
  $(skipButton).click(gameOver);
  setUpAudio();

  forceHidePlaceholderSheet = document.createElement('style');
  forceHidePlaceholderSheet.innerHTML = ".ui-effects-placeholder { display: none !important; }";

  table = $('#results-table').DataTable( {
    "paging":   false,
    "info":     false,
    "searching": false,
    "oLanguage": {
      "sEmptyTable": "Complete the experiment to show statistics"
    },
    "dom": 'Bfrtip',
    "buttons": [
      'csv', 'excel'
    ]
  });
});


/**
 * Updates the progress bar.
 *
 * Updates the width and text to match the current score. Also changes the color (depending on if the score has
 * increased), and changes the color back to normal some time later. Clears progressBarTimeout to prevent multiple
 * color changes at once.
 *
 * @param increase Whether the score has increased i.e. the target was hit.
 */
function updateProgress(increase) {
  progressBar.style.width = (score / GOAL_SCORE * 100).toString() + "%";
  progressBar.innerText = score + "/" + GOAL_SCORE;
  clearTimeout(progressBarTimeout);

  if (increase) {
    progressReplace("bg-success");
  } else {
    progressReplace("bg-danger");
  }

  progressBarTimeout = setTimeout(function() {
    progressReplace("bg-primary");
  }, 500);
}


/**
 * Changes the progress bar color to the specified one by replacing any existing Bootstrap bg classes.
 * @param newVal The new bg class.
 */
function progressReplace(newVal) {
  progressBar.classList.replace("bg-primary", newVal);
  progressBar.classList.replace("bg-success", newVal);
  progressBar.classList.replace("bg-danger", newVal);
}


/**
 * Toggles whether the game is muted, including changing the mute button text.
 */
function toggleMute() {
  mute = !mute;
  if (mute) {
    $("#mute").html("Unmute");
  } else {
    $("#mute").html("Mute");
  }
}


/**
 * Initialises the audioContext and hitSFXBuffer and missSFXBuffer.
 *
 * hitSoundURL and missSoundURL are defined in clicking-with-shaking.html.
 */
function setUpAudio() {
  audioContext = new AudioContext();
  const playButton = document.querySelector('#play');

  window.fetch(hitSoundURL)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      playButton.disabled = false;
      hitSFXBuffer = audioBuffer;
    });

  window.fetch(missSoundURL)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      playButton.disabled = false;
      missSFXBuffer = audioBuffer;
    });
}


/**
 * Plays a sound effect from the buffer.
 * @param audioBuffer The buffer to play.
 */
function playSFX(audioBuffer) {
  if (!mute) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  }
}


/**
 * Switches the state of the game (either in a set or between sets) to show different UI elements.
 *
 * Either the target or play button is visible. If the target is visible, the skip button is also visible. setElement
 * is updated, the table is cleared in case it is visible, startTime is reset, and shake is called to make the target
 * start vibrating. forceHidePlaceholderSheet is also removed to avoid the display of the target.
 *
 * If the play button is visible, the skip button is hidden, the play button text is updated, and the play button
 * is temporarily disabled to avoid accidental clicks when the user is spam clicking the target.
 */
function toggleState() {
  target.hidden = !target.hidden;
  playButton.hidden = !playButton.hidden;
  if (!target.hidden) {
    skipButton.style.visibility = "visible";
    try {
      document.head.removeChild(forceHidePlaceholderSheet);
    } catch {}
    setElement.innerText = set + 1;
    table.clear().draw();
    startTime = new Date().getTime();
    shake();
  } else {
    skipButton.style.visibility = "hidden";
    playButton.innerText = "Next Set";
    playButton.disabled = true;
    setTimeout(function () { playButton.disabled = false; }, 1000);
  }
}

/**
 * Handles when clickArea is clicked.
 *
 * If the target was clicked, hits and score are incremented, and the hit sound effect is played. If the user has hit
 * the GOAL_SCORE, a row is added to the result table, and either gameOver or nextSet is called depending if the user
 * has completed all the sets. Otherwise, the progress bar is updated.
 *
 * Otherwise, misses is incremented, and score is decremented, bounded by 0. The miss sound effect is played and the
 * progress bar is updated.
 *
 * @param event The event object to determine what was clicked.
 */
function clickHandler(event) {
  let elementID = event.target.id;
  if (elementID === target.id) {
    hits++;
    score++;
    playSFX(hitSFXBuffer);

    if (score === GOAL_SCORE) {
      addResult();
      if (set === buttonSizeClasses.length - 1) {
        gameOver();
      } else{
        nextSet();
      }
    } else {
      updateProgress(true);
    }
  } else if (![playButton.id, muteButton.id, skipButton.id].includes(elementID) && !target.hidden) {
      misses++;
      score = Math.max(score - 1, 0);
      playSFX(missSFXBuffer);
      updateProgress(false);
  }
}


/**
 * Sets up the game over state.
 *
 * Resets set to zero, and calls reset game. Shows the game results, clears the game results, and updates the play
 * button text.
 */
function gameOver() {
  let oldSetNum = set;
  set = 0;
  resetGame(oldSetNum, set);
  showResults();
  playButton.innerText = "Play Again";
  results = [];
}


/**
 * Prepares the game for the next set.
 *
 * Increments set and calls reset game.
 */
function nextSet() {
  let oldSetNum = set;
  set++;
  resetGame(oldSetNum, set);
}


/**
 * Resets the game in preparation for the next set or a new game.
 *
 * Adds the forceHidePlaceholderSheet so the play button height does not change. Toggles the state (which should change
 * to the between-sets state), and resets misses, hits, and score. Calls updateProgress, and updates the target class.
 * @param oldSetNum The previous set number.
 * @param newSetNum The new set number.
 */
function resetGame(oldSetNum, newSetNum) {
  document.head.appendChild(forceHidePlaceholderSheet);
  toggleState();
  misses = 0;
  hits = 0;
  score = 0;
  updateProgress(true);
  target.classList.replace(buttonSizeClasses[oldSetNum], buttonSizeClasses[newSetNum]);
}


/**
 * Calculates the metrics for the current set and adds a new object to results.
 */
function addResult() {
  const end = new Date().getTime();
  const time = end - startTime;
  const buttonSize = target.offsetWidth.toString() + " x " + target.offsetHeight.toString();
  const accuracy = (Math.round((hits / (hits + misses)) * 10000) / 100)
  const averageTime = Math.round(time / hits * 100) / 100;

  let result = { buttonSize: buttonSize, hits: hits, misses: misses, accuracy: accuracy, time: time,
    averageTime: averageTime }
  results.push(result)
}


/**
 * Iterates through the results and adds a row to the results datatable.
 *
 * Also adds an empty row for each skipped set.
 */
function showResults() {
  for (let i = 0; i < results.length; i++) {
    let result = results[i];
    table.row.add([
      i + 1,
      result.buttonSize,
      result.hits,
      result.misses,
      result.accuracy,
      result.time,
      result.averageTime
    ]).draw(false);
  }

  for (let i = results.length; i < buttonSizeClasses.length; i++) {
    table.row.add([
      i + 1, "-", "-", "-", "-", "-", "-"
    ]).draw(false);
  }
}


/**
 * Shakes the target using randomised parameters.
 *
 * The distance of the shake is relative to the size of the click area to prevent the button from going out of bounds
 * on different screen sizes. Given it is the final set and the button is not already offset, shift may be called.
 * Provided the target is still visible, shake is called again.
 *
 * Also updates timeElement with the current elapsed time.
 * @return {Promise<void>}
 */
async function shake() {
  let direction =  Math.random() < 0.5 ? "left" : "up";
  let distancePercent = getRandomBetween(0.1, 0.2);

  let distance = clickArea.offsetHeight * distancePercent;
  if (direction === "left") {
    distance = clickArea.offsetWidth * distancePercent;
  }

  const end = new Date().getTime();
  timeElement.innerText = Math.floor((end - startTime) / 1000);

  if (buttonSizeClasses[set] === "btn-small-moving" && !buttonIsOffset && Math.random() > 0.9) {
    shift();
  }

  $('#target').effect("shake", {times: 1, distance: distance, direction: direction}, 300, () => {
    if (!target.hidden) {
     shake();
    }
  });
}


/**
 * Shifts the target to a different part of the clickArea using randomised parameters.
 *
 * The shift amount is relative to the size of the click area to prevent the button from going out of bounds on
 * different screen sizes. The button shift is achieved by modifying the margins. After a randomised duration, the
 * button is returned to the center. buttonIsOffset is set to true.
 * @return {Promise<void>}
 */
async function shift() {
  buttonIsOffset = true;
  let directionProb =  Math.random();
  let direction;
  if (directionProb < 0.25) {
    direction = "left";
  } else if (directionProb < 0.5) {
    direction = "right";
  } else if (directionProb < 0.75) {
    direction = "up";
  } else {
    direction = "down";
  }

  let distancePercent = getRandomBetween(0.1, 0.3);
  let distance = clickArea.offsetHeight * distancePercent;
  if (direction === "left" || direction === "right") {
    distance = clickArea.offsetWidth * distancePercent;
  }

  let duration = Math.round(getRandomBetween(0.1, 1) * 5000);

  if (direction === "left") {
    $(target).animate({ "margin-left": "-=" + distance.toString() }, 200, null,
      () => { returnToCentre("margin-left", duration) });
  } else if (direction === "right") {
    $(target).animate({ "margin-left": "+=" + distance.toString() }, 200, null,
      () => { returnToCentre("margin-left", duration) });
  } else if (direction === "up") {
    $(target).animate({ "margin-top": "-=" + distance.toString() }, 200, null,
      () => { returnToCentre("margin-top", duration) });
  } else {
    $(target).animate({ "margin-top": "+=" + distance.toString() }, 200, null,
      () => { returnToCentre("margin-top", duration) });
  }
}


/**
 * Returns the shifted target back to the center after the specified duration.
 *
 * Sets buttonIsOffset back to false after the handler is executed.
 * @param margin The margin (e.g. margin-left) that needs to be reset.
 * @param duration The duration before the target is reset in milliseconds.
 */
function returnToCentre(margin, duration) {
  setTimeout(function() {
    let obj = {}
    obj[margin] = "0";
    $(target).animate(obj, 200);
    buttonIsOffset = false;
  }, duration)
}


/**
 * Obtains a random number between two numbers.
 * @param min The lower bound number.
 * @param max The upper bound number.
 * @return {*} A number.
 */
function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}