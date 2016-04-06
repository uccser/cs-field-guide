// Settings and intialize layout
this.MAX_HEIGHT = 133;
this.CELL_SIZE = 50;

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

this.mode = 'datarep'
this.filter = null

this.tiling = new Tiling;

$( document ).ready(function() {
	if (getUrlParameter('mode') == 'threshold') {
    	mode = 'threshold';
    }
 	setExtraFeatureText()
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

function setExtraFeatureText(){
	if (mode == 'threshold'){
		$("#pixel-viewer-extra-feature-description").text("Create an expression to threshold the image. Any pixels that match the expression you come up with will be turned white, and everything else will become black. What happens when you threshold on different values or for different colours? Can you use this technique to identify regions of similar colour in the image?");
		thresholder = new Thresholder($('#pixel-viewer-image-manipulator'));
	}
}

function sanitiseValues(){
	$(".color_selector")
		.filter(function(index) {return this.value == "";}).val(0);
	$(".color_selector").val(function(index, value) {return Math.round(value)});
}

function truncateValues(){
	$(".color_selector")
		.filter(function(index) {return this.value > 255;}).val(255);
	$(".color_selector")
		.filter(function(index) {return this.value < 0;}).val(0);
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
			.attr({"type": "number", "value": 0, "id" : vals[val] + "_selector", "class" : "color_selector"})
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
	this.main_div.append($(document.createElement("button")).text("Apply Threshold").click(applyThreshold))
	this.main_div.append($(document.createElement("button")).text("Remove Threshold").click(removeThreshold))
}

function applyThreshold(){
	var r_lt_or_gt = $("#R_lt_or_gt").val();
	var r_val = $("#R_selector").val();
	var g_lt_or_gt = $("#R_lt_or_gt").val();
	var g_val = $("#G_selector").val();
	var b_lt_or_gt = $("#R_lt_or_gt").val();
	var b_val = $("#B_selector").val();
	
	var operator_0 = $("#operator_0").val();
	var operator_1 = $("#operator_1").val();
	
	var expr = ["r", r_lt_or_gt, r_val, operator_0, "g", g_lt_or_gt, g_val, operator_1, "b", b_lt_or_gt, b_val];
	filter = function(pixelData){
		var expr = [pixelData[0], r_lt_or_gt, r_val, operator_0, pixelData[1], g_lt_or_gt, g_val, operator_1, pixelData[2], b_lt_or_gt, b_val].join(" ");
		if (eval(expr)){
			return ([255, 255, 255]);
		}
		else {
			return ([0, 0, 0]);
		}
	}
	scroller.scrollTo(0, 0);
}

function removeThreshold(){
	filter = null;
	scroller.scrollTo(0,0);
}

function loadImage(src){
    //	Prevent any non-image file type from being read.
    if(!src.type.match(/image.*/)){
        console.log("The dropped file is not an image: ", src.type);
        return;
    }

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
    var pixelData = source_canvas.getContext('2d').getImageData(col, row, 1, 1).data;
    if (null != filter){
    	pixelData = filter(pixelData);
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
