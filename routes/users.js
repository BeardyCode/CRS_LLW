//Importeren van modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

//Importeren van user.model
const User = require('../models/user.model');

//Configureren express-validator middleware
const { check, validationResult } = require('express-validator');

//Route naar de login pagina
router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        user: null
    });
});

//Login post request
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/'
    })(req, res, next);
  });

//Route naar de registratie pagina
router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        user: req.user
    });
});

//Route naar de error pagina
router.get('/error', (req, res) => {
    res.render('error', {
        title: 'error',
        user: req.user
    });
});

//Registratie post request
router.post('/register', [
    check('fullname').not().isEmpty().withMessage('Full name is required')
    .custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          User.findOne({fullname:req.body.fullname}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(user)) {
              reject(new Error('E-mail already in use'))
            }
            resolve(true)
          });
        });
      }),
    check('email').not().isEmpty().withMessage('Email is required')
    .custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          User.findOne({email:req.body.email}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(user)) {
              reject(new Error('E-mail already in use'))
            }
            resolve(true)
          });
        });
      }),
    check('email').isEmail().withMessage('This is not a valid email'),
    check('password').not().isEmpty().withMessage('Password is required'),
    check('password2').not().isEmpty().withMessage('Password is required'),
    
    ], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } 
    User.createUser(req.body, err => {
        if (err) throw err;
        res.redirect('/');
    });
});

//Uitlog route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

//EXPORT MODULE
module.exports = router;