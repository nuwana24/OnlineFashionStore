// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// const { ensureAuthenticated } = require('../config/auth');
// //User Model
// const User = require('../models/User');
//
//
//
// router.post('/register',  (req, res) => {
//     const {name, email, password, password2} = req.body;
//
//     //Check required fields
//     if(!name || !email || !password || !password2){
//         return res.status(400).json({msg : "Please enter all the fields"});
//     }
//
//     //Check password match
//     else if(password !== password2){
//         return res.status(400).json({msg : "Password does not match"});
//     }
//
//     //Check password length
//     else if(password.length < 6){
//         return res.status(400).json({msg : "Password should be at least 6 characters"});
//     } else {
//         User.findOne({ email : email })
//             .then(user => {
//                 if(user){
//                     return res.status(400).json({msg : "Password should be at least 6 characters"});
//                 } else {
//                     const newUser = new User({
//                         name,
//                         email,
//                         password
//                     });
//
//                     //Hash Password
//                     bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
//                         if(err) throw err;
//
//                         //Set password to hashed
//                         newUser.password = hash;
//
//                         //Save user
//                         newUser.save()
//                             .then(res.json({msg : "Successfully registered"}))
//                             .catch(err => console.log(err));
//                     }))
//                 }
//             });
//     }
//
// });
//
// //Login Handle
// // router.post('/login', (req, res, next) => {
//     // passport.authenticate('local', {
//     //     successRedirect: '/dashbord',
//     //     failureRedirect: '/users/login',
//     //     failureFlash : true
//     // })(req, res, next);
//
// // router.route('/login').post((req, res) => {
// //     const email = req.body.email;
// //     const password = req.body.password;
// //
// //
// //     console.log('Email '+email);
// //     console.log('Password '+password);
// //     //Find user
// //     User.findOne({ email : email })
// //         .then(user => {
// //             if(!user){
// //                 console.log('Not a user')
// //             }
// //
// //             //Password matching
// //             bcrypt.compare(password, user.password, (err, isMatch) => {
// //                 if(err) throw err;
// //
// //                 if(isMatch){
// //                     console.log('Logged in')
// //                 } else {
// //                     console.log('Incorrect username or password')
// //                 }
// //             });
// //         })
// //         .catch(err => console.log(err));
// //
// //
// //     passport.serializeUser((user, done) => {
// //         done(null, user.id);
// //     });
// //
// //     passport.deserializeUser((id, done) => {
// //         User.findById(id, (err, user) => {
// //             done(err, user);
// //         });
// //     });
// //
// //     // console.log(req.user.email);
// // });
// router.post('/login', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//
//     console.log('Email '+email);
//     console.log('Password '+password);
//
//     if (!email || !password) {
//         return res.status(400).json({ msg: "Please enter all fields" });
//     }
//     //Find user
//     User.findOne({ email : email })
//         .then(user => {
//             if(!user){
//                 console.log('Not a user')
//             }
//
//             //Password matching
//             bcrypt.compare(password, user.password, (err, isMatch) => {
//                 if(err) throw err;
//
//                 if(isMatch){
//                     console.log('Logged in')
//                     const userSession = {
//                         id: user.id,
//                         name : user.name,
//                         email : user.email
//                     };
//
//                     req.session.user = userSession;
//                     console.log(req.session.user);
//
//                     res.json({ msg: "Logged in successfully", userSession});
//                 } else {
//                     console.log('Incorrect username or password')
//                 }
//             });
//         })
//         .catch(err => console.log(err));
// });
//
// router.delete("/logout", (req, res) => {
//     req.session.destroy((err) => {
//         if(err) throw err;
//         res.clearCookie("session-id");
//         res.send("Logged out successfully");
//         console.log("Logged Out");
//     })
// });
//
// router.get("/authenticator", (req, res) => {
//     const userSession = req.session.user;
//     console.log(userSession);
//
//     if(userSession){
//         return res.json({msg : "Authenticated successfully", userSession});
//     } else {
//         return res.status(401).json({msg : "Unauthorized"});
//     }
// });
//
//
// module.exports = router;

const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, authChecker } = require("../controllers/AuthController");
const { registerLimiter, loginLimiter } = require("../utils/rateLimiter");

// Registers a new User
router.post("/register", registerLimiter, registerUser );

// Logs In a User, creates session in mongo store
// and returns a cookie containing sessionID, also called "session-id"
router.post("/login", loginLimiter, loginUser );

// Log out user by deleting session from store
// and deleting cookie on client side
// Needs cookie containing sessionID to be attached to request
router.delete("/logout", logoutUser );

// Check if user is Authenticated by reading session data
// Needs cookie containing sessionID
router.get("/authchecker", authChecker );

module.exports = router;