import Sortable from "sortablejs"

const item = document.querySelector("#sortableitems")

const list = document.querySelector("#sortablelists")

const initSortable = () => {
  Sortable.create(item)
}

const initSortableForLists = () => {
  Sortable.create(list)
}

export { initSortable }
export { initSortableForLists }
