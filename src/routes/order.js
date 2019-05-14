'use strict'
const express = require("express");
const router = express.Router();

const order = require('../models/Order')

router.post('/order', (req, res, next) => {
    const user = req.body
    User.create(user).then(result => {
        console.log("user save", result)
        res.json(result)
    }).catch(error => {
        if (error.code === 11000) {
            res.status(409)
        } else {
            res.status(400)
        }
        res.json(error)
    })
})