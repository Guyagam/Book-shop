'use strict'


function onInit() {
  renderBooksTable()
  // renderprice()
  // renderRate()
}


function renderBooksTable() {
  const books = getBooks()
  console.log(books)
  const strHTMLs = books.map(book => {
    return `<tr>
      <td>${book.id}</td>
      <td onclick="sortByHeader(this)">${book.name}</td>
      <td onclick="sortByHeader(this)">${book.price}</td>
      <td><button class="Readbtn" onclick="showModal('${book.id}')">Read</button></td>
      <td><button class="Updatebtn" onclick="onUpdateBook('${book.id}')">Update</button></td>
      <td><button class="Deletebtn" onclick="onRemoveBook('${book.id}')">Delete</button></td>
      </tr>`
  })
  document.querySelector('tbody').innerHTML = strHTMLs.join('')
  if (gPageIdx !== 0) {
    document.querySelector('.lastPage').disabled = false
  } else document.querySelector('.lastPage').disabled = true
}

function onRemoveBook(id) {
  deleteBook(id)
  renderBooksTable()
  alert(`book Deleted`)
}

function onAddBook() {
  const NAME = prompt('enter name:')
  const PRICE = +prompt('enter price:')
  addBook(NAME, PRICE)
  renderBooksTable()
}

function onUpdateBook(bookId) {
  const Price = +prompt('update price:')
  updateBook(bookId, Price)
  renderBooksTable()
}

function showModal(bookId) {
  const book = readBookModal(bookId)
  document.querySelector('.modal h4 span').innerText = book.name
  document.querySelector('.modal h5 span').innerText = book.price
  document.querySelector('.modalImg').src = book.imgUrl
  document.querySelector('.modal').style.display = 'block'
  document.querySelector('.rating').innerHTML = ` <button onclick="onChangeRate(-1,'${bookId}')">-</button>
  <span class="rate">${book.rate}</span>
  <button onclick="onChangeRate(1,'${bookId}')">+</button>`
}
function onCloseModal() {
  document.querySelector('.modal').style.display = 'none'
}

function onChangeRate(diff, bookId) {
  var updatedBook = changeRate(diff, bookId)
  if (!updatedBook) return
  document.querySelector('.rate').innerText = updatedBook.rate
}


function onSetFilterBy(filterBy) {
  filterBy = setBookFilter(filterBy)
  renderBooksTable()
  const queryStringParams = `?maxPrice=${filterBy.maxPrice}`
  const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}

function onNextPage() {
  nextPage()
  renderBooksTable()
}

function onBackPage() {
  goBack()
  renderBooksTable()
}

function sortByHeader(eltd) {

}