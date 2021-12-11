// Page 10
// Implementing the passport authentication

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./User.js');
// maps the passport fiels to the names of fields in the database
const localOpt = {
    usernameField : 'email',
    passwordField : 'password'
};

// define strategy for validating login
const strategy = new LocalStrategy(localOpt, async (email, password, done) => {
    try {
        // Find the user in the DB associated with this email
        const userChosen = await UserModel.findOne({email: email});

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

// for localLogin, use our strategy to handle User login
passport.use('localLogin', strategy);

// By default, passport uses sessions to maintain login status.
// You have to determine waht to save in session via serializeUser
// and deserializeUser. In our case, we will save the email in the session data.
passport.serializeUser((user, done) => done(null, user.email));
//Passes in user object now (I guess?)
passport.deserializeUser( (email, done) => {
    UserModel.findOne({email:email}, (err, user) => done(err,user) );
});
