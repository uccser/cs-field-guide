// Image Filters Interactive JS
// Author: Hayden Jackson
'use strict';
$(function () {
  var ImageFilters = {};

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
    var kernel_size = Math.round(Math.sqrt(kernel.length));  // assumes square
    var half_kernel_size = Math.floor(kernel_size / 2);

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
});
