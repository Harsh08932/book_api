const books = [
  {
    ISBN: "1234Book",
    title: "Tesla",
    pubDate: "2021-08-05",
    lang: "english",
    numpage: 250,
    author: [1, 2],
    publication: [1],
    category: ["tech", "space", "education"],
  },
];
const author = [
  {
    id: 1,
    name: "harsh",
    books: ["1234Book", "life"],
  },
  {
    id: 2,
    name: "elon",
    books: ["1234Book"],
  },
];
const publication = [
  {
    id: 1,
    Name: "hehe",
    books: ["1234Book"],
  },
  {
    id: 2,
    Name: "writex",
    books: [""],
  },
];
//for extraction of this data set
module.exports = { books, author, publication };
