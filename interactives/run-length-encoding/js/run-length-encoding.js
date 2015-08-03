$(document).ready(function(){
    // Switch all pixels to black on clear click
    $('#clear-all').on('click', function(){
       $('.pixel').removeClass('black');
       updateRunLengthValues();
    });

    // Toggle all pixels to black on toggle click
    $('#invert').on('click', function(){
       $('.pixel').toggleClass('black');
       updateRunLengthValues();
    });

    // On key up, update squares (delegated)
    $('#run-length').bind('input propertychange', function(){
       updateGrid();
    });

    // Toggle pixel on pixel click
    $('#container').on('click', '.pixel', function(event) {
        $(this).toggleClass('black');
        updateRunLengthValues();
    })

    // Change grid size on value change
    $('#grid-size').on('change', function(){
        setup_grid()
    });

    // Create the grid on load
    setup_grid()
});

function setup_grid(){
    //Get grid Size
    var gridSize = $('#grid-size').val();

    if (gridSize > 21 || gridSize < 1 || isNaN(gridSize)) {
        // Error message
        alert('Please enter a value between 0 and 100');
        // Reset grid
        $('#grid-size').val(5);
        setup_grid()
    } else {
        // Add content to container
        $('#container').removeClass();
        $('#container').addClass(gridSize);
        $('#bit-count').html(gridSize*gridSize);
        charCount = gridSize >= 10 ? 2 * gridSize : gridSize;
        $('#char-count').html('' + charCount);

        var containerHTML = "";
        for(column = 0; column < gridSize; column++) {
            containerHTML += '<div class="flex-container">';
            for(row = 0; row < gridSize; row++) {
                containerHTML += '<div class="flex-item pixel"></div>';
            }
            containerHTML += '</div>';
        }
        $('#container').html(containerHTML);

        //Set initial run length text
        runText = "";
        for (row = 0; row < gridSize; row++) {
            runText += gridSize;
            if (row < gridSize - 1) {
              runText += '\n';
            }
        }
        $('#run-length').val(runText);

        // Set suitable font size
        if (gridSize <= 8) {
            fontSize = 25;
        } else if (gridSize <= 12) {
            fontSize = 19;
        } else {
            fontSize = 14;
        }
        $('#run-length').css('font-size',fontSize);
    }
}


function cleanArray(array, mode) {
    while (array.indexOf('') > -1) {
        for(var i = 0; i < array.length; i++) {
            if(array[i] == "" ){
                array.splice(i,1);
            }
        }
        for(var j = 0; j < array.length; j++){
            //code
            array[j] = array[j].trim();
        }
        for(var k = 0; k < array.length; k++){
            //code
            if (mode == 'nums' && isNaN(array[k])) {
                //code
                array.splice(k,1);
            }
        }
    }

    for(var j = 0; j < array.length; j++){
        //code
        array[j] = array[j].trim();
    }
    for(var k = 0; k < array.length; k++){
        //code
        if (mode == 'nums' && isNaN(array[k])) {
            //code
            array.splice(k,1);
        }
    }
    return array
}

function updateGrid() {
    var gridSize = $('#container').attr('class');
    var runText = "";
    var runCount = 0;
    var mode = 'white';
    var rowCount = 0;
    var cellCount = 0;
    var start = true;

    // Get the values from keyup
    var runText = $('#run-length').val();

    //Split into array based on new lines, remove blank entries
    lines = runText.split('\n')
    lines = cleanArray(lines, 'lines');

    //Check how many lines, append gridSize first based on how many lines have no number - error if more than gridSize
    numLines = lines.length;

    if (numLines > gridSize) {
        //Error
        alert('You have entered more run length lines than lines in the grid! Try making your grid bigger or try less lines');
    } else {
        //Loop through lines
        fullRun = new Array();

        for (var i in lines) {
            //Split each row on commas and strip spaces.
            runNums = lines[i].split(',');
            //console.log(runNums);
            runNums = cleanArray(runNums, 'nums');
            //console.log(runNums);

            total = 0;
            for (var j in runNums) {
                total += parseInt(runNums[j]);
            }

            if (total > gridSize) {
                //Error
                alert("Oh no! Your numbers add up to more than the size of your grid. Try lowering the numbers or making your grid bigger!");
                break;
            } else {
                //Add to full run array
                fullRun[i] = runNums;
            }
        }

        i = fullRun.length;
        var charCount = 0;
        while (fullRun.length < gridSize) {
            //code
            fullRun[i] = [gridSize];
            i++;
        }

        var j = 0;
        for (var j = 0; j < fullRun.length; j++) {
            //code
            charCount += fullRun[j].length * 2 - 1;
            //Check for 2 and 3 digit numbers
            for (var k = 0; k < fullRun[j].length; k++) {
                //code
                if (fullRun[j][k] >= 10) {
                    //code
                    charCount++;
                }
                if (fullRun[j][k] >= 100) {
                    //code
                    charCount++;
                }
            }
        }

        $('#char-count').html(charCount);

        runIndex = 0;
        cellCount = 0;
        start = true;
        rowIndex = 0;
        runCount = 0;

        // Loop through each pixel, using counters and limits from array of numbers
        $('.pixel').each(function() {
            //Use mode white/black to keep track, if/else to make it toggle black class on pixel
            if (start == true) {
                //console.log('start');
                //code
                if (fullRun[rowIndex][0] == 0) {
                    //code
                    mode = 'black';
                    if (!$(this).hasClass('black')) {
                        //code
                        $(this).toggleClass('black');
                    }
                    runCount++;
                    runIndex++;
                } else {
                    if ($(this).hasClass('black')) {
                        $(this).toggleClass('black');
                    }
                    runCount++;
                }
                start = false;
                cellCount++;
            } else {
                if (mode == 'white' && runCount < fullRun[rowIndex][runIndex]) {
                    if ($(this).hasClass('black')) {
                        $(this).toggleClass('black');
                    }
                    runCount++;
                } else if (mode == 'black' && runCount < fullRun[rowIndex][runIndex]) {
                    if (!$(this).hasClass('black')) {
                        $(this).toggleClass('black');
                    }
                    runCount++;
                } else if (mode == 'white' && runCount == fullRun[rowIndex][runIndex]) {
                    mode = 'black';
                    if (!$(this).hasClass('black')) {
                        $(this).toggleClass('black');
                    }
                    runCount++;
                    runCount = 1;
                    runIndex++;
                } else if (mode == 'black' && runCount == fullRun[rowIndex][runIndex]) {
                    mode = 'white';
                    if ($(this).hasClass('black')) {
                        $(this).toggleClass('black');
                    }
                    runCount++;
                    runCount = 1;
                    runIndex++;
                }
                cellCount++;
               if (cellCount == gridSize) {
                    start = true;
                    rowIndex++;
                    cellCount = 0;
                    mode = 'white';
                    runIndex = 0;
                    runCount = 0;
                }
            }
        });
    }
}

function updateRunLengthValues() {
    var gridSize = $('#container').attr('class');
    var runText = "";
    var runCount = 0;
    var mode = 'white';
    var rowCount = 0;
    var cellCount = 0;
    var start = true;
    var charCount = 0;

    $('.pixel').each(function(){
      if (cellCount == gridSize) {
            start = true;
            cellCount = 0;
            rowCount++;
            runCount = 0;
            mode ='white';
        }
        if (start == true) {
            if($(this).hasClass('black')){
                runText += 0 + ", ";
                mode = 'black'
                runCount++;
                charCount += runCount>=10?3:2;
                charCount += runCount>=100?1:0;
            } else {
                runCount++;
            }
            cellCount++;

            start = false;
        } else {
            if (mode == 'black' && $(this).hasClass('black')){
                runCount++;
                cellCount ++;
            } else if (mode == 'black' && !$(this).hasClass('black')) {
                mode = 'white';
                runText += runCount + ', ';
                cellCount ++;
                charCount += 2;
                charCount += runCount>=10?1:0;
                charCount += runCount>=100?1:0;
                runCount = 1;
            } else if (mode == 'white' && $(this).hasClass('black')) {
                mode = 'black';
                runText += runCount + ', ';
                cellCount ++;
                charCount += 2;
                charCount += runCount>=10?1:0;
                charCount += runCount>=100?1:0;
                runCount = 1;
            } else if (mode == 'white' && !$(this).hasClass('black')) {
                runCount++;
                cellCount ++;
            }

            if (cellCount == gridSize) {
                runText += runCount;
                runText += gridSize > 26?"<hr>":"\n";
                charCount += 1;
                charCount += runCount>=10?1:0;
                charCount += runCount>=100?1:0;
            }
        }
      });
    $('#run-length').val(runText);
    $('#char-count').html(charCount);
}

String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}
