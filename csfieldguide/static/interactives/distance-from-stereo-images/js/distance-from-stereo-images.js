let left = {
  image: null,
  canvas: null,
  x: null,
  y: null
}

let right = {
  image: null,
  canvas: null,
  x: null,
  y: null
}

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

  left.image = document.getElementById("img-left");
  left.canvas = document.getElementById("canvas-left");
  left.canvas.onmousedown = leftCanvasClickHandler;
  right.image = document.getElementById("img-right");
  right.canvas = document.getElementById("canvas-right");
  right.canvas.onmousedown = rightCanvasClickHandler;

  updateCanvas(left);
  updateCanvas(right);

  window.onresize = reset;
});

/**
 * Resets parts of the interactive by resizing the canvases and clearing the click coordinates of images, both the
 * global variables and the displayed values.
 */
function reset() {
  updateCanvas(left);
  updateCanvas(right);
  left.x = left.y = right.x = right.y = null;
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
function updateCanvas(side) {
  side.canvas.width = side.image.width;
  side.canvas.height = side.image.height;
}

/*
 * Updates the left camera image with the one selected by the user.
 */
function loadLeftImageDialog() {
  let input = this;
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      left.image.crossOrigin = 'anonymous';
      left.image.src = e.target.result;
      left.x = left.y = null;
      document.getElementById("left-x").innerHTML = null;
      document.getElementById("left-y").innerHTML = null;
      // Sometimes the image seemingly is not ready yet, meaning the canvas won't update to the new size. A delay is
      // created to reduce the chances of this occurring, though it still does happen very rarely. Increasing the
      // timeout (or finding a better solution) may fix this.
      setTimeout(() => {  updateCanvas(left); }, 10);
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
      right.image.crossOrigin = 'anonymous';
      right.image.src = e.target.result;
      right.x = right.y = null;
      document.getElementById("right-x").innerHTML = null;
      document.getElementById("right-y").innerHTML = null;
      setTimeout(() => {  updateCanvas(right); }, 10);
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='stereo-right-input']").text(input.files[0].name);
  }
}


function leftCanvasClickHandler(event) {
  const rect = left.canvas.getBoundingClientRect();
  left.x = Math.round(event.clientX - rect.left);
  left.y = Math.round(event.clientY - rect.top);
  document.getElementById("left-x").innerHTML = left.x.toString();
  document.getElementById("left-y").innerHTML = left.y.toString();
  drawDot(left.x, left.y, left.canvas);
}

function rightCanvasClickHandler(event) {
  const rect = right.canvas.getBoundingClientRect();
  right.x = Math.round(event.clientX - rect.left);
  right.y = Math.round(event.clientY - rect.top);
  document.getElementById("right-x").innerHTML = right.x.toString();
  document.getElementById("right-y").innerHTML = right.y.toString();
  drawDot(right.x, right.y, right.canvas);
}

function drawDot(x, y, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x - 0.5 * DOT_SIZE, y - 0.5 * DOT_SIZE, DOT_SIZE, DOT_SIZE);
}

function displayResult() {
  if (left.x == null || left.y == null) {
    alert("Select a point in the left camera.");
    return;
  } else if (right.x == null || right.y == null) {
    alert("Select a point in the right camera.");
    return;
  } else if (document.getElementById("angle-of-view").value === "") {
    alert("Provide a valid half angle-of-view.");
    return;
  } else if (document.getElementById("camera-distance").value === "") {
    alert("Provide a valid distance between cameras.");
    return;
  } else if (left.image.width !== right.image.width) {
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
  return (distance * left.image.width) / (2 * Math.tan(angle_of_view_radians / 2) * (left.x - right.x));
}