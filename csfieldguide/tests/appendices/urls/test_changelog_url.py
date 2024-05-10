from tests.BaseTestWithDB import BaseTestWithDB


class ChangelogURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_appendices_valid_changelog_url(self):
        url = "http://www.csfieldguide.org.nz/en/further-information/releases.html"
        response = self.client.get(url)
        self.assertRedirects(
            response,
            "https://cs-field-guide.readthedocs.io/en/latest/changelog.html",
            fetch_redirect_response=False,
            status_code=301
        )
