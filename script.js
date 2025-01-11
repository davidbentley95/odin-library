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
        true
    )
    LIBRARY.push(book);
    createBookDiv(book);
}

function createBookDiv(bookObject) {
    const newBook = document.createElement("div");
    const title = document.createElement("h3")
    const author = document.createElement("p");
    const pages = document.createElement("p");
    
    newBook.classList.add("book-card");
    title.classList.add("book-title");
    author.classList.add("book-author");
    pages.classList.add("book-pages");

    title.innerHTML = bookObject.title;
    author.innerHTML = bookObject.author;
    pages.innerHTML = bookObject.pages;

    newBook.append(title, author, pages);

    bookCarousel.appendChild(newBook);

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
    console.table(LIBRARY);
    // close modal
    modal.close();
    // clear form content
    clearForm();
});


