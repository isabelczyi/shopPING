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

import { initSortable } from "controllers/sortable"
initSortable()


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
