from django.test import override_settings
from django.template.loader import render_to_string
from tests.BaseTest import BaseTest
from tests.helpers import template_settings_for_test

templates = template_settings_for_test("tests/config/templatetags/assets/templates/")
static_root = "tests/config/templatetags/assets/static/"


@override_settings(TEMPLATES=templates, STATIC_ROOT=static_root)
class ReadStaticFileTest(BaseTest):

    def test_read_static_file_single(self):
        html = render_to_string("read-static-file-single.html")
        self.assertEqual(
            html,
            """

<div id="svg-wrapper">
    <?xml version="1.0" standalone="no"?>
<svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="10"/>
</svg>

</div>
"""
        )

    def test_read_static_file_multiple(self):
        html = render_to_string("read-static-file-multiple.html")
        self.assertEqual(
            html,
            """

Line 1
Text file 1

Line 2
Text file 2

Line 3
"""
        )

    def test_read_static_file_no_file(self):
        self.assertRaises(
            FileNotFoundError,
            render_to_string,
            "read-static-file-missing-file.html",
        )
