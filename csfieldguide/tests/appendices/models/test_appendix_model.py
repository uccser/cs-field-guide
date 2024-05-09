from tests.BaseTestWithDB import BaseTestWithDB
from appendices.models import Appendix


class AppendixModelTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def test_appendices_appendix_model(self):
        Appendix.objects.create(
            slug="appendix-1",
            name="Appendix 1",
            template="appendix-1-template"
        )
        self.assertQuerysetEqual(
            Appendix.objects.all(),
            ["<Appendix: Appendix 1>"],
            transform=repr
        )

    def test_appendices_appendix_model_two_appendices(self):
        Appendix.objects.create(
            slug="appendix-1",
            name="Appendix 1",
            template="appendix-1-template"
        )
        Appendix.objects.create(
            slug="appendix-2",
            name="Appendix 2",
            template="appendix-2-template"
        )
        self.assertQuerysetEqual(
            Appendix.objects.all(),
            [
                "<Appendix: Appendix 1>",
                "<Appendix: Appendix 2>"
            ],
            ordered=False,
            transform=repr
        )
