var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require("jsonwebtoken");
var bcrypt = require('bcrypt');

router.post('/signin', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if(err) {
                        console.log(err);
                        res.json({
                            type: false,
                            data: "Error occured: " + err
                        });
                    } else {
                        var userModel = new User();
                        userModel.email = req.body.email;
                        userModel.password = hash;
                        userModel.save(function(err, user) {
                            user.token = jwt.sign({
                                email:userModel.email,
                                password:userModel.password
                            }, process.env.JWT_SECRET);
                            user.save(function(err, user1) {
                                res.json({
                                    type: true,
                                    data: user1,
                                    token: user1.token
                                });
                            });
                        })
                    }
                });
            }
        }
    });
});

router.post('/authenticate', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {

        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user && bcrypt.compareSync(req.body.password,user.password)) {
                res.json({
                    type: true,
                    data: user,
                    token: user.token
                });
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });
            }
        }
    });
});

module.exports = router;
