const interact = require("interactjs");
require("tracking");

// listen for HTML5 native drag and drop API dragstart event and ignore them.
document.addEventListener('dragstart', function(event) {
  // use interact.js' matchesSelector polyfil to
  // check for match with your draggable target
  if (interact.matchesSelector(event.target, '.haar, .haar *')) {
    // prevent and stop the event if it's on a draggable target
    event.preventDefault();
    event.stopPropagation();
  }
});

var result = [];
var haarFound = 0;


$(document).ready(function () {
  var canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  rect = canvas.getBoundingClientRect();

  $('#find-faces').click(findFaces);
  $('#clear-rectangles').click(clearRectangles);
  $('#viola-jones-image-input').change(loadImageDialog);
  
  /**
   * This code allows the Haar feature to be dragged around the image,
   * using interact.js.
   * On every move or resize, the isHaarFeature method is called to
   * check if it is a valid Haar feature.
   */
  interact('.haar').draggable({
    restrict: {
      restriction: canvas,
      elementRect: { left: 0, right: 1, top: 0, bottom: 1 }
    },
    onmove: dragMove,
    onend: isHaarFeature,
  });

  loadResizeImage();
});


function dragMove (event) {
  feedback.innerHTML = "";
  var target = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  isHaarFeature(event);
}


/*
 * Calculates the position of the current Haar-like feature.
 * Then finds the index of each point in the results array.
 */
function isHaarFeature(event) {
  var target = event.target

  // A----AB-----B
  // |           |
  // |           |
  // AD          BC
  // |           |
  // |           |
  // D----DC-----C

  var currentrec = target.getBoundingClientRect();
  var pointA = { x: currentrec.left - rect.left, y: currentrec.top - rect.top }
  var pointB = { x: currentrec.right - rect.left, y: currentrec.top - rect.top }
  var pointC = { x: currentrec.right - rect.left, y: currentrec.bottom - rect.top }
  var pointD = { x: currentrec.left - rect.left, y: currentrec.bottom - rect.top }
  var pointAB = { x: pointA.x + ((pointB.x - pointA.x) / 2), y: pointA.y };
  var pointDC = { x: pointD.x + ((pointC.x - pointD.x) / 2), y: pointD.y };
  var pointAD = { x: pointA.x, y: pointA.y + ((pointD.y - pointA.y) / 2) };
  var pointBC = { x: pointB.x, y: pointB.y + ((pointC.y - pointB.y) / 2) };

  if (target.id == "haar1") {
    //Formula is C - B - D + A

    //white square
    var indexA = indexCalculation(pointA);
    var indexB = indexCalculation(pointAB);
    var indexC = indexCalculation(pointDC);
    var indexD = indexCalculation(pointD);
    var whiteSquareIntensity = calculateIntegralImage(indexA, indexB, indexC, indexD);

    //black square
    var blackIndexA = indexCalculation(pointAB)
    var blackIndexB = indexCalculation(pointB)
    var blackIndexC = indexCalculation(pointC)
    var blackIndexD = indexCalculation(pointDC)
    var blackSquareIntensity = calculateIntegralImage(blackIndexA, blackIndexB, blackIndexC, blackIndexD);

  } else if (target.id == "haar2") {
    //white square
    var indexA = indexCalculation(pointAD);
    var indexB = indexCalculation(pointBC);
    var indexC = indexCalculation(pointC);
    var indexD = indexCalculation(pointD);
    var whiteSquareIntensity = calculateIntegralImage(indexA, indexB, indexC, indexD);

    //black square
    var blackIndexA = indexCalculation(pointA);
    var blackIndexB = indexCalculation(pointB);
    var blackIndexC = indexCalculation(pointBC);
    var blackIndexD = indexCalculation(pointAD);
    var blackSquareIntensity = calculateIntegralImage(blackIndexA, blackIndexB, blackIndexC, blackIndexD);

  } else if (target.id == "haar3") {
    // A----E----F----B
    // |              |
    // |              |
    // |              |
    // |              |
    // D----H----G----C

    // Extra points needed
    var pointE = { x: pointA.x + (pointB.x - pointA.x) / 3, y: pointA.y }
    var pointF = { x: pointB.x - (pointB.x - pointA.x) / 3, y: pointA.y }
    var pointG = { x: pointC.x - (pointC.x - pointD.x) / 3, y: pointC.y }
    var pointH = { x: pointD.x + (pointC.x - pointD.x) / 3, y: pointC.y }

    //This is the whole feature intensity
    var whiteSquareIntensity = calculateIntegralImage(indexCalculation(pointA),
        indexCalculation(pointB), indexCalculation(pointC), indexCalculation(pointD));

    // black square
    var blackIndexA = indexCalculation(pointE);
    var blackIndexB = indexCalculation(pointF);
    var blackIndexC = indexCalculation(pointG);
    var blackIndexD = indexCalculation(pointH);
    var blackSquareIntensity = calculateIntegralImage(blackIndexA, blackIndexB, blackIndexC, blackIndexD) * 3;

  } else if (target.id == "haar4") {
    // A--------B
    // |        |
    // E        G
    // |        |
    // F        H
    // |        |
    // D--------C
    // Extra points needed
    var pointE = { x: pointA.x, y: pointA.y + (pointD.y - pointA.y) / 3 }
    var pointF = { x: pointA.x, y: pointD.y - (pointD.y - pointA.y) / 3 }
    var pointG = { x: pointB.x, y: pointB.y + (pointC.y - pointB.y) / 3 }
    var pointH = { x: pointB.x, y: pointC.y - (pointC.y - pointB.y) / 3 }

    // This is the whole feature.
    var whiteSquareIntensity = calculateIntegralImage(indexCalculation(pointA),
        indexCalculation(pointB), indexCalculation(pointC), indexCalculation(pointD));

    // black square
    var blackIndexA = indexCalculation(pointE);
    var blackIndexB = indexCalculation(pointG);
    var blackIndexC = indexCalculation(pointH);
    var blackIndexD = indexCalculation(pointF);
    var blackSquareIntensity = calculateIntegralImage(blackIndexA, blackIndexB, blackIndexC, blackIndexD) * 3;

  } else if (target.id == "haar5") {
    // A------------B
    // |            |
    // |   E----F   |
    // |   |    |   |
    // |   H----G   |
    // |            |
    // D------------C
    var pointE = { x: pointA.x + (pointB.x - pointA.x) / 4, y: pointA.y + (pointD.y - pointA.y) / 4 }
    var pointF = { x: pointB.x - (pointB.x - pointA.x) / 4, y: pointA.y + (pointD.y - pointA.y) / 4 }
    var pointG = { x: pointB.x - (pointB.x - pointA.x) / 4, y: pointD.y - (pointD.y - pointA.y) / 4 }
    var pointH = { x: pointA.x + (pointB.x - pointA.x) / 4, y: pointD.y - (pointD.y - pointA.y) / 4 }

    // This is the whole feature.
    var whiteSquareIntensity = calculateIntegralImage(
      indexCalculation(pointA),
      indexCalculation(pointB),
      indexCalculation(pointC),
      indexCalculation(pointD)
    );

    // black square
    var blackIndexA = indexCalculation(pointE);
    var blackIndexB = indexCalculation(pointF);
    var blackIndexC = indexCalculation(pointG);
    var blackIndexD = indexCalculation(pointH);

    var blackSquareIntensity = calculateIntegralImage(blackIndexA, blackIndexB, blackIndexC, blackIndexD) * 4;

  }
  updateDisplay(whiteSquareIntensity, blackSquareIntensity, target);
}


/*
 * Calculates the index in the results array where the integral image of the point can be found.
 */
function indexCalculation(point) {
  return Math.round(point.y) * canvas.width + Math.round(point.x);
}


/*
 * Calculates the integral image of a rectangle in the image, using the results array
 * - which contains the integral image at every point in the image.
 */
function calculateIntegralImage(A, B, C, D) {
  return result[C] - result[B] - result[D] + result[A];
}


/*
 * Checks if a haar feature has been found and updates display to show it.
 */
function updateDisplay(whiteSquareIntensity, blackSquareIntensity, target) {
  if (blackSquareIntensity < whiteSquareIntensity) {
    if (!target.classList.contains('valid')) {
      target.classList.add('valid');
      haarFound = haarFound + 1;
    }
  } else {
    if (target.classList.contains('valid')) {
      target.classList.remove('valid');
      haarFound = haarFound - 1;
    }
  }
  var found = document.getElementById("found");
  found.innerHTML = haarFound;
  var black = document.getElementById("blackValue");
  black.innerHTML = blackSquareIntensity;
  var white = document.getElementById("whiteValue");
  white.innerHTML = whiteSquareIntensity;

  var feedback = document.getElementById('feedback');
  if (haarFound === 5) {
    feedback.innerHTML = "Well Done!";
  } else {
    feedback.innerHTML = "";
  }
}


/*
 * Function called when the load image button is clicked, displays file chosen.
 */
function loadImageDialog() {
  var input = this;
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var sourceImage = document.getElementById("img");
      sourceImage.crossOrigin = 'anonymous';
      sourceImage.src = e.target.result;
      loadResizeImage();
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='viola-jones-image-input']").text(input.files[0].name);
    // reset position and validation border of haar boxes
    $('#haar1').css('transform', 'translate(0, 0)').removeClass('valid');
    $('#haar1').attr('data-x', 0);
    $('#haar1').attr('data-y', 0);

    $('#haar2').css('transform', 'translate(0, 0)').removeClass('valid');
    $('#haar2').attr('data-x', 0);
    $('#haar2').attr('data-y', 0);

    $('#haar3').css('transform', 'translate(0, 0)').removeClass('valid');
    $('#haar3').attr('data-x', 0);
    $('#haar3').attr('data-y', 0);

    $('#haar4').css('transform', 'translate(0, 0)').removeClass('valid');
    $('#haar4').attr('data-x', 0);
    $('#haar4').attr('data-y', 0);

    $('#haar5').css('transform', 'translate(0, 0)').removeClass('valid');
    $('#haar5').attr('data-x', 0);
    $('#haar5').attr('data-y', 0);

    // remove well done message
    feedback.innerHTML = "";
    // reset info
    haarFound = 0;
    var found = document.getElementById("found");
    found.innerHTML = 0;
    var black = document.getElementById("blackValue");
    black.innerHTML = 0;
    var white = document.getElementById("whiteValue");
    white.innerHTML = 0;
  }
}


/**
 * Resizes the image that is chosen to be loaded and makes it grayscale.
 */
function loadResizeImage() {
  var sourceImage = document.getElementById('img');
  var MAX_WIDTH = 900;
  var img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = sourceImage.src;
  img.onload = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (img.width > MAX_WIDTH) {
      img.height *= MAX_WIDTH / img.width;
      img.width = MAX_WIDTH;
      sourceImage.height = img.height;
      sourceImage.width = img.width;
    }
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.style.display = "inline-block";

    drawGrayscaleImage(img);
    var myData = context.getImageData(0, 0, canvas.width, canvas.height);
    tracking.Image.computeIntegralImage(myData.data, myData.width, myData.height, result);
    clearRectangles();
  }
}


/*
 * Redraws the image as a grayscale version.
 */
function drawGrayscaleImage(img) {
  context.drawImage(img, 0, 0, img.width, img.height);
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  for (var i = 0; i < data.length; i += 4) {
    var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
    // red
    data[i] = brightness;
    // green
    data[i + 1] = brightness;
    // blue
    data[i + 2] = brightness;
  }

  // overwrite original image
  context.putImageData(imageData, 0, 0);
}


/*
 * Function is called when the find faces button is clicked.
 * Runs the algorithm to find faces and draws a rectange around them.
 */
function findFaces() {
  var tracker = new tracking.ObjectTracker(['face']);
  tracker.setStepSize(2);
  trackerTask = tracking.track('#img', tracker);
  tracker.on('track', function(event) {
    event.data.forEach(function(rect) {
      var faceRect = document.createElement('div');
      document.getElementById('image-container').appendChild(faceRect);
      faceRect.classList.add('face');
      faceRect.style.width = rect.width + 'px';
      faceRect.style.height = rect.height + 'px';
      faceRect.style.left = rect.x + 'px';
      faceRect.style.top = rect.y + 'px';
    });
  });
}


/*
 * Removes and rectangles drawn around faces in the image.
 */
function clearRectangles() {
  var rect = document.getElementsByClassName('face');
  while (rect[0]) {
    rect[0].parentNode.removeChild(rect[0]);
  }
}
