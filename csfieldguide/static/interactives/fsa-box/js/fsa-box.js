var fsa_box_config;

$(document).ready(function() {
  var config_name = getUrlParameter('config') || 'example-1';
  loadConfig(config_name);

  // When state button is clicked
  $('#interactive-fsa-box-buttons').on('click', '.btn', function(event) {
    var button_text = $(this).text();
    changeState(button_text);
    updateInterface();
  });

  // On 'reset' button click
  $('#interactive-fsa-box-reset').on('click', function(){
    fsa_box_config['current_state'] = fsa_box_config['initial_state'];
    updateInterface();
  });
});

function loadConfig(config_name) {
  var config_path = 'config/' + config_name + '.json'
  $.ajax({
    dataType: "json",
    url: config_path,
    success: function(config_data) {
      fsa_box_config = config_data;
      setupInterface();
      updateInterface();
    },
    error: function() {
      alert('Config file not found!');
    },
    timeout: 3000
  })
}


function setupInterface() {
  var button_container = $('#interactive-fsa-box-buttons');
  var available_buttons = fsa_box_config['available_buttons'];
  for (var i = 0; i < available_buttons.length; i++) {
    var button = document.createElement('a');
    button.className = 'btn waves-effect waves-light blue';
    button.innerHTML = available_buttons[i];
    button_container.append(button);
  }
  fsa_box_config['current_state'] = fsa_box_config['initial_state'];
}


function changeState(button_text) {
  var states = fsa_box_config['states']
  fsa_box_config['current_state'] = states[fsa_box_config['current_state']]['destinations'][button_text]
}


function updateInterface() {
  var current_state = fsa_box_config['current_state'];
  var current_box_state = fsa_box_config['states'][current_state]['box'];
  var current_state_box = document.getElementById('interactive-fsa-box-current-state');
  if (current_box_state == 'Accepted') {
    current_state_box.innerHTML = 'Accepted';
    current_state_box.className = 'accepted';
  } else {
    current_state_box.innerHTML = 'Not accepted';
    current_state_box.className = '';
  }
  var state_text = document.getElementById('interactive-fsa-box-current-state-text');
  state_text.innerHTML = current_state;
}


// From jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
