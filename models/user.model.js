//Importeer modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//Gebruikers/Account model
const UserSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Exporteren van het gebruikersmodel
const User = module.exports = mongoose.model("User", UserSchema);

//Functie voor het vinden van een gebruiker


//Functie voor het opslaan van een gebruiker
module.exports.createUser = (newUserData, callback) => {
    const rounds = 10;
    const newUser = new User(newUserData);
    bcrypt.genSalt(rounds, (err, salt) => {
        if (err) callback(err);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) callback(err);
            newUser.password = hash;
            newUser.save((err, user) => {
                if (err) callback(err);
                callback(null, user);
            });
        });
    });
}