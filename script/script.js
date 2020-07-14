let books = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    let wasRead = 'already read';
    if (!this.read) {
      wasRead = 'not read yet';
    }
    return `<div class='card-body'>
              <h5 class='card-title'>${this.title}</h5>
              <h6 class='card-subtitle mb-2 text-muted'>${this.author}</h6>
              <p class='card-text'>
                ${this.pages} pages, ${wasRead}.
              </p>
            </div>`;
  };
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

function render(books) {
  let html = '';
  books.forEach((b, i) => {
    html += `<div data-attribute='book_${i}' class='card m-1 bg-light' style='width: 15rem;'>
              ${b.info()}
            </div>`;
  });
  document.getElementById('books_list').innerHTML = html;
}

function renderLast(books) {
  const html = `<div data-attribute='book_${books.length - 1}' class='card m-1 bg-light' style='width: 15rem;'>
                  ${books[books.length - 1].info()}
                </div>`;
  document.getElementById('books_list').innerHTML += html;
  altForm();
}

function addBook(title, author, pages, read) {
  books.push(new Book(title, author, pages, read));
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
  renderLast(books);
});

addBook('Lazarillo de Tormes', 'Anonymous', 100, false);
addBook('Divine Comedy', 'Dante Alighieri', 200, true);
addBook('Object-Oriented Programming', 'Luis Joyanes Aguilar', 300, false);
addBook('Data Structures', 'Osvaldo Cairo', 200, true);

render(books);
