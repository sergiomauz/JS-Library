let books = []

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
  this.info = function () {
    if (this.read) {

 return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${this.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${this.author}</h6>
      <p class="card-text">
      ${this.pages} pages, already read.
      </p>
    </div>
  </div>`
    }
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${this.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${this.author}</h6>
      <p class="card-text">
      ${this.pages} pages, not read yet.
      </p>
    </div>
  </div>`;
  };
}

function addBook(title, author, pages){
  books.push(new Book(title, author, pages));
}

function render(books){
  books.forEach(
    function(b){
      // Output to HTML
      document.getElementById("books_list").innerHTML += b.info();
    }
  );
}

// const book1 = new Book("Lazarillo de Tormes", "Anonimo");
// book1.pages = 300;
// book1.read = true;
//console.log(book1.info());

addBook("Lazarillo de Tormes1", "Anonimo1", 100);
addBook("Lazarillo de Tormes2", "Anonimo2", 200);
addBook("Lazarillo de Tormes3", "Anonimo3", 300);

render(books);