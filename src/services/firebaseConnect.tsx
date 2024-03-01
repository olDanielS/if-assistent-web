import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAn4KDlwPIzdgQ8K5taTLMd1MCL4IyRQRc",
    authDomain: "if-assistent.firebaseapp.com",
    projectId: "if-assistent",
    storageBucket: "if-assistent.appspot.com",
    messagingSenderId: "192081995267",
    appId: "1:192081995267:web:f1ef5ca8244f393bf2d036",
    measurementId: "G-CS7LLB4PEN"
  };

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)
const storange = getStorage(firebaseApp)

export {auth, db, storange};