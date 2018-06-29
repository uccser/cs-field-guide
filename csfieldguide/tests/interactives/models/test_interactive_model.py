from tests.BaseTestWithDB import BaseTestWithDB
from interactives.models import Interactive


class InteractiveModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def test_interactives_interactive_model(self):
        Interactive.objects.create(
            slug="interactive-1",
            name="Interactive 1",
            template="interactive-1-template"
        )
        self.assertQuerysetEqual(
            Interactive.objects.all(),
            ["<Interactive: Interactive 1>"]
        )

    def test_interactives_interactive_model_two_interactives(self):
        Interactive.objects.create(
            slug="interactive-1",
            name="Interactive 1",
            template="interactive-1-template"
        )
        Interactive.objects.create(
            slug="interactive-2",
            name="Interactive 2",
            template="interactive-2-template"
        )
        self.assertQuerysetEqual(
            Interactive.objects.all(),
            [
                "<Interactive: Interactive 1>",
                "<Interactive: Interactive 2>"
            ],
            ordered=False
        )
