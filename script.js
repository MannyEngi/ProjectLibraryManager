class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        return this;
    }

    removeBooks(booksTitle) {
        this.books = this.books.filter(book => book.title !== booksTitle);
        return this;
    }

    listBooks(){
        return this.books;
    }
}

class Book{
    constructor(title, author, year, genre, read = false) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.read = read;   
    }

    markAsRead() {
        this.read = true;
        return this;
    }
}

let registeredUsers = [];
let currentUser = null;

const registerUser = () => {
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;

    const newUser = new User(userName, userEmail);
    registeredUsers.push(newUser);

    populateUserDropdown();

    displayCurrentUser();
}; 

const login = () => {
    const selectedUserEmail = document.getElementById('userSelect').value;
    currentUser = registeredUsers.find(user => user.email === selectedUserEmail);

    if(currentUser) {
        displayCurrentUser();
    }
};

const displayCurrentUser = () => {
    const displayArea = document.getElementById('currentUser');
    if(currentUser) {
        displayArea.innerHTML = 'Logged in as: ${currentUser.name}';
    } else {
        displayArea.innerHTML = 'No user logged in';
    }
};

const populateUserDropdown = () => {
    const dropdown = document.getElementById('userSelect');
    dropdown.innerHTML = '';

    registeredUsers.forEach(user => {
        const option = document.createElement('option');
        option.value= user.email;
        option.textContent = user.name;
        dropdown.appendChild(option);
    });
};

const addBookFromForm = (event) => {
    event.preventDefault();

    if(!currentUser) {
        alert('Please login or register to add book');
    }

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const genre = document.getElementById('genre').value;
    const read = document.getElementById('read').checked; 
    
    const newBook = new Book(title, year, genre, read);
    currentUser.addBook(newBook);

    displayBooks();
    document.getElementById('bookForm').reset();
};

const displayBooks = () => {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if(currentUser) {
        currentUser.books.forEach((book, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `${book.title} by ${book.author} (${book.year}, ${book.genre}) - ${book.read ? 'Read' : 'Not Read'} <button onclick="removeBook(${index})" class="btn btn-danger btn-sm float-right">Remove</button>`;
            bookList.appendChild(listItem);
        });
    }
};



