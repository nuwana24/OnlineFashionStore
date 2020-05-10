const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '...', 'public')))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology:true ,useNewUrlParser:true,useCreateIndex:true});

const connection = mongoose.connection;
connection.once('open' , () => {
    console.log("Mongo database Successfully connected");
})

const categoriesRouter = require('./routes/categories.js');
const managersRouter = require('./routes/managers');
const addItemRouter = require('./routes/additem');

app.use('/category',categoriesRouter);
app.use('/managers',managersRouter);
app.use('/additem',addItemRouter);





app.listen(port, () =>{
    console.log(`Server is running on port:  ${port}`);
})

