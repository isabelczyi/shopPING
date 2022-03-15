import { Controller } from "stimulus"
import Sortable from "sortablejs"

const list = document.querySelector("#enablesortable")
export default class extends Controller {
static targets = ["list"]

  connect() {
    console.log(this.listTarget);
    this.initSortable()
  }
  initSortable() {
    Sortable.create(this.listTarget, {
      draggable: ".sortable-draggable",
      ghostClass: "ghost",
      animation: 150,
      delay: 100, // time in milliseconds to define when the sorting should start
	    delayOnTouchOnly: false,
      onEnd: this.updateItemPosition.bind(this)
    })
  }

  updateItemPosition(evt) {
    console.log("Call api to update position")
    console.log('old position', evt.oldIndex)
    console.log('new position', evt.newIndex)
    // fetch to update position of item (update item path)
    // hand in the new position + 1 as the new position
    // once successful, cool haha

  }
}
