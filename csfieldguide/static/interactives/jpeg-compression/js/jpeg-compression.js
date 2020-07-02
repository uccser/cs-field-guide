const Interact = require('interactjs');
var urlParameters = require('../../../js/third-party/url-parameters.js');
require('./../../../js/third-party/jquery.stepper');
const dct = require('dct');

'use strict';
$(function () {

    // Get dummy image src, split on rightmost slash, is base path
    $("#toggleNumberBeforeCheckbox").prop("checked", true);
    $("#toggleDifferenceCheckbox").prop("checked", false);

    document.onselectstart = function () {
        return false;
    };

    var puzzleSetting = {
        PUZZLE: urlParameters.getUrlParameter('puzzle') || false
    };

    class CloseUp8By8 {

        constructor (type, canvasContext) {
            this.type = type;
            this.canvasContext = canvasContext;
            this.currentLabels = Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0);
            this.colourLabels = Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0);
            this.differenceLabels = Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0);
            this.diff = false;
            disableSmoothing(canvasContext);
            canvasContext.scale(canvasScalingFactor, canvasScalingFactor);
            createLabelGrid(type);
        }

        setCurrentLabels(data) {
            this.currentLabels = data;
            var index = 0;
            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    var cell = $('#' + this.type + 'cell' + i + j);
                    cell.text(data[index]);
                    if (data[index] > 127) {
                        cell.css('color', 'black');
                    } else {
                        cell.css('color', 'white');
                    }
                    index++;
                }
            }

        };

        toggleDifference (closeUp8By8Var) {
            if (this.diff) {
                this.diff = false;
                this.setLabelsToCurrentColorVal();
            } else {
                this.diff = true;
                this.showDiff(closeUp8By8Var);
            }
        };

        getCurrentGridLabels () {
            return this.currentLabels;
        };

        getColorLabels () {
            return this.colourLabels;
        };

        getDifferenceLabels() {
            return this.differenceLabels;
        };

        setColourLabels(labels) {
            this.colourLabels = labels;
        };

        drawPixels(data) {
            var placeholderCanvas = document.getElementById("placeholder-canvas");
            var placeholderCanvasContext = placeholderCanvas.getContext("2d");
            placeholderCanvasContext.putImageData(data, 0, 0);

            var zoomedBit = new Image();
            zoomedBit.crossOrigin = 'anonymous';
            zoomedBit.src = placeholderCanvas.toDataURL();
            placeholderCanvasContext.clearRect(0, 0, 8, 8);
            var current = this;

            zoomedBit.onload = function () {
                current.canvasContext.drawImage(zoomedBit, 0, 0, 8, 8);
            }
        };

        setToMatch(closeUp8By8Var) {
            var labels = closeUp8By8Var.getColorLabels();
            this.colourLabels = labels;
            this.setCurrentLabels(labels);
            var imageData = closeUp8By8Var.canvasContext.createImageData(8, 8);
            var pixels = imageData.data;
            var index = 0;
            for (var i = 0; i < pixels.length; i += 1) {
                if ((i + 1) % 4 == 0) {
                    pixels[i] = 255;
                    index++;
                } else {
                    pixels[i] = labels[index];
                }
            }
            this.drawPixels(imageData);
            dctGrid.setAllValues(dct(labels));
            if (this.diff) {
                this.showDiff(closeUp8By8Var);
            }
        };

        showDiff(closeUp8By8Var) {
            this.updateDiff(closeUp8By8Var);
            this.setCurrentLabels(this.differenceLabels);
        };

        updateDiff(closeUp8By8Var) {
            var labels = closeUp8By8Var.getColorLabels();
            var current = this.getColorLabels();
            var diffValues = [];
            for (var i = 0; i < current.length; i++) {
                var diff = current[i] - labels[i];
                if (diff > 0) {
                    diff = "+" + diff;
                }
                diffValues[i] = diff;

            }
            this.differenceLabels = diffValues;
            showMSE(calulateMeanSquaredError(this.differenceLabels));
        }



        setLabelsToCurrentColorVal() {
            this.setCurrentLabels(this.colourLabels);
        }

    }

    class DCTGrid {
        constructor() {
            this.values = Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0);
        }

        getValues () {
            return this.values;
        };

        // Values updated from the numbers set on interface
        updateValues () {
            var data = [];
            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    data.push($('#stepper-number-' + i + j).val());
                }
            }
            this.values = data;

        };

        setSpecificValue (index, value) {
            var row = Math.floor(index / 8);
            var column = index % 8;
            this.values[index] = value;
            $('#stepper-number-' + row + column).val(Math.round((value + 0.00001) * 100) / 100)
        };

        // Interface updated and internal values.
        setAllValues (data) {
            this.values = data;
            var index = 0;
            for (var i = 0; i < 8; i++) {
                for (var j = 0; j < 8; j++) {
                    $('#stepper-number-' + i + j).val(Math.round((data[index] + 0.00001) * 100) / 100);
                    index++;
                }
            }
        }
    }

    class Puzzle {
        constructor() {
            this.currentLevel = undefined;
            this.indicesSet = undefined;
            this.level = 1;
            this.helpGiven = [];
            this.setupLevel();
        }

        static checkForMatch () {
            if (arraysEqual(after.getColorLabels(), before.getColorLabels())) {
                $("#puzzle-next-level").show();
            } else {
                $("#puzzle-next-level").hide();
            }
        };

        giveHelp () {
            var numberValue = Math.floor(Math.random() * this.level);
            var count = 0;
            while(this.helpGiven.indexOf(numberValue) >= 0 && count < 64) {
                numberValue = Math.floor(Math.random() * this.level)
                count++;
            }
            this.helpGiven.push(numberValue);
            var currentIndex = 0;
            var helpIndex;
            while (numberValue != -1 && currentIndex <= 63) {
                if (this.currentLevel[currentIndex] != 0) {
                    numberValue--;
                }
                if (numberValue == -1) {
                    helpIndex = currentIndex;
                }
                currentIndex++
            }
            dctGrid.setSpecificValue(helpIndex, this.currentLevel[helpIndex]);
            drawAfterFromDCT();
            if(this.helpGiven.length === puzzle.level) {
                $("#helpButton").addClass('disabled');
            }
        };

        setupLevel () {
            dctGrid.setAllValues(Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0));
            this.helpGiven = [];
            this.indicesSet = [0];
            for (var data = this.level; data != 1; data--) {
                var index = Math.floor(Math.random() * 63) + 1;
                while (index in this.indicesSet) {
                    index = Math.floor(Math.random() * 63) + 1;
                }
                this.indicesSet.push(index);
                var value = Math.floor(Math.random() * 2048) - 1023;
                value = value - (value % 20);
                dctGrid.setSpecificValue(index, value)
            }
            var medianColourValue = Math.floor(Math.random() * 2048);
            medianColourValue = medianColourValue - (medianColourValue % 20);
            dctGrid.setSpecificValue(0, medianColourValue);

            var inverse = getInverseValuesFromDCT();
            this.currentLevel = dctGrid.getValues();
            dctGrid.setAllValues(Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0));
            var imageData = populateImageData(inverse);
            before.drawPixels(imageData);
            before.setColourLabels(inverse);
            before.setCurrentLabels(inverse);
            drawAfterFromDCT();
        }

    }

    var bigCanvasContext = document.getElementById("before-image-canvas").getContext("2d");
    var smallCanvasBefore = document.getElementById("before-8-by-8");
    var smallCanvasBeforeContext = smallCanvasBefore.getContext("2d");
    var smallCanvasAfter = document.getElementById("after-8-by-8");
    var smallCanvasAfterContext = smallCanvasAfter.getContext("2d");

    var quantisation = [16, 11, 12, 15, 21, 32, 50, 66, 11, 12, 13, 18, 24, 46, 62, 73, 12, 13,
        16, 23, 38, 56, 73, 75, 15, 18, 23, 29, 53, 75, 83, 83, 21, 24, 38, 53, 68, 95, 103, 103, 32, 46,
        56, 75, 95, 104, 117, 117, 50, 62, 73, 83, 103, 117, 120, 120, 66, 73, 75, 83, 103, 117, 120, 120
    ];
    var canvasScalingFactor = 30;
    var before = new CloseUp8By8("before", smallCanvasBeforeContext);
    var after = new CloseUp8By8("after", smallCanvasAfterContext);
    var dctGrid = new DCTGrid();
    var puzzle;
    createDCTTable();
    $("#puzzle-next-level").hide();

    if (!puzzleSetting.PUZZLE) {
        dragSmallSquare();
        createBigImage();
        $("#puzzle-stuff").hide();
        $("#help").hide();
        after.toggleDifference(before);
        after.toggleDifference(before);
    } else {
        $("#right-of-dct").hide();
        $("#big-image").hide();
        puzzle = new Puzzle();
    }


    $("#toggleNumberBefore").change(function () {
        $("#before-labels-8-by-8").toggle("fade");
        $("#after-labels-8-by-8").toggle("fade");
    });

    $(".stepper-number").on("change paste keyup", function () {
        dctGrid.updateValues();
        drawAfterFromDCT();
        if (puzzleSetting.PUZZLE) {
            Puzzle.checkForMatch();
        }
    });

    $("#nextLevelButton").click(function () {
        puzzle.level = puzzle.level + 1;
        puzzle.setupLevel();
        $("#puzzle-next-level").hide();
        $("#level-specific").text("Level " + puzzle.level + " - the image can be made by combining " + puzzle.level + " basis functions.");
        $("#helpButton").removeClass('disabled');

    });

    $("#zeroButton").click(function () {
        dctGrid.setAllValues(Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0));
        drawAfterFromDCT();
    });

    $("#resetButton").click(function () {
        after.setToMatch(before);
    });

    $("#quantisationButton").click(function () {
        applyQuantisation()
    });

    $("#toggleDifference").change(function () {
        after.toggleDifference(before);
    });

    $("#helpButton").click(function () {
        puzzle.giveHelp();
        Puzzle.checkForMatch();
    });

    $('img').on('dragstart', function(event) { event.preventDefault(); });

    function showMSE(mse) {
        $("#mse").text(mse);
    }

    // Compares two arrays for equality.
    function arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length != b.length) return false;

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    // Need to see the individual pixels on the canvases - so disable smoothing.
    function disableSmoothing(canvasContext) {
        canvasContext.mozImageSmoothingEnabled = false;
        canvasContext.webkitImageSmoothingEnabled = false;
        canvasContext.msImageSmoothingEnabled = false;
        canvasContext.imageSmoothingEnabled = false;
    }

    function calulateMeanSquaredError(input) {
        var sum = 0;
        for(var i = 0; i < input.length; i++) {
            // Have to remove the plus signs in the difference labels.
            if(input[i].toString().indexOf("+") == 0){
                input[i] = parseInt(input[i].substr(0));
            }
            sum += input[i];
        }
        return sum/64;
    }


    // Creates html table that contains the DCT images and the (changeable) value
    // associated with each one.
    function createDCTTable() {

        for (var i = 1; i <= 8; i++) {
            var row = $("<tr></tr>");
            for (var j = 1; j <= 8; j++) {
                var rowData = $("<td id='dctData'></td>").append('<img src="' + base_path + 'interactives/jpeg-compression/img/basis_functions/DCTr' + i + 'c' + j + '.png">');
                rowData.append('<div class="stepper" id="stepper-' + (i - 1) + (j - 1) + "\"><div class=\"stepper-progress\"></div><input type=\"text\" class=\"stepper-number\" id=\"stepper-number-" + (i - 1) + (j - 1) + '"></div>');
                row.append(rowData);
            }
            $('#dct-table').append(row);
        }

        // initialises the stepper that allows the user to drag the nume
        for (i = 0; i < 8; i++) {
            for (j = 0; j < 8; j++) {
                if (i != 0 || j != 0) {
                    $('#stepper-' + i + j).stepper({
                        unit: '',
                        initialValue: 0,
                        min: -1024,
                        max: 1023,
                        stepSize: 20
                    });
                }
            }
        }

        $('#stepper-00').stepper({
            unit: '',
            initialValue: 0,
            min: 0,
            max: 2048,
            stepSize: 20
        });


    }

    // Calculates the coefficients of the discrete cosine transform basis functions
    // from an array of colour values.
    function dct(input) {
        var output = [],
            v, u, x, y, sum, val, au, av;
        for (v = 0; v < 8; v++) {
            for (u = 0; u < 8; u++) {
                sum = 0;
                for (y = 0; y < 8; y++) {
                    for (x = 0; x < 8; x++) {
                        val = input[y * 8 + x];
                        val *= Math.cos(((2 * x + 1) * u * Math.PI) / 16);
                        val *= Math.cos(((2 * y + 1) * v * Math.PI) / 16);
                        sum += val;
                    }
                }
                au = u === 0 ? 1 / Math.SQRT2 : 1;
                av = v === 0 ? 1 / Math.SQRT2 : 1;
                output[v * 8 + u] = 1 / 4 * au * av * sum;
            }
        }
        return output;
    }

    // The inverse of the dct function. Calculates the colour values from the
    // coefficients of the discrete cosine transform basis funtions.
    function idct(input) {
        var output = [],
            v, u, x, y, sum, val, au, av;
        for (y = 0; y < 8; y++) {
            for (x = 0; x < 8; x++) {
                sum = 0;
                for (v = 0; v < 8; v++) {
                    for (u = 0; u < 8; u++) {
                        au = u === 0 ? 1 / Math.SQRT2 : 1;
                        av = v === 0 ? 1 / Math.SQRT2 : 1;
                        val = input[v * 8 + u];
                        val *= au;
                        val *= av;
                        val *= Math.cos(((2 * x + 1) * u * Math.PI) / 16);
                        val *= Math.cos(((2 * y + 1) * v * Math.PI) / 16);
                        sum += val;
                    }
                }
                output[y * 8 + x] = 1 / 4 * sum;
            }
        }
        return output;
    }

    // Handles the dragging of the square around the big image.
    function dragSmallSquare() {
        // target elements with the "draggable" class
        Interact('.draggable')
            .draggable({
                // enable inertial throwing
                inertia: false,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: document.getElementById("before-image-canvas"),
                    endOnly: false,
                    elementRect: {top: 0, left: 0, bottom: 1, right: 1}
                },
                snap: {
                    targets: [
                        Interact.createSnapGrid({x: 8, y: 8})
                    ],
                    range: Infinity,
                    relativePoints: [{x: 0, y: 0}]
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: dragMoveListener
                // call this function on every dragend event
            });

        function dragMoveListener(event) {
            var target = event.target;
            // keep the dragged position in the data-x/data-y attributes

            var x = Math.max(Math.floor((parseFloat(target.getAttribute('data-x')) || 0) + event.dx), 0);
            var y = Math.max(Math.floor((parseFloat(target.getAttribute('data-y')) || 0) + event.dy), 0);

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

            // update the position attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            dragMoved(x, y, bigCanvasContext);
        }
    }

    // Using the quantisation values, applies quantisation to the current values of coefficients and
    // redraws the after image.
    function applyQuantisation() {
        var values = dctGrid.getValues();
        for (var i = 0; i < values.length; i++) {
            var initial = Math.round(values[i] / quantisation[i]);
            values[i] = initial * quantisation[i];
        }
        dctGrid.setAllValues(values);
        drawAfterFromDCT();
    }

    // Creates labels for the 8x8 grids.
    function createLabelGrid(labelName) {
        for (var i = 0; i < 8; i++) {
            var row = $('<tr class="label-row"></tr>');
            for (var j = 0; j < 8; j++) {
                var rowData = $('<td class="label-data" id="' + labelName + 'cell' + i + j + '"></td>').append('0');
                row.append(rowData);
            }
            $('#' + labelName + '-labels-8-by-8').append(row);
        }
    }

    // Redraws the close up images based on where the small square has been moved to.
    // Also sets the values of the DCT grid.
    function dragMoved(x, y, canvasContext) {
        var imageData = canvasContext.getImageData(x, y, 8, 8);
        var pixels = imageData.data;
        var yData = [];
        for (var i = 0; i < pixels.length; i += 4) {
            yData.push(pixels[i]);
        }
        dctGrid.setAllValues(dct(yData));
        before.setCurrentLabels(yData);
        before.setColourLabels(yData);
        after.setCurrentLabels(yData);
        after.setColourLabels(yData);
        before.drawPixels(imageData);
        after.setToMatch(before);
    }

    // Based on computing the inverse dct, draw the after 8x8 grid with these values.
    function drawAfterFromDCT() {
        var inverse = getInverseValuesFromDCT();
        var imageData = populateImageData(inverse);
        after.drawPixels(imageData);
        after.setColourLabels(inverse);
        if (after.diff) {
            after.showDiff(before);
        } else {
            after.updateDiff(before);
            after.setCurrentLabels(inverse);
        }
    }

    // Creates an imageData object and then sets all values to the appropriate data value
    // except the alpha value, which should always be set to 255.
    function populateImageData(values) {
        var imageData = smallCanvasBeforeContext.createImageData(8, 8);
        var pixels = imageData.data;
        var index = 0;
        for (var i = 0; i < pixels.length; i += 1) {
            if ((i + 1) % 4 == 0) {
                pixels[i] = 255;
                index++;
            } else {
                pixels[i] = values[index];
            }
        }
        return imageData;
    }

    // Calculates the colour values by using the inverse function.
    // Then rounds numbers and caps to a min of 0 and max of 255.
    function getInverseValuesFromDCT() {
        var inverse = idct(dctGrid.getValues());
        for (var i = inverse.length - 1; i >= 0; i--) {
            inverse[i] = Math.round(inverse[i]);
            if (inverse[i] > 255) {
                inverse[i] = 255;
            } else if (inverse[i] < 0) {
                inverse[i] = 0;
            }
        }
        return inverse;
    }


    // Load image and then replace it with the greyscale version of itself.
    function createBigImage() {
        var img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = base_path + "interactives/jpeg-compression/img/IMG_5035.jpg";
        img.onload = function () {
            bigCanvasContext.drawImage(img, 0, 0, 360, 240);

            // Retrieves image data and calculates the greyscale version.
            var imageData = bigCanvasContext.getImageData(0, 0, 360, 240);
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var y = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                data[i] = y;
                data[i + 1] = y;
                data[i + 2] = y;
            }
            // Draws greyscale version of image.
            bigCanvasContext.putImageData(imageData, 0, 0);

            // Initialises the small canvas to show 8x8 pixels at 0,0 of big image.
            // This is where the small square to drag begins.
            dragMoved(0, 0, bigCanvasContext);
        };
    }
});
