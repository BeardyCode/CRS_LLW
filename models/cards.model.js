//Importeer modules
const mongoose = require("mongoose");

//Gebruikers/Account model
const CardSchema = mongoose.Schema({
    cardname: {
        type: String,
        required: true
    },
    cardrarity: {
        type: String,
        required: true
    },
    cardtext: {
        type: String,
        required: true
    },
    cardcost: {
        type: String
    },
    cardtype: {
        type: String,
        required: true
    },
    cardstats:{
        type: String
    },
    cardset: {
        type: String,
        default: "ELD"
    },
    rating: {
        type: Number,
        default: 0
    },
    timesrated: {
        type: Number,
        default: 0
    }
});

const Card = module.exports = mongoose.model("Card", CardSchema);

module.exports.implementCard = (newCardData, callback) => {
    const newCard = new Card(newCardData);
    newCard.save((err, card) => {
        if (err) callback(err);
        callback(null, card);
    });
};