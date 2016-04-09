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
this.gaussian_kernel = Array(); // Convolutional Kernel for Gaussian blurring

this.tiling = new Tiling;

$( document ).ready(function() {
	if (getUrlParameter('mode') == 'threshold') {
    	mode = 'threshold';
    }if (getUrlParameter('mode') == 'thresholdgreyscale') {
    	mode = 'thresholdgreyscale';
    }if (getUrlParameter('mode') == 'blur') {
    	mode = 'blur';
    }
	if (getUrlParameter('mode') == 'edgedetection') {
    	mode = 'edgedetection';
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
		$("#pixel-viewer-extra-feature-description").html(
			"Experiment with using different blurs to try process the noise. The mean blur will take the mean values of the pixels surrounding,\
			the median will take the median value, the gaussian blurs according to a gaussian distribution, and the custom blur allows you to give weights to different surrounding pixels.\
			How do the different types of blur effect the image? What happens when you change values in the custom grid? Experiment with both greyscale and rgb images.	\
			What would happen if every value in the grid was 0 except one? How come? <br><br> If you find that the scroll and zoom are slow with a blur applied, try removing the blur, zooming or scrolling and \
			then reapplying the blur.");
		new Blur($('#pixel-viewer-image-manipulator'));
	}
	if (mode == 'edgedetection'){
		$("#pixel-viewer-extra-feature-description").html(
			"Find an edge in the graph and zoom right in. What information could a computer use from the values of the pixels surrounding the edge to find it?");
		new EdgeDetector($('#pixel-viewer-image-manipulator'));
	}
}

function greyScaleToggler(){
	return $(document.createElement("label"))
		.text("Greyscale or rgb")
		.append(
			$(document.createElement("select"))
			.attr("id", "greyscale-or-rgb")
			.append($("<option value=greyscale>greyscale</option>"))
			.append($("<option value=rgb>rgb</option>"))
			.on("input", toggleGreyscale)
		)
}

function gridSizeChooser(callback){
	return $(document.createElement("label"))
		.text("Grid size")
		.append(
			$(document.createElement("select"))
			.attr("id", "grid-size")
			.on("input", callback)
			.append($("<option value=3>3x3</option>"))
			//.append($("<option value=4>4x4</option>"))
			.append($("<option value=5>5x5</option>"))
			//.append($("<option value=6>6x6</option>"))
			.append($("<option value=7>7x7</option>"))
		)
	}

function EdgeDetector(parent_element){
	this.main_div = $("<div></div>");
	this.main_div.attr("id", "pixel-viewer-edge-detector").appendTo($(parent_element));
	
	this.main_div.append(
		greyScaleToggler()
	);
	toggleGreyscale()
	
	this.main_div.append(
		$(document.createElement("label"))
		.text("Number of grids")
		.append(
			$(document.createElement("select"))
			.attr("id", "num-grids")
			.on("input", createGrids)
			.append($("<option value=1>1</option>"))
			.append($("<option value=2>2</option>"))
			.append($("<option value=3>3</option>"))
			.append($("<option value=4>4</option>"))
		)
	);
	
	this.main_div.append(
		gridSizeChooser(createGrids)
	);
	
	this.main_div.append($(document.createElement("div")).attr("id","grids-div"));
	
	createGrids();
	
	this.main_div
		.append(
			$(document.createElement("button")).text("Apply grids")
			.click(edgeDetect)
	);
	this.main_div
		.append(
		$(document.createElement("button")).text("Restore Image")
		.click(removeFilters)
	);
	
	this.main_div.append($("<p></p>").text(
		"Try adding a threshold to the picture once the transformation has taken place to highlight the edges you find."));
	
	this.main_div.append($("<label></label>").text("Threshold: ")
		.append($(document.createElement("input"))
			.attr({"type": "number", "value": 20, "id" : "threshold_selector", "class" : "color_selector int_selector"})
			.on("input", truncateValues)
			.on("blur", sanitiseValues))
		)
	.append($(document.createElement("button")).text("Apply grids and Threshold").click(applyGreyThreshold))
}

function edgeDetectionFilter(col, row){
	var gridSize = $("#grid-size").val();
	var greyscale = ($("#greyscale-or-rgb").val() == "greyscale");
	surroundingPixels = getSurroundingPixels(col, row, gridSize, greyscale, true);
	return applyCustomConvolutionalKernels(surroundingPixels, gridSize)
}

function edgeDetect(){
	filter = edgeDetectionFilter;
	refreshImage();
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
	refreshImage();
}

function Blur(parent_element){
	this.main_div = $("<div></div>");
	this.main_div.attr("id", "pixel-viewer-blur").appendTo($(parent_element));
	
	this.main_div.append(
		greyScaleToggler()
	);
	toggleGreyscale()
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

function constructGrid(id = 0){
	var gridSize = $("#grid-size").val();
	var table = $(document.createElement("table")).attr("id", id+"_grid_table").attr("class", "grid_table");
	for (var i = 0; i < gridSize; i++){
		var row = $(document.createElement("tr")).attr("id", id+"_grid_table_row_" + i);
		table.append(row);
		for (var j = 0; j < gridSize; j++){
			row.append(
				$(document.createElement("td"))
				.append(
					$(document.createElement("input"))
					.attr({
						"id": id+"_grid_val_" + i + "_" + j,
						"class":"int_selector blur_selector",
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
	var numGrids = $("#num-grids").val();
	var gridsDiv = $("#grids-div");
	gridsDiv.empty();
	for (var i = 0; i < numGrids; i++){
		gridsDiv.append(constructGrid(i));
	}
	$("#grids-div").append(
		$(document.createElement("label")).text("Use absolute value of result: ").append(
			$(document.createElement("input")).attr({"id":"use_abs_val","type":"checkbox"})));
}

function createGrid(){
	$("#blur-grid").empty();
	if ($("#blur-type").val() != "custom"){
		return;
	}
	$("#blur-grid").append(constructGrid());
	$("#blur-grid").append(
		$(document.createElement("label")).text("Use absolute value of result: ").append(
			$(document.createElement("input")).attr({"id":"use_abs_val","type":"checkbox"})));
}

function getSurroundingPixels(col, row, gridSize, greyscale=false, returnGrid=true){
	// Gets the r, g and b values for  pixels surrounding the pixel at (row, col)
	// Grey scale is whether to return greyscale values
	// ReturnGrid: whether to return a grid or array
	var greyscalerFunc = greyscaler
	var shift = Math.floor(gridSize / 2);
	var rgb = Array(3);
	for (var k = 0; k < 3; k++){
		// Create three arrays for red, green and blue
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
	// Go through the surrounding pixels and update red green and blue values
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
				if (greyscale){
					pixelData = greyscalerFunc(next_col, next_row)
				}
				else if (salt && salt[next_col][next_row] != false){
					pixelData = [salt[next_col][next_row], salt[next_col][next_row], salt[next_col][next_row]];
				}
				else{
					pixelData = source_canvas.getContext('2d').getImageData(next_col, next_row, 1, 1).data;
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

function applyConvolutionalKernel(rgb, convo_k, gridSize, total_weight){
	// Applies a convolutional kernel to an rgb grid and returns an array of red green and blue values
	response = Array();
	for (var k = 0; k < 3; k++){
		var sum = 0;
		for (i = 0; i < gridSize; i++){
			for (j = 0; j < gridSize; j++){
				sum += convo_k[i][j] * rgb[k][i][j];
			}
		}
		response.push(Math.floor(sum/total_weight));
	}
	return response;
}

function applyCustomConvolutionalKernels(rgb, gridSize){
		// Applies any custom convolutional kernels present
		var numGrids = $(".grid_table").size();
		var response = [0,0,0]
		for (var i = 0; i < numGrids; i++){
			// For each user input grid,
			// convert user input into convolutional kernel
			var totalWeight = 0
			var next_grid = Array();
			for (var j = 0; j < gridSize; j++){
				var col = Array();
				next_grid.push(col);
				for (var k = 0; k < gridSize; k++){
					var weight = parseInt($("#"+i+"_grid_val_" + j + "_" + k).val());
					totalWeight += Math.abs(weight);
					col.push(weight);
				}
			}
			// Make sure we don't divide by 0
			if (totalWeight == 0) totalWeight = 1;
			// Apply convolutional kernel
			var next_rgb = applyConvolutionalKernel(rgb, next_grid, gridSize, totalWeight);

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
		
function createGaussianKernel(gridSize){
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
	filter = function(col, row){
		var blur_type = $("#blur-type").val();	
		var gridSize = $("#grid-size").val();
		var greyscale = ($("#greyscale-or-rgb").val() == "greyscale")
		
		if (blur_type == "gaussian"){
			// This isn't quite right at the edges of the picture, but it should be close
			// For red, green and blue
			surroundingPixels = getSurroundingPixels(col, row, gridSize, greyscale, true);
			
			// Create convolutional kernel if it hasn't already been created at this size
			if (gaussian_kernel.length != gridSize){
				createGaussianKernel(gridSize);
			}
			return applyConvolutionalKernel(surroundingPixels, gaussian_kernel, gridSize, gaussian_kernel.totalWeight);
		}
		if (blur_type == "custom"){
			surroundingPixels = getSurroundingPixels(col, row, gridSize, greyscale, true);
			return applyCustomConvolutionalKernels(surroundingPixels, gridSize)
			}
		if (blur_type == "mean"){
			surroundingPixels = getSurroundingPixels(col, row, gridSize, greyscale, false);
			return surroundingPixels.map(function(x){return Math.floor(average(x));});
		}
		if (blur_type == "median"){
			surroundingPixels = getSurroundingPixels(col, row, gridSize, greyscale, false);
			// Get median for r, g and b values
			return surroundingPixels.map(function(list){list = list.sort();return list[Math.floor(list.length / 2)];});
		}	
	}
	
	refreshImage();
		
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
	refreshImage();
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
	refreshImage();
}

function removeFilters(){
	if ($("#greyscale-or-rgb").val() == "greyscale"){
		filter = greyscaler;
	}
	else {
		filter = salter;
	}
	refreshImage();
}

function applyGreyThreshold(){
	var threshold = $("#threshold_selector").val();
	filter = function(col, row){
		var pixelData;
		if (mode == 'edgedetection'){
			pixelData = edgeDetectionFilter(col, row);
		}
		else{
			pixelData = source_canvas.getContext('2d').getImageData(col, row, 1, 1).data;
		}
		var sum = pixelData[0] + pixelData[1] + pixelData[2];
		var avg = sum / 3;
		if (avg > threshold){
			return [255, 255, 255];
		}
		else{
			return [0,0,0]
		}
	}
	refreshImage();
}

function removeGreyThreshold(){
	filter = greyscaler;
	refreshImage();
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
	refreshImage();
}

function refreshImage(){
	// Reload image
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
	$("#loading-img-div").show()
	setTimeout(function(){
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
    
		$("#loading-img-div").hide();
	}, 100);
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

function sum(array){
	return array.reduce(function(prev, curr, currI, arr){
				return prev + curr;
	});
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
