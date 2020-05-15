const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddOrderSchema = new Schema({

    userId: {type: String, required : true},
    userName : {type: String, required: true},
    orders: {type: Array, required: true}
});

const Order = mongoose.model('Orders', AddOrderSchema);

module.exports = Order;