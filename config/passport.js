const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const UserModel = require("../models/user");

console.log(process.env.GOOGLE_CLIENT_ID)
// configuring Passport!
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      // if the user has logged in before, we want to make sure that we pass the users information along in our middlware chain
      let userDocument = await UserModel.findOne({ googleId: profile.id });
      // if no user is found, the let user, would be undefined otherwise its the users document from mongodb

      // so if we found the user, pass thier information to the next function in the middleware chain
      if (userDocument) return cb(null, userDocument);
      // if its the users first time loggin in, we need to create a user document and store them in our database, and then pass the user information
      // along in our middleware chain

      // first time logging in! Create the user!
      userDocument = await UserModel.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      });
      // pass the created users information to the next function in the middleware chain
      return cb(null, userDocument);
    } catch (err) {
      return cb(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(userId, done) {

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user

	const user = await UserModel.findById(userId); // find the user by getting the id from the session cookie and search the db
  done(null, user);

});



