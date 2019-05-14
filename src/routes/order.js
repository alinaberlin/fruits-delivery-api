'use strict'
const express = require("express");
const router = express.Router();
const order = require('../models/Order')



router.get("/order", async (req, res, next) => {
    let {date, costumer, quantity, method} = req.body.order;
    let userId = customer
    User.findById(userId).then(result =>
         res.json(result.orders))
  }).catch(error => {
    if (error.code === 11000) {
        res.status(404)
    } else {
        res.status(400)
    }
    res.json(error)
});

router.post('/order', (req, res, next) => {
    const order = req.body
    order.create(user).then(result => {
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

module.exports = router;
