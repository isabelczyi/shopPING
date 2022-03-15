// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import Swal from 'sweetalert2'
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()

import "controllers"
import "bootstrap"

const svgContainer = document.getElementById('confetti_svg');
const animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: 'svg',
  loop: false,
  autoplay: false,
  path: 'https://assets1.lottiefiles.com/packages/lf20_rovf9gzu.json'
});

const playConfetti = () => {
  animItem.goToAndPlay(0, true)
}

const toggleCheckbox = (event) => {
  event.preventDefault()
  const link = event.currentTarget
  // const scrollPosition = Window.scrollTop
  // console.log(scrollPosition)
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
        playConfetti()
        link.innerHTML = "<i class='far fa-check-square checkbox'></i>"
      } else {
        link.innerHTML = "<i class='far fa-square checkbox'></i>"
      }
    })
}

document.addEventListener('turbolinks:load', (e) => {
  const checkboxes = document.querySelectorAll('#checkbox')
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', toggleCheckbox)
  })
})



function getLocation() {
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
      Notification.requestPermission().then(function (result) {
        if (result === 'granted' && data.item_exist) {
          // Swal.fire({ imageUrl: 'https://i.pinimg.com/originals/43/d8/21/43d821d6b6d6e6c2424a9415a8e00ed0.png', title: `${data.message}`, confirmButtonColor: '#8D6A44'})
               // works on firefox localhost
          const img = "https://cdn-icons-png.flaticon.com/512/2331/2331966.png";
          const text = data.message;
          const title = "shopPING!"
          const options = {
            tag: `${data.item_ids}`,
            body: text,
            icon: "https://cdn-icons-png.flaticon.com/512/2331/2331966.png",
            vibrate: [200, 100, 200],
            image: img,
            badge: "https://cdn-icons-png.flaticon.com/512/2331/2331966.png",
            actions: { action: "Detail", title: "View", icon: "https://cdn-icons-png.flaticon.com/512/2331/2331966.png" }
          };
          new Notification(title, options);
          console.log(data.item_ids)
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
