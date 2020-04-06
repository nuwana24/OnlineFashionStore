const LocalStratergy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//User Model
const User = require('../models/User');


module.exports = function (passport) {
    passport.use(
        new LocalStratergy({ usernameField: 'email' }, (email, password, done) => {
            //Find user
            User.findOne({ email : email })
                .then(user => {
                    if(!user){
                        return done(null, false, { message: 'Not a registered user' });
                    }

                    //Password matching
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect Username or Password' })
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}