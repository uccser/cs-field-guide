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
      let sourceImage = document.getElementById("img-left");
      sourceImage.crossOrigin = 'anonymous';
      sourceImage.src = e.target.result;
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
      let sourceImage = document.getElementById("img-right");
      sourceImage.crossOrigin = 'anonymous';
      sourceImage.src = e.target.result;
    }
    reader.readAsDataURL(input.files[0]);
    $("label[for='stereo-right-input']").text(input.files[0].name);
  }
}
