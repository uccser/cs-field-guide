var fsa_washing_machine_config = {
  "available_buttons": ["Change spin speed"],
  "initial_state": "Fast spin",
  "states": {
    "Fast spin": {
      "speed": "fast",
      "destinations": {
        "Change spin speed": "Medium spin"
      }
    },
    "Medium spin": {
      "speed": "medium",
      "destinations": {
        "Change spin speed": "Slow spin"
      }
    },
    "Slow spin": {
      "speed": "slow",
      "destinations": {
        "Change spin speed": "Fast spin"
      }
    }
  }
};


$(document).ready(function() {
    setupInterface();
    updateInterface();

    // When state button is clicked
    $('#interactive-fsa-washing-machine-buttons').on('click', '.btn', function(event) {
        var button_text = $(this).text();
        changeState(button_text);
        updateInterface();
    });

  // On 'reset' button click
     $('#interactive-fsa-washing-machine-reset').on('click', function(){
        fsa_washing_machine_config['current_state'] = fsa_washing_machine_config['initial_state'];
        updateInterface();
     });
});


function setupInterface() {
    var button_container = $('#interactive-fsa-washing-machine-buttons');
    var available_buttons = fsa_washing_machine_config['available_buttons'];
    for (var i = 0; i < available_buttons.length; i++) {
        var button = document.createElement('a');
        button.className = 'btn waves-effect waves-light blue';
        button.innerHTML = available_buttons[i];
        button_container.append(button);
    }
    fsa_washing_machine_config['current_state'] = fsa_washing_machine_config['initial_state'];
}


function changeState(button_text) {
    var states = fsa_washing_machine_config['states']
    fsa_washing_machine_config['current_state'] = states[fsa_washing_machine_config['current_state']]['destinations'][button_text]
}


function updateInterface() {
    var current_state = fsa_washing_machine_config['current_state'];
    var current_washing_machine_state = fsa_washing_machine_config['states'][current_state]['speed'];

    $('#interactive-fsa-washing-machine-middle-rotate-container .rotate-layer').removeClass('animation-running');
    if (current_washing_machine_state == 'medium') {
        $('#interactive-fsa-washing-machine-medium').addClass('animation-running');
    } else if (current_washing_machine_state == 'slow') {
        $('#interactive-fsa-washing-machine-slow').addClass('animation-running');
    } else {
        $('#interactive-fsa-washing-machine-fast').addClass('animation-running');
    }

    var state_text = document.getElementById('interactive-fsa-washing-machine-current-state-text');
    state_text.innerHTML = current_washing_machine_state;
}
