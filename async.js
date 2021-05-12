// Console log message to prove that this file is linked correctly.
console.log("Script is running...")

// HTML elements constants
const mainButton = document.querySelector("#mainButton")
const input = document.querySelector("#input")
const topic = document.querySelector("#search-topic")
const wrapper = document.querySelector("#img-wrapper")
const bookList = document.querySelector("#book-list")

// Search button event to trigger the API calls and content creation.
mainButton.addEventListener('click', (e) => {
  topic.innerHTML = input.value
  searchTerm = input.value.replace(" ", "+")
  sendGiphyApiRequest(searchTerm)
  sendGoogleBooksApiRequest(searchTerm)
})

// API Keys
const GOOGLE_BOOKS_API_KEY = 'AIzaSyA0GNfs3Iap8aERZY5l2a6M32Dd9Xmo3As'
const GIPHY_API_KEY = 'lYXLddOD4MN1bNlMhtYgbBrAGmnhVx78'

// Puts together the rows for each book returned from the request.
async function sendGoogleBooksApiRequest(searchRequest) {
  // console log message to prove function was accessed
  console.log("Accessing Google Books API")
  let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchRequest}&key=${GOOGLE_BOOKS_API_KEY}&orderBy=relevance&printType=books`)
  let books = await response.json()
  bookList.innerHTML = ""
  // Loop through each book and print it's row with 2 columns
  for (let book of books.items) {
    console.log(book)
    let book_img = `<div class="col-sm-3 col-12"><img src="" /></div>`
    let book_title = ""
    let book_subtitle = ""
    let book_authors = ""
    let book_description = ""
    let book_link = ""
    let book_row = ""
    if (book.volumeInfo.hasOwnProperty("imageLinks")) {
      book_img = `<div class="col-sm-3 col-12"><img src="${book.volumeInfo.imageLinks.thumbnail}" /></div>`
    }
    book_title = `<h2>${book.volumeInfo.title}</h2>`
    if (book.volumeInfo.hasOwnProperty("subtitle")) {
      book_subtitle = `<h3>${book.volumeInfo.subtitle}</h3>`
    }
    if (book.volumeInfo.hasOwnProperty("authors")) {
      book_authors = `<h4>By ${book.volumeInfo.authors}</h4>`
    }
    if (book.volumeInfo.hasOwnProperty("description")) {
      // shorten the description to around 200 characters
      // cuts off after last word
      let last_index = book.volumeInfo.description.indexOf(' ', 200)
      let shorten_description = book.volumeInfo.description.substring(0, last_index)
      book_description = `<p>${shorten_description}...</p>`
    }
    book_link = `<a href="${book.volumeInfo.canonicalVolumeLink}" class="btn btn-dark" target="_blank">Read More</a>`
    
    book_row = `<div class="row">${book_img}<div class="col-sm-9 col-12">${book_title} ${book_subtitle} ${book_authors} ${book_description} ${book_link}</div></div>`
    bookList.innerHTML += book_row
  }
  // console log message to prove function was completed
  console.log("Book rows generated.")
}

// Adds a random GIPHY image based on the topic searched
async function sendGiphyApiRequest(searchRequest) {
  // console log message to prove function was accessed
  console.log("Accessing Giphy API")
  let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchRequest}&limit=25&offset=0&rating=G&lang=en`)
  let gifs = await response.json()
  const imageURL = gifs.data[Math.floor((Math.random() * gifs.data.length) + 1)].images.original.url
  addImageToScreen(imageURL, wrapper)
  // console log message to prove function was completed
  console.log("GIPHY generated")
}

// Adds an image to the element.
async function addImageToScreen(myURL, element) {
  element.innerHTML = `<img src="${myURL}" />`
}