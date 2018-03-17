from django.test import override_settings
from django.http import Http404
from tests.BaseTestWithDB import BaseTestWithDB
from tests.helpers import template_settings_for_test
from utils.render_interactive_html import render_interactive_html
from interactives.models import Interactive

templates = template_settings_for_test("tests/utils/assets/templates/")


@override_settings(TEMPLATES=templates)
@override_settings(INTERACTIVES_BASE_TEMPLATES_PATH="base/")
class RenderInteractiveHTMLTest(BaseTestWithDB):

    def test_render_interactive_html_in_page(self):
        Interactive(
            slug="interactive-in-page",
            name="Interacive in-page",
            template="interactive-in-page.html",
        ).save()
        result = render_interactive_html("interactive-in-page", "in-page")
        self.assertHTMLEqual(
            result,
            """
            <h1>in-page mode</h1>
            <p>Interactive in-page HTML</p>
            <p>Interactive in-page CSS</p>
            <p>Interactive in-page JS</p>
            """,
        )

    def test_render_interactive_html_whole_page(self):
        Interactive(
            slug="interactive-whole-page",
            name="Interacive whole-page",
            template="interactive-whole-page.html",
        ).save()
        result = render_interactive_html("interactive-whole-page", "whole-page")
        self.assertHTMLEqual(
            result,
            """
            <h1>whole-page mode</h1>
            <p>Interactive whole-page HTML</p>
            <p>Interactive whole-page CSS</p>
            <p>Interactive whole-page JS</p>
            """,
        )

    def test_render_interactive_html_iframe(self):
        Interactive(
            slug="interactive-iframe",
            name="Interacive iframe",
            template="interactive-iframe.html",
        ).save()
        result = render_interactive_html("interactive-iframe", "iframe")
        self.assertHTMLEqual(
            result,
            """
            <h1>iframe mode</h1>
            <p>Interactive iframe HTML</p>
            <p>Interactive iframe CSS</p>
            <p>Interactive iframe JS</p>
            """,
        )

    def test_render_interactive_html_invalid_interactive(self):
        self.assertRaises(
            Http404,
            render_interactive_html,
            "interactive",
            "in-page",
        )

    def test_render_interactive_html_invalid_mode(self):
        Interactive(
            slug="interactive",
            name="Interacive",
            template="interactive.html",
        ).save()
        self.assertRaises(
            Exception,
            render_interactive_html,
            "interactive",
            "invalid",
        )
