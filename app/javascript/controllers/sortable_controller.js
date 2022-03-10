import Sortable from "sortablejs"

const list = document.querySelector("#enablesortable")

const initSortable = () => {
  Sortable.create(list)
}
