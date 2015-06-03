from jinja2 import Environment, DictLoader

class WebsiteGenerator:
    """Object for generating websites from a guide object"""
    def __init__(self, html_templates):
        self.env = Environment(loader=DictLoader(html_templates))


    def render_template(self, template, context):
        return self.env.get_template(template).render(context)
