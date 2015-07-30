$(document).ready(function(){
    //Toggle pixel on click
    $('#clear-all').on('click', function(){
       $('.pixel').removeClass('black');
       updateRun();
    });

    //Invert
    $('#invert').on('click', function(){
       $('.pixel').toggleClass('black');
       updateRun();
    });

    //On "toggle" provide a text box and on keyup update grid (delegated)
    $('#run-length').on('click', '#edit', function(event){
        //alert('clicked');
        var runText = $('#run-length').html();
        runText = runText.replace('<button id="edit">Edit</button>', '');
        runText = runText.replace(/<br>/g, "\n");
        runText = runText.replace(/<hr>/g, "\n");

        var newText = '<textarea id="run-length-text">' + runText + '</textarea>';
        $('#run-length').html(newText);
    });

    //On key up, update squares (delegated)
    $('#run-length').keyup('#run-length-text', function(event){
       //alert('keyed!');
       updateGrid();
    });
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
        var runText = $('#run-length-text').val();
        //console.log(runText);

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
                    console.log(fullRun);

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
    function updateRun() {
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
                    runText += gridSize > 26?"<hr>":"<br>";
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
        $('#run-length').html('<button id="edit">Edit</button><br>' + runText);
        $('#char-count').html('Number of characters for run length encoding: ' + charCount);
    }

    //Bind click events to dynamic divs using delegation
    $('#container').on('click', '.pixel', function (event) {
        $(this).toggleClass('black');
        updateRun();
    })

    //////////////////URGENT fix charcount for when values are double or triple digits (or limit at 99 instead!)///////
    //Set up grid on click
    $('#grid-size-btn').on('click', function(){

        //Get grid Size
        var gridSize = $('#grid-size').val();

        if (gridSize > 150 || gridSize < 0 || isNaN(gridSize)) {
            //Error
            alert('Please enter a value between 0 and 100');
        } else {
             //Show text box
            $('#run-length').show();

            //Append it to container div as class
            $('#container').removeClass();
            $('#container').addClass(gridSize);
            $('#bit-count').html('Number of bits for grid: ' + (gridSize*gridSize));
            charCount = gridSize >= 10?2*gridSize:gridSize;
            charCount = gridSize >= 100? parseInt(charCount)+parseInt(gridSize):charCount;
            $('#char-count').html('Number of characters for run length encoding: ' + charCount);

            var width = (600 / gridSize) - 2;

            var i = 0;
            var newDivs = "";
            //DO columns
            for(i==0; i<gridSize; i++){
                //console.log('i='+i);
                var j = 0;
                //Do rows
                for(j==0; j<gridSize; j++) {

                    //$('#container').append(newDiv);
                    newDivs += '<div class="pixel"></div>';
                    //console.log('j='+j);
                }
            }

            $('#container').html(newDivs);

            //Set initial run length text
            runText = "";
            var i = 0;
            for (i==0; i<gridSize; i++) {
                //code
                runText += gridSize;
                runText += gridSize > 26?"<hr>":"<br>";
            }

            //Insert into div
            $('#run-length').html('<button id="edit">Edit</button><br>' + runText);

            $('.pixel').css({
                'width': width,
                'height': width
                });

            if (gridSize <= 10) {
                //code
                fontSize = 35;
            } else if (gridSize > 10 && gridSize <= 15) {
                //code
                fontSize = 25;
            } else if (gridSize > 15 && gridSize <= 20) {
                //code
                fontSize = 19;

            } else if (gridSize > 20 && gridSize <= 40) {
                //code
                fontSize = 14;
            }
            $('#run-length').css('font-size',fontSize);

        }
    });

    //For each row
    $('.pixel').on('click', function(gridSize){
        //var gridSize = $('#container').attr('class');

    });
});
