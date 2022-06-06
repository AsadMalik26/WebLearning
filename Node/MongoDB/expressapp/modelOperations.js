const testModel = require("./dbmodels");

const creatItem = async (name) =>{
    let item = new testModel();
    item.name = name;
    await item.save();
}

module.exports.creatItem = creatItem;