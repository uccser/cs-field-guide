$(function() {
    document.onselectstart = function() {
        return false;
    }


    var big_canvas = document.getElementById("before_image_canvas");
    var big_canvas_context = big_canvas.getContext("2d");
    var small_canvas = document.getElementById("before_8_by_8");
    var small_canvas_ctx = small_canvas.getContext("2d");
    var placeholder_canvas = document.getElementById("placeholder_canvas");
    var placeholder_canvas_context = placeholder_canvas.getContext("2d");
    var quantisation = [16, 11, 12, 15, 21, 32, 50, 66, 11, 12, 13, 18, 24, 46, 62, 73, 12, 13,
        16, 23, 38, 56, 73, 75, 15, 18, 23, 29, 53, 75, 83, 83, 21, 24, 38, 53, 68, 95, 103, 103, 32, 46,
        56, 75, 95, 104, 117, 117, 50, 62, 73, 83, 103, 117, 120, 120, 66, 73, 75, 83, 103, 117, 120, 120
    ];
    //No smoothing please
    small_canvas_ctx.mozImageSmoothingEnabled = false;
    small_canvas_ctx.webkitImageSmoothingEnabled = false;
    small_canvas_ctx.msImageSmoothingEnabled = false;
    small_canvas_ctx.imageSmoothingEnabled = false;
    placeholder_canvas_context.mozImageSmoothingEnabled = false;
    placeholder_canvas_context.webkitImageSmoothingEnabled = false;
    placeholder_canvas_context.msImageSmoothingEnabled = false;
    placeholder_canvas_context.ImageSmoothingEnabled = false;
    big_canvas_context.mozImageSmoothingEnabled = false;
    big_canvas_context.webkitImageSmoothingEnabled = false;
    big_canvas_context.msImageSmoothingEnabled = false;
    big_canvas_context.ImageSmoothingEnabled = false;
    small_canvas_ctx.scale(30, 30);

    create_dct_table();
    createLabelGrid();
    drag_8_by_8();
    draw_big_image();
    $("#toggleNumber").change(function() {
        $("#labels_8_by_8").toggle("fade");
    });


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
            close_up_8_by_8(x, y);
        }
    }

    function createLabelGrid() {
        for (var i = 1; i <= 8; i++) {
            var row = $('<tr class="label_row"></tr>');
            for (var j = 1; j <= 8; j++) {
                var rowData = $('<td class="label_data" id="cell' + i + j + '"></td>').append('0');
                row.append(rowData);
            };
            $('#labels_8_by_8').append(row);
        };
    }

    function close_up_8_by_8(x, y) {
        var imageData = big_canvas_context.getImageData(x, y, 8, 8);
        var pixels = imageData.data;
        var yData = [];
        for (var i = 0; i < pixels.length; i += 4) {
            yData.push(pixels[i]);
        }
        updateDCTValues(dct(yData));
        updateLabelGrid(yData);
        placeholder_canvas_context.putImageData(imageData, 0, 0);

        var zoomed_bit = new Image();
        zoomed_bit.src = placeholder_canvas.toDataURL();
        placeholder_canvas_context.clearRect(0, 0, 8, 8);

        zoomed_bit.onload = function() {
            small_canvas_ctx.drawImage(zoomed_bit, 0, 0, 8, 8);
        }

    }

    function updateLabelGrid(data) {
        index = 0;
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 8; j++) {
                $('#cell' + i + j).text(data[index])
                if (data[index] > 127) {
                    $('#cell' + i + j).css('color', 'black');
                } else {
                    $('#cell' + i + j).css('color', 'white');
                }
                index++
            };
        }
    }


    function updateDCTValues(data) {
        var index = 0;
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 8; j++) {
                $('#stepper_number_' + i + j).val(Math.round((data[index] + 0.00001) * 100) / 100);
                index++;
            };
        };
    }

    function draw_big_image() {
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
            close_up_8_by_8(0, 0);
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
                        val = block[v * 8 + u];
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

});