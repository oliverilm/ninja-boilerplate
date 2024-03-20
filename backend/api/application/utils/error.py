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