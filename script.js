const LIBRARY = [];

const addButton = document.querySelector(".add-button");
const modal = document.querySelector("dialog");
const createButton = document.querySelector(".create-book");
const form = document.querySelector(".new-book-form");
const bookCarousel = document.querySelector(".book-carousel");

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary() {
    const book = new Book(
        form.querySelector("#title").value,
        form.querySelector("#author").value,
        form.querySelector("#pages").value,
        form.querySelector("#read-status-modal").checked
    )
    LIBRARY.push(book);
    createBookDiv(book);
}

function createBookDiv(bookObject) {
    const newBook = document.createElement("div");
    const title = document.createElement("h3")
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const deleteButton = document.createElement("button");
    const readStatus = document.createElement("div");
    const readLabel = document.createElement("label");
    const readCheckBox = document.createElement("input");
    
    newBook.classList.add("book-card");
    title.classList.add("book-title");
    author.classList.add("book-author");
    pages.classList.add("book-pages");
    deleteButton.classList.add("delete-button");
    readStatus.id = "read-status";

    readCheckBox.type = "checkbox";

    title.innerHTML = bookObject.title;
    author.innerHTML = bookObject.author;
    pages.innerHTML = bookObject.pages;
    deleteButton.innerHTML = "DELETE BOOK";
    readCheckBox.checked = bookObject.readStatus;

    readLabel.htmlFor = "read-status";

    readStatus.append(readLabel, readCheckBox);

    newBook.append(title, author, pages, readStatus, deleteButton);

    bookCarousel.append(newBook);
}

function clearForm() {
    form.querySelector("#title").value = "";
    form.querySelector("#author").value = "";
    form.querySelector("#pages").value = "";
}

// EVENT LISTENERS
addButton.addEventListener("click", () => modal.showModal());
createButton.addEventListener("click", () => {
    // add new book to library
    addBookToLibrary();
    // close modal
    modal.close();
    // clear form content
    clearForm();
});

document.querySelector(".book-carousel").addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        // Handle delete
        console.log(event.target.parentNode);
        event.target.parentNode.remove(); // Example: Remove the parent element
    }
});

