const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user')
const Profile = require('../models/profile')
passport.use(new GoogleStrategy(
    // Configuration object
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    // The verify callback function
    // Let's use async/await!
    async function(accessToken, refreshToken, profile, cb) {
      // A user has logged in with OAuth...
      try {
        // A user has logged in with OAuth...
        let user = await User.findOne({ googleId: profile.id });
        // Existing user found, so provide it to passport
        if (user) return cb(null, user);
        const userProfile = new Profile({
          name: profile.displayName,
          images: profile.photos[0].value
        })
        const newUser = new User ({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          profile: userProfile._id
        })
  
        await userProfile.save()
        await newUser.save()

        return cb(null, newUser);
      } catch (err) {
        return cb(err);
      }
    }
  ));

  // Add to bottom of config/passport.js
passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

  // Add to bottom of config/passport.js
passport.deserializeUser(async function(userId, cb) {
    // It's nice to be able to use await in-line!
    cb(null, await User.findById(userId));
  });