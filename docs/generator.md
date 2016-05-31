# HTML Generator Documentation

This documentation page provides information about the HTML generator used to create the Computer Science Field Guide.

## Key terms

The following terms are useful to understand when reading this document.

- **screen media** - Referring to HTML to be displayed on screen media (for example: viewing the website on a browser).
- **print media** - Referring to HTML to be displayed on print media (for example: printing the PDF or viewing the CSFG on an ebook).


## Parsing tags

When the generator is run, it searches each text file with each regular expression found in `generator/regex-list.conf`. For each match found, the corresponding function is called which returns the HTML to substitute for the found tag. For example, each time a video tag is found, the `create_video_html` function is called which returns HTML to replace the found `{video [parameters]}` tag.

When creating a function for returning HTML for a tag, there are four different types of returned HTML:

1. **HTML for both screen and print media** - HTML is displayed the same in both situations.
2. **HTML for screen media** - HTML is displayed the same in both situations.
3. **HTML for print media** - HTML is displayed the same in both situations.
4. **HTML is empty** - The function failed to complete successfully (for example: the given parameters may have been invalid) and the function returns an empty string.

### Example of returning HTML

For example, when the `create_video_html` function is called when creating a website, the following HTML could be returned:

```
<div class='video-container no-controls'>
  <iframe src='{url}' frameborder='0' allowfullscreen></iframe>
</div>
<div class="pdf_link_box hide_for_screen">
  <p>Check out the video online at: <a href={url}>{url}</a></p>
</div>
```

This would display the embedded video in the browser and hide the link below due to the `hide_for_screen` class. However when the user goes to print the page through the browser, the link will display below the embedded video.

If the user runs the generation script for PDF output, then the function could return:

```
<div class="pdf_link_box hide_for_screen">
  <p>Check out the video online at: <a href={url}>{url}</a></p>
</div>
```

The `iframe` to the load the video is not required as it cannot be run in print media.
