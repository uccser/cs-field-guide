# Interactive Documentation

This documentation page provides information about the interactive content of the Computer Science Field Guide.
Interactives are a great resource for teaching and practicing concepts in the CSFG.
The guidelines below aim to keep consistency among interactives.
It also allows developers to make modifications to existing interactive with ease.

## Required Knowledge

You should have an understanding of the following concepts before proceeding (*we won't teach you how to do these here, there are plenty of great guides online!*):

- HTML
- CSS
- JavaScript
- How to use a responsive grid based CSS framework

## Interactive Types

Each *interactive* is stored in it's own folder within the `interactives` folder. An author can add an interactive to the text using the [interactive tag](docs/guide-content.md#interactives), and the generator will include the interactive in one of the following ways (depending on the setting within the tag):

- `in-page` - The interactive is included by copying specific HTML/CSS/JavaScript (which has been flagged with a class) into the page. This is the preferred method for including an interactive on a page.
- `whole-page` - Creates a link to the interactive displayed on a separate page. The link shows a thumbnail of the interactive with a text (the text is set using the `text` parameter).
- `iframe` - The interactive is included in the page by embedding the interactive within an iframe. This is used if the interactive is included multiple times on the page (to avoid conflicts in JavaScript/CSS).

## Interactive Requirements

A completed interactive requires the following to be included into the repository for release:
- The interactive is primarily written in JS, HTML, and CSS.
- The main file of the interactive must be `index.html`.
- An `README.md` file explaining the interactive, linking to any necessary wiki pages.
- Extra libraries/scripts that have been used have been used and attributed correctly, see [details about how to do this here](CONTRIBUTING.md#managing-licenses).
- Be easily accessible on desktop and mobile, or show a disclaimer that it is suited for desktop use only.
- Abides by the repository contribution style guidelines.
- TO BE CONFIRMED - A `languages.csv` file for text translations.

For `in-page` interactives:
- The elements to be extracted from the interactive page should be within a `<div>` with class `interactive` (see templates below).
- TO BE CONFIRMED - Set the interactive's language using the HTML lang attribute (can be retrieved with JavaScript using `document.documentElement.lang`). If the translation for the interactive is not available, it defaults to English.

For `whole-page` interactives:
- Requires a thumbnail image showing the interactive in action. The file needs to be named as `thumbnail.png`, `thumbnail.jpg`, or `thumbnail.jpeg` (ordered by preference). The image should be at least 900px wide, and of moderate quality (small size is more important than quality).

For `whole-page` and `iframe` interactives:
- TO BE CONFIRMED - Accept a URL parameter `lang` for the current language (example `?lang=de`) that sets the interactive's language to the given value. If the translation for the interactive is not available, it defaults to English.

## How do I develop an interactive?

**TODO: Provide a guide on how to create an interactive, from planning, coding, and testing.**

### Interactive template

We have provided a template folder for the creating new interactives called `base_files`, which can be found within the interactive folder.

    base_files/
    ├── README.md
    ├── index.html
    ├── img/
    ├── css/
    │   ├── third-party/
    │   │   └── Any third party CSS files
    │   └── Your CSS files
    └── js/
        ├── third-party/
        │   └── Any third party JS files
        └── Your JS files


The `index.html` contains links to the necessary CSS & JS files, with some set useful default settings. Also the provided folder structure should be used for interactives. You will also need to change the `<title>` value for the page.

#### Creating inpage interactive with template

To create an inpage interactive, copy the `base-files` folder and add your HTML within the start and end comments of the `index.html` file. When you create new CSS or JS files, these should be stored in the appropriate folders and included into your interactive within the start and end comments. Only HTML within the `<div class="interactive">` are copied, so only add HTML within the start and end comments.

#### Creating external interactive with template

For external interactives you can change the template to suit (you can ignore the inpage start and end comments), however you should still abide by the guidelines above.

### Available tools

**TODO: Discuss the available CSS and JS files within the base-files folder that may be useful**
