import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDAMcMvRyu7BcfjXx7xzo56P3DfQ_gELu4",
    authDomain: "junkshapp-62721.firebaseapp.com",
    databaseURL: "https://junkshapp-62721.firebaseio.com",
    projectId: "junkshapp-62721",
    storageBucket: "junkshapp-62721.appspot.com",
    messagingSenderId: "293639282413",
    appId: "1:293639282413:web:424d7feccf185fe06476e4",
    measurementId: "G-LR04Z9YZHP",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectStorage, projectFirestore, projectAuth };
