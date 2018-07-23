const Sk = require("skulpt");

$(document).ready(function () {
    $("#interactive-python-interpreter-run").click(function(){
        var program = document.getElementById("interactive-python-interpreter-code").value;
        var output = document.getElementById("interactive-python-interpreter-output");
        output.innerHTML = '';
        Sk.configure({output:skuplt_out});
        try {
            Sk.importMainWithBody("<stdin>", false, program);
        } catch (e) {
            alert(e);
        }
    });

    function skuplt_out(text) {
        var output = document.getElementById("interactive-python-interpreter-output");
        text = text.replace(/</g, '&lt;');
        output.innerHTML = output.innerHTML + text;
    }

    var program = document.getElementById("interactive-python-interpreter-code");
    program.value = 'print("**********************************************")\n'
    program.value += 'print("**********************************************")\n'
    program.value += 'print("** ' + py_interpreter_il8n["welcome"] + ' **")\n'
    program.value += 'print("**********************************************")\n'
    program.value += 'print("**********************************************")\n'
});
