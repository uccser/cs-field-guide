from django import template
from django.test import override_settings
from django.http.request import HttpRequest

from django.template import TemplateSyntaxError

from tests.BaseTest import BaseTest

AVAILABLE_LANGUAGES_EN_DE = (
    ("en", "English"),
    ("de", "German")
)

AVAILABLE_LANGUAGES_EN = (
    ("en", "English"),
)

VALID_PATH = "/chapters/chapter-name/"
INVALID_PATH = "/this/is/an/invalid/url"


class TranslateURLTest(BaseTest):

    def render_template(self, string, context):
        context = template.Context(context)
        return template.Template(string).render(context)

    @override_settings(LANGUAGES=AVAILABLE_LANGUAGES_EN_DE)
    def test_translate_url(self):
        localised_path = "/en" + VALID_PATH
        request = HttpRequest()
        request.path = localised_path
        context = {
            "request": request
        }
        tag = "{% load translate_url %}{% translate_url 'de' %}"
        rendered = self.render_template(tag, context)
        self.assertEqual(
            "/de" + VALID_PATH,
            rendered
        )

    @override_settings(LANGUAGES=AVAILABLE_LANGUAGES_EN_DE)
    def test_translate_url_invalid_url(self):
        path = INVALID_PATH
        localised_path = "/en" + path
        request = HttpRequest()
        request.path = localised_path
        context = {
            "request": request
        }
        tag = "{% load translate_url %}{% translate_url 'de' %}"
        rendered = self.render_template(tag, context)
        self.assertEqual(
            "/en/",
            rendered
        )

    def test_translate_url_missing_target_language(self):
        localised_path = "/en" + VALID_PATH
        request = HttpRequest()
        request.path = localised_path
        context = {
            "request": request
        }
        tag = "{% load translate_url %}{% translate_url %}"
        with self.assertRaises(TemplateSyntaxError):
            self.render_template(tag, context)

    @override_settings(LANGUAGES=AVAILABLE_LANGUAGES_EN)
    def test_translate_url_invalid_language(self):
        localised_path = "/en" + VALID_PATH
        request = HttpRequest()
        request.path = localised_path
        context = {
            "request": request
        }
        tag = "{% load translate_url %}{% translate_url 'de' %}"
        with self.assertRaises(TemplateSyntaxError):
            self.render_template(tag, context)
