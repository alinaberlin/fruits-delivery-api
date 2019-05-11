'use strict'

const express = require('express')
const app = express()
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const fs = require('fs')
const https = require('https')
const WebSocket = require('ws')

const FACEBOOK_APP_ID='2075294249436766';
const FACEBOOK_APP_SECRET='eaa177cce76bdf40b5d3db97f1381f95';
const GMAPS_KEY = 'AIzaSyBGRN7mFcR4bYnPMJuXYM6d6f7hxdGmODk';
const HERE_APP_ID = 'sTWYdO0PrgRXmMm1ViBr'
const HERE_APP_CODE = 'IdqCe27szfQfJ9i4z5Zq6Q'

passport.serializeUser(function(user, done) {
    done(null, user);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "https://dev.fruitsdelivery.eu/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  (accessToken, refreshToken, profile, done) => {
      console.log('Profile', JSON.stringify(profile))
      /**
       * {"id":"10157280056954711",
       * "name":{"familyName":"Avramescu","givenName":"Aurel"},
       * "emails":[{"value":"aurel.avramescu@gmail.com"}],
       * "provider":"facebook",
       * "_raw":"{\"id\":\"10157280056954711\",\"email\":\"aurel.avramescu\\u0040gmail.com\",
       * \"last_name\":\"Avramescu\",\"first_name\":\"Aurel\"}",
       * "_json":{"id":"10157280056954711",
       * "email":"aurel.avramescu@gmail.com","last_name":"Avramescu","first_name":"Aurel"}}
       */
      done(null, profile);
    //User.findOrCreate(..., function(err, user) {
    //  if (err) { return done(err); }
    //  done(null, user);
    //});
  }
));
app.use(passport.initialize());
//app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/login', (req, res) => res.redirect('/auth/facebook'))


// generate certificates: openssl req -nodes -new -x509 -keyout server.key -out server.cert
const httpServer = https.createServer({
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.cert')
}, app);

const wss = new WebSocket.Server({
    'server': httpServer
});

module.exports = {
    httpServer
}