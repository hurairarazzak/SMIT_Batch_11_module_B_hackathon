// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
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

// Data Rendering Function

var blogContainer = document.getElementById("blog-container");
var blogData = [];

function renderBlogData() {
    blogContainer.innerHTML = '';  // Clear the container before rendering

    for (let i = 0; i < blogData.length; i++) {
        var obj = blogData[i];

        blogContainer.innerHTML += `<div class="bg-white p-6 rounded-lg shadow-md flex flex-col">
                <h2 class="text-2xl font-bold mb-2">${obj.blogTitle}</h2>
                <p class="text-gray-600 mb-4">${obj.blogContent}</p>
                <p class="text-gray-700"><strong>Author:</strong> ${obj.authorName}</p>
                <p class="text-gray-700"><strong>Date:</strong> ${obj.date}</p>
            </div>`;
    };
};

function loadBlogData() {
    var reference = ref(db, "userData");
    onValue(reference, function (data) {
        if (data.val()) {
            blogData = Object.values(data.val());
            renderBlogData();
        };
    });
}

loadBlogData();
