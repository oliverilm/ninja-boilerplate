from application.schemas.user import AccessToken, TokenSchema
from ninja import Router
from application.utils.google import get_google_profile, finalize_google_action, get_or_create_google_profile_object
from ninja_jwt.authentication import JWTAuth
from application.models.user import  AppUser
from application.utils.message import UtilMessage, UtilMessageSchema
from application.utils.error import CustomApiException
from django.contrib.auth import get_user_model

google_router = Router()

# register a new user with google.
# TODO: this does not work properly. it gets the incorrect user
@google_router.post("/google", response=TokenSchema)
def google_auth(request, access_token_in: AccessToken):
    try:
        google_profile = get_google_profile(access_token_in.access_token)
        
        if google_profile is None:
            raise CustomApiException("Unable to fetch the google profile.")
        
        # 1. check if google_profile with this google_profile.user_id exists

        user = get_user_model().objects.get(google_profile__user_id=google_profile["user_id"])
        
        # if exists, then select that user

        if user is not None: # TODO: do this later
            pass
        else: 
            pass

        # else create a new user
        
        return finalize_google_action(
            *get_or_create_google_profile_object(google_profile)
        ) 
    except Exception as e:
        raise CustomApiException(e.args)


# create a link between the authenticated user and google. 
# so the user can log in with their google account instead of password and email
@google_router.post("/google-link", response=UtilMessageSchema, auth=JWTAuth())
def google_link(request, access_token_in: AccessToken):
    user: AppUser = request.user 

    if user.google_profile is not None:
        raise CustomApiException("Google provider already linked.")
    
    fetched_google_profile = get_google_profile(access_token_in.access_token)

    if fetched_google_profile is None:
        raise CustomApiException("Google profile not available.")
    
    # TODO: need to check first, if a google_profile with this data exists.
    created_google_profile, created = get_or_create_google_profile_object(fetched_google_profile)

    if not created:
        raise CustomApiException("Google profile already exists")

    
    user.google_profile = created_google_profile
    user.save() 
    return UtilMessage(message="Google profile linked!")
    

# delete user google link
@google_router.post("/google-unlink", response=UtilMessageSchema, auth=JWTAuth())
def google_unlink(request):
    user: AppUser = request.user

    if user.google_profile is None:
        raise CustomApiException("Profile not linked")
    
    user.google_profile.delete()

    return UtilMessage(message="Google profile unlinked")