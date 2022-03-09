import Sortable from "sortablejs"

const list = document.querySelector("#itemcard")

const initSortable = () => {
  Sortable.create(list)
}

export { initSortable }
