// Image Filters Interactive JS
// Author: Hayden Jackson
'use strict';
$(function () {
  document.onselectstart = function () {
    return false;
  };

  document.body.addEventListener("dragover", function(e){e.preventDefault();}, true);
  document.body.addEventListener("drop", function(e){
      e.preventDefault();
      loadDroppedImage(e.dataTransfer.files[0]);
  }, true);

  var ImageFilterConfiguration {
    BASE_WIDTH: 450,
    BASE_HEIGHT: 300,
    INITIAL_IMAGES: [
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
    ],
    SIMPLE_KERNELS: {
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
    }
  };

  var ImageFilterSetting {
    mode: getUrlParameter("mode") || "simple"
  };

  class ImageFiltersEnvironment {

    constructor () {
      this.scale_factor = 1;
      if (document.documentElement.clientWidth < ImageFiltersEnvironment.BASE_WIDTH) {
        $("#interactive-image-filters-image-size").val("0.6");
        this.scale_factor = 0.6;
      }

      this.current_control = $('#interactive-image-filters-grayscale-controls');
      this.current_control_paragraph = $('#interactive-image-filters-grayscale-paragraph');

      this.source_canvas = document.getElementById('interactive-image-filters-source-canvas');
      this.source_canvas_context = this.source_canvas.getContext('2d');

      this.loadInitialImages();
      this.setupMode();
      this.loadImage();
    };

    updateScaleFactor(scale_factor) {
      this.scale_factor = scale_factor;
      this.loadImage();
    };

    // Control logic
    setupMode() {
      var $canvas_parent_container = $('#interactive-image-filters-canvas-parent-container');
      $canvas_parent_container.empty();

      // If running in simple mode
      if (ImageFiltersEnvironment.mode === 'simple') {
        $canvas_container = addCanvas("interactive-image-filters-simple-canvas");
        $canvas_parent_container.append($canvas_container);
        updateSimpleKernelTable();
      }
    };

    // Canvas logic
    addCanvas(id, subtitle_text) {
      var $canvas = $('<canvas id="' + id + '" class="interactive-image-filters-canvas"></canvas>');
      $canvas.prop({width: ImageFilterConfiguration.BASE_WIDTH * this.scale_factor,
                    height: ImageFilterConfiguration.BASE_HEIGHT * this.scale_factor});

      var $canvas_container = $('<div class="interactive-image-filters-canvas-container z-depth-1"></div>');
      $canvas_container.append($canvas);

      if (subtitle_text) {
        $canvas_container.append('<p class="interactive-image-filters-canvas-subtitle">' + subtitle_text + '</p>');
      }

      return $canvas_container;
    };

    // Image methods
    loadInitialImages() {
      var $select = $('#interactive-image-filters-selected-image');
      for (var i = 0; i < ImageFilterConfiguration.INITIAL_IMAGES.length; i += 1) {
        var file = 'img/' + ImageFilterConfiguration.INITIAL_IMAGES[i][0];
        var text = ImageFilterConfiguration.INITIAL_IMAGES[i][1];
        $select.append($('<option>').text(text).data('file', file));
      }
    };

    function loadUserImage(filename, file) {
      $('#interactive-image-filters-selected-image').append($('<option>').text(filename).data('file', file).attr('selected', true));
      this.loadImage();
    };

    function loadImage() {
      this.source_canvas.width = ImageFilterConfiguration.BASE_WIDTH * this.scale_factor;
      this.source_canvas.height = ImageFilterConfiguration.BASE_HEIGHT * this.scale_factor;

      var image = new Image();
      image.addEventListener('error', function (e){e.preventDefault(); alert("Starting image cannot be loaded when viewing file locally. Try another browser or the online version.");},false);
      image.onload = function() {
          $selected_image.data('data', image);
          source_canvas_context.drawImage(image, 0, 0, source_canvas.width, source_canvas.height);
          // Update canvases from base image
          this.drawCanvases();
      }
      $selected_image = $("#interactive-image-filters-selected-image option:selected");
      if ($selected_image.data('data')) {
        source_canvas_context.drawImage($selected_image.data('data'), 0, 0, source_canvas.width, source_canvas.height);
        // Update canvases from base image
        this.drawCanvases();
      } else {
        image.src = $selected_image.data('file');
      }
    };

    // Filtering methods
    apply(filter, var_args) {
      generic_args = [];
      for (var i = 1; i < arguments.length; i += 1) {
        generic_args.push(arguments[i]);
      }

      $('#interactive-image-filters-canvas-parent-container canvas').each(function () {
        var image = $(this)[0];
        var args = [filter, image].concat(generic_args);

        var output = ImageFilters.filterImage.apply(ImageFilters, args);
        environment.drawCanvas($(this), output);
      });
    };

    reset() {
      // recover from hidden canvases
    };
  };
  // Global Variables
  var environment = new ImageFiltersEnvironment();

  // UI Hookups
  $('#interactive-image-filters-selected-image').change(function() {
    loadImage();
  });

  $('#interactive-image-filters-image-size').change(function() {
    environment.updateScaleFactor($("#interactive-image-filters-image-size").val());
  });

  $("#interactive-image-filters-simple-kernel-selector").change(function () {
    var $table = $('#interactive-image-filters-simple-kernel-table');
    var $selector = $('#interactive-image-filters-simple-kernel-selector')[0];
    var kernel_name = $selector.value;
    var kernel = ImageFilterConfiguration.SIMPLE_KERNELS[kernel_name];
    showKernel($table, kernel);
  });

  $("#interactive-image-filters-mode-select-control").change(function () {
    // Change control mode
  });

  $("#interactive-image-filters-grayscale-apply-button").click(function () {
    environment.apply(ImageFilters.grayscale);
  });

  $("#interactive-image-filters-threshold-apply-button").click(function () {
    var $slider = $('#interactive-image-filters-threshold-slider')[0];
    var threshold = $slider.value;
    environment.apply(ImageFilters.threshold, threshold);
  });

  $("#interactive-image-filters-brightness-apply-button").click(function () {
    var $slider = $('#interactive-image-filters-brightness-slider')[0];
    var value = parseInt($slider.value);
    environment.apply(ImageFilters.brightness, value);
  });

  $("#interactive-image-filters-simple-kernel-apply-button").click(function () {
    var $selector = $('#interactive-image-filters-simple-kernel-selector')[0];
    var kernel_name = $selector.value;
    var kernel = ImageFiltersEnvironment.simple_kernels[kernel_name];
    environment.apply(ImageFilters.convolute, kernel);
  });

  // Auxilary Functions
  function showKernel($table, kernel) {
    $table.empty();

    var kernel_size = Math.round(Math.sqrt(kernel.length));  // assumes square
    var half_kernel_size = Math.floor(kernel_size / 2);

    for (var row = 0; row < kernel_size; row += 1) {
      $tr = $('<tr>')
              .addClass('interactive-image-filters-kernel-table');
      $table.append($tr);
      for (var col = 0; col < kernel_size; col += 1) {
        var index = (row * kernel_size + col);
        $td = $('<td>')
                .addClass('interactive-image-filters-kernel-table')
                .text(kernel[index].toFixed(4));
        $tr.append($td);
      }
    }
  }

  function loadImageDialog(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (data) {
              environment.loadUserImage(input.files[0].name, data.target.result);
          }
          reader.readAsDataURL(input.files[0]);
      }
  };

  function loadDroppedImage(file){
      //	Prevent any non-image file type from being read.
      if(!file.type.match(/image.*/)){
          alert("The dropped file is not an image! File provided was " + file.type);
      } else {
        var reader = new FileReader();
        reader.onload = function (data) {
            environment.loadUserImage(file.name, data.target.result);
        };
        reader.readAsDataURL(file);
      }
  };
});

// ImageFiltersEnvironment.edge_kernels = {
//   'sobel_x': [
//     1, 0, -1,
//     2, 0, -2,
//     1, 0, -1
//   ],
//   'sobel_y': [
//     1, 2, 1,
//     0, 0, 0,
//     -1, -2, -1
//   ],
//   'prewitt_x': [
//     1, 0, -1,
//     1, 0, -1,
//     1, 0, -1
//   ],
//   'prewitt_y': [
//     1, 1, 1,
//     0, 0, 0,
//     -1, -1, -1
//   ]
// };

// Add initial images to select element



// Load image that has been dragged and dropped onto page



// Load image that has been uploaded by upload button



// Load user image and set as inital image




// Setup interface for current mode


function changeControlMode() {
  var $selector = $('#interactive-image-filters-mode-select-control');
  var control_name = $selector[0].value;

  if (ImageFiltersEnvironment.current_control !== null) {
    ImageFiltersEnvironment.current_control[0].style.display = 'none';
    ImageFiltersEnvironment.current_control_paragraph[0].style.display = 'none';
  }

  var $div = null;
  var $p = null;
  if (control_name === 'grayscale') {
    $div = $('#interactive-image-filters-grayscale-controls');
    $p = $('#interactive-image-filters-grayscale-paragraph');
  } else if (control_name === 'threshold') {
    $div = $('#interactive-image-filters-threshold-controls');
    $p = $('#interactive-image-filters-threshold-paragraph');
  } else if (control_name === 'brightness') {
    $div = $('#interactive-image-filters-brightness-controls');
    $p = $('#interactive-image-filters-brightness-paragraph');
  } else if (control_name === 'simple_kernels') {
    $div = $('#interactive-image-filters-simple-kernel-controls');
    $p = $('#interactive-image-filters-simple-kernel-paragraph');
  } else {
    throw 'Unknown control mode.'
  }

  $div[0].style.display = 'block';
  $p[0].style.display = 'block';
  ImageFiltersEnvironment.current_control = $div;
  ImageFiltersEnvironment.current_control_paragraph = $p;
}

// Load and draw image for Canvas reference


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

// Draw all canvases with source data
function drawCanvases() {
  var source_image_data = initialCanvasData();
  $('#interactive-image-filters-canvas-parent-container canvas').each(function () {
    drawCanvas($(this), source_image_data);
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
