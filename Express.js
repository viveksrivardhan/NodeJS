const express = require("express");
const app = express();
const Joi = require("joi");
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
    // res.json({
    //   courses: course,
    //   status: "succesfully done",
    // });
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

//PUT method

app.put("/courses/:id", function (req, res) {
  const validateResult = validateCourse(req.body);
  console.log(validateResult);

  if (validateResult.error) res.send(validateResult.error);
  else {
    var courseId = req.params.id;
    var course = courses.find((c) => c.id === parseInt(courseId));
    let courseindex = courses.findIndex((c) => c.id === parseInt(courseId));
    courses[courseindex].name = req.body.name;
    res.send(courses[courseindex]);

    //update the course in that index
    //how do we update a particular object in an array
    //
  }
});

//delete method

app.delete("/courses/:id", function (req, res) {
  var courseId = req.params.id;

  if (courseId > courses.length) res.status(404).send("Course not found");
  else {
    let courseindex = courses.findIndex((c) => c.id === parseInt(courseId));
    courses.splice(courseindex, 1);
    res.send(courses);
  }
});

// (home work) JOI module and validate the input for post request( validation module, which validate things)
// https://github.com/Sanjoyvired/Batch6Node.git
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  try {
    const result = schema.validate(course);
    return result;
  } catch (err) {
    return err;
  }
}

app.listen(3000);
console.log("Running the server on port 3000");
