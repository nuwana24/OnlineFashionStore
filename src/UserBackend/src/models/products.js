const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddItemsSchema = new Schema({
    _id: {type:String, required:true},
    img: {type:String, required: true},
    category: {type:String, required: true},
    name: {type:String, required: true},
    description: {type:String, required: true},
    price: {type:String, required: true},
    quantity: {type:String, required: true},
    size: {type:String, required: true},
    meterial: {type:String, required: true},
    discount:{
        type:Number,
        default: 0
    }
});

const Products = mongoose.model('additems', AddItemsSchema);

module.exports = Products;