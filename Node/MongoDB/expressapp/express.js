const express = require("express");
const app = express();
const mongoose = require("mongoose");
//to handle json type api calls
app.use(express.json());
const food = ["kabab", "nihari", "daal rice"];

const {creatItem} = require("./modelOperations");

mongoose
  .connect('mongodb://127.0.0.1/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((ok) => {
    console.log("Connected with mongodb");
  })
  .catch(() => {
    console.log("Error while connecting with database");
  });



  
//read or fetch requests
app.get("/", (req, res) => {
  //now we send response
  res.send("Hello this is express");
  // now we no need to write and end for response
});

app.get("/api/food", (req, res) => {
  res.send(food);
});
//fetch single product
app.get("/api/food/:id", (req, res) => {
  //if product not found then answer it
  if (!food[req.params.id]) res.status(400).send("food item not found");
  //status(400) is bad request code

  // if product found
  res.send(food[req.params.id]);
});

//Put - update request
app.put("/api/food/:id", (req, res) => {
  //json handling required for json body
  console.log(req.body);
  res.send((food[req.params.id] = req.body.name));
});
//delete request
app.delete("/api/food/:id", (req, res) => {
  //1st is starting index, 2nd is no. of records to be deleted. here the only one itself
  food.splice(req.params.id, 1);
  res.send(food);
});
//Post - create request
app.post("/api/food", (req, res) => {
  //1st is starting index, 2nd is no. of records to be deleted. here the only one itself
  food.push(req.body.name);
  res.send(food);
});

app.listen(3030);
