from ninja import Schema
from ninja import ModelSchema
from django.contrib.auth.models import User

class UserOut(ModelSchema):
    class Meta:
        model = User
        exclude = ["password",]

class UserIn(ModelSchema):
    class Meta:
        model = User
        fields = ["email", "password"]
