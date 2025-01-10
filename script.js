const LIBRARY = [];

const addButton = document.querySelector(".add-button");
const modal = document.querySelector("dialog");
const createButton = document.querySelector(".create-book");
const form = document.querySelector(".new-book-form");

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
}

function createBookDiv() {

}

function clearForm() {
    form.querySelector("#title").value = "";
    form.querySelector("#author").value = "";
    form.querySelector("#pages").value = "";
}

// EVENT LISTENERS
addButton.addEventListener("click", () => modal.showModal());
form.addEventListener("submit", (e) => {
    e.preventDefault();
});
createButton.addEventListener("click", () => {
    // add new book to library
    addBookToLibrary();
    console.table(LIBRARY);
    // close modal
    modal.close();
    // clear form content
    clearForm();
});
