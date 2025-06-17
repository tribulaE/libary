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
            card.classList.add("book-card")
            card.dataset.id = book.id;


           card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages} pages</p>
            <p>Status: ${book.read ? "Read" : "Not read yet"}</p>
            <button class="remove-btn>Remove</button>
            <button class="toggle-read-btn">Toggle Read</button
            `;

            container.appendChild(bookCard)
        });

        document.querySelectorAll(".remove-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.parentElement.dataset.id;
                removeBook(id);
            });
        });

        document.querySelectorAll("toggle-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.parentElement.dataset.id
                toggleReadStatus(id)
            });
        });
    }

    function removeBook(id) {
        const index = myLibrary.findIndex((book) => book.id === id);

        if(index !== -1) {
            myLibrary.splice(index, 1);
            displayBooks();
        }
    }