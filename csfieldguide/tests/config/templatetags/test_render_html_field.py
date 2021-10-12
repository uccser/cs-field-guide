from django import template
from django.test import override_settings
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from tests.helpers import template_settings_for_test

templates = template_settings_for_test("tests/config/templatetags/assets/templates/")


@override_settings(TEMPLATES=templates)
class RenderHTMLFieldTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.interactive_test_data = InteractivesTestDataGenerator()

    def render_template(self, string, context=None):
        context = context or {}
        context = template.Context(context)
        return template.Template(string).render(context)

    def test_render_html_field_without_tags(self):
        chapter = self.test_data.create_chapter(1)
        context = {"chapter": chapter}
        rendered = self.render_template(
            "{% load render_html_field %}\n{% render_html_field chapter.introduction %}",
            context
        )
        self.assertHTMLEqual(rendered, "<p>Introduction for chapter 1</p>")

    def test_render_html_field_with_static(self):
        chapter = self.test_data.create_chapter(1, "<img src='{% static 'image.png' %}'>")
        context = {"chapter": chapter}
        rendered = self.render_template(
            "{% load render_html_field %}\n{% render_html_field chapter.introduction %}",
            context
        )
        self.assertHTMLEqual(rendered, "<img src='/static/image.png'>")

    def test_render_html_field_with_interactive_tag(self):
        self.interactive_test_data.create_interactive(1)
        chapter = self.test_data.create_chapter(1, "{% render_interactive_in_page 'interactive-1' %}")
        context = {"chapter": chapter}
        rendered = self.render_template(
            "{% load render_html_field %}\n{% render_html_field chapter.introduction %}",
            context
        )
        self.assertHTMLEqual(
            "<div class='interactive text-center mb-3'><p>Interactive 1</p></div>",
            rendered
        )

    def test_render_html_field_empty(self):
        chapter = self.test_data.create_chapter(1)
        chapter.introduction = ""
        context = {"chapter": chapter}
        rendered = self.render_template(
            "{% load render_html_field %}\n{% render_html_field chapter.introduction %}",
            context
        )
        self.assertEqual(rendered.strip(), "")

    def test_render_html_field_zero_parameters(self):
        self.assertRaises(
            template.TemplateSyntaxError,
            self.render_template,
            "{% load render_html_field %}\n{% render_html_field %}"
        )

    def test_render_html_field_two_parameters(self):
        self.assertRaises(
            template.TemplateSyntaxError,
            self.render_template,
            "{% load render_html_field %}\n{% render_html_field param1 param2 %}"
        )

    def test_render_html_field_invalid_parameter(self):
        chapter = self.test_data.create_chapter(1)
        section_chapter = self.test_data.create_chapter_section(chapter, 1)
        context = {"section_chapter": section_chapter}
        self.assertRaises(
            TypeError,
            self.render_template,
            "{% load render_html_field %}\n{% render_html_field section_chapter.chapter %}",
            context
        )

    def test_render_html_field_missing_parameter(self):
        chapter = self.test_data.create_chapter(1)
        context = {"chapter": chapter}
        rendered = self.render_template(
            "{% load render_html_field %}\n{% render_html_field chapter.invalid %}",
            context
        )
        self.assertHTMLEqual(rendered, "")
