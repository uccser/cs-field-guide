from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse
from chapters.models import GlossaryTerm


class GlossaryViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_glossary_with_no_definitions(self):
        url = reverse("chapters:glossary")
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.context["glossary_terms"]), 0)

    def test_glossary_with_one_definition(self):
        term = GlossaryTerm(
            slug="algorithm",
            term="Algorithms",
            definition="<p>Algorithms definition.</p>"
        )
        term.save()

        url = reverse("chapters:glossary")
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.context["glossary_terms"]), 1)
        self.assertQuerysetEqual(
            response.context["glossary_terms"],
            ["<GlossaryTerm: Algorithms>"]
        )

    def test_glossary_with_two_definitions(self):
        term1 = GlossaryTerm(
            slug="algorithm",
            term="Algorithms",
            definition="<p>Algorithms definition.</p>"
        )
        term1.save()
        term2 = GlossaryTerm(
            slug="pixel",
            term="Pixel",
            definition="<p>Pixel definition.</p>"
        )
        term2.save()

        url = reverse("chapters:glossary")
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.context["glossary_terms"]), 2)
        self.assertQuerysetEqual(
            response.context["glossary_terms"],
            ["<GlossaryTerm: Algorithms>", "<GlossaryTerm: Pixel>"]
        )

    def test_glossary_order(self):
        term_c = GlossaryTerm(
            slug="c",
            term="C",
            definition=""
        )
        term_c.save()
        term_b = GlossaryTerm(
            slug="b",
            term="B",
            definition=""
        )
        term_b.save()
        term_a = GlossaryTerm(
            slug="a",
            term="A",
            definition=""
        )
        term_a.save()

        url = reverse("chapters:glossary")
        response = self.client.get(url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.context["glossary_terms"]), 3)
        self.assertQuerysetEqual(
            response.context["glossary_terms"],
            [
                "<GlossaryTerm: A>",
                "<GlossaryTerm: B>",
                "<GlossaryTerm: C>"
            ]
        )

    def test_glossary_json_with_one_definition(self):
        term = GlossaryTerm(
            slug="algorithm",
            term="Algorithms",
            definition="<p>Algorithms definition.</p>"
        )
        term.save()

        url = reverse("chapters:glossary_json")
        response = self.client.get(url, {"term": "algorithm"})
        self.assertEqual(200, response.status_code)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "definition": "<p>Algorithms definition.</p>",
                "slug": "algorithm",
                "term": "Algorithms"
            }
        )

    def test_glossary_json_with_two_definitions(self):
        term1 = GlossaryTerm(
            slug="algorithm",
            term="Algorithms",
            definition="<p>Algorithms definition.</p>"
        )
        term1.save()
        term2 = GlossaryTerm(
            slug="pixel",
            term="Pixel",
            definition="<p>Pixel definition.</p>"
        )
        term2.save()

        url = reverse("chapters:glossary_json")
        response = self.client.get(url, {"term": "pixel"})
        self.assertEqual(200, response.status_code)
        self.assertJSONEqual(
            str(response.content, encoding="utf8"),
            {
                "definition": "<p>Pixel definition.</p>",
                "slug": "pixel",
                "term": "Pixel"
            }
        )

    def test_glossary_json_with_invalid_term(self):
        term = GlossaryTerm(
            slug="algorithm",
            term="Algorithms",
            definition="<p>Algorithms definition.</p>"
        )
        term.save()

        url = reverse("chapters:glossary_json")
        response = self.client.get(url, {"term": "pixel"})
        self.assertEqual(404, response.status_code)

    def test_glossary_json_with_invalid_key(self):
        term = GlossaryTerm(
            slug="algorithm",
            term="Algorithms",
            definition="<p>Algorithms definition.</p>"
        )
        term.save()

        url = reverse("chapters:glossary_json")
        response = self.client.get(url, {"word": "pixel"})
        self.assertEqual(404, response.status_code)
