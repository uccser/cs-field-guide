// Image Filters Interactive JS
// Author: Hayden Jackson

var ImageFiltersEnvironment = {};
var ImageFilters = {};

// Setup sizing
ImageFiltersEnvironment.BASE_WIDTH = 450;
ImageFiltersEnvironment.BASE_HEIGHT = 300;
ImageFiltersEnvironment.scale_factor = 1;

ImageFiltersEnvironment.INITIAL_IMAGES = [
                                  ['IMG_5035.jpg', 'Sunflower'],
                                  ['IMG_5264.jpg', 'Roof of Temple'],
                                  ['IMG_2223.jpg', 'Lake in New Zealand'],
                                  ['faces.jpg', 'Faces'],
                                  ['IMG_8354.jpg', 'Flower'],
                                  ['IMG_6698.jpg', 'Flower in snow'],
                                  ['IMG_8061.jpg', 'Duckling'],
                                  ['wedding-vehicle.jpg', 'Car'],
                                  ['IMG_2521.jpg', 'Lightning'],
                                  ['IMG_7448.jpg', 'Balloons'],
                                  ['black-and-white.jpg', 'Black and White Photograph'],
                                  ['IMG_0775.jpg', 'Books']
                                ];

ImageFiltersEnvironment.colour_labels = ['Red', 'Green', 'Blue'];

// The RGB values For each bit value
ImageFiltersEnvironment.kernel = [
  0, 0, 0,
  0, 1, 0,
  0, 0, 0
];

ImageFiltersEnvironment.simple_kernels = {
  'identity': [
    0, 0, 0,
    0, 1, 0,
    0, 0, 0
  ],
  'sharpen': [
    0, -1,  0,
    -1, 5, -1,
    0, -1,  0
  ],
  'box_blur': [
    1/9, 1/9, 1/9,
    1/9, 1/9, 1/9,
    1/9, 1/9, 1/9
  ],
  'gaussian_blur': [
    1/16, 2/16, 1/16,
    2/16, 4/16, 2/16,
    1/16, 2/16, 1/16
  ],
  'edge_detect': [
    -1, -1, -1,
    -1, 8, -1,
    -1, -1, -1
  ]
};

ImageFiltersEnvironment.edge_kernels = {
  'sobel_x': [
    1, 0, -1,
    2, 0, -2,
    1, 0, -1
  ],
  'sobel_y': [
    1, 2, 1,
    0, 0, 0,
    -1, -2, -1
  ],
  'prewitt_x': [
    1, 0, -1,
    1, 0, -1,
    1, 0, -1
  ],
  'prewitt_y': [
    1, 1, 1,
    0, 0, 0,
    -1, -1, -1
  ]
};

ImageFilters.tempCanvas = document.createElement('canvas');
ImageFilters.tempContext = ImageFilters.tempCanvas.getContext('2d');

ImageFilters.getPixels = function(image) {
  var canvas;
  var context;

  if (image.getContext) {
    canvas = image;
    try {
      context = canvas.getContext('2d');
    } catch(e) {
      console.log(e);
    }
  }

  if (!context) {
    canvas = this.createCanvas(image.width, image.height);
    context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
  }

  return context.getImageData(0, 0, canvas.width, canvas.height);
};

ImageFilters.createCanvas = function(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

ImageFilters.createImageData = function(width, height) {
  return this.tempContext.createImageData(width, height);
};

ImageFilters.filterImage = function(filter, image, var_args) {
  var args = [this.getPixels(image)];
  for (var i = 2; i < arguments.length; i += 1) {
    args.push(arguments[i]);
  }
  return filter.apply(this, args);
};

ImageFilters.grayscale = function(image_data, args) {
  var dst = image_data.data;

  for (var i = 0; i < dst.length; i += 4) {
    var red = dst[i];
    var green = dst[i + 1];
    var blue = dst[i + 2];

    // CIE luminance <- http://lmgtfy.com/?q=CIE+Luminance
    var luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    dst[i] = dst[i + 1] = dst[i + 2] = luminance;
  }

  return image_data;
};

ImageFilters.threshold = function(image_data, threshold) {
  var dst = image_data.data;
  for (var i = 0; i < dst.length; i += 4) {
    var red = dst[i];
    var green = dst[i + 1];
    var blue = dst[i + 2];
    var value = (0.2126 * red + 0.7152 * green + 0.0722 * blue >= threshold) ? 255 : 0;
    dst[i] = dst[i + 1] = dst[i + 2] = Math.max(0, value)
  }
  return image_data;
};

ImageFilters.brightness = function(image_data, value) {
  var dst = image_data.data;
  for (var i = 0; i < dst.length; i += 4) {
    dst[i] = Math.max(0, dst[i] + value);
    dst[i + 1] = Math.max(0, dst[i + 1] + value);
    dst[i + 2] = Math.max(0, dst[i + 2] + value);
  }

  return image_data;
}

ImageFilters.convolute = function(image_data, kernel, edge_mode) {
  var kernel_size = Math.round(Math.sqrt(kernel.length))  // assumes square
  var half_kernel_size = Math.floor(kernel_size / 2)

  var src = image_data.data;
  var src_width = image_data.width;
  var src_height = image_data.height;

  var width = src_width;
  var height = src_height;
  var output = this.createImageData(width, height);
  var dst = output.data;

  for (var row = 0; row < height; row += 1) {
    for (var col = 0; col < width; col += 1) {
      var dst_offset = (row * width + col) * 4;
      var red = 0, green = 0, blue = 0, alpha = 0;
      for (var kernel_row = 0; kernel_row < kernel_size; kernel_row += 1) {
        for (var kernel_col = 0; kernel_col < kernel_size; kernel_col += 1) {
          var src_row = row + (kernel_row - half_kernel_size);
          var src_col = col + (kernel_col - half_kernel_size);

          if (0 <= src_row && src_row < src_height && 0 <= src_col && src_col < src_width) {
            src_offset = (src_row * src_width + src_col) * 4;
            var weight = kernel[kernel_row * kernel_size + kernel_col]

            red += src[src_offset] * weight;
            green += src[src_offset + 1] * weight;
            blue += src[src_offset + 2] * weight;
            alpha += src[src_offset + 3] * weight;
          } else {  // edge_mode
            if (edge_mode === 'EXTEND') {

            } else if (edge_mode === 'WRAP') {

            } else if (edge_mode === 'MIRROR') {

            } else {}  // Assume CROP mode
          }
        }
      }
      dst[dst_offset] = Math.max(0, red);
      dst[dst_offset + 2] = Math.max(0, blue);
      dst[dst_offset + 1] = Math.max(0, green);
      dst[dst_offset + 3] = 255;  // Ignore alpha channel for now
    }
  }

  return output;
};

$(document).ready(function(){

  // When user selects new image to load
  $('#interactive-image-filters-selected-image').change(function() {
    loadImage();
  });

  // When user changes image size
  $('#interactive-image-filters-image-size').change(function() {
    ImageFiltersEnvironment.scale_factor = $("#interactive-image-filters-image-size").val();
    loadImage();
  });

  if (getUrlParameter('change-kernel-size') === 'true') {
    ImageFiltersEnvironment.mode = 'complex';
  } else {
    ImageFiltersEnvironment.mode = 'simple';
  }

  // If screen is not wide enough for medium sized image,
  // then set display to small images
  if (document.documentElement.clientWidth < ImageFiltersEnvironment.BASE_WIDTH) {
    $("#interactive-image-filters-image-size").val("0.6");
    ImageFiltersEnvironment.scale_factor = 0.6;
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
  var $select = $('#interactive-image-filters-selected-image');
  for (var i = 0; i < ImageFiltersEnvironment.INITIAL_IMAGES.length; i += 1) {
    var file = 'img/' + ImageFiltersEnvironment.INITIAL_IMAGES[i][0];
    var text = ImageFiltersEnvironment.INITIAL_IMAGES[i][1];
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
    $('#interactive-image-filters-selected-image').append($('<option>').text(filename).data('file', file).attr('selected', true));
    loadImage();
};

function addCanvas(id, subtitle_text) {
  var $canvas = $('<canvas id="' + id + '" class="interactive-image-filters-canvas"></canvas>');
  $canvas.prop({width: ImageFiltersEnvironment.BASE_WIDTH * ImageFiltersEnvironment.scale_factor,
                height: ImageFiltersEnvironment.BASE_HEIGHT * ImageFiltersEnvironment.scale_factor});

  var $canvas_container = $('<div class="interactive-image-filters-canvas-container z-depth-1"></div>');
  $canvas_container.append($canvas);

  if (subtitle_text) {
    $canvas_container.append('<p class="interactive-image-filters-canvas-subtitle">' + subtitle_text + '</p>');
  }

  return $canvas_container;
};


// Setup interface for current mode
function setupMode() {
  var $canvas_parent_container = $('#interactive-image-filters-canvas-parent-container');
  $canvas_parent_container.empty();

  // If running in simple mode
  if (ImageFiltersEnvironment.mode === 'simple') {
    var subtitle_text = "Simple Mode";
    $canvas_container = addCanvas("interactive-image-filters-simple-canvas", subtitle_text);
    $canvas_parent_container.append($canvas_container);
  }
};


// Load and draw image for Canvas reference
function loadImage() {
  var source_canvas = document.getElementById('interactive-image-filters-source-canvas');
  source_canvas.width = ImageFiltersEnvironment.BASE_WIDTH * ImageFiltersEnvironment.scale_factor;
  source_canvas.height = ImageFiltersEnvironment.BASE_HEIGHT * ImageFiltersEnvironment.scale_factor;
  var source_canvas_context = source_canvas.getContext('2d');

  var image = new Image();
  image.addEventListener('error', function (e){e.preventDefault(); alert("Starting image cannot be loaded when viewing file locally. Try another browser or the online version.");},false);
  image.onload = function() {
      $selected_image.data('data', image);
      source_canvas_context.drawImage(image, 0, 0, source_canvas.width, source_canvas.height);
      // Update canvases from base image
      drawCanvases();
  }
  $selected_image = $("#interactive-image-filters-selected-image option:selected");
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
  var source_canvas = document.getElementById('interactive-image-filters-source-canvas');
  var source_canvas_context = source_canvas.getContext('2d');
  var source_image_data = source_canvas_context.getImageData(0,
                                                             0,
                                                             ImageFiltersEnvironment.BASE_WIDTH * ImageFiltersEnvironment.scale_factor,
                                                             ImageFiltersEnvironment.BASE_HEIGHT * ImageFiltersEnvironment.scale_factor);
  return source_image_data;
};


// Draw the image data to a canvas using the canvas max bit values
function drawCanvas($canvas, source_image_data) {
  var width = ImageFiltersEnvironment.BASE_WIDTH * ImageFiltersEnvironment.scale_factor;
  var height = ImageFiltersEnvironment.BASE_HEIGHT * ImageFiltersEnvironment.scale_factor;
  $canvas.attr('width', width + 'px');
  $canvas.attr('height', height + 'px');

  canvas_context = $canvas[0].getContext('2d');
  canvas_data = source_image_data;

  canvas_context.putImageData(canvas_data, 0, 0, 0, 0, source_image_data.width, source_image_data.height);
};

function runFilter(id, filter, var_args) {
  var args = [];
  for (var i = 2; i < arguments.length; i += 1) {
    args.push(arguments[i])
  }
  var idata = Filters.filterImage.apply(null, args);

  var canvas = $('#' + id);
  canvas.width = idata.width;
  canvas.height = idata.height;
  var context = canvas.getContext('2d');
  context.putImageData(idata, 0, 0)
}

// Draw all canvases with source data
function drawCanvases() {
  var source_image_data = initialCanvasData();
  $('#interactive-image-filters-canvas-parent-container canvas').each(function () {
    drawCanvas($(this), source_image_data)
  });
};

function resetCanvases() {

}

function apply(filter, var_args) {
  // runFilter('grayscale', ImageFilters.grayscale);
  // runFilter('blurC', ImageFilters.convolute, ImageFiltersEnvironment.kernel);
  generic_args = [];
  for (var i = 1; i < arguments.length; i += 1) {
    generic_args.push(arguments[i]);
  }

  $('#interactive-image-filters-canvas-parent-container canvas').each(function () {
    var image = $(this)[0];
    var args = [filter, image].concat(generic_args);

    var output = ImageFilters.filterImage.apply(ImageFilters, args);
    drawCanvas($(this), output);
  });
}

function apply_grayscale() {
  apply(ImageFilters.grayscale);
}

function apply_threshold() {
  var $slider = $('#interactive-image-filters-threshold-slider')[0];
  var threshold = $slider.value;
  apply(ImageFilters.threshold, threshold);
}

function apply_brightness() {
  var $slider = $('#interactive-image-filters-brightness-slider')[0];
  var value = parseInt($slider.value);
  apply(ImageFilters.brightness, value);
}

function apply_simple_kernel() {
  var $selector = $('#interactive-image-filters-simple-kernel-selector')[0];
  var kernel_name = $selector.value;
  var kernel = ImageFiltersEnvironment.simple_kernels[kernel_name];
  apply(ImageFilters.convolute, kernel);
}

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
