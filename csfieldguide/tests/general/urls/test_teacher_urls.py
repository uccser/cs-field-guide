from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class TeacherURLTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_set_teacher_mode_login_url(self):
        url = reverse("general:teacher_mode_login")
        self.assertEqual(url, "/en/teacher/login/")

    def test_set_teacher_mode_logout_url(self):
        url = reverse("general:teacher_mode_logout")
        self.assertEqual(url, "/en/teacher/logout/")
