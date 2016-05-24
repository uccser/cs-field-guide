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
- All internal links (links to other files in the project) must be relative links.
- Must work in browsers updated within the last year. So try and avoid experimental features but don't worry about supporting older browsers (but it's great if it can!).
- TO BE CONFIRMED - A `languages.csv` file for text translations.

For `in-page` interactives:
- The elements to be extracted from the interactive page should be within a `<div>` with class `interactive` (see templates below).
- Use the [MaterilizeCSS responsive CSS framework](http://materializecss.com/) (as this the framework used on each page)
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

### Available files and libraries

Several CSS and JS files and libraries are available within the `base-files` folder, and may be useful to link to in your project. We have listed them below with the features they add.

**CSS Files**

- `panel.css` - Allows use of the collapsible panels found within the CSFG within an interactive. Use panel HTML structure found within `html-templates.conf`.
- `third-party/materialize.css` - The default CSS file for [MaterilizeCSS](http://materializecss.com/) (the responsive CSS framework used to create the CSFG). Does not include any custom settings (like our colour scheme):
  - If the interactive is used `in-page`, do not include link to CSS file within `div` with class `interactive` as every page already has this file loaded (with our custom colour scheme).
  - The `font` folder with the CSS folder is for use by the Materialize library.
- `third-party/normalize.css` - Makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing. There is no need to use this if using the MaterilizeCSS framework as these defaults are already included.
- `third-party/foundation.min.css` - The default file for the [Foundation responsive CSS framework](http://foundation.zurb.com/) ([version 5.5.2](http://foundation.zurb.com/sites/docs/v/5.5.3/)). You are welcome to use this for `whole-page` interactives if other frameworks don't suit.
- `third-party/nouislider.min.css` - Stylesheet for the [noUiSlider library](http://refreshless.com/nouislider/), used within many colour interactives.
- `third-party/codemirror.css` - Stylesheet for [CodeMirror](https://codemirror.net/), a versatile text editor implemented in JavaScript for the browser. Recommended if you wish to display a text editor within the interactive.
- `third-party/codemirror-mode-regex.css` - An CSS file for CodeMirror for highlighting regular expression syntax within the editor.
m

**JavaScript Files**

- `third-party/materialize.min.js` - Event handling for MaterializeCSS framework.
- `third-party/foundation.min.js` - Event handling for Foundation framework.
- `third-party/jquery.js` - A fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. Required by MaterilizeCSS and Foundation frameworks.
- `third-party/codemirror.js` - Logic required to create and use [CodeMirror](https://codemirror.net/) editors.
- `third-party/codemirror-mode-regex.js` - Logic required to highlight text with regular expression syntax in CodeMirror editors.
- `third-party/es5-shim.min.js` - ECMAScript 5 compatibility shims for legacy (and modern) JavaScript engines.
- `third-party/es6-shim.min.js` - ECMAScript 6 compatibility shims for legacy (and modern) JavaScript engines.
- `third-party/iframeResizer.contentWindow.min.js` - Required [iFrame Resizer](http://davidjbradshaw.github.io/iframe-resizer/) file for interactives to be used with `iframe` mode. This *child* file is used within the content window, and talks to the *parent* file on the page, do automatically resize the iFrame window to fit the content.
- `third-party/jsencrypt.js` - [JSEncrypt](http://travistidwell.com/jsencrypt/) is a Javascript library to perform OpenSSL RSA Encryption, Decryption, and Key Generation.
- `third-party/modernizr.js` - [Modernizr](https://modernizr.com/) is a small piece of JavaScript code that automatically detects the availability of next-generation web technologies in your user's browsers. Rather than blacklisting entire ranges of browsers based on “UA sniffing,” Modernizr uses feature detection to allow you to easily tailor your user's experiences based on the actual capabilities of their browser.
- `third-party/nouislider.min.js` - Event handling for the [noUiSlider library](http://refreshless.com/nouislider/), used within many colour interactives.
- `third-party/wNumb.js` - [wNumb](http://refreshless.com/wnumb/) is a number and money formatting library. Can be used independently, or with noUiSlider to format labels.
