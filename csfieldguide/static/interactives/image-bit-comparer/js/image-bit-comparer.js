// Image Bit Comparer Interactive JS
// Author: Jack Morgan
// Modified by: Courtney Bracefield

var urlParameters = require('../../../js/third-party/url-parameters.js');

var ImageBitComparer = {};

// Setup sizing
ImageBitComparer.BASE_WIDTH = 450;
ImageBitComparer.BASE_HEIGHT = 300;
ImageBitComparer.scale_factor = 1;

ImageBitComparer.INITAL_IMAGES = [
                                  [image_bit_comparer_images["sunflower"], 'Sunflower'],
                                  [image_bit_comparer_images["temple-roof"], 'Roof of Temple'],
                                  [image_bit_comparer_images["nz-lake"], 'Lake in New Zealand'],
                                  [image_bit_comparer_images["person"], 'Person'],
                                  [image_bit_comparer_images["flower"], 'Flower'],
                                  [image_bit_comparer_images["snow-flower"], 'Flower in snow'],
                                  [image_bit_comparer_images["duckling"], 'Duckling'],
                                  [image_bit_comparer_images["car"], 'Car'],
                                  [image_bit_comparer_images["lightning"], 'Lightning'],
                                  [image_bit_comparer_images["balloons"], 'Balloons'],
                                  [image_bit_comparer_images["black-and-white"], 'Black and White Photograph'],
                                  [image_bit_comparer_images["books"], 'Books']
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
  // Set image size to medium
  $("#interactive-image-bit-comparer-image-size").val(1);

  // When user selects new image to load
  $('#interactive-image-bit-comparer-selected-image').change(function() {
    loadImage();
  });

  // When user chooses own image to load
  $('#image-input').change(function() {
    loadImageDialog(this);
  });

  // When user changes image size
  $('#interactive-image-bit-comparer-image-size').change(function() {
    ImageBitComparer.scale_factor = $("#interactive-image-bit-comparer-image-size").val();
    loadImage();
  });

  if (urlParameters.getUrlParameter('change-bits') == 'true') {
    ImageBitComparer.mode = 'change-bits';
  } else {
    ImageBitComparer.mode = 'comparison';
  }

  // If screen is not wide enough for medium sized image,
  // then set display to small images
  if (document.documentElement.clientWidth < ImageBitComparer.BASE_WIDTH) {
    $("#interactive-image-bit-comparer-image-size").val("0.6");
    ImageBitComparer.scale_factor = 0.6;
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


/* Add initial images to select element */
function populateSelectOptions() {
  var $select = $('#interactive-image-bit-comparer-selected-image');
  for (var i = 0; i < ImageBitComparer.INITAL_IMAGES.length; i++) {
    var file = ImageBitComparer.INITAL_IMAGES[i][0];
    var text = ImageBitComparer.INITAL_IMAGES[i][1];
    $select.append($('<option>').text(text).data('file', file));
  }
};


/* Load image that has been dragged and dropped onto page */
function loadDroppedImage(file){
    //	Prevent any non-image file type from being read.
    if(!file.type.match(/image.*/)){
        var format = gettext('The dropped file is not an image! File provided was %(file_type)s');
        var alertText = interpolate(format, {"file_type": file_.type}, true);
        alert(alertText);
    } else {
      var reader = new FileReader();
      reader.onload = function (data) {
          loadUserImage(file.name, data.target.result);
      };
      reader.readAsDataURL(file);
    }
};


/* Load image that has been uploaded by upload button */
function loadImageDialog(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (data) {
            loadUserImage(input.files[0].name, data.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
};


/* Load user image and set as inital image */
function loadUserImage(filename, file) {
    $('#interactive-image-bit-comparer-selected-image').append($('<option>').text(filename).data('file', file).attr('selected', true));
    loadImage();
};


/* Get the subtitle text that displays number of bits */
function getSubtitleText(bit_values) {
  var number_of_bits = bit_values.reduce(function(a, b) {return a + b;});
  var format = ngettext('1 bit', '%(number_of_bits)s bits', number_of_bits);
  var subtitle_text = interpolate(format, {"number_of_bits": number_of_bits}, true);
  return subtitle_text
};


/* Setup interface for current mode */
function setupMode() {
  var $canvas_parent_container = $('#interactive-image-bit-comparer-canvas-parent-container');
  $canvas_parent_container.empty();

  // If running in comparison mode
  if (ImageBitComparer.mode == 'comparison') {
    for (bit_values_index = 0; bit_values_index < ImageBitComparer.comparison_bits.length; bit_values_index++) {
      var $canvas_container = $('<div class="interactive-image-bit-comparer-canvas-container shadow p-3 mb-5 bg-white rounded">');

      var bit_values = ImageBitComparer.comparison_bits[bit_values_index];
      var subtitle_text = getSubtitleText(bit_values);

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
      var $canvas_container = $('<div class="interactive-image-bit-comparer-canvas-container shadow p-3 mb-5 bg-white rounded">');

      var bit_values = ImageBitComparer.change_bits[bit_values_index];
      var subtitle_text = getSubtitleText(bit_values);

      $canvas_container.append('<p class="interactive-image-bit-comparer-canvas-subtitle">' + subtitle_text + '</p>');
      var $canvas = $('<canvas class="interactive-image-bit-comparer-canvas"></canvas>');
      $canvas.data('bit_values', bit_values);
      $canvas.prop({width: ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor,
                    height: ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor});
      $canvas_container.append($canvas);

      var $controls_container = $('<div class="interactive-image-bit-comparer-controls-container"></div>');
      for (var i = 0; i < ImageBitComparer.colour_labels.length; i++) {
        var $control_container = $('<div></div>');
        $control_container.append('<label>' + ImageBitComparer.colour_labels[i] + ':</label>');
        var $select = $('<select class="browser-default form-control"></select>');
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

          // Update subtitle text to show new number of bits used
          var subtitle_text = getSubtitleText(bit_values);
          $select.parents().eq(2).children('p').text(subtitle_text);
        });
      }

      $canvas_container.append($controls_container);
      $canvas_parent_container.append($canvas_container);
      $canvas_parent_container.append('</div>');
    }
  }
};


/* Load and draw image for Canvas reference */
function loadImage() {
  var source_canvas = document.getElementById('interactive-image-bit-comparer-source-canvas');
  setDimensions(source_canvas);
  source_canvas.width = ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor;
  source_canvas.height = ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor;
  var source_canvas_context = source_canvas.getContext('2d');

  var image = new Image();
  image.addEventListener('error', function (e) {
    e.preventDefault();
    alert(gettext('Starting image cannot be loaded when viewing file locally. Try another browser or the online version.'));
  }, false);
  image.onload = function() {
    setDimensions(image);
    source_canvas.width = ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor;
    source_canvas.height = ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor;
    source_canvas_context.drawImage(image, 0, 0, source_canvas.width, source_canvas.height);

    replaceTransparentPixels()
    // Update canvases from base image
    drawCanvases();
  }
  $selected_image = $("#interactive-image-bit-comparer-selected-image option:selected");
  if ($selected_image.data('data')) {
    selected_image_data = $selected_image.data('data')
    setDimensions(selected_image_data);
    source_canvas.width = ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor;
    source_canvas.height = ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor;
    source_canvas_context.drawImage(selected_image_data, 0, 0, source_canvas.width, source_canvas.height);

    replaceTransparentPixels()
    // Update canvases from base image
    drawCanvases();
  } else {
    image.crossOrigin = 'anonymous';
    image.src = $selected_image.data('file');
  }

  /* Replaces transparent pixels with solid white pixels */
  function replaceTransparentPixels() {
    imageData = source_canvas_context.getImageData(0, 0, source_canvas.width, source_canvas.height);
    data = imageData.data;
    // Replace any transparent pixels
    for (var pixel_index = 0; pixel_index < data.length; pixel_index += 4) {
      if (data[pixel_index + 3] !== 255) {
        // Transparent pixel. Change transparent pixel to a similarly coloured solid pixel.
        red = data[pixel_index];
        green = data[pixel_index + 1];
        blue = data[pixel_index + 2];
        alpha = data[pixel_index + 3];

        // Below method taken from http://marcodiiga.github.io/rgba-to-rgb-conversion
        data[pixel_index] = (1 - alpha) * 255 + alpha * red; // new red value
        data[pixel_index + 1] = (1 - alpha) * 255 + alpha * green; // new green value
        data[pixel_index + 2] = (1 - alpha) * 255 + alpha * blue; // new blue value
        data[pixel_index + 3] = 255; // new alpha value
      }
    }
    source_canvas_context.putImageData(imageData, 0, 0);
  }
};


/* Load inital image data values */
function initialCanvasData() {
  var source_canvas = document.getElementById('interactive-image-bit-comparer-source-canvas');
  setDimensions(source_canvas);
  var source_canvas_context = source_canvas.getContext('2d');
  var source_image_data = source_canvas_context.getImageData(0,
                                                             0,
                                                             ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor,
                                                             ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor);
  return source_image_data;
};


/* Draw the image data to a canvas using the canvas max bit values */
function drawCanvas($canvas, source_image_data) {
  $canvas.attr('width', ImageBitComparer.BASE_WIDTH * ImageBitComparer.scale_factor + 'px');
  $canvas.attr('height', ImageBitComparer.BASE_HEIGHT * ImageBitComparer.scale_factor + 'px');
  var bit_values = $canvas.data('bit_values');
  var red_divisor = 255 / (Math.pow(2, bit_values[0]) - 1);
  var green_divisor = 255 / (Math.pow(2, bit_values[1]) - 1);
  var blue_divisor = 255 / (Math.pow(2, bit_values[2]) - 1);

  canvas_context = $canvas[0].getContext('2d');
  // Copy image data
  canvas_data = source_image_data;
  for (var pixel_index = 0; pixel_index < canvas_data.data.length; pixel_index += 4) {
    setRgbValue(canvas_data, pixel_index, red_divisor);
    setRgbValue(canvas_data, pixel_index + 1, green_divisor);
    setRgbValue(canvas_data, pixel_index + 2, blue_divisor);
  }

  canvas_context.putImageData(canvas_data, 0, 0, 0, 0, source_image_data.width, source_image_data.height);
};


/* Set one of the rgb values for a given pixel */
function setRgbValue(canvas_data, pixel_index, divisor) {
   if (divisor == Infinity) {
    canvas_data.data[pixel_index] = 0;
   } else {
    canvas_data.data[pixel_index] = Math.round(canvas_data.data[pixel_index] / divisor) * divisor;
   }
}


/* Draw all canvases with source data */
function drawCanvases() {
  var source_image_data = initialCanvasData();
  $('#interactive-image-bit-comparer-canvas-parent-container canvas').each(function () {
    drawCanvas($(this), source_image_data)
  });
};


/* Set base width and height depending on orientation of image */
function setDimensions(image) {
  if (image.height > image.width) {
    // portrait
    ImageBitComparer.BASE_WIDTH = 350;
    ImageBitComparer.BASE_HEIGHT = 450;
  }
  else if (image.height < image.width) {
    // landscape
    ImageBitComparer.BASE_WIDTH = 450;
    ImageBitComparer.BASE_HEIGHT = 300;
  }
  else {
    // square
    ImageBitComparer.BASE_WIDTH = 300;
    ImageBitComparer.BASE_HEIGHT = 300;
  }
}
