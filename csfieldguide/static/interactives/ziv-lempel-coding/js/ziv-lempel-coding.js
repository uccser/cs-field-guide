/* var string = `
I am Sam, 
Sam I am.
That Sam-I-am! That Sam-I-am!
I do not like that Sam-I-am! 
Do you like green eggs and ham?
I do not like them, Sam-I-am.
I do not like green eggs and ham.
  `;
  */
window.onload = function() {

    var message = 'i am sam sam i am that sam-i-am that sam-i-am';
    // var message = `iamsamsamiamthatsam-i-amthatsam-i-am`;

    // message = message.replace(/[\r\n]+/g, '');
    message = message.split('');
    console.log(message);


    var positions = {};
    var max_match_length = 5;
    var min_match_length = 3;

    var start_message = message.splice(0, max_match_length);
    console.log(start_message);
    console.log(message);

    // REPEAT
    var longest_match_position;
    for (var i = 0; i < positions.length; i++) {
        console.log(positions[i]);
        console.log(i);
    //     if i == positions.lengt
        // check if start_string in dictionary
            // record spot in dictionary and how many characters in dict string
            // if longer than last match, replace the last match
    }
    // if match found is greater than or equal to min match length
        // add the offset and length to encoded output
    // else 
        // add the first unencoded symbol to the encoded output

    // shift a copy of the symbols written to the encoded output from the
    //    unencoded string to the dictionary

    // read in num of characters (same length as substring found)

    // END REPEAT when whole string is encoded
}



/*

// var positions = {};
positions = []
for (var i = 0; i < string.length; i++){
//   positions[string[i]] = i;
    var char = string[i];
    if (positions.indexOf(char) == -1) {
        positions.push(char);
    }
}

// var p = string.splice(0, 1)[0]; // first character
var p = string[0];
var index = 1;

// while (string.length > 0) {
while (index < string.length) {
    
    // var c = string.splice(0,1);
    var c = string[index];
    var next_string = p + c;

    // if next_string already in dictionary
    // if (positions.hasOwnProperty(next_string)) {
    if (positions.indexOf(next_string) != -1) {
        p = next_string;
    } else {
        // positions[next_string] = index;
        positions.push(next_string);
        p = c;
    }

    index += 1;
}

// for (var i = 0; i < string.length; i++){
//   positions[string[i]] = i;
// }
// var p = string[0];
// var index = 0;
// while (index < string.length) {
//     var c = string[index+1];
//     var next_string = p + c;
//     if (positions.hasOwnProperty(next_string)) {
//         p = next_string;
//     } else {
//       positions[next_string] = index;
//       p = c;
//     }
//     index += 1;
// }

console.log(positions);


  /*     PSEUDOCODE
  1     Initialize table with single character strings
  2     P = first input character
  3     WHILE not end of input stream
  4          C = next input character
  5          IF P + C is in the string table
  6            P = P + C
  7          ELSE
  8            output the code for P
  9          add P + C to the string table
  10           P = C
  11         END WHILE
  12    output code for P
  */
