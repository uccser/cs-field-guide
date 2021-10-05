$('#half').click(function() {
	var power = document.getElementById("compPower").innerHTML;
	var intPower = parseFloat(power.replace(/,/g, ''));
	var newPower = Math.floor(intPower/2);
	var newPowerString = newPower.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	if (newPower > 0) {
		document.getElementById("compPower").innerHTML = newPowerString;
	}
});

$('#double').click(function() {
	var power = document.getElementById("compPower").innerHTML;
	var intPower = parseFloat(power.replace(/,/g, ''));
	var newPower = intPower * 2
	var newPowerString = newPower.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	if (newPower > 0) {
		document.getElementById("compPower").innerHTML = newPowerString;
	}
});

$('#crackButton').click(function() {
	crack();
});

function clear() {
	document.getElementById("timeToCrack").innerHTML = "";
}

function createString(timeInSeconds, timeInMinutes, timeInHours, timeInDays, timeInMonths, timeInYears) {
	var totalString = "";
	if (timeInYears > 0) {
		if (timeInYears > 1) {
			totalString += timeInYears + " years ";
		}
		else {
			totalString += timeInYears + " year ";
		}
	}
	if (timeInMonths > 0) {
		if (timeInMonths > 1) {
			totalString += timeInMonths + " months ";
		}
		else {
			totalString += timeInMonths + " month ";
		}
	}
	if (timeInDays > 0) {
		if (timeInDays > 1) {
			totalString += timeInDays + " days ";
		}
		else {
			totalString += timeInDays + " day ";
		}
	}
	if (timeInHours > 0) {
		if (timeInHours > 1) {
			totalString += timeInHours + " hours ";
		}
		else {
			totalString += timeInHours + " hour ";
		}
	}
	if (timeInMinutes > 0) {
		if (timeInMinutes > 1) {
			totalString += timeInMinutes + " minutes ";
		}
		else {
			totalString += timeInMinutes + " minute ";
		}
	}
	if (timeInSeconds > 1 || timeInSeconds == 0) {
		totalString += timeInSeconds + " seconds";
	}
	else {
		totalString +=  + timeInSeconds + " second";
	}
	document.getElementById("timeToCrack").innerHTML = totalString;
}

function convertToMaxTime(timeInSeconds) {
	var timeInMinutes = 0;
	var timeInHours = 0;
	var timeInDays = 0;
	var timeInMonths = 0;
	var timeInYears = 0;
	var totalString = ""
	if (timeInSeconds >= 60) {
		timeInMinutes = Math.floor(timeInSeconds / 60);
		timeInSeconds = timeInSeconds % 60;
		if (timeInMinutes >= 60) {
			timeInHours = Math.floor(timeInMinutes / 60);
			timeInMinutes = timeInMinutes % 60;
			if (timeInHours >= 24) {
				timeInDays = Math.floor(timeInHours / 24);
				timeInHours = timeInHours % 24;
				if (timeInDays >= 30) {
					timeInMonths = Math.floor(timeInDays / 30);
					timeInDays = timeInDays % 30;
					if (timeInMonths >= 12) {
						timeInYears = Math.floor(timeInMonths / 12);
						timeInMonths = timeInMonths % 12;
					}
				}
			}
		}
	}
	createString(timeInSeconds, timeInMinutes, timeInHours, timeInDays, timeInMonths, timeInYears);
}

function crack() {
	var combinations = 0;
	var power = document.getElementById("compPower").innerHTML;
	var intPower = parseFloat(power.replace(/,/g, ''));
	var input = document.getElementById("psw").value;
	var allNumbers = /^[0-9_\-]+$/;
	var allLower = /^[a-z_\-]+$/;
	var allUpper = /^[A-Z_\-]+$/;
	var lowerAndNum = /^[a-z0-9_\-]+$/;
	var upperAndNum = /^[A-Z0-9_\-]+$/;
	var lowerAndUpperAndNum = /^[A-Za-z0-9_\-]+$/;
	if (allNumbers.test(input)) {
		combinations = Math.pow(10, input.length);
	}
	else if (allLower.test(input) || allUpper.test(input)) {
		combinations = Math.pow(26, input.length);
	}
	else if (lowerAndNum.test(input) || upperAndNum.test(input)) {
		combinations = Math.pow(36, input.length);
	}
	else if (lowerAndUpperAndNum.test(input)) {
		combinations = Math.pow(62, input.length);
	}
	else {
		combinations = Math.pow(92, input.length);
	}
	clear();
	var timeInSeconds = combinations/intPower;
	if (timeInSeconds > 1) {
		timeInSeconds = Math.floor(timeInSeconds);
		convertToMaxTime(timeInSeconds);
	}
	else {
		document.getElementById("timeToCrack").innerHTML = timeInSeconds + " seconds";
	}
}
