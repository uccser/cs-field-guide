from http import HTTPStatus
from tests.BaseTestWithDB import BaseTestWithDB
from django.urls import reverse


class SetTeacherModeViewTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.language = "en"

    def test_set_teacher_mode_view_mode_true(self):
        url = reverse("general:teacher_mode_login")
        response = self.client.get(url)
        self.assertEqual(
            HTTPStatus.FOUND,
            response.status_code
        )
        self.assertTrue(self.client.session["teacher-mode"])

    def test_set_teacher_mode_view_mode_false(self):
        url = reverse("general:teacher_mode_logout")
        response = self.client.get(url)
        self.assertEqual(
            HTTPStatus.FOUND,
            response.status_code
        )
        self.assertFalse(self.client.session["teacher-mode"])

    def test_set_teacher_mode_view_mode_multiple_requests(self):
        login = reverse("general:teacher_mode_login")
        logout = reverse("general:teacher_mode_logout")
        self.assertIsNone(self.client.session.get("teacher-mode"))
        self.client.get(login)
        self.assertTrue(self.client.session["teacher-mode"])
        self.client.get(logout)
        self.assertFalse(self.client.session["teacher-mode"])
        self.client.get(login)
        self.assertTrue(self.client.session["teacher-mode"])
        self.client.get(login)
        self.assertTrue(self.client.session["teacher-mode"])
        self.client.get(logout)
        self.assertFalse(self.client.session["teacher-mode"])
        self.client.get(logout)
        self.assertFalse(self.client.session["teacher-mode"])
