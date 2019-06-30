from tests.BaseTestWithDB import BaseTestWithDB
from chapters.models import GlossaryTerm


class GlossaryModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def test_chapters_glossary_model_one_glossary_term(self):
        new_glossary_term = GlossaryTerm.objects.create(
            slug="glossary-term-1",
            term="Glossary Term 1",
            definition="A definition for glossary term 1"
        )
        query_result = GlossaryTerm.objects.get(slug="glossary-term-1")
        self.assertEqual(query_result, new_glossary_term)

    def test_chapters_glossary_model_two_glossary_terms(self):
        GlossaryTerm.objects.create(
            slug="glossary-term-1",
            term="Glossary Term 1",
            definition="A definition for glossary term 1"
        )
        GlossaryTerm.objects.create(
            slug="glossary-term-2",
            term="Glossary Term 2",
            definition="A definition for glossary term 2"
        )
        self.assertQuerysetEqual(
            GlossaryTerm.objects.all(),
            [
                "<GlossaryTerm: Glossary Term 1>",
                "<GlossaryTerm: Glossary Term 2>"
            ],
            ordered=False
        )
