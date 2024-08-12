// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT5IkGOkh-Z6rAk_56F2gkTwRdP8SZmgk",
  authDomain: "minihakathon-e80de.firebaseapp.com",
  databaseURL: "https://minihakathon-e80de-default-rtdb.firebaseio.com",
  projectId: "minihakathon-e80de",
  storageBucket: "minihakathon-e80de.appspot.com",
  messagingSenderId: "169453491722",
  appId: "1:169453491722:web:6085b09a7d731c1a6b31f3",
  measurementId: "G-LRC3YHJ7SE"
};

// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);

var email = document.getElementById('email');
var password = document.getElementById('password');

window.loginUser = function () {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(function (res) {
      // console.log(res);
      var id = res.user.uid;
      var reference = ref(db, `user/${id}`);
      onValue(reference, function (data) {
        // console.log(data.value);
        window.location.assign("/index.html");
      })

    })
    .catch(function (err) {
      alert(err.message);
    })

}