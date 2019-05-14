'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgendaSchema = new Schema({
    date :{type :Date, default: Date.now },
    order:{type: String, required: true},
    deliveryAddress:{type: String, required: true}
})

const Agenda = mongoose.model("Agenda", AgendaSchema);

module.exports = Agenda;