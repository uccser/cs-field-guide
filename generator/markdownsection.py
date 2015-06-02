import re
import string
import logging
import os.path
from markdown2 import markdown
from generator.files import setup_required_files


MARKDOWN2_EXTRAS = ["code-friendly",
                    "cuddled-lists",
                    "fenced-code-blocks",
                    "markdown-in-html",
                    "smarty-pants",
                    "tables",
                    "wiki-tables"]


class Section:
    def __init__(self, title, markdown_text, file_path, guide):
        self.guide = guide
        self.title = title
        self.markdown_text = markdown_text
        self.file_path = file_path
        self.number = [0, 0, 0, 0, 0, 0]
        self.page_header_numbered = False
        self.html_content = []
        self.regex_functions = self.create_regex_functions()
        self.permalinks = set()
        # Dictionary of sets for images, interactives, and other_files
        self.required_files = setup_required_files(self.guide.generator_settings)
        self.mathjax_required = False

    # ----- Helper Functions -----

    def set_number(self, number):
        """Sets the number for the section"""
        self.number = [number, 0, 0, 0, 0, 0]

    def increment_number(self, level):
        """Takes a string and returns the number incremented to the given level
        For example:
          1 at level 1 goes to 2
          1.1 at level 3 goes to 1.1.1
          1.1.1 at level 2 goes to 1.2

        """
        if self.page_header_numbered:
            start_numbers = self.number[:level - 1]
            new_number = [self.number[level - 1] + 1]
            end_numbers = (len(self.number) - level) * [0]
            self.number = start_numbers + new_number + end_numbers
        else:
            self.page_header_numbered = True


    def format_section_number(self):
        """Return a nicely formatted version of the section number"""
        formatted_number = ('.'.join(str(num) for num in self.number))
        return formatted_number[:formatted_number.find('0')]


    def create_heading(self, match):
        heading_text = match.group('heading')
        heading_level = len(match.group('heading_level'))
        self.increment_number(heading_level)
        html = self.html_templates['heading'].format(heading_level=heading_level,
                                                     permalink=self.create_permalink(heading_text),
                                                     section_number=self.format_section_number(),
                                                     heading_text=heading_text)
        return html


    def create_permalink(self, text):
        link = self.to_snake_case(text)
        count = 2
        while link in self.permalinks:
            if link[-1].isdigit():
                link = link[:-1] + str(count)
            else:
                link = link + str(count)
            count += 1
        self.permalinks.add(link)
        return link


    def to_snake_case(self, text):
        """Returns the given text as snake case.
        The text is lower case, has spaces replaced as dashes.
        All punctuation is also removed.
        """
        text = ''.join(letter for letter in text if letter not in set(string.punctuation))
        return text.replace(' ', '-').lower()


    def from_snake_case(self, text):
        return text.replace('-', ' ').title()


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
        return ''


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
        self.required_files['Images'].add(filename)
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

        self.required_files['Files'].add(filename)

        output_path = os.path.join(self.guide.generator_settings['Output']['Files'], filename)
        text = self.html_templates['button-download-text'].format(filename=filename)
        html = self.html_templates['button'].format(button_link=output_path, button_text=text)
        return html


    def add_interactive(self, match):
        interactive_type = match.group('type')
        interactive_name = match.group('interactive_name')

        interactive_arguments = re.search('(title="(?P<title>[^"]*)")?(parameters="(?P<parameters>[^"]*)")?', match.group('args'))
        if interactive_arguments.group('title'):
            interactive_title = interactive_arguments.group('title')
        else:
            interactive_title = 'interactive'
        if interactive_arguments.group('parameters'):
            interactive_parameters = interactive_arguments.group('parameters')
        else:
            interactive_parameters = None

        # Add interactive to required files
        self.required_files['Interactives'].add(interactive_name)

        if interactive_type == 'interactive-external':
            interactive_source = self.guide.generator_settings['Output']['Interactives'].format(interactive=interactive_name)
            interactive_thumbnail_source = os.path.join(interactive_source, self.guide.generator_settings['Source']['Interactive Thumbnail'])
            interactive_link_text = 'Click to load {title}'.format(title=interactive_title)
            if interactive_parameters:
                interactive_source = "{source}?{parameters}".format(source=interactive_source, parameters=interactive_parameters)
            link_html = self.html_templates['interactive-external'].format(interactive_thumbnail=interactive_thumbnail_source, interactive_link_text=interactive_link_text, interactive_source=interactive_source)
            html = self.html_templates['centered'].format(html=link_html)
        else:
            html = ''
        return html




    # ----- Parsing Functions -----

    def parse_markdown_content(self, html_templates):
        """Converts raw Markdown into HTML.

        Sets:
          List of strings of HTML.
          Each string is the content for one section (page breaks).

        """
        self.html_templates = html_templates
        for section_text in self.markdown_text.split('{page break}'):
            # Parse with our parser
            text = section_text
            for regex, function in self.regex_functions:#REGEX_MATCHES:
                text = re.sub(regex, function, text, flags=re.MULTILINE)
            # Parse with markdown2
            parsed_html = markdown(text, extras=MARKDOWN2_EXTRAS)
            self.html_content.append(parsed_html)


    def create_regex_functions(self):
        regex_list = self.guide.regex_list
        regex_functions = []
        for regex_name in regex_list.sections():
            regex = regex_list[regex_name]['regex']
            function = getattr(self, regex_list[regex_name]['function'])
            regex_functions.append((regex, function))
        return regex_functions
