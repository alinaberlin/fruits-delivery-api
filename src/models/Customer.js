'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    
})

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;