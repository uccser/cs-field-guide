/**
 * Define all personas in this dict
 */
var PERSONAS = {
  bevan: {
    carousel_id: 'bevan',
    name: 'Bevan',
    age: 20,
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
      gettext('Often wakes up more than once in the night.'),
      gettext('Doesn’t know where to start with improving his sleep habits.'),
      gettext('Feels that he has to choose between sleep and good grades.')
    ]
  },

  sam: {
    carousel_id: 'sam',
    name: 'Sam',
    age: 29,
    title: gettext('University student and new mother'),
    about: gettext('Sam is a mature student and also a new mother.\
      Being a new mother, her sleep schedule is not consistent and she needs to get sleep whenever she can.'),
    goals: [
      gettext('Get at least 7 hours of sleep in a 24hr period / enough sleep to feel rested ?'),
      gettext('Stay on top of uni work')
    ],
    frustrations: [
      gettext('If she naps for too long she wakes up feeling sluggish.'),
      gettext('Wakes up multiple times a night for the baby.'),
      gettext('Never knows how many hours of sleep she has actually had.'),
    ]
  }
}

$( document ).ready(function() {
  buildCarousel();
});

function buildCarousel() {
  for (persona in PERSONAS) {
    buildCarouselItem(PERSONAS[persona]);
  }
}

function buildCarouselItem(persona) {
  var goals = '<b>' + gettext('Goals:') + '</b><br>';
  var frustrations = '<b>' + gettext('Frustrations:') + '</b><br>';
  for (var x=0; x < persona.goals.length; x++) {
    goals += '&ndash; ' + persona.goals[x] + '<br>';
  }
  for (var y=0; y < persona.goals.length; y++) {
    frustrations += '&ndash; ' + persona.frustrations[y] + '<br>';
  }

  var displayHtml = '';
  displayHtml += '<div class="row">\n'
  displayHtml += '  <div class="col-12 col-lg-6">\n'
  displayHtml += '    <img src="' + base + 'interactives/persona-carousel/img/' + persona.carousel_id + '.jpg" class="persona-portrait">\n'
  displayHtml += '  </div>\n'
  displayHtml += '  <div id="' + persona.carousel_id + '-about" class="col-12 col-lg-6">\n'
  displayHtml += '    <b>' + persona.name + '</b>, ' + persona.age + '<br><sup>' + persona.title + '</sup><br>' + persona.about + '\n'
  displayHtml += '  </div>\n'
  displayHtml += '</div>\n'
  displayHtml += '<div class="row">\n'
  displayHtml += '  <div id="' + persona.carousel_id + '-goals" class="col-12 col-lg-6">\n'
  displayHtml += goals;
  displayHtml += '  </div>\n'
  displayHtml += '  <div id="' + persona.carousel_id + '-frustrations" class="col-12 col-lg-6">\n'
  displayHtml += frustrations;
  displayHtml += '  </div>\n'
  displayHtml += '</div>\n'
  console.log(displayHtml);
  $('#' + persona.carousel_id).html(displayHtml);
}

/*
<div class="row">
  <div class="col-12 col-md-6">
    <img src="{% static 'interactives/persona-carousel/img/bevan.jpg' %}" class="persona-portrait" alt="Photo of Bevan for persona.">
  </div>
  <div id="bevan-about" class="col-12 col-md-6">
  </div>
  </div>
  <div class="row">
  <div id="bevan-goals" class="col-12 col-md-6">
  </div>
  <div id="bevan-frustrations" class="col-12 col-md-6">
</div>
*/