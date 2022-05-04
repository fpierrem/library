let myLibrary = [];

function Book(title,author,genre,year,numPages) {
  this.title = title
  this.author = author
  this.genre = genre
  this.year = year
  this.numPages = numPages
}

let books = document.getElementById('books');

const testBook = new Book('My Life','John','Memoirs',2010,100)
const testBook2 = new Book('My Dreams','Eve','Memoirs',2011,200)
addBookToLibrary(testBook);
addBookToLibrary(testBook2);


function addBookToLibrary(book) {
  myLibrary.push(book)
}

function displayAllBooks() {
  myLibrary.forEach(displayBook);
}

function displayBook(book) {
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

function modalControl() {
  
  const newBookButton = document.getElementById('new-book-button');
  const newBookModal = document.getElementById('new-book-modal');
  const submitButton = document.getElementById('submit-button');
  
  newBookButton.onclick = () => {
    showModal();
    submitButton.onclick = () => {
      processInput();
      closeModal();
    }
    window.onclick = (event) => {
      if (event.target === newBookModal) {
        closeModal();
      }
    }
  }

  function showModal() {
    newBookModal.style.visibility = "visible";
  }

  function closeModal() {
    newBookModal.style.visibility = "hidden";
  }

  function processInput() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const numPages = document.getElementById('numPages').value;
    const genre = document.getElementById('genre').value;
    const book = new Book(title,author,genre,year,numPages);
    addBookToLibrary(book);
    displayBook(book);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  displayAllBooks();
  modalControl();
})

