
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');
const morgan = require("morgan");
const helmet = require('helmet');

const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const router = express.Router();
const { HOST, SESS_SECRET, NODE_ENV, IS_PROD, COOKIE_NAME } = require('./config/config');
const MAX_AGE = 1000 * 60 * 2;

//Passport Config
require('./config/passport')(passport);

mongoose.connect("mongodb+srv://root:admin@cluster0-ynman.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
    .then(() => console.log('Mongo DB Connected'))
    .catch(err => console.log(err));

//setting up connect-mongodb-session store
const mongoDBStore = new MongoDBStore({
    uri: "mongodb+srv://root:admin@cluster0-ynman.gcp.mongodb.net/test?retryWrites=true&w=majority",
    collection : "mySession"
})

//Bodyparser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(morgan("dev"));

//Express Session
app.use(session({
    name: 'session',
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store : mongoDBStore,
    cookie :{
        maxAge : MAX_AGE,
        sameSite: false,
        secure : IS_PROD
    }
}));

app.use(helmet());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

//Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server starts on port ${PORT}`));