// Database
// Collection: Name of the array
// Document: Objects
// Field: keys in the objects(document)

const express = require("express");
const Joi = require("joi");
//const { result } = require("underscore");
const { join } = require("path");
//const app = express();
//app.use(express.json());
const mongodb = require("mongoose");
const { string, date, boolean } = require("joi");
const { default: mongoose } = require("mongoose");

// step 1: Connecting to Database
// step 2: Create a schema
// step 3: Create a model
// step 4: I can add Objects / Documents
// step 5: I can find documents

// ( Interview Ques )I/O Operation : Java script deal with I/O operations
// Ans. Asynchronous functions

// Step 1

mongodb.connect(
  "mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/test",
  function (err) {
    if (err) {
      console.log("Not able to connect to Mongo DB");
    } else {
      console.log("Connection Successful");
    }
  }
);

// Step 2:Create a schema

const Schema = new mongodb.Schema({
  name: String,
  author: String,
  tags: [String],
  ispublished: Boolean,
  Date: { type: Date, default: Date.now },
});

//step 3: create a model

const Course = mongodb.model("course", Schema);
//finding the course

Course.find(
  { author: "Sanjoy", name: "HTML" }, //get specific detail
  { _id: 0, __v: 0 }, //what paramets should be excluded
  { sort: { date: 1 }, limit: 2 }, //how many data we want
  function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  }
);

//step 4: I can add objects/documents

const newcourse = new Course({
  name: "CSS",
  author: "Vivek",
  tags: ["frontend"],
  ispublished: false,
});
newcourse.save();
