'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
 date :{type :Date, default: Date.now },
 order:{type: String, required: true},
 deliveryAddress:{type: String, required: true}
 
    
})

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;