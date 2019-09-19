//Importeer modules
const mongoose = require("mongoose");

//Gebruikers/Account model
const CardSchema = mongoose.Schema({
    cardname: {
        type: String,
        required: true
    },
    cardtext: {
        type: String,
        required: true
    },
    cardset: {
        type: String,
        required: true
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