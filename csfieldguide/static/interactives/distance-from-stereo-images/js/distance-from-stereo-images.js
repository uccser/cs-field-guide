/**
 * An object representing the left side of the interactive.
 */
let left = {
  image: null,
  canvas: null,
  x: null,
  y: null,

  toString: function () {
    return "left";
  }
}

/**
 * An object representing the right side of the interactive.
 */
let right = {
  image: null,
  canvas: null,
  x: null,
  y: null,

  toString: function () {
    return "right";
  }
}

const DOT_SIZE = 10;


/**
 * Initialization. Prepares the image select and 'Go!' buttons. Assigns the values in the left and right objects and
 * adds the click callbacks to the canvases. Updates the canvases. Adds a callback to handle screen size changes as this
 *  can change the size of the images.
 */
$(document).ready(function () {
  $('#stereo-left-input').change(function() { loadImageDialog(this, left) });
  $('#stereo-right-input').change(function() { loadImageDialog(this, right) });
  $('#go-button').click(displayResult);

  left.image = document.getElementById("img-left");
  left.canvas = document.getElementById("canvas-left");
  left.canvas.onmousedown = (event) => { canvasClickHandler(event, left) };
  right.image = document.getElementById("img-right");
  right.canvas = document.getElementById("canvas-right");
  right.canvas.onmousedown = (event) => { canvasClickHandler(event, right) };

  updateCanvas(left);
  updateCanvas(right);

  window.onresize = reset;
});


/**
 * Resets parts of the interactive by resizing the canvases and clearing the click coordinates of images in both the
 * left and right objects, and the displayed values.
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
 * @param side The side to update the canvas of.
 */
function updateCanvas(side) {
  side.canvas.width = side.image.width;
  side.canvas.height = side.image.height;
}


/**
 * Handles an uploaded image by displaying the image, clearing click coordinates, updating the canvas, and displaying
 * the filename.
 * @param input For obtaining the file data.
 * @param side The side to update.
 */
function loadImageDialog(input, side) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      side.image.crossOrigin = 'anonymous';
      side.image.src = e.target.result;
      side.x = side.y = null;
      document.getElementById(side.toString() + "-x").innerHTML = null;
      document.getElementById(side.toString() + "-y").innerHTML = null;
      // Sometimes the image seemingly is not ready yet, meaning the canvas won't update to the new size. A delay is
      // created to reduce the chances of this occurring, though it still does happen very rarely. Increasing the
      // timeout (or finding a better solution) may fix this.
      setTimeout(() => {  updateCanvas(side); }, 10);
    }
    reader.readAsDataURL(input.files[0]);
    const inputName = "stereo-" + side.toString() + "-input";
    $("label[for=" + inputName + "]").text(input.files[0].name);
  }
}


/**
 * Handles a click in a canvas by updating the coordinates and drawing a dot.
 * @param event The click event.
 * @param side The side to update.
 */
function canvasClickHandler(event, side) {
  const rect = side.canvas.getBoundingClientRect();
  side.x = Math.round(event.clientX - rect.left);
  side.y = Math.round(event.clientY - rect.top);
  document.getElementById(side.toString() + "-x").innerHTML = side.x.toString();
  document.getElementById(side.toString() + "-y").innerHTML = side.y.toString();
  drawDot(side.x, side.y, side.canvas);
}


/**
 * Draws a dot in a canvas.
 * @param x The x-coordinate to place the dot.
 * @param y The y-coordinate to place the dot.
 * @param canvas The canvas to draw on.
 */
function drawDot(x, y, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x - 0.5 * DOT_SIZE, y - 0.5 * DOT_SIZE, DOT_SIZE, DOT_SIZE);
}


/**
 * Checks all the inputs have been supplied and are valid. If so, displays the calculated result.
 */
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


/**
 * Calculates the distance to the object based on the equation proposed in the paper
 * http://www.icoci.cms.net.my/proceedings/2017/Pdf_Version_Chap04e/PID105-235-242e.pdf
 * @returns {number} The distance in metres.
 */
function calculateDistance() {
  let angle_of_view = Number(document.getElementById("angle-of-view").value);
  let angle_of_view_radians = angle_of_view * Math.PI / 180;
  let distance = Number(document.getElementById("camera-distance").value);
  return (distance * left.image.width) / (2 * Math.tan(angle_of_view_radians / 2) * (left.x - right.x));
}