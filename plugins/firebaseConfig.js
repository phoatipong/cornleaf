import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Cloud Firestore through Firebase

const firebaseConfig = {
  apiKey: 'AIzaSyDyxPtzrojHyg_vZzKV2h96202l_4SeIBg',
  authDomain: 'line-bot-bd566.firebaseapp.com',
  databaseURL:
    'https://line-bot-bd566-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'line-bot-bd566',
  storageBucket: 'line-bot-bd566.appspot.com',
  messagingSenderId: '567162145132',
  appId: '1:567162145132:web:16d4c46dde4ad92f8c4b49',
  measurementId: 'G-ED157P0QNJ',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
