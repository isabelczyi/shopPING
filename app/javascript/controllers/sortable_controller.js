import Sortable from "sortablejs"

const list = document.querySelector("#enablesortable")

// const initSortable = () => {
//   Sortable.create(list)
// }



new Sortable(list, {
  animation: 150,
  ghostClass: 'blue-background-class'
});
