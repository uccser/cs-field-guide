from django import template
from django.test import override_settings
from django.http.response import Http404
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from tests.helpers import template_settings_for_test

templates = template_settings_for_test("tests/config/templatetags/assets/templates/")


@override_settings(TEMPLATES=templates)
@override_settings(INTERACTIVES_LINK_TEMPLATE="interactive-link.html")
class RenderInteractiveLinkTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.interactive_test_data = InteractivesTestDataGenerator()

    def render_template(self, string, context=None):
        context = context or {}
        context = template.Context(context)
        return template.Template(string).render(context)

    def test_render_interactive_link_with_tag(self):
        self.interactive_test_data.create_interactive(1)
        rendered = self.render_template(
            "{% load render_interactive_link %}\n{% render_interactive_link 'interactive-1' %}",
        )
        self.assertHTMLEqual(
            "<button>Interactive 1</button>",
            rendered
        )

    def test_render_interactive_link_zero_parameters(self):
        self.assertRaises(
            template.TemplateSyntaxError,
            self.render_template,
            "{% load render_interactive_link %}\n{% render_interactive_link %}"
        )

    def test_render_interactive_link_with_interactive_parameter(self):
        interactive = self.interactive_test_data.create_interactive(3)
        context = {"interactive": interactive}
        rendered = self.render_template(
            "{% load render_interactive_link %}\n{% render_interactive_link interactive %}",
            context,
        )
        self.assertHTMLEqual(
            "<button>Interactive 3</button>",
            rendered
        )

    def test_render_interactive_link_with_string_parameter(self):
        self.interactive_test_data.create_interactive(2)
        rendered = self.render_template(
            "{% load render_interactive_link %}\n{% render_interactive_link 'interactive-2' %}",
        )
        self.assertHTMLEqual(
            "<button>Interactive 2</button>",
            rendered
        )

    def test_render_interactive_link_with_invalid_parameter(self):
        chapter = self.test_data.create_chapter(1)
        section_chapter = self.test_data.create_chapter_section(chapter, 1)
        context = {"section_chapter": section_chapter}
        self.assertRaises(
            Http404,
            self.render_template,
            "{% load render_interactive_link %}\n{% render_interactive_link section_chapter.chapter %}",
            context
        )

    def test_render_interactive_link_with_question_mark(self):
        self.interactive_test_data.create_interactive(2)
        rendered = self.render_template(
            "{% load render_interactive_link %}\n \
            {% render_interactive_link 'interactive-2' parameters='?parameter' %}",
        )
        self.assertHTMLEqual(
            "<button>Interactive 2</button>",
            rendered
        )
