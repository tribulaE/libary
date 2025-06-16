const myLibrary = [];


function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        const readStatus = this.read ? "not read yet": "already read";
        return  `${this. title} by ${this.author}, ${this.pages} pages, ${readStatus}`
    }
}

    Book.prototype.toggleRead = function() {
        this.read = !this.read
    }

    function addBookToLibary (title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook)
        displayBooks();
    }