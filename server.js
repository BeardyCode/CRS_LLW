//Import Modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

dotenv.config({ path: './config.env' });
require('./config/passport')(passport);

//DB
const db_options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(process.env.DB_URI, db_options).then(
    () => {
        console.log(`Database connection established`)
    },
    err => {
        console.log(err)
    }
);

//Init app
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

//Config View Engine
app.set('view engine', 'ejs');

//Config Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Configureer express-session middleware
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

//Configureer passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Route naar de landing page
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
        user: req.user
    });
});

//Declareer gebruiker routes
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

//Initialiseren app verbinding
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app is actief in ${process.env.NODE_ENV} via port ${port}`)
});