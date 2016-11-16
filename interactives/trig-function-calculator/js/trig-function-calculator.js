
function calculate() {
    var xValue = document.getElementById('x').value;

    var sinResult = Math.sin(xValue);
    var cosResult = Math.cos(xValue);

    if (isNaN(sinResult)) {
        document.getElementById('error').style.display = 'block';
    } else {
        document.getElementById('error').style.display = 'none';
        document.getElementById('sin-result').innerText = sinResult;
        document.getElementById('cos-result').innerText = cosResult;
    }
}
