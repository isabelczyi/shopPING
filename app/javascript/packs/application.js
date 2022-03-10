// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "controllers"
import "bootstrap"
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyD4OGCL0cOHbpPoMW0Gvw2x_asG9hv_2EY",

  authDomain: "shopping-30de3.firebaseapp.com",

  projectId: "shopping-30de3",

  storageBucket: "shopping-30de3.appspot.com",

  messagingSenderId: "517823355048",

  appId: "1:517823355048:web:c91c1a6852b36ca5a14a9d",

  measurementId: "G-BGMZGE5CY5"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);


const toggleCheckbox = (event) => {
  event.preventDefault()
  const link = event.currentTarget
  // const scrollPosition = Window.scrollTop
  // console.log(scrollPosition)
  console.log('clicked')
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  const url = `/items/${event.currentTarget.dataset.itemId}/completed_toggle` + '.json'
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    method: "POST"
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data)
      if (data.completed) {
        link.innerHTML = "<i class='far fa-check-square checkbox'></i>"
      } else {
        link.innerHTML = "<i class='far fa-square checkbox'></i>"
      }
    })
}

document.addEventListener('turbolinks:load', (e) => {
  const checkboxes = document.querySelectorAll('#checkbox')
  console.log(checkboxes)
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', toggleCheckbox)
  })
})



function getLocation() {
  console.log("get location")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geo Location not supported by browser");
  }
}

//function that retrieves the position
function showPosition(position) {

  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  const url = "/items/near.json"
  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({ "lat": position.coords.latitude, "lon": position.coords.longitude }),
    method: "POST"
  })
    .then(response => response.json())
    .then((data) => {

      console.log(data)
      Notification.requestPermission().then(function (result) {
        console.log(result);
        if (result === 'granted' && data.item_exist) {
          const img = "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg";
          const text = data.message;
          const title = "An item is nearby"
          const options = {
            body: text,
            icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
            vibrate: [200, 100, 200],
            image: img,
            badge: "https://spyna.it/icons/android-icon-192x192.png",
            actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
          };
          // new Notification(title, options);
          // serviceWorkerRegistration.showNotification(title, [options]);
        }
      });

    })
    .catch((error) => {
      console.log(error)
    })

}

//request for location
setInterval(getLocation, 5000)

// Notification.requestPermission().then(function (result) {
//   console.log(result);
//   if (result === 'granted') {
//       // navigator.serviceWorker.ready.then(function (registration) {
//       //   registration.showNotification('Vibration Sample', {
//       //     body: 'Buzz! Buzz!',
//       //     icon: '../images/touch/chrome-touch-icon-192x192.png',
//       //     vibrate: [200, 100, 200, 100, 200, 100, 200],
//       //     tag: 'vibration-sample'
//       //   });
//       // });
//     var notification = new Notification("Hi there!");
//     }
// });

// navigator.serviceWorker.register('sw.js');

// function showNotification() {
//   Notification.requestPermission(function (result) {
//     if (result === 'granted') {
//       navigator.serviceWorker.ready.then(function (registration) {
//         registration.showNotification('Vibration Sample', {
//           body: 'Buzz! Buzz!',
//           icon: '../images/touch/chrome-touch-icon-192x192.png',
//           vibrate: [200, 100, 200, 100, 200, 100, 200],
//           tag: 'vibration-sample'
//         });
//       });
//     }
//   });
// }


// showNotification();
