//Importeer modules
const mongoose = require("mongoose");
const User = require('../models/user.model');


//Gebruikers/Account model
const RatingsSchema = mongoose.Schema({
    cardname: {
        type: {
            type: mongoose.Schema.Types.ObjectId, ref: User
        }
    },
    fullname: {
        type: {
            type: mongoose.Schema.Types.ObjectId, ref: User
        }
    },
    rating: {
        type: Number,
        required: true
    }
});

const Ratings = module.exports = mongoose.model("Ratings", RatingsSchema);