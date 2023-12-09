//import npm packages
var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

//create instance of express app and make it use cors module
var app = Express();
app.use(cors());

// {Connor} Add connection string for mongoDB
var CONNECTION_STRING = "";

//{Connor} add database name for making mongoDB connection
var DATABASENAME =""

//instance of db client
var database;

//start express app and listen to requests from port number
app.listen(5038, () => {
    //instance of mongoDB client
    Mongoclient.connect(CONNECTION_STRING, (error,client) => {
        database=client.db(DATABASENAME);
        console.log("Mongo BD Connection Successful");
    })
})
