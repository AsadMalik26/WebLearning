const testModel = require("./dbmodels");

const creatItem = async (name) =>{
    let item = new testModel();
    item.name = name;
    await item.save();
    console.log("Product saved", item);
}

const readAll = async () => {

}
const readOne = async (id) => {
    
}



module.exports.creatItem = creatItem;