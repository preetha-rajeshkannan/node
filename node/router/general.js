const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username already exists
    if (users.find(user => user.username === username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    // Register the user
    users.push({ username, password });
    return res.status(201).json({ message: "User registered successfully" });
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));


});

// Get book details based on ISBN


  public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (books[isbn]) {
        return res.json(books[isbn]);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});


  

  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(book => book.author === author);

    if (booksByAuthor.length > 0) {
        return res.json(booksByAuthor);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

 

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const title = req.params.title;
    const booksBytitle = Object.values(books).filter(book => book.title === title);

    if (booksBytitle.length > 0) {
        return res.json(booksBytitle);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }

  
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    
    if (books[isbn] && books[isbn].reviews) {
        return res.json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "No reviews found for this book" });
    }
});


module.exports.general = public_users;
