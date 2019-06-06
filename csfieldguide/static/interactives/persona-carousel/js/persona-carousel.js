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
    age: 29,
    title: gettext('University student and new mother'),
    about: gettext('Sam is a mature student and also a new mother.\
      Being a new mother, her sleep schedule is not consistent and she needs to get sleep whenever she can.\
      However, she doesn\'t want to abandon her studies and chances of work in her favourite field.'),
    goals: [
      gettext('Get enough sleep to work efficiently in her studies.'),
      gettext('Stay on top of uni work but also spend as much time as she can with her child.')
    ],
    frustrations: [
      gettext('Wakes up multiple times a night for the baby.'),
      gettext('Sometimes falls asleep druing lectures and has to spend extra time making up for it.'),
      gettext('Never knows how many hours of sleep she has actually had.')
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
  console.log(displayHtml);
  $('#' + persona.carousel_id).html(displayHtml);
}
