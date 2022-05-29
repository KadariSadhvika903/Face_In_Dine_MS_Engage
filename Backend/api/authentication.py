import firebase_admin
from django.conf import settings
from firebase_admin import credentials
from rest_framework import authentication

from api.exceptions import FirebaseError, NoAuthToken
from .models import CustomUser

from .utils import getFirebaseUID

cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
default_app = firebase_admin.initialize_app(cred)

class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.headers.get('Authorization')

        if not token:
            raise NoAuthToken

        try:
            uid = getFirebaseUID(token)
        except:
            raise FirebaseError
            
        try:
            user = CustomUser.objects.get(username=uid)
            return (user, None)

        except CustomUser.DoesNotExist:
            # raise None
            return (None, None)