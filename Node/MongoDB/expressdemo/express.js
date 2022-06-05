const express = require("express");
const app = express();
const food = ["kabab", "nihari", "daal rice"]

//read or fetch requests
app.get("/", (req,res)=>{
    //now we send response
    res.send("Hello this is express");
    // now we no need to write and end for response
});

app.get("/api/food", (req,res) => {
    res.send(food);
});
//fetch single product
app.get("/api/food/:id", (req,res) => {
    //if product not found then answer it
    if(!food[req.params.id]) res.status(400).send("food item not found")
    //status(400) is bad request code

    // if product found
    res.send(food[req.params.id]);
});



app.listen(3030);