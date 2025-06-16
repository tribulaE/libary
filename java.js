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


function addBookToLibrary() {
    return new Book("Nate", "Evans", 300, true)
}

console.log(myLibrary)