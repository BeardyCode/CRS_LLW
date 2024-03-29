//Importeer modules
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//Importeer gebruikersmodel
const User = require("../models/user.model");

//Maak strategie voor het inloggen
module.exports = function(passport) {
    passport.use(
        new LocalStrategy((username, password, done) => {
            User.findUserByUsername(username, (err, user) => {
                if (err) return done(err, false);
                if (!user) {
                    return done(null, false, {
                        message: "This email is not registered to an account"
                    });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            });
        }));
    
        
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findUserById(id, (err, user) => {
            done(err, user);
        });
    })
};