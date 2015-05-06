from markdown2 import markdown

def parse(raw):
    """Converts raw Markdown into HTML.
    
    Args:
      raw: String of Markdown text.
    
    Returns:
      List of strings of HTML.
    """
    return markdown(raw)