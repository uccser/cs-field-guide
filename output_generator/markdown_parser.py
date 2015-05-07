from markdown2 import markdown
import re

MARKDOWN2_EXTRAS = ["code-friendly",
                    "cuddled-lists",
                    "fenced-code-blocks",
                    "markdown-in-html",
                    "smarty-pants",
                    "tables",
                    "wiki-tables"]


def parse(raw, starting_number):
    """Converts raw Markdown into HTML.
    
    Args:
      raw: String of Markdown text.
    
    Returns:
      List of strings of HTML. 
      Each string is the content for one section (page breaks).
    
    """
    sections_text = []
    number = [starting_number-1, 0, 0, 0, 0, 0]
    
    for text in raw.split('{page break}'):
        parsed_html = ""
        # Parse with our parser
        for line in text.split('\n'):
            # Matches heading
            if re.match("#{1,6} ?([\w ]+)!?", line):
                data = re.match("(?P<heading_level>#{1,6}) ?(?P<heading>[\w ]+)!?", line)
                heading_text = data.group('heading')
                heading_level = len(data.group('heading_level'))
                number = increment_number(number, heading_level)
                line = '<div class="section_heading"><span="section_number">{2}</span><h{1}>{0}</h{1}></div>'.format(heading_text, heading_level, format_section_number(number))
            parsed_html += line + '\n'
        parsed_html = markdown(parsed_html, extras=MARKDOWN2_EXTRAS)
        sections_text.append(parsed_html)
    return sections_text

def increment_number(numbers, level):
    """Takes a string and returns the number incremented to the given level
    For example:
      1 at level 1 goes to 2
      1.1 at level 3 goes to 1.1.1
      1.1.1 at level 2 goes to 1.2
      
    """
    starting_numbers = numbers[:level - 1]
    new_number = [numbers[level - 1] + 1]
    ending_numbers = (len(numbers) - level) * [0]
    return starting_numbers + new_number + ending_numbers

def format_section_number(number):
    string = ('.'.join(str(num) for num in number))
    return string[:string.find('0')]