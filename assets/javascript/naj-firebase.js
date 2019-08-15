//Initialize Firebase

var config = {
    apiKey: "AIzaSyD74D1Kb4FH2rITrFDIUZdPA8HbYAuwsfw",
    authDomain: "chat-room-cf80f.firebaseapp.com",
    databaseURL: "https://chat-room-cf80f.firebaseio.com",
    projectId: "chat-room-cf80f",
    storageBucket: "",
    messagingSenderId: "344411525812",
    appId: "1:344411525812:web:07204adbf657c6c5"
};

firebase.initializeApp(config);

var database = firebase.database();

