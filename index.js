let myLibrary = [];

function Book(title,author,genre,year,numPages) {
  this.title = title
  this.author = author
  this.genre = genre
  this.year = year
  this.numPages = numPages
}

const testBook = new Book('My Life','John','Memoirs',2010,100)
const testBook2 = new Book('My Dreams','Eve','Memoirs',2011,200)

function addBookToLibrary(book) {
  myLibrary.push(book)
}

addBookToLibrary(testBook);
addBookToLibrary(testBook2);

function displayBooks() {
    const books = document.getElementById('books');
    myLibrary.forEach(displayBook);
    function displayBook(book) {
      console.log(book);
      const card = document.createElement('div');
      card.className = "card";
      card.innerHTML =
        `
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
          <p class="card-text">
          Genre: ${book.genre}<br>
          Year: ${book.year}<br>
          Pages: ${book.numPages}</p>
          <a href="#" class="card-link">Link</a>
          <a href="#" class="card-link">Link</a>
        </div>
        `;    
      books.append(card);
    }
  }

document.addEventListener('DOMContentLoaded', displayBooks)