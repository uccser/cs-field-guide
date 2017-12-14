from tests.BaseTestWithDB import BaseTestWithDB
from interactives.models import Interactive


class InteractiveModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def test_interactives_interactive_model(self):
        new_interactive = Interactive.objects.create(
            slug="interactive-1",
            template="interactive-1-template"
        )
        query_result = Interactive.objects.get(slug="interactive-1")
        self.assertEqual(query_result, new_interactive)

    def test_interactives_interactive_model_two_interactives(self):
        Interactive.objects.create(
            slug="interactive-1",
            template="interactive-1-template"
        )
        Interactive.objects.create(
            slug="interactive-2",
            template="interactive-2-template"
        )
        self.assertQuerysetEqual(
            Interactive.objects.all(),
            [
                "<Interactive: Interactive object>",
                "<Interactive: Interactive object>"
            ],
            ordered=False
        )
