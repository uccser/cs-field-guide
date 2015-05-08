from markdown2 import markdown
import re

MARKDOWN2_EXTRAS = ["code-friendly",
                    "cuddled-lists",
                    "fenced-code-blocks",
                    "markdown-in-html",
                    "smarty-pants",
                    "tables",
                    "wiki-tables"]


class Parser:
    def __init__(self, text, number):
        self.raw_text = text
        self.number = [number - 1, 0, 0, 0, 0, 0]
        self.html_text = []
        self.create_regex_list()    
        
        
    def increment_number(self, level):
        """Takes a string and returns the number incremented to the given level
        For example:
          1 at level 1 goes to 2
          1.1 at level 3 goes to 1.1.1
          1.1.1 at level 2 goes to 1.2
          
        """
        starting_numbers = self.number[:level - 1]
        new_number = [self.number[level - 1] + 1]
        ending_numbers = (len(self.number) - level) * [0]
        self.number = starting_numbers + new_number + ending_numbers
    
    
    def format_section_number(self):
        string = ('.'.join(str(num) for num in self.number))
        return string[:string.find('0')]
    
    
    def create_heading(self, match):
        heading_text = match.group('heading')
        heading_level = len(match.group('heading_level'))
        div_start = '<div class="section_heading">'
        number = '<span="section_number">{0}</span>'.format(self.format_section_number())
        heading = '<h{1}>{0}</h{1}>'.format(heading_text, heading_level)
        div_end = '</div>'
        self.increment_number(heading_level)    
        return div_start + number + heading + div_end


    def parse_raw_content(self):
        """Converts raw Markdown into HTML.
        
        Sets:
          List of strings of HTML. 
          Each string is the content for one section (page breaks).
        
        """
        for section_text in self.raw_text.split('{page break}'):
            for (regex, function) in self.REGEX_MATCHES:
                parsed_html = re.sub(regex, function, section_text)
                #parsed_html = re.sub(regex, lambda x: eval("self." + function + "('" + x.group() + "')"), section_text)
            # Parse with markdown2
            parsed_html = markdown(parsed_html, extras=MARKDOWN2_EXTRAS)
            self.html_text.append(parsed_html)
            
            
    def create_regex_list(self):
        self.REGEX_MATCHES = [("(?P<heading_level>#{1,6}) ?(?P<heading>[\w ]+)!?", self.create_heading)]
            
            
def parse(text, number):
    parser = Parser(text, number)
    parser.parse_raw_content()
    return parser.html_text