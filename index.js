const express = require('express');
const {addUser, addBook,addToReadingList, updateBook,removeBookFromReadingList} = require("./controllers/app");
const {searchBooks,getUserByReadingList} = require("./controllers/getController");

const app = express();
app.use(express.json());


app.post('/api/users',addUser);
app.post('/api/books',addBook);
app.get('/api/books/search',searchBooks);
app.post('/api/reading-list',addToReadingList);
app.post('/api/books/:bookId',updateBook);
app.get('/api/reading-list/:userId',getUserByReadingList);
app.delete('/api/reading-list/:readingListId',removeBookFromReadingList);

module.exports = app;