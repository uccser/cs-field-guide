# Persona Carousel

AKA Persona Slideshow

**Author:** Alasdair Smith

This interactive displays a slideshow of different personas, each with an image, an about, goals and frustrations.

## Adding/changing personas

All persona attributes are listed in a dictionary at the beginning of `persona-carousel.js`.
For each person, one `<li data-target="#persona-carousel" data-slide-to="X"></li>` line is needed in `persona-carousel.html` appropriately.
And one `<div id="carousel_id" class="carousel-item"></div>` line is needed in `persona-carousel.html` appropriately, where `carousel_id` is `persona.carousel_id`.
Each persona in the dictionary must fit the following dictionary:
  {
    `persona_id:` (str) A unique ID for reference to the corresponding HTML line, mentioned above. The image to be inserted as the persona's portrait is also named `persona_id.jpg`
    `name:` (str) The given name for the persona.
    `age:` (int or str) The given age of the persona.
    `title:` (str) The persona's profession (e.g. student).
    `about:` (str) A general description of the persona.
    `goals:` (list of str) A list of goals for the persona - each item is listed on a new line and prefixed with an `&ndash;` automatically.
    `frustrations:` (list of str) A list of frustrations for the persona - each item is listed on a new line and prefixed with an `&ndash;` automatically.
  }
