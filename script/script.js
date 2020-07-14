// localStorage.clear();

let books = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  let wasRead = 'already read';
  if (!this.read) {
    wasRead = 'not read yet';
  }
  return `<h5 class='card-title'>${this.title}</h5>
          <h6 class='card-subtitle mb-2 text-muted'>${this.author}</h6>
          <p class='card-text'>
            ${this.pages} pages, ${wasRead}.
          </p>`;
};

if(localStorage.getItem('books_array')) {
  books = JSON.parse(localStorage.getItem("books_array") || "[]").map(book => Object.assign(new Book(), book));
  // books.forEach(
  //   b => {
  //     b.prototype = Object.create(Book.prototype)
  //   }
  // );
  console.log(books);
}

function localStoreBooks(books){
  localStorage.clear();
  localStorage.setItem("books_array", JSON.stringify(books));
}

function altForm() {
  const formStyle = document.getElementById('frmNewBook').className;
  if (formStyle.includes('d-none')) {
    document.getElementById('frmNewBook').className = 'card mb-3';
    document.getElementById('btnNewBook').innerHTML = 'Cancel';
  } else {
    document.getElementById('frmNewBook').className = 'card mb-3 d-none';
    document.getElementById('btnNewBook').innerHTML = 'New Book';
  }
}

function addBook(title, author, pages, read) {
  books.push(new Book(title, author, pages, read));
  localStoreBooks(books);
}

function removeBook(index) {
  books.splice(index, 1);
  localStoreBooks(books);
}

function readBook(index) {
  if (books[index].read) {
    books[index].read = false;
  }
  else {
    books[index].read = true;
  }
  localStoreBooks(books);
}

function render(books) {
  let html = '';
  books.forEach((b, i) => {
    let strButtonReadName = 'Read';
    let strButtonReadClass = 'success';
    if (books[i].read) {
      strButtonReadName = 'Reset';
      strButtonReadClass = 'warning';
    }
    html += `<div data-bookid='book_${i}' class='card m-1 bg-light' style='width: 15rem;'>
              <div class='card-body'>
                ${b.info()}
                <button id='btnReadBook_${i}' class='btn btn-${strButtonReadClass}'>${strButtonReadName}</button>
                <button id='btnRemoveBook_${i}' class='btn btn-danger'>Remove</button>
              </div>
            </div>`;
  });
  document.getElementById('books_list').innerHTML = html;
  books.forEach((b, i) => {
    document.getElementById(`btnReadBook_${i}`).addEventListener('click', () => {
      readBook(i);
      render(books);
    });
    document.getElementById(`btnRemoveBook_${i}`).addEventListener('click', () => {
      removeBook(i);
      render(books);
    });
  });
}

document.getElementById('btnNewBook').addEventListener('click', () => {
  altForm();
});

document.getElementById('btnAddBook').addEventListener('click', () => {
  const title = document.getElementById('txtTitle').value;
  const author = document.getElementById('txtAuthor').value;
  const pages = Number.parseInt(document.getElementById('txtPages').value, 10);
  const read = document.getElementById('chkRead').checked;

  addBook(title, author, pages, read);
  render(books);
});

// addBook('Lazarillo de Tormes', 'Anonymous', 100, false);
// addBook('Divine Comedy', 'Dante Alighieri', 200, true);
// addBook('Object-Oriented Programming', 'Luis Joyanes Aguilar', 300, false);
// addBook('Data Structures', 'Osvaldo Cairo', 200, true);

render(books);
