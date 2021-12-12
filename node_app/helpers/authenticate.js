const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { User } = require('./mongoDataConnector.js');

// What the fields are called in our requests.
const localOpt = {
    usernameField : 'email',
    passwordField : 'password'
};


// Run to setup authentication with express
function setup(app) {
    // Use a cookie parser so we can store session cookies
    app.use(cookieParser('oreos'));

    // Configure storing of session cookies
    app.use(
        session({
            secret: "secret",
            resave: false,
            saveUninitialized: false
        })
    );

    // Initialize passport to use sessions
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('localLogin', strategy);

    passport.serializeUser((user, done) => done(null, user.email));
    passport.deserializeUser( (email, done) => {
        User.findOne({email:email}, (err, user) => done(err,user) );
    });
}


// Create a strategy for validating a login
const strategy = new LocalStrategy(localOpt, async (email, password, done) => {
    try {
        const userChosen = await User.findOne({email: email});

        if ( !userChosen ) {
            // If the user isn't found in the database, set flash message
            return done( null, false, {message: 'Email not found'});
        }
        //Validate passwor and make sure it matches the bcrypt digest
        //stored in the database. If they match, return a value of true.
        const validate = await userChosen.isValidPassword(password);
        if (!validate) {
            return done(null, false, {message: 'Wrong Password'});
        }
        // If it matches, send the user information to the next middlware
        return done(null, userChosen, {message: 'Logged in Successfully'});
    } catch (error) {
        return done(error);
    }
});


module.exports = {setup}
