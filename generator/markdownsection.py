import re
from bs4 import BeautifulSoup, Comment
import logging
import os.path
import generator.systemfunctions as systemfunctions
from generator.systemconstants import *
from collections import OrderedDict
from markdown2 import markdown
from generator.files import setup_required_files

MARKDOWN2_EXTRAS = ["code-friendly",
                    "cuddled-lists",
                    "fenced-code-blocks",
                    "markdown-in-html",
                    "tables",
                    "wiki-tables"]


class Section:
    """Contains data and functions relating to a specific section of the
    guide, e.g. a chapter. For HTML output, every section object yields
    a seperate HTML file. Associated with a file node.
    """
    def __init__(self, file_node, markdown_text):
        self.file_node = file_node
        self.markdown_text = markdown_text
        self.original_text = markdown_text.split('\n')
        self.guide = self.file_node.guide
        self.heading = None # Set to first heading during markdown parsing
        self.current_heading = None # Pointer to current heading node
        self.title = None
        self.html_content = []
        self.regex_functions = self.create_regex_functions()
        self.permalinks = set()
        # Dictionary of sets for images, interactives, and other_files
        self.required_files = setup_required_files(file_node.guide)
        self.page_scripts = []
        self.mathjax_required = False
        self.sectioned = False
        self.html_path_to_guide_root = self.file_node.depth * '../'

    def __repr__(self):
        """Return representation of structure of section"""
        output = ''
        stack = [self.heading]
        while len(stack) > 0:
            heading = stack.pop()
            output += str(heading) + '\n'
            sub_headings = []
            for sub_heading in heading.children:
                sub_headings.insert(0, sub_heading)
            stack += sub_headings
        return(output)


    # ----- Helper Functions -----
    def add_page_script(self, script_html):
        if script_html not in self.page_scripts:
            self.page_scripts.append(script_html)


    def create_heading(self, match):
        """Parsing function for heading regex
        -   Creates heading node and adds it to structure tree
        -   If top level heading, section.title is set
        -   HTML component returned
        """
        heading_text = match.group('heading')
        heading_level = len(match.group('heading_level'))
        permalink = self.create_permalink(heading_text)
        if not self.title:
            # If title not set from heading
            self.heading = HeadingNode(heading_text, permalink, section=self)
            self.current_heading = self.heading
            self.title = heading_text
            page_heading = True
        else:
            page_heading = False
            if heading_level <= self.current_heading.level:
                #Ascend to correct parent node
                for level in range(self.current_heading.level - heading_level + 1):
                    self.current_heading = self.current_heading.parent
            elif heading_level > self.current_heading.level + 1:
                # Error in markdown - a heading level has been missed.
                # Generate blank intermediate headings and log error
                # Ignore missing headings in permissions file due to custom style
                if not self.file_node.filename == PERMISSIONS_LOCATION:
                    self.regex_functions['heading'].log("Heading level missed between {} {} and {}".format(self.current_heading.number, self.current_heading.heading, heading_text), self, match.group(0))
                for level in range(heading_level - self.current_heading.level - 1):
                    intermediate_heading = HeadingNode(heading_text, '', parent = self.current_heading)
                    self.current_heading.children.append(intermediate_heading)
                    self.current_heading = intermediate_heading
            new_heading = HeadingNode(heading_text, permalink, parent=self.current_heading)
            self.current_heading.children.append(new_heading)
            self.current_heading = new_heading

        # Create page heading if first heading
        if page_heading:
            html = ''
        else:
            html = self.current_heading.to_html()
        return html


    def create_permalink(self, text):
        """Helper function for create_heading
        -   returns a unique permalink for each heading
        """
        link = systemfunctions.to_kebab_case(text)
        count = 2
        while link in self.permalinks:
            if link[-1].isdigit():
                link = link[:-1] + str(count)
            else:
                link = link + '-' + str(count)
            count += 1
        self.permalinks.add(link)
        return link


    def create_link(self, match):
        """Create a HTML link, if local link then add path back to root"""
        link_text = match.group('link_text')
        link_url = match.group('link_url')
        link_url = link_url.replace('\)', ')')

        if not link_url.startswith(('http://','https://','mailto:')):
            # If linked to file, add file to required files
            if link_url.startswith(self.guide.generator_settings['Source']['File']):
                file_name = link_url[len(self.guide.generator_settings['Source']['File']):]
                self.required_files['File'].add(file_name)

            link_url = os.path.join(self.html_path_to_guide_root, link_url)

        html = self.html_templates['link'].format(link_text=link_text, link_url=link_url).strip()
        return html


    def create_panel(self, match):
        arguments = match.group('args')
        teacher_only_panels = self.guide.generator_settings['Output']['Teacher Only Panels'].strip().split('\n')
        panel_type = parse_argument('type', arguments)
        if panel_type:
            # Check if panel allowed
            if not (self.guide.version != "Teacher" and panel_type in teacher_only_panels):
                title = systemfunctions.from_kebab_case(panel_type)
                summary_value = parse_argument('summary', arguments)
                summary = ': ' + summary_value.strip() if summary_value else ''
                expanded_value = parse_argument('expanded', arguments)
                expanded = ' active' if expanded_value == 'True'  else ''
                content = markdown(match.group('content'), extras=MARKDOWN2_EXTRAS)

                heading = self.html_templates['panel_heading'].format(title=title,
                                                                      summary=summary)
                html = self.html_templates['panel'].format(panel_heading = heading,
                                                           content = content,
                                                           type_class = 'panel-' + panel_type,
                                                           expanded = expanded)
            # Panel should be ignored
            else:
                html = ''
        else:
            self.regex_functions['panel'].log("Panel type argument missing", self, match.group(0))
            html = ''
        return html


    def end_div(self, match):
        return self.html_templates['div-end']


    def delete_comment(self, match):
        """Replaces the comment with an empty string"""
        return '\n'


    def process_math_text(self, match):
        self.mathjax_required = True
        equation = match.group('equation')
        if match.group('type') == 'math':
            #Inline math
            equation = re.sub("\\\\{1,}", self.double_backslashes, equation)
            html = self.html_templates['math'].format(equation=equation)
        else:
            #Block math
            html = self.html_templates['math-block'].format(equation=equation)
        return html


    def double_backslashes(self, match):
        return match.group(0) * 2


    def create_image_html(self, filename, arguments, image_set=False):
        """Create the HTML required for displaying an image.
        This function is used by add_image and add_image_set"""
        # Add to required files
        self.required_files['Image'].add(filename)

        valid_image_wrap_directions = ['left', 'right']

        image_source = os.path.join(self.html_path_to_guide_root, self.guide.generator_settings['Source']['Image'], filename)

        parameters = ''
        wrap = False

        if arguments:
            wrap_value = parse_argument('wrap', arguments)
            if wrap_value and not image_set:
                if wrap_value in valid_image_wrap_directions:
                    wrap = wrap_value
                else:
                    self.regex_functions['image'].log('Image wrap value {direction} for image {filename} not recognised. Valid directions: {valid_directions}'.format(direction=wrap_value, filename=filename, valid_directions=valid_image_wrap_directions), self, match.group(0))

            # Parse caption and caption-link arguments
            caption_value = parse_argument('caption', arguments)
            caption_link_value = parse_argument('caption-link', arguments)
            if caption_value and not image_set:
                if caption_link_value:
                    caption_html = self.html_templates['link'].format(link_url=caption_link_value, link_text=caption_value)
                else:
                    caption_html = caption_value
                # Add caption as data value attribute to display in materialbox
                parameters += ' '
                parameters += self.html_templates['image-caption-data-value'].format(caption=caption_value)

            # Parse source argument
            source_value = parse_argument('source', arguments)
            if source_value and not image_set:
                source_html = self.html_templates['link'].format(link_url=source_value, link_text='Image source')

            # Parse alt argument
            alt_value = parse_argument('alt', arguments)
            if alt_value:
                parameters += ' '
                parameters += self.html_templates['image-parameter-alt'].format(alt_text=alt_value)

        image_html = self.html_templates['image'].format(image_source=image_source, image_parameters=parameters)

        if source_value and caption_value:
            caption_html = caption_html + ' &mdash; ' + source_html
            image_html += self.html_templates['image-caption'].format(html=caption_html)
        elif caption_value and not source_value:
            image_html += self.html_templates['image-caption'].format(html=caption_html)
        elif source_value and not caption_value:
            image_html += self.html_templates['image-caption'].format(html=source_html)

        if wrap:
            html = self.html_templates['image-wrapped'].format(html=image_html, wrap_direction=wrap)
        else:
            html = self.html_templates['centered'].format(html=image_html)

        return html


    def add_image(self, match):
        # TODO: Check image exists
        # TODO: Combine check function with generateguide.py
        arguments = match.group('args')
        filename = parse_argument('filename', arguments)
        if filename:
            html = self.create_image_html(filename, arguments)
        else:
            self.regex_functions['image'].log("Filename parameter missing from image", self, match.group(0))
            html = ''
        return html


    def add_image_set(self, match):
        """Creates an image block grid for viewing a large number of images"""
        images = re.findall(self.guide.regex_list['image']['regex'], match.group('images'), flags=re.MULTILINE)
        num_images = len(images)
        small_count = min(num_images, 2)
        medium_count = min(num_images, 3)
        large_count = min(num_images, 4)
        images_html = ''
        for (image_filename,image_args) in images:
            # TODO: Process image arguments
            image_html, wrap = self.create_image_html(image_filename, image_args, True)
            images_html += self.html_templates['image-set-item'].format(image_html=image_html)
        html = self.html_templates['image-set'].format(image_set_items_html=images_html.strip(),
                                                small_count=small_count,
                                                medium_count=medium_count,
                                                large_count=large_count)
        return html


    def file_exists(file_path, match):
        """Check if file exists"""
        if os.path.exists(file_path):
            return True
        else:
            self.regex_functions['file'].log("File {0} does not exist".format(file_path), self, match.group(0))
            return False


    def embed_video(self, match):
        youtube_src = "http://www.youtube.com/embed/{0}?rel=0"
        vimeo_src = "http://player.vimeo.com/video/{0}"
        html = ''
        arguments = match.group('args')
        url = parse_argument('url', arguments)
        if url:
            (video_type, video_identifier) = self.extract_video_identifier(url, match)
            if video_type:
                if video_type == 'youtube':
                    source_link = youtube_src.format(video_identifier)
                elif video_type == 'vimeo':
                    source_link = vimeo_src.format(video_identifier)
                html = self.html_templates['video'].format(source=source_link)
        else:
            self.regex_functions['video'].log("Video url not given", self, match.group(0))
            html = ''
        return html


    def extract_video_identifier(self, video_link, match):
        """Returns the indentifier from a given URL"""
        if "youtu.be" in video_link or "youtube.com/embed" in video_link:
            identifier = ('youtube', video_link.split('/')[-1])
        elif "youtube.com" in video_link:
            start_pos = video_link.find("v=") + 2
            end_pos = video_link.find("&");
            if end_pos == -1:
                identifier = ('youtube', video_link[start_pos:])
            else:
                identifier = ('youtube', video_link[start_pos:end_pos])
        elif "vimeo" in video_link:
            identifier = ('vimeo', video_link.split('/')[-1])
        else:
            self.regex_functions['video'].log("Included video url '{0}' not supported".format(video_link), self, match.group(0))
            identifier = (None,'')
        return identifier


    def escape_backslash(self, match):
        """Replaces escaped backslash '\{' with the equivalent HTML character"""
        if match.group(0) == '\{':
            html = '&#123;'
        else:
            html = '&#125;'
        return html


    def create_file_button(self, match):
        """Create a button for downloading a file"""
        arguments = match.group('args')
        filename = parse_argument('filename', arguments)
        text = parse_argument('text', arguments)

        if filename:
            self.required_files['File'].add(filename)
            output_path = os.path.join(self.html_path_to_guide_root, self.guide.generator_settings['Output']['File'], filename)

            if match.group('text'):
                text = match.group('text')
            else:
                text = filename

            button_text = self.html_templates['button-download-text'].format(text=text)
            html = self.html_templates['button'].format(link=output_path, text=button_text)
            # html = self.html_templates['centered'].format(html=html)
        else:
            self.regex_functions['file download button'].log("File filename argument not provided", self, match.group(0))
        return html if html else ''


    def create_link_button(self, match):
        """Create a button for linking to a page"""
        arguments = match.group('args')
        link = parse_argument('link', arguments)
        text = parse_argument('text', arguments)

        if link and text:
            html = self.html_templates['button'].format(link=link, text=text)
            # html = self.html_templates['centered'].format(html=html)
        else:
            self.regex_functions['link button'].log("Button parameters not valid", self, match.group(0))
        return html if html else ''


    def add_interactive(self, match):
        """Regex match function for interactive blocks.
            - Adds interactive folder to set of required files
            - Generates appropriate html content from source file
            - Returns empty string if source file does not exist
        """
        html = ''
        arguments = match.group('args')
        name = parse_argument('name', arguments)
        interactive_type = parse_argument('type', arguments)
        if name and interactive_type:
            arg_text = parse_argument('text', arguments)
            text = arg_text if arg_text else name
            arg_parameters = parse_argument('parameters', arguments)
            params = arg_parameters if arg_parameters else None
            source_folder = os.path.join(self.guide.generator_settings['Source']['Interactive'], name)

            if self.check_interactive_exists(source_folder, name, match):
                self.required_files['Interactive'].add(name)
                if interactive_type == 'whole-page':
                    arg_thumbnail = parse_argument('thumbnail', arguments)
                    thumbnail = arg_thumbnail if arg_thumbnail else self.guide.generator_settings['Source']['Interactive Thumbnail']
                    html = self.whole_page_interactive_html(source_folder, text, name, params, thumbnail, match)
                elif interactive_type == 'in-page':
                    html = self.inpage_interactive_html(source_folder, name, match)
                elif interactive_type == 'iframe':
                    html = self.iframe_interactive_html(source_folder, name, params, match)
                else:
                    self.regex_functions['file download button'].log('Interactive type not valid', self, match.group(0))
            else:
                self.regex_functions['file download button'].log('Interactive {} does not exist'.format(name), self, match.group(0))
        elif not name:
            self.regex_functions['file download button'].log('Interactive name argument not provided'.format(name), self, match.group(0))
        elif not interactive_type:
            self.regex_functions['file download button'].log('Interactive type argument not provided'.format(name), self, match.group(0))
        return html if html else ''


    def iframe_interactive_html(self, source_folder, name, params, match):
        """Create an iframe for the interactive.
            - A script is added to the page for a responsive iframe
            - A script is added within the iframe for a responsive iframe
        """
        folder_location = os.path.join(self.html_path_to_guide_root, source_folder, self.guide.generator_settings['Source']['Interactive File'])
        file_link = "{location}?{parameters}".format(location=folder_location, parameters=params) if params else folder_location
        link_template = self.html_templates['interactive-iframe']
        html = link_template.format(interactive_source=file_link)
        self.add_page_script(self.html_templates['interactive-iframe-script'].format(path_to_guide_root=self.html_path_to_guide_root))
        return html


    def whole_page_interactive_html(self, source_folder, text, name, params, thumbnail, match):
        """Return the html block for a link to an whole page interactive"""
        thumbnail_location = os.path.join(self.html_path_to_guide_root, source_folder, thumbnail)
        link_text = 'Click to load {text}'.format(text=text)
        folder_location = os.path.join(self.html_path_to_guide_root, source_folder, self.guide.generator_settings['Source']['Interactive File'])
        file_link = "{location}?{parameters}".format(location=folder_location, parameters=params) if params else folder_location
        link_template = self.html_templates['interactive-external']
        link_html = link_template.format(interactive_thumbnail=thumbnail_location,
                                    interactive_link_text=link_text,
                                    interactive_source=file_link)

        return self.html_templates['centered'].format(html=link_html)


    def inpage_interactive_html(self, source_folder, name, match):
        """Return the html for inpage interactives, with links adjusted
        to correct relative links, and comments removed.
        """
        interactive_tree = self.get_interactive_tree(source_folder, name, match)
        if interactive_tree is not None:
            self.edit_interactive_tree(interactive_tree, source_folder)
            html = re.sub('(\n)*<!--(.|\s)*?-->(\n)*', '', interactive_tree.prettify(formatter=None).strip(), flags=re.MULTILINE)
            return html
        else:
            return None


    def get_interactive_tree(self, source_folder, name, match):
        """Return element tree for the 'class=interactive div'
        of the interactive html file. If more than one div is found,
        return None and log error
        """
        filename = self.guide.generator_settings['Source']['Interactive File']
        file_location = os.path.join(source_folder, filename)
        with open(file_location, 'r', encoding='utf-8') as source_file:
            raw_html = source_file.read()

        file_tree = BeautifulSoup(raw_html, 'html5lib')
        interactive_trees = file_tree.find_all('div', class_=INTERACTIVE_CLASS)
        if len(interactive_trees) != 1:
            self.regex_functions['interactive'].log("Error creating interactive {}: expected 1 div with class 'interactive' but {} found".format(name, len(interactive_trees)), self, match.group(0))
            return None
        else:
            return interactive_trees[0]


    def edit_interactive_tree(self, root, source_folder):
        """Edits element tree in the following ways:

            - Scripts and stylesheets are added to page_scripts,
            and removed from tree
            - Relative links are modified as required (ignoring external)

            TODO:
            - Implement better system for checking whether link is relative
            and needs to be adjusted
        """
        link_attributes = ['href', 'src']
        for element in root.find_all():
            for attr in link_attributes:
                raw_link = element.get(attr, None)
                if raw_link and not raw_link.startswith('http://') and not raw_link == '#':
                    link = os.path.join(self.html_path_to_guide_root, source_folder, raw_link)
                    element[attr] = link
            if element.name == 'script' or (element.name == 'link' and element.get('rel', None) == ['stylesheet']):
                self.add_page_script(element.extract())


    def check_interactive_exists(self, interactive_source, interactive_name, match):
        """Checks if an interactive exists and has an index.html file"""
        exists = False
        if os.path.exists(interactive_source):
            interactive_source_file = self.guide.generator_settings['Source']['Interactive File']
            interactive_source_file_location = os.path.join(interactive_source, interactive_source_file)
            if os.path.exists(interactive_source_file_location):
                exists = True
            else:
                self.regex_functions['interactive'].log("Interactive {0} {1} file could not be found".format(interactive_name, interactive_source_file), self, match.group(0))
        else:
            self.regex_functions['interactive'].log("Interactive {0} folder could not be found".format(interactive_name), self, match.group(0))
        return exists


    def create_table_of_contents(self, match):
        """Parsing function for table-of-contents regex.
        Recursively calls _create_table_of_contents to build table
        of contents HTML from template
        """
        arguments = match.group('args')
        depth = int(parse_argument('depth', arguments))
        if depth:
            html = self._create_table_of_contents(self.file_node.parent, depth, top_level=True)
        else:
            html = self._create_table_of_contents(self.file_node.parent)
        return html


    def _create_table_of_contents(self, root_folder, depth=None, top_level=False):
        """Recursively called from create_table_of_contents"""
        folder_path = os.path.join(self.html_path_to_guide_root, root_folder.path, 'index.html')
        folder_link_html = self.html_templates['link'].format(link_text=root_folder.title, link_url=folder_path)

        if depth is None or depth > 0:
            items = []
            for file in root_folder.files:
                if file.tracked:
                    link_url = self.html_path_to_guide_root + self.guide.generator_settings['Output']['Output File'].format(file_name=file.path)
                    link_html = self.html_templates['link'].format(link_text=file.section.title, link_url=link_url)
                    items.append(link_html)

            for folder in root_folder.folders:
                items.append(self._create_table_of_contents(folder, depth=depth-1))

            html = ''
            for item in items:
                html += self.html_templates['table-of-contents-item'].format(item_html=item.strip())
            if top_level:
                return self.html_templates['table-of-contents'].replace('{folder_link}\n', '').format(contents=html)
            else:
                return self.html_templates['table-of-contents'].format(contents=html, folder_link=folder_link_html)
        else:
            return folder_link_html


    def add_glossary_definition(self, match):
        glossary = self.guide.glossary

        arguments = match.group('args')
        term = parse_argument('term', arguments)
        definition = parse_argument('definition', arguments)
        definition = markdown(definition, extras=MARKDOWN2_EXTRAS)

        permalink = self.create_permalink('glossary-' + term)

        this_file_link = os.path.join(glossary.html_path_to_guide_root, self.file_node.path)
        back_link = '{}.html#{}'.format(this_file_link, permalink)
        self.guide.glossary.add_item(term, definition, back_link, match, self)

        return self.html_templates['glossary_definition'].format(id=permalink).strip()


    def add_glossary_link(self, match):
        glossary = self.guide.glossary
        content = match.group('content')
        arguments = match.group('args')
        term = parse_argument('term', arguments)
        reference_text = parse_argument('reference-text', arguments)

        file_link = os.path.join(glossary.html_path_to_guide_root, self.file_node.path)
        back_link_id = self.create_permalink('glossary-' + term)
        this_file_link = os.path.join(glossary.html_path_to_guide_root, self.file_node.path)
        glossary_file_path = os.path.join(self.html_path_to_guide_root, GLOSSARY_LOCATION)

        if reference_text:
            # Provide ability to link to term in section
            back_link = '{}.html#{}'.format(this_file_link, back_link_id)
            id_html = ' id="{}"'.format(back_link_id)
            # Add back reference link to glossary item
            glossary.add_back_link(term, back_link, reference_text, match, self)
        else:
            id_html = ''

        if content:
            # Create link to term in glossary
            forward_link_id = systemfunctions.to_kebab_case(term)
            forward_link = '{}#{}'.format(glossary_file_path, forward_link_id)
            link_html = ' href="{}"'.format(forward_link)
        else:
            link_html = ''
            content = ''

        return self.html_templates['glossary_backwards_link'].format(id_html=id_html, link_html=link_html, content=content).strip()


    def add_glossary(self, match):
        glossary = self.guide.glossary
        self.mathjax_required = True
        glossary_temp = self.html_templates['glossary']
        items = ''
        for term in sorted(glossary.items.keys()):
            items += glossary.items[term].to_html()
        return glossary_temp.format(items=items)


    # ----- Parsing Functions -----

    def parse_markdown_content(self, html_templates):
        """Converts raw Markdown into HTML.

        Sets:
          List of strings of HTML.
          Each string is the content for one section (page breaks).

        """
        self.html_templates = html_templates

        # Parse with our parser
        text = self.markdown_text
        for regex in self.regex_functions.values():
            text = re.sub(regex.expression, regex.function, text, flags=re.MULTILINE)

        # Close last section if needed
        if self.sectioned:
            text += self.html_templates['section-end']

        # Parse with library parser
        text = markdown(text, extras=MARKDOWN2_EXTRAS)

        self.html_content.append(text)

        # Log error messages
        for regex in self.regex_functions.values():
            i = 0
            while regex.errors and i < len(self.original_text):
                if regex.errors[0].text_to_search in self.original_text[i]:
                    regex.errors[0].log_message(i + 1)
                    regex.errors.pop(0)
                i += 1


    def create_regex_functions(self):
        regex_list = self.guide.regex_list
        regex_functions = OrderedDict()
        for regex_name in regex_list.sections():
            expression = regex_list[regex_name]['regex']
            function = getattr(self, regex_list[regex_name]['function'])
            regex_functions[regex_name] = Regex(expression, function)
        return regex_functions


def parse_argument(argument_key, arguments):
    """Search for the given argument in a string of all arguments
    Returns: Value of an argument as a string if found, otherwise None"""
    result = re.search('{}="([^"]*)"'.format(argument_key), arguments)
    if result:
        argument_value = result.group(1)
    else:
        argument_value = None
    return argument_value


class HeadingNode:
    """Nodes of the structure tree of a section. A call is made to the guide
    number generator upon creation
    """
    def __init__(self, heading, permalink, parent=None, section=None):
        self.heading = heading
        self.permalink = permalink
        self.parent = parent
        self.level = parent.level + 1 if parent else 1
        self.section = self.parent.section if parent else section
        self.guide = self.section.guide
        self.number = self.guide.number_generator.next(self.level) if self.section.file_node.tracked else None
        self.children = []

    def __str__(self):
        if self.number:
            return '{}{} {}'.format('--' * (self.level - 1), self.number, self.heading)
        else:
            return '{}{}'.format('--' * (self.level - 1), self.heading)

    def to_html(self):
        if self.section.file_node.group_type == "chapters":
            html_type = 'heading-numbered'
        else:
            html_type = 'heading-unnumbered'

        html = ''

        # Create section starts for Materialize ScrollSpy
        if self.level == 2 and html_type == 'heading-numbered':
            # Close previous section if needed
            if self.section.sectioned:
                html = self.section.html_templates['section-end']
            html += self.section.html_templates['section-start'].format(permalink=self.permalink)
            self.section.sectioned = True

        html += self.section.html_templates[html_type].format(heading_level=self.level,
                                                      section_number=self.number,
                                                      heading_text=self.heading,
                                                      heading_permalink=self.permalink)
        if self.section.heading == self:
            html = self.section.html_templates['heading-page-title'].format(heading=html)

        return html


class Regex:
    """Class for containing information regarding regex"""

    def __init__(self, expression, function):
        self.expression = expression
        self.function = function
        self.errors = []

    def log(self, message_text, section, text_to_search=None):
        """Adds the log message to the list of errors for this regex"""
        self.errors.append(LogMessage(message_text, section, text_to_search))


class LogMessage:
    """Class for containing information regarding logging messages"""

    def __init__(self, message_text, section, text_to_search):
        self.message_text = message_text
        self.section = section
        self.text_to_search = text_to_search

    def log_message(self, line_number):
        """Logs the message using the logger module"""
        section_title = self.section.title
        logging.error('{title} - line {line_number}: {message}'.format(message=self.message_text, line_number=line_number, title=section_title))
