from django.test import TestCase
from ninja.testing import TestClient
from application.views.auth import no_auth_router


class HelloTest(TestCase):
    def test_user_create_success(self):
        client = TestClient(no_auth_router)
        response = client.post("/", { "user_in": { "email": "test@test.ee", "password": "asdmaksdmaksd123"}})
        print(response.json())

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"msg": "Hello World"})