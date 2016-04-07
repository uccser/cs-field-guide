// Settings and intialize layout
this.MAX_HEIGHT = 133;
this.CELL_SIZE = 50;

this.MAX_NOISE = 15;

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
this.filter = null;
this.salt = null;
this.convo_k = Array(); // Convolutional Kernel for Gaussian blurring

this.tiling = new Tiling;

$( document ).ready(function() {
	if (getUrlParameter('mode') == 'threshold') {
    	mode = 'threshold';
    }if (getUrlParameter('mode') == 'thresholdgreyscale') {
    	mode = 'thresholdgreyscale';
    }if (getUrlParameter('mode') == 'blur') {
    	mode = 'blur';
    }
 	setUpMode();
  $( "#pixel-viewer-interactive-original-image" ).delay(1000).animate({width: contentWidth*0.8,
     height: contentHeight*0.8,
     overflow: "hidden",
     top:"0",
     left:"0",
     margin: 0},
     4000,
     function() {
      // Animation complete
      $( "#pixel-viewer-interactive-loader" ).hide();
      $( ".pixel-viewer-interactive-zoom-button" ).css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow');
  });
  $( "#pixel-viewer-interactive-original-image" ).fadeOut( 2000 );
  reflow();
});

function setUpMode(){
	if (mode == 'threshold'){
		$("#pixel-viewer-extra-feature-description").text(
			"Create an expression to threshold the image. Any pixels that match the\
		 expression you come up with will be turned white, and everything else will become black. What happens \
		 when you threshold on different values or for different colours? Can you use this technique to identify \
		 regions of similar colour in the image?");
		new Thresholder($('#pixel-viewer-image-manipulator'));
	}
	if (mode == 'thresholdgreyscale'){
		$("#pixel-viewer-extra-feature-description").text(
			"The image has been converted to greyscale by taking the average of the red, blue and green values for\
			each pixel. Choose a threshold between 0 and 255 and transform this picture into black and white to \
			identify regions and edges.");
		filter = greyscaler;
		new GreyscaleThresholder($('#pixel-viewer-image-manipulator'));
	}
	if (mode == 'blur'){
		$("#pixel-viewer-extra-feature-description").text(
			"Experiment with using different blurs to try process the noise. The mean blur will take the mean values of the pixels surrounding,\
			the median will take the median value, the gaussian blurs according to a gaussian distribution, and the custom blur allows you to give weights to different surrounding pixels.\
			How do the different types of blur effect the image? What happens when you change values in the custom grid? Experiment with both greyscale and rgb images.	\
			What would happen if every value in the grid was 0 except one? How come?");
		new Blur($('#pixel-viewer-image-manipulator'));
	}
}

function greyscaler(col, row){
	var pixelData = salter(col, row);
	var sum = pixelData[0] + pixelData[1] + pixelData[2];
	var avg = Math.round(sum / 3);
	return [avg, avg, avg];
}

function sanitiseValues(){
	$(".int_selector")
		.filter(function(index) {return this.value == "";}).val(0);
	$(".int_selector").val(function(index, value) {return Math.round(value)});
}

function truncateValues(){
	$(".color_selector")
		.filter(function(index) {return this.value > 255;}).val(255);
	$(".int_selector")
		.filter(function(index) {return this.value < 0;}).val(0);
	$(".percent_selector")
		.filter(function(index) {return this.value > MAX_NOISE;}).val(MAX_NOISE);
}

function toggleGreyscale(){
	if ($("#greyscale-or-rgb").val() == "greyscale"){
		if (filter == null || filter == salter){
			filter = greyscaler;
		}
	}
	else{
		if (filter == greyscaler){
			filter = salter
		}
	}
	scroller.scrollBy(0,0);
}

function Blur(parent_element){
	this.main_div = $("<div></div>");
	this.main_div.attr("id", "pixel-viewer-blur").appendTo($(parent_element));
	
	this.main_div.append(
		$(document.createElement("label"))
		.text("Greyscale or rgb")
		.append(
			$(document.createElement("select"))
			.attr("id", "greyscale-or-rgb")
			.append($("<option value=greyscale>greyscale</option>"))
			.append($("<option value=rgb>rgb</option>"))
			.on("input", toggleGreyscale)
		)
	);
	toggleGreyscale()
	
	this.main_div.append(
		$(document.createElement("label"))
		.text("Type of blur")
		.append(
			$(document.createElement("select"))
			.attr("id", "blur-type")
			.append($("<option value=median>median</option>"))
			.append($("<option value=mean>mean</option>"))
			.append($("<option value=gaussian>gaussian</option>"))
			.append($("<option value=custom>custom</option>"))
			.on("input", createGrid)
		)
	);
	
	this.main_div.append(
		$(document.createElement("label"))
		.text("Grid size")
		.append(
			$(document.createElement("select"))
			.attr("id", "grid-size")
			.on("input", createGrid)
			.append($("<option value=3>3x3</option>"))
			.append($("<option value=4>4x4</option>"))
			.append($("<option value=5>5x5</option>"))
			.append($("<option value=6>6x6</option>"))
			.append($("<option value=7>7x7</option>"))
		)
	);
	this.main_div.append(
		$(document.createElement("div"))
		.attr("id", "blur-grid")
	);
	createGrid();
	this.main_div.append(
		$(document.createElement("button")).text("Apply blur")
		.click(applyBlur));
		
	this.main_div
		.append(
		$(document.createElement("button")).text("Remove blur")
		.click(removeFilters)
	);
	this.main_div.append($(document.createElement("p")).text("Sometimes images have noise, and applying a blur can be a helpful way to preprocess\
	an image that contains noise before using other Computer Vision algorithms. Use this to add some \"salt and pepper\" noise to the image and then\
	observe what happens when you apply the blurs to a noisy image."))
	.append($("<label></label>").text("Amount of noise to add (%): ")
		.append($(document.createElement("input"))
			.attr({"type": "number", "value": 10, "id" : "noise_selector", "class" : "percent_selector int_selector"})
			.on("input", truncateValues)
			.on("blur", sanitiseValues))
		).append(
		$(document.createElement("button")).text("Add noise")
		.click(addNoise)
	).append(
		$(document.createElement("button")).text("Remove noise")
		.click(removeSalt)
	);
	this.main_div.append($("<p></p>").text("Can you use the custom grid to find edges? What would happen if you used negative values for some weights?"))
}

function createGrid(){
	$("#blur-grid").empty();
	if ($("#blur-type").val() != "custom"){
		return;
	}
	var gridSize = $("#grid-size").val();
	$("#blur-grid").append($(document.createElement("table")).attr("id", "grid_table"));
	for (var i = 0; i < gridSize; i++){
		$("#grid_table").append($(document.createElement("tr")).attr("id", "grid_table_row_" + i));
		for (var j = 0; j < gridSize; j++){
			$("#grid_table_row_" + i).append(
				$(document.createElement("td"))
				.append(
					$(document.createElement("input"))
					.attr({
						"id":"grid_val_" + i + "_" + j,
						"class":"int_selector blur_selector",
						"value":1,
						"type":"number"}
						)
					.on("blur", sanitiseValues)
				)
			);
		};
	};
	$("#blur-grid").append(
		$(document.createElement("label")).text("Use absolute value of result: ").append(
			$(document.createElement("input")).attr({"id":"use_abs_val","type":"checkbox"})));
}

function applyBlur(){
	filter = function(col, row){
		var blur_type = $("#blur-type").val();	
		var gridSize = $("#grid-size").val();
		var shift = Math.floor(gridSize / 2);
		var vals = Array();
		var greyscale = ($("#greyscale-or-rgb").val() == "greyscale")
		for (var i = 0; i < gridSize; i++){
			var next_col = col + i - shift;
			if (next_col < 0 || next_col > contentWidth){
				continue;
			}
			else{
				for (var j = 0; j < gridSize; j++){
					var next_row = row + j - shift;
					if (next_row < 0 || next_row > contentHeight){
						continue;
					}
					if (greyscale){
						pixelData = greyscaler(next_col, next_row)
					}
					else if (salt && salt[next_col][next_row] != false){
						pixelData = [salt[next_col][next_row], salt[next_col][next_row], salt[next_col][next_row]];
					}
					else{
						pixelData = source_canvas.getContext('2d').getImageData(next_col, next_row, 1, 1).data;
					}
					if (blur_type == "custom"){
					vals.push(pixelData.map(function(x){
						return x * $("#grid_val_" + j + "_" + i).val();
						}));
					}
					else{
						vals.push(pixelData);
					}
				}
			}
		}
		if (blur_type == "gaussian"){
			// This isn't quite right at the edges of the picture, but it should be close
			// For red, green and blue
			response = Array()
			
			// Create convolutional kernel if it hasn't already been created at this size
			if (convo_k.length != gridSize * gridSize){
				convo_k = Array();
				for (var x = 0 - shift; x < gridSize - shift; x++){
					for (var y = 0 - shift; y < gridSize - shift; y++){
						convo_k.push(1/2*Math.PI*Math.pow(Math.E, -(x*x + y*y)/2))
					}
				}
				convo_k.totalWeight = convo_k.reduce(function(prev, curr, currI, arr){
				return prev + curr;
				})
			}
			
			for (var i = 0; i < vals[0].length; i++){
				next_list = vals.map(function(val){return val[i];});
				result = next_list.reduce(function(prev, curr, currI, arr) {
					return prev + curr * convo_k[currI];
				});
				response.push(Math.floor(result/convo_k.totalWeight));
			}
			return response;
		}
		if (blur_type == "custom"){
			var totalWeight = 0
			$(".blur_selector").each(function() {
				totalWeight += Math.abs(parseInt(this.value));
			})
			if (totalWeight == 0) totalWeight = 1;
			var sums = vals.reduce(function(prev, curr, currI, arr) {
				var sum = Array()
				for (var i = 0; i < curr.length; i++){
					sum.push(prev[i] + curr[i]);
				}
				return sum;
				});
			return sums.map(function(x){var val = Math.floor(x / totalWeight); return $("#use_abs_val").is(":checked()") ? Math.abs(val) : val})
		}
		if (blur_type == "mean"){
			var sums = vals.reduce(function(prev, curr, currI, arr) {
				var sum = Array()
				for (var i = 0; i < curr.length; i++){
					sum.push(prev[i] + curr[i]);
				}
				return sum;
				});
			return sums.map(function(x){return Math.floor(x / vals.length)})
		}
		if (blur_type == "median"){
			medians = Array();
			// Get median for r, g and b values
			for (var i = 0; i < vals[0].length; i++){
				next_list = vals.map(function(val){return val[i];});
				next_list = next_list.sort();
				medians.push(next_list[Math.floor(vals.length / 2)]);
			}
			return medians;
		}
	}
	scroller.scrollBy(0,0);
}

function Thresholder(parent_element){
	this.main_div = $("<div></div>");
	this.main_div.attr("id", "pixel-viewer-thresholder").appendTo($(parent_element));
	vals = ["R", "G", "B"];
	for (val in vals){
		this.main_div.append($("<label></label>").text(vals[val])
		.append($("<select></select>")
			.attr("id", vals[val] + "_lt_or_gt")
			.append($("<option value='<'>\<</option>"))
			.append($("<option value='>'>\></option>")))
		.append($(document.createElement("input"))
			.attr({"type": "number", "value": 0, "id" : vals[val] + "_selector", "class" : "color_selector int_selector"})
			.on("input", truncateValues)
			.on("blur", sanitiseValues))
		);
		if (vals.length - 1 > val){
			this.main_div.append($("<select></select>")
			.attr("id", "operator_" + val)
			.append($("<option value='||'>OR</option>"))
			.append($("<option value='&&'>AND</option>")));
		}
	}
	this.main_div.append($(document.createElement("button")).text("Apply Threshold").click(applyThreshold));
	this.main_div.append($(document.createElement("button")).text("Remove Threshold").click(removeFilters));
}

function GreyscaleThresholder(parent_element){
	this.main_div = $("<div></div>");
	this.main_div.attr("id", "pixel-viewer-thresholder").appendTo($(parent_element));
	this.main_div.append($("<label></label>").text("Threshold: ")
		.append($(document.createElement("input"))
			.attr({"type": "number", "value": 127, "id" : "threshold_selector", "class" : "color_selector int_selector"})
			.on("input", truncateValues)
			.on("blur", sanitiseValues))
		);
	this.main_div.append($(document.createElement("button")).text("Apply Threshold").click(applyGreyThreshold));
	this.main_div.append($(document.createElement("button")).text("Remove Threshold").click(removeGreyThreshold));
}

function addNoise(){
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
	scroller.scrollBy(0,0);
}

function salter(col, row){
	if (salt != null && salt[col][row] != false){
		var val = salt[col][row];
		return [val,val,val];
	}
	else{
		return source_canvas.getContext('2d').getImageData(col, row, 1, 1).data;
	}
}

function removeSalt(){
	salt = null;
	scroller.scrollBy(0,0);
}

function removeFilters(){
	if ($("#greyscale-or-rgb").val() == "greyscale"){
		filter = greyscaler;
	}
	else {
		filter = salter;
	}
	scroller.scrollBy(0,0);
}

function applyGreyThreshold(){
	var threshold = $("#threshold_selector").val();
	filter = function(col, row){
		var pixelData = source_canvas.getContext('2d').getImageData(col, row, 1, 1).data;
		var sum = pixelData[0] + pixelData[1] + pixelData[3];
		var avg = sum / 3;
		if (avg > threshold)
			return [255, 255, 255];
		else{
			return [0,0,0]
		}
	}
	scroller.scrollBy(0,0);
}

function removeGreyThreshold(){
	filter = greyscaler;
	scroller.scrollBy(0,0);
}

function applyThreshold(){
	var r_lt_or_gt = $("#R_lt_or_gt").val();
	var r_val = $("#R_selector").val();
	var g_lt_or_gt = $("#G_lt_or_gt").val();
	var g_val = $("#G_selector").val();
	var b_lt_or_gt = $("#B_lt_or_gt").val();
	var b_val = $("#B_selector").val();
	
	var operator_0 = $("#operator_0").val();
	var operator_1 = $("#operator_1").val();
	
	filter = function(col, row){
		var pixelData = source_canvas.getContext('2d').getImageData(col, row, 1, 1).data;
		var expr = [pixelData[0], r_lt_or_gt, r_val, operator_0, pixelData[1], g_lt_or_gt, g_val, operator_1, pixelData[2], b_lt_or_gt, b_val]
		.join(" ");
		if (eval(expr)){
			return ([255, 255, 255]);
		}
		else {
			return ([0, 0, 0]);
		};
	};
	scroller.scrollBy(0, 0);
}

function loadImage(src){
    //	Prevent any non-image file type from being read.
    if(!src.type.match(/image.*/)){
        console.log("The dropped file is not an image: ", src.type);
        return;
    }
	// Remove any noise added
	salt = null
	
    //	Create our FileReader and run the results through the render function.
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
    $( "#pixel-viewer-interactive-settings" ).slideToggle( "slow" );
});


function load_resize_image(src){
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
        ctx.drawImage(image, 0, 0, image.width, image.height);
        canvas.style.display = "inline-block";
        scroller.scrollTo(0,0);
        $( '#pixel-viewer-interactive-resize-values' ).text("Your image has been resized for this interactive to " + image.width + " pixels wide and " + image.height + " pixels high.")
    };
    image.src = src;
}

var target = document.body;
target.addEventListener("dragover", function(e){e.preventDefault();}, true);
target.addEventListener("drop", function(e){
    e.preventDefault();
    loadImage(e.dataTransfer.files[0]);
}, true);


// Load and draw image for Canvas reference
var source_canvas = document.getElementById('pixel-viewer-interactive-source-canvas');
var source_canvas_context = source_canvas.getContext('2d');

var source_image = new Image();
source_image.crossOrigin = '';
source_image.addEventListener('error', function (e){e.preventDefault(); alert("Starting image cannot be loaded in Chrome offline mode. Try another browser or the online version.");},false);

source_image.onload = function() {
    source_canvas_context.drawImage(source_image, 0, 0);
    //Trigger canvas draw after image load
    scroller.scrollTo(0,0);
}

source_image.src = './img/coloured-roof-small.png';

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
    locking: true,
    paging: false,
    snapping: true,
    minZoom: 0.001,
    maxZoom: 4
});

// Cell Paint Logic
var paint = function(row, col, left, top, width, height, zoom) {
    // Get data for pixel
    var pixelData;
    if (null != filter){
    	pixelData = filter(col, row);
    } 
    else {
    	pixelData = source_canvas.getContext('2d').getImageData(col, row, 1, 1).data;
    }
    context.fillStyle = 'rgb('+pixelData[0]+','+pixelData[1]+','+pixelData[2]+')';
    context.fillRect(Math.round(left), Math.round(top), Math.round(width)+1, Math.round(height)+1);

    // If text opacity is greater than 0, then display RGB values
    if(text_opacity > 0) {
        context.font = (14 * zoom).toFixed(2) + 'px Consolas, Courier New, monospace';
        var cell_lightness = ((pixelData[0] / 255) + (pixelData[1] / 255) + (pixelData[2] / 255)) / 3;
        if(cell_lightness >= 0.85) {
            context.fillStyle = "rgba(110, 110, 110, " + text_opacity + ")";
        } else {
            context.fillStyle = "rgba(255, 255, 255, " + text_opacity + ")";
        }

        // Pretty primitive text positioning :)
        var cell_lines = cell_text.split('\n');

        for (var i = 0; i < cell_lines.length; i++)
            context.fillText(cell_lines[i] + pixelData[i], left + (6 * zoom), top + (14 * zoom) + (i * cell_line_height * zoom) );
    }
};

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

window.addEventListener("resize", reflow, false);

document.querySelector("#pixel-viewer-interactive-zoom-in").addEventListener("click", function() {
    scroller.zoomBy(1.2, true);
}, false);

document.querySelector("#pixel-viewer-interactive-zoom-out").addEventListener("click", function() {
    scroller.zoomBy(0.8, true);
}, false);

if ('ontouchstart' in window) {

    container.addEventListener("touchstart", function(e) {
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

    container.addEventListener("mousedown", function(e) {
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

    container.addEventListener(navigator.userAgent.indexOf("Firefox") > -1 ? "DOMMouseScroll" :  "mousewheel", function(e) {
        scroller.doMouseZoom(e.detail ? (e.detail * -120) : e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
    }, false);

}

// From http://jsfiddle.net/derickbailey/5L7cLp96/

function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
 
  var stdDev = Math.sqrt(average(squareDiffs));
  return stdDev;
}
 
function average(data){
  return data.reduce(function(sum, value){
    return sum + value;
  }, 0) / data.length;
}

function randomInt(max){
	return Math.floor(Math.random() * max);
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
