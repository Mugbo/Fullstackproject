//import npm packages
const Express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

//create instance of express app and make it use cors module
var app = Express();
app.use(cors());

// {Connor} Add connection string for mongoDB
mongoose.connect("mongodb://localhost:27017/LibraryDB")
.then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connected");
  });

  
const LibrarySchema = new mongoose.Schema({
    id: { type: String, required: true },
    description: { type: String, required: true }
  });
  
const LibraryCollection  = mongoose.model("LibraryCollection", LibrarySchema);
module.exports= LibraryCollection

//start express app and listen to requests from port number
app.listen(5001, () => {
  console.log("Mongo BD Connection Successful");
});

app.get("/GetBook", async(req, res) => {
        const books = await LibraryCollection.find({});
      res.send(books);
    });


app.post('/AddBook', multer().none(),(req, res) => {
    database.collection("LibraryCollection").count({},function(error, numOfBooks){
        database.collection("LibraryCollection").insertOne({
            id:(numOfBooks+1).toString(),
            description:req.body.newBooks
        });
        
        res.json("Added Successfully");
    })
})

app.delete('/DeleteBook' ,(req, res) =>{
    database.collection("LibraryCollection").deleteOne({
        id:req.query.id
    })
    res.json("Delete Successfully");
})

