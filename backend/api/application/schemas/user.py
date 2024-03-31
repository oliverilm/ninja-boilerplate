from ninja import Schema
from ninja import ModelSchema
from application.models.user import AppUser

class UserOut(ModelSchema):
    class Meta:
        model = AppUser
        exclude = ["password",]

class UserIn(ModelSchema):
    class Meta:
        model = AppUser
        fields = ["email", "password"]
