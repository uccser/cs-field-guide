# Writing Text

This article describes the syntax required for writing Markdown files within the CSFG project in the `text` directory.

## Table of Contents

- [Text syntax](#text-syntax)
  - [Headers](#headers)
  - [Emphasis](#emphasis)
  - [Lists](#lists)
  - [Links](#links)
    - [Internal links](#internal-links)
      - [Chapter links](#chapters)
      - [Chapter subsection links](#chapter-subsections)
      - [Appendix links](#appendices)
    - [External links](#external-links)
    - [Image links](#image-links)
  - [Code](#code)
  - [Tables](#tables)
  - [Blockquotes](#blockquotes)
  - [Horizontal Rule](#horizontal-rule)
  - [Line Breaks](#line-breaks)
  - [Math](#math)
  - [Videos](#videos)
  - [Images](#images)
  - [Interactives](#interactives)
  - [Glossary links](#glossary-links)
    - [Defining a glossary term](#defining-a-glossary-term)
    - [Linking to a glossary term](#linking-to-a-glossary-term)
  - [Files](#files)
  - [Comments](#comments)
  - [Panels](#panels)
  - [Text Boxes](#text-boxes)
  - [Version specific content](#version-specific-content)
  - [Conditional content](#conditional-content)
  - [Table of contents](#table-of-contents)
  - [Escape curly braces](#escape-curly-braces)
  - [Syntax to avoid](#Syntax-to-avoid)
- [Philosophy for syntax](#philosophy-for-syntax)


## Text syntax

The following syntax is a combination of [Markdown](https://daringfireball.net/projects/markdown/syntax) for basic elements, however we have implemented our own syntax for some extra CSFG specific features (which are converted to HTML with our own parser)using curly braces (`{` and `}`).

### Headers

Create headings using `#` before the heading text, the number of `#` states the level.

```no-highlight
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

# H1
## H2
### H3
#### H4
##### H5
###### H6

---

The CSFG parser will automatic make each header a [permalink](http://en.wikipedia.org/wiki/Permalink) (mouseover a heading above for the link). Headers within chapters and appendices are also numbered (use `guide-settings.conf` to set if a page is numbered or not).

### Emphasis

```
Emphasis, aka italics, with *asterisks*.

Strong emphasis, aka bold, with **asterisks**.

Strikethrough uses two tildes. ~~Scratch this.~~
```

Emphasis, aka italics, with *asterisks*.

Strong emphasis, aka bold, with **asterisks**.

Strikethrough uses two tildes. ~~Scratch this.~~

*Note: We do not use underscores for emphasis to maintain consistency and readability.*

---

### Lists

Lists can be created by starting each line with a `-` for unordered lists or `1.` for ordered lists. The list needs to be followed by a blank line, however it doesn't require one above it (we included this feature into our parser as we believe it makes the list easier to read as it's connected to the previous paragraph). If you are having issues with a list not rendering correctly, add a blank line before the list and submit a [bug report](https://github.com/uccser/cs-field-guide/issues/new).

```
Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. Item 1
2. Item 2
3. Item 3
```
Unordered list:
- Item 1
- Item 2
- Item 3

Ordered list:
1. Item 1
2. Item 2
3. Item 3

---

Nested lists can be created by indenting each level by 2 spaces.

```
1. Item 1
  1. A corollary to the above item, indented by 2 spaces.
  2. Yet another point to consider.
2. Item 2
  * A corollary that does not need to be ordered.
    * This is indented four spaces, because it's two for each level.
    * You might want to consider making a new list by now.
3. Item 3
```

1. Item 1
  1. A corollary to the above item, indented by 2 spaces.
  2. Yet another point to consider.
2. Item 2
  * A corollary that does not need to be ordered.
    * This is indented four spaces, because it's two for each level.
    * You might want to consider making a new list by now.
3. Item 3

---

### Links

There are several links that may be used:

The general syntax for links is `[link text](link url)` where `link text` is the text to be displayed in the document, and `link url` is the destination of the link.

**Escaping closing brackets within link URLs:** A closing bracket can be escaped by prefixing it with a backslash `\)`.

#### Internal links

These are links to pages within the Computer Science Field Guide. These links will not work when viewed in the GitHub Markdown renderer, however will function properly when run through the guide generator. Links to pages are referenced from the language folder within the text folder (see examples below).

##### Chapters

You can refer to a chapter page by writing the chapter name with `.html` at the end. The chapter name is converted to lowercase, with spaces replaced with dashes, and punctuation removed. See the examples below:

```no-highlight
Check out the [Algorithms chapter](chapters/algorithms.html).
Check out the [Network Communication Protocols chapter](chapters/network-communication-protocols.html).
```

*Note these links will not work on Github*

Check out the [Algorithms chapter](chapters/algorithms.html).

Check out the [Network Communication Protocols chapter](chapters/network-communication-protocols.html).

---

##### Chapter Subsections

You can refer to a subsection on a chapter page by following the same chapter syntax and then adding the subsection name at the end with a `#` separator, see examples below. All headers are subsections that have a link that can be linked to (called an anchor link). The link can be retrieved by right clicking on a header in a browser and selecting 'Copy link address', or convert the subsection name to lowercase, with spaces replaced with dashes, and punctuation removed.

```no-highlight
Check out the [searching section](chapters/algorithms.html#searching) in the Algorithms chapter.
```

*Note this link will not work on Github*

Check out the [searching section](chapters/algorithms.html#searching) in the Algorithms chapter.

---

##### Appendices

The full link must given for appendices (due to the large range):

```no-highlight
Check out the [Assessment Overview](curriculum-guides\ncea\assessment-guide-level-1-introduction.html).
```

*Note this link will not work on Github*

Check out the [Assessment Overview](curriculum-guides\ncea\assessment-guide-level-1-introduction.html).

---

#### External links

These are links to websites that are not a part of the Computer Science Field Guide. The URL should include the `http://` or `https://` as required.

```no-highlight
Check out [Google's website](https://www.google.com).
```

Check out [Google's website](https://www.google.com).

---

#### Image links

Images should now be linked using the `caption-link` and `source` arguments within the [images](#images) syntax. Direct links when clicking an image are no longer allowed as it's inconsistent to other images using the `materialbox` feature from MaterialCSS.

---


#### Button links

You can create a link on a button using the following syntax:

```
{button link="http://www.google.com" text="Visit Google"}
```
**Parameters:**
- `link` - The URL to link to.
- `text` - Text to display on the button.

---

### Code

Code blocks are part of the Markdown spec, but syntax highlighting isn't.

```no-highlight
Inline `code` has `back-ticks around` it.
```

You can highlight syntax by specifying the language after the first set of backticks ([good list of language codes here](https://haisum.github.io/2014/11/07/jekyll-pygments-supported-highlighters/))


```python3
def find_high_score(scores):
    if len(scores) == 0:
        print("No high score, table is empty")
        return -1
    else:
        highest_so_far = scores[0]
        for score in scores[1:]:
            if score > highest_so_far:
                highest_so_far = score
        return highest_so_far
```

Inline `code` has `back-ticks around` it.

Blocks of code are fenced by lines with three back-ticks <code>```</code>.

---

<pre lang="no-highlight"><code>```
text = "Hello world"
print(s)
```
</code></pre>

---

### Tables

```no-highlight
Colons can be used to align columns.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3
```

---

Colons can be used to align columns.

| Tables        | Are           | Cool |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

---

### Blockquotes

```no-highlight
> Blockquotes are very handy to emulate reply or output text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.
```

---

> Blockquotes are very handy to emulate reply or output text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

---

### Horizontal Rule

Create a horizontal rule with three hyphens, though this is hardly used in the CSFG.

```
---
```

---

### Line Breaks

Here are some things to try out:

```
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.  
The line above ends with two spaces, forcing a line break but not a new paragraph.
```

---

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also begins a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.  
The line above ends with two spaces, forcing a line break but not a new paragraph.

---

### Math

**Note this only renders in our output (not on GitHub editor)**

To include math (either inline or as a block) use the following syntax. Math equations are rendered in MathJax using the LaTeX syntax. You can preview equations on [this website](http://www.tuhh.de/MathJax/test/sample-dynamic.html). A `{math}` block must be used when within a paragraph, and `{math-block}` must have a blank line before and after the equation, otherwise rendering errors occur.

```
This is inline math showing {math}2 + 3{math end}.

This is a math block:

{math-block}
\begin{bmatrix}
s & 0 \\  
0 & s \\  
\end{bmatrix}
{math-block end}
```

---

### Videos

The following text can be used to embed YouTube and Vimeo videos into the project:

```
{video url="http://www.youtube.com/embed/FOwCCvHEfY0"}
```

**Parameters:**
- `url` - The url to the video to embed. The parser automatically detects the source of the video and creates the required HTML for embedding. Must be a YouTube or Vimeo url.

The video is embedded in a responsive iframe within the page.

---

### Images

The following text can be used to include images into the project:

```
{image filename="face.png"}
{image filename="face.png" wrap="left_wrap"}
{image filename="face.png" wrap="right_wrap" alt="This shows a face"}
```

**Parameters:**
- `filename` - The image's file name, stored in the images folder.
- `wrap` (optional) - Either set to `left` or `right` for aligning the image on the page, rather than centered.
- `alt` (optional) - Description text of the image used when an image is not displayed, or can be read when using a screen reader (for those with reading difficulties).
- `hover-text` (optional) - Additional text to be displayed when the user hovers their cursor over the image (note this won't appear on touch devices so use sparingly).
- `caption` (optional) - Lists the given text as a caption under the image. Does not appear under images within an `image-set`.
- `caption-link` (optional - requires `caption` parameter) - Turns the caption text into a link to the given URL.
- `source` (optional) - Adds a 'Image source' link under the image, and after the caption if a caption is given. Does not appear under images within an `image-set`.

Images are displayed responsively, and expand to full size in a lightbox when clicked by the user.

---

### Interactives

The following text can include an interactive into the project:

```
{interactive name="network-simulation" type="in-page"}
{interactive name="network-simulation" type="whole-page"}
{interactive name="searching-boxes" type="whole-page" text="Searching Boxes - Part 1" parameters="max=2"}
{interactive name="searching-boxes" type="iframe" parameters="max=2"}
```

**Parameters:**
- `name` - The interactive's name, which is the name of the folder within the interactives directory.
- `type` - Sets the way the interactive is included in the page. Must be set to one of the following values:
  - `in-page` - The interactive is included in the page by copying the required HTML (this is the preferred method for including an interactive on a page).
  - `whole-page` - Creates a link to the interactive displayed on a separate page (this is the preferred method for including an interactive on a separate page). The link shows a thumbnail of the interactive with a text (the text is set using the `text` parameter).
  - `iframe` - The interactive is included in the page by embedding using an iframe. This is used if the interactive is included multiple times on the page (to avoid conflicts in JavaScript/CSS).
- `text` (used with `whole-page` value) - Sets the text below the interactive link.
- `parameters` (used with `whole-page` and `iframe` values) - Adds the parameters to interactive link.
- `thumbnail` (optional - used with `whole-page` value) - Displays an alternative thumbnail for the interactive. When not provided, it defaults to the `thumbnail.png` image within the interactive's folder. The alternative thumbnail must be stored in the interactive folder.
- `file-type` (used with `whole-page` value) - Set the file extension of the link. Defaults to `html` but was implemented for `php` interactives.

An interactive that is adding by the `iframe` type requires:
1. `data-iframe-height` attribute on the largest element in the interactive (most likely the `row` tag from the interactive template).
2. `<script src="../base-files/js/third-party/iframeResizer.contentWindow.min.js"></script>` at the end of the `body` element.

---

### Glossary links

Glossary terms and links are created throughout the text of the guide, and our parser automatically creates the glossary page with alphabetically ordered terms with links back to points of usage.

#### Defining a glossary term

```
{glossary-definition term="Complexity" definition="Something that is really complicated."}
```

**Parameters:**
- `term` - The term to define in the glossary.
- `definition` - The definition of the glossary term.

The definition on the glossary page will also include a link back to the place the definition was defined, so it's best to place the definition before the paragraph using the term.

#### Linking to a glossary term

```
{glossary-link term="complexity" reference-text="Program complexity"}program complexity{glossary-link end}

It's worth considering which {glossary-link term="algorithm"}algorithms{glossary-link end} should be used.
```

*Note: Linking to a glossary term requires an end tag.*

**Parameters:**
- `term` - The term to link to in the glossary.
- `reference-text` (optional) - If included, adds a back reference link using the given the text after the definition on the glossary page.

The text between the start and end tags are used as text to display as a link to the glossary definition. If no text is given, then the link is invisible however it can be used to add a back reference.

#### Creating the glossary

```
{glossary}
```

This creates the glossary using all the terms defined.

---

### Files

#### Link to file

This is a link to a [test file](files/test-file.pdf).

```
This is a link to a [test file](files/test-file.pdf).
```

---

#### Link download button

Use the following line to create a download button for the given file.

```
{file filename="test-file.pdf"}
{file filename="test-file.pdf" text="Python Test File"}
```
**Parameters:**
- `filename` - The file's name, which is within the files folder.
- `text` (optional) - Text to display on the download button.

---

### Comments

Comments are removed from the output, and can be used either as block or inline text.

```
{comment}
This is a comment and is removed on output!
{comment end}

{comment This is an inline comment that doesn't require an end tag}
```

---

### Panels

Panels are used to separate optional/extra content like teacher information or interesting side notes.

```
{panel type="teacher-note" summary="Curriculum guides for Algorithms"}

This text is the panel's contents.

{panel end}
```

 Note: `teacher-note` panels are only shown in the teacher version (this is specified in the generator settings file).

**Parameters:**
- `type` - The type of panel to create. The type is used as the title of the panel, plus as the CSS class for panel (this allows colouring of all the same types of panels).
- `summary` (optional) - Text to display after the title to summarise the panel's contents.
- `expanded` (optional) - If set to False, the panel is expanded at load. When not given it defaults to True.

---

### Text Boxes

Text boxes are used to highlight important information that don't belong in a panel, code block, or diagram. The content within the box is padded with a shaded background and bordered to draw the attention of the reader.

```
{text-box}
**Computer Science report for 2.44**

  Put your introduction to what bits are here
{text-box end}
```

**Parameters:**
- `indented` - If `True` the text box will be indented to the left to match the indentation of the first level of a list.

---

### Version specific content

The contents between these tags are only shown on the given version. The exception for this is `teacher-note` panels which are only shown in the teacher version.

```
{version-specific-content version="teacher"}

This text is only shown in the teacher version of the guide.

{version-specific-content end}
```

**Parameters:**
- `version` - The version to display the contents in, currently either `student` or `teacher`. Currently only one version can be specified.

---

### Conditional content

The contents between these tags are only shown if the given variable is `True`. Errors are logged if invalid `context` or `variable` are given.

```
{conditional-content context="guide" variable="teacher_version_present"}

If you are a teacher (or involved in education), you can [access the teacher's version of the guide here](teacher/index.html).

{conditional-content end}
```

**Parameters:**
- `context` - The object to locate the variable, either `guide` or `section`.
- `variable` - The variable to check.

---

### Table of contents

Creates an automatic table of contents. It will list files and subfolders from the current file.
```
{table-of-contents}

{table-of-contents depth="1"}
```
**Parameters:**
- `depth` (optional) - The number of levels to show.

---

### Escape curly braces

To use curly braces in text, you escape text with backslashes.

```
This is a \{word with braces around it\}.
```
This is a {word with braces around it}.
---

## Markdown syntax to avoid

The following is valid Markdown syntax that will correctly render, however we wish to avoid the follow:

- Using asterisks or pluses for unordered lists, we use minuses for consistency.
- Using inline HTML, we using our own include methods to add interactives, images, videos, etc.

## Philosophy for syntax

When implementing our own syntax for extra features, we balanced both readability and control by having the first value of a tag read as the feature (e.g. `interactive` or `image`), which is followed by various arguments which can be provided in any order. We believe the current syntax is a good balance of these two outcomes, while maintaining a complexity close to the original Markdown specification.
