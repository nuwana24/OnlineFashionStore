import express from 'express';
import Joi from 'joi';
import User from '../models/user';
import {singIn} from "../validations/user";
import {parseError, sessionizeUser} from "../utils/helpers";
import {SESS_NAME} from "../../../config";

const sessionRouter = express.Router();

let SesUser = '';
let userToken = '';

sessionRouter.post("", async (req, res) => {
    try{
        const {email, password} = req.body
        console.log(email,password);
        await Joi.validate({email, password}, singIn);

        const user = await User.findOne({email});

        if( user && user.comparePasswords(password)){

            // userToken = jwt.sign({
            //         type: "users",
            //         data: {
            //             email: email,
            //             password:password
            //
            //         }
            // }
            // )

            // console.log(userToken);
            const sessionUser = sessionizeUser(user);

            req.session.user = sessionUser;
            SesUser = user;
            // console.log(req.session);
            res.send(sessionUser);
         } else {
            throw new Error('Invalid login credentials');
        }
    } catch (err) {
        res.status(401).send(parseError(err));
    }
});

sessionRouter.delete("", ({session}, res) => {
    try{
        const user = session.user;
        const userss = {userId:use._id,username:use.username};
        const use = SesUser;
        console.log("first:" +userss);
        console.log(session);

        // if(user){
            userToken = '';
            userss.destroy(err => {
                if(err) throw (err);

                res.clearCookie(SESS_NAME);
                res.send(use);
            });
            console.log(userToken);
        // }
        //  else {
        //     throw new Error('Something went wrong');
        // }
    } catch (err) {
        res.status(422).send(parseError(err));
    }
});

sessionRouter.get("", ({session: {user}}, res) => {
    res.send({user});
});

// sessionRouter.get("",(req,res) =>{
// })

export default sessionRouter;
