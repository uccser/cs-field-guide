from django import template
from django.test import override_settings
from django.http.response import Http404
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from tests.helpers import template_settings_for_test

templates = template_settings_for_test("tests/config/templatetags/assets/templates/")


@override_settings(TEMPLATES=templates)
class RenderInteractiveInPageTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.interactive_test_data = InteractivesTestDataGenerator()

    def render_template(self, string, context=None):
        context = context or {}
        context = template.Context(context)
        return template.Template(string).render(context)

    def test_render_interactive_in_page_with_tag(self):
        self.interactive_test_data.create_interactive(1)
        rendered = self.render_template(
            "{% load render_interactive_in_page %}\n{% render_interactive_in_page 'interactive-1' %}",
        )
        self.assertHTMLEqual(
            "<div class='interactive text-center mb-3'><p>Interactive 1</p></div>",
            rendered
        )

    def test_render_interactive_in_page_zero_parameters(self):
        self.assertRaises(
            template.TemplateSyntaxError,
            self.render_template,
            "{% load render_interactive_in_page %}\n{% render_interactive_in_page %}"
        )

    def test_render_interactive_in_page_two_parameters(self):
        self.assertRaises(
            template.TemplateSyntaxError,
            self.render_template,
            "{% load render_interactive_in_page %}\n{% render_interactive_in_page param1 param2 %}"
        )

    def test_render_interactive_in_page_invalid_parameter(self):
        chapter = self.test_data.create_chapter(1)
        section_chapter = self.test_data.create_chapter_section(chapter, 1)
        context = {"section_chapter": section_chapter}
        self.assertRaises(
            Http404,
            self.render_template,
            "{% load render_interactive_in_page %}\n{% render_interactive_in_page section_chapter.chapter %}",
            context
        )
