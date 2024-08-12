// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
// import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getDatabase,
    ref,
    onValue,
    remove,
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

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
const db = getDatabase();

// Data Renderring Function

var container = document.getElementById("container");
var userData = [];

function renderUserData() {
    for (let i = 0; i < userData.length; i++) {
        var obj = userData[i];

        container.innerHTML += `<div class="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <img src="${obj.imageUpload}" alt="Profile Picture" class="w-24 h-24 rounded-full object-cover mb-4">
                <h5 class="text-xl font-semibold mb-2">${obj.name}</h5>
                <p class="text-gray-700 mb-2"><strong>Father's Name:</strong> ${obj.fatherName}</p>
                <p class="text-gray-700 mb-2"><strong>CNIC:</strong> ${obj.cnic}</p>
                <p class="text-gray-700 mb-2"><strong>Date of Birth:</strong> ${obj.dob}</p>
                <p class="text-gray-700 mb-2"><strong>Address:</strong> ${obj.address}</p>
                <p class="text-gray-700 mb-2"><strong>Course:</strong> ${obj.course}</p>
            </div>
`
    };
};


function DataInBrowser() {
    var reference = ref(db, "userData");
    onValue(reference, function (data) {
        console.log(data.val());
        if (data.val()) {
            userData = Object.values(data.val())
            renderUserData();
        };
    })
}

DataInBrowser();