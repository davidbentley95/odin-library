const LIBRARY = [];

const addButton = document.querySelector(".add-button");
const modal = document.querySelector("dialog");
const createButton = document.querySelector(".create-book");
const form = document.querySelector(".new-book-form");
const bookCarousel = document.querySelector(".book-carousel");
const readBookCount = document.querySelector(".read-count");
const pageCount = document.querySelector(".page-count");
const favouriteBook = document.querySelector(".favourite-book");
const unreadBookCount = document.querySelector(".unread-count");

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

function getTotalBooksRead() {
    let totalBooksRead = LIBRARY.reduce((total, item) => {
        if(item.readStatus === true) {
            return total + 1;
        }
        return total;
    }, 0);

    readBookCount.innerHTML = totalBooksRead;
}

function getTotalBooksUnread() {
    let totalBooksUnread = LIBRARY.reduce((total, item) => {
        if(item.readStatus === false) {
            return total + 1;
        }
        return total;
    }, 0);
    
    unreadBookCount.innerHTML = totalBooksUnread;

}

function getTotalPagesRead() {
    let totalPagesRead = LIBRARY.reduce((total, item) => {
        if(item.readStatus === true) {
            return total + Number(item.pages);
        }
        return total;
    }, 0);

    pageCount.innerHTML = totalPagesRead;

}

function updateDashboard() {
    getTotalBooksRead();
    getTotalBooksUnread();
    getTotalPagesRead();
}

function createBookDiv(bookObject) {
    const newBook = document.createElement("div");
    const title = document.createElement("h3")
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const deleteButton = document.createElement("button");
    const readLabel = document.createElement("label");
    const readCheckbox = document.createElement("input");
    
    newBook.classList.add("book-card");
    title.classList.add("book-title");
    author.classList.add("book-author");
    pages.classList.add("book-pages");
    deleteButton.classList.add("delete-button");
    readLabel.classList.add("read-status-checkbox");
    readCheckbox.classList.add("read-status");

    readCheckbox.type = "checkbox";

    title.innerHTML = bookObject.title;
    author.innerHTML = bookObject.author;
    pages.innerHTML = bookObject.pages;
    deleteButton.innerHTML = "DELETE BOOK";
    readLabel.innerHTML = "Read?"
    readCheckbox.checked = bookObject.readStatus;

    readLabel.append(readCheckbox);

    newBook.append(title, author, pages, readLabel, deleteButton);

    bookCarousel.append(newBook);
}

function clearForm() {
    form.querySelector("#title").value = "";
    form.querySelector("#author").value = "";
    form.querySelector("#pages").value = "";
    form.querySelector("#read-status-modal").checked = false;
}

function updateObjectReadStatus(event) {
    const parentElement = event.target.parentNode.parentNode;
    const targetTitle = parentElement.querySelector("h3").textContent;
    
    const index = LIBRARY.findIndex(items => items.title === targetTitle);

    LIBRARY[index].readStatus = event.target.checked;
}

function deleteBook(event) {
    const parentElement = event.target.parentNode;
    const targetTitle = parentElement.querySelector("h3").textContent;

    const index = LIBRARY.findIndex(items => items.title === targetTitle);

    LIBRARY.splice(index, 1);
}

function changeHeartColor() {
    document.querySelectorAll(".favourite-icon").forEach((item) => {
        const favouriteButton = item.querySelector("input");
        const favouriteIcon = item.querySelector("path");

        if(favouriteButton.checked) {
           favouriteIcon.setAttribute("fill", "red");
        } else {
            favouriteIcon.setAttribute("fill", "white");
        }
    });
}

// EVENT LISTENERS
addButton.addEventListener("click", () => modal.showModal());
createButton.addEventListener("click", () => {
    addBookToLibrary();
    updateDashboard();
    modal.close();
    clearForm();
    console.log(LIBRARY);
});

document.querySelector(".book-carousel").addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-button')) {
        event.target.parentNode.remove();
        deleteBook(event); 
        updateDashboard();
    }
});

document.querySelector(".book-carousel").addEventListener('click', (event) => {
    if (event.target.classList.contains('read-status')) {
        updateObjectReadStatus(event);
    }
});

document.querySelector(".book-carousel").addEventListener('click', function(event) {
    if (event.target.classList.contains('favourite-button')) {
        changeHeartColor();
    }
});

