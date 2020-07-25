import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAjsYjBi70seSKENP03EGZqLm8lJOMKIP0",
    authDomain: "gossip-ca35d.firebaseapp.com",
    databaseURL: "https://gossip-ca35d.firebaseio.com",
    projectId: "gossip-ca35d",
    storageBucket: "gossip-ca35d.appspot.com",
    messagingSenderId: "818496013910",
    appId: "1:818496013910:web:b67daee44a0b799f1c1df7",
    measurementId: "G-Y6ME1GNJK3"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase;