let books = [];

function showForm() {
  document.getElementById("frmNewBook").className = "card";
  document.getElementById("btnNewBook").innerHTML = "Cancel";
  document.getElementById("btnNewBook").addEventListener("click", function () {
    hideForm();
  });
}

function hideForm() {
  document.getElementById("frmNewBook").className = "card d-none";
  document.getElementById("btnNewBook").innerHTML = "New Book";
  document.getElementById("btnNewBook").addEventListener("click", function () {
    showForm();
  });
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    if (this.read) {
      return `<div class="card-body">
      <h5 class="card-title">${this.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${this.author}</h6>
      <p class="card-text">
      ${this.pages} pages, already read.
      </p>
    </div>`;
    }
    return `<div class="card-body">
      <h5 class="card-title">${this.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${this.author}</h6>
      <p class="card-text">
      ${this.pages} pages, not read yet.
      </p>
    </div>`;
  };
}

function addBook(title, author, pages, read) {
  books.push(new Book(title, author, pages, read));
}

function render(books) {
  let html = "";
  books.forEach(function (b, i) {
    // Output to HTML
    html += `<div data-attribute="book_${i}" class="card" style="width: 18rem;">
    ${b.info()}
    </div>`;
  });
  document.getElementById("books_list").innerHTML = html;
}

function renderLast(books){
   let html = `<div data-attribute="book_${books.length - 1}" class="card" style="width: 18rem;">
   ${books[books.length - 1].info()}
   </div>`;
   document.getElementById("books_list").innerHTML = html;
}

// const book1 = new Book("Lazarillo de Tormes", "Anonimo");
// book1.pages = 300;
// book1.read = true;
//console.log(book1.info());

addBook("Lazarillo de Tormes1", "Anonimo1", 100, false);
addBook("Lazarillo de Tormes2", "Anonimo2", 200, true);
addBook("Lazarillo de Tormes3", "Anonimo3", 300, false);

render(books);

document.getElementById("btnNewBook").addEventListener("click", function () {
  showForm();
});

document
.getElementById("addBook")
.addEventListener("click", function () {
  let title = document.getElementById("txtTitle").value;
  let author = document.getElementById("txtAuthor").value;
  let pages = document.getElementById("txtPages").value;
  let read = document.getElementById("chkRead").checked;

  addBook(title, author, pages, read);
  renderLast(books);
});
