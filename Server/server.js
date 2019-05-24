const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Book } = require("./models/books");
const { Store } = require("./models/stores");

const app = express();

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/books");
mongoose.connect(location);
//POST
app.post("/api/add/store", (req, res) => {
  const store = new Store({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone
  });
  store.save((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});
app.post("/api/add/book", (req, res) => {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    pages: req.body.pages,
    price: req.body.price,
    stores: req.body.stores
  });
  book.save((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//GET
app.get("/api/stores", (req, res) => {
  Store.find((err, doc) => {
    if (err) res.status(400).send(err);
    res.send(doc);
  });
});
app.get("/api/books", (req, res) => {
  Book.find((err, doc) => {
    if (err) res.status(400).send(err);
    res.send(doc);
  });
});
app.get("/api/books/:id", (req, res) => {
  Book.findById(req.params.id, (err, doc) => {
    if (err) res.status(400).send(err);
    res.send(doc);
  });
});
//Patch
app.patch("/api/add/books/:id", (req, res) => {
  Book.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, doc) => {
      if (err) res.status(400).send(err);
      res.send(doc);
    }
  );
});
//delete
app.delete("/api/delete/books/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send();
  });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
