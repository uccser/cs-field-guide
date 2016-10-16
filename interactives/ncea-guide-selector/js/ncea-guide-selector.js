ncea_encoding_selector = [
  {
    "name": "Data Representation",
    "levels": [
      {
        "name": "Achieved",
        "max": 2,
        "conflicts": [
          "Merit / Excellence"
        ],
        "superceded_by": [
          "Merit / Excellence"
        ]
      },
      {
        "name": "Merit / Excellence",
        "max": 2,
        "conflicts": [
          "Achieved"
        ]
      }
    ],
    "structure": {
      "Numbers": {
        "Achieved": [
          {
            "name": "Binary Numbers",
            "url": "#"
          }
        ],
        "Merit / Excellence": [
          {
            "name": "Two's Compliment",
            "url": "#"
          },
          {
            "name": "Floating Point Numbers",
            "url": "#"
          }
        ]
      },
      "Text": {
        "Achieved": [
          {
            "name": "ASCII",
            "url": "#"
          },
        ],
        "Merit / Excellence": [
          {
            "name": "Unicode",
            "url": "#"
          }
        ]
      },
      "Colours / Images": {
        "Achieved": [
          {
            "name": "Colours",
            "url": "#"
          }
        ],
        "Merit / Excellence": [
          {
            "name": "Colour depths and images",
            "url": "#"
          }
        ]
      }
    },
    "settings": {
      "max-topic": 1,
      "max-total": 2
    }
  },
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
          {
            "name": "Check Sums",
            "url": "#"
          },
          {
            "name": "Parity",
            "url": "#"
          }
        ],
        "Merit / Excellence": [
          {
            "name": "M/E Placeholder",
            "url": "#"
          },
          {
            "name": "M/E Placeholder",
            "url": "#"
          },
          {
            "name": "M/E Placeholder",
            "url": "#"
          }
        ]
      },
      "Encryption": {
        "Achieved": [
          {
            "name": "Caesar Cipher",
            "url": "#"
          },
          {
            "name": "Achieved Placeholder",
            "url": "#"
          },
          {
            "name": "Achieved Placeholder",
            "url": "#"
          }
        ],
        "Merit / Excellence": [
          {
            "name": "M/E Placeholder",
            "url": "#"
          },
          {
            "name": "M/E Placeholder",
            "url": "#"
          },
          {
            "name": "M/E Placeholder",
            "url": "#"
          }
        ]
      },
      "Compression": {
        "Achieved": [
          {
            "name": "Run Length Encoding",
            "url": "#"
          },
          {
            "name": "Achieved Placeholder",
            "url": "#"
          }
        ],
        "Merit / Excellence": [
          {
            "name": "M/E Placeholder",
            "url": "#"
          }
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
        "superceded_by": [
          "Merit / Excellence"
        ]
      },
      {
        "name": "Merit / Excellence",
        "max": 1
      }
    ],
    "structure": {
      "Heuristics": {
        "Achieved": [
          {
            "name": "Identifying heuristic violations in every day life",
            "url": "#"
          }
        ],
        "Merit / Excellence": [
          {
            "name": "Evaluating an interface with heuristics",
            "url": "#"
          }
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
      updateSummary(counts);
      updateGuides();
    }
  });

  createGrids();
});

function createGrids() {
  $selector_container = $('#selector-container');
  $selector_container.empty();

  for (var j = 0; j < ncea_encoding_selector.length; j++) {
    var grid_data = ncea_encoding_selector[j];

    var structure = grid_data['structure'];
    var levels = grid_data['levels'];
    grid_data['elements'] = {};
    $selector = $('<div class="selector"></div>');
    $selector.data('grid_data', grid_data);

    $achievement_level_row = $('<div class="flex-container"></div>');
    $title_cell = $('<div class="flex-item flex-item-title heading"></div>');
    $title_cell.html(grid_data['name']);
    $achievement_level_row.append($title_cell);
    for (var i = 0; i < levels.length; i++) {
      $achievement_level = $('<div class="flex-item heading flex-item-level"></div>');
      $achievement_level.html(levels[i]['name']);
      $achievement_level.data('level_data', levels[i]);
      grid_data['settings']['max-'+levels[i]['name']] = levels[i]['max'];
      $achievement_level_row.append($achievement_level);
      grid_data['elements'][levels[i]['name']] = [];
    }
    $selector.append($achievement_level_row);

    for (var topic_name in structure) {
      $topic_row = $('<div class="flex-container"></div>');
      grid_data['elements'][topic_name] = [];

      // Heading column
      $topic_heading = $('<div class="flex-item heading flex-item-topic"></div>');
      $topic_heading.html(topic_name);
      $topic_heading.data('topic', topic_name);
      $topic_row.append($topic_heading);

      // For each achievement level
      for (var i = 0; i < levels.length; i++) {
        var level_text = levels[i]['name'];
        $group = $('<div class="flex-item"></div>');
        $group.data('level_data', levels[i]);
        $group.data('topic', topic_name);
        // For each item in this achievement level
        for (var item in structure[topic_name][level_text]) {
          $item = $('<div class="selectable-item"></div>');
          $item.html(structure[topic_name][level_text][item]['name']);
          $item.data('level_data', levels[i]);
          $item.data('url', structure[topic_name][level_text][item]['url']);
          $item.data('topic', topic_name);
          grid_data['elements'][level_text].push($item);
          grid_data['elements'][topic_name].push($item);
          $group.append($item);
        }
        $topic_row.append($group);
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
      var group_level_data = $group.data('level_data');
      var group_level_name = group_level_data ? group_level_data['name'] : undefined;
      var group_level_superceded_by = group_level_data ? group_level_data['superceded_by'] : undefined;
      group_topic = $group.data('topic');
      if ($group.hasClass('heading')
        && grid_counts['total'] == settings['max-total']
        && (grid_counts[group_level_name] > 0
        || grid_counts[group_topic] > 0
        || meetsCriteria(group_level_superceded_by, grid_counts, settings['max-total']-1))) {
          $group.addClass('valid');
      } else {
        $group.removeClass('valid');
      }
      $group.children('div.selectable-item').each(function () {
        $item = $(this);
        var item_level_data = $item.data('level_data');
        var item_level_name = item_level_data ? item_level_data['name'] : undefined;
        item_topic = $item.data('topic');
        if ((grid_counts[item_level_name] == settings['max-'+item_level_name]
          || grid_counts[item_topic] == settings['max-topic']
          || grid_counts['total'] == settings['max-total']
          || meetsCriteria(item_level_data['conflicts'], grid_counts, 0))
          && !$item.hasClass('selected')) {
          $item.addClass('disabled');
        } else if (grid_counts[item_level_name] < settings['max-'+item_level_name]
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
  var overall_total = 0;
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
          overall_total++;
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
  counts['overall_total'] = overall_total;
  console.log("Counts:" ,counts);
  return counts;
}


function updateSummary(counts) {
  var $summary_container = $('div#selector-summary');
  $summary_container.empty();
}


function updateGuides() {
  $guide_container = $('#selector-guides');
  $guide_container.empty();
  $('div.flex-container > div.flex-item > div.selectable-item.selected').each(function () {
    $selected_item = $(this);
    var link = document.createElement('a');
    var link_text = document.createTextNode($selected_item.data('topic') + ' - ' + $selected_item.text());
    link.appendChild(link_text);
    link.title = $selected_item.text();
    link.href = $selected_item.data('url');
    var list_item = document.createElement('li');
    list_item.appendChild(link);
    $guide_container.append(list_item);
  });
}


function meetsCriteria(criteria_values, count_values, value_to_pass) {
  var status = false;
  if (criteria_values) {
    for (var i = 0; i < criteria_values.length; i++) {
      if (count_values[criteria_values[i]] > value_to_pass) {
        status = true;
      }
    }
  }
  return status;
}
