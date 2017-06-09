"""Module for the custom render_html_field template tag."""

from django import template
from django.template import Template, Variable, Context, TemplateSyntaxError

INVALID_ATTRIBUTE_MESSAGE = "The 'render_html_field' tag was given an " \
                            "attribute that could not be converted to a string."

MISSING_ATTRIBUTE_MESSAGE = "The 'render_html_field' tag was given an " \
                            "attribute that does not exist."


class RenderHTMLFieldNode(template.Node):
    """Class used for the custom render_html_field template tag."""

    def __init__(self, item_to_be_rendered):
        """Create the RenderHTMLFieldNode object."""
        self.item_to_be_rendered = Variable(item_to_be_rendered)

    def render(self, context):
        """Render the text with the static template tag.

        Returns:
            Rendered string of text, or raise an exception.
        """
        try:
            html = self.item_to_be_rendered.resolve(context)
            return render_html_with_static(html, context)
        except TypeError:
            raise TemplateSyntaxError(INVALID_ATTRIBUTE_MESSAGE)
        except template.VariableDoesNotExist:
            raise TemplateSyntaxError(MISSING_ATTRIBUTE_MESSAGE)


def render_html_field(parser, token):
    """Run when the render_html_field template tag is used.

    Returns:
        Rendered string of text, or an empty string if the render
        fails to convert.
    """
    bits = token.split_contents()
    if len(bits) != 2:
        raise TemplateSyntaxError("'%s' takes only one argument"
                                  " (a variable representing a template to render)" % bits[0])
    return RenderHTMLFieldNode(bits[1])


def render_html_with_static(html, context=dict()):
    """Render the HTML with the static template tag.

    Returns:
        Rendered string of HTML.
    """
    return Template("{% load static %}" + html).render(Context(context))


register = template.Library()
render_html_field = register.tag(render_html_field)
