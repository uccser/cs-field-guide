let leftImage = document.getElementById("img-left");
leftImage.onmousedown = getLeftCoordinates;
let rightImage = document.getElementById("img-right");
rightImage.onmousedown = getRightCoordinates;


$(document).ready(function () {
    $('#stereo-left-input').change(loadLeftImageDialog);
    $('#stereo-right-input').change(loadRightImageDialog);
});

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
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='stereo-right-input']").text(input.files[0].name);
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
  let imgPos = findPosition(leftImage);
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
  let imgPos = findPosition(rightImage);
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