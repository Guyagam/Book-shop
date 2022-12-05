'use strict'
const STORAGE_KEY = 'bookDB'
var gBooks
var gFilterBy = { maxPrice: 100, minRate: 0 }
const PAGE_SIZE = 4

var gPageIdx = 0

_createBooks()

function getBooks() {
  var books = gBooks.filter(book => book.price <= gFilterBy.maxPrice &&
    book.rate >= gFilterBy.minRate)
  var startIdx = gPageIdx * PAGE_SIZE
  return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function nextPage() {
  gPageIdx++
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0
  }
}

function goBack() {
  gPageIdx--
  if (gPageIdx * PAGE_SIZE <= gBooks.length) {
    gPageIdx = 0
  }
}

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY)
  if (!books || !books.length) {
    books = []
    books.push(_createBook('Harry potter', '24.90', `pic/HarryPotter.jpg`))
    books.push(_createBook('Nerd diary', '19.90', `pic/nerdDiary.jpg`))
    books.push(_createBook('The Hitchhiker Guide to the Galaxy', '40.00', `pic/galaxy.jpg`))
    books.push(_createBook('Bagle Dog', '22.90', `pic/bagle.jpg`))
    books.push(_createBook('Bibi Bio', '65.90', `pic/bibi.jpg`))
    books.push(_createBook('Harry Potter 4', '40.00', `pic/HarryPotter4.jpg`))
    books.push(_createBook('Harry Potter 7', '70.00', `pic/HarryPotter7.jpg`))
    books.push(_createBook('Kofiko', '30.00', `pic/kofiko.jpeg`))
    books.push(_createBook('fantasy book', '21.90'))
  }
  gBooks = books
  _saveBooksToStorage()
}


function _createBook(txt, price, img = `pic/generic.jpeg`) {
  return {
    id: makeId(),
    name: txt,
    price: price,
    imgUrl: img,
    rate: 0
  }
}

function deleteBook(id) {
  const bookIdx = gBooks.findIndex(book => id === book.id)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function addBook(name, price) {
  const book = _createBook(name, price)
  gBooks.unshift(book)
  _saveBooksToStorage()
  return book
}

function updateBook(bookId, bookPrice) {
  const book = gBooks.find(book => bookId === book.id)
  book.price = bookPrice
  return book
}

function readBookModal(bookId) {
  const book = gBooks.find(book => bookId === book.id)
  return book
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks)
}

function changeRate(diff, bookId) {
  const book = gBooks.find(book => bookId === book.id)
  if (book.rate + diff < 0 || book.rate + diff > 10) return
  book.rate += diff
  _saveBooksToStorage()
  console.log(book.rate)
  return book
}

function setBookFilter(filterBy = {}) {
  if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
  if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
  return gFilterBy
}

// 