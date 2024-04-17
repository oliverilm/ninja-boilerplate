from application.models.user import AppUser
from application.schemas.user import UserIn, UserOut
from django.contrib.auth import get_user_model
from ninja import Router
from django.db.utils import IntegrityError
from ninja_crud.views import (
    DeleteModelView,
    ListModelView,
    RetrieveModelView,
    UpdateModelView,
)
from ninja_jwt.authentication import JWTAuth

from application.utils.error import UserAlreadyExistsError
from ninja_crud.viewsets import ModelViewSet

no_auth_router = Router()

@no_auth_router.post("/", response=UserOut)
def register_user(request, user_in: UserIn):
    try:
        return get_user_model().objects.create_user(
            username=user_in.email, 
            email=user_in.email, 
            password=user_in.password
        )
    except IntegrityError as error:
        raise UserAlreadyExistsError(error)


auth_router = Router()


class UserViewSet(ModelViewSet):
    model = AppUser


    # AbstractModelView subclasses can be used as-is
    list = ListModelView(output_schema=UserOut)
    retrieve = RetrieveModelView(output_schema=UserOut)
    update = UpdateModelView(input_schema=UserIn, output_schema=UserOut)
    delete = DeleteModelView()



# The register_routes method must be called to register the routes with the router
UserViewSet.register_routes(auth_router)


@no_auth_router.get("/me", auth=JWTAuth(), response=UserOut)
def get_current_user(request):
    """
    Get the current authenticated user.
    """
    user = request.user

    if user.is_authenticated:
        return user
    else:
        return {"detail": "Authentication credentials were not provided."}