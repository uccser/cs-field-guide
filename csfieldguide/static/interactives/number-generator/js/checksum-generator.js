/**
 * Checksum number generator
 * For use in CS Field Guide
 * Created by Hayley van Waas, University of Canterbury
 */


//default type
var code_type = "ISBN-10";

var example_codes = [];
var valid_code_count = 0;
var number = "";
var sum = 0;
var primary_weights = [3, 2, 7, 6, 5, 4, 3, 2];
var secondary_weights = [7, 4, 3, 2, 5, 2, 7, 6];
var isbn10_weights = [10, 9, 8, 7, 6, 5, 4, 3, 2];
var passport_weights = [7, 3, 1, 7, 3, 1];


//get the code_type whenever selected changes
$(document).ready(function () {
    $("#interactive-checksum-generator-type").change(function() {
        code_type = $(this).find(':selected').val();
    });

    $("#interactive-checksum-generator-generate").click(function(){
      example_codes = [];
      for (var a = 0; a < 5; a++) {
          chooseAlgorithm(code_type, a);
          number = "";
      }
      shuffleList();
      displayGeneratedExampleCodes();
    });
});


//decide which algorithm to use
function chooseAlgorithm(code_type, count){

    if (code_type == "ISBN-10") {
        ISBN10Generator(count);
    } else if (code_type == "GTIN-13") {
        GTIN13Generator(count);
    } else if (code_type == "tax-number") {
        TaxIDGenerator(count);
    } else if (code_type == "credit-card") {
        creditCardGenerator(count);
    } else if (code_type == "trains") {
        trainNumberGenerator(count);
    } else if (code_type == "passport-dates") {
        passportDateGenerator(count);
    }

    example_codes.push(number);

}


//decides if check digit should be calculated randomly or correctly
function determineCheckDigitType(count, sum, modulus){

    var check_digit_type = 0;

    if (count < 2) {
        check_digit_type = 0;
    } else if (count < 4) {
        check_digit_type = 1;
    } else {
        check_digit_type = Math.round(Math.random());
    }

    if (modulus == 0) { //this is a check for if train check digits are being calculated
        return check_digit_type;
    } else {
        return checkDigitCalculator(sum, modulus, check_digit_type);
    }

}


//calculates check digit
function checkDigitCalculator(sum, modulus, check_digit_type) {
    if (check_digit_type == 0) {
        return modulusCalculator(sum, modulus);
    } else {
        var ignore = modulusCalculator(sum, modulus);
        return randomCheckDigit(ignore);
    }

}


//calculates valid checkdigit
function modulusCalculator(sum, modulus) {
    return (sum%modulus).toString();
}


//generates random check digit
function randomCheckDigit(ignore){
    check_digit = (Math.floor(Math.random()*10)).toString();
    if (check_digit == ignore) {
        randomCheckDigit(ignore);
    }
    return check_digit;
}


//generate random numbers for start of code
function generateRandomDigits(count) {
    for (var i = 0; i < count; i++){
        number += (Math.floor(Math.random()*10)).toString();
    }
}


//generates random ISBN-10 numbers
function ISBN10Generator(count) {

    //generates 9 random numbers
    generateRandomDigits(9);

    sum = 0;
    //calculates the sum of the 12 digits - according to the ISBN13 algorithm
    //odd indexed digits  = *1, even indexed digits = *3
    calculateSumWithWeights(isbn10_weights);
    check_digit = 11 - determineCheckDigitType(count, sum, 11);
    ISBN10CheckDigit(check_digit);

}


//checks if checkdigit is integer or "X" for ISBN10
function ISBN10CheckDigit(check_digit) {
    if (check_digit == "11") {
        number += "0";
    } else if (check_digit == "10") {
        number += "X";
    } else {
        number += check_digit;
    }
}


//generates random GTIN-13 numbers
function GTIN13Generator(count) {

    //generates 12 random numbers
    generateRandomDigits(12);

    sum = 0;

    //calculates the sum of the 12 digits
    //odd indexed digits  = *1, even indexed digits = *3
    for (var i in number) {
        if (i%2 == 0) {
            sum += parseInt(number[i]);
        } else {
            sum += parseInt(number[i]) * 3;
        }
    }

    check_digit = 10 - determineCheckDigitType(count, sum, 10);

    if (check_digit == "10"){
        check_digit = "0";
    }

    number += check_digit;
}


//generates random credit card numbers
function creditCardGenerator(count) {
    //generate random 15 digits
    generateRandomDigits(15);

    //calculates the sum of the 15 digits
    //odd indexed digits  = *2, even indexed digits = *1

    sum = 0;
    var temp = 0;

    for (var i in number) {
        if (i%2 == 1) {
            sum += parseInt(number[i]);
        } else {
            temp = parseInt(number[i]) * 2;
            if (temp > 9) {
                temp -= 9;
            }
            sum += temp;
        }
    }

    number +=  determineCheckDigitType(count, sum, 10);

}


//generates random train code
function trainNumberGenerator(count) {

    generateRandomDigits(11);

    //calculates the sum of the 12 digits
    //odd indexed digits  = *2, even indexed digits = *1
    sum = 0;
    for (var i in number) {
        if (i%2 == 1) {
            sum += parseInt(number[i]);
        } else {
            sum += parseInt(number[i]) * 2;
        }
    }
    check_digit = 10 - determineCheckDigitType(count, sum, 10);
    if (check_digit == 10) {
        number += "0";
    } else {
        number += check_digit;
    }

}

//generates random date for passport checksums
function generateDate() {

    var start_date = new Date(1900, 1, 1);

    date = new Date(start_date.getTime() + Math.random() * (Date.now() - start_date.getTime()));
    var year = date.getYear();

    if (year > 99) {
        generateDate(); //recursive NOTE: *very small* possibility that this could recursively call itself multiple times
    } else {
        if (year < 10) {
            year = "0" + year.toString();
        } else {
            year = year.toString();
        }

        var month = date.getMonth();
        if (month < 10) {
            month = "0" + month.toString();
        } else {
            month = month.toString();
        }
        var day = date.getDay();
        if (day < 10) {
            day = "0" + day.toString();
        } else {
            day = day.toString();
        }
        number = year + month + day;
    }
}

//generates random passport date
function passportDateGenerator(count) {
    generateDate();

    //calculate sum of the 6 digits using passport weights
    sum = 0;
    calculateSumWithWeights(passport_weights);
    number += determineCheckDigitType(count, sum, 10);

}

//generate the first 8 numbers
function TaxIDGenerator(count) {
    generateRandomDigits(8);
    TaxIDCheckDigit(primary_weights, count, 0);
}


//calculates the check digit for a Tax ID number
//NOTE: there is a (very) small probability that this function is repeated infinitely
function TaxIDCheckDigit(weights, count, repeat_count) {

    sum = 0;
    sum = calculateSumWithWeights(weights);
    check_digit = determineCheckDigitType(count, sum, 11); //returns a string
    if (check_digit == "0") {
        number += check_digit;
    } else {
        check_digit = 11 - parseInt(check_digit);
        if (check_digit != "10") {
            number += check_digit.toString();
        } else {
            if (repeat_count == 0) {
                TaxIDCheckDigit(secondary_weights, count, repeat_count+1);
            } else {
                number = "";
                TaxIDGenerator(count);
            }
        }
    }

}


//caclulates sum based on weights
function calculateSumWithWeights(weights) {
    sum = 0;
    for (var i in number) {
        sum += parseInt(number[i] * weights[i], 10);
    }
    return sum;
}


//shuffle the list
function shuffleList() {

    var m = example_codes.length, t, i;

    //while there are still elements to shuffle
    while (m) {
        //pick a remaining element
        i = Math.floor(Math.random() * m--);

        //and swap it with the current element
        t = example_codes[m];
        example_codes[m] = example_codes[i];
        example_codes[i] = t;
    }
}


//display generated codes on page
function displayGeneratedExampleCodes() {

    var code_textbox = document.getElementById("interactive-checksum-generator-codes");

    var code_text = "";
    for (index = 0; index < example_codes.length; ++index) {
      code_text += example_codes[index];
      if (index < example_codes.length - 1) {
        code_text += '\n';
      }
    }

    code_textbox.value = code_text;

}
