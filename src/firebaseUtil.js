import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBRod06Y4ymJEgXXzft0U3iG4pd3noaX5c",
    authDomain: "sap003-burguer-queen.firebaseapp.com",
    databaseURL: "https://sap003-burguer-queen.firebaseio.com",
    projectId: "sap003-burguer-queen",
    storageBucket: "sap003-burguer-queen.appspot.com",
    messagingSenderId: "743955124897",
    appId: "1:743955124897:web:be368ce71c9975274916e0",
    measurementId: "G-9JMSZWNW44"
};

export const firebaseInit = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();