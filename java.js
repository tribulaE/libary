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

    function displayBooks() {
        const container = document.getElementById("book-container");
        container.innerHTML = "";

        myLibrary.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card")
            bookCard.dataset.id = book.id;


            bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.read ? "Read" : "Not read yet"}</p>
            <button class="remove-btn>Remove</button>
            <button class="toggle-read-btn">Toggle Read</button
            `;

            container.appendChild(bookCard)
        })
        }