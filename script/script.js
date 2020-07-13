function Book(title, author) {
  this.title = title;
  this.author = author;
  this.pages = 0;
  this.read = false;
  this.info = function () {
    if (this.read) {
      return `${this.title} by ${this.author}, ${this.pages} pages, already read.`;
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, not read yet.`;
  };
}

const book1 = new Book("Lazarillo de Tormes", "Anonimo");
book1.pages = 300;
book1.read = true;
console.log(book1.info());
