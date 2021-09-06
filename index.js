const express = require("express");
const my_api = express();
let bodyParser = require("body-parser");
const database = require("./data");
const { urlencoded } = require("express");
my_api.use(express.json());
my_api.use(bodyParser.urlencoded({ extended: true }));
//
///**************** */
//GETTING ALLL THE BOOKS
my_api.get("/", (req, res) => {
  return res.json({ key: database.books });
});
//*////////////////////////////////////////////////////////////////////////
my_api.get("/is/:isbn", (req, res) => {
  const books = database.books.filter((book) => book.ISBN === req.params.isbn);
  if (books.length === 0) {
    res.json({ error: "isbn book not present" });
  }
  return res.json({ book: books });
});
////////////////////////
//////////////////////////////////////////////
my_api.get("/cat/:category", (req, res) => {
  const categoryBooks = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );
  if (categoryBooks.lenght === 0) {
    return res.json({
      error: `then book with ${req.params.category} is not present`,
    });
  }
  return res.json({ key: categoryBooks });
});
//
my_api.get("/lan/:lang", (req, res) => {
  const langBook = database.books.filter(
    (book) => book.lang === req.params.lang
  );
  if (langBook === 0) {
    return res.json({ error: `book with ${req.params.lang} lang` });
  }
  return res.json({ book: langBook });
});
//
my_api.get("/author", (req, res) => {
  return res.json({ authors: database.author });
});
//
//to get auhtor based on books
my_api.get("/auhtor/book/:isbn", (req, res) => {
  const specificBook = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );
  if (specificBook.length === 0) {
    return res.json({
      error: `no auhtor found for the books off ${req.params.isbn}`,
    });
  }
  return res.json({ author: specificBook });
});
//get specific author based on id
my_api.get("/auhtor/b/:id", (req, res) => {
  const book = database.author.filter(
    (author) => author.id === parseInt(req.params.id)
  );
  if (book.length === 0) {
    return res.json({ error: "not found the auhtor" });
  }
  return res.json({ author: book });
});
//
/*************starting publicATION **************************************************************************************** */
//
my_api.get("/publication", (req, res) => {
  return res.json({ publication: database.publication });
});
/****************************************************************************************************** */
//
//
//
//STARTING OF POST REQUEST
//
//
//
my_api.post("/book/new", (req, res) => {
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({ updated: database.boks });
});
//
//adding new auhtor
my_api.post("/author/new", (req, res) => {
  const author = req.body;
  database.author.push(author);
  return res.json({ updated: database.author });
});
//
//adding new publication
my_api.post("/publication/new", (req, res) => {
  const publication = req.body;
  database.publication.push(publication);
  return res.json({ pub: database.publication });
});
//
/* starting with put request//updatiiiiong requests*/
//
my_api.put("/publication/book/put/:isbn", (req, res) => {
  database.publication.forEach((pub) => {
    if (pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });
  //upadating the book database
  database.books.foreach((book) => {
    if (book.ISBN === req.params.ISBN) {
      book.publication = req.body.pubId;
      return;
    }
  });
  return res.json({
    books: database.books,
    publication: database.publication,
  });
});
//
//delete request
//delete a book
//delete author from book
//delete author from book and related book data
my_api.delete("/book/delete/auhtor/:isbn/:authorId", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newauhthor = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
      );
      book.author = newauhthor;
      return;
    }
  });
  //
  database.author.forEach((author) => {
    if (author.id !== parseInt(req.params.auhtorId)) {
      const newBookList = author.books.filter((book) => {
        book !== req.params.isbn;
      });
      author.books = newBookList;
      return;
    }
  });
  return res.json({
    book: database.books,
    auhtor: database.author,
  });
});
//
my_api.delete("/book/del/:isbn", (req, res) => {
  const newBooks = database.book.filter((book) => book.ISBN != req.params.isbn);
  database.books = newBooks;
  return res.json({ book: database.books });
});
/////////////////////////////////////////////////////////////
my_api.listen(3000, () => {
  console.log("server up and running");
});
