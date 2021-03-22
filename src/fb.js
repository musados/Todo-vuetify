import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC8MCf5k_wnhyYq9inVShBUTdjwfiIPbVo",
    authDomain: "todo-ninja-4253c.firebaseapp.com",
    projectId: "todo-ninja-4253c",
    storageBucket: "todo-ninja-4253c.appspot.com",
    messagingSenderId: "479048004114",
    appId: "1:479048004114:web:bbd90308bbc32a8ba51ecb",
    measurementId: "G-93B7WZ0H3Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  db.settings({timestampsInSnapshots: true});
  export default db;