// Provides global access to images and canvases
let leftImage = null;
let rightImage = null;
let leftCanvas = null;
let rightCanvas = null;

// Provides global access to the left and right x and y coordinates of the selected points in canvases.
let leftX = null;
let leftY = null;
let rightX = null;
let rightY = null;

const DOT_SIZE = 10;

/*
 * Initialization. Prepares the image select and 'Go!' buttons. Assigns the image and canvas global variables and adds
 * the click callbacks to the canvases. Calls the functions to update the canvases. Adds a callback to handle screen
 * size changes as this can change the size of the images.
 */
$(document).ready(function () {
  $('#stereo-left-input').change(loadLeftImageDialog);
  $('#stereo-right-input').change(loadRightImageDialog);
  $('#go-button').click(displayResult);

  leftImage = document.getElementById("img-left");
  leftCanvas = document.getElementById("canvas-left");
  leftCanvas.onmousedown = leftCanvasClickHandler;
  rightImage = document.getElementById("img-right");
  rightCanvas = document.getElementById("canvas-right");
  rightCanvas.onmousedown = rightCanvasClickHandler;

  updateCanvas(leftCanvas, leftImage);
  updateCanvas(rightCanvas, rightImage);

  window.onresize = reset;
});

/**
 * Resets parts of the interactive by resizing the canvases and clearing the click coordinates of images, both the
 * global variables and the displayed values.
 */
function reset() {
  updateCanvas(leftCanvas, leftImage);
  updateCanvas(rightCanvas, rightImage);
  leftX = leftY = rightX = rightY = null;
  document.getElementById("left-x").innerHTML = null;
  document.getElementById("left-y").innerHTML = null;
  document.getElementById("right-x").innerHTML = null;
  document.getElementById("right-y").innerHTML = null;
}

/**
 * Updates a Canvas such that its dimensions match those of its corresponding image.
 * @param canvas The canvas to update.
 * @param image The Image the Canvas is laid over.
 */
function updateCanvas(canvas, image) {
  console.log("yay4");
  canvas.width = image.width;
  canvas.height = image.height;
}

/*
 * Updates the left camera image with the one selected by the user.
 */
function loadLeftImageDialog() {
  let input = this;
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      leftImage.crossOrigin = 'anonymous';
      leftImage.src = e.target.result;
      leftX = leftY = null;
      document.getElementById("left-x").innerHTML = null;
      document.getElementById("left-y").innerHTML = null;
      // Sometimes the image seemingly is not ready yet, meaning the canvas won't update to the new size. A delay is
      // created to reduce the chances of this occurring, though it still does happen very rarely. Increasing the
      // timeout (or finding a better solution) may fix this.
      setTimeout(() => {  updateCanvas(leftCanvas, leftImage); }, 10);
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='stereo-left-input']").text(input.files[0].name);
  }
}

/*
 * Updates the right camera image with the one selected by the user.
 */
function loadRightImageDialog() {
  let input = this;
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      rightImage.crossOrigin = 'anonymous';
      rightImage.src = e.target.result;
      rightX = rightY = null;
      document.getElementById("right-x").innerHTML = null;
      document.getElementById("right-y").innerHTML = null;
      setTimeout(() => {  updateCanvas(rightCanvas, rightImage); }, 10);
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='stereo-right-input']").text(input.files[0].name);
  }
}


function leftCanvasClickHandler(event) {
  const rect = leftCanvas.getBoundingClientRect();
  leftX = Math.round(event.clientX - rect.left);
  leftY = Math.round(event.clientY - rect.top);
  document.getElementById("left-x").innerHTML = leftX.toString();
  document.getElementById("left-y").innerHTML = leftY.toString();
  drawDot(leftX, leftY, leftCanvas);
}

function rightCanvasClickHandler(event) {
  const rect = rightCanvas.getBoundingClientRect();
  rightX = Math.round(event.clientX - rect.left);
  rightY = Math.round(event.clientY - rect.top);
  document.getElementById("right-x").innerHTML = rightX.toString();
  document.getElementById("right-y").innerHTML = rightY.toString();
  drawDot(rightX, rightY, rightCanvas);
}

function drawDot(x, y, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x - 0.5 * DOT_SIZE, y - 0.5 * DOT_SIZE, DOT_SIZE, DOT_SIZE);
}

function displayResult() {
  if (leftX == null || leftY == null) {
    alert("Select a point in the left camera.");
    return;
  } else if (rightX == null || rightY == null) {
    alert("Select a point in the right camera.");
    return;
  } else if (document.getElementById("angle-of-view").value === "") {
    alert("Provide a valid half angle-of-view.");
    return;
  } else if (document.getElementById("camera-distance").value === "") {
    alert("Provide a valid distance between cameras.");
    return;
  } else if (leftImage.width !== rightImage.width) {
    alert("The images should be the same width.");
    return;
  }

  document.getElementById("result-title").style.visibility = "visible";
  document.getElementById("result").innerHTML = calculateDistance().toString() + " Meters";
}

function calculateDistance() {
  let angle_of_view = Number(document.getElementById("angle-of-view").value);
  let angle_of_view_radians = angle_of_view * Math.PI / 180;
  let distance = Number(document.getElementById("camera-distance").value);
  return (distance * leftImage.width) / (2 * Math.tan(angle_of_view_radians / 2) * (leftX - rightX));
}