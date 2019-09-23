//Importeren van modules
const express = require('express');
const router = express.Router();

//Models
const Card = require('../models/cards.model');
const Ratings = require('../models/ratings.model');

//Configureren express-validator middleware
const { check, validationResult } = require('express-validator');


router.get('/addcards', (req, res) => {
    res.render('addcards', {
    title: "Add Cards Here",
    user: req.user
    });
});

router.post('/addcards', [
    check('cardname').not().isEmpty().withMessage('Card name is required'),
    check('cardtext').not().isEmpty().withMessage('Card text is required'),
    check('cardtype').not().isEmpty().withMessage('Card type is required'),
    
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    Card.implementCard(req.body, err => {
        if (err) throw err;
        res.redirect('/cards/addcards')
    });
});

router.get('/ratecards', (req, res) => {
    Card.find({},  (err, data) => {
        console.log(data);
        res.render('ratecards', {
            title: "Rate Cards",
            user: req.user,
            data: data
            });
        });
    });

module.exports = router;