from ninja import Swagger
# from api.views import item_router, user_auth_router, user_no_auth_router
from application.views import auth_router, no_auth_router
from ninja.errors import ValidationError as NinjaValidationError
from ninja_extra import NinjaExtraAPI
from ninja_jwt.authentication import JWTAuth
from ninja_jwt.controller import NinjaJWTDefaultController

from http import HTTPStatus
from application.utils.error import ApiError

# from api.views import item_router, user_auth_router, user_no_auth_router
from django.core.exceptions import (
    FieldError,
    ObjectDoesNotExist,
    PermissionDenied,
    ValidationError,
)
from ninja.errors import ValidationError as NinjaValidationError
from .utils.error import GenericError, UserAlreadyExistsError


api = NinjaExtraAPI(docs=Swagger(), version="v1")
api.register_controllers(NinjaJWTDefaultController)


api.add_router("/users", no_auth_router, tags=["users"])
api.add_router("/users", auth_router, auth=JWTAuth(), tags=["users"])


# TODO: move those handlers out of here
@api.exception_handler(ObjectDoesNotExist)
def handle_object_does_not_exist(request, exc):
    return api.create_response(
        request,
        {"message": ApiError.ObjectDoesNotExist, "detail": str(exc)},
        status=HTTPStatus.NOT_FOUND,
    )


@api.exception_handler(PermissionDenied)
def handle_permission_error(request, exc: PermissionDenied):
    return api.create_response(
        request,
        {
            "message": ApiError.PermissionDenied,
            "detail": "You don't have the permission to access this resource.",
        },
        status=HTTPStatus.FORBIDDEN,
    )


@api.exception_handler(NinjaValidationError)
def handle_ninja_validation_error(request, exc: NinjaValidationError):
    mapped_msg = {error["loc"][-1]: error["msg"] for error in exc.errors}
    return api.create_response(
        request,
        data={"message": ApiError.NinjaValidationError, "detail": mapped_msg},
        status=HTTPStatus.BAD_REQUEST,
    )


@api.exception_handler(ValidationError)
def handle_validation_error(request, exc: ValidationError):
    status = HTTPStatus.BAD_REQUEST
    for field, errors in exc.error_dict.items():
        for error in errors:
            if error.code in ["unique", "unique_together"]:
                status = HTTPStatus.CONFLICT
    return api.create_response(
        request,
        data={"message": ApiError.ValidationError, "detail": exc.message_dict},
        status=status,
    )


@api.exception_handler(FieldError)
def handle_field_error(request, exc: FieldError):
    return api.create_response(
        request,
        data={"message": ApiError.FieldError, "detail": str(exc)},
        status=HTTPStatus.BAD_REQUEST,
    )

@api.exception_handler(UserAlreadyExistsError)
def handle_unique_user_error(request, exc: UserAlreadyExistsError):
    return api.create_response(
        request,
        data={"message": ApiError.UserAlreadyExistsError, "detail": str(exc)},
        status=HTTPStatus.BAD_REQUEST,
    )

@api.exception_handler(GenericError)
def handle_generic_error(request, exc: GenericError):
    return api.create_response(
        request,
        data={"message": "GenericError", "detail": str(exc)},
        status=HTTPStatus.BAD_REQUEST,
    )


