const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
    firstName:  {type:String,required:true},
    lastName:  {type:String,required:true},
    email : {type:String,required:true},
    gender: {type:String,required:true},
    password : {type:String,required:true},
    // rePassword : {type:String,required:true},
    dateOfBirth : {type:Date,required:true},
    Address : {type:String,required:true},
    Address2 : {type:String,required:true},
    city : {type:String,required:true},
    // states :{type:String,required:true},
    zip : {type:Number,required:true},

});

const Manager = mongoose.model('Manager', ManagerSchema);

module.exports = Manager;