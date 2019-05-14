"use strict";

const express = require("express");
const app = express();
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs')
const http = require('http')
const WebSocket = require('ws')
const mongoose = require("mongoose");

const mongoConnectURI = process.env.MONGOURL || "mongodb://localhost/fruits-delivery";
const userRoutes = require('./routes/user-routes')
const HERE_APP_ID = "sTWYdO0PrgRXmMm1ViBr";
const HERE_APP_CODE = "IdqCe27szfQfJ9i4z5Zq6Q";
// auth settings
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/User')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.serializeUser(function(user, done) {
    done(null, user);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        console.log("This is called")
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
// initialize mongo connection
mongoose
    .connect(mongoConnectURI, { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

// setup middlewares
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use('/api', userRoutes)
app.get("/", (req, res) => res.json({ greeting: "Hello World!" }));

/*app.post(
    "/api/login",
    (req, res) => {
        res.json(req.body)
    }
  );*/
app.post(
    "/api/login",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log("Authenticate")
        res.json(req.user.profile);
    }
  );
// generate certificates: openssl req -nodes -new -x509 -keyout server.key -out server.cert
const httpServer = http.createServer(app);


const wss = new WebSocket.Server({
    server: httpServer
});

module.exports = {
    httpServer
};
