const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

//to handle json type api calls
app.use(express.json());
const food = ["kabab", "nihari", "daal rice"];
app.use(cors());
const {
  createEntry,
  getAllEntries,
  getOneEntry,
  deleteEntry,
  updateEntry,
} = require("./modelOperations");

mongoose
  .connect("mongodb://127.0.0.1/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected with mongodb");
    /* let e = await createEntry("Testing for Asim",300,"abcdefg"); 
    console.log(e); */
    /* let e = await deleteEntry("629fa3acac6ba6aa33e50554");
    console.log(e); */
  })
  .catch(() => {
    console.log("Error while connecting with database");
  });

//read or fetch requests
app.get("/", async (req, res) => {
  let e = await getAllEntries();
  res.send(e);
});
app.get("/api/expense/", async (req, res) => {
  let e = await getAllEntries();
  res.send(e);
});

app.get("/api/food", (req, res) => {
  res.send(food);
});
//fetch single product
app.get("/api/expense/:id", async (req, res) => {
  //if product not found then answer it
  //if (!food[req.params.id]) res.status(400).send("food item not found");
  //status(400) is bad request code

  // if product found
  //res.send(food[req.params.id]);

  let e = await getOneEntry(req.params.id);
  res.send(e);
});

//Put - update request
app.put("/api/expense/:id", (req, res) => {
  //json handling required for json body
  //console.log(req.body);
  //res.send((food[req.params.id] = req.body.name));
  console.log("Recvied save request");
  console.log(req.body);
  //console.log(req);

  let entry = updateEntry(
    req.params.id,
    req.body.title,
    req.body.price,
    req.body.description
  );
  res.send(req.body);
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
