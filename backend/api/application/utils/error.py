from django.core.exceptions import (
    FieldError,
    ObjectDoesNotExist,
    PermissionDenied,
    ValidationError,
)
from ninja.errors import ValidationError as NinjaValidationError


class ApiError:
    ObjectDoesNotExiste="ObjectDoesNotExist"
    PermissionDenied="PermissionDenied"
    NinjaValidationError="NinjaValidationError"
    ValidationError="ValidationError"
    FieldError="FieldError"
    UserAlreadyExistsError="UserAlreadyExistsError"

class UserAlreadyExistsError(Exception):
    pass

class GenericError(Exception):
    pass