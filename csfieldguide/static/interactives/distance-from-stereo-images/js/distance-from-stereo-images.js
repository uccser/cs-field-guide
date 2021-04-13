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
  leftCanvas.onmousedown = getLeftCoordinates;
  rightImage = document.getElementById("img-right");
  rightCanvas = document.getElementById("canvas-right");
  rightCanvas.onmousedown = getRightCoordinates;

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
      setTimeout(() => {  updateRightCanvas(); }, 10);
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='stereo-right-input']").text(input.files[0].name);
  }
}

//*
// =====================================================================================================================
// Code to get coordinates from image adapted from https://www.chestysoft.com/imagefile/javascript/get-coordinates.asp
// =====================================================================================================================
//*
function findPosition(image)
{
  if (typeof( image.offsetParent ) != "undefined") {
    for(let posX = 0, posY = 0; image; image = image.offsetParent) {
      posX += image.offsetLeft;
      posY += image.offsetTop;
    }
    return [ posX, posY ];
  } else {
    return [ image.x, image.y ];
  }
}

function getLeftCoordinates(event)
{
  let imgPos = findPosition(leftCanvas);
  if (event.pageX || event.pageY)
  {
    leftX = event.pageX;
    leftY = event.pageY;
  }
  else if (event.clientX || event.clientY)
  {
    leftX = event.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    leftY = event.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;
  }
  leftX = leftX - imgPos[0];
  leftY = leftY - imgPos[1];
  document.getElementById("left-x").innerHTML = leftX;
  document.getElementById("left-y").innerHTML = leftY;
  drawDot(leftX, leftY, leftCanvas);
}

function getRightCoordinates(event)
{
  let imgPos = findPosition(rightCanvas);
  if (event.pageX || event.pageY)
  {
    rightX = event.pageX;
    rightY = event.pageY;
  }
  else if (event.clientX || event.clientY)
  {
    rightX = event.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    rightY = event.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;
  }
  rightX = rightX - imgPos[0];
  rightY = rightY - imgPos[1];
  document.getElementById("right-x").innerHTML = rightX;
  document.getElementById("right-y").innerHTML = rightY;
  drawDot(rightX, rightY, rightCanvas);
}
//*
// =====================================================================================================================
// End of adapted code.
// =====================================================================================================================
//*

function drawDot(x, y, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x - 0.5 * DOT_SIZE, y - 0.5 * DOT_SIZE, DOT_SIZE, DOT_SIZE);
}