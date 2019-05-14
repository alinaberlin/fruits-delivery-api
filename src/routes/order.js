'use strict'
const express = require("express");
const router = express.Router();

const Order = require('../models/Order')

router.post('/order', (req, res, next) => {
    const order = req.body
    order.customer = req.user.id
    Order.create(order).then(result => {
        console.log("user save", result)
        res.json(result)
    }).catch(error => {
        res.status(400)
        res.json(error)
    })
})

router.get('/order', (req, res, next) => {
    Order.find({customer: req.user._id}).then(result => res.json(result))
})

module.exports = router;
