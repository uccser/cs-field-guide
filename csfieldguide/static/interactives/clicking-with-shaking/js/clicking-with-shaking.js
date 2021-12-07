let table = null;
let misses = 0;
let hits = 0;
let score = 0;
let GOAL_SCORE = 5;
let target = null;
let playButton = null;
let muteButton = null;
let skipButton = null;
let startTime = null;
let buttonSizeClasses = ["btn-large", "btn-medium", "btn-small", "btn-small-moving"]
let set = 0;
let timeElement = null;
let setElement = null;
let results = [];
let clickArea = null;
let progressBarTimeout = null;
let audioContext = null;
let hitSFXBuffer = null;
let missSFXBuffer = null;
let mute = false;
let progressBar = null;
let buttonIsOffset = false;
let forceHidePlaceholderSheet = null;

$(document).ready(function() {
  target = document.getElementById("target");
  muteButton = document.getElementById("mute");
  skipButton = document.getElementById("give-up");
  playButton = document.getElementById("play");
  target.classList.add(buttonSizeClasses[set]);
  timeElement = document.getElementById("time");
  setElement = document.getElementById("set");
  clickArea = document.getElementById("game-view");
  clickArea.addEventListener('mousedown', clickHandler, false);
  progressBar = document.getElementById("game-progress");

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


function progressReplace(newVal) {
  progressBar.classList.replace("bg-primary", newVal);
  progressBar.classList.replace("bg-success", newVal);
  progressBar.classList.replace("bg-danger", newVal);
}


function toggleMute() {
  mute = !mute;
  if (mute) {
    $("#mute").html("Unmute");
  } else {
    $("#mute").html("Mute");
  }
}


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


function play(audioBuffer) {
  if (!mute) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  }
}


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


function clickHandler(event) {
  let elementID = event.target.id;
  if (elementID === target.id) {
    hits++;
    score++;
    play(hitSFXBuffer);

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
      misses += 1;
      score = Math.max(score - 1, 0);
      play(missSFXBuffer);
      updateProgress(false);
  }
}


function gameOver() {
  let oldSetNum = set;
  set = 0;
  resetGame(oldSetNum, set);
  showResults();
  playButton.innerText = "Play Again";
  results = [];
}

function resetGame(oldSetNum, newSetNum) {
  document.head.appendChild(forceHidePlaceholderSheet);
  toggleState();
  misses = 0;
  hits = 0;
  score = 0;
  updateProgress(true);
  target.classList.replace(buttonSizeClasses[oldSetNum], buttonSizeClasses[newSetNum]);
}


function nextSet() {
  let oldSetNum = set;
  set++;
  resetGame(oldSetNum, set);
}

function addResult() {
  const end = new Date().getTime();
  const time = end - startTime;
  const buttonSize = target.offsetWidth.toString() + " x " + target.offsetHeight.toString();
  const accuracy = (Math.round((hits / (hits + misses)) * 10000) / 100)
  const averageTime = Math.round(time / hits * 100) / 100;

  let result = { buttonSize: buttonSize, hits: hits, misses: misses, accuracy: accuracy, time: time, averageTime: averageTime }
  results.push(result)
}

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

function returnToCentre(margin, duration) {
  setTimeout(function() {
    let obj = {}
    obj[margin] = "0";
    $(target).animate(obj, 200);
    buttonIsOffset = false;
  }, duration)
}

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}