from markdown2 import markdown

MARKDOWN2_EXTRAS = ["code-friendly",
                    "cuddled-lists",
                    "fenced-code-blocks",
                    "markdown-in-html",
                    "smarty-pants",
                    "tables",
                    "wiki-tables"]


def parse(raw):
    """Converts raw Markdown into HTML.
    
    Args:
      raw: String of Markdown text.
    
    Returns:
      List of strings of HTML.
    """
    return [markdown(raw, extras=MARKDOWN2_EXTRAS)]