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

console.log(form);

function getFormInputs(form) {

}

// EVENT LISTENERS
addButton.addEventListener("click", () => modal.showModal());
form.addEventListener("submit", (e) => {
    e.preventDefault();
});
createButton.addEventListener("click", () => {
    // add new book to library
    modal.close()
    // clear form content
});
