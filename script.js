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

function getFavouriteBook(event) {
    const favouriteBookHeader = document.querySelector(".favourite-book");

    document.querySelectorAll(".book-card").forEach((item) => {
        const favouriteButton = item.querySelector("input");
        
        if(favouriteButton.checked) {
           favouriteBookHeader.innerHTML = item.querySelector("h3").innerText;
        }
    });

    if(event.target.classList.contains("delete-button")){
        const deletedBookTitle = event.target.parentElement.querySelector("h3").innerText;
        if(deletedBookTitle === favouriteBookHeader.innerText) {
            favouriteBookHeader.innerHTML = "None";
        }
    }
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
    const favouriteLabel = document.createElement("label");
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const favouriteButton = document.createElement("input");
    
    newBook.classList.add("book-card");
    title.classList.add("book-title");
    author.classList.add("book-author");
    pages.classList.add("book-pages");
    deleteButton.classList.add("delete-button");
    readLabel.classList.add("read-status-checkbox");
    readCheckbox.classList.add("read-status");
    pathElement.classList.add("heart");
    favouriteLabel.classList.add("favourite-icon");
    favouriteButton.classList.add("favourite-button");

    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "20");
    svgElement.setAttribute("height", "19");
    svgElement.setAttribute("viewBox", "0 0 20 19");
    svgElement.setAttribute("fill", "none");
    pathElement.setAttribute("d", "M8.88659 16.6603L8.88587 16.6596C6.30104 14.3157 4.19578 12.4033 2.73088 10.6111C1.27148 8.82559 0.5 7.22062 0.5 5.5C0.5 2.68674 2.69555 0.5 5.5 0.5C7.08885 0.5 8.62206 1.24223 9.62058 2.40564L10 2.84771L10.3794 2.40564C11.3779 1.24223 12.9112 0.5 14.5 0.5C17.3045 0.5 19.5 2.68674 19.5 5.5C19.5 7.22062 18.7285 8.82559 17.2691 10.6111C15.8042 12.4033 13.699 14.3157 11.1141 16.6596L11.1134 16.6603L10 17.6738L8.88659 16.6603Z");
    pathElement.setAttribute("stroke", "white");
    favouriteButton.setAttribute("name", "favourite");

    readCheckbox.type = "checkbox";
    favouriteButton.type = "radio";

    title.innerHTML = bookObject.title;
    author.innerHTML = bookObject.author;
    pages.innerHTML = bookObject.pages;
    deleteButton.innerHTML = "DELETE BOOK";
    readLabel.innerHTML = "Read?"
    readCheckbox.checked = bookObject.readStatus;

    readLabel.append(readCheckbox);
    svgElement.append(pathElement);
    favouriteLabel.append(svgElement, favouriteButton);

    newBook.append(favouriteLabel, title, author, pages, readLabel, deleteButton);

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
           favouriteIcon.setAttribute("fill", "#B954C6");
           favouriteIcon.setAttribute("stroke", "#B954C6");
        } else {
            favouriteIcon.setAttribute("fill", "#181C14");
            favouriteIcon.setAttribute("stroke", "white");
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
        getFavouriteBook(event);
    }
});

document.querySelector(".book-carousel").addEventListener('click', (event) => {
    if (event.target.classList.contains('read-status')) {
        updateObjectReadStatus(event);
        updateDashboard();
    }
});

document.querySelector(".book-carousel").addEventListener('click', function(event) {
    if (event.target.classList.contains('favourite-button')) {
        changeHeartColor();
        getFavouriteBook(event);
    }
});

