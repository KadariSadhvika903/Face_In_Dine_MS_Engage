import json
import cv2
import time
from aiortc import MediaStreamTrack
import threading
from PIL import Image
import cv2
import requests
from io import BytesIO
import numpy as np
from deepface import DeepFace
from deepface.detectors import FaceDetector
from av import VideoFrame
import time
from constants import BASEURL

from exceptions import APIException


class VideoTransformTrack(MediaStreamTrack):
    kind = "video"
    detector_name = "opencv"

    def __init__(self, track, restaurant):
        super().__init__() 
        self.track = track
        self.restaurant = restaurant
        self.last_execute = time.time()
        self.running_thread = 0
        self.detector = FaceDetector.build_model(self.detector_name)

    async def recv(self):
        frame = await self.track.recv()
        face_imgs, frame = self._detectFaces(frame)

        if self.running_thread <= 1 and time.time() - self.last_execute > 60:
            self._updateStates(face_imgs)
            self.last_execute = time.time()
        
        return frame

    def _detectFaces(self, frame):
        frame_img = frame.to_ndarray(format="bgr24")
        # face_descriptions = FaceDetector.detect_faces(self.detector, self.detector_name, frame_img)
        face_imgs = []
        # for description in face_descriptions:
        #     detected_face, image_region = description
        #     x, y, w, h = image_region
        #     frame_img = cv2.rectangle(
        #         frame_img,
        #         (x, y),
        #         (x + w, y + h),
        #         (0, 0, 255),
        #         3
        #     )
        #     face_imgs.append(detected_face)
        # new_frame = VideoFrame.from_ndarray(frame_img, format="bgr24")
        # new_frame.pts = frame.pts
        # new_frame.time_base = frame.time_base
        face_imgs.append(frame_img)
        new_frame = frame
        return face_imgs, new_frame

    def _preprocessFrame(self, frame, height=50):
        smallFrame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
        rgbFrame = smallFrame[:, :, ::-1]
        rgbFrame = self._scaleToHeight(height, rgbFrame)
        return rgbFrame
    
    def _scaleToHeight(self, height, image):
        width = int(image.shape[1] * height / image.shape[0])
        return cv2.resize(image, (width, height), interpolation = cv2.INTER_AREA)

    def _getVerification(self, url, frame, height=50):
        try:
            response = requests.get(url)
            profileImg = Image.open(BytesIO(response.content))
            profileImg = np.array(profileImg)
            profileImg = profileImg[:,:,:3]
            profileImg = self._scaleToHeight(height, profileImg)
            verification = DeepFace.verify(frame, profileImg, enforce_detection=False)
            return verification
        except Exception as e:
            print(e)
            pass
    
    def _getEmotion(self, frame):
        try:
            emotion = DeepFace.analyze(frame, actions = ['emotion'], enforce_detection=False)
            return emotion['dominant_emotion']
        except Exception as e:
            print(e)
            pass

    def _get_firebase_urls(self):
        req = requests.request(
            method='GET',
            url=BASEURL + 'restaurant/getuserlist/',
            headers={'Authorization': self.restaurant}
        )
        if req.status_code == 200:
            return req.json()
        else:
            raise APIException(req.status_code)


    def _recognizeFaces(self, face_imgs):
        try:
            users = self._get_firebase_urls()
            verified_users = []
            for frame in face_imgs:
                cFrame = frame.copy()
                rgbFrame = self._preprocessFrame(cFrame)
                emotion = self._getEmotion(rgbFrame)
                print(emotion)
                for user in users:
                    verification = self._getVerification(user['url'], rgbFrame)
                    if verification:
                        print(verification)
                        if verification['verified']:
                            verified_users.append({**user, 'emotion': emotion})
                            break
            self._handleVerification(verified_users)
        except Exception as e:
            print(e)
        finally:
            self.running_thread -= 1

    def _updateStates(self, face_imgs):
        self.running_thread += 1
        threading.Thread(target=self._recognizeFaces, args=(face_imgs, )).start()

    def _handleVerification(self, verified_users):
        req = requests.request(
            method='POST',
            url=BASEURL + 'restaurant/verification/',
            json=json.dumps(verified_users),
            headers={'Authorization': self.restaurant}
        )
        if req.status_code != 200:
            raise APIException(req.status_code)


        