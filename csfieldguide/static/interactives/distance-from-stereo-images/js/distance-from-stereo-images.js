let leftImage = null;
let rightImage = null;
let leftCanvas = null;
let rightCanvas = null;

let leftX = null;
let leftY = null;
let rightX = null;
let rightY = null;

const DOT_SIZE = 10;

$(document).ready(function () {
  $('#stereo-left-input').change(loadLeftImageDialog);
  $('#stereo-right-input').change(loadRightImageDialog);

  leftImage = document.getElementById("img-left");
  leftCanvas = document.getElementById("canvas-left");
  leftCanvas.onmousedown = leftCanvasClickHandler;
  rightImage = document.getElementById("img-right");
  rightCanvas = document.getElementById("canvas-right");
  rightCanvas.onmousedown = rightCanvasClickHandler;

  updateLeftCanvas();
  updateRightCanvas()

  window.onresize = function() {
    updateLeftCanvas();
    updateRightCanvas();
    leftX = leftY = rightX = rightY = null;
    document.getElementById("left-x").innerHTML = null;
    document.getElementById("left-y").innerHTML = null;
    document.getElementById("right-x").innerHTML = null;
    document.getElementById("right-y").innerHTML = null;
  }
});

function updateLeftCanvas() {
  leftCanvas.width = leftImage.width;
  leftCanvas.height = leftImage.height;
}

function updateRightCanvas() {
  rightCanvas.width = rightImage.width;
  rightCanvas.height = rightImage.height;
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
      setTimeout(() => {  updateLeftCanvas(); }, 10);
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
      setTimeout(() => {  updateRightCanvas(); }, 10);
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='stereo-right-input']").text(input.files[0].name);
  }
}

function leftCanvasClickHandler(event) {
  const rect = leftCanvas.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);
  document.getElementById("left-x").innerHTML = x.toString();
  document.getElementById("left-y").innerHTML = y.toString();
  drawDot(x, y, leftCanvas);
}

function rightCanvasClickHandler(event) {
  const rect = rightCanvas.getBoundingClientRect();
  const x = Math.round(event.clientX - rect.left);
  const y = Math.round(event.clientY - rect.top);
  document.getElementById("right-x").innerHTML = x.toString();
  document.getElementById("right-y").innerHTML = y.toString();
  drawDot(x, y, rightCanvas);
}

function drawDot(x, y, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x - 0.5 * DOT_SIZE, y - 0.5 * DOT_SIZE, DOT_SIZE, DOT_SIZE);
}