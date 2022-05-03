let myLibrary = [];

function Book(title,author,genre,year,numPages) {
  this.title = title
  this.author = author
  this.genre = genre
  this.year = year
  this.numPages = numPages
}

const testBook = new Book('My Life','John','Memoirs',2010,100)

console.log(testBook);

function addBookToLibrary(book) {
  myLibrary.push(book)
}

addBookToLibrary(testBook);

console.log(myLibrary);

function displayBooks() {
    const books = document.getElementById('books');
    myLibrary.forEach(displayBook);
    function displayBook(book) {
      console.log(book);
      const card = document.createElement('div');
      card.className = "card";
      card.innerHTML =
        `
        <div class="title">${book.title}</div>
        <div class="author">${book.author}</div>
        <div class="genre">${book.genre}</div>
        <div class="year">${book.year}</div>
        <div class="numPages">${book.numPages}</div>
        `;    
      books.append(card);
    }
  }

document.addEventListener('DOMContentLoaded', displayBooks)