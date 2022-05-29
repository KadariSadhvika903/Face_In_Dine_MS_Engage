import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';

firebase.initializeApp({
  apiKey: 'AIzaSyBVhQIrp4LnHdQk8Xf0oAXU8FT8ADxGCa4',
  authDomain: 'faceindine.firebaseapp.com',
  databaseURL: 'https://faceindine-default-rtdb.firebaseio.com/',
  projectId: 'faceindine',
  storageBucket: 'faceindine.appspot.com',
  messagingSenderId: '845977450481',
  appId: '1:845977450481:web:ea6a9d0616d654af7f3650',
  measurementId: 'G-TVK8JLGNJF',
});

const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage, firebase };