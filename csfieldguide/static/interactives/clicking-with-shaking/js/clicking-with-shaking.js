let table = null;
let misses = 0;
let hits = 0;
let score = 0;
let GOAL_SCORE = 5;
let target = null;
let playButton = null;
let muteButton = null;
let startTime = null;
let buttonSizeClasses = ["btn-small", "btn-medium", "btn-large"]
let set = 0;
let countElement = null;
let setElement = null;
let results = [];
let clickArea = null;
let shakeTimeout = null;
let progressBarTimeout = null;
let audioContext = null;
let hitSFXBuffer = null;
let missSFXBuffer = null;
let mute = false;
let progressBar = null;

$(document).ready(function() {
  target = document.getElementById("target");
  muteButton = document.getElementById("mute");
  playButton = document.getElementById("play");
  target.classList.add(buttonSizeClasses[set]);
  countElement = document.getElementById("count");
  setElement = document.getElementById("set");
  clickArea = document.getElementById("game-view");
  clickArea.addEventListener('mousedown', clickHandler, false);
  progressBar = document.getElementById("game-progress");

  $(playButton).click(toggleState);
  $(muteButton).click(toggleMute);
  setUpAudio();

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
    setElement.innerText = set + 1;
    table.clear().draw();
    shake();
    startTime = new Date().getTime();
  } else {
    playButton.innerText = "Next Set";
    playButton.disabled = true;
    setTimeout(function () { playButton.disabled = false; }, 1000);
    nextSet();
  }
}


function clickHandler(event) {
  let elementID = event.target.id;
  if (elementID === target.id) {
    hits++;
    score++;
    countElement.innerText = hits;
    play(hitSFXBuffer);

    if (score === GOAL_SCORE) {
      clearTimeout(shakeTimeout);
      addResult();
      toggleState();

      if (set === buttonSizeClasses.length) {
        playButton.innerText = "Play Again";
        showResults();
        resetGame();
      }
    }

    updateProgress(true);
  } else if (elementID !== playButton.id && elementID !== muteButton.id && !target.hidden) {
      misses += 1;
      score = Math.max(score - 1, 0);
      play(missSFXBuffer);
      updateProgress(false);
  }
}


function resetGame() {
  set = 0;
  target.classList.replace(buttonSizeClasses[buttonSizeClasses.length], buttonSizeClasses[set]);
  results = [];
}


function nextSet() {
  misses = 0;
  hits = 0;
  score = 0;
  countElement.innerText = hits;
  set++;
  target.classList.replace(buttonSizeClasses[set - 1], buttonSizeClasses[set])
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
}

async function shake() {
  let direction =  Math.random() < 0.5 ? "left" : "up" ;
  let distance = getRandomInt(50, 100)

  $('#target').effect("shake", {times: 1, distance: distance, direction: direction}, 200 );

  if (!target.hidden) {
    shakeTimeout = setTimeout(shake, 200);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}