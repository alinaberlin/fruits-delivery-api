'use strict'

const express = require('express')
const app = express()
const passport = require('passport');

const fs = require('fs')
const https = require('https')
const WebSocket = require('ws')

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

app.use(passport.initialize());

app.get('/', (req, res) => res.send('Hello World!'))


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