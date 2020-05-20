import Joi from 'joi';
import express from 'express';
import User from '../models/user';
import {signUp} from "../validations/user";
import {sessionizeUser} from "../utils/helpers";

const userRoutes = express.Router();

userRoutes.post("", async (req, res) => {
    try {
        const {username, email, password} = req.body
        await Joi.validate({username, email, password}, signUp);

        const newUser = new User({username, email, password});
        const sessionUser = sessionizeUser(newUser);
        await newUser.save();

        req.session.user = sessionUser;
        res.send({userId: newUser.id, username});

    } catch (err){
        res.status(400).send(err);
    }
});

userRoutes.get('/getUsers', (req, res, next) => {
    User.find({}, (err, result) => {
        if (err) return next(err);

        let data = {
            status: 'success',
            code: 200,
            data : result
        };

        res.json(data);
    })
});

export default userRoutes;