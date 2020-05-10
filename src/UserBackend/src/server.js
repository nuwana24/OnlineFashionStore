import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectStore from 'connect-mongo';
import {userRoutes, sessionRouter} from './routes/index';
import { PORT, NODE_ENV, MONGO_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME} from "./config";

const cors = require('cors');

(async () => {
    try{
        await mongoose.connect(MONGO_URI, {useNewUrlParser: true});
        console.log('MongoDB Connected');

        const app = express();
        const MongoStore = connectStore(session);

        app.disabled('x-powered-by');

        app.use(express.urlencoded({extended: true}));
        app.use(express.json());
        app.use(session({
            name: SESS_NAME,
            secret: SESS_SECRET,
            saveUninitialized: false,
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

        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        app.use('/api/products', require('./routes/products'));
        app.use('/api/cart', require('./routes/cart'));
        app.use('/api/WishList', require('./routes/wishlist'));
        apiRouter.use('/users', userRoutes);
        apiRouter.use('/session', sessionRouter);

        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (err){
        console.log(err);
    }

})();
