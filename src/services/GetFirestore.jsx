import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDuY0CdyXNll5eNsBSkJPVFDzGLj7PMRJQ",
  authDomain: "maiz-msaromas2.firebaseapp.com",
  projectId: "maiz-msaromas2",
  storageBucket: "maiz-msaromas2.appspot.com",
  messagingSenderId: "907480240128",
  appId: "1:907480240128:web:4fec8345cc0b3e1c9588e5"
};

const catalogue = firebase.initializeApp(firebaseConfig)

export function getFirestore(){    
    return firebase.firestore(catalogue)
}