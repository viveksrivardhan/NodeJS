const express = require("express");
const app = express();
app.use(express.json());
const courses = [
  {
    id: 1,
    name: "javascript",
  },
  {
    id: 2,
    name: "react",
  },
  {
    id: 3,
    name: "FSD",
  },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/courses", function (req, res) {
  res.send(courses);
});
// Get request
app.get("/courses/:id", function (req, res) {
  let courseId = req.params.id;
  var course = courses.find((c) => c.id === parseInt(courseId));
  if (!course) {
    res.status(404).send("Course not found");
  } else {
    res.send(course);
  }
});

// Post service
// localhost:3000/course
// will be sending body
//{"name":"DevOPS"} (something else)

app.post("/course", function (req, res) {
  //create a course object
  if (!req.body.name) res.send("Wrong Input");
  else {
    var course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    //push that object into courses array
    courses.push(course);
    res.send(course);
  }
});

// (home work) JOI module and validate the input for post request( validation module, which validate things)

app.listen(3000);
console.log("Running the server on port 3000");
