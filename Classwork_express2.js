//array of products
//write a get api for products by ID
//get api for products by category
//post api
//put api by id

const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());
var products = [
  {
    id: 1,
    name: "ThumsUP",
    price: 20,
    category: "Drinks",
  },
  {
    id: 2,
    name: "Coke",
    price: 40,
    category: "Drinks",
  },
  {
    id: 3,
    name: "Rice",
    price: 90,
    category: "Grocery",
  },
  {
    id: 4,
    name: "Milk",
    price: 70,
    category: "Grocery",
  },
  {
    id: 5,
    name: "Onion",
    price: 10,
    category: "Vegetables",
  },
  {
    id: 6,
    name: "Brush",
    price: 100,
    category: "Essentials",
  },
  {
    id: 7,
    name: "Pen",
    price: 120,
    category: "Essentials",
  },
  {
    id: 8,
    name: "paste",
    price: 70,
    category: "Essentials",
  },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/products", function (req, res) {
  res.send(products);
});

// Get request by ID
app.get("/products/:id", function (req, res) {
  let productsID = req.params.id;
  var product = products.find((c) => c.id === parseInt(productsID));
  if (!product) {
    res.status(404).send("Products not found");
  } else {
    res.send(product);
    // res.json({
    //   courses: course,
    //   status: "succesfully done",
    // });
  }
});

// Get request by category
app.get("/product/:category", function (req, res) {
  let categoryname = req.params.category;
  var product = products.filter((c) => c.category === categoryname);

  if (!product) {
    res.status(404).send("Category not found");
  } else {
    res.send(product);
    // res.json({
    //   courses: course,
    //   status: "succesfully done",
    // });
  }
});

// Get request by name
app.get("/productss/:name", function (req, res) {
  let name = req.params.name;
  var product = products.filter((c) => c.name === name);

  if (!product) {
    res.status(404).send("Category not found");
  } else {
    res.send(product);
    // res.json({
    //   courses: course,
    //   status: "succesfully done",
    // });
  }
});

app.post("/products", function (req, res) {
  const validateResult = validateProducts(req.body);
  console.log(validateResult);

  if (validateResult.error) res.send(validateResult.error);
  else {
    var product = {
      id: products.length + 1,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    products.push(product);
    res.send(products);
  }
});

//PUT method

app.put("/products/:id", function (req, res) {
  const validateResult = validateProducts(req.body);
  console.log(validateResult);

  if (validateResult.error) res.send(validateResult.error);
  else {
    let productsID = req.params.id;
    var productIndex = products.findIndex((c) => c.id === parseInt(productsID));
    products[productIndex].name = req.body.name;
    products[productIndex].price = req.body.price;
    products[productIndex].category = req.body.category;

    res.send(products);
  }
});

function validateProducts(product) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().min(1).required(),
    category: Joi.string().min(1).required(),
  });

  try {
    const result = schema.validate(product);
    return result;
  } catch (err) {
    return err;
  }
}

//Delete function
app.delete("/products/:id", function (req, res) {
  var ProductID = req.params.id;

  if (ProductID > products.length) res.status(404).send("Products not found");
  else {
    var productIndex = products.findIndex((c) => c.id === parseInt(ProductID));
    products.splice(productIndex, 1);
    res.send(products);
  }
});

app.listen(3000);
console.log("Running the server on port 3000");
