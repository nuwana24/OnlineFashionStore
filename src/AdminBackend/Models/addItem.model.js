const mongoose = require('mongoose');

const addItemSchema =  new mongoose.Schema({

    img: String,
    category:String,
    name:String,
    description:String,
    price: Number,
    quantity:Number,
    size:String,
    meterial:String



});
const AddItem= mongoose.model('AddItem',addItemSchema);

module.exports = AddItem;
