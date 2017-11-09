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
                        userModel.sold = 500;
                        userModel.save(function(err, user) {
                            user.token = jwt.sign({
                                email:userModel.email,
                                password:userModel.password,
                                sold:userModel.sold
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
router.post('/virement', function(req, res) {
    // On verifie le solde de l'utilisateur :
    if(req.user.sold < req.body.montant) {
        res.json({
            type: false,
            data: "Solde insuffisant",
        });
    } else {
        var taxe = (10/100 * req.body.montant);
        var montantAfterTaxe = req.body.montant - taxe ;
        // On recupere le destinataire :
        User.findOne({email: req.body.email}, function(err, user) {
            if(err || !user) {
                console.log(err);
                res.json({
                    type: false,
                    data: "Destinataire introuvable",
                });
            } else if(user.email === req.user.email){
                res.json({
                    type: false,
                    data: "Vous ne pouvez faire un virement a vous même !",
                });
            } else {
                user.sold += montantAfterTaxe;
                req.user.sold -= req.body.montant;
                User.findOne({email:"banquier@voleur.com"}, function(err, user) {
                    user.sold += taxe;
                    user.save();
                });
                user.save(function(err){
                    if(err) {
                        console.log(err);
                    }
                    req.user.save(function(err) {
                        console.log(err);
                        if(err) {
                            res.json({
                                type: false,
                                data: "Une erreur est survenue",
                            });
                        } else {
                            res.json({
                                type: true,
                                data: montantAfterTaxe+" € envoyés à "+user.email+" (Et "+taxe+" € pour nous, oui on est une banque, on vol !)"
                            });
                        }
                    })
                })
            }
        });
    }
});

router.get('/me', function(req, res) {
    res.json({
        type:true,
        data:{
            email:req.user.email,
            sold:req.user.sold
        }
    });
});
module.exports = router;
