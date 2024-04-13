from google.auth.transport import requests
from google.oauth2 import id_token
from application.schemas.user import GoogleProfile, TokenSchema, AccessTokensObject
from application.models.user import UserGoogleProfle
from django.contrib.auth import get_user_model
from ninja_jwt.tokens import RefreshToken


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return AccessTokensObject(
        refresh=str(refresh), 
        access=str(refresh.access_token)
    )


def get_google_profile(access_token) -> GoogleProfile:
    try:
        # Verify and decode the access token
        id_info = id_token.verify_oauth2_token(access_token, requests.Request())

        # Extract user profile information
        profile = {
            'user_id': id_info['sub'],
            'name': id_info.get('name', ''),
            'email': id_info.get('email', ''),
            'picture': id_info.get('picture', ''),
        }

        return profile
    except Exception as e:
        print("Error retrieving Google profile:", e)
        return None


# TODO: need to optimize the whole flow, its just a bit too slow
def finalize_google_action(
        google_profile: UserGoogleProfle,
        created: bool
) -> TokenSchema | None:
    user = None
    if created:
        names = google_profile.name.split(" ")
        user = get_user_model().objects.create_user(
                username=google_profile.email,
                email=google_profile.email,
                google_profile=google_profile,
                password=None,
                last_name=names[-1],
                first_name=" ".join(names[0:-1])
        )
    else:
        user = get_user_model().objects.get(email=google_profile.email)
    
    if user is not None:
        return get_tokens_for_user(user)
    return None