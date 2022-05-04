let myLibrary = [];

function Book(title,author,genre,year,numPages) {
  this.title = title
  this.author = author || "n/a"
  this.genre = genre
  this.year = year || "n/a"
  this.numPages = numPages || "n/a"
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
    <div data-id="${myLibrary.length}" id="book-card" class="book-card">
      <h5 class="card-title">${book.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
      <p class="card-text">
      Genre: ${book.genre}<br>
      Year: ${book.year}<br>
      Pages: ${book.numPages}</p>
      <button class="delete-button" id="delete-button">Remove</button>
      <a href="#" class="card-link">Link</a>
    </div>
    `;    
  books.append(card);
}

function modalControl() {
  
  const newBookButton = document.getElementById('new-book-button');
  const newBookModal = document.getElementById('new-book-modal');
  const newBookForm = document.getElementById('new-book-form');
  
  newBookButton.onclick = () => {
    showModal();
    newBookForm.onsubmit = () => {
      processInput();
      newBookForm.reset();
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
    const title = document.getElementById('new-book-form')['title'].value;
    const author = document.getElementById('new-book-form')['author'].value;
    const year = document.getElementById('new-book-form')['year'].value;
    const numPages = document.getElementById('new-book-form')['numPages'].value;
    const genre = document.getElementById('new-book-form')['genre'].value;
    const book = new Book(title,author,genre,year,numPages);
    addBookToLibrary(book);
    displayBook(book);
    buttonsControl();
  }
}

function buttonsControl() {
  document.querySelectorAll("#book-card").forEach((element) => {
    const bookIndex = element.dataset.id;
    const book = myLibrary[bookIndex];
    const card = element.parentNode;
    const deleteButton = element.querySelector("#delete-button");
    // const readButton = element.querySelector("#read-button");

    deleteButton.onclick = () => {
      myLibrary.splice(bookIndex);
      card.remove();
    }
    // readButton.onclick = () => {
    //   alert('read');
    // }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  displayAllBooks();
  modalControl();
  buttonsControl();
})

