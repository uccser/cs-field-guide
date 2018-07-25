function calculate() {
    var xValue = document.getElementById('x').value;
    // convert to radians
    xValue *= Math.PI / 180;

    // calcuate sin(x) (where x is given in radians)
    var sinResult = Math.sin(xValue);
    var cosResult = Math.cos(xValue);

    // round to 9 dp (arbitrary number small enough to
    // avoid floating point errors but large enough for accuracy)
    sinResult = Math.round(sinResult * Math.pow(10, 9)) / Math.pow(10, 9);
    cosResult = Math.round(cosResult * Math.pow(10, 9)) / Math.pow(10, 9);

    if (isNaN(sinResult)) {
        document.getElementById('error').style.display = 'block';
    } else {
        document.getElementById('error').style.display = 'none';
        document.getElementById('sin-result').innerText = sinResult;
        document.getElementById('cos-result').innerText = cosResult;
    }
}

$("#calculate").click(function() {
  calculate();
});
