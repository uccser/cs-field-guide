var fsa_light_config;

$(document).ready(function() {
  loadConfig();

  // When state button is clicked
  $('#interactive-fsa-light-buttons').on('click', '.btn', function(event) {
    var button_text = $(this).text();
    changeState(button_text);
    updateInterface();
  });

  // On 'reset' button click
  $('#interactive-parity-clear-all').on('click', function(){
    clearGrid();
  });
});

function loadConfig() {
  var config_name = getUrlParameter('config');
  if (config_name) {
    var config_path = 'config/' + config_name + '.json'
    $.ajax({
      dataType: "json",
      url: config_path,
      success: function(config_data) {
        fsa_light_config = config_data;
        setupInterface();
        updateInterface();
      },
      error: function() {
        alert('Config file not found!');
      },
      timeout: 3000
    })
  } else {
    alert('No config file provided as parameter!');
  }
}


function setupInterface() {
  var button_container = $('#interactive-fsa-light-buttons');
  var available_buttons = fsa_light_config['available_buttons'];
  for (var i = 0; i < available_buttons.length; i++) {
    var button = document.createElement('a');
    button.className = 'btn waves-effect waves-light blue';
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
