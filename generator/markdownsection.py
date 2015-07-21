import re
import lxml.html as htmltree
import logging
import os.path
import generator.systemfunctions as systemfunctions
from generator.systemconstants import *
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
        self.guide = self.file_node.guide
        self.heading = None # set to first heading during markdown parsing
        self.current_heading = None # pointer to current heading node
        self.title = None
        self.html_content = []
        self.regex_functions = self.create_regex_functions()
        self.permalinks = set()
        # Dictionary of sets for images, interactives, and other_files
        self.required_files = setup_required_files(file_node.guide)
        self.page_scripts = []
        self.mathjax_required = False
        self.html_path_to_root = self.file_node.depth * '../'

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
        else:
            if heading_level <= self.current_heading.level:
                #Ascend to correct parent node
                for level in range(self.current_heading.level - heading_level + 1):
                    self.current_heading = self.current_heading.parent
            elif heading_level > self.current_heading.level + 1:
                #Error in markdown - a heading level has been missed.
                #Generate blank intermediate headings and log error

                logging.error("Heading missed between --{} {}-- and --{}-- in section {}".format(self.current_heading.number,
                                                                                        self.current_heading.heading,
                                                                                        heading_text, self.file_node.filename))
                for level in range(heading_level - self.current_heading.level - 1):
                    intermediate_heading = HeadingNode(heading_text, '', parent = self.current_heading)
                    self.current_heading.children.append(intermediate_heading)
                    self.current_heading = intermediate_heading
            new_heading = HeadingNode(heading_text, permalink, parent=self.current_heading)
            self.current_heading.children.append(new_heading)
            self.current_heading = new_heading

        if self.title == 'Glossary' and heading_level > 1:
            html_type = 'heading-glossary'
        elif self.current_heading.number:
            html_type = 'heading-numbered'
        else:
            html_type = 'heading-unnumbered'

        html = self.html_templates[html_type].format(heading_level=heading_level,
                                                     permalink=permalink,
                                                     section_number=self.current_heading.number,
                                                     heading_text=heading_text)
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
                link = link + str(count)
            count += 1
        self.permalinks.add(link)
        return link


    def create_link(self, match):
        """Create a HTML link, if local link then add path back to root"""
        link_text = match.group('link_text')
        link_url = match.group('link_url')
        if not link_url.startswith(('http://','https://','mailto:')):
            link_url = self.html_path_to_root + link_url
        html = self.html_templates['link'].format(link_text=link_text,link_url=link_url)
        return html


    def create_panel_start(self, match):
        panel_type = match.group('type')
        html = self.html_templates['panel'].format(type=panel_type)
        if panel_type == 'teacher':
            html += self.html_templates['panel-teacher-heading']
        return html


    def end_div(self, match):
        return self.html_templates['div']


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


    def add_image(self, match):
        # TODO: Check image exists
        # TODO: Combine check function with generateguide.py

        # Add to required files
        filename = match.group('filename')
        self.required_files['Image'].add(filename)
        # TODO: Process image arguments

        # Return HTML
        image_source = './images/' + filename
        image_html = self.html_templates['image'].format(image_source=image_source)
        html = self.html_templates['centered'].format(html=image_html)
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
            image_source = './images/' + image_filename
            image_html = self.html_templates['image'].format(image_source=image_source).strip()
            images_html += self.html_templates['image-set-item'].format(image_html=image_html)
        html = self.html_templates['image-set'].format(image_set_items_html=images_html.strip(),
                                                small_count=small_count,
                                                medium_count=medium_count,
                                                large_count=large_count)
        return html


    def file_exists(file_path):
        """Check if file exists"""
        if os.path.exists(file_path):
            return True
        else:
            logging.error("File {0} does not exist".format(file_path))
            return False


    def embed_video(self, match):
        youtube_src = "http://www.youtube.com/embed/{0}?rel=0"
        vimeo_src = "http://player.vimeo.com/video/{0}"
        html = ''
        (video_type, video_identifier) = self.extract_video_identifier(match.group('url'))
        if video_type:
            if video_type == 'youtube':
                source_link = youtube_src.format(video_identifier)
            elif video_type == 'vimeo':
                source_link = vimeo_src.format(video_identifier)
            html = self.html_templates['video'].format(source=source_link)
        return html


    def extract_video_identifier(self, video_link):
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
            logging.error("Included video link '{0}' not supported.".format(video_link))
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
        filename = match.group('filename')

        self.required_files['File'].add(filename)

        output_path = os.path.join(self.guide.generator_settings['Output']['Files'], filename)
        text = self.html_templates['button-download-text'].format(filename=filename)
        html = self.html_templates['button'].format(button_link=output_path, button_text=text)
        return html


    def add_interactive(self, match):
        """Regex match function for interactive blocks.
            - Adds interactive folder to set of required files
            - Generates appropriate html content from source file
            - Returns empty string if source file does not exist
        """

        html = ''
        interactive_type = match.group('type')
        name = match.group('interactive_name')
        arguments = re.search('(title="(?P<title>[^"]*)")?(parameters="(?P<parameters>[^"]*)")?', match.group('args'))
        arg_title = arguments.group('title')
        title = arg_title if arg_title else name
        params = arguments.group('parameters')
        source_folder = os.path.join(self.guide.generator_settings['Source']['Interactive'], name)
        interactive_exists = self.check_interactive(source_folder, name)

        if interactive_exists:
            self.required_files['Interactive'].add(name)
            if interactive_type == 'interactive-external':
                html = self.external_interactive_html(source_folder, title, name, params)
            elif interactive_type == 'interactive-inpage':
                html = self.inpage_interactive_html(source_folder, name)

        return html if html else ''


    def external_interactive_html(self, source_folder, title, name, params):
        """Return the html block for a link to an external interactive"""

        thumbnail_location = os.path.join(self.html_path_to_root, source_folder, self.guide.generator_settings['Source']['Interactive Thumbnail'])
        link_text = 'Click to load {title}'.format(title=title)
        folder_location = os.path.join(self.html_path_to_root, source_folder)
        file_link = "{location}?{parameters}".format(location=folder_location, params=params) if params else folder_location
        link_template = self.html_templates['interactive-external']
        link_html = link_template.format(interactive_thumbnail=thumbnail_location,
                                    interactive_link_text=link_text,
                                    interactive_source=file_link)

        return self.html_templates['centered'].format(html=link_html)


    def inpage_interactive_html(self, source_folder, name):
        """Return the html for inpage interactives, with links adjusted
        to correct relative links

        If start or end flags are missing, logs error and returns None
        """

        filename = self.guide.generator_settings['Source']['Interactive File']
        file_location = os.path.join(source_folder, filename)
        with open(file_location, 'r', encoding='utf8') as source_file:
            raw_html = source_file.read()

        # Find HTML
        try:
            start = raw_html.index(INLINE_HTML_START_FLAG) + len(INLINE_HTML_START_FLAG)
            end = raw_html.index(INLINE_HTML_END_FLAG)
        except:
            logging.error('Missing start or end inline flag in interactive {}'.format(name))
            return None
        else:
            html = raw_html[start:end]
            html = self.edit_interactive_html(html, source_folder)
            return html


    def edit_interactive_html(self, html, source_folder):
        """Create element tree from html string, and use it to replace
        all links as required, and remove comments.

        html pertaining to specific files that should be loaded at the end
        of the page are removed and added to self.page_scripts
        """

        root = htmltree.fromstring(html)
        link_attributes = ['href', 'src']
        page_elements = []
        for element in root.iter():
            to_be_deleted = isinstance(element, htmltree.HtmlComment)
            for attr in link_attributes:
                raw_link = element.get(attr, None)
                if raw_link and not raw_link.startswith('http://'): #this check needs to be better
                    link = os.path.join(self.html_path_to_root, source_folder, raw_link)
                    element.set(attr, link)

            if element.tag == 'script' or (element.tag == 'link' and element.get('rel', None) == 'stylesheet'):
                page_elements.append(element)
                to_be_deleted = True

            if to_be_deleted and element.getparent() is not None:
                    element.getparent().remove(element)

        for element in page_elements:
            html_lines = htmltree.tostring(element).decode("utf-8").split('\n')
            self.page_scripts += html_lines

        return htmltree.tostring(root).decode("utf-8")


    def check_interactive(self, interactive_source, interactive_name):
        """Checks if an interactive exists and has an index.html file"""
        exists = False
        if os.path.exists(interactive_source):
            interactive_source_file = self.guide.generator_settings['Source']['Interactive File']
            interactive_source_file_location = os.path.join(interactive_source, interactive_source_file)
            if os.path.exists(interactive_source_file_location):
                exists = True
            else:
                logging.error("Interactive {0} {1} file could not be found".format(interactive_name, interactive_source_file))
        else:
            logging.error("Interactive {0} folder could not be found".format(interactive_name))
        return exists


    def create_table_of_contents(self, match):
        """Parsing function for table-of-contents regex.
        Recursively calls _create_table_of_contents to build table
        of contents HTML from template
        """
        if match.group('depth'):
            depth = int(match.group('depth'))
            html = self._create_table_of_contents(self.file_node.parent, depth, top_level=True)
        else:
            html = self._create_table_of_contents(self.file_node.parent)
        return html


    def _create_table_of_contents(self, root_folder, depth=None, top_level=False):
        """Recursively called from create_table_of_contents"""
        folder_path = os.path.join(self.html_path_to_root, root_folder.path, 'index.html')
        folder_link_html = self.html_templates['link'].format(link_text=root_folder.title, link_url=folder_path)

        if depth is None or depth > 0:
            items = []
            for file in root_folder.files:
                if file.tracked:
                    link_url = self.html_path_to_root + self.guide.generator_settings['Output']['HTML File'].format(file_name=file.path)
                    link_html = self.html_templates['link'].format(link_text=file.section.title, link_url=link_url)
                    items.append(link_html)

            for folder in root_folder.folders:
                items.append(self._create_table_of_contents(folder, depth=depth-1))

            html = ''
            for item in items:
                html += '<li>{}</li>\n'.format(item.strip())
            if top_level:
                return self.html_templates['table-of-contents'].replace('{folder_link}\n', '').format(contents=html)
            else:
                return self.html_templates['table-of-contents'].format(contents=html, folder_link=folder_link_html)
        else:
            return folder_link_html



    # ----- Parsing Functions -----

    def parse_markdown_content(self, html_templates):
        """Converts raw Markdown into HTML.

        Sets:
          List of strings of HTML.
          Each string is the content for one section (page breaks).

        """
        self.html_templates = html_templates
        for section_text in self.markdown_text.split('{page-break}'):
            # Parse with our parser
            text = section_text
            for regex, function in self.regex_functions:#REGEX_MATCHES:
                text = re.sub(regex, function, text, flags=re.MULTILINE)
            # Parse with markdown2
            parsed_html = markdown(text, extras=MARKDOWN2_EXTRAS)
            self.html_content.append(parsed_html)
        #print(self)


    def create_regex_functions(self):
        regex_list = self.guide.regex_list
        regex_functions = []
        for regex_name in regex_list.sections():
            regex = regex_list[regex_name]['regex']
            function = getattr(self, regex_list[regex_name]['function'])
            regex_functions.append((regex, function))
        return regex_functions


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
