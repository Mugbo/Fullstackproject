//import npm packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

//create instance of express app and make it use cors module
const app = express();
app.use(cors());
app.use(express.json())
// {Connor} Add connection string for mongoDB
mongoose.connect("mongodb://localhost:27017/LibraryDB")
.then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connected");
  });

  
const LibrarySchema = new mongoose.Schema({
    book: { type: String, required: true }
  });
  
const LibraryCollection  = mongoose.model("LibraryCollection", LibrarySchema);
module.exports= LibraryCollection


app.get("/GetBook",(req, res) => {
        LibraryCollection.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
    })

app.delete("/DeleteBook/:id",(req, res) => {
    const {id} = req.params;
    LibraryCollection.deleteOne({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.put("/UpdateBook/:id",(req, res) => {
    const {id} = req.params;
    LibraryCollection.findByIdAndUpdate({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.post('/AddBook', (req, res) => {
   const book = req.body.book;
   LibraryCollection.create({
    book: book
   }).then(result => res.json(result))
   .catch(err => res.json(err))
})

//start express app and listen to requests from port number
app.listen(5001, () => {
    console.log("Mongo BD Connection Successful");
  });