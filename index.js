let myLibrary;

function Book(title,author,genre,year,numPages,read) {
  this.title = title;
  this.author = author || "n/a";
  this.genre = genre || "n/a";
  this.year = year || "n/a";
  this.numPages = numPages || "n/a";
  this.read = read;
}

let books = document.getElementById('books');

const exampleBook = new Book('Example title','Author','Essay',2010,200,true);

// Back-end functions
function checkLocalStorage() {
  if (localStorage.getItem('library')) {
    myLibrary = JSON.parse(localStorage.getItem('library'));
  } else {
    myLibrary = [];
    addBookToLibrary(exampleBook);
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateLocalStorage();
}

function removeBook(bookIndex) {
  console.log(bookIndex);
  myLibrary.splice(bookIndex,1);
  updateLocalStorage()
}

function markAsRead(bookIndex) {
  console.log(bookIndex);
  myLibrary[bookIndex].read = (myLibrary[bookIndex].read === true) ? false : true;
  updateLocalStorage()
}

function updateLocalStorage() {
  localStorage.setItem('library',JSON.stringify(myLibrary));
}

// UI functions
function displayAllBooks() {
  myLibrary.forEach(displayBook);
}

function displayBook(book) {
  const card = document.createElement('div');
  card.className = "card";
  card.innerHTML =
    `
    <div data-id="${myLibrary.indexOf(book)}" id="book-card" class="book-card">
      
      <i id="delete-button" class="delete-button fa-solid fa-xmark"></i>

      <h5 class="card-title">${book.title}&nbsp</h5>
      
      <h6 class="card-author">${book.author}</h6>

      <p class="card-info">
        Genre: ${book.genre}<br>
        Year: ${book.year}<br>
        Pages: ${book.numPages}
      </p>

      <div class="read-toggle-container">
        <label for="read-toggle">Read:
          <button type="button" id="read-toggle" role="switch" aria-checked=${book.read}>
            <span>yes</span><span>no&nbsp</span>  
          </button>
        </label>
      </div>

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
    const title = newBookForm['title'].value;
    const author = newBookForm['author'].value;
    const genre = newBookForm['genre'].value;
    const year = newBookForm['year'].value;
    const numPages = newBookForm['numPages'].value;
    const read = newBookForm['read'].checked;
    
    const book = new Book(title,author,genre,year,numPages,read);
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
    const readButton = element.querySelector("#read-toggle");

    deleteButton.onclick = () => {
      removeBook(bookIndex);
      card.remove();
    }

    readButton.onclick = () => {
      markAsRead(bookIndex);  
      readButton.setAttribute('aria-checked', book.read);
    }
  })
}


document.addEventListener('DOMContentLoaded', () => {
  checkLocalStorage();
  displayAllBooks();
  modalControl();
  buttonsControl();
  updateLocalStorage();
})

