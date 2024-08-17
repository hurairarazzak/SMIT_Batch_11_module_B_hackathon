import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebase configuration object
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
const analytics = getAnalytics(app); // Optional: Get Firebase Analytics
const db = getDatabase(app); // Get a reference to the Realtime Database
const storage = getStorage(app); // Get a reference to Firebase Storage

// Define a function to handle the form submission and image upload
window.uploadPost = function () {
  // Get form values from the HTML input elements
  var blogTitle = document.getElementById('blogTitle');
  var blogContent = document.getElementById('blogContent')
  var authorName = document.getElementById('authorName');
  var date = document.getElementById('date');
  var imageUpload = document.getElementById('imageUpload');

  // Create an object with the form data
  var obj = {
    blogTitle: blogTitle.value,
    blogContent: blogContent.value,
    authorName: authorName.value,
    date: date.value,
  };

  // Check if all required fields are filled
  if (!obj.blogTitle || !obj.blogContent || !obj.authorName || !obj.date) {
    alert('Please fill out all required fields.');
    return; // Stop execution if any field is empty
  }

  // Function to handle image upload
  let upload = () => {
    return new Promise((resolve, reject) => {
      let files = imageUpload.files[0]; // Get the selected file
      if (!files) {
        alert('Please upload an image.');
        return;
      }
      console.log(files);
      const randomNum = Math.random().toString().slice(2); // Generate a random number for the file blogTitle
      const storageRefPath = `images/${randomNum}`; // Define the storage path for the image
      const uploadRef = storageRef(storage, storageRefPath); // Create a reference to the storage location
      const uploadTask = uploadBytesResumable(uploadRef, files); // Start the file upload

      // Monitor the upload progress and handle completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done"); // Log upload progress
        },
        (error) => {
          console.error('Upload failed:', error); // Log errors
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref) // Get the download URL of the uploaded image
            .then((downloadURL) => {
              console.log("File available at", downloadURL); // Log the download URL
              resolve(downloadURL);
            })
            .catch((error) => {
              console.error('Failed to get download URL:', error); // Log errors
              reject(error);
            });
        }
      );
    });
  };

  // Upload the image and get its URL
  upload()
    .then((url) => {
      // Add the image URL to the object
      obj.imageUpload = url;

      // Store the object in the Realtime Database
      const newStudentRegistration = push(ref(db, "userData")); // Create a new reference in the database
      return set(newStudentRegistration, obj); // Save the object to the database
    })
    .then(() => {
      console.log("Registration Form Submitted Successfully"); // Log success message
    })
    .catch((err) => {
      console.error("Error: ", err); // Log errors
    });
};
