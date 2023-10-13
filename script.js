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

