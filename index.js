let myLibrary;

function Book(id,title,author,genre,year,numPages,read) {
  this.id = id;
  this.title = title;
  this.author = author || "n/a";
  this.genre = genre || "n/a";
  this.year = year || "n/a";
  this.numPages = numPages || "n/a";
  this.read = read;
}

const exampleBook = new Book(0,'Example title','Author','Essay',2010,200,true);

// Back-end functions
function checkLocalStorage() {
  if (localStorage.getItem('library')) {
    myLibrary = JSON.parse(localStorage.getItem('library'));
  } else {
    myLibrary = [];
    addBookToLibrary(exampleBook);
  }
}

function generateId() {
  let ids = myLibrary.map(book => book.id);
  console.log(ids);
  // NB- Spreading the array with three dots as Math.max expects all numbers to be passed as arguments
  console.log(Math.max(...ids));
  return Math.max(...ids) + 1;
}

function addBookToLibrary(book) {
  // console.log(localStorage.getItem('library'));
  myLibrary.push(book);
  updateLocalStorage();
}

function removeBook(book) {
  console.log(book.id);
  myLibrary.splice(myLibrary.indexOf(book),1);
  updateLocalStorage()
}

function markAsRead(book) {
  console.log(book.id);
  book.read = (book.read === true) ? false : true;
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
  let bookCards = document.getElementById('books');
  const card = document.createElement('div');
  card.className = "card";
  card.innerHTML =
    `
    <div data-id="${book.id}" id="book-card" class="book-card">
      
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
  bookCards.append(card);
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
    const id = generateId();
    const book = new Book(id,title,author,genre,year,numPages,read);
    addBookToLibrary(book);
    displayBook(book);
    buttonsControl();
  }
}

function buttonsControl() {
  document.querySelectorAll("#book-card").forEach((element) => {
    const id = Number(element.dataset.id);
    const book = myLibrary.find(b => b.id === id);
    const card = element.parentNode;
    const deleteButton = element.querySelector("#delete-button");
    const readButton = element.querySelector("#read-toggle");

    deleteButton.onclick = () => {
      removeBook(book);
      card.remove();
    }

    readButton.onclick = () => {
      markAsRead(book);  
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

