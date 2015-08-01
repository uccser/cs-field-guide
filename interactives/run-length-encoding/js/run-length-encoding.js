$(document).ready(function(){
    //Toggle pixel on click
    $('#clear-all').on('click', function(){
       $('.pixel').removeClass('black');
       updateRunLengthValues();
    });

    //Invert
    $('#invert').on('click', function(){
       $('.pixel').toggleClass('black');
       updateRunLengthValues();
    });

    //On "toggle" provide a text box and on keyup update grid (delegated)
    // $('#run-length').on('click', '#edit', function(event){
    //     //alert('clicked');
    //     var runText = $('#run-length').html();
    //     runText = runText.replace('<button id="edit">Edit</button>', '');
    //     runText = runText.replace(/<br>/g, "\n");
    //     runText = runText.replace(/<hr>/g, "\n");
    //
    //     var newText = '<textarea id="run-length-text">' + runText + '</textarea>';
    //     $('#run-length').html(newText);
    // });

    //On key up, update squares (delegated)
    $('#run-length').bind('input propertychange', function(){
       //alert('keyed!');
       updateGrid();
    });

    // Bind toggle events to pixel divs
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
        //Append it to container div as class
        $('#container').removeClass();
        $('#container').addClass(gridSize);
        $('#bit-count').html('Number of bits for grid: ' + (gridSize*gridSize));
        charCount = gridSize >= 10?2*gridSize:gridSize;
        charCount = gridSize >= 100? parseInt(charCount)+parseInt(gridSize):charCount;
        $('#char-count').html('Number of characters for run length encoding: ' + charCount);

        var i = 0;
        var containerHTML = "";
        //DO columns
        for(i==0; i<gridSize; i++){
            var j = 0;
            //Do rows
            containerHTML += '<div class="flex-container">';
            for(j==0; j<gridSize; j++) {
                //$('#container').append(newDiv);
                containerHTML += '<div class="flex-item pixel"></div>';
                //console.log('j='+j);
            }
            containerHTML += '</div>';
        }

        $('#container').html(containerHTML);

        //Set initial run length text
        runText = "";
        for (i=0; i<gridSize; i++) {
            runText += gridSize;
            if (i < gridSize - 1) {
              runText += '\n';
            }
        }

        //Insert into div
        $('#run-length').html(runText);

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
        //code

        //delete blank values from array
        for(var i = 0; i < array.length; i++){
            //array[i] = myarray[i].trim();
            if(array[i] == "" ){
                //alert('blank');
                array.splice(i,1);
                //break;
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
    var debug = false;
    //var charCount = 0;

    //Get the values from keyup
    var runText = $('#run-length').val();
    console.log(runText);

    //Split into array based on new lines, remove blank entries
    lines = runText.split('\n')
    lines = cleanArray(lines, 'lines');
    //console.log(lines);

    //Check how many lines, append gridSize first based on how many lines have no number - error if more than gridSize
    numLines = lines.length;
    //console.log(numLines);

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

            //total = runNums.reduce(function(previousValue, currentValue, index, array) {
            //    return parseInt(previousValue) + parseInt(currentValue);
            //});
            total = 0;
            for (var j in runNums) {
                //code
                total += parseInt(runNums[j]);
            }
            //alert(total + "," + gridSize);

            if (total > gridSize) {
                //Error
                alert("Woops! Your numbers add up to more than the size of your grid.  Try lowering the numbers or making your grid bigger!");
                break;
            } else {
                //Add to full run array
                fullRun[i] = runNums;
                //console.log(fullRun);

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

        $('#char-count').html('Number of characters for run length encoding: ' + charCount);

        //console.log(fullRun);

        runIndex = 0;
        cellCount = 0;
        start = true;
        rowIndex = 0;
        runCount = 0;

        //Loop through each pixel, using counters and limits from array of numbers
        $('.pixel').each(function(){
            //$('#char-count').html('Number of characters for run length encoding: ' + charCount);
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
                    //console.log("zero white");
                } else {
                    if ($(this).hasClass('black')) {
                        //code
                        $(this).toggleClass('black');
                    }
                    //console.log("starts white");
                    runCount++;
                }
                start = false;
                cellCount++;
            } else {
                //console.log('not start, run lngth at row ' + rowIndex + 'and run ' + runIndex + '= ' + fullRun[rowIndex][runIndex])
                if (mode == 'white' && runCount < fullRun[rowIndex][runIndex]) {
                    //code
                    //console.log("added a white");
                    if ($(this).hasClass('black')) {
                        //code
                        $(this).toggleClass('black');
                    }
                    runCount++;
                } else if (mode == 'black' && runCount < fullRun[rowIndex][runIndex]) {
                    //code
                    //console.log("added a black");
                    if (!$(this).hasClass('black')) {
                        //code
                        $(this).toggleClass('black');
                    }
                    runCount++;
                } else if (mode == 'white' && runCount == fullRun[rowIndex][runIndex]) {
                    //code
                    //console.log("end of white run, added black");
                    mode = 'black';
                    if (!$(this).hasClass('black')) {
                        //code
                        $(this).toggleClass('black');
                    }
                    runCount++;
                    runCount = 1;
                    runIndex++;
                } else if (mode == 'black' && runCount == fullRun[rowIndex][runIndex]) {
                    //code
                    //console.log("end of black run, added white");
                    mode = 'white';
                    if ($(this).hasClass('black')) {
                        //code
                        $(this).toggleClass('black');
                    }
                    runCount++;
                    runCount = 1;
                    runIndex++;
                }
                cellCount++;
               if (cellCount == gridSize) {
                    //code
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
    //code
    var gridSize = $('#container').attr('class');

    var runText = "";
    var runCount = 0;
    var mode = 'white';
    var rowCount = 0;
    var cellCount = 0;
    var start = true;
    var debug = false;
    var charCount = 0;
    //console.log('gridsize: '+gridSize);
    //var end = false;

    $('.pixel').each(function(){
        //console.log('pxel each function');
        if (cellCount == gridSize) {
            //code
            start = true;
            cellCount = 0;
            rowCount++;
            runCount = 0;
            mode ='white';
            //console.log('end row or grid');
        }
        if (start == true) {
            //console.log('start');
            if($(this).hasClass('black')){
                runText += debug?"white: " + 0 + ", ":0 + ", ";
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
            //console.log('not start');

            //console.log('middle row or grid');
            if (mode == 'black' && $(this).hasClass('black')){
                //code
                runCount++;
                cellCount ++;


            } else if (mode == 'black' && !$(this).hasClass('black')) {
                //code
            //console.log('A1 runcount: '+runCount+'charcount: '+charCount);
                mode = 'white';
                runText += debug?'black' + runCount + ', ':runCount + ', ';
                cellCount ++;
                charCount += 2;//(cellCount == gridSize)?1:2;
                charCount += runCount>=10?1:0;
                charCount += runCount>=100?1:0;
            //console.log('A2 runcount: '+runCount+'charcount: '+charCount);
                runCount = 1;


            } else if (mode == 'white' && $(this).hasClass('black')) {
                //code
            //console.log('B1 runcount: '+runCount+' charcount: '+charCount);
                mode = 'black';
                runText += debug?'white' + runCount + ', ':runCount + ', ';
                cellCount ++;
                charCount += 2;//(cellCount == gridSize)?1:2;
            //console.log("bonus charcount" + charCount);
                charCount += runCount>=10?1:0;
                charCount += runCount>=100?1:0;
           // console.log('B2 runcount: '+runCount+' charcount: '+charCount);
                runCount = 1;


            } else if (mode == 'white' && !$(this).hasClass('black')) {
                //code
                runCount++;
                cellCount ++;
            }

            if (cellCount == gridSize) {
                //code
            //console.log('C1 runcount: '+runCount+' charcount: '+charCount);
                runText += debug?mode + ":"+ runCount + "\n":runCount;
                runText += gridSize > 26?"<hr>":"\n";
                charCount += 1;
                charCount += runCount>=10?1:0;
                charCount += runCount>=100?1:0;
                //console.log(runText);
            //console.log('C2 runcount: '+runCount+' charcount: '+charCount);
            }

        }
        //console.log('charcount'+charCount)
        //console.log('runcount:'+runCount+' cellcount'+cellCount+' mode'+mode+' rowcount: '+rowCount);
    });
    //console.log(runText);
    $('#run-length').val(runText);
    $('#char-count').html('Number of characters for run length encoding: ' + charCount);
}

String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
}
