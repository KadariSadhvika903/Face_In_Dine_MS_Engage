import firebase_admin.auth as auth
from api.exceptions import FirebaseError

def getFirebaseUID(token):
    try:
        decoded_token = auth.verify_id_token(token)
        uid = decoded_token["uid"]
        return uid
    except:
        raise FirebaseError