import { Controller } from "@hotwired/stimulus"
import Hammer from "hammerjs"

export default class extends Controller {


  connect() {
    // Create a manager to manager the element
    this.hammer = new Hammer.Manager(this.element);

    // Create a recognizer
    var Swipe = new Hammer.Swipe();

    // Add the recognizer to the manager
    this.hammer.add(Swipe);
    // this.hammer.on("swipeleft", (e)=>{console.log("swipeleft")});
    this.hammer.on("swipeleft", this.openOptions.bind(this));
    this.hammer.on("swiperight", this.closeOptions.bind(this));
  }

  openOptions(e) {
    this.element.classList.add("open")
  }

  closeOptions(e) {
    this.element.classList.remove("open")
  }

}
