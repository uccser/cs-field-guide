from http import HTTPStatus
from django.urls import reverse
from tests.BaseTestWithDB import BaseTestWithDB
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator


class ThumbnailJSONViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = InteractivesTestDataGenerator()
        self.language = "en"

    def test_thumbnail_json_with_zero_interactives(self):
        url = reverse("interactives:thumbnail-json")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertJSONEqual(
            response.content.decode(),
            []
        )

    def test_thumbnail_json_with_one_interactive(self):
        self.test_data.create_interactive(1)
        url = reverse("interactives:thumbnail-json")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertJSONEqual(
            response.content.decode(),
            [
                [
                    "interactive-1",
                    "en",
                    "/en/interactives/centered/interactive-1/",
                    "build/img/interactives/thumbnails/en/interactive-1.png"
                ]
            ]
        )

    def test_thumbnail_json_with_multiple_interactives(self):
        self.test_data.create_interactive(1)
        self.test_data.create_interactive(2)
        self.test_data.create_interactive(3)
        url = reverse("interactives:thumbnail-json")
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertJSONEqual(
            response.content.decode(),
            [
                [
                    "interactive-1",
                    "en",
                    "/en/interactives/centered/interactive-1/",
                    "build/img/interactives/thumbnails/en/interactive-1.png"
                ],
                [
                    "interactive-2",
                    "en",
                    "/en/interactives/centered/interactive-2/",
                    "build/img/interactives/thumbnails/en/interactive-2.png"
                ],
                [
                    "interactive-3",
                    "en",
                    "/en/interactives/centered/interactive-3/",
                    "build/img/interactives/thumbnails/en/interactive-3.png"
                ],
            ]
        )

    def test_thumbnail_json_with_zero_interactives_all_languages(self):
        url = reverse("interactives:thumbnail-json") + "?all_languages=true"
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertJSONEqual(
            response.content.decode(),
            []
        )

    def test_thumbnail_json_with_one_interactive_all_languages(self):
        self.test_data.create_interactive(1)
        url = reverse("interactives:thumbnail-json") + "?all_languages=true"
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertJSONEqual(
            response.content.decode(),
            [
                [
                    "interactive-1",
                    "de",
                    "/de/interactives/centered/interactive-1/",
                    "build/img/interactives/thumbnails/de/interactive-1.png"
                ],
                [
                    "interactive-1",
                    "en",
                    "/en/interactives/centered/interactive-1/",
                    "build/img/interactives/thumbnails/en/interactive-1.png"
                ],
                [
                    "interactive-1",
                    "fr",
                    "/fr/interactives/centered/interactive-1/",
                    "build/img/interactives/thumbnails/fr/interactive-1.png"
                ],
            ]
        )

    def test_thumbnail_json_with_multiple_interactives_all_languages(self):
        self.test_data.create_interactive(1)
        self.test_data.create_interactive(2)
        self.test_data.create_interactive(3)
        url = reverse("interactives:thumbnail-json") + "?all_languages=true"
        response = self.client.get(url)
        self.assertEqual(HTTPStatus.OK, response.status_code)
        self.assertJSONEqual(
            response.content.decode(),
            [
                [
                    "interactive-1",
                    "de",
                    "/de/interactives/centered/interactive-1/",
                    "build/img/interactives/thumbnails/de/interactive-1.png"
                ],
                [
                    "interactive-2",
                    "de",
                    "/de/interactives/centered/interactive-2/",
                    "build/img/interactives/thumbnails/de/interactive-2.png"
                ],
                [
                    "interactive-3",
                    "de",
                    "/de/interactives/centered/interactive-3/",
                    "build/img/interactives/thumbnails/de/interactive-3.png"
                ],
                [
                    "interactive-1",
                    "en",
                    "/en/interactives/centered/interactive-1/",
                    "build/img/interactives/thumbnails/en/interactive-1.png"
                ],
                [
                    "interactive-2",
                    "en",
                    "/en/interactives/centered/interactive-2/",
                    "build/img/interactives/thumbnails/en/interactive-2.png"
                ],
                [
                    "interactive-3",
                    "en",
                    "/en/interactives/centered/interactive-3/",
                    "build/img/interactives/thumbnails/en/interactive-3.png"
                ],
                [
                    "interactive-1",
                    "fr",
                    "/fr/interactives/centered/interactive-1/",
                    "build/img/interactives/thumbnails/fr/interactive-1.png"
                ],
                [
                    "interactive-2",
                    "fr",
                    "/fr/interactives/centered/interactive-2/",
                    "build/img/interactives/thumbnails/fr/interactive-2.png"
                ],
                [
                    "interactive-3",
                    "fr",
                    "/fr/interactives/centered/interactive-3/",
                    "build/img/interactives/thumbnails/fr/interactive-3.png"
                ],
            ]
        )
