import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FirebaseDatabase, initializeFirebase } from "refine-firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAvdZud5Yc-Ue4vez9vWRLLdXw43gghTnc",
    authDomain: "transport-app-bcc7a.firebaseapp.com",
    databaseURL: "https://transport-app-bcc7a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "transport-app-bcc7a",
    storageBucket: "transport-app-bcc7a.firebasestorage.app",
    messagingSenderId: "242533527550",
    appId: "1:242533527550:web:acef7defade3f653d85aaf"
};

export const firebaseApp = initializeFirebase(firebaseConfig);


export const firebasedatabase = new FirebaseDatabase();