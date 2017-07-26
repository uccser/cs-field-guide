$(function() {
    document.onselectstart = function() {
        return false;
    }


    var big_canvas = document.getElementById("before_image_canvas");
    var big_canvas_context = big_canvas.getContext("2d");
    var small_canvas = document.getElementById("before_8_by_8");
    var small_canvas_ctx = small_canvas.getContext("2d");
    var smallCanvasAfter = document.getElementById("after_8_by_8");
    var smallCanvasAfterContext = smallCanvasAfter.getContext("2d");
    var placeholder_canvas = document.getElementById("placeholder_canvas");
    var placeholder_canvas_context = placeholder_canvas.getContext("2d");
    var quantisation = [16, 11, 12, 15, 21, 32, 50, 66, 11, 12, 13, 18, 24, 46, 62, 73, 12, 13,
        16, 23, 38, 56, 73, 75, 15, 18, 23, 29, 53, 75, 83, 83, 21, 24, 38, 53, 68, 95, 103, 103, 32, 46,
        56, 75, 95, 104, 117, 117, 50, 62, 73, 83, 103, 117, 120, 120, 66, 73, 75, 83, 103, 117, 120, 120
    ];

    // Need to see the individual pixels on the canvases - so disable smoothing.
    function disableSmoothing (canvasContext) {
        canvasContext.mozImageSmoothingEnabled = false;
        canvasContext.webkitImageSmoothingEnabled = false;
        canvasContext.msImageSmoothingEnabled = false;
        canvasContext.imageSmoothingEnabled = false;
    }
    disableSmoothing(small_canvas_ctx);
    disableSmoothing(placeholder_canvas_context);
    disableSmoothing(big_canvas_context);
    disableSmoothing(smallCanvasAfterContext);
    small_canvas_ctx.scale(30, 30);
    smallCanvasAfterContext.scale(30, 30);

    var before = new closeUp8By8("before", small_canvas, small_canvas_ctx);
    var after = new closeUp8By8("after", smallCanvasAfter, smallCanvasAfterContext);
    $("#toggleDifference").prop("checked", false);

    create_dct_table();
    createLabelGrid("before");
    createLabelGrid("after");
    drag_8_by_8();
    createBigImage();

    $("#toggleNumberBefore").change(function() {
        $("#before_labels_8_by_8").toggle("fade");
        $("#after_labels_8_by_8").toggle("fade");
    });

    $(".stepper-number").on("change paste keyup", function() {
        DCTGrid.updateValues();
        drawAfterFromDCT();
    });
    $("#zeroButton").click(function() {
        DCTGrid.setValues(Array.apply(null, Array(64)).map(Number.prototype.valueOf, 0));
        drawAfterFromDCT();
    });
    $("#resetButton").click(function() {
        after.setToMatch(before);
    });
    $("#quantisationButton").click(function() {
        applyQuantisation();
    });
    $("#toggleDifference").change(function() {
        after.toggleDifference(before);
    })
    $('input[name="group1"]:radio').change(function() {
        if (this.id == 'none') {
            $("#after_labels_8_by_8").fadeOut();
        } else if (this.id == 'diff') {
            $("#after_labels_8_by_8").fadeIn();
            after.showDiff(before);
        } else if (this.id == 'colour') {
            $("#after_labels_8_by_8").fadeIn();
            var data = idct(DCTGrid.getValues());
            for (var i = data.length - 1; i >= 0; i--) {
                data[i] = Math.round(data[i]);
                if (data[i] > 255) {
                    data[i] = 255;
                } else if (data[i] < 0) {
                    data[i] = 0;
                }
            }
            after.updateGridLabels(data);
        }

    });

    var DCTGrid = {
        values: [],

        getValues: function() {
            return values;
        },

        updateValues: function() {
            var data = []
            for (var i = 1; i <= 8; i++) {
                for (var j = 1; j <= 8; j++) {
                    data.push($('#stepper_number_' + i + j).val());
                };
            };
            values = data;

        },

        setValues: function(data) {
            values = data;
            var index = 0;
            for (var i = 1; i <= 8; i++) {
                for (var j = 1; j <= 8; j++) {
                    $('#stepper_number_' + i + j).val(Math.round((data[index] + 0.00001) * 100) / 100);
                    index++;
                };
            };
        },
    }

    function closeUp8By8(type, canvas, canvas_ctx) {
        this.type = type;
        this.canvas = canvas;
        this.canvas_ctx = canvas_ctx;
        this.currentLabels = Array.apply(null, Array(64)).map(Number.prototype.valueOf, 0);
        this.colourLabels = Array.apply(null, Array(64)).map(Number.prototype.valueOf, 0);
        this.differenceLabels = Array.apply(null, Array(64)).map(Number.prototype.valueOf, 0);
        this.diff = false;

        this.setCurrentLabels = function(data) {
            this.currentLabels = data;
            var index = 0;
            for (var i = 1; i <= 8; i++) {
                for (var j = 1; j <= 8; j++) {
                    $('#' + this.type + 'cell' + i + j).text(data[index])
                    if (data[index] > 127) {
                        $('#' + this.type + 'cell' + i + j).css('color', 'black');
                    } else {
                        $('#' + this.type + 'cell' + i + j).css('color', 'white');
                    }
                    index++;
                };
            }

        };

        this.toggleDifference = function(closeUp8By8Var) {
            if(this.diff) {
                this.diff = false;
                this.setLabelsToCurrentColorVal();
            } else {
                this.diff = true;
                this.showDiff(closeUp8By8Var);
            }
        }

        this.getCurrentGridLabels = function() {
            return this.currentLabels;
        }

        this.getColorLabels = function() {
            return this.colourLabels;
        }

        this.getDifferenceLabels = function() {
            return this.differenceLabels;
        }

        this.setColourLabels = function(labels) {
            this.colourLabels = labels;
        }

        this.drawPixels = function(data) {
            placeholder_canvas_context.putImageData(data, 0, 0);

            var zoomed_bit = new Image();
            zoomed_bit.src = placeholder_canvas.toDataURL();
            placeholder_canvas_context.clearRect(0, 0, 8, 8);
            var current = this;

            zoomed_bit.onload = function() {
                current.canvas_ctx.drawImage(zoomed_bit, 0, 0, 8, 8);
            }
        }

        this.setToMatch = function(closeUp8By8Var) {
            var labels = closeUp8By8Var.getColorLabels();
            this.colourLabels = labels;
            this.setCurrentLabels(labels);
            var imageData = closeUp8By8Var.canvas_ctx.createImageData(8, 8);
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
            DCTGrid.setValues(dct(labels))
            if(this.diff) {
                this.showDiff(closeUp8By8Var);
            }
        }

        this.showDiff = function(closeUp8By8Var) {
            var labels = closeUp8By8Var.getColorLabels();
            var current = this.getColorLabels();
            var diffValues = []
            for (var i = 0; i < current.length; i++) {
                var diff = current[i] - labels[i];
                if (diff > 0) {
                    diff = "+" + diff;
                }
                diffValues[i] = diff;

            };
            this.differenceLabels = diffValues;
            this.setCurrentLabels(diffValues);
        }
        this.setLabelsToCurrentColorVal = function() {
            this.setCurrentLabels(this.colourLabels);
        }

    }


    /* Creates html table that contains the DCT images and the (changeable) value 
    associated with each one. */
    function create_dct_table() {

        for (var i = 1; i <= 8; i++) {
            var row = $('<tr></tr>');
            for (var j = 1; j <= 8; j++) {
                var rowData = $('<td></td>').append('<img src="./img/basis_functions/DCTr' + i + 'c' + j + '.png">');
                rowData.append('<div class="stepper" id="stepper_' + i + j + '"><div class="stepper-progress"></div><input type="text" class="stepper-number" id="stepper_number_' + i + j + '"></div>');
                row.append(rowData);
            };
            $('#dct_table').append(row);
        };

        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 8; j++) {
                if (i != 1 || j != 1) {
                    $('#stepper_' + i + j).stepper({
                        unit: '',
                        initialValue: 0,
                        min: -1024,
                        max: 1023,
                        stepSize: 1
                    });
                }
            };
        };
        $('#stepper_11').stepper({
            unit: '',
            initialValue: 0,
            min: 0,
            max: 2048,
            stepSize: 1
        });


    }

    var dct = function(input) {
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

    var idct = function(input) {
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



    function drag_8_by_8() {
        // target elements with the "draggable" class
        interact('.draggable')
            .draggable({
                // enable inertial throwing
                inertia: false,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: document.getElementById("before_image_canvas"),
                    endOnly: false,
                    elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
                },
                snap: {
                    targets: [
                        interact.createSnapGrid({ x: 8, y: 8 })
                    ],
                    range: Infinity,
                    relativePoints: [{ x: 0, y: 0 }]
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: dragMoveListener,
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
            dragMoved(x, y);
        }
    }

    function applyQuantisation() {

        var values = DCTGrid.getValues();
        for (var i = 0; i < values.length; i++) {
            var initial = Math.round(values[i] / quantisation[i]);
            values[i] = initial * quantisation[i];
        };
        DCTGrid.setValues(values);
        drawAfterFromDCT();
    }

    function createLabelGrid(labelName) {
        for (var i = 1; i <= 8; i++) {
            var row = $('<tr class="label_row"></tr>');
            for (var j = 1; j <= 8; j++) {
                var rowData = $('<td class="label_data" id="' + labelName + 'cell' + i + j + '"></td>').append('0');
                row.append(rowData);
            };
            $('#' + labelName + '_labels_8_by_8').append(row);
        };
    }

    function dragMoved(x, y) {
        var imageData = big_canvas_context.getImageData(x, y, 8, 8);
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
        };
        var imageData = small_canvas_ctx.createImageData(8, 8);
        var pixels = imageData.data;
        var index = 0;
        for (var i = 0; i < pixels.length; i += 1) {
            if ((i + 1) % 4 == 0) {
                pixels[i] = 255;
                index++;
            } else {
                pixels[i] = inverse[index];
            }
        }
        after.drawPixels(imageData);
        after.setColourLabels(inverse);
        if(after.diff) {
            after.showDiff(before);
        } else {
            after.setCurrentLabels(inverse);
        }
    }

    function createBigImage() {
        var big_canvas = document.getElementById("before_image_canvas");
        var big_canvas_context = big_canvas.getContext("2d");
        var img = new Image();
        img.src = "./img/dandelion.jpg";
        img.onload = function() {
            big_canvas_context.drawImage(img, 0, 0, 320, 320);
            var imageData = big_canvas_context.getImageData(0, 0, 320, 320);
            var data = imageData.data;
            for (var i = 0; i < data.length; i += 4) {
                var y = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                data[i] = y;
                data[i + 1] = y;
                data[i + 2] = y;
            }
            big_canvas_context.putImageData(imageData, 0, 0);
            dragMoved(0, 0);
        };
    }



    // $(big_canvas).click(function(jqEvent) {
    // var coords = {
    //     x: jqEvent.pageX - $(big_canvas).offset().left,
    //     y: jqEvent.pageY - $(big_canvas).offset().top};
    //     //$("#little_drag_square").css("transform":"translate(" + x + "px," + y + "px)");
    // var event = new CustomEvent("clickCanvas");
    // event.target = $("#little_drag_square").get();
    // event.target.setAttribute("data-x", coords.x);
    // event.target.setAttribute("data-y", coords.y);
    // dragMoveListener(event);
    // });



});