// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const auth = getAuth();

window.toggleMenu = function () {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// Function to update navbar visibility
function updateNavbar(user) {
    const signup = document.getElementById("signup");
    const login = document.getElementById("login");
    const logout = document.getElementById("logout");

    if (user) {
        signup.style.display = "none";
        login.style.display = "none";
        logout.style.display = "block";
    } else {
        signup.style.display = "block";
        login.style.display = "block";
        logout.style.display = "none";
    }
}

// Listen to auth state changes
onAuthStateChanged(auth, (user) => {
    updateNavbar(user);
});

window.logout = () => {
    signOut(auth)
        .then(() => {
            alert("Are You sure you want to logout?");
            localStorage.removeItem("users");
        })
        .catch((err) => {
            alert(err.message);
        });
}
