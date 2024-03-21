from django.test import TestCase
from ninja.testing import TestClient
from application.views.auth import no_auth_router
from application.utils.error import UserAlreadyExistsError, NinjaValidationError

test_user = {
    "email": "testers@testers.com",
    "password": "string123"
}

class AuthenticationTests(TestCase):
    def test_user_create_success(self):
        client = TestClient(no_auth_router)
        response = client.post("/", json=test_user)

        self.assertEqual(response.status_code, 200)
    
    def test_user_unique_constraint(self):
        client = TestClient(no_auth_router)
        
        client.post("/", json=test_user)
        response = client.post("/", json=test_user)
        self.assertEqual(response.status_code, 422)
        self.assertEqual(response.content, "aass")

    def test_user_field_error(self):
        client = TestClient(no_auth_router)
        response = client.post("/", json={"email": test_user.get("email")})
        self.assertEqual(response.status_code, 422)

       
        

    def test_obtain_token(self):
        pass

    def test_refresh_token(self):
        pass

    def test_token_verify(self):
        pass