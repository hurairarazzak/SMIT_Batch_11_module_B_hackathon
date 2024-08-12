// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();

// Update element IDs to match HTML
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

window.signupUser = function() {

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validate passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // Create user with Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then(function(userCredential) {
      const user = userCredential.user;

      // Create user object
      const userObj = {
        userName: username,
        email: email,
        password: password,
        id: user.uid
      };

      // Save user data to Firebase Realtime Database
      const userRef = ref(db, `users/${user.uid}`);
      return set(userRef, userObj);
    })
    .then(function() {
      alert('User signed up successfully!');
      // Clear form fields
      usernameInput.value = '';
      emailInput.value = '';
      passwordInput.value = '';
      confirmPasswordInput.value = '';
      // Redirect to Home page
      window.location.assign("/index.html");
    })
    .catch(function(error) {
      let errorMessage = error.message;
      if (errorMessage.startsWith('Firebase: ')) {
        errorMessage = errorMessage.replace('Firebase: ', 'Error: ');
      }
      alert(errorMessage);
    });
};