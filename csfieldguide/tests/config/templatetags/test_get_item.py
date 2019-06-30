from django import template
from django.http.request import HttpRequest, QueryDict
from tests.BaseTest import BaseTest


class GetItemTest(BaseTest):

    def render_template(self, string, context=None):
        context = context or {}
        context = template.Context(context)
        return template.Template(string).render(context)

    def test_get_item_valid_key(self):
        request = HttpRequest()
        request.GET = QueryDict("a=1&b=2&c=3")
        context = {
            "request": request,
        }
        rendered = self.render_template(
            "{% load get_item %}"
            "{% get_item request.GET 'a' '0' %}",
            context
        )
        self.assertEqual(rendered, '1')

    def test_get_item_invalid_key(self):
        request = HttpRequest()
        request.GET = QueryDict("a=1&b=2&c=3")
        context = {
            "request": request,
        }
        rendered = self.render_template(
            "{% load get_item %}"
            "{% get_item request.GET 'z' '0' %}",
            context
        )
        self.assertEqual(rendered, '0')
