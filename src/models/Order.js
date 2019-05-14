'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
 date :{type :Date, default: Date.now },
 costumer:{type: String, required: true},
 quantity:{type: Number, required: true},
 method: {type: 'String', required: true}
   
})

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;