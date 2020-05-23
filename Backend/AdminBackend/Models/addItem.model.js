const mongoose = require('mongoose');
const comments = new mongoose.Schema({comment:String})

const addItemSchema =  new mongoose.Schema({

    img:{
        data:Buffer,
        contentType: String
    } ,
    category:String,
    name:String,
    description:String,
    price: Number,
    quantity:Number,
    size:String,
    meterial:String,
    comment:Array,
    rating:Array,
    discount:{
        type:Number,
        default: 0
    }



});
const AddItem= mongoose.model('AddItem',addItemSchema);

module.exports = { AddItem };
