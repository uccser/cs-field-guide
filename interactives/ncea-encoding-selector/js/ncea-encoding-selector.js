ncea_encoding_selector = {
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
}

$(document).ready(function(){
  $('#interactive-ncea-encoding-selector').on('click', '.selectable-item', function(event) {
    $selectable_item = $(this);
    // If item is already selected
    if ($selectable_item.hasClass('selected')) {
      $selectable_item.removeClass('selected');
      updateGrid();
    }
    // Else if item is not disabled
    else if (!$selectable_item.hasClass('disabled')) {
      $selectable_item.addClass('selected');
      updateGrid();
    }
  });

  createGrid();
});

function createGrid() {
  var structure = ncea_encoding_selector["structure"];
  var levels = ncea_encoding_selector['levels'];
  var tag_prefix = 'tag-';
  ncea_encoding_selector['elements'] = {};
  $selector_container = $('#selector-container');
  $selector_container.empty();

  $achievement_level_row = $('<div class="flex-container"></div>');
  $achievement_level_row.append($('<div class="flex-item flex-item-blank"></div>'));
  for (var i = 0; i < levels.length; i++) {
    $achievement_level = $('<div class="flex-item heading"></div>');
    $achievement_level.html(levels[i]['name']);
    $achievement_level.data('level', levels[i]['name']);
    ncea_encoding_selector['settings']['max-'+levels[i]['name']] = levels[i]['max'];
    $achievement_level_row.append($achievement_level);
    ncea_encoding_selector['elements'][levels[i]['name']] = [];
  }
  $selector_container.append($achievement_level_row);

  for (var topic_name in structure) {
    $topic_row = $('<div class="flex-container"></div>');
    ncea_encoding_selector['elements'][topic_name] = [];

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
        ncea_encoding_selector['elements'][level_text].push($item);
        ncea_encoding_selector['elements'][topic_name].push($item);
        $achievement_group.append($item);
      }
      $topic_row.append($achievement_group);
    }
    $selector_container.append($topic_row);
  }
}


function updateGrid() {
  $selector_container = $('#selector-container');
  var settings = ncea_encoding_selector['settings'];

  var counts = countValues();
  console.log("Counts:" ,counts);
  console.log("Settings:" ,settings);
  $selector_container.children('div.flex-container').each(function () {
    $container = $(this);
    $container.children('div.flex-item').each(function () {
      $group = $(this);
      group_level = $group.data('level');
      group_topic = $group.data('topic');
      if ((counts[group_level] >= settings['max-'+group_level]
        || counts[group_topic] >= settings['max-topic']
        || counts['total'] >= settings['max-total'])
        && (counts[group_level] > 0 || counts[group_topic] > 0)) {
        $group.addClass('valid');
      } else {
        $group.removeClass('valid');
      }
      $group.children('div.selectable-item').each(function () {
        $item = $(this);
        item_level = $item.data('level');
        item_topic = $item.data('topic');
        if ((counts[item_level] >= settings['max-'+item_level]
          || counts[item_topic] >= settings['max-topic']
          || counts['total'] >= settings['max-total'])
          && !$item.hasClass('selected')) {
          $item.addClass('disabled');
        } else if (counts[item_level] < settings['max-'+item_level]
          && $item.hasClass('disabled')) {
          $item.removeClass('disabled');
        }
      });
    });
  });
  // Update message at bottom
}


function countValues() {
  var counts = {};
  var count;
  var total = 0;
  var levels = ncea_encoding_selector['levels'];
  for (var i = 0; i < levels.length; i++) {
    count = 0;
    var level_text = levels[i]['name'];
    $.each(ncea_encoding_selector['elements'][level_text], function( index, element ) {
      if (element.hasClass('selected')) {
        count++;
        total++;
      }
    });
    counts[level_text] = count;
  }
  for (var topic_name in ncea_encoding_selector['structure']) {
    count = 0;
    $.each(ncea_encoding_selector['elements'][topic_name], function( index, element ) {
      if (element.hasClass('selected')) {
        count++;
      }
    });
    counts[topic_name] = count;
  }
  counts['total'] = total;
  return counts;
}
