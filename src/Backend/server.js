import {userRoutes, sessionRouter} from '../Backend/UserBackend/src/routes/index';
import { PORT, NODE_ENV, MONGO_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME} from "./config";
import session from 'express-session';
import connectStore from 'connect-mongo';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');

require('dotenv').config();
(async () => {

    const app = express();
    const port = process.env.PORT || 8000;


    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname, '...', 'public')))

    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("Mongo database Successfully connected");
    })

    const MongoStore = connectStore(session);

    app.disabled('x-powered-by');

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(session({
        name: SESS_NAME,
        secret: SESS_SECRET,
        saveUninitialized: true,
        resave: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'session',
            ttl: parseInt(SESS_LIFETIME)
        }),
        cookie: {
            sameSite: true,
            secure: NODE_ENV === 'production',
            maxAge: parseInt(SESS_LIFETIME)
        }
    }));

    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    app.use(cors(corsOptions));


    const categoriesRouter = require('../Backend/AdminBackend/routes/categories.js');
    const managersRouter = require('../Backend/AdminBackend/routes/managers');
    const addItemRouter = require('../Backend/AdminBackend/routes/additem');

    app.use('/category', categoriesRouter);
    app.use('/managers', managersRouter);
    app.use('/additem', addItemRouter);

    const apiRouter = express.Router();
    app.use('/api', apiRouter);
    app.use('/api/products', require('../Backend/UserBackend/src/routes/products'));
    app.use('/api/cart', require('../Backend/UserBackend/src/routes/cart'));
    app.use('/api/WishList', require('../Backend/UserBackend/src/routes/wishlist'));
    apiRouter.use('/users', userRoutes);
    apiRouter.use('/session', sessionRouter);

    app.listen(port, () => {
        console.log(`Server is running on port:  ${port}`);
    })
})();
