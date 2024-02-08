from django.test import override_settings
from django.template.exceptions import TemplateSyntaxError
from tests.BaseTest import BaseTest
from search.utils import get_template_text
from tests.helpers import template_settings_for_test

templates = template_settings_for_test("tests/search/utils/assets/templates/")


@override_settings(TEMPLATES=templates)
class GetTemplateTextTest(BaseTest):

    def test_valid_template(self):
        template = "valid.html"
        result = get_template_text(template)
        self.assertEqual(result, "hello world")

    def test_invalid_template(self):
        template = "invalid.html"
        self.assertRaises(TemplateSyntaxError, get_template_text, template)
