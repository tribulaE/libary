
/* Filtering books by title*/
let searchTerm = ""; 


/* Array to store all added book objects*/
const myLibrary = [];

// Function for creating Book objects
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
    // Protype methid to toggle the read status of a book
    Book.prototype.toggleRead = function() {
        this.read = !this.read
    }
    // Function to create a new book and add it to the libary
    function addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook)
        displayBooks();  
    }

    // Function to display all books in the library on the page
    function displayBooks() {
        const container = document.getElementById("book-container");
        container.innerHTML = "";


        
    // Filter books by search tterm and render them
        myLibrary 
        .filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card")
            bookCard.dataset.id = book.id;


           bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages} pages</p>
            <p>Status: ${book.read ? "Read" : "Not read yet"}</p>
            <button class="remove-btn">Remove</button>
            <button class="toggle-read-btn">Toggle Read</button
            `;

            container.appendChild(bookCard)
        });

    // Add event listeners to the buttons
        document.querySelectorAll(".remove-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.parentElement.dataset.id;
                removeBook(id);
            });
        });

        document.querySelectorAll(".toggle-read-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const id = e.target.parentElement.dataset.id
                toggleReadStatus(id)
            });
        });
    }

    // Remove a book from the library by ID
    function removeBook(id) {
        const index = myLibrary.findIndex((book) => book.id === id);

        if(index !== -1) {
            myLibrary.splice(index, 1);
            displayBooks();
        }
    }

    Book.prototype.toggleRead = function () {
        this.read = !this.read;
    };

    // Toggle the read status for a specific book
    function toggleReadStatus(id) {
        const book = myLibrary.find((b) => b.id === id);

        if(book) {
            book.toggleRead()
            displayBooks()
        }
    }

    // Display up to 5 featured books fromn the Gooogle Books API
    function displayFeaturedBooks(bookArray) {
        const featured = document.getElementById("featured-book");
        featured.innerHTML = "";
        
        const heading = document.createElement("h2");
        heading.textContent = "Featured Books";
        heading.style.textAlign = "center";
        featured.appendChild(heading);

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.flexWrap = "wrap";
        container.style.justifyContent = "center";
        container.style.gap = "16px";

        bookArray.forEach(item => {
            const book = item.volumeInfo;

            const title = book.title || "Uknown Title";
            const author = (book.authors && book.authors[0])  || "Uknown Author";
            const pages = book.pageCount || "??";
            const thumbnail = book.imageLinks?.thumbnail || "";


            // Created a visual card for each featured book
            const card = document.createElement("div");
            card.style.cssText = `
            border: 2px solid #ccc;
            border-radius: 10px;
            padding: 15px;
            background: #fff;
            width: 220px
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            `

            card.innerHTML = `
            ${thumbnail ? `<img src="${thumbnail}" alt="${title}" style="width: 100px; height: auto; margin-bottom: 10px;">` : ""}
            <h3>${title}</h3>
            <p><strong>Author:</strong> ${author}</p>
            <p><strong>Pages:</strong> ${pages}</p>
            `;

            container.appendChild(card)
        })

        featured.appendChild(container)
    }

    // Fetch books from Google Books API and show 5 random one
    function fetchRandomFeaturedBooks() {
        const topics = ["fiction", "coding", "science", "fantasy", "history"];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        fetch(`https://www.googleapis.com/books/v1/volumes?q=${randomTopic}&maxResults=20`)
        .then(res => res.json())
        .then(data => {
            const selected = [];
            while (selected.length < 5 && data.items.length > 0) {
                const index = Math.floor(Math.random() * data.items.length);
                selected.push(data.items.splice(index,1)[0]);
            }


            displayFeaturedBooks(selected)
        })
        .catch(err => {
            console.error("Error fetching featured book:", err);
        });
    }
    
    
    
    
    
    
    
    // DOM event to handle form input and modal
    document.addEventListener("DOMContentLoaded", () => {
        const newBookBtn = document.getElementById("new-book-btn")
        const dialog = document.getElementById("book-dialog")
        const form = document.getElementById("book-form")

        newBookBtn.addEventListener("click", () => {
            dialog.showModal();
        });

        // Handle form submission
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const title = formData.get("title");
            const author = formData.get("author");
            const pages = Number(formData.get("pages"));
            const read = formData.get("read") === "on";

            addBookToLibrary(title, author, pages, read);

            form.reset();
            dialog.close(); 
        })
        fetchRandomFeaturedBooks();
    })
    // Input listener for live search filtering
    const searchInput = document.getElementById("search-bar");
    searchInput .addEventListener("input", (e) => {
        searchTerm = e.target.value;
        displayBooks();
    })
