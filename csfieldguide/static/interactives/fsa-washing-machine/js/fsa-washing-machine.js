var fsa_washing_machine_config = {
  "current_state": "fast",
  "fast": "medium",
  "medium": "slow",
  "slow": "fast",
};


$(document).ready(function() {
    updateFSAWashingMachineInterface(fsa_washing_machine_config['current_state']);

    // When state button is clicked
    $('#interactive-fsa-washing-machine-change-state').click(function() {
        changeFSAWashingMachineState();
    });

  // On 'reset' button click
     $('#interactive-fsa-washing-machine-reset').click(function() {
        fsa_washing_machine_config['current_state'] = "fast";
        updateFSAWashingMachineInterface(fsa_washing_machine_config['current_state']);
     });
});


function changeFSAWashingMachineState() {
    previous_state = fsa_washing_machine_config["current_state"];
    fsa_washing_machine_config["current_state"] = fsa_washing_machine_config[previous_state];
    updateFSAWashingMachineInterface(fsa_washing_machine_config["current_state"]);
}


function updateFSAWashingMachineInterface(current_state) {
    $('#interactive-fsa-washing-machine-middle-rotate-container .rotate-layer').removeClass('animation-running');

    if (current_state == 'medium') {
      $('#interactive-fsa-washing-machine-medium').addClass('animation-running');
    } else if (current_state == 'slow') {
      $('#interactive-fsa-washing-machine-slow').addClass('animation-running');
    } else {
      $('#interactive-fsa-washing-machine-fast').addClass('animation-running');
    }

    var state_text = document.getElementById('interactive-fsa-washing-machine-current-state-text');
    state_text.innerHTML = current_state;    
}
