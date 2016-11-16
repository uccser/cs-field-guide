
function calculate() {
    var xValue = document.getElementById('x').value;

    document.getElementById('sin-result').innerText = Math.sin(xValue);
    document.getElementById('cos-result').innerText = Math.cos(xValue);
}
