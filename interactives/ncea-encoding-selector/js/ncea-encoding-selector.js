ncea_encoding_selector = [
  {
    "name": "Encoding",
    "levels": [
      {
        "name": "Achieved",
        "max": 3,
      },
      {
        "name": "Merit / Excellence",
        "max": 1,
      }
    ],
    "structure": {
      "Error Control Coding": {
        "Achieved": [
          "Check Sums",
          "Parity"
        ],
        "Merit / Excellence": [
          "M/E Placeholder",
          "M/E Placeholder",
          "M/E Placeholder"
        ]
      },
      "Encryption": {
        "Achieved": [
          "Caesar Cipher",
          "Achieved Placeholder",
          "Achieved Placeholder"
        ],
        "Merit / Excellence": [
          "M/E Placeholder",
          "M/E Placeholder",
          "M/E Placeholder"
        ]
      },
      "Compression": {
        "Achieved": [
          "Run Length Encoding",
          "Achieved Placeholder"
        ],
        "Merit / Excellence": [
          "M/E Placeholder"
        ]
      }
    },
    "settings": {
      "max-topic": 1,
      "max-total": 3
    }
  },
  {
    "name": "Human Computer Interaction",
    "levels": [
      {
        "name": "Achieved",
        "max": 1,
      },
      {
        "name": "Merit / Excellence",
        "max": 1,
      }
    ],
    "structure": {
      "Heuristics": {
        "Achieved": [
          "Identifying heuristic violations in every day life"
        ],
        "Merit / Excellence": [
          "Evaluating an interface with heuristics "
        ]
      }
    },
    "settings": {
      "max-topic": 1,
      "max-total": 1
    }
  }
]

$(document).ready(function(){
  $('#interactive-ncea-encoding-selector').on('click', '.selectable-item', function(event) {
    $selectable_item = $(this);
    var update = false;
    // If item is already selected
    if ($selectable_item.hasClass('selected')) {
      $selectable_item.removeClass('selected');
      update = true;
    }
    // Else if item is not disabled
    else if (!$selectable_item.hasClass('disabled')) {
      $selectable_item.addClass('selected');
      update = true;
    }
    if (update) {
      var counts = countValues();
      updateGrid($selectable_item.closest('.selector'), counts);
      updateFeedback();
    }
  });

  createGrids();
});

function createGrids() {
  $selector_container = $('#selector-container');
  $selector_container.empty();

  for (var j = 0; j < ncea_encoding_selector.length; j++) {
    var grid_data = ncea_encoding_selector[j];

    var structure = grid_data["structure"];
    var levels = grid_data['levels'];
    grid_data['elements'] = {};
    $selector = $('<div class="selector"></div>');
    $selector.data('grid_data', grid_data);

    $achievement_level_row = $('<div class="flex-container"></div>');
    $title_cell = $('<div class="flex-item flex-item-title"></div>');
    $title_cell.html(grid_data["name"]);
    $achievement_level_row.append($title_cell);
    for (var i = 0; i < levels.length; i++) {
      $achievement_level = $('<div class="flex-item heading"></div>');
      $achievement_level.html(levels[i]['name']);
      $achievement_level.data('level', levels[i]['name']);
      grid_data['settings']['max-'+levels[i]['name']] = levels[i]['max'];
      $achievement_level_row.append($achievement_level);
      grid_data['elements'][levels[i]['name']] = [];
    }
    $selector.append($achievement_level_row);

    for (var topic_name in structure) {
      $topic_row = $('<div class="flex-container"></div>');
      grid_data['elements'][topic_name] = [];

      // Heading column
      $topic_heading = $('<div class="flex-item heading flex-item-level"></div>');
      $topic_heading.html(topic_name);
      $topic_heading.data('topic', topic_name);
      $topic_row.append($topic_heading);

      // For each achievement level
      for (var i = 0; i < levels.length; i++) {
        var level_text = levels[i]['name'];
        $achievement_group = $('<div class="flex-item"></div>');
        $achievement_group.data('level', level_text);
        $achievement_group.data('topic', topic_name);
        // For each item in this achievement level
        for (var item in structure[topic_name][level_text]) {
          $item = $('<div class="selectable-item"></div>');
          $item.html(structure[topic_name][level_text][item]);
          $item.data('level', level_text);
          $item.data('topic', topic_name);
          grid_data['elements'][level_text].push($item);
          grid_data['elements'][topic_name].push($item);
          $achievement_group.append($item);
        }
        $topic_row.append($achievement_group);
      }
      $selector.append($topic_row);
    }
    $selector_container.append($selector);
  }
}


function updateGrid($container, counts) {
  var grid_data = $container.data('grid_data');
  var settings = grid_data['settings'];
  var grid_counts = counts[grid_data['name']];
  console.log("Grid Counts:", grid_counts);
  console.log("Grid Settings:", settings);
  $container.children('div.flex-container').each(function () {
    $container = $(this);
    $container.children('div.flex-item').each(function () {
      $group = $(this);
      group_level = $group.data('level');
      group_topic = $group.data('topic');
      if ((grid_counts[group_level] >= settings['max-'+group_level]
        || grid_counts[group_topic] >= settings['max-topic']
        || grid_counts['total'] >= settings['max-total'])
        && (grid_counts[group_level] > 0 || grid_counts[group_topic] > 0)) {
        $group.addClass('valid');
      } else {
        $group.removeClass('valid');
      }
      $group.children('div.selectable-item').each(function () {
        $item = $(this);
        item_level = $item.data('level');
        item_topic = $item.data('topic');
        if ((grid_counts[item_level] >= settings['max-'+item_level]
          || grid_counts[item_topic] >= settings['max-topic']
          || grid_counts['total'] >= settings['max-total'])
          && !$item.hasClass('selected')) {
          $item.addClass('disabled');
        } else if (grid_counts[item_level] < settings['max-'+item_level]
          && $item.hasClass('disabled')) {
          $item.removeClass('disabled');
        }
      });
    });
  });
  // Update message at bottom
}


// Count values for all grids
function countValues() {
  var counts = {};
  var count;
  for (var j = 0; j < ncea_encoding_selector.length; j++) {
    var grid_data = ncea_encoding_selector[j];
    var selector_name = grid_data['name'];
    counts[selector_name] = {};
    var total = 0;
    var levels = grid_data['levels'];
    for (var i = 0; i < levels.length; i++) {
      count = 0;
      var level_text = levels[i]['name'];
      $.each(grid_data['elements'][level_text], function( index, element ) {
        if (element.hasClass('selected')) {
          count++;
          total++;
        }
      });
      counts[selector_name][level_text] = count;
    }
    for (var topic_name in grid_data['structure']) {
      count = 0;
      $.each(grid_data['elements'][topic_name], function( index, element ) {
        if (element.hasClass('selected')) {
          count++;
        }
      });
      counts[selector_name][topic_name] = count;
    }
    counts[selector_name]['total'] = total;
  }
  console.log("Counts:" ,counts);
  return counts;
}


function updateFeedback() {
  return 0;
}
