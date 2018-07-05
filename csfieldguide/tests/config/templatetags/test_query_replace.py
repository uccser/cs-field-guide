from django import template
from django.http.request import HttpRequest, QueryDict
from django.template.exceptions import TemplateSyntaxError
from urllib.parse import parse_qs
from tests.BaseTest import BaseTest


class QueryReplaceTest(BaseTest):

    def render_template(self, string, context=None):
        context = context or {}
        context = template.Context(context)
        return template.Template(string).render(context)

    def test_query_replace(self):
        request = HttpRequest()
        request.GET = QueryDict("a=1&b=2&c=3")
        context = {
            "new_a": 4,
            "request": request,
        }
        rendered = self.render_template(
            "{% load query_replace %}"
            "{% query_replace a=new_a %}",
            context
        )
        self.assertDictEqual(
            parse_qs(rendered),
            parse_qs("a=4&b=2&c=3")
        )

    def test_query_replace_duplicate_keys(self):
        request = HttpRequest()
        request.GET = QueryDict("a=1&a=2&c=3")
        context = {
            "new_a": 4,
            "request": request,
        }
        rendered = self.render_template(
            "{% load query_replace %}"
            "{% query_replace a=new_a %}",
            context
        )
        self.assertDictEqual(
            parse_qs(rendered),
            parse_qs("a=4&c=3")
        )

    def test_query_replace_no_value(self):
        request = HttpRequest()
        request.GET = QueryDict("a=1&b=2&c=3")
        context = {
            "request": request,
        }
        rendered = self.render_template(
            "{% load query_replace %}"
            "{% query_replace a=new_a %}",
            context
        )
        self.assertDictEqual(
            parse_qs(rendered),
            parse_qs("b=2&c=3")
        )

    def test_query_replace_multiple_values(self):
        request = HttpRequest()
        request.GET = QueryDict("a=1&b=2&c=3")
        context = {
            "new_a": 4,
            "new_b": 5,
            "request": request,
        }
        rendered = self.render_template(
            "{% load query_replace %}"
            "{% query_replace a=new_a b=new_b %}",
            context
        )
        self.assertDictEqual(
            parse_qs(rendered),
            parse_qs("a=4&b=5&c=3")
        )

    def test_query_replace_invalid_type(self):
        request = HttpRequest()
        request.GET = QueryDict("a=1&b=2&c=3")
        context = {
            "new_a": 4,
            "request": request,
        }
        self.assertRaises(
            TemplateSyntaxError,
            self.render_template,
            "{% load query_replace %}"
            "{% query_replace new_a %}",
            context
        )

    def test_query_replace_object_value(self):
        request = HttpRequest()
        request.GET = QueryDict("a=1&b=2&c=3")
        context = {
            "data": {"a": 4},
            "request": request,
        }
        rendered = self.render_template(
            "{% load query_replace %}"
            "{% query_replace a=data.a %}",
            context
        )
        self.assertDictEqual(
            parse_qs(rendered),
            parse_qs("a=4&b=2&c=3")
        )
