// let leftCanvas = document.getElementById("left-canvas");
// let leftImage = document.getElementById("img-left");
// console.log(leftImage.getBoundingClientRect().x)
// leftCanvas.height = leftImage.getBoundingClientRect().x;
// leftCanvas.style.position = "absolute";
// leftCanvas.style.left = leftImage.offsetLeft + "px";
//
// // leftCanvas.style.width = leftImage.style.width
// // leftCanvas.style.height = leftImage.style.height
// leftCanvas.onmousedown = getLeftCoordinates;

// let rightImage = document.getElementById("img-right");
// rightCanvas.onmousedown = getRightCoordinates;


$(document).ready(function () {
  canvas = document.getElementById('canvas-left');
  context = canvas.getContext('2d');
  rect = canvas.getBoundingClientRect();

  $('#stereo-left-input').change(loadLeftImageDialog);
  $('#stereo-right-input').change(loadRightImageDialog);
  prepareCanvas()
});

function prepareCanvas() {
  console.log("yay")
  let leftImage = document.getElementById("img-left");
  let MAX_WIDTH = 540;
  let MAX_HEIGHT = 405;
  let img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = leftImage.src;
  img.onload = function() {
    console.log("yay2")
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (img.width > MAX_WIDTH) {
      img.height *= MAX_WIDTH / img.width;
      img.width = MAX_WIDTH;
      leftImage.height = img.height;
      leftImage.width = img.width;
    }
    if (img.height > MAX_HEIGHT) {
      img.height = MAX_HEIGHT;
      img.width *= MAX_HEIGHT / img.height;
      leftImage.height = img.height;
      leftImage.width = img.width;
    }

    canvas.width = img.width;
    canvas.height = img.height;
    canvas.style.display = "inline-block";
  }
}

/*
 * Updates the left camera image with the one selected by the user.
 */
function loadLeftImageDialog() {
  let leftImage = document.getElementById("img-left");
  let input = this;
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      leftImage.crossOrigin = 'anonymous';
      leftImage.src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='stereo-left-input']").text(input.files[0].name);
    prepareCanvas()
  }
}

/*
 * Updates the right camera image with the one selected by the user.
 */
function loadRightImageDialog() {
  let rightImage = document.getElementById("img-left");
  let input = this;
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = function (e) {
      rightImage.crossOrigin = 'anonymous';
      rightImage.src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='stereo-right-input']").text(input.files[0].name);
    prepareCanvas()
  }
}

function findPosition(image)
{
  if(typeof( image.offsetParent ) != "undefined")
  {
    for(var posX = 0, posY = 0; image; image = image.offsetParent)
    {
      posX += image.offsetLeft;
      posY += image.offsetTop;
    }
    return [ posX, posY ];
  }
  else
  {
    return [ image.x, image.y ];
  }
}

function getLeftCoordinates(event)
{
  let posX = 0;
  let posY = 0;
  let imgPos = findPosition(leftCanvas);
  if (event.pageX || event.pageY)
  {
    posX = event.pageX;
    posY = event.pageY;
  }
  else if (event.clientX || event.clientY)
  {
    posX = event.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    posY = event.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;
  }
  posX = posX - imgPos[0];
  posY = posY - imgPos[1];
  document.getElementById("left-x").innerHTML = posX;
  document.getElementById("left-y").innerHTML = posY;
  drawDot(posX, posY)
}

function getRightCoordinates(event)
{
  let posX = 0;
  let posY = 0;
  let imgPos = findPosition(rightCanvas);
  if (event.pageX || event.pageY)
  {
    posX = event.pageX;
    posY = event.pageY;
  }
  else if (event.clientX || event.clientY)
  {
    posX = event.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    posY = event.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;
  }
  posX = posX - imgPos[0];
  posY = posY - imgPos[1];
  document.getElementById("right-x").innerHTML = posX;
  document.getElementById("right-y").innerHTML = posY;
}

function drawDot(x, y) {
  let ctx = leftCanvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(x, y,10,10);
}