// Settings and intialize layout
this.MAX_HEIGHT = 133;
this.CELL_SIZE = 50;
this.MAX_NOISE = 15;

var searchParameters = new URL(window.location.href).searchParams;

this.container = document.getElementById("pixel-viewer-interactive-container");
this.content = document.getElementById("pixel-viewer-interactive-content");
this.context = content.getContext('2d');
this.canvasWidth = container.clientWidth;
this.canvasHeight = container.clientHeight;
this.contentWidth = 10000;
this.contentHeight = 6650;

this.cell_line_height = 15;
this.cell_text = 'R \nG \nB ';
this.text_opacity = 0;
this.mode = 'datarep';
var showColourCode = true;
this.picturePicker = false;

this.filter = null;
this.salt = null;
this.gaussian_kernel = Array(); // Convolutional Kernel for Gaussian blurring
this.custom_kernels = Array(); // Custom kernels input by the user

this.gridSize = 0; // Global to keep track of size of grid chosen
this.isGreyscale = false; // Global to keep track of whether greyscale is on

// Names of images to be included in picture picker
this.images = {
  "coloured-roof-small.png": {
    "image_position": {
      "top": 1037,
      "left": 794,
    }
  },
  "alley.jpg": {},
  "arnold.jpg": {},
  "bike.jpg": {},
  "boards.jpg": {},
  "dark_clock.jpg": {},
  "dark.jpg": {},
  "duck.jpg": {
    "image_position": {
      "top": 1121,
      "left": 2919,
    }
  },
  "fence.jpg": {},
  "knight.png": {},
  "lake.png": {
    "image_position": {
      "top": 3231,
      "left": 4523,
    }
  },
  "roof.jpg": {},
  "tuba.jpg": {},
  "words_zoom.png": {},
  "words.png": {},
}
this.available_images = Object.keys(images)
// Default image to load
this.image_filename = 'coloured-roof-small.png';
this.tiling = new Tiling;
this.piccache = Array();

const image_base_path = base_static_path + 'interactives/pixel-viewer/img/';
var source_canvas = document.getElementById('pixel-viewer-interactive-source-canvas');
var colour_code_rep = 'rgb';

$( document ).ready(function() {
  init_cache(300, MAX_HEIGHT);

  // Enable tooltips.
  $('[data-toggle="tooltip"]').tooltip();
  // Hide tooltips 2 seconds after being shown.
  $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function () {
    setTimeout(function() {
      $('[data-toggle="tooltip"]').tooltip('hide');
    }, 2000);
  });

  if (searchParameters.has('image')){
    image_filename = searchParameters.get('image');
  }

  var image_filepath = image_base_path + image_filename;
  $('#pixel-viewer-interactive-original-image').attr('crossorigin', 'anonymous').attr('src', image_filepath);
  load_resize_image(image_filepath, false);

  switch (searchParameters.get('mode')) {
    case 'threshold':
      mode = 'threshold'; break;
    case 'thresholdgreyscale':
      mode = 'thresholdgreyscale'; break;
    case 'blur':
      mode = 'blur'; break;
    case 'edgedetection':
      mode = 'edgedetection'; break;
    case 'brightness':
      mode = 'brightness'; break;
  }

  if (searchParameters.has('picturepicker')){
    // Whether or not to allow student to pick from set pictures
    picturePicker = true;
  }

  if (searchParameters.has('hide-menu')) {
    $('#pixel-viewer-interactive-menu-toggle').remove();
  }

  if (searchParameters.has('hide-colour-codes')) {
    showColourCode = false;
  }

  if (searchParameters.has('pixelmania')){
    $('#pixelmania-logo').removeClass('d-none');
  }

  if (searchParameters.has('hide-colour-code-picker')) {
    $("#colour-code-radio").addClass('d-none').removeClass('d-flex');
  }

  if (searchParameters.has('hide-config-selector')) {
    $("#configSelector").addClass('d-none');
  }

  setUpMode();
  if (picturePicker){
   createPicturePicker();
  }

  colour_code_rep = searchParameters.get('colour-code');
  if (colour_code_rep == 'rgb-hex') {
    $("input[id='rgb-hex-colour-code']").prop('checked', true);
  } else if (colour_code_rep == 'hex') {
    $("input[id='hex-colour-code']").prop('checked', true);
  } else if (colour_code_rep == 'brightness') {
    $("input[id='brightness-colour-code']").prop('checked', true);
  } else {
    colour_code_rep = 'rgb';
    $("input[id='rgb-colour-code']").prop('checked', true);
  }

  // Check if custom zoom position parameters are given, otherwise default to 0,0.
    try {
      image_position_top = images[image_filename]["image_position"]["top"];
    } catch (e) {
      image_position_top = 0;
    }
    try {
      image_position_left = images[image_filename]["image_position"]["left"];
    } catch (e) {
      image_position_left = 0;
    }
    original_image_position_top = image_position_top * -1;
    scroller_position_top = image_position_top;
    original_image_position_left = image_position_left * -1;
    scroller_position_left = image_position_left;
    reflow();

  if (searchParameters.has('no-pixel-fill')){
    $('#pixel-viewer-interactive-show-pixel-fill').prop('checked', false);
    $("#pixel-viewer-interactive-loader").hide();
    $("#pixel-viewer-interactive-buttons").css({opacity: 1});
  } else if (searchParameters.has('preset-zoom')){
    scroller.zoomTo(searchParameters.get('preset-zoom'));
    $("#pixel-viewer-interactive-loader").hide();
    $("#pixel-viewer-interactive-buttons").css({opacity: 1});
  } else {
    $("#pixel-viewer-interactive-original-image").show();
    $("#pixel-viewer-interactive-original-image").delay(1000).animate(
      {
        height: contentHeight * 0.8,
        overflow: "hidden",
        top: original_image_position_top.toString() + 'px',
        left: original_image_position_left.toString() + 'px',
        margin: 0
      },
      4000,
      function() {
        // Animation complete
        scroller.scrollTo(scroller_position_left, scroller_position_top);
        $("#pixel-viewer-interactive-loader").hide();
        $("#pixel-viewer-interactive-buttons").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow');
        $(zoomInBtn).tooltip('show');
      }
    );
    $("#pixel-viewer-interactive-original-image").fadeOut(300);
  }
});

function setUpMode(){
  // Sets up widgets and descriptions appropriate to mode
  if (mode == 'threshold'){
    addDescription(gettext("Colour Threshold Interactive"),
    gettext("Create an expression to threshold the image. Any pixels that match the\
     expression you come up with will be turned white, and everything else will become black. What happens \
     when you threshold on different values or for different colours? Can you use this technique to identify \
     regions of similar colour in the image?"));
    new Thresholder($('#pixel-viewer-image-manipulator'));
  }
  if (mode == 'thresholdgreyscale'){
    addDescription(gettext("Threshold Interactive"), gettext("The image has been converted to greyscale by taking the average of the red, blue and green values for\
      each pixel. Choose a threshold between 0 and 255 and transform this picture into black and white to \
      identify regions and edges."));
    filter = greyscaler;
    isGreyscale = true;
    new GreyscaleThresholder($('#pixel-viewer-image-manipulator'));
  }
  if (mode == 'blur'){
    addDescription(gettext("Picture Blurring Interactive"), gettext("Experiment with using different blurs to try process the noise. The mean blur will take the mean values of the pixels surrounding,\
      the median will take the median value, the gaussian blurs according to a gaussian distribution, and the custom blur allows you to give weights to different surrounding pixels.\
      How do the different types of blur effect the image? What happens when you change values in the custom grid? Experiment with both greyscale and rgb images.  \
      What would happen if every value in the grid was 0 except one? How come? \
      <br><br>\
       If you find that the scroll and zoom are slow with a blur applied, try removing the blur, zooming or scrolling and \
      then reapplying the blur."));
    available_images = ["coloured-roof-small.png", "dark.jpg", "dark_clock.jpg"]
    new Blur($('#pixel-viewer-image-manipulator'));
  }
  if (mode == 'edgedetection'){
    available_images = ["coloured-roof-small.png", "alley.jpg", "bike.jpg", "boards.jpg",
  "fence.jpg", "roof.jpg", "tuba.jpg","words.png",
  "words_zoom.png", "knight.png"]
    addDescription(gettext("Edge Detection Interactive"), gettext("Find an edge in the graph and zoom right in. What information could a computer use from the values of the pixels surrounding the edge to find it?\
    <br><br>\
    We have supplied you with some grids to apply to the image to transorm it. The numbers in the grids are multiplied against the values of the pixels that surround each point. What numbers\
    can you use in these boxes to discover edges? \
    <br><br>\
    Below the grids is a thresholder which you can apply to the result. What results can you get if you combine these two filters to the image? There is an option\
    for outputting the absolute value of the result of the multiplication grid. What does checking and unchecking this box change about the result? What happens if you apply multiple grids?"));
    new EdgeDetector($('#pixel-viewer-image-manipulator'));
  }
  if (mode == 'brightness'){
    addDescription(gettext("Brightness Interactive"), gettext("The image has been converted to greyscale by taking the average of the red, blue and green values for\
      each pixel."));
    filter = greyscaler;
    isGreyscale = true;
  }
}

function addDescription(title, description){
  // Add description to page
  $("#pixel-viewer-interactive-title").html(title);
  $("#pixel-viewer-extra-feature-description").html(description);
}

function EdgeDetector(parent_element){
  // Widget set for edge detection functionality
  this.main_div = $("<div></div>");
  this.main_div.attr("id", "pixel-viewer-edge-detector").appendTo($(parent_element));

  this.main_div.append(
    greyScaleToggler()
  );
  toggleGreyscale()
  // Set greyscale to match toggler value

  // Create selector for number of grids to apply
  this.main_div.append(
    $(document.createElement("label"))
    .text(gettext("Number of grids:"))
    .attr("class", "col-12 pl-0")
    .append(
      $(document.createElement("select"))
      .attr({"id": "num-grids", "class": "form-control w-auto d-inline mx-1"})
      .on("input", createGrids)
      .append($("<option value=1>1</option>"))
      .append($("<option value=2 selected>2</option>"))
      .append($("<option value=3>3</option>"))
      .append($("<option value=4>4</option>"))
    )
  );

  this.main_div.append(
    gridSizeChooser(createGrids)
  );

  this.main_div.append($(document.createElement("div")).attr("id","grids-div"));

  // Create grids for input
  createGrids();

  // Create buttons for applying filters
  this.main_div
    .append(
      $(document.createElement("button"))
      .text(gettext("Apply grids"))
      .attr("class", "btn btn-primary mr-1")
      .click(edgeDetect)
  );
  this.main_div
    .append(
    $(document.createElement("button"))
    .text(gettext("Restore Image"))
    .attr("class", "btn btn-primary")
    .click(removeFilters)
  );

  this.main_div.append($("<p></p>").text(gettext(
    "Try adding a threshold to the picture once the transformation has taken place to highlight the edges you find."))
    .attr("class", "mt-2 mb-1"));

  this.main_div.append(thresholdSelect(127))
  .append($(document.createElement("button"))
  .text(gettext("Apply grids and Threshold"))
  .attr("class", "btn btn-primary ml-1 mb-1")
  .click(applyGreyThreshold));
}


function Blur(parent_element){
  // A Blur widget for blur mode
  this.main_div = $("<div></div>");
  this.main_div.attr("id", "pixel-viewer-blur").appendTo($(parent_element));

  // Add a description about noise, then give opportunity for students to introduce noise.
  this.main_div.append($(document.createElement("p")).text(gettext("Sometimes images have noise, and applying a blur can be a helpful way to preprocess\
  an image that contains noise before using other Computer Vision algorithms. Use this to add some \"salt and pepper\" noise to the image and then\
  observe what happens when you apply the blurs to a noisy image. Perhaps you have a noisy image that you could upload yourself?")));

  this.main_div.append($("<label></label>").text(gettext("Amount of noise to add (%): ")));
  this.main_div.append($(document.createElement("input"))
      .attr({"type": "number", "value": 10, "id" : "noise_selector", "class" : "form-control w-auto d-inline m-1 mt-2 percent_selector int_selector pos_int_selector"})
      .on("input", truncateValues)
      .on("blur", sanitiseValues)
    ).append(
    $(document.createElement("button"))
    .text(gettext("Add noise"))
    .attr("class", "btn btn-primary mb-1 mr-1")
    .click(addNoise)
  ).append(
    $(document.createElement("button"))
    .text(gettext("Remove noise"))
    .attr("class", "btn btn-primary mb-1")
    .click(removeSalt)
  );
  this.main_div.append($(document.createElement("p")).html(gettext("<span id='freeze-warning'>Warning:</span> The 'add noise'\
  button will freeze the interactive while it is performing calculations")));

  this.main_div.append(
    greyScaleToggler()
  );
  toggleGreyscale();

  this.main_div.append(
    $(document.createElement("label"))
    .attr("class", "col-12 pl-0")
    .text(gettext("Type of blur:"))
    .append(
      $(document.createElement("select"))
      .attr({"id": "blur-type", "class": "form-control w-auto d-inline mx-1"})
      .append($("<option value=median>median</option>"))
      .append($("<option value=mean>mean</option>"))
      .append($("<option value=gaussian>gaussian</option>"))
      .append($("<option value=custom>custom convolutional kernel</option>"))
      .on("input", createGrid)
    )
  );

  this.main_div.append(
    gridSizeChooser(createGrid)
  );
  this.main_div.append(
    $(document.createElement("div"))
    .attr("id", "blur-grid")
  );
  createGrid();
  this.main_div.append(
    $(document.createElement("button"))
    .text(gettext("Apply blur"))
    .attr("class", "btn btn-primary mr-1")
    .click(applyBlur));

  this.main_div
    .append(
    $(document.createElement("button"))
    .text(gettext("Remove blur"))
    .attr("class", "btn btn-primary")
    .click(removeFilters)
  );
}

function Thresholder(parent_element){
  // Colour thresholder widget
  logic_order = $(document.createElement("p")).text(gettext("Note: The 'AND' operator will always be evaluated before the 'OR' operator."));
  $(parent_element).append(logic_order);
  this.main_div = $("<div></div>");
  this.main_div.attr("id", "pixel-viewer-thresholder").appendTo($(parent_element));
  vals = ["R", "G", "B"];
  for (val in vals){
    this.main_div.append($("<div></div>")
      .attr("id", "colour_" + val)
      .attr('class', 'col-12 pl-0')
    .append($("<label></label>").text(gettext(vals[val]))
    .append($("<select></select>")
      .attr({"id": vals[val] + "_lt_or_gt", "class": "form-control w-auto d-inline ml-1"})
      .append($("<option value='<'>\<</option>"))
      .append($("<option value='>'>\></option>")))
    .append($(document.createElement("input"))
      .attr({"type": "number", "value": 0, "id" : vals[val] + "_selector", "class" : "color_selector int_selector pos_int_selector form-control w-auto d-inline mx-1"})
      .on("input", truncateValues)
      .on("blur", sanitiseValues))
    ));
    if (vals.length - 1 > val){
      var parent_div = document.getElementById("colour_" + val);
      $("<select></select>")
      .attr({"id": "operator_" + val, "class": "form-control w-auto d-inline"})
      .append($("<option value='||'>OR</option>"))
      .append($("<option value='&&'>AND</option>"))
      .appendTo(parent_div);
    }
  }
  this.main_div.append($(document.createElement("button"))
  .text(gettext("Apply Threshold"))
  .attr("class", "btn btn-primary mx-1")
  .click(applyThreshold));
  this.main_div.append($(document.createElement("button"))
  .text(gettext("Remove Threshold"))
  .attr("class", "btn btn-primary mx-1")
  .click(removeFilters));
}


function GreyscaleThresholder(parent_element){
  // Greyscale thresholder widget
  this.main_div = $("<div></div>");
  this.main_div.attr("id", "pixel-viewer-thresholder").appendTo($(parent_element));
  this.main_div.append(thresholdSelect(127)
  .append($(document.createElement("button"))
  .text(gettext("Apply Threshold"))
  .attr("class", "btn btn-primary mx-1 mb-1")
  .click(applyGreyThreshold))
  .append($(document.createElement("button"))
  .text(gettext("Remove Threshold"))
  .attr("class", "btn btn-primary mb-1")
  .click(removeFilters)));
}

function greyScaleToggler(){
  // return a select object for toggling greyscale on or off
  return $(document.createElement("label"))
    .attr("class", "col-12 pl-0")
    .text(gettext("Greyscale or rgb:"))
    .append(
      $(document.createElement("select"))
      .attr({"id": "greyscale-or-rgb", "class": "form-control w-auto d-inline mx-1"})
      .append($("<option value=greyscale>greyscale</option>"))
      .append($("<option value=rgb>rgb</option>"))
      .on("input", toggleGreyscale)
    )
}

function gridSizeChooser(callback){
  // return a select option for choosing how big a convolutional kernel to be applied should be
  return $(document.createElement("label"))
    .attr("class", "col-12 pl-0")
    .text(gettext("Grid size:"))
    .append(
      $(document.createElement("select"))
      .attr({"id": "grid-size", "class": "form-control w-auto d-inline mx-1"})
      .on("input", callback)
      .append($("<option value=2>2x2</option>"))
      .append($("<option value=3 selected>3x3</option>"))
      .append($("<option value=5>5x5</option>"))
      .append($("<option value=7>7x7</option>"))
    )
  }

function thresholdSelect(default_val = 0){
  // Returns a select object for deciding a numeric threshold. Uses default_val as default value
  return $("<label></label>").text(gettext("Threshold: "))
    .append($(document.createElement("input"))
      .attr({"type": "number", "value": default_val, "id" : "threshold_selector", "class" : "form-control w-auto d-inline color_selector int_selector pos_int_selector"})
      .on("input", truncateValues)
      .on("blur", sanitiseValues))
}

function setGridSize(){
  // Sets the global grid size and isGreyscale based on user input
  gridSize = $("#grid-size").val();
  isGreyscale = $("#greyscale-or-rgb").val() == 'greyscale' ? true : false;
}

function edgeDetectionFilter(col, row){
  // a filter for edge detection to be applied to each pixel
  surroundingPixels = getSurroundingPixels(col, row, true);
  return applyCustomConvolutionalKernels(surroundingPixels)
}

function edgeDetect(){
  // Run edge detection algorithm on picture
  setGridSize();
  createCustomConvolutionalKernels();
  filter = edgeDetectionFilter;
  refreshImage();
}


function greyscaler(col, row){
  // Filter which turns colour picture into greyscale
  var pixelData = salter(col, row);
  var sum = pixelData[0] + pixelData[1] + pixelData[2];
  var avg = Math.round(sum / 3);
  return [avg, avg, avg];
}

function sanitiseValues(){
  // Gets rid of any empty values or floats in user input and changes to integers
  $(".int_selector")
    .filter(function(index) {return this.value == "";}).val(0);
  $(".int_selector").val(function(index, value) {return Math.round(value)});
}

function truncateValues(){
  // Makes sure no illegal values have been entered.
  $(".color_selector")
    .filter(function(index) {return this.value > 255;}).val(255);
  $(".pos_int_selector")
    .filter(function(index) {return this.value < 0;}).val(0);
  $(".percent_selector")
    .filter(function(index) {return this.value > MAX_NOISE;}).val(MAX_NOISE);
}

function toggleGreyscale(){
  // Turns greyscale mode on or off depending on user input
  if ($("#greyscale-or-rgb").val() == "greyscale"){
    isGreyscale = true;
    if (filter == null || filter == salter){
      filter = greyscaler;
    }
  }
  else{
    isGreyscale = false;
    if (filter == greyscaler){
      filter = salter
    }
  }
  refreshImage();
}

function constructGrid(id = 0){
  // Construct a single grid and return. Will have identifier of id + _grid_table
  var gridSize = $("#grid-size").val();
  var table = $(document.createElement("table")).attr("id", id+"_grid_table").attr("class", "grid_table mb-3");
  for (var i = 0; i < gridSize; i++){
    var row = $(document.createElement("tr")).attr("id", id+"_grid_table_row_" + i);
    table.append(row);
    for (var j = 0; j < gridSize; j++){
      row.append(
        $(document.createElement("td"))
        .append(
          $(document.createElement("input"))
          .attr({
            "id": id+"_grid_val_" + j + "_" + i,
            "class":"form-control w-auto d-inline int_selector blur_selector",
            "value":1,
            "type":"number"}
            )
          .on("blur", sanitiseValues)
        )
      );
    };
  };
  return table;
}

function createGrids(){
  // Create custom numGrids custom grids of size gridSize
  var numGrids = $("#num-grids").val();
  var gridsDiv = $("#grids-div");
  gridsDiv.empty();
  for (var i = 0; i < numGrids; i++){
    gridsDiv.append(constructGrid(i));
  }
  $("#grids-div").append(
    $(document.createElement("label")).text(gettext("Use absolute value of result: ")).append(
      $(document.createElement("input")).attr({"id":"use_abs_val","type":"checkbox"})));
}

function createGrid(){
  // Create a custom grid if in custom mode
  $("#blur-grid").empty();
  if ($("#blur-type").val() != "custom"){
    return;
  }
  $("#blur-grid").append(constructGrid());
  $("#blur-grid").append(
    $(document.createElement("label")).text(gettext("Use absolute value of result: ")).append(
      $(document.createElement("input")).attr({"id":"use_abs_val","type":"checkbox"})));
}

function getSurroundingPixels(col, row, returnGrid=true){
  // Gets the r, g and b values for  pixels surrounding the pixel at (row, col)
  // Grey scale is whether to return greyscale values
  // ReturnGrid: whether to return a grid (array of arrays) or flattened array of values.
  // Former is more useful for weighted blurring and latter is more useful for median and mean blurring

  var greyscalerFunc = greyscaler
  var shift = Math.floor(gridSize / 2);
  var rgb = Array(3);

  // Create three arrays for red, green and blue
  for (var k = 0; k < 3; k++){
    var grid;
    if (returnGrid){
      grid = Array(gridSize);
      for (var i = 0; i < gridSize; i++){
        var new_col = Array(gridSize);
        grid[i] = new_col;
        for (var j = 0; j < gridSize; j++){
          // Initialise to 0
          new_col[j] = 0;
        }
      }
    }
    else{
      grid = Array();
    }
    rgb[k] = grid;
  }

  // Go through the surrounding pixels and get red green and blue values
  for (var i = 0; i < gridSize; i++){
    var next_col = col + i - shift;
    if (next_col < 0 || next_col > contentWidth){
      // Leave values at 0
      continue;
    }
    else{
      for (var j = 0; j < gridSize; j++){
        var next_row = row + j - shift;
        if (next_row < 0 || next_row > contentHeight){
          // Leave this value at 0
          continue;
        }
        if (isGreyscale){
          pixelData = greyscalerFunc(next_col, next_row)
        }
        else if (salt && salt[next_col][next_row] != false){
          pixelData = [salt[next_col][next_row], salt[next_col][next_row], salt[next_col][next_row]];
        }
        else{
          pixelData = get_pixel_data(next_col, next_row);
        }
        for (var k = 0; k < 3; k++){
          // Update each of the red, green and blue grids respectively
          if (returnGrid){
            rgb[k][i][j] = pixelData[k];
          }
          else{
            rgb[k].push(pixelData[k]);
          }
        }
      }
    }
  }
  return rgb;
}

function applyConvolutionalKernel(rgb, convo_k){
  // Applies a convolutional kernel to an rgb grid and returns an array of red green and blue values
  response = Array();

  // Save some calculations if it's greyscale
  num_colours = isGreyscale ? 1 : 3;
  for (var k = 0; k < num_colours; k++){
    var sum = 0;
    for (i = 0; i < gridSize; i++){
      for (j = 0; j < gridSize; j++){
        sum += convo_k[i][j] * rgb[k][i][j];
      }
    }
    if (mode=="edgedetection"){
      // If we're doing blurring, we'll want to average the result, but for edge detection we just combine them
      response.push(sum);
    }
    else{
      response.push(Math.floor(sum/convo_k.totalWeight));
    }
  }
  if (isGreyscale){
    response = [response[0], response[0], response[0]];
  }
  return response;
}

function createCustomConvolutionalKernels(){
  // Create the custom convolutional kernels in memory from user input
  gridSize = $('#grid-size').val();
  custom_kernels = Array();
  // For each user input grid,
  // convert user input into convolutional kernel
  var totalWeight = 0
  var next_grid = Array();
  custom_kernels.push(next_grid);
  for (var i = 0; i < gridSize; i++) {
    var col = Array();
    next_grid.push(col);
    for (var j = 0; j < gridSize; j++) {;
      var weight = parseInt($("#0_grid_val_" + i + "_" + j).val());
      totalWeight += Math.abs(weight);
      col.push(weight);
    }
    // Make sure we don't divide by 0
    if (totalWeight == 0) {
      totalWeight = 1;
    }
    next_grid.totalWeight = totalWeight;
  }
}

function applyCustomConvolutionalKernels(rgb){
    // Applies custom convolutional kernels to set of surrounding pixels
    var numGrids = custom_kernels.length;
    var response = [0,0,0]
    for (var i = 0; i < numGrids; i++){
      // Apply convolutional kernel
      var next_rgb = applyConvolutionalKernel(rgb, custom_kernels[i]);

      // Add result to response
      for (var i = 0; i < 3; i++){
        response[i] += Math.floor(next_rgb[i])
      }
    }

    // Find the average of red green and blue values from all grids
    return response.map(function(val){
      var x =  Math.floor(val/numGrids);
      return $('#use_abs_val').is(":checked") ? Math.abs(x) : x
      });
  }

function createGaussianKernel(){
  // Creates a gaussian kernel of size gridSize
  gaussian_kernel = Array();
  var shift = Math.floor(gridSize / 2)

  for (var x = 0 - shift; x < gridSize - shift; x++){
    var col = Array();
    gaussian_kernel.push(col);
    for (var y = 0 - shift; y < gridSize - shift; y++){
      col.push(1/2*Math.PI*Math.pow(Math.E, -(x*x + y*y)/2))
    }
  }
  gaussian_kernel.totalWeight = sum(gaussian_kernel.map(function(col){return sum(col);}));
}

function applyBlur(){
  // Apply a blur filter to the image. What kind of blur is applied depends on user input.

  var blur_type = $("#blur-type").val();
  // Set the global gridsize based on user input
  setGridSize()
  // Prepare any necessary convolutional kernels in memory
  if (blur_type == "custom"){
    createCustomConvolutionalKernels()
  }
  if (blur_type == "gaussian"){
    createGaussianKernel(gridSize);
  }
  filter = function(col, row){

    if (blur_type == "gaussian"){
      // Apply a gaussian blur
      surroundingPixels = getSurroundingPixels(col, row, true);

      return applyConvolutionalKernel(surroundingPixels, gaussian_kernel);
    }
    if (blur_type == "custom"){
      // Apply a blur based on the user input
      surroundingPixels = getSurroundingPixels(col, row, true);
      return applyCustomConvolutionalKernels(surroundingPixels);
      }
    if (blur_type == "mean"){
      // Apply a mean blur
      surroundingPixels = getSurroundingPixels(col, row, false);
      if (isGreyscale){
        // Save some computation if working with greyscale
        var val = Math.floor(average(surroundingPixels[0]));
        return [val, val, val];
      }
      return surroundingPixels.map(function(x){return Math.floor(average(x));});
    }
    if (blur_type == "median"){
      // Apply a median blur
      surroundingPixels = getSurroundingPixels(col, row, false);
      // Get median for r, g and b values
      if (isGreyscale){
        // Save some computation if working with greyscale
        var list = surroundingPixels[0].sort()
        var val = list[Math.floor(list.length / 2)];
        return [val, val, val];
      }
      else {
        return surroundingPixels.map(function(list){
          list = list.sort();
          return list[Math.floor(list.length / 2)];
        });
      }
    }
  }

  refreshImage();

}


function addNoise(){
  // Adds salt and pepper noise to the image
  if (salt == null){
    salt = new Array(contentWidth);
    for (var i = 0; i < contentWidth; i++){
      salt[i] = new Array(contentHeight);
      var j = contentHeight
      while (j--) salt[i][j] = false;
    }
  }
  var salt_amount = Math.floor(contentWidth * contentHeight * $("#noise_selector").val()/100);
  for (var i = 0; i < salt_amount; i++){
    var x = randomInt(contentWidth);
    var y = randomInt(contentHeight);
    salt[x][y] = randomInt(256);
  }
  if (filter == null)
    filter = salter;
  refreshImage();
}

function salter(col, row){
  // Filter which applies noise
  if (salt != null && salt[col][row] != false){
    var val = salt[col][row];
    return [val,val,val];
  }
  else{
    return get_pixel_data(col, row);
  }
}

function removeSalt(){
  // Removes salt and pepper noise
  salt = null;
  refreshImage();
}

function removeFilters(){
  // Remove any filters (except for greyscale if greyscale is picked)
  if (isGreyscale){
    filter = greyscaler;
  }
  else {
    filter = salter;
  }
  refreshImage();
}

function applyGreyThreshold(){
  // Applies a threshold to the values (or the edge detected values if this is the mode)
  var threshold = $("#threshold_selector").val();
  var the_mode = mode
  filter = function(col, row){
    // Grey scale threshold filter
    var pixelData;
    if (the_mode == 'edgedetection'){
      pixelData = edgeDetectionFilter(col, row);
    }
    else{
      pixelData = greyscaler(col, row);
    }
    var avg = pixelData[0];
    if (avg > threshold){
      return [255, 255, 255];
    }
    else{
      return [0,0,0]
    }
  }
  refreshImage();
}

function applyThreshold(){
  // Apply threshold for colour threshold widget
  var r_lt_or_gt = $("#R_lt_or_gt").val();
  var r_val = $("#R_selector").val();
  var g_lt_or_gt = $("#G_lt_or_gt").val();
  var g_val = $("#G_selector").val();
  var b_lt_or_gt = $("#B_lt_or_gt").val();
  var b_val = $("#B_selector").val();

  var operator_0 = $("#operator_0").val();
  var operator_1 = $("#operator_1").val();

  filter = function(col, row){
    var pixelData = get_pixel_data(col, row);
    var expr = [pixelData[0], r_lt_or_gt, r_val, operator_0, pixelData[1], g_lt_or_gt, g_val, operator_1, pixelData[2], b_lt_or_gt, b_val]
    .join(" ");
    if (eval(expr)){
      return ([255, 255, 255]);
    }
    else {
      return ([0, 0, 0]);
    };
  };
  refreshImage();
}

function refreshImage(){
  // Reload image. Use if any filters have been applied.
  scroller.scrollBy(0, 0);
}

function createPicturePicker(){
  // Create picker for default pictures
  main_div = $("#picture-picker");
  main_div.append($("<p></p>").text(gettext("Or choose from the following supplied images:")));
  for (var i = 0; i < available_images.length; i++){
    var img_url = image_base_path + available_images[i]
    main_div.append(
      $("<img>")
      .attr('crossorigin', 'anonymous')
      .attr('src', img_url)
      .attr('class', 'img-pick')
      .click(function(){load_resize_image(this.src, false);})
    );
  }
}

function loadImage(src){
  //  Prevent any non-image file type from being read.
  if(!src.type.match(/image.*/)){
    console.log("The dropped file is not an image: ", src.type);
    return;
  }
  // Remove any noise added
  salt = null

  //  Create our FileReader and run the results through the render function.
  var reader = new FileReader();
  reader.onload = function(e){
    load_resize_image(e.target.result);
  };
  reader.readAsDataURL(src);
}

function loadImageDialog(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      load_resize_image(e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$( "#pixel-viewer-interactive-menu-toggle" ).click(function() {
  $( "#pixel-viewer-interactive-settings" ).toggleClass('menu-offscreen');
});

$('#pixel-viewer-interactive-show-pixel-fill').change(function() {
  scroller.finishPullToRefresh();
});

$("input[name='colourCode']").click(function() {
  colour_code_rep = $("input[name='colourCode']:checked").val()
  scroller.finishPullToRefresh();
})

// Caches data about the image
function init_cache(width, height){
  piccache = Array()
  ctx = source_canvas.getContext('2d');
  for (var col = 0; col<width; col++){
    next_col = Array(height)
    piccache.push(next_col)
  }
}

function get_pixel_data(col, row){
  if (piccache.length <= col || piccache[col].length <= row){
    // If we're looking outside the range of the size of picture just make it white
    return [255,255,255]
  } else if (piccache[col][row] == null){
    // Otherwise if we haven't already cached this then cache it
    var source_canvas_context = source_canvas.getContext('2d');
    var value = source_canvas_context.getImageData(col, row, 1, 1).data;
    piccache[col][row] = value;
    return value;
  } else {
    // Return the value from the cache
    return piccache[col][row];
  }
}

function load_resize_image(src, user_upload=true){
  var image = new Image();
  image.onload = function(){
    var canvas = document.getElementById("pixel-viewer-interactive-source-canvas");
    if(image.height > MAX_HEIGHT) {
      image.width *= MAX_HEIGHT / image.height;
      image.height = MAX_HEIGHT;
    }
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = image.width;
    canvas.height = image.height;
    init_cache(image.width, image.height);
    ctx.drawImage(image, 0, 0, image.width, image.height);
    scroller.scrollTo(0,0);
    if(user_upload){
      var text = gettext("Your image has been resized for this interactive to " + image.width + " pixels wide and " + image.height + " pixels high.");
      canvas.style.display = "inline-block";
    }
    else {
    var text = "";
    canvas.style.display = "hidden";
    }
    $( '#pixel-viewer-interactive-resize-values' ).text(text)
  };
  image.crossOrigin = 'anonymous'
  image.src = src;
}

var target = document.body;
target.addEventListener("dragover", function(e){e.preventDefault();}, true);
target.addEventListener("drop", function(e){
  e.preventDefault();
  loadImage(e.dataTransfer.files[0]);
}, true);


// Canvas renderer
var render = function(left, top, zoom) {
  // Full clearing
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // Use tiling
  tiling.setup(canvasWidth, canvasHeight, contentWidth, contentHeight, CELL_SIZE, CELL_SIZE);
  tiling.render(left, top, zoom, paint);

  // Variables to be calculated once per draw
  // Calculate opacity of labels
  text_opacity = zoom - 0.8

  if (text_opacity >= 1) {
    text_opacity = 1;
  } else if (text_opacity <= 0) {
    text_opacity = 0;
  }
};

// Initialize Scroller
this.scroller = new Scroller(render, {
  zooming: true,
  bouncing: false,
  locking: false,
  animating: false,
  paging: false,
  snapping: false,
  minZoom: 0.001,
  maxZoom: 4
});

// Cell Paint Logic
var paint = function(row, col, left, top, width, height, zoom) {
  // Get data for pixel
  var show_pixel_fill = document.getElementById('pixel-viewer-interactive-show-pixel-fill').checked;
  var pixelData;
  if (filter != null){
    pixelData = filter(col, row);
  }
  else {
    pixelData = get_pixel_data(col, row);
  }
  if (show_pixel_fill) {
    context.fillStyle = 'rgb('+pixelData[0]+','+pixelData[1]+','+pixelData[2]+')';
    context.fillRect(Math.round(left), Math.round(top), Math.round(width)+1, Math.round(height)+1);
  } else {
    context.strokeRect(Math.round(left), Math.round(top), Math.round(width)+1, Math.round(height)+1);
  }

  // If text opacity is greater than 0, then display RGB values
  if (showColourCode && text_opacity > 0) {
    if (!show_pixel_fill) {
      context.fillStyle = "rgba(0, 0, 0, " + text_opacity + ")";
    } else if ((((pixelData[0] / 255) + (pixelData[1] / 255) + (pixelData[2] / 255)) / 3) < 0.85) {
      context.fillStyle = "rgba(255, 255, 255, " + text_opacity + ")";
    } else {
      context.fillStyle = "rgba(110, 110, 110, " + text_opacity + ")";
    }

    // Pretty primitive text positioning
    if (colour_code_rep == 'hex') { // Shows colour codes in #FFFFFF style
      context.font = (10 * zoom).toFixed(2) + 'px Consolas, Courier New, monospace';
      r = pixelData[0];
      g = pixelData[1];
      b = pixelData[2];
      hex_string = rgbToHex(r, g, b);
      context.fillText(hex_string, left + (4 * zoom), top + (14 * zoom) + (cell_line_height * zoom));
    } else if (colour_code_rep == 'brightness') {
      context.font = (10 * zoom).toFixed(2) + 'px Consolas, Courier New, monospace';
      brightness = Math.round(average(pixelData));
      context.fillText(brightness, left + (16 * zoom), top + (14 * zoom) + (cell_line_height * zoom));
    } else {
      context.font = (14 * zoom).toFixed(2) + 'px Consolas, Courier New, monospace';
      var cell_lines = cell_text.split('\n');
      for (var i = 0; i < cell_lines.length; i++) {
        if (colour_code_rep == 'rgb-hex') { // Shows colour codes in RGB using Hexadecimal
          value = componentToHex(pixelData[i])
        } else { // Shows colour codes in RGB using Decimal
          value = pixelData[i]
        }
        context.fillText(cell_lines[i] + value, left + (6 * zoom), top + (14 * zoom) + (i * cell_line_height * zoom));
      }
    }
  }
};

// Taken from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
  var hex = c.toString(16).toUpperCase();
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var rect = container.getBoundingClientRect();
scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);

// Reflow handling
var reflow = function() {
  canvasWidth = container.clientWidth;
  canvasHeight = container.clientHeight;
  // Sync current dimensions with canvas
  content.width = canvasWidth;
  content.height = canvasHeight;
  scroller.setDimensions(canvasWidth, canvasHeight, contentWidth, contentHeight);
};

// Set zoom to see numbers if no colour fill
if (searchParameters.has('no-pixel-fill')) {
  this.scroller.zoomTo(1.5);
}

window.addEventListener("resize", reflow, false);

// Setup button tooltips.
const zoomInBtn = document.querySelector("#pixel-viewer-interactive-zoom-in");
zoomInBtn.title = gettext("Click to Zoom");
zoomInBtn.addEventListener("click", function() {
  scroller.zoomBy(1.2, true);
}, false);

zoomOutBtn = document.querySelector("#pixel-viewer-interactive-zoom-out");
zoomOutBtn.title = gettext("Click to Zoom");
zoomOutBtn.addEventListener("click", function() {
  scroller.zoomBy(0.8, true);
}, false);
// If user tries to zoom, show tooltips.
window.addEventListener("resize", showTooltips, false);

if ('ontouchstart' in window) {

  content.addEventListener("touchstart", function(e) {
    // Don't react if initial down happens on a form element
    if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
      return;
    }

    scroller.doTouchStart(e.touches, e.timeStamp);
    e.preventDefault();
  }, false);

  document.addEventListener("touchmove", function(e) {
    scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
  }, false);

  document.addEventListener("touchend", function(e) {
    scroller.doTouchEnd(e.timeStamp);
  }, false);

  document.addEventListener("touchcancel", function(e) {
    scroller.doTouchEnd(e.timeStamp);
  }, false);

} else {

  var mousedown = false;

  content.addEventListener("mousedown", function(e) {
    if (e.target.tagName.match(/input|textarea|select/i)) {
      return;
    }

    scroller.doTouchStart([{
      pageX: e.pageX,
      pageY: e.pageY
    }], e.timeStamp);

    mousedown = true;
  }, false);

  document.addEventListener("mousemove", function(e) {
    if (!mousedown) {
      return;
    }

    scroller.doTouchMove([{
      pageX: e.pageX,
      pageY: e.pageY
    }], e.timeStamp);

    mousedown = true;
  }, false);

  document.addEventListener("mouseup", function(e) {
    if (!mousedown) {
      return;
    }

    scroller.doTouchEnd(e.timeStamp);

    mousedown = false;
  }, false);

  content.addEventListener(navigator.userAgent.indexOf("Firefox") > -1 ? "DOMMouseScroll" :  "mousewheel", function(e) {
  // following inspired by https://deepmikoto.com/coding/1--javascript-detect-mouse-wheel-direction
    e.preventDefault();
    var delta;
    var direction;
    if (e.wheelDelta) { // will work in most cases
      delta = e.wheelDelta / 60;
    } else if (e.detail) { // fallback for Firefox
      delta = -e.detail / 2;
    }
    direction = delta > 0 ? 'up' : 'down';
    if (direction == 'up') {
      scroller.zoomBy(1.2, true);
    } else if (direction == 'down') {
      scroller.zoomBy(0.8, true);
    }
  }, false);

}

function average(data){
  return data.reduce(function(sum, value){
    return sum + value;
  }, 0) / data.length;
}

function randomInt(max){
  return Math.floor(Math.random() * max);
}

function sum(array){
  return array.reduce(function(prev, curr, currI, arr){
    return prev + curr;
  });
}

function showTooltips() {
  $(zoomInBtn).tooltip('show');
  $(zoomOutBtn).tooltip('show');
}