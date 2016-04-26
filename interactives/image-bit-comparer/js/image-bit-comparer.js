// Image Bit Comparer Interactive JS
// Author: Jack Morgan

var ImageBitComparer = {};

// Setup sizing
ImageBitComparer.BASE_WIDTH = 450;
ImageBitComparer.BASE_HEIGHT = 300;
ImageBitComparer.scale_factor = 1;

ImageBitComparer.INITAL_IMAGES = [
                                  ['IMG_5035.jpg', 'Sunflower'],
                                  ['IMG_5264.jpg', 'Roof of Temple'],
                                  ['IMG_2223.jpg', 'Lake in New Zealand'],
                                  ['IMG_8354.jpg', 'Flower'],
                                  ['IMG_6698.jpg', 'Flower in snow'],
                                  ['IMG_8061.jpg', 'Duckling'],
                                  ['wedding-vehicle.jpg', 'Car'],
                                  ['IMG_2521.jpg', 'Lightning'],
                                  ['IMG_7448.jpg', 'Balloons'],
                                  ['IMG_0775.jpg', 'Books']
                                ];

ImageBitComparer.colour_labels = ['Red', 'Green', 'Blue'];

// The RGB values For each bit value
ImageBitComparer.comparison_bits = [
                                    [8,8,8], // 24 bits
                                    [5,6,5], // 16 bits
                                    [3,3,2], // 8 bits
                                    [1,2,1], // 4 bits
                                    [1,1,1], // 3 bits
                                    [1,1,0], // 2 bits
                                    [0,1,0], // 1 bits
                                    [0,0,0]  // 0 bits
                                   ];
ImageBitComparer.change_bits = [
                                [8,8,8], // 24 bits
                                [3,3,2]  // 8 bits
                               ];

$(document).ready(function(){

  // When user selects new image to load
  $('#interactive-image-bit-comparer-selected-image').change(function() {
    loadImage();
  });

  // When user changes image size
  $('#interactive-image-bit-comparer-image-size').change(function() {
    ImageBitComparer.scale_factor = $("#interactive-image-bit-comparer-image-size").val();
    loadImage();
  });

  if (getUrlParameter('change-bits') == 'true') {
    ImageBitComparer.mode = 'change-bits';
  } else {
    ImageBitComparer.mode = 'comparison';
  }
  // Add image options
  populateSelectOptions();
  // Setup required canvas and controls
  setupMode();
  // Load initial image
  loadImage();

  // Allow images to be draghed and dropped onto the page for loading
  var target = document.body;
  target.addEventListener("dragover", function(e){e.preventDefault();}, true);
  target.addEventListener("drop", function(e){
      e.preventDefault();
      loadDroppedImage(e.dataTransfer.files[0]);
  }, true);
});


// Add initial images to select element
function populateSelectOptions() {
  var $select = $('#interactive-image-bit-comparer-selected-image');
  for (var i = 0; i < ImageBitComparer.INITAL_IMAGES.length; i++) {
    var file = 'img/' + ImageBitComparer.INITAL_IMAGES[i][0];
    var text = ImageBitComparer.INITAL_IMAGES[i][1];
    $select.append($('<option>').text(text).data('file', file));
  }
};


// Load image that has been dragged and dropped onto page
function loadDroppedImage(file){
    //	Prevent any non-image file type from being read.
    if(!file.type.match(/image.*/)){
        alert("The dropped file is not an image! File provided was " + file.type);
    } else {
      var reader = new FileReader();
      reader.onload = function (data) {
          loadUserImage(file.name, data.target.result);
      };
      reader.readAsDataURL(file);
    }
};


// Load image that has been uploaded by upload button
function loadImageDialog(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (data) {
            loadUserImage(input.files[0].name, data.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
};


// Load user image and set as inital image
function loadUserImage(filename, file) {
    $('#interactive-image-bit-comparer-selected-image').append($('<option>').text(filename).data('file', file).attr('selected', true));
    loadImage();
};


// Setup interface for current mode
function setupMode() {
  var $canvas_parent_container = $('#interactive-image-bit-comparer-canvas-parent-container');
  $canvas_parent_container.empty();

  // If running in comparison mode
  if (ImageBitComparer.mode == 'comparison') {
    for (bit_values_index = 0; bit_values_index < ImageBitComparer.comparison_bits.length; bit_values_index++) {
      var $canvas_container = $('<div class="interactive-image-bit-comparer-canvas-container z-depth-1">');

      var bit_values = ImageBitComparer.comparison_bits[bit_values_index];
      var number_of_bits = bit_values.reduce(function(a, b) {return a + b;});
      if (number_of_bits == 1) {
        var subtitle_text = number_of_bits + ' bit';
      } else {
        var subtitle_text = number_of_bits + ' bits';
      }

      $canvas_container.append('<p class="interactive-image-bit-comparer-canvas-subtitle">' + subtitle_text + '</p>');
      var $canvas = $('<canvas class="interactive-image-bit-comparer-canvas"></canvas>');
      $canvas.data('bit_values', bit_values);
      $canvas.prop({width: ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor,
                    height: ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor});
      $canvas_container.append($canvas);

      $canvas_parent_container.append($canvas_container);
      $canvas_parent_container.append('</div>');
    }
  // If running in changing bits mode
  } else if (ImageBitComparer.mode == 'change-bits') {
    for (bit_values_index = 0; bit_values_index < ImageBitComparer.change_bits.length; bit_values_index++) {
      var $canvas_container = $('<div class="interactive-image-bit-comparer-canvas-container z-depth-1">');

      var bit_values = ImageBitComparer.change_bits[bit_values_index];
      var number_of_bits = bit_values.reduce(function(a, b) {return a + b;});
      if (number_of_bits == 1) {
        var subtitle_text = number_of_bits + ' bit';
      } else {
        var subtitle_text = number_of_bits + ' bits';
      }

      $canvas_container.append('<p class="interactive-image-bit-comparer-canvas-subtitle">' + subtitle_text + '</p>');
      var $canvas = $('<canvas class="interactive-image-bit-comparer-canvas"></canvas>');
      $canvas.data('bit_values', bit_values);
      $canvas.prop({width: ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor,
                    height: ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor});
      $canvas_container.append($canvas);

      var $controls_container = $('<div class="interactive-image-bit-comparer-controls-container"></div>');
      for (var i = 0; i < ImageBitComparer.colour_labels.length; i++) {
        var $control_container = $('<div></div>');;
        $control_container.append('<label>' + ImageBitComparer.colour_labels[i] + ':</label>');
        var $select = $('<select class="browser-default"></select>');
        for (var bit = 8; bit >= 0; bit--) {
          $select.append('<option value="' + bit + '">' + bit + '</option>');
        }
        $select.val(bit_values[i]);
        $control_container.append($select);
        $controls_container.append($control_container);

        // Add event for when user changes controls
        $select.change(function() {
          var $select = $(this);
          var $container = $select.parents().eq(1);
          var $canvas = $container.prev();
          var select_index = $container.children().index($select.parent());

          // Set new bit value in parent canvas
          var bit_values = $canvas.data('bit_values');
          bit_values[select_index] = parseInt($select.val());
          $canvas.data('bit_values', bit_values);

          var source_image_data = initialCanvasData();
          // Update canvases from base image
          drawCanvas($canvas, source_image_data);
        });
      }

      $canvas_container.append($controls_container);
      $canvas_parent_container.append($canvas_container);
      $canvas_parent_container.append('</div>');
    }
  }
};


// Load and draw image for Canvas reference
function loadImage() {
  var source_canvas = document.getElementById('interactive-image-bit-comparer-source-canvas');
  source_canvas.width = ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor;
  source_canvas.height = ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor;
  var source_canvas_context = source_canvas.getContext('2d');

  var image = new Image();
  image.addEventListener('error', function (e){e.preventDefault(); alert("Starting image cannot be loaded when viewing file locally. Try another browser or the online version.");},false);
  image.onload = function() {
      $selected_image.data('data', image);
      source_canvas_context.drawImage(image, 0, 0, source_canvas.width, source_canvas.height);
      // Update canvases from base image
      drawCanvases();
  }
  $selected_image = $("#interactive-image-bit-comparer-selected-image option:selected");
  if ($selected_image.data('data')) {
    source_canvas_context.drawImage($selected_image.data('data'), 0, 0, source_canvas.width, source_canvas.height);
    // Update canvases from base image
    drawCanvases();
  } else {
    image.src = $selected_image.data('file');
  }
};


// Load inital image data values
function initialCanvasData() {
  var source_canvas = document.getElementById('interactive-image-bit-comparer-source-canvas');
  var source_base_width  = ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor;
  var source_base_height = ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor;
  var source_canvas_context = source_canvas.getContext('2d');
  try {
    var source_image_data = source_canvas_context.getImageData(0, 0, source_base_width, source_base_height);
  }
  catch (e) {
    alert("Starting image cannot be loaded when viewing file locally. Try another browser or the online version.");
  }
  return source_image_data;
};


// Draw the image data to a canvas using the canvas max bit values
function drawCanvas($canvas, source_image_data) {
  $canvas.attr('width', source_image_data.width + 'px');
  $canvas.attr('height', source_image_data.height + 'px');
  var bit_values = $canvas.data('bit_values');
  var red_divisor = 255 / (Math.pow(2, bit_values[0]) - 1);
  var green_divisor = 255 / (Math.pow(2, bit_values[1]) - 1);
  var blue_divisor = 255 / (Math.pow(2, bit_values[2]) - 1);

  canvas_context = $canvas[0].getContext('2d');

  // Copy image data
  canvas_data = source_image_data;

  for (var pixel_index = 0; pixel_index < canvas_data.data.length; pixel_index += 4) {
    canvas_data.data[pixel_index] = Math.round(canvas_data.data[pixel_index] / red_divisor) * red_divisor;
    canvas_data.data[pixel_index + 1] = Math.round(canvas_data.data[pixel_index + 1] / green_divisor) * green_divisor;
    canvas_data.data[pixel_index + 2] = Math.round(canvas_data.data[pixel_index + 2] / blue_divisor) * blue_divisor;
  }
  canvas_context.putImageData(canvas_data, 0, 0, 0, 0, source_image_data.width, source_image_data.height);
};


// Draw all canvases with source data
function drawCanvases() {
  var source_image_data = initialCanvasData();
  $('#interactive-image-bit-comparer-canvas-parent-container canvas').each(function () {
    drawCanvas($(this), source_image_data)
  });
};


// From jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
