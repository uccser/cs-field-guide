# Persona Carousel

AKA Persona Slideshow

**Author:** Alasdair Smith

This interactive displays a slideshow of different personas, each with an image, an about, goals and frustrations.
Example personas are aimed at teaching students about designing for the user, rather than themselves.
As such they might lack some more advanced details used in industry personas.

## Adding/changing personas

All persona attributes are listed in a dictionary at the beginning of `persona-carousel.js`.
For each person, one `<li data-target="#persona-carousel" data-slide-to="X"></li>` line is needed in `persona-carousel.html` appropriately.
And one `<div id="carousel_id" class="carousel-item"></div>` line is needed in `persona-carousel.html` appropriately, where `carousel_id` is `persona.carousel_id`.

Each persona in the dictionary must have the following items:

- `persona_id:` (str) A unique ID for reference to the corresponding HTML line, mentioned above. The image to be inserted as the persona's portrait is also named `persona_id.jpg`
- `name:` (str) The given name for the persona.
- `age:` (int or str) The given age of the persona.
- `title:` (str) The persona's profession (e.g. student).
- `about:` (str) A general description of the persona.
- `goals:` (list of str) A list of goals for the persona - each item is listed on a new line and prefixed with an `&ndash;` automatically.
- `frustrations:` (list of str) A list of frustrations for the persona - each item is listed on a new line and prefixed with an `&ndash;` automatically.

## Images used

`bevan.jpg`:

- Photo by Johm Kan on Unsplash
- Source: https://unsplash.com/photos/71NgiXcdTzE

`kate.jpg`:

- Image by Emily Heidt from Pixabay
- Source: https://pixabay.com/photos/senior-photos-girl-high-school-2260604/

`sam.jpg`:

- Photo by Eugene Chystiakov on Unsplash
- Source: https://unsplash.com/photos/cvqvLMVEfBY
