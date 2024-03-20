from django.test import TestCase
from ninja.testing import TestClient
from application.views.auth import no_auth_router


class AuthenticationTests(TestCase):
    def test_user_create_success(self):
        client = TestClient(no_auth_router)
        response = client.post("/", json=({ 
            "email": "testers@testers.com", 
            "password": "string123" 
        }))

        self.assertEqual(response.status_code, 200)
    
    def test_user_unique_constraint(self):
        client = TestClient(no_auth_router)
        content = { 
            "email": "testers@testers.com", 
            "password": "string123" 
        }
        client.post("/", json=(content))
        response = client.post("/", json=(content))
        print(response.json())

        # TODO: actual response from swagger is correct, tests still fail
        self.assertEqual(response.status_code, 400)

    def test_obtain_token(self):
        pass

    def test_refresh_token(self):
        pass

    def test_token_verify(self):
        pass