from django.test import override_settings
from tests.BaseTestWithDB import BaseTestWithDB
from tests.helpers import template_settings_for_test
from utils.render_html_with_load_tags import render_html_with_load_tags
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator

templates = template_settings_for_test("tests/utils/assets/templates/")


@override_settings(TEMPLATES=templates)
@override_settings(INTERACTIVES_BASE_TEMPLATES_PATH="base/")
class RenderHTMLWithLoadTagsTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()

    def test_render_html_with_load_tags_without_tags(self):
        self.assertHTMLEqual(
            render_html_with_load_tags("<p>Introduction for chapter 1</p>"),
            "<p>Introduction for chapter 1</p>",
        )

    def test_render_html_with_load_tags_with_static(self):
        self.assertHTMLEqual(
            render_html_with_load_tags("<img src='{% static 'image.png' %}'>"),
            "<img src='/staticfiles/image.png'>",
        )

    def test_render_html_with_load_tags_with_interactive_tag(self):
        self.test_data.create_interactive(1)
        self.assertHTMLEqual(
            render_html_with_load_tags("{% render_interactive_in_page 'interactive-1' %}"),
            "<h1>in-page mode</h1><p>Interactive 1</p>",
        )

    def test_render_html_with_load_tags_with_multiple_tags(self):
        self.test_data.create_interactive(1)
        self.test_data.create_interactive(2)
        self.assertHTMLEqual(
            render_html_with_load_tags("""
            <p>Text 1</p>
            {% render_interactive_in_page 'interactive-1' %}
            <p>Text 2</p>
            <img src='{% static 'image.png' %}'>
            <p>Text 3</p>
            {% render_interactive_in_page 'interactive-2' %}
            <p>Text 4</p>
            """),
            """
            <p>Text 1</p>
            <h1>in-page mode</h1>
            <p>Interactive 1</p>
            <p>Text 2</p>
            <img src='/staticfiles/image.png'>
            <p>Text 3</p>
            <h1>in-page mode</h1>
            <p>Interactive 2</p>
            <p>Interactive 2 CSS</p>
            <p>Interactive 2 JS</p>
            <p>Text 4</p>
            """,
        )
