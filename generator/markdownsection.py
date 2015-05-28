from generator.markdown2 import markdown
import re
import string
import logging
import os.path

MARKDOWN2_EXTRAS = ["code-friendly",
                    "cuddled-lists",
                    "fenced-code-blocks",
                    "markdown-in-html",
                    "smarty-pants",
                    "tables",
                    "wiki-tables"]


class Section:
    def __init__(self, title, markdown_text, file_path):
        self.title = title
        self.markdown_text = markdown_text
        self.file_path = file_path
        self.number = [0, 0, 0, 0, 0, 0]
        self.page_header_numbered = False
        self.html_content = []
        self.create_regex_list()
        self.header_permalinks = set()
        # Dictionary of sets for images, interactives, and other_files
        self.required_files = {}
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
        number_html = '<span class="section_number">{0}</span>'.format(self.format_section_number())
        heading = '<h{0} class="section_heading" id="{1}">{2} {3}</h{0}>'.format(heading_level,
                                                         self.create_header_permalink(heading_text),
                                                         number_html,
                                                         heading_text)
        return heading


    def create_header_permalink(self, text):
        link = self.to_snake_case(text)
        count = 2
        while link in self.header_permalinks:
            if link[-1].isdigit():
                link = link[:-1] + str(count)
            else:
                link = link + str(count)
            count += 1
        self.header_permalinks.add(link)
        return link


    def to_snake_case(self, text):
        """Returns the given text as snake case.
        The text is lower case, has spaces replaced as underscores.
        All punctuation is also removed.

        """
        text = ''.join(letter for letter in text if letter not in set(string.punctuation))
        return text.replace(' ', '_').lower()


    def from_snake_case(self, text):
        return text.replace('_', ' ').title()


    def create_panel(self, panel_type):
        html = '<div class="panel panel_{0}" markdown="1">'.format(panel_type)
        if panel_type == 'teacher':
            html += '\n<h5>Teacher Note:</h5>'
        return html


    def create_panel_start(self, match):
        return self.create_panel(match.group('type'))


    def end_div(self, match):
        return '\n</div>'


    def delete_comment(self, match):
        """Replaces the comment with an empty string"""
        return ''


    def process_math_text(self, match):
        self.mathjax_required = True

        equation = match.group('equation')

        if match.group('type') == 'math':
            #Inline math
            start_delimiter = '<span class="math">\\\\('
            end_delimiter = '\\\\)</span>'
            equation = re.sub("\\\\{1,}", self.double_backslashes, equation)
        else:
            #Block math
            start_delimiter = '<div class="math math_block">\n\\['
            end_delimiter = '\\]\n</div>'
        return start_delimiter + equation + end_delimiter


    def double_backslashes(self, match):
        return match.group(0) * 2


    def add_image(self, match):
        # TODO: Check image exists
        # TODO: Combine check function with generateguide.py

        # Add to required files
        filename = match.group('filename')
        if 'images' in self.required_files:
            self.required_files['images'].add(filename)
        else:
            self.required_files['images'] = {filename}
        # TODO: Process arguments

        # Return HTML
        image_source = './images/' + filename
        html = self.html_templates['image_centered'].format(image_source=image_source)
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
        html_template = '<div class="flex-video widescreen">\n<iframe src="{0}" frameborder="0" allowfullscreen></iframe>\n</div>'
        html = ''
        (video_type, video_identifier) = self.extract_video_identifier(match.group('url'))
        if video_type == 'youtube':
            source_link = youtube_src.format(video_identifier)
            html = html_template.format(source_link)
        elif video_type == 'vimeo':
            source_link = vimeo_src.format(video_identifier)
            html = html_template.format(source_link)
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
            identifier = ('error','')
        return identifier


    def escape_backslash(self, match):
        """Replaces escaped backslash '\{' with the equivalent HTML character"""
        if match.group(0) == '\{':
            html = '&#123;'
        else:
            html = '&#125;'
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
            for regex, function in self.REGEX_MATCHES:
                text = re.sub(regex, function, text, flags=re.MULTILINE)
            # Parse with markdown2
            parsed_html = markdown(text, extras=MARKDOWN2_EXTRAS)
            self.html_content.append(parsed_html)


    def create_regex_list(self):
        self.REGEX_MATCHES = [("(\\\{|\\\})", self.escape_backslash),
                              ("^(\n*\{comment([^{]+\}|\}[^{]*\{comment end\})\n*)+", self.delete_comment),
                              ("\{(?P<type>math|math_block)\}(?P<equation>[\s\S]+?)\{(math|math_block) end\}", self.process_math_text),
                              ("^(?P<heading_level>#{1,6}) ?(?P<heading>[\w!?,' ]+)!?\n", self.create_heading),
                              ("^\{image (?P<filename>[^ \}]+) ?(?P<args>[^\}]*)\}", self.add_image),
                              ("^\{video (?P<url>[^\}]*)\}", self.embed_video),
                              ("^\{(?P<type>teacher|curiosity|jargon_buster|warning)\}", self.create_panel_start),
                              ("^\{(?P<type>teacher|curiosity|jargon_buster|warning) end\}", self.end_div)]
