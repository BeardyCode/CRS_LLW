//Importeer modules
const mongoose = require("mongoose");

//Gebruikers/Account model
const RatingsSchema = mongoose.Schema({
    cardname: {
        type: {
            type: mongoose.Schema.Types.ObjectId, ref: User
        },
        required: true
    },
    fullname: {
        type: {
            type: mongoose.Schema.Types.ObjectId, ref: User
        },
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});