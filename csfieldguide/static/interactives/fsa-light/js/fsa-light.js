$(document).ready(function() {

  setupInterface();
  updateInterface();

  // When state button is clicked
  $('#interactive-fsa-light-buttons').on('click', '.btn', function(event) {
    var button_text = $(this).text();
    changeState(button_text);
    updateInterface();
  });

  // On 'reset' button click
  $('#interactive-fsa-light-reset').on('click', function(){
    fsa_light_config['current_state'] = fsa_light_config['initial_state'];
    updateInterface();
  });
});


function setupInterface() {
  var button_container = $('#interactive-fsa-light-buttons');
  var available_buttons = fsa_light_config['available_buttons'];
  for (var i = 0; i < available_buttons.length; i++) {
    var button = document.createElement('button');
    button.className = 'btn btn-primary btn-lg';
    button.innerHTML = available_buttons[i];
    button_container.append(button);
  }
  fsa_light_config['current_state'] = fsa_light_config['initial_state'];
}


function changeState(button_text) {
  var states = fsa_light_config['states']
  fsa_light_config['current_state'] = states[fsa_light_config['current_state']]['destinations'][button_text]
}


function updateInterface() {
  var current_state = fsa_light_config['current_state'];
  var current_light_state = fsa_light_config['states'][current_state]['light'];
  var light_image = document.getElementById('interactive-fsa-light-bulb-on');
  if (current_light_state == 'Off') {
    light_image.className = 'hide-bulb';
  } else {
    light_image.className = '';
  }
  var state_text = document.getElementById('interactive-fsa-light-current-state-text');
  state_text.innerHTML = current_light_state;
}
