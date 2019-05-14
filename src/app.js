"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const fs = require('fs')
const http = require('http')
const WebSocket = require('ws')
const mongoose = require("mongoose");
const passport = require('passport')
const mongoConnectURI = process.env.MONGOURL || "mongodb://localhost/fruits-delivery";
const registration = require('./routes/registration')
const profile = require('./routes/profile')
const order = require('./routes/order')
const HERE_APP_ID = "sTWYdO0PrgRXmMm1ViBr";
const HERE_APP_CODE = "IdqCe27szfQfJ9i4z5Zq6Q";
// auth settings
require('./auth/passport');
const auth = require('./routes/auth');
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

app.use('/api', registration)
app.use('/auth', auth);
app.use('/api', passport.authenticate('jwt', {session: false}), profile);
app.use('/api', passport.authenticate('jwt', {session: false}), order);
app.get("/", (req, res) => res.json({ greeting: "Hello World!" }));

// generate certificates: openssl req -nodes -new -x509 -keyout server.key -out server.cert
const httpServer = http.createServer(app);


const wss = new WebSocket.Server({
    server: httpServer
});

module.exports = {
    httpServer
};
