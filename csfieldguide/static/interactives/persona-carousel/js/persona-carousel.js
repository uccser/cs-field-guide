/**
 * Define all personas in this dict
 */
var PERSONAS = {
  bevan: {
    carousel_id: 'bevan',
    name: 'Bevan',
    age: 21,
    title: gettext('Accounting student at university'),
    about: gettext('Bevan is a busy undergraduate student.\
      He gets good grades and plays in a social football league.\
      He is aware that he probably isn’t getting enough sleep, particularly as the exam period is coming up and he’s staying up late most nights to study.\
      He knows that if he could improve the quality of the sleep that he is getting he would be more productive when studying and have more energy for his football games and training.'),
    goals: [
      gettext('Wake up feeling rested.'),
      gettext('Be more productive during the day rather than feeling slow and sluggish.')
    ],
    frustrations: [
      gettext('Feels that most nights when he finally gets to bed he lies awake for a while.'),
      gettext('His exhaustion is affecting his performance in sport and education.'),
      gettext('Doesn’t know where to start with improving his sleep habits.'),
      gettext('Feels that he can only have two out of sleep, football and good grades.')
    ]
  },

  sam: {
    carousel_id: 'sam',
    name: 'Sam',
    age: 17,
    title: gettext('High school student'),
    about: gettext('Sam recently suffered a leg injury that left her largely bound to a wheelchair.\
      She is still getting used to dealing with her new situation, and finds herself regularly exhausted from the effort.\
      During her time off school she fell behind and now has to catch up.\
      Her doctor suggested finding a sleep tracking app for her phone so she can manage good sleep while recovering, and best utilise her remaining time for study.'),
    goals: [
      gettext('Get enough sleep to work efficiently in her studies.'),
      gettext('Stay on top of shoolwork, but also spare time for extra rest and recovery.'),
      gettext('Find a way to better organise her time, as suggested by her doctor.')
    ],
    frustrations: [
      gettext('Wakes up multiple times a night in pain.'),
      gettext('Sometimes she gets so exhausted she is forced to take time off school in the afternoon, and has to spend extra time at home making up for it.'),
      gettext('Never knows how many hours of sleep she has actually had.')
    ]
  },

  kate: {
    carousel_id: 'kate',
    name: 'Kate',
    age: 19,
    title: gettext('Building Apprentice'),
    about: gettext('Kate is doing an apprenticeship in construction with a local polytechnic.\
      They also love singing and have organised a choir, practicing on Sunday evenings.\
      Sometimes the choir practice runs late into the night, but Kate needs to get up early for work the next morning.\
      Sometimes Kate goes home too late, and has trouble concentrating at their apprenticeship.\
      But other times they go home too early and can\'t get to sleep.\
      Kate needs a product that can help them keep a consistent sleep schedule.'),
    goals: [
      gettext('Consistently get a good night\'s sleep'),
      gettext('Be able to time their departure from choir so that they get just the right amount of practice and the right amount of sleep.')
    ],
    frustrations: [
      gettext('Gets so engrossed in their singing that they forget to go home on time.'),
      gettext('But if they go home early they get easily distracted, and find it hard to fall asleep.')
    ]
  },
}

$( document ).ready(function() {
  buildCarousel();
});

/**
 * Adds each persona to the carousel. Assumes the HTML file is formatted appropriately
 */
function buildCarousel() {
  for (persona in PERSONAS) {
    buildCarouselItem(PERSONAS[persona]);
  }
}

/**
 * Adds the given persona to the carousel. Assumes the HTML file is formatted appropriately
 */
function buildCarouselItem(persona) {
  var goals = '<b>' + gettext('Goals:') + '</b><br>';
  var frustrations = '<b>' + gettext('Frustrations:') + '</b><br>';
  for (var x=0; x < persona.goals.length; x++) {
    goals += '&ndash; ' + persona.goals[x] + '<br>';
  }
  for (var y=0; y < persona.frustrations.length; y++) {
    frustrations += '&ndash; ' + persona.frustrations[y] + '<br>';
  }

  var displayHtml = '<div class="row">\n'
                  + '  <div class="col-12 col-lg-6">\n'
                  + '    <img src="' + base + 'interactives/persona-carousel/img/' + persona.carousel_id + '.jpg" class="persona-portrait">\n'
                  + '  </div>\n'
                  + '  <div id="' + persona.carousel_id + '-about" class="col-12 col-lg-6">\n'
                  + '    <b>' + persona.name + '</b>, ' + persona.age + '<br><sup>' + persona.title + '</sup><br>' + persona.about + '\n'
                  + '  </div>\n'
                  + '</div>\n'
                  + '<div class="row">\n'
                  + '  <div id="' + persona.carousel_id + '-goals" class="col-12 col-lg-6 bottom-row">\n'
                  + '    ' + goals + '\n'
                  + '  </div>\n'
                  + '  <div id="' + persona.carousel_id + '-frustrations" class="col-12 col-lg-6 bottom-row">\n'
                  + '    ' + frustrations + '\n';
                  + '  </div>\n'
                  + '</div>\n';
  $('#' + persona.carousel_id).html(displayHtml);
}
