$(function () {
    document.onselectstart = function () {
        return false;
    };


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


    // Need to see the individual pixels on the canvases - so disable smoothing.
    function disableSmoothing(canvasContext) {
        canvasContext.mozImageSmoothingEnabled = false;
        canvasContext.webkitImageSmoothingEnabled = false;
        canvasContext.msImageSmoothingEnabled = false;
        canvasContext.imageSmoothingEnabled = false;
    }

    createDCTTable();
    dragSmallSquare();
    createBigImage();

    $("#toggleNumberBefore").change(function () {
        $("#before-labels-8-by-8").toggle("fade");
        $("#after-labels-8-by-8").toggle("fade");
    });

    $(".stepper-number").on("change paste keyup", function () {
        DCTGrid.updateValues();
        drawAfterFromDCT();
    });

    $("#zeroButton").click(function () {
        DCTGrid.setValues(Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0));
        drawAfterFromDCT();
    });

    $("#resetButton").click(function () {
        after.setToMatch(before);
    });

    $("#quantisationButton").click(function () {
        applyQuantisation();
    });

    $("#toggleDifference").change(function () {
        after.toggleDifference(before);
    });

    var DCTGrid = {
        values: [],

        getValues: function () {
            return values;
        },

        updateValues: function () {
            var data = [];
            for (var i = 1; i <= 8; i++) {
                for (var j = 1; j <= 8; j++) {
                    data.push($('#stepper-number-' + i + j).val());
                }
            }
            values = data;

        },

        setValues: function (data) {
            values = data;
            var index = 0;
            for (var i = 1; i <= 8; i++) {
                for (var j = 1; j <= 8; j++) {
                    $('#stepper-number-' + i + j).val(Math.round((data[index] + 0.00001) * 100) / 100);
                    index++;
                }
            }
        }
    };

    function CloseUp8By8(type, canvasContext) {
        this.type = type;
        this.canvasContext = canvasContext;
        this.currentLabels = Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0);
        this.colourLabels = Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0);
        this.differenceLabels = Array.apply(null, new Array(64)).map(Number.prototype.valueOf, 0);
        this.diff = false;
        disableSmoothing(canvasContext);
        canvasContext.scale(canvasScalingFactor, canvasScalingFactor);
        createLabelGrid(type);

        this.setCurrentLabels = function (data) {
            this.currentLabels = data;
            var index = 0;
            for (var i = 1; i <= 8; i++) {
                for (var j = 1; j <= 8; j++) {
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

        this.toggleDifference = function (closeUp8By8Var) {
            if (this.diff) {
                this.diff = false;
                this.setLabelsToCurrentColorVal();
            } else {
                this.diff = true;
                this.showDiff(closeUp8By8Var);
            }
        };

        this.getCurrentGridLabels = function () {
            return this.currentLabels;
        };

        this.getColorLabels = function () {
            return this.colourLabels;
        };

        this.getDifferenceLabels = function () {
            return this.differenceLabels;
        };

        this.setColourLabels = function (labels) {
            this.colourLabels = labels;
        };

        this.drawPixels = function (data) {
            var placeholderCanvas = document.getElementById("placeholder-canvas");
            var placeholderCanvasContext = placeholderCanvas.getContext("2d");
            placeholderCanvasContext.putImageData(data, 0, 0);

            var zoomedBit = new Image();
            zoomedBit.src = placeholderCanvas.toDataURL();
            placeholderCanvasContext.clearRect(0, 0, 8, 8);
            var current = this;

            zoomedBit.onload = function () {
                current.canvasContext.drawImage(zoomedBit, 0, 0, 8, 8);
            }
        };

        this.setToMatch = function (closeUp8By8Var) {
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
            DCTGrid.setValues(dct(labels));
            if (this.diff) {
                this.showDiff(closeUp8By8Var);
            }
        };

        this.showDiff = function (closeUp8By8Var) {
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
            this.setCurrentLabels(diffValues);
        };
        this.setLabelsToCurrentColorVal = function () {
            this.setCurrentLabels(this.colourLabels);
        }

    }


    /* Creates html table that contains the DCT images and the (changeable) value 
     associated with each one. */
    function createDCTTable() {

        for (var i = 1; i <= 8; i++) {
            var row = $("<tr></tr>");
            for (var j = 1; j <= 8; j++) {
                var rowData = $("<td></td>").append('<img src="./img/basis_functions/DCTr' + i + 'c' + j + '.png">');
                rowData.append('<div class="stepper" id="stepper-' + i + j + "\"><div class=\"stepper-progress\"></div><input type=\"text\" class=\"stepper-number\" id=\"stepper-number-" + i + j + '"></div>');
                row.append(rowData);
            }
            $('#dct-table').append(row);
        }

        // initialises the stepper that allows the user to drag the nume
        for (i = 1; i <= 8; i++) {
            for (j = 1; j <= 8; j++) {
                if (i != 1 || j != 1) {
                    $('#stepper-' + i + j).stepper({
                        unit: '',
                        initialValue: 0,
                        min: -1024,
                        max: 1023,
                        stepSize: 1
                    });
                }
            }
        }

        $('#stepper-11').stepper({
            unit: '',
            initialValue: 0,
            min: 0,
            max: 2048,
            stepSize: 1
        });


    }

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


    function dragSmallSquare() {
        // target elements with the "draggable" class
        interact('.draggable')
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
                        interact.createSnapGrid({x: 8, y: 8})
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

    function applyQuantisation() {
        var values = DCTGrid.getValues();
        for (var i = 0; i < values.length; i++) {
            var initial = Math.round(values[i] / quantisation[i]);
            values[i] = initial * quantisation[i];
        }
        DCTGrid.setValues(values);
        drawAfterFromDCT();
    }

    function createLabelGrid(labelName) {
        for (var i = 1; i <= 8; i++) {
            var row = $('<tr class="label-row"></tr>');
            for (var j = 1; j <= 8; j++) {
                var rowData = $('<td class="label-data" id="' + labelName + 'cell' + i + j + '"></td>').append('0');
                row.append(rowData);
            }
            $('#' + labelName + '-labels-8-by-8').append(row);
        }
    }

    function dragMoved(x, y, canvasContext) {
        var imageData = canvasContext.getImageData(x, y, 8, 8);
        var pixels = imageData.data;
        var yData = [];
        for (var i = 0; i < pixels.length; i += 4) {
            yData.push(pixels[i]);
        }
        DCTGrid.setValues(dct(yData));
        before.setCurrentLabels(yData);
        before.setColourLabels(yData);
        after.setCurrentLabels(yData);
        after.setColourLabels(yData);
        before.drawPixels(imageData);
        after.setToMatch(before);
    }

    function drawAfterFromDCT() {
        var inverse = idct(DCTGrid.getValues());
        for (var i = inverse.length - 1; i >= 0; i--) {
            inverse[i] = Math.round(inverse[i]);
            if (inverse[i] > 255) {
                inverse[i] = 255;
            } else if (inverse[i] < 0) {
                inverse[i] = 0;
            }
        }
        var imageData = smallCanvasBeforeContext.createImageData(8, 8);
        var pixels = imageData.data;
        var index = 0;
        for (i = 0; i < pixels.length; i += 1) {
            if ((i + 1) % 4 == 0) {
                pixels[i] = 255;
                index++;
            } else {
                pixels[i] = inverse[index];
            }
        }
        after.drawPixels(imageData);
        after.setColourLabels(inverse);
        if (after.diff) {
            after.showDiff(before);
        } else {
            after.setCurrentLabels(inverse);
        }
    }

    /* 
     * Load image and then replace it with the greyscale version of itself.
     */
    function createBigImage() {
        var img = new Image();
        img.src = "./img/IMG_5035.jpg";
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