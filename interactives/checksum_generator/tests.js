/* 

//example test

function isEven(val) {
	return val%2 === 0;
}

test('isEven()', function() {
    ok(isEven(0), 'Zero is an even number');
    ok(isEven(2), 'So is two');
    ok(isEven(-4), 'So is negative four');
    ok(!isEven(1), 'One is not an even number');
    ok(!isEven(-7), 'Neither is negative seven');
})

*/



test('determineCheckDigitType()', function() {
	//ISBN10, IRD
	equal(determineCheckDigitType(0, 132, 11), 0);
	equal(determineCheckDigitType(0, 243, 11), 1);
	equal(determineCheckDigitType(0, 142, 11), 10);
	//ISBN13, EAN13, Credit Card
	equal(determineCheckDigitType(0, 120, 10), 0);
	equal(determineCheckDigitType(0, 101, 10), 1);
	equal(determineCheckDigitType(0, 209, 10), 9);
	//trains
	equal(determineCheckDigitType(0, 0, 0), 0);
	equal(determineCheckDigitType(2, 0, 0), 1);
});