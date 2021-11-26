let numCols = 0;
let start = null;
let swap = false;
let lastMousePosition = null;
let count = 0;
const MAX_COUNT = 11;
let cols = [];
let colsToWidths = [];
let currentColToWidth = null;
let results = [];
let trialNum = 0;
let playAgainDiv = null;
let table = null;

$( document ).ready(function() {
  numCols = $('.col-sm').length;
  cols = $(".col-sm").map(function() { return this; }).get();
  playAgainDiv = document.getElementById("play-again-div");
  table = $('#results-table').DataTable( {
    "paging":   false,
    "info":     false,
    "searching": false,
    "oLanguage": {
      "sEmptyTable": "Complete the experiment to show statistics"
    }
  });

  for (let col of cols) {
    $(col).click(clickHandler);
  }

  $('#play-again').click(reset);
  reset();
});


function reset() {
  playAgainDiv.hidden = true;
  table.clear().draw();
  results = [];
  trialNum = 0;

  for (let col = 0; col < Math.floor(numCols / 2); col++) {
    for (let width = 1; width <= 3; width++) {
      colsToWidths.push({ "col": col, "width": width })
    }
  }
  for (let i = 0; i < colsToWidths.length; i++) {
    results.push([]);
  }
  currentColToWidth = getRandomItemFromList(colsToWidths);
  colsToWidths.splice(colsToWidths.indexOf(currentColToWidth), 1);
  setColumns(currentColToWidth["col"], currentColToWidth["width"]);
  start = new Date().getTime();
}


function clickHandler(event) {
  if (this.classList.contains("bg-danger")) {
    let end = new Date().getTime();
    let time = end - start;
    let width = this.offsetWidth;
    let distance = Math.abs((this.offsetLeft + this.offsetWidth / 2) - lastMousePosition);
    results[trialNum].push({ "distance": distance, "time": time, "width": width });

    lastMousePosition = event.pageX;

    resetCols();
    if (count === MAX_COUNT) {
      currentColToWidth = getRandomItemFromList(colsToWidths);

      count = 0;
      trialNum++;
      if (currentColToWidth == null) {
        showResults();
        return;
      }
      colsToWidths.splice(colsToWidths.indexOf(currentColToWidth), 1);
    }
    setColumns(currentColToWidth["col"], currentColToWidth["width"]);
    count++;
    start = new Date().getTime();
  }
}


function setColumns(index, width) {
  let otherIndex = numCols - 1 - index;
  if (swap) {
    [index, otherIndex] = [otherIndex, index];
  }
  swap = !swap;

  cols[index].classList.replace("col-sm", "col-sm-" + width);
  cols[otherIndex].classList.replace("col-sm", "col-sm-" + width);
  cols[index].classList.add("bg-danger");
}


function resetCols() {
  for (let col of cols) {
    col.className = "col-sm";
  }
}


function getRandomItemFromList(list) {
  return list[Math.floor(Math.random()*list.length)];
}


function showResults() {
  playAgainDiv.hidden = false;

  for (let i = 0; i < results.length; i++) {
    let trial = results[i];
    trial.shift();
    let averageDistance = Math.round(trial.reduce((partial_sum, result) => partial_sum + result["distance"], 0)
      / trial.length * 100)  / 100;
    let averageTime = Math.round(trial.reduce((partial_sum, result) => partial_sum + result["time"], 0)
      / trial.length * 100) / 100;
    let width = trial[0]["width"];
    let trialNum = i + 1;
    let indexOfDifficulty = Math.round(Math.log2(averageDistance / width + 1) * 100) / 100;

    table.row.add([
      trialNum,
      averageDistance,
      width,
      indexOfDifficulty,
      averageTime
    ]).draw( false );
  }
}